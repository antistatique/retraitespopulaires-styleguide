<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\ProductsRelatedBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\Core\Routing\CurrentRouteMatch;

/**
* Provides a 'ProductsRelated' Block
*
* @Block(
*   id = "rp_site_products_related_block",
*   admin_label = @Translation("Products Filter block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_products_related_block')
* </code>
*/
class ProductsRelatedBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
    * EntityTypeManagerInterface to load Taxonomy
    * @var EntityTypeManagerInterface
    */
    private $entity_taxonomy;

    /**
    * EntityTypeManagerInterface to load Node
    * @var EntityTypeManagerInterface
    */
    private $entity_node;

    /**
    * entity_query to query Node's Contest
    * @var QueryFactory
    */
    private $entity_query;

    /**
    * Current Route
    * @var CurrentRouteMatch
    */
    private $route;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, QueryFactory $query, CurrentRouteMatch $route) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_taxonomy = $entity->getStorage('taxonomy_term');
        $this->entity_node     = $entity->getStorage('node');
        $this->entity_query    = $query;
        $this->route           = $route;
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
            $container->get('entity.query'),
            $container->get('current_route_match')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('products' => array(), 'categories' => array());
        $variables['current_alias'] = \Drupal::request()->query->get('filtre');

        if ($node = $this->route->getParameter('node')) {

            if( isset($node->field_product_plan) && !empty($node->field_product_plan) ){

                // Get products plans
                $plans_tid = array();
                foreach ($node->field_product_plan as $key => $plan) {
                    $plans_tid[] = $plan->target_id;
                }

                if( !empty($plans_tid) ) {
                    $variables['categories'] = $this->entity_taxonomy->loadMultiple($plans_tid);

                    $query = $this->entity_query->get('node')
                        ->condition('type', 'product')
                        ->condition('status', 1)
                        ->condition('nid', $node->nid->value, '!=')
                        ->sort('field_weight', 'ASC');

                    $group = $query->orConditionGroup();
                    foreach ($plans_tid as $plan) {
                        $group->condition('field_product_plan', $plan);
                    }
                    $query->condition($group);

                    $nids = $query->execute();
                    $variables['products'] = $this->entity_node->loadMultiple($nids);
                }
            }
        }

        return [
            '#theme'     => 'rp_site_products_related_block',
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
