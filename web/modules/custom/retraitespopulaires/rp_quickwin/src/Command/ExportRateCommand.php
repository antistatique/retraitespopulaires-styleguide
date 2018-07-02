<?php

namespace Drupal\rp_quickwin\Command;

use Drupal\rp_mortgage\Service\Rate;
use Drupal\rp_quickwin\LogismataService;
use Drush\Commands\DrushCommands;

/**
 * Export rate command class.
 */
class ExportRateCommand extends DrushCommands {

  /**
   * To get mortgage rates.
   *
   * @var \Drupal\rp_mortgage\Service\Rate
   */
  private $rateService;

  /**
   * To communicate with Logismata.
   *
   * @var \Drupal\rp_quickwin\LogismataService
   */
  private $logismataService;

  /**
   * Class constructor.
   */
  public function __construct(Rate $rateService, LogismataService $logismataService) {
    $this->rateService = $rateService;
    $this->logismataService = $logismataService;
  }

  /**
   * Export rates to Logismata.
   *
   * @command rp:quickwin:export-rates
   * @validate-module-enabled rp_mortgage
   * @validate-module-enabled rp_quickwin
   * @aliases export-rates
   */
  public function export() {
    // Create the list of mortgage rates.
    $houseInterest = [
      'productListId' => 'houseInterestOptions',
      'default' => '',
      'products' => [],
    ];

    $houseDetailMortgages = [
      'productListId' => 'houseDetailedMortgagesOptions',
      'default' => '',
      'products' => [],
    ];

    $detMortgages1Rang = [];
    $detMortgages2Rang = [];

    $mortgagesProfiles = [
      'productListId' => 'mortgageProfiles',
      'default' => '',
      'products' => [],
    ];

    $this->output()->writeln('Get Rates Entity');

    // Get mortgage rate to show in logismata.
    $rates = $this->getCalculatorRates();

    // Add each rate to the list.
    foreach ($rates as $rate) {
      // Default option.
      $product = [
        'code' => strtolower(str_replace(' ', '', $rate->getName())),
        'descriptions' => [
          'de' => $rate->getName(),
          'fr' => $rate->getName(),
        ],
        'interest' => $rate->getFirstRate(),
        'sort' => $rate->getYear(),
      ];

      // Save for first list.
      $houseInterest['products'][] = $product;

      // Save for second list in first rang with more option.
      $detMortgages1Rang[] = [
        'code' => $product['code'] . '_detailed_first',
        'rang' => 1,
        'type' => strpos(strtolower($rate->getName()), 'fixe') !== FALSE ? 2 : 1,
        'duration' => $rate->getYear(),
        'minAmount' => NULL,
        'manualInterest' => TRUE,
        'sort' => count($detMortgages1Rang),
      ] + $product;

      // Save for second list in second rang if they are a second.
      if ($rate->getSecondRate() > 0) {
        $detMortgages2Rang[] = [
          'code' => $product['code'] . '_detailed_second',
          'rang' => 2,
          'interest' => $rate->getSecondRate(),
        ] + end($detMortgages1Rang);
      }
    }
    // Set default interest.
    $houseInterest['default'] = $houseInterest['products'][0]['code'];
    $houseDetailMortgages['default'] = $detMortgages1Rang[0]['code'];

    // Merge second list, first and second rang.
    $houseDetailMortgages['products'] = array_merge($detMortgages1Rang, $detMortgages2Rang);

    // Create a profiles of mortgages and set it to default.
    $mortgagesProfiles['products'][] = [
      'code' => 'profiles',
      'class1Products' => [
        [
          'code' => $detMortgages1Rang[1]['code'],
          'part' => 100,
        ],
      ],
      'class2Product' => [
        'code' => $detMortgages2Rang[0]['code'],
      ],
    ];
    $mortgagesProfiles['default'] = $mortgagesProfiles['products'][0]['code'];

    // Export the three list.
    $this->logismataService->exportToLogismata($houseInterest);
    $this->logismataService->exportToLogismata($houseDetailMortgages);
    $this->logismataService->exportToLogismata($mortgagesProfiles);
  }

  /**
   * Get all rates for calculator.
   */
  private function getCalculatorRates() {
    $rateType = 'Prêts hypothécaires formulaire';

    // Get all rate of desired type.
    $rates = $this->rateService->getRates($rateType);

    // Remove empty lines (= first rate not defined)
    $rates = array_filter($rates, function ($rate) {
      return ($rate->getFirstRate() && $rate->getFirstRate() != 0.0);
    });

    return array_values($rates);
  }

}
