<?php

namespace Drupal\rp_quickwin\Plugin\Field\FieldType;

use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\Core\TypedData\DataDefinition;

/**
 * Plugin implementation of the 'rp_quickwin_teaser_field_type' field type.
 *
 * @FieldType(
 *   id = "rp_quickwin_teaser_field_type",
 *   label = @Translation("Teaser field type"),
 *   description = @Translation("Teaser Field Type"),
 *   default_widget = "rp_quickwin_teaser_widget_type",
 *   default_formatter = "rp_quickwin_teaser_formatter_type"
 * )
 */
class TeaserFieldType extends FieldItemBase {
  /**
   * {@inheritdoc}
   */
  public static function defaultStorageSettings() {
    // TODO to improve
    return [ ] + parent::defaultStorageSettings();
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    // Prevent early t() calls by using the TranslatableMarkup.
    $properties['logismata_parameter'] = DataDefinition::create('string')
      ->setLabel(new TranslatableMarkup('Parametre pour Logismata'))
      ->setRequired(TRUE);

    $properties['name'] = DataDefinition::create('string')
      ->setLabel(new TranslatableMarkup('Text du label'))
      ->setRequired(TRUE);

    $properties['type'] = DataDefinition::create('string')
      ->setLabel(new TranslatableMarkup('Type du champ'))
      ->setRequired(TRUE);

    $properties['default'] = DataDefinition::create('string')
      ->setLabel(new TranslatableMarkup('Valeur par défaut'))
      ->setRequired(FALSE);

    $properties['with_slider'] = DataDefinition::create('boolean')
      ->setLabel(new TranslatableMarkup('Avec ou sans slider '))
      ->setRequired(FALSE);

    $properties['min'] = DataDefinition::create('integer')
      ->setLabel(new TranslatableMarkup('Valeur min du slider'))
      ->setRequired(FALSE);

    $properties['max'] = DataDefinition::create('integer')
      ->setLabel(new TranslatableMarkup('Valeur max du slider'))
      ->setRequired(FALSE);

    $properties['increment'] = DataDefinition::create('integer')
      ->setLabel(new TranslatableMarkup('Incrementation du slider'))
      ->setRequired(FALSE);


    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition) {
    // TODO to improve
    $schema = [
      'columns' => [
        'logismata_parameter' => [
          'type' => 'varchar',
          'length' => '255',
        ],
        'name' => [
          'type' => 'varchar',
          'length' => '255',
        ],
        'type' => [
          'type' => 'varchar',
          'length' => '255',
        ],
        'default' => [
          'type' => 'varchar',
          'length' => '255',
        ],
        'with_slider' => [
          'type' => 'int',
          'size' => 'tiny',
          'not null' => false,
        ],
        'min' => [
          'type' => 'int',
          'not null' => false,
        ],
        'max' => [
          'type' => 'int',
          'not null' => false,
        ],
        'increment' => [
          'type' => 'int',
          'not null' => false,
        ],
      ],
    ];

    return $schema;
  }

  public static function typeOptions(){
    return [
      'chf' => 'CHF',
      'npa' => 'NPA',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getConstraints() {
    $constraints = parent::getConstraints();

    // TODO
    if ($max_length = $this->getSetting('max_length')) {
      $constraint_manager = \Drupal::typedDataManager()->getValidationConstraintManager();
      $constraints[] = $constraint_manager->create('ComplexData', [
        'logismata_parameter' => [
          'Length' => [
            'max' => $max_length,
            'maxMessage' => t('%name: may not be longer than @max characters.', [
              '%name' => $this->getFieldDefinition()->getLabel(),
              '@max' => $max_length
            ]),
          ],
        ],
      ]);
    }

    return $constraints;
  }

  /**
   * {@inheritdoc}
   */
  public function storageSettingsForm(array &$form, FormStateInterface $form_state, $has_data) {
    $elements = [];

    // TODO
    $elements['max_length'] = [
      '#type' => 'number',
      '#title' => t('Maximum length'),
      '#default_value' => $this->getSetting('max_length'),
      '#required' => TRUE,
      '#description' => t('The maximum length of the field in characters.'),
      '#min' => 1,
      '#disabled' => $has_data,
    ];

    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function isEmpty() {
    $value = empty($this->get('logismata_parameter')->getValue());
    $value |= empty($this->get('name')->getValue());
    $value |= empty($this->get('type')->getValue());
    return $value;
  }

}
