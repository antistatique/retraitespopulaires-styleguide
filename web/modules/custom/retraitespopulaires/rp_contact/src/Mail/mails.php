<?php

/**
 * @file
 * Contact mail.
 */

use Drupal\Core\Render\Markup;

/**
 * Mail hook.
 */
function rp_contact_mail($key, &$message, $params) {

  $headers = [
    'MIME-Version'              => '1.0',
    'Content-Type'              => 'text/html; charset=UTF-8; format=flowed; delsp=yes',
    'Content-Transfer-Encoding' => '8Bit',
    'X-Mailer'                  => 'Drupal',
  ];

  // Add headers.
  foreach ($headers as $i => $value) {
    $message['headers'][$i] = $value;
  }

  switch ($key) {
    // Admin Mails
    // ---------------------------------------------------------------------.
    // Sended to admin new main contact.
    case 'main_contact':
      $message['subject'] = t('Nouvelle demande de contact par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);
      $message['body'][] = Markup::create('<b>' . t('Nouvelle demande de @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

      $message['body'][] = Markup::create('<b>' . t('Demande:') . '</b><br />');
      $message['body'][] = Markup::create(t('Sujet: @subject', ['@subject' => $params['subject']]) . '<br />');
      $message['body'][] = Markup::create(t('Message:') . '<br />' . nl2br($params['message']) . '<br />');

      $message['body'][] = Markup::create('<br /><br />');
      $message['body'][] = Markup::create('<b>' . t('Informations de contact:') . '</b><br />');
      $message['body'][] = Markup::create(t('Nom: @lastname', ['@lastname' => $params['lastname']]) . '<br />');
      $message['body'][] = Markup::create(t('Prénom: @firstname', ['@firstname' => $params['firstname']]) . '<br />');
      $message['body'][] = Markup::create(t('Date de naissance (jj/mm/aaaa): @birthdate', ['@birthdate' => $params['birthdate']]) . '<br />');
      $message['body'][] = Markup::create(t('Npa: @zip', ['@zip' => $params['zip']]) . '<br />');
      $message['body'][] = Markup::create(t('Localité: @city', ['@city' => $params['city']]) . '<br />');
      $message['body'][] = Markup::create(t('E-mail: @email', ['@email' => $params['email']]) . '<br />');
      $message['body'][] = Markup::create(t('Numéro de téléphone: @phone', ['@phone' => $params['phone']]) . '<br />');
      break;

    // Sended to admin when contacting contact/advisor.
    case 'contact':
      $message['subject'] = t('Nouvelle demande de @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

      $message['body'][] = Markup::create('<b>' . t('Nouvelle demande de @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

      $message['body'][] = Markup::create('<b>' . t('Demande:') . '</b><br />');
      $message['body'][] = Markup::create(t('Sujet: @subject', ['@subject' => $params['subject']]) . '<br />');
      $message['body'][] = Markup::create(t('Message:') . '<br />' . nl2br($params['message']) . '<br />');

      $message['body'][] = Markup::create('<br /><br />');
      $message['body'][] = Markup::create('<b>' . t('Informations de contact:') . '</b><br />');
      $message['body'][] = Markup::create(t('Nom: @lastname', ['@lastname' => $params['lastname']]) . '<br />');
      $message['body'][] = Markup::create(t('Prénom: @firstname', ['@firstname' => $params['firstname']]) . '<br />');
      $message['body'][] = Markup::create(t('Date de naissance (jj/mm/aaaa): @birthdate', ['@birthdate' => $params['birthdate']]) . '<br />');
      $message['body'][] = Markup::create(t('Npa: @zip', ['@zip' => $params['zip']]) . '<br />');
      $message['body'][] = Markup::create(t('Localité: @city', ['@city' => $params['city']]) . '<br />');
      $message['body'][] = Markup::create(t('E-mail: @email', ['@email' => $params['email']]) . '<br />');
      $message['body'][] = Markup::create(t('Numéro de téléphone: @phone', ['@phone' => $params['phone']]) . '<br />');
      break;

    // Sended to admin when contacting of Demande de documents.
    case 'contact_documents':
      $message['subject'] = t('Nouvelle commande de documents par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

      $message['body'][] = Markup::create('<b>' . t('Nouvelle commande de documents par @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

      $message['body'][] = Markup::create('<b>' . t('Demande:') . '</b><br />');
      if ($params['policies']) {
        $message['body'][] = Markup::create(t("Police(s) d'assurance: @policies", ['@policies' => implode(', ', $params['policies'])]) . '<br />');
      }
      if ($params['attestations']) {
        $message['body'][] = Markup::create(t('Attestations fiscales: @attestations', ['@attestations' => implode(', ', $params['attestations'])]) . '<br />');
      }
      if (!empty($params['other_year'])) {
        $message['body'][] = Markup::create(t('Autre(s) année(s): @other_year', ['@other_year' => $params['other_year']]) . '<br />');
      }
      if ($params['payments']) {
        $message['body'][] = Markup::create(t('Moyen(s) de paiement: @payments', ['@payments' => implode(', ', $params['payments'])]) . '<br />');
      }
      $message['body'][] = Markup::create(t('Message:') . '<br />' . nl2br($params['message']) . '<br />');

      $message['body'][] = Markup::create('<br /><br />');
      $message['body'][] = Markup::create('<b>' . t('Informations de contact:') . '</b><br />');
      $message['body'][] = Markup::create(t('Numéro(s) de police(s): policy', ['@policy' => $params['policy']]) . '<br />');
      $message['body'][] = Markup::create(t('Etat civil: @civil_state', ['@civil_state' => $params['civil_state']]) . '<br />');
      $message['body'][] = Markup::create(t('Nom: @lastname', ['@lastname' => $params['lastname']]) . '<br />');
      $message['body'][] = Markup::create(t('Prénom: @firstname', ['@firstname' => $params['firstname']]) . '<br />');
      $message['body'][] = Markup::create(t('Date de naissance (jj/mm/aaaa): @birthdate', ['@birthdate' => $params['birthdate']]) . '<br />');
      $message['body'][] = Markup::create(t('Npa: @zip', ['@zip' => $params['zip']]) . '<br />');
      $message['body'][] = Markup::create(t('Localité: @city', ['@city' => $params['city']]) . '<br />');
      $message['body'][] = Markup::create(t('E-mail: @email', ['@email' => $params['email']]) . '<br />');
      $message['body'][] = Markup::create(t('Numéro de téléphone: @phone', ['@phone' => $params['phone']]) . '<br />');
      break;

    // Sended to admin when contacting of Changement d'adresse.
    case 'contact_address':

      $message['subject'] = t("Nouvelle demande de changement d'adresse par @firstname @lastname.", ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

      $message['body'][] = Markup::create('<b>' . t("Nouvelle demande de changement d'adresse par @firstname @lastname.", ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

      // Contact informations.
      $message['body'][] = Markup::create('<b>' . t('Informations de contact:') . '</b><br />');
      $message['body'][] = Markup::create(t('Etat civil: @civil_state', ['@civil_state' => $params['civil_state']]) . '<br />');
      $message['body'][] = Markup::create(t('Nom: @lastname', ['@lastname' => $params['lastname']]) . '<br />');
      $message['body'][] = Markup::create(t('Prénom: @firstname', ['@firstname' => $params['firstname']]) . '<br />');
      $message['body'][] = Markup::create(t('Date de naissance (jj/mm/aaaa): @birthdate', ['@birthdate' => $params['birthdate']]) . '<br />');
      $message['body'][] = Markup::create(t('Déjà client Retraites Populaires: @client', ['@client' => $params['client']]) . '<br />');
      if ($params['client_of']) {
        $message['body'][] = Markup::create(t('Domaine(s) chez Retraites Populaires: @client_of', ['@client_of' => implode(', ', $params['client_of'])]) . '<br />');
      }
      $message['body'][] = Markup::create(t('Référence ou numéro de client: @client_number', ['@client_number' => $params['client_number']]) . '<br />');

      // Old address.
      $message['body'][] = Markup::create('<br /><br />');
      $message['body'][] = Markup::create('<b>' . t('Anciennes coordonnées:') . '</b><br />');
      $message['body'][] = Markup::create(t('Ancien e-mail: @old_email', ['@old_email' => $params['old_email']]) . '<br />');
      $message['body'][] = Markup::create(t('Ancienne adresse: @old_address', ['@old_address' => $params['old_address']]) . '<br />');

      $message['body'][] = Markup::create(t('Ancien npa: @old_zip', ['@old_zip' => $params['old_zip']]) . '<br />');
      $message['body'][] = Markup::create(t('Ancienne localité: @old_city', ['@old_city' => $params['old_city']]) . '<br />');
      $message['body'][] = Markup::create(t('Ancien n° de tél. privé: @old_phone_private', ['@old_phone_private' => $params['old_phone_private']]) . '<br />');
      $message['body'][] = Markup::create(t('Ancien n° de tél. professionnel: @old_phone_pro', ['@old_phone_pro' => $params['old_phone_pro']]) . '<br />');
      $message['body'][] = Markup::create(t('Ancien n° de tél. mobile: @old_phone_mobile', ['@old_phone_mobile' => $params['old_phone_mobile']]) . '<br />');

      // New address.
      $message['body'][] = Markup::create('<br /><br />');
      $message['body'][] = Markup::create('<b>' . t('Nouvelles coordonnées:') . '</b><br />');
      $message['body'][] = Markup::create(t('Nouveau e-mail: @new_email', ['@new_email' => $params['new_email']]) . '<br />');
      $message['body'][] = Markup::create(t('Nouvelle adresse: @new_address', ['@new_address' => $params['new_address']]) . '<br />');

      $message['body'][] = Markup::create(t('Nouveau npa: @new_zip', ['@new_zip' => $params['new_zip']]) . '<br />');
      $message['body'][] = Markup::create(t('Nouvelle localité: @new_city', ['@new_city' => $params['new_city']]) . '<br />');
      $message['body'][] = Markup::create(t('Nouveau n° de tél. privé: @new_phone_private', ['@new_phone_private' => $params['new_phone_private']]) . '<br />');
      $message['body'][] = Markup::create(t('Nouveau n° de tél. professionnel: @new_phone_pro', ['@new_phone_pro' => $params['new_phone_pro']]) . '<br />');
      $message['body'][] = Markup::create(t('Nouveau n° de tél. mobile: @new_phone_mobile', ['@new_phone_mobile' => $params['new_phone_mobile']]) . '<br />');

      $message['body'][] = Markup::create('<br /><br />');
      $message['body'][] = Markup::create(t('Valable dès (jj/mm/aaaa): @due_date', ['@due_date' => $params['due_date']]) . '<br />');
      $message['body'][] = Markup::create(t('Remarque:') . '<br />' . nl2br($params['remarque']) . '<br />');
      break;

    // Sended to admin when contacting of Demande de réservation d'un taux.
    case 'contact_building':
      $message['subject'] = t("Nouvelle demande de réservation d'un taux par @firstname @lastname.", ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

      $message['body'][] = Markup::create('<b>' . t("Nouvelle demande de réservation d'un taux par @firstname @lastname.", ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

      $message['body'][] = Markup::create('<b>' . t('Demande:') . '</b><br />');
      if (!empty($params['rate'])) {
        $message['body'][] = Markup::create(t('Taux: @rate_name (@rate_value)',
            [
              '@rate_name' => $params['rate']->name->value,
              '@rate_value' => number_format($params['rate']->getFirstRate(), 2),
            ]
          ) . '<br />');
      }
      $message['body'][] = Markup::create(t('Montant: @amount', ['@amount' => $params['amount']]) . '<br />');
      $message['body'][] = Markup::create(t('Remarque:') . '<br />' . nl2br($params['remarque']) . '<br />');

      $message['body'][] = Markup::create('<br /><br />');
      $message['body'][] = Markup::create('<b>' . t('Informations de contact:') . '</b><br />');
      $message['body'][] = Markup::create(t('Numéro crédit de construction: @policy', ['@policy' => $params['policy']]) . '<br />');
      $message['body'][] = Markup::create(t('Titre: @title', ['@title' => $params['title']]) . '<br />');
      $message['body'][] = Markup::create(t('Nom: @lastname', ['@lastname' => $params['lastname']]) . '<br />');
      $message['body'][] = Markup::create(t('Prénom: @firstname', ['@firstname' => $params['firstname']]) . '<br />');
      $message['body'][] = Markup::create(t('Raison sociale: @company', ['@company' => $params['company']]) . '<br />');
      $message['body'][] = Markup::create(t('NPA: @zip', ['@zip' => $params['zip']]) . '<br />');
      $message['body'][] = Markup::create(t('Localité: @city', ['@city' => $params['city']]) . '<br />');
      $message['body'][] = Markup::create(t('E-mail: @email', ['@email' => $params['email']]) . '<br />');
      $message['body'][] = Markup::create(t('Numéro de téléphone: @phone', ['@phone' => $params['phone']]) . '<br />');
      break;

    // Sended to admin when contacting of Nouvelle demande de conversion
    // d'un taux variable en taux fixe.
    case 'contact_conversion':
      $message['subject'] = t("Nouvelle demande de conversion d'un taux variable en taux fixe par @firstname @lastname.", ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

      $message['body'][] = Markup::create('<b>' . t("Nouvelle demande de conversion d'un taux variable en taux fixe par @firstname @lastname.", ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

      $message['body'][] = Markup::create('<b>' . t('Demande:') . '</b><br />');
      if (!empty($params['rate'])) {
        $message['body'][] = Markup::create(t('Taux: @rate_name (@rate_value)',
            [
              '@rate_name' => $params['rate']->name->value,
              '@rate_value' => number_format($params['rate']->getFirstRate(), 2),
            ]
          ) . '<br />');
      }
      $message['body'][] = Markup::create(t('Montant: @amount', ['@amount' => $params['amount']]) . '<br />');
      $message['body'][] = Markup::create(t('Remarque:') . '<br />' . nl2br($params['remarque']) . '<br />');

      $message['body'][] = Markup::create('<br /><br />');
      $message['body'][] = Markup::create('<b>' . t('Bien:') . '</b><br />');
      $message['body'][] = Markup::create(t('Adresse: @building_address', ['@building_address' => $params['building_address']]) . '<br />');
      $message['body'][] = Markup::create(t('NPA: @building_zip', ['@building_zip' => $params['building_zip']]) . '<br />');
      $message['body'][] = Markup::create(t('Localité: @building_city', ['@building_city' => $params['building_city']]) . '<br />');

      $message['body'][] = Markup::create('<br /><br />');
      $message['body'][] = Markup::create('<b>' . t('Informations de contact:') . '</b><br />');
      $message['body'][] = Markup::create(t('Numéro crédit de construction: @policy', ['@policy' => $params['policy']]) . '<br />');
      $message['body'][] = Markup::create(t('Titre: @title', ['@title' => $params['title']]) . '<br />');
      $message['body'][] = Markup::create(t('Nom: @lastname', ['@lastname' => $params['lastname']]) . '<br />');
      $message['body'][] = Markup::create(t('Prénom: @firstname', ['@firstname' => $params['firstname']]) . '<br />');
      $message['body'][] = Markup::create(t('Raison sociale: @company', ['@company' => $params['company']]) . '<br />');
      $message['body'][] = Markup::create(t('Adresse: @address', ['@address' => $params['address']]) . '<br />');
      $message['body'][] = Markup::create(t('NPA: @zip', ['@zip' => $params['zip']]) . '<br />');
      $message['body'][] = Markup::create(t('Localité: @city', ['@city' => $params['city']]) . '<br />');
      $message['body'][] = Markup::create(t('E-mail: @email', ['@email' => $params['email']]) . '<br />');
      $message['body'][] = Markup::create(t('Numéro de téléphone: @phone', ['@phone' => $params['phone']]) . '<br />');
      break;

    case 'contact_loan_increase':
      $message['subject'] = t("Nouvelle demande d'augmentation de prêt par @firstname @lastname.", ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

      $message['body'][] = Markup::create('<b>' . t("Nouvelle demande d'augmentation de prêt par @firstname @lastname.", ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

      $message['body'][] = Markup::create('<b>' . t('Demande:') . '</b><br />');
      if (!empty($params['rate'])) {
        $message['body'][] = Markup::create(t('Taux: @rate_name (@rate_value)',
            [
              '@rate_name' => $params['rate']->name->value,
              '@rate_value' => number_format($params['rate']->getFirstRate(), 2),
            ]
          ) . '<br />');
      }
      $message['body'][] = Markup::create(t('Montant: @amount', ['@amount' => $params['amount']]) . '<br />');
      $message['body'][] = Markup::create(t('Remarque:') . '<br />' . nl2br($params['remarque']) . '<br />');
      $message['body'][] = Markup::create(t('But:') . '<br />' . nl2br($params['purpose']) . '<br />');

      $message['body'][] = Markup::create('<br /><br />');
      $message['body'][] = Markup::create('<b>' . t('Bien:') . '</b><br />');
      $message['body'][] = Markup::create(t('Adresse: @building_address', ['@building_address' => $params['building_address']]) . '<br />');
      $message['body'][] = Markup::create(t('NPA: @building_zip', ['@building_zip' => $params['building_zip']]) . '<br />');
      $message['body'][] = Markup::create(t('Localité: @building_city', ['@building_city' => $params['building_city']]) . '<br />');

      $message['body'][] = Markup::create('<br /><br />');
      $message['body'][] = Markup::create('<b>' . t('Informations de contact:') . '</b><br />');
      $message['body'][] = Markup::create(t('Numéro de prêt: @policy', ['@policy' => $params['policy']]) . '<br />');
      $message['body'][] = Markup::create(t('Titre: @title', ['@title' => $params['title']]) . '<br />');
      $message['body'][] = Markup::create(t('Nom: @lastname', ['@lastname' => $params['lastname']]) . '<br />');
      $message['body'][] = Markup::create(t('Prénom: @firstname', ['@firstname' => $params['firstname']]) . '<br />');
      $message['body'][] = Markup::create(t('Raison sociale: @company', ['@company' => $params['company']]) . '<br />');
      $message['body'][] = Markup::create(t('Adresse: @address', ['@address' => $params['address']]) . '<br />');
      $message['body'][] = Markup::create(t('NPA: @zip', ['@zip' => $params['zip']]) . '<br />');
      $message['body'][] = Markup::create(t('Localité: @city', ['@city' => $params['city']]) . '<br />');
      $message['body'][] = Markup::create(t('E-mail: @email', ['@email' => $params['email']]) . '<br />');
      $message['body'][] = Markup::create(t('Numéro de téléphone: @phone', ['@phone' => $params['phone']]) . '<br />');

      // Managing Attachments using SwiftMailer module.
      $attachments = [];

      // Attache the file URI.
      if (isset($params['file_estimate']) and !empty($params['file_estimate'])) {
        // Prepare the file to be attached with SwiftMailer.
        $attachments[] = (object) [
          'uri'      => $params['file_estimate']->getRealPath(),
          'filename' => 'Devis (en cas de travaux) - ' . $params['file_estimate']->getClientOriginalName(),
          'filemime' => $params['file_estimate']->getMimeType(),
        ];
      }
      // Attache the file URI.
      if (isset($params['file_certificate']) and !empty($params['file_certificate'])) {
        // Prepare the file to be attached with SwiftMailer.
        $attachments[] = (object) [
          'uri'      => $params['file_certificate']->getRealPath(),
          'filename' => 'Certificat de salaire - ' . $params['file_certificate']->getClientOriginalName(),
          'filemime' => $params['file_certificate']->getMimeType(),
        ];
      }

      // Attache the file URI.
      if (isset($params['file_tax']) and !empty($params['file_tax'])) {
        // Prepare the file to be attached with SwiftMailer.
        $attachments[] = (object) [
          'uri'      => $params['file_tax']->getRealPath(),
          'filename' => 'Dernière déclaration fiscale - ' . $params['file_tax']->getClientOriginalName(),
          'filemime' => $params['file_tax']->getMimeType(),
        ];
      }
      // Attache the file URI.
      if (isset($params['file_other']) and !empty($params['file_other'])) {
        // Prepare the file to be attached with SwiftMailer.
        $attachments[] = (object) [
          'uri'      => $params['file_other']->getRealPath(),
          'filename' => 'Autre - ' . $params['file_other']->getClientOriginalName(),
          'filemime' => $params['file_other']->getMimeType(),
        ];
      }
      // Attachments on [files] with SwiftMailer.
      $message['params']['files'] = $attachments;
      break;

    // Sended to admin when contacting of Demande de modification
    // de l'amortissement du 1er rang.
    case 'contact_depreciation':
      $message['subject'] = t("Nouvelle demande de modification de l'amortissement du 1er rang par @firstname @lastname.", ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

      $message['body'][] = Markup::create('<b>' . t("Nouvelle demande de modification de l'amortissement du 1er rang par @firstname @lastname.", ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

      $message['body'][] = Markup::create('<b>' . t('Demande:') . '</b><br />');
      $message['body'][] = Markup::create(t('Amortissement: @depreciation', ['@depreciation' => $params['depreciation']]) . '<br />');
      $message['body'][] = Markup::create(t('Durée: @duration', ['@duration' => $params['duration']]) . '<br />');
      $message['body'][] = Markup::create(t('Remarque:') . '<br />' . nl2br($params['remarque']) . '<br />');

      $message['body'][] = Markup::create('<br /><br />');
      $message['body'][] = Markup::create('<b>' . t('Bien:') . '</b><br />');
      $message['body'][] = Markup::create(t('Adresse: @building_address', ['@building_address' => $params['building_address']]) . '<br />');
      $message['body'][] = Markup::create(t('NPA: @building_zip', ['@building_zip' => $params['building_zip']]) . '<br />');
      $message['body'][] = Markup::create(t('Localité: @building_city', ['@building_city' => $params['building_city']]) . '<br />');

      $message['body'][] = Markup::create('<br /><br />');
      $message['body'][] = Markup::create('<b>' . t('Informations de contact:') . '</b><br />');
      $message['body'][] = Markup::create(t('Titre: @title', ['@title' => $params['title']]) . '<br />');
      $message['body'][] = Markup::create(t('Nom: @lastname', ['@lastname' => $params['lastname']]) . '<br />');
      $message['body'][] = Markup::create(t('Prénom: @firstname', ['@firstname' => $params['firstname']]) . '<br />');
      $message['body'][] = Markup::create(t('Raison sociale: @company', ['@company' => $params['company']]) . '<br />');
      $message['body'][] = Markup::create(t('Adresse: @address', ['@address' => $params['address']]) . '<br />');
      $message['body'][] = Markup::create(t('NPA: @zip', ['@zip' => $params['zip']]) . '<br />');
      $message['body'][] = Markup::create(t('Localité: @city', ['@city' => $params['city']]) . '<br />');
      $message['body'][] = Markup::create(t('E-mail: @email', ['@email' => $params['email']]) . '<br />');
      $message['body'][] = Markup::create(t('Numéro de téléphone: @phone', ['@phone' => $params['phone']]) . '<br />');
      break;

    // Sended to admin when contacting of Demande d'attestation d'intérêts Form.
    case 'contact_tax_attestation':
      $message['subject'] = t("Nouvelle demande d'attestation d'intérêts par @firstname @lastname.", ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

      $message['body'][] = Markup::create('<b>' . t("Nouvelle demande d'attestation d'intérêts par @firstname @lastname.", ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

      $message['body'][] = Markup::create('<b>' . t('Demande:') . '</b><br />');
      $message['body'][] = Markup::create(t('Bien adresse: @building_address', ['@building_address' => $params['building_address']]) . '<br />');
      $message['body'][] = Markup::create(t('Bien NPA: @building_zip', ['@building_zip' => $params['building_zip']]) . '<br />');
      $message['body'][] = Markup::create(t('Bien localité: @building_city', ['@building_city' => $params['building_city']]) . '<br />');
      $message['body'][] = Markup::create(t('Année: @year', ['@year' => $params['year']]) . '<br />');
      $message['body'][] = Markup::create(t('Remarque:') . '<br />' . nl2br($params['remarque']) . '<br />');

      $message['body'][] = Markup::create('<br /><br />');
      $message['body'][] = Markup::create('<b>' . t('Informations de contact:') . '</b><br />');
      $message['body'][] = Markup::create(t('Nnuméro crédit de construction: @policy', ['@policy' => $params['policy']]) . '<br />');
      $message['body'][] = Markup::create(t('Titre: @title', ['@title' => $params['title']]) . '<br />');
      $message['body'][] = Markup::create(t('Nom: @lastname', ['@lastname' => $params['lastname']]) . '<br />');
      $message['body'][] = Markup::create(t('Prénom: @firstname', ['@firstname' => $params['firstname']]) . '<br />');
      $message['body'][] = Markup::create(t('Raison sociale: @company', ['@company' => $params['company']]) . '<br />');
      $message['body'][] = Markup::create(t('Address: @address', ['@address' => $params['address']]) . '<br />');
      $message['body'][] = Markup::create(t('NPA: @zip', ['@zip' => $params['zip']]) . '<br />');
      $message['body'][] = Markup::create(t('Localité: @city', ['@city' => $params['city']]) . '<br />');
      $message['body'][] = Markup::create(t('E-mail: @email', ['@email' => $params['email']]) . '<br />');
      $message['body'][] = Markup::create(t('Numéro de téléphone: @phone', ['@phone' => $params['phone']]) . '<br />');
      break;

    // Sended to admin new main contact.
    case 'contact_popin':
      $message['subject'] = t('Nouvelle demande de contact par Pop-in.');
      $message['body'][] = Markup::create('<b>' . t('Nouvelle demande de contact par Pop-in.') . '</b><br /><br />');
      $message['body'][] = Markup::create('<b>' . t('Demande:') . '</b><br />');
      $message['body'][] = Markup::create(t('Prénom, Nom: @name', ['@name' => $params['name']]) . '<br />');
      $message['body'][] = Markup::create(t('Contact: @contact', ['@contact' => $params['contact']]) . '<br />');
      $message['body'][] = Markup::create(t('NPA: @zip', ['@zip' => $params['zip']]) . '<br />');
      $message['body'][] = Markup::create(t('URL: @uri', ['@uri' => $params['uri']]) . '<br />');
      break;

    // Client Mails
    // ---------------------------------------------------------------------.
    // Generical feedback.
    case 'feedback_generical':
      $message['subject'] = t('Retraites Populaires - mail de confirmation');

      $message['body'][] = Markup::create(t('Madame, Monsieur,') . '<br /><br />');

      $message['body'][] = Markup::create(t('Nous vous remercions pour votre demande. Nous allons la traiter dans les plus brefs délais.') . '<br /><br />');

      $message['body'][] = Markup::create(t('Recevez, Madame, Monsieur, nos meilleures salutations.'));
      break;

    // Feedback when contacting of Changement d'adresse.
    case 'feedback_contact_address':
      $message['subject'] = t("Retraites Populaires - changement d'adresse");

      $message['body'][] = Markup::create(t('Madame, Monsieur,') . '<br /><br />');
      $message['body'][] = Markup::create(t('Nous avons bien pris note de votre demande de changement d’adresse et vous en remercions. Nous allons la traiter dans les plus brefs délais') . '<br /><br />');

      $message['body'][] = Markup::create(t('Recevez, Madame, Monsieur, nos meilleures salutations.'));

      break;

  }

  $message['body'][] = Markup::create('<br /><br />' . t('Retraites Populaires'));
}
