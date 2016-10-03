<?php
/**
* @file
* Contains \Drupal\rp_layout\Plugin\Block\BigMenuBlock.
*/

namespace Drupal\rp_layout\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use \Drupal\Core\Menu\MenuLinkTreeInterface;

/**
* Provides a 'Layout' BigMenu Block
*
* @Block(
*   id = "rp_layout_bigmenu_block",
*   admin_label = @Translation("Layout BigMenu block"),
* )
*/
class BigMenuBlock extends BlockBase implements ContainerFactoryPluginInterface {

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
        $variables['empty_state'] = true;
        $variables['menu_as_page'] = isset($params['menu-as-page']) ? $params['menu-as-page'] : false;

        $parameters = $this->menu_tree->getCurrentRouteMenuTreeParameters('main');
        $parameters->onlyEnabledLinks();
        $parameters->expandedParents = array();
        $variables['main_menu'] = $this->menu_tree->load('main',$parameters);
        $variables['empty_state'] = count($parameters->activeTrail) > 1 ? false : $variables['empty_state'];

        $parameters = $this->menu_tree->getCurrentRouteMenuTreeParameters('profil');
        $parameters->onlyEnabledLinks();
        $parameters->expandedParents = array();
        $variables['profil_menu'] = $this->menu_tree->load('profil', $parameters);
        $variables['empty_state'] = count($parameters->activeTrail) > 1 ? false : $variables['empty_state'];

        $parameters = $this->menu_tree->getCurrentRouteMenuTreeParameters('profil');
        $parameters->onlyEnabledLinks();
        $parameters->expandedParents = array();
        $variables['secondary_menu'] = $this->menu_tree->load('secondary', $parameters);

        return [
            '#theme'     => 'rp_layout_bigmenu_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }

}
