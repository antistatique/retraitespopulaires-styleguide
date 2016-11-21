---
title: connexion
name: connection
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
      {% include '../molecules/breadcrumb.html.swig' with {theme: 'text-primary', links: ['Accueil', 'Emploi', 'Connexion']} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-8 col-md-offset-2">
      <h1 class="page-title text-center">Connexion</h1>
      <div class="spacer"></div>

      <div class="row">
        <div class="col-xs-8 col-xs-offset-2">
          {% include '../organisms/form-job-signin.html.swig' %}
        </div>
      </div>

      <div class="spacer spacer-lg"></div>
      <div class="row">
        <div class="col-xs-8 col-xs-offset-2">
          <h3>Nouvel utilisateur</h3>
          <div class="spacer spacer-xs"></div>
          <p>Pour vous connecter, vous avez besoin d'une adresse e-mail valide.</p>
          <div class="text-center">
            <a href="#" class="btn btn-primary btn-lg">Crée une addresse</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' with {'light': true} %}
