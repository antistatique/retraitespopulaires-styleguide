<?php

namespace Drupal\rp_libre_passage\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\file\Entity\File;

use Drupal\Core\Url;

use Drupal\Core\State\StateInterface;
use Drupal\file\FileUsage\FileUsageInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * Admin form class.
 */
class AdminForm extends FormBase {

  /**
   * The state key value store.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * Defines the database file usage backend.
   *
   * This is the default Drupal backend.
   *
   * @var \Drupal\file\FileUsage\FileUsageInterface
   */
  protected $fileUsage;

  /**
   * Entity Storage interface to load Nodes.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  private $entityNode;

  /**
   * Entity Storage interface to load File.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  private $entityFile;

  /**
   * Class constructor.
   */
  public function __construct(StateInterface $state, FileUsageInterface $file_usage, EntityTypeManagerInterface $entity) {
    $this->state      = $state;
    $this->fileUsage  = $file_usage;
    $this->entityNode = $entity->getStorage('node');
    $this->entityFile = $entity->getStorage('file');
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    // Instantiates this form class.
    return new static(
    // Load the service required to construct this class.
    $container->get('state'),
    $container->get('file.usage'),
    $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'rp_libre_passage_admin_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $extra = NULL) {
    // Simulator settings.
    $form['simulator'] = [
      '#type'  => 'fieldset',
      '#title' => $this->t('Simulateur de libre passage Arc-en-ciel'),
    ];

    $form['simulator']['form_pdf'] = [
      '#type'            => 'managed_file',
      '#title'           => $this->t("Demande d\'affiliation"),
      '#default_value'   => !empty($this->state->get('rp_libre_passage.settings.form_pdf')) ? [$this->state->get('rp_libre_passage.settings.form_pdf')] : NULL,
      '#upload_location' => 'public://rp_libre_passage/form_pdf',
      '#description'     => $this->t('Merci de déposer un fichier PDF.'),
    ];

    // Contact settings.
    $form['contact'] = [
      '#type'  => 'fieldset',
      '#title' => 'Contact',
    ];

    $link = Url::fromRoute('system.site_information_settings')->toString();
    $form['contact']['no_reply'] = [
      '#type'          => 'textfield',
      '#title'         => 'Adresse No-reply',
      '#disabled'      => TRUE,
      '#default_value' => $this->config('system.site')->get('mail'),
      '#description'  => $this->t('Changer votre configuration ici: <a href="@link">Configuration > Système > Paramètres de base du site</a>', ['@link' => $link]),
    ];

    $form['contact']['receivers'] = [
      '#type'          => 'textfield',
      '#title'         => "E-mail(s) notifié(s) lors d'une nouvelle demande",
      '#default_value' => $this->state->get('rp_libre_passage.settings.receivers'),
      '#description'   => $this->t('Séparer les adresses par le caractère point-virgule (;).'),
    ];

    $form['actions']['submit'] = [
      '#type'        => 'submit',
      '#value'       => $this->t('Sauvegarder'),
      '#button_type' => 'primary',
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    $mails = explode(';', $form_state->getValue('receivers'));
    $mails = array_map('trim', $mails);
    foreach ($mails as $mail) {
      if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
        $form_state->setErrorByName('receivers', $this->t("@email n'est pas une adresse valide.", ['@email' => $mail]));
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Contact settings.
    $this->state->set('rp_libre_passage.settings.receivers', trim($form_state->getValue('receivers')));

    // Save file(s)
    $files = [
      'rp_libre_passage.settings.form_pdf' => $form_state->getValue('form_pdf') ,
    ];
    foreach ($files as $key => $value) {
      if (!empty($value)) {
        $file = reset($value);
        $this->state->set($key, $file);
        $file = $this->entityFile->load($file);
        $this->saveFileAsPermanent($file);
      }
      elseif (!empty($this->state->get($key))) {
        $deleted = $this->state->get($key);
        file_delete($deleted);
        $this->state->set($key, '');
      }
    }
  }

  /**
   * Chane the $file objects status to FILE_STATUS_PERMANENT.
   */
  protected function saveFileAsPermanent(File $file) {
    if (!$file->isPermanent()) {
      $file->setPermanent();
      $file->save();
      // Add entry to file_usage.
      $this->fileUsage->add($file, 'rp_libre_passage', 'module', 1);
    }
  }

}
