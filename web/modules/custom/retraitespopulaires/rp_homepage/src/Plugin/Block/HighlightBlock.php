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

    $highlight = $this->state->get('rp_homepage.highlight');

    $oembed_endpoint = 'https://vimeo.com/api/oembed';

    // Grab the video url from the url, or use default
    $json_url = $oembed_endpoint . '.json?url=' . rawurlencode($highlight['vimeo_url']) . '&width=640';

    // Curl helper function
    function curl_get($url) {
      $curl = curl_init($url);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($curl, CURLOPT_TIMEOUT, 30);
      curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
      $return = curl_exec($curl);
      curl_close($curl);
      return $return;
    }

    if ($this->pathMatcher->isFrontPage()) {
      $vimeo_oembed = json_decode(curl_get($json_url));
//      dump($vimeo_oembed);

      $variables = [
        'highlight' => $highlight,
        'vimeo_oembed' => $vimeo_oembed,
      ];
    }

    return [
      '#theme'     => 'rp_homepage_highlight',
      '#variables' => $variables,
      '#attached' => [
        'library' => ['rp_homepage/vimeo_player'],
      ],
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
