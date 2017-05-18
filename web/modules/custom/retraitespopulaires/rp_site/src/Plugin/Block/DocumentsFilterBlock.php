<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\DocumentsFilterBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

// Injection.
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\Core\State\StateInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Drupal\rp_site\Service\Profession;

/**
* Provides a 'Documents Filter' Block
*
* @Block(
*   id = "rp_site_documents_filter_block",
*   admin_label = @Translation("Documents Filter block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_documents_filter_block')
* </code>
*/
class DocumentsFilterBlock extends BlockBase implements ContainerFactoryPluginInterface {

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
     * State API for storing variables that shouldn't travel between instances.
     *
     * @var StateInterface
     */
    protected $state;

    /**
     * Request stack that controls the lifecycle of requests.
     *
     * @var RequestStack
     */
    private $request;

    /**
     * Profession Service
     * @var Profession
     */
    private $profession;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity,  AliasManagerInterface $alias_manager, StateInterface $state, RequestStack $request, Profession $profession) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_taxonomy = $entity->getStorage('taxonomy_term');
        $this->alias_manager   = $alias_manager;
        $this->state           = $state;
        $this->request        = $request->getMasterRequest();
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
            $container->get('request_stack'),
            $container->get('rp_site.profession')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('categories' => array(), 'collection' => $this->state->get('rp_site.settings.collection.documents')['nid']);

        // Get the current profession (only on sub section)
        $variables['profession_alias'] = $this->request->query->get('profession_alias');

        // Get the current category (only on sub section)
        $variables['category_alias'] = $this->request->query->get('category_alias');

        // Get the current category (only on sub section)
        $variables['institution_alias'] = $this->request->query->get('institution_alias');

        // Retrieve professions.
        $professions = $this->entity_taxonomy->loadTree('profession');
        foreach ($professions as $profession) {
            $alias = $this->alias_manager->getAliasByPath('/taxonomy/term/'.$profession->tid);
            if( !empty($alias) ){
                $alias = str_replace('/metier/', '', $alias);
                $variables['professions'][] = array(
                    'term'  => $profession,
                    'alias' => ltrim($alias, '/'),
                );
            }
        }

        // Retrieve categories.
        $categories = $this->entity_taxonomy->loadTree('category_document');
        foreach ($categories as $category) {
            $alias = $this->alias_manager->getAliasByPath('/taxonomy/term/'.$category->tid);
            if( !empty($alias) ){
                $alias = str_replace('/categorie-document/', '', $alias);
                $variables['categories'][] = array(
                    'term'  => $category,
                    'alias' => ltrim($alias, '/'),
                );
            }
        }

        // Retrieve categories (institution).
        $institutions = $this->entity_taxonomy->loadTree('category_document_institutions');
        foreach ($institutions as $category) {
            $alias = $this->alias_manager->getAliasByPath('/taxonomy/term/'.$category->tid);
            if( !empty($alias) ){
                $alias = str_replace('/categorie-document/', '', $alias);
                $variables['institutions'][] = array(
                    'term'  => $category,
                    'alias' => ltrim($alias, '/'),
                );
            }
        }

        return [
            '#theme'     => 'rp_site_documents_filter_block',
            '#variables' => $variables,
        ];
    }
}
