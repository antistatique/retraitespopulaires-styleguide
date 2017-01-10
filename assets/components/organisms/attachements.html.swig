---
title: attachements
name: attachements
collection: organisms
notes: |
  ##### Usage : `attachements`
  - **attachements_theme** - <i>String</i> - <b>['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>

---
<div class="attachements-wrapper">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-5 col-md-offset-1">
        {% include '../molecules/card-attachement.html.swig' with {'card_attachement_theme': attachements_theme, 'card_attachement_type': 'faq', 'card_attachement_title':'Questions fréquentes', 'card_attachement_links': ['Qu’est-ce qu’un 3e pilier A ou prévoyance liée?', 'Comment maintenir son niveau de vie à la retraite?', 'Qu’en est-il du 3e pilier en cas de divorce?'], 'card_attachement_more': 'Accéder à toutes les questions'} %}
      </div>
      <div class="col-xs-12 col-md-5">
        {% include '../molecules/card-attachement.html.swig' with {'card_attachement_theme': attachements_theme, 'card_attachement_type': 'document', 'card_attachement_title':'Documents utiles', 'card_attachement_links': [
        'Brochure Conseil global',
        'Procuration',
        'Modification des primes et prestations'],
        'card_attachement_more': 'Tous les documents'} %}
      </div>
    </div>
  </div>
  {% include '../atoms/organic-lines.html.swig' %}
</div>
