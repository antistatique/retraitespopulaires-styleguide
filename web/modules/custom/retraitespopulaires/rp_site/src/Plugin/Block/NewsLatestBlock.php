<?php

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\rp_site\Service\Profession;

/**
 * Provides a 'News Latest' Block.
 *
 * @Block(
 *   id = "rp_site_news_latest_block",
 *   admin_label = @Translation("News Latest block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_site_news_latest_block')
 * </code>
 */
class NewsLatestBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * EntityTypeManagerInterface to load Nodes.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityNode;

  /**
   * Current Route.
   *
   * @var \Drupal\Core\Routing\CurrentRouteMatch
   */
  private $route;

  /**
   * AliasManagerInterface Service.
   *
   * @var \Drupal\Core\Path\AliasManagerInterface
   */
  private $aliasManager;

  /**
   * Profession Service.
   *
   * @var \Drupal\rp_site\Service\Profession
   */
  private $profession;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, CurrentRouteMatch $route, AliasManagerInterface $alias_manager, Profession $profession) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityNode   = $entity->getStorage('node');
    $this->route        = $route;
    $this->aliasManager = $alias_manager;
    $this->profession   = $profession;
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
        $container->get('current_route_match'),
        $container->get('path.alias_manager'),
        $container->get('rp_site.profession')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = ['news' => [], 'title' => $this->t('Actualités')];

    // Load the current node's related news.
    $node = $this->route->getParameter('node');
    if (isset($node->field_profession->target_id)) {
      $alias = $this->aliasManager->getAliasByPath('/taxonomy/term/' . $node->field_profession->target_id);
      if (!empty($alias)) {
        $alias = str_replace('/', '', $alias);
      }

      $now = new \DateTime();
      $query = $this->entityNode->getQuery()
        ->condition('type', 'news')
        ->condition('status', 1)
        ->condition('field_profession', $node->field_profession->target_id)
        ->condition('field_date', $now->format('c'), '<=')
        ->sort('field_date', 'DESC')
        ->range(0, 2);

      $nids = $query->execute();
      $variables['news'] = $this->entityNode->loadMultiple($nids);

      $variables['title'] = $this->t('Actualités du métier');
      $variables['alias'] = $alias;
    }

    // Fallback to retrieve news.
    if (empty($node) || empty($variables['news'])) {
      $now = new \DateTime();
      $query = $this->entityNode->getQuery()
        ->condition('type', 'news')
        ->condition('status', 1)
        ->condition('field_date', $now->format('c'), '<=')
        ->sort('field_date', 'DESC')
        ->range(0, 2);

      $nids = $query->execute();
      $variables['news'] = $this->entityNode->loadMultiple($nids);
    }

    return [
      '#theme'     => 'rp_site_news_latest_block',
      '#variables' => $variables,
      '#cache' => [
        'contexts' => [
          'url.path',
        ],
        'tags' => [
        // Invalidated whenever any Node entity is updated, deleted or created.
          'node_list:news',
        ],
      ],
    ];
  }

}
