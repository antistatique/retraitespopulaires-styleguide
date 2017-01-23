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

        $query->setFulltextFields(['title', 'body', 'filename', 'saa_field_file_document', 'saa_field_file_news', 'saa_field_file_page']);

        // returns an array containing all the words found inside the string
        $words = str_word_count($search, 1);
        $keys = array_merge($words, ['#conjunction' => 'OR']);
        // For now, in D8, you need to set the conjunction on the query's parse mode plugin object
        $query->keys($keys);

        $query->sort('search_api_relevance', 'DESC');
        $results = $query->execute();

        $variables['search'] = array(
            'search' => $search,
            'count'  => $results->getResultCount(),
        );

        foreach ($results as $key => $result) {
            $variables['results'][$key] = array(
                'nid'           => $result->getField('nid')->getValues()[0],
                'title'         => $result->getField('title')->getValues()[0],
                'body'          => $result->getExcerpt(),
                'original_body' => $result->getField('body')->getValues() ? $result->getField('body')->getValues()[0] : ''
            );


            if ($result->getField('type')->getValues()[0]) {
                switch ($result->getField('type')->getValues()[0]) {
                    case 'news':
                        $variables['results'][$key]['type'] = t('Actualités');
                        break;

                    case 'advisor':
                        $variables['results'][$key]['type'] = t('Conseiller');
                        break;

                    case 'product':
                        $variables['results'][$key]['type'] = t('Produit');
                        break;

                    case 'faq':
                        $variables['results'][$key]['type'] = t('Questions-réponses');
                        break;

                    case 'partnership':
                        $variables['results'][$key]['type'] = t('Partenaire');
                        break;

                    case 'offer':
                        $variables['results'][$key]['type'] = t('Coupons Bella Vita');
                        break;

                    case 'management_contracts':
                        $variables['results'][$key]['type'] = t('Mandats de gestion');
                        break;

                    default:
                        $variables['results'][$key]['type'] = $result->getField('type')->getValues()[0];
                        break;
                }
            }
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
