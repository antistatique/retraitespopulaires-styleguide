<?php
/**
* @file
* Contains \Drupal\rp_libre_passage\Form\PLPCalculatorForm.
*/

namespace Drupal\rp_libre_passage\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use \DateTime;

use Drupal\user\PrivateTempStoreFactory;
use Drupal\Core\State\StateInterface;
use Drupal\rp_libre_passage\Service\PLPCalculator;

class PLPCalculatorForm extends FormBase {

    /**
     * Stores and retrieves temporary data for a given owner
     * @var PrivateTempStoreFactory
     */
    protected $session;

    /**
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    protected $state;

    /**
    * The PLP Calculator (Simulateur de Libre Passage).
    * @var PLPCalculator
    */
    protected $plp_calculator;

    /**
     * Class constructor.
     */
    public function __construct(PrivateTempStoreFactory $private_tempstore, StateInterface $state, PLPCalculator $plp_calculator) {
        $this->state = $state;
        $this->plp_calculator = $plp_calculator;

        // Init session
        // TODO Found better solution to inline errors than hack session to
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
        $container->get('rp_libre_passage.plp_calculator')
      );
    }

    /**
    * {@inheritdoc}.
    */
    public function getFormId() {
        return 'rp_libre_passage_plp_calculator_form';
    }

    /**
    * {@inheritdoc}
    */
    public function buildForm(array $form, FormStateInterface $form_state, $params = NULL) {
        $form['#action'] = '#rp-calculator-form';

        // Disable caching & HTML5 validation
        $form['#cache']['max-age'] = 0;
        $form['#attributes']['novalidate'] = 'novalidate';

        $form['#attached'] = array(
            'library' =>  array('rp_libre_passage/plp_calculator'),
        );

        $theme = '';
        if (isset($params['theme'])) {
            $theme = $params['theme'];
        }

        $status = drupal_get_messages('status', false);
        if (!empty($status['status'])) {
            $form['status'] = array(
                '#markup' => '<div class="well well-success well-lg"><p>'.$status['status'][0].'</p></div>',
            );
        }
        if (!empty($this->session->get('errors'))) {
            $form['errors'] = array(
                '#markup' => '<div class="well well-danger well-lg"><p>'.t('Attention, des erreurs sont subvenues dans le formulaire. Merci de vérifier les champs en rouge.').'</p></div>',
            );
        }

        $form['personnal'] = array(
          '#type'       => 'fieldset',
          '#attributes' => ['class' => array('fieldset-no-legend', 'fieldset-bordered')],
          '#title'      => t('Vos données personnelles'),
          '#prefix'     => '<h3>'.t('Vos données personnelles').'</h3>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['birthdate']) && $error_msg = $this->session->get('errors')['birthdate'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['personnal']['birthdate'] = array(
            '#title'       => t('Votre date de naissance <span class ="text-small text-muted">(jj/mm/aaaa)</span> *'),
            '#placeholder' => t('24/12/2016'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 10, 'theme' => $theme],
            '#required'    => false,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['gender']) && $error_msg = $this->session->get('errors')['gender'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['personnal']['civil_state'] = array(
            '#title'       => t('Votre état civil *'),
            '#type'        => 'select',
            '#attributes'  => ['theme' => $theme],
            '#options'     => array('woman' => t('Madame'), 'man' => t('Monsieur')),
            '#required'    => false,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['civil_status']) && $error_msg = $this->session->get('errors')['civil_status'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['personnal']['civil_status'] = array(
            '#type'        => 'radios',
            '#attributes'  => ['theme' => $theme, 'title' => t('Marié(e) ou lié(e) par un partenariat enregistré *')],
            '#required'    => false,
            '#options'     => array(
                'Oui' => t('Oui'),
                'Non' => t('Non')
            ),
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['percent']) && $error_msg = $this->session->get('errors')['percent'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $options = array(
            0   => '0%',
            60  => '60%',
            80  => '80%',
            100 => '100%',
        );
        $form['personnal']['percent'] = array(
            '#title'       => t('Pourcentage souhaité de la rente de vieillesse versée au conjoint (ou partenaire enregistré) survivant'),
            '#type'        => 'select',
            '#attributes'  => ['theme' => $theme],
            '#options'     => $options,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        $form['libre_passage'] = array(
          '#type'       => 'fieldset',
          '#attributes' => ['class' => array('fieldset-no-legend', 'fieldset-bordered')],
          '#title'      => t('Votre apport de libre passage'),
          '#prefix'     => '<h3>'.t('Votre apport de libre passage').'</h3>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['amount']) && $error_msg = $this->session->get('errors')['amount'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['libre_passage']['amount'] = array(
            '#title'       => t('Montant *'),
            '#type'        => 'textfield',
            '#placeholder' => t('CHF'),
            '#attributes'  => ['size' => 20, 'theme' => $theme, 'class' => array('form-chf-numeric text-right')],
            '#required'    => false,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['payment_date']) && $error_msg = $this->session->get('errors')['payment_date'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['libre_passage']['group_start'] = array(
            '#prefix' => '<div class="form-group '.$error_class.'"><div class="label">'. t('Date de versement <span class ="text-small text-muted">(jj/mm/aaaa)</span> *') . '</div><div class="input-group">',
            '#suffix' => '</div>'.$error.'</div>',
        );
        $form['libre_passage']['group_start']['payment_date'] = array(
            '#placeholder' => t('24/12/2016'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 15, 'theme' => $theme, 'class' => array('datepicker')],
            '#required'    => false,
        );
        $form['libre_passage']['group_start']['picker'] = array(
            '#prefix' => '<span class="input-group-btn no-events"><div class="btn btn-default-invert btn-icon">',
            '#markup' => '<i class="retraitespopulaires-icon retraitespopulaires-icon-calendar text-'.$theme.'"></i>',
            '#suffix' => '</div></span>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['age']) && $error_msg = $this->session->get('errors')['age'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $options = array();
        foreach (explode(';',$this->state->get('rp_libre_passage.settings.age_men')) as $age) {
            $options[$age] = $age;
            $form['#attached']['drupalSettings']['age_men'][] = array(
                'value' => $age,
            );
        }
        foreach (explode(';',$this->state->get('rp_libre_passage.settings.age_women')) as $age) {
            $options[$age] = $age;
            $form['#attached']['drupalSettings']['age_women'][] = array(
                'value' => $age,
            );
        }
        asort($options);
        $form['libre_passage']['age'] = array(
            '#title'       => t('Âge souhaité pour le versement des prestations *'),
            '#type'        => 'select',
            '#attributes'  => ['theme' => $theme],
            '#required'    => false,
            '#options'     => $options,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        $form['separator'] = array( '#markup' => '<hr />' );

        $form['actions']['submit'] = array(
            '#type'        => 'submit',
            '#value'       => t('Calculer'),
            '#attributes'  => ['class' => array('btn-primary pull-right'), 'theme' => $theme],
            '#button_type' => 'primary',
            '#prefix'      => '<div class="form-group">',
            '#suffix'      => '</div>',
        );

        // TODO Found better solution to inline errors than hack session to
        $this->session->delete('errors');

        return $form;
    }

    /**
    * {@inheritdoc}
    */
    public function validateForm(array &$form, FormStateInterface $form_state) {
        // TODO Found better solution to inline errors than hack session to
        // Rebuild the form to keep data on error
        $form_state->setRebuild();
        $errors = array();

        // Save errors in sessions to use it on the form builder
        // TODO Found better solution to inline errors than hack session to
        $this->session->set('errors', $errors);

        // Assert the birthdate is valid
        if (!$form_state->getValue('birthdate') || empty($form_state->getValue('birthdate'))) {
            $errors['birthdate'] = t('Votre date de naissance est obligatoire.');
        } else if (\DateTime::createFromFormat('d/m/Y', $form_state->getValue('birthdate')) === false) {
            $errors['birthdate'] = t('Votre date de naissance semble invalide.');
        }

        // Assert the civil_state is valid
        if (!$form_state->getValue('civil_state') || empty($form_state->getValue('civil_state'))) {
            $errors['civil_state'] = t('Votre état civil est obligatoire.');
        }

        // Assert the civil_status is valid
        if (!$form_state->getValue('civil_status') || empty($form_state->getValue('civil_status'))) {
            $errors['civil_status'] = t('Votre partenariat obligatoire.');
        }

        // Assert the percent is valid
        if (!empty($form_state->getValue('civil_status')) && $form_state->getValue('civil_status') == 'Oui') {
            if (!$form_state->getValue('percent')) {
                $errors['percent'] = t('Le pourcentage souhaité est obligatoire.');
            }
        }

        // Assert the amount is valid
        if (!$form_state->getValue('amount') || empty($form_state->getValue('amount'))) {
            $errors['amount'] = t('Le montant est obligatoire.');
        }

        // Assert the payment_date is valid
        if (!$form_state->getValue('payment_date') || empty($form_state->getValue('payment_date'))) {
            $errors['payment_date'] = t('La date de versement est obligatoire.');
        } else if (\DateTime::createFromFormat('d/m/Y', $form_state->getValue('payment_date')) === false) {
            $errors['payment_date'] = t('La date de versement semble invalide.');
        }

        // Assert the birthdate and payment_date seems legit
        if (
            $payment_date = \DateTime::createFromFormat('d/m/Y', $form_state->getValue('payment_date'))
            &&
            $birthdate = \DateTime::createFromFormat('d/m/Y', $form_state->getValue('birthdate'))
        ) {
            $today = new DateTime('today');

            if ($birthdate > $today) {
                $errors['birthdate'] = t('Votre date de naissance semble erronée.');
            }else {
                $age   = $birthdate->diff($today)->y;
                $rest  = $form_state->getValue('age') - $age;

                // Assert the age is not already passed
                if ($rest <= 0 ) {
                    $errors['age'] = t('L\'âge souahité pour le versement entre en contradiction avec votre date de naissance.');
                }
            }
        }

        // Assert the age is valid
        if (!$form_state->getValue('age') || empty($form_state->getValue('age'))) {
            $errors['age'] = t('L\'âge souhaité pour le versement est obligatoire.');
        }

        // Save errors in sessions to use it on the form builder
        // TODO Found better solution to inline errors than hack session to
        $this->session->set('errors', $errors);

        // If no error, disable rebuilding form
        // TODO Found better solution to inline errors than hack session to
        if (empty($this->session->get('errors'))) {
            $form_state->setRebuild(false);
        }
    }

    /**
    * {@inheritdoc}
    */
    public function submitForm(array &$form, FormStateInterface $form_state) {
        // TODO Found better solution to inline errors than hack session to
        if (empty($this->session->get('errors'))) {

            try {
                // Format date for simulator
                $birthdate = \DateTime::createFromFormat('d/m/Y', $form_state->getValue('birthdate'));
                $payment_date = \DateTime::createFromFormat('d/m/Y', $form_state->getValue('payment_date'));

                // Retrieve the deadline
                $deadline = $this->plp_calculator->getDeadline($birthdate, (int)$form_state->getValue('age'));

                // Calculate the Capital
                $capital_raw = $this->plp_calculator->calcCapital($payment_date, $deadline, (float)$form_state->getValue('amount'));
                $capital_formatted = $this->plp_calculator->formatCents($capital_raw);

                // Calculate the Annual pension when single
                $annual_pension_single_raw = $this->plp_calculator->calcAnnualPensionSingle($capital_formatted, $form_state->getValue('civil_state'), (int)$form_state->getValue('age'));
                $annual_pension_single_formatted = $this->plp_calculator->formatCents($annual_pension_single_raw);

                // Calculate the Annual pension on couple
                $annual_pension_couple_raw = $this->plp_calculator->calcAnnualPensionCouple($capital_formatted, $form_state->getValue('civil_state'), (int)$form_state->getValue('age'), (int)$form_state->getValue('percent'));
                $annual_pension_couple_formatted = $this->plp_calculator->formatCents($annual_pension_couple_raw);

                // Calculate the Annual pension of the survivor (on couple)
                $pension_survivor_raw = $this->plp_calculator->calcSurvivorPension($annual_pension_couple_formatted, (int)$form_state->getValue('percent'));
                $pension_survivor_formatted = $this->plp_calculator->formatCents($pension_survivor_raw);

                $data = array(
                    'birthdate'             => $form_state->getValue('birthdate'),
                    'civil_state'           => $form_state->getValue('civil_state'),
                    'civil_status'          => $form_state->getValue('civil_status'),
                    'percent'               => $form_state->getValue('percent'),
                    'amount'                => $form_state->getValue('amount'),
                    'payment_date'          => $form_state->getValue('payment_date'),
                    'age'                   => $form_state->getValue('age'),
                    'deadline'              => $deadline,
                    'capital'               => $capital_formatted,
                    'annual_pension_single' => $annual_pension_single_formatted,
                    'annual_pension_couple' => $annual_pension_couple_formatted,
                    'pension_survivor'      => $pension_survivor_formatted,
                );
                $this->session->set('data', $data);

                $form_state->setRedirect('entity.node.canonical', [
                    'node' =>  $this->state->get('rp_libre_passage.settings.page.calculator')['nid']
                ]);
            } catch (\Exception $e) {
                drupal_set_message(t('An error occurred and processing did not complete.'), 'error');
            }
        }
    }
}
