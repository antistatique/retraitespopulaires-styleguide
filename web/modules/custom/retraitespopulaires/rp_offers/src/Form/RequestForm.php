<?php
/**
* @file
* Contains \Drupal\rp_offers\Form\RequestForm.
*/

namespace Drupal\rp_offers\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
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
        $form['#action'] = '#rp-offers-form';

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

        if( isset($this->session->get('errors')['email']) && $error_msg = $this->session->get('errors')['email'] ){
            $error_class = 'error';
            $error = '<div class="input-error-desc">'.$error_msg.'</div>';
        }

        // A hidden field can't be altered, Drupal assert it
        $form['node'] = array(
            '#type'     => 'hidden',
            '#value'    => $params['node']->nid->value,
            '#required' => true
        );

        // Calculate the number of day(s) left to generate dynamic title
        $title = t('Cette offre est terminée, vous ne pouvez plus participer au tirage au sort');
        $now = new \DateTime();
        $date_end = \DateTime::createFromFormat('Y-m-d', $params['node']->field_date_end->value);
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
          '#attributes' => ['class' => array('fieldset-bordered fieldset-no-legend')],
          '#title'      => $title,
          '#prefix'     => '<h3>'.$title.'</h3>',
        );

        $form['personnal']['firstname'] = array(
            '#title'       => t('Votre prénom'),
            '#placeholder' => t('Alain'),
            '#type'        => 'textfield',
            '#required'    => true,
            '#prefix'      => '<div class="form-group">',
            '#suffix'      => '</div>',
        );

        $form['personnal']['lastname'] = array(
            '#title'       => t('Votre nom de famille'),
            '#placeholder' => t('Rochat'),
            '#type'        => 'textfield',
            '#required'    => true,
            '#prefix'      => '<div class="form-group">',
            '#suffix'      => '</div>',
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
            '#title'       => t('Votre E-mail'),
            '#placeholder' => t('alain.rochat@retraitespopulaires.ch'),
            '#type'        => 'email',
            '#required'    => true,
            '#prefix'      => '<div class="form-group '.$error_class.'">',
            '#suffix'      => $error. '</div>',
        );

        $form['personnal']['address'] = array(
            '#title'       => t('Votre adresse'),
            '#placeholder' => t('Chemin de l\'Avenir 1'),
            '#type'        => 'textfield',
            '#required'    => true,
            '#prefix'      => '<div class="form-group">',
            '#suffix'      => '</div>',
        );

        $form['personnal']['zip'] = array(
            '#title'       => t('Votre NPA'),
            '#placeholder' => t('1000'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 10],
            '#required'    => true,
            '#prefix'      => '<div class="form-group">',
            '#suffix'      => '</div>',
        );

        $form['personnal']['city'] = array(
            '#title'       => t('Votre localité'),
            '#placeholder' => t('Lausanne'),
            '#type'        => 'textfield',
            '#attributes'  => ['size' => 30],
            '#required'    => true,
            '#prefix'      => '<div class="form-group">',
            '#suffix'      => '</div>',
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
            $errors['email'] = t('Il me semble que vous avez déjà participer.');
        }

        // Assert the node is both active & currently running
        if (!$this->request->isEnable($form_state->getValue('node'))) {
            $errors['email'] = t('Navré mais il n\'est plus possible de participer à cette offre.');
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
                'firstname' => $form_state->getValue('firstname'),
                'lastname'  => $form_state->getValue('lastname'),
                'email'     => $form_state->getValue('email'),
                'address'   => $form_state->getValue('address'),
                'zip'       => $form_state->getValue('zip'),
                'city'      => $form_state->getValue('city'),
                'node'      => $form_state->getValue('node'),
            );
            $request = $this->request->consume($data);

            $this->request->adminEmail($request);

            drupal_set_message(t('Merci de votre participation.'));

            $form_state->setRedirect('entity.node.canonical', ['node' =>$form_state->getValue('node') ]);
        }
    }
}
