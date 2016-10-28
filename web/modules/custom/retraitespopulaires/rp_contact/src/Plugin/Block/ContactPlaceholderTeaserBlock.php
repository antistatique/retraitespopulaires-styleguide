<?php
/**
* @file
* Contains \Drupal\rp_contact\Plugin\Block\ContactPlaceholderTeaserBlock.
*/

namespace Drupal\rp_contact\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\rp_site\Service\Cover;
use Drupal\Core\State\StateInterface;

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
class ContactPlaceholderTeaserBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
     * Cover Service
     * @var Cover
     */
    protected $cover;

    /**
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    protected $state;

     /**
     * Class constructor.
     */
     public function __construct(array $configuration, $plugin_id, $plugin_definition, Cover $cover, StateInterface $state) {
         parent::__construct($configuration, $plugin_id, $plugin_definition);
         $this->cover = $cover;
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
             $container->get('rp_site.cover'),
             $container->get('state')
         );
     }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();
        $variables = $params;

        if ($placeholder = $this->state->get('rp_contact.settings.placeholder')) {
            $variables['cover'] = $this->cover->fromFile($placeholder, array('xl' => 'rp_teaser_contact_xl'));
        } else {
            $variables['cover'] = NULL;
        }

        return [
            '#theme'     => 'rp_contact_contact_placeholder_teaser_block',
            '#variables' => $variables,
        ];
    }
}
