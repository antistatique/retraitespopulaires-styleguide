<?php

namespace Drupal\rp_mortgage\Command;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;

use Drupal\Core\Cache\CacheTagsInvalidator;
use Drupal\Core\Lock\LockBackendInterface;

/**
 * ImportRateCommand class.
 */
class ImportRateCommand {
  /**
   * EntityStorageInterface to load Nodes.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityRate;

  /**
   * Helper methods for cache tags invalidator.
   *
   * @var \Drupal\Core\Cache\CacheTagsInvalidator
   */
  private $cacheTagsInvalidator;

  /**
   * To know if rp_quickwin module existe.
   *
   * @var \Drupal\Core\Extension\ModuleHandlerInterface
   */
  private $moduleHandler;

  /**
   * Locker service.
   *
   * @var \Drupal\Core\Lock\LockBackendInterface
   */
  private $lock;

  /**
   * Class constructor.
   */
  public function __construct(EntityTypeManagerInterface $entityTypeManager, CacheTagsInvalidator $cacheTagsInvalidator, ModuleHandlerInterface $moduleHandler, LockBackendInterface $lock) {
    $this->entityRate = $entityTypeManager->getStorage('rp_mortgage_rate');
    $this->cacheTagsInvalidator = $cacheTagsInvalidator;
    $this->moduleHandler = $moduleHandler;
    $this->lock = $lock;
  }

  /**
   * Import CSV rates file.
   *
   * @param string $file
   *   CSV file.
   * @param string $institution
   *   Institution name to filter.
   *
   * @throws \Exception
   */
  public function import($file, $institution) {
    if ($this->lock->acquire('rp_mortgage_import', 3600)) {
      drush_print('Start Importing from: ' . $file);

      $callback = function ($chunk, &$handle, $line) use ($institution) {
        // Read the line as CSV to retrieve all details.
        $values = str_getcsv($chunk);

        // Skip row that is not concerning the selected institution.
        if ($institution !== $values[0]) {
          return;
        }

        $data = [
          'type' => $values[1],
          'name' => $values[3],
          'date' => $this->parseDate($values[2]),
          'first_rate' => (float) $values[4],
          'second_rate' => (float) $values[5],
          'year' => (int) $values[6],
        ];

        $rate = $this->entityRate->create($data);
        $rate->save();
        drush_print('Added ' . $values[3]);
      };

      $this->deleteAll();

      try {
        $success = $this->readFileLinebyLine($file, $callback);
      }
      catch (\Exception $e) {
        drush_print($e->getMessage());
        $this->lock->release('rp_mortgage_import');
        return;
      }

      $this->cacheTagsInvalidator->invalidateTags(['rp_mortage_rates']);

      if (!$success) {
        drush_print('Failed on ' . $file);
      }

      $this->cacheTagsInvalidator->invalidateTags(['rp_mortage_rates']);
      drush_print('Tags cleaned');

      // If rp_quickwin module is enable export new rate to Logismata.
      if ($this->moduleHandler->moduleExists('rp_quickwin')) {
        drush_rp_quickwin_export_rates_logismata();
      }

      $this->lock->release('rp_mortgage_import');
    }
  }

  /**
   * Delete all existing rates.
   */
  protected function deleteAll() {
    $ids = $this->entityRate->getQuery()->execute();
    $ratesToDelete = $this->entityRate->loadMultiple($ids);
    foreach ($ratesToDelete as $rate) {
      $rate->delete();
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
   *   True if file has been correctly read
   *
   * @throws \Exception
   */
  protected function readFileLinebyLine($file, callable $callback) {
    $handle = fopen($file, "r");

    if (!$handle) {
      throw new \Exception("Can't open file '$file'");
    }

    // Skip headers.
    fgets($handle);

    $i = 0;
    while (!feof($handle)) {
      call_user_func_array($callback, [fgets($handle), &$handle, $i]);
      $i++;
    }
    fclose($handle);

    return TRUE;
  }

  /**
   * Convert string like "Octobre 2016" or "Décembre 2017" into timestamp.
   *
   * @param string $textDate
   *   Date string to parse.
   *
   * @return int|null
   *   Timestamp of the string.
   */
  private function parseDate($textDate) {
    $timestamp = NULL;

    // Set French locale.
    $locale = setlocale(LC_ALL, 0);
    setlocale(LC_ALL, 'fr_FR.UTF-8');

    $data = strptime($textDate, "%B %Y");
    if ($data) {
      $month = $data['tm_mon'] + 1;
      $year = $data['tm_year'] + 1900;
      $timestamp = mktime(0, 0, 0, $month, 1, $year);
    }

    // Reset locale.
    setlocale(LC_ALL, $locale);

    return $timestamp;
  }

}
