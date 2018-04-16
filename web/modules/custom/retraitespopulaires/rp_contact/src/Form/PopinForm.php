<?php
/**
* @file
* Contains \Drupal\rp_contact\Form\ContactForm.
*/

namespace Drupal\rp_contact\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\State\StateInterface;
use Drupal\Core\Mail\MailManagerInterface;
use Drupal\Core\Render\RendererInterface;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\CssCommand;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Ajax\InvokeCommand;

class PopinForm extends FormBase {
  /**
  * Composes and optionally sends an email message.
  * @var \Drupal\Core\Mail\MailManagerInterface
  */
  protected $mail;

  /**
  * State API for storing variables that shouldn't travel between instances.
  *
  * @var \Drupal\Core\State\StateInterface
  */
  protected $state;

  /**
   * The renderer.
   *
   * @var \Drupal\Core\Render\RendererInterface
   */
  protected $renderer;

  /**
  * Class constructor.
  */
  public function __construct(StateInterface $state, MailManagerInterface $mail, RendererInterface $renderer) {
    $this->state    = $state;
    $this->mail     = $mail;
    $this->renderer = $renderer;
  }

  /**
  * {@inheritdoc}
  */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('state'),
      $container->get('plugin.manager.mail'),
      $container->get('renderer')
    );
  }

  /**
  * {@inheritdoc}.
  */
  public function getFormId() {
    return 'rp_popin_form';
  }

  /**
  * {@inheritdoc}
  */
  public function buildForm(array $form, FormStateInterface $form_state, $params = NULL) {
    $form['#action'] = '#rp-popin-form';

    // Disable caching & HTML5 validation
    $form['#cache']['max-age'] = 0;
    $form['#attributes']['novalidate'] = 'novalidate';

    $form['#attached'] = [
      'library' => ['rp_contact/contact_popin_form'],
    ];

    $form['messages'] = [
      '#markup' => '<div class="status-messages"></div>'
    ];

    $request = $this->getRequest();

    // A hidden field can't be altered, Drupal assert it.
    $form['uri'] = [
      '#type'  => 'hidden',
      '#value' => $request->getPathInfo(),
    ];

    $form['name'] = array(
      '#title'       => $this->t('Prénom, Nom *'),
      '#type'        => 'textfield',
      '#required'    => false,
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
      '#attributes' => [
        'id' => 'tracking-popin-name',
      ],
    );

    $form['contact'] = array(
      '#title'       => $this->t('Votre e-mail ou numéro de téléphone*'),
      '#type'        => 'textfield',
      '#required'    => false,
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
      '#attributes' => [
        'id' => 'tracking-popin-contact',
      ],
    );

    $form['cols'] = [
      '#prefix' => '<div class="row d-flex flex-align-items-end">',
      '#suffix' => '</div>',
    ];

    $form['cols']['zip'] = array(
      '#title'       => $this->t('Votre code postal (NPA) *'),
      '#placeholder' => $this->t('1000'),
      '#type'        => 'textfield',
      '#required'    => false,
      '#prefix'      => '<div class="form-group col-xs-6 col-sm-8">',
      '#suffix'      => '</div>',
      '#attributes' => [
        'id' => 'tracking-popin-npa'
      ],
    );

    $form['cols']['submit'] = array(
      '#id'          => 'rp_popin_form_submit',
      '#name'        => 'rp_popin_form_submit_name',
      '#type'        => 'submit',
      '#value'       => $this->t('Envoyer'),
      '#button_type' => 'primary',
      '#prefix'      => '<div class="form-group col-xs-6 col-sm-4">',
      '#suffix'      => '</div>',
      '#attributes'  => [
        'class' => array('btn-primary', 'use-ajax-submit', 'tracking-popin-submit')
      ],
      '#ajax'        => [
        'callback' => [$this, 'respondToAjax'],
        'progress' => ['type' => 'none']
      ]
    );

    // Make sure we have the config value by default for the popin email.
    if (empty($params['mail_to'])) {
      $params['mail_to'] = $this->state->get('rp_contact.settings.popin')['receivers'];
    }
    $form['mail_to'] = [
      '#type' => 'hidden',
      '#value' => $params['mail_to'],
    ];

    return $form;
  }

  /**
   * @param array $form
   *   Form API array structure.
   * @param array $form_state
   *   Form state information.
   *
   * @return \Drupal\Core\Ajax\AjaxResponse
   *   Response object.
   */
  public function respondToAjax(array &$form, FormStateInterface $form_state) {
    $response = new AjaxResponse();

    // Avoid submit on error & show them.
    if ($form_state->hasAnyErrors()) {
      $form_state->setRebuild();
      $this->setAjaxMessages($response);
      $this->scrollToMessages($response);
      return $response;
    }

    // Update the popin loader.
    $response->addCommand(new InvokeCommand('#block-popinformblock .popin', 'loading'));

    $this->submitForm($form, $form_state);

    $this->setAjaxMessages($response);

    // Update the popin title & close the popin.
    // TODO handle success and errors
    $data = [
      'title_closed' => $this->t('Merci de votre demande. Nous allons la traiter rapidement et vous recontacter.'),
      'toggle' => TRUE,
    ];
    $response->addCommand(new InvokeCommand('#block-popinformblock .popin', 'contactPopin', [$data]));

    return $response;
  }

  /**
  * {@inheritdoc}
  */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    // Assert the firstname field is not empty
    if (!$form_state->getValue('name') || empty($form_state->getValue('name'))) {
      $form_state->setErrorByName('name', $this->t('Veuillez indiquer votre prénom et votre nom.'));
    }

    // Assert the contact field is not empty.
    if (!$form_state->getValue('contact') || empty($form_state->getValue('contact'))) {
      $form_state->setErrorByName('contact', $this->t('Veuillez indiquer votre e-mail ou votre numéro de téléphone.'));
    }
  }

  /**
  * {@inheritdoc}
  */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    $data = [
      'name'    => $form_state->getValue('name'),
      'contact' => $form_state->getValue('contact'),
      'zip'     => $form_state->getValue('zip'),
      'uri'     => $form_state->getValue('uri'),
    ];

    // Send to admin
    $to = preg_replace('/\s+/', ' ', $form_state->getValue('mail_to'));
    $to = str_replace(';', ',', $to);
    $this->mail->mail('rp_contact', 'contact_popin', $to, 'fr', $data);

    drupal_set_message(t('Merci de votre demande. Nous allons la traiter rapidement et vous recontacter.'));
  }

  /**
   * Set & render flash messages.
   *
   * @param AjaxResponse $response
   *   The ajax response.
   */
  public function setAjaxMessages(AjaxResponse &$response) {
    // Create the bag message render array.
    $status_messages = ['#type' => 'status_messages'];
    $messages = $this->renderer->renderRoot($status_messages);
    if (!empty($messages)) {
      // Append the bag message(s).
      $response->addCommand(new HtmlCommand('#rp-status-messages', $messages));
    }
  }

  /**
   * Scroll to the flash message container.
   *
   * @param AjaxResponse $response
   *   The ajax response.
   */
  public function scrollToMessages(AjaxResponse &$response){
    $response->addCommand(new InvokeCommand('#block-popinformblock .popin', 'scrollToMessages', [['selector' => '#rp-status-messages']]));
  }
}
