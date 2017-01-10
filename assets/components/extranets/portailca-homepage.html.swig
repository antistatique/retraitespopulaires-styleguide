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
      <div class="spacer spacer-md"></div>
      {% include '../molecules/breadcrumb-ca.html.swig' with {'breadcrumb_ca_links': ['Accueil', 'Retraites Populaires']} %}
      <div class="spacer spacer-xs"></div>
      <div class="spacer spacer-md"></div>
      <h1>Retraites Populaires</h1>
      <div class="spacer spacer-xs"></div>
      <div class="spacer spacer-md"></div>
      <div class="well">
        <div class="row">
          <div class="col-xs-8">
            Vous souhaitez ajouter une nouvelle rubrique dans le conseil Retraites Populaires ?
          </div>
          <div class="col-xs-4">
            <a href="#" class="btn btn-default btn-xs pull-right">Ajouter une rubrique</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="spacer spacer-sm"></div>
  <div class="row">
    <div class="col-md-4">
      {% include '../molecules/teaser-basicpage.html.swig' with {'links_basicpage': ['Cum sint illum', 'Voluptas sed', 'Minima sit vero eos iste alias']} %}
    </div>
    <div class="col-md-4">
      {% include '../molecules/teaser-basicpage.html.swig' with {'links_basicpage': ['Liens 1', 'Liens 2' , 'Asperiores']} %}
    </div>
    <div class="col-md-4">
      {% include '../molecules/teaser-basicpage.html.swig' with {'links_basicpage': ['Cum dolores tempora autem in aut', 'Et quas placeat voluptatem', 'Nihil quis hic veniam', 'Et est est non ratione ducimus', 'Autem quasi']} %}
    </div>
    <div class="col-md-4">
      {% include '../molecules/teaser-basicpage.html.swig' with {'links_basicpage': ['Liens 1', 'Liens 2' , 'Asperiores', 'nesciunt']} %}
    </div>
    <div class="col-md-4">
      {% include '../molecules/teaser-basicpage.html.swig' with {'links_basicpage': ['Et quas placeat voluptatem', 'Nihil quis hic veniam', 'Et est est non ratione ducimus', 'Autem quasi']} %}
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
