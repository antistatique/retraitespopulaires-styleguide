<?php
/**
* @file
* Contains \Drupal\rp_site\Form\AdminForm.
*/

namespace Drupal\rp_site\Form;

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
        return 'rp_site_admin_form';
    }

    /**
    * {@inheritdoc}
    */
    public function buildForm(array $form, FormStateInterface $form_state, $extra = NULL) {
        // Collection pages settings
        $form['collection'] = array(
            '#type'          => 'fieldset',
            '#title'         => 'Collection pages',
        );

        $form['collection']['news_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Actualites - node ID',
            '#default_value' => $this->state->get('rp_site.settings.collection.news')['nid'],
        );

        $form['collection']['news_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Actualites - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.collection.news')['theme'] ? $this->state->get('rp_site.settings.collection.news')['theme'] : 'actualites',
        );

        $form['collection']['profil_individual_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Profil Particulier - node ID',
            '#default_value' => $this->state->get('rp_site.settings.collection.profil_individual')['nid'],
        );

        $form['collection']['profil_individual_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Profil Particulier - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.collection.profil_individual')['theme'] ? $this->state->get('rp_site.settings.collection.profil_individual')['theme'] : 'profil_individual',
        );

        $form['collection']['profil_company_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Profil Entreprise - node ID',
            '#default_value' => $this->state->get('rp_site.settings.collection.profil_company')['nid'],
        );

        $form['collection']['profil_company_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Profil Entreprise - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.collection.profil_company')['theme'] ? $this->state->get('rp_site.settings.collection.profil_company')['theme'] : 'profil_company',
        );

        $form['collection']['profil_public_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Profil Collectivités publiques - node ID',
            '#default_value' => $this->state->get('rp_site.settings.collection.profil_public')['nid'],
        );

        $form['collection']['profil_public_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Profil Collectivités publiques - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.collection.profil_public')['theme'] ? $this->state->get('rp_site.settings.collection.profil_public')['theme'] : 'profil_public',
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
    public function submitForm(array &$form, FormStateInterface $form_state) {
        // General settings
        $this->state->set('rp_site.settings.collection.news', array(
            'nid' => trim($form_state->getValue('news_nid')),
            'theme' => trim($form_state->getValue('news_theme')),
        ));

        $this->state->set('rp_site.settings.collection.profil_individual', array(
            'nid' => trim($form_state->getValue('profil_individual_nid')),
            'theme' => trim($form_state->getValue('profil_individual_theme')),
        ));

        $this->state->set('rp_site.settings.collection.profil_company', array(
            'nid' => trim($form_state->getValue('profil_company_nid')),
            'theme' => trim($form_state->getValue('profil_company_theme')),
        ));

        $this->state->set('rp_site.settings.collection.profil_public', array(
            'nid' => trim($form_state->getValue('profil_public_nid')),
            'theme' => trim($form_state->getValue('profil_public_theme')),
        ));

    }
}
