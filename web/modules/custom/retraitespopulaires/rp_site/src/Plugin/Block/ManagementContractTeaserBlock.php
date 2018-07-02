<?php

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Management Contract Teaser' Block.
 *
 * @Block(
 *   id = "rp_site_management_contract_teaser_block",
 *   admin_label = @Translation("Management Contract Teaser block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_site_management_contract_teaser_block')
 * </code>
 */
class ManagementContractTeaserBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = $params;

    return [
      '#theme'     => 'rp_site_management_contract_teaser_block',
      '#variables' => $variables,
    ];
  }

}
