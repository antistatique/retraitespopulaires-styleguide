<?php
/**
* @file
* Contains \Drupal\rp_product\Plugin\Block\ProductsBlock.
*/

namespace Drupal\rp_product\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;

/**
* Provides a 'Products' Block
*
* @Block(
*   id = "rp_site_products_block",
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
    * EntityTypeManagerInterface to load Nodes
    * @var EntityTypeManagerInterface
    */
    private $entity_node;

    /**
    * Current Route
    * @var CurrentRouteMatch
    */
    private $route;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, CurrentRouteMatch $route) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_node   = $entity->getStorage('node');
        $this->route         = $route;
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
            $container->get('current_route_match')
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
                foreach ($node->field_products as $key => $rpoduct) {
                    $products_nids[] = $rpoduct->target_id;
                }

                if( !empty($products_nids) ) {

                    // Retrieve all matched terms with the searched link
                    $query = \Drupal::database()->select('node_field_data', 'n');
                    $query->fields('n')
                        ->condition('n.status', 1)
                        ->condition('n.type', 'product')
                        ->condition('n.nid', $products_nids, 'IN')
                    ;

                    $result = $query->execute();

                    // List of nodes
                    $nids = array();
                    foreach ($result as $node) {
                        $nids[$node->nid] = $node->nid;
                    }

                    $variables['products'] = $this->entity_node->loadMultiple($nids);
                }
            }

        }

        return [
            '#theme'     => 'rp_site_products_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path',
                    'url.query_args'
                ],
                'tags' => [
                    'node_list:product', // invalidated whenever any Node entity is updated, deleted or created
                ],
            ]
        ];
    }
}
