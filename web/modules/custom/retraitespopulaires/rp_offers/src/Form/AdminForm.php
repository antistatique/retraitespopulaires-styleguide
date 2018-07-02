<?php

namespace Drupal\rp_offers\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\State\StateInterface;
use Drupal\Core\Render\MetadataBubblingUrlGenerator;
use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * Admin form.
 */
class AdminForm extends FormBase {

  /**
   * The state key value store.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  private $state;

  /**
   * Decorator for the URL generator, which bubbles bubbleable URL metadata.
   *
   * @var \Drupal\Core\Render\MetadataBubblingUrlGenerator
   */
  private $url;

  /**
   * EntityTypeManagerInterface to load Nodes.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityNode;

  /**
   * Class constructor.
   */
  public function __construct(StateInterface $state, MetadataBubblingUrlGenerator $url, EntityTypeManagerInterface $entity) {
    $this->entityNode = $entity->getStorage('node');
    $this->state      = $state;
    $this->url        = $url;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    // Instantiates this form class.
    return new static(
    // Load the service required to construct this class.
    $container->get('state'),
    $container->get('url_generator'),
    $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'rp_offers_admin_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $extra = NULL) {
    // Offers settings.
    $form['offers'] = [
      '#type'  => 'fieldset',
      '#title' => 'Offre',
    ];

    $link = $this->url->generateFromRoute('system.site_information_settings');
    $form['offers']['no_reply'] = [
      '#type'          => 'textfield',
      '#title'         => 'Adresse No-reply',
      '#disabled'      => TRUE,
      '#default_value' => $this->config('system.site')->get('mail'),
      '#description'  => $this->t('Changer votre configuration ici: <a href="@link">Configuration > Système > Paramètres de base du site</a>', ['@link' => $link]),
    ];

    $form['offers']['receivers'] = [
      '#type'          => 'textfield',
      '#title'         => 'E-mail(s) notifié(s) lors d\'une nouvelle demande',
      '#default_value' => $this->state->get('rp_offers.settings.receivers'),
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
    // General settings.
    $this->state->set('rp_offers.settings.receivers', trim($form_state->getValue('receivers')));
  }

}
