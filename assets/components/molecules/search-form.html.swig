---
title: search-form
name: search-form
collection: molecules
notes: |
  ##### Usage : `search-form`
  - **visible** - <i>Boolean</i>
  - **placeholder** - <i>String</i>
  - **search_form_theme** - <i>String</i> - <b>['outline'|'primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
{% if visible %}
<form class="global-search global-search-visible">
{% else %}
<form class="global-search">
{% endif %}
  <h2 name="global-search" class="sr-only">Formulaire de recherche</h2>
  <div class="input-group full-width">
    <h2 class="sr-only">Rechercher</h2>
    <input type="text" class="form-control form-control-{{search_form_theme}} full-width" aria-label="Champ de recherche" placeholder="{{ placeholder|default('Chercher un produit, un document, un contact, ...') }}">
    <span class="input-group-btn">
      <button class="btn btn-default btn-icon btn-{{search_form_theme}}" type="button" aria-label="Rechercher sur le site"><i class="retraitespopulaires-icon retraitespopulaires-icon-search"></i></button>
    </span>
  </div>
</form>
