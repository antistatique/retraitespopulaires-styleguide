<?php

namespace Drupal\rp_libre_passage\Entity;

use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityTypeInterface;

/**
 * Defines the PLP Interest Rate entity.
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
 *   admin_permission = "administer plp interest rate entities",
 *   entity_keys = {
 *     "id" = "id",
 *   },
 *   links = {
 *     "canonical" = "/admin/retraites-populaires/libre_passage/interest-rate/{plp_interest_rate}",
 *     "add-form" = "/admin/retraites-populaires/libre_passage/interest-rate/add",
 *     "edit-form" = "/admin/retraites-populaires/libre_passage/interest-rate/{plp_interest_rate}/edit",
 *     "delete-form" = "/admin/retraites-populaires/libre_passage/interest-rate/{plp_interest_rate}/delete",
 *     "collection" = "/admin/retraites-populaires/libre_passage/interest-rate",
 *   }
 * )
 */
class PLPInterestRate extends ContentEntityBase implements PLPInterestRateInterface {

  use EntityChangedTrait;

  /**
   * Get interest rate value.
   */
  public function getRate() {
    return (float) $this->get('rate')->value;
  }

  /**
   * Set interest rate value.
   */
  public function setRate($rate) {
    $this->set('rate', $rate);
    return $this;
  }

  /**
   * Get interest rate start year.
   */
  public function getStartYear() {
    return (int) $this->get('start_year')->value;
  }

  /**
   * Set interest rate start year.
   */
  public function setStartYear($year) {
    $this->set('start_year', $year);
    return $this;
  }

  /**
   * Get interest rates end year.
   */
  public function getEndYear() {
    return (int) $this->get('end_year')->value;
  }

  /**
   * Set interest rates end year.
   */
  public function setEndYear($year) {
    $this->set('end_year', $year);
    return $this;
  }

  /**
   * Get interest rates status.
   */
  public function getStatus() {
    return $this->get('status')->value;
  }

  /**
   * Set interest rates status.
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

    $fields['rate'] = BaseFieldDefinition::create('decimal')
      ->setLabel(t('PLP Interest Rate'))
      ->setDescription(t("Taux d'intérêt"))
      ->setDefaultValue(0.0)
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'decimal',
        'weight' => 1,
      ])
      ->setDisplayOptions('form', [
        'weight' => 1,
      ])
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setRequired(TRUE);

    $fields['start_year'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('Année de début'))
      ->setDescription(t('The start year'))
      ->setDefaultValue(1900)
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

    $fields['end_year'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('Année de fin'))
      ->setDescription(t('The end year'))
      ->setDefaultValue(9999)
      ->setSetting('unsigned', TRUE)
      ->setDisplayOptions('view', [
        'label' => 'above',
        'type' => 'integer',
        'weight' => 3,
      ])
      ->setDisplayOptions('form', [
        'weight' => 3,
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
