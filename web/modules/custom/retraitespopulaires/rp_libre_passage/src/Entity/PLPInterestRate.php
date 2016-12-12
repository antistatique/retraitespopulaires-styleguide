<?php

namespace Drupal\rp_libre_passage\Entity;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityTypeInterface;

/**
 * Defines the PLP Interesst Rate entity.
 *
 * @ingroup rp_libre_passage
 *
 * @ContentEntityType(
 *   id = "plp_interest_rate",
 *   label = @Translation("PLP Taux d'intérêt"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\rp_libre_passage\PLPInterestRateListBuilder",
 *     "form" = {
 *       "default" = "Drupal\Core\Entity\ContentEntityForm",
 *       "add" = "Drupal\Core\Entity\ContentEntityForm",
 *       "edit" = "Drupal\Core\Entity\ContentEntityForm",
 *       "delete" = "Drupal\Core\Entity\ContentEntityDeleteForm",
 *     },
 *     "access" = "Drupal\rp_libre_passage\PLPInterestRateAccessControlHandler",
 *   },
 *   base_table = "rp_libre_passage_interest_rate",
 *   admin_permission = "administer plp taux d intérêt entities",
 *   entity_keys = {
 *     "id" = "id",
 *   },
 *   links = {
 *     "canonical" = "/admin/retraites-populaires/libre_passage/plp-interest-rate/plp_interest_rate/{plp_interest_rate}",
 *     "add-form" = "/admin/retraites-populaires/libre_passage/plp-interest-rate/plp_interest_rate/add",
 *     "edit-form" = "/admin/retraites-populaires/libre_passage/plp-interest-rate/plp_interest_rate/{plp_interest_rate}/edit",
 *     "delete-form" = "/admin/retraites-populaires/libre_passage/plp-interest-rate/plp_interest_rate/{plp_interest_rate}/delete",
 *     "collection" = "/admin/retraites-populaires/libre_passage/plp-interest-rate/plp_interest_rate",
 *   }
 * )
 */
class PLPInterestRate extends ContentEntityBase implements PLPInterestRateInterface {

  use EntityChangedTrait;

  /**
   * {@inheritdoc}
   */
  public static function preCreate(EntityStorageInterface $storage_controller, array &$values) {
    parent::preCreate($storage_controller, $values);
  }

  public function getRate() {
    return (float) $this->get('rate')->value;
  }

  public function setRate($rate) {
    $this->set('rate', $rate);
    return $this;
  }

  /**
   * @return integer
   */
  public function getStartYear() {
    return (int) $this->get('start_year')->value;
  }

  /**
   * @param integer $start_year
   *
   * @return $this
   */
  public function setStartYear($year) {
    $this->set('start_year', $year);
    return $this;
  }

  /**
  * @return integer
  */
  public function getEndYear() {
      return (int) $this->get('end_year')->value;
  }

  /**
  * @param integer $end_year
  *
  * @return $this
  */
  public function setEndYear($year) {
      $this->set('end_year', $year);
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

      $fields['rate'] = BaseFieldDefinition::create('decimal')
          ->setLabel(t('PLP Interest Rate'))
          ->setDescription(t('Taux d\'intérêt'))
          ->setDefaultValue(0.0)
          ->setDisplayOptions('view', array(
              'label' => 'above',
              'type' => 'decimal',
              'weight' => 1,
          ))
          ->setDisplayOptions('form', array(
              'weight' => 1,
          ))
          ->setDisplayConfigurable('form', TRUE)
          ->setDisplayConfigurable('view', TRUE)
          ->setRequired(true)
      ;

      $fields['start_year'] = BaseFieldDefinition::create('integer')
          ->setLabel(t('Année de début'))
          ->setDescription(t('The start year'))
          ->setDefaultValue(1900)
          ->setSetting('unsigned', TRUE)
          ->setDisplayOptions('view', array(
              'label' => 'above',
              'type' => 'integer',
              'weight' => 2,
          ))
          ->setDisplayOptions('form', array(
              'weight' => 2,
          ))
          ->setDisplayConfigurable('form', TRUE)
          ->setDisplayConfigurable('view', TRUE)
          ->setRequired(true)
      ;

      $fields['end_year'] = BaseFieldDefinition::create('integer')
          ->setLabel(t('Année de fin'))
          ->setDescription(t('The end year'))
          ->setDefaultValue(9999)
          ->setSetting('unsigned', TRUE)
          ->setDisplayOptions('view', array(
              'label' => 'above',
              'type' => 'integer',
              'weight' => 3,
          ))
          ->setDisplayOptions('form', array(
              'weight' => 3,
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
