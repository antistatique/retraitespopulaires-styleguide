<?php

namespace Drupal\rp_libre_passage\Entity;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\user\UserInterface;

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
    * {@inheritdoc}
    */
    public static function preCreate(EntityStorageInterface $storage_controller, array &$values) {
        parent::preCreate($storage_controller, $values);
    }

    public function getRate($percent) {
        return (float) $this->get('rate_'.$percent)->value;
    }

    public function setRate($percent, $rate) {
        $this->set('rate_'.$percent, $rate);
        return $this;
    }

    /**
    * @return integer
    */
    public function getGender() {
        return $this->get('gender')->value;
    }

    /**
    * @param integer $gender
    *
    * @return $this
    */
    public function setGender($gender) {
        $this->set('gender', $gender);
        return $this;
    }

    /**
    * @return integer
    */
    public function getAge() {
        return (int) $this->get('age')->value;
    }

    /**
    * @param integer $age
    *
    * @return $this
    */
    public function setAge($age) {
        $this->set('age', $age);
        return $this;
    }

    /**
    * @return integer
    */
    public function getStatus() {
        return $this->get('status')->value;
    }

    /**
    * @param integer $status
    *
    * @return $this
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
            ->setSettings(array(
              'allowed_values' => array(
                'man' => 'Homme',
                'woman' => 'Femme',
              )
            ))
            ->setDisplayOptions('view', array(
                'label' => 'above',
                'type' => 'options_buttons',
                'weight' => 1,
            ))
            ->setDisplayOptions('form', array(
                'weight' => 1,
            ))
            ->setDisplayConfigurable('form', TRUE)
            ->setDisplayConfigurable('view', TRUE)
            ->setRequired(true)
        ;

        $fields['age'] = BaseFieldDefinition::create('integer')
            ->setLabel(t('Age'))
            ->setDefaultValue(18)
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

        $fields['rate_0'] = BaseFieldDefinition::create('decimal')
            ->setLabel(t('Réversibilité 0%'))
            ->setDefaultValue(0)
            ->setSettings(array(
              'scale' => 3
            ))
            ->setDisplayOptions('view', array(
                'label' => 'above',
                'type' => 'decimal',
                'weight' => 3,
            ))
            ->setDisplayOptions('form', array(
                'weight' => 3,
            ))
            ->setDisplayConfigurable('form', TRUE)
            ->setDisplayConfigurable('view', TRUE)
            ->setRequired(true)
        ;

        $fields['rate_40'] = BaseFieldDefinition::create('decimal')
            ->setLabel(t('Réversibilité 40%'))
            ->setDefaultValue(0)
            ->setSettings(array(
              'scale' => 3
            ))
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

        $fields['rate_60'] = BaseFieldDefinition::create('decimal')
            ->setLabel(t('Réversibilité 60%'))
            ->setDefaultValue(0)
            ->setSettings(array(
              'scale' => 3
            ))
            ->setDisplayOptions('view', array(
                'label' => 'above',
                'type' => 'decimal',
                'weight' => 6,
            ))
            ->setDisplayOptions('form', array(
                'weight' => 6,
            ))
            ->setDisplayConfigurable('form', TRUE)
            ->setDisplayConfigurable('view', TRUE)
            ->setRequired(true)
        ;

        $fields['rate_75'] = BaseFieldDefinition::create('decimal')
            ->setLabel(t('Réversibilité 75%'))
            ->setDefaultValue(0)
            ->setSettings(array(
              'scale' => 3
            ))
            ->setDisplayOptions('view', array(
                'label' => 'above',
                'type' => 'decimal',
                'weight' => 7,
            ))
            ->setDisplayOptions('form', array(
                'weight' => 7,
            ))
            ->setDisplayConfigurable('form', TRUE)
            ->setDisplayConfigurable('view', TRUE)
            ->setRequired(true)
        ;

        $fields['rate_80'] = BaseFieldDefinition::create('decimal')
            ->setLabel(t('Réversibilité 80%'))
            ->setDefaultValue(0)
            ->setSettings(array(
              'scale' => 3
            ))
            ->setDisplayOptions('view', array(
                'label' => 'above',
                'type' => 'decimal',
                'weight' => 8,
            ))
            ->setDisplayOptions('form', array(
                'weight' => 8,
            ))
            ->setDisplayConfigurable('form', TRUE)
            ->setDisplayConfigurable('view', TRUE)
            ->setRequired(true)
        ;

        $fields['rate_100'] = BaseFieldDefinition::create('decimal')
            ->setLabel(t('Réversibilité 100%'))
            ->setDefaultValue(0)
            ->setSettings(array(
              'scale' => 3
            ))
            ->setDisplayOptions('view', array(
                'label' => 'above',
                'type' => 'decimal',
                'weight' => 9,
            ))
            ->setDisplayOptions('form', array(
                'weight' => 9,
            ))
            ->setDisplayConfigurable('form', TRUE)
            ->setDisplayConfigurable('view', TRUE)
            ->setRequired(true)
        ;

        $fields['status'] = BaseFieldDefinition::create('boolean')
          ->setLabel(t('Published'))
          ->setDefaultValue(1)
          ->setDescription(t('The status of this entity. 0 - disabled, 1 - enabled.'))
          ->setDisplayOptions('view', array(
              'label' => 'above',
              'weight' => 100,
          ))
          ->setDisplayOptions('form', array(
              'weight' => 100,
          ))
          ->setDisplayConfigurable('form', TRUE)
          ->setDisplayConfigurable('view', TRUE)
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
