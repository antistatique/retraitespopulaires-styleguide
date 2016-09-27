<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\ProductsFilterBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Url;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\Core\Database\Connection;

/**
* Provides a 'ProductsFilter' Block
*
* @Block(
*   id = "rp_site_products_filter_block",
*   admin_label = @Translation("Products Filter block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_products_filter_block')
* </code>
*/
class ProductsFilterBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
    * EntityTypeManagerInterface to load Taxonomy
    * @var EntityTypeManagerInterface
    */
    private $entity_taxonomy;

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
    * Connection to DB
    * @var Connection
    */
    private $database;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, CurrentRouteMatch $route, AliasManagerInterface $alias_manager, Connection $database) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_taxonomy = $entity->getStorage('taxonomy_term');
        $this->route           = $route;
        $this->alias_manager   = $alias_manager;
        $this->database        = $database;
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
            $container->get('database')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('categories' => array());
        $variables['current_alias'] = \Drupal::request()->query->get('filtre');

        if ($node = $this->route->getParameter('node')) {

            if( isset($node->field_products) && !empty($node->field_products) ){

                // Get products linked
                $products_nids = array();
                foreach ($node->field_products as $key => $rpoduct) {
                    $products_nids[] = $rpoduct->target_id;
                }

                if( !empty($products_nids) ) {

                    // Get valide filters for this product linked
                    $query = $this->database->select('taxonomy_term_field_data', 't');
                    $query->join('taxonomy_term_hierarchy', 'h', 'h.tid = t.tid');
                    $query->join('node__field_product_plan', 'plans', 'plans.field_product_plan_target_id = t.tid');
                    $results = $query
                        ->fields('t')
                        ->fields('h', array('parent'))
                        ->condition('t.vid', 'products_plan')
                        ->condition('plans.entity_id', $products_nids, 'IN')
                        ->orderBy('t.tid', 'DESC')
                        ->execute();

                    $categories = array();
                    foreach ($results as $result) {
                        $alias = $this->alias_manager->getAliasByPath('/taxonomy/term/'.$result->tid);
                        $term = array(
                            'term' => $this->entity_taxonomy->load($result->tid),
                            'alias' => str_replace('/plans/', '', $alias),
                        );

                        // Check the parent exist otherwise, create it
                        if (!isset($categories[$result->parent]['children'])) {
                            $categories[$result->parent] = array(
                                'term' => $this->entity_taxonomy->load($result->parent),
                                'children' => array(),
                            );
                        }

                        // Add children to parent
                        if ($result->parent != '0' && isset($categories[$result->parent]['children'])) {
                            $categories[$result->parent]['children'][] = $term;
                        }
                    }
                }

                $variables['categories'] = $categories;
            }
        }

        return [
            '#theme'     => 'rp_site_products_filter_block',
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
