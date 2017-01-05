<?php
/**
* @file
* Contains \Drupal\rp_contact\Plugin\Block\ContactsCollectionBlock.
*/

namespace Drupal\rp_contact\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\rp_site\Service\Profession;
use Drupal\Core\Routing\CurrentRouteMatch;
use Symfony\Component\HttpFoundation\RequestStack;

/**
* Provides a 'Contacts Collection' Block
*
* @Block(
*   id = "rp_contact_contacts_collection_block",
*   admin_label = @Translation("Contacts Collection block"),
* )
*
* Inline example:
* <code>
* load_block('rp_contact_contacts_collection_block')
* </code>
*/
class ContactsCollectionBlock extends BlockBase implements ContainerFactoryPluginInterface {

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
    * Request stack that controls the lifecycle of requests
    * @var RequestStack
    */
    private $request;

    /**
     * Class constructor.
     */
     public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, QueryFactory $query, Profession $profession, CurrentRouteMatch $route, RequestStack $request) {
         parent::__construct($configuration, $plugin_id, $plugin_definition);
         $this->entity_node  = $entity->getStorage('node');
         $this->entity_query = $query;
         $this->profession   = $profession;
         $this->route        = $route;
         $this->request      = $request->getMasterRequest();
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
             $container->get('current_route_match'),
             $container->get('request_stack')
         );
     }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();

        // Set the theme using the current node profession
        if ($node = $this->route->getParameter('node')) {
            $variables['theme'] = $this->profession->theme($node->field_profession->target_id);
        }

        $query = $this->entity_query->get('node')
            ->condition('type', 'contact')
            ->condition('status', 1)
            ->sort('title', 'ASC')
        ;

        $nids = $query->execute();
        $variables['contacts'] = $this->entity_node->loadMultiple($nids);

        return [
            '#theme'     => 'rp_contact_contacts_collection_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path',
                ],
            ]
        ];
    }
}
