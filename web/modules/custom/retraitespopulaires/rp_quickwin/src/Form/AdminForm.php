<?php
/**
* @file
* Contains \Drupal\rp_quickwin\Form\AdminForm.
*/

namespace Drupal\rp_quickwin\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\State\StateInterface;

class AdminForm extends FormBase {

    /**
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    private $state;

    /**
     * Class constructor.
     */
    public function __construct(StateInterface $state) {
        $this->state = $state;
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container) {
      // Instantiates this form class.
      return new static(
        // Load the service required to construct this class.
        $container->get('state')
      );
    }

    /**
    * {@inheritdoc}.
    */
    public function getFormId() {
        return 'rp_quickwin_admin_form';
    }

    /**
    * {@inheritdoc}
    */
    public function buildForm(array $form, FormStateInterface $form_state, $extra = NULL) {
        // Mailchimp settings
        $form['quickwin'] = array(
            '#type'          => 'fieldset',
            '#title'         => $this->t('QuickWin'),
        );

        $form['quickwin']['logismata_url'] = array(
            '#type'          => 'textfield',
            '#title'         => $this->t('Url Commune Logismata'),
            '#default_value' => $this->state->get('rp_quickwin.settings.logismata_url')
        );

        $form['actions']['submit'] = array(
            '#type'        => 'submit',
            '#value'       => $this->t('Save'),
            '#button_type' => 'primary',
            '#prefix'      => '<div class="form-group">',
            '#suffix'      => '</div>',
        );

        return $form;
    }


    /**
    * {@inheritdoc}
    */
    public function validateForm(array &$form, FormStateInterface $form_state) {
    }

    /**
    * {@inheritdoc}
    */
    public function submitForm(array &$form, FormStateInterface $form_state) {
        $this->state->set('rp_quickwin.settings.logismata_url', trim($form_state->getValue('logismata_url')));
    }
}
