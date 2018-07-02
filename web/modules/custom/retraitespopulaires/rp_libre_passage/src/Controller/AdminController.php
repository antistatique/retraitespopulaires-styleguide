<?php

namespace Drupal\rp_libre_passage\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * AdminController.
 */
class AdminController extends ControllerBase {

  /**
   * Admin settings for rp_libre_passage.
   */
  public function settings() {
    return $this->formBuilder()->getForm('Drupal\rp_libre_passage\Form\AdminForm');
  }

}
