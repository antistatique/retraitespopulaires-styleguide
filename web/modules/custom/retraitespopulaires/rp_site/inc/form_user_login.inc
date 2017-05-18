<?php

/**
 * @file
 * Legacy Drupal 7 code to implements hooks.
 */

/**
 * Hook Form User Login Form Alter.
 *
 * Implements hook_form_user_login_form_alter().
 * Alter Drupal login form with custom markup and submission.
 */
function rp_site_form_user_login_form_alter(&$form, $form_state) {
  $form['#prefix'] = '<div class="row"><div class="col-sm-6 col-sm-offset-3">';
  $form['#suffix'] = '</div></div><div class="spacer"></div>';

  $form['fieldset'] = [
    '#type'       => 'fieldset',
    '#attributes' => ['class' => ['fieldset-no-legend fieldset-bordered']],
    '#title'      => t('Login'),
  ];
  $form['#attributes']['autocomplete'] = "off";
  $form['fieldset']['name'] = $form['name'];
  unset($form['name']);
  $form['fieldset']['name']['#title'] = t('Votre nom');
  $form['fieldset']['name']['#attributes']['autocomplete'] = "off";
  $form['fieldset']['name']['#attributes']['autofocus'] = "autofocus";
  $form['fieldset']['name']['#description'] = '';

  $form['fieldset']['name']['#prefix'] = "<div class=\"form-group\">";
  $form['fieldset']['name']['#suffix'] = '</div>';
  $form['fieldset']['pass'] = $form['pass'];
  unset($form['pass']);
  $form['fieldset']['pass']['#title'] = t('Votre mot de passe');
  $form['fieldset']['pass']['#attributes']['autocomplete'] = "off";
  $form['fieldset']['pass']['#description'] = '';
  $form['fieldset']['pass']['#prefix'] = "<div class=\"form-group\">";
  $form['fieldset']['pass']['#suffix'] = '</div>';

  $form['separator'] = ['#markup' => '<hr />'];

  $form['actions']['submit']['#attributes']['class'][] = 'btn pull-right';
  $form['actions']['submit']['#prefix'] = "<div class=\"form-group\">";
  $form['actions']['submit']['#suffix'] = '</div>';

    // Custom submit.
  $form['#submit'][] = 'rp_site_user_login_form_submit';
}

/**
 * Custom submit handler for login form.
 */
function rp_site_user_login_form_submit($form, $form_state) {
  // Set redirect to login form if the ?destination=XXX doesn't exist.
  $form_state->setRedirect('<front>', [], []);
}
