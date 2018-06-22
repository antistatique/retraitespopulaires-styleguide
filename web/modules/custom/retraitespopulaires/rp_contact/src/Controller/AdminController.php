<?php

namespace Drupal\rp_contact\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * AdminController.
 */
class AdminController extends ControllerBase {

  /**
   * Admin settings for rp_contact.
   */
  public function settings() {
    return $this->formBuilder()->getForm('Drupal\rp_contact\Form\AdminForm');
  }

}
