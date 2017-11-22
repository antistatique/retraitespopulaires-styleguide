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
use Drupal\Core\Ajax\PrependCommand;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Ajax\DataCommand;

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

    $form['contact'] = array(
      '#title'       => $this->t('Votre e-mail ou numéro de téléphone*'),
      '#type'        => 'textfield',
      '#required'    => false,
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    );

    $form['npa'] = array(
      '#title'       => $this->t('Votre code postal (NPA) *'),
      '#placeholder' => $this->t('1000'),
      '#type'        => 'textfield',
      '#required'    => false,
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
    );

    $form['actions']['submit'] = array(
      '#type'        => 'submit',
      '#value'       => $this->t('Envoyer'),
      '#attributes'  => ['class' => array('btn-primary')],
      '#button_type' => 'primary',
      '#prefix'      => '<div class="form-group">',
      '#suffix'      => '</div>',
      '#ajax'        => [
        'callback' => [$this, 'respondToAjax'],
        'event'    => 'click',
        'progress' => []
      ]
    );

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

    $this->submitForm($form, $form_state);

    // Add the Javascript cookie.
    // $response->addCommand(new InvokeCommand('#edit-event', 'selectizeClearOptions'));

    // Create the bag message render array.
    $status_messages = ['#type' => 'status_messages'];
    $messages = $this->renderer->renderRoot($status_messages);
    if (!empty($messages)) {
      // Append the bag message(s).
      $response->addCommand(new PrependCommand('#rp-status-messages', $messages));
    }

    // Update the popine title.
    $response->addCommand(new ReplaceCommand('#rp-popin-block .popin-title', $this->t('Merci pour votre demande. Nous allons rapidement traiter votre demande et vous recontacter.')));

    // Close the popin.
    // $response->addCommand(new InvokeCommand('#edit-event', 'selectizeClearOptions'));

    return $response;
  }

  /**
  * {@inheritdoc}
  */
  public function validateForm(array &$form, FormStateInterface $form_state) { }

  /**
  * {@inheritdoc}
  */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $settings = $this->state->get('rp_contact.settings.popin');

    $data = [
      'contact' => $form_state->getValue('contact'),
      'zip'     => $form_state->getValue('zip'),
      'uri'     => $form_state->getValue('uri'),
    ];

    // Send to admin
    $to = preg_replace('/\s+/', ' ', $settings['receivers']);
    $to = str_replace(';', ',', $to);
    $this->mail->mail('rp_contact', 'contact_popin', $to, 'fr', $data);

    drupal_set_message(t('Merci pour votre demande. Nous allons rapidement traiter votre demande et vous recontacter.'));
  }
}
