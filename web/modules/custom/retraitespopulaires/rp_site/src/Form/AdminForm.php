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

        // Collection pages settings
        $form['profils'] = array(
            '#type'          => 'fieldset',
            '#title'         => 'Profils pages',
        );

        $form['profils']['profil_individual_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Profil Particulier - node ID',
            '#default_value' => $this->state->get('rp_site.settings.profils.individual')['nid'],
        );

        $form['profils']['profil_individual_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Profil Particulier - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.profils.individual')['theme'] ? $this->state->get('rp_site.settings.profils.individual')['theme'] : 'profil_individual',
        );
        $form['profils']['profil_individual_menu'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Profil Particulier - menu ID',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.profils.individual')['menu'] ? $this->state->get('rp_site.settings.profils.individual')['menu'] : 'menu_link_content:5b39083f-b9e1-4b3c-9146-c6c674cf844f',
        );
        $form['profils']['profil_individual_menu_project'] = array(
            '#type'          => 'textarea',
            '#title'         => 'Profil Particulier, Nouveau projet - menu IDs',
            '#default_value' => $this->state->get('rp_site.settings.profils.individual')['menu_project'] ? join(';', $this->state->get('rp_site.settings.profils.individual')['menu_project']) : '',
        );
        $form['profils']['profil_individual_menu_client'] = array(
            '#type'          => 'textarea',
            '#title'         => 'Profil Particulier, Déjà client - menu IDs',
            '#default_value' => $this->state->get('rp_site.settings.profils.individual')['menu_client'] ? join(';', $this->state->get('rp_site.settings.profils.individual')['menu_client']) : '',
        );

        $form['profils']['profil_company_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Profil Entreprise - node ID',
            '#default_value' => $this->state->get('rp_site.settings.profils.company')['nid'],
        );
        $form['profils']['profil_company_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Profil Entreprise - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.profils.company')['theme'] ? $this->state->get('rp_site.settings.profils.company')['theme'] : 'profil_company',
        );
        $form['profils']['profil_company_menu'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Profil Entreprise - menu ID',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.profils.company')['menu'] ? $this->state->get('rp_site.settings.profils.company')['menu'] : 'menu_link_content:9d1dafdc-251b-4456-a993-cfef04d66530',
        );

        $form['profils']['profil_public_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Profil Collectivités publiques - node ID',
            '#default_value' => $this->state->get('rp_site.settings.profils.public')['nid'],
        );
        $form['profils']['profil_public_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Profil Collectivités publiques - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.profils.public')['theme'] ? $this->state->get('rp_site.settings.profils.public')['theme'] : 'profil_public',
        );
        $form['profils']['profil_public_menu'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Profil Collectivités publiques - menu ID',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.profils.public')['menu'] ? $this->state->get('rp_site.settings.profils.public')['menu'] : 'menu_link_content:a7007bf2-c605-4284-8a24-5c4ee23717b7',
        );

        $form['collection']['contacts_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing Contacts - node ID',
            '#default_value' => $this->state->get('rp_site.settings.collection.contacts')['nid'],
        );
        $form['collection']['contacts_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing Contacts - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.collection.contacts')['theme'] ? $this->state->get('rp_site.settings.collection.contacts')['theme'] : 'contacts',
        );

        $form['collection']['advisors_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing Conseillers - node ID',
            '#default_value' => $this->state->get('rp_site.settings.collection.advisors')['nid'],
        );
        $form['collection']['advisors_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing Conseillers - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.collection.advisors')['theme'] ? $this->state->get('rp_site.settings.collection.advisors')['theme'] : 'advisors',
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

        $this->state->set('rp_site.settings.profils.individual', array(
            'nid' => trim($form_state->getValue('profil_individual_nid')),
            'theme' => trim($form_state->getValue('profil_individual_theme')),
            'menu' => trim($form_state->getValue('profil_individual_menu')),
            'menu_project' => explode(';', $form_state->getValue('profil_individual_menu_project')),
            'menu_client' => explode(';', $form_state->getValue('profil_individual_menu_client')),
        ));

        $this->state->set('rp_site.settings.profils.company', array(
            'nid' => trim($form_state->getValue('profil_company_nid')),
            'theme' => trim($form_state->getValue('profil_company_theme')),
            'menu' => trim($form_state->getValue('profil_company_menu')),
        ));

        $this->state->set('rp_site.settings.profils.public', array(
            'nid' => trim($form_state->getValue('profil_public_nid')),
            'theme' => trim($form_state->getValue('profil_public_theme')),
            'menu' => trim($form_state->getValue('profil_public_menu')),
        ));

        $this->state->set('rp_site.settings.collection.contacts', array(
            'nid' => trim($form_state->getValue('contacts_nid')),
            'theme' => trim($form_state->getValue('contacts_theme')),
        ));

        $this->state->set('rp_site.settings.collection.advisors', array(
            'nid' => trim($form_state->getValue('advisors_nid')),
            'theme' => trim($form_state->getValue('advisors_theme')),
        ));
    }
}
