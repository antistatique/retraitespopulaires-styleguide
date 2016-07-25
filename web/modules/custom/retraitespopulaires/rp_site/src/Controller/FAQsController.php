<?php
/**
* @file
* Contains \Drupal\rp_site\Controller\FAQsController.
*/

namespace Drupal\rp_site\Controller;


use Drupal\node\NodeInterface;
use Drupal\node\Entity\Node;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManager;
use Drupal\Core\Path\AliasManager;
use Drupal\Core\Entity\Query\QueryFactory;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

/**
* FAQsController.
*/
class FAQsController extends ControllerBase{

    /**
     * AliasManager Service
     * @var AliasManager
     */
    private $alias_manager;

    /**
    * EntityTypeManager to load Nodes
    * @var EntityTypeManager
    */
    private $entity_node;

    /**
    * entity_query to query Node's Contest
    * @var QueryFactory
    */
    private $entity_query;

    /**
     * Class constructor.
     */
     public function __construct(AliasManager $alias_manager, EntityTypeManager $entity, QueryFactory $query) {
         $this->alias_manager = $alias_manager;
         $this->entity_node   = $entity->getStorage('node');
         $this->entity_query  = $query;
     }

     /**
      * {@inheritdoc}
      */
     public static function create(ContainerInterface $container) {
        return new static(
            // Load customs services used in this class.
            $container->get('path.alias_manager'),
            $container->get('entity_type.manager'),
            $container->get('entity.query')
        );
     }

    /**
     * Force download of FAQ File
     * @method download
     * @param  Integer   $nid [FAQ ID to download file]
     * @return BinaryFileResponse [file stream]
     */
    public function collection($taxonomy_term_alias) {
        $query = $this->entity_query->get('node')
            ->condition('type', 'faq')
            ->condition('status', 1)
            ->sort('title', 'DESC');

        // Retreive identifier from slug alias
        $taxonomy_term_tid = null;
        $taxonomy_term_url = $this->alias_manager->getPathByAlias('/'.$taxonomy_term_alias);
        if( !empty($taxonomy_term_url) ){
            $taxonomy_term_tid = str_replace('/taxonomy/term/', '', $taxonomy_term_url);
            $query->condition('field_profession', $taxonomy_term_tid);
        }

        $nids = $query->execute();
        $variables['faqs'] = $this->entity_node->loadMultiple($nids);

        return [
            '#theme'     => 'rp_site_faqs_page',
            '#variables' => $variables,
        ];
    }
}
