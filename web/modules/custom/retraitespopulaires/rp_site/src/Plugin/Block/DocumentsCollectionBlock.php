<?php

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Path\AliasManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Drupal\rp_site\Service\Profession;
use Drupal\Core\Routing\CurrentRouteMatch;

/**
 * Provides a 'Documents Collection' Block.
 *
 * @Block(
 *   id = "rp_site_documents_collection_block",
 *   admin_label = @Translation("Documents Collection block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_site_documents_collection_block')
 * </code>
 */
class DocumentsCollectionBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * Number of documents per page.
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
   * Current Route.
   *
   * @var \Drupal\Core\Routing\CurrentRouteMatch
   */
  private $route;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, AliasManagerInterface $alias_manager, EntityTypeManagerInterface $entity, RequestStack $request, Profession $profession, CurrentRouteMatch $route) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->aliasManager   = $alias_manager;
    $this->entityNode     = $entity->getStorage('node');
    $this->entityTaxonomy = $entity->getStorage('taxonomy_term');
    $this->request        = $request->getMasterRequest();
    $this->profession     = $profession;
    $this->route          = $route;
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
       $container->get('rp_site.profession'),
       $container->get('current_route_match')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = [];

    // Set the theme using the current node profession.
    if ($node = $this->route->getParameter('node')) {
      $variables['theme'] = $this->profession->theme($node->field_profession->target_id);
    }

    $query = $this->entityNode->getQuery()
      ->condition('type', 'document')
      ->condition('status', 1);

    $profession_alias = $this->request->query->get('profession_alias');
    $variables['profession_alias'] = $profession_alias;

    $category_alias = $this->request->query->get('category_alias');
    $variables['category_alias'] = $category_alias;

    $institution_alias = $this->request->query->get('institution_alias');
    $variables['institution_alias'] = $institution_alias;

    // Only interested by alias of Profession taxonomy.
    if (!empty($profession_alias)) {
      // Retreive filter from slug alias.
      $taxonomy_term_tid = NULL;
      $taxonomy_term_url = $this->aliasManager->getPathByAlias('/metier/' . $profession_alias);
      if (!empty($taxonomy_term_url)) {
        $taxonomy_term_tid = str_replace('/taxonomy/term/', '', $taxonomy_term_url);
        $term = $this->entityTaxonomy->load($taxonomy_term_tid);
        if ($term->vid->target_id == 'profession') {
          $query->condition('field_profession', $taxonomy_term_tid);
          $variables['theme'] = $this->profession->theme($taxonomy_term_tid);
        }
      }
    }

    // Only interested by alias of Category Document taxonomy.
    if (!empty($category_alias)) {
      // Retreive filter from slug alias.
      $taxonomy_term_tid = NULL;
      $taxonomy_term_url = $this->aliasManager->getPathByAlias('/categorie-document/' . $category_alias);
      if (!empty($taxonomy_term_url)) {
        $taxonomy_term_tid = str_replace('/taxonomy/term/', '', $taxonomy_term_url);
        $term = $this->entityTaxonomy->load($taxonomy_term_tid);
        if ($term->vid->target_id == 'category_document') {
          $query->condition('field_document_type', $taxonomy_term_tid);
        }
      }
    }

    // Only interested by alias of Category Document (Institution) taxonomy.
    if (!empty($institution_alias)) {
      // Retreive filter from slug alias.
      $taxonomy_term_tid = NULL;
      $taxonomy_term_url = $this->aliasManager->getPathByAlias('/categorie-document/' . $institution_alias);
      if (!empty($taxonomy_term_url)) {
        $taxonomy_term_tid = str_replace('/taxonomy/term/', '', $taxonomy_term_url);
        $term = $this->entityTaxonomy->load($taxonomy_term_tid);
        if ($term->vid->target_id == 'category_document_institutions') {
          $query->condition('field_document_type_institution', $taxonomy_term_tid);
        }
      }
    }

    // Pager.
    $count_query = clone $query;
    $count = $count_query->count()->execute();
    pager_default_initialize($count, $this->limit);
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
    $variables['documents'] = $this->entityNode->loadMultiple($nids);
    return [
      '#theme'     => 'rp_site_documents_collection_block',
      '#variables' => $variables,
      '#cache' => [
        'contexts' => [
          'url.path',
          'url.query_args',
        ],
        'tags' => [
        // Invalidated whenever any Node entity is updated, deleted or created.
          'node_list:document',
        ],
      ],
    ];
  }

}
