<?php

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'FAQ Teaser' Block.
 *
 * @Block(
 *   id = "rp_site_faq_teaser_block",
 *   admin_label = @Translation("FAQ Teaser block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_site_faq_teaser_block')
 * </code>
 */
class FAQTeaserBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = $params;

    return [
      '#theme'     => 'rp_site_faq_teaser_block',
      '#variables' => $variables,
    ];
  }

}
