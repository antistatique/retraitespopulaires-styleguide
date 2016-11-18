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

        // Sended when contacting contact/advisor
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
            $message['body'][] = Markup::create( t('Localité: '). $params['city'] . '<br />');
            $message['body'][] = Markup::create( t('E-mail: '). $params['email'] . '<br />');
            $message['body'][] = Markup::create( t('Numéro de téléphone: '). $params['phone'] . '<br />');
        break;

        // Sended when contacting of Demande de documents
        case 'contact_documents':
            $message['subject'] = t('Nouvelle commande de documents par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

            $message['body'][] = Markup::create( '<b>'. t('Nouvelle commande de documents par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

            $message['body'][] = Markup::create( '<b>'. t('Demande: '). '</b><br />');
            if ($params['policies']) {
                $message['body'][] = Markup::create( t('Police(s) d\'assurance: '). implode(', ', $params['policies']) . '<br />');
            }
            if ($params['attestations']) {
                $message['body'][] = Markup::create( t('Attestations fiscales: '). implode(', ', $params['attestations']) . '<br />');
            }
            if (!empty($params['other_year'])) {
                $message['body'][] = Markup::create( t('Autre(s) année(s): '). $params['other_year'] . '<br />');
            }
            if ($params['payments']) {
                $message['body'][] = Markup::create( t('Moyen(s) de paiement: '). implode(', ', $params['payments']) . '<br />');
            }
            $message['body'][] = Markup::create( t('Message: '). '<br />'. nl2br($params['message']) . '<br />');

            $message['body'][] = Markup::create( '<br /><br />');
            $message['body'][] = Markup::create( '<b>'. t('Informations de contact: '). '</b><br />');
            $message['body'][] = Markup::create( t('Numéro(s) de police(s): '). $params['policy'] . '<br />');
            $message['body'][] = Markup::create( t('Etat civil: '). $params['civil_state'] . '<br />');
            $message['body'][] = Markup::create( t('Nom: '). $params['lastname'] . '<br />');
            $message['body'][] = Markup::create( t('Prénom: '). $params['firstname'] . '<br />');
            $message['body'][] = Markup::create( t('Date de naissance (jj/mm/aaaa): '). $params['birthdate'] . '<br />');
            $message['body'][] = Markup::create( t('Npa: '). $params['zip'] . '<br />');
            $message['body'][] = Markup::create( t('Localité: '). $params['city'] . '<br />');
            $message['body'][] = Markup::create( t('E-mail: '). $params['email'] . '<br />');
        break;

        // Sended when contacting of Changement d'adresses
        case 'contact_address':
            $message['subject'] = t('Nouvelle demande de changement d\'adresses par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

            $message['body'][] = Markup::create( '<b>'. t('Nouvelle commande de documents par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

            // Contact informations
            $message['body'][] = Markup::create( '<b>'. t('Informations de contact: '). '</b><br />');
            $message['body'][] = Markup::create( t('Etat civil: '). $params['civil_state'] . '<br />');
            $message['body'][] = Markup::create( t('Nom: '). $params['lastname'] . '<br />');
            $message['body'][] = Markup::create( t('Prénom: '). $params['firstname'] . '<br />');
            $message['body'][] = Markup::create( t('Date de naissance (jj/mm/aaaa): '). $params['birthdate'] . '<br />');
            $message['body'][] = Markup::create( t('Déjà client Retraites Populaires: '). $params['client'] . '<br />');
            if ($params['client_of']) {
                $message['body'][] = Markup::create( t('Domaine(s) chez Retraites Populaires: '). implode(', ', $params['client_of']) . '<br />');
            }
            $message['body'][] = Markup::create( t('Référence ou numéro de client: '). $params['client_number'] . '<br />');

            // Old address
            $message['body'][] = Markup::create( '<br /><br />');
            $message['body'][] = Markup::create( '<b>'. t('Anciennes coordonnées: '). '</b><br />');
            $message['body'][] = Markup::create( t('Ancien e-mail: '). $params['old_email'] . '<br />');
            $message['body'][] = Markup::create( t('Ancienne adresse: '). $params['old_address'] . '<br />');

            $message['body'][] = Markup::create( t('Ancien npa: '). $params['old_zip'] . '<br />');
            $message['body'][] = Markup::create( t('Ancienne localité: '). $params['old_city'] . '<br />');
            $message['body'][] = Markup::create( t('Ancien n° de tél. privé: '). $params['old_phone_private'] . '<br />');
            $message['body'][] = Markup::create( t('Ancien n° de tél. professionnel: '). $params['old_phone_pro'] . '<br />');
            $message['body'][] = Markup::create( t('Ancien n° de tél. mobile: '). $params['old_phone_mobile'] . '<br />');

            // New address
            $message['body'][] = Markup::create( '<br /><br />');
            $message['body'][] = Markup::create( '<b>'. t('Nouvelles coordonnées: '). '</b><br />');
            $message['body'][] = Markup::create( t('Nouveau e-mail: '). $params['new_email'] . '<br />');
            $message['body'][] = Markup::create( t('Nouvelle adresse: '). $params['new_address'] . '<br />');

            $message['body'][] = Markup::create( t('Nouveau npa: '). $params['new_zip'] . '<br />');
            $message['body'][] = Markup::create( t('Nouvelle localité: '). $params['new_city'] . '<br />');
            $message['body'][] = Markup::create( t('Nouveau n° de tél. privé: '). $params['new_phone_private'] . '<br />');
            $message['body'][] = Markup::create( t('Nouveau n° de tél. professionnel: '). $params['new_phone_pro'] . '<br />');
            $message['body'][] = Markup::create( t('Nouveau n° de tél. mobile: '). $params['new_phone_mobile'] . '<br />');

            $message['body'][] = Markup::create( '<br /><br />');
            $message['body'][] = Markup::create( t('Valable dès (jj/mm/aaaa): '). $params['due_date'] . '<br />');
            $message['body'][] = Markup::create( t('Remarque: '). '<br />'. nl2br($params['remarque']) . '<br />');
        break;

        // Sended when contacting of Demande de réservation d'un taux
        case 'contact_building':
            $message['subject'] = t('Nouvelle demande de réservation d\'un taux par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

            $message['body'][] = Markup::create( '<b>'. t('Nouvelle demande de réservation d\'un taux par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

            $message['body'][] = Markup::create( '<b>'. t('Demande: '). '</b><br />');
            if (!empty($params['rate'])) {
                $message['body'][] = Markup::create( t('Taux: '). $params['rate']->name->value .' ('.number_format($params['rate']->getFirstRate(), 2).')' . '<br />');
            }
            $message['body'][] = Markup::create( t('Montant: '). $params['amount'] . '<br />');
            $message['body'][] = Markup::create( t('Remarque: '). '<br />'. nl2br($params['remarque']) . '<br />');

            $message['body'][] = Markup::create( '<br /><br />');
            $message['body'][] = Markup::create( '<b>'. t('Informations de contact: '). '</b><br />');
            $message['body'][] = Markup::create( t('Nnuméro crédit de construction: '). $params['policy'] . '<br />');
            $message['body'][] = Markup::create( t('Titre: '). $params['title'] . '<br />');
            $message['body'][] = Markup::create( t('Nom: '). $params['lastname'] . '<br />');
            $message['body'][] = Markup::create( t('Prénom: '). $params['firstname'] . '<br />');
            $message['body'][] = Markup::create( t('Raison sociale: '). $params['company'] . '<br />');
            $message['body'][] = Markup::create( t('NPA: '). $params['zip'] . '<br />');
            $message['body'][] = Markup::create( t('Localité: '). $params['city'] . '<br />');
            $message['body'][] = Markup::create( t('E-mail: '). $params['email'] . '<br />');
            $message['body'][] = Markup::create( t('Numéro de téléphone: '). $params['phone'] . '<br />');
        break;

    }

    $message['body'][] = Markup::create( '<br /><br />'.t('Retraites Populaires') );
}
