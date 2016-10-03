<?php
/**
* @file
* Contains \Drupal\rp_homepage\Controller\HomepageController.
*/

namespace Drupal\rp_homepage\Controller;

/**
* HomepageController.
*/
class HomepageController {

    /**
     * Homepage page pubic/private
     * @method homepage
     * @return [array] [Renderable array]
     */
    public function homepage() {
        $variables = array();
        return [
            '#theme'     => 'rp_homepage_page',
            '#variables' => $variables,
        ];
    }
}
