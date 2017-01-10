---
title: basic-page
name: basic-page
collection: pages
styleguide: false
layout: page.html.swig
---
{% include '../organisms/header.html.swig' %}
{% include '../atoms/funky-waves.html.swig' %}

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-offset-4 col-lg-8 col-lg-offset-3 col-xl-6 col-xl-offset-3 text-center">
      {% include '../molecules/breadcrumb.html.swig' %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-push-4 col-lg-8 col-lg-push-3 col-xl-6 col-xl-push-3">
      <a name="startcontent"></a>
      <h1 class="page-title text-center">Quel est votre projet ?</h1>
      <div class="spacer"></div>
      <div class="entity-content">
        <p>
          Chaque étape du parcours d’une personne est marquée de désirs, ambitions et actions. Retraites Populaires accompagne les Vaudois tout le long de la vie, avec des produits de 3e pilier simples, adaptés à chaque situation et chaque projet.
        </p><br/>
        <img class="img-responsive" title="Assurance vie" src="https://www.retraitespopulaires.ch/upload/docs/image/png/2014-09/banner-avp.png" alt="Assurance vie">
        <br/>
        <p>Découvrez les produits en cliquant sur les cases du tableau:</p>
        <table class="table-wide table-assurance tablesaw tablesaw-stack" data-tablesaw-mode="stack">
          <thead>
            <tr>
              <th></th>
              <th>Je suis en <strong>formation</strong></th>
              <th>J'ai un <strong>emploi</strong></th>
              <th>Je suis à la <strong>retraite</strong></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Epargner en toute sécurité</td>
              <td><div class="text-center"><span class="text-danger retraitespopulaires-icon retraitespopulaires-icon-placeholder"></span></div></td>
              <td><div class="text-center"><span class="text-danger retraitespopulaires-icon retraitespopulaires-icon-placeholder"></span></div></td>
              <td><div class="text-center"><span class="text-danger retraitespopulaires-icon retraitespopulaires-icon-placeholder"></span></div></td>
            </tr>
            <tr>
              <td>Epargner en toute sécurité</td>
              <td><div class="text-center"><span class="text-danger retraitespopulaires-icon retraitespopulaires-icon-placeholder"></span></div></td>
              <td><div class="text-center"><span class="text-danger retraitespopulaires-icon retraitespopulaires-icon-placeholder"></span></div></td>
              <td><div class="text-center"><span class="text-danger retraitespopulaires-icon retraitespopulaires-icon-placeholder"></span></div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-xs-12 col-md-4 col-md-pull-7 col-lg-3 col-lg-pull-8 col-xl-2 col-xl-pull-6">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>
      {% include '../molecules/secondary-nav.html.swig' with {'theme': 'assurance'} %}
    </div>
  </div>
</div>

<div class="spacer spacer-lg"></div>
{% include '../organisms/attachments-contact.html.swig' with {'attachments_contact_theme': 'assurance'} %}

<div class="attachements-wrapper">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/card-attachement.html.swig' with {'card_attachement_theme': 'assurance', 'card_attachement_type': 'faq', 'card_attachement_title':'Questions fréquentes', 'card_attachement_links': ['Qu’est-ce qu’un 3e pilier A ou prévoyance liée?', 'Comment maintenir son niveau de vie à la retraite?', 'Qu’en est-il du 3e pilier en cas de divorce?'], 'card_attachement_more': 'Accéder à toutes les questions sur l’assurance vie'} %}
      </div>
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/card-attachement.html.swig' with {'card_attachement_theme': 'assurance', 'card_attachement_type': 'document', 'card_attachement_title':'Documents utiles', 'card_attachement_links': [
        'Brochure Conseil global',
        'Procuration',
        'Modification des primes et prestations'],
        'card_attachement_more': 'Tous les documents d’assurance vie'} %}
      </div>
    </div>
  </div>
  {% include '../atoms/organic-lines.html.swig' with {'organic_lines_theme': 'assurance'} %}
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}
