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
        $variables['menu_as_page'] = isset($params['menu-as-page']) ? $params['menu-as-page'] : false;

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
