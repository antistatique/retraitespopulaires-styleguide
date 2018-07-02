<?php

namespace Drupal\rp_homepage\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\State\StateInterface;
use Drupal\Core\Path\PathMatcherInterface;
use GuzzleHttp\ClientInterface;
use GuzzleHttp\Exception\TransferException;

/**
 * Provides a Block to display the six blocks on the homepage.
 *
 * @Block(
 *   id = "rp_homepage_highlight",
 *   admin_label = @Translation("Block that display an highlight on the home."),
 * )
 */
class HighlightBlock extends BlockBase implements ContainerFactoryPluginInterface {

  const VIMEO_API = 'https://vimeo.com/api/oembed.json';

  /**
   * The state key value store.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  private $state;

  /**
   * The path matcher.
   *
   * @var \Drupal\Core\Path\PathMatcherInterface
   */
  protected $pathMatcher;

  /**
   * The HTTP client to fetch the feed data with.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $httpClient;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, StateInterface $state, PathMatcherInterface $path_matcher, ClientInterface $http_client) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->state = $state;
    $this->pathMatcher = $path_matcher;
    $this->httpClient = $http_client;
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
      $container->get('path.matcher'),
      $container->get('http_client')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $renderer = [
      '#theme'     => 'rp_homepage_highlight',
      '#variables' => [],
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

    // Only display on frontpage.
    if (!$this->pathMatcher->isFrontPage()) {
      return $renderer;
    }

    $highlight = $this->state->get('rp_homepage.highlight');
    $renderer['#variables']['highlight'] = $highlight;

    // When vimeo is not filled in config, render the card whitout video.
    if (!isset($highlight['vimeo_url'])) {
      return $renderer;
    }

    // Retrieive oembed from Vimeo API.
    $embed = NULL;
    try {
      $response = $this->httpClient->get(self::VIMEO_API, [
        'headers' => ['content-type' => 'application/json'],
        'query' => [
          'url' => $highlight['vimeo_url'],
          'width' => '640',
        ],
      ]);
      $embed = json_decode($response->getBody());
    }
    catch (TransferException $e) {
      watchdog_exception('rp_homepage', $e);
    }

    if (!$embed) {
      return $renderer;
    }

    $renderer['#variables']['vimeo_oembed'] = $embed;

    return $renderer;
  }

}
