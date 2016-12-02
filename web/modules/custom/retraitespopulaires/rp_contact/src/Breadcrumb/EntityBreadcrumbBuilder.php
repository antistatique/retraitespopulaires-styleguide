<?php
/**
* @file
* Contains \Drupal\rp_contact\Breadcrumb\NewsBreadcrumbBuilder.
*/

namespace Drupal\rp_contact\Breadcrumb;

use Drupal\Core\Breadcrumb\BreadcrumbBuilderInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Breadcrumb\Breadcrumb;
use Drupal\Core\Link;

/**
 * Create breadcrumb for entity page (detail advisor/contact)
 * that include the correct views as parent.
 */
class EntityBreadcrumbBuilder implements BreadcrumbBuilderInterface {
    /**
     * @inheritdoc
     */
    public function applies(RouteMatchInterface $route_match) {
        return 'entity.node.canonical' === $route_match->getRouteName()
            && $route_match->getParameter('node')
            && $this->checkNodeType($route_match->getParameter('node'));
    }

    /**
     * @inheritdoc
     */
    public function build(RouteMatchInterface $route_match) {
        $breadcrumb = new Breadcrumb();
        $breadcrumb->addCacheContexts(['route']);

        $state = \Drupal::state();

        $node = $route_match->getParameter('node');
        $breadcrumb->addCacheTags(array('node:' . $node->id()));

        $type = $node->getType();
        $links = [ Link::createFromRoute(t('Home'), '<front>') ];
        if ('advisor' == $type) {
            $links[] = Link::createFromRoute(
                t('Conseillers'),
                'entity.node.canonical',
                ['node' => $state->get('rp_contact.settings.collection.advisors')['nid']]
            );
        }

        if ('contact' == $type) {
            $links[] = Link::createFromRoute(
                t('Contacts'),
                'entity.node.canonical',
                ['node' => $state->get('rp_contact.settings.collection.contacts')['nid']]
            );
        }

        // We add a text node (without link) with the element title
        $links[] = Link::createFromRoute(
            $node->getTitle(),
            'entity.node.canonical',
            ['node' => $node->nid->value]
        );
        return $breadcrumb->setLinks($links);
    }

    /**
     * Check if we support this node type.
     *
     * @param $node
     *
     * @return bool
     */
    private function checkNodeType($node) {
        $type = $node->getType();
        return in_array($type, ['advisor', 'contact']);
    }
}
