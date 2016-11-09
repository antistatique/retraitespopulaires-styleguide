<?php
/**
* @file
* Contains \Drupal\rp_layout\Plugin\Block\FooterBlock.
*/

namespace Drupal\rp_layout\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\rp_layout\Service\Contact;
use \Drupal\Core\Menu\MenuLinkTreeInterface;

/**
* Provides a 'Layout' Footer Block
*
* @Block(
*   id = "rp_layout_footer_block",
*   admin_label = @Translation("Layout Footer block"),
* )
*/
class FooterBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
     * Contact Service
     * @var Contact
     */
    private $contact;

     /**
      * Contact Service
      * @var Contact
      */
     private $menu_tree;

    /**
     * Class constructor.
     */
     public function __construct(array $configuration, $plugin_id, $plugin_definition, Contact $contact, MenuLinkTreeInterface $menu_tree) {
         parent::__construct($configuration, $plugin_id, $plugin_definition);
         $this->contact = $contact;
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
             $container->get('rp_layout.contact'),
             $container->get('menu.link_tree')
         );
     }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();

        $variables['contact'] = $this->contact;

        $parameters = $this->menu_tree->getCurrentRouteMenuTreeParameters('footer');
        $parameters->onlyEnabledLinks();
        $parameters->expandedParents = array();
        $variables['footer_menu'] = $this->menu_tree->load('footer',$parameters);

        return [
            '#theme'     => 'rp_layout_footer_block',
            '#variables' => $variables,
        ];
    }

}
