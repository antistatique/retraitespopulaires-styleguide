<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\ProductsBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Url;

use Drupal\Core\Entity\EntityTypeManager;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\Core\Path\AliasManager;
use Drupal\rp_site\Service\Profession;

/**
* Provides a 'Products' Block
*
* @Block(
*   id = "rp_site_products",
*   admin_label = @Translation("Products block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_products_block')
* </code>
*/
class ProductsBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
    * EntityTypeManager to load Nodes
    * @var EntityTypeManager
    */
    private $entity_node;

    /**
    * Current Route
    * @var CurrentRouteMatch
    */
    private $route;

    /**
     * AliasManager Service
     * @var AliasManager
     */
    private $alias_manager;

    /**
     * Profession Service
     * @var Profession
     */
    private $profession;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManager $entity, CurrentRouteMatch $route, AliasManager $alias_manager) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_node   = $entity->getStorage('node');
        $this->route         = $route;
        $this->alias_manager = $alias_manager;
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
            $container->get('entity_type.manager'),
            $container->get('current_route_match'),
            $container->get('path.alias_manager')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('products' => array());
        //Load the current node's field_products
        $products_nids = array();
        if ($node = $this->route->getParameter('node')) {

            if( isset($node->field_products) && !empty($node->field_products) ){
                foreach ($node->field_products as $key => $doc) {
                    $products_nids[] = $doc->target_id;
                }

                $variables['products'] = $this->entity_node->loadMultiple($products_nids);
            }
        }

        if (empty($variables['products'])) { return; }

        return [
            '#theme'     => 'rp_site_products_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }
}
