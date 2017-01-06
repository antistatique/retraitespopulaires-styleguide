<?php
/**
* @file
* Contains \Drupal\rp_site\Form\SearchForm.
*/

namespace Drupal\rp_site\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RequestStack;

class SearchForm extends FormBase {

    /**
    * Request stack that controls the lifecycle of requests
    * @var RequestStack
    */
    private $request;

    /**
    * Class constructor.
    */
    public function __construct(RequestStack $request) {
        $this->request = $request->getMasterRequest();
    }

    /**
     * {@inheritdoc}
     */
    public static function create(ContainerInterface $container) {
      // Instantiates this form class.
      return new static(
        // Load the service required to construct this class.
        $container->get('request_stack')
      );
    }

    /**
    * {@inheritdoc}.
    */
    public function getFormId() {
        return 'rp_site_search_form';
    }

    /**
    * {@inheritdoc}
    */
    public function buildForm(array $form, FormStateInterface $form_state, $params = NULL) {
        $form['#action'] = Url::fromRoute('rp_site.search')->toString();
        $form['#method'] = 'GET';

        $form['form-wrapper_start'] = array(
            '#markup' => '<div class="form-group">',
        );

        $form['input-group_start'] = array(
            '#markup' => '<div class="input-group full-width">',
        );

        $default = $this->request->query->get('q');
        $form['q'] = array(
            '#type'          => 'textfield',
            '#placeholder'   => $this->t('Chercher un produit, un document, un contact, ...'),
            '#attributes'    => ['class' => array('full-width')],
            '#required'      => true,
            '#default_value' => $default,
        );

        $form['actions']['submit'] = array(
            '#type'        => 'submit',
            '#attributes'  => ['class' => array('btn btn-default'), 'icon' => 'retraitespopulaires-icon retraitespopulaires-icon-search'],
            '#prefix'      => '<span class="input-group-btn">',
            '#suffix'      => '</span>',
        );

        $form['input-group_end'] = array(
            '#markup' => '</div>',
        );

        $form['form-wrapper_end'] = array(
            '#markup' => '</div>',
        );

        return $form;
    }

    /**
    * {@inheritdoc}
    */
    public function submitForm(array &$form, FormStateInterface $form_state) {

    }
}
