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

        $form['simulator']['age_man'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Homme - Åge terme pour le versement des prestations',
            '#default_value' => $this->state->get('rp_libre_passage.settings.age_man'),
            '#description'   => t('Séparer les âges par le caractère point-virgule (;).'),
        );

        $form['simulator']['age_woman'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Femme - Åge terme pour le versement des prestations',
            '#default_value' => $this->state->get('rp_libre_passage.settings.age_woman'),
            '#description'   => t('Séparer les âges par le caractère point-virgule (;).'),
        );

        $form['simulator']['form_pdf'] = array(
            '#type'            => 'managed_file',
            '#title'           => t('Demande d\'affiliation'),
            '#default_value'   => !empty($this->state->get('rp_libre_passage.settings.form_pdf')) ? array($this->state->get('rp_libre_passage.settings.form_pdf')) : null,
            '#upload_location' => 'public://rp_libre_passage/form_pdf',
            '#description'     => t('Merci de déposer une fichier PDF.'),
        );

        $form['simulator']['simulator_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Simulateur - node ID',
            '#default_value' => $this->state->get('rp_libre_passage.settings.page.simulator')['nid'],
        );
        $form['simulator']['simulator_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Simulateur - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_libre_passage.settings.page.simulator')['theme'] ? $this->state->get('rp_libre_passage.settings.page.simulator')['theme'] : 'libre_passage_simulator',
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
            '#title'         => 'E-mail(s) notifié(s) lors d\'une demande d\'information',
            '#default_value' => $this->state->get('rp_libre_passage.settings.receivers'),
            '#description'   => t('Séparer les adresses par le caractère point-virgule (;).'),
        );

        $form['contact']['contact_nid'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Contact - node ID',
            '#default_value' => $this->state->get('rp_libre_passage.settings.page.contact')['nid'],
        );
        $form['contact']['contact_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Contact - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_libre_passage.settings.page.contact')['theme'] ? $this->state->get('rp_libre_passage.settings.page.contact')['theme'] : 'libre_passage_contact',
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

        $this->state->set('rp_libre_passage.settings.age_man', trim($form_state->getValue('age_man')));
        $this->state->set('rp_libre_passage.settings.age_woman', trim($form_state->getValue('age_woman')));

        $this->state->set('rp_libre_passage.settings.page.simulator', array(
            'nid' => trim($form_state->getValue('simulator_nid')),
            'theme' => trim($form_state->getValue('simulator_theme')),
        ));

        $this->state->set('rp_libre_passage.settings.page.contact', array(
            'nid' => trim($form_state->getValue('contact_nid')),
            'theme' => trim($form_state->getValue('contact_theme')),
        ));

        // Save file(s)
        $files = array(
            'rp_libre_passage.settings.form_pdf' =>$form_state->getValue('form_pdf') ,
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
            $this->file_usage->add($file, 'rp_libre_passage', 'module', 1);
        }
    }
}
