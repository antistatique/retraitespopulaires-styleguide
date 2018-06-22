<?php

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Provides a 'News Collection' Block.
 *
 * @Block(
 *   id = "rp_site_news_collection_block",
 *   admin_label = @Translation("News Collection block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_site_news_collection_block')
 * </code>
 */
class NewsCollectionBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * Number of news per page.
   *
   * @var int
   */
  private $limit = 6;

  /**
   * AliasManagerInterface Service.
   *
   * @var \Drupal\Core\Path\AliasManagerInterface
   */
  private $aliasManager;

  /**
   * EntityTypeManagerInterface to load Nodes.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityNode;

  /**
   * EntityTypeManagerInterface to load Taxonomy.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityTaxonomy;

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
  public function __construct(array $configuration, $plugin_id, $plugin_definition, AliasManagerInterface $alias_manager, EntityTypeManagerInterface $entity, QueryFactory $query, RequestStack $request) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->aliasManager   = $alias_manager;
    $this->entityNode     = $entity->getStorage('node');
    $this->entityTaxonomy = $entity->getStorage('taxonomy_term');
    $this->entityQuery    = $query;
    $this->request        = $request->getMasterRequest();
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
       $container->get('path.alias_manager'),
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

    $now = new \DateTime();
    $query = $this->entityQuery->get('node')
      ->condition('type', 'news')
      ->condition('status', 1)
      ->condition('field_date', $now->format('c'), '<=');

    $taxonomy_term_alias = $this->request->query->get('taxonomy_term_alias');

    if (!empty($taxonomy_term_alias)) {
      // Retreive filter from slug alias.
      $taxonomy_term_tid = NULL;
      $taxonomy_term_url = $this->aliasManager->getPathByAlias('/' . $taxonomy_term_alias);
      if (!empty($taxonomy_term_url)) {
        $taxonomy_term_tid = str_replace('/taxonomy/term/', '', $taxonomy_term_url);
        $term = $this->entityTaxonomy->load($taxonomy_term_tid);
        if ($term->vid->target_id == 'category_news') {
          $query->condition('field_news_type', $taxonomy_term_tid);
        }
      }
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
    $variables['news'] = $this->entityNode->loadMultiple($nids);

    return [
      '#theme'     => 'rp_site_news_collection_block',
      '#variables' => $variables,
      '#cache' => [
        'contexts' => [
          'url.path',
          'url.query_args',
        ],
        'tags' => [
        // Invalidated whenever any Node entity is updated, deleted or created.
          'node_list:news',
        ],
      ],
    ];
  }

}
