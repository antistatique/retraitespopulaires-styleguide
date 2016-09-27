<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\AttachmentBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
* Provides a 'Attachment' Block
*
* @Block(
*   id = "rp_site_attachment_block",
*   admin_label = @Translation("Attachment block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_attachment_block')
* </code>
*/
class AttachmentBlock extends BlockBase {
    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();
        $variables = $params;

        return [
            '#theme'     => 'rp_site_attachment-'.$params['type'].'_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }
}
