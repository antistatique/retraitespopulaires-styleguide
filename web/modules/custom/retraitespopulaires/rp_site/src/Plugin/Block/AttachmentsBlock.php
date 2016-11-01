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
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    private $state;

    /**
    * Class constructor.
    */
    public function __construct(array $configuration, $plugin_id, $plugin_definition, EntityTypeManagerInterface $entity, CurrentRouteMatch $route, AliasManagerInterface $alias_manager, Profession $profession, QueryFactory $query, StateInterface $state) {
        parent::__construct($configuration, $plugin_id, $plugin_definition);
        $this->entity_node   = $entity->getStorage('node');
        $this->route         = $route;
        $this->alias_manager = $alias_manager;
        $this->profession    = $profession;
        $this->entity_query  = $query;
        $this->state         = $state;
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
            $container->get('entity.query'),
            $container->get('state')
        );
    }

    /**
    * {@inheritdoc}
    */
    public function build($params = array()) {
        $variables = array('attachments' => array());

        if ($node = $this->route->getParameter('node')) {
            $variables['theme'] = $this->profession->theme($node->field_profession->target_id);
        }

        $variables['attachments'][] = $this->faqs();
        $variables['attachments'][] = $this->documents();

        return [
            '#theme'     => 'rp_site_attachments_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }

    private function faqs() {
        $variables = array();
        //Load the current node's field_faq
        $faqs_nids = array();
        if ($node = $this->route->getParameter('node')) {
            $variables['title'] = t('');
            $variables['theme'] = $this->profession->theme($node->field_profession->target_id);
            $variables['type'] = 'faqs';
            $variables['links'] = array();

            if( isset($node->field_faq) && !$node->field_faq->isEmpty() ){
                // Retrieve specified faqs
                foreach ($node->field_faq as $key => $doc) {
                    $faqs_nids[] = $doc->target_id;
                }

                $variables['links'] = $this->entity_node->loadMultiple($faqs_nids);
            } else {
                // Retrieve random documents
                $query = $this->entity_query->get('node')
                    ->condition('type', 'faq')
                    ->condition('status', 1)
                    ->condition('field_profession', $node->field_profession->target_id)
                    ->addTag('random')
                    ->range(0, 3);

                $nids = $query->execute();
                $variables['links'] = $this->entity_node->loadMultiple($nids);
            }

            if (isset($node->field_profession->target_id)) {
                // Generate the collection link
                $alias = $this->alias_manager->getAliasByPath('/taxonomy/term/'.$node->field_profession->target_id);
                if( !empty($alias) ){
                    $alias = str_replace('/metier/', '', $alias);
                }
                $variables['collection'] = array(
                    'name' => $this->profession->name($node->field_profession->target_id, 'faq'),
                    'link' => Url::fromRoute('entity.node.canonical', array('node' => $this->state->get('rp_site.settings.collection.faqs')['nid'], 'taxonomy_term_alias' => $alias))
                );
            }
        }

        return $variables;
    }

    private function documents() {
        $variables = array();
        //Load the current node's field_document
        $documents_nids = array();
        if ($node = $this->route->getParameter('node')) {
            $variables['title'] = t('');
            $variables['theme'] = $this->profession->theme($node->field_profession->target_id);
            $variables['type'] = 'documents';
            $variables['links'] = array();

            if( isset($node->field_document) && !$node->field_document->isEmpty() ){
                // Retrieve specified documents
                foreach ($node->field_document as $key => $doc) {
                    $documents_nids[] = $doc->target_id;
                }
                $variables['links'] = $this->entity_node->loadMultiple($documents_nids);
            } else {
                // Retrieve random documents
                $query = $this->entity_query->get('node')
                    ->condition('type', 'document')
                    ->condition('status', 1)
                    ->condition('field_profession', $node->field_profession->target_id)
                    ->addTag('random')
                    ->range(0, 3);

                $nids = $query->execute();
                $variables['links'] = $this->entity_node->loadMultiple($nids);
            }

            if (isset($node->field_profession->target_id)) {
                // Generate the collection link
                $alias = $this->alias_manager->getAliasByPath('/taxonomy/term/'.$node->field_profession->target_id);
                if( !empty($alias) ){
                    $alias = str_replace('/metier/', '', $alias);
                }

                $variables['collection'] = array(
                    'name' => $this->profession->name($node->field_profession->target_id, 'document'),
                    'link' => Url::fromRoute('entity.node.canonical', array('node' => $this->state->get('rp_site.settings.collection.documents')['nid'], 'taxonomy_term_alias' => $alias))
                );
            }
        }

        return $variables;
    }
}
