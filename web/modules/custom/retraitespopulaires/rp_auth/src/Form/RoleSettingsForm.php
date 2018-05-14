<?php

namespace Drupal\rp_auth\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\rp_auth\Service\LDAP;
use Drupal\Core\Site\Settings;
use Drupal\Core\State\StateInterface;

/**
 * Adds an Admin form page for mapping LDAP roles to Drupal roles.
 */
class RoleSettingsForm extends FormBase {
  /**
   * State API for storing variables that shouldn't travel between instances.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  private $state;

  /**
   * Service LDAP.
   *
   * @var \Drupal\rp_auth\Service\LDAP
   */
  private $ldap;

  /**
   * Read only settings that are initialized with the class.
   *
   * @var Drupal\Core\Site\Settings
   */
  private $settings;

  /**
   * Class constructor.
   */
  public function __construct(StateInterface $state, LDAP $ldap, Settings $settings) {
    $this->state = $state;
    $this->ldap = $ldap;
    $this->settings = $settings;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    // Instantiates this form class.
    return new static(
    // Load the service required to construct this class.
    $container->get('state'),
    $container->get('rp_auth.ldap'),
    $container->get('settings')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'rp_ldap_roles_admin_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $ldap_roles = $this->state->get('rp_auth.settings.ldap_roles');

    // Get roles from Drupal to use them as select options.
    $roles_options = $this->getRoles();
    array_unshift($roles_options, $this->t('Select an option'));

    $form['#tree'] = TRUE;

    $form['ldap_roles'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Mapping of Roles'),
    ];

    // Init LDAP connection.
    $settings_rp_ldap = $this->settings->get('rp_ldap');
    $this->ldap->connect($settings_rp_ldap['connection']['host'], $settings_rp_ldap['connection']['port']);

    // Try to bind the given credentials with the LDAP.
    $is_bind = $this->ldap->auth($settings_rp_ldap['service_account']['username'], $settings_rp_ldap['service_account']['pass']);

    if (!$is_bind) {
      drupal_set_message($this->ldap->getLastException(), 'error');
      return $form;
    }

    foreach ($settings_rp_ldap['mapping_patterns'] as $pattern) {
      // Search groups from LDAP.
      try {
        $ldap_groups_data = $this->ldap->search('cn', $pattern, $settings_rp_ldap['groups'], '*');
      } catch (\Exception $e) {
        drupal_set_message($e->getMessage(), 'error');
        continue;
      }

      if (isset($ldap_groups_data) && $ldap_groups_data != FALSE && (int) $ldap_groups_data['count'] >= 1) {
        unset($ldap_groups_data['count']);

        // Create selects with ldap groups (with drupal roles as options)
        foreach ($ldap_groups_data as $group) {
          $form['ldap_roles'][$group['dn']] = [
            '#type' => 'select',
            '#options' => $roles_options,
            '#title' => isset($group['description'][0]) ? $group['description'][0] . ' (' . $group['cn'][0] . ')' : $group['cn'][0],
            '#default_value' => (isset($ldap_roles[$group['dn']]) && !empty($ldap_roles[$group['dn']])) ? $ldap_roles[$group['dn']] : 0,
          ];
        }
      }
    }

    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save'),
      '#button_type' => 'primary',
      '#prefix' => '<div class="form-group">',
      '#suffix' => '</div>',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Set state for all form items based on roles.
    $form_items = [];
    foreach ($form_state->getValue('ldap_roles') as $key => $group) {
      $form_items[$key] = $group;
    }

    // General settings.
    $this->state->set('rp_auth.settings.ldap_roles', $form_items);
    $this->getRequest()->getSession()->remove('rp_auth_credential');
  }

  public function getRoles() {
    $roles = user_role_names(TRUE);

    unset($roles['administrator']);
    unset($roles['authenticated']);

    return $roles;
  }
}
