<?php

namespace Drupal\rp_quickwin;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the Saving 3a Rate entity.
 *
 * @see \Drupal\rp_quickwin\Entity\Saving3ARate.
 */
class Saving3ARateAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\rp_quickwin\Entity\Saving3ARateInterface $entity */;
    switch ($operation) {
      case 'view':
        return AccessResult::allowedIfHasPermission($account, 'administer saving 3a rate entities');

      case 'edit':
        return AccessResult::allowedIfHasPermission($account, 'administer saving 3a rate entities');

      case 'update':
        return AccessResult::allowedIfHasPermission($account, 'administer saving 3a rate entities');

      case 'delete':
        return AccessResult::allowedIfHasPermission($account, 'administer saving 3a rate entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'administer saving 3a rate entities');
  }

}
