<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\NewsLatestBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Url;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\rp_site\Service\Profession;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\Core\State\StateInterface;

/**
* Provides a 'News Latest' Block
*
* @Block(
*   id = "rp_site_news_latest_block",
*   admin_label = @Translation("News Latest block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_news_latest_block')
* </code>
*/
class NewsLatestBlock extends BlockBase implements ContainerFactoryPluginInterface {

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
     * Profession Service
     * @var Profession
     */
    private $profession;

    /**
    * QueryFactory to execute query
    * @var QueryFactory
    */
    private $entity_query;

    /**
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    private $state;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, CurrentRouteMatch $route, AliasManagerInterface $alias_manager, Profession $profession, QueryFactory $query, StateInterface $state) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_node   = $entity->getStorage('node');
        $this->route         = $route;
        $this->alias_manager = $alias_manager;
        $this->profession    = $profession;
        $this->entity_query  = $query;
        $this->state         = $state;
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
            $container->get('rp_site.profession'),
            $container->get('entity.query'),
            $container->get('state')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('news' => array(), 'title' => t('Actualités'));

        //Load the current node's related news
        $news_nids = array();
        $node = $this->route->getParameter('node');
        if (isset($node->field_profession->target_id)) {
            $alias = $this->alias_manager->getAliasByPath('/taxonomy/term/'.$node->field_profession->target_id);
            if( !empty($alias) ){
                $alias = str_replace('/', '', $alias);
            }

            $now = new \DateTime();
            $query = $this->entity_query->get('node')
                ->condition('type', 'news')
                ->condition('status', 1)
                ->condition('field_profession', $node->field_profession->target_id)
                ->condition('field_date', $now->format('c'), '<=')
                ->sort('field_date', 'DESC')
                ->range(0, 2);

            $nids = $query->execute();
            $variables['news'] = $this->entity_node->loadMultiple($nids);

            $variables['title'] = t('Actualités du métier');
        }

        // Fallback to retrieve news
        if (empty($node) || empty($variables['news'])) {
            $now = new \DateTime();
            $query = $this->entity_query->get('node')
                ->condition('type', 'news')
                ->condition('status', 1)
                ->condition('field_date', $now->format('c'), '<=')
                ->sort('field_date', 'DESC')
                ->range(0, 2);

            $nids = $query->execute();
            $variables['news'] = $this->entity_node->loadMultiple($nids);
        }

        return [
            '#theme'     => 'rp_site_news_latest_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
                'tags' => [
                    'node_list:news' // invalidated whenever any Node entity is updated, deleted or created
                ],
            ]
        ];
    }
}
