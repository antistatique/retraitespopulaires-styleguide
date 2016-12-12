---
title: portailca-homepage
name: portailca-homepage
collection: extranets
styleguide: false
layout: extranets.html.swig
---
{% include '../organisms/header-extranet.html.swig' with {'theme': ''} %}


<div class="container">
  <div class="row">
    <div class="col-xs-12 text-center">
      {% include '../molecules/breadcrumb-ca.html.swig' with {'links': ['Accueil', 'Retraites Populaires']} %}
      <div class="spacer spacer-sm"></div>
      <h1>Retraites Populaires</h1>
      <div class="spacer spacer-sm"></div>
      <div class="well">
        <div class="row">
          <div class="col-xs-8">
            Vous souhaitez ajouter une nouvelle rubrique dans le conseil Retraites Populaires ?
          </div>
          <div class="col-xs-4">
            <a href="#" class="btn btn-default pull-right">Ajouter une rubrique</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    
  </div>
</div>
