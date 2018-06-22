<?php

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Path\AliasManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Drupal\rp_site\Service\Profession;

/**
 * Provides a 'FAQs Collection' Block.
 *
 * @Block(
 *   id = "rp_site_faqs_collection_block",
 *   admin_label = @Translation("FAQs Collection block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_site_faqs_collection_block')
 * </code>
 */
class FAQsCollectionBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * Number of faqs per page.
   *
   * @var int
   */
  private $limit = 10;

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
   * Request stack that controls the lifecycle of requests.
   *
   * @var \Symfony\Component\HttpFoundation\RequestStack
   */
  private $request;

  /**
   * Profession Service.
   *
   * @var \Drupal\rp_site\Service\Profession
   */
  private $profession;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, AliasManagerInterface $alias_manager, EntityTypeManagerInterface $entity, RequestStack $request, Profession $profession) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->aliasManager   = $alias_manager;
    $this->entityNode     = $entity->getStorage('node');
    $this->entityTaxonomy = $entity->getStorage('taxonomy_term');
    $this->request        = $request->getMasterRequest();
    $this->profession     = $profession;
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
      $container->get('request_stack'),
      $container->get('rp_site.profession')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = [];

    $query = $this->entityNode->getQuery()
      ->condition('type', 'faq')
      ->condition('status', 1);

    $taxonomy_term_alias = $this->request->query->get('taxonomy_term_alias');

    if (!empty($taxonomy_term_alias)) {
      // Retreive filter from slug alias.
      $taxonomy_term_tid = NULL;
      $taxonomy_term_url = $this->aliasManager->getPathByAlias('/metier/' . $taxonomy_term_alias);
      if (!empty($taxonomy_term_url)) {
        $taxonomy_term_tid = str_replace('/taxonomy/term/', '', $taxonomy_term_url);
        $term = $this->entityTaxonomy->load($taxonomy_term_tid);
        if ($term->vid->target_id == 'profession') {
          $query->condition('field_profession', $taxonomy_term_tid);
          $variables['theme'] = $this->profession->theme($taxonomy_term_tid);
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
    $query->sort('title', 'ASC');
    $query->range($page * $this->limit, $this->limit);

    $nids = $query->execute();
    $variables['faqs'] = $this->entityNode->loadMultiple($nids);

    return [
      '#theme'     => 'rp_site_faqs_collection_block',
      '#variables' => $variables,
      '#cache' => [
        'contexts' => [
          'url.path',
          'url.query_args',
        ],
        'tags' => [
        // Invalidated whenever any Node entity is updated, deleted or created.
          'node_list:faq',
        ],
      ],
    ];
  }

}
