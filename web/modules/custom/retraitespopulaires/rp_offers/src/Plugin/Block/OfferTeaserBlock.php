<?php
/**
* @file
* Contains \Drupal\rp_offers\Plugin\Block\OfferTeaserBlock.
*/

namespace Drupal\rp_offers\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
* Provides a 'Offer Teaser' Block
*
* @Block(
*   id = "rp_offers_offer_teaser_block",
*   admin_label = @Translation("Offer Teaser block"),
* )
*
* Inline example:
* <code>
* load_block('rp_offers_offer_teaser_block')
* </code>
*/
class OfferTeaserBlock extends BlockBase {
    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();
        $variables = $params;

        return [
            '#theme'     => 'rp_offers_offer_teaser_block',
            '#variables' => $variables,
        ];
    }
}
