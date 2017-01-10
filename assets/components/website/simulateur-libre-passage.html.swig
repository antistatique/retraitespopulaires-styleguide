---
title: simulateur-libre-passage
name: simulateur-libre-passage
collection: website
styleguide: false
layout: website.html.swig
---
{% include '../organisms/header.html.swig' %}
{% include '../atoms/funky-waves.html.swig' %}

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-offset-4 col-lg-8 col-lg-offset-3 col-xl-6 col-xl-offset-3 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {breadcrumb_theme: 'text-prevoyance', breadcrumb_links: ['Accueil', 'Prévoyance professionnelle', 'Transiter entre deux emplois', 'Simulateur pour une police de libre passage RP Arc-en-ciel']} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-push-4 col-lg-8 col-lg-push-3 col-xl-6 col-xl-push-3">
      <h1 class="page-title text-center">Simulateur pour une police de libre passage RP Arc-en-ciel</h1>
      <div class="spacer"></div>

      <div class="entity-content">
        <div class="row">
          <div class="col-xs-8 col-xs-offset-2">
            <div class="well well-lg">
              <p>Produit de libre passage permettant de conserver une prévoyance en béton entre deux emplois. Que vous soyez temporairement sans travail ou que vous vous consacriez entièrement à votre activité de jeune parent, il est possible de maintenir votre 2e pilier durant cette période.</p>
            </div>
            <div class="spacer"></div>
            {% include '../organisms/form-simulateur-libre-passage.html.swig' with {'theme': 'prevoyance'} %}
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-4 col-md-pull-7 col-lg-3 col-lg-pull-8 col-xl-2 col-xl-pull-6">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>
      {% include '../molecules/secondary-nav.html.swig' with {'secondary_nav_theme': 'prevoyance'} %}
    </div>
  </div>
</div>

<div class="spacer spacer-lg"></div>
{% include '../organisms/attachments-contact.html.swig' {'attachments_contact_theme': 'prevoyance'} %}

<div class="attachements-wrapper">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/card-attachement.html.swig' with {'card_attachement_theme': 'prevoyance', 'card_attachement_type': 'faq', 'card_attachement_title':'Questions fréquentes', 'card_attachement_links': ['Qu’est-ce qu’un 3e pilier A ou prévoyance liée?', 'Comment maintenir son niveau de vie à la retraite?', 'Qu’en est-il du 3e pilier en cas de divorce?'], 'card_attachement_more': 'Accéder à toutes les questions sur le financement'} %}
      </div>
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/card-attachement.html.swig' with {'card_attachement_theme': 'prevoyance', 'card_attachement_type': 'document', 'card_attachement_title':'Documents utiles', 'card_attachement_links': [
        'D’un emploi à l’autre, placer son 2e pilier (24 heures)',
        'Conditions RP Arc-en-ciel',
        'Brochure RP Arc-en-ciel'],
        'card_attachement_more': 'Tous les documents de prévoyance professionnelle'} %}
      </div>
    </div>
  </div>
  {% include '../atoms/organic-lines.html.swig' with {'organic_lines_theme': 'prevoyance'} %}
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}
