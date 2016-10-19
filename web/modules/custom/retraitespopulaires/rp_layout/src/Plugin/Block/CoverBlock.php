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
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\rp_site\Service\Profession;
use Drupal\rp_site\Service\Cover;

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
     * Cover Service
     * @var Cover
     */
    private $cover;

    /**
     * Class constructor.
     */
     public function __construct(array $configuration, $plugin_id, $plugin_definition, CurrentRouteMatch $route, EntityTypeManagerInterface $entity, Profession $profession, Cover $cover) {
         parent::__construct($configuration, $plugin_id, $plugin_definition);
         $this->route       = $route;
         $this->entity_file = $entity->getStorage('file');
         $this->profession  = $profession;
         $this->cover       = $cover;
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
             $container->get('rp_site.profession'),
             $container->get('rp_site.cover')
         );
     }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();

        if ($node = $this->route->getParameter('node')) {
            if (isset($node->field_profession->target_id)) {
                $variables['theme'] = $this->profession->theme($node->field_profession->target_id);
            }

            $variables['cover'] = $this->cover->generate($node, array(
                'xs' => 'rp_full_screen_xs',
                'md' => 'rp_full_screen_md',
                'lg' => 'rp_full_screen_lg',
                'xl' => 'rp_full_screen_xl',
            ));
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
}
