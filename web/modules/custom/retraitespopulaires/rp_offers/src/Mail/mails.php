<?php

use Drupal\Core\Render\Markup;
use Drupal\Core\Link;
use Drupal\node\Entity\Node;

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

        // Sended to user when retrieve from draw
        case 'winner':
            $message['subject'] = t('Retraites Populaires - Tirage au sort de Vos offres Bella vita');

            $message['body'][] = Markup::create(t('Félicitations !') . '<br /><br />');
            $message['body'][] = Markup::create(t('Vous avez participé au tirage au sort de Vos offres Bella vita dans le magazine clientèle de Retraites Populaires et vous avez gagné.') . '<br /><br />');
            $message['body'][] = Markup::create(t('Vous allez recevoir ces prochains jours un courrier de confirmation.') . '<br /><br />');
            $message['body'][] = Markup::create(t('Recevez, Madame, Monsieur, nos meilleures salutations.'));
        break;

        // Sended to admin new request of offer
        case 'admin':
            $message['subject'] = t('Nouvelle demande d\'offre "@node"', ['@node' => $params['request']->offer_target_id->entity->title->value]);

            $message['body'][] = Markup::create( '<b>'. t('Une nouvelle demande d\'offre vient d\'être soumise') . '</b><br /><br />');
            $message['body'][] = Markup::create( t('E-mail: '). $params['request']->email->value . '<br />');
            $message['body'][] = Markup::create( t('Etat civil: '). $params['request']->civil_state->value. '<br />');
            $message['body'][] = Markup::create( t('Prénom: '). $params['request']->firstname->value . '<br />');
            $message['body'][] = Markup::create( t('Nom: '). $params['request']->lastname->value . '<br />');
            $message['body'][] = Markup::create( t('Adresse: '). $params['request']->address->value . '<br />');
            $message['body'][] = Markup::create( t('Npa: '). $params['request']->zip->value . '<br />');
            $message['body'][] = Markup::create( t('Ville: '). $params['request']->city->value . '<br />');

        break;
    }

    $message['body'][] = Markup::create( '<br /><br />'.t('Retraites Populaires') );
}
