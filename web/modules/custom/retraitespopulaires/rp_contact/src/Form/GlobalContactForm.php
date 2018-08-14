<?php

namespace Drupal\rp_contact\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\TempStore\PrivateTempStoreFactory;
use Drupal\Core\Mail\MailManagerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\State\StateInterface;

/**
 * Global contact form class.
 */
class GlobalContactForm extends FormBase {

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
   * EntityTypeManagerInterface to load Nodes.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityNode;

  /**
   * The state key value store.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * Class constructor.
   */
  public function __construct(PrivateTempStoreFactory $private_tempstore, MailManagerInterface $mail, EntityTypeManagerInterface $entity, StateInterface $state) {
    $this->entityNode = $entity->getStorage('node');
    $this->mail       = $mail;
    $this->state      = $state;

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
    $container->get('entity_type.manager'),
    $container->get('state')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'rp_contact_main_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $params = NULL) {
    $form['#action'] = '#rp-contact-main-form';

    $status = $this->messenger()->messagesByType(MessengerInterface::TYPE_STATUS);
    $this->messenger()->deleteByType(MessengerInterface::TYPE_STATUS);
    if (!empty($status)) {
      $form['status'] = [
        '#markup' => '<div class="well well-success well-lg"><p class="m-b-0">' . $status[0] . '</p></div>',
      ];
    }
    if (!empty($this->session->get('errors'))) {
      $form['errors'] = [
        '#markup' => '<div class="well well-danger well-lg"><p class="m-b-0">' . $this->t('Attention, des erreurs sont survenues dans le formulaire. Merci de vérifier les champs en rouge.') . '</p></div>',
      ];
    }

    $form['personnal'] = [
      '#type'       => 'fieldset',
      '#attributes' => ['class' => ['fieldset-no-legend']],
      '#title'      => $this->t('Vos informations'),
      '#prefix'     => '<h3 class="card-title">' . $this->t('Vos informations') . '</h3>',
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
    if (isset($this->session->get('errors')['birthdate']) && $error_msg = $this->session->get('errors')['birthdate']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['personnal']['birthdate'] = [
      '#title'       => $this->t('Votre date de naissance <span class ="text-small text-muted">(jj/mm/aaaa)</span> *'),
      '#placeholder' => $this->t('jj/mm/aaaa'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 10],
      '#required'    => FALSE,
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    $form['personnal']['address'] = [
      '#title'       => $this->t('Votre adresse *'),
      '#placeholder' => $this->t("Chemin de l'Avenir 1"),
      '#type'        => 'textfield',
      '#required'    => FALSE,
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    $form['personnal']['zip'] = [
      '#title'       => $this->t('Votre code postal (NPA)'),
      '#placeholder' => $this->t('1000'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 10],
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    $form['personnal']['city'] = [
      '#title'       => $this->t('Votre localité'),
      '#placeholder' => $this->t('Lausanne'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 24],
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
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

    $form['message'] = [
      '#type'       => 'fieldset',
      '#attributes' => ['class' => ['fieldset-no-legend']],
      '#title'      => $this->t('Votre demande'),
      '#prefix'     => '<h3 class="card-title">' . $this->t('Votre demande') . '</h3>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['subject']) && $error_msg = $this->session->get('errors')['subject']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $options = [];
    $services = explode(PHP_EOL, $this->state->get('rp_contact.settings.receivers'));
    foreach ($services as $value) {
      $part = explode('|', $value);
      $options[] = $part[1];
    }
    $form['message']['subject'] = [
      '#title'    => $this->t('Sujet de votre demande *'),
      '#type'     => 'select',
      '#required' => FALSE,
      '#prefix'   => '<div class="form-group ' . $error_class . '">',
      '#suffix'   => $error . '</div>',
      '#options'  => $options,
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['message']) && $error_msg = $this->session->get('errors')['message']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['message']['message'] = [
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

    // Assert the birthdate is valid.
    if (!$form_state->getValue('birthdate') || empty($form_state->getValue('birthdate'))) {
      $errors['birthdate'] = $this->t('Votre date de naissance est obligatoire.');
    }
    elseif (\DateTime::createFromFormat('d/m/Y', $form_state->getValue('birthdate')) === FALSE) {
      $errors['birthdate'] = $this->t('Votre date de naissance semble invalide.');
    }

    // Assert the subject is valid.
    if (is_null($form_state->getValue('subject'))) {
      $errors['subject'] = $this->t('Le sujet de votre demande est important.');
    }

    // Assert the message is valid.
    if (!$form_state->getValue('message') || empty($form_state->getValue('message'))) {
      $errors['message'] = $this->t('Le message est obligatoire.');
    }

    // Assert the phone is valid.
    if (!$form_state->getValue('phone') || empty($form_state->getValue('phone'))) {
      $errors['phone'] = $this->t('Le numéro de téléphone est obligatoire.');
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
    if (!empty($this->session->get('errors'))) {
      return;
    }

    $data = [
      'firstname' => $form_state->getValue('firstname'),
      'lastname'  => $form_state->getValue('lastname'),
      'email'     => $form_state->getValue('email'),
      'birthdate' => $form_state->getValue('birthdate'),
      'address'   => $form_state->getValue('address'),
      'zip'       => $form_state->getValue('zip'),
      'city'      => $form_state->getValue('city'),
      'phone'     => $form_state->getValue('phone'),
      'subject'   => $this->t('Nouvelle demande de contact'),
      'message'   => $form_state->getValue('message'),
    ];

    // Send to admin.
    $services = explode(PHP_EOL, $this->state->get('rp_contact.settings.receivers'));
    $to = '';
    if (isset($services[$form_state->getValue('subject')])) {
      $parts = $services[$form_state->getValue('subject')];
      $to = explode('|', $parts)[0];
    }

    $reply = $form_state->getValue('email');
    $this->mail->mail('rp_contact', 'contact', $to, 'fr', $data, $reply);

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
