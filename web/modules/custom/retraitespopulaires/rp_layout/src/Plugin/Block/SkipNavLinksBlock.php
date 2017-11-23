<?php

namespace Drupal\rp_layout\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;

/**
 * Provides a 'Layout' Skip Navigation Links Block.
 *
 * @Block(
 *   id = "rp_layout_skip_nav_links_block",
 *   admin_label = @Translation("Layout Skip Navigation Links block"),
 * )
 */
class SkipNavLinksBlock extends BlockBase implements ContainerFactoryPluginInterface {
  /**
   * Current Route.
   *
   * @var \Drupal\Core\Routing\CurrentRouteMatch
   */
  protected $route;

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
    // Instantiates this form class.
    return new static(
        // Load the service required to construct this class.
        $configuration,
        $plugin_id,
        $plugin_definition,
        // Load customs services used in this class.
        $container->get('current_route_match')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = [];
    $variables['node'] = $this->route->getParameter('node');

    $variables['params'] = [
      'email' => 'info@retraitespopulaires.ch',
      'phone' => '0041213482111',
    ];

    return [
      '#theme'     => 'rp_layout_skip_nav_links_block',
      '#variables' => $variables,
      '#cache' => [
        'contexts' => [
          'url.path',
        ],
      ],
    ];
  }

}
