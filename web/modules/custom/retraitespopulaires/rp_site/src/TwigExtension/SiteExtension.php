<?php

namespace Drupal\rp_site\TwigExtension;

use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Twig extension for the site.
 */
class SiteExtension extends \Twig_Extension {

  protected $container;

  /**
   * Class Constructor.
   */
  public function __construct(ContainerInterface $container) {
    $this->container = $container;
  }

  /**
   * List of all Twig filters.
   */
  public function getFilters() {
    return [
      new \Twig_SimpleFilter('theme_profession', [$this, 'themeProfession']),
      new \Twig_SimpleFilter('format_pourcent', [$this, 'formatPourcent']),

    ];
  }

  /**
   * List of all Twig functions.
   */
  public function getFunctions() {
    return [
      new \Twig_SimpleFunction('theme_guesser', [$this, 'themeGuesser'], ['is_safe' => ['html']]),
    ];
  }

  /**
   * Unique identifier for this Twig extension.
   */
  public function getName() {
    return 'rp_site.twig.extension';
  }

  /**
   * Get the profession theme.
   */
  public function themeProfession($tid) {
    $profession = $this->container->get('rp_site.profession');
    return $profession->theme($tid);
  }

  /**
   * Get theme.
   */
  public function themeGuesser() {
    $route = $this->container->get('current_route_match');
    $node = $route->getParameter('node');
    if (isset($node) && !empty($node->field_profession->entity->tid->value)) {
      $profession = $this->container->get('rp_site.profession');
      return $profession->theme($node->field_profession->entity->tid->value);
    }
    elseif (isset($node) && $node->getType() == 'building') {
      return 'immobilier';
    }

    return '';
  }

  /**
   * Format a number to a percent string.
   */
  public function formatPourcent($value, $decimals = 2) {
    $number = number_format((float) $value, $decimals, '.', "'");
    return sprintf('%s%%', $number);
  }

}
