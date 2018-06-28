<?php

namespace Drupal\rp_libre_passage\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\template_whisperer\TemplateWhispererManager;
use Drupal\template_whisperer\TemplateWhispererSuggestionUsage;
use Symfony\Component\DependencyInjection\ContainerInterface;
use DateTime;

use Drupal\Core\TempStore\PrivateTempStoreFactory;
use Drupal\Core\State\StateInterface;
use Drupal\rp_libre_passage\Service\PLPCalculator;
use Drupal\rp_libre_passage\Service\PLPConversionRate;

/**
 * PLP Calculator Form class.
 */
class PLPCalculatorForm extends FormBase {

  /**
   * Stores and retrieves temporary data for a given owner.
   *
   * @var \Drupal\Core\TempStore\PrivateTempStoreFactory
   */
  protected $session;

  /**
   * The state key value store.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * The PLP Calculator (Simulateur de Libre Passage).
   *
   * @var \Drupal\rp_libre_passage\Service\PLPCalculator
   */
  protected $plpCalculator;

  /**
   * The PLP Conversion Rate (Taux de conversions).
   *
   * @var \Drupal\rp_libre_passage\Service\PLPConversionRate
   */
  protected $plpConversionRate;

  /**
   * The Template Whisperer manager.
   *
   * @var \Drupal\template_whisperer\TemplateWhispererManager
   */
  protected $twManager;

  /**
   * The Template Whisperer suggestion usage.
   *
   * @var \Drupal\template_whisperer\TemplateWhispererSuggestionUsage
   */
  protected $twSuggestionUsage;

