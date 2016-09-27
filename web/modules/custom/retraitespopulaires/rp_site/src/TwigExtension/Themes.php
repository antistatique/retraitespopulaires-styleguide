<?php
namespace Drupal\rp_site\TwigExtension;

use Drupal\rp_site\Service\Profession;

class Themes extends \Twig_Extension {

    /**
    * List of all Twig functions
    */
    public function getFilters() {
        return [
            new \Twig_SimpleFilter('theme_profession', array($this, 'themeProfession')),
        ];
    }

    /**
    * Unique identifier for this Twig extension
    */
    public function getName() {
        return 'rp_site.twig.themes';
    }

    /*
    Render a custom date format with Twig
    Use the internal helper "format_date" to render the date using the current language for texts
    */
    public static function themeProfession($tid) {
        $profession = new Profession();
        return $profession->theme($tid);
    }

}
