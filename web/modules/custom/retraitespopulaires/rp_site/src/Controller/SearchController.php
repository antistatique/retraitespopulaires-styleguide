<?php
/**
* @file
* Contains \Drupal\rp_site\Controller\SearchController.
*/

namespace Drupal\rp_site\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\search_api\ParseMode\ParseModePluginManager;
use Symfony\Component\HttpFoundation\RequestStack;
use Drupal\search_api\Entity\Index;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Url;

/**
* SearchController.
*/
class SearchController extends ControllerBase {
    /**
    * Number of result by page
    * @var Integer
    */
    private $limit = 12;

    /**
    * Request stack that controls the lifecycle of requests
    * @var RequestStack
    */
    private $request;

    /**
     * The node Storage.
     *
     * @var \Drupal\node\NodeStorageInterface
     */
    protected $nodeStorage;

    /**
     * The parse mode manager.
     *
     * @var \Drupal\search_api\ParseMode\ParseModePluginManager
     */
    private $parseModeManager;

    /**
    * Class constructor.
    */
    public function __construct(EntityTypeManagerInterface $entity, RequestStack $request, ParseModePluginManager $parse_mode_manager) {
      $this->nodeStorage      = $entity->getStorage('node');
      $this->request          = $request->getMasterRequest();
      $this->parseModeManager = $parse_mode_manager;
    }

    /**
    * {@inheritdoc}
    */
    public static function create(ContainerInterface $container) {
        // Instantiates this form class.
        return new static(
          $container->get('entity_type.manager'),
          $container->get('request_stack'),
          $container->get('plugin.manager.search_api.parse_mode')
        );
    }

    public function search() {
        $variables = array('results' => array(), 'search' => array());

        // Retrieve routes with parameters
        $route = $this->request->attributes->get('_route');
        $params = $this->request->query->all();

        $search = $this->request->query->get('q');
        $type = $this->request->query->get('type');

        if (!empty($search)) {

            /* @var $search_api_index \Drupal\search_api\IndexInterface */
            $search_api_index = Index::load('full_website');

            // Create the query.
            $query = $search_api_index->query([
                'limit'  => $this->limit,
                'offset' => !is_null($this->request->get('page')) ? $this->request->get('page') * $this->limit : 0,
            ]);

            $query->setFulltextFields(['title', 'body', 'filename', 'saa_field_file_document', 'saa_field_file_news', 'saa_field_file_page']);

            $parse_mode = $this->parseModeManager->createInstance('terms');
            $query->setParseMode($parse_mode);
            // $parse_mode->setConjunction('OR');
            $query->keys($search);

            $query->sort('search_api_relevance', 'DESC');

            // Facets
            $server = $search_api_index->getServerInstance();
            if ($server->supportsFeature('search_api_facets')) {
              $query->setOption('search_api_facets', [
                'type' => [
                  'field' => 'type',
                  'limit' => 20,
                  'operator' => 'AND',
                  'min_count' => 1,
                  'missing' => TRUE,
                ],
              ]);
            }

            // Retrieve facets before.
            $query_facets = clone $query;
            $results_facets = $query_facets->execute();
            $facets = $results_facets->getExtraData('search_api_facets', []);

            if (!empty($type)) {
              $query = $query->addCondition('type', $type);
            }
            $results = $query->execute();

            if (isset($facets['type']) && !empty($facets['type'])) {
              foreach ($facets['type'] as $key => $facet) {
                $facets['type'][$key]['filter'] = trim($facet['filter'], '"');
                $facets['type'][$key]['filter_name'] = $this->typeMachineNameToHuman(trim($facet['filter'], '"'));

                $params['type'] = $facets['type'][$key]['filter'];
                $facets['type'][$key]['url'] = Url::fromRoute($route, $params);
              }
            }

            $params = $this->request->query->all();

            $variables['search'] = array(
                'search'    => $search,
                'count'     => $results->getResultCount(),
                'facets'    => $facets,
                'type'      => $type,
                'type_name' => $this->typeMachineNameToHuman($type),
            );

            foreach ($results as $key => $result) {
                $variables['results'][$key] = array(
                    'nid'           => isset($result->getField('nid')->getValues()[0]) ? $result->getField('nid')->getValues()[0] : NULL,
                    'title'         => isset($result->getField('title')->getValues()[0]) ? $result->getField('title')->getValues()[0] : NULL,
                    'body'          => $result->getExcerpt(),
                    'original_body' => isset($result->getField('body')->getValues()[0]) ? $result->getField('body')->getValues()[0] : NULL
                );

                if (isset($result->getField('type')->getValues()[0])) {
                  $label = $this->typeMachineNameToHuman($result->getField('type')->getValues()[0]);

                  $variables['results'][$key]['type'] = $label;
                }
            }

            // Pager
            pager_default_initialize($results->getResultCount(), $this->limit);
            $variables['pager'] = array(
                '#type' => 'pager',
                '#quantity' => '5',
            );

        }

        return [
          '#theme'     => 'rp_site_search_page',
          '#variables' => $variables,
          // Set cache for 0 seconds.
          '#cache' => ['max-age' => 0],
        ];
    }

    private function typeMachineNameToHuman($machine_name) {
      $label = ucfirst($machine_name);

      switch ($machine_name) {
          case 'news':
          $label = t('Actualité');
          break;

          case 'advisor':
          $label = t('Conseiller');
          break;

          case 'product':
          $label = t('Produit');
          break;

          case 'faq':
          $label = t('Question-réponse');
          break;

          case 'partnership':
          $label = t('Partenaire');
          break;

          case 'offer':
          $label = t('Coupons Bella Vita');
          break;

          case 'building':
          $label = t('Construction');
          break;

          case 'managementcontracts':
          case 'management_contracts':
          $label = t('Mandats de gestion');
          break;
      }

      return $label;
    }
}
