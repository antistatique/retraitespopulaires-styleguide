<?php
/**
* @file
* Contains \Drupal\rp_offers\Controller\AdminController.
*/

namespace Drupal\rp_offers\Controller;

/**
* AdminController.
*/
class AdminController {

    /**
    * Admin settings for rp_offers.
    */
    public function settings() {
        return \Drupal::formBuilder()->getForm('Drupal\rp_offers\Form\AdminForm');
    }

    /**
    * Admin list requests for rp_offers.
    */
    public function requests() {
        $table = array(
            '#type'    => 'table',
            '#header'  => array(t('Date'), t('Contact informations'), t('Coupon')),
        );

        return $table;
    }

}
