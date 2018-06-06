<?php

namespace Drupal\rp_auth\Service;

use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\State\StateInterface;

/**
 * LDAPDrupal.
 *
 * Manage the Drupal account and the LDAP datas.
 */
class LDAPDrupal {
  /**
   * EntityTypeManagerInterface to load User(s).
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityUser;

  /**
   * State API for storing variables that shouldn't travel between instances.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  private $state;

  /**
   * Class constructor.
   */
  public function __construct(EntityTypeManagerInterface $entity, StateInterface $state) {
    $this->entityUser = $entity->getStorage('user');
    $this->state      = $state;
  }

  /**
   * Create a user with ldap infos.
   *
   * @param array $ldap_data
   *   Raw data from LDAP.
   *
   * @return User|false
   *   The fresh created user on successful or FALSE on error
   */
  public function create(array $ldap_data) {
    $user = $this->entityUser->create();

    if (!isset($ldap_data[0]['cn'][0]) || !isset($ldap_data[0]['sn'][0])) {
      return FALSE;
    }

    $mail = isset($ldap_data[0]['mail'][0]) ? $ldap_data[0]['mail'][0] : $ldap_data[0]['cn'][0] . '@retraitespopulaires.ch';

    // This username must be unique and accept only a-Z,0-9, - _ @
    $user->setUsername($ldap_data[0]['cn'][0]);
    $user->setPassword($this->generate(100));
    $user->setEmail($mail);
    $user->enforceIsNew();
    $user->set('langcode', 'fr');
    $user->set('preferred_langcode', 'fr');
    $user->set('timezone', 'Europe/Zurich');

    // Save user.
    $user->activate();
    $user->save();

    return $user;
  }

  /**
   * Fetches a user object by account name.
   *
   * @param string $name
   *   String with the account's user name.
   *
   * @return object|bool
   *   A fully-loaded user object upon successful
   *   user load or FALSE if user cannot be loaded.
   */
  public function fetchAccount($name) {
    $users = $this->entityUser->loadByProperties(['name' => $name]);
    return $users ? reset($users) : FALSE;
  }

  /**
   * Apply according roles from LDAP <-> Drupal settings.
   *
   * Remove every roles excepted systems ones and apply customs roles.
   *
   * @param \Drupal\Core\Session\AccountInterface &$user
   *   User that will be updated.
   * @param array $ldap_roles
   *   Raw groups to apply on given user from LDAP.
   */
  public function updateRoles(AccountInterface &$user, array $ldap_roles) {
    $ldap_roles_mapping = $this->state->get('rp_auth.settings.ldap_roles');
    if ($ldap_roles != FALSE && (int) $ldap_roles['count'] >= 1 && !empty($ldap_roles_mapping)) {
      // Reset user roles.
      $roles = $this->getRoles();
      foreach ($roles as $rid => $role) {
        $user->removeRole($rid);
      }

      // Apply according roles from LDAP <-> Drupal settings.
      unset($ldap_roles['count']);
      foreach ($ldap_roles as $ldap_role) {
        if (isset($ldap_roles_mapping[$ldap_role]) && $ldap_roles_mapping[$ldap_role] != '0') {
          $user->addRole($ldap_roles_mapping[$ldap_role]);
        }
      }

      $user->save();
    }
  }

  /**
   * Update fields data from LDAP -> Drupal.
   *
   * @param \Drupal\Core\Session\AccountInterface &$user
   *   User that will be updated.
   * @param array $ldap_data
   *   Raw data from LDAP.
   */
  public function updateAccount(AccountInterface &$user, array $ldap_data) {
    // Update the mail field.
    if (isset($ldap_data['mail'][0])) {
      $user->set('mail', $ldap_data['mail'][0]);
    }
    $user->save();
  }

  /**
   * Remove every roles excepted systems ones.
   *
   * @param \Drupal\Core\Session\AccountInterface &$user
   *   User that will be updated.
   */
  public function rmRoles(AccountInterface &$user) {
    // Reset user roles.
    $roles = $this->getRoles();
    foreach ($roles as $rid => $role) {
      $user->removeRole($rid);
    }
    $user->save();
  }

  /**
   * Generate a random string of given length.
   *
   * @param int $length
   *   Length of generated string.
   *
   * @return string
   *   Generated string of given length
   */
  private function generate($length = 78) {
    return bin2hex(random_bytes($length));
  }

  /**
   * Get all roles in Drupal without system roles (administrators and authenticated)
   */
  public function getRoles() {
    $roles = user_role_names(TRUE);

    unset($roles['administrator']);
    unset($roles['authenticated']);

    return $roles;
  }

}
