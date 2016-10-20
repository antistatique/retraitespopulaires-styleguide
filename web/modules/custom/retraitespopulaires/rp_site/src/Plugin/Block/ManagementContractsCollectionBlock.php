<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\ManagementContractsCollectionBlock.
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
* Provides a 'Management Contracts Collection' Block
*
* @Block(
*   id = "rp_site_management_contracts_collection_block",
*   admin_label = @Translation("Management Contracts Collection block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_management_contracts_collection_block')
* </code>
*/
class ManagementContractsCollectionBlock extends BlockBase implements ContainerFactoryPluginInterface {

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

        $query = $this->entity_query->get('node')
            ->condition('type', 'management_contracts')
            ->condition('status', 1)
            ->sort('title', 'ASC')
        ;

        $nids = $query->execute();
        $variables['management_contracts'] = $this->entity_node->loadMultiple($nids);

        return [
            '#theme'     => 'rp_site_management_contracts_collection_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path',
                ],
            ]
        ];
    }
}
