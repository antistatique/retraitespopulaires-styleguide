<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\DocumentsBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Url;

use Drupal\Core\Entity\EntityTypeManager;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\Core\Path\AliasManager;
use Drupal\rp_site\Service\Profession;

/**
* Provides a 'Useful Documents' Block
*
* @Block(
*   id = "rp_site_documentsk",
*   admin_label = @Translation("Useful Documents block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_documents_block')
* </code>
*/
class DocumentsBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
    * EntityTypeManager to load Nodes
    * @var EntityTypeManager
    */
    private $entity_node;

    /**
    * Current Route
    * @var CurrentRouteMatch
    */
    private $route;

    /**
     * AliasManager Service
     * @var AliasManager
     */
    private $alias_manager;

    /**
     * Profession Service
     * @var Profession
     */
    private $profession;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManager $entity, CurrentRouteMatch $route, AliasManager $alias_manager, Profession $profession) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_node   = $entity->getStorage('node');
        $this->route         = $route;
        $this->alias_manager = $alias_manager;
        $this->profession    = $profession;
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
            $container->get('rp_site.profession')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('documents' => array());

        //Load the current node's field_document
        $documents_nids = array();
        if ($node = $this->route->getParameter('node')) {
            if( isset($node->field_document) && !empty($node->field_document) ){
                foreach ($node->field_document as $key => $doc) {
                    $documents_nids[] = $doc->target_id;
                }
                $variables['documents'] = $this->entity_node->loadMultiple($documents_nids);

                $alias = $this->alias_manager->getAliasByPath('/taxonomy/term/'.$node->field_profession->target_id);
                if( !empty($alias) ){
                    $alias = str_replace('/', '', $alias);
                }
                $variables['collection'] = array(
                    'name' => $this->profession->name($node->field_profession->target_id),
                    'link' => Url::fromRoute('rp_site.documents.collection', array('taxonomy_term_alias' => $alias))
                );
            }
        }

        return [
            '#theme'     => 'rp_site_documents_block',
            '#variables' => $variables,
        ];
    }
}
