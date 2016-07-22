<?php
/**
* @file
* Contains \Drupal\rp_site\Controller\DocumentsController.
*/

namespace Drupal\rp_site\Controller;

use Drupal\node\NodeInterface;
use Drupal\node\Entity\Node;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
/**
* DocumentsController.
*/
class DocumentsController {

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
