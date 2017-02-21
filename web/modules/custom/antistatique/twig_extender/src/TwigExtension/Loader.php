<?php
namespace Drupal\twig_extender\TwigExtension;

use Drupal\file\Entity\File;

class Loader extends \Twig_Extension {

    /**
    * List of all Twig functions
    */
    public function getFunctions() {
        return [
            new \Twig_SimpleFunction('load_node', array($this, 'loadNode'), array('is_safe' => array('html'))),
            new \Twig_SimpleFunction('load_block', array($this, 'loadBlock'), array('is_safe' => array('html'))),
            new \Twig_SimpleFunction('load_form', array($this, 'loadForm'), array('is_safe' => array('html'))),
            new \Twig_SimpleFunction('load_image_style_field', [$this, 'loadImageStyleField']),
            new \Twig_SimpleFunction('load_image_style_file', [$this, 'loadImageStyleFile']),
            new \Twig_SimpleFunction('load_image', [$this, 'loadImage']),
        ];
    }

    /**
    * Unique identifier for this Twig extension
    */
    public function getName() {
        return 'twig_extender.twig.loader';
    }

    /**
    * Load a given block
    * with or whitout parameters
    */
    public static function loadBlock($block_id, $params = array()) {
        $instance = \Drupal::service('plugin.manager.block')
            ->createInstance($block_id, $params);
        return $instance->build($params);
    }

    /**
     * Load a given node
     * with or whitout parameters
     */
     public static function loadNode($node_id, $params) {
         $node =  Node::load($node_id);
         return $node;
     }

     /**
      * Load a given fid
      */
      public static function loadFile($fid) {
          return File::load($fid);
      }

     /**
     * Load a given block
     * with or whitout parameters
     */
     public static function loadForm($module, $form, $params = array()) {
         return \Drupal::formBuilder()->getForm('Drupal\\'.$module.'\Form\\'.$form, $params);
     }

     /**
      * Generate Image Style, with responsive format.
      *
      * @param FileFieldItemList $field
      *   Field File Entity to retreive cover and generate it.
      * @param array $styles
      *   Styles to be generated.
      *
      * @return array
      *   Generated link of styles
      */
     public function loadImageStyleField(FileFieldItemList $field, array $styles) {
       $imageStyleGenerator = \Drupal::service('rp_site.cover');
       return $imageStyleGenerator->fromField($field, $styles);
     }

     /**
      * Generate Image Style, with responsive format.
      *
      * @param int $fid
      *   File id to generate.
      * @param array $styles
      *   Styles to be generated.
      *
      * @return array
      *   Generated link of styles
      */
     public function loadImageStyleFile($fid, array $styles) {
       $imageStyleGenerator = \Drupal::service('rp_site.cover');
       return $imageStyleGenerator->fromFile($fid, $styles);
     }

     public static function loadImage($file_uri) {
         return \Drupal::service('image.factory')->get($file_uri);
     }

}
