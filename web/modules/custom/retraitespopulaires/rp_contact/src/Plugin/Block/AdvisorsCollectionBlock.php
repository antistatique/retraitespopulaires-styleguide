<?php
/**
* @file
* Contains \Drupal\rp_contact\Plugin\Block\AdvisorsCollectionBlock.
*/

namespace Drupal\rp_contact\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\rp_site\Service\Profession;
use Drupal\Core\Routing\CurrentRouteMatch;

/**
* Provides a 'Advisors Collection' Block
*
* @Block(
*   id = "rp_contact_advisors_collection_block",
*   admin_label = @Translation("Advisors Collection block"),
* )
*
* Inline example:
* <code>
* load_block('rp_contact_advisors_collection_block')
* </code>
*/
class AdvisorsCollectionBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
    * EntityTypeManagerInterface to load Nodes
    * @var EntityTypeManagerInterface
    */
    private $entity_node;

    /**
    * entity_query to query Node's Contest
    * @var QueryFactory
    */
    private $entity_query;

    /**
     * Profession Service
     * @var Profession
     */
    private $profession;

    /**
    * Current Route
    * @var CurrentRouteMatch
    */
    private $route;

    /**
     * Class constructor.
     */
     public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, QueryFactory $query, Profession $profession, CurrentRouteMatch $route) {
         parent::__construct($configuration, $plugin_id, $plugin_definition);
         $this->entity_node     = $entity->getStorage('node');
         $this->entity_query    = $query;
         $this->profession      = $profession;
         $this->route           = $route;
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
             $container->get('rp_site.profession'),
             $container->get('current_route_match')
         );
     }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();

        $query = $this->entity_query->get('node')
            ->condition('type', 'advisor')
            ->condition('status', 1)
            ->sort('field_lastname', 'ASC')
        ;

        $nids = $query->execute();
        $variables['advisors'] = $this->entity_node->loadMultiple($nids);

        return [
            '#theme'     => 'rp_contact_advisors_collection_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path',
                ],
            ]
        ];
    }
}
