<?php

namespace Drupal\antistatique_quick_edit\Plugin\Block;

/**
 * Contains \Drupal\antistatique_quick_edit\Plugin\Block\TermEditBlock.
 */

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Url;

// Injection.
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\Core\Session\AccountProxyInterface;

/**
 * Provides a 'Term Edit' Block.
 *
 * @Block(
 *   id = "antistatique_quick_edit_term_edit_block",
 *   admin_label = @Translation("Term Edit block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('antistatique_quick_edit_term_edit_block')
 * </code>
 */
class TermEditBlock extends BlockBase implements ContainerFactoryPluginInterface {
  /**
   * Current Route.
   *
   * @var \Drupal\Core\Routing\CurrentRouteMatch
   */
  private $route;

  /**
   * Current User.
   *
   * @var \Drupal\Core\Session\AccountProxyInterface
   */
  private $currentUser;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, CurrentRouteMatch $route, AccountProxyInterface $currentUser) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->route       = $route;
    $this->currentUser = $currentUser;
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
        $container->get('current_route_match'),
        $container->get('current_user')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = [
      'path' => drupal_get_path('module', 'antistatique_quick_edit'),
      'text' => '',
      'link' => '',
      'node' => NULL,
    ];

    if ($this->currentUser->hasPermission('administer site configuration') && $term = $this->route->getParameter('taxonomy_term')) {
      $variables['term'] = $term;

      $variables['text'] = $this->t('Edit');
      if (isset($params['text'])) {
        $variables['text'] = $params['text'];
      }

      $attributes = ['class' => 'button edit-term', 'target' => '_blank'];
      if (isset($params['attributes'])) {
        $attributes = $params['attributes'];
      }
      $variables['link'] = Url::fromRoute('entity.taxonomy_term.edit_form', ['taxonomy_term' => $term->tid->value], ['attributes' => $attributes]);
    }

    return [
      '#theme'     => 'antistatique_quick_edit_term_edit_block',
      '#variables' => $variables,
      '#attached' => [
        'library' => ['antistatique_quick_edit/icons'],
      ],
      '#cache' => [
        'contexts' => [
          'url.path',
        ],
      ],
    ];
  }

}
