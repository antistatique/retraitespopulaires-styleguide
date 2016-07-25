<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\NewsFilterBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Url;

use Drupal\Core\Entity\EntityTypeManager;
use Drupal\Core\Path\AliasManager;

/**
* Provides a 'NewsFilter' Block
*
* @Block(
*   id = "rp_site_documentsk",
*   admin_label = @Translation("News Filter block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_news_filter_block')
* </code>
*/
class NewsFilterBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
    * EntityTypeManager to load Taxonomy
    * @var EntityTypeManager
    */
    private $entity_taxonomy;

    /**
     * AliasManager Service
     * @var AliasManager
     */
    private $alias_manager;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManager $entity,  AliasManager $alias_manager) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_taxonomy = $entity->getStorage('taxonomy_term');
        $this->alias_manager   = $alias_manager;
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
            $container->get('path.alias_manager')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('categories' => array());

        // Professions
        $professions = $this->entity_taxonomy->loadTree('profession');
        // categories
        $types  = $this->entity_taxonomy->loadTree('category_news');

        $categories = array_merge($professions, $types);
        foreach ($categories as $profession) {
            $alias = $this->alias_manager->getAliasByPath('/taxonomy/term/'.$profession->tid);
            if( !empty($alias) ){
                $variables['categories'][] = array(
                    'term' => $profession,
                    'alias' => str_replace('/', '', $alias),
                );
            }
        }

        return [
            '#theme'     => 'rp_site_news_filter_block',
            '#variables' => $variables,
        ];
    }
}
