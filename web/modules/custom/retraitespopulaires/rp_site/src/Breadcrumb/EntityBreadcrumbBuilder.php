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
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\template_whisperer\TemplateWhispererManager;
use Drupal\template_whisperer\TemplateWhispererSuggestionUsage;

/**
 * Create breadcrumb for entity page (detail news)
 * that include the correct views as parent.
 */
class EntityBreadcrumbBuilder implements BreadcrumbBuilderInterface {
  use StringTranslationTrait;

    protected $twManager;
    protected $twSuggestionUsage;

    /**
     * Class constructor.
     *
     * @param \Drupal\template_whisperer\TemplateWhispererManager $twManager
     * @param \Drupal\template_whisperer\TemplateWhispererSuggestionUsage $twSuggestionUsage
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
        $links = [ Link::createFromRoute($this->t('Home'), '<front>') ];

        $parent = null;
        switch ($type){
          case 'news':
            $parent = [
              'title' => 'Actualités',
              'suggestion_name' => 'collection_news'
            ];
            break;

          case 'faq':
            $parent = [
              'title' => 'Questions-réponses',
              'suggestion_name' => 'collection_faqs'
            ];
            break;

          case 'building':
            // TODO: Find better way to add this link
            $links[] = Link::createFromRoute(
              $this->t('Immobilier'),
              'entity.node.canonical',
              ['node' => 47]
            );

            $parent = [
              'title' => 'Immobilier',
              'suggestion_name' => 'collection_building'
            ];
            break;

          case 'partnership':
            $parent = [
              'title' => 'Partenaires',
              'suggestion_name' => 'collection_partnership'
            ];
            break;
        }

        if (!empty($parent)){
          $suggestion = $this->twManager->getOneBySuggestion($parent['suggestion_name']);
          $entities = null;
          if ($suggestion) {
            $entities = $this->twSuggestionUsage->listUsage($suggestion);

            if (!empty($entities)) {
              $links[] = Link::createFromRoute(
                $this->t($parent['title']),
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
        return in_array($type, ['news', 'faq', 'building', 'partnership']);
    }
}
