<?php
namespace Drupal\rp_libre_passage\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;

use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\user\PrivateTempStoreFactory;
use Drupal\Core\Routing\CurrentRouteMatch;
use Symfony\Component\HttpFoundation\RequestStack;
use Drupal\Core\Session\SessionManager;

/**
 * Provides the 'PLP' Block
 *
 * @Block(
 *   id = "rp_libre_passage_plp_block",
 *   admin_label = @Translation("PLP block"),
 * )
 *
 * Inline example:
 * <code>
 * load_block('rp_libre_passage_plp_block')
 * </code>
 */
class PLPBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
     * Stores and retrieves temporary data for a given owner
     * @var PrivateTempStoreFactory
     */
    protected $session;

    /**
    * Current Route
    * @var CurrentRouteMatch
    */
    private $route;

    /**
    * Request stack that controls the lifecycle of requests
    * @var RequestStack
    */
    private $request;

    /**
     * Drupal\Core\Session\SessionManager definition.
     *
     * @var Drupal\Core\Session\SessionManager
     */
    protected $session_manager;

    /**
     * PLP constructor.
     *
     * @param array     $configuration
     * @param string    $plugin_id
     * @param mixed     $plugin_definition
     */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, PrivateTempStoreFactory $private_tempstore, CurrentRouteMatch $route, RequestStack $request, sessionManager $session_manager) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->session = $private_tempstore->get('rp_libre_passage_plp_calculator_form');
        $this->route   = $route;
        $this->request = $request->getMasterRequest();

        $this->session_manager = $session_manager;
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
            $container->get('user.private_tempstore'),
            $container->get('current_route_match'),
            $container->get('request_stack'),
            $container->get('session_manager')
        );
    }

    /**
     * {@inheritdoc}
     */
    public function build($params = array()) {

        // Start session for anonymous user
        if (!isset($_SESSION['session_started'])) {
          $_SESSION['session_started'] = TRUE;
          $this->session_manager->start();
        }

        $variables = [];
        $variables['node'] = $this->route->getParameter('node');

        if ($this->request->get('reset')) {
            $this->session->delete('view_result');
        }
        $variables['view_result'] = $this->session->get('view_result');
        $variables['results'] = $this->session->get('data');

        return [
            '#theme'     => 'rp_libre_passage_plp_block',
            '#variables' => $variables,
            '#cache' => [
                'max-age' => 0,
            ]
        ];
    }
}
