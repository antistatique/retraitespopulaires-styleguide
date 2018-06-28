<?php

namespace Drupal\rp_quickwin;

use Drupal\Core\State\StateInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use GuzzleHttp\ClientInterface;

/**
 * Class LogismataService.
 */
class LogismataService {
  Use StringTranslationTrait;

  /**
   * ClientInterface to send http request.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected  $httpClient;

  /**
   * The state key value store.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * Constructs a new LogismataService object.
   */
  public function __construct(ClientInterface $httpClient, StateInterface $state) {
    $this->httpClient = $httpClient;
    $this->state = $state;
  }

  /**
   * Export a product list to logismata.
   *
   * The product list is explain in logismata api documentation.
   *
   * @param array $productsList
   *   Products list to export.
   */
  public function exportToLogismata(array $productsList) {
    try {
      $token = $this->getToken();
    }
    catch (\Exception $e) {
      return;
    }

    $logismata_array = [
      'authToken' => $token,
      'productList' => $productsList,
    ];

    try {
      // Send data to logismata.
      $response = $this->httpClient->put($this->state->get('rp_quickwin.settings.logismata_url_set_list'), ['json' => $logismata_array]);
      $data = json_decode($response->getBody());
      if ($data->errorCode == 0) {
        drupal_set_message($this->t('Export Logismata successful'));
      }
      else {
        drupal_set_message($this->t('Export Logismata successful') . $data->errorCode);
      }
    }
    catch (\Exception $e) {
      watchdog_exception('rp_quickwin', $e);
    }
  }

  /**
   * Get the token for Logismata authentication.
   */
  public function getToken() {
    try {
      // Get Auth Token for update.
      $response = $this->httpClient->get($this->state->get('rp_quickwin.settings.logismata_url_auth'));
      $data = json_decode($response->getBody());
      if (!empty($data->authToken)) {
        $token = $data->authToken;
      }
      else {
        throw new \RuntimeException('Token is not provided');
      }
    }
    catch (\Exception $e) {
      drupal_set_message($e);
      watchdog_exception('rp_quickwin', $e);
      throw $e;
    }

    return $token;
  }

}
