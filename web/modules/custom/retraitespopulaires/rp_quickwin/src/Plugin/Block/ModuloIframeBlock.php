<?php
namespace Drupal\rp_quickwin\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use GuzzleHttp\ClientInterface;

/**
 * Provides the 'Modulo Iframe' Block
 *
 * @Block(
 *   id = "rp_quickwin_modulo_iframe_block",
 *   admin_label = @Translation("Modulo Iframe Block"),
 * )
 */
class ModuloIframeBlock extends BlockBase implements ContainerFactoryPluginInterface {
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
    $variables['link'] = '/rpopulaires/app/index.html';

    // Retrieive Token from Logistama.
    try {
      $response = $this->httpClient->get(\Drupal::state()->get('rp_quickwin.settings.logismata_url_auth'));
      $data = json_decode($response->getBody());
      if (!empty($data->authToken)) {
        $variables['link'] .= '?calculatorservicetoken='.$data->authToken;
      }
    }
    catch (\Exception $e) {
      watchdog_exception('rp_quickwin', $e);
    }

    return [
      '#theme'     => 'rp_quickwin_calculator_block',
      '#variables' => $variables,
      '#cache'     => [ 'max-age' => 0 ],
      '#attached'  => [ 'library' =>  [ 'rp_quickwin/iframe' ], ],
    ];
  }
}
