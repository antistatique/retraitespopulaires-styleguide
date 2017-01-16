<?php
/**
* @file
* Contains \Drupal\rp_contact\Plugin\Block\ContactCTABlock.
*/

namespace Drupal\rp_contact\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\rp_site\Service\Profession;
use Drupal\rp_site\Service\Cover;

/**
* Provides a 'Contact CTA' Block
*
* @Block(
*   id = "rp_contact_contact_cta_block",
*   admin_label = @Translation("Contact CTA block"),
* )
*
* Inline example:
* <code>
* load_block('rp_contact_contact_cta_block')
* </code>
*/
class ContactCTABlock extends BlockBase implements ContainerFactoryPluginInterface {

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
     * Cover Service
     * @var Cover
     */
    private $cover;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, CurrentRouteMatch $route, Profession $profession, Cover $cover) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_node = $entity->getStorage('node');
        $this->route       = $route;
        $this->profession  = $profession;
        $this->cover       = $cover;
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
            $container->get('rp_site.profession'),
            $container->get('rp_site.cover')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('contacts' => array());

        if (isset($params['theme'])) {
            $variables['theme'] = $params['theme'];
        }

        if ($node = $this->route->getParameter('node')) {
            if (isset($node->field_profession) && $node->field_profession->target_id) {
                $variables['theme'] = $this->profession->theme($node->field_profession->target_id);
            }

            $variables['node'] = $node;

            // List all advisor(s)
            if (isset($node->field_advisor) && !empty($node->field_advisor) ){
                foreach ($node->field_advisor as $key => $advisor) {
                    $advisor = $this->entity_node->load($advisor->target_id);
                    // If the advisor is publish only
                    if ($advisor && $advisor->isPublished()){
                        $variables['contacts'][] = $advisor;
                    }
                }
            }

            // List all contact(s)
            if ( isset($node->field_contact) && !empty($node->field_contact) ){
                foreach ($node->field_contact as $key => $contact) {
                    $contact = $this->entity_node->load($contact->target_id);
                    // If the contact is publish only
                    if ($contact && $contact->isPublished()){
                        $variables['contacts'][] = $contact;
                    }
                }
            }
        }

        if (count($variables['contacts']) >= 1) {
          $variables['cover'] = $this->cover->fromNode($variables['contacts'][0], array('xl' => 'rp_teaser_contact_portrait_xl'));
        }

        return [
            '#theme'     => 'rp_contact_contact_cta_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }
}
