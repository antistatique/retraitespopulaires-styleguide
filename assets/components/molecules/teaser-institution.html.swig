---
title: teaser-institution
name: teaser-institution
collection: molecules
notes: |
  ##### Usage : `teaser-institution`
  ##### Options :
  - **logo** - String
---
<div class="teaser-institution teaser-institution shadow shadow-down">
  <a href="#" class="institution-heading">
    {% if logo  %}
      <img src="{{ logo }}" alt="Logo de l'institution">
    {% else  %}
      <img class="img-responsive" src="https://3.bp.blogspot.com/-AJNG3A2-QIw/VjTFNFpJjsI/AAAAAAAAACQ/3lkytAva6oY/s600-c/NoImage.png" alt="Logo de l'institution">
    {% endif %}
  </a>
  <div class="institution-body">
    <a href="#" class="institution-title h1 pretty-link">Caisse de pensions de l'Etat de Vaud (CPEV)</a>
    <div class="spacer spacer-xs"></div>
    <p>Gérée par Retraites Populaires<p>
  </div>
</div>
