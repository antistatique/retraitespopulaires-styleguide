<?php

namespace Drupal\rp_site\Controller;

/**
 * AdminController.
 */
class AdminController {

  /**
   * Admin settings for rp_site.
   */
  public function settings() {
    return \Drupal::formBuilder()->getForm('Drupal\rp_site\Form\AdminForm');
  }

}
