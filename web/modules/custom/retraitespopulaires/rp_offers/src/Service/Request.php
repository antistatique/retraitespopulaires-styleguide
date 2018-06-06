<?php
/**
* @file
* Contains \Drupal\rp_offers\Service\Request
*/

namespace Drupal\rp_offers\Service;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\user\PrivateTempStoreFactory;
use Drupal\rp_offers\Entity\Request as EntityRequest;
use Drupal\Core\State\StateInterface;
use Drupal\Core\Mail\MailManagerInterface;
/**
* Request.
*/
class Request {

    /**
    * EntityTypeManagerInterface to load User
    * @var EntityTypeManagerInterface
    */
    private $entity_offers_request;

    /**
    * EntityTypeManagerInterface to load Nodes
    * @var EntityTypeManagerInterface
    */
    private $entity_node;

    /**
    * entity_query to query Node's Request
    * @var QueryFactory
    */
    private $entity_query;

    /**
    * State API, not Configuration API, for storing local variables that shouldn't travel between instances.
    * @var StateInterface
    */
    protected $state;

    /**
    * Composes and optionally sends an email message.
    * @var MailManagerInterface
    */
    protected $mail;

    /**
    * Class constructor.
    */
    public function __construct(EntityTypeManagerInterface $entity, QueryFactory $query, StateInterface $state, MailManagerInterface $mail) {
        $this->entity_offers_request = $entity->getStorage('rp_offers_request');
        $this->entity_node           = $entity->getStorage('node');
        $this->entity_query          = $query;
        $this->state                 = $state;
        $this->mail                  = $mail;
    }

    /**
    * Check the given email & offer is not already used by himself
    * @method isAvailable
    * @param  String      $email    [description]
    * @param  Integer     $node_nid [description]
    * @return boolean               [description]
    */
    public function isAvailable($email, $node_nid) {

        $query = $this->entity_query->get('rp_offers_request')
            ->condition('email', $email)
            ->condition('offer_target_id', $node_nid)
            ->count();
        ;

        return $query->execute() == 0;
    }

    /**
    * Check the given offer is active and running
    * @method isAvailable
    * @param  Integer     $node_nid [description]
    * @return boolean               [description]
    */
    public function isEnable($node_nid) {
        $is_enable = false;

        $now = new \DateTime('today');
        $node = $this->entity_node->load($node_nid);

        if ($node->status->value && $now->getTimestamp() <= $node->field_date_end->date->getTimestamp()) {
            $is_enable = true;
        }

        return $is_enable;
    }

    /**
     * Use the request for the given data
     * @method consume
     * @param  String      $email    [description]
     * @param  Integer     $node_nid [description]
     */
    public function consume($fields) {
        if (!empty($fields)) {
            $data = array(
                'civil_state'     => $fields['civil_state'],
                'firstname'       => $fields['firstname'],
                'lastname'        => $fields['lastname'],
                'email'           => $fields['email'],
                'address'         => $fields['address'],
                'zip'             => $fields['zip'],
                'city'            => $fields['city'],
                'offer_target_id' => $fields['node'],
            );
            $request = $this->entity_offers_request->create($data);
            $request->save();
            return $request;
        }
        return null;
    }

    /**
     * Send email to admin account when user is created
     * @method adminEmail
     * @return [type]     [description]
     */
    public function adminEmail(EntityRequest $request){
        $to = preg_replace('/\s+/', ' ', $this->state->get('rp_offers.settings.receivers'));
        $to = str_replace(';', ',', $to);
        $params = array('request' => $request);
        $this->mail->mail('rp_offers', 'admin', $to, 'fr', $params);
    }

    /**
     * Sended to user when retrieve from draw
     *
     * @param string   $to
     *    Email address to send the winning message.
     */
    public function WinnerEmail($to){
        $this->mail->mail('rp_offers', 'winner', $to, 'fr');
    }
}
