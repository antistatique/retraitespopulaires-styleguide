<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\AttachmentsBlock.
*/

namespace Drupal\rp_site\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Url;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\rp_site\Service\Profession;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\Core\State\StateInterface;

/**
* Provides a 'Attachments' Block
*
* @Block(
*   id = "rp_site_attachments_block",
*   admin_label = @Translation("Attachments block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_attachments_block')
* </code>
*/
class AttachmentsBlock extends BlockBase implements ContainerFactoryPluginInterface {

    /**
    * EntityTypeManagerInterface to load Nodes
    * @var EntityTypeManagerInterface
    */
    private $entity_node;

    /**
    * Current Route
    * @var CurrentRouteMatch
    */
    private $route;

    /**
     * AliasManagerInterface Service
     * @var AliasManagerInterface
     */
    private $alias_manager;

    /**
     * Profession Service
     * @var Profession
     */
    private $profession;


    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, CurrentRouteMatch $route, AliasManagerInterface $alias_manager, Profession $profession, QueryFactory $query) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_node   = $entity->getStorage('node');
        $this->route         = $route;
        $this->alias_manager = $alias_manager;
        $this->profession    = $profession;
        $this->entity_query  = $query;
    }

    /**
    * {@inheritdoc}
    */
    public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
        // Instantiates this form class.
        return new static(
            // Load the service required to construct this class.
            $configuration,
            $plugin_id,
            $plugin_definition,
            // Load customs services used in this class.
            $container->get('entity_type.manager'),
            $container->get('current_route_match'),
            $container->get('path.alias_manager'),
            $container->get('rp_site.profession'),
            $container->get('entity.query')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('attachments' => array());
        $theme_tid = null;

        if (isset($params['theme']) & !empty($params['theme'])) {
            $variables['theme'] = $params['theme'];
            $theme_tid = $this->profession->theme_by_name($params['theme']);
        }

        $node = $this->route->getParameter('node');
        if (isset($node->field_profession->target_id)) {
            $variables['theme'] = $this->profession->theme($node->field_profession->target_id);
            $theme_tid = $node->field_profession->target_id;
        }

        $variables['attachments'][] = $this->faqs($theme_tid);
        $variables['attachments'][] = $this->documents($theme_tid);

        return [
            '#theme'     => 'rp_site_attachments_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
                'tags' => [
                    'node_list:faq', // invalidated whenever any Node entity is updated, deleted or created
                    'node_list:document', // invalidated whenever any Node entity is updated, deleted or created
                ],
            ]
        ];
    }

    private function faqs($theme_tid = null) {
        $variables = array();

        if (!empty($theme_tid)) {
            $variables['theme'] = $this->profession->theme($theme_tid);
        }

        //Load the current node's field_faq
        $faqs_nids = array();
        if ($node = $this->route->getParameter('node')) {
            $variables['title'] = t('');
            if (isset($node->field_profession->target_id)) {
                $variables['theme'] = $this->profession->theme($node->field_profession->target_id);
                $theme_tid = $node->field_profession->target_id;
            }
            $variables['type'] = 'faqs';
            $variables['links'] = array();

            if (isset($node->field_faq) && !$node->field_faq->isEmpty()) {
                // Retrieve specified faqs
                foreach ($node->field_faq as $key => $doc) {
                    $faqs_nids[] = $doc->target_id;
                }

                $variables['links'] = $this->entity_node->loadMultiple($faqs_nids);

                // Remove linked in admin but unpublished faq
                foreach ($variables['links'] as $key => $link) {
                    if (!$link->isPublished()) {
                        unset($variables['links'][$key]);
                    }
                }
            } elseif (
                (isset($node->field_faq_random) && !$node->field_faq_random->value)
                || !isset($node->field_faq_random)
            ) {
                // Check if we want to disable the FAQ random

                // Retrieve random documents
                $query = $this->entity_query->get('node')
                    ->condition('type', 'faq')
                    ->condition('status', 1)
                    ->addTag('random')
                    ->range(0, 3)
                ;

                if (!empty($theme_tid)) {
                    $query->condition('field_profession', $theme_tid);
                }

                $nids = $query->execute();
                $variables['links'] = $this->entity_node->loadMultiple($nids);
            }

            if (!empty($theme_tid)) {
                // Generate the collection link
                $alias = $this->alias_manager->getAliasByPath('/taxonomy/term/'.$theme_tid);
                if (!empty($alias) ) {
                    $alias = str_replace('/metier/', '', $alias);
                }
                $variables['collection'] = array(
                    'name' => $this->profession->name($theme_tid, 'faq'),
                    'alias' => $alias,
                );
            }
        }

        return $variables;
    }

    private function documents($theme_tid = null) {
        $variables = array();

        if (!empty($theme_tid)) {
            $variables['theme'] = $this->profession->theme($theme_tid);
        }

        //Load the current node's field_document
        $documents_nids = array();
        if ($node = $this->route->getParameter('node')) {
            $variables['title'] = t('');
            if (isset($node->field_profession->target_id)) {
                $variables['theme'] = $this->profession->theme($node->field_profession->target_id);
                $theme_tid = $node->field_profession->target_id;
            }
            $variables['type'] = 'documents';
            $variables['links'] = array();

            if (isset($node->field_document) && !$node->field_document->isEmpty()) {
                // Retrieve specified documents
                foreach ($node->field_document as $key => $doc) {
                    $documents_nids[] = $doc->target_id;
                }
                $variables['links'] = $this->entity_node->loadMultiple($documents_nids);

                // Remove linked in admin but unpublished faq
                foreach ($variables['links'] as $key => $link) {
                    if (!$link->isPublished()) {
                        unset($variables['links'][$key]);
                    }
                }
            } elseif (
                (isset($node->field_document_random) && !$node->field_document_random->value)
                || !isset($node->field_faq_random)
            ) {
                // Check if we want to disable the documents random

                // Retrieve random documents
                $query = $this->entity_query->get('node')
                    ->condition('type', 'document')
                    ->condition('status', 1)
                    ->addTag('random')
                    ->range(0, 3)
                ;

                if (!empty($theme_tid)) {
                    $query->condition('field_profession', $theme_tid);
                }

                $nids = $query->execute();
                $variables['links'] = $this->entity_node->loadMultiple($nids);
            }

            if (!empty($theme_tid)) {
                // Generate the collection link
                $alias = $this->alias_manager->getAliasByPath('/taxonomy/term/'.$theme_tid);
                if( !empty($alias) ){
                    $alias = str_replace('/metier/', '', $alias);
                }

                $variables['collection'] = array(
                    'name' => $this->profession->name($theme_tid, 'document'),
                    'alias' => $alias,
                );
            }
        }

        return $variables;
    }
}
