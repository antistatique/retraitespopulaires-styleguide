<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\NewsCollectionBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use \Symfony\Component\HttpFoundation\RequestStack;

/**
* Provides a 'NewsCollection' Block
*
* @Block(
*   id = "rp_site_news_collection_block",
*   admin_label = @Translation("News Filter block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_news_collection_block')
* </code>
*/
class NewsCollectionBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
     * Number of news per page
     * @var integer
     */
    private $limit = 20;

    /**
     * AliasManagerInterface Service
     * @var AliasManagerInterface
     */
    private $alias_manager;

    /**
    * EntityTypeManagerInterface to load Nodes
    * @var EntityTypeManagerInterface
    */
    private $entity_node;

    /**
    * EntityTypeManagerInterface to load Taxonomy
    * @var EntityTypeManagerInterface
    */
    private $entity_taxonomy;

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
     public function __construct(array $configuration, $plugin_id, $plugin_definition, AliasManagerInterface $alias_manager, EntityTypeManagerInterface $entity, QueryFactory $query, RequestStack $request) {
         parent::__construct($configuration, $plugin_id, $plugin_definition);
         $this->alias_manager   = $alias_manager;
         $this->entity_node     = $entity->getStorage('node');
         $this->entity_taxonomy = $entity->getStorage('taxonomy_term');
         $this->entity_query    = $query;
         $this->request         = $request->getMasterRequest();
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
             $container->get('path.alias_manager'),
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

        $now = date('Y-m-d h:i:s');

        $query = $this->entity_query->get('node')
            ->condition('type', 'news')
            ->condition('status', 1)
            ->condition('field_date', $now, '<=')
        ;

        $taxonomy_term_alias = $this->request->query->get('taxonomy_term_alias');

        if (!empty($taxonomy_term_alias)) {
            // Retreive filter from slug alias
            $taxonomy_term_tid = null;
            $taxonomy_term_url = $this->alias_manager->getPathByAlias('/'.$taxonomy_term_alias);
            if( !empty($taxonomy_term_url) ){
                $taxonomy_term_tid = str_replace('/taxonomy/term/', '', $taxonomy_term_url);
                $term = $this->entity_taxonomy->load($taxonomy_term_tid);
                if ($term->vid->target_id == 'profession') {
                    $query->condition('field_profession', $taxonomy_term_tid);
                } elseif ($term->vid->target_id == 'category_news') {
                    $query->condition('field_news_type', $taxonomy_term_tid);
                }
            }
        }

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
        $query->sort('field_date', 'DESC');
        $query->range($page*$this->limit, $this->limit);

        $nids = $query->execute();
        $variables['news'] = $this->entity_node->loadMultiple($nids);

        return [
            '#theme'     => 'rp_site_news_collection_block',
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
