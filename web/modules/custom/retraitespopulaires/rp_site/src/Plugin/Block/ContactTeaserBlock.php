<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\ContactTeaserBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
* Provides a 'Contact Teaser' Block
*
* @Block(
*   id = "rp_site_contact_teaser_block",
*   admin_label = @Translation("Contact Teaser block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_contact_teaser_block')
* </code>
*/
class ContactTeaserBlock extends BlockBase {
    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();
        $variables = $params;

        return [
            '#theme'     => 'rp_site_contact_teaser_block',
            '#variables' => $variables,
        ];
    }
}
