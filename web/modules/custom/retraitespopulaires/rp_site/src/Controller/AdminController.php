<?php
/**
* @file
* Contains \Drupal\rp_site\Controller\AdminController.
*/

namespace Drupal\rp_site\Controller;

/**
* AdminController.
*/
class AdminController {

    /**
    * Admin settings for rp_site.
    */
    public function settings() {
        $variables = array();
        return \Drupal::formBuilder()->getForm('Drupal\rp_site\Form\AdminForm');
    }

}
