<?php

namespace Drupal\rp_auth\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpFoundation\RedirectResponse;

use Drupal\Core\Session\AccountProxy;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\Core\Path\CurrentPathStack;
use Drupal\Core\Site\Settings;
use Drupal\rp_auth\Service\LDAP;
use Drupal\rp_auth\Service\LDAPDrupal;
use Drupal\rp_auth\Service\Exception\LdapConnectionException;
use Drupal\rp_auth\Service\Exception\LdapException;

use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

/**
 * Subscribe to KernelEvents::REQUEST events.
 *
 * Try to connect the user via SSO Header, otherwise redirect to loggin page.
 */
class AuthSSO implements EventSubscriberInterface {
  use \Drupal\Core\StringTranslation\StringTranslationTrait;

  /**
   * A proxied implementation of AccountInterface.
   *
   * @var \Drupal\Core\Session\AccountProxy
   */
  protected $currentUser;

  /**
   * Default object for current_route_match service.
   *
   * @var \Drupal\Core\Routing\CurrentRouteMatch
   */
  protected $routeMatch;

  /**
   * Represents the current path for the current request.
   *
   * @var \Drupal\Core\Path\CurrentPathStack
   */
  protected $currentPath;

  /**
   * Read only settings.
   *
   * @var \Drupal\Core\Site\Settings
   */
  protected $settings;

  /**
   * LDAP service.
   *
   * @var \Drupal\rp_auth\Service\LDAP
   */
  protected $ldap;

  /**
   * Manage the Drupal account and the LDAP datas.
   *
   * @var \Drupal\rp_auth\Service\LDAPDrupal
   */
  protected $ldapDrupal;

  /**
   * Public routes, they don't need to be logged for access theme.
   *
   * @var array
   */
  protected $publicRoutes = [
    'system.404',
    'user.login',
    'user.logout',
  ];

  /**
   * Class constructor.
   */
  public function __construct(AccountProxy $currentUser, CurrentRouteMatch $routeMatch, CurrentPathStack $currentPath, Settings $settings, LDAP $ldap, LDAPDrupal $ldapDrupal) {
    $this->currentUser = $currentUser;
    $this->routeMatch  = $routeMatch;
    $this->currentPath = $currentPath;
    $this->settings    = $settings->get('rp_ldap');
    $this->ldap        = $ldap;
    $this->ldapDrupal  = $ldapDrupal;
  }

  /**
   * {@inheritdoc}
   *
   * The priority for the exception must be as low as possible this subscriber
   * to respond with AccessDeniedHttpException.
   */
  public static function getSubscribedEvents() {
    $events[KernelEvents::EXCEPTION][] = ['loginSingleSignOn'];
    return $events;
  }

  /**
   * SSO Retraites Populaires.
   *
   * Create account if not exists and log it according LDAP credentials + roles.
   *
   * @param \Symfony\Component\HttpKernel\Event\GetResponseEvent $event
   *   The Event to process.
   *
   * @throws \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException
   *   Thrown when the access is denied and redirects to user login page.
   */
  public function loginSingleSignOn(GetResponseEvent $event) {
    // Catch only the 403 exception.
    $exception = $event->getException();
    if (!($exception instanceof AccessDeniedHttpException)) {
      return;
    }

    // Do not procced for authenticated user or public routes.
    // Careful, this isn't ACL Check, it's just the loggedin checker !
    if ($this->currentUser->isAuthenticated() || $this->isPublicRoute()) {
      return;
    }

    // Try to retrieve the SSO Header given by Retraites Populaires.
    $ssoHeader = $event->getRequest()->headers->get('X-Remote-User');
    if (empty($ssoHeader)) {
      return;
    }

    // Check the LDAP settings exists.
    if (!isset($this->settings['connection']['host']) || empty($this->settings['connection']['host']) || !isset($this->settings['connection']['port']) || empty($this->settings['connection']['port'])) {
      return;
    }

    $ldap_user_data = FALSE;

    try {
      // The user is not logged in, loggin using SSO Header via LDAP.
      // Use SSO Header to create/connect user.
      // Init LDAP connection.
      $this->ldap->connect($this->settings['connection']['host'], $this->settings['connection']['port']);

      // Authenticate to the LDAP with the service account.
      $is_bind = $this->ldap->auth($this->settings['service_account']['username'], $this->settings['service_account']['pass']);

      // If user can't bind, terminate.
      if (!$is_bind) {
        drupal_set_message($this->ldap->getLastException(), 'error');
        $this->ldap->close();
        return;
      }

      // Search the valid user into the LDAP.
      // Try to search users on multiple ldap paths.
      $paths = $this->settings['users'];
      foreach ($paths as $path) {
        try {
          $ldap_user_data = $this->ldap->search('cn', $ssoHeader, $path);
        }
        catch (LdapException $e) {
          // User was not find in Ldap path: Let's try in the next path.
          continue;
        }
      }
    }
    catch (LdapConnectionException $e) {
      drupal_set_message($e->getMessage(), 'error');
      $this->ldap->close();
      return;
    }

    // Did we find the user in LDAP?
    if ($ldap_user_data == FALSE || (int) $ldap_user_data['count'] < 1) {
      drupal_set_message($this->t('SSO - unrecognized username, please contact your administrator.'), 'error');
      $this->ldap->close();
      return;
    }

    // The user is valide by the LDAP, check account in the CMS.
    $user = $this->ldapDrupal->fetchAccount($ldap_user_data[0]['cn'][0]);

    // The user don't exist on the CMS, create in on the fly.
    if (!$user) {
      $user = $this->ldapDrupal->create($ldap_user_data);
    }

    // Update the account with data from the LDAP.
    $this->ldapDrupal->updateAccount($user, $ldap_user_data[0]);

    // Search the group(s) of this user into the LDAP.
    $ldap_groups_data = $ldap_user_data[0]['memberof'];

    if (isset($ldap_groups_data) && $ldap_groups_data != FALSE && (int) $ldap_groups_data['count'] >= 1) {
      $this->ldapDrupal->updateRoles($user, $ldap_groups_data);
    }
    else {
      // The user has not group in the LDAP so remove them all in the CMS.
      $this->ldapDrupal->rmRoles($user);
    }

    // Finally login the user.
    if ($user) {
      user_login_finalize($user);
      $current_path = $this->currentPath->getPath();
      $event->setResponse(new RedirectResponse($current_path));
    }
    else {
      drupal_set_message($this->t('SSO - unrecognized username, please contact your administrator.'), 'error');
    }

    $this->ldap->close();
  }

  /**
   * Return if the current routes is public or not.
   *
   * @return bool
   *   Access allowed or not.
   */
  private function isPublicRoute() {
    $allow = FALSE;
    $route_name = $this->routeMatch->getRouteName();

    // Allow all public routes.
    if (in_array($route_name, $this->publicRoutes)) {
      $allow = TRUE;
    }
    return $allow;
  }

}
