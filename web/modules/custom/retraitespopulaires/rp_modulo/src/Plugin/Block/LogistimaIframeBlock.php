<?php
namespace Drupal\rp_modulo\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use GuzzleHttp\ClientInterface;

/**
 * Provides the 'Modulo Logistima Iframe' Block
 *
 * @Block(
 *   id = "rp_modulo_logistima_iframe_block",
 *   admin_label = @Translation("Modulo Logistima Iframe"),
 * )
 */
class LogistimaIframeBlock extends BlockBase implements ContainerFactoryPluginInterface {
  /**
   * The HTTP client to fetch the feed data with.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $httpClient;

  /**
  * {@inheritdoc}
  */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, ClientInterface $http_client) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
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
      $container->get('http_client')
    );
  }

  /**
  * {@inheritdoc}
  */
  public function build($params = array()) {
    $variables['calculatorservicetoken'] = NULL;

    // Retrieive oembed from Vimeo API.
    $embed = NULL;
    try {
      $response = $this->httpClient->get('https://services.logismata.ch/puma/authentication/rpopulaires/createToken');
      $data = json_decode($response->getBody());
      if (!empty($data->authToken)) {
        $variables['calculatorservicetoken'] = $data->authToken;
      }
    }
    catch (\Exception $e) {
      watchdog_exception('rp_modulo', $e);
    }

    return [
      '#theme'     => 'rp_modulo_logistima_iframe_block',
      '#variables' => $variables,
      # 12 hours of cache.
      '#cache' => ['max-age' => 43200]
    ];
  }
}
