<?php
/**
* @file
* Contains \Drupal\rp_libre_passage\Form\PLPContactForm.
*/

namespace Drupal\rp_libre_passage\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use \libphonenumber\PhoneNumberUtil;
use \libphonenumber\PhoneNumberFormat;

use Drupal\user\PrivateTempStoreFactory;
use Drupal\Core\Mail\MailManagerInterface;

class PLPContactForm extends FormBase {

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
     * Class constructor.
     */
    public function __construct(PrivateTempStoreFactory $private_tempstore, MailManagerInterface $mail) {
        $this->mail = $mail;

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
        $container->get('plugin.manager.mail')
      );
    }

    /**
    * {@inheritdoc}.
    */
    public function getFormId() {
        return 'rp_libre_passage_plp_contact_form';
    }

    /**
    * {@inheritdoc}
    */
    public function buildForm(array $form, FormStateInterface $form_state, $params = NULL) {
        $form['#action'] = '#rp-plp-contact-form';

        if (isset($params['theme'])) {
            $theme = $params['theme'];
        }

        $status = drupal_get_messages('status');
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

        // A hidden field can't be altered, Drupal assert it
        $form['birthdate'] = array(
            '#type'     => 'hidden',
            '#value'    => $params['node']->nid->value,
            '#required' => true
        );

        $form = array(
          '#type'       => 'fieldset',
          '#attributes' => ['class' => array('fieldset-no-legend')],
          '#title'      => t('Etes-vous intéressé(e)'),
          '#prefix'     => '<h3>'.t('Etes-vous intéressé(e)').'</h3>',
        );

        $form['row_1'] = array(
            '#prefix'      => '<div class="row">',
            '#suffix'      => '</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['firstname']) && $error_msg = $this->session->get('errors')['firstname'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['row_1']['firstname'] = array(
            '#title'       => t('Votre prénom'),
            '#placeholder' => t('John'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 25, 'theme' => $theme],
            '#required'    => true,
            '#prefix'      => '<div class="col-xs-12 col-md-6"><div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div></div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['lastname']) && $error_msg = $this->session->get('errors')['lastname'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['row_1']['lastname'] = array(
            '#title'       => t('Votre nom de famille'),
            '#placeholder' => t('Doe'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 24, 'theme' => $theme],
            '#required'    => true,
            '#prefix'      => '<div class="col-xs-12 col-md-6"><div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div></div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['email']) && $error_msg = $this->session->get('errors')['email'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['email'] = array(
            '#title'       => t('Votre e-mail'),
            '#placeholder' => t('john.doe@retraitespopulaires.ch'),
            '#type'        => 'email',
            '#attributes'  => ['theme' => $theme],
            '#required'    => true,
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
        $form['phone'] = array(
            '#title'       => t('Votre numéro de téléphone'),
            '#placeholder' => t('079 123 45 67'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 20, 'theme' => $theme],
            '#required'    => true,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['message']) && $error_msg = $this->session->get('errors')['message'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['message'] = array(
            '#title'       => t('Votre message'),
            '#type'        => 'textarea',
            '#required'    => true,
            '#attributes'  => ['cols' => 59, 'theme' => $theme],
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
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


        // Assert the firstname is valid
        if (!$form_state->getValue('firstname') || empty($form_state->getValue('firstname'))) {
            $errors['firstname'] = t('Le prénom est obligatoire.');
        }

        // Assert the lastname is valid
        if (!$form_state->getValue('lastname') || empty($form_state->getValue('lastname'))) {
            $errors['lastname'] = t('Le nom est obligatoire.');
        }

        // Assert the email is valid
        if (!$form_state->getValue('email') || !filter_var($form_state->getValue('email'), FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = t('Cette adresse e-mail semble invalide.');
        }

        // Assert the phone is valid
        if (!$form_state->getValue('phone') || empty($form_state->getValue('phone'))) {
            $errors['phone'] = t('Le numéro de téléphone est obligatoire.');
        }else {
            try {
                $phoneUtil = PhoneNumberUtil::getInstance();
                $phoneUtil->parse($form_state->getValue('phone'), 'CH');
            } catch (\Exception $e) {
                $errors['phone'] = t('Votre numéro de téléphone est invalide.');
            }
        }

        // Assert the message is valid
        if (!$form_state->getValue('message') || empty($form_state->getValue('message'))) {
            $errors['message'] = t('Le message est obligatoire.');
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
            $data = array(
                'firstname' => $form_state->getValue('firstname'),
                'lastname'  => $form_state->getValue('lastname'),
                'email'     => $form_state->getValue('email'),
                'phone'     => $form_state->getValue('phone'),
                'message'   => $form_state->getValue('message'),
            );

            // Send to admin
            $to = 'dev@antistatique.net';
            $reply = $form_state->getValue('email');
            $this->mail->mail('rp_libre_passage', 'contact', $to, 'fr', $data, $reply);

            drupal_set_message(t('Merci @firstname @lastname pour votre demande. Nous allons rapidement traitez votre demander et vous recontactez à l\'adresse @email ou par téléphone au @phone.', [
                '@firstname' => $form_state->getValue('firstname'),
                '@lastname'  => $form_state->getValue('lastname'),
                '@email'     => $form_state->getValue('email'),
                '@phone'     => $form_state->getValue('phone'),
            ]));
        }
    }
}
