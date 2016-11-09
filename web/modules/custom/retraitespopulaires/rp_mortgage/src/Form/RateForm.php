<?php

namespace Drupal\rp_mortgage\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for Rate edit forms.
 *
 * @ingroup rp_mortgage
 */
class RateForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    /* @var $entity \Drupal\rp_mortgage\Entity\Rate */
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
    $form_state->setRedirect('entity.rp_mortgage_rate.canonical', ['rp_mortgage_rate' => $entity->id()]);
  }

}
