<?php
/**
* @file
* Contains \Drupal\rp_contact\Command\ImportZipCommand
*/

namespace Drupal\rp_contact\Command;

use Drupal\Core\Url;

/**
* Process zip codes, create missing one and link to Advisor (create missing one)
*
*/
class ImportZipCommand {

    /**
    * EntityTypeManagerInterface to load Nodes
    * @var EntityTypeManagerInterface
    */
    private $entity_node;

    /**
    * EntityTypeManagerInterface to load Taxonomy
    * @var EntityTypeManagerInterface
    */
    private $entity_taxonomy;

    /**
    * entity_query to query Node's Code
    * @var QueryFactory
    */
    private $entity_query;

    /**
    * Class constructor.
    */
    public function __construct() {
        $this->entity_node     = \Drupal::entityTypeManager()->getStorage('node');
        $this->entity_taxonomy = \Drupal::entityTypeManager()->getStorage('taxonomy_term');
        $this->entity_query    = \Drupal::service('entity.query');
    }

    public function import($file) {
        drush_print('Start Importing from: ' . $file);

        $callback = function($chunk, &$handle, $line){
            // Read the line as CSV to retrieve all details
            $values = str_getcsv($chunk);
            if (isset($values[0]) && !empty($values[0]) && isset($values[1]) && !empty($values[1])) {
                if (!$zip = $this->isZipExist($values[0], $values[1])) {
                    $data = array(
                        'vid'            => 'zip_codes',
                        'name'           => $values[0] . ' '. $values[1],
                        'field_zip_code' => $values[0],
                        'field_district' => $values[1],
                    );

                    $zip = $this->entity_taxonomy->create($data);
                    $zip->save();
                }

                $advisor = $this->entity_node->load($this->mapAdvisors($values[2]));
                $advisor->field_zip_codes->appendItem($zip->tid->value);
                $advisor->field_region->setValue([
                    'target_id' => $this->mapRegions($values[3])
                ]);
                $advisor->save();
                drush_print('Added ' . $values[0] .' '. $values[1].' to ' . $advisor->field_firstname->value);
            }
        };

        $success = $this->_readFileLinebyLine($file, $callback);
        if (!$success) { drush_print('Failed on ' . $file); }
    }

    /**
    * Check the given zip exist
     * @method isZipExist
     * @param  string      $code [description]
     * @return boolean           [description]
     */
    protected function isZipExist($zip, $district) {
        $term = null;
        $query = $this->entity_query->get('taxonomy_term')
            ->condition('name', $zip)
            ->condition('field_district', $district)
            ->condition('vid', 'zip_codes')
        ;
        $tids = $query->execute();

        if (count($tids) > 0) {
            $tid = reset($tids);
            $term = $this->entity_taxonomy->load($tid);
        }

        return $term;
    }

    protected function mapAdvisors($advisor) {
        switch ($advisor) {
            case 'Xavier GRANDJEAN':
                return 158;
                break;
            case 'Marc WERTH':
                return 159;
                break;
            case 'Antonio DA FONTE':
                return 160;
                break;
            case 'Pierre-Alain PELLEGRI':
                return 161;
                break;
            case 'Emilia OLIVEIRA':
                return 162;
                break;
            case 'Michel PASCHE':
                return 157;
                break;
            case 'Milko MANTERO':
                return 163;
                break;
            case 'Marie-France BARBAY':
                return 91;
                break;
        }
    }

    protected function mapRegions($region) {
        switch ($region) {
            case 'Riviera, Chablais et Pays-d\'Enhaut':
                return 41;
                break;
            case 'Nord vaudois et Broye payernoise':
                return 39;
                break;
            case 'Lavaux et Moudon':
                return 37;
                break;
            case 'Centre':
                return 36;
                break;
            case 'Morges et Vallée de Joux':
                return 38;
                break;
            case 'Lausanne':
                return 34;
                break;
            case 'Ouest lausannois':
                return 35;
                break;
            case 'Nyon':
                return 40;
                break;
        }
    }

    /**
     * Read a file line by line to avoid Executime timeout or Memory Limit
     * @method bat_oneup_read_file_line_by_line
     * @param  String                $file             [Path of the file to read]
     * @param  Function              $callback         [Callback function to handle the line]
     * @return boolean                                 [description]
     */
    protected function _readFileLinebyLine($file, $callback) {
        try {
            $handle = fopen($file, "r");
            $i = 0;
            while (!feof($handle)) {
                call_user_func_array($callback,array(fgets($handle), &$handle, $i));
                $i++;
            }

            fclose($handle);

        } catch(\Exception $e) {
             trigger_error("readFileLinebyLine::" . $e->getMessage(), E_USER_NOTICE);
             return false;
        }

        return true;
    }
}
