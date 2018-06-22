<?php

namespace Drupal\rp_contact\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\rp_site\Service\Profession;
use Drupal\Core\Routing\CurrentRouteMatch;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Provides a 'Contacts Collection' Block.
 *
 * @Block(
 *   id = "rp_contact_contacts_collection_block",
 *   admin_label = @Translation("Contacts Collection block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_contact_contacts_collection_block')
 * </code>
 */
class ContactsCollectionBlock extends BlockBase implements ContainerFactoryPluginInterface {

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
   * Request stack that controls the lifecycle of requests.
   *
   * @var \Symfony\Component\HttpFoundation\RequestStack
   */
  private $request;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, QueryFactory $query, Profession $profession, CurrentRouteMatch $route, RequestStack $request) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityNode  = $entity->getStorage('node');
    $this->entityQuery = $query;
    $this->profession  = $profession;
    $this->route       = $route;
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
       $container->get('rp_site.profession'),
       $container->get('current_route_match'),
       $container->get('request_stack')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = [];

    $query = $this->entityQuery->get('node')
      ->condition('type', 'contact')
      ->condition('status', 1)
      ->sort('title', 'ASC');

    $nids = $query->execute();
    $variables['contacts'] = $this->entityNode->loadMultiple($nids);

    return [
      '#theme'     => 'rp_contact_contacts_collection_block',
      '#variables' => $variables,
      '#cache' => [
        'contexts' => [
          'url.path',
        ],
      ],
    ];
  }

}
