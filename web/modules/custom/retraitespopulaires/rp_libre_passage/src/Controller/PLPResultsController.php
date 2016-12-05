<?php
/**
* @file
* Contains \Drupal\rp_libre_passage\Controller\PLPResultsController.
*/

namespace Drupal\rp_libre_passage\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Symfony\Component\HttpFoundation\RequestStack;
use Drupal\search_api\Entity\Index;

/**
* PLPResultsController.
*/
class PLPResultsController extends ControllerBase {

    /**
    * Request stack that controls the lifecycle of requests
    * @var RequestStack
    */
    private $request;

    /**
     * Class constructor.
     */
     public function __construct(RequestStack $request) {
         $this->request   = $request->getMasterRequest();
     }

     /**
     * {@inheritdoc}
     */
     public static function create(ContainerInterface $container) {
         // Instantiates this form class.
         return new static(
             // Load customs services used in this class.
             $container->get('request_stack')
         );
     }

    public function results() {
        $variables = array();

        return [
            '#theme'     => 'rp_libre_passage_plp_results_page',
            '#variables' => $variables,
            '#cache' => [
                'max-age' => 0,
                // 'contexts' => [
                //     'url.path',
                //     'url.query_args'
                // ],
            ]
        ];
    }
}
