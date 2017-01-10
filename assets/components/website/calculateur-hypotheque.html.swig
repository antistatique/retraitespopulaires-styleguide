---
title: calculateur-hypotheque
name: calculateur-hypotheque
collection: website
styleguide: false
layout: website.html.swig
---
{% include '../organisms/header.html.swig' %}
{% include '../atoms/funky-waves.html.swig' %}

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-offset-4 col-lg-8 col-lg-offset-3 col-xl-6 col-xl-offset-3 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {breadcrumb_theme: 'text-hypotheque', breadcrumb_links: ['Accueil', 'Financement', 'Prêt hypothécaire', 'Calculateur d’hypothèque']} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>
<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-push-4 col-lg-8 col-lg-push-3 col-xl-6 col-xl-push-3">
      <h1 class="page-title text-center">Calculateur d'hypothèque</h1>
      <div class="spacer"></div>
      <div class="entity-content">
        <h2>Comment ça marche ?</h2>
        <div class="spacer spacer-xs"></div>
        <p>D'abord, remplissez les champs:</p>
          <ul class="unordered-list">
            <li><strong>Prix d'achat</strong> (1)</li>
            <li><strong>Fonds propres</strong> (2)</li>
            <li><strong>Revenu annuel net</strong> (3) </li>
            <li>Puis, sélectionnez le <strong>taux souhaité</strong> (4)</li>
            <li>Enfin, cliquez sur le bouton <strong>Calculer</strong></li>
          </ul>
          <p>Ce calculateur sert à vous donner une première idée de vos possibilités. Si le résultat de votre simulation est positif, remplissez le formulaire de demande afin de constituer votre dossier. Envoyez le tout à:</p>
          <address>
            <strong>Retraites Populaires</strong>, Service des prêts, Caroline 9, 1001 Lausanne - <a class="text-no-wrap" href="tel:0213482626">021 348 26 26</a> - <a href="mailto:prets@retraitespopulaires.ch">prets@retraitespopulaires.ch</a>.
          </address>
          <div class="row">
            <div class="col-xs-12">
              {% include '../organisms/form-hypotheque.html.swig' %}
            </div>
          </div>
          <div class="spacer"></div>
          <div class="row">
            <div class="col-xs-12">
              {% include '../molecules/progresschart.html.swig' %}
            </div>
          </div>
        </div>
    </div>
    <div class="col-xs-12 col-md-4 col-md-pull-7 col-lg-3 col-lg-pull-8 col-xl-2 col-xl-pull-6">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>
      {% include '../molecules/secondary-nav.html.swig' with {'theme': 'hypotheque'} %}
    </div>
  </div>
</div>

<div class="spacer spacer-lg"></div>
{% include '../organisms/attachments-contact.html.swig' with {'attachments_contact_theme': 'hypotheque'} %}

<div class="attachements-wrapper">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/card-attachement.html.swig' with {'card_attachement_theme': 'hypotheque', 'card_attachement_type': 'faq', 'card_attachement_title':'Questions fréquentes', 'card_attachement_links': ['Qu’est-ce qu’un 3e pilier A ou prévoyance liée?', 'Comment maintenir son niveau de vie à la retraite?', 'Qu’en est-il du 3e pilier en cas de divorce?'], 'card_attachement_more': 'Accéder à toutes les questions sur le financement'} %}
      </div>
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/card-attachement.html.swig' with {'card_attachement_theme': 'hypotheque', 'card_attachement_type': 'faq', 'card_attachement_title':'Documents utiles', 'card_attachement_links': [
        'Brochure Conseil global',
        'Procuration',
        'Modification des primes et prestations'],
        'card_attachement_more': 'Tous les documents de financement'} %}
      </div>
    </div>
  </div>
  {% include '../atoms/organic-lines.html.swig' with {'organic_lines_theme': 'assurance'} %}
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}
