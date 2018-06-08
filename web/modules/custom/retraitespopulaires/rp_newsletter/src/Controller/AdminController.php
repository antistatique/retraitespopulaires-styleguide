<?php

namespace Drupal\rp_newsletter\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Form\FormBuilderInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\State\StateInterface;

use DrewM\MailChimp\MailChimp;
use Drupal\Core\Url;
use Drupal\Core\Link;

/**
 * AdminController.
 */
class AdminController extends ControllerBase {
  /**
   * The state key value store.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  private $state;

  /**
   * Class constructor.
   */
  public function __construct(StateInterface $state, FormBuilderInterface $formBuilder) {
    $this->state = $state;
    $this->formBuilder = $formBuilder;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    // Instantiates this form class.
    return new static(
    // Load the service required to construct this class.
        $container->get('state'),
        $container->get('form_builder')
    );
  }

  /**
   * Admin settings for rp_newsletter.
   */
  public function settings() {
    return $this->formBuilder->getForm('Drupal\rp_newsletter\Form\AdminForm');
  }

  /**
   * Admin campaigns for rp_newsletter.
   */
  public function campaigns() {
    $client_id = $this->state->get('rp_newsletter.settings.mailchimp.client_id');

    if (empty($client_id)) {
      return $this->campaignsHelper();
    }

    $mailChimp = new MailChimp($client_id);
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
      $mailChimp->verify_ssl = FALSE;
    }
    $campaigns = $mailChimp->get('campaigns');

    $table = [
      '#type' => 'table',
      '#header' => [
        $this->t('Name'),
        $this->t('Options'),
        $this->t('Operations'),
      ],
    ];

    foreach ($campaigns['campaigns'] as $i => $campaign) {
      $table[$i]['name'] = [
        '#plain_text' => $campaign['settings']['title'],
      ];

      $table[$i]['options'] = [
        '#plain_text' => ucfirst($campaign['type']) . ' · ' . $campaign['recipients']['list_name'],
      ];

      $table[$i]['operations'] = [
        '#type' => 'dropbutton',
        '#links' => [],
      ];
      $table[$i]['operations']['#links']['preview'] = [
        'title' => $this->t('Preview'),
        'url' => Url::fromUri($campaign['archive_url'], ['absolute' => TRUE, 'attributes' => ['target' => '_blank']]),
      ];
      $table[$i]['operations']['#links']['edit'] = [
        'title' => $this->t('Edit'),
        'url' => Url::fromUri('https://us9.admin.mailchimp.com/campaigns/', ['absolute' => TRUE, 'attributes' => ['target' => '_blank']]),
      ];
    }

    return $table;
  }

  /**
   * Campaigns helper.
   */
  private function campaignsHelper() {
    $mailchimp = Url::fromUri('http://mailchimp.com', ['absolute' => TRUE, 'attributes' => ['target' => '_blank']]);
    $mailchimp_api = Url::fromUri('http://developer.mailchimp.com', ['absolute' => TRUE, 'attributes' => ['target' => '_blank']]);

    $desc = $this->t('Suivez ces étapes pour paramétrer et commencer à utiliser votre compte Mailchimp:') . '<br/>';
    $desc .= '<ol>';
    $desc .= '<li>' . $this->t('Une fois connecté, visitez la @page, sur laquelle vous pourrez personnaliser et configurer tous les composants Mailchimp', ['@page' => Link::createFromRoute('page d\'administration', 'rp_newsletter.admin.settings')->toString()]) . '</li>';
    $desc .= '<li>' . $this->t('Enfin, vous pouvez voir @page sur votre site', ['@page' => Link::createFromRoute('vos campagnes Mailchimp', 'rp_newsletter.admin.campaigns')->toString()]) . '</li>';
    $desc .= '</ol>';

    $desc .= '<h2>Liens utiles</h2>';

    return [
      '#theme' => 'help_section',
      '#title' => $this->t('Bien débuter'),
      '#description' => $desc,
      '#links' => [
        'mailchimp' => Link::fromTextAndUrl('Mailchimp', $mailchimp),
        'mailchimp_api' => Link::fromTextAndUrl('Mailchimp API', $mailchimp_api),
        'admin' => Link::createFromRoute('Page d\'administration', 'rp_newsletter.admin.settings'),
        'campaignes' => Link::createFromRoute('Listing des campagnes', 'rp_newsletter.admin.campaigns'),
      ],
    ];
  }

}
