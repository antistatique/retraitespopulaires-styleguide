<?php
/**
* @file
* Contains \Drupal\rp_layout\Plugin\Block\SecondaryNavBlock.
*/

namespace Drupal\rp_layout\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use \Drupal\Core\Menu\MenuLinkTreeInterface;

/**
* Provides a 'Layout' SecondaryNav Block
*
* @Block(
*   id = "rp_layout_secondarynav_block",
*   admin_label = @Translation("Layout SecondaryNav block"),
* )
*/
class SecondaryNavBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
     * Contact Service
     * @var Contact
     */
    private $menu_tree;

    /**
     * Class constructor.
     */
     public function __construct(array $configuration, $plugin_id, $plugin_definition, MenuLinkTreeInterface $menu_tree) {
         parent::__construct($configuration, $plugin_id, $plugin_definition);
         $this->menu_tree = $menu_tree;
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
    public function build($params = array()) {
        $variables = array();
        $variables['index'] = null;
        $variables['secondary_nav'] = $this->getTopParentActiveTrail('main');
        $variables['active_trail'] = $this->getFullActiveTrail('main');

        if (!isset($variables['secondary_nav']->link) || empty($variables['secondary_nav']->link)) {
            $variables['secondary_nav'] = $this->getTopParentActiveTrail('profil');
            $variables['active_trail'] = $this->getFullActiveTrail('main');
        }

        if (isset($variables['secondary_nav']->link) && !empty($variables['secondary_nav']->link)) {
            $variables['index'] = $variables['secondary_nav']->link->getPluginId();
        }
        return [
            '#theme'     => 'rp_layout_secondarynav_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }

    public function getTopParentActiveTrail($menu_name) {
        $parameters = $this->menu_tree->getCurrentRouteMenuTreeParameters($menu_name);
        $parameters->onlyEnabledLinks();

        // Load the tree based on this set of parameters.
        $tree = $this->menu_tree->load($menu_name, $parameters);

        // Transform the tree using the manipulators you want.
        $manipulators = array(
          // Use the default sorting of menu links.
          array('callable' => 'menu.default_tree_manipulators:generateIndexAndSort'),
          // Remove all links outside of siblings and active trail
          array('callable' => 'rp_layout.menu_transformers:getTopParentActiveTrail'),
        );
        return $this->menu_tree->transform($tree, $manipulators);
    }

    public function getFullActiveTrail($menu_name) {
        $parameters = $this->menu_tree->getCurrentRouteMenuTreeParameters($menu_name);
        return $parameters->activeTrail;
    }


}
