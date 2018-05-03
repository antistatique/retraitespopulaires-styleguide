<?php

namespace Drupal\rp_quickwin\Form;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryInterface;
use Drupal\Core\Form\ConfirmFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\rp_quickwin\LogismataService;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ExportSaving3AForm extends ConfirmFormBase {
  /**
   * Saving 3a entity storage
   * @var \Drupal\Core\Entity\EntityStorageInterface
   */
  private $quickwinSaving3ARateStorage;

  /**
   * LogismataService to send data to Logismata
   * @var LogismataService
   */
  private $logismataService;

  /**
   * Class constructor.
   */
  public function __construct(EntityTypeManagerInterface $entityTypeManager, LogismataService $logismataService) {
    $this->quickwinSaving3ARateStorage = $entityTypeManager->getStorage('rp_quickwin_saving_3a_rate');
    $this->logismataService = $logismataService;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    // Instantiates this form class.
    return new static(
    // Load the service required to construct this class.
      $container->get('entity_type.manager'),
      $container->get('rp_quickwin.logismata')
    );
  }

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

    // Get all 3A entity ids and if it is empty stop export
    $ids = $this->quickwinSaving3ARateStorage->getQuery()->execute();
    if (empty($ids)){
      drupal_set_message(t('There is no entity to export'));
      return;
    }

    /** @var \Drupal\rp_quickwin\Entity\Saving3ARateInterface[] $rates */
    $rates = $this->quickwinSaving3ARateStorage->loadMultiple($ids);

    // Add each rate to the list
    foreach ($rates as $rate) {

      $logismata_product_list['products'][] = [
        'code' => strtolower(str_replace(' ', '', $rate->getName())),
        'descriptions' => [
          'de' => $rate->getName(),
          'fr' => $rate->getName(),
        ],
        'interest' => $rate->getRate(),
        'disabled' => !$rate->isAlterable(),
      ];

      // Set default to first rate
      if (count($logismata_product_list['products']) == 1) {
        $logismata_product_list['default'] = $logismata_product_list['products'][0]['code'];
      }
    }

    $this->logismataService->exportToLogismata($logismata_product_list);
  }
}
