<?php
/**
* @file
* Contains \Drupal\rp_site\Service\Cover
*/

namespace Drupal\rp_site\Service;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\image\Entity\ImageStyle;
use \Drupal\Core\File\FileSystemInterface;

/**
* Cover
*/
class Cover {
    /**
    * EntityTypeManagerInterface to load Files
    * @var EntityTypeManagerInterface
    */
    private $entity_file;

    /**
    * Provides helpers to operate on files and stream wrappers.
    * @var FileSystemInterface
    */
    private $fso;

     /**
     * Class constructor.
     */
     public function __construct(EntityTypeManagerInterface $entity, FileSystemInterface $fso) {
         $this->entity_file = $entity->getStorage('file');
         $this->fso         = $fso;
     }

    /**
     * Generate Image Style, with responsive format
     * @method fromNode
     * @param Node $node Node to retreive cover and derivate it
     * @param array $styles styles to be derivated
     * @return array derivated link of styles
     */
    public function fromNode($node, $styles){
        $build = array();

        // Retreive node
        $cover_fid = '';

        if (isset($node->field_cover) && $node->field_cover->entity) {
            $cover_fid = $node->field_cover->entity->id();
        }

        if ($cover_fid) {
            $build = $this->_derivate($cover_fid, $styles);
        }

        return $build;
    }

    /**
    * Generate Image Style, with responsive format
     * @method fromFile
     * @param integer $fid File id to derivate
     * @param array $styles styles to be derivated
     * @return array derivated link of styles
     */
    public function fromFile($fid, $styles){
        $build = array();

        $image = $this->entity_file->load($fid);

        if ($image) {
            $build = $this->_derivate($fid, $styles);
        }

        return $build;
    }

    /**
     * Generate Image Style, with responsive format
     * @Gido think is dirty to do it this way - but Drupal seems bugy when generating & serving
     * first time an image style - The problematic, sometimes browser keep the first trial in cache
     * and keep no image in his local cache.
     * Issue Github: #111
     *
     * @method fromFile
     * @param integer $fid File id to derivate
     * @param array $styles styles to be derivated
     * @return array derivated link of styles
     */
    private function _derivate($fid, $styles) {
        $build = array();

        $image = $this->entity_file->load($fid);

        // Check the image exist on the file system
        $image_path = $this->fso->realpath($image->getFileUri());
        if (!file_exists($image_path)) {
            return $build;
        }

        foreach ($styles as $media => $style) {
            $img_style = ImageStyle::load($style);

            if ($img_style) {
                $destination_uri = $img_style->buildUri($image->getFileUri());
                $destination_url = $img_style->buildUrl($image->getFileUri());

                // Avoid generating image style already existing
                $file = $this->fso->realpath($destination_uri);
                if (file_exists($file)) {
                    $build[$media] = $destination_url;
                    continue;
                }

                // create the new image derivative
                $derivative = $img_style->createDerivative($image->getFileUri(), $destination_uri);
                $build[$media] = $destination_url;
            }
        }

        return $build;
    }


}
