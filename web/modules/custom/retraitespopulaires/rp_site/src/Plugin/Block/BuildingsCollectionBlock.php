<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\BuildingsCollectionBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Symfony\Component\HttpFoundation\RequestStack;
use Drupal\Core\Entity\EntityFieldManagerInterface;

/**
* Provides a 'Buildings Collection' Block
*
* @Block(
*   id = "rp_site_buildings_collection_block",
*   admin_label = @Translation("Buildings Collection block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_buildings_collection_block')
* </code>
*/
class BuildingsCollectionBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
     * Number of buildings per page
     * @var integer
     */
    private $limit = 12;

    /**
    * EntityTypeManagerInterface to load Nodes
    * @var EntityTypeManagerInterface
    */
    private $entity_node;

    /**
    * This includes field definitions, base field definitions, and field storage definitions.
    * @var EntityFieldManagerInterface
    */
    private $entity_field;

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
     public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, QueryFactory $query, RequestStack $request, EntityFieldManagerInterface $entity_field) {
         parent::__construct($configuration, $plugin_id, $plugin_definition);
         $this->entity_node   = $entity->getStorage('node');
         $this->entity_field  = $entity_field;
         $this->entity_query  = $query;
         $this->request       = $request->getMasterRequest();
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
             $container->get('entity.query'),
             $container->get('request_stack'),
             $container->get('entity_field.manager')
         );
     }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();

        $query = $this->entity_query->get('node')
            ->condition('type', 'building')
            ->condition('status', 1)
        ;

        $building_status_alias = $this->request->query->get('building_status_alias');

        $fields = $this->entity_field->getFieldDefinitions('node', 'building');
        $field_building_status = $fields['field_building_status']->getSetting('allowed_values');

        if (!empty($field_building_status) && array_key_exists($building_status_alias, $field_building_status)) {
            $query->condition('field_building_status', $building_status_alias);
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
        $variables['buildings'] = $this->entity_node->loadMultiple($nids);

        return [
            '#theme'     => 'rp_site_buildings_collection_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path',
                    'url.query_args'
                ],
                'tags' => [
                    'node_list:building', // invalidated whenever any Node entity is updated, deleted or created
                ],
            ]
        ];
    }
}
