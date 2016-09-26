---
title: rp-jeune
name: rp-jeune
collection: website
styleguide: false
layout: website.html.swig
---
{% include '../organisms/header.html.swig' %}
{% include '../atoms/funky-waves.html.swig' %}

<div class="container">
  <div class="row"></div>
    <div class="col-xs-12 col-md-7 col-md-offset-4 col-lg-8 col-lg-offset-3 col-xl-6 col-xl-offset-3 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {theme: 'assurance-vie', links: ['Accueil', 'Assurance vie', 'RP Jeune']} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-push-4 col-lg-8 col-lg-push-3 col-xl-6 col-xl-push-3">
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
      <div class="spacer"></div>
      <div class="row">
        <div class="col-xs-12">
          <div class="h1 text-center">Retraites Populaires peut vous aider ! Voici la gamme complète des produits 3e pilier A et B.</div>
          <div class="spacer spacer-md"></div>
        </div>

        <div class="col-md-4">
          {% include '../atoms/facets-list.html.swig' with {'title': '', 'links': ['RP Rente Immédiate', 'RP Rente Immédiate certain', 'RP Rente différéee', 'RP Jeune', 'RP Duo primes périodiques', 'RP Prime unique', 'RP Épargne', 'RP Refuge']} %}
          <div class="spacer spacer-sm"></div>
        </div>
        <div class="col-md-8">
          <div class="row">
            <div class="col-sm-6">
              {% include '../molecules/teaser-product.html.swig' with {'title': 'Rente Immédiate', 'body': 'Profitez de votre retraite! Placez un capital de manière sûre et bénéficiez tout de suite de rentes à vie.'} %}
            </div>
            <div class="col-sm-6">
              {% include '../molecules/teaser-product.html.swig' with {'title': 'Rente Immédiate certain', 'body': 'Réalisez vos projets! Transformez votre capital en revenu supplémentaire garanti.'} %}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-4 col-md-pull-7 col-lg-3 col-lg-pull-8 col-xl-2 col-xl-pull-6">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>
      {% include '../molecules/secondary-nav.html.swig' with {'theme': 'assurance', 'json': 'assurance-vie'} %}
    </div>
  </div>
</div>
<div class="spacer spacer-xl"></div>

<div class="attachements-wrapper">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/card-attachement.html.swig' with {'theme': 'assurance', 'type': 'faq', 'title':'Questions fréquentes', 'links': ['Qu’est-ce qu’un 3e pilier A ou prévoyance liée?', 'Comment maintenir son niveau de vie à la retraite?', 'Qu’en est-il du 3e pilier en cas de divorce?'], 'more': 'Accéder à toutes les questions sur l’assurance vie'} %}
      </div>
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/card-attachement.html.swig' with {'theme': 'assurance', 'type': 'document', 'title':'Documents utiles', 'links': [
        'Brochure Conseil global',
        'Procuration',
        'Modification des primes et prestations'],
        'more': 'Accéder à tous les formulaires relatifs à l’assurance vie'} %}
      </div>
    </div>
  </div>
  {% include '../atoms/organic-lines.html.swig' with {'theme': 'assurance'} %}
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}
