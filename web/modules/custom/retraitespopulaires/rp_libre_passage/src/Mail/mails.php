<?php

use Drupal\Core\Render\Markup;
use Drupal\Core\Link;

/**
* Mail hook
*/
function rp_libre_passage_mail($key, &$message, $params) {
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
        // Sended to admin when contactintg
        case 'contact':
            $message['subject'] = t('Nouvelle demande de @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);
        break;
    }

    $message['body'][] = Markup::create( '<br /><br />'.t('Retraites Populaires') );
}
