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
    * List of all Twig functions
    */
     public function getFunctions(){
         return array(
             new \Twig_SimpleFunction('date_diff', array($this, 'dateDiff'), array('is_safe' => array('html'))),
         );
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
        if (is_a($date, 'Drupal\Core\Datetime\DrupalDateTime') || is_a($date, 'DateTime')) {
            $timestmap = $date->getTimestamp();
        } elseif ($date_format = \DateTime::createFromFormat('Y-m-d', $date)) {
            $timestmap = strtotime($date);
        } else {
            $timestmap = $date;
        }
        return format_date($timestmap, "custom", $format);
    }

    /*
    Render the number of days between two dates
    */
    public static function dateDiff($start, $end) {
        if ($date_format = \DateTime::createFromFormat('Y-m-d', $start)) {
            $timestmap_start = strtotime($start);
        }elseif (is_a($start, 'Drupal\Core\Datetime\DrupalDateTime') || is_a($start, 'DateTime')){
            $timestmap_start = $start->getTimestamp();
        }else{
            $timestmap_start = $start;
        }

        if ($date_format = \DateTime::createFromFormat('Y-m-d', $end)) {
            $timestmap_end = strtotime($end);
        }elseif (is_a($end, 'Drupal\Core\Datetime\DrupalDateTime') || is_a($end, 'DateTime')){
            $timestmap_end = $end->getTimestamp();
        }else{
            $timestmap_end = $end;
        }

        return ceil(($timestmap_end - $timestmap_start) / 86400);
    }
}
