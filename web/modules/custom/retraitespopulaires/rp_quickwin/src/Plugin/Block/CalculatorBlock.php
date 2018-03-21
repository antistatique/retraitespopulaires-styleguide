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
    // Get values in session
    $session = \Drupal::request()->getSession();
    $submited = $session->get('rp_quickwin_submited');

    // Create the link
    $variables['link'] = \Drupal::state()->get('rp_quickwin.settings.logismata_url'). $params['node']->field_url_logismata->value;

    // Get teasers
    $teasers = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree('teaser_calculator_quickwin', 0, NULL, TRUE);

    $isFirst = TRUE;
    foreach ($teasers as $teaser){
      // Verify that the teaser target calculator is the current page
      if (!empty($teaser->get('field_calculator')->target_id) && $teaser->get('field_calculator')->target_id == $params['node']->nid->value) {
        // Get field on the teaser and the logismata parameter
        $field = Term::load($teaser->get('field_field')->target_id);
        $parameter = $field->field_logismata_parameter->value;

        // Add to link if needed
        if (!empty($submited[$parameter])) {
          if ($isFirst) {
            // Start of link GET parameters
            $variables['link'] .= '?';
            $isFirst = FALSE;
          }
          else {
            $variables['link'] .= '&';
          }
          $variables['link'] .= $parameter . '=' . $submited[$parameter];
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
