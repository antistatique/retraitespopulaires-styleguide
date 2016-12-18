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
        {% include '../molecules/card-attachement.html.swig' with {'theme': attachements_theme, 'type': 'faq', 'title':'Questions fréquentes', 'links': ['Qu’est-ce qu’un 3e pilier A ou prévoyance liée?', 'Comment maintenir son niveau de vie à la retraite?', 'Qu’en est-il du 3e pilier en cas de divorce?'], 'more': 'Accéder à toutes les questions'} %}
      </div>
      <div class="col-xs-12 col-md-5">
        {% include '../molecules/card-attachement.html.swig' with {'theme': attachements_theme, 'type': 'document', 'title':'Documents utiles', 'links': [
        'Brochure Conseil global',
        'Procuration',
        'Modification des primes et prestations'],
        'more': 'Tous les documents'} %}
      </div>
    </div>
  </div>
  {% include '../atoms/organic-lines.html.swig' %}
</div>
