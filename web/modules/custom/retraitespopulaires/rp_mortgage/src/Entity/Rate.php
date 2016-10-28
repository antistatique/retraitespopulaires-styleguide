<?php

namespace Drupal\rp_mortgage\Entity;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\user\UserInterface;

/**
 * Defines the Rate entity.
 *
 * @ingroup rp_mortgage
 *
 * @ContentEntityType(
 *   id = "rp_mortgage_rate",
 *   label = @Translation("Rate"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\rp_mortgage\RateListBuilder",*
 *     "form" = {
 *       "default" = "Drupal\rp_mortgage\Form\RateForm",
 *       "add" = "Drupal\rp_mortgage\Form\RateForm",
 *       "edit" = "Drupal\rp_mortgage\Form\RateForm",
 *       "delete" = "Drupal\rp_mortgage\Form\RateDeleteForm",
 *     },
 *     "access" = "Drupal\rp_mortgage\RateAccessControlHandler",
 *   },
 *   base_table = "rp_mortgage_rate",
 *   admin_permission = "administer rate entities",
 *   entity_keys = {
 *     "id" = "id",
 *   },
 *   links = {
 *     "canonical" = "/admin/retraites-populaires/rates/{rp_mortgage_rate}",
 *     "add-form" = "/admin/retraites-populaires/rates/add",
 *     "edit-form" = "/admin/retraites-populaires/rates/{rp_mortgage_rate}/edit",
 *     "delete-form" = "/admin/retraites-populaires/rates/{rp_mortgage_rate}/delete",
 *     "collection" = "/admin/retraites-populaires/rates",
 *   }
 * )
 */
class Rate extends ContentEntityBase implements RateInterface {

  use EntityChangedTrait;

  /**
   * {@inheritdoc}
   */
  public static function preCreate(EntityStorageInterface $storage_controller, array &$values) {
    parent::preCreate($storage_controller, $values);
  }

  /**
   * {@inheritdoc}
   */
  public function getType() {
    return $this->get('type')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setType($type) {
    $this->set('type', $type);
    return $this;
  }

  /**
   * @return \DateTime|null
   */
  public function getDate() {
    $timestamp = $this->get('date')->value;

    if (!$timestamp) {
      return null;
    }

    $datetime = \DateTime::createFromFormat('U', $timestamp);

    return $datetime;
  }

  /**
   * {@inheritdoc}
   */
  public function setDate($date) {
    $this->set('date', $date);
    return $this;
  }

  public function getName() {
    return $this->get('name')->value;
  }

  public function setName($name) {
    $this->set('name', $name);
    return $this;
  }

  public function getFirstRate() {
    return (float) $this->get('first_rate')->value;
  }

  public function setFirstRate($rate) {
    $this->set('first_rate', $rate);
    return $this;
  }

  public function getSecondRate() {
    return (float) $this->get('second_rate')->value;
  }

  public function setSecondRate($rate) {
    $this->set('second_rate', $rate);
    return $this;
  }


  /**
   * @return integer
   */
  public function getYear() {
    return (int) $this->get('year')->value;
  }

  /**
   * @param integer $year
   *
   * @return $this
   */
  public function setYear($year) {
    $this->set('year', $year);
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
  public function jsonSerialize() {
    return [
      'id' => $this->id(),
      'name' => $this->getName(),
      'first_rate' => $this->getFirstRate(),
      'second_rate' => $this->getSecondRate(),
      'year' => $this->getYear(),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['type'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Type of Rate'))
      ->setDescription(t('The type of the Rate. (Eq: "Prêts hypothécaires standard", "Prêts hypothécaires formulaire", "Prêts corporations")'))
      ->setSettings(array(
        'max_length' => 255,
        'text_processing' => 0,
      ))
      ->setDefaultValue('')
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => -4,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => -4,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setRequired(true)
    ;

    $fields['name'] = BaseFieldDefinition::create('string')
        ->setLabel(t('Name of the Rate'))
        ->setDescription(t('Name. Eq: "Taux d\'intérêt Variable", "Fixe à 10 ans", ...'))
        ->setDisplayOptions('view', array(
            'label' => 'above',
            'type' => 'string',
            'weight' => 2,
        ))
        ->setDisplayOptions('form', array(
            'type' => 'string_textfield',
            'weight' => 2,
        ))
        ->setDisplayConfigurable('form', TRUE)
        ->setDisplayConfigurable('view', TRUE)
        ->setRequired(true)
    ;

    $fields['date'] = BaseFieldDefinition::create('timestamp')
        ->setLabel(t('Date'))
        ->setDescription(t('Month of validity for this rate'))
        // @TODO: Find the correct widget to set a date and transform it into a timestamp.
//        ->setDisplayOptions('view', array(
//            'label' => 'above',
//            'type' => 'timestamp',
//            'weight' => 3,
//        ))
//        ->setDisplayOptions('form', array(
//            'type' => 'datetime_timestamp',
//            'weight' => 3,
//        ))
//        ->setDisplayConfigurable('form', TRUE)
//        ->setDisplayConfigurable('view', TRUE)
        ->setRequired(true)
    ;

    $fields['first_rate'] = BaseFieldDefinition::create('decimal')
        ->setLabel(t('First Mortgage Rate'))
        ->setDescription(t('Taux pour le premier rang'))
        ->setDefaultValue(0.0)
        ->setDisplayOptions('view', array(
            'label' => 'above',
            'type' => 'decimal',
            'weight' => 4,
        ))
        ->setDisplayOptions('form', array(
            'weight' => 4,
        ))
        ->setDisplayConfigurable('form', TRUE)
        ->setDisplayConfigurable('view', TRUE)
        ->setRequired(true)
    ;

    $fields['second_rate'] = BaseFieldDefinition::create('decimal')
        ->setLabel(t('Second Mortgage Rate'))
        ->setDescription(t('Taux pour le second rang'))
        ->setDefaultValue(0.0)
        ->setDisplayOptions('view', array(
            'label' => 'above',
            'type' => 'decimal',
            'weight' => 5,
        ))
        ->setDisplayOptions('form', array(
            'weight' => 5,
        ))
        ->setDisplayConfigurable('form', TRUE)
        ->setDisplayConfigurable('view', TRUE)
        ->setRequired(true)
    ;

    $fields['year'] = BaseFieldDefinition::create('integer')
        ->setLabel(t('Year'))
        ->setDescription(t('Number of year. if this value is 5, this mean that the rate if for 5 years.'))
        ->setDefaultValue(0)
        ->setDisplayOptions('view', array(
            'label' => 'above',
            'type' => 'integer',
            'weight' => 6,
        ))
        ->setDisplayOptions('form', array(
            'weight' => 6,
        ))
        ->setDisplayConfigurable('form', TRUE)
        ->setDisplayConfigurable('view', TRUE)
        ->setRequired(true)
    ;


    $fields['created'] = BaseFieldDefinition::create('created')
      ->setLabel(t('Created'))
      ->setDescription(t('The time that the entity was created.'));

    $fields['changed'] = BaseFieldDefinition::create('changed')
      ->setLabel(t('Changed'))
      ->setDescription(t('The time that the entity was last edited.'));

    return $fields;
  }
}
