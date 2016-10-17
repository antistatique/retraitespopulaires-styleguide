<?php

use Drupal\Core\Render\Markup;
use Drupal\Core\Link;

/**
* Mail hook
*/
function rp_contact_mail($key, &$message, $params) {
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

        // Sended to admin new main contact
        case 'main_contact':
            $message['subject'] = t('Nouvelle demande de @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);
        break;

        // Sended to contact new contact
        case 'contact':
            $message['subject'] = t('Nouvelle demande de @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

            $message['body'][] = Markup::create( '<b>'. t('Nouvelle demande de @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

            $message['body'][] = Markup::create( '<b>'. t('Demande: '). '</b><br />');
            $message['body'][] = Markup::create( t('Sujet: '). $params['subject'] . '<br />');
            $message['body'][] = Markup::create( t('Message: '). '<br />'. nl2br($params['message']) . '<br />');

            $message['body'][] = Markup::create( '<br /><br />');
            $message['body'][] = Markup::create( '<b>'. t('Informations de contact: '). '</b><br />');
            $message['body'][] = Markup::create( t('Nom: '). $params['lastname'] . '<br />');
            $message['body'][] = Markup::create( t('Prénom: '). $params['firstname'] . '<br />');
            $message['body'][] = Markup::create( t('Date de naissance (jj/mm/aaaa): '). $params['birthdate'] . '<br />');
            $message['body'][] = Markup::create( t('Npa: '). $params['zip'] . '<br />');
            $message['body'][] = Markup::create( t('Ville: '). $params['city'] . '<br />');
            $message['body'][] = Markup::create( t('E-mail: '). $params['email'] . '<br />');
            $message['body'][] = Markup::create( t('Numéro de téléphone: '). $params['phone'] . '<br />');
        break;

    }

    $message['body'][] = Markup::create( '<br /><br />'.t('Retraites Populaires') );
}
