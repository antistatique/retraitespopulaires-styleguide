<?php

namespace Drupal\rp_offers\Service;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\rp_offers\Entity\Request as EntityRequest;
use Drupal\Core\State\StateInterface;
use Drupal\Core\Mail\MailManagerInterface;

/**
 * Request.
 */
class Request {

  /**
   * EntityTypeManagerInterface to load User.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityOffersRequest;

  /**
   * EntityTypeManagerInterface to load Nodes.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  private $entityNode;

  /**
   * The state key value store.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * Composes and optionally sends an email message.
   *
   * @var \Drupal\Core\Mail\MailManagerInterface
   */
  protected $mail;

  /**
   * Class constructor.
   */
  public function __construct(EntityTypeManagerInterface $entity, StateInterface $state, MailManagerInterface $mail) {
    $this->entityOffersRequest = $entity->getStorage('rp_offers_request');
    $this->entityNode          = $entity->getStorage('node');
    $this->state               = $state;
    $this->mail                = $mail;
  }

  /**
   * Check the given email & offer is not already used by himself.
   */
  public function isAvailable($email, $node_nid) {

    $query = $this->entityOffersRequest->getQuery()
      ->condition('email', $email)
      ->condition('offer_target_id', $node_nid)
      ->count();

    return $query->execute() == 0;
  }

  /**
   * Check the given offer is active and running.
   */
  public function isEnable($node_nid) {
    $is_enable = FALSE;

    $now = new \DateTime('today');
    $node = $this->entityNode->load($node_nid);

    if ($node->status->value && $now->getTimestamp() <= $node->field_date_end->date->getTimestamp()) {
      $is_enable = TRUE;
    }

    return $is_enable;
  }

  /**
   * Use the request for the given data.
   */
  public function consume($fields) {
    if (!empty($fields)) {
      $data = [
        'civil_state'     => $fields['civil_state'],
        'firstname'       => $fields['firstname'],
        'lastname'        => $fields['lastname'],
        'email'           => $fields['email'],
        'address'         => $fields['address'],
        'zip'             => $fields['zip'],
        'city'            => $fields['city'],
        'offer_target_id' => $fields['node'],
      ];
      $request = $this->entityOffersRequest->create($data);
      $request->save();
      return $request;
    }
    return NULL;
  }

  /**
   * Send email to admin account when user is created.
   */
  public function adminEmail(EntityRequest $request) {
    $to = preg_replace('/\s+/', ' ', $this->state->get('rp_offers.settings.receivers'));
    $to = str_replace(';', ',', $to);
    $params = ['request' => $request];
    $this->mail->mail('rp_offers', 'admin', $to, 'fr', $params);
  }

  /**
   * Sended to user when retrieve from draw.
   *
   * @param string $to
   *   Email address to send the winning message.
   */
  public function winnerEmail($to) {
    $this->mail->mail('rp_offers', 'winner', $to, 'fr');
  }

}
