<?php

namespace Drupal\rp_mortgage;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the Rate entity.
 *
 * @see \Drupal\rp_mortgage\Entity\Rate.
 */
class RateAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\rp_mortgage\Entity\RateInterface $entity */
    switch ($operation) {
      case 'view':
        return AccessResult::allowedIfHasPermission($account, 'administer rate entities');

      case 'edit':
        return AccessResult::allowedIfHasPermission($account, 'administer rate entities');

      case 'update':
        return AccessResult::allowedIfHasPermission($account, 'administer rate entities');

      case 'delete':
        return AccessResult::allowedIfHasPermission($account, 'administer rate entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'administer rate entities');
  }

}
