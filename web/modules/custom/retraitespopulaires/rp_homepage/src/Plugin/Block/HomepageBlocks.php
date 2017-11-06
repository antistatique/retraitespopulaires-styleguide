<?php

/**
* @file
* Contains \Drupal\rp_homepage\Plugin\Block\ProfilsCollectionBlock.
*/

namespace Drupal\rp_homepage\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\State\StateInterface;

/**
* Provides a Block to display the six blocks on the homepage
*
* @Block(
*   id = "rp_homepage_blocks",
*   admin_label = @Translation("Block that display the 6 blocks for the home."),
* )
*
* Inline example:
* <code>
* load_block('rp_homepage_blocks')
* </code>
*/
class HomepageBlocks extends BlockBase implements ContainerFactoryPluginInterface {

    /**
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    private $state;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, StateInterface $state) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->state = $state;
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
            $container->get('state')
        );
    }

    /**
     * {@inheritdoc}
     */
    public function build($params = array()) {
        $variables = [
          'blocks' => $this->state->get('rp_homepage.blocks', []),
        ];

        return [
            '#theme'     => 'rp_homepage_blocks',
            '#variables' => $variables,
        ];

    }

}
