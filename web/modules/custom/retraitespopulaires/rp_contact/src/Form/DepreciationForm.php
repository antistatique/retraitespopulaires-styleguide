<?php

namespace Drupal\rp_contact\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\TempStore\PrivateTempStoreFactory;
use Drupal\Core\Mail\MailManagerInterface;
use Drupal\Core\State\StateInterface;

/**
 * Depreciation From Class.
 */
class DepreciationForm extends FormBase {

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
    return 'rp_contact_depreciation_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $params = NULL) {
    $form['#action'] = '#rp-contact-depreciation-form';

    // Disable caching & HTML5 validation.
    $form['#cache']['max-age'] = 0;
    $form['#attributes']['novalidate'] = 'novalidate';

    $form['#attached'] = [
      'library' => ['rp_contact/contact_depreciation_form'],
    ];

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

    $form['depreciation'] = [
      '#type'       => 'fieldset',
      '#attributes' => ['class' => ['fieldset-no-legend ']],
      '#title'      => $this->t('Vos informations'),
      '#prefix'     => '<h3 class="card-title">' . $this->t('Vos informations') . '</h3>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['title']) && $error_msg = $this->session->get('errors')['title']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['depreciation']['title'] = [
      '#type'        => 'radios',
      '#attributes'  => ['title' => $this->t('Votre titre *'), 'required' => FALSE],
      '#required'    => FALSE,
      '#options'     => [
        'Madame'   => $this->t('Madame'),
        'Monsieur' => $this->t('Monsieur'),
        'Société'  => $this->t('Société'),
      ],
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    $form['depreciation']['policy'] = [
      '#title'       => $this->t('Votre numéro de prêt'),
      '#placeholder' => $this->t('123456789'),
      '#type'        => 'textfield',
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    // Get readonly.
    $readonly = '';
    if (isset($form_state->getUserInput()['title']) && $form_state->getUserInput()['title'] == 'Société') {
      $readonly = 'readonly';
    }
    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['firstname']) && $error_msg = $this->session->get('errors')['firstname']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['depreciation']['firstname'] = [
      '#title'       => $this->t('Votre prénom *'),
      '#placeholder' => $this->t('Alain'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 25],
      '#prefix'      => '<div class="form-group ' . $error_class . ' ' . $readonly . '">',
      '#suffix'      => $error . '</div>',
    ];
    if (!empty($readonly)) {
      $form['depreciation']['firstname']['#attributes']['readonly'] = $readonly;
    }

    // Get readonly.
    $readonly = '';
    if (isset($form_state->getUserInput()['title']) && $form_state->getUserInput()['title'] == 'Société') {
      $readonly = 'readonly';
    }
    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['lastname']) && $error_msg = $this->session->get('errors')['lastname']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['depreciation']['lastname'] = [
      '#title'       => $this->t('Votre nom de famille *'),
      '#placeholder' => $this->t('Rochat'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 24],
      '#prefix'      => '<div class="form-group ' . $error_class . ' ' . $readonly . '">',
      '#suffix'      => $error . '</div>',
    ];
    if (!empty($readonly)) {
      $form['depreciation']['lastname']['#attributes']['readonly'] = $readonly;
    }

