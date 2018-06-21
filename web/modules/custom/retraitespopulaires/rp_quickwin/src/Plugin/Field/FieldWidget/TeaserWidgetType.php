<?php

namespace Drupal\rp_quickwin\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\rp_quickwin\Plugin\Field\FieldType\TeaserFieldType;

/**
 * Plugin implementation of the 'rp_quickwin_teaser_widget_type' widget.
 *
 * @FieldWidget(
 *   id = "rp_quickwin_teaser_widget_type",
 *   label = @Translation("Teaser widget type"),
 *   field_types = {
 *     "rp_quickwin_teaser_field_type"
 *   }
 * )
 */
class TeaserWidgetType extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'size' => 20,
      'placeholder' => '',
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $elements = [];

    $elements['size'] = [
      '#type' => 'number',
      '#title' => $this->t('Size of textfield'),
      '#default_value' => $this->getSetting('size'),
      '#required' => TRUE,
      '#min' => 1,
    ];
    $elements['placeholder'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Placeholder'),
      '#default_value' => $this->getSetting('placeholder'),
      '#description' => $this->t('Text that will be shown inside the field until a value is entered. This hint is usually a sample value or a brief description of the expected format.'),
    ];

    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];

    $summary[] = $this->t('Textfield size: @size', ['@size' => $this->getSetting('size')]);
    if (!empty($this->getSetting('placeholder'))) {
      $summary[] = $this->t('Placeholder: @placeholder', ['@placeholder' => $this->getSetting('placeholder')]);
    }

    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    // Condition for display slider and slider parameter.
    $slider_visible_condition = [
        [':input[selector="type' . $items->getName() . $delta . '"]' => ['value' => 'chf']],
      'or',
        [':input[selector="type' . $items->getName() . $delta . '"]' => ['value' => 'number']],
    ];

    // Configure each field.
    $element['name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Label du champ'),
      '#default_value' => isset($items[$delta]->name) ? $items[$delta]->name : NULL,
      '#size' => '20',
    ];

    $element['logismata_parameter'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Parametre Logismata'),
      '#default_value' => isset($items[$delta]->logismata_parameter) ? $items[$delta]->logismata_parameter : NULL,
      '#size' => '20',
    ];

    $element['type'] = [
      '#type' => 'select',
      '#options' => TeaserFieldType::typeOptions(),
      '#attributes' => ['selector' => ['type' . $items->getName() . $delta]],
      '#title' => $this->t('Type du champ'),
      '#default_value' => isset($items[$delta]->type) ? $items[$delta]->type : NULL,
    ];

    $element['default'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Valeur par défaut'),
      '#default_value' => isset($items[$delta]->default) ? $items[$delta]->default : NULL,
      '#size' => '20',
    ];

    $element['with_slider'] = [
      '#type' => 'checkbox',
      '#attributes' => ['selector' => ['slider' . $items->getName() . $delta]],
      '#states' => [
        'visible' => [
          $slider_visible_condition,
        ],
      ],
      '#title' => $this->t('Slider ?'),
      '#default_value' => isset($items[$delta]->with_slider) ? $items[$delta]->with_slider : NULL,
      '#size' => '20',
    ];

    $element['slider'] = [
      '#type' => 'fieldset',
      '#title' => $this->t('Slider option'),
      '#states' => [
        'visible' => [
          0 => $slider_visible_condition,
          ':input[selector="slider' . $items->getName() . $delta . '"]' => ['checked' => TRUE],
        ],
      ],
    ];

    $element['slider']['min'] = [
      '#type' => 'number',
      '#title' => $this->t('Valeur min du slider'),
      '#default_value' => isset($items[$delta]->min) ? $items[$delta]->min : 0,
      '#size' => '20',
    ];

    $element['slider']['max'] = [
      '#type' => 'number',
      '#title' => $this->t('Valeur max du slider'),
      '#default_value' => isset($items[$delta]->max) ? $items[$delta]->max : 0,
      '#size' => '20',
    ];

    $element['slider']['increment'] = [
      '#type' => 'number',
      '#title' => $this->t('Incrément du slider'),
      '#default_value' => isset($items[$delta]->increment) ? $items[$delta]->increment : 0,
      '#size' => '20',
    ];

    $element += [
      '#type' => 'details',
      '#open' => TRUE,
    ];
    return $element;
  }

}
