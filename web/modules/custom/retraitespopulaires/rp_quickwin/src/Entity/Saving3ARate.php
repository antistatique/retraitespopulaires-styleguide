<?php

namespace Drupal\rp_quickwin\Entity;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityTypeInterface;

/**
 * Defines the Saving 3a Rate entity.
 *
 * @ingroup rp_quickwin
 *
 * @ContentEntityType(
 *   id = "rp_quickwin_saving_3a_rate",
 *   label = @Translation("Saving 3a Rate"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\rp_quickwin\Saving3ARateListBuilder",*
 *     "form" = {
 *       "default" = "Drupal\rp_quickwin\Form\Saving3ARateForm",
 *       "add" = "Drupal\rp_quickwin\Form\Saving3ARateForm",
 *       "edit" = "Drupal\rp_quickwin\Form\Saving3ARateForm",
 *       "delete" = "Drupal\rp_quickwin\Form\Saving3ARateDeleteForm",
 *     },
 *     "access" = "Drupal\rp_quickwin\Saving3ARateAccessControlHandler",
 *   },
 *   base_table = "rp_quickwin_saving_3a_rate",
 *   admin_permission = "administer saving 3a rate entities",
 *   entity_keys = {
 *     "id" = "id",
 *   },
 *   links = {
 *     "canonical" = "/admin/retraites-populaires/quickwin/saving3arates/{rp_quickwin_saving_3a_rate}",
 *     "add-form" = "/admin/retraites-populaires/quickwin/saving3arates/add",
 *     "edit-form" = "/admin/retraites-populaires/quickwin/saving3arates/{rp_quickwin_saving_3a_rate}/edit",
 *     "delete-form" = "/admin/retraites-populaires/quickwin/saving3arates/{rp_quickwin_saving_3a_rate}/delete",
 *     "collection" = "/admin/retraites-populaires/quickwin/saving3arates",
 *   }
 * )
 */
class Saving3ARate extends ContentEntityBase implements Saving3ARateInterface {

  use EntityChangedTrait;

  /**
   * {@inheritdoc}
   */
  public static function preCreate(EntityStorageInterface $storage_controller, array &$values) {
    parent::preCreate($storage_controller, $values);
  }

  public function getName() {
    return $this->get('name')->value;
  }

  public function setName($name) {
    $this->set('name', $name);
    return $this;
  }

  public function getRate() {
    return (float) $this->get('rate')->value;
  }

  public function setRate($rate) {
    $this->set('rate', $rate);
    return $this;
  }

  public function isAlterable() {
    return (float) $this->get('alterable')->value;
  }

  public function setAlterable($alterable) {
    $this->set('alterable', $alterable);
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
      'rate' => $this->getRate(),
      'alterable' => $this->isAlterable(),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    $fields['name'] = BaseFieldDefinition::create('string')
      ->setLabel(t('Name of the Rate'))
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'string',
        'weight' => 1,
      ))
      ->setDisplayOptions('form', array(
        'type' => 'string_textfield',
        'weight' => 1,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setRequired(true);

    $fields['rate'] = BaseFieldDefinition::create('decimal')
      ->setLabel(t('Rate'))
      ->setDescription(t('Taux pour l\'épargne'))
      ->setDefaultValue(0.0)
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'decimal',
        'weight' => 2,
      ))
      ->setDisplayOptions('form', array(
        'weight' => 2,
      ))
      ->setDisplayConfigurable('form', TRUE)
      ->setDisplayConfigurable('view', TRUE)
      ->setRequired(true);

    $fields['alterable'] = BaseFieldDefinition::create('boolean')
      ->setLabel(t('Alterable'))
      ->setDescription(t('L\'utilisateur peut changer la valeur'))
      ->setDefaultValue(0.0)
      ->setDisplayOptions('view', array(
        'label' => 'above',
        'type' => 'checkbox',
        'weight' => 3,
      ))
      ->setDisplayOptions('form', array(
        'weight' => 3,
      ))
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
