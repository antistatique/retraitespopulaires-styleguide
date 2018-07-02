<?php

namespace Drupal\rp_offers\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Admin request search form.
 */
class AdminRequestSearchForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'rp_offers_admin_request_search_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $extra = NULL) {
    $form['#method'] = 'GET';

    $form['q'] = [
      '#type'   => 'textfield',
      '#title'  => $this->t('Rechercher par e-mail, nom ou prénom'),
    ];

    $form['actions']['submit'] = [
      '#type'        => 'submit',
      '#value'       => $this->t('Chercher'),
      '#prefix'      => '<div class="form-actions">',
      '#suffix'      => '</div>',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {}

}
