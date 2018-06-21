<?php

namespace Drupal\rp_mortgage\Service;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;

/**
 * Rate service class.
 */
class Rate {
  /**
   * Entity_query to query Node's Code.
   *
   * @var \Drupal\Core\Entity\Query\QueryFactory
   */
  private $entityQuery;

  /**
   * Entity rate.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  private $entityRate;

  /**
   * Rate constructor.
   */
  public function __construct(EntityTypeManagerInterface $entity, QueryFactory $entityQuery) {
    $this->entityRate = $entity->getStorage('rp_mortgage_rate');
    $this->entityQuery = $entityQuery;
  }

  /**
   * Get all rates.
   */
  public function getRates($type) {
    $query = $this->entityQuery->get('rp_mortgage_rate')
      ->condition('type', $type)
      ->sort('year', 'ASC');

    $ids = $query->execute();
    $rates = $this->entityRate->loadMultiple($ids);

    return $rates;
  }

}
