<?php

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;

/**
 * Provides a 'News Promoted' Block.
 *
 * @Block(
 *   id = "rp_site_news_promoted_block",
 *   admin_label = @Translation("News Promoted block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_site_news_promoted_block')
 * </code>
 */
class NewsPromotedBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * EntityTypeManagerInterface to load Nodes.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityNode;

  /**
   * QueryFactory to execute query.
   *
   * @var \Drupal\Core\Entity\Query\QueryFactory
   */
  private $entityQuery;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, QueryFactory $query) {
    $this->entityNode = $entity->getStorage('node');
    $this->entityQuery = $query;
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
        $container->get('entity.query')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = ['news' => [], 'title' => $this->t('Actualités')];

    $now = new \DateTime();
    $query = $this->entityQuery->get('node')
      ->condition('type', 'news')
      ->condition('status', 1)
      ->condition('field_date', $now->format('c'), '<=')
      ->sort('promote', 'DESC')
      ->sort('field_date', 'DESC')
      ->range(0, 2);

    $nids = $query->execute();
    $variables['news'] = $this->entityNode->loadMultiple($nids);

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
