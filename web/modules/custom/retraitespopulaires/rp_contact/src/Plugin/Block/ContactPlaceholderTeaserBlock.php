<?php
/**
* @file
* Contains \Drupal\rp_contact\Plugin\Block\ContactPlaceholderTeaserBlock.
*/

namespace Drupal\rp_contact\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
* Provides a 'Contact Placeholder Teaser' Block
*
* @Block(
*   id = "rp_contact_contact_placeholder_teaser_block",
*   admin_label = @Translation("Contact Placeholder Teaser block"),
* )
*
* Inline example:
* <code>
* load_block('rp_contact_contact_placeholder_teaser_block')
* </code>
*/
class ContactPlaceholderTeaserBlock extends BlockBase {
    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();
        $variables = $params;

        return [
            '#theme'     => 'rp_contact_contact_placeholder_teaser_block',
            '#variables' => $variables,
        ];
    }
}
