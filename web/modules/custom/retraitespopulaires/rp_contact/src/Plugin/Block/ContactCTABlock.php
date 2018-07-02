<?php

namespace Drupal\rp_contact\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\rp_site\Service\Profession;
use Drupal\rp_site\Service\Cover;

/**
 * Provides a 'Contact CTA' Block.
 *
 * @Block(
 *   id = "rp_contact_contact_cta_block",
 *   admin_label = @Translation("Contact CTA block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_contact_contact_cta_block')
 * </code>
 */
class ContactCTABlock extends BlockBase implements ContainerFactoryPluginInterface {

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
   * Profession Service.
   *
   * @var \Drupal\rp_site\Service\Profession
   */
  private $profession;

  /**
   * Cover Service.
   *
   * @var \Drupal\rp_site\Service\Cover
   */
  private $cover;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, CurrentRouteMatch $route, Profession $profession, Cover $cover) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->entityNode = $entity->getStorage('node');
    $this->route      = $route;
    $this->profession = $profession;
    $this->cover      = $cover;
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
        $container->get('rp_site.profession'),
        $container->get('rp_site.cover')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = ['contacts' => []];

    if ($node = $this->route->getParameter('node')) {
      $variables['node'] = $node;

      // List all advisor(s)
      if (isset($node->field_advisor) && !empty($node->field_advisor)) {
        foreach ($node->field_advisor as $advisor) {
          $advisor = $this->entityNode->load($advisor->target_id);
          // If the advisor is publish only.
          if ($advisor && $advisor->isPublished()) {
            $variables['contacts'][] = $advisor;
          }
        }
      }

      // List all contact(s)
      if (isset($node->field_contact) && !empty($node->field_contact)) {
        foreach ($node->field_contact as $contact) {
          $contact = $this->entityNode->load($contact->target_id);
          // If the contact is publish only.
          if ($contact && $contact->isPublished()) {
            $variables['contacts'][] = $contact;
          }
        }
      }
    }

    if (count($variables['contacts']) >= 1) {
      $variables['cover'] = $this->cover->fromNode($variables['contacts'][0], ['xl' => 'rp_teaser_contact_portrait_xl']);
    }

    // Disable the CTA when filled.
    if ((isset($node->field_contact_cta) && $node->field_contact_cta->value)) {
      unset($variables['contacts']);
    }

    return [
      '#theme'     => 'rp_contact_contact_cta_block',
      '#variables' => $variables,
      '#cache' => [
        'contexts' => [
          'url.path',
        ],
      ],
    ];
  }

}
