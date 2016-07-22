<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\DocumentsBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
* Provides a 'Useful Documents' Block
*
* @Block(
*   id = "rp_site_documentsk",
*   admin_label = @Translation("Useful Documents block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_documents_block')
* </code>
*/
class DocumentsBlock extends BlockBase {

    /**
    * {@inheritdoc}
    */
    public function build() {
        $variables = array('documents' => array());

        return [
            '#theme'     => 'rp_site_documents_block',
            '#variables' => $variables,
        ];
    }

}
