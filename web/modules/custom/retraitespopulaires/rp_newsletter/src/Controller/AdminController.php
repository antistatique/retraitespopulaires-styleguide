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
use Drupal\Core\Link;

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

        if (empty($client_id)) {
            return $this->_campaigns_helper();
        }

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

    private function _campaigns_helper(){
        $mailchimp = Url::fromUri('http://mailchimp.com', ['absolute' => TRUE, 'attributes' => ['target' => '_blank']]);
        $mailchimp_api = Url::fromUri('http://developer.mailchimp.com', ['absolute' => TRUE, 'attributes' => ['target' => '_blank']]);

        $desc = t('Suivez ces étapes pour paramétrer et commencer à utiliser votre compte Mailchimp:') .'<br/>';
        $desc .= '<ol>';
        $desc .= '<li>'.t('Une fois connecté, visitez la @page, sur laquelle vous pourrez personnaliser et configurer tous les composants Mailchimp', ['@page' => Link::createFromRoute('page d\'administration', 'rp_newsletter.admin.settings')->toString()]).'</li>';
        $desc .= '<li>'.t('Enfin, vous pouvez voir @page sur votre site', ['@page' => Link::createFromRoute('vos campagnes Mailchimp', 'rp_newsletter.admin.campaigns')->toString()]).'</li>';
        $desc .= '</ol>';

        $desc .= '<h2>Liens utiles</h2>';

        return [
            '#theme'       => 'help_section',
            '#title'       => t('Bien débuter'),
            '#description' => $desc,
            '#links'       => [
                'mailchimp'     => Link::fromTextAndUrl('Mailchimp', $mailchimp),
                'mailchimp_api' => Link::fromTextAndUrl('Mailchimp API', $mailchimp_api),
                'admin'         => Link::createFromRoute('Page d\'administration', 'rp_newsletter.admin.settings'),
                'campaignes'    => Link::createFromRoute('Listing des campagnes', 'rp_newsletter.admin.campaigns'),
            ],
        ];
    }

}
