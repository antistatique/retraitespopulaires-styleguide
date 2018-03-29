<?php

namespace Drupal\rp_quickwin\Command;

class ExportRateCommand {
  private $rateService;

  public function __construct() {
    $this->rateService = \Drupal::service('rp_mortgage.rate');
  }

  public function export() {
    // Create the list of mortgage rates
    $logismata_product_list = [
      'productListId' => 'houseInterestOptions',
      'default' => '',
      'products' => [],
    ];

    drush_print('Get Rates Entity');

    // Get mortgage rate to show in logismata
    $rates = $this->getCalculatorRates();

    // Add each rate to the list
    foreach ($rates as $rate) {
      $logismata_product_list['products'][] = [
        'code' => strtolower(str_replace(' ', '', $rate->getName())),
        'descriptions' => [
          'de' => $rate->getName(),
          'fr' => $rate->getName(),
        ],
        'interest' => $rate->getFirstRate(),
        'sort' => $rate->getYear(),
      ];

      // Set default to first rate
      if (count($logismata_product_list['products']) == 1) {
        $logismata_product_list['default'] = $logismata_product_list['products'][0]['code'];
      }
    }

    \Drupal::service('rp_quickwin.export_logismata')->exportToLogismata($logismata_product_list);
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

