---
title: immobilier
name: immobilier
collection: pages
styleguide: false
layout: page.html.swig
---
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
  <div class="row"></div>
    <div class="col-xs-12 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {theme: 'x-immobilier', links: ['Accueil', 'Immobilier', 'Appartements à louer']} %}
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
        {% include '../organisms/form-immobilier.html.swig' %}
      </div>
    </div>
  </div>
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}