    // Get readonly.
    $readonly = '';
    if (isset($form_state->getUserInput()['title']) && $form_state->getUserInput()['title'] != 'Société') {
      $readonly = 'readonly';
    }
    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['company']) && $error_msg = $this->session->get('errors')['company']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['depreciation']['company'] = [
      '#title'       => $this->t('Votre raison sociale'),
      '#placeholder' => $this->t('Retraites Populaires'),
      '#type'        => 'textfield',
      '#prefix'      => '<div class="form-group ' . $error_class . ' ' . $readonly . '">',
      '#suffix'      => $error . '</div>',
    ];
    if (!empty($readonly)) {
      $form['depreciation']['company']['#attributes']['readonly'] = $readonly;
    }

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['email']) && $error_msg = $this->session->get('errors')['email']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['depreciation']['email'] = [
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
    if (isset($this->session->get('errors')['phone']) && $error_msg = $this->session->get('errors')['phone']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['depreciation']['phone'] = [
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
    if (isset($this->session->get('errors')['address']) && $error_msg = $this->session->get('errors')['address']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['depreciation']['address'] = [
      '#title'       => $this->t('Votre adresse'),
      '#placeholder' => $this->t("Chemin de l'Avenir 1 *"),
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
    $form['depreciation']['zip'] = [
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
    $form['depreciation']['city'] = [
      '#title'       => $this->t('Votre ville *'),
      '#placeholder' => $this->t('Lausanne'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 24],
      '#required'    => FALSE,
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    $form['building'] = [
      '#type'       => 'fieldset',
      '#attributes' => ['class' => ['fieldset-no-legend ']],
      '#title'      => $this->t('Votre bien'),
      '#prefix'     => '<h3 class="card-title">' . $this->t('Votre bien') . '</h3>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['building_address']) && $error_msg = $this->session->get('errors')['building_address']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['building']['building_address'] = [
      '#title'       => $this->t('Adresse de votre bien *'),
      '#placeholder' => $this->t("Chemin de l'Avenir 1"),
      '#type'        => 'textfield',
      '#required'    => FALSE,
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['building_zip']) && $error_msg = $this->session->get('errors')['building_zip']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['building']['building_zip'] = [
      '#title'       => $this->t('Code postal (NPA) de votre bien *'),
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
    if (isset($this->session->get('errors')['building_city']) && $error_msg = $this->session->get('errors')['building_city']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['building']['building_city'] = [
      '#title'       => $this->t('Ville de votre bien *'),
      '#placeholder' => $this->t('Lausanne'),
      '#type'        => 'textfield',
      '#attributes'  => ['size' => 24],
      '#required'    => FALSE,
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    $form['more'] = [
      '#type'       => 'fieldset',
      '#attributes' => ['class' => ['fieldset-no-legend ']],
      '#title'      => $this->t('Votre demande'),
      '#prefix'     => '<h3 class="card-title">' . $this->t('Votre demande') . '</h3>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['depreciation']) && $error_msg = $this->session->get('errors')['depreciation']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $options = [
      'Je souhaite suspendre mon amortissement' => $this->t('Je souhaite suspendre mon amortissement'),
      'Je souhaite modifier mon amortissement' => $this->t('Je souhaite modifier mon amortissement'),
      'Je souhaite fixer mon amortissement' => $this->t('Je souhaite fixer mon amortissement'),
      'Je souhaite introduire un amortissement indirect' => $this->t('Je souhaite introduire un amortissement indirect'),
    ];
    $form['more']['depreciation'] = [
      '#title'    => $this->t('Amortissement *'),
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
    if (isset($this->session->get('errors')['duration']) && $error_msg = $this->session->get('errors')['duration']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $options = [
      '1 an'   => $this->t('1 an'),
      '2 ans'  => $this->t('2 ans'),
      '3 ans'  => $this->t('3 ans'),
      '4 ans'  => $this->t('4 ans'),
      '5 ans'  => $this->t('5 ans'),
      '6 ans'  => $this->t('6 ans'),
      '7 ans'  => $this->t('7 ans'),
      '8 ans'  => $this->t('8 ans'),
      '9 ans'  => $this->t('9 ans'),
      '10 ans' => $this->t('10 ans'),
      "jusqu'à l'échéance du contrat en cours" => $this->t("jusqu'à l'échéance du contrat en cours"),
    ];
    $form['more']['duration'] = [
      '#title'    => $this->t('Durée *'),
      '#type'     => 'select',
      '#required' => FALSE,
      '#prefix'   => '<div class="form-group ' . $error_class . '">',
      '#suffix'   => $error . '</div>',
      '#options'  => $options,
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

    // Assert the Title is valid.
    if (!$form_state->getValue('title') || empty($form_state->getValue('title'))) {
      $errors['title'] = $this->t('Votre titre est obligatoire.');
    }

    if ($form_state->getValue('title') == 'Monsieur' || $form_state->getValue('title') == 'Madame') {
      // Assert the firstname is valid.
      if (!$form_state->getValue('firstname') || empty($form_state->getValue('firstname'))) {
        $errors['firstname'] = $this->t('Le prénom est obligatoire.');
      }

      // Assert the lastname is valid.
      if (!$form_state->getValue('lastname') || empty($form_state->getValue('lastname'))) {
        $errors['lastname'] = $this->t('Le nom est obligatoire.');
      }
    }
    else {
      // Assert the lastname is valid.
      if (!$form_state->getValue('company') || empty($form_state->getValue('company'))) {
        $errors['company'] = $this->t('Votre raison sociale est obligatoire.');
      }
    }

    // Assert the email is valid.
    if (!$form_state->getValue('email') || !filter_var($form_state->getValue('email'), FILTER_VALIDATE_EMAIL)) {
      $errors['email'] = $this->t('Cette adresse e-mail semble invalide.');
    }

    // Assert the birthdate is valid.
    if (!$form_state->getValue('phone') || empty($form_state->getValue('phone'))) {
      $errors['phone'] = $this->t('Le numéro de téléphone est obligatoire.');
    }

    // Assert the address is valid.
    if (!$form_state->getValue('address') || empty($form_state->getValue('address'))) {
      $errors['address'] = $this->t('Votre adresse est obligatoire.');
    }

    // Assert the zip is valid.
    if (!$form_state->getValue('zip') || empty($form_state->getValue('zip'))) {
      $errors['zip'] = $this->t('Votre code postal est obligatoire.');
    }

    // Assert the city is valid.
    if (!$form_state->getValue('city') || empty($form_state->getValue('city'))) {
      $errors['city'] = $this->t('Votre ville est obligatoire.');
    }

    // Assert the address is valid.
    if (!$form_state->getValue('building_address') || empty($form_state->getValue('building_address'))) {
      $errors['building_address'] = $this->t("L'adresse de votre bien est obligatoire.");
    }

    // Assert the zip is valid.
    if (!$form_state->getValue('building_zip') || empty($form_state->getValue('building_zip'))) {
      $errors['building_zip'] = $this->t('Le code postal de votre bien est obligatoire.');
    }

    // Assert the city is valid.
    if (!$form_state->getValue('building_city') || empty($form_state->getValue('building_city'))) {
      $errors['building_city'] = $this->t('La ville de votre bien est obligatoire.');
    }

    // Assert the depreciation is valid.
    if (!$form_state->getValue('depreciation') || empty($form_state->getValue('depreciation'))) {
      $errors['depreciation'] = $this->t("L'amortissement est obligatoire.");
    }

    // Assert the duration is valid.
    if (!$form_state->getValue('duration') || empty($form_state->getValue('duration'))) {
      $errors['duration'] = $this->t('La durée est obligatoire.');
    }

    // Save errors in sessions to use it on the form builder
    // TODO Found better solution to inline errors than hack session to.
    $this->session->set('errors', $errors);

    // If no error, disable redepreciation form
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
        'depreciation'     => $form_state->getValue('depreciation'),
        'duration'         => $form_state->getValue('duration'),
        'remarque'         => $form_state->getValue('remarque'),
      ];

      // Send to admin.
      $to = preg_replace('/\s+/', ' ', $this->state->get('rp_contact.settings.depreciation')['receivers']);
      $to = str_replace(';', ',', $to);
      $reply = $form_state->getValue('email');
      $this->mail->mail('rp_contact', 'contact_depreciation', $to, 'fr', $data, $reply);

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
