<?php
/**
* @file
* Contains \Drupal\rp_libre_passage\Controller\PLPResultsController.
*/

namespace Drupal\rp_libre_passage\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\user\PrivateTempStoreFactory;
use Drupal\rp_libre_passage\Service\PLPCalculator;

/**
* PLPResultsController.
*/
class PLPResultsController extends ControllerBase {

    /**
     * Stores and retrieves temporary data for a given owner
     * @var PrivateTempStoreFactory
     */
    protected $session;
    /**
     * Class constructor.
     */
     public function __construct(PrivateTempStoreFactory $private_tempstore, PLPCalculator $plpCalculator) {
         $this->session = $private_tempstore->get('rp_libre_passage_plp_calculator_form');
         $this->plpCalculator = $plpCalculator;
     }

     /**
     * {@inheritdoc}
     */
     public static function create(ContainerInterface $container) {
         // Instantiates this form class.
         return new static(
             // Load customs services used in this class.
             $container->get('user.private_tempstore'),
             $container->get('rp_libre_passage.plp_calculator')
         );
     }

    public function results() {
        $variables = array();
        $data = $this->session->get('data');

        $birthdate = \DateTime::createFromFormat('d/m/Y', $data['birthdate']);
        dump($data);
        $deadline = $this->plpCalculator->getDeadline($birthdate, $data['age']);
        dump($deadline);

        die();
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
