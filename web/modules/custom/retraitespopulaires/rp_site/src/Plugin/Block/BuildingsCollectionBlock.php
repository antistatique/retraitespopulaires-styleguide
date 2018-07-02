<?php

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Drupal\Core\Entity\EntityFieldManagerInterface;

/**
 * Provides a 'Buildings Collection' Block.
 *
 * @Block(
 *   id = "rp_site_buildings_collection_block",
 *   admin_label = @Translation("Buildings Collection block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_site_buildings_collection_block')
 * </code>
 */
class BuildingsCollectionBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * Number of buildings per page.
   *
   * @var int
   */
  private $limit = 12;

  /**
   * EntityTypeManagerInterface to load Nodes.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityNode;

  /**
   * The entity field manager.
   *
   * @var \Drupal\Core\Entity\EntityFieldManagerInterface
   */
  private $entityField;

  /**
   * Request stack that controls the lifecycle of requests.
   *
   * @var \Symfony\Component\HttpFoundation\RequestStack
   */
  private $request;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, RequestStack $request, EntityFieldManagerInterface $entity_field) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityNode  = $entity->getStorage('node');
    $this->entityField = $entity_field;
    $this->request     = $request->getMasterRequest();
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
       $container->get('request_stack'),
       $container->get('entity_field.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = [];

    $query = $this->entityNode->getQuery()
      ->condition('type', 'building')
      ->condition('status', 1);

    $buildingStatusAlias = $this->request->query->get('building_status_alias');

    $fields = $this->entityField->getFieldDefinitions('node', 'building');
    $fieldBuildingStatus = $fields['field_building_status']->getSetting('allowed_values');

    if (!empty($fieldBuildingStatus) && array_key_exists($buildingStatusAlias, $fieldBuildingStatus)) {
      $query->condition('field_building_status', $buildingStatusAlias);
    }

    // Pager.
    $nids = $query->execute();
    pager_default_initialize(count($nids), $this->limit);
    $variables['pager'] = [
      '#type' => 'pager',
      '#quantity' => '3',
    ];

    // Paged query.
    $page = 0;
    if (!is_null($this->request->get('page'))) {
      $page = (int) $this->request->get('page');
    }
    $query->sort('field_date', 'DESC');
    $query->range($page * $this->limit, $this->limit);

    $nids = $query->execute();
    $variables['buildings'] = $this->entityNode->loadMultiple($nids);

    return [
      '#theme'     => 'rp_site_buildings_collection_block',
      '#variables' => $variables,
      '#cache' => [
        'contexts' => [
          'url.path',
          'url.query_args',
        ],
        'tags' => [
        // Invalidated whenever any Node entity is updated, deleted or created.
          'node_list:building',
        ],
      ],
    ];
  }

}
