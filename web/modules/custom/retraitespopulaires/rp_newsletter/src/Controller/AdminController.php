<?php
/**
* @file
* Contains \Drupal\rp_newsletter\Controller\AdminController.
*/

namespace Drupal\rp_newsletter\Controller;

/**
* AdminController.
*/
class AdminController {

    /**
    * Admin settings for rp_newsletter.
    */
    public function settings() {
        $variables = array();
        return \Drupal::formBuilder()->getForm('Drupal\rp_newsletter\Form\AdminForm');
    }

}
