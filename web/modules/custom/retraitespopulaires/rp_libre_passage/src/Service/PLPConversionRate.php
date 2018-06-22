<?php

namespace Drupal\rp_libre_passage\Service;

use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * PLP Conversion rate class.
 */
class PLPConversionRate {

  /**
   * Conversion rate entity storage.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  private $entityConversionRate;

  /**
   * PLPConversionRate constructor.
   */
  public function __construct(EntityTypeManagerInterface $entity) {
    $this->entityConversionRate = $entity->getStorage('plp_conversion_rate');
  }

  /**
   * Retrieve the conversion rate according the given attributes.
   */
  public function getRate($gender, $age, $percent) {
    $id = $this->entityConversionRate->getQuery()
      ->condition('gender', $gender)
      ->condition('age', $age, '<=')
      ->condition('status', 1)
      ->sort('age', 'DESC')
      ->range(0, 1)
      ->execute();

    // Fetch the result.
    $id = reset($id);
    if (!empty($id)) {
      $rate = $this->entityConversionRate->load($id);
    }

    if (!$rate) {
      return NULL;
    }

    return $rate->getRate($percent);
  }

  /**
   * Retrieve the availables ages according the given gender.
   *
   * (Âge souhaité pour le versement des prestations)
   */
  public function getAges($gender) {
    $ids = $this->entityConversionRate->getQuery()
      ->condition('gender', $gender)
      ->condition('status', 1)
      ->sort('age', 'DESC')
      ->execute();

    // Fetch the result.
    $ages = [];
    if (!empty($ids)) {
      $entites = $this->entityConversionRate->loadMultiple($ids);

      foreach ($entites as $entity) {
        $age = $entity->getAge();
        $ages[$age] = $age;
      }
    }

    if (empty($ages)) {
      return NULL;
    }

    return $ages;
  }

}
