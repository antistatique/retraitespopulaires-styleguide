<?php
/**
* @file
* Contains \Drupal\rp_product\Plugin\Block\ProductTeaserBlock.
*/

namespace Drupal\rp_product\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
* Provides a 'Product Teaser' Block
*
* @Block(
*   id = "rp_site_product_teaser_block",
*   admin_label = @Translation("Product Teaser block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_product_teaser_block')
* </code>
*/
class ProductTeaserBlock extends BlockBase {
    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = $params;
        return [
            '#theme'     => 'rp_site_product_teaser_block',
            '#variables' => $variables,
        ];
    }
}
