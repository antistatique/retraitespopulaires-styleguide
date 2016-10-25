<?php
/**
* @file
* Contains \Drupal\rp_contact\Plugin\Block\ContactAttachmentBlock.
*/

namespace Drupal\rp_contact\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\rp_site\Service\Profession;

/**
* Provides a 'Contact Attachment' Block
*
* @Block(
*   id = "rp_contact_contact_attachment_block",
*   admin_label = @Translation("Contact Attachment block"),
* )
*
* Inline example:
* <code>
* load_block('rp_contact_contact_attachment_block')
* </code>
*/
class ContactAttachmentBlock extends BlockBase implements ContainerFactoryPluginInterface {

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
     * Profession Service
     * @var Profession
     */
    private $profession;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, CurrentRouteMatch $route, Profession $profession) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_node = $entity->getStorage('node');
        $this->route       = $route;
        $this->profession  = $profession;
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
            $container->get('rp_site.profession')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();

        if (isset($params['theme'])) {
            $variables['theme'] = $params['theme'];
        }

        if ($node = $this->route->getParameter('node')) {
            if (isset($node->field_profession->target_id)){
                $variables['theme'] = $this->profession->theme($node->field_profession->target_id);
            }

            $variables['node'] = $node;
            if (isset($node->field_advisor->target_id) && !empty($node->field_advisor->target_id) ){
                $variables['contact'] = $this->entity_node->load($node->field_advisor->target_id);
            } else if ( isset($node->field_contact->target_id) && !empty($node->field_contact->target_id) ){
                $variables['contact'] = $this->entity_node->load($node->field_contact->target_id);
            }
        }

        // If the contact is disabled don't show it
        if (isset($variables['contact']) && !$variables['contact']->isPublished()) {
            unset($variables['contact']);
        }

        return [
            '#theme'     => 'rp_contact_contact_attachment_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }
}
