<?php

namespace Drupal\rp_quickwin\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class TeaserForm.
 */
class TeaserForm extends FormBase {

  /*
   * Variable for having an unique form ID for each teaser in the page
   * See https://www.drupal.org/project/drupal/issues/766146 for more info on the problem
   */
  private static $i = 1;

  public function getFormId() {
    // Increase i for unique form id
    self::$i++;
    return 'rp_quickwin_teaser_form_' . self::$i;
  }

  public function buildForm(array $form, FormStateInterface $form_state, $params = NULL) {
    if (!empty($params)){
      // Add each field needed in the teaser
      foreach ($params['fields'] as $fieldName => $field){
        // Don't add if it is the button "Calculer"
        if ($fieldName !== 'button'){
          // Default parameter for all field
          $defaultFieldParameter = [
            '#title'  => $field['title'],
            '#prefix' => '<div class="form-group">',
            '#suffix' => '</div>',
            '#default_value'  => $field['default'],
          ];
          $haveSlider = false;

          switch($field['type']){
            case 'chf':
              $form[$fieldName] = [
                '#type'         => 'textfield',
                '#attributes'   => [ 'class' => ['form-chf-numeric', 'text-right']],
                '#placeholder'  => 'CHF',
              ];
              $haveSlider = $field['withSlider'] == '1';
              break;

            default:
              $form[$fieldName] = [
                '#type'   => $field['type'],
              ];
              break;
          }

          // Add default parameter to field (what's already in $form[$fieldName] is not override)
          $form[$fieldName] += $defaultFieldParameter;

          // If there's a slider for number type
          if ($haveSlider){
            $form[$fieldName.'_slider'] = [
              '#type' => 'range',
              '#min' => $field['min'],
              '#max' => $field['max'],
              '#step' => $field['step'],
            ];
          }
        }
      }

      // Save the target node id
      $form['node'] = [
        '#type' => 'hidden',
        '#default_value' => $params['node'],
      ];

      $form['submit'] = [
        '#type'       => 'submit',
        '#attributes' => [ 'class' => [ 'btn-group-justified' ] ],
        '#value'      => $this->t($params['fields']['button']),
      ];
    }

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Save values in session
    $temp_store = \Drupal::service('user.private_tempstore')->get('rp_quickwin');
    $temp_store->set('submited', $form_state->getValues());

    // Redirect to the calculator page
    $form_state->setRedirect('entity.node.canonical', ['node' => $form_state->getValue('node')]);
  }

}
