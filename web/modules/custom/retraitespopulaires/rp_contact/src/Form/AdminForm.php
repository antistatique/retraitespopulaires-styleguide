<?php
/**
* @file
* Contains \Drupal\rp_contact\Form\AdminForm.
*/

namespace Drupal\rp_contact\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\file\Entity\File;

use Drupal\Core\State\StateInterface;
use Drupal\Core\Render\MetadataBubblingUrlGenerator;
use Drupal\file\FileUsage\FileUsageInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;

class AdminForm extends FormBase {

    /**
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    protected $state;

    /**
    * Decorator for the URL generator, which bubbles bubbleable URL metadata
    * @var MetadataBubblingUrlGenerator
    */
    protected $url;

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
    public function __construct(StateInterface $state, MetadataBubblingUrlGenerator $url, FileUsageInterface $file_usage, EntityTypeManagerInterface $entity) {
        $this->state      = $state;
        $this->url        = $url;
        $this->file_usage = $file_usage;
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
        $container->get('url_generator'),
        $container->get('file.usage'),
        $container->get('entity_type.manager')
      );
    }

    /**
    * {@inheritdoc}.
    */
    public function getFormId() {
        return 'rp_contact_admin_form';
    }

    /**
    * {@inheritdoc}
    */
    public function buildForm(array $form, FormStateInterface $form_state, $extra = NULL) {
        // Contact settings
        $form['contact'] = array(
            '#type'  => 'fieldset',
            '#title' => 'Contact',
        );

        $link = '<a href="'.$this->url->generateFromRoute('system.site_information_settings').'">'. t('Configuration') .' > '. t('System') .' > '. t('Basic site settings') . '</a>';
        $form['contact']['no_reply'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Adresse No-reply',
            '#disabled'      => true,
            '#default_value' => \Drupal::config('system.site')->get('mail'),
            '#description'  => t('Changer votre configuration ici: ') . $link
        );

        $form['contact']['receivers'] = array(
            '#type'          => 'textarea',
            '#title'         => 'Secteurs et e-mail notifié lors d\'une nouvelle demande',
            '#default_value' => $this->state->get('rp_contact.settings.receivers'),
            '#description'   => t('Séparer l\'e-mail et le secteur par un pipe (|).') .'<br />'. t('Séparer les différentes secteurs par un saut de ligne.'),
        );

        // Popin settings
        $form['popin'] = array(
          '#type'  => 'fieldset',
          '#title' => 'Popin',
        );
        $form['popin']['popin_receivers'] = array(
          '#type'          => 'textfield',
          '#title'         => 'E-mail(s) notifié(s) par défaut lors d\'une nouvelle demande',
          '#default_value' => $this->state->get('rp_contact.settings.popin')['receivers'],
          '#description'   => t('Séparer les adresses par le caractère point-virgule (;).<br>Il est possible de surcharger cette valeur au cas par cas lors de la création/édition d\'un contenu.'),
        );

        // Page settings
        $form['page'] = array(
            '#type'          => 'fieldset',
            '#title'         => 'Page d\'attaches des formulaires',
        );

        // Commande de documents Form
        $form['page']['documents_receivers'] = array(
            '#type'          => 'textfield',
            '#title'         => 'E-mail(s) notifié(s) lors d\'une nouvelle demande',
            '#default_value' => $this->state->get('rp_contact.settings.page.documents')['receivers'],
            '#description'   => t('Séparer les adresses par le caractère point-virgule (;).'),
            '#suffix'        => '<br/>'
        );

        // Changement d'adresses Form
        $form['page']['address_receivers'] = array(
            '#type'          => 'textfield',
            '#title'         => 'E-mail(s) notifié(s) lors d\'une nouvelle demande',
            '#default_value' => $this->state->get('rp_contact.settings.page.address')['receivers'],
            '#description'   => t('Séparer les adresses par le caractère point-virgule (;).'),
            '#suffix'        => '<br/>'
        );

        // Demande de réservation d\'un taux Form
        $form['page']['building_receivers'] = array(
            '#type'          => 'textfield',
            '#title'         => 'E-mail(s) notifié(s) lors d\'une nouvelle demande',
            '#default_value' => $this->state->get('rp_contact.settings.page.building')['receivers'],
            '#description'   => t('Séparer les adresses par le caractère point-virgule (;).'),
            '#suffix'        => '<br/>'
        );

        // Demande de conversion d'un taux variable en taux fixe
        $form['page']['conversion_receivers'] = array(
            '#type'          => 'textfield',
            '#title'         => 'E-mail(s) notifié(s) lors d\'une nouvelle demande',
            '#default_value' => $this->state->get('rp_contact.settings.page.conversion')['receivers'],
            '#suffix'        => '<br/>'
        );

        // Demande de modification de l'amortissement du 1er rang Form
        $form['page']['depreciation_receivers'] = array(
            '#type'          => 'textfield',
            '#title'         => 'E-mail(s) notifié(s) lors d\'une nouvelle demande',
            '#default_value' => $this->state->get('rp_contact.settings.page.depreciation')['receivers'],
            '#suffix'        => '<br/>'
        );

        // Demande d'augmentation de prêt Form
        $form['page']['loan_increase_receivers'] = array(
            '#type'          => 'textfield',
            '#title'         => 'E-mail(s) notifié(s) lors d\'une nouvelle demande',
            '#default_value' => $this->state->get('rp_contact.settings.page.loan_increase')['receivers'],
            '#suffix'        => '<br/>'
        );

        // Demande d'attestation d'intérêts Form
        $form['page']['tax_attestation_receivers'] = array(
            '#type'          => 'textfield',
            '#title'         => 'E-mail(s) notifié(s) lors d\'une nouvelle demande',
            '#default_value' => $this->state->get('rp_contact.settings.page.tax_attestation')['receivers'],
            '#description'   => t('Séparer les adresses par le caractère point-virgule (;).'),
        );

        // Collection pages settings
        $form['collection'] = array(
            '#type'          => 'fieldset',
            '#title'         => 'Collection pages',
        );

        // Listing des conseillers
        $form['collection']['advisors_nid'] = array(
            '#type'          => 'entity_autocomplete',
            '#target_type'   => 'node',
            '#title'         => 'Listing des conseillers - node ID',
            '#default_value' => $this->state->get('rp_contact.settings.collection.advisors')['nid'] ? $this->entity_node->load($this->state->get('rp_contact.settings.collection.advisors')['nid']) : NULL,
        );
        $form['collection']['advisors_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing des conseillers - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_contact.settings.collection.advisors')['theme'] ? $this->state->get('rp_contact.settings.collection.advisors')['theme'] : 'collection_advisors',
            '#suffix'        => '<br/>'
        );

        // Listing des contacts
        $form['collection']['contacts_nid'] = array(
            '#type'          => 'entity_autocomplete',
            '#target_type'   => 'node',
            '#title'         => 'Listing des contacts - node ID',
            '#default_value' => $this->state->get('rp_contact.settings.collection.contacts')['nid'] ? $this->entity_node->load($this->state->get('rp_contact.settings.collection.contacts')['nid']) : NULL,
        );
        $form['collection']['contacts_theme'] = array(
            '#type'          => 'textfield',
            '#title'         => 'Listing des contacts - theme hook',
            '#disabled'      => true,
            '#default_value' => $this->state->get('rp_contact.settings.collection.contacts')['theme'] ? $this->state->get('rp_contact.settings.collection.contacts')['theme'] : 'collection_contacts',
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
        $mails = explode(PHP_EOL, $form_state->getValue('receivers'));
        $mails = array_map('trim', $mails);
        foreach($mails as $mail) {
            $part = explode('|', $mail);
            if (!filter_var($part[0], FILTER_VALIDATE_EMAIL)) {
                $form_state->setErrorByName('receivers', t('@email n\'est pas une adresse valide.', array('@email' => $part[0])));
            }
        }
    }

    /**
    * {@inheritdoc}
    */
    public function submitForm(array &$form, FormStateInterface $form_state) {
        // General settings
        $this->state->set('rp_contact.settings.receivers', trim($form_state->getValue('receivers')));

        // Popin settings.
        $this->state->set('rp_contact.settings.popin', [
          'receivers' => trim($form_state->getValue('popin_receivers')),
        ]);

        // Page with forms settings
        $this->state->set('rp_contact.settings.page.documents', array(
            'receivers' => trim($form_state->getValue('documents_receivers')),
        ));

        $this->state->set('rp_contact.settings.page.address', array(
            'receivers' => trim($form_state->getValue('address_receivers')),
        ));

        $this->state->set('rp_contact.settings.page.building', array(
            'receivers' => trim($form_state->getValue('building_receivers')),
        ));

        $this->state->set('rp_contact.settings.page.conversion', array(
            'receivers' => trim($form_state->getValue('conversion_receivers')),
        ));

        $this->state->set('rp_contact.settings.page.depreciation', array(
            'receivers' => trim($form_state->getValue('depreciation_receivers')),
        ));

        $this->state->set('rp_contact.settings.page.loan_increase', array(
            'receivers' => trim($form_state->getValue('loan_increase_receivers')),
        ));

        $this->state->set('rp_contact.settings.page.tax_attestation', array(
            'receivers' => trim($form_state->getValue('tax_attestation_receivers')),
        ));

        // Collection pages settings
        $this->state->set('rp_contact.settings.collection.advisors', array(
            'nid'   => trim($form_state->getValue('advisors_nid')),
            'theme' => trim($form_state->getValue('advisors_theme')),
        ));
        $this->state->set('rp_contact.settings.collection.contacts', array(
            'nid'   => trim($form_state->getValue('contacts_nid')),
            'theme' => trim($form_state->getValue('contacts_theme')),
        ));
    }
}
