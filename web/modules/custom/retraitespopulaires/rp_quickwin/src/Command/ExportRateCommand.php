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

    // Send to Logismata
    $this->exportToLogismata($logismata_product_list);
  }

  private function exportToLogismata($productsList) {
    drush_print('Get Token for Logismata');

    // Get Http Client
    $httpClient = \Drupal::httpClient();
    try {
      // Get Auth Token for update
      $response = $httpClient->get(\Drupal::state()->get('rp_quickwin.settings.logismata_url_auth'));
      $data = json_decode($response->getBody());
      if (!empty($data->authToken)) {
        $token = $data->authToken;
        drush_print('Token is provided');
      }
      else {
        drush_print('Token is not provided');
      }
    } catch (\Exception $e) {
      watchdog_exception('rp_quickwin', $e);
    }

    if (isset($token)) {
      drush_print('Send Rates to Logismata');
      $logismata_array = [
        'authToken' => $token,
        'productList' => $productsList,
      ];

      try {
        // Send data to logismata
        $response = $httpClient->put(\Drupal::state()->get('rp_quickwin.settings.logismata_url_set_list'), ['json' => $logismata_array]);
        $data = json_decode($response->getBody());
        if ($data->errorCode == 0) {
          drush_print('Export Logismata successful');
        }
        else {
          drush_print('Export Logismata error code: ' . $data->errorCode);
        }
      } catch (\Exception $e) {
        watchdog_exception('rp_quickwin', $e);
      }
    }
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

