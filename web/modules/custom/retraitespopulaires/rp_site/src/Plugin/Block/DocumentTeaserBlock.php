<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\DocumentTeaserBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
* Provides a 'Document Teaser' Block
*
* @Block(
*   id = "rp_site_document_teaser_block",
*   admin_label = @Translation("Document Teaser block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_document_teaser_block')
* </code>
*/
class DocumentTeaserBlock extends BlockBase {
    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();
        $variables = $params;

        return [
            '#theme'     => 'rp_site_document_teaser_block',
            '#variables' => $variables,
        ];
    }
}
