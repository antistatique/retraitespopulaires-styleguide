<?php

/**
 * Module hook.
 *
 * Implements hook_form_user_login_form_alter().
 * Alter Drupal login form with custom markup and submission.
 */
function rp_auth_form_user_login_form_alter(&$form, $form_state) {
  $form['#attributes']['autocomplete'] = "off";

  $form['name']['#title'] = t('Votre nom');
  $form['name']['#attributes']['autocomplete'] = "off";
  $form['name']['#attributes']['autofocus'] = "autofocus";
  $form['name']['#description'] = '';
  $form['name']['#prefix'] = '<div class="form-group">';
  $form['name']['#suffix'] = '</div>';

  $form['pass']['#title'] = t('Votre mot de passe');
  $form['pass']['#attributes']['autocomplete'] = "off";
  $form['pass']['#description'] = '';
  $form['pass']['#prefix'] = '<div class="form-group">';
  $form['pass']['#suffix'] = '</div>';

  $form['actions']['submit']['#value'] = t('Se connecter');
  $form['actions']['submit']['#attributes']['class'] = ['btn', 'btn-primary'];
  $form['actions']['submit']['#prefix'] = '<div class="form-group mb-0">';
  $form['actions']['submit']['#suffix'] = '</div>';

  $form['#validate'] = [];
  $form['#validate'][] = '::validateName';
  $form['#validate'][] = '::validateAuthentication';

  // Custom validations.
  $form['#validate'][] = 'rp_auth_user_login_form_validate_ldap';

  $form['#validate'][] = '::validateFinal';

  // Remove the forget password text.
  $form['#validate'][] = 'rp_auth_user_login_form_remove_forgotten_password';

  // Custom submit.
  $form['#submit'][] = 'rp_auth_user_login_form_submit';
}

/**
 * Custom submit handler for login form.
 */
function rp_auth_user_login_form_submit($form, $form_state) {
  // Set redirect to login form if the ?destination=XXX doesn't exist.
  $form_state->setRedirect('<front>', [], []);
}

/**
 * Custom validation handler to remove "Forgot you password" link when error.
 */
function rp_auth_user_login_form_remove_forgotten_password($form, &$form_state) {
  $errors = $form_state->getErrors();
  $message = NULL;

  if (isset($errors['name']) && strpos($errors['name']->getUntranslatedString(), '<a href=":password">Forgot your password?</a>')) {
    // Replace the core message whitout link.
    $message = str_replace('<a href=":password">Forgot your password?</a>', '', $errors['name']->getUntranslatedString());
    $message = trim($message);
  }

  if (isset($errors['name']) && strpos($errors['name']->getUntranslatedString(), ' or <a href=":url">request a new password</a>')) {

    // Replace the core message whitout link.
    $message = str_replace(' or <a href=":url">request a new password</a>', '', $errors['name']->getUntranslatedString());
    $message = trim($message);
  }

  if (!empty($message)) {
    // Remove all errors.
    $form_state->clearErrors();

    // @codingStandardsIgnoreStart
    // Only string literals should be passed to t() where possible.

    // Reset the new error.
    $form_state->setErrorByName('name', t($message));

    // @codingStandardsIgnoreEnd
  }
}

/**
 * Custom validate handler for login form through LDAP.
 */
function rp_auth_user_login_form_validate_ldap($form, &$form_state) {
  // If `::validateAuthentication` successful, $form_state->get('uid')
  // is set to the matching user ID.
  if ($form_state->get('uid') !== FALSE) {
    return;
  }

  // The user could not be logged with Drupal, check using LDAP.
  $ldap = Drupal::service('rp_auth.ldap');
  $settings = Drupal::service('settings')->get('rp_ldap');

  // Check the LDAP settings exists.
  if (!isset($settings['connection']['host']) || empty($settings['connection']['host']) || !isset($settings['connection']['port']) || empty($settings['connection']['port'])) {
    return;
  }

  // Init LDAP connection.
  $ldap->connect($settings['connection']['host'], $settings['connection']['port']);

  // Try to bind the given credentials with the LDAP.
  $is_bind = $ldap->auth($form_state->getValue('name'), $form_state->getValue('pass'));

  // If user can't bind terminate.
  if (!$is_bind) {
    $form_state->setErrorByName('', $ldap->getLastException());
    $ldap->close();
    return;
  }

  // Search the valid user into the LDAP.
  try {
    // Try to search users on multiple ldap paths.
    $paths = $settings['users'];
    foreach ($paths as $path) {
      $ldap_user_data = $ldap->search('cn', $form_state->getValue('name'), $path);
      if ($ldap_user_data != FALSE && (int) $ldap_user_data['count'] >= 1) {
        break;
      }
    }
  }
  catch (\Exception $e) {
    $form_state->setErrorByName('', t('Unrecognized username or password.'));
    $ldap->close();
    return;
  }

  // The previous loop break (found something) or finish with no values.
  if ($ldap_user_data == FALSE && (int) $ldap_user_data['count'] < 1) {
    $form_state->setErrorByName('', t('Unrecognized username or password.'));
    $ldap->close();
    return;
  }

  // The user is valide by the LDAP, check account in the CMS.
  $ldap_drupal = Drupal::service('rp_auth.ldap_drupal');
  $user = $ldap_drupal->fetchAccount($form_state->getValue('name'));

  // The user don't exist on the CMS, create in on the fly.
  if (!$user) {
    $user = $ldap_drupal->create($ldap_user_data);
  }

  // Update the account with data from the LDAP.
  $ldap_drupal->updateAccount($user, $ldap_user_data[0]);

  // Search the group(s) of this user into the LDAP.
  $ldap_groups_data = $ldap_user_data[0]['memberof'];

  if (isset($ldap_groups_data) && $ldap_groups_data != FALSE && (int) $ldap_groups_data['count'] >= 1) {
    $ldap_drupal->updateRoles($user, $ldap_groups_data);
  }
  else {
    // The user has not group in the LDAP so remove them all in the CMS.
    $ldap_drupal->rmRoles($user);
  }

  // Finally login the user.
  if ($user) {
    $form_state->clearErrors();
    $form_state->set('uid', $user->uid->value);
  }
  else {
    $form_state->setErrorByName('', t('Unrecognized username or password.'));
  }

  $ldap->close();
}
