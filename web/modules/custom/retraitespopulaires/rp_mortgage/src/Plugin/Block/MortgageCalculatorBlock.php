<?php

namespace Drupal\rp_mortgage\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\rp_mortgage\Service\Rate;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides the 'Mortgage Calculator' Block.
 *
 * @Block(
 *   id = "rp_mortgage_calculator_block",
 *   admin_label = @Translation("Mortgage Calculator block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_mortgage_calculator_block')
 * </code>
 */
class MortgageCalculatorBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * Rate service.
   *
   * @var \Drupal\rp_mortgage\Service\Rate
   */
  private $rateService;

  /**
   * Mortgage Calculator constructor.
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
    $variables = [];

    $variables['rates'] = $this->getCalculatorRates();
    $variables['rate_date'] = $this->getDateBasedOnRate($variables['rates']);

    // @TODO: Move this into a Drupal Admin settings
    /*
     * @param float $notaryRateFee
     *   Droit de mutation et frais de notaire (en %)
     * @param float $firstRateMax
     *   Prêt max. en 1er rang par rapport au prix d'achat (en %)
     * @param float $theoricalCostFirstRate
     *   Charges théoriques du prêt en 1er rang (en %)
     * @param float $secondRateMax
     *   Prêt max. en 2ème rang par rapport au prix d'achat (en %)
     * @param float $theoricalCostSecondRate
     *   Charges théoriques du prêt en 2ème rang (en %)
     * @param float $ratioCostIncomeMax
     *   Rapport charges-revenus max. (en %)
     * @param int   $maintenanceFees
     *   Frais d'entretien
     * @param float $equityCapitalMinRate
     *   Pourcentage min. des fonds propres
     * @param float $avgRate
     *   Taux moyen (1er + 2ème rang) de charges du prêt total (en %)
     * @param float $advanceRateMax
     *   Taux d'avance max. (en %)
     * @param float $amortisationFirstRate
     *   Amortissement du prêt en 1er rang (en %)
     * @param float $amortistationSecondRate
     *   Amortissement du prêt en 2ème rang (en %)
     * @param float $maxCost
     */
    $variables['settings'] = [
      'notaryRateFee' => 0.05,
      'firstRateMax' => 0.70,
      'theoricalCostFirstRate' => 0.05,
      'secondRateMax' => 0.10,
      'theoricalCostSecondRate' => 0.07,
    // 0.33,.
      'ratioCostIncomeMax' => 0.30,
    // 6000,.
      'maintenanceFees' => 4800.0,
      'equityCapitalMinRate' => 0.25,
      'avgRate' => 0.0525,
      'advanceRateMax' => 0.80,
      'amortisationFirstRate' => 0.01,
      'amortistationSecondRate' => 0.02,
      'maxCost' => 0.33,
    ];

    return [
      '#theme'     => 'rp_mortgage_calculator_block',
      '#variables' => $variables,
      '#attached' => [
        'library' => ['rp_mortgage/calculator'],
      ],
      '#cache' => [
      // Invalidate cache when importing new data.
        'tags' => ['rp_mortage_rates'],
      ],
    ];
  }

  /**
   * Get date of rate.
   */
  public function getDateBasedOnRate(array $rates) {
    $firstRate = current($rates);

    return $firstRate ? $firstRate->getDate() : NULL;
  }

  /**
   * Get all rate for the calculators.
   */
  private function getCalculatorRates() {
    // 'Prêts hypothécaires standard' ?
    $rateType = 'Prêts hypothécaires formulaire';

    /** @var \Drupal\rp_mortgage\Entity\Rate[] $rates */
    $rates = $this->rateService->getRates($rateType);

    // Remove empty lines (= first rate not defined)
    $rates = array_filter($rates, function ($rate) {
      return ($rate->getFirstRate() && $rate->getFirstRate() != 0.0);
    });

    // Get default the variable rate.
    $defaultSecondRate = NULL;
    foreach ($rates as $rate) {
      if ($rate->getYear() == 0 && $rate->getSecondRate() && $rate->getSecondRate() != 0.0) {
        $defaultSecondRate = $rate->getSecondRate();
        break;
      }
    }

    // Fill empty second rate by the default values.
    $rates = array_map(function ($rate) use ($defaultSecondRate) {
      if (!$rate->getSecondRate()) {
        $rate->setSecondRate($defaultSecondRate);
      }

      return $rate;
    }, $rates);

    return array_values($rates);
  }

}
