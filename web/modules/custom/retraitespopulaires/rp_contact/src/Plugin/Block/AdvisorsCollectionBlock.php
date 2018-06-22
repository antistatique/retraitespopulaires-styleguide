<?php

namespace Drupal\rp_contact\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\rp_site\Service\Profession;
use Drupal\Core\Routing\CurrentRouteMatch;

/**
 * Provides a 'Advisors Collection' Block.
 *
 * @Block(
 *   id = "rp_contact_advisors_collection_block",
 *   admin_label = @Translation("Advisors Collection block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_contact_advisors_collection_block')
 * </code>
 */
class AdvisorsCollectionBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * EntityTypeManagerInterface to load Nodes.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityNode;

  /**
   * Entity_query to query Node's Contest.
   *
   * @var \Drupal\Core\Entity\Query\QueryFactory
   */
  private $entityQuery;

  /**
   * Profession Service.
   *
   * @var \Drupal\rp_site\Service\Profession
   */
  private $profession;

  /**
   * Current Route.
   *
   * @var \Drupal\Core\Routing\CurrentRouteMatch
   */
  private $route;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, QueryFactory $query, Profession $profession, CurrentRouteMatch $route) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityNode  = $entity->getStorage('node');
    $this->entityQuery = $query;
    $this->profession  = $profession;
    $this->route       = $route;
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
       $container->get('entity.query'),
       $container->get('rp_site.profession'),
       $container->get('current_route_match')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = [];

    $query = $this->entityQuery->get('node')
      ->condition('type', 'advisor')
      ->condition('status', 1)
      ->sort('field_lastname', 'ASC');

    $nids = $query->execute();
    $variables['advisors'] = $this->entityNode->loadMultiple($nids);

    return [
      '#theme'     => 'rp_contact_advisors_collection_block',
      '#variables' => $variables,
      '#cache' => [
        'contexts' => [
          'url.path',
        ],
      ],
    ];
  }

}
