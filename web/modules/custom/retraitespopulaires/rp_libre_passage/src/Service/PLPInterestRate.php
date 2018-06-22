<?php

namespace Drupal\rp_libre_passage\Service;

use DateTime;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;

/**
 * PLP Interest Rate class.
 */
class PLPInterestRate {
  /**
   * To remove.
   *
   * @var \Drupal\Core\Entity\Query\QueryFactory
   */
  private $entityQuery;

  /**
   * Interest rate interface.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  private $entityInterestRate;

  /**
   * PLPInterestRate constructor.
   */
  public function __construct(EntityTypeManagerInterface $entity, QueryFactory $entityQuery) {
    $this->entityInterestRate = $entity->getStorage('plp_interest_rate');
    $this->entityQuery = $entityQuery;
  }

  /**
   * Retrieve the rate according the given year.
   */
  public function getRate($year) {
    $id = $this->entityQuery
      ->get('plp_interest_rate')
      ->condition('start_year', $year, '<=')
      ->condition('end_year', $year, '>=')
      ->sort('start_year', 'ASC')
      ->range(0, 1)
      ->execute();

    // Fetch the result.
    $id = reset($id);
    $rate = $this->entityInterestRate->load($id);

    if (!$rate) {
      return NULL;
    }

    return [
      'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-' . $rate->start_year->value . ' 00:00:00'),
      'end' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-' . $rate->end_year->value . ' 00:00:00'),
      'rate' => $rate->rate->value,
    ];
  }

}
