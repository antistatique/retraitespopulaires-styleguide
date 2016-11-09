<?php

use Drupal\Core\Render\Markup;
use Drupal\Core\Link;

/**
* Mail hook
*/
function rp_offers_mail($key, &$message, $params) {
    $options['langcode'] = $message['langcode'];

    $headers = array(
        'MIME-Version'              => '1.0',
        'Content-Type'              => 'text/html; charset=UTF-8; format=flowed; delsp=yes',
        'Content-Transfer-Encoding' => '8Bit',
        'X-Mailer'                  => 'Drupal',
    );

    // Add headers
    foreach ($headers as $i => $value) {
        $message['headers'][$i] = $value;
    }

    switch($key) {

        // Sended to user when requesting an offer
        case 'confirmation':
            $message['subject'] = t('Welcome');

            // Add headers
            foreach ($headers as $key => $value) {
                $message['headers'][$key] = $value;
            }

            $firstname  = $params['account']->field_user_firstname->value;
            $message['body'][] = Markup::create( t('Hi @firstname,', ['@firstname' => $firstname]) .' <br />');

            $message['body'][] = Markup::create( t('The Davidoff team is glad you subscribed!').' <br />');

            $link = Link::fromTextAndUrl(t('create my password'), $params['url']);
            $message['body'][] = Markup::create( t('Just click on that link to create your password: @passwordlink.', ['@passwordlink' => $link->toString()]) . '<br />');

            $message['body'][] = Markup::create( t('We will update you regularly about our contests, our events and special offers via our newsletter.'));
        break;

        // Sended to admin new request of offer
        case 'admin':
            $message['subject'] = t('Nouvelle demande d\'offre @node', ['node' => $params['node']->title->value]);

            $message['body'][] = Markup::create( '<b>'. t('Une nouvelle demande d\'offre vient d\'être soumise') . '</b><br /><br />');
            $message['body'][] = Markup::create( t('E-mail: '). $params['request']->email->value . '<br />');
            $message['body'][] = Markup::create( t('Prénom: '). $params['request']->firstname->value . '<br />');
            $message['body'][] = Markup::create( t('Nom: '). $params['request']->lastname->value . '<br />');
            $message['body'][] = Markup::create( t('Adresse: '). $params['request']->address->value . '<br />');
            $message['body'][] = Markup::create( t('Npa: '). $params['request']->zip->value . '<br />');
            $message['body'][] = Markup::create( t('Ville: '). $params['request']->city->value . '<br />');

        break;
    }

    $message['body'][] = Markup::create( '<br /><br />'.t('Retraites Populaires') );
}
