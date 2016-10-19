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
     * @method generate
     * @return array [Image for each responsive layout]
     */
    public function generate($node, $styles){
        $build = array();

        // Retreive node
        $cover_fid = '';

        if (isset($node) && $node->field_cover->entity) {
            $cover_fid = $node->field_cover->entity->id();
        }

        if ($cover_fid) {
            $cover = $this->entity_file->load($cover_fid);

            foreach ($styles as $media => $style) {
                $img_style = ImageStyle::load($style);
                $destination_uri = $img_style->buildUri($cover->getFileUri());
                $destination_url = $img_style->buildUrl($cover->getFileUri());

                // create the new image derivative
                $derivative = $img_style->createDerivative($cover->getFileUri(), $destination_uri);
                $build[$media] = $destination_url;
            }
        }

        return $build;
    }

}
