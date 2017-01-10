---
title: cree-mon-compte-validation
name: signup-validation
collection: emplois
styleguide: false
layout: emplois.html.swig
---
{% include '../organisms/header.html.swig' with {'light': true} %}
<div class="spacer spacer-xl"></div>
<div class="spacer spacer-xl hidden-md hidden-lg"></div>

<div class="container">
  <div class="row">
    <div class="col-xs-12 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {breadcrumb_theme: 'text-primary', breadcrumb_links: ['Accueil', 'Emploi', 'Crée un compte']} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-8 col-md-offset-2">
      <h1 class="page-title text-center">Crée un compte</h1>
      <div class="spacer"></div>
      <div class="row">
        <div class="col-xs-12">
          <div class="entity-content">
            <p class="text-center">Vous allez recevoir dans les 24 heures un e-mail pour valider votre compte.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' with {'light': true} %}
