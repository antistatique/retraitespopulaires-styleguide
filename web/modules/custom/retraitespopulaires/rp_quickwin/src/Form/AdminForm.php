<?php

namespace Drupal\rp_quickwin\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\State\StateInterface;

/**
 * Admin Form.
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
    return 'rp_quickwin_admin_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $extra = NULL) {
    $form['quickwin'] = [
      '#type'          => 'fieldset',
      '#title'         => $this->t('QuickWin'),
    ];

    $form['quickwin']['logismata_url'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Url Commune Logismata'),
      '#default_value' => $this->state->get('rp_quickwin.settings.logismata_url'),
    ];

    $form['quickwin']['logismata_url_auth'] = [
      '#type'          => 'textfield',
      '#title' => $this->t('Url Token Auth Logismata'),
      '#default_value' => $this->state->get('rp_quickwin.settings.logismata_url_auth'),
    ];

    $form['quickwin']['logismata_url_set_list'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Url Set List Logismata'),
      '#default_value' => $this->state->get('rp_quickwin.settings.logismata_url_set_list'),
    ];

    $form['quickwin']['logismata_url_location'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Url Get location Logismata'),
      '#default_value' => $this->state->get('rp_quickwin.settings.logismata_url_location'),
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
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->state->set('rp_quickwin.settings.logismata_url', trim($form_state->getValue('logismata_url')));
    $this->state->set('rp_quickwin.settings.logismata_url_auth', trim($form_state->getValue('logismata_url_auth')));
    $this->state->set('rp_quickwin.settings.logismata_url_set_list', trim($form_state->getValue('logismata_url_set_list')));
    $this->state->set('rp_quickwin.settings.logismata_url_location', trim($form_state->getValue('logismata_url_location')));
  }

}
