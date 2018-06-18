<?php

/**
 * @file
 * Implements Drush command.
 */

use Drupal\rp_mortgage\Command\ImportRateCommand;

/**
 * Implements hook_drush_command().
 */
function rp_mortgage_drush_command() {
  $items = [];
  $items['import-rates'] = [
    'description' => 'Import rates from given csv',
    'drupal dependencies' => ['rp_mortgage'],
    'aliases' => ['rp:mortgage:import-rates'],
    'options' => [
      'file' => 'The full file path that contain rates to be imported.',
      'institution' => 'Only import rates concerning institution name',
    ],
  ];
  return $items;
}

/**
 * The call back function name in the  following format.
 *
 * Implement drush_{module_name}_{item_id_for_command}()
 */
function drush_rp_mortgage_import_rates() {
  // Get Drush parameters file.
  $file = drush_get_option('file', NULL);
  $institution = drush_get_option('institution', 'RP');

  $cmd = new ImportRateCommand(
        \Drupal::entityTypeManager(),
        \Drupal::service('cache_tags.invalidator'),
        \Drupal::service('module_handler'),
        \Drupal::service('lock')
    );
  $cmd->import($file, $institution);
}
