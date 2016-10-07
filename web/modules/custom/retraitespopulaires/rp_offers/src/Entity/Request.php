<?php
/**
 * @file
 * Contains \Drupal\rp_offers\Entity\Request.
 */

namespace Drupal\rp_offers\Entity;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityTypeInterface;
use Drupal\user\UserInterface;

use Drupal\rp_offers\Entity\RequestInterface;

/**
 * Defines the Request entity.
 *
 * The following construct is the actual definition of the entity type which
 * is read and cached. Don't forget to clear cache after changes.
 *
 * @ContentEntityType(
 *   id = "rp_offers_request",
 *   label = @Translation("Request entity"),
 *   base_table = "offer_request",
 *   admin_permission = "administer request entity",
 *   fieldable = false,
 *   entity_keys = {
 *     "id" = "id"
 *   },
 * )
 *
 */
class Request extends ContentEntityBase implements RequestInterface {

  /**
   * {@inheritdoc}
   *
   * When a new entity instance is added, set the user_id entity reference to
   * the current user as the creator of the instance.
   */
  public static function preCreate(EntityStorageInterface $storage_controller, array &$values) {
    parent::preCreate($storage_controller, $values);
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
  public function getChangedTime() {
    return $this->get('changed')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setChangedTime($timestamp) {
    $this->set('changed', $timestamp);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function getChangedTimeAcrossTranslations()  {
    $changed = $this->getUntranslated()->getChangedTime();
    foreach ($this->getTranslationLanguages(FALSE) as $language)    {
      $translation_changed = $this->getTranslation($language->getId())->getChangedTime();
      $changed = max($translation_changed, $changed);
    }
    return $changed;
  }

  /**
   * {@inheritdoc}
   */
  public function getOwner() {
    return $this->get('user_id')->entity;
  }

  /**
   * {@inheritdoc}
   */
  public function getOwnerId() {
    return $this->get('user_id')->target_id;
  }

  /**
   * {@inheritdoc}
   */
  public function setOwnerId($uid) {
    $this->set('user_id', $uid);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function setOwner(UserInterface $account) {
    $this->set('user_id', $account->id());
    return $this;
  }

  /**
   * {@inheritdoc}
   *
   * Define the field properties here.
   *
   * Field name, type and size determine the table structure.
   *
   * In addition, we can define how the field and its content can be manipulated
   * in the GUI. The behaviour of the widgets used can be determined here.
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {

    // Standard field, used as unique if primary index.
    $fields['id'] = BaseFieldDefinition::create('integer')
      ->setLabel(t('ID'))
      ->setDescription(t('The ID of the Request entity.'))
      ->setReadOnly(TRUE);

    $fields['offer_target_id'] = BaseFieldDefinition::create('entity_reference')
        ->setLabel(t('Offer'))
        ->setDescription(t('The linked offer'))
        ->setRequired(TRUE);

    $fields['firstname'] = BaseFieldDefinition::create('string')
        ->setLabel(t('Firstname'))
        ->setDescription(t('the client firstname'));

    $fields['lastname'] = BaseFieldDefinition::create('string')
        ->setLabel(t('Lastname'))
        ->setDescription(t('the client lastname'));

    $fields['address'] = BaseFieldDefinition::create('string')
        ->setLabel(t('Address'))
        ->setDescription(t('The client address'));

    $fields['zip'] = BaseFieldDefinition::create('string')
        ->setLabel(t('Zip Code'))
        ->setDescription(t('The client zip code'));

    $fields['city'] = BaseFieldDefinition::create('string')
        ->setLabel(t('City'))
        ->setDescription(t('The client city'));

    $fields['email'] = BaseFieldDefinition::create('string')
        ->setLabel(t('District'))
        ->setDescription(t('The client email'))
        ->setRequired(TRUE);

    $fields['created'] = BaseFieldDefinition::create('created')
      ->setLabel(t('Created'))
      ->setDescription(t('The time that the entity was created.'));

    $fields['changed'] = BaseFieldDefinition::create('changed')
      ->setLabel(t('Changed'))
      ->setDescription(t('The time that the entity was last edited.'));

    return $fields;
  }
}

?>
