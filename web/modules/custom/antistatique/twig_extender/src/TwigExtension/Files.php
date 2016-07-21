<?php
namespace Drupal\twig_extender\TwigExtension;

use Drupal\file\Entity\File;
use Drupal\image\Entity\ImageStyle;

class Files extends \Twig_Extension {

    /**
    * List of all Twig functions
    */
     public function getFunctions(){
         return array(
             new \Twig_SimpleFunction('theme_url', array($this, 'themeUrl'), array('is_safe' => array('html'))),
             new \Twig_SimpleFunction('image_style', array($this, 'imageStyle'), array('is_safe' => array('html'))),
         );
     }

     /**
     * Unique identifier for this Twig extension
     */
    public function getName() {
        return 'twig_extender.twig.files';
    }

    /**
     * Generate an absolute url to active theme
     */
     public static function themeUrl($theme, $file) {
        return file_create_url(drupal_get_path('theme', $theme).'/'.$file);
     }

     /**
      * Generate an absolute url to active theme
      */
      public static function imageStyle($file_id, $styles) {
          $file = File::load($file_id);
          $transform = array();
          if (isset($file->uri->value)) {
              $transform['source'] = $file->url();
              foreach ($styles as $style) {
                  $transform[$style] = ImageStyle::load($style)->buildUrl($file->uri->value);
              }
          }
         return $transform;
      }
}
