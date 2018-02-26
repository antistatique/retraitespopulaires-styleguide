<?php
/**
* @file
* Contains \Drupal\rp_contact\Plugin\Block\AdvisorsCollectionBlock.
*/

namespace Drupal\rp_contact\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;

/**
* Provides a 'Contact Pop-in Form' Block
*
* @Block(
  *   id = "rp_contact_popin_block",
  *   admin_label = @Translation("Popin Form block"),
  * )
  */
class PopinBlock extends BlockBase implements ContainerFactoryPluginInterface {
  /**
  * Current Route
  * @var \Drupal\Core\Routing\CurrentRouteMatch
  */
  private $route;

  /**
  * Class constructor.
  */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, CurrentRouteMatch $route) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->route = $route;
  }

  /**
  * {@inheritdoc}
  */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('current_route_match')
    );
  }

  /**
  * {@inheritdoc}
  */
  public function build() {
    $variables = ['popin' => false];

    // Show the pop-in only when the field is checked.
    $node = $this->route->getParameter('node');

    $tags = [];
    if ($node) {
      $tags[] = 'node:'.$node->id();
    }
    if ($node && $node->hasField('field_popin') && $node->field_popin->value == 1) {
      $variables['popin'] = TRUE;
      $variables['popin_mail_to'] = $node->get('field_email_popin')->value;
    }

    return [
      '#theme'     => 'rp_contact_popin_block',
      '#variables' => $variables,
      '#cache' => [
        'max-age' => 0,
        'contexts' => [
          'url.path',
        ],
        'tags' => $tags,
      ]
    ];
  }
}