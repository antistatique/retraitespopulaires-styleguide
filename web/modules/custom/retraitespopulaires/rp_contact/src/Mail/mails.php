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
            $message['subject'] = t('Nouvelle demande de contact par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);
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

        // Sended when contacting of Changement d'adresse
        case 'contact_address':

            $message['subject'] = t('Nouvelle demande de changement d\'adresse par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

            $message['body'][] = Markup::create( '<b>'. t('Nouvelle demande de changement d\'adresse par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

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

        // Sended when contacting of Nouvelle demande de conversion d'un taux variable en taux fixe
        case 'contact_conversion':
            $message['subject'] = t('Nouvelle demande de conversion d\'un taux variable en taux fixe par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

            $message['body'][] = Markup::create( '<b>'. t('Nouvelle demande de conversion d\'un taux variable en taux fixe par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

            $message['body'][] = Markup::create( '<b>'. t('Demande: '). '</b><br />');
            if (!empty($params['rate'])) {
                $message['body'][] = Markup::create( t('Taux: '). $params['rate']->name->value .' ('.number_format($params['rate']->getFirstRate(), 2).')' . '<br />');
            }
            $message['body'][] = Markup::create( t('Montant: '). $params['amount'] . '<br />');
            $message['body'][] = Markup::create( t('Remarque: '). '<br />'. nl2br($params['remarque']) . '<br />');

            $message['body'][] = Markup::create( '<br /><br />');
            $message['body'][] = Markup::create( '<b>'. t('Bien: '). '</b><br />');
            $message['body'][] = Markup::create( t('Adresse: '). $params['building_address'] . '<br />');
            $message['body'][] = Markup::create( t('NPA: '). $params['building_zip'] . '<br />');
            $message['body'][] = Markup::create( t('Localité: '). $params['building_city'] . '<br />');

            $message['body'][] = Markup::create( '<br /><br />');
            $message['body'][] = Markup::create( '<b>'. t('Informations de contact: '). '</b><br />');
            $message['body'][] = Markup::create( t('Numéro crédit de construction: '). $params['policy'] . '<br />');
            $message['body'][] = Markup::create( t('Titre: '). $params['title'] . '<br />');
            $message['body'][] = Markup::create( t('Nom: '). $params['lastname'] . '<br />');
            $message['body'][] = Markup::create( t('Prénom: '). $params['firstname'] . '<br />');
            $message['body'][] = Markup::create( t('Raison sociale: '). $params['company'] . '<br />');
            $message['body'][] = Markup::create( t('Adresse: '). $params['address'] . '<br />');
            $message['body'][] = Markup::create( t('NPA: '). $params['zip'] . '<br />');
            $message['body'][] = Markup::create( t('Localité: '). $params['city'] . '<br />');
            $message['body'][] = Markup::create( t('E-mail: '). $params['email'] . '<br />');
            $message['body'][] = Markup::create( t('Numéro de téléphone: '). $params['phone'] . '<br />');
        break;

        case 'contact_loan_increase':
            $message['subject'] = t('Nouvelle demande d\'augmentation de prêt par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

            $message['body'][] = Markup::create( '<b>'. t('Nouvelle demande d\'augmentation de prêt par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

            $message['body'][] = Markup::create( '<b>'. t('Demande: '). '</b><br />');
            if (!empty($params['rate'])) {
                $message['body'][] = Markup::create( t('Taux: '). $params['rate']->name->value .' ('.number_format($params['rate']->getFirstRate(), 2).')' . '<br />');
            }
            $message['body'][] = Markup::create( t('Montant: '). $params['amount'] . '<br />');
            $message['body'][] = Markup::create( t('Remarque: '). '<br />'. nl2br($params['remarque']) . '<br />');
            $message['body'][] = Markup::create( t('But: '). '<br />'. nl2br($params['purpose']) . '<br />');

            $message['body'][] = Markup::create( '<br /><br />');
            $message['body'][] = Markup::create( '<b>'. t('Bien: '). '</b><br />');
            $message['body'][] = Markup::create( t('Adresse: '). $params['building_address'] . '<br />');
            $message['body'][] = Markup::create( t('NPA: '). $params['building_zip'] . '<br />');
            $message['body'][] = Markup::create( t('Localité: '). $params['building_city'] . '<br />');

            $message['body'][] = Markup::create( '<br /><br />');
            $message['body'][] = Markup::create( '<b>'. t('Informations de contact: '). '</b><br />');
            $message['body'][] = Markup::create( t('Numéro de prêt: '). $params['policy'] . '<br />');
            $message['body'][] = Markup::create( t('Titre: '). $params['title'] . '<br />');
            $message['body'][] = Markup::create( t('Nom: '). $params['lastname'] . '<br />');
            $message['body'][] = Markup::create( t('Prénom: '). $params['firstname'] . '<br />');
            $message['body'][] = Markup::create( t('Raison sociale: '). $params['company'] . '<br />');
            $message['body'][] = Markup::create( t('Adresse: '). $params['address'] . '<br />');
            $message['body'][] = Markup::create( t('NPA: '). $params['zip'] . '<br />');
            $message['body'][] = Markup::create( t('Localité: '). $params['city'] . '<br />');
            $message['body'][] = Markup::create( t('E-mail: '). $params['email'] . '<br />');
            $message['body'][] = Markup::create( t('Numéro de téléphone: '). $params['phone'] . '<br />');

            // Managing Attachments using SwiftMailler module
            $attachments = array();

            // Attache the file URI
            if( isset($params['file_estimate']) AND !empty($params['file_estimate']) ){
                // Prepare the file to be attached with SwiftMailler
                $attachments[] = (object)array(
                    'uri'      => $params['file_estimate']->getRealPath(),
                    'filename' => 'Devis (en cas de travaux) - ' . $params['file_estimate']->getClientOriginalName(),
                    'filemime' => $params['file_estimate']->getMimeType(),
                );
            }
            // Attache the file URI
            if( isset($params['file_certificat']) AND !empty($params['file_certificat']) ){
                // Prepare the file to be attached with SwiftMailler
                $attachments[] = (object)array(
                    'uri'      => $params['file_certificat']->getRealPath(),
                    'filename' => 'Certificat de salaire - ' . $params['file_certificat']->getClientOriginalName(),
                    'filemime' => $params['file_certificat']->getMimeType(),
                );
            }

            // Attache the file URI
            if( isset($params['file_tax']) AND !empty($params['file_tax']) ){
                // Prepare the file to be attached with SwiftMailler
                $attachments[] = (object)array(
                    'uri'      => $params['file_tax']->getRealPath(),
                    'filename' => 'Dernière déclaration fiscale - ' . $params['file_tax']->getClientOriginalName(),
                    'filemime' => $params['file_tax']->getMimeType(),
                );
            }
            // Attache the file URI
            if( isset($params['file_other']) AND !empty($params['file_other']) ){
                // Prepare the file to be attached with SwiftMailler
                $attachments[] = (object)array(
                    'uri'      => $params['file_other']->getRealPath(),
                    'filename' => 'Autre - ' . $params['file_other']->getClientOriginalName(),
                    'filemime' => $params['file_other']->getMimeType(),
                );
            }
            // Attachements on [files] with SwiftMailler
            $message['params']['files'] = $attachments;
        break;

        // Sended when contacting of Demande de modification de l'amortissement du 1er rang
        case 'contact_depreciation':
            $message['subject'] = t('Nouvelle demande de modification de l\'amortissement du 1er rang par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

            $message['body'][] = Markup::create( '<b>'. t('Nouvelle demande de modification de l\'amortissement du 1er rang par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

            $message['body'][] = Markup::create( '<b>'. t('Demande: '). '</b><br />');
            $message['body'][] = Markup::create( t('Amortissement: '). $params['depreciation'] . '<br />');
            $message['body'][] = Markup::create( t('Durée: '). $params['duration'] . '<br />');
            $message['body'][] = Markup::create( t('Remarque: '). '<br />'. nl2br($params['remarque']) . '<br />');

            $message['body'][] = Markup::create( '<br /><br />');
            $message['body'][] = Markup::create( '<b>'. t('Bien: '). '</b><br />');
            $message['body'][] = Markup::create( t('Adresse: '). $params['building_address'] . '<br />');
            $message['body'][] = Markup::create( t('NPA: '). $params['building_zip'] . '<br />');
            $message['body'][] = Markup::create( t('Localité: '). $params['building_city'] . '<br />');

            $message['body'][] = Markup::create( '<br /><br />');
            $message['body'][] = Markup::create( '<b>'. t('Informations de contact: '). '</b><br />');
            $message['body'][] = Markup::create( t('Titre: '). $params['title'] . '<br />');
            $message['body'][] = Markup::create( t('Nom: '). $params['lastname'] . '<br />');
            $message['body'][] = Markup::create( t('Prénom: '). $params['firstname'] . '<br />');
            $message['body'][] = Markup::create( t('Raison sociale: '). $params['company'] . '<br />');
            $message['body'][] = Markup::create( t('Adresse: '). $params['address'] . '<br />');
            $message['body'][] = Markup::create( t('NPA: '). $params['zip'] . '<br />');
            $message['body'][] = Markup::create( t('Localité: '). $params['city'] . '<br />');
            $message['body'][] = Markup::create( t('E-mail: '). $params['email'] . '<br />');
            $message['body'][] = Markup::create( t('Numéro de téléphone: '). $params['phone'] . '<br />');
        break;

       // Sended when contacting of Demande d'attestation d'intérêts Form
       case 'contact_tax_attestation':
           $message['subject'] = t('Nouvelle demande d\'attestation d\'intérêts par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);
        +
           $message['body'][] = Markup::create( '<b>'. t('Nouvelle demande d\'attestation d\'intérêts par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');
        +
           $message['body'][] = Markup::create( '<b>'. t('Demande: '). '</b><br />');
           $message['body'][] = Markup::create( t('Bien adresse: '). $params['building_address'] . '<br />');
           $message['body'][] = Markup::create( t('Bien NPA: '). $params['building_zip'] . '<br />');
           $message['body'][] = Markup::create( t('Bien localité: '). $params['building_city'] . '<br />');
           $message['body'][] = Markup::create( t('Année: '). $params['year'] . '<br />');
           $message['body'][] = Markup::create( t('Remarque: '). '<br />'. nl2br($params['remarque']) . '<br />');
        +
           $message['body'][] = Markup::create( '<br /><br />');
           $message['body'][] = Markup::create( '<b>'. t('Informations de contact: '). '</b><br />');
           $message['body'][] = Markup::create( t('Nnuméro crédit de construction: '). $params['policy'] . '<br />');
           $message['body'][] = Markup::create( t('Titre: '). $params['title'] . '<br />');
           $message['body'][] = Markup::create( t('Nom: '). $params['lastname'] . '<br />');
           $message['body'][] = Markup::create( t('Prénom: '). $params['firstname'] . '<br />');
           $message['body'][] = Markup::create( t('Raison sociale: '). $params['company'] . '<br />');
           $message['body'][] = Markup::create( t('Address: '). $params['address'] . '<br />');
           $message['body'][] = Markup::create( t('NPA: '). $params['zip'] . '<br />');
           $message['body'][] = Markup::create( t('Localité: '). $params['city'] . '<br />');
           $message['body'][] = Markup::create( t('E-mail: '). $params['email'] . '<br />');
           $message['body'][] = Markup::create( t('Numéro de téléphone: '). $params['phone'] . '<br />');
       break;
    }

    $message['body'][] = Markup::create( '<br /><br />'.t('Retraites Populaires') );
}
