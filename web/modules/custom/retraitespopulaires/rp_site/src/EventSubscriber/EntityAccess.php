<?php

namespace Drupal\rp_site\EventSubscriber;

use Drupal\Core\Routing\RouteMatchInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Url;

/**
 * Entity Access class.
 */
class EntityAccess implements EventSubscriberInterface {

  /**
   * The current route match.
   *
   * @var \Drupal\Core\Routing\RouteMatchInterface
   */
  private $routeMatch;

  /**
   * Class constructor.
   */
  public function __construct(RouteMatchInterface $routeMatch) {
    $this->routeMatch = $routeMatch;
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events[KernelEvents::REQUEST][] = ['isTaxonomyTerm'];
    $events[KernelEvents::REQUEST][] = ['isDocument'];
    return $events;
  }

  /**
   * It verify the requested page is a term detail view and shut-it-down.
   *
   * @param \Symfony\Component\HttpKernel\Event\GetResponseEvent $event
   *   Current event.
   */
  public function isTaxonomyTerm(GetResponseEvent $event) {
    $route_name = $this->routeMatch->getRouteName();
    if ($route_name == 'entity.taxonomy_term.canonical') {
      $dest = Url::fromRoute('<front>')->toString();
      $event->setResponse(RedirectResponse::create($dest));
    }
  }

  /**
   * It verify the requested page is a document detail view and shut-it-down.
   *
   * @param \Symfony\Component\HttpKernel\Event\GetResponseEvent $event
   *   Current event.
   */
  public function isDocument(GetResponseEvent $event) {
    $node = $this->routeMatch->getParameter('node');
    $route_name = $this->routeMatch->getRouteName();
    if ($route_name == 'entity.node.canonical' && $node && $node->getType() == 'document') {
      $dest = file_create_url($node->field_file_document->entity->uri->value);
      $event->setResponse(RedirectResponse::create($dest));
    }
  }

}
