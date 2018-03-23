<?php
namespace Drupal\rp_mortgage\Command;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\KernelTests\Core\Entity\EntityQueryTest;

use Drupal\Core\Cache\CacheTagsInvalidator;

class ImportRateCommand {
    /**
     * EntityStorageInterface to load Nodes
     * @var EntityTypeManagerInterface
     */
    private $entity_rate;

    /**
     * entity_query to query Node's Code
     * @var QueryFactory
     */
    private $entity_query;

    /**
     * Helper methods for cache tags invalidator.
     * @var CacheTagsInvalidator
     */
    private $cacheTagsInvalidator;

    /**
     * Class constructor.
     *
     * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
     * @param \Drupal\Core\Entity\Query\QueryFactory         $entityQuery
     */
    public function __construct(EntityTypeManagerInterface $entityTypeManager, QueryFactory $entityQuery, CacheTagsInvalidator $cacheTagsInvalidator)
    {
        $this->entity_rate            = $entityTypeManager->getStorage('rp_mortgage_rate');
        $this->entity_query           = $entityQuery;
        $this->cache_tags_invalidator = $cacheTagsInvalidator;
    }

    /**
     * Import CSV rates file
     *
     * @param string $file          CSV file
     * @param string $institution   Institution name to filter
     *
     * @throws \Exception
     */
    public function import($file, $institution) {
        drush_print('Start Importing from: ' . $file);

        $callback = function($chunk, &$handle, $line) use ($institution) {
            // Read the line as CSV to retrieve all details
            $values = str_getcsv($chunk);

            // skip row that is not concerning the selected institution
            if ($institution !== $values[0]) {
                return;
            }

            $data = array(
                'type' => $values[1],
                'name' => $values[3],
                'date' => $this->parseDate($values[2]),
                'first_rate' => (float) $values[4],
                'second_rate' => (float) $values[5],
                'year' => (int) $values[6],
            );

            $rate = $this->entity_rate->create($data);
            $rate->save();
            drush_print('Added ' . $values[3]);
        };

        $this->deleteAll();

        $success = $this->_readFileLinebyLine($file, $callback);
        $this->cache_tags_invalidator->invalidateTags(['rp_mortage_rates']);

        if (!$success) {
            drush_print('Failed on ' . $file);
        }

        $this->cache_tags_invalidator->invalidateTags(['rp_mortage_rates']);
        drush_print('Tags cleaned');

        // If rp_quickwin module is enable export new rate to Logismata
        $moduleHandler = \Drupal::service('module_handler');
        if ($moduleHandler->moduleExists('rp_quickwin')) {
          drush_rp_quickwin_export_rates_logismata();
        }
    }

    /**
     * Delete all existing rates
     *
     */
    protected function deleteAll()
    {
        $ids = $this->entity_query->get('rp_mortgage_rate')->execute();
        $ratesToDelete = $this->entity_rate->loadMultiple($ids);
        foreach ($ratesToDelete as $rate) {
            $rate->delete();
        }
    }

    /**
     * Read a file line by line to avoid Executime timeout or Memory Limit
     * @method bat_oneup_read_file_line_by_line
     * @param  String                $file             [Path of the file to read]
     * @param  Callable              $callback         [Callback function to handle the line]
     * @return boolean                                 [description]
     */
    protected function _readFileLinebyLine($file, $callback) {
        $handle = fopen($file, "r");

        if (!$handle) {
            throw new \Exception("Can't open file '$file'");
        }

        // skip headers
        fgets($handle);

        $i = 0;
        while (!feof($handle)) {
            call_user_func_array($callback, array(fgets($handle), &$handle, $i));
            $i++;
        }
        fclose($handle);

        return true;
    }

    /**
     * Convert string like "Octobre 2016" or "Décembre 2017" into timestamp
     *
     * @param string $textDate
     *
     * @return int|null timestamp
     */
    private function parseDate($textDate)
    {
        $timestamp = null;

        // set French locale
        $locale = setlocale(LC_ALL, 0);
        setlocale(LC_ALL, 'fr_FR.UTF-8');

        $data = strptime($textDate, "%B %Y");
        if ($data) {
            $month = $data['tm_mon'] + 1;
            $year = $data['tm_year'] + 1900;
            $timestamp = mktime(0, 0, 0, $month, 1, $year);
        }

        // reset locale
        setlocale(LC_ALL, $locale);

        return $timestamp;
    }
}
