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

        $output['download'] = array(
            '#markup' => '<a class="button button-action button--primary button--small" href="'.$this->url->generateFromRoute('rp_offers.admin.requests.csv').'" target="_blank">'.t('Download').'</a>',
        );

        $output['filter'] = \Drupal::formBuilder()->getForm('Drupal\rp_offers\Form\\AdminFilterRequestsForm');

        $output['table'] = array(
            '#type'    => 'table',
            '#header'  => array(t('Date de participations'), t('Informations'), t('Coupon'), t('Operations')),
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
              . '<br/><a href="mailto:'.$request->email->value.'">' . strtolower($request->email->value) .'</a>'
              . '<br/>' . ucfirst($request->address->value)
              . '<br/>' . $request->zip->value . ' ' . $request->city->value,
            );

            $output['table'][$i]['offer'] = array(
              '#markup' => '<a href="'.$this->url->generateFromRoute('entity.node.canonical', ['node' => $node->nid->value]).'" target="_blank">'.$node->title->value.'</a>',
            );

            // Operations
            $output['table'][$i]['operations'] = array(
              '#type' => 'dropbutton',
              '#links' => array(),
            );
            $output['table'][$i]['operations']['#links']['detail'] = array(
              'title' => t('Détail'),
              'url' => Url::fromRoute('rp_offers.admin.request', ['node' => $node->nid->value]),
            );
            $output['table'][$i]['operations']['#links']['edit'] = array(
              'title' => t('Edit'),
              'url' => Url::fromRoute('entity.node.edit_form', ['node' => $node->nid->value]),
            );
        }

        return $output;
    }

    /**
    * Admin requests csv.
    */
    public function requestsCsv(Node $node = null) {
        $filename = 'Offres Bella vita - Results.csv';

        $response = new StreamedResponse();
        $response->setCallback(function() {
            $handle = fopen('php://output', 'w+');

            // Add the header of the CSV file
            fputcsv($handle, array('Demande du', 'Prénom', 'Nom de famille', 'Adresse', 'Npa', 'Ville', 'Coupon', 'Gagnant'), ';');
            // Query data from database
            $query = $this->entity_query->get('rp_offers_request');
            // Add Filter conditions
            $filter = $this->request->get('filter');
            if (!empty($node)) {
                $query->condition('offer_target_id', $node->nid->value);
            }else if (!empty($filter)) {
                $query->condition('offer_target_id', $filter);
            }

            $query->sort('winner', 'DESC');

            $ids = $query->execute();
            $requests = $this->entity_offers_request->loadMultiple($ids);
            // Add the data queried from database
            foreach ($requests as $key => $request) {
                $dt = new \DateTime();
                $dt->setTimestamp($request->created->value);

                $node = $this->entity_node->load($request->offer_target_id->entity->nid->value);

                fputcsv(
                    $handle,
                    // The fields
                    array(
                        $dt->format('d/m/Y'),
                        $request->firstname->value,
                        $request->lastname->value,
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
        });

        $response->setStatusCode(200);
        $response->headers->set('Content-Type', 'text/csv; charset=utf-8');
        $response->headers->set('Content-Disposition', 'attachment; filename="'.$filename.'"');

        return $response;
    }

    /**
    * Admin request detail.
    */
    public function request(Node $node) {
        $variables = array('node' => $node);

        $query = $this->entity_query->get('rp_offers_request');
        $query->condition('offer_target_id', $node->nid->value);

        // Pager
        $ids = $query->execute();
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
        }

        drupal_set_message(t('Tirage au sort terminée, @winners gagnants sélectionnés.', ['@winners' => $tickets]));

        $response = new RedirectResponse(\Drupal::url('rp_offers.admin.request', ['node' => $node->nid->value]));
        return $response;
    }
}
