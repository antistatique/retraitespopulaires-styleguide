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
* Provides a 'Profils Collection' Block
*
* @Block(
*   id = "rp_homepage_profils_collection_block",
*   admin_label = @Translation("Profils Collection block"),
* )
*
* Inline example:
* <code>
* load_block('rp_homepage_profils_collection_block')
* </code>
*/
class ProfilsCollectionBlock extends BlockBase implements ContainerFactoryPluginInterface {
    /**
    * EntityTypeManagerInterface to load Request Offer
    * @var EntityTypeManagerInterface
    */
    private $entity_offer;

    /**
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    private $state;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, StateInterface $state) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_node  = $entity->getStorage('node');
        $this->state        = $state;
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
            $container->get('entity_type.manager'),
            $container->get('state')
        );
    }

    /**
     * {@inheritdoc}
     */
    public function build($params = array()) {
        $variables = array('profils' => [
            'individual' => $this->entity_node->load($this->state->get('rp_site.settings.collection.profil_individual')['nid']),
            'company'    => $this->entity_node->load($this->state->get('rp_site.settings.collection.profil_company')['nid']),
            'public'     => $this->entity_node->load($this->state->get('rp_site.settings.collection.profil_public')['nid']),
        ]);

        return [
            '#theme'     => 'rp_homepage_profils_collection_block',
            '#variables' => $variables,
        ];

    }

}
