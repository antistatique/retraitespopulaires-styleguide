<?php
/**
* @file
* Contains \Drupal\rp_layout\Plugin\Block\BigMenuBlock.
*/

namespace Drupal\rp_layout\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Menu\MenuLinkTreeInterface;
use Drupal\Core\State\StateInterface;

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
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    private $state;

    /**
     * Class constructor.
     */
     public function __construct(array $configuration, $plugin_id, $plugin_definition, MenuLinkTreeInterface $menu_tree, StateInterface $state) {
         parent::__construct($configuration, $plugin_id, $plugin_definition);
         $this->menu_tree = $menu_tree;
         $this->state     = $state;
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
             $container->get('menu.link_tree'),
             $container->get('state')
         );
     }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();
        $variables['empty_state'] = true;

        // Transform the tree using the manipulators you want.
        $manipulators = array(
          // Use the default sorting of menu links.
          array('callable' => 'menu.default_tree_manipulators:generateIndexAndSort'),
        );

        $parameters = $this->menu_tree->getCurrentRouteMenuTreeParameters('main');
        $parameters->onlyEnabledLinks();
        $parameters->expandedParents = array();
        $tree = $this->menu_tree->load('main',$parameters);
        $variables['main_menu'] = $this->menu_tree->transform($tree, $manipulators);
        $variables['empty_state'] = count($parameters->activeTrail) > 1 ? false : $variables['empty_state'];

        $parameters = $this->menu_tree->getCurrentRouteMenuTreeParameters('profil');
        $parameters->onlyEnabledLinks();
        $parameters->expandedParents = array();
        $tree = $this->menu_tree->load('profil',$parameters);
        $variables['profil_menu'] = $this->menu_tree->transform($tree, $manipulators);
        $variables['empty_state'] = count($parameters->activeTrail) > 1 ? false : $variables['empty_state'];

        $parameters = $this->menu_tree->getCurrentRouteMenuTreeParameters('profil');
        $parameters->onlyEnabledLinks();
        $parameters->expandedParents = array();
        $tree = $this->menu_tree->load('secondary',$parameters);
        $variables['secondary_menu'] = $this->menu_tree->transform($tree, $manipulators);

        // Virtual separator of links for Profil > Particuliers
        $variables['profils_individual_menu'] = $this->state->get('rp_site.settings.profils.individual')['menu'];
        $variables['profils_individual_project'] = $this->state->get('rp_site.settings.profils.individual')['menu_project'][0];
        $variables['profils_individual_client'] =  $this->state->get('rp_site.settings.profils.individual')['menu_client'][0];

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
