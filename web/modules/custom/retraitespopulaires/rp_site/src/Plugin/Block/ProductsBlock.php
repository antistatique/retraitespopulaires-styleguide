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

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;

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
     * AliasManagerInterface Service
     * @var AliasManagerInterface
     */
    private $alias_manager;

    /**
    * QueryFactory to execute query
    * @var QueryFactory
    */
    private $entity_query;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, CurrentRouteMatch $route, AliasManagerInterface $alias_manager, QueryFactory $query) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_node   = $entity->getStorage('node');
        $this->route         = $route;
        $this->alias_manager = $alias_manager;
        $this->entity_query  = $query;
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
            $container->get('path.alias_manager'),
            $container->get('entity.query')
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
                    $query = $this->entity_query->get('node')
                        ->condition('type', 'product')
                        ->condition('status', 1)
                        ->condition('nid', $products_nids, 'IN')
                        ->sort('title', 'DESC');

                    if ($filter = \Drupal::request()->query->get('filtre')) {
                        $taxonomy_term_url = $this->alias_manager->getPathByAlias('/plans/'.$filter);
                        if( !empty($taxonomy_term_url) ){
                            $taxonomy_term_tid = str_replace('/taxonomy/term/', '', $taxonomy_term_url);
                            $query->condition('field_product_plan', $taxonomy_term_tid);
                        }
                    }

                    $nids = $query->execute();
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
            ]
        ];
    }
}
