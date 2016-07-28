<?php
/**
* @file
* Contains \Drupal\rp_site\Controller\NewsController.
*/

namespace Drupal\rp_site\Controller;


use Drupal\node\NodeInterface;
use Drupal\node\Entity\Node;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
/**
* NewsController.
*/
class NewsController extends ControllerBase{

    /**
     * AliasManagerInterface Service
     * @var AliasManagerInterface
     */
    private $alias_manager;

    /**
    * EntityTypeManagerInterface to load Nodes
    * @var EntityTypeManagerInterface
    */
    private $entity_node;

    /**
    * EntityTypeManagerInterface to load Taxonomy
    * @var EntityTypeManagerInterface
    */
    private $entity_taxonomy;

    /**
    * entity_query to query Node's Contest
    * @var QueryFactory
    */
    private $entity_query;

    /**
     * Class constructor.
     */
     public function __construct(AliasManagerInterface $alias_manager, EntityTypeManagerInterface $entity, QueryFactory $query) {
         $this->alias_manager   = $alias_manager;
         $this->entity_node     = $entity->getStorage('node');
         $this->entity_taxonomy = $entity->getStorage('taxonomy_term');
         $this->entity_query    = $query;
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
     * Force download of Document File
     * @method download
     * @param  Integer   $nid [Document ID to download file]
     * @return BinaryFileResponse [file stream]
     */
    public function collection($taxonomy_term_alias) {
        $now = date('Y-m-d h:i:s');

        $query = $this->entity_query->get('node')
            ->condition('type', 'news')
            ->condition('status', 1)
            ->condition('field_date', $now, '<=')
            ->sort('field_date', 'DESC');

        // Retreive filter from slug alias
        $taxonomy_term_tid = null;
        $taxonomy_term_url = $this->alias_manager->getPathByAlias('/'.$taxonomy_term_alias);
        if( !empty($taxonomy_term_url) ){
            $taxonomy_term_tid = str_replace('/taxonomy/term/', '', $taxonomy_term_url);
            $term = $this->entity_taxonomy->load($taxonomy_term_tid);
            if ($term->vid->target_id == 'profession') {
                $query->condition('field_profession', $taxonomy_term_tid);
            } elseif ($term->vid->target_id == 'category_news') {
                $query->condition('field_news_type', $taxonomy_term_tid);
            }
        }

        $nids = $query->execute();
        $variables['news'] = $this->entity_node->loadMultiple($nids);

        return [
            '#theme'     => 'rp_site_news_page',
            '#variables' => $variables,
        ];
    }
}
