<?php
/**
* @file
* Contains \Drupal\rp_offers\Form\RequestForm.
*/

namespace Drupal\rp_offers\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Link;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\rp_offers\Service\Request;
use Drupal\user\PrivateTempStoreFactory;

class RequestForm extends FormBase {

    /**
     * Request Custom Service
     * @var Request
     */
    protected $request;

    /**
     * Stores and retrieves temporary data for a given owner
     * @var PrivateTempStoreFactory
     */
    protected $session;

    /**
     * Class constructor.
     */
    public function __construct(Request $request, PrivateTempStoreFactory $private_tempstore) {
        $this->request = $request;

        // Init session
        // TODO Found better solution to inline errors than hack session to
        $this->session = $private_tempstore->get(self::getFormId());
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container) {
      // Instantiates this form class.
      return new static(
        // Load the service required to construct this class.
        $container->get('rp_offers.request'),
        $container->get('user.private_tempstore')
      );
    }

    /**
    * {@inheritdoc}.
    */
    public function getFormId() {
        return 'rp_offers_form';
    }

    /**
    * {@inheritdoc}
    */
    public function buildForm(array $form, FormStateInterface $form_state, $params = NULL) {
        $form['#action'] = '#bellavita-offers-form';
        $form['#attributes']['id'] = 'bellavita-offers-form';

        // Disable caching & HTML5 validation
        $form['#cache']['max-age'] = 0;
        $form['#attributes']['novalidate'] = 'novalidate';

        $status = drupal_get_messages('status');
        if (!empty($status['status'])) {
            $form['status'] = array(
                '#markup' => '<div class="well well-success well-lg"><p>'.$status['status'][0].'</p></div>',
            );
        }
        if (!empty($this->session->get('errors'))) {
            $form['errors'] = array(
                '#markup' => '<div class="well well-danger well-lg"><p>'.t('Attention, des erreurs sont survenues dans le formulaire. Merci de vérifier les champs en rouge.').'</p></div>',
            );
        }

        // A hidden field can't be altered, Drupal assert it
        $form['node'] = array(
            '#type'     => 'hidden',
            '#value'    => $params['node']->nid->value,
            '#required' => false
        );

        // Calculate the number of day(s) left to generate dynamic title
        $title = t('Cette offre est terminée, vous ne pouvez plus participer au tirage au sort');
        $now = new \DateTime();
        $date_end = \DateTime::createFromFormat('Y-m-d', $params['node']->field_date_end->value);
        $date_end->setTime(23,59);
        if ($now <= $date_end) {
            $interval = $now->diff($date_end);
            $days = $interval->format('%a');
            if ($days > 1) {
                $title = t('Il vous reste @days jours pour participer au tirage au sort', ['@days' => $days] );
            } elseif ($interval->format('%a') == 1) {
                $title = t('Il vous reste 1 jour pour participer aux tirage au sort');
            } else {
                $title = t('C\'est le dernier jour pour participer au tirage au sort dépêcher vous');
            }
        }
        $form['personnal'] = array(
          '#type'       => 'fieldset',
          '#attributes' => ['class' => array('fieldset-no-legend')],
          '#title'      => $title,
          '#prefix'     => '<h3>'.$title.'</h3>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['civil_state']) && $error_msg = $this->session->get('errors')['civil_state'] ){
          $error_class = 'error';
          $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['personnal']['civil_state'] = array(
          '#title'       => t('Votre état civil *'),
          '#type'        => 'select',

          '#options'     => array('Madame' => t('Madame'), 'Monsieur' => t('Monsieur')),
          '#required'    => false,
          '#prefix'      => '<div class="form-group '.$error_class.'">',
          '#suffix'      => $error. '</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['firstname']) && $error_msg = $this->session->get('errors')['firstname'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['personnal']['firstname'] = array(
            '#title'       => t('Votre prénom *'),
            '#placeholder' => t('Alain'),
            '#type'        => 'textfield',
            '#required'    => false,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['lastname']) && $error_msg = $this->session->get('errors')['lastname'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['personnal']['lastname'] = array(
            '#title'       => t('Votre nom de famille *'),
            '#placeholder' => t('Rochat'),
            '#type'        => 'textfield',
            '#required'    => false,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['email']) && $error_msg = $this->session->get('errors')['email'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['personnal']['email'] = array(
            '#title'       => t('Votre e-mail *'),
            '#placeholder' => t('alain.rochat@retraitespopulaires.ch'),
            '#type'        => 'textfield',
            '#required'    => false,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['address']) && $error_msg = $this->session->get('errors')['address'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['personnal']['address'] = array(
            '#title'       => t('Votre adresse *'),
            '#placeholder' => t('Chemin de l\'Avenir 1'),
            '#type'        => 'textfield',
            '#required'    => false,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['zip']) && $error_msg = $this->session->get('errors')['zip'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['personnal']['zip'] = array(
            '#title'       => t('Votre code postal (NPA) *'),
            '#placeholder' => t('1000'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 10],
            '#required'    => false,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        // Get error to inline it as suffix
        // TODO Found better solution to inline errors than hack session to
        $error = '';
        $error_class = '';
        if( isset($this->session->get('errors')['city']) && $error_msg = $this->session->get('errors')['city'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }
        $form['personnal']['city'] = array(
            '#title'       => t('Votre localité *'),
            '#placeholder' => t('Lausanne'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 30],
            '#required'    => false,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        $form['separator'] = array( '#markup' => '<hr />' );

        $form['actions']['submit'] = array(
            '#type'        => 'submit',
            '#value'       => t('Je participe'),
            '#attributes'  => ['class' => array('btn-primary pull-right')],
            '#button_type' => 'primary',
            '#prefix'      => '<div class="form-group">',
            '#suffix'      => '</div>',
        );

        // TODO Found better solution to inline errors than hack session to
        $this->session->delete('errors');

        return $form;
    }

    /**
    * {@inheritdoc}
    */
    public function validateForm(array &$form, FormStateInterface $form_state) {
        // TODO Found better solution to inline errors than hack session to
        // Rebuild the form to keep data on error
        $form_state->setRebuild();
        $errors = array();

        // Assert the email is valid
        if (!$form_state->getValue('email') || !filter_var($form_state->getValue('email'), FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = t('Cette adresse e-mail semble invalide.');
        }

        // Assert this email don't already request that node
        if (!$this->request->isAvailable($form_state->getValue('email'), $form_state->getValue('node'))) {
            $errors['email'] = t('Vous avez déjà participé. Merci de tenter votre chance lors d\'un prochain concours.');
        }

        // Assert the node is both active & currently running
        if (!$this->request->isEnable($form_state->getValue('node'))) {
            $errors['email'] = t('Navré mais il n\'est plus possible de participer à cette offre.');
        }

        // Assert the civil_state is valid
        if (!$form_state->getValue('civil_state') || empty($form_state->getValue('civil_state'))) {
           $errors['civil_state'] = t('Votre état civile est obligatoire.');
        }

        // Assert Votre prénom is valid
        if (!$form_state->getValue('firstname') || empty($form_state->getValue('firstname'))) {
            $errors['firstname'] = t('Votre prénom est obligatoire.');
        }

        // Assert Votre nom de famille is valid
        if (!$form_state->getValue('lastname') || empty($form_state->getValue('lastname'))) {
            $errors['lastname'] = t('Votre nom de famille est obligatoire.');
        }

        // Assert Votre adresse is valid
        if (!$form_state->getValue('address') || empty($form_state->getValue('address'))) {
            $errors['address'] = t('Votre adresse est obligatoire.');
        }

        // Assert Votre NPA is valid
        if (!$form_state->getValue('zip') || empty($form_state->getValue('zip'))) {
            $errors['zip'] = t('Votre code postale (NPA) est obligatoire.');
        }

        // Assert Votre localite is valid
        if (!$form_state->getValue('city') || empty($form_state->getValue('city'))) {
            $errors['city'] = t('Votre localité est obligatoire.');
        }

        // Save errors in sessions to use it on the form builder
        // TODO Found better solution to inline errors than hack session to
        $this->session->set('errors', $errors);

        // If no error, disable rebuilding form
        // TODO Found better solution to inline errors than hack session to
        if (empty($this->session->get('errors'))) {
            $form_state->setRebuild(false);
        }
    }

    /**
    * {@inheritdoc}
    */
    public function submitForm(array &$form, FormStateInterface $form_state) {
        // TODO Found better solution to inline errors than hack session to
        if (empty($this->session->get('errors'))) {
            $data = array(
                'civil_state' => $form_state->getValue('civil_state'),
                'firstname'   => $form_state->getValue('firstname'),
                'lastname'    => $form_state->getValue('lastname'),
                'email'       => $form_state->getValue('email'),
                'address'     => $form_state->getValue('address'),
                'zip'         => $form_state->getValue('zip'),
                'city'        => $form_state->getValue('city'),
                'node'        => $form_state->getValue('node'),
            );
            $request = $this->request->consume($data);

            $this->request->adminEmail($request);

            $link = Link::createFromRoute(t('retour aux offres'),
              'entity.node.canonical',
              ['node' => \Drupal::state()->get('rp_offers.settings.collection.offers')['nid']]
            )->toString();

            drupal_set_message(t('Merci de votre participation, ') . $link);

            $form_state->setRedirect('entity.node.canonical', ['node' => $form_state->getValue('node') ]);
        }
    }
}
