<?php
/**
* @file
* Contains \Drupal\rp_site\Form\AdminForm.
*/

namespace Drupal\rp_site\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\file\Entity\File;

use Drupal\Core\State\StateInterface;
use Drupal\file\FileUsage\FileUsageInterface;

class AdminForm extends FormBase {

    /**
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    protected $state;

    /**
    * Defines the database file usage backend. This is the default Drupal backend.
    * @var FileUsageInterface
    */
    protected $file_usage;

    /**
     * Class constructor.
     */
    public function __construct(StateInterface $state, FileUsageInterface $file_usage) {
        $this->state      = $state;
        $this->file_usage = $file_usage;
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container) {
      // Instantiates this form class.
      return new static(
        // Load the service required to construct this class.
        $container->get('state'),
        $container->get('file.usage')
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
        // Layout settings
        $form['layout'] = array(
            '#type'  => 'fieldset',
            '#title' => t('Images'),
        );
        $form['layout']['homepage'] = array(
            '#type'            => 'managed_file',
            '#title'           => t('Image de homepage'),
            '#default_value'   => !empty($this->state->get('rp_site.settings.homepage')) ? array($this->state->get('rp_site.settings.homepage')) : null,
            '#upload_location' => 'public://rp_site/homepage',
            '#description'     => t('Merci de déposer une image Retina de min. 2200x600 pixels'),
        );

        // Collection pages settings
        $form['collection'] = array(
            '#type'          => 'fieldset',
            '#title'         => 'Collection pages',
        );

        $form['collection']['news_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing Actualites - node ID',
            '#default_value' => $this->state->get('rp_site.settings.collection.news')['nid'],
        );
        $form['collection']['news_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing Actualites - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.collection.news')['theme'] ? $this->state->get('rp_site.settings.collection.news')['theme'] : 'collection_actualites',
            '#suffix'        => '<br/>'
        );

        $form['collection']['contacts_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Global Contacts - node ID',
            '#default_value' => $this->state->get('rp_site.settings.collection.contacts')['nid'],
        );
        $form['collection']['contacts_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Global Contacts - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.collection.contacts')['theme'] ? $this->state->get('rp_site.settings.collection.contacts')['theme'] : 'contact',
            '#suffix'        => '<br/>'
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
            '#suffix'        => '<br/>'
        );

        $form['collection']['documents_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing Documents utiles - node ID',
            '#default_value' => $this->state->get('rp_site.settings.collection.documents')['nid'],
        );
        $form['collection']['documents_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing Documents utiles - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.collection.documents')['theme'] ? $this->state->get('rp_site.settings.collection.documents')['theme'] : 'collection_documents',
            '#suffix'        => '<br/>'
        );

        $form['collection']['faqs_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing Questions-réponses - node ID',
            '#default_value' => $this->state->get('rp_site.settings.collection.faqs')['nid'],
        );
        $form['collection']['faqs_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing Questions-réponses - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.collection.faqs')['theme'] ? $this->state->get('rp_site.settings.collection.faqs')['theme'] : 'collection_faqs',
            '#suffix'        => '<br/>'
        );

        $form['collection']['buildings_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing Constructions - node ID',
            '#default_value' => $this->state->get('rp_site.settings.collection.buildings')['nid'],
        );
        $form['collection']['buildings_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing Constructions - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.collection.buildings')['theme'] ? $this->state->get('rp_site.settings.collection.buildings')['theme'] : 'collection_buildings',
            '#suffix'        => '<br/>'
        );

        $form['collection']['management_contracts_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing Mandats de gestion - node ID',
            '#default_value' => $this->state->get('rp_site.settings.collection.management_contracts')['nid'],
        );
        $form['collection']['management_contracts_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing Mandats de gestion - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.collection.management_contracts')['theme'] ? $this->state->get('rp_site.settings.collection.management_contracts')['theme'] : 'collection_management_contracts',
            '#suffix'        => '<br/>'
        );

        $form['collection']['partnerships_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing Partenaires - node ID',
            '#default_value' => $this->state->get('rp_site.settings.collection.partnerships')['nid'],
        );
        $form['collection']['partnerships_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing Partenaires - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.collection.partnerships')['theme'] ? $this->state->get('rp_site.settings.collection.partnerships')['theme'] : 'collection_partnerships',
        );

        // Profils pages settings
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
            '#suffix'        => '<br/>'
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
            '#suffix'        => '<br/>'
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
        // Save homepage
        $this->state->set('rp_site.settings.homepage', '');
        $homepage = $form_state->getValue('homepage');
        if( !empty($homepage)  ){
            $homepage = reset($homepage);
            $this->state->set('rp_site.settings.homepage', $homepage);
            $file = File::load($homepage);
            $this->saveFileAsPermanent($file);
        }

        // General settings
        $this->state->set('rp_site.settings.collection.news', array(
            'nid' => trim($form_state->getValue('news_nid')),
            'theme' => trim($form_state->getValue('news_theme')),
        ));

        $this->state->set('rp_site.settings.collection.faqs', array(
            'nid' => trim($form_state->getValue('faqs_nid')),
            'theme' => trim($form_state->getValue('faqs_theme')),
        ));

        $this->state->set('rp_site.settings.collection.documents', array(
            'nid' => trim($form_state->getValue('documents_nid')),
            'theme' => trim($form_state->getValue('documents_theme')),
        ));

        $this->state->set('rp_site.settings.collection.buildings', array(
            'nid' => trim($form_state->getValue('buildings_nid')),
            'theme' => trim($form_state->getValue('buildings_theme')),
        ));

        $this->state->set('rp_site.settings.collection.management_contracts', array(
            'nid' => trim($form_state->getValue('management_contracts_nid')),
            'theme' => trim($form_state->getValue('management_contracts_theme')),
        ));

        $this->state->set('rp_site.settings.collection.partnerships', array(
            'nid' => trim($form_state->getValue('partnerships_nid')),
            'theme' => trim($form_state->getValue('partnerships_theme')),
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

    /**
     * New files are uploaded with a status of 0 and are treated as temporary files which are removed after 6 hours
     * We are responsible for changing the $file objects status to FILE_STATUS_PERMANENT
     * @method saveFile
     * @param  File     $file [description]
     * @return [type]         [description]
     */
    protected function saveFileAsPermanent(File $file) {
        if( !$file->isPermanent() ){
            $file->setPermanent();
            $file->save();
            // Add entry to file_usage
            $this->file_usage->add($file, 'rp_site', 'module', 1);
        }
    }
}
