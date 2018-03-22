<?php

namespace Drupal\rp_quickwin\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Url;
use Drupal\node\Entity\Node;
use Drupal\taxonomy\Entity\Term;

/**
 * Provides a 'TeasersBlock' block.
 *
 * @Block(
 *  id = "rp_quickwin_teasers_block",
 *  admin_label = @Translation("Teasers block"),
 * )
 */
class TeasersBlock extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    // Get teasers to show
    $teasers_terms = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree('teaser_calculator_quickwin', 0, NULL, TRUE);
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
      if (!empty($teaser_term->field_field->target_id)) {
        $field = Term::load($teaser_term->field_field->target_id);
        $teasers_array[$teaser_id]['field'] = [
          'parameter'   => $field->field_logismata_parameter->value,
          'type'        => $field->field_type->value,
          'title'       => $field->field_display_name->value,
          'withSlider'  => $field->field_slider->value,
          'min'         => $field->field_minimum->value,
          'max'         => $field->field_maximum->value,
          'step'        => $field->field_increment->value,
          'default'     => $field->field_default->value,
        ];
      }

      // Get categories were the teaser is
      $teaser_categories = $teaser_term->field_categories->referencedEntities();
      foreach ($teaser_categories as $collection){
        if (isset($categories_array[$collection->tid->value])){
          $categories_array[$collection->tid->value]['teasers'][] = $teaser_id;
        }
        else{
          $categories_array[$collection->tid->value] = [
            'title'   => $collection->name->value,
            'teasers' => [$teaser_id],
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
      // TODO: remove when is in styleguide
      '#attached'  => [ 'library' =>  [ 'rp_quickwin/slider' ], ],
    ];
  }
}
