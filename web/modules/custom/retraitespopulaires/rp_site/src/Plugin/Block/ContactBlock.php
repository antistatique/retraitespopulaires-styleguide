<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\ContactBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;

/**
* Provides a 'Contact' Block
*
* @Block(
*   id = "rp_site_contact",
*   admin_label = @Translation("Contact block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_contact_block')
* </code>
*/
class ContactBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
    * EntityTypeManagerInterface to load Nodes
    * @var EntityTypeManagerInterface
    */
    private $entity_node;

    /**
    * Current Route
    * @var CurrentRouteMatch
    */
    private $route;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, CurrentRouteMatch $route) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_node   = $entity->getStorage('node');
        $this->route         = $route;
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
        $variables = array('contact' => array());
        //Load the current node's field_contact
        $contact_nids = array();
        if ($node = $this->route->getParameter('node')) {
            if( isset($node->field_contact) && !empty($node->field_contact) ){
                $variables['contact'] = $this->entity_node->load($node->field_contact->target_id);
            }
        }

        if (empty($variables['contact'])) { return; }

        return [
            '#theme'     => 'rp_site_contact_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }
}
