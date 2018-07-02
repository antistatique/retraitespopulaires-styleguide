<?php

/**
 * @file
 * Libre passage mail.
 */

use Drupal\Core\Render\Markup;

/**
 * Mail hook.
 */
function rp_libre_passage_mail($key, &$message, $params) {
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
    // Sended to admin when contactintg.
    case 'contact':
      $message['subject'] = t('Calculateur PLP - Nouvelle demande de @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]);

      $message['body'][] = Markup::create('<b>' . t('Nouvelle demande de @firstname @lastname.', ['@firstname' => $params['firstname'], '@lastname' => $params['lastname']]) . '</b><br /><br />');

      $message['body'][] = Markup::create('<b>' . t('Entrée du calculateur:') . '</b><br />');
      $message['body'][] = Markup::create(t('Date de naissance: @birthday', ['@birthday' => $params['results']['birthdate']]) . '<br />');
      $message['body'][] = Markup::create(t('Etat civil: @civil_state', ['@civil_state' => $params['results']['civil_state']]) . '<br />');
      $message['body'][] = Markup::create(t('Marié(e) ou lié(e) par un partenariat enregistré: @civil_status', ['@civil_status' => $params['results']['civil_status']]) . '<br />');
      $message['body'][] = Markup::create(t('Pourcentage souhaité de la rente de vieillesse versée au conjoint (ou partenaire enregistré) survivant: @percent%', ['@percent' => $params['results']['percent']]) . '<br />');
      $message['body'][] = Markup::create(t('Montant: @amount', ['@amount' => $params['results']['amount']]) . '<br />');
      $message['body'][] = Markup::create(t('Date de versement: @payment_date', ['@payment_date' => $params['results']['payment_date']]) . '<br />');
      $message['body'][] = Markup::create(t('Âge souhaité pour le versement des prestations: @age ans', ['@age' => $params['results']['age']]) . '<br />');

      $message['body'][] = Markup::create('<br /><br />');
      $message['body'][] = Markup::create('<b>' . t('Résultat du calculateur:') . '</b><br />');
      $message['body'][] = Markup::create(t('Capital de retraite au: @deadline', ['@deadline' => $params['results']['deadline']]) . '<br />');
      $message['body'][] = Markup::create(t('Capital: @capital CHF', ['@capital' => $params['results']['capital']]) . '<br />');
      $message['body'][] = Markup::create(t('Rente annuelle de retraite simple: @pension_single CHF', ['@pension_single' => $params['results']['annual_pension_single']]) . '<br />');
      $message['body'][] = Markup::create(t('Rente annuelle de retraite de couple: @pension_couple CHF', ['@pension_couple' => $params['results']['annual_pension_couple']]) . '<br />');
      $message['body'][] = Markup::create(t('Rente annuelle de conjoint / partenaire survivant: @pension_survivor CHF', ['@pension_survivor' => $params['results']['pension_survivor']]) . '<br />');

      $message['body'][] = Markup::create('<br /><br />');
      $message['body'][] = Markup::create('<b>' . t('Demande:') . '</b><br />');
      $message['body'][] = Markup::create(t('Message:') . '<br />' . nl2br($params['message']) . '<br />');

      $message['body'][] = Markup::create('<br /><br />');
      $message['body'][] = Markup::create('<b>' . t('Informations de contact:') . '</b><br />');
      $message['body'][] = Markup::create(t('Nom: @lastname', ['@lastname' => $params['lastname']]) . '<br />');
      $message['body'][] = Markup::create(t('Prénom: @firstname', ['@firstname' => $params['firstname']]) . '<br />');
      $message['body'][] = Markup::create(t('Npa: @zip', ['@zip' => $params['zip']]) . '<br />');
      $message['body'][] = Markup::create(t('Localité: @city', ['@city' => $params['city']]) . '<br />');
      $message['body'][] = Markup::create(t('Numéro de téléphone: @phone', ['@phone' => $params['phone']]) . '<br />');
      $message['body'][] = Markup::create(t('Adresse e-mail: @email', ['@email' => $params['email']]) . '<br />');
      break;
  }

  $message['body'][] = Markup::create('<br /><br />' . t('Retraites Populaires'));
}
