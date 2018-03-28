<?php

namespace Drupal\rp_quickwin\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\taxonomy\Entity\Term;
use Drupal\Core\State\StateInterface;

/**
 * Provides a 'CalculatorBlock' block.
 *
 * @Block(
 *  id = "rp_quickwin_calculator_block",
 *  admin_label = @Translation("Calculator block"),
 * )
 */
class CalculatorBlock extends BlockBase {
  public function build($params = array()) {
    // Get Http Client
    $httpClient = \Drupal::httpClient();

    // Get values in session
    $session = \Drupal::request()->getSession();
    $submited = $session->get('rp_quickwin_submited');

    // Get the token
    try {
      $response = $httpClient->get(\Drupal::state()->get('rp_quickwin.settings.logismata_url_auth'));
      $data = json_decode($response->getBody());
      if (!empty($data->authToken)) {
        $token = $data->authToken;
      }
    }
    catch (\Exception $e) {
      watchdog_exception('rp_quickwin', $e);
    }

    // Create the link
    // TODO: change zipAndLocation for better way
    $variables['link'] = \Drupal::state()->get('rp_quickwin.settings.logismata_url'). $params['node']->field_url_logismata->value . '?zipAndLocation=lausanne&language=' . t('fr');

    // Get teasers
    $teasers = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree('teaser_calculator_quickwin', 0, NULL, TRUE);

    if (!empty($token)) {
      $variables['link'] .= '&calculatorservicetoken=' .$token;
    }

    foreach ($teasers as $teaser){
      // Verify that the teaser target calculator is the current page
      if (!empty($teaser->get('field_calculator')->target_id) && $teaser->get('field_calculator')->target_id == $params['node']->nid->value) {
        // Get field on the teaser and the logismata parameter
        $field = Term::load($teaser->get('field_field')->target_id);
        $parameter = $field->field_logismata_parameter->value;

        $parameters[$parameter] = $submited[$parameter];

        // Add to link if needed
        if (!empty($submited[$parameter])) {
          $variables['link'] .= '&'. $parameter . '=' . $submited[$parameter];
        }
      }
    }

    // Delete session values
    $session->remove('rp_quickwin_submited');

    // Call block for calculator
    return [
      '#theme'     => 'rp_quickwin_calculator_block',
      '#variables' => $variables,
      '#cache'     => [ 'max-age' => 0 ],
    ];
  }

}
