<?php

/**
 * @file
 * Legacy Drupal 7 code to implements hooks.
 */

 use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_FORM_ID_alter().
 */
function rp_site_form_node_document_form_alter(&$form, FormStateInterface $form_state, $form_id) {
  // Custom submit.
  $form['actions']['publish']['#submit'][] = 'rp_site_node_document_form_submit';
  $form['actions']['unpublish']['#submit'][] = 'rp_site_node_document_form_submit';
}

/**
 * Custom submit handler for node_document_form form.
 */
function rp_site_node_document_form_submit($form, $form_state) {
  // Set redirect to admin content form if the ?destination=XXX doesn't exist.
  $form_state->setRedirect('system.admin_content', [], []);
}
