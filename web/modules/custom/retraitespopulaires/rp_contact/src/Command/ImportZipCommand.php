<?php

namespace Drupal\rp_contact\Command;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;

/**
 * Process zip code, create missing one and link to Advisor (create missing one)
 */
class ImportZipCommand {

  /**
   * EntityTypeManagerInterface to load Nodes.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityNode;

  /**
   * EntityTypeManagerInterface to load Taxonomy.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityTaxonomy;

  /**
   * Entity_query to query Node's Code.
   *
   * @var \Drupal\Core\Entity\Query\QueryFactory
   */
  private $entityQuery;

  /**
   * Class constructor.
   */
  public function __construct(EntityTypeManagerInterface $entityTypeManager, QueryFactory $entityQuery) {
    $this->entityNode     = $entityTypeManager->getStorage('node');
    $this->entityTaxonomy = $entityTypeManager->getStorage('taxonomy_term');
    $this->entityQuery    = $entityQuery;
  }

  /**
   * Import zips code in Drupal.
   */
  public function import($file) {
    drush_print('Start Importing from: ' . $file);

    $callback = function ($chunk, &$handle, $line) {
      // Read the line as CSV to retrieve all details.
      $values = str_getcsv($chunk);
      if (isset($values[0]) && !empty($values[0]) && isset($values[1]) && !empty($values[1])) {
        if (!$zip = $this->isZipExist($values[0], $values[1])) {
          $data = [
            'vid'            => 'zip_codes',
            'name'           => $values[0] . ' ' . $values[1],
            'field_zip_code' => $values[0],
            'field_district' => $values[1],
          ];

          $zip = $this->entityTaxonomy->create($data);
          $zip->save();
        }

        $advisor = $this->entityNode->load($this->mapAdvisors($values[2]));
        $advisor->field_zip_codes->appendItem($zip->tid->value);
        $advisor->field_region->setValue([
          'target_id' => $this->mapRegions($values[3]),
        ]);
        $advisor->save();
        drush_print('Added ' . $values[0] . ' ' . $values[1] . ' to ' . $advisor->field_firstname->value);
      }
    };

    $success = $this->readFileLinebyLine($file, $callback);
    if (!$success) {
      drush_print('Failed on ' . $file);
    }
  }

  /**
   * Check the given zip exist.
   */
  protected function isZipExist($zip, $district) {
    $term = NULL;
    $query = $this->entityQuery->get('taxonomy_term')
      ->condition('name', $zip)
      ->condition('field_district', $district)
      ->condition('vid', 'zip_codes');
    $tids = $query->execute();

    if (count($tids) > 0) {
      $tid = reset($tids);
      $term = $this->entityTaxonomy->load($tid);
    }

    return $term;
  }

  /**
   * Map Advisors.
   */
  protected function mapAdvisors($advisor) {
    switch ($advisor) {
      case 'Xavier GRANDJEAN':
        return 158;

      case 'Marc WERTH':
        return 159;

      case 'Antonio DA FONTE':
        return 160;

      case 'Pierre-Alain PELLEGRI':
        return 161;

      case 'Emilia OLIVEIRA':
        return 162;

      case 'Michel PASCHE':
        return 157;

      case 'Milko MANTERO':
        return 163;

      case 'Marie-France BARBAY':
        return 91;
    }
  }

  /**
   * Map regions.
   */
  protected function mapRegions($region) {
    switch ($region) {
      case 'Riviera, Chablais et Pays-d\'Enhaut':
        return 41;

      case 'Nord vaudois et Broye payernoise':
        return 39;

      case 'Lavaux et Moudon':
        return 37;

      case 'Centre':
        return 36;

      case 'Morges et Vallée de Joux':
        return 38;

      case 'Lausanne':
        return 34;

      case 'Ouest lausannois':
        return 35;

      case 'Nyon':
        return 40;

    }
  }

  /**
   * Read a file line by line to avoid Executime timeout or Memory Limit.
   *
   * @param string $file
   *   Path of the file to read.
   * @param callable $callback
   *   Callback function to handle the line.
   *
   * @return bool
   *   If the file has been completely read.
   */
  protected function readFileLinebyLine($file, callable $callback) {
    try {
      $handle = fopen($file, "r");
      $i = 0;
      while (!feof($handle)) {
        call_user_func_array($callback, [fgets($handle), &$handle, $i]);
        $i++;
      }

      fclose($handle);

    }
    catch (\Exception $e) {
      trigger_error("readFileLinebyLine::" . $e->getMessage(), E_USER_NOTICE);
      return FALSE;
    }

    return TRUE;
  }

}
