<?php

namespace Drupal\rp_quickwin\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\State\StateInterface;
use Drupal\rp_quickwin\LogismataService;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides the 'Modulo Iframe' Block.
 *
 * @Block(
 *   id = "rp_quickwin_modulo_iframe_block",
 *   admin_label = @Translation("Modulo Iframe Block"),
 * )
 */
class ModuloIframeBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * To communicate with Logismata.
   *
   * @var \Drupal\rp_quickwin\LogismataService
   */
  private $logismataService;

  /**
   * The state key value store.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  private $state;

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, LogismataService $logismataService, StateInterface $state) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->logismataService = $logismataService;
    $this->state = $state;
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
      $container->get('rp_quickwin.logismata'),
      $container->get('state')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables['link'] = '/rpopulaires/app/';

    // Retrieive Token from Logistama.
    try {
      $variables['link'] .= '?calculatorservicetoken=' . $this->logismataService->getToken();
    }
    catch (\Exception $e) {
    }

    return [
      '#theme'     => 'rp_quickwin_calculator_block',
      '#variables' => $variables,
      // 12 hours of cache.
      '#cache'     => ['max-age' => 43200],
      '#attached'  => ['library' => ['rp_quickwin/iframe']],
    ];
  }

}
