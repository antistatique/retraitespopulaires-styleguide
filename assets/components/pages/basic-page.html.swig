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
    <div class="col-xs-9 col-xs-offset-3 text-center">
      {% include '../molecules/breadcrumb.html.swig' %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-9 col-md-push-3">
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
    <div class="col-xs-12 col-md-3 col-md-pull-9">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>
      {% include '../molecules/secondary-nav.html.swig' with {'theme': 'assurance'} %}
    </div>
  </div>
</div>
<div class="spacer spacer-xl"></div>

<div class="attachements-wrapper">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/card-attachement.html.swig' with {'theme': 'assurance'} %}
      </div>
      <div class="col-xs-12 col-md-6">
        <div class="card-attachement card-attachement-assurance shadow shadow-down">
          <div class="card-title h2">Documents utiles</div>
          <ul class="card-content list-spaced list-unstyled">
            <li class="">
              <div class="media">
                <div class="media-left">
                  <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-placeholder retraitespopulaires-icon-2x"></a>
                </div>
                <div class="media-body">
                  <a href="#" class="pretty-link h5">Brochure Conseil global <span class="text-muted text-small">- PDF</span></a>
                </div>
              </div>
            </li>
            <li class="">
              <div class="media">
                <div class="media-left">
                  <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-placeholder retraitespopulaires-icon-2x"></a>
                </div>
                <div class="media-body">
                  <a href="#" class="pretty-link h5">Procuration <span class="text-muted text-small">- PDF</span></a>
                </div>
              </div>
            </li>
            <li class="">
              <div class="media">
                <div class="media-left">
                  <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-placeholder retraitespopulaires-icon-2x"></a>
                </div>
                <div class="media-body">
                  <a href="#" class="pretty-link h5">Modification des primes et prestations <span class="text-muted text-small">- PDF</span></a>
                </div>
              </div>
            </li>
          </ul>
          <div class="card-footer">
            <div class="media">
              <div class="media-left">
                  <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-placeholder"></a>
              </div>
              <div class="media-body">
                <a class="text-bold pretty-link h5" href="#">Accéder à tous les formulaires relatifs à l'assurance vie</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {% include '../atoms/organic-lines.html.swig' with {'theme': 'assurance'} %}
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}
