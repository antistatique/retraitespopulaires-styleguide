---
title: product
name: product
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
      <h1 class="page-title text-center">RP Jeune</h1>
      <div class="spacer"></div>
      <div class="entity-content">
        <p>
          3<sup>e</sup> pilier. Offrez à un enfant un cadeau pour l’avenir! Votre épargne le soutiendra dans ses projets. <strong class="text-assurance">CHF 50 offerts</strong>!
        </p><br/>
        <p>
          Le produit RP Jeune vous offre toute la liberté voulue pour épargner en faveur d'un enfant (par exemple: votre fils, petite-fille ou filleul). Celui-ci pourra, le moment venu, financer une partie de ses études ou réaliser un projet qui lui tienne à coeur. <br />
          Vous déterminez la fréquence et le montant des versements que vous réalisez sur la police. Retraites Populaires les enrichit d'intérêts.<br />
          A l'âge convenu, il appartient au jeune de choisir entre le versement d'un capital ou de rentes limitées dans le temps.
        </p>
        <br/>
        <h4 class="text-assurance">Avantages:</h4>
        <br/>
        <ul class="unordered-list">
          <li>Sécurité de l'investissement</li>
          <li>Libre choix des versements</li>
          <li>Choix de la rente ou du capital</li>
          <li>Rentes limitées dans le temps pour financer, p. ex., une période de formation</li>
          <li>Fiscalité intéressante</li>
          <li>CHF 50 offerts par Retraites Populaires pour un 1er versement de CHF 200 ou plus</li>
        </ul>
        <br/>
        <h4 class="text-assurance">Exemple de la famille Blanc</h4>
        <br/>
        <p>
          Virginie Blanc est née le 09.12.2015. Son papa décide d'épargner pour elle dans le cadre du produit RP Jeune. Il envisage un financement mensuel de CHF 100, la première fois en janvier 2016, et ce jusqu'aux 18 ans de Virginie. Le 09.12.2033, soit à ses 18 ans, Virginie pourra choisir grâce à ce premier contrat entre:
        </p>
        <table class="table-condensed table-assurance tablesaw tablesaw-stack" data-tablesaw-mode="stack">
         <thead>
          <tr>
             <th>Option 1</th>
             <th>Option 2</th>
          </tr>
         </thead>
         <tbody>
          <tr>
             <td><strong>Toucher pendant 7 ans une rente mensuelle de CHF 300</strong></td>
             <td><strong>Toucher un capital de CHF 24'480</strong></td>
          </tr>
         </tbody>
        </table>
        <br/>
        <p>
          La grand-maman de Virginie, elle aussi, décide d'épargner pour sa petite-fille dans le cadre du produit RP Jeune. Dans le cadre d'un nouveau contrat, elle effectue un versement de CHF 15'000. Virginie pourra disposer de cette épargne le jour de ses 20 ans, le 09.12.2035. A cette date et grâce à ce deuxième contrat, Virginie pourra choisir entre:
        </p>
        <ul class="unordered-list">
          <li><strong>Option 1:</strong> toucher pendant 5 ans une rente annuelle de CHF 4'085</li>
          <li><strong>Option 2:</strong> toucher un capital de CHF 20'000</li>
        </ul>
      </div>
    </div>
    <div class="col-xs-12 col-md-3 col-md-pull-9">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>

      <p class="media-heading text-muted">Les produits de Retraites Populaires</p>
      <ul class="facets-list">
        <li><a href="#" class="pretty-link text-black-assurance">RP Rente Immédiate</a></li>
        <li><a href="#" class="pretty-link text-black-assurance">RP Rente Immédiate certain</a></li>
        <li><a href="#" class="pretty-link text-black-assurance">RP Rente différéee</a></li>
        <li><a href="#" class="pretty-link text-black-assurance">RP Jeune</a></li>
        <li><a href="#" class="pretty-link text-black-assurance">RP Duo primes périodiques</a></li>
        <li><a href="#" class="pretty-link text-black-assurance">RP Prime unique</a></li>
        <li><a href="#" class="pretty-link text-black-assurance">RP Épargne</a></li>
        <li><a href="#" class="pretty-link text-black-assurance">RP Refuge</a></li>
      </ul>

      <div class="spacer spacer-sm"></div>
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
