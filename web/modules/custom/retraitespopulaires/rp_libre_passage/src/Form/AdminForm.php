<?php
/**
* @file
* Contains \Drupal\rp_libre_passage\Form\AdminForm.
*/

namespace Drupal\rp_libre_passage\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\file\Entity\File;

// Use Static Url instead of MetadataBubblingUrlGenerator -> According Drupal doc "@internal, MetadataBubblingUrlGenerator, Should not be used in user code"
Use Drupal\Core\Url;

use Drupal\Core\State\StateInterface;
use Drupal\file\FileUsage\FileUsageInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;

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
    * EntityTypeManagerInterface to load Nodes
    * @var EntityTypeManagerInterface
    */
    private $entity_node;

    /**
     * Class constructor.
     */
    public function __construct(StateInterface $state, FileUsageInterface $file_usage, EntityTypeManagerInterface $entity) {
        $this->state       = $state;
        $this->file_usage  = $file_usage;
        $this->entity_node = $entity->getStorage('node');
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
        return 'rp_libre_passage_admin_form';
    }

    /**
    * {@inheritdoc}
    */
    public function buildForm(array $form, FormStateInterface $form_state, $extra = NULL) {
        // Simulator settings
        $form['simulator'] = array(
            '#type'  => 'fieldset',
            '#title' => t('Simulateur de libre passage Arc-en-ciel'),
        );

        $form['simulator']['form_pdf'] = array(
            '#type'            => 'managed_file',
            '#title'           => t('Demande d\'affiliation'),
            '#default_value'   => !empty($this->state->get('rp_libre_passage.settings.form_pdf')) ? array($this->state->get('rp_libre_passage.settings.form_pdf')) : null,
            '#upload_location' => 'public://rp_libre_passage/form_pdf',
            '#description'     => t('Merci de déposer un fichier PDF.'),
        );

        $form['simulator']['calculator_nid'] = array(
            '#type'          => 'entity_autocomplete',
            '#target_type'  => 'node',
            '#title'         => 'Simulateur - node ID',
            '#default_value' => $this->state->get('rp_libre_passage.settings.page.calculator')['nid'] ? $this->entity_node->load($this->state->get('rp_libre_passage.settings.page.calculator')['nid']) : NULL,
        );
        $form['simulator']['calculator_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Simulateur - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_libre_passage.settings.page.calculator')['theme'] ? $this->state->get('rp_libre_passage.settings.page.calculator')['theme'] : 'libre_passage_calculator',
            '#suffix'        => '<br/>'
        );

        // Contact settings
        $form['contact'] = array(
            '#type'  => 'fieldset',
            '#title' => 'Contact',
        );

        $link = '<a href="'.Url::fromRoute('system.site_information_settings')->toString().'">'. t('Configuration') .' > '. t('System') .' > '. t('Basic site settings') . '</a>';
        $form['contact']['no_reply'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Adresse No-reply',
            '#disabled'      => true,
            '#default_value' => \Drupal::config('system.site')->get('mail'),
            '#description'  => t('Changer votre configuration ici: ') . $link
        );

        $form['contact']['receivers'] = array(
            '#type'          => 'textfield',
            '#title'         => 'E-mail(s) notifié(s) lors d\'une nouvelle demande',
            '#default_value' => $this->state->get('rp_libre_passage.settings.receivers'),
            '#description'   => t('Séparer les adresses par le caractère point-virgule (;).'),
        );

        $form['actions']['submit'] = array(
            '#type'        => 'submit',
            '#value'       => t('Sauvegarder'),
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
        $mails = explode(';', $form_state->getValue('receivers'));
        $mails = array_map('trim', $mails);
        foreach($mails as $mail) {
            if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
                $form_state->setErrorByName('receivers', t('@email n\'est pas une adresse valide.', array('@email' => $mail)));
            }
        }
    }

    /**
    * {@inheritdoc}
    */
    public function submitForm(array &$form, FormStateInterface $form_state) {
        // Contact settings
        $this->state->set('rp_libre_passage.settings.receivers', trim($form_state->getValue('receivers')));

        $this->state->set('rp_libre_passage.settings.page.calculator', array(
            'nid' => trim($form_state->getValue('calculator_nid')),
        ));

        // Save file(s)
        $files = array(
            'rp_libre_passage.settings.form_pdf' => $form_state->getValue('form_pdf') ,
        );
        foreach ($files as $key => $value) {
            if (!empty($value)) {
                $file = reset($value);
                $this->state->set($key, $file);
                $file = File::load($file);
                $this->saveFileAsPermanent($file);
            }elseif (!empty($this->state->get($key))) {
                $deleted = $this->state->get($key);
                file_delete($deleted);
                $this->state->set($key, '');
            }
        }
    }

    /**
     * Chane the $file objects status to FILE_STATUS_PERMANENT
     * @method saveFile
     * @param  File $file
     */
    protected function saveFileAsPermanent(File $file) {
        if( !$file->isPermanent() ){
            $file->setPermanent();
            $file->save();
            // Add entry to file_usage
            $this->file_usage->add($file, 'rp_libre_passage', 'module', 1);
        }
    }
}
