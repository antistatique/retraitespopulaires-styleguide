<?php
/**
* @file
* Contains \Drupal\rp_layout\Plugin\Block\HeaderBlock.
*/

namespace Drupal\rp_layout\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
* Provides a 'Layout' Header Block
*
* @Block(
*   id = "rp_layout_header_block",
*   admin_label = @Translation("Layout Header block"),
* )
*/
class HeaderBlock extends BlockBase {

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();

        return [
            '#theme'     => 'rp_layout_header_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }

}
