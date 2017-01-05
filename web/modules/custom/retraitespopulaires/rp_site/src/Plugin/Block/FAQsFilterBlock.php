<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\FAQsFilterBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Url;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\Core\State\StateInterface;
use Drupal\rp_site\Service\Profession;

/**
* Provides a 'FAQs Filter' Block
*
* @Block(
*   id = "rp_site_faqs_filter_block",
*   admin_label = @Translation("FAQs Filter block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_faqs_filter_block')
* </code>
*/
class FAQsFilterBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
    * EntityTypeManagerInterface to load Taxonomy
    * @var EntityTypeManagerInterface
    */
    private $entity_taxonomy;

    /**
     * AliasManagerInterface Service
     * @var AliasManagerInterface
     */
    private $alias_manager;

    /**
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    private $state;

    /**
     * Profession Service
     * @var Profession
     */
    private $profession;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity,  AliasManagerInterface $alias_manager, StateInterface $state, Profession $profession) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_taxonomy = $entity->getStorage('taxonomy_term');
        $this->alias_manager   = $alias_manager;
        $this->state           = $state;
        $this->profession      = $profession;
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
            $container->get('path.alias_manager'),
            $container->get('state'),
            $container->get('rp_site.profession')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('categories' => array(), 'collection' => $this->state->get('rp_site.settings.collection.faqs')['nid']);

        $taxonomy_term_alias = \Drupal::request()->query->get('taxonomy_term_alias');
        $variables['current_aliases'] = $taxonomy_term_alias;

        // Professions
        $professions = $this->entity_taxonomy->loadTree('profession');

        // Only interested by alias of Profession taxonomy
        foreach ($professions as $profession) {
            $alias = $this->alias_manager->getAliasByPath('/taxonomy/term/'.$profession->tid);
            if( !empty($alias) ){
                $alias = str_replace('/metier/', '', $alias);
                $variables['categories'][] = array(
                    'term'  => $profession,
                    'alias' => $alias,
                );

                if($alias == $taxonomy_term_alias) {
                    $variables['selected'] = $this->entity_taxonomy->load($profession->tid);
                    $variables['theme'] = $this->profession->theme($profession->tid);
                }
            }
        }

        return [
            '#theme'     => 'rp_site_faqs_filter_block',
            '#variables' => $variables,
        ];
    }
}
