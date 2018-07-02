<?php

namespace Drupal\rp_layout\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\rp_layout\Service\Contact;
use Drupal\Core\Menu\MenuLinkTreeInterface;

/**
 * Provides a 'Layout' Footer Block.
 *
 * @Block(
 *   id = "rp_layout_footer_block",
 *   admin_label = @Translation("Layout Footer block"),
 * )
 */
class FooterBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * Contact Service.
   *
   * @var \Drupal\rp_layout\Service\Contact
   */
  private $contact;

  /**
   * Contact Service.
   *
   * @var \Drupal\rp_layout\Service\Contact
   */
  private $menuTree;

  /**
   * Class constructor.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, Contact $contact, MenuLinkTreeInterface $menu_tree) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->contact = $contact;
    $this->menuTree = $menu_tree;
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
         $container->get('rp_layout.contact'),
         $container->get('menu.link_tree')
     );
  }

  /**
   * {@inheritdoc}
   */
  public function build($params = []) {
    $variables = [];

    $variables['contact'] = $this->contact;

    $parameters = $this->menuTree->getCurrentRouteMenuTreeParameters('footer');
    $parameters->onlyEnabledLinks();
    $parameters->expandedParents = [];
    $variables['footer_menu'] = $this->menuTree->load('footer', $parameters);

    return [
      '#theme'     => 'rp_layout_footer_block',
      '#variables' => $variables,
    ];
  }

}
