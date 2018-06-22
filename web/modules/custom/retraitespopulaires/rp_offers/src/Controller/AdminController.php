<?php

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
   * Number of news per page.
   *
   * @var int
   */
  private $limit = 20;

  /**
   * EntityTypeManagerInterface to load User.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityOffersRequest;

  /**
   * EntityTypeManagerInterface to load Nodes.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityNode;

  /**
   * Entity_query to query Node's Request.
   *
   * @var \Drupal\Core\Entity\Query\QueryFactory
   */
  private $entityQuery;

  /**
   * Decorator for the URL generator, which bubbles bubbleable URL metadata.
   *
   * @var \Drupal\Core\Render\MetadataBubblingUrlGenerator
   */
  private $url;

  /**
   * Request stack that controls the lifecycle of requests.
   *
   * @var \Symfony\Component\HttpFoundation\RequestStack
   */
  private $requestStack;

  /**
   * Request Custom Service.
   *
   * @var \Drupal\rp_offers\Service\Request
   */
  protected $request;

  /**
   * Class constructor.
   */
  public function __construct(EntityTypeManagerInterface $entity, QueryFactory $query, MetadataBubblingUrlGenerator $url, RequestStack $request_stack, Request $request) {
    $this->entityOffersRequest = $entity->getStorage('rp_offers_request');
    $this->entityNode          = $entity->getStorage('node');
    $this->entityQuery         = $query;
    $this->url                 = $url;
    $this->requestStack        = $request_stack->getMasterRequest();
    $this->request             = $request;
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
    return $this->formBuilder()->getForm('Drupal\rp_offers\Form\AdminForm');
  }

  /**
   * Admin list requests for rp_offers.
   */
  public function requests() {
    $output = [];

    $output['table'] = [
      '#type'    => 'table',
      '#header'  => [
        $this->t('Coupon'),
        $this->t('Participants'),
        $this->t('Date de création'),
        $this->t('Date de fin'),
        $this->t('Jours restants'),
        $this->t('Tirage au sort'),
        $this->t('Operations'),
      ],
    ];

    $query = $this->entityQuery->get('node')
      ->condition('type', 'offer')
      ->condition('status', 1);

    // Pager.
    $nids = $query->execute();
    pager_default_initialize(count($nids), $this->limit);
    $output[] = [
      '#type' => 'pager',
      '#quantity' => '3',
    ];

    $query->sort('created', 'DESC');

    // Paged query.
    $page = pager_find_page();
    $query->range($page * $this->limit, $this->limit);
    $nids = $query->execute();
    $nodes = $this->entityNode->loadMultiple($nids);

    foreach ($nodes as $i => $node) {

      // Get Title.
      $output['table'][$i]['offer'] = [
        '#markup' => '<a href="' . $this->url->generateFromRoute('entity.node.canonical', ['node' => $node->nid->value]) . '" target="_blank">' . $node->title->value . '</a>',
      ];

      // Get requests.
      $requests = $this->entityQuery->get('rp_offers_request')
        ->condition('offer_target_id', $node->nid->value)
        ->count()
        ->execute();
      $output['table'][$i]['participant'] = [
        '#markup' => $this->t('@number participant(s)', ['@number' => $requests]),
      ];

      $dt = new DateTime();
      $dt->setTimestamp($node->created->value);
      $output['table'][$i]['created'] = [
        '#plain_text' => $dt->format('d/m/Y'),
      ];

      $output['table'][$i]['field_date_end'] = [
        '#plain_text' => $node->field_date_end->date->format('d/m/Y'),
      ];

      $dt = new \DateTime('tomorrow');
      $output['table'][$i]['remaining']['#plain_text'] = '-';
      $node->field_date_end->date->setTime(23, 59);
      if ($node->field_date_end->date->getTimestamp() >= $dt->getTimestamp()) {
        $left_days = ($node->field_date_end->date->getTimestamp() - $dt->getTimestamp()) / 86400;

        if ((int) $left_days > 0) {
          $output['table'][$i]['remaining'] = [
            '#plain_text' => $this->t('@day jour(s)', ['@day' => (int) $left_days]),
          ];
        }
        else {
          $output['table'][$i]['remaining'] = [
            '#plain_text' => $this->t('< 1 jour'),
          ];
        }
      }

      $output['table'][$i]['draw']['#plain_text'] = '';
      if (!empty($node->field_draw_at->date)) {
        $output['table'][$i]['draw'] = [
          '#plain_text' => $node->field_draw_at->date->format('d/m/Y'),
        ];
      }

      // Operations.
      $output['table'][$i]['operations'] = [
        '#type' => 'dropbutton',
        '#links' => [],
      ];
      if ($node) {
        $output['table'][$i]['operations']['#links']['detail'] = [
          'title' => $this->t('Détail'),
          'url' => Url::fromRoute('rp_offers.admin.request', ['node' => $node->nid->value]),
        ];
        $output['table'][$i]['operations']['#links']['edit'] = [
          'title' => $this->t('Edit'),
          'url' => Url::fromRoute('entity.node.edit_form', ['node' => $node->nid->value]),
        ];
      }
    }

    return $output;
  }

  /**
   * Admin requests csv.
   */
  public function requestsCsv(Node $node = NULL) {
    $filename = 'Offres Bella vita - Results.csv';

    $response = new StreamedResponse();
    $response->setCallback(function () use ($node) {
      $this->exportStreamedResponse($node, FALSE);
    });

    $response->setStatusCode(200);
    $response->headers->set('Content-Type', 'text/csv; charset=utf-8');
    $response->headers->set('Content-Disposition', 'attachment; filename="' . $filename . '"');

    return $response;
  }

  /**
   * Admin requests winner csv.
   */
  public function requestsWinnerCsv(Node $node = NULL) {
    $filename = 'Offres Bella vita - Gagnants - Results.csv';

    $response = new StreamedResponse();
    $response->setCallback(function () use ($node) {
      $this->exportStreamedResponse($node, TRUE);
    });

    $response->setStatusCode(200);
    $response->headers->set('Content-Type', 'text/csv; charset=utf-8');
    $response->headers->set('Content-Disposition', 'attachment; filename="' . $filename . '"');

    return $response;
  }

  /**
   * Export participant to file.
   */
  private function exportStreamedResponse(Node $node, $winner_only = FALSE) {
    $handle = fopen('php://output', 'w+');

    // Add the header of the CSV file.
    fputcsv($handle, [
      'Demande du',
      'Prénom',
      'Nom de famille',
      'Etat civil',
      'Adresse',
      'Npa',
      'Ville',
      'Coupon',
      'Gagnant',
    ], ';');
    // Query data from database.
    $query = $this->entityQuery->get('rp_offers_request');
    // Add Filter conditions.
    $filter = $this->requestStack->get('filter');
    if (!empty($node)) {
      $query->condition('offer_target_id', $node->nid->value);
    }
    elseif (!empty($filter)) {
      $query->condition('offer_target_id', $filter);
    }

    if ($winner_only) {
      $query->condition('winner', 1);
    }

    $query->sort('winner', 'DESC');

    $ids = $query->execute();
    $requests = $this->entityOffersRequest->loadMultiple($ids);
    // Add the data queried from database.
    foreach ($requests as $request) {
      $dt = new \DateTime();
      $dt->setTimestamp($request->created->value);

      fputcsv(
        $handle,
        // The fields.
        [
          $dt->format('d/m/Y'),
          $request->firstname->value,
          $request->lastname->value,
          $request->civil_state->value,
          $request->address->value,
          $request->zip->value,
          $request->city->value,
          $node->title->value,
          $request->winner->value ? 'X' : '',
        ],
        ';'
      );
    }

    fclose($handle);
  }

  /**
   * Admin request detail.
   */
  public function request(Node $node) {
    $variables = ['node' => $node];

    $variables['search'] = $this->formBuilder()->getForm('Drupal\rp_offers\Form\AdminRequestSearchForm');

    $query = $this->entityQuery->get('rp_offers_request');
    $query->condition('offer_target_id', $node->nid->value);

    // Add Seach conditions from AdminRequestSearchForm.
    $search = $this->requestStack->get('q');
    if (!empty($search)) {
      $group = $query->orConditionGroup()
        ->condition('email', $search, 'CONTAINS')
        ->condition('firstname', $search, 'CONTAINS')
        ->condition('lastname', $search, 'CONTAINS');
      $query->condition($group);
    }

    // Pager.
    $ids = $query->execute();
    $total = count($ids);
    pager_default_initialize(count($ids), $this->limit);
    $variables['pager'] = [
      '#type' => 'pager',
      '#quantity' => '3',
    ];

    $query->sort('winner', 'DESC');

    // Paged query.
    $page = pager_find_page();
    $query->range($page * $this->limit, $this->limit);
    $ids = $query->execute();
    $variables['requests'] = $this->entityOffersRequest->loadMultiple($ids);
    $variables['total'] = $total;

    return [
      '#theme'     => 'rp_offers_admin_request_page',
      '#variables' => $variables,
      '#cache' => [
        'max-age' => 0,
      ],
    ];
  }

  /**
   * Admin request draw.
   */
  public function requestsDraw(Node $node) {
    $tickets = $node->field_available_offers->value;

    // Check if we run draw or not depending number of tickets
    // & already winned tickets.
    $winners = $this->entityQuery->get('rp_offers_request')
      ->condition('offer_target_id', $node->nid->value)
      ->condition('winner', 1)
      ->count()
      ->execute();

    if ($winners < $tickets) {
      $tickets = $tickets - $winners;
      $ids = $this->entityQuery->get('rp_offers_request')
        ->condition('offer_target_id', $node->nid->value)
        ->addTag('random')
        ->range(0, $tickets)
        ->execute();
      ;

      $requests = $this->entityOffersRequest->loadMultiple($ids);

      foreach ($requests as $request) {
        $request->winner->value = 1;
        $request->save();
      }

      // Set the draw date on the node.
      $now = new \DateTime();
      $node->set('field_draw_at', $now->format('Y-m-d\Th:i:s'));
      $node->save();
    }

    drupal_set_message($this->t('Tirage au sort terminée, @winners gagnants sélectionnés.', ['@winners' => $tickets]));

    $response = new RedirectResponse($this->url->generateFromRoute('rp_offers.admin.request', ['node' => $node->nid->value]));
    return $response;
  }

  /**
   * Admin send winning message from draw.
   */
  public function sendDraw(Node $node) {
    // Retrieve winners.
    $ids = $this->entityQuery->get('rp_offers_request')
      ->condition('offer_target_id', $node->nid->value)
      ->condition('winner', 1)
      ->execute();

    if (!empty($ids)) {
      $requests = $this->entityOffersRequest->loadMultiple($ids);
      foreach ($requests as $request) {
        $this->request->winnerEmail($request->email->value);
      }

      // Set the draw date on the node.
      $now = new \DateTime();
      $node->set('field_draw_send_at', $now->format('Y-m-d\Th:i:s'));
      $node->save();

      drupal_set_message($this->t('Envoie aux gagnants du tirage au sort terminée, @winners gagnants sélectionnés.', ['@winners' => count($ids)]));
    }

    $response = new RedirectResponse($this->url->generateFromRoute('rp_offers.admin.request', ['node' => $node->nid->value]));
    return $response;
  }

}
