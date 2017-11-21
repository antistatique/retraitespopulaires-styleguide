<?php
/**
* @file
* Contains \Drupal\rp_site\Form\AdminForm.
*/

namespace Drupal\rp_site\Form;

use Drupal\Core\Entity\EntityTypeManagerInterface;
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
     * @var EntityTypeManagerInterface
     */
    private $entity;

    /**
     * Class constructor.
     */
    public function __construct(StateInterface $state, FileUsageInterface $file_usage, EntityTypeManagerInterface $entity) {
        $this->state      = $state;
        $this->file_usage = $file_usage;
        $this->entity = $entity;
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container) {
      // Instantiates this form class.
      return new static(
        // Load the service required to construct this class.
        $container->get('state'),
        $container->get('file.usage'),
        $container->get('entity_type.manager')
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
        $nodeEntity = $this->entity->getStorage('node');

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

        // Single pages settings
        $form['single'] = array(
            '#type'          => 'fieldset',
            '#title'         => 'Pages spéciales',
        );

        $form['single']['contact_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Contact Global - node ID',
            '#default_value' => $this->state->get('rp_site.settings.single.contact')['nid'],
        );
        $form['single']['contact_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Contact Global - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.contact')['theme'] ? $this->state->get('rp_site.settings.single.contact')['theme'] : 'global_contact',
        );

        $form['collection']['mortgage_calculator_nid'] = array(
            '#type'          => 'entity_autocomplete',
            '#target_type'  => 'node',
            '#title'         => 'Calculateur d\'hypothèque - node ID',
            '#default_value' => $this->state->get('rp_site.settings.collection.mortgage_calculator')['nid'] ? $nodeEntity->load($this->state->get('rp_site.settings.collection.mortgage_calculator')['nid']) : NULL,
        );

        $form['collection']['mortgage_calculator_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Calculateur d\'hypothèque - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.collection.mortgage_calculator')['theme'] ? $this->state->get('rp_site.settings.collection.mortgage_calculator')['theme'] : 'mortgage_calculator',
        );

        $form['collection']['mortgage_rates_nid'] = array(
            '#type'          => 'entity_autocomplete',
            '#target_type'  => 'node',
            '#title'         => 'Tableau de taux hypothéquaires - node ID',
            '#default_value' => $this->state->get('rp_site.settings.collection.mortgage_tablerates')['nid'] ? $nodeEntity->load($this->state->get('rp_site.settings.collection.mortgage_tablerates')['nid']) : NULL,
        );

        $form['collection']['mortgage_rates_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Tableau de taux hypothéquaires - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.collection.mortgage_tablerates')['theme'] ? $this->state->get('rp_site.settings.collection.mortgage_tablerates')['theme'] : 'mortgage_tablerates',
        );

        $form['collection']['constructionloan_tablerates_nid'] = array(
            '#type'          => 'entity_autocomplete',
            '#target_type'  => 'node',
            '#title'         => 'Tableau de taux pour les crédits de construction - node ID',
            '#default_value' => $this->state->get('rp_site.settings.collection.constructionloan_tablerates')['nid'] ? $nodeEntity->load($this->state->get('rp_site.settings.collection.constructionloan_tablerates')['nid']) : NULL,
        );

        $form['collection']['constructionloan_tablerates_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Tableau de taux pour les crédits de construction - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.collection.constructionloan_tablerates')['theme'] ? $this->state->get('rp_site.settings.collection.constructionloan_tablerates')['theme'] : 'constructionloan_tablerates',
        );


        $form['collection']['localauthoritiesloan_tablerates_nid'] = array(
            '#type'          => 'entity_autocomplete',
            '#target_type'  => 'node',
            '#title'         => 'Tableau de taux pour prêt aux collectivités - node ID',
            '#default_value' => $this->state->get('rp_site.settings.collection.localauthoritiesloan_tablerates')['nid'] ? $nodeEntity->load($this->state->get('rp_site.settings.collection.localauthoritiesloan_tablerates')['nid']) : NULL,
        );

        $form['collection']['localauthoritiesloan_tablerates_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Tableau de taux pour prêt aux collectivités - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_site.settings.collection.localauthoritiesloan_tablerates')['theme'] ? $this->state->get('rp_site.settings.collection.localauthoritiesloan_tablerates')['theme'] : 'localauthoritiesloan_tablerates',
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

        // General settings
        $this->state->set('rp_site.settings.single.contact', array(
            'nid' => trim($form_state->getValue('contact_nid')),
            'theme' => trim($form_state->getValue('contact_theme')),
        ));

        $this->state->set('rp_site.settings.collection.mortgage_calculator', array(
            'nid' => trim($form_state->getValue('mortgage_calculator_nid')),
            'theme' => trim($form_state->getValue('mortgage_calculator_theme')),
        ));

        $this->state->set('rp_site.settings.collection.mortgage_tablerates', array(
            'nid' => trim($form_state->getValue('mortgage_rates_nid')),
            'theme' => trim($form_state->getValue('mortgage_rates_theme')),
        ));

        $this->state->set('rp_site.settings.collection.constructionloan_tablerates', array(
            'nid' => trim($form_state->getValue('constructionloan_tablerates_nid')),
            'theme' => trim($form_state->getValue('constructionloan_tablerates_theme')),
        ));

        $this->state->set('rp_site.settings.collection.localauthoritiesloan_tablerates', array(
            'nid' => trim($form_state->getValue('localauthoritiesloan_tablerates_nid')),
            'theme' => trim($form_state->getValue('localauthoritiesloan_tablerates_theme')),
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
