<?php

namespace Drupal\rp_quickwin\Form;

use Drupal\Core\Form\ConfirmFormBase;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\Tests\taxonomy\Functional\Views\TaxonomyRelationshipTest;

class ExportSaving3AForm extends ConfirmFormBase {

  /**
   * Returns the question to ask the user.
   *
   * @return string
   *   The form question. The page title will be set to this value.
   */
  public function getQuestion() {
    return 'Voulez-vous vraiment exporter les taux chez Logismata ?';
  }

  /**
   * Returns the route to go to if the user cancels the action.
   *
   * @return \Drupal\Core\Url
   *   A URL object.
   */
  public function getCancelUrl() {
    return Url::fromRoute('entity.rp_quickwin_saving_3a_rate.collection');
  }

  /**
   * Returns a unique string identifying the form.
   *
   * @return string
   *   The unique string identifying the form.
   */
  public function getFormId() {
    return 'rp_quickwin_export_confirm_form';
  }

  /**
   * Form submission handler.
   *
   * @param array $form
   *   An associative array containing the structure of the form.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->exportSaving3ARate();
  }

  public function exportSaving3ARate(){
    // Create the list of saving 3a rates
    $logismata_product_list = [
      'productListId' => 'saving3aInvestmentOptions',
      'default' => '',
      'products' => [],
    ];

    /** @var \Drupal\rp_quickwin\Entity\Saving3ARateInterface[] $rates */
    $rates = \Drupal::entityQuery('rp_quickwin_saving_3a_rate')->execute();
    $rates = \Drupal::entityTypeManager()->getStorage('rp_quickwin_saving_3a_rate')->loadMultiple($rates);

    // Add each rate to the list
    foreach ($rates as $rate) {

      $logismata_product_list['products'][] = [
        'code' => strtolower(str_replace(' ', '', $rate->getName())),
        'descriptions' => [
          'de' => $rate->getName(),
          'fr' => $rate->getName(),
        ],
        'interest' => $rate->getRate(),
        'disabled' => $rate->isAlterable(),
      ];

      // Set default to first rate
      if (count($logismata_product_list['products']) == 1) {
        $logismata_product_list['default'] = $logismata_product_list['products'][0]['code'];
      }
    }

    \Drupal::service('rp_quickwin.export_logismata')->exportToLogismata($logismata_product_list);
  }
}
