<?php

namespace Drupal\rp_quickwin\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\State\StateInterface;
use Drupal\rp_quickwin\LogismataService;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class TeaserForm.
 */
class TeaserForm extends FormBase {

  /**
   * To communicate with Logismata
   * @var LogismataService
   */
  private $logismataService;

  /**
   * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
   * @var StateInterface
   */
  private $state;

  /**
   * Class constructor.
   */
  public function __construct(LogismataService $logismataService, StateInterface $state) {
    $this->logismataService  = $logismataService;
    $this->state = $state;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    // Instantiates this form class.
    return new static(
    // Load the service required to construct this class.
      $container->get('rp_quickwin.logismata'),
      $container->get('state')
    );
  }

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

        // Save logismata parameter
        $form['logismata_parameter'] = [
          '#type' => 'hidden',
          '#default_value' => $field->logismata_parameter,
        ];

        // Default parameter for all field
        $defaultFieldParameter = [
          '#title' => $field->name,
          '#prefix' => '<div class="form-group">',
          '#suffix' => '</div>',
          '#default_value' => $field->default,
        ];

        $haveSlider = FALSE;
        switch ($field->type) {
          case 'chf':
            $form['logismata_value'] = [
              '#type' => 'textfield',
              '#attributes' => [ 'class' => [ 'form-chf-numeric', 'text-right' ] ],
              '#placeholder' => 'CHF',
            ];
            $haveSlider = $field->with_slider == '1';
            break;

          case 'npa':
            try {
              $token = $this->logismataService->getToken();
            } catch (\Exception $e) {
              $token = '';
            }

            $form['logismata_value'] = [
              '#type' => 'textfield',
              '#attributes' => [ 'class' => [ 'form-npa' ], 'autocomplete' => 'off', 'data-authToken' => $token, 'data-url' => $this->state->get('rp_quickwin.settings.logismata_url_location') ],
            ];
            break;

          default:
            $form['logismata_value'] = [
              '#type' => $field->type,
            ];
            break;
        }

        // Add default parameter to field (what's already in $form[$fieldName] is not override)
        $form['logismata_value'] += $defaultFieldParameter;

        // If there's a slider for number type
        if ($haveSlider) {
          $form['logismata_value']['#suffix'] = '<br><div class="ui-widget-content slider" data-step="' . $field->increment . '" data-max="' . $field->max . '" data-min="' . $field->min . '"></div></div';
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

  public function submitForm(array &$form, FormStateInterface $form_state, $params = null) {
    // Redirect to the calculator page
    $form_state->setRedirect('entity.node.canonical', ['node' => $form_state->getValue('node')], ['query' => [$form_state->getValue('logismata_parameter') => $form_state->getValue('logismata_value')]]);
  }

}
