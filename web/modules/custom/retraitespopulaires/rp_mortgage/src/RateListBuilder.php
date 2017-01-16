<?php

namespace Drupal\rp_mortgage;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;
use Drupal\Core\Routing\LinkGeneratorTrait;
use Drupal\Core\Url;

/**
 * Defines a class to build a listing of Rate entities.
 *
 * @ingroup rp_mortgage
 */
class RateListBuilder extends EntityListBuilder {

  use LinkGeneratorTrait;

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['id'] = $this->t('Rate ID');
    $header['type'] = $this->t('Type');
    $header['name'] = $this->t('Name');
    $header['date'] = $this->t('Date');
    $header['first_rate'] = $this->t('First Rate');
    $header['second_rate'] = $this->t('Second Rate');
    $header['year'] = $this->t('Year');

    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    /* @var $entity \Drupal\rp_mortgage\Entity\Rate */
    $row['id'] = $entity->id();
    $row['type'] = $this->l(
      $entity->getType(),
      new Url(
        'entity.rp_mortgage_rate.edit_form', array(
          'rp_mortgage_rate' => $entity->id(),
        )
      )
    );
    $row['name'] = $entity->getName();
    $row['date'] = !empty($entity->getDate()) ? $entity->getDate()->format('d-m-Y') : '';
    $row['first_rate'] = $entity->getFirstRate();
    $row['second_rate'] = $entity->getSecondRate();
    $row['year'] = $entity->getYear();

    return $row + parent::buildRow($entity);
  }

}
