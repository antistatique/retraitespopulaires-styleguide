<?php

namespace Drupal\rp_quickwin\Command;

use Drupal\rp_mortgage\Service\Rate;
use Drupal\rp_quickwin\LogismataService;

class ExportRateCommand {

  /**
   * To get mortgage rates
   * @var Rate
   */
  private $rateService;

  /**
   * To communicate with Logismata
   * @var LogismataService
   */
  private $logismataService;


  public function __construct(Rate $rateService, LogismataService $logismataService) {
    $this->rateService = $rateService;
    $this->logismataService = $logismataService;
  }

  public function export() {
    // Create the list of mortgage rates
    $logismata_house_interest = [
      'productListId' => 'houseInterestOptions',
      'default' => '',
      'products' => [],
    ];

    $logismata_house_detailed_mortgages = [
      'productListId' => 'houseDetailedMortgagesOptions',
      'default' => '',
      'products' => [],
    ];

    $detailed_mortgages_first_rang = [];
    $detailed_mortgages_second_rang = [];

    $logismata_mortgages_profiles = [
      'productListId' => 'mortgageProfiles',
      'default' => '',
      'products' => [],
    ];

    drush_print('Get Rates Entity');

    // Get mortgage rate to show in logismata
    $rates = $this->getCalculatorRates();

    // Add each rate to the list
    foreach ($rates as $rate) {
      // Default option
      $product = [
        'code' => strtolower(str_replace(' ', '', $rate->getName())),
        'descriptions' => [
          'de' => $rate->getName(),
          'fr' => $rate->getName(),
        ],
        'interest' => $rate->getFirstRate(),
        'sort' => $rate->getYear(),
      ];

      // Save for first list
      $logismata_house_interest['products'][] = $product;

      // Save for second list in first rang with more option
      $detailed_mortgages_first_rang[] = [
        'code' => $product['code'].'_detailed_first',
        'rang' => 1,
        'type' => strpos(strtolower($rate->getName()), 'fixe') !== FALSE ? 2 : 1,
        'duration' => $rate->getYear(),
        'minAmount' => null,
        'manualInterest' => true,
        'sort' => count($detailed_mortgages_first_rang),
        ] + $product;

      // Save for second list in second rang if they are a second
      if ($rate->getSecondRate() > 0) {
        $detailed_mortgages_second_rang[] = [
            'code' => $product['code'] . '_detailed_second',
            'rang' => 2,
            'interest' => $rate->getSecondRate(),
          ] + end($detailed_mortgages_first_rang);
      }
    }
    // Set default interest
    $logismata_house_interest['default'] = $logismata_house_interest['products'][0]['code'];
    $logismata_house_detailed_mortgages['default'] = $detailed_mortgages_first_rang[0]['code'];

    // Merge second list, first and second rang
    $logismata_house_detailed_mortgages['products'] = array_merge($detailed_mortgages_first_rang, $detailed_mortgages_second_rang);

    // Create a profiles of mortgages and set it to default
    $logismata_mortgages_profiles['products'][] = [
      'code' => 'profiles',
      'class1Products' => [
        [
          'code' => $detailed_mortgages_first_rang[1]['code'],
          'part' => 100,
        ],
      ],
      'class2Product' => [
        'code' => $detailed_mortgages_second_rang[0]['code'],
      ],
    ];
    $logismata_mortgages_profiles['default'] = $logismata_mortgages_profiles['products'][0]['code'];

    // Export the three list
    $this->logismataService->exportToLogismata($logismata_house_interest);
    $this->logismataService->exportToLogismata($logismata_house_detailed_mortgages);
    $this->logismataService->exportToLogismata($logismata_mortgages_profiles);
  }

  private function getCalculatorRates() {
    $rateType = 'Prêts hypothécaires formulaire';

    // Get all rate of desired type
    $rates = $this->rateService->getRates($rateType);

    // Remove empty lines (= first rate not defined)
    $rates = array_filter($rates, function ($rate) {
      return ($rate->getFirstRate() && $rate->getFirstRate() != 0.0);
    });

    return array_values($rates);
  }
}

