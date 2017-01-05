<?php
/**
* @file
* Contains \Drupal\rp_contact\Form\ConversionForm.
*/

namespace Drupal\rp_contact\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\user\PrivateTempStoreFactory;
use Drupal\Core\Mail\MailManagerInterface;
use Drupal\Core\State\StateInterface;
use Drupal\rp_mortgage\Service\Rate;
use Drupal\Core\Entity\EntityTypeManagerInterface;

class ConversionForm extends FormBase {

    /**
     * Stores and retrieves temporary data for a given owner
     * @var PrivateTempStoreFactory
     */
    protected $session;

    /**
    * Composes and optionally sends an email message.
    * @var MailManagerInterface
    */
    protected $mail;

    /**
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    protected $state;

    /**
    * Mortage Rate service
    * @var Rate
    */
    protected $rate;

    /**
    * EntityTypeManagerInterface to load Rate
    * @var EntityTypeManagerInterface
    */
    protected $entity_rate;

    /**
     * Class constructor.
     */
    public function __construct(PrivateTempStoreFactory $private_tempstore, MailManagerInterface $mail, StateInterface $state, Rate $rate, EntityTypeManagerInterface $entity) {
        $this->mail        = $mail;
        $this->state       = $state;
        $this->rate        = $rate;
        $this->entity_rate = $entity->getStorage('rp_mortgage_rate');

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
        $container->get('plugin.manager.mail'),
        $container->get('state'),
        $container->get('rp_mortgage.rate'),
        $container->get('entity_type.manager')
      );
    }

    /**
    * {@inheritdoc}.
    */
    public function getFormId() {
        return 'rp_contact_conversion_form';
    }

    /**
    * {@inheritdoc}
    */
    public function buildForm(array $form, FormStateInterface $form_state, $params = NULL) {
        $form['#action'] = '#rp-contact-conversion-form';

        // Disable caching & HTML5 validation
        $form['#cache']['max-age'] = 0;
        $form['#attributes']['novalidate'] = 'novalidate';

        $form['#attached'] = array(
           'library' =>  array('rp_contact/contact_conversion_form'),
       );

        if (isset($params['theme'])) {
            $theme = $params['theme'];
        }

        $status = drupal_get_messages('status');
        if (!empty($status['status'])) {
            $form['status'] = array(
                '#markup' => '<div class="well well-success well-lg"><p class="m-b-0">'.$status['status'][0].'</p></div>',
            );
        }
        if (!empty($this->session->get('errors'))) {
            $form['errors'] = array(
                '#markup' => '<div class="well well-danger well-lg"><p class="m-b-0">'.t('Attention, des erreurs sont survenues dans le formulaire. Merci de vérifier les champs en rouge.').'</p></div>',
            );
        }

        $form['conversion'] = array(
          '#type'       => 'fieldset',
          '#attributes' => ['class' => array('fieldset-no-legend fieldset-bordered')],
          '#title'      => t('Vos informations'),
          '#prefix'     => '<h3>'.t('Vos informations').'</h3>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['title']) && $error_msg = $this->session->get('errors')['title'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['conversion']['title'] = array(
            '#type'        => 'radios',
            '#attributes'  => ['theme' => $theme, 'title' => t('Votre titre *'), 'required' => false],
            '#required'    => false,
            '#options'     => array(
                'Madame'   => t('Madame'),
                'Monsieur' => t('Monsieur'),
                'Société'  => t('Société'),
            ),
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        $form['conversion']['policy'] = array(
            '#title'       => t('Votre numéro de prêt'),
            '#placeholder' => t('123456789'),
            '#type'        => 'textfield',
            '#attributes'  => ['theme' => $theme],
            '#prefix'      => '<div class="form-group">',
            '#suffix'      => '</div>',
        );

        $form['conversion']['row_1'] = array(
            '#prefix'      => '<div class="row">',
            '#suffix'      => '</div>',
        );

        // Get readonly
        $readonly = '';
        if (isset($form_state->getUserInput()['title']) && $form_state->getUserInput()['title'] == 'Société') {
            $readonly = 'readonly';
        }
        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['firstname']) && $error_msg = $this->session->get('errors')['firstname'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['conversion']['row_1']['firstname'] = array(
            '#title'       => t('Votre prénom *'),
            '#placeholder' => t('Alain'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 25, 'theme' => $theme],
            '#prefix'      => '<div class="col-xs-12 col-md-6"><div class="form-group '.$error_class.' '.$readonly.'">',
            '#suffix'      => $error. '</div></div>',
        );
        if (!empty($readonly)) {
            $form['conversion']['row_1']['firstname']['#attributes']['readonly'] = $readonly;
        }

        // Get readonly
        $readonly = '';
        if (isset($form_state->getUserInput()['title']) && $form_state->getUserInput()['title'] == 'Société') {
            $readonly = 'readonly';
        }
        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['lastname']) && $error_msg = $this->session->get('errors')['lastname'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['conversion']['row_1']['lastname'] = array(
            '#title'       => t('Votre nom de famille *'),
            '#placeholder' => t('Rochat'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 24, 'theme' => $theme],
            '#prefix'      => '<div class="col-xs-12 col-md-6"><div class="form-group '.$error_class.' '.$readonly.'">',
            '#suffix'      => $error. '</div></div>',
        );
        if (!empty($readonly)) {
            $form['conversion']['row_1']['lastname']['#attributes']['readonly'] = $readonly;
        }

        // Get readonly
        $readonly = '';
        if (isset($form_state->getUserInput()['title']) && $form_state->getUserInput()['title'] != 'Société') {
            $readonly = 'readonly';
        }
        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['company']) && $error_msg = $this->session->get('errors')['company'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['conversion']['company'] = array(
            '#title'       => t('Votre raison sociale'),
            '#placeholder' => t('Retraites Populaires'),
            '#type'        => 'textfield',
            '#attributes'  => ['theme' => $theme],
            '#prefix'      => '<div class="form-group '.$error_class.' '.$readonly.'">',
            '#suffix'      => $error. '</div>',
        );
        if (!empty($readonly)) {
            $form['conversion']['company']['#attributes']['readonly'] = $readonly;
        }

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['email']) && $error_msg = $this->session->get('errors')['email'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['conversion']['email'] = array(
            '#title'       => t('Votre e-mail *'),
            '#placeholder' => t('alain.rochat@retraitespopulaires.ch'),
            '#type'        => 'textfield',
            '#attributes'  => ['theme' => $theme],
            '#required'    => false,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['phone']) && $error_msg = $this->session->get('errors')['phone'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['conversion']['phone'] = array(
            '#title'       => t('Votre numéro de téléphone *'),
            '#placeholder' => t('079 123 45 67'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 20, 'theme' => $theme],
            '#required'    => false,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error.'</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['address']) && $error_msg = $this->session->get('errors')['address'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['conversion']['address'] = array(
            '#title'       => t('Votre adresse *'),
            '#placeholder' => t('Chemin de l\'Avenir 1'),
            '#type'        => 'textfield',
            '#attributes'  => ['theme' => $theme],
            '#required'    => false,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        $form['conversion']['row_2'] = array(
            '#prefix'      => '<div class="row">',
            '#suffix'      => '</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['zip']) && $error_msg = $this->session->get('errors')['zip'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['conversion']['row_2']['zip'] = array(
            '#title'       => t('Votre code postal (NPA) *'),
            '#placeholder' => t('1000'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 10, 'theme' => $theme],
            '#required'    => false,
            '#prefix'      => '<div class="col-xs-12 col-md-6"><div class="form-group '.$error_class.'">',
            '#suffix'      => $error.'</div></div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['city']) && $error_msg = $this->session->get('errors')['city'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['conversion']['row_2']['city'] = array(
            '#title'       => t('Votre ville *'),
            '#placeholder' => t('Lausanne'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 24, 'theme' => $theme],
            '#required'    => false,
            '#prefix'      => '<div class="col-xs-12 col-md-6"><div class="form-group '.$error_class.'">',
            '#suffix'      => $error.'</div></div>',
        );

        $form['building'] = array(
          '#type'       => 'fieldset',
          '#attributes' => ['class' => array('fieldset-no-legend fieldset-bordered')],
          '#title'      => t('Votre bien'),
          '#prefix'     => '<h3>'.t('Votre bien').'</h3>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['building_address']) && $error_msg = $this->session->get('errors')['building_address'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['building']['building_address'] = array(
            '#title'       => t('Adresse de votre bien *'),
            '#placeholder' => t('Chemin de l\'Avenir 1'),
            '#type'        => 'textfield',
            '#attributes'  => ['theme' => $theme],
            '#required'    => false,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        $form['building']['row_2'] = array(
            '#prefix'      => '<div class="row">',
            '#suffix'      => '</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['building_zip']) && $error_msg = $this->session->get('errors')['building_zip'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['building']['row_2']['building_zip'] = array(
            '#title'       => t('Code postal (NPA) de votre bien *'),
            '#placeholder' => t('1000'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 10, 'theme' => $theme],
            '#required'    => false,
            '#prefix'      => '<div class="col-xs-12 col-md-6"><div class="form-group '.$error_class.'">',
            '#suffix'      => $error.'</div></div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['building_city']) && $error_msg = $this->session->get('errors')['building_city'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['building']['row_2']['building_city'] = array(
            '#title'       => t('Ville de votre bien *'),
            '#placeholder' => t('Lausanne'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 24, 'theme' => $theme],
            '#required'    => false,
            '#prefix'      => '<div class="col-xs-12 col-md-6"><div class="form-group '.$error_class.'">',
            '#suffix'      => $error.'</div></div>',
        );

        $form['more'] = array(
          '#type'       => 'fieldset',
          '#attributes' => ['class' => array('fieldset-no-legend fieldset-bordered')],
          '#title'      => t('Votre demande'),
          '#prefix'     => '<h3>'.t('Votre demande de conversion').'</h3>',
        );

        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['amount']) && $error_msg = $this->session->get('errors')['amount'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['more']['amount'] = array(
            '#title'       => t('Le montant *'),
            '#placeholder' => t('CHF'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 20, 'theme' => $theme, 'class' => array('form-chf-numeric', 'text-right')],
            '#required'    => false,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error.'</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['rate']) && $error_msg = $this->session->get('errors')['rate'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $rates = $this->rate->getRates('Prêts hypothécaires formulaire');
        $options = array();
        foreach ($rates as $rate) {
            // remove empty lines (= first rate not defined)
            if ($rate->getFirstRate() && $rate->getFirstRate() != 0.0) {
                $options[$rate->id->value] = $rate->getName() . ' ('.number_format($rate->getFirstRate(), 2).')';
            }
        }
        $form['more']['rate'] = array(
            '#title'       => t('Le taux *'),
            '#type'        => 'select',
            '#attributes'  => ['theme' => $theme],
            '#required'    => false,
            '#options'     => $options,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error.'</div>',
        );

        $form['more']['remarque'] = array(
            '#title'       => t('Remarque'),
            '#type'        => 'textarea',
            '#attributes'  => ['cols' => 59, 'theme' => $theme],
        );

        $form['separator'] = array( '#markup' => '<hr />' );

        $form['actions']['submit'] = array(
            '#type'        => 'submit',
            '#value'       => t('Envoyer'),
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

        // Assert the Title is valid
        if (!$form_state->getValue('title') || empty($form_state->getValue('title'))) {
            $errors['title'] = t('Votre titre est obligatoire.');
        }

        if ($form_state->getValue('title') == 'Monsieur' || $form_state->getValue('title') == 'Madame') {
            // Assert the firstname is valid
            if (!$form_state->getValue('firstname') || empty($form_state->getValue('firstname'))) {
                $errors['firstname'] = t('Le prénom est obligatoire.');
            }

            // Assert the lastname is valid
            if (!$form_state->getValue('lastname') || empty($form_state->getValue('lastname'))) {
                $errors['lastname'] = t('Le nom est obligatoire.');
            }
        } else {
            // Assert the lastname is valid
            if (!$form_state->getValue('company') || empty($form_state->getValue('company'))) {
                $errors['company'] = t('Votre raison sociale est obligatoire.');
            }
        }

        // Assert the email is valid
        if (!$form_state->getValue('email') || !filter_var($form_state->getValue('email'), FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = t('Cette adresse e-mail semble invalide.');
        }

        // Assert the birthdate is valid
        if (!$form_state->getValue('phone') || empty($form_state->getValue('phone'))) {
            $errors['phone'] = t('Votre date de naissance est obligatoire.');
        }

        // Assert the address is valid
        if (!$form_state->getValue('address') || empty($form_state->getValue('address'))) {
            $errors['address'] = t('Votre adresse est obligatoire.');
        }

        // Assert the zip is valid
        if (!$form_state->getValue('zip') || empty($form_state->getValue('zip'))) {
            $errors['zip'] = t('Votre code postal est obligatoire.');
        }

        // Assert the city is valid
        if (!$form_state->getValue('city') || empty($form_state->getValue('city'))) {
            $errors['city'] = t('Votre ville est obligatoire.');
        }

        // Assert the address is valid
        if (!$form_state->getValue('building_address') || empty($form_state->getValue('building_address'))) {
            $errors['building_address'] = t('L\'adresse de votre bien est obligatoire.');
        }

        // Assert the zip is valid
        if (!$form_state->getValue('building_zip') || empty($form_state->getValue('building_zip'))) {
            $errors['building_zip'] = t('Le code postal de votre bien est obligatoire.');
        }

        // Assert the city is valid
        if (!$form_state->getValue('building_city') || empty($form_state->getValue('building_city'))) {
            $errors['building_city'] = t('La ville de votre bien est obligatoire.');
        }

        // Assert the rate is valid
        if (!$form_state->getValue('rate') || empty($form_state->getValue('rate'))) {
            $errors['rate'] = t('Le choix du taux est obligatoire.');
        }

        // Assert the amount is valid
        if (!$form_state->getValue('amount') || empty($form_state->getValue('amount'))) {
            $errors['amount'] = t('Le montant est obligatoire.');
        }

        // Save errors in sessions to use it on the form builder
        // TODO Found better solution to inline errors than hack session to
        $this->session->set('errors', $errors);

        // If no error, disable reconversion form
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
            $rate = $this->entity_rate->load($form_state->getValue('rate'));
            $data = array(
                'title'            => $form_state->getValue('title'),
                'policy'           => $form_state->getValue('policy'),
                'firstname'        => $form_state->getValue('firstname'),
                'lastname'         => $form_state->getValue('lastname'),
                'company'          => $form_state->getValue('company'),
                'email'            => $form_state->getValue('email'),
                'phone'            => $form_state->getValue('phone'),
                'address'          => $form_state->getValue('address'),
                'zip'              => $form_state->getValue('zip'),
                'city'             => $form_state->getValue('city'),
                'building_address' => $form_state->getValue('building_address'),
                'building_zip'     => $form_state->getValue('building_zip'),
                'building_city'    => $form_state->getValue('building_city'),
                'rate'             => $rate,
                'amount'           => $form_state->getValue('amount'),
                'remarque'         => $form_state->getValue('remarque'),
            );

            // Send to admin
            $to = preg_replace('/\s+/', ' ', $this->state->get('rp_contact.settings.page.conversion')['receivers']);
            $to = str_replace(';', ',', $to);
            $reply = $form_state->getValue('email');
            $this->mail->mail('rp_contact', 'contact_conversion', $to, 'fr', $data, $reply);

            drupal_set_message(t('Merci @firstname @lastname pour votre demande. Nous allons rapidement traiter votre demande et vous recontacter à l\'adresse @email ou par téléphone au @phone.', [
                '@firstname' => $form_state->getValue('firstname'),
                '@lastname'  => $form_state->getValue('lastname'),
                '@email'     => $form_state->getValue('email'),
                '@phone'     => $form_state->getValue('phone'),
            ]));
        }
    }
}
