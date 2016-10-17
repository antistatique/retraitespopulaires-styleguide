<?php

namespace Drupal\rp_mortgage\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Rate entities.
 *
 * @ingroup rp_mortgage
 */
interface RateInterface extends ContentEntityInterface, EntityChangedInterface {

  // Add get/set methods for your configuration properties here.

  /**
   * Gets the Rate type.
   *
   * @return string
   *   Type of the Rate.
   */
  public function getType();

  /**
   * Sets the Rate Type.
   *
   * @param string $type
   *   The Rate type.
   *
   * @return \Drupal\rp_mortgage\Entity\RateInterface
   *   The called Rate entity.
   */
  public function setType($type);

  /**
   * Gets the Rate creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Rate.
   */
  public function getCreatedTime();

  /**
   * Sets the Rate creation timestamp.
   *
   * @param int $timestamp
   *   The Rate creation timestamp.
   *
   * @return \Drupal\rp_mortgage\Entity\RateInterface
   *   The called Rate entity.
   */
  public function setCreatedTime($timestamp);

}
