<?php

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Path\AliasManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Provides a 'News Filter' Block.
 *
 * @Block(
 *   id = "rp_site_news_filter_block",
 *   admin_label = @Translation("News Filter block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_site_news_filter_block')
 * </code>
 */
class NewsFilterBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * EntityTypeManagerInterface to load Taxonomy.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityTaxonomy;

  /**
   * AliasManagerInterface Service.
   *
   * @var \Drupal\Core\Path\AliasManagerInterface
   */
  private $aliasManager;

  private $request;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, AliasManagerInterface $alias_manager, RequestStack $requestStack) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityTaxonomy = $entity->getStorage('taxonomy_term');
    $this->aliasManager   = $alias_manager;
    $this->request        = $requestStack->getCurrentRequest();
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
        $container->get('path.alias_manager'),
        $container->get('request_stack')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = ['categories' => [], 'selected' => []];

    $taxonomy_term_alias = $this->request->query->get('taxonomy_term_alias');
    $variables['current_aliases'] = $taxonomy_term_alias;

    // Listing of Categories.
    $categories = $this->entityTaxonomy->loadTree('category_news');
    foreach ($categories as $category) {
      $alias = $this->aliasManager->getAliasByPath('/taxonomy/term/' . $category->tid);
      if (!empty($alias)) {
        $alias = str_replace('/', '', $alias);
        $variables['categories'][] = [
          'term'  => $category,
          'alias' => $alias,
        ];

        if ($alias == $taxonomy_term_alias) {
          $variables['selected'] = $this->entityTaxonomy->load($category->tid);
        }
      }
    }

    return [
      '#theme'     => 'rp_site_news_filter_block',
      '#variables' => $variables,
    ];
  }

}
