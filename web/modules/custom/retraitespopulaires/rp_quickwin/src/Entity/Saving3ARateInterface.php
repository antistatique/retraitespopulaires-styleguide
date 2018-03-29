<?php

namespace Drupal\rp_quickwin\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Saving 3a Rate entities.
 *
 * @ingroup rp_quickwin
 */
interface Saving3ARateInterface extends ContentEntityInterface, EntityChangedInterface, \JsonSerializable {
  /**
   * Gets the Rate name.
   *
   * @return string
   *   Name of the Rate.
   */
  public function getName();

  /**
   * Sets the Rate name.
   *
   * @param string $name
   *   The Rate name.
   *
   * @return \Drupal\rp_quickwin\Entity\Saving3ARateInterface
   *   The called Rate entity.
   */
  public function setName($name);

  /**
   * Gets the Rate rate.
   *
   * @return string
   *   Rate of the Rate.
   */
  public function getRate();

  /**
   * Sets the Rate rate.
   *
   * @param string $rate
   *   The Rate rate.
   *
   * @return \Drupal\rp_quickwin\Entity\Saving3ARateInterface
   *   The called Rate entity.
   */
  public function setRate($rate);

  /**
   * Gets if Rate is alterable.
   *
   * @return string
   *   TRUE if rate is alterable, FALSE if not.
   */
  public function isAlterable();

  /**
   * Sets the Rate alterable.
   *
   * @param string $alterable
   *   Rate is alterable.
   *
   * @return \Drupal\rp_quickwin\Entity\Saving3ARateInterface
   *   The called Rate entity.
   */
  public function setAlterable($alterable);

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
   * @return \Drupal\rp_quickwin\Entity\Saving3ARateInterface
   *   The called Rate entity.
   */
  public function setCreatedTime($timestamp);

}
