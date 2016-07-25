<?php
/**
* @file
* Contains \Drupal\rp_newsletter\Controller\AdminController.
*/

namespace Drupal\rp_newsletter\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\State\State;

use DrewM\MailChimp\MailChimp;
use Drupal\Core\Url;

/**
* AdminController.
*/
class AdminController extends ControllerBase {
    /**
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var State
    */
    private $state;

    /**
     * Class constructor.
     */
    public function __construct(State $state) {
        $this->state = $state;
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container) {
      // Instantiates this form class.
      return new static(
        // Load the service required to construct this class.
        $container->get('state')
      );
    }

    /**
    * Admin settings for rp_newsletter.
    */
    public function settings() {
        return \Drupal::formBuilder()->getForm('Drupal\rp_newsletter\Form\AdminForm');
    }

    /**
    * Admin campaigns for rp_newsletter.
    */
    public function campaigns() {
        $client_id = $this->state->get('rp_newsletter.settings.mailchimp.client_id');
        $mailChimp = new MailChimp($client_id);
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            $mailChimp->verify_ssl = false;
        }
        $campaigns = $mailChimp->get('campaigns');

        $table = array(
            '#type'    => 'table',
            '#header'  => array($this->t('Name'), $this->t('Options'), t('Operations')),
        );

        foreach ($campaigns['campaigns'] as $i => $campaign) {
            $table[$i]['name'] = array(
              '#plain_text' => $campaign['settings']['title'],
            );

            $table[$i]['options'] = array(
              '#plain_text' => ucfirst($campaign['type']) .' · '.$campaign['recipients']['list_name'],
            );

            $table[$i]['operations'] = array(
              '#type' => 'dropbutton',
              '#links' => array(),
            );
            $table[$i]['operations']['#links']['preview'] = array(
              'title' => t('Preview'),
              'url' => Url::fromUri($campaign['archive_url'], ['absolute' => TRUE, 'attributes' => ['target' => '_blank']]),
            );
            $table[$i]['operations']['#links']['edit'] = array(
              'title' => t('Edit'),
              'url' => Url::fromUri('https://us9.admin.mailchimp.com/campaigns/', ['absolute' => TRUE, 'attributes' => ['target' => '_blank']]),
            );
        }

        return $table;
    }

}
