<?php

use Drupal\Core\Render\Markup;
use Drupal\Core\Link;

function rp_offers_suggestions_pages(&$suggestions) {
    $state = \Drupal::state();
    $route_match = \Drupal::routeMatch();

    $node = $route_match->getParameter('node');

    if (isset($node->nid->value) && $node->nid->value == $state->get('rp_offers.settings.collection.offers')['nid']) {
        $suggestions[] = 'page__node__' . $state->get('rp_offers.settings.collection.offers')['theme'];
    }
}
