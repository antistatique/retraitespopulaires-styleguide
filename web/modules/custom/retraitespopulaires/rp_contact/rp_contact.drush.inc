<?php

/**
* @file Contains the code to generate the custom drush commands.
*/
/**
* Implements hook_drush_command().
*/
function rp_contact_drush_command() {
    $items = array();
    $items['import_zip'] = [
        'description' => 'Import zips from given csv',
        'drupal dependencies' => ['rp_contact'],
        'aliases' => ['rp:contact:import_zip'],
        'options' => array(
          'file'   => 'The full fille path that contain zips to be imported.',
        ),
    ];
    return $items;
}

/**
* The call back function name in the  following format
*   drush_{module_name}_{item_id_for_command}()
*/
function drush_rp_contact_import_zip() {
    // Get Drush parameters file
    $file = drush_get_option('file', null);

    $cmd = new Drupal\rp_contact\Command\ImportZipCommand();
    $cmd->import($file);
}
