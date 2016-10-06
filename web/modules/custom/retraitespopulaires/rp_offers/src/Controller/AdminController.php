<?php
/**
* @file
* Contains \Drupal\rp_offers\Controller\AdminController.
*/

namespace Drupal\rp_offers\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\Core\Render\MetadataBubblingUrlGenerator;
use \Symfony\Component\HttpFoundation\RequestStack;

/**
* AdminController.
*/
class AdminController extends ControllerBase {

    /**
     * Number of news per page
     * @var integer
     */
    private $limit = 20;

    /**
    * EntityTypeManagerInterface to load User
    * @var EntityTypeManagerInterface
    */
    private $entity_offers_request;

    /**
    * EntityTypeManagerInterface to load Nodes
    * @var EntityTypeManagerInterface
    */
    private $entity_node;

    /**
    * entity_query to query Node's Request
    * @var QueryFactory
    */
    private $entity_query;

    /**
    * Decorator for the URL generator, which bubbles bubbleable URL metadata
    * @var MetadataBubblingUrlGenerator
    */
    private $url;

    /**
    * Request stack that controls the lifecycle of requests
    * @var RequestStack
    */
    private $request;

    /**
    * Class constructor.
    */
    public function __construct(EntityTypeManagerInterface $entity, QueryFactory $query, MetadataBubblingUrlGenerator $url, RequestStack $request) {
        $this->entity_offers_request = $entity->getStorage('rp_offers_request');
        $this->entity_node           = $entity->getStorage('node');
        $this->entity_query          = $query;
        $this->url                   = $url;
        $this->request               = $request->getMasterRequest();
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container) {
      // Instantiates this form class.
      return new static(
        // Load the service required to construct this class.
        $container->get('entity_type.manager'),
        $container->get('entity.query'),
        $container->get('url_generator'),
        $container->get('request_stack')
      );
    }

    /**
    * Admin settings for rp_offers.
    */
    public function settings() {
        return \Drupal::formBuilder()->getForm('Drupal\rp_offers\Form\AdminForm');
    }

    /**
    * Admin list requests for rp_offers.
    */
    public function requests() {
        $output = array();

        $output['filter'] = \Drupal::formBuilder()->getForm('Drupal\rp_offers\Form\\AdminFilterRequestsForm');

        $output['table'] = array(
            '#type'    => 'table',
            '#header'  => array(t('Demande du'), t('Informations'), t('Coupon')),
        );

        $query = $this->entity_query->get('rp_offers_request');

        // Add Filter conditions
        $filter = $this->request->get('filter');
        if (!empty($filter)) {
            $query->condition('offer_target_id', $filter);
        }

        // Pager
        $ids = $query->execute();
        pager_default_initialize(count($ids), $this->limit);
        $output[] = array(
            '#type' => 'pager',
            '#quantity' => '3',
        );

        // Paged query
        $page = pager_find_page();
        $query->range($page*$this->limit, $this->limit);
        $ids = $query->execute();
        $requests = $this->entity_offers_request->loadMultiple($ids);

        foreach ($requests as $i => $request) {
            $node = $this->entity_node->load($request->offer_target_id->entity->nid->value);

            $dt = new \DateTime();
            $dt->setTimestamp($request->created->value);
            $output['table'][$i]['date'] = array(
              '#plain_text' => $dt->format('d/m/Y'),
            );

            $output['table'][$i]['info'] = array(
              '#markup' => ucfirst($request->firstname->value) .' · <strong>'. $request->lastname->value . '</strong>'
              . '<br/>' . ucfirst($request->address->value)
              . '<br/>' . $request->zip->value . ' ' . $request->city->value,
            );

            $output['table'][$i]['offer'] = array(
              '#markup' => '<a href="'.$this->url->generateFromRoute('entity.node.canonical', ['node' => $node->nid->value]).'" target="_blank">'.$node->title->value.'</a>',
            );
        }

        return $output;
    }

}
