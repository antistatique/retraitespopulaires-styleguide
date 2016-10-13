---
title: flat-form
name: flat-form
collection: immobiliers
styleguide: false
layout: immobiliers.html.swig
---
{% include '../organisms/header.html.swig' with {'light': true} %}
<div class="spacer spacer-xl"></div>

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
      <div class="row">
        <div class="col-xs-12">
          <div class="spacer spacer-sm"></div>
            {% include '../organisms/form-immo-contact.html.swig' with {'light': true} %}
          <div class="spacer spacer-sm"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' with {'light': true} %}