<?php

/**
 * @file
 * Contains the code to generate the custom drush commands.
 */

use Drupal\rp_contact\Command\ImportZipCommand;

/**
 * Implements hook_drush_command().
 */
function rp_contact_drush_command() {
  $items = [];
  $items['import_zip'] = [
    'description' => 'Import zips from given csv',
    'drupal dependencies' => ['rp_contact'],
    'aliases' => ['rp:contact:import_zip'],
    'options' => [
      'file'   => 'The full fille path that contain zips to be imported.',
    ],
  ];
  return $items;
}

/**
 * Callback drush_{module_name}_{item_id_for_command}().
 */
function drush_rp_contact_import_zip() {
  // Get Drush parameters file.
  $file = drush_get_option('file', NULL);

  $cmd = new ImportZipCommand(
    \Drupal::entityTypeManager()
  );
  $cmd->import($file);
}
