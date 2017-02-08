<?php
namespace Drupal\twig_extender\TwigExtension;

use Drupal\file\Entity\File;
use Drupal\image\Entity\ImageStyle;
use Symfony\Component\HttpFoundation\File\MimeType\ExtensionGuesser;

class Files extends \Twig_Extension {

     /**
     * List of all Twig functions
     */
     public function getFilters() {
         return [
             new \Twig_SimpleFilter('extension_guesser', array($this, 'ExtensionGuesser')),
         ];
     }

     /**
     * Unique identifier for this Twig extension
     */
    public function getName() {
        return 'twig_extender.twig.files';
    }

    /*
    Render a custom date format with Twig
    Use the internal helper "format_date" to render the date using the current language for texts
    */
    public static function ExtensionGuesser($mime_type) {
        $guesser = ExtensionGuesser::getInstance();
        return $guesser->guess($mime_type);
    }
}
