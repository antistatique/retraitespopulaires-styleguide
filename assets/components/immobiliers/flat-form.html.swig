---
title: flat-form
name: flat-form
collection: immobiliers
styleguide: false
layout: immobiliers.html.swig
---
{% include '../organisms/header.html.swig' with {'light': true, 'theme': 'immobilier'} %}
<div class="spacer spacer-xl"></div>
<div class="spacer spacer-xl hidden-md hidden-lg"></div>

<div class="container">
  <div class="row"></div>
    <div class="col-xs-12 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {theme: 'text-immobilier', links: ['Accueil', 'Immobilier',  'Appartements à louer', 'Ch. de Pierrefleur 54, 1004 Lausanne', 'Demande de renseignements']} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-8 col-md-offset-2">
      <h1 class="page-title text-center">Demande de renseignements</h1>
      <div class="spacer"></div>
      {% include '../molecules/teaser-rental.html.swig' with {
        "rental_heading": data.flats.universite.rental_heading,
        "rental_type": data.flats.universite.rental_type,
        "rental_title":  data.flats.universite.rental_title,
        "rental_address":  data.flats.universite.rental_address,
        "rental_rooms": data.flats.universite.rental_rooms,
        "rental_surface": data.flats.universite.rental_surface,
        "rental_rent": data.flats.universite.rental_rent,
        "theme": 'immobilier',
      } %}
      <div class="spacer spacer-sm"></div>
      <div class="row">
        <div class="col-xs-8 col-xs-offset-2">
        {% include '../organisms/form-immo-contact.html.swig' with {'light': true} %}
        </div>
      </div>
    </div>
  </div>
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' with {'light': true, 'theme': 'immobilier'} %}
