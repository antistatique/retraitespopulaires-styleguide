<?php

namespace Drupal\rp_newsletter\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\State\StateInterface;

use DrewM\MailChimp\MailChimp;

/**
 * Admin Form class.
 */
class AdminForm extends FormBase {
  /**
   * The state key value store.
   *
   * @var \Drupal\Core\State\StateInterface
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
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'rp_newsletter_admin_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $extra = NULL) {
    // Mailchimp settings.
    $form['mailchimp'] = [
      '#type'          => 'fieldset',
      '#title'         => $this->t('Mailchimp'),
    ];

    $form['mailchimp']['client_id'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Clé Mailchimp'),
      '#default_value' => $this->state->get('rp_newsletter.settings.mailchimp.client_id'),
    ];

    $form['mailchimp']['subscribe_id'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t("Numéro d'identification de la liste de souscriptions"),
      '#default_value' => $this->state->get('rp_newsletter.settings.mailchimp.subscribe_id'),
    ];

    $form['actions']['submit'] = [
      '#type'        => 'submit',
      '#value'       => $this->t('Save'),
      '#button_type' => 'primary',
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    if (!empty($form_state->getValue('client_id'))) {
      try {
        $mailchimp = new MailChimp($form_state->getValue('client_id'));
      }
      catch (\Exception $e) {
        $form_state->setErrorByName('mailchimp', $this->t('Mailchimp error: @message', ['@message' => $e->getMessage()]));
      }
    }

    if (!empty($form_state->getValue('subscribe_id'))) {
      $result = $mailchimp->get('lists/' . $form_state->getValue('subscribe_id'));
      if (isset($result['status']) && $result['status'] != '200') {
        $form_state->setErrorByName('mailchimp', $this->t('Mailchimp error: @detail', ['@detail' => $result['detail']]));
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->state->set('rp_newsletter.settings.mailchimp.client_id', trim($form_state->getValue('client_id')));
    $this->state->set('rp_newsletter.settings.mailchimp.subscribe_id', trim($form_state->getValue('subscribe_id')));
  }

}
