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
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\template_whisperer\TemplateWhispererSuggestionUsage;
use Drupal\template_whisperer\TemplateWhispererManager;

/**
 * Create breadcrumb for entity page (detail advisor/contact)
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

        switch ($type) {
          case 'advisor':
            $parent = [
              'title' => $this->t('Conseillers'),
              'suggestion_name' => 'collection_advisor',
            ];
            break;

          case 'contact':
            $parent = [
              'title' => $this->t('Contacts'),
              'suggestion_name' => 'collection_contact',
            ];
            break;
        }

        if (!empty($parent)) {
          $suggestion = $this->twManager->getOneBySuggestion($parent['suggestion_name']);
          $entities = NULL;
          if ($suggestion) {
            $entities = $this->twSuggestionUsage->listUsage($suggestion);

            if (!empty($entities)) {
              $links[] = Link::createFromRoute(
                $parent['title'],
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
        return in_array($type, ['advisor', 'contact']);
    }
}
