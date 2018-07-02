<?php

namespace Drupal\rp_homepage\Form;

use Drupal\Core\Cache\CacheTagsInvalidatorInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\State\StateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Homepage Settings Form.
 */
class HomepageSettings extends FormBase {

  const NUMBER_OF_BLOCKS = 6;

  /**
   * The state key value store.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * The cache tag invalidator.
   *
   * @var \Drupal\Core\Cache\CacheTagsInvalidatorInterface
   */
  private $cacheTagsInvalidator;

  /**
   * Class constructor.
   */
  public function __construct(StateInterface $state, CacheTagsInvalidatorInterface $cacheTagsInvalidator) {
    $this->state = $state;
    $this->cacheTagsInvalidator = $cacheTagsInvalidator;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('state'),
      $container->get('cache_tags.invalidator')
    );
  }

  /**
   * Returns a unique string identifying the form.
   *
   * @return string
   *   The unique string identifying the form.
   */
  public function getFormId() {
    return 'rp_homepage_settings';
  }

  /**
   * Form constructor.
   *
   * @param array $form
   *   An associative array containing the structure of the form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   *
   * @return array
   *   The form structure.
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    // This is the magick form option to use.
    $form['#tree'] = TRUE;

    $form['highlight'] = [
      '#type'          => 'fieldset',
      '#title'         => $this->t('Bloc de mise en avant'),
    ];

    $highlightDefVal = $this->state->get('rp_homepage.highlight', []);

    $form['highlight']['enabled'] = [
      '#type'          => 'checkbox',
      '#title'         => $this->t('Activé'),
      '#default_value' => $highlightDefVal['enabled'] ?? FALSE,
    ];

    $form['highlight']['title'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Titre'),
      '#default_value' => $highlightDefVal['title'] ?? NULL,
    ];

    $form['highlight']['subtitle'] = [
      '#type'          => 'textarea',
      '#title'         => $this->t('Accroche'),
      '#default_value' => $highlightDefVal['subtitle'] ?? NULL,
    ];

    $form['highlight']['url'] = [
      '#type'          => 'url',
      '#title'         => $this->t('Lien'),
      '#default_value' => $highlightDefVal['url'] ?? NULL,
    ];

    $form['highlight']['btn_label'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Label du bouton'),
      '#default_value' => $highlightDefVal['btn_label'] ?? NULL,
    ];

    $form['highlight']['vimeo_url'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('URL de la vidéo (optionnel)'),
      '#description'   => $this->t("L'URL doit être un lien vimeo, au format <code>https://vimeo.com/242850098</code>."),
      '#default_value' => $highlightDefVal['vimeo_url'] ?? NULL,
    ];

    for ($i = 1; $i <= self::NUMBER_OF_BLOCKS; $i++) {
      $block = 'block_' . $i;

      $form['blocks'][$block] = [
        '#type'  => 'details',
        '#title' => 'Bloc #' . $i,
        '#open'  => TRUE,
      ];

      $form['blocks'][$block]['title'] = [
        '#type'          => 'textfield',
        '#title'         => $this->t('Titre'),
        '#default_value' => $this->getBlockStateValue($block, 'title'),
      ];
      $form['blocks'][$block]['url'] = [
        '#type'          => 'url',
        '#title'         => $this->t('URL du Titre'),
        '#default_value' => $this->getBlockStateValue($block, 'url'),
      ];

      $descriptionDefVal = $this->getBlockStateValue($block, 'description');
      $form['blocks'][$block]['description'] = [
        '#type'          => 'text_format',
        '#format'        => 'full_html',
        '#title'         => $this->t('Description'),
        '#default_value' => $descriptionDefVal['value'] ?? NULL,
      ];

      $form['blocks'][$block]['btn_url'] = [
        '#type'          => 'url',
        '#title'         => $this->t('Lien du bouton'),
        '#default_value' => $this->getBlockStateValue($block, 'btn_url'),
      ];

      $form['blocks'][$block]['btn_label'] = [
        '#type'          => 'textfield',
        '#title'         => $this->t('Label du bouton'),
        '#default_value' => $this->getBlockStateValue($block, 'btn_label'),
      ];
    }

    $form['actions']['submit'] = [
      '#type'        => 'submit',
      '#value'       => $this->t('Save'),
      '#button_type' => 'primary',
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    ];

    return $form;

  }

  /**
   * Form submission handler.
   *
   * @param array $form
   *   An associative array containing the structure of the form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    $this->state->set('rp_homepage.highlight', $form_state->getValue('highlight'));
    $this->state->set('rp_homepage.blocks', $form_state->getValue('blocks'));

    $this->cacheTagsInvalidator->invalidateTags(['front']);

    $this->messenger()->addStatus($this->t('Configuration de la home mise à jour'));
  }

  /**
   * Get from the State API a value for a specified block number $blockNumber.
   *
   * @param string $block
   *   Block to get.
   * @param string $key
   *   Key of value to get.
   * @param mixed $default
   *   Default value.
   *
   * @return mixed
   *   Value if exist or default.
   */
  private function getBlockStateValue($block, $key, $default = NULL) {
    $blockData = $this->state->get('rp_homepage.blocks', []);

    if (empty($blockData) || !isset($blockData[$block][$key])) {
      return $default;
    }

    return $blockData[$block][$key];
  }

}
