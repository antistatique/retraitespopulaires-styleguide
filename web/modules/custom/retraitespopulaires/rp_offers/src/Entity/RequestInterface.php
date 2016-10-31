<?php
/**
 * @file
 * Contains \Drupal\rp_offers\Entity\RequestInterface.
 */

namespace Drupal\rp_offers\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\user\EntityOwnerInterface;
use Drupal\Core\Entity\EntityChangedInterface;

/**
 * Provides an interface defining a Participate entity.
 * @ingroup commands
 */
interface RequestInterface extends ContentEntityInterface, EntityOwnerInterface, EntityChangedInterface { }
