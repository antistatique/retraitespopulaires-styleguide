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
            $message['subject'] = t('Calculateur PLP - Nouvelle demande de @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

            $message['body'][] = Markup::create( '<b>'. t('Nouvelle demande de @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

            $message['body'][] = Markup::create( '<b>'. t('Entrée du calculateur: '). '</b><br />');
            $message['body'][] = Markup::create( t('Date de naissance: '). $params['results']['birthdate'] . '<br />');
            $message['body'][] = Markup::create( t('Etat civil: ') . $params['results']['civil_state'] . '<br />');
            $message['body'][] = Markup::create( t('Marié(e) ou lié(e) par un partenariat enregistré: ') . $params['results']['civil_status'] . '<br />');
            $message['body'][] = Markup::create( t('Pourcentage souhaité de la rente de vieillesse versée au conjoint (ou partenaire enregistré) survivant: ') . $params['results']['percent'] . '% <br />');
            $message['body'][] = Markup::create( t('Montant: ') . $params['results']['amount'] . '<br />');
            $message['body'][] = Markup::create( t('Date de versement: ') . $params['results']['payment_date'] . '<br />');
            $message['body'][] = Markup::create( t('Âge souhaité pour le versement des prestations: ') . $params['results']['age'] . ' ans<br />');

            $message['body'][] = Markup::create( '<br /><br />');
            $message['body'][] = Markup::create( '<b>'. t('Résultat du calculateur: '). '</b><br />');
            $message['body'][] = Markup::create( t('Capital de retraite au: ') . $params['results']['deadline'] . '<br />');
            $message['body'][] = Markup::create( t('Capital: ') . $params['results']['capital'] . ' CHF<br />');
            $message['body'][] = Markup::create( t('Rente annuelle de retraite simple: ') . $params['results']['annual_pension_single'] . ' CHF<br />');
            $message['body'][] = Markup::create( t('Rente annuelle de retraite de couple: ') . $params['results']['annual_pension_couple'] . ' CHF<br />');
            $message['body'][] = Markup::create( t('Rente annuelle de conjoint/partenaire survivant: ') . $params['results']['pension_survivor'] . ' CHF<br />');

            $message['body'][] = Markup::create( '<br /><br />');
            $message['body'][] = Markup::create( '<b>'. t('Demande: '). '</b><br />');
            $message['body'][] = Markup::create( t('Message: '). '<br />'. nl2br($params['message']) . '<br />');

            $message['body'][] = Markup::create( '<br /><br />');
            $message['body'][] = Markup::create( '<b>'. t('Informations de contact: '). '</b><br />');
            $message['body'][] = Markup::create( t('Nom: '). $params['lastname'] . '<br />');
            $message['body'][] = Markup::create( t('Prénom: '). $params['firstname'] . '<br />');
            $message['body'][] = Markup::create( t('Npa: '). $params['zip'] . '<br />');
            $message['body'][] = Markup::create( t('Localité: '). $params['city'] . '<br />');
            $message['body'][] = Markup::create( t('Numéro de téléphone: '). $params['phone'] . '<br />');
        break;
    }

    $message['body'][] = Markup::create( '<br /><br />'.t('Retraites Populaires') );
}
