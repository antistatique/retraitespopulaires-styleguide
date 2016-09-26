<?php
/**
* @file
* Contains \Drupal\rp_newsletter\Form\SubscribeForm.
*/

namespace Drupal\rp_newsletter\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\State\StateInterface;

use DrewM\MailChimp\MailChimp;

class SubscribeForm extends FormBase {

    /**
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    private $state;

    /**
     * Class constructor.
     */
    public function __construct(StateInterface $state) {
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
    * {@inheritdoc}.
    */
    public function getFormId() {
        return 'rp_newsletter_form';
    }

    /**
    * {@inheritdoc}
    */
    public function buildForm(array $form, FormStateInterface $form_state, $extra = NULL) {

        $form['form-wrapper_start'] = array(
            '#markup' => '<div class="form-group">',
        );

        $form['input-group_start'] = array(
            '#markup' => '<div class="input-group">',
        );

        $form['email'] = array(
            '#type'   => 'textfield',
            '#placeholder' => $this->t('Ex: jane.doe@bluewin.ch'),
            '#required'    => true,
        );

        $form['actions']['submit'] = array(
            '#type'        => 'submit',
            '#value'       => $this->t('Je m\'inscris'),
            '#attributes'  => ['class' => array('btn-default')],
            '#prefix'      => '<span class="input-group-btn">',
            '#suffix'      => '</span>',
        );

        $form['input-group_end'] = array(
            '#markup' => '</div>',
        );

        $form['form-wrapper_end'] = array(
            '#markup' => '</div>',
        );
        return $form;
    }

    /**
    * {@inheritdoc}
    */
    public function submitForm(array &$form, FormStateInterface $form_state) {

        $mail = $form_state->getValue('email');

        $client_id = $this->state->get('rp_newsletter.settings.mailchimp.client_id');
        $mailChimp = new MailChimp($client_id);
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            $mailChimp->verify_ssl = false;
        }

        $list_id = $this->state->get('rp_newsletter.settings.mailchimp.subscribe_id');
        $result = $mailChimp->post('lists/'.$list_id.'/members', [
            'email_address' => $mail,
            'status'        => 'subscribed',
        ]);

        $error = $mailChimp->getLastError();
        if ( isset($error) AND !empty($error) && $result['title'] != 'Member Exists' ){
            drupal_set_message(t('Erreur lors de l\'inscription.').' - '.$error, 'error');
        }else{
            drupal_set_message(t('Inscription réussie.').' - '.t('Merci de votre inscription à notre newsletter. Un e-mail de confirmation va vous être envoyé dans un instant.'));
        }
    }
}
