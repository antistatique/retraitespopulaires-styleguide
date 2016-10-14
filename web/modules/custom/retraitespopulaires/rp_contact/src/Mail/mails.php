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
        case 'admin':

        break;

        // Sended to advisor new contact
        case 'advisor':

        break;

        // Sended to contact new contact
        case 'contact':

        break;

    }

    $message['body'][] = Markup::create( '<br /><br />'.t('Retraites Populaires') );
}
