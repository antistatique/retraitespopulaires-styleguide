<?php

namespace Drupal\rp_libre_passage;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;

/**
 * Defines a class to build a listing of PLP Taux d intérêt entities.
 *
 * @ingroup rp_libre_passage
 */
class PLPInterestRateListBuilder extends EntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['start_year'] = $this->t('Date de début');
    $header['end_year']    = $this->t('Date de fin');
    $header['rate']        = $this->t('Taux d\'intérêt');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    /* @var $entity \Drupal\rp_libre_passage\Entity\PLPInterestRate */
    $row['start_year'] = '01.01.'.$entity->getStartYear();
    $row['end_year']   = '31.12.'.$entity->getEndYear();
    $row['rate']       = $entity->getRate() . '%';
    return $row + parent::buildRow($entity);
  }

}
