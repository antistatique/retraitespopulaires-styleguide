<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\NewsBlock.
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

/**
* Provides a 'News' Block
*
* @Block(
*   id = "rp_site_news",
*   admin_label = @Translation("News block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_news_block')
* </code>
*/
class NewsBlock extends BlockBase implements ContainerFactoryPluginInterface {

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
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, CurrentRouteMatch $route, AliasManagerInterface $alias_manager, Profession $profession, QueryFactory $query) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_node   = $entity->getStorage('node');
        $this->route         = $route;
        $this->alias_manager = $alias_manager;
        $this->profession    = $profession;
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
            $container->get('rp_site.profession'),
            $container->get('entity.query')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('news' => array());
        //Load the current node's related news
        $news_nids = array();
        if ($node = $this->route->getParameter('node')) {

            $alias = $this->alias_manager->getAliasByPath('/taxonomy/term/'.$node->field_profession->target_id);
            if( !empty($alias) ){
                $alias = str_replace('/', '', $alias);
            }

            $now = date('Y-m-d h:i:s');
            $query = $this->entity_query->get('node')
                ->condition('type', 'news')
                ->condition('status', 1)
                ->condition('field_profession', $node->field_profession->target_id)
                ->condition('field_date', $now, '<=')
                ->sort('field_date', 'DESC')
                ->range(0, 3);

            $nids = $query->execute();
            $variables['news'] = $this->entity_node->loadMultiple($nids);

            $variables['collection'] = array(
                'name' => $this->profession->name($node->field_profession->target_id),
                'link' => Url::fromRoute('rp_site.news.collection', array('taxonomy_term_alias' => $alias))
            );
        }

        return [
            '#theme'     => 'rp_site_news_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }
}
