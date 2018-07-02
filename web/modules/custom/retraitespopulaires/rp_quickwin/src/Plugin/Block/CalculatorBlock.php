<?php

namespace Drupal\rp_quickwin\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\State\StateInterface;
use Drupal\rp_quickwin\LogismataService;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Provides a 'CalculatorBlock' block.
 *
 * @Block(
 *  id = "rp_quickwin_calculator_block",
 *  admin_label = @Translation("Calculator block"),
 * )
 */
class CalculatorBlock extends BlockBase implements ContainerFactoryPluginInterface {

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
   * To get GET parameters.
   *
   * @var \Symfony\Component\HttpFoundation\Request
   */
  private $request;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, LogismataService $logismataService, StateInterface $state, Request $request) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->logismataService = $logismataService;
    $this->state = $state;
    $this->request = $request;
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
      $container->get('state'),
      $container->get('request_stack')->getCurrentRequest()
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    // Get parameters.
    $parameters = $this->request->query->all();

    // Add default parameter.
    $parameters += [
      'language' => $this->t('fr'),

      // TODO: Add this with a better way.
      'zipAndLocation' => 'lausanne',
    ];

    // Get the token.
    try {
      $parameters['calculatorservicetoken'] = $this->logismataService->getToken();
    }
    catch (\Exception $e) {
    }

    // Create the link.
    $variables['link'] = $this->state->get('rp_quickwin.settings.logismata_url') . $params['node']->field_url_logismata->value;

    if (!empty($parameters)) {
      $variables['link'] .= '?' . http_build_query($parameters);
    }

    // Call block for calculator.
    return [
      '#theme'     => 'rp_quickwin_calculator_block',
      '#variables' => $variables,
      // 12 hours of cache.
      '#cache'     => ['max-age' => 43200],
      '#attached'  => ['library' => ['rp_quickwin/iframe']],
    ];
  }

}
