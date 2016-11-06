<?php

define('DRUPAL_DIR', __DIR__ .'/..');

use Drupal\Core\DrupalKernel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;

// Bootstrap Drupal 8
$autoloader = require_once DRUPAL_DIR . '/autoload.php';
$request = Request::createFromGlobals();
$kernel = DrupalKernel::createFromRequest($request, $autoloader, 'prod');
$kernel->boot();

$database = $kernel->getContainer()->get('database');

$request_uri = $request->getRequestUri();

$query = $database->select('redirection', 'r');
$destinaton = $query
    ->fields('r', array('destination'))
    ->condition('r.request_uri', $request_uri)
    ->execute()
    ->fetchField()
;

if (!empty($destinaton)) {
    $response = new RedirectResponse($destinaton);
} else {
    \Drupal::logger('page not found')->warning('@uri', ['@uri' => $request->getRequestUri()]);
    $response = new RedirectResponse('/');
}
$response->send();
