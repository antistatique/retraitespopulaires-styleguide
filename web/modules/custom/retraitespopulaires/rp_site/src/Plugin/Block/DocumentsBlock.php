<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\DocumentsBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManager;
use Drupal\Core\Routing\CurrentRouteMatch;

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
    private $entityNode;

    /**
    * Current Route
    * @var CurrentRouteMatch
    */
    private $route;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManager $entity, CurrentRouteMatch $route) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entityNode = $entity->getStorage('node');
        $this->route      = $route;
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
            $container->get('current_route_match')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('documents' => array());

        $documents_nids = array();
        if ($node = $this->route->getParameter('node')) {
            if( isset($node->field_document) && !empty($node->field_document) ){
                foreach ($node->field_document as $key => $doc) {
                    $documents_nids[] = $doc->target_id;
                }
                $variables['documents'] = $this->entityNode->loadMultiple($documents_nids);
            }
        }

        return [
            '#theme'     => 'rp_site_documents_block',
            '#variables' => $variables,
        ];
    }
}
