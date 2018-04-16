<?php

namespace Drupal\rp_quickwin\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for Saving 3a Rate edit forms.
 *
 * @ingroup rp_quickwin
 */
class Saving3ARateForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    /* @var $entity \Drupal\rp_quickwin\Entity\Saving3ARate */
    $form = parent::buildForm($form, $form_state);
    $entity = $this->entity;

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $entity = $this->entity;
    $status = parent::save($form, $form_state);

    switch ($status) {
      case SAVED_NEW:
        drupal_set_message($this->t('Created the %label Rate.', [
          '%label' => $entity->label(),
        ]));
        break;

      default:
        drupal_set_message($this->t('Saved the %label Rate.', [
          '%label' => $entity->label(),
        ]));
    }
    $form_state->setRedirect('entity.rp_quickwin_saving_3a_rate.canonical', ['rp_quickwin_saving_3a_rate' => $entity->id()]);
  }

}
