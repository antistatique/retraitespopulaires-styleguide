<?php
/**
* @file
* Contains \Drupal\rp_offers\Form\AdminRequestSearchForm.
*/

namespace Drupal\rp_offers\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

class AdminRequestSearchForm extends FormBase {
    /**
    * {@inheritdoc}.
    */
    public function getFormId() {
        return 'rp_offers_admin_request_search_form';
    }

    /**
    * {@inheritdoc}
    */
    public function buildForm(array $form, FormStateInterface $form_state, $extra = NULL) {
        $form['#method'] = 'GET';

        $form['q'] = array(
            '#type'   => 'textfield',
            '#title'  => t('Rechercher par e-mail, nom ou prénom'),
        );

        $form['actions']['submit'] = array(
            '#type'        => 'submit',
            '#value'       => t('Chercher'),
            '#prefix'      => '<div class="form-actions">',
            '#suffix'      => '</div>'
        );

        return $form;
    }

    /**
    * {@inheritdoc}
    */
    public function submitForm(array &$form, FormStateInterface $form_state) { }
}
