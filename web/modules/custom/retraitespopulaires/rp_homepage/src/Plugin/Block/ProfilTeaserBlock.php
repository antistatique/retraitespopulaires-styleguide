<?php
/**
* @file
* Contains \Drupal\rp_homepage\Plugin\Block\ProfilTeaserBlock.
*/

namespace Drupal\rp_homepage\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
* Provides a 'Profil Teaser' Block
*
* @Block(
*   id = "rp_homepage_profil_teaser_block",
*   admin_label = @Translation("Profil Teaser block"),
* )
*
* Inline example:
* <code>
* load_block('rp_homepage_profil_teaser_block')
* </code>
*/
class ProfilTeaserBlock extends BlockBase {
    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();
        $variables = $params;

        return [
            '#theme'     => 'rp_homepage_profil_teaser_block',
            '#variables' => $variables,
        ];
    }
}
