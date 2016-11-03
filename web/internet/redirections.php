<?php

define('DRUPAL_DIR', __DIR__ .'/../drupal');

use Drupal\Core\DrupalKernel;
use Symfony\Component\HttpFoundation\Request;

$autoloader = require_once DRUPAL_DIR . '/autoload.php';
$request = Request::createFromGlobals();
$kernel = DrupalKernel::createFromRequest($request, $autoloader, 'prod');
$kernel->boot();

require_once DRUPAL_DIR . '/core/includes/database.inc';
require_once DRUPAL_DIR . '/core/includes/schema.inc';


$em = $kernel->getContainer()->get('entity.manager');

$entity = $em->getStorage('my_entity')->create(array(
        'id' => "116",
        'name' => "test entity",
));
$entity->save();
