<?php
/**
* @file
* Contains \Drupal\rp_libre_passage\Plugin\Block\SimulatorResultsBlock.
*/

namespace Drupal\rp_libre_passage\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\rp_site\Service\Profession;

/**
* Provides a 'Simulator Results' Block
*
* @Block(
*   id = "rp_libre_passage_simulator_results_block",
*   admin_label = @Translation("Simulator Results block"),
* )
*
* Inline example:
* <code>
* load_block('rp_libre_passage_simulator_results_block')
* </code>
*/
class SimulatorResultsBlock extends BlockBase implements ContainerFactoryPluginInterface {
    /**
    * Current Route
    * @var CurrentRouteMatch
    */
    private $route;

    /**
     * Profession Service
     * @var Profession
     */
    private $profession;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, CurrentRouteMatch $route, Profession $profession) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
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
            $container->get('current_route_match'),
            $container->get('rp_site.profession')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array();

        if (isset($params['theme'])) {
            $variables['theme'] = $params['theme'];
        }

        if ($node = $this->route->getParameter('node')) {
            if (isset($node->field_profession->target_id)){
                $variables['theme'] = $this->profession->theme($node->field_profession->target_id);
            }

        }

        return [
            '#theme'     => 'rp_libre_passage_simulator_results_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }
}
