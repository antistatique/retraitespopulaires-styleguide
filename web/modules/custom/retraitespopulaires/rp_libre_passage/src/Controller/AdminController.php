<?php
/**
* @file
* Contains \Drupal\rp_libre_passage\Controller\AdminController.
*/

namespace Drupal\rp_libre_passage\Controller;

/**
* AdminController.
*/
class AdminController {

    /**
    * Admin settings for rp_libre_passage.
    */
    public function settings() {
        $variables = array();
        return \Drupal::formBuilder()->getForm('Drupal\rp_libre_passage\Form\AdminForm');
    }

}
