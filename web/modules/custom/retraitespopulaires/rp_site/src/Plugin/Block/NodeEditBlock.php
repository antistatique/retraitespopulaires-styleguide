<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\NodeEditBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Url;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;

/**
* Provides a 'Node Edit' Block
*
* @Block(
*   id = "rp_site_node_edit_block",
*   admin_label = @Translation("Node Edit block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_node_edit_block')
* </code>
*/
class NodeEditBlock extends BlockBase implements ContainerFactoryPluginInterface {


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
        $variables = array('text' => '', 'link' => '', 'node' => null);

        if ( \Drupal::currentUser()->hasPermission('administer site configuration') && $node = $this->route->getParameter('node')) {
            $variables['node'] = $node;

            $variables['text'] = t('Edit');
            if( isset($params['text']) ){
                $variables['text'] = $params['text'];
            }

            $attributes = ['class' => 'button edit-node', 'target' => '_blank'];
            if( isset($params['attributes']) ){
                $attributes = $params['attributes'];
            }
            $variables['link'] = Url::fromRoute('entity.node.edit_form', ['node' => $node->nid->value], ['attributes' => $attributes] );
        }

        return [
            '#theme'     => 'rp_site_node_edit_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }
}
