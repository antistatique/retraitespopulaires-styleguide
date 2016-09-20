---
title: simulateur-libre-passage
name: simulateur-libre-passage
collection: pages
styleguide: false
layout: page.html.swig
---
{% include '../organisms/header-complet.html.swig' %}
{% include '../atoms/funky-waves.html.swig' %}

<div class="container">
  <div class="row"></div>
    <div class="col-xs-12 col-md-7 col-md-offset-4 col-lg-8 col-lg-offset-3 col-xl-6 col-xl-offset-3 text-center">
      <div class="breadcrumb">
        <ul class="list-inline list-no-style list-no-padding">
          <li class="text-primary">Accueil</li>
          <li class="text-muted">›</li>
          <li class="text-prevoyance">Prévoyance professionnelle</li>
          <li class="text-muted">›</li>
          <li class="text-prevoyance">Transiter entre deux emplois</li>
          <li class="text-muted">›</li>
          <li class="text-muted">Simulateur pour une police de libre passage RP Arc-en-ciel</li>
        </ul>
      </div>
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-push-4 col-lg-8 col-lg-push-3 col-xl-6 col-xl-push-3">
      <h1 class="page-title text-center">Simulateur pour une police de libre passage RP Arc-en-ciel</h1>
      <div class="spacer"></div>
      <div class="entity-content">
        <p>Produit de libre passage permettant de conserver une prévoyance en béton entre deux emplois. Que vous soyez temporairement sans travail ou que vous vous consacriez entièrement à votre activité de jeune parent, il est possible de maintenir votre 2e pilier durant cette période.</p>
        <div class="spacer"></div>
        <h3>Vos données personnelles</h3>
        {% include '../organisms/form-simulateur-libre-passage.html.swig' with {'theme': 'prevoyance'} %}
      </div>
      <div class="spacer spacer-lg"></div>
      {% include '../molecules/teaser-contact.html.swig' %}
    </div>
    <div class="col-xs-12 col-md-4 col-md-pull-7 col-lg-3 col-lg-pull-8 col-xl-2 col-xl-pull-6">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>
      {% include '../molecules/secondary-nav.html.swig' with {'theme': 'prevoyance'} %}
    </div>
  </div>
</div>
<div class="attachements-wrapper">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/card-attachement.html.swig' with {'theme': 'prevoyance'} %}
      </div>
      <div class="col-xs-12 col-md-6">
        <div class="card-attachement card-attachement-prevoyance shadow shadow-down">
          <div class="card-title h2">Documents utiles</div>
          <ul class="card-content list-spaced list-unstyled">
            <li class="">
              <div class="media">
                <div class="media-left">
                  <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-placeholder retraitespopulaires-icon-2x"></a>
                </div>
                <div class="media-body">
                  <a href="#" class="pretty-link h5">D’un emploi à l’autre, placer son 2e pilier (24 heures)  <span class="text-muted text-small">- PDF</span></a>
                </div>
              </div>
            </li>
            <li class="">
              <div class="media">
                <div class="media-left">
                  <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-placeholder retraitespopulaires-icon-2x"></a>
                </div>
                <div class="media-body">
                  <a href="#" class="pretty-link h5">Conditions RP Arc-en-ciel <span class="text-muted text-small">- PDF</span></a>
                </div>
              </div>
            </li>
            <li class="">
              <div class="media">
                <div class="media-left">
                  <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-placeholder retraitespopulaires-icon-2x"></a>
                </div>
                <div class="media-body">
                  <a href="#" class="pretty-link h5">Brochure RP Arc-en-ciel   <span class="text-muted text-small">- PDF</span></a>
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
                <a class="text-bold pretty-link h5" href="#">Accéder à tous les formulaires relatifs à la prévoyance professionnelle</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {% include '../atoms/organic-lines.html.swig' with {'theme': 'prevoyance'} %}
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}