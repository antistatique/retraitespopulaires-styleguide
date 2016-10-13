---
title: liste-appartements
name: flats
collection: immobiliers
styleguide: false
layout: immobiliers.html.swig
---
{% include '../organisms/header.html.swig' with {'light': true} %}
<div class="spacer spacer-xl"></div>

<div class="container">
  <div class="row"></div>
    <div class="col-xs-12 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {theme: 'text-immobilier', links: ['Accueil', 'Immobilier', 'Appartements à louer']} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-8 col-md-offset-2">
      <h1 class="page-title text-center">Appartements à louer</h1>
      <div class="spacer"></div>
      <div class="entity-content">
        {% include '../organisms/form-immo-search.html.swig' %}
        <div class="spacer"></div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-xs-12">
      <img class="img-responsive img-fullwidth" border="0" src="/retraitespopulaires-styleguide/build/img/immo-staticmap.png" alt="">
      <div class="spacer"></div>
      {% include '../molecules/immo-results.html.swig' %}
      <div class="spacer"></div>
    </div>
  </div>
  <div class="row">
    {% for flat in data.flats %}
      <div class="col-xs-12 col-sm-6 col-lg-4">
        {% include '../molecules/teaser-rental.html.swig' with {
          "rental_heading": flat.rental_heading,
          "rental_type": flat.rental_type,
          "rental_title":  flat.rental_title,
          "rental_address":  flat.rental_address,
          "rental_rooms": flat.rental_rooms,
          "rental_surface": flat.rental_surface,
          "rental_rent": flat.rental_rent,
        } %}
      </div>
    {% endfor %}
  </div>
  <div class="spacer"></div>

  <div class="row container-wrapper-gray">
    <div class="col-xs-12 col-md-8 col-md-offset-2">
      {% include '../organisms/form-immo-alert.html.swig' %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' with {'light': true} %}
