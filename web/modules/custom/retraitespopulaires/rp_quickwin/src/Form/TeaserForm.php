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
    if (!empty($params)) {
      // Don't add if it is the button "Calculer"
      if (isset($params['field'])) {
        $field = $params['field'];

        // Default parameter for all field
        $defaultFieldParameter = [
          '#title' => $field->name,
          '#prefix' => '<div class="form-group">',
          '#suffix' => '</div>',
          '#default_value' => $field->default,
        ];
        $haveSlider = FALSE;
        /*$form['test']  = [
          '#type' => 'rp_quickwin_teaser_field_type',
        ];
        echo '0';*/
        switch ($field->type) {
          case 'chf':
            $form[$field->parameter] = [
              '#type' => 'textfield',
              '#attributes' => [ 'class' => [ 'form-chf-numeric', 'text-right' ] ],
              '#placeholder' => 'CHF',
            ];
            $haveSlider = $field->with_slider == '1';
            break;

          case 'npa':
            $form[$field->parameter] = [
              '#type' => 'number',
            ];
            break;

          default:
            $form[$field->parameter] = [
              '#type' => $field->type,
            ];
            break;
        }

        // Add default parameter to field (what's already in $form[$fieldName] is not override)
        $form[$field->parameter] += $defaultFieldParameter;

        // If there's a slider for number type
        if ($haveSlider) {
          $form[$field->parameter]['#suffix'] = '<br><div class="ui-widget-content slider" step="' . $field->increment . '" max="' . $field->max . '" min="' . $field->min . '"></div></div';
        }
      }

      // Save the target node id
      $form['node'] = [
        '#type' => 'hidden',
        '#default_value' => $params['node'],
      ];

      // Add the submit button
      $form['submit'] = [
        '#type'       => 'submit',
        '#attributes' => [ 'class' => [ 'btn-group-justified' ] ],
        '#value'      => $this->t($params['button']),
      ];
    }

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Save values in session
    $session = \Drupal::request()->getSession();
    $session->set('rp_quickwin_submited', $form_state->getValues());

    // Redirect to the calculator page
    $form_state->setRedirect('entity.node.canonical', ['node' => $form_state->getValue('node')]);
  }

}
