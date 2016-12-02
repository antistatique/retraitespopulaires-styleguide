<?php

use Drupal\Core\Render\Markup;
use Drupal\Core\Link;

function rp_contact_suggestions_nodes(&$suggestions) {
    $state = \Drupal::state();
    $route_match = \Drupal::routeMatch();

    $node = $route_match->getParameter('node');

    if (isset($node->nid->value) && $node->nid->value == $state->get('rp_contact.settings.page.documents')['nid']) {
        $suggestions[] = 'node__' . $state->get('rp_contact.settings.page.documents')['theme'];
    }

    if (isset($node->nid->value) && $node->nid->value == $state->get('rp_contact.settings.page.address')['nid']) {
        $suggestions[] = 'node__' . $state->get('rp_contact.settings.page.address')['theme'];
    }

    if (isset($node->nid->value) && $node->nid->value == $state->get('rp_contact.settings.page.building')['nid']) {
        $suggestions[] = 'node__' . $state->get('rp_contact.settings.page.building')['theme'];
    }
}


function rp_contact_suggestions_pages(&$suggestions) {
    $state = \Drupal::state();
    $route_match = \Drupal::routeMatch();

    $node = $route_match->getParameter('node');

    if (isset($node->nid->value) && $node->nid->value == $state->get('rp_contact.settings.collection.advisors')['nid']) {
        $suggestions[] = 'page__node__' . $state->get('rp_contact.settings.collection.advisors')['theme'];
    }
}
