<?php
/**
* @file
* Contains \Drupal\rp_layout\Plugin\Block\CoverBlock.
*/

namespace Drupal\rp_layout\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
* Provides a 'Layout' Cover Block
*
* @Block(
*   id = "rp_layout_cover_block",
*   admin_label = @Translation("Layout Cover block"),
* )
*/
class CoverBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
     * Class constructor.
     */
     public function __construct(array $configuration, $plugin_id, $plugin_definition) {
         parent::__construct($configuration, $plugin_id, $plugin_definition);
     }

    /**
    * {@inheritdoc}
    */
    public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
         // Instantiates this form class.
         return new static(
             // Load the service required to construct this class.
             $configuration,
             $plugin_id,
             $plugin_definition,
             // Load customs services used in this class.
         );
     }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();

        return [
            '#theme'     => 'rp_layout_cover_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }

}
