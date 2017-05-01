<?php

namespace Drupal\antistatique_quick_edit\Plugin\Block;

/**
 * Contains \Drupal\antistatique_quick_edit\Plugin\Block\NodeEditBlock.
 */

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Url;

// Injection.
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\Core\Session\AccountProxyInterface;

/**
 * Provides a 'Node Edit' Block.
 *
 * @Block(
 *   id = "antistatique_quick_edit_node_edit_block",
 *   admin_label = @Translation("Node Edit block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('antistatique_quick_edit_node_edit_block')
 * </code>
 */
class NodeEditBlock extends BlockBase implements ContainerFactoryPluginInterface {
  /**
   * Current Route.
   *
   * @var \Drupal\Core\Routing\CurrentRouteMatch
   */
  private $route;

  /**
   * Current User.
   *
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
  private $currentUser;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, CurrentRouteMatch $route, AccountProxyInterface $currentUser) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entity_node = $entity->getStorage('node');
    $this->route       = $route;
    $this->currentUser = $currentUser;
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
        $container->get('current_user')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = [
      'path' => drupal_get_path('module', 'antistatique_quick_edit'),
      'text' => '',
      'link' => '',
      'node' => NULL,
    ];

    if ($this->currentUser->hasPermission('administer site configuration') && $node = $this->route->getParameter('node')) {
      $variables['node'] = $node;

      $variables['text'] = $this->t('Edit');
      if (isset($params['text'])) {
        $variables['text'] = $params['text'];
      }

      $attributes = ['class' => 'button edit-node', 'target' => '_blank'];
      if (isset($params['attributes'])) {
        $attributes = $params['attributes'];
      }
      $variables['link'] = Url::fromRoute('entity.node.edit_form', ['node' => $node->nid->value], ['attributes' => $attributes]);
    }

    return [
      '#theme'     => 'antistatique_quick_edit_node_edit_block',
      '#variables' => $variables,
      '#attached' => [
        'library' => ['antistatique_quick_edit/icons'],
      ],
      '#cache' => [
        'contexts' => [
          'url.path',
        ],
      ],
    ];
  }

}
