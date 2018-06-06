<?php
/**
* @file
* Contains \Drupal\rp_offers\Breadcrumb\NewsBreadcrumbBuilder.
*/

namespace Drupal\rp_offers\Breadcrumb;

use Drupal\Core\Breadcrumb\BreadcrumbBuilderInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Breadcrumb\Breadcrumb;
use Drupal\Core\Link;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\template_whisperer\TemplateWhispererManager;
use Drupal\template_whisperer\TemplateWhispererSuggestionUsage;

/**
 * Create breadcrumb for entity page (detail offer)
 * that include the correct views as parent.
 */
class EntityBreadcrumbBuilder implements BreadcrumbBuilderInterface {
    use StringTranslationTrait;

    /**
     * The Template Whisperer manager.
     *
     * @var \Drupal\template_whisperer\TemplateWhispererManager
     */
    protected $twManager;

    /**
     * The Template Whisperer suggestion usage.
     *
     * @var \Drupal\template_whisperer\TemplateWhispererSuggestionUsage
     */
    protected $twSuggestionUsage;

    /**
     * Class constructor.
     *
     * @param \Drupal\template_whisperer\TemplateWhispererManager $twManager
     *   The Template Whisperer manager.
     * @param \Drupal\template_whisperer\TemplateWhispererSuggestionUsage $twSuggestionUsage
     *   The Template Whisperer suggestion usage.
     */
    public function __construct(TemplateWhispererManager $twManager, TemplateWhispererSuggestionUsage $twSuggestionUsage) {
      $this->twManager = $twManager;
      $this->twSuggestionUsage = $twSuggestionUsage;
    }

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

        $node = $route_match->getParameter('node');
        $breadcrumb->addCacheTags(array('node:' . $node->id()));

        $type = $node->getType();
        $links = [ Link::createFromRoute(t('Home'), '<front>') ];
        if ('offer' == $type) {
          $suggestion = $this->twManager->getOneBySuggestion('collection_offers');
          $entities = null;
          if ($suggestion) {
            $entities = $this->twSuggestionUsage->listUsage($suggestion);

            if (!empty($entities)) {
              $links[] = Link::createFromRoute(
                $this->t('Vos offres Bella vita'),
                'entity.node.canonical',
                ['node' => $entities[0]->id]
              );
            }
          }
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
        return in_array($type, ['offer']);
    }
}
