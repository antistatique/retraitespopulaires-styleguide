<?php
/**
* @file
* Contains \Drupal\rp_contact\Plugin\Block\AdvisorsCollectionBlock.
*/

namespace Drupal\rp_contact\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;

/**
* Provides a 'Contact Pop-in Form' Block
*
* @Block(
  *   id = "rp_contact_popin_block",
  *   admin_label = @Translation("Popin Form block"),
  * )
  */
class PopinBlock extends BlockBase implements ContainerFactoryPluginInterface {
  /**
  * Current Route
  * @var \Drupal\Core\Routing\CurrentRouteMatch
  */
  private $route;

  /**
  * Class constructor.
  */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, CurrentRouteMatch $route) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->route = $route;
  }

  /**
  * {@inheritdoc}
  */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('current_route_match')
    );
  }

  /**
  * {@inheritdoc}
  */
  public function build() {
    $variables = ['popin' => false];

    // Show the pop-in only when the field is checked.
    $node = $this->route->getParameter('node');
    if ($node && $node->hasField('field_popin') && !$node->get('field_popin')->isEmpty()) {
      $variables['popin'] = TRUE;
    }

    return [
      '#theme'     => 'rp_contact_popin_block',
      '#variables' => $variables,
      '#cache' => [
        'contexts' => [
          'url.path',
        ],
      ]
    ];
  }
}
