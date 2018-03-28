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
      '#title' => t('Size of textfield'),
      '#default_value' => $this->getSetting('size'),
      '#required' => TRUE,
      '#min' => 1,
    ];
    $elements['placeholder'] = [
      '#type' => 'textfield',
      '#title' => t('Placeholder'),
      '#default_value' => $this->getSetting('placeholder'),
      '#description' => t('Text that will be shown inside the field until a value is entered. This hint is usually a sample value or a brief description of the expected format.'),
    ];

    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];

    $summary[] = t('Textfield size: @size', ['@size' => $this->getSetting('size')]);
    if (!empty($this->getSetting('placeholder'))) {
      $summary[] = t('Placeholder: @placeholder', ['@placeholder' => $this->getSetting('placeholder')]);
    }

    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    // Condition for display slider and slider parameter

    print_r($items->getName());
    $slider_visible_condition = [
        [':input[selector="type'.$items->getName().$delta.'"]' => ['value' => 'chf']],
        'or',
        [':input[selector="type'.$items->getName().$delta.'"]' => ['value' => 'number']],
      ];
    $slider_parms_visible_condition = [
      ':input[selector="slider'.$items->getName().$delta.'"]' => ['checked' => TRUE],
      $slider_visible_condition,
    ];

    // Configure each field
    $element['name'] = [
      '#type' => 'textfield',
      '#title' => t('Label du champ'),
      '#default_value' => isset($items[$delta]->name) ? $items[$delta]->name : NULL,
      '#size' => '20',
    ];

    $element['logismata_parameter'] = [
      '#type' => 'textfield',
      '#title' => t('Parametre Logismata'),
      '#default_value' => isset($items[$delta]->logismata_parameter) ? $items[$delta]->logismata_parameter : NULL,
      '#size' => '20',
    ];

    $element['type'] = [
      '#type' => 'select',
      '#options' => TeaserFieldType::typeOptions(),
      '#attributes' => ['selector' => ['type'.$items->getName().$delta]],
      '#title' => t('Type du champ'),
      '#default_value' => isset($items[$delta]->type) ? $items[$delta]->type : NULL,
    ];

    $element['default'] = [
      '#type' => 'textfield',
      '#title' => t('Valeur par défaut'),
      '#default_value' => isset($items[$delta]->default) ? $items[$delta]->default : NULL,
      '#size' => '20',
    ];

    $element['with_slider'] = [
      '#type' => 'checkbox',
      '#attributes' => ['selector' => ['slider'.$items->getName().$delta]],
      '#states' => ['visible' => [
            $slider_visible_condition,
          ],
        ],
      '#title' => t('Slider ?'),
      '#default_value' => isset($items[$delta]->with_slider) ? $items[$delta]->with_slider : NULL,
      '#size' => '20',
    ];

    $element['min'] = [
      '#type' => 'number',
      '#states' => [
        'visible' => [
          $slider_parms_visible_condition,
        ],
      ],
      '#title' => t('Valeur min du slider'),
      '#default_value' => isset($items[$delta]->min) ? $items[$delta]->min : NULL,
      '#size' => '20',
    ];

    $element['max'] = [
      '#type' => 'number',
      '#states' => [
        'visible' => [
          $slider_parms_visible_condition,
        ],
      ],
      '#title' => t('Valeur max du slider'),
      '#default_value' => isset($items[$delta]->max) ? $items[$delta]->max : NULL,
      '#size' => '20',
    ];

    $element['increment'] = [
      '#type' => 'number',
      '#states' => [
        'visible' => [
          $slider_parms_visible_condition,
        ],
      ],
      '#title' => t('Incrément du slider'),
      '#default_value' => isset($items[$delta]->increment) ? $items[$delta]->increment : NULL,
      '#size' => '20',
    ];

    $element += [
      '#type' => 'details',
      '#open' => TRUE,
    ];
    return $element;
  }

}
