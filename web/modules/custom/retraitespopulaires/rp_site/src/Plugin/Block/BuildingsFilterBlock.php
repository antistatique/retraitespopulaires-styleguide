<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\BuildingsFilterBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\EntityFieldManagerInterface;
use Drupal\Core\State\StateInterface;

/**
* Provides a 'Buildings Filter' Block
*
* @Block(
*   id = "rp_site_buildings_filter_block",
*   admin_label = @Translation("Buildings Filter block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_buildings_filter_block')
* </code>
*/
class BuildingsFilterBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
    * This includes field definitions, base field definitions, and field storage definitions.
    * @var EntityFieldManagerInterface
    */
    private $entity_field;

    /**
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    private $state;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityFieldManagerInterface $entity_field, StateInterface $state) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_field = $entity_field;
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
            $container->get('entity_field.manager'),
            $container->get('state')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('categories' => array(), 'collection' => $this->state->get('rp_site.settings.collection.buildings')['nid']);

        $variables['building_status_alias'] = \Drupal::request()->query->get('building_status_alias');

        // categories
        $fields = $this->entity_field->getFieldDefinitions('node', 'building');
        $categories = $fields['field_building_status']->getSetting('allowed_values');

        foreach ($categories as $alias => $value) {
            $variables['categories'][] = array(
                'term'  => $value,
                'alias' => $alias,
            );
        }

        return [
            '#theme'     => 'rp_site_buildings_filter_block',
            '#variables' => $variables,
        ];
    }
}
