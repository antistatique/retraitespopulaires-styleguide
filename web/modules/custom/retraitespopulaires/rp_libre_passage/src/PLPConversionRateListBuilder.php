<?php

namespace Drupal\rp_libre_passage;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;

/**
 * Defines a class to build a listing of PLP Conversion Rate entities.
 *
 * @ingroup rp_libre_passage
 */
class PLPConversionRateListBuilder extends EntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['gender']   = $this->t('Genre');
    $header['age']      = $this->t('Age');
    $header['rate_0']   = $this->t('0%');
    $header['rate_40']  = $this->t('40%');
    $header['rate_60']  = $this->t('60%');
    $header['rate_75']  = $this->t('75%');
    $header['rate_80']  = $this->t('80%');
    $header['rate_100'] = $this->t('100%');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    /* @var $entity \Drupal\rp_libre_passage\Entity\PLPConversionRate */

    // Dont display disabled entities.
    if (!$entity->getStatus()) {
      return;
    }

    $row['gender']   = $entity->getGender();
    $row['age']      = $entity->getAge();
    $row['rate_0']   = $entity->getRate(0) . '%';
    $row['rate_40']  = $entity->getRate(40) . '%';
    $row['rate_60']  = $entity->getRate(60) . '%';
    $row['rate_75']  = $entity->getRate(75) . '%';
    $row['rate_80']  = $entity->getRate(80) . '%';
    $row['rate_100'] = $entity->getRate(100) . '%';

    return $row + parent::buildRow($entity);
  }

}