  /**
   * Class constructor.
   */
  public function __construct(PrivateTempStoreFactory $private_tempstore, StateInterface $state, PLPCalculator $plp_calculator, PLPConversionRate $plp_conversion_rate, TemplateWhispererManager $twManager, TemplateWhispererSuggestionUsage $twSuggestionUsage) {
    $this->state = $state;
    $this->plpCalculator = $plp_calculator;
    $this->plpConversionRate = $plp_conversion_rate;
    $this->twManager = $twManager;
    $this->twSuggestionUsage = $twSuggestionUsage;

    // Init session
    // TODO Found better solution to inline errors than hack session to.
    $this->session = $private_tempstore->get(self::getFormId());
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    // Instantiates this form class.
    return new static(
    // Load the service required to construct this class.
    $container->get('user.private_tempstore'),
    $container->get('state'),
    $container->get('rp_libre_passage.plp_calculator'),
    $container->get('rp_libre_passage.plp_conversion_rate'),
    $container->get('plugin.manager.template_whisperer'),
    $container->get('template_whisperer.suggestion.usage')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'rp_libre_passage_plp_calculator_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $params = NULL) {
    $form['#action'] = '#rp-calculator-form';

    // Disable caching & HTML5 validation.
    $form['#cache']['max-age'] = 0;
    $form['#attributes']['novalidate'] = 'novalidate';

    $form['#attached'] = [
      'library' => ['rp_libre_passage/plp_calculator'],
    ];

    $status = $this->messenger()->messagesByType(MessengerInterface::TYPE_STATUS);
    if (!empty($status[MessengerInterface::TYPE_STATUS])) {
      $form['status'] = [
        '#markup' => '<div class="well well-success well-lg"><p>' . $status[MessengerInterface::TYPE_STATUS][0] . '</p></div>',
      ];
    }
    if (!empty($this->session->get('errors'))) {
      $form['errors'] = [
        '#markup' => '<div class="well well-danger well-lg"><p>' . $this->t('Attention, des erreurs sont survenues dans le formulaire. Merci de vérifier les champs en rouge.') . '</p></div>',
      ];
    }

    $form['personnal'] = [
      '#type'       => 'fieldset',
      '#attributes' => ['class' => ['fieldset-no-legend']],
      '#title'      => $this->t('Vos données personnelles'),
      '#prefix'     => '<h2>' . $this->t("Calculer vos prestations à l'âge de retraite choisi (estimation).") . '</h2><h3 class="card-title">' . $this->t('Vos données personnelles') . '</h3>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['birthdate']) && $error_msg = $this->session->get('errors')['birthdate']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['personnal']['birthdate'] = [
      '#title'         => $this->t('Votre date de naissance <span class ="text-small text-muted">(jj/mm/aaaa)</span> *'),
      '#placeholder'   => $this->t('jj/mm/aaaa'),
      '#type'          => 'textfield',
      '#attributes'    => [
        'class'         => [''],
        'size'          => '15',
        'datepicker'    => TRUE,
        'datepickerbtn' => TRUE,
      ],
      '#required'      => FALSE,
      '#prefix'        => '<div class="form-group ' . $error_class . '">',
      '#suffix'        => $error . '</div>',
      '#default_value' => $this->session->get('data')['birthdate'],
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['gender']) && $error_msg = $this->session->get('errors')['gender']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['personnal']['civil_state'] = [
      '#title'         => $this->t('Votre état civil *'),
      '#type'          => 'select',
      '#options'       => ['woman' => $this->t('Madame'), 'man' => $this->t('Monsieur')],
      '#required'      => FALSE,
      '#prefix'        => '<div class="form-group ' . $error_class . '">',
      '#suffix'        => $error . '</div>',
      '#default_value' => $this->session->get('data')['civil_state'],
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['civil_status']) && $error_msg = $this->session->get('errors')['civil_status']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['personnal']['civil_status'] = [
      '#type'        => 'radios',
      '#attributes'  => ['title' => $this->t('Marié(e) ou lié(e) par un partenariat enregistré *')],
      '#required'    => FALSE,
      '#options'     => [
        'Oui' => $this->t('Oui'),
        'Non' => $this->t('Non'),
      ],
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['percent']) && $error_msg = $this->session->get('errors')['percent']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $options = [
      '_none' => 'Sélectionner un pourcentage',
      0       => '0%',
      60      => '60%',
      80      => '80%',
      100     => '100%',
    ];
    $form['personnal']['percent'] = [
      '#title'       => $this->t('Pourcentage souhaité de la rente de vieillesse versée au conjoint (ou partenaire enregistré) survivant'),
      '#type'        => 'select',
      '#options'     => $options,
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    $form['libre_passage'] = [
      '#type'       => 'fieldset',
      '#attributes' => ['class' => ['fieldset-no-legend']],
      '#title'      => $this->t('Votre apport de libre passage'),
      '#prefix'     => '<h3 class="card-title">' . $this->t('Votre apport de libre passage') . '</h3>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['amount']) && $error_msg = $this->session->get('errors')['amount']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['libre_passage']['amount'] = [
      '#title'       => $this->t('Montant *'),
      '#type'        => 'textfield',
      '#placeholder' => $this->t('CHF'),
      '#attributes'  => ['size' => 20, 'class' => ['form-chf-numeric text-right']],
      '#required'    => FALSE,
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['payment_date']) && $error_msg = $this->session->get('errors')['payment_date']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['libre_passage']['group_start'] = [
      '#prefix' => '<div class="form-group ' . $error_class . '"><div class="form-control-label">' . $this->t('Date de versement <span class ="text-small text-muted">(jj/mm/aaaa)</span> *') . '</div><div class="input-group">',
      '#suffix' => '</div>' . $error . '</div>',
    ];
    $form['libre_passage']['group_start']['payment_date'] = [
      '#placeholder' => $this->t('jj/mm/aaaa'),
      '#type'        => 'textfield',
      '#attributes'  => [
        'class'         => [''],
        'size'          => '15',
        'datepicker'    => TRUE,
        'datepickerbtn' => TRUE,
      ],
      '#required'    => FALSE,
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['age']) && $error_msg = $this->session->get('errors')['age']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }

    // Get Men ages.
    $options = [];
    $age_men = $this->plpConversionRate->getAges('man');
    asort($age_men);
    foreach ($age_men as $age) {
      $options[$age] = $age;
      $form['#attached']['drupalSettings']['age_men'][] = [
        'value' => $age,
      ];
    }

    // Get Women ages & append it to $options.
    $age_women = $this->plpConversionRate->getAges('woman');
    asort($age_women);
    foreach ($age_women as $age) {
      $options[$age] = $age;
      $form['#attached']['drupalSettings']['age_women'][] = [
        'value' => $age,
      ];
    }

    asort($options);
    $form['libre_passage']['age'] = [
      '#title'       => $this->t('Âge souhaité pour le versement des prestations *'),
      '#type'        => 'select',
      '#required'    => FALSE,
      '#options'     => $options,
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    $form['separator'] = ['#markup' => '<hr />'];

    $form['actions']['submit'] = [
      '#type'        => 'submit',
      '#value'       => $this->t('Calculer'),
      '#attributes'  => ['class' => ['btn-primary pull-right']],
      '#button_type' => 'primary',
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    // TODO Found better solution to inline errors than hack session to.
    $this->session->delete('errors');

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    // TODO Found better solution to inline errors than hack session to
    // Rebuild the form to keep data on error.
    $form_state->setRebuild();
    $errors = [];

    // Save errors in sessions to use it on the form builder
    // TODO Found better solution to inline errors than hack session to.
    $this->session->set('errors', $errors);

    // Assert the birthdate is valid.
    if (!$form_state->getValue('birthdate') || empty($form_state->getValue('birthdate'))) {
      $errors['birthdate'] = $this->t('Votre date de naissance est obligatoire.');
    }
    elseif (\DateTime::createFromFormat('d/m/Y', $form_state->getValue('birthdate')) === FALSE) {
      $errors['birthdate'] = $this->t('Votre date de naissance semble invalide.');
    }

    // Assert the civil_state is valid.
    if (!$form_state->getValue('civil_state') || empty($form_state->getValue('civil_state'))) {
      $errors['civil_state'] = $this->t('Votre état civil est obligatoire.');
    }

    // Assert the civil_status is valid.
    if (!$form_state->getValue('civil_status') || empty($form_state->getValue('civil_status'))) {
      $errors['civil_status'] = $this->t('Merci de saisir le champ Partenariat.');
    }

    // Assert the percent is valid.
    if (!empty($form_state->getValue('civil_status')) && $form_state->getValue('civil_status') == 'Oui') {
      if ($form_state->getValue('percent') == '_none') {
        $errors['percent'] = $this->t('Merci de spécifier un pourcentage si vous êtes en partenariat enregistré.');
      }
    }

    // Assert the amount is valid.
    if (!$form_state->getValue('amount') || empty($form_state->getValue('amount'))) {
      $errors['amount'] = $this->t('Le montant est obligatoire.');
    }

    // Error handler for formatted birthdate.
    if (\DateTime::createFromFormat('d/m/Y', $form_state->getValue('birthdate')) === FALSE) {
      $errors['birthdate'] = $this->t('Le format de la date semble incorrecte.');
    }

    // Error handler for formatted payment_date.
    if (\DateTime::createFromFormat('d/m/Y', $form_state->getValue('payment_date')) === FALSE) {
      $errors['payment_date'] = $this->t('Le format de la date semble incorrecte.');
    }

    // Assert the age is valid.
    if (!$form_state->getValue('age') || empty($form_state->getValue('age'))) {
      $errors['age'] = $this->t("L'âge souhaité pour le versement est obligatoire.");
    }

    // Check we have no error still here and continue.
    if (empty($errors)) {
      // Assert the birthdate and payment_date seems legit.
      $payment_date = \DateTime::createFromFormat('d/m/Y', $form_state->getValue('payment_date'));
      $birthdate = \DateTime::createFromFormat('d/m/Y', $form_state->getValue('birthdate'));
      $today = new DateTime('today');

      // Payment validity only for the current and the previous year.
      $payment_validity = new DateTime('today');
      $payment_validity->modify('1st January Previous Year');
      if ($birthdate > $today) {
        $errors['birthdate'] = $this->t('Votre date de naissance semble erronée.');
      }
      elseif ($payment_date < $payment_validity) {
        $errors['payment_date'] = $this->t('La date de versement doit au moins être le @date.', ['@date' => $payment_validity->format('d/m/Y')]);
      }
      else {
        $age = $birthdate->diff($today)->y;
        $rest = (int) $form_state->getValue('age') - $age;

        // Assert the age is not already passed.
        if ($rest <= 0) {
          $errors['age'] = $this->t("L'âge souahité pour le versement entre en contradiction avec votre date de naissance.");
        }
      }
    }

    // Save errors in sessions to use it on the form builder
    // TODO Found better solution to inline errors than hack session to.
    $this->session->set('errors', $errors);

    // If no error, disable rebuilding form
    // TODO Found better solution to inline errors than hack session to.
    if (empty($this->session->get('errors'))) {
      $form_state->setRebuild(FALSE);
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // TODO Found better solution to inline errors than hack session to.
    if (empty($this->session->get('errors'))) {

      try {
        // Format date for simulator.
        $birthdate = \DateTime::createFromFormat('d/m/Y', $form_state->getValue('birthdate'));
        $payment_date = \DateTime::createFromFormat('d/m/Y', $form_state->getValue('payment_date'));

        // Retrieve the deadline.
        $deadline = $this->plpCalculator->getDeadline($birthdate, (int) $form_state->getValue('age'));

        // Calculate the Capital.
        $capital_raw = $this->plpCalculator->calcCapital($payment_date, $deadline, (float) $form_state->getValue('amount'));
        $capital_formatted = $this->plpCalculator->formatCents($capital_raw);

        // Calculate the Annual pension when single.
        $anPensSingleRaw = $this->plpCalculator->calcAnnualPensionSingle($capital_formatted, $form_state->getValue('civil_state'), (int) $form_state->getValue('age'));
        $anPensSingleFormat = $this->plpCalculator->formatCents($anPensSingleRaw);

        // Calculate the Annual pension on couple.
        $anPensCoupleRaw = $this->plpCalculator->calcAnnualPensionCouple($capital_formatted, $form_state->getValue('civil_state'), (int) $form_state->getValue('age'), (int) $form_state->getValue('percent'));
        $anPensCoupleFormat = $this->plpCalculator->formatCents($anPensCoupleRaw);

        // Calculate the Annual pension of the survivor (on couple)
        $pensSurvivorRaw = $this->plpCalculator->calcSurvivorPension($anPensCoupleFormat, (int) $form_state->getValue('percent'));
        $pensSurvivorFormat = $this->plpCalculator->formatCents($pensSurvivorRaw);

        $data = [
          'birthdate' => $form_state->getValue('birthdate'),
          'civil_state' => $form_state->getValue('civil_state'),
          'civil_status' => $form_state->getValue('civil_status'),
          'percent' => $form_state->getValue('percent'),
          'amount' => $form_state->getValue('amount'),
          'payment_date' => $form_state->getValue('payment_date'),
          'age' => $form_state->getValue('age'),
          'deadline' => $deadline,
          'capital' => $capital_formatted,
          'annual_pension_single' => $anPensSingleFormat,
          'annual_pension_couple' => $anPensCoupleFormat,
          'pension_survivor' => $pensSurvivorFormat,
        ];
        $this->session->set('data', $data);
        $this->session->set('view_result', TRUE);

        $suggestion = $this->twManager->getOneBySuggestion('libre_passage_calculator');
        $entities = NULL;
        if ($suggestion) {
          $entities = $this->twSuggestionUsage->listUsage($suggestion);

          if (!empty($entities)) {
            $form_state->setRedirect('entity.node.canonical', [
              'node' => $entities[0]->id,
            ]);
          }
        }
      }
      catch (\Exception $e) {
        drupal_set_message($this->t('An error occurred and processing did not complete.'), 'error');
      }
    }
  }

}
