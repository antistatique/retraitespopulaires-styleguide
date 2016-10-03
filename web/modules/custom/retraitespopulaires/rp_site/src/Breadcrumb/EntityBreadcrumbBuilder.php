<?php
/**
* @file
* Contains \Drupal\rp_site\Breadcrumb\NewsBreadcrumbBuilder.
*/

namespace Drupal\rp_site\Breadcrumb;

use Drupal\Core\Breadcrumb\BreadcrumbBuilderInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Routing\LinkGeneratorTrait;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Breadcrumb\Breadcrumb;
use Drupal\Core\Link;
use Drupal\Core\Url;

/**
 * Create breadcrumb for entity page (detail story, detail headlines, detail event)
 * that include the correct views as parent.
 */
class EntityBreadcrumbBuilder implements BreadcrumbBuilderInterface {
    // use StringTranslationTrait;
    // use LinkGeneratorTrait;

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
                t('Actualites'),
                'entity.node.canonical',
                ['node' => $state->get('rp_site.settings.collection.news')['nid']]
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
        return in_array($type, ['news']);
    }
}
