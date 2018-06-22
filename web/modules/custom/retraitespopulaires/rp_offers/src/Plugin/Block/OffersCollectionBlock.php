<?php

namespace Drupal\rp_offers\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Provides a 'Offers Collection' Block.
 *
 * @Block(
 *   id = "rp_offers_offers_collection_block",
 *   admin_label = @Translation("Offers Collection block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_offers_offers_collection_block')
 * </code>
 */
class OffersCollectionBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * Number of buildings per page.
   *
   * @var int
   */
  private $limit = 20;

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
   * Request stack that controls the lifecycle of requests.
   *
   * @var \Symfony\Component\HttpFoundation\RequestStack
   */
  private $request;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, QueryFactory $query, RequestStack $request) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityNode  = $entity->getStorage('node');
    $this->entityQuery = $query;
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
       $container->get('entity.query'),
       $container->get('request_stack')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = [];

    $query = $this->entityQuery->get('node')
      ->condition('type', 'offer')
      ->condition('status', 1);

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
    $query->sort('field_date_end', 'DESC');
    $query->range($page * $this->limit, $this->limit);

    $nids = $query->execute();
    $variables['offers'] = $this->entityNode->loadMultiple($nids);

    return [
      '#theme'     => 'rp_offers_offers_collection_block',
      '#variables' => $variables,
      '#cache' => [
        'contexts' => [
          'url.path',
          'url.query_args',
        ],
        'tags' => [
        // Invalidated whenever any Node entity is updated, deleted or created.
          'node_list:offer',
        ],
      ],
    ];
  }

}
