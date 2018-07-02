<?php

/**
 * @file
 * Implements hook_drush_command().
 */

use Drupal\rp_quickwin\Command\ExportRateCommand;

/**
 * Implements hook_drush_command().
 */
function rp_quickwin_drush_command() {
  $items = [];
  $items['export-rates-logismata'] = [
    'description' => 'Export rates to logismata',
    'drupal dependencies' => ['rp_mortgage', 'rp_quickwin'],
    'aliases' => ['rp:quickwin:export-rates'],
  ];
  return $items;
}

/**
 * Call back function drush_{module_name}_{item_id_for_command}()
 */
function drush_rp_quickwin_export_rates_logismata() {
  $cmd = new ExportRateCommand(
    \Drupal::service('rp_mortgage.rate'),
    \Drupal::service('rp_quickwin.logismata')
  );
  $cmd->export();
}
