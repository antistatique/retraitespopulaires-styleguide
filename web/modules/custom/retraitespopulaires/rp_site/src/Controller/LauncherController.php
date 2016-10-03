<?php
/**
* @file
* Contains \Drupal\rp_site\Controller\LauncherController.
*/

namespace Drupal\rp_site\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
* LauncherController.
*/
class LauncherController extends ControllerBase{

    public function launcher($menu_id) {
        $variables = array();
        $variables['menu_id'] = $menu_id;

        return [
            '#theme'     => 'rp_site_launcher_page',
            '#variables' => $variables,
        ];
    }
}
