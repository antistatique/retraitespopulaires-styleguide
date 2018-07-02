<?php

namespace Drupal\rp_libre_passage\Entity;

use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityTypeInterface;

/**
 * Defines the PLP Conversion Rate entity.
 *
 * @ingroup rp_libre_passage
 *
 * @ContentEntityType(
 *   id = "plp_conversion_rate",
 *   label = @Translation("PLP Conversion Rate"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\rp_libre_passage\PLPConversionRateListBuilder",
 *     "views_data" = "Drupal\rp_libre_passage\Entity\PLPConversionRateViewsData",
 *     "form" = {
 *       "default" = "Drupal\Core\Entity\ContentEntityForm",
 *       "add" = "Drupal\Core\Entity\ContentEntityForm",
 *       "edit" = "Drupal\Core\Entity\ContentEntityForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm",
 *     },
 *     "access" = "Drupal\rp_libre_passage\PLPConversionRateAccessControlHandler"
 *   },
 *   base_table = "rp_libre_passage_conversion_rate",
 *   admin_permission = "administer plp conversion rate entities",
 *   entity_keys = {
 *     "id" = "id",
 *   },
 *   links = {
 *     "canonical" = "/admin/retraites-populaires/libre_passage/conversion-rate/plp_conversion_rate/{plp_conversion_rate}",
 *     "add-form" = "/admin/retraites-populaires/libre_passage/conversion-rate/plp_conversion_rate/add",
 *     "edit-form" = "/admin/retraites-populaires/libre_passage/conversion-rate/plp_conversion_rate/{plp_conversion_rate}/edit",
 *     "delete-form" = "/admin/retraites-populaires/libre_passage/conversion-rate/plp_conversion_rate/{plp_conversion_rate}/delete",
 *     "collection" = "/admin/retraites-populaires/libre_passage/conversion-rate/plp_conversion_rate",
 *   }
 * )
 */
class PLPConversionRate extends ContentEntityBase implements PLPConversionRateInterface {

  use EntityChangedTrait;

  /**
   * Get conversion rate value.
   */
  public function getRate($percent) {
    return (float) $this->get('rate_' . $percent)->value;
  }

  /**
   * Set conversion rate value.
   */
  public function setRate($percent, $rate) {
    $this->set('rate_' . $percent, $rate);
    return $this;
  }

  /**
   * Get conversion rate gender.
   */
  public function getGender() {
    return $this->get('gender')->value;
  }

  /**
   * Set conversion rate gender.
   */
  public function setGender($gender) {
    $this->set('gender', $gender);
    return $this;
  }

  /**
   * Get conversion rate age.
   */
  public function getAge() {
    return (int) $this->get('age')->value;
  }

  /**
   * Set conversion rate age.
   */
  public function setAge($age) {
    $this->set('age', $age);
    return $this;
  }

  /**
   * Get conversion rate status.
   */
  public function getStatus() {
    return $this->get('status')->value;
  }

  /**
   * Set conversion rate status.
   */
  public function setStatus($status) {
    $this->set('status', $status);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getCreatedTime() {
    return $this->get('created')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setCreatedTime($timestamp) {
    $this->set('created', $timestamp);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['gender'] = BaseFieldDefinition::create('list_string')
      ->setLabel(t('Genre'))
      ->setSettings([
        'allowed_values' => [
          'man' => 'Homme',
          'woman' => 'Femme',
        ],
      ])
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'options_buttons',
        'weight' => 1,
      ])
      ->setDisplayOptions('form', [
        'weight' => 1,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setRequired(TRUE);

    $fields['age'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('Age'))
      ->setDefaultValue(18)
      ->setSetting('unsigned', TRUE)
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'integer',
        'weight' => 2,
      ])
      ->setDisplayOptions('form', [
        'weight' => 2,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setRequired(TRUE);

    $fields['rate_0'] = BaseFieldDefinition::create('decimal')
      ->setLabel(t('Réversibilité 0%'))
      ->setDefaultValue(0)
      ->setSettings([
        'scale' => 3,
      ])
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'decimal',
        'weight' => 3,
      ])
      ->setDisplayOptions('form', [
        'weight' => 3,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setRequired(TRUE);

    $fields['rate_40'] = BaseFieldDefinition::create('decimal')
      ->setLabel(t('Réversibilité 40%'))
      ->setDefaultValue(0)
      ->setSettings([
        'scale' => 3,
      ])
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'decimal',
        'weight' => 5,
      ])
      ->setDisplayOptions('form', [
        'weight' => 5,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setRequired(TRUE);

    $fields['rate_60'] = BaseFieldDefinition::create('decimal')
      ->setLabel(t('Réversibilité 60%'))
      ->setDefaultValue(0)
      ->setSettings([
        'scale' => 3,
      ])
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'decimal',
        'weight' => 6,
      ])
      ->setDisplayOptions('form', [
        'weight' => 6,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setRequired(TRUE);

    $fields['rate_75'] = BaseFieldDefinition::create('decimal')
      ->setLabel(t('Réversibilité 75%'))
      ->setDefaultValue(0)
      ->setSettings([
        'scale' => 3,
      ])
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'decimal',
        'weight' => 7,
      ])
      ->setDisplayOptions('form', [
        'weight' => 7,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setRequired(TRUE);

    $fields['rate_80'] = BaseFieldDefinition::create('decimal')
      ->setLabel(t('Réversibilité 80%'))
      ->setDefaultValue(0)
      ->setSettings([
        'scale' => 3,
      ])
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'decimal',
        'weight' => 8,
      ])
      ->setDisplayOptions('form', [
        'weight' => 8,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setRequired(TRUE);

    $fields['rate_100'] = BaseFieldDefinition::create('decimal')
      ->setLabel(t('Réversibilité 100%'))
      ->setDefaultValue(0)
      ->setSettings([
        'scale' => 3,
      ])
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'decimal',
        'weight' => 9,
      ])
      ->setDisplayOptions('form', [
        'weight' => 9,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setRequired(TRUE);

    $fields['status'] = BaseFieldDefinition::create('boolean')
      ->setLabel(t('Published'))
      ->setDefaultValue(1)
      ->setDescription(t('The status of this entity. 0 - disabled, 1 - enabled.'))
      ->setDisplayOptions('view', [
        'label' => 'above',
        'weight' => 100,
      ])
      ->setDisplayOptions('form', [
        'weight' => 100,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE);

    $fields['created'] = BaseFieldDefinition::create('created')
      ->setLabel(t('Created'))
      ->setDescription(t('The time that the entity was created.'));

    $fields['changed'] = BaseFieldDefinition::create('changed')
      ->setLabel(t('Changed'))
      ->setDescription(t('The time that the entity was last edited.'));

    return $fields;
  }

}
