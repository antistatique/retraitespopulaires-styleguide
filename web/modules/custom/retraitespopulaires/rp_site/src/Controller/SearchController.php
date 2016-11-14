<?php
/**
* @file
* Contains \Drupal\rp_site\Controller\SearchController.
*/

namespace Drupal\rp_site\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Symfony\Component\HttpFoundation\RequestStack;
use Drupal\search_api\Entity\Index;

/**
* SearchController.
*/
class SearchController extends ControllerBase {
    /**
    * Number of result by page
    * @var Integer
    */
    private $limit = 30;

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

    public function search() {
        $variables = array('results' => array(), 'search' => array());

        $search = $this->request->query->get('q');

        /* @var $search_api_index \Drupal\search_api\IndexInterface */
        $search_api_index = Index::load('full_website');

        // Create the query.
        $query = $search_api_index->query([
          'limit'  => $this->limit,
          'offset' => !is_null($this->request->get('page')) ? $this->request->get('page') * $this->limit : 0,
        ]);

        $query->setFulltextFields(['body'])->keys($search);
        $results = $query->execute();

        $variables['search'] = array(
            'search' => $search,
            'count'  => $results->getResultCount(),
        );

        foreach ($results as $result) {
            $variables['results'][] = array(
                'nid'   => $result->getField('nid')->getValues()[0],
                'title' => $result->getField('title')->getValues()[0],
            );
        }

        // Pager
        pager_default_initialize($results->getResultCount(), $this->limit);
        $variables['pager'] = array(
            '#type' => 'pager',
            '#quantity' => '3',
        );

        return [
            '#theme'     => 'rp_site_search_page',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path',
                    'url.query_args'
                ],
            ]
        ];
    }
}
