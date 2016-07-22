<?php
/**
* @file
* Contains \Drupal\rp_site\Service\Profession
*/

namespace Drupal\rp_site\Service;

/**
* Profession
*/
class Profession {

    public function name($tid) {
        switch ($tid) {
            case 1:
                return t('la prévoyance professionnelle');
            break;

            case 2:
                return t('l\'immobilier');
            break;

            case 6:
                return t('la finance');
            break;

            case 7:
                return t('l\'assurance vie');
            break;
        }
    }

}
