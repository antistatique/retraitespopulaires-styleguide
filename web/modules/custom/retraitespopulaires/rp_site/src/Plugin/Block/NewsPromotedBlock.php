<?php

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;

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
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity) {
    $this->entityNode = $entity->getStorage('node');
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
        $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = ['news' => [], 'title' => $this->t('Actualités')];

    $now = new \DateTime();
    $query = $this->entityNode->getQuery()
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
