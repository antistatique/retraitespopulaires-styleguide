<?php
namespace Drupal\rp_site\TwigExtension;

use Drupal\rp_site\Service\Profession;
use Symfony\Component\DependencyInjection\ContainerInterface;

class Themes extends \Twig_Extension {

    protected $container;

    public function __construct(ContainerInterface $container){
        $this->container = $container;
    }

    /**
    * List of all Twig functions
    */
    public function getFilters() {
        return [
            new \Twig_SimpleFilter('theme_profession', array($this, 'themeProfession')),
        ];
    }

    /**
    * List of all Twig functions
    */
     public function getFunctions(){
         return array(
             new \Twig_SimpleFunction('theme_guesser', array($this, 'themeGuesser'), array('is_safe' => array('html'))),
         );
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
    public function themeProfession($tid) {
        $profession = $this->container->get('rp_site.profession');
        return $profession->theme($tid);
    }

    /*
    Render a custom date format with Twig
    Use the internal helper "format_date" to render the date using the current language for texts
    */
    public function themeGuesser() {
        $route = $this->container->get('current_route_match');
        $node = $route->getParameter('node');
        if (isset($node) && !empty($node->field_profession->entity->tid->value)) {
            $profession = $this->container->get('rp_site.profession');
            return $profession->theme($node->field_profession->entity->tid->value);
        }
        return '';
    }

}
