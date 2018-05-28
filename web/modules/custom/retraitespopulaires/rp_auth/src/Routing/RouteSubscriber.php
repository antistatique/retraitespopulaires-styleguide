<?php

namespace Drupal\rp_auth\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\RouteCollection;

/**
 * Listens to the dynamic rp_auth route events.
 */
class RouteSubscriber extends RouteSubscriberBase {

  /**
   * {@inheritdoc}
   */
  public function alterRoutes(RouteCollection $collection) {
    // Change the title of /user/login page.
    if ($route = $collection->get('user.login')) {
      $route->setDefault('_title', 'Se connecter');
    }

    // Always deny access to '/user/{1}'.
    // Note that the second parameter of setRequirement() is a string.
    if ($route = $collection->get('entity.user.canonical')) {
      $route->setRequirement('_access', 'FALSE');
    }

    // Always deny access to non-admin '/user/{*}/edit'.
    if ($route = $collection->get('entity.user.edit_form')) {
      $route->setRequirement('_permission', 'access administration pages');
    }

    // Always deny access to '/user/password'.
    if ($route = $collection->get('user.pass')) {
      $route->setRequirement('_access', 'FALSE');
    }
  }

}
