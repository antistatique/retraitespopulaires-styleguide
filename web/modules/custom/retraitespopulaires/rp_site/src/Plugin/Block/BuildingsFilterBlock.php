<?php

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityFieldManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Provides a 'Buildings Filter' Block.
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
   * The entity field manager.
   *
   * @var \Drupal\Core\Entity\EntityFieldManagerInterface
   */
  private $entityField;

  /**
   * The request.
   *
   * @var \Symfony\Component\HttpFoundation\Request
   */
  private $request;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityFieldManagerInterface $entity_field, RequestStack $requestStack) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityField = $entity_field;
    $this->request     = $requestStack->getCurrentRequest();
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
        $container->get('request_stack')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = ['categories' => []];

    $variables['building_status_alias'] = $this->request->query->get('building_status_alias');

    // Categories.
    $fields = $this->entityField->getFieldDefinitions('node', 'building');
    $categories = $fields['field_building_status']->getSetting('allowed_values');

    foreach ($categories as $alias => $value) {
      $variables['categories'][] = [
        'term'  => $value,
        'alias' => $alias,
      ];
    }

    return [
      '#theme'     => 'rp_site_buildings_filter_block',
      '#variables' => $variables,
    ];
  }

}
