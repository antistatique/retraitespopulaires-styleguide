<?php
/**
* @file
* Contains \Drupal\rp_site\Breadcrumb\NewsBreadcrumbBuilder.
*/

namespace Drupal\rp_site\Breadcrumb;

use Drupal\Core\Breadcrumb\BreadcrumbBuilderInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Breadcrumb\Breadcrumb;
use Drupal\Core\Link;
use Drupal\Core\Url;

/**
 * Create breadcrumb for entity page (detail news)
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
        if ('news' == $type) {
            $links[] = Link::createFromRoute(
                t('Actualités'),
                'entity.node.canonical',
                ['node' => $state->get('rp_site.settings.collection.news')['nid']]
            );
        }

        if ('faq' == $type) {
            $links[] = Link::createFromRoute(
                t('Questions-réponses'),
                'entity.node.canonical',
                ['node' => $state->get('rp_site.settings.collection.faqs')['nid']]
            );
        }

        if ('building' == $type) {
            $links[] = Link::createFromRoute(
                t('Constructions'),
                'entity.node.canonical',
                ['node' => $state->get('rp_site.settings.collection.buildings')['nid']]
            );
        }

        if ('partnership' == $type) {
            $links[] = Link::createFromRoute(
                t('Partenaires'),
                'entity.node.canonical',
                ['node' => $state->get('rp_site.settings.collection.partnerships')['nid']]
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
        return in_array($type, ['news', 'faq', 'building', 'partnership']);
    }
}
