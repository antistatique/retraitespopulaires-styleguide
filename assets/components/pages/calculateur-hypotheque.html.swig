---
title: calculateur-hypotheque
name: calculateur-hypotheque
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
          <li class="text-hypotheque">Financement</li>
          <li class="text-muted">›</li>
          <li class="text-hypotheque">Prêt hypothécaire</li>
          <li class="text-muted">›</li>
          <li class="text-muted">Calculateur d'hypothèque</li>
        </ul>
      </div>
      <div class="spacer"></div>
    </div>
  </div>
</div>
<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-push-4 col-lg-8 col-lg-push-3 col-xl-6 col-xl-push-3">
      <h1 class="page-title text-center">Calculateur d'hypothèque</h1>
      <div class="spacer"></div>
      <div class="entity-content">
        <h2>Comment ça marche ?</h2>
        <div class="spacer spacer-xs"></div>
        <p>D'abord, remplissez les champs:</p>
          <ul>
            <li><strong>Prix d'achat</strong> (1)</li>
            <li><strong>Fonds propres</strong> (2)</li>
            <li><strong>Revenu annuel net</strong> (3) </li>
            <li>Puis, sélectionnez le <strong>taux souhaité</strong> (4)</li>
            <li>Enfin, cliquez sur le bouton <strong>Calculer</strong></li>
          </ul>
          <p>Ce calculateur sert à vous donner une première idée de vos possibilités. Si le résultat de votre simulation est positif, remplissez le formulaire de demande afin de constituer votre dossier. Envoyez le tout à:</p>
          <address>
            <strong>Retraites Populaires</strong>, Service des prêts, Caroline 9, 1001 Lausanne - <a href="tel:0213482626">021 348 26 26</a> - <a href="mailto:prets@retraitespopulaires.ch">prets@retraitespopulaires.ch</a>.
          </address>
          {% include '../organisms/form-hypotheque.html.swig' %}
        </div>
      <div class="spacer spacer-lg"></div>
      {% include '../molecules/teaser-contact.html.swig' %}
    </div>
    <div class="col-xs-12 col-md-4 col-md-pull-7 col-lg-3 col-lg-pull-8 col-xl-2 col-xl-pull-6">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>
      {% include '../molecules/secondary-nav.html.swig' with {'theme': 'hypotheque'} %}
    </div>
  </div>
</div>
<div class="attachements-wrapper">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/card-attachement.html.swig' with {'theme': 'hypotheque'} %}
      </div>
      <div class="col-xs-12 col-md-6">
        <div class="card-attachement card-attachement-hypotheque shadow shadow-down">
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
                <a class="text-bold pretty-link h5" href="#">Accéder à tous les formulaires relatifs au financement</a>
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