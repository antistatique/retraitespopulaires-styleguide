<?php
/**
* @file
* Contains \Drupal\rp_offers\Service\Request
*/

namespace Drupal\rp_offers\Service;

use Drupal\Core\Session\AccountProxy;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\user\PrivateTempStoreFactory;

use Drupal\rp_offers\Entity\Request as EntityRequest;

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
    * entity_query to query Node's Request
    * @var QueryFactory
    */
    private $entity_query;

    /**
    * Class constructor.
    */
    public function __construct(EntityTypeManagerInterface $entity, QueryFactory $query) {
        $this->entity_offers_request = $entity->getStorage('rp_offers_request');
        $this->entity_query          = $query;
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
     * Use the request for the given data
     * @method consume
     * @param  String      $email    [description]
     * @param  Integer     $node_nid [description]
     */
    public function consume($fields) {
        if (!empty($fields)) {
            $data = array(
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
            // $token = EntityRequest::create($data);
            // $token->save();
        }
    }

    /**
     * Send email to admin account when user is created
     * @method adminEmail
     * @return [type]     [description]
     */
    public function adminEmail($fields){
        $to = preg_replace('/\s+/', ' ', $this->state->get('authentication.settings.receivers'));
        $to = str_replace(';', ',', $to);

        // $params = array(
        //     'email' => $account->getEmail(),
        //     'url'   => $url
        // );

        // \Drupal::service('plugin.manager.mail')->mail('rp_offers', 'creation', $to, 'en', $params, 'no-reply@bat-davidoff.net');
    }

    /**
     * Send email to new account email to confirme his identity
     * @method confirmationEmail
     * @return [type]            [description]
     */
    public function confirmationEmail($fields){
        // $timestamp = time();
        //
        // /* @var \Drupal\user\UserInterface $user */
        // $user = \Drupal::entityTypeManager()->getStorage('user')->load($account->id());
        //
        // $email = $user->getEmail();
        //
        // // Get hash url
        // $hash = $this->getHash($user, $timestamp);
        // $url = Url::fromRoute('authentication.confirmation', ['uid' => $user->id(), 'timestamp' => $timestamp, 'hash' => $hash], ['absolute' => true]);
        //
        // $params = array(
        //     'account' => $account,
        //     'url'     => $url
        // );
        // \Drupal::service('plugin.manager.mail')->mail('rp_offers', 'confirmation', $email, $user->getPreferredLangcode(), $params, 'no-reply@bat-davidoff.net');
    }
}
