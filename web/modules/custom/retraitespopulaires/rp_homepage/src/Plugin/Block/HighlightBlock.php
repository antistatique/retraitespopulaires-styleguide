<?php

/**
 * @file
 * Contains \Drupal\rp_homepage\Plugin\Block\HighlightBlock.
 */

namespace Drupal\rp_homepage\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\State\StateInterface;
use Drupal\Core\Path\PathMatcherInterface;

/**
 * Provides a Block to display the six blocks on the homepage
 *
 * @Block(
 *   id = "rp_homepage_highlight",
 *   admin_label = @Translation("Block that display an highlight on the home."),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_homepage_highlight')
 * </code>
 */
class HighlightBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
   * @var StateInterface
   */
  private $state;

  /**
   * The path matcher.
   *
   * @var \Drupal\Core\Path\PathMatcherInterface
   */
  protected $pathMatcher;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, StateInterface $state, PathMatcherInterface $path_matcher) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->state = $state;
    $this->pathMatcher = $path_matcher;
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
      $container->get('state'),
      $container->get('path.matcher')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = array()) {
    $variables = [];

    if ($this->pathMatcher->isFrontPage()) {
      $variables = [
        'highlight' => $this->state->get('rp_homepage.highlight'),
      ];
    }

    return [
      '#theme'     => 'rp_homepage_highlight',
      '#variables' => $variables,
      '#cache' => [
        '#cache' => [
          'contexts' => [
            'url.path',
          ],
        ],
        'tags' => ['front'],
      ],
    ];

  }

}
