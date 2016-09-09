---
title: news
name: news
collection: pages
styleguide: false
layout: page.html.swig
---
{% include '../organisms/header.html.swig' %}
{% include '../atoms/funky-waves.html.swig' %}

<div class="container">
  <div class="row"></div>
    <div class="col-xs-9 col-xs-offset-3 text-center">
      {% include '../molecules/breadcrumb.html.swig' %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-3">
      <h3>L'actualité de Retraites Populaires</h3>
      <ul class="unordered-list">
        <li><a href="#" class="pretty-link">Assurance vie</a></li>
        <li><a href="#" class="pretty-link">Financement</a></li>
        <li><a href="#" class="pretty-link">Immobilier</a></li>
        <li><a href="#" class="pretty-link">Prévoyance professionnelle</a></li>
        <li><a href="#" class="pretty-link">Catégorie 1</a></li>
        <li><a href="#" class="pretty-link">Catégorie 2</a></li>
        <li><a href="#" class="pretty-link">Catégorie 3</a></li>
        <li><a href="#" class="pretty-link">Catégorie 4</a></li>
      </ul>
    </div>
    <div class="col-xs-12 col-md-9">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>
      <h1 class="page-title text-center">Quel est votre projet ?</h1>
      <div class="spacer"></div>
      <div class="entity-content">
        <p>
          Chaque étape du parcours d’une personne est marquée de désirs, ambitions et actions. Retraites Populaires accompagne les Vaudois tout le long de la vie, avec des produits de 3e pilier simples, adaptés à chaque situation et chaque projet.
        </p><br/>
        <img class="img-responsive" title="Assurance vie" src="https://www.retraitespopulaires.ch/upload/docs/image/png/2014-09/banner-avp.png" alt="Assurance vie">
        <br/>
        <p>Découvrez les produits en cliquant sur les cases du tableau:</p>
        <table class="table-wide table-assurance tablesaw tablesaw-stack" data-tablesaw-mode="stack">
          <thead>
            <tr>
              <th></th>
              <th>Je suis en <strong>formation</strong></th>
              <th>J'ai un <strong>emploi</strong></th>
              <th>Je suis à la <strong>retraite</strong></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Epargner en toute sécurité</td>
              <td><div class="text-center"><span class="text-danger retraitespopulaires-icon retraitespopulaires-icon-placeholder"></span></div></td>
              <td><div class="text-center"><span class="text-danger retraitespopulaires-icon retraitespopulaires-icon-placeholder"></span></div></td>
              <td><div class="text-center"><span class="text-danger retraitespopulaires-icon retraitespopulaires-icon-placeholder"></span></div></td>
            </tr>
            <tr>
              <td>Epargner en toute sécurité</td>
              <td><div class="text-center"><span class="text-danger retraitespopulaires-icon retraitespopulaires-icon-placeholder"></span></div></td>
              <td><div class="text-center"><span class="text-danger retraitespopulaires-icon retraitespopulaires-icon-placeholder"></span></div></td>
              <td><div class="text-center"><span class="text-danger retraitespopulaires-icon retraitespopulaires-icon-placeholder"></span></div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<div class="spacer spacer-xl"></div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}
