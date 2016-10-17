<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\PageTeaserBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Menu\MenuLinkTreeInterface;
use Drupal\Core\Render\MetadataBubblingUrlGenerator;

/**
* Provides a 'Page Teaser' Block
*
* @Block(
*   id = "rp_site_page_teaser_block",
*   admin_label = @Translation("Page Teaser block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_page_teaser_block')
* </code>
*/
class PageTeaserBlock extends BlockBase implements ContainerFactoryPluginInterface {

        /**
        * EntityTypeManagerInterface to load Nodes
        * @var EntityTypeManagerInterface
        */
        private $entity_node;

        /**
         * Defines for loading, transforming and rendering menu link trees.
         * @var MenuLinkTreeInterface
         */
        private $menu_tree;

        /**
        * Decorator for the URL generator, which bubbles bubbleable URL metadata
        * @var MetadataBubblingUrlGenerator
        */
        private $url;

        /**
        * Class constructor.
        */
        public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, MenuLinkTreeInterface $menu_tree, MetadataBubblingUrlGenerator $url) {
            parent::__construct($configuration, $plugin_id, $plugin_definition);
            $this->entity_node = $entity->getStorage('node');
            $this->menu_tree   = $menu_tree;
            $this->url         = $url;
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
                $container->get('menu.link_tree'),
                $container->get('url_generator')
            );
        }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();

        if (isset($params['menu'])) {
            $variables['title'] = $params['menu']->link->getTitle();
            $variables['url'] = $params['menu']->link->getUrlObject();
            $param = $params['menu']->link->getRouteParameters();

            if (isset($param['node'])) {
                $node = $this->entity_node->load($param['node']);
                $variables['body'] = $node->body->summary;
            }

            if ($params['menu']->hasChildren) {
                $variables['links'] = $params['menu']->subtree;
            }

        } elseif (isset($params['node'])) {
            $variables['title'] = $params['node']->title->value;
            $variables['url']   = $this->url->generateFromRoute('entity.mode.canonical', ['node' => $params['node']->nid->value]) ;
            $variables['body']  = $params['node']->body->summary;
            $variables['links'] = array();
        }

        return [
            '#theme'     => 'rp_site_page_teaser_block',
            '#variables' => $variables,
        ];
    }
}
