<?php
/**
* @file
* Contains \Drupal\rp_site\Service\Cover
*/

namespace Drupal\rp_site\Service;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\image\Entity\ImageStyle;

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
     * Class constructor.
     */
     public function __construct(EntityTypeManagerInterface $entity) {
         $this->entity_file = $entity->getStorage('file');
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

        if (isset($node) && $node->field_cover->entity) {
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
     * @method fromFile
     * @param integer $fid File id to derivate
     * @param array $styles styles to be derivated
     * @return array derivated link of styles
     */
    private function _derivate($fid, $styles) {
        $build = array();

        $image = $this->entity_file->load($fid);

        foreach ($styles as $media => $style) {
            $img_style = ImageStyle::load($style);
            $destination_uri = $img_style->buildUri($image->getFileUri());
            $destination_url = $img_style->buildUrl($image->getFileUri());

            // create the new image derivative
            $derivative = $img_style->createDerivative($image->getFileUri(), $destination_uri);
            $build[$media] = $destination_url;
        }

        return $build;
    }


}
