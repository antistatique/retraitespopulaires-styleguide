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
    $temp_store = \Drupal::service('user.private_tempstore')->get('rp_quickwin');
    $submited = $temp_store->get('submited');

    // Create the link
    $variables['link'] = \Drupal::state()->get('rp_quickwin.settings.logismata_url'). $params['node']->field_url_logismata->value;

    $teasers = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree('teaser_calculator_quickwin');

    $isFirst = TRUE;
    foreach ($teasers as $teaser){
      $teaser = Term::load($teaser->tid);
      if (!empty($teaser->get('field_calculator')->target_id) && $teaser->get('field_calculator')->target_id == $params['node']->nid->value) {
        $field = Term::load($teaser->get('field_field')->target_id);
        $parameter = $field->field_logismata_parameter->value;
        if (!empty($submited[$parameter])) {
          if ($isFirst) {
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

    $temp_store->delete('submited');

    return [
      '#theme'     => 'rp_quickwin_calculator_block',
      '#variables' => $variables,
      '#cache' => [ 'max-age' => 0 ],
    ];
  }

}
