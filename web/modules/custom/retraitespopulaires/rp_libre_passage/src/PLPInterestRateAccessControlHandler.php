<?php

namespace Drupal\rp_libre_passage;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the PLP Interest Rate entity.
 *
 * @see \Drupal\rp_libre_passage\Entity\PLPInterestRate.
 */
class PLPInterestRateAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\rp_libre_passage\Entity\PLPInterestRateInterface $entity */
    switch ($operation) {
      case 'view':
      case 'update':
      case 'edit':
      case 'delete':
        return AccessResult::allowedIfHasPermission($account, 'administer plp interest rate entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'administer plp interest rate entities');
  }

}
