<?php

namespace Drupal\rp_quickwin;

/**
 * Class ExportLogismataService.
 */
class ExportLogismataService {

  /**
   * Constructs a new ExportLogismataService object.
   */
  public function __construct() {

  }

  public function exportToLogismata($productsList) {
    // Get Http Client
    $httpClient = \Drupal::httpClient();
    try {
      // Get Auth Token for update
      $response = $httpClient->get(\Drupal::state()->get('rp_quickwin.settings.logismata_url_auth'));
      $data = json_decode($response->getBody());
      if (!empty($data->authToken)) {
        $token = $data->authToken;
        drupal_set_message('Token is provided');
      }
      else {
        drupal_set_message('Token is not provided');
      }
    } catch (\Exception $e) {
      watchdog_exception('rp_quickwin', $e);
    }

    if (isset($token)) {
      $logismata_array = [
        'authToken' => $token,
        'productList' => $productsList,
      ];

      try {
        // Send data to logismata
        $response = $httpClient->put(\Drupal::state()->get('rp_quickwin.settings.logismata_url_set_list'), ['json' => $logismata_array]);
        $data = json_decode($response->getBody());
        if ($data->errorCode == 0) {
          drupal_set_message('Export Logismata successful');
        }
        else {
          drupal_set_message('Export Logismata error code: ' . $data->errorCode);
        }
      } catch (\Exception $e) {
        watchdog_exception('rp_quickwin', $e);
      }
    }
  }
}
