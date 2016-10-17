<?php
/**
* @file
* Contains \Drupal\rp_layout\Plugin\Block\CoverBlock.
*/

namespace Drupal\rp_layout\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\image\Entity\ImageStyle;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\rp_site\Service\Profession;

/**
* Provides a 'Layout' Cover Block
*
* @Block(
*   id = "rp_layout_cover_block",
*   admin_label = @Translation("Layout Cover block"),
* )
*/
class CoverBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
    * Current Route
    * @var CurrentRouteMatch
    */
    private $route;

    /**
    * EntityTypeManagerInterface to load Files
    * @var EntityTypeManagerInterface
    */
    private $entity_file;

    /**
     * Profession Service
     * @var Profession
     */
    private $profession;

    /**
     * Class constructor.
     */
     public function __construct(array $configuration, $plugin_id, $plugin_definition, CurrentRouteMatch $route, EntityTypeManagerInterface $entity, Profession $profession) {
         parent::__construct($configuration, $plugin_id, $plugin_definition);
         $this->route       = $route;
         $this->entity_file = $entity->getStorage('file');
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
             $container->get('current_route_match'),
             $container->get('entity_type.manager'),
             $container->get('rp_site.profession')
         );
     }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();

        $variables['cover'] = $this->_covers();
        if (isset($node->field_profession->target_id)) {
            $variables['theme'] = $this->profession->theme($node->field_profession->target_id);
        }

        return [
            '#theme'     => 'rp_layout_cover_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }

    /**
     * Generate Image Style, with responsive format
     * @method _covers
     * @return array [Image for each responsive layout]
     */
    private function _covers(){
        $build = array();

        // Retreive node
        $node = $this->route->getParameter('node');
        $cover_fid = '';

        if (isset($node) && $node->field_cover->entity) {
            $cover_fid = $node->field_cover->entity->id();
        }

        if ($cover_fid) {
            $cover = $this->entity_file->load($cover_fid);
            $build = array(
                'xs'  => ImageStyle::load('rp_full_screen_xs')->buildUrl($cover->uri->value),
                'md'  => ImageStyle::load('rp_full_screen_md')->buildUrl($cover->uri->value),
                'lg'  => ImageStyle::load('rp_full_screen_lg')->buildUrl($cover->uri->value),
                'xlg' => $cover->url(),
            );
        }
        return $build;
    }

}
