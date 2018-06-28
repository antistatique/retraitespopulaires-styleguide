<?php

namespace Drupal\rp_libre_passage\Service;

use DateTime;

use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * PLP Interest Rate class.
 */
class PLPInterestRate {

  /**
   * Interest rate interface.
   *
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  private $entityInterestRate;

  /**
   * PLPInterestRate constructor.
   */
  public function __construct(EntityTypeManagerInterface $entity) {
    $this->entityInterestRate = $entity->getStorage('plp_interest_rate');
  }

  /**
   * Retrieve the rate according the given year.
   */
  public function getRate($year) {
    $id = $this->entityInterestRate->getQuery()
      ->condition('start_year', $year, '<=')
      ->condition('end_year', $year, '>=')
      ->sort('start_year', 'ASC')
      ->range(0, 1)
      ->execute();

    // Fetch the result.
    $id = reset($id);
    /** @var \Drupal\rp_libre_passage\Entity\PLPInterestRate $rate */
    $rate = $this->entityInterestRate->load($id);

    if (!$rate) {
      return NULL;
    }

    return [
      'start' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-' . $rate->getStartYear()->value . ' 00:00:00'),
      'end' => DateTime::createFromFormat('m-d-Y h:i:s', '01-01-' . $rate->getEndYear()->value . ' 00:00:00'),
      'rate' => $rate->getRate()->value,
    ];
  }

}
