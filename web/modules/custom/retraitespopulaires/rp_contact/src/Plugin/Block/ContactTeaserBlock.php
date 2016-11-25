<?php
/**
* @file
* Contains \Drupal\rp_contact\Plugin\Block\ContactTeaserBlock.
*/

namespace Drupal\rp_contact\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\rp_site\Service\Cover;

/**
* Provides a 'Contact Teaser' Block
*
* @Block(
*   id = "rp_contact_contact_teaser_block",
*   admin_label = @Translation("Contact Teaser block"),
* )
*
* Inline example:
* <code>
* load_block('rp_contact_contact_teaser_block')
* </code>
*/
class ContactTeaserBlock extends BlockBase implements ContainerFactoryPluginInterface {

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

        $variables['btn'] = true;
        if (isset($params['btn'])) {
            $variables['btn'] = $params['btn'];
        }

        $variables['search_npa'] = true;
        if (isset($params['search_npa'])) {
            $variables['search_npa'] = $params['search_npa'];
        }

        $variables['cover'] = $this->cover->fromNode($params['contact'], array('xl' => 'rp_teaser_contact_xl'));

        return [
            '#theme'     => 'rp_contact_contact_teaser_block',
            '#variables' => $variables,
            '#attached' => array(
               'library' =>  array('rp_contact/search_zip'),
            )
        ];
    }
}