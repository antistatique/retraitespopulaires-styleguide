<?php
/**
* @file
* Contains \Drupal\rp_homepage\Plugin\Block\ProfilTeaserBlock.
*/

namespace Drupal\rp_homepage\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\State\StateInterface;

/**
* Provides a 'Profil Teaser' Block
*
* @Block(
*   id = "rp_homepage_profil_teaser_block",
*   admin_label = @Translation("Profil Teaser block"),
* )
*
* Inline example:
* <code>
* load_block('rp_homepage_profil_teaser_block')
* </code>
*/
class ProfilTeaserBlock extends BlockBase implements ContainerFactoryPluginInterface {

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
        $variables = array();
        $variables = $params;

        switch ($params['profil']->nid->value) {
            case $this->state->get('rp_site.settings.collection.profil_individual')['nid']:
                $variables['icon'] = 'particuliers';
                break;
            case $this->state->get('rp_site.settings.collection.profil_company')['nid']:
                $variables['icon'] = 'entreprises';
                break;
            case $this->state->get('rp_site.settings.collection.profil_public')['nid']:
                $variables['icon'] = 'collectivites';
                break;
            default:
                $variables['icon'] = 'placeholder';
                break;
        }

        return [
            '#theme'     => 'rp_homepage_profil_teaser_block',
            '#variables' => $variables,
        ];
    }
}
