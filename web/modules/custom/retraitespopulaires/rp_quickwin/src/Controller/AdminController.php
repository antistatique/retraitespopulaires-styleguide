<?php
/**
* @file
* Contains \Drupal\quickwin\Controller\AdminController.
*/

namespace Drupal\rp_quickwin\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
* AdminController.
*/
class AdminController extends ControllerBase {

  /**
   * Admin settings for rp_quickwin.
   */
  public function settings() {
    return \Drupal::formBuilder()->getForm('Drupal\rp_quickwin\Form\AdminForm');
  }
}