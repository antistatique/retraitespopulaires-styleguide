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
    $teasers_terms = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree('teaser_calculator_quickwin');
    $groups_array = [];
    $teasers_array = [];

    foreach ($teasers_terms as $teaser_term){
      $teaser_id = $teaser_term->tid;
      $teaser_term = Term::load($teaser_id);
      $target_calculator = Node::load($teaser_term->get('field_calculator')->target_id);

      $teasers_array[$teaser_id] = [
        'title' => $teaser_term->name->value,
        'description' => $teaser_term->field_description->value,
        'info' => $teaser_term->field_information->value,
        'node' => $target_calculator->nid->value,
        'nodeLink' => Url::fromRoute('entity.node.canonical', ['node' => $target_calculator->nid->value]),
        'fields' => [
          'button' => 'Calculer',
        ],
      ];

      if (!empty($teaser_term->get('field_field')->target_id)) {
        $field = Term::load($teaser_term->get('field_field')->target_id);
        $teasers_array[$teaser_id]['fields'][$field->field_logismata_parameter->value] = [
          'type' => $field->field_type->value,
          'title' => $field->field_display_name->value,
          'withSlider' => $field->field_slider->value,
          'min' => $field->field_minimum->value,
          'max' => $field->field_maximum->value,
          'step' => $field->field_increment->value,
          'default' => $field->field_default->value,
        ];
      }

      $teaser_collections = $teaser_term->get('field_categories')->referencedEntities();
      foreach ($teaser_collections as $collection){
        if (isset($groups_array[$collection->tid->value])){
          $groups_array[$collection->tid->value]['teasers'][] = $teaser_id;
        }
        else{
          $groups_array[$collection->tid->value] = [
            'title' => $collection->name->value,
            'teasers' => [$teaser_id],
          ];
        }
      }
    }

    $variables = [
      'groups' => $groups_array,
      'teasers' => $teasers_array,
    ];

    return [
      '#theme'     => 'rp_quickwin_teasers_block',
      '#variables' => $variables,
      '#cache' => [ 'max-age' => 0, ],
    ];
  }

}
