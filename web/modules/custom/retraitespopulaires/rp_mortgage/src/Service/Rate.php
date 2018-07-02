<?php

namespace Drupal\rp_mortgage\Service;

use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * Rate service class.
 */
class Rate {

  /**
   * Entity rate.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  private $entityRate;

  /**
   * Rate constructor.
   */
  public function __construct(EntityTypeManagerInterface $entity) {
    $this->entityRate = $entity->getStorage('rp_mortgage_rate');
  }

  /**
   * Get all rates.
   */
  public function getRates($type) {
    $query = $this->entityRate->getQuery()
      ->condition('type', $type)
      ->sort('year', 'ASC');

    $ids = $query->execute();
    $rates = $this->entityRate->loadMultiple($ids);

    return $rates;
  }

}
