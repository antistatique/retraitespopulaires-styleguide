<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\AdvisorBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;

/**
* Provides a 'Advisor' Block
*
* @Block(
*   id = "rp_site_advisor",
*   admin_label = @Translation("Advisor block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_advisor_block')
* </code>
*/
class AdvisorBlock extends BlockBase implements ContainerFactoryPluginInterface {

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
        $variables = array('advisor' => array());
        //Load the current node's field_advisor
        $advisor_nids = array();
        if ($node = $this->route->getParameter('node')) {
            if( isset($node->field_advisor) && !empty($node->field_advisor) ){
                $variables['advisor'] = $this->entity_node->load($node->field_advisor->target_id);
            }
        }

        if (empty($variables['advisor'])) { return; }

        return [
            '#theme'     => 'rp_site_advisor_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }
}
