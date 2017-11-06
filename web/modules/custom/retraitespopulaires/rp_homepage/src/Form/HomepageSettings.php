<?php
namespace Drupal\rp_homepage\Form;

use Drupal\Core\Cache\CacheTagsInvalidatorInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\State\StateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class HomepageSettings extends FormBase {

  CONST NUMBER_OF_BLOCKS = 6;

  /**
   * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
   * @var StateInterface
   */
  protected $state;

  /**
   * @var \Drupal\Core\Cache\CacheTagsInvalidatorInterface
   */
  private $cacheTagsInvalidator;

  /**
   * Class constructor.
   *
   * @param \Drupal\Core\State\StateInterface                $state
   * @param \Drupal\Core\Cache\CacheTagsInvalidatorInterface $cacheTagsInvalidator
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
   * @param array                                $form
   *   An associative array containing the structure of the form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   *
   * @return array
   *   The form structure.
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    // This is the magick form option to use
    $form['#tree'] = TRUE;

    $form['highlight'] = [
      '#type'          => 'fieldset',
      '#title'         => $this->t('Bloc de mise en avant'),
    ];

    $highlight_default_value = $this->state->get('rp_homepage.highlight', []);

    $form['highlight']['enabled'] = [
      '#type'          => 'checkbox',
      '#title'         => $this->t('Activé'),
      '#default_value' => $highlight_default_value['enabled'] ?? FALSE,
    ];

    $form['highlight']['title'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Titre'),
      '#default_value' => $highlight_default_value['title'] ?? NULL,
    ];

    $form['highlight']['subtitle'] = [
      '#type'          => 'textarea',
      '#title'         => $this->t('Accroche'),
      '#default_value' => $highlight_default_value['subtitle'] ?? NULL,
    ];

    $form['highlight']['url'] = [
      '#type'          => 'url',
      '#title'         => $this->t('Lien'),
      '#default_value' => $highlight_default_value['url'] ?? NULL,
    ];

    $form['highlight']['btn_label'] = [
      '#type'          => 'textfield',
      '#title'         => $this->t('Label du bouton'),
      '#default_value' => $highlight_default_value['btn_label'] ?? NULL,
    ];

    for($i=1; $i <= self::NUMBER_OF_BLOCKS; $i++) {
      $block = 'block_'.$i;

      $form['blocks'][$block] = [
        '#type'  => 'details',
        '#title' => 'Bloc #' . $i,
        '#open'  => TRUE,
      ];

      $form['blocks'][$block]['title'] = [
        '#type'          => 'textfield',
        '#title'         => $this->t('Titre'),
        '#default_value' => $this->getBlockStateValue($block, 'title')
      ];
      $form['blocks'][$block]['url'] = [
        '#type'          => 'url',
        '#title'         => $this->t('URL du Titre'),
        '#default_value' => $this->getBlockStateValue($block, 'url')
      ];

      $description_default_value = $this->getBlockStateValue($block, 'description');
      $form['blocks'][$block]['description'] = [
        '#type'          => 'text_format',
        '#format'        => 'full_html',
        '#title'         => $this->t('Description'),
        '#default_value' => $description_default_value['value'] ?? NULL,
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
   * @param array                                $form
   *   An associative array containing the structure of the form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    $this->state->set('rp_homepage.highlight', $form_state->getValue('highlight'));
    $this->state->set('rp_homepage.blocks', $form_state->getValue('blocks'));

    $this->cacheTagsInvalidator->invalidateTags(['front']);

    drupal_set_message(t('Configuration de la home mise à jour'));
  }

  /**
   * Get from the State API a value for a specified block number $blockNumber.
   *
   * @param string $blockNumber
   * @param string $key
   * @param mixed  $default
   *
   * @return mixed
   */
  private function getBlockStateValue($block, $key, $default = NULL)
  {
    $blockData = $this->state->get('rp_homepage.blocks', []);

    if (empty($blockData) || !isset($blockData[$block][$key])) {
      return $default;
    }

    return $blockData[$block][$key];
  }
}
