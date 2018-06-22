<?php

namespace Drupal\rp_contact\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\user\PrivateTempStoreFactory;
use Drupal\Core\Mail\MailManagerInterface;
use Drupal\Core\State\StateInterface;

/**
 * Address form class.
 */
class AddressForm extends FormBase {

  /**
   * Stores and retrieves temporary data for a given owner.
   *
   * @var \Drupal\user\PrivateTempStoreFactory
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
    return 'rp_contact_address_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $params = NULL) {
    $form['#action'] = '#rp-contact-address-form';

    // Disable caching & HTML5 validation.
    $form['#cache']['max-age'] = 0;
    $form['#attributes']['novalidate'] = 'novalidate';

    $status = drupal_get_messages('status');
    if (!empty($status['status'])) {
      $form['status'] = [
        '#markup' => '<div class="well well-success well-lg"><p class="m-b-0">' . $status['status'][0] . '</p></div>',
      ];
    }
    if (!empty($this->session->get('errors'))) {
      $form['errors'] = [
        '#markup' => '<div class="well well-danger well-lg"><p class="class="m-b-0">' . $this->t('Attention, des erreurs sont survenues dans le formulaire. Merci de vérifier les champs en rouge.') . '</p></div>',
      ];
    }

    $form['address'] = [
      '#type'       => 'fieldset',
      '#attributes' => ['class' => ['fieldset-no-legend']],
      '#title'      => $this->t("Changement d'adresse"),
      '#prefix'     => '<h3 class="card-title">' . $this->t("Changement d'adresse") . '</h3>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['civil_state']) && $error_msg = $this->session->get('errors')['civil_state']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['address']['civil_state'] = [
      '#title'       => $this->t('Votre état civil *'),
      '#type'        => 'select',

      '#options'     => ['Madame' => $this->t('Madame'), 'Monsieur' => $this->t('Monsieur')],
      '#required'    => FALSE,
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['firstname']) && $error_msg = $this->session->get('errors')['firstname']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['address']['firstname'] = [
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
    $form['address']['lastname'] = [
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
    if (isset($this->session->get('errors')['birthdate']) && $error_msg = $this->session->get('errors')['birthdate']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['address']['birthdate'] = [
      '#title'       => $this->t('Votre date de naissance <span class ="text-small text-muted">(jj/mm/aaaa)</span> *'),
      '#placeholder' => $this->t('jj/mm/aaaa'),
      '#type'        => 'textfield',
      '#attributes'  => [
        'class'         => [''],
        'size'          => '15',
        'datepicker'    => TRUE,
        'datepickerbtn' => TRUE,
      ],
      '#required'    => FALSE,
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['client']) && $error_msg = $this->session->get('errors')['client']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['address']['client'] = [
      '#type'        => 'radios',
      '#attributes'  => ['title' => $this->t('Êtes-vous déjà client Retraites Populaires ? *')],
      '#required'    => FALSE,
      '#options'     => [
        'Oui' => $this->t('Oui'),
        'Non' => $this->t('Non'),
      ],
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    $form['address']['client_of'] = [
      '#type'        => 'checkboxes',
      '#attributes'  => ['title' => $this->t('Dans quel domaine êtes-vous client ? *')],
      '#required'    => FALSE,
      '#options'     => [
        '2ème ou 3ème pillier' => $this->t('2<sup>e</sup> ou 3<sup>e</sup> pilier'),
        'Immobilier'           => $this->t('Immobilier'),
        'Prêts'                => $this->t('Prêts'),
      ],
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['client_number']) && $error_msg = $this->session->get('errors')['client_number']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['address']['client_number'] = [
      '#title'       => $this->t('Votre référence ou numéro de client *'),
      '#placeholder' => $this->t('123456789'),
      '#type'        => 'textfield',
      '#required'    => FALSE,
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    $form['old'] = [
      '#type'       => 'fieldset',
      '#attributes' => ['class' => ['fieldset-no-legend']],
      '#title'      => $this->t('Vos anciennes coordonnées'),
      '#prefix'     => '<h3 class="card-title">' . $this->t('Vos anciennes coordonnées') . '</h3>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['old_email']) && $error_msg = $this->session->get('errors')['old_email']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['old']['old_email'] = [
      '#title'       => $this->t('Votre ancien e-mail'),
      '#placeholder' => $this->t('alain.rochat@retraitespopulaires.ch'),
      '#type'        => 'textfield',
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    $form['old']['old_address'] = [
      '#title'       => $this->t('Votre ancienne adresse'),
      '#placeholder' => $this->t("Chemin de l'Avenir 1"),
      '#type'        => 'textfield',
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    $form['old']['old_zip'] = [
      '#title'       => $this->t('Votre ancien code postal (NPA)'),
      '#placeholder' => $this->t('1000'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 10],
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    $form['old']['old_city'] = [
      '#title'       => $this->t('Votre ancienne ville'),
      '#placeholder' => $this->t('Lausanne'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 24],
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    $form['old']['old_phone_private'] = [
      '#title'       => $this->t('Votre ancien numéro de téléphone privé'),
      '#placeholder' => $this->t('079 123 45 67'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 20],
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    $form['old']['old_phone_pro'] = [
      '#title'       => $this->t('Votre ancien numéro de téléphone professionnel'),
      '#placeholder' => $this->t('079 123 45 67'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 20],
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    $form['old']['old_phone_mobile'] = [
      '#title'       => $this->t('Votre ancien numéro de téléphone mobile'),
      '#placeholder' => $this->t('079 123 45 67'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 20],
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    $form['new'] = [
      '#type'       => 'fieldset',
      '#attributes' => ['class' => ['fieldset-no-legend']],
      '#title'      => $this->t('Vos nouvelles coordonnées'),
      '#prefix'     => '<h3 class="card-title">' . $this->t('Vos nouvelles coordonnées') . '</h3>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['new_email']) && $error_msg = $this->session->get('errors')['new_email']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['new']['new_email'] = [
      '#title'       => $this->t('Votre nouvel e-mail'),
      '#placeholder' => $this->t('alain.rochat@retraitespopulaires.ch'),
      '#type'        => 'textfield',
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    $form['new']['new_address'] = [
      '#title'       => $this->t('Votre nouvelle adresse'),
      '#placeholder' => $this->t("Chemin de l'Avenir 1"),
      '#type'        => 'textfield',
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    $form['new']['new_zip'] = [
      '#title'       => $this->t('Votre nouveau code postal (NPA)'),
      '#placeholder' => $this->t('1000'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 10],
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    $form['new']['new_city'] = [
      '#title'       => $this->t('Votre nouvelle ville'),
      '#placeholder' => $this->t('Lausanne'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 24],
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    $form['new']['new_phone_private'] = [
      '#title'       => $this->t('Votre nouveau numéro de téléphone privé'),
      '#placeholder' => $this->t('079 123 45 67'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 20],
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    $form['new']['new_phone_pro'] = [
      '#title'       => $this->t('Votre nouveau numéro de téléphone professionnel'),
      '#placeholder' => $this->t('079 123 45 67'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 20],
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    $form['new']['new_phone_mobile'] = [
      '#title'       => $this->t('Votre nouveau numéro de téléphone mobile'),
      '#placeholder' => $this->t('079 123 45 67'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 20],
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    $form['more'] = [
      '#type'       => 'fieldset',
      '#attributes' => ['class' => ['fieldset-no-legend']],
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['due_date']) && $error_msg = $this->session->get('errors')['due_date']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['more']['group_start'] = [
      '#prefix' => '<div class="form-group ' . $error_class . '"><div class="form-control-label">' . $this->t('Date de versement <span class ="text-small text-muted">(jj/mm/aaaa)</span> *') . '</div><div class="input-group">',
      '#suffix' => '</div>' . $error . '</div>',
    ];
    $form['more']['group_start']['due_date'] = [
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

    $form['more']['remarque'] = [
      '#title'       => $this->t('Remarque'),
      '#type'        => 'textarea',
      '#attributes'  => ['cols' => 59],
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

    // Assert the civil_state is valid.
    if (!$form_state->getValue('civil_state') || empty($form_state->getValue('civil_state'))) {
      $errors['civil_state'] = $this->t('Votre état civile est obligatoire.');
    }

    // Assert the client is valid.
    if (!$form_state->getValue('client') || empty($form_state->getValue('client'))) {
      $errors['client'] = $this->t("Merci d'indiquer votre affiliation à Retraites Populaires.");
    }

    // Assert the client_number is valid.
    if (!$form_state->getValue('client_number') || empty($form_state->getValue('client_number'))) {
      $errors['client_number'] = $this->t('Votre N° client est obligatoire.');
    }

    // Assert the birthdate is valid.
    if (!$form_state->getValue('birthdate') || empty($form_state->getValue('birthdate'))) {
      $errors['birthdate'] = $this->t('Votre date de naissance est obligatoire.');
    }
    elseif (\DateTime::createFromFormat('d/m/Y', $form_state->getValue('birthdate')) === FALSE) {
      $errors['birthdate'] = $this->t('Votre date de naissance semble invalide.');
    }

    // Assert the old_email is valid.
    if (!$form_state->getValue('old_email') || !filter_var($form_state->getValue('old_email'), FILTER_VALIDATE_EMAIL)) {
      $errors['old_email'] = $this->t('Cette adresse e-mail semble invalide.');
    }

    // Assert the new_email is valid.
    if (!$form_state->getValue('new_email') || !filter_var($form_state->getValue('new_email'), FILTER_VALIDATE_EMAIL)) {
      $errors['new_email'] = $this->t('Cette adresse e-mail semble invalide.');
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
        'civil_state'       => $form_state->getValue('civil_state'),
        'firstname'         => $form_state->getValue('firstname'),
        'lastname'          => $form_state->getValue('lastname'),
        'birthdate'         => $form_state->getValue('birthdate'),
        'client'            => $form_state->getValue('client'),
        'client_of'         => $form_state->getValue('client_of'),
        'client_number'     => $form_state->getValue('client_number'),
        'old_email'         => $form_state->getValue('old_email'),
        'old_address'       => $form_state->getValue('old_address'),
        'old_zip'           => $form_state->getValue('old_zip'),
        'old_city'          => $form_state->getValue('old_city'),
        'old_phone_private' => $form_state->getValue('old_phone_private'),
        'old_phone_pro'     => $form_state->getValue('old_phone_pro'),
        'old_phone_mobile'  => $form_state->getValue('old_phone_mobile'),
        'new_email'         => $form_state->getValue('new_email'),
        'new_address'       => $form_state->getValue('new_address'),
        'new_zip'           => $form_state->getValue('new_zip'),
        'new_city'          => $form_state->getValue('new_city'),
        'new_phone_private' => $form_state->getValue('new_phone_private'),
        'new_phone_pro'     => $form_state->getValue('new_phone_pro'),
        'new_phone_mobile'  => $form_state->getValue('new_phone_mobile'),
        'due_date'          => $form_state->getValue('due_date'),
        'remarque'          => $form_state->getValue('remarque'),
      ];

      // Send to admin.
      $to = preg_replace('/\s+/', ' ', $this->state->get('rp_contact.settings.address')['receivers']);
      $to = str_replace(';', ',', $to);
      $reply = $form_state->getValue('new_email');
      $this->mail->mail('rp_contact', 'contact_address', $to, 'fr', $data, $reply);

      // Send to client.
      $this->mail->mail('rp_contact', 'feedback_contact_address', $form_state->getValue('new_email'), 'fr');

      drupal_set_message($this->t("Merci @firstname @lastname Nous allons rapidement traiter votre changement d'adresse.", [
        '@firstname' => $form_state->getValue('firstname'),
        '@lastname'  => $form_state->getValue('lastname'),
      ]));
    }
  }

}
