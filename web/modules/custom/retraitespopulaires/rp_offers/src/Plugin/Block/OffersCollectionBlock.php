<?php
/**
* @file
* Contains \Drupal\rp_offers\Plugin\Block\OffersCollectionBlock.
*/

namespace Drupal\rp_offers\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Symfony\Component\HttpFoundation\RequestStack;

/**
* Provides a 'Offers Collection' Block
*
* @Block(
*   id = "rp_offers_offers_collection_block",
*   admin_label = @Translation("Offers Collection block"),
* )
*
* Inline example:
* <code>
* load_block('rp_offers_offers_collection_block')
* </code>
*/
class OffersCollectionBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
     * Number of buildings per page
     * @var integer
     */
    private $limit = 20;

    /**
    * EntityTypeManagerInterface to load Nodes
    * @var EntityTypeManagerInterface
    */
    private $entity_node;

    /**
    * entity_query to query Node's Contest
    * @var QueryFactory
    */
    private $entity_query;

    /**
    * Request stack that controls the lifecycle of requests
    * @var RequestStack
    */
    private $request;

    /**
     * Class constructor.
     */
     public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, QueryFactory $query, RequestStack $request) {
         parent::__construct($configuration, $plugin_id, $plugin_definition);
         $this->entity_node   = $entity->getStorage('node');
         $this->entity_query  = $query;
         $this->request       = $request->getMasterRequest();
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
             $container->get('request_stack')
         );
     }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();

        $query = $this->entity_query->get('node')
            ->condition('type', 'offer')
            ->condition('status', 1)
        ;

        // Pager
        $nids = $query->execute();
        pager_default_initialize(count($nids), $this->limit);
        $variables['pager'] = array(
            '#type' => 'pager',
            '#quantity' => '3',
        );

        // Paged query
        $page = 0;
        if (!is_null($this->request->get('page'))) {
            $page = (int)$this->request->get('page');
        }
        $query->sort('field_date_end', 'DESC');
        $query->range($page*$this->limit, $this->limit);

        $nids = $query->execute();
        $variables['offers'] = $this->entity_node->loadMultiple($nids);

        return [
            '#theme'     => 'rp_offers_offers_collection_block',
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
