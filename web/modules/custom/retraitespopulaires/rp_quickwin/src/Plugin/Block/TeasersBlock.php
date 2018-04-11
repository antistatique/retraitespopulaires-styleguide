<?php

namespace Drupal\rp_quickwin\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a 'TeasersBlock' block.
 *
 * @Block(
 *  id = "rp_quickwin_teasers_block",
 *  admin_label = @Translation("Teasers block"),
 * )
 */
class TeasersBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * Taxonomy entity
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  private $taxonomyEntity;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entityTypeManager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->taxonomyEntity  = $entityTypeManager->getStorage('taxonomy_term');
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
    // Load the service required to construct this class.
      $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    // Get teasers to show
    $teasers_terms = $this->taxonomyEntity->loadTree('teaser_calculator_quickwin', 0, NULL, TRUE);
    $categories_array = [];
    $teasers_array = [];

    foreach ($teasers_terms as $teaser_term){
      // Get id
      $teaser_id = $teaser_term->tid->value;

      // Add teasers with value
      $teasers_array[$teaser_id] = [
        'title'       => $teaser_term->name->value,
        'description' => $teaser_term->field_description->value,
        'info'        => $teaser_term->field_information->value,
        'node'        => $teaser_term->field_calculator->target_id,
        'nodeLink'    => Url::fromRoute('entity.node.canonical', ['node' => $teaser_term->field_calculator->target_id]),
        'button'      => 'Calculer',
      ];

      // Add field if needed
      if (!$teaser_term->field_field->isEmpty()) {
        $field = $teaser_term->field_field;
        $teasers_array[$teaser_id]['field'] = $field;
      }

      // Get categories were the teaser is
      $teaser_categories = $teaser_term->field_categories->referencedEntities();
      foreach ($teaser_categories as $collection){
        if (isset($categories_array[$collection->tid->value])){
          $categories_array[$collection->tid->value]['teasers'][] = $teaser_id;
        }
        else{
          $categories_array[$collection->tid->value] = [
            'title'     => $collection->name->value,
            'teasers'   => [$teaser_id],
          ];
        }
      }
    }

    $variables = [
      'categories' => $categories_array,
      'teasers' => $teasers_array,
    ];

    return [
      '#theme'     => 'rp_quickwin_teasers_block',
      '#variables' => $variables,
      '#cache'     => [ 'max-age' => 0 ],
      // TODO: remove field when is in styleguide
      '#attached'  => [ 'library' =>  [ 'rp_quickwin/expand-collapse', 'rp_quickwin/field' ], ],
    ];
  }
}
