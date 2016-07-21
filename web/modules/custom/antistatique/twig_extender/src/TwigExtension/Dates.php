<?php
namespace Drupal\twig_extender\TwigExtension;

class Dates extends \Twig_Extension {

    /**
    * List of all Twig functions
    */
    public function getFilters() {
        return [
            new \Twig_SimpleFilter('date_format', array($this, 'formatDate')),
        ];
    }

    /**
    * Unique identifier for this Twig extension
    */
    public function getName() {
        return 'twig_extender.twig.dates';
    }

    /*
    Render a custom date format with Twig
    Use the internal helper "format_date" to render the date using the current language for texts
    */
    public static function formatDate($date, $format) {
        if ($date_format = \DateTime::createFromFormat('Y-m-d', $date)) {
            $timestmap = strtotime($date);
        }elseif (is_a($date, 'Drupal\Core\Datetime\DrupalDateTime') || is_a($date, 'DateTime')){
            $timestmap = $date->getTimestamp();
        }else{
            $timestmap = $date;
        }
        return format_date($timestmap, "custom", $format);
    }

}
