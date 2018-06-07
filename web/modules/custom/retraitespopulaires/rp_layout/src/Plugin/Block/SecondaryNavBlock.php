<?php

namespace Drupal\rp_layout\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Menu\MenuLinkTreeInterface;

/**
 * Provides a 'Layout' SecondaryNav Block.
 *
 * @Block(
 *   id = "rp_layout_secondarynav_block",
 *   admin_label = @Translation("Layout SecondaryNav block"),
 * )
 */
class SecondaryNavBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * Contact Service.
   *
   * @var Contact
   */
  private $menuTree;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, MenuLinkTreeInterface $menu_tree) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->menuTree = $menu_tree;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    // Instantiates this form class.
    return new static(
         // Load the service required to construct this class.
         $configuration,
         $plugin_id,
         $plugin_definition,
         // Load customs services used in this class.
         $container->get('menu.link_tree')
     );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = [];
    $variables['index'] = NULL;
    $variables['secondary_nav'] = $this->getTopParentActiveTrail('main');
    $variables['active_trail'] = $this->getFullActiveTrail('main');

    if (!isset($variables['secondary_nav']->link) || empty($variables['secondary_nav']->link)) {
      $variables['secondary_nav'] = $this->getTopParentActiveTrail('secondary');
      $variables['active_trail'] = $this->getFullActiveTrail('secondary');
    }

    if (isset($variables['secondary_nav']->link) && !empty($variables['secondary_nav']->link)) {
      $variables['index'] = $variables['secondary_nav']->link->getPluginId();
    }
    return [
      '#theme'     => 'rp_layout_secondarynav_block',
      '#variables' => $variables,
      '#cache' => [
        'contexts' => [
          'url.path',
        ],
      ],
    ];
  }

  /**
   * Get the parent active Trail in menu tree.
   */
  public function getTopParentActiveTrail($menu_name) {
    $parameters = $this->menuTree->getCurrentRouteMenuTreeParameters($menu_name);
    $parameters->onlyEnabledLinks();

    // Load the tree based on this set of parameters.
    $tree = $this->menuTree->load($menu_name, $parameters);

    // Transform the tree using the manipulators you want.
    $manipulators = [
      // Use the default sorting of menu links.
      ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
      // Remove all links outside of siblings and active trail.
      ['callable' => 'rp_layout.menu_transformers:getTopParentActiveTrail'],
    ];
    return $this->menuTree->transform($tree, $manipulators);
  }

  /**
   * Get the full active trail in menu tree.
   */
  public function getFullActiveTrail($menu_name) {
    $parameters = $this->menuTree->getCurrentRouteMenuTreeParameters($menu_name);
    return $parameters->activeTrail;
  }

}
