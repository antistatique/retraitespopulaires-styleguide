<?php
/**
* @file
* Contains \Drupal\rp_layout\Plugin\Block\HeaderBlock.
*/

namespace Drupal\rp_layout\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Menu\MenuLinkTreeInterface;

/**
* Provides a 'Layout' Header Block
*
* @Block(
*   id = "rp_layout_header_block",
*   admin_label = @Translation("Layout Header block"),
* )
*/
class HeaderBlock extends BlockBase implements ContainerFactoryPluginInterface {
  /**
   * An interface for loading, transforming and rendering menu link trees.
   *
   * @var \Drupal\Core\Menu\MenuLinkTreeInterface
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
    return new static(
        $configuration,
        $plugin_id,
        $plugin_definition,
        $container->get('menu.link_tree')
    );
  }

  /**
  * {@inheritdoc}
  */
  public function build($params = array()) {
    $variables = array();

    // Transform the tree using the manipulators you want.
    $manipulators = [
      // Use the default sorting of menu links.
      ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
    ];

    // Main menu.
    $parameters = $this->menuTree->getCurrentRouteMenuTreeParameters('main');
    $parameters->onlyEnabledLinks();
    $parameters->expandedParents = [];
    $tree = $this->menuTree->load('main', $parameters);
    $variables['main_menu'] = $this->menuTree->transform($tree, $manipulators);

    // Pre main menu.
    $parameters = $this->menuTree->getCurrentRouteMenuTreeParameters('secondary');
    $parameters->onlyEnabledLinks();
    $parameters->setTopLevelOnly();
    $parameters->expandedParents = [];
    $tree = $this->menuTree->load('secondary', $parameters);
    $variables['pre_main_menu'] = $this->menuTree->transform($tree, $manipulators);

    return [
      '#theme'     => 'rp_layout_header_block',
      '#variables' => $variables,
      '#cache' => [
        'contexts' => [
          'url.path'
        ],
      ]
    ];
  }

}
