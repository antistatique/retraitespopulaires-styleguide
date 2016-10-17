<?php
/**
* @file
* Contains \Drupal\rp_contact\Controller\AdminController.
*/

namespace Drupal\rp_contact\Controller;

/**
* AdminController.
*/
class AdminController {

    /**
    * Admin settings for rp_contact.
    */
    public function settings() {
        $variables = array();
        return \Drupal::formBuilder()->getForm('Drupal\rp_contact\Form\AdminForm');
    }

}
