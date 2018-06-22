<?php

namespace Drupal\rp_offers\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\rp_site\Service\Profession;

/**
 * Provides a 'Linked Offers' Block.
 *
 * @Block(
 *   id = "rp_offers_linked_block",
 *   admin_label = @Translation("Linked Offers block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_offers_linked_block')
 * </code>
 */
class OffersLinkedBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * EntityTypeManagerInterface to load Request Offer.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityOffer;

  /**
   * Current Route.
   *
   * @var \Drupal\Core\Routing\CurrentRouteMatch
   */
  private $route;

  /**
   * Profession Service.
   *
   * @var \Drupal\rp_site\Service\Profession
   */
  private $profession;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, CurrentRouteMatch $route, Profession $profession) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityOffer = $entity->getStorage('node');
    $this->route       = $route;
    $this->profession  = $profession;

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
        $container->get('rp_site.profession')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = ['offers' => []];
    $node = $this->route->getParameter('node');
    if (!empty($node) && $node->getType() == 'news') {
      $offers = [];
      foreach ($node->field_offer as $offer) {
        $offers[] = $offer->target_id;
      }

      if (!empty($offers)) {

        $query = $this->entityOffer->getQuery()
          ->condition('type', 'offer')
          ->condition('status', 1)
          ->condition('nid', $offers, 'IN')
          ->sort('field_date_end', 'DESC');

        $nids = $query->execute();
        $variables['offers'] = $this->entityOffer->loadMultiple($nids);
      }
    }

    return [
      '#theme'     => 'rp_offers_linked_block',
      '#variables' => $variables,
      '#cache' => [
        'contexts' => [
          'url.path',
          'url.query_args',
        ],
      ],
    ];

  }

}
