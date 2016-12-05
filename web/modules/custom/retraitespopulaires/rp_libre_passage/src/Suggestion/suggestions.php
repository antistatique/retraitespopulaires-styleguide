<?php

use Drupal\Core\Render\Markup;
use Drupal\Core\Link;

function rp_libre_passage_suggestions_nodes(&$suggestions) {
    $state = \Drupal::state();
    $route_match = \Drupal::routeMatch();

    $node = $route_match->getParameter('node');

    // Libre passage
    if (isset($node->nid->value) && $node->nid->value == $state->get('rp_libre_passage.settings.page.calculator')['nid']) {
        $suggestions[] = 'node__'.$state->get('rp_libre_passage.settings.page.calculator')['theme'];
    }
}
