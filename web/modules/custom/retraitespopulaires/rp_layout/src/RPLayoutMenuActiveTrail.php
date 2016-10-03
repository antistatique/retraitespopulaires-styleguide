<?php
/**
* @file
* Contains \Drupal\rp_layout\RPLayoutMenuActiveTrail
*/

namespace Drupal\rp_layout;

use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Lock\LockBackendInterface;
use Drupal\Core\Menu\MenuActiveTrail;
use Drupal\Core\Menu\MenuLinkManagerInterface;
use Drupal\Core\Routing\RouteMatchInterface;

/**
 * Defines a class for menu active trail that considers menu_id parameters.
 */
class RPLayoutMenuActiveTrail extends MenuActiveTrail {

  /**
   * {@inheritdoc}
   */
  public function __construct(MenuLinkManagerInterface $menu_link_manager, RouteMatchInterface $route_match, CacheBackendInterface $cache, LockBackendInterface $lock) {
    parent::__construct($menu_link_manager, $route_match, $cache, $lock);
  }

  /**
   * {@inheritdoc}
   */
  public function getActiveTrailIds($menu_name) {
    // Get the existing trail IDs from the core implementation.
    $matching_ids = parent::getActiveTrailIds($menu_name);

    // If we don't have any menu_id parameter, there's nothing to do here.
    if ($this->routeMatch->getRouteName() == 'rp_site.launcher' && $menu_id = $this->routeMatch->getParameter('menu_id')) {
        // Start with the top-level item.
        $new_match = ['' => ''];
        $parents = $this->menuLinkManager->getParentIds($menu_id);

        // Replace the existing trail with the new trail.
        $matching_ids = $parents;
    }
    return $matching_ids;
  }

}
