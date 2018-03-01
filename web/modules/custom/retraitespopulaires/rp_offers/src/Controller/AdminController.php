<?php
/**
* @file
* Contains \Drupal\rp_offers\Controller\AdminController.
*/

namespace Drupal\rp_offers\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\node\Entity\Node;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;

use Symfony\Component\HttpFoundation\StreamedResponse;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\Core\Render\MetadataBubblingUrlGenerator;
use Symfony\Component\HttpFoundation\RequestStack;
use Drupal\rp_offers\Service\Request;

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
    private $request_stack;

    /**
     * Request Custom Service
     * @var Request
     */
    protected $request;

    /**
    * Class constructor.
    */
    public function __construct(EntityTypeManagerInterface $entity, QueryFactory $query, MetadataBubblingUrlGenerator $url, RequestStack $request_stack, Request $request) {
        $this->entity_offers_request = $entity->getStorage('rp_offers_request');
        $this->entity_node           = $entity->getStorage('node');
        $this->entity_query          = $query;
        $this->url                   = $url;
        $this->request_stack         = $request_stack->getMasterRequest();
        $this->request               = $request;
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
        $container->get('request_stack'),
        $container->get('rp_offers.request')
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

        $output['table'] = array(
            '#type'    => 'table',
            '#header'  => array(t('Coupon'), t('Participants'), t('Date de création'), t('Date de fin'), t('Jours restants'), t('Tirage au sort'), t('Operations')),
        );

        $query = $this->entity_query->get('node')
            ->condition('type', 'offer')
            ->condition('status', 1)
        ;

        // Pager
        $nids = $query->execute();
        pager_default_initialize(count($nids), $this->limit);
        $output[] = array(
            '#type' => 'pager',
            '#quantity' => '3',
        );

        $query->sort('created', 'DESC');

        // Paged query
        $page = pager_find_page();
        $query->range($page*$this->limit, $this->limit);
        $nids = $query->execute();
        $nodes = $this->entity_node->loadMultiple($nids);

        foreach ($nodes as $i => $node) {

            // Get Title
            $output['table'][$i]['offer'] = array(
              '#markup' => '<a href="'.$this->url->generateFromRoute('entity.node.canonical', ['node' => $node->nid->value]).'" target="_blank">'.$node->title->value.'</a>',
            );

            // Get requests
            $requests = $this->entity_query->get('rp_offers_request')
                ->condition('offer_target_id', $node->nid->value)
                ->count()
                ->execute()
            ;
            $output['table'][$i]['participant'] = array(
              '#markup' => t('@number participant(s)', ['@number' => $requests]),
            );

            $dt = new \DateTime();
            $dt->setTimestamp($node->created->value);
            $output['table'][$i]['created'] = array(
              '#plain_text' => $dt->format('d/m/Y'),
            );

            $output['table'][$i]['field_date_end'] = array(
              '#plain_text' => $node->field_date_end->date->format('d/m/Y'),
            );

            $dt = new \DateTime('tomorrow');
            $output['table'][$i]['remaining']['#plain_text'] = '-';
            $node->field_date_end->date->setTime(23,59);
            if ($node->field_date_end->date->getTimestamp() >= $dt->getTimestamp()) {
                $left_days = ($node->field_date_end->date->getTimestamp() - $dt->getTimestamp()) / 86400;

                if ((int)$left_days > 0) {
                    $output['table'][$i]['remaining'] = array(
                      '#plain_text' => t('@day jour(s)', ['@day' =>(int)$left_days]),
                    );
                } else {
                    $output['table'][$i]['remaining'] = array(
                      '#plain_text' => t('< 1 jour'),
                    );
                }
            }

            $output['table'][$i]['draw']['#plain_text'] = '';
            if (!empty($node->field_draw_at->date)) {
                $output['table'][$i]['draw'] = array(
                    '#plain_text' => $node->field_draw_at->date->format('d/m/Y'),
                );
            }

            // Operations
            $output['table'][$i]['operations'] = array(
              '#type' => 'dropbutton',
              '#links' => array(),
            );
            if ($node) {
                $output['table'][$i]['operations']['#links']['detail'] = array(
                  'title' => t('Détail'),
                  'url' => Url::fromRoute('rp_offers.admin.request', ['node' => $node->nid->value]),
                );
                $output['table'][$i]['operations']['#links']['edit'] = array(
                  'title' => t('Edit'),
                  'url' => Url::fromRoute('entity.node.edit_form', ['node' => $node->nid->value]),
                );
            }
        }

        return $output;
    }

    /**
    * Admin requests csv.
    */
    public function requestsCsv(Node $node = null) {
        $filename = 'Offres Bella vita - Results.csv';

        $response = new StreamedResponse();
        $response->setCallback(function() use ($node) {
            $this->exportStreamedResponse($node, false);
        });

        $response->setStatusCode(200);
        $response->headers->set('Content-Type', 'text/csv; charset=utf-8');
        $response->headers->set('Content-Disposition', 'attachment; filename="'.$filename.'"');

        return $response;
    }

    /**
    * Admin requests winner csv.
    */
    public function requestsWinnerCsv(Node $node = null) {
        $filename = 'Offres Bella vita - Gagnants - Results.csv';

        $response = new StreamedResponse();
        $response->setCallback(function() use ($node) {
            $this->exportStreamedResponse($node, true);
        });

        $response->setStatusCode(200);
        $response->headers->set('Content-Type', 'text/csv; charset=utf-8');
        $response->headers->set('Content-Disposition', 'attachment; filename="'.$filename.'"');

        return $response;
    }

    private function exportStreamedResponse(Node $node, $winner_only = false) {
        $handle = fopen('php://output', 'w+');

        // Add the header of the CSV file
        fputcsv($handle, array('Demande du', 'Prénom', 'Nom de famille', 'Etat civil', 'Adresse', 'Npa', 'Ville', 'Coupon', 'Gagnant'), ';');
        // Query data from database
        $query = $this->entity_query->get('rp_offers_request');
        // Add Filter conditions
        $filter = $this->request_stack->get('filter');
        if (!empty($node)) {
            $query->condition('offer_target_id', $node->nid->value);
        }else if (!empty($filter)) {
            $query->condition('offer_target_id', $filter);
        }

        if ($winner_only) {
            $query->condition('winner', 1);
        }

        $query->sort('winner', 'DESC');

        $ids = $query->execute();
        $requests = $this->entity_offers_request->loadMultiple($ids);
        // Add the data queried from database
        foreach ($requests as $key => $request) {
            $dt = new \DateTime();
            $dt->setTimestamp($request->created->value);

            fputcsv(
                $handle,
                // The fields
                array(
                    $dt->format('d/m/Y'),
                    $request->firstname->value,
                    $request->lastname->value,
                    $request->civil_state->value,
                    $request->address->value,
                    $request->zip->value,
                    $request->city->value,
                    $node->title->value,
                    $request->winner->value ? 'X' : '',
                ),
                ';'
            );
        }

        fclose($handle);
    }

    /**
    * Admin request detail.
    */
    public function request(Node $node) {
        $variables = array('node' => $node);

        $variables['search'] = \Drupal::formBuilder()->getForm('Drupal\rp_offers\Form\AdminRequestSearchForm');

        $query = $this->entity_query->get('rp_offers_request');
        $query->condition('offer_target_id', $node->nid->value);

        // Add Seach conditions from AdminRequestSearchForm
        $search = $this->request_stack->get('q');
        if (!empty($search)) {
            $group = $query->orConditionGroup()
                ->condition('email', $search, 'CONTAINS')
                ->condition('firstname', $search, 'CONTAINS')
                ->condition('lastname', $search, 'CONTAINS')
            ;
            $query->condition($group);
        }

        // Pager
        $ids = $query->execute();
        $total = count($ids);
        pager_default_initialize(count($ids), $this->limit);
        $variables['pager'] = array(
            '#type' => 'pager',
            '#quantity' => '3',
        );

        $query->sort('winner', 'DESC');

        // Paged query
        $page = pager_find_page();
        $query->range($page*$this->limit, $this->limit);
        $ids = $query->execute();
        $variables['requests'] = $this->entity_offers_request->loadMultiple($ids);
        $variables['total'] = $total;

        return [
            '#theme'     => 'rp_offers_admin_request_page',
            '#variables' => $variables,
            '#cache' => [
                'max-age' => 0,
            ]
        ];
    }

    /**
    * Admin request draw.
    */
    public function requestsDraw(Node $node) {
        $tickets = $node->field_available_offers->value;

        // Check if we run draw or not depending number of tickets & already winned tickets
        $winners = $this->entity_query->get('rp_offers_request')
            ->condition('offer_target_id', $node->nid->value)
            ->condition('winner', 1)
            ->count()
            ->execute()
        ;

        if ($winners < $tickets) {
            $tickets = $tickets - $winners;
            $ids = $this->entity_query->get('rp_offers_request')
                ->condition('offer_target_id', $node->nid->value)
                ->addTag('random')
                ->range(0, $tickets)
                ->execute();
            ;

            $requests = $this->entity_offers_request->loadMultiple($ids);

            foreach ($requests as $request) {
                $request->winner->value = 1;
                $request->save();
            }

            // Set the draw date on the node
            $now = new \DateTime();
            $node->set('field_draw_at', $now->format('Y-m-d\Th:i:s'));
            $node->save();
        }

        drupal_set_message(t('Tirage au sort terminée, @winners gagnants sélectionnés.', ['@winners' => $tickets]));

        $response = new RedirectResponse(\Drupal::url('rp_offers.admin.request', ['node' => $node->nid->value]));
        return $response;
    }

    /**
    * Admin send winning message from draw.
    */
    public function sendDraw(Node $node) {
        // Retrieve winners
        $ids = $this->entity_query->get('rp_offers_request')
            ->condition('offer_target_id', $node->nid->value)
            ->condition('winner', 1)
            ->execute()
        ;

        if (!empty($ids)) {
            $requests = $this->entity_offers_request->loadMultiple($ids);
            foreach ($requests as $request) {
                $this->request->WinnerEmail($request->email->value);
            }

            // Set the draw date on the node
            $now = new \DateTime();
            $node->set('field_draw_send_at', $now->format('Y-m-d\Th:i:s'));
            $node->save();

            drupal_set_message(t('Envoie aux gagnants du tirage au sort terminée, @winners gagnants sélectionnés.', ['@winners' => count($ids)]));
        }

        $response = new RedirectResponse(\Drupal::url('rp_offers.admin.request', ['node' => $node->nid->value]));
        return $response;
    }
}
