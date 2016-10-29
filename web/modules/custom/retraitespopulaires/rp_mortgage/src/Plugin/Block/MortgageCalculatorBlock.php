<?php
namespace Drupal\rp_mortgage\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\rp_mortgage\Service\Rate;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides the 'Mortgage Calculator' Block
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
     * @var Rate
     */
    private $rateService;

    /**
     * Mortgage Calculator constructor.
     *
     * @param array                            $configuration
     * @param string                           $plugin_id
     * @param mixed                            $plugin_definition
     * @param \Drupal\rp_mortgage\Service\Rate $rateService
     */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, Rate $rateService) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->rateService = $rateService;
    }

    /**
     * @param \Symfony\Component\DependencyInjection\ContainerInterface $container
     * @param array                                                     $configuration
     * @param string                                                    $plugin_id
     * @param mixed                                                     $plugin_definition
     *
     * @return \Drupal\rp_mortgage\Plugin\Block\TableRateBlock
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
    public function build($params = array()) {
        $variables = [];

        $variables['rates'] = $this->getCalculatorRates();
        $variables['rate_date'] = $this->getDateBasedOnRate($variables['rates']);

        // @TODO: Move this into a Drupal Admin settings
        $variables['settings'] = [
            'notaryRateFee' => 0.05,
            'firstRateMax' => 0.70,
            'theoricalCostFirstRate' => 0.05,
            'secondRateMax' => 0.10,
            'theoricalCostSecondRate' => 0.07,
            'ratioCostIncomeMax' => 0.30, //0.33,
            'maintenanceFees' => 4800.0, //6000,
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
        ];
    }

    /**
     * @param array $rates
     *
     * @return \DateTime|null
     */
    public function getDateBasedOnRate(array $rates) {
        $firstRate = current($rates);

        return $firstRate ? $firstRate->getDate() : null;
    }

    private function getCalculatorRates()
    {
        $rateType = 'Prêts hypothécaires formulaire'; // 'Prêts hypothécaires standard' ?

        /** @var \Drupal\rp_mortgage\Entity\Rate[] $rates */
        $rates = $this->rateService->getRates($rateType);

        // remove empty lines (= first rate not defined)
        $rates = array_filter($rates, function ($rate) {
            return ($rate->getFirstRate() && $rate->getFirstRate() != 0.0);
        });

        // get default the variable rate
        $defaultSecondRate = null;
        foreach ($rates as $rate) {
            if ($rate->getYear() == 0 && $rate->getSecondRate() && $rate->getSecondRate() != 0.0) {
                $defaultSecondRate = $rate->getSecondRate();
                break;
            }
        }

        // fill empty second rate by the default values
        $rates = array_map(function ($rate) use ($defaultSecondRate) {
            if (!$rate->getSecondRate()) {
                $rate->setSecondRate($defaultSecondRate);
            }

            return $rate;
        }, $rates);

        return array_values($rates);
    }
}
