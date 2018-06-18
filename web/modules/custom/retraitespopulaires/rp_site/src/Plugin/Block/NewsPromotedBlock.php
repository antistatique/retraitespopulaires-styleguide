<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\NewsPromotedBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Url;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\Core\State\StateInterface;

/**
* Provides a 'News Promoted' Block
*
* @Block(
*   id = "rp_site_news_promoted_block",
*   admin_label = @Translation("News Promoted block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_news_promoted_block')
* </code>
*/
class NewsPromotedBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
    * EntityTypeManagerInterface to load Nodes
    * @var EntityTypeManagerInterface
    */
    private $entity_node;

    /**
    * QueryFactory to execute query
    * @var QueryFactory
    */
    private $entity_query;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, QueryFactory $query) {
        $this->entity_node   = $entity->getStorage('node');
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
            $container->get('entity.query')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('news' => array(), 'title' => $this->t('Actualités'));

        $now = new \DateTime();
        $query = $this->entity_query->get('node')
            ->condition('type', 'news')
            ->condition('status', 1)
            ->condition('field_date', $now->format('c'), '<=')
            ->sort('promote', 'DESC')
            ->sort('field_date', 'DESC')
            ->range(0, 2)
        ;

        $nids = $query->execute();
        $variables['news'] = $this->entity_node->loadMultiple($nids);

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
