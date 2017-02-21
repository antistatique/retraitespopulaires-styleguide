<?php
/**
* @file
* Contains \Drupal\rp_contact\Form\DocumentsForm.
*/

namespace Drupal\rp_contact\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\user\PrivateTempStoreFactory;
use Drupal\Core\Mail\MailManagerInterface;
use Drupal\Core\State\StateInterface;

class DocumentsForm extends FormBase {

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
     * Class constructor.
     */
    public function __construct(PrivateTempStoreFactory $private_tempstore, MailManagerInterface $mail, StateInterface $state) {
        $this->mail  = $mail;
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
        $container->get('plugin.manager.mail'),
        $container->get('state')
      );
    }

    /**
    * {@inheritdoc}.
    */
    public function getFormId() {
        return 'rp_contact_documents_form';
    }

    /**
    * {@inheritdoc}
    */
    public function buildForm(array $form, FormStateInterface $form_state, $params = NULL) {
        $form['#action'] = '#rp-contact-documents-form';

        // Disable caching & HTML5 validation
        $form['#cache']['max-age'] = 0;
        $form['#attributes']['novalidate'] = 'novalidate';

        $theme = '';
        if (isset($params['theme'])) {
            $theme = $params['theme'];
        }

        $status = drupal_get_messages('status');
        if (!empty($status['status'])) {
            $form['status'] = array(
                '#markup' => '<div class="well well-success well-lg"><p class="class="m-b-0">'.$status['status'][0].'</p></div>',
            );
        }
        if (!empty($this->session->get('errors'))) {
            $form['errors'] = array(
                '#markup' => '<div class="well well-danger well-lg"><p class="class="m-b-0">'.t('Attention, des erreurs sont survenues dans le formulaire. Merci de vérifier les champs en rouge.').'</p></div>',
            );
        }

        $form['personnal'] = array(
          '#type'       => 'fieldset',
          '#attributes' => ['class' => array('fieldset-no-legend fieldset-bordered')],
          '#title'      => t('Vos informations'),
          '#prefix'     => '<h3>'.t('Vos informations').'</h3>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['policy']) && $error_msg = $this->session->get('errors')['policy'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['personnal']['policy'] = array(
            '#title'       => t('Numéro(s) de police(s) *'),
            '#placeholder' => t('123456789'),
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
        if( isset($this->session->get('errors')['civil_state']) && $error_msg = $this->session->get('errors')['civil_state'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['personnal']['civil_state'] = array(
            '#title'       => t('Votre état civil *'),
            '#type'        => 'select',
            '#attributes'  => ['theme' => $theme],
            '#options'     => array('Madame' => t('Madame'), 'Monsieur' => t('Monsieur')),
            '#required'    => false,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
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
            '#title'       => t('Votre prénom *'),
            '#placeholder' => t('Alain'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 25, 'theme' => $theme],
            '#required'    => false,
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
            '#title'       => t('Votre nom de famille *'),
            '#placeholder' => t('Rochat'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 24, 'theme' => $theme],
            '#required'    => false,
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
        $form['personnal']['phone'] = array(
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
        if( isset($this->session->get('errors')['birthdate']) && $error_msg = $this->session->get('errors')['birthdate'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['personnal']['birthdate'] = array(
            '#title'       => t('Votre date de naissance <span class ="text-small text-muted">(jj/mm/aaaa)</span> *'),
            '#placeholder' => t('jj/mm/aaaa'),
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
        if( isset($this->session->get('errors')['address']) && $error_msg = $this->session->get('errors')['address'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['personnal']['address'] = array(
            '#title'       => t('Votre adresse *'),
            '#placeholder' => t('Chemin de l\'Avenir 1'),
            '#type'        => 'textfield',
            '#attributes'  => ['theme' => $theme],
            '#required'    => false,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        $form['personnal']['row_2'] = array(
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
        $form['personnal']['row_2']['zip'] = array(
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
        $form['personnal']['row_2']['city'] = array(
            '#title'       => t('Votre localité *'),
            '#placeholder' => t('Lausanne'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 24, 'theme' => $theme],
            '#required'    => false,
            '#prefix'      => '<div class="col-xs-12 col-md-6"><div class="form-group '.$error_class.'">',
            '#suffix'      => $error.'</div></div>',
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
            '#placeholder' => t('jj/mm/aaaa'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 10, 'theme' => $theme],
            '#required'    => false,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        $form['documents'] = array(
          '#type'       => 'fieldset',
          '#attributes' => ['class' => array('fieldset-no-legend fieldset-bordered')],
          '#title'      => t('Votre demande'),
          '#prefix'     => '<h3>'.t('Votre demande').'</h3>',
        );

        $form['documents']['policies'] = array(
            '#type'        => 'checkboxes',
            '#attributes'  => ['theme' => $theme, 'title' => t('Police d\'assurance')],
            '#options'     => array(
                'Copie de police' => t('Copie de police'),
                'Déclaration de perte de police' => t('Déclaration de perte de police'),
                'Provision de certificats de vie' => t('Provision de certificats de vie'),
                'Valeur de rachat actuelle à titre informatif' => t('Valeur de rachat actuelle à titre informatif')
            ),
            '#prefix'      => '<div class="form-group">',
            '#suffix'      => '</div>',
        );

        $form['documents']['attestations'] = array(
            '#type'        => 'checkboxes',
            '#attributes'  => ['theme' => $theme, 'title' => t('Attestations fiscales')],
            '#options'     => array(
                'Dernière année' => t('Dernière année'),
                'Autre(s) année(s)' => t('Autre(s) année(s)')
            ),
            '#prefix'      => '<div class="form-group">',
            '#suffix'      => '</div>',
        );

        $form['documents']['other_year'] = array(
            '#title'       => t('Autre(s) année(s)'),
            '#type'        => 'textfield',
            '#attributes'  => ['theme' => $theme],
        );

        $form['documents']['payments'] = array(
            '#type'        => 'checkboxes',
            '#attributes'  => ['theme' => $theme, 'title' => t('Moyen de paiement')],
            '#options'     => array(
                'Copie des factures ouvertes' => t('Copie des factures ouvertes'),
                'Stock de BVR+' => t('Stock de BVR+'),
                'Relevé des factures et encaissements' => t('Relevé des factures et encaissements')
            ),
            '#prefix'      => '<div class="form-group">',
            '#suffix'      => '</div>',
        );

        $form['documents']['message'] = array(
            '#title'       => t('Votre message'),
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

        // Assert the civil_state is valid
        if (!$form_state->getValue('civil_state') || empty($form_state->getValue('civil_state'))) {
            $errors['civil_state'] = t('Votre état civile est obligatoire.');
        }

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
        if (!$form_state->getValue('phone') || empty($form_state->getValue('phone'))) {
            $errors['phone'] = t('Le numéro de téléphone est obligatoire.');
        }

        // Assert the birthdate is valid
        if (!$form_state->getValue('birthdate') || empty($form_state->getValue('birthdate'))) {
            $errors['birthdate'] = t('Votre date de naissance est obligatoire.');
        } else if (\DateTime::createFromFormat('d/m/Y', $form_state->getValue('birthdate')) === false) {
            $errors['birthdate'] = t('Votre date de naissance semble invalide.');
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
            $errors['city'] = t('Votre localité est obligatoire.');
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
                'policy'       => $form_state->getValue('policy'),
                'civil_state'  => $form_state->getValue('civil_state'),
                'firstname'    => $form_state->getValue('firstname'),
                'lastname'     => $form_state->getValue('lastname'),
                'email'        => $form_state->getValue('email'),
                'phone'        => $form_state->getValue('phone'),
                'birthdate'    => $form_state->getValue('birthdate'),
                'address'      => $form_state->getValue('address'),
                'zip'          => $form_state->getValue('zip'),
                'city'         => $form_state->getValue('city'),
                'policies'     => $form_state->getValue('policies'),
                'attestations' => $form_state->getValue('attestations'),
                'other_year'   => $form_state->getValue('other_year'),
                'payments'     => $form_state->getValue('payments'),
                'message'      => $form_state->getValue('message'),
            );

            // Send to admin
            $to = preg_replace('/\s+/', ' ', $this->state->get('rp_contact.settings.page.documents')['receivers']);
            $to = str_replace(';', ',', $to);
            $reply = $form_state->getValue('email');
            $this->mail->mail('rp_contact', 'contact_documents', $to, 'fr', $data, $reply);

            // Send to client
            $this->mail->mail('rp_contact', 'feedback_generical', $form_state->getValue('email'), 'fr');

            drupal_set_message(t('Merci @firstname @lastname pour votre demande. Nous allons rapidement traiter votre demande et vous recontacter à l\'adresse @email.', [
                '@firstname' => $form_state->getValue('firstname'),
                '@lastname'  => $form_state->getValue('lastname'),
                '@email'     => $form_state->getValue('email'),
            ]));
        }
    }
}
