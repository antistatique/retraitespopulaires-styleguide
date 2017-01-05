---
title: search-form
name: search-form
collection: molecules
notes: |
  ##### Usage : `search-form`
---
<form class="global-search">
  <h2 name="global-search" class="sr-only">Formulaire de recherche</h2>
  <div class="input-group full-width">
    <h2 class="sr-only">Rechercher</h2>
    <input type="text" class="form-control full-width" aria-label="Champ de recherche" placeholder="{{ placeholder|default('Chercher un produit, un document, un contact, ...') }}">
    <span class="input-group-btn">
      <button class="btn btn-default btn-icon" type="button" aria-label="Rechercher sur le site"><i class="retraitespopulaires-icon retraitespopulaires-icon-search"></i></button>
    </span>
  </div>
</form>
