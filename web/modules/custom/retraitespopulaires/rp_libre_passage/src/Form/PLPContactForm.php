<?php

namespace Drupal\rp_libre_passage\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

// Injection.
use Drupal\Core\TempStore\PrivateTempStoreFactory;
use Drupal\Core\Mail\MailManagerInterface;
use Drupal\Core\State\StateInterface;

/**
 * PLP Contact Form class.
 */
class PLPContactForm extends FormBase {

  /**
   * Stores and retrieves temporary data for a given owner.
   *
   * @var \Drupal\Core\TempStore\PrivateTempStoreFactory
   */
  protected $session;

  /**
   * Composes and optionally sends an email message.
   *
   * @var \Drupal\Core\Mail\MailManagerInterface
   */
  protected $mail;

  /**
   * The state key value store.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * Class constructor.
   */
  public function __construct(PrivateTempStoreFactory $private_tempstore, MailManagerInterface $mail, StateInterface $state) {
    $this->mail = $mail;
    $this->state = $state;

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
    $container->get('plugin.manager.mail'),
    $container->get('state')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'rp_libre_passage_plp_contact_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $params = NULL) {
    $form['#action'] = '#rp-libre-passage-plp-contact-form';

    // Disable caching & HTML5 validation.
    $form['#cache']['max-age'] = 0;
    $form['#attributes']['novalidate'] = 'novalidate';

    $params['results']['deadline'] = $params['results']['deadline']->format('d.m.Y');
    // A hidden field can't be altered, Drupal assert it.
    $form['results'] = [
      '#type'     => 'hidden',
      '#value'    => $params['results'],
      '#required' => FALSE,
    ];

    $status = $this->messenger()->messagesByType(MessengerInterface::TYPE_STATUS);
    $this->messenger()->deleteByType(MessengerInterface::TYPE_STATUS);
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
      '#title'      => $this->t('Je suis intéressé(e)'),
      '#prefix'     => '<h3 class="card-title">' . $this->t('Je suis intéressé(e)') . '</h3>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['firstname']) && $error_msg = $this->session->get('errors')['firstname']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['personnal']['firstname'] = [
      '#title'       => $this->t('Votre prénom *'),
      '#placeholder' => $this->t('Alain'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 25],
      '#required'    => FALSE,
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['lastname']) && $error_msg = $this->session->get('errors')['lastname']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['personnal']['lastname'] = [
      '#title'       => $this->t('Votre nom de famille *'),
      '#placeholder' => $this->t('Rochat'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 24],
      '#required'    => FALSE,
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['email']) && $error_msg = $this->session->get('errors')['email']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['personnal']['email'] = [
      '#title'       => $this->t('Votre e-mail *'),
      '#placeholder' => $this->t('alain.rochat@retraitespopulaires.ch'),
      '#type'        => 'textfield',
      '#required'    => FALSE,
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['zip']) && $error_msg = $this->session->get('errors')['zip']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['personnal']['zip'] = [
      '#title'       => $this->t('Votre code postal (NPA) *'),
      '#placeholder' => $this->t('1000'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 10],
      '#required'    => FALSE,
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['city']) && $error_msg = $this->session->get('errors')['city']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['personnal']['city'] = [
      '#title'       => $this->t('Votre localité *'),
      '#placeholder' => $this->t('Lausanne'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 24],
      '#required'    => FALSE,
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['phone']) && $error_msg = $this->session->get('errors')['phone']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['personnal']['phone'] = [
      '#title'       => $this->t('Votre numéro de téléphone *'),
      '#placeholder' => $this->t('079 123 45 67'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 20],
      '#required'    => FALSE,
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['message']) && $error_msg = $this->session->get('errors')['message']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['personnal']['message'] = [
      '#title'       => $this->t('Votre message *'),
      '#type'        => 'textarea',
      '#required'    => FALSE,
      '#attributes'  => ['cols' => 59],
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    $form['separator'] = ['#markup' => '<hr />'];

    $form['actions']['submit'] = [
      '#type'        => 'submit',
      '#value'       => $this->t('Envoyer'),
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

    // Assert the firstname is valid.
    if (!$form_state->getValue('firstname') || empty($form_state->getValue('firstname'))) {
      $errors['firstname'] = $this->t('Le prénom est obligatoire.');
    }

    // Assert the lastname is valid.
    if (!$form_state->getValue('lastname') || empty($form_state->getValue('lastname'))) {
      $errors['lastname'] = $this->t('Le nom est obligatoire.');
    }

    // Assert the email is valid.
    if (!$form_state->getValue('email') || !filter_var($form_state->getValue('email'), FILTER_VALIDATE_EMAIL)) {
      $errors['email'] = $this->t('Cette adresse e-mail semble invalide.');
    }

    // Assert the zip is valid.
    if (!$form_state->getValue('zip') || empty($form_state->getValue('zip'))) {
      $errors['zip'] = $this->t('Votre code postal est obligatoire.');
    }

    // Assert the city is valid.
    if (!$form_state->getValue('city') || empty($form_state->getValue('city'))) {
      $errors['city'] = $this->t('Votre localité est obligatoire.');
    }

    // Assert the phone is valid.
    if (!$form_state->getValue('phone') || empty($form_state->getValue('phone'))) {
      $errors['phone'] = $this->t('Le numéro de téléphone est obligatoire.');
    }

    // Assert the message is valid.
    if (!$form_state->getValue('message') || empty($form_state->getValue('message'))) {
      $errors['message'] = $this->t('Le message est obligatoire.');
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

      $data = [
        'firstname' => $form_state->getValue('firstname'),
        'lastname'  => $form_state->getValue('lastname'),
        'email'     => $form_state->getValue('email'),
        'zip'       => $form_state->getValue('zip'),
        'city'      => $form_state->getValue('city'),
        'phone'     => $form_state->getValue('phone'),
        'message'   => $form_state->getValue('message'),
        'results'   => $form_state->getValue('results'),
      ];

      // Send to admin rp_libre_passage.settings.receivers.
      $to = preg_replace('/\s+/', ' ', $this->state->get('rp_libre_passage.settings.receivers'));
      $to = str_replace(';', ',', $to);
      $reply = $form_state->getValue('email');
      $this->mail->mail('rp_libre_passage', 'contact', $to, 'fr', $data, $reply);

      // Send to client.
      $this->mail->mail('rp_contact', 'feedback_generical', $form_state->getValue('email'), 'fr');

      $this->messenger()->addStatus($this->t("Merci @firstname @lastname pour votre demande. Nous allons la traiter rapidement et vous recontacter à l'adresse @email ou par téléphone au @phone.", [
        '@firstname' => $form_state->getValue('firstname'),
        '@lastname'  => $form_state->getValue('lastname'),
        '@email'     => $form_state->getValue('email'),
        '@phone'     => $form_state->getValue('phone'),
      ]));
    }
  }

}
