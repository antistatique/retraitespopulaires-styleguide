<?php
/**
* @file
* Contains \Drupal\rp_offers\Plugin\Block\OfferTeaserBlock.
*/

namespace Drupal\rp_offers\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\rp_site\Service\Cover;

/**
* Provides a 'Offer Teaser' Block
*
* @Block(
*   id = "rp_offers_offer_teaser_block",
*   admin_label = @Translation("Offer Teaser block"),
* )
*
* Inline example:
* <code>
* load_block('rp_offers_offer_teaser_block')
* </code>
*/
class OfferTeaserBlock extends BlockBase implements ContainerFactoryPluginInterface {
    /**
     * Cover Service
     * @var Cover
     */
    private $cover;

     /**
     * Class constructor.
     */
     public function __construct(array $configuration, $plugin_id, $plugin_definition, Cover $cover) {
         parent::__construct($configuration, $plugin_id, $plugin_definition);
         $this->cover  = $cover;
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
             $container->get('rp_site.cover')
         );
     }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();
        $variables = $params;
        $variables['cover'] = $this->cover->generate($params['offer'], array('xl' => 'rp_teaser_xl'));
        return [
            '#theme'     => 'rp_offers_offer_teaser_block',
            '#variables' => $variables,
        ];
    }
}
