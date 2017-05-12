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
        if (is_a($date, 'Drupal\Core\Datetime\DrupalDateTime') || is_a($date, 'DateTime')) {
            $timestmap = $date->getTimestamp();
        } elseif ($date_format = \DateTime::createFromFormat('Y-m-d', $date)) {
            $timestmap = strtotime($date);
        } else {
            // Check the $date is a valid timestmap
            try {
                $date_format = new \DateTime('@'.$date);
                $timestmap = $date;
            } catch (\Exception $e) {
                return null;
            }
        }
        return format_date($timestmap, "custom", $format);
    }

}
