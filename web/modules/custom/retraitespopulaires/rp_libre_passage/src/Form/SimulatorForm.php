<?php
/**
* @file
* Contains \Drupal\rp_libre_passage\Form\SimulatorForm.
*/

namespace Drupal\rp_libre_passage\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\user\PrivateTempStoreFactory;
use Drupal\Core\State\StateInterface;

class SimulatorForm extends FormBase {

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
     * Class constructor.
     */
    public function __construct(PrivateTempStoreFactory $private_tempstore, StateInterface $state) {
        $this->state = $state;

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
        $container->get('state')
      );
    }

    /**
    * {@inheritdoc}.
    */
    public function getFormId() {
        return 'rp_libre_passage_simulator_form';
    }

    /**
    * {@inheritdoc}
    */
    public function buildForm(array $form, FormStateInterface $form_state, $params = NULL) {
        $form['#action'] = '#rp-simulator-form';

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

        if( isset($this->session->get('errors')['email']) && $error_msg = $this->session->get('errors')['email'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
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
            '#title'       => t('Votre date de naissance <span class ="text-small text-muted">(jj/mm/aaaa)</span>'),
            '#placeholder' => t('24/12/2016'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 10, 'theme' => $theme],
            '#required'    => true,
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
        $options = array(
            'man'   => t('Homme'),
            'woman' => t('Femme'),
        );
        $form['personnal']['gender'] = array(
            '#title'       => t('Votre genre'),
            '#type'        => 'select',
            '#attributes'  => ['theme' => $theme],
            '#required'    => true,
            '#options'     => $options,
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
        $options = array(
            0 => t('Non'),
            1 => t('Oui'),
        );
        $form['personnal']['civil_status'] = array(
            '#title'       => t('Marié(e) ou lié(e) par un partenariat enregistré'),
            '#type'        => 'select',
            '#attributes'  => ['theme' => $theme],
            '#required'    => true,
            '#options'     => $options,
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
            '_none' => t('Choissisez un pourcentage'),
            0 => '0%',
            60 => '60%',
            80 => '80%',
            100 => '100%',
        );
        $form['personnal']['percent'] = array(
            '#title'       => t('Pourcentage souhaité de la rente de vieillesse versée au conjoint (ou partenaire enregistré) survivant'),
            '#type'        => 'select',
            '#attributes'  => ['theme' => $theme],
            '#required'    => true,
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
            '#title'       => t('Montant'),
            '#type'        => 'textfield',
            '#placeholder' => t('CHF'),
            '#attributes'  => ['size' => 50, 'theme' => $theme, 'class' => array('format text-right')],
            '#required'    => true,
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
        $form['libre_passage']['payment_date'] = array(
            '#title'       => t('Date de versement <span class ="text-small text-muted">(jj/mm/aaaa)</span>'),
            '#placeholder' => t('24/12/2016'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 10, 'theme' => $theme],
            '#required'    => true,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['age']) && $error_msg = $this->session->get('errors')['age'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $options = array('_none' => t('Choissisez un âge'),);
        foreach ($this->state->get('rp_libre_passage.settings.age_man') as $age) {
            $options[$age] = $age;
        }
        foreach ($this->state->get('rp_libre_passage.settings.age_woman') as $age) {
            $options[$age] = $age;
        }
        $form['libre_passage']['age'] = array(
            '#title'       => t('Åge terme pour le versement des prestations'),
            '#type'        => 'select',
            '#attributes'  => ['theme' => $theme],
            '#required'    => true,
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
            $data = array();
            // $form_state->setRedirect('xxx', ['node' => $order->nid->value]);
        }
    }
}
