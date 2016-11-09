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

    public function name($tid, $type) {
        if ($type == 'faq') {
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
        } elseif ($type == 'document') {
            switch ($tid) {
                case 1:
                    return t('de prévoyance professionnelle');
                break;

                case 2:
                    return t('d\'immobilier');
                break;

                case 6:
                    return t('de financement');
                break;

                case 7:
                    return t('d\'assurance vie');
                break;
            }
        }

        return '';
    }

    public function theme($tid) {
        switch ($tid) {
            case 1:
                return 'prevoyance';
            break;

            case 2:
                return 'immobilier';
            break;

            case 6:
                return 'hypotheque';
            break;

            case 7:
                return 'assurance';
            break;
        }
    }

    public function menu($plugin_id) {
        switch ($plugin_id) {
            case 'menu_link_content:a0be6622-b6ba-4cab-aa7a-6b979f7901bf':
                return 'prevoyance';
            break;

            case 'menu_link_content:dbddcf09-9898-46dd-ba6b-593e8e3f01ab':
                return 'immobilier';
            break;

            case 'menu_link_content:4fa3b81d-caee-49a8-87a2-4f8d66aa12aa':
                return 'hypotheque';
            break;

            case 'menu_link_content:386d0bf4-1ec6-4f07-bfb2-58aac135ac15':
                return 'assurance';
            break;
        }
    }

}
