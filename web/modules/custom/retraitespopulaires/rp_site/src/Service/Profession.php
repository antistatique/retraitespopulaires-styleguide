<?php

namespace Drupal\rp_site\Service;

use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Profession.
 */
class Profession {
  use StringTranslationTrait;

  /**
   * Get name of profession.
   */
  public function name($tid, $type) {
    if ($type == 'faq') {
      switch ($tid) {
        case 1:
          return $this->t("à la prévoyance professionnelle");

        case 2:
          return $this->t("à l'immobilier");

        case 6:
          return $this->t("aux prêts");

        case 7:
          return $this->t("à l'assurance vie");
      }
    }
    elseif ($type == 'document') {
      switch ($tid) {
        case 1:
          return $this->t("de prévoyance professionnelle");

        case 2:
          return $this->t("d'immobilier");

        case 6:
          return $this->t("de prêts");

        case 7:
          return $this->t("d'assurance vie");
      }
    }

    return '';
  }

  /**
   * Get the theme name.
   */
  public function theme($tid) {
    switch ($tid) {
      case 1:
        return 'prevoyance';

      case 2:
        return 'immobilier';

      case 6:
        return 'hypotheque';

      case 7:
        return 'assurance';
    }
  }

  /**
   * Get the theme id with name.
   */
  public function themeByName($name) {
    switch ($name) {
      case 'prevoyance':
        return 1;

      case 'immobilier':
        return 2;

      case 'hypotheque':
        return 6;

      case 'assurance':
        return 7;
    }
  }

  /**
   * Get menu name.
   */
  public function menu($plugin_id) {
    switch ($plugin_id) {
      case 'menu_link_content:a0be6622-b6ba-4cab-aa7a-6b979f7901bf':
        return 'prevoyance';

      case 'menu_link_content:dbddcf09-9898-46dd-ba6b-593e8e3f01ab':
        return 'immobilier';

      case 'menu_link_content:4fa3b81d-caee-49a8-87a2-4f8d66aa12aa':
        return 'hypotheque';

      case 'menu_link_content:386d0bf4-1ec6-4f07-bfb2-58aac135ac15':
        return 'assurance';
    }
  }

}
