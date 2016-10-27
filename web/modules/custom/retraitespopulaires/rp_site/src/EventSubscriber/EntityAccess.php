<?php
namespace Drupal\rp_site\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Url;

class EntityAccess implements EventSubscriberInterface {

    /**
    * {@inheritdoc}
    */
    static function getSubscribedEvents() {
        $events[KernelEvents::REQUEST][] = array('isTaxonomyTerm');
        $events[KernelEvents::REQUEST][] = array('isDocument');
        return $events;
    }

    /**
    * It verify the requested page is a term detail view and shut-it-down
    *
    * @param GetResponseEvent $event
    */
    public function isTaxonomyTerm(GetResponseEvent $event) {
        $route_match = \Drupal::routeMatch();
        $node = $route_match->getParameter('taxonomy_term');
        $route_name = $route_match->getRouteName();
        if ($route_name == 'entity.taxonomy_term.canonical') {
            $dest = Url::fromRoute('<front>')->toString();
            $event->setResponse(RedirectResponse::create($dest));
        }
    }

    /**
    * It verify the requested page is a document detail view and shut-it-down
    *
    * @param GetResponseEvent $event
    */
    public function isDocument(GetResponseEvent $event) {
        $route_match = \Drupal::routeMatch();
        $node = $route_match->getParameter('node');
        $route_name = $route_match->getRouteName();
        if ($route_name == 'entity.node.canonical' && $node && $node->getType() == 'document') {
            $dest = file_create_url($node->field_file_document->entity->uri->value);
            $event->setResponse(RedirectResponse::create($dest));
        }
    }
}
