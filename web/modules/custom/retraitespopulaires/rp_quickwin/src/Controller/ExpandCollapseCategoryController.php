<?php

namespace Drupal\rp_quickwin\Controller;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Controller\ControllerBase;

/**
 * Class ExpandCollapseCategoryController.
 */
class ExpandCollapseCategoryController extends ControllerBase {
  /**
   * For expand a teaser category
   */
  public function expand($category) {
    $session = \Drupal::request()->getSession();
    $session->set('rp_quickwin_collapsed_category_' . $category, FALSE);
    return new AjaxResponse();
  }

  /**
   * For collapse a teaser category
   */
  public function collapse($category) {
    $session = \Drupal::request()->getSession();
    $session->set('rp_quickwin_collapsed_category_' . $category, TRUE);
    return new AjaxResponse();
  }

}
