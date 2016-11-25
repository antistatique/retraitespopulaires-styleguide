<?php
/**
* @file
* Contains \Drupal\rp_contact\Plugin\Block\ContactTeaserDetailBlock.
*/

namespace Drupal\rp_contact\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\rp_site\Service\Cover;

/**
* Provides a 'Contact Teaser Detail' Block
*
* @Block(
*   id = "rp_contact_contact_teaser_detail_block",
*   admin_label = @Translation("Contact Teaser Detail block"),
* )
*
* Inline example:
* <code>
* load_block('rp_contact_contact_teaser_detail_block')
* </code>
*/
class ContactTeaserDetailBlock extends BlockBase implements ContainerFactoryPluginInterface {

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

        if (isset($params['theme'])) {
            $variables['theme'] = $params['theme'];
        }

        $variables['cover'] = $this->cover->fromNode($params['contact'], array('xl' => 'rp_teaser_contact_xl'));

        return [
            '#theme'     => 'rp_contact_contact_teaser_detail_block',
            '#variables' => $variables,
        ];
    }
}