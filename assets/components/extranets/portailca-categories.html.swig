---
title: portailca-categories
name: portailca-categories
collection: extranets
styleguide: false
layout: extranets.html.swig
---
{% include '../organisms/header-extranet.html.swig' with {'theme': ''} %}
<div class="portailca-categories">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 text-center">
        <div class="spacer spacer-md"></div>
        {% include '../molecules/breadcrumb-ca.html.swig' with {'links': ['Accueil', 'Retraites Populaires']} %}
        <div class="spacer spacer-xs"></div>
        <div class="spacer spacer-md"></div>
        <h1>Ordres du jour all inclusives</h1>
        <div class="spacer spacer-md"></div>
      </div>
    </div>
    <div class="spacer spacer-sm"></div>
  </div>
  <div class="container-fluid">
    <div class="row">

      <div class="col-xs-12 col-md-7 col-md-push-4 col-lg-8 col-lg-push-3 col-xl-6 col-xl-push-3">
        <div class="well">
          <div class="row">
            <div class="col-xs-8">
              Vous souhaitez ajouter une nouvelle sous-rubrique dans la rubrique "Ordres du jour all inclusives" ?
            </div>
            <div class="col-xs-4">
              <a href="#" class="btn btn-default btn-xs pull-right">Ajouter une sous-rubrique</a>
            </div>
          </div>
        </div>
        <ul class="facets-list">
          <li><a href="#" class="pretty-link">2016</a></li>
          <li><a href="#" class="pretty-link">2015</a></li>
          <li><a href="#" class="pretty-link">2014</a></li>
        </ul>
      </div>
      <div class="col-xs-12 col-md-4 col-md-pull-7 col-lg-3 col-lg-pull-8 col-xl-2 col-xl-pull-6">
        <div class="spacer spacer-xl visible-xs visible-sm"></div>
        {% include '../molecules/secondary-nav.html.swig' with {'theme': '', 'json': 'portailca'} %}
      </div>
    </div>
  </div>

  {% include '../atoms/organic-lines.html.swig' with {'organic_lines_theme': theme} %}

  <div class="spacer"></div>

  <div class="container">
    <div class="row">
      <div class="col-xs-12 text-center">
        <ul class="menu-footer unordered-list list-inline list-unstyle-first">
          <li><a href="#" class="pretty-link text-{{theme}}">Impressum</a></li>
          <li><a href="#" class="pretty-link text-{{theme}}">Mentions juridiques</a></li>
          <li><a href="#" class="pretty-link text-{{theme}}">Glossaire</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="spacer"></div>
</div>
