<?php

namespace Drupal\rp_libre_passage\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;

/**
 * Provides an interface for defining PLP Interest Rate entities.
 *
 * @ingroup rp_libre_passage
 */
interface PLPInterestRateInterface extends ContentEntityInterface, EntityChangedInterface {

  // Add get/set methods for your configuration properties here.

  /**
   * Gets the PLP Interest Rate creation timestamp.
   *
   * @return int
   *   Creation timestamp of the PLP Interest Rate.
   */
  public function getCreatedTime();

  /**
   * Sets the PLP Interest Rate creation timestamp.
   *
   * @param int $timestamp
   *   The PLP Interest Rate creation timestamp.
   *
   * @return \Drupal\rp_libre_passage\Entity\PLPInterestRateInterface
   *   The called PLP Interest Rate entity.
   */
  public function setCreatedTime($timestamp);
}
