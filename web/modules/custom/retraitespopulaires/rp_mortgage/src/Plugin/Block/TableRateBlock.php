<?php

namespace Drupal\rp_mortgage\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\rp_mortgage\Service\Rate;

use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a 'Table Rate' Block.
 *
 * @Block(
 *   id = "rp_mortgage_table_rate_block",
 *   admin_label = @Translation("Table Rate block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_mortgage_table_rate_block', {
 *    "type": "Prêts hypothécaires standard"
 * })
 * </code>
 */
class TableRateBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * Rate service.
   *
   * @var \Drupal\rp_mortgage\Service\Rate
   */
  private $rateService;

  /**
   * TableRateBlock constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, Rate $rateService) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->rateService = $rateService;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container,
        array $configuration,
        $plugin_id,
        $plugin_definition
    ) {
    return new self($configuration, $plugin_id, $plugin_definition, $container->get('rp_mortgage.rate'));
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = $params;
    $theme = 'rp_mortgage_table_rate_block';

    if ($params['type']) {
      $rates = $this->rateService->getRates($params['type']);

      // Extract date.
      $firstRate = current($rates);
      $variables['date'] = $firstRate ? $firstRate->getDate() : NULL;

      switch ($params['type']) {
        case 'Prêts hypothécaires standard':
          $theme = 'rp_mortgage_table_hypothec_rate_block';
          break;

        case 'Taux credit de construction':
          $theme = 'rp_mortgage_table_building_rate_block';
          break;

        case 'Prêts corporations':
          $theme = 'rp_mortgage_table_company_rate_block';
          break;
      }

      $variables['rates'] = $rates;
    }

    return [
      '#theme'     => $theme,
      '#variables' => $variables,
      '#cache' => [
    // Invalidate cache when importing new data.
        'tags' => ['rp_mortage_rates'],
      ],
    ];
  }

}
