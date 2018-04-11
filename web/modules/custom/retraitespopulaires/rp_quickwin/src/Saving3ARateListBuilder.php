<?php

namespace Drupal\rp_quickwin;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;

/**
 * Defines a class to build a listing of Saving 3a Rate entities.
 *
 * @ingroup rp_quickwin
 */
class Saving3ARateListBuilder extends EntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['id'] = $this->t('Rate ID');
    $header['name'] = $this->t('Name');
    $header['rate'] = $this->t('Rate');
    $header['alterable'] = $this->t('Est modifiable');

    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    /* @var $entity \Drupal\rp_quickwin\Entity\Saving3ARate */
    $row['id'] = $entity->id();
    $row['name'] = $entity->toLink($entity->getName());
    $row['rate'] = $entity->getRate();
    $row['alterable'] = $entity->isAlterable() ? t('Yes') : t('No');

    return $row + parent::buildRow($entity);
  }

}
