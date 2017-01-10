---
title: appartement
name: flat
collection: immobiliers
styleguide: false
layout: immobiliers.html.swig
---
{% include '../organisms/header.html.swig' with {'light': true, 'theme': 'immobilier'} %}
<div class="spacer spacer-xl"></div>
<div class="spacer spacer-xl hidden-md hidden-lg"></div>

<div class="container">
  <div class="row">
    <div class="col-xs-12 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {breadcrumb_theme: 'text-immobilier', breadcrumb_links: ['Accueil', 'Immobilier',  'Appartements à louer', 'Ch. de Pierrefleur 54, 1004 Lausanne
']} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-8 col-md-offset-2">
      <h1 class="page-title text-center">Ch. de Pierrefleur 54, 1004 Lausanne</h1>
      <div class="spacer spacer-md"></div>
      <div class="row">
        <div class="col-xs-12" align="center">
          <ul class="d-inline-block list-no-style list-no-padding list-inline">
            <li> <a class="pretty-link text-immobilier" href="#"><span class="text-small">◀</span> Objet précédent</a></li>
            <li> <a class="pretty-link text-immobilier" href="#">Revenir à la recherche</a></li>
            <li> <a class="pretty-link text-immobilier" href="#">Objet suivant <span class="text-small">►</span></a></li>
          </ul>
        </div>
      </div>
      <div class="spacer spacer-md"></div>
      <div class="row">
        <div class="col-xs-12">
          {% include '../molecules/immo-heading.html.swig' with {theme: 'immobilier', immo_heading: ''} %}
          <div class="spacer spacer-xs"></div>
          {% include '../atoms/map-card.html.swig' %}
          <div class="spacer spacer-xs"></div>
          <table class="table-wide table-immobilier tablesaw tablesaw-stack" data-tablesaw-mode="stack">
             <thead>
              <tr>
                 <th><strong>Données complémentaires</strong></th>
                 <th></th>
              </tr>
             </thead>
             <tbody>
              <tr>
                 <td><strong>Loyer total</strong></td>
                 <td>CHF 1'120.-</td>
              </tr>
              <tr>
                 <td><strong>Étage</strong></td>
                 <td>1er étage</td>
              </tr>
              <tr>
                 <td><strong>Disponibilité</strong></td>
                 <td> de suite ou à convenir</td>
              </tr>
              <tr>
                 <td><strong>Type</strong></td>
                 <td>Appartement</td>
              </tr>
              <tr>
                 <td><strong>Orientation</strong></td>
                 <td>Sud</td>
              </tr>
              <tr>
                 <td><strong>Année de construction</strong></td>
                 <td>1890</td>
              </tr>
            </tbody>
          </table>
          <div class="spacer spacer-md"></div>
          <div class="entity-content">
            <h4>Descriptif de l'immeuble</h4>
            <br>
            <p>Bel immeuble situé proche du centre-ville, au coeur du quartier de la Cité et à proximité de toutes les commodités.</p>
            <br>
            <h4>Descriptif</h4>
            <br>
            <ul class="unordered-list">
              <li><strong>Cuisine :</strong> laboratoire</li>
              <li><strong>Agencement :</strong> cuisinière électrique, frigo</li>
              <li><strong>Caractéristiques :</strong> hall</li>
            </ul>
            <br>
            <h4>Contact</h4>
            <br>
            <p><strong>Bernard Nicod SA</strong>
            <br>Agence Immobilière, Case postale 1112, 1001 Lausanne, Tél. 021 311 11 11</p>
            <br>
            <h4>Pour visiter</h4>
            <br>
            <p><strong>Bernard Nicod SA</strong>
            <br>Agence Immobilière, Case postale 1112, 1001 Lausanne, Tél. 021 311 11 11</p>
          </div>
          <div class="spacer spacer-sm"></div>
          <div class="row">
            <div class="col-sm-12">
              {% include '../atoms/button.html.swig' with {btn_theme: 'immobilier', btn_label: 'Demande de renseignement'} %}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' with {'light': true, 'theme': 'immobilier'} %}
