<?php
/**
* @file
* Contains \Drupal\rp_contact\Form\GlobalContactForm.
*/

namespace Drupal\rp_contact\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use \libphonenumber\PhoneNumberUtil;
use \libphonenumber\PhoneNumberFormat;

use Drupal\user\PrivateTempStoreFactory;
use Drupal\Core\Mail\MailManagerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\State\StateInterface;

class GlobalContactForm extends FormBase {

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
    * EntityTypeManagerInterface to load Nodes
    * @var EntityTypeManagerInterface
    */
    protected $entity_node;

    /**
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    protected $state;

    /**
     * Class constructor.
     */
    public function __construct(PrivateTempStoreFactory $private_tempstore, MailManagerInterface $mail, EntityTypeManagerInterface $entity, StateInterface $state) {
        $this->entity_node = $entity->getStorage('node');
        $this->mail        = $mail;
        $this->state       = $state;

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
        $container->get('entity_type.manager'),
        $container->get('state')
      );
    }

    /**
    * {@inheritdoc}.
    */
    public function getFormId() {
        return 'rp_contact_main_form';
    }

    /**
    * {@inheritdoc}
    */
    public function buildForm(array $form, FormStateInterface $form_state, $params = NULL) {
        $form['#action'] = '#rp-contact-main-form';

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
        $form['node'] = array(
            '#type'     => 'hidden',
            '#value'    => $params['node']->nid->value,
            '#required' => true
        );

        $form['personnal'] = array(
          '#type'       => 'fieldset',
          '#attributes' => ['class' => array('fieldset-no-legend')],
          '#title'      => t('Vos informations'),
          '#prefix'     => '<h3>'.t('Vos informations').'</h3>',
        );

        $form['personnal']['row_1'] = array(
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
        $form['personnal']['row_1']['firstname'] = array(
            '#title'       => t('Votre prénom'),
            '#placeholder' => t('John'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 25],
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
        $form['personnal']['row_1']['lastname'] = array(
            '#title'       => t('Votre nom de famille'),
            '#placeholder' => t('Doe'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 24],
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
        $form['personnal']['email'] = array(
            '#title'       => t('Votre e-mail'),
            '#placeholder' => t('john.doe@retraitespopulaires.ch'),
            '#type'        => 'email',
            '#required'    => true,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
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
            '#attributes'  => array('size' => 10),
            '#required'    => true,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        $form['personnal']['address'] = array(
            '#title'       => t('Votre adresse'),
            '#placeholder' => t('Ch. des pinçons 12'),
            '#type'        => 'textfield',
            '#required'    => true,
            '#prefix'      => '<div class="form-group">',
            '#suffix'      => '</div>',
        );

        $form['personnal']['row_2'] = array(
            '#prefix'      => '<div class="row">',
            '#suffix'      => '</div>',
        );

        $form['personnal']['row_2']['zip'] = array(
            '#title'       => t('Votre code postal / NIP'),
            '#placeholder' => t('1000'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 10],
            '#prefix'      => '<div class="col-xs-12 col-md-6"><div class="form-group">',
            '#suffix'      => '</div></div>',
        );

        $form['personnal']['row_2']['city'] = array(
            '#title'       => t('Votre ville'),
            '#placeholder' => t('Lausanne'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 24],
            '#prefix'      => '<div class="col-xs-12 col-md-6"><div class="form-group">',
            '#suffix'      => '</div></div>',
        );


        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['phone']) && $error_msg = $this->session->get('errors')['phone'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['personnal']['phone'] = array(
            '#title'       => t('Votre numéro de téléphone'),
            '#placeholder' => t('079 123 45 67'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 20],
            '#required'    => true,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        $form['message'] = array(
          '#type'       => 'fieldset',
          '#attributes' => ['class' => array('fieldset-no-legend')],
          '#title'      => t('Votre demande'),
          '#prefix'     => '<h3>'.t('Votre demande').'</h3>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['subject']) && $error_msg = $this->session->get('errors')['subject'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $options = array();
        $services = explode(PHP_EOL, $this->state->get('rp_contact.settings.receivers'));
        foreach ($services as $value) {
            $part = explode('|', $value);
            $options[$part[0]] = $part[1];
        }
        $form['message']['subject'] = array(
            '#title'    => t('Sujet de votre demande'),
            '#type'     => 'select',
            '#required' => true,
            '#prefix'   => '<div class="form-group '.$error_class.'">',
            '#suffix'   => $error. '</div>',
            '#options'  => $options,
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['message']) && $error_msg = $this->session->get('errors')['message'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['message']['message'] = array(
            '#title'       => t('Votre message'),
            '#type'        => 'textarea',
            '#required'    => true,
            '#attributes'  => ['cols' => 59],
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        $form['separator'] = array( '#markup' => '<hr />' );

        $form['actions']['submit'] = array(
            '#type'        => 'submit',
            '#value'       => t('Envoyer'),
            '#attributes'  => ['class' => array('btn-primary pull-right')],
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

        // Assert the birthdate is valid
        if (!$form_state->getValue('birthdate') || empty($form_state->getValue('birthdate'))) {
            $errors['birthdate'] = t('Votre date de naissance est obligatoire.');
        } else if (\DateTime::createFromFormat('d/m/Y', $form_state->getValue('birthdate')) === false) {
            $errors['birthdate'] = t('Votre date de naissance semble invalide.');
        }

        // Assert the subject is valid
        if (!$form_state->getValue('subject') || empty($form_state->getValue('subject'))) {
            $errors['subject'] = t('Le sujet de votre demande est important.');
        }

        // Assert the message is valid
        if (!$form_state->getValue('message') || empty($form_state->getValue('message'))) {
            $errors['message'] = t('Le message est obligatoire.');
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
                'birthdate' => $form_state->getValue('birthdate'),
                'address'   => $form_state->getValue('address'),
                'zip'       => $form_state->getValue('zip'),
                'city'      => $form_state->getValue('city'),
                'phone'     => $form_state->getValue('phone'),
                'subject'   => t('Nouvelle demande de contact'),
                'message'   => $form_state->getValue('message'),
            );

            // Send to admin
            $to = $form_state->getValue('subject');
            $reply = $form_state->getValue('email');
            $this->mail->mail('rp_contact', 'contact', $to, 'fr', $data, $reply);

            drupal_set_message(t('Merci @firstname @lastname pour votre demande. Nous allons rapidement traitez votre demander et vous recontactez à l\'adresse @email ou par téléphone au @phone.', [
                '@firstname' => $form_state->getValue('firstname'),
                '@lastname'  => $form_state->getValue('lastname'),
                '@email'     => $form_state->getValue('email'),
                '@phone'     => $form_state->getValue('phone'),
            ]));
        }
    }
}
