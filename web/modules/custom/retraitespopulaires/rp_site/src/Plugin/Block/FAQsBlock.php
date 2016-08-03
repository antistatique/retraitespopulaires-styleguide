<?php
/**
* @file
* Contains \Drupal\rp_site\Plugin\Block\FAQsBlock.
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

/**
* Provides a 'FAQs' Block
*
* @Block(
*   id = "rp_site_faqs",
*   admin_label = @Translation("FAQs block"),
* )
*
* Inline example:
* <code>
* load_block('rp_site_faqs_block')
* </code>
*/
class FAQsBlock extends BlockBase implements ContainerFactoryPluginInterface {

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
        $variables = array('faqs' => array());
        //Load the current node's field_faq
        $faqs_nids = array();
        if ($node = $this->route->getParameter('node')) {

            if( isset($node->field_faq) && !$node->field_faq->isEmpty() ){
                // Retrieve specified documents
                foreach ($node->field_faq as $key => $doc) {
                    $faqs_nids[] = $doc->target_id;
                }

                $variables['faqs'] = $this->entity_node->loadMultiple($faqs_nids);
            } else {
                // Retrieve random documents
                $query = $this->entity_query->get('node')
                    ->condition('type', 'faq')
                    ->condition('status', 1)
                    ->condition('field_profession', $node->field_profession->target_id)
                    ->addTag('random')
                    ->range(0, 3);

                $nids = $query->execute();
                $variables['faqs'] = $this->entity_node->loadMultiple($nids);
            }

            // Generate the collection link
            $alias = $this->alias_manager->getAliasByPath('/taxonomy/term/'.$node->field_profession->target_id);
            if( !empty($alias) ){
                $alias = str_replace('/', '', $alias);
            }
            $variables['collection'] = array(
                'name' => $this->profession->name($node->field_profession->target_id),
                'link' => Url::fromRoute('rp_site.faqs.collection', array('taxonomy_term_alias' => $alias))
            );
        }

        return [
            '#theme'     => 'rp_site_faqs_block',
            '#variables' => $variables,
            '#cache' => [
                'contexts' => [
                    'url.path'
                ],
            ]
        ];
    }
}
