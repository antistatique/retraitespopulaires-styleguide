<?php
namespace Drupal\rp_mortgage\Command;

use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\KernelTests\Core\Entity\EntityQueryTest;

class ImportRateCommand
{


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
     * Class constructor.
     *
     * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
     * @param \Drupal\Core\Entity\Query\QueryFactory         $entityQuery
     */
    public function __construct(EntityTypeManagerInterface $entityTypeManager, QueryFactory $entityQuery)
    {
        $this->entity_rate = $entityTypeManager->getStorage('rp_mortgage_rate');
        $this->entity_query = $entityQuery;
    }

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
            drush_print('Added ' . $values[0]);
        };

        $success = $this->_readFileLinebyLine($file, $callback);

        if (!$success) {
            drush_print('Failed on ' . $file);
        }
    }

    /**
     * Check the given zip exist
     * @method isZipExist
     * @param  string      $code [description]
     * @return boolean           [description]
     */
    protected function isZipExist($zip) {
        $query = $this->entity_query->get('taxonomy_term')
            ->condition('name', $zip)
            ->condition('vid', 'zip_codes')
            ->count();
        ;
        return $query->execute() > 0;
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
        setlocale(LC_ALL, 'fr_FR');

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
