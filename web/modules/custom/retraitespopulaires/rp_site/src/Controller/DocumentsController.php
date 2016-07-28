<?php
/**
* @file
* Contains \Drupal\rp_site\Controller\DocumentsController.
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
* DocumentsController.
*/
class DocumentsController extends ControllerBase{

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
    * entity_query to query Node's Contest
    * @var QueryFactory
    */
    private $entity_query;

    /**
     * Class constructor.
     */
     public function __construct(AliasManagerInterface $alias_manager, EntityTypeManagerInterface $entity, QueryFactory $query) {
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
     * Force download of Document File
     * @method download
     * @param  Integer   $nid [Document ID to download file]
     * @return BinaryFileResponse [file stream]
     */
    public function collection($taxonomy_term_alias) {
        $query = $this->entity_query->get('node')
            ->condition('type', 'document')
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
        $variables['documents'] = $this->entity_node->loadMultiple($nids);

        return [
            '#theme'     => 'rp_site_documents_page',
            '#variables' => $variables,
        ];
    }

    /**
     * Force download of Document File
     * @method download
     * @param  Integer   $nid [Document ID to download file]
     * @return BinaryFileResponse [file stream]
     */
    public function download(NodeInterface $node) {
        $now = time();

        // Download only active Document
        if ($node->getType() == 'document') {
            $file = $this->_formatFile($node);
            if (!is_null($file)) {
                $response = new BinaryFileResponse($file->path);
                $response->trustXSendfileTypeHeader();
                // Force download and filename
                $response->setContentDisposition(
                    ResponseHeaderBag::DISPOSITION_ATTACHMENT,
                    $file->filename
                );

                return $response;
            }
        }
        throw new NotFoundHttpException();
    }

    /**
     * Format Node document file to be downlodable
     * @method _formatFile
     * @param  Node   $node [Document node]
     * @return Object        [Nomralized and renderable voucher's file object]
     */
    private function _formatFile(Node $node){
        $title = $node->title->value;
        $file_uri = $node->field_file_document->entity->uri->value;

        if ($file_uri) {
            $file = drupal_realpath($file_uri);
            $extension = pathinfo($file, PATHINFO_EXTENSION);
            return (object)[
                'path'     => $file,
                'filename' => $title. '.'.$extension,
            ];
        }
        return null;
    }

}
