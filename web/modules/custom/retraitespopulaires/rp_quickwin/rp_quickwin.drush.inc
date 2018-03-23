<?php
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
 * The call back function name in the  following format
 *   drush_{module_name}_{item_id_for_command}()
 */
function drush_rp_quickwin_export_rates_logismata() {
  $cmd = new Drupal\rp_quickwin\Command\ExportRateCommand();
  $cmd->export();
}
