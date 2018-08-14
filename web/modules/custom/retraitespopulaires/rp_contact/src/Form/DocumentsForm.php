<?php

namespace Drupal\rp_contact\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\Render\Element\Checkboxes;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\TempStore\PrivateTempStoreFactory;
use Drupal\Core\Mail\MailManagerInterface;
use Drupal\Core\State\StateInterface;

/**
 * Document form class.
 */
class DocumentsForm extends FormBase {

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
    return 'rp_contact_documents_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $params = NULL) {
    $form['#action'] = '#rp-contact-documents-form';

    // Disable caching & HTML5 validation.
    $form['#cache']['max-age'] = 0;
    $form['#attributes']['novalidate'] = 'novalidate';

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

    $form['documents'] = [
      '#type'       => 'fieldset',
      '#attributes' => ['class' => ['fieldset-no-legend ']],
      '#title'      => $this->t('Votre demande de commande de document'),
      '#prefix'     => '<h3 class="card-title">' . $this->t('Votre demande de commande de document') . '</h3>' . '<div class="well m-t-1">' . $this->t('Merci de bien vouloir sélectionner au minimum un document.') . '</div>',
    ];

    $form['documents']['policies'] = [
      '#type'        => 'checkboxes',
      '#attributes'  => ['title' => $this->t("Police d'assurance")],
      '#options'     => [
        'Copie de police' => $this->t('Copie de police'),
        'Déclaration de perte de police' => $this->t('Déclaration de perte de police'),
        'Provision de certificats de vie' => $this->t('Provision de certificats de vie'),
        'Valeur de rachat actuelle à titre informatif' => $this->t('Valeur de rachat actuelle à titre informatif'),
      ],
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    $form['documents']['attestations'] = [
      '#type'        => 'checkboxes',
      '#attributes'  => ['title' => $this->t('Attestations fiscales')],
      '#options'     => [
        'Dernière année' => $this->t('Dernière année'),
        'Autre(s) année(s)' => $this->t('Autre(s) année(s)'),
      ],
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    $form['documents']['other_year'] = [
      '#title'       => $this->t('Autre(s) année(s)'),
      '#type'        => 'textfield',
    ];

    $form['documents']['payments'] = [
      '#type'        => 'checkboxes',
      '#attributes'  => ['title' => $this->t('Moyen de paiement')],
      '#options'     => [
        'Copie des factures ouvertes' => $this->t('Copie des factures ouvertes'),
        'Stock de BVR+' => $this->t('Stock de BVR+'),
        'Relevé des factures et encaissements' => $this->t('Relevé des factures et encaissements'),
      ],
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    $form['documents']['message'] = [
      '#title'       => $this->t('Votre message'),
      '#type'        => 'textarea',
      '#attributes'  => ['cols' => 59],
    ];

    $form['personnal'] = [
      '#type'       => 'fieldset',
      '#attributes' => ['class' => ['fieldset-no-legend ']],
      '#title'      => $this->t('Vos informations'),
      '#prefix'     => '<h3 class="card-title">' . $this->t('Vos informations') . '</h3>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['policy']) && $error_msg = $this->session->get('errors')['policy']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['personnal']['policy'] = [
      '#title'       => $this->t('Numéro(s) de police(s) *'),
      '#placeholder' => $this->t('123456789'),
      '#type'        => 'textfield',
      '#required'    => FALSE,
      '#prefix'      => '<div class="form-group ' . $error_class . '">',
      '#suffix'      => $error . '</div>',
    ];

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['civil_state']) && $error_msg = $this->session->get('errors')['civil_state']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['personnal']['civil_state'] = [
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

    // Get error to inline it as suffix
    // TODO Found better solution to inline errors than hack session to.
    $error = '';
    $error_class = '';
    if (isset($this->session->get('errors')['address']) && $error_msg = $this->session->get('errors')['address']) {
      $error_class = 'error';
      $error = '<div class="input-error-desc">' . $error_msg . '</div>';
    }
    $form['personnal']['address'] = [
      '#title'       => $this->t('Votre adresse *'),
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
    if (!$form_state->getValue('phone') || empty($form_state->getValue('phone'))) {
      $errors['phone'] = $this->t('Le numéro de téléphone est obligatoire.');
    }

    // Assert the birthdate is valid.
    if (!$form_state->getValue('birthdate') || empty($form_state->getValue('birthdate'))) {
      $errors['birthdate'] = $this->t('Votre date de naissance est obligatoire.');
    }
    elseif (\DateTime::createFromFormat('d/m/Y', $form_state->getValue('birthdate')) === FALSE) {
      $errors['birthdate'] = $this->t('Votre date de naissance semble invalide.');
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
      $errors['city'] = $this->t('Votre localité est obligatoire.');
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
        'policies'     => Checkboxes::getCheckedCheckboxes($form_state->getValue('policies')),
        'attestations' => Checkboxes::getCheckedCheckboxes($form_state->getValue('attestations')),
        'other_year'   => $form_state->getValue('other_year'),
        'payments'     => Checkboxes::getCheckedCheckboxes($form_state->getValue('payments')),
        'message'      => $form_state->getValue('message'),
      ];

      // Send to admin.
      $to = preg_replace('/\s+/', ' ', $this->state->get('rp_contact.settings.documents')['receivers']);
      $to = str_replace(';', ',', $to);
      $reply = $form_state->getValue('email');
      $this->mail->mail('rp_contact', 'contact_documents', $to, 'fr', $data, $reply);

      // Send to client.
      $this->mail->mail('rp_contact', 'feedback_generical', $form_state->getValue('email'), 'fr');

      $this->messenger()->addStatus($this->t("Merci @firstname @lastname pour votre demande. Nous allons la traiter rapidement et vous recontacter à l'adresse @email.", [
        '@firstname' => $form_state->getValue('firstname'),
        '@lastname'  => $form_state->getValue('lastname'),
        '@email'     => $form_state->getValue('email'),
      ]));
    }
  }

}
