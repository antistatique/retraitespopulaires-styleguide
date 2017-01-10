---
title: cip-homepage
name: cip-homepage
collection: mandats
styleguide: false
layout: mandats.html.swig
---
{% include '../organisms/header-mandats.html.swig' with {'theme': 'cip'} %}

{% include '../atoms/funky-waves.html.swig' with {funky_waves_img: 'http://www.cipvd.ch/upload/docs/image/png/2016-07/banner_salleconseilcip.png', 'funky_waves_theme': 'cip', 'funky_waves_disable': true, 'funky_waves_no_header': true} %}

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12">
      <div class="entity-content">
        <div class="container">
          <div class="spacer"></div>
          <h1 class="page-title text-center">Caisse intercommunale de pensions</h1>
          <div class="spacer"></div>
          <div class="row">
            <div class="col-xs-12 col-sm-4">
            {% include '../molecules/teaser-basicpage.html.swig' with {'theme_basicpage' : 'cip', 'title_basicpage': 'Simulateurs', 'body_basicpage': "Planifier votre retraite en fonction d'une date ou d'une rente souhaitée"} %}
          </div>
          <div class="col-xs-12 col-sm-4">
            {% include '../molecules/teaser-basicpage.html.swig' with {'theme_basicpage' : 'cip', 'title_basicpage': 'Résultats', 'body_basicpage': 'Résultats du 3e trimestre 2016. Au 30 septembre 2016, la CIP a réalisé une performance cumulée estimée à 1,6%. '} %}
          </div>
          <div class="col-xs-12 col-sm-4">
            {% include '../molecules/teaser-basicpage.html.swig' with {'theme_basicpage' : 'cip', 'title_basicpage': 'Documentation', 'body_basicpage': 'Publications, formulaires, lois.'} %}
          </div>
          </div>
        </div>
      </div>
      <div class="spacer spacer-lg"></div>
      <div class="last-news-wrapper">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 last-news-heading">
              <div class="h2">Actualités</div>
              <div><a class="pretty-link text-cip pretty-link-berrylight-gray">Voir toutes les actualités</a></div>
            </div>
          </div>

          <div class="row last-news-content">
            <div class="col-xs-12 col-md-6">
              {% include '../molecules/teaser-news.html.swig' with {'title_news': "
        Nouvelle composition du Conseil d'administration au 1er juillet 2016", 'body_news': "Laurence Favre et Fabienne Freymond Cantone succèdent à Didier Tenthorey et Laurent Ballif, arrivant au terme de leur mandat. Jean-François Niklaus reprend la présidence et Gilbert Gubler la vice-présidence.", 'date_news' : 'Juillet 2016', 'type_news' : 'Infos et communiqués', 'theme_news' : 'cip'} %}
            </div>
            <div class="col-xs-12 col-md-6">
              {% include '../molecules/teaser-news.html.swig' with {'title_news': "
        Le rapport de gestion 2015 est sorti", 'body_news': "En 2015, la CIP réalise une performance de 3,7% dans un contexte économique mondial chahuté. Ce résultat reste toutefois en dessous du besoin en rendement du plan de prévoyance", 'date_news' : 'Juin 2016', 'type_news' : 'Bulletin CIP', 'theme_news' : 'cip'} %}
            </div>
          </div>
        </div>
      </div>
      <div class="spacer spacer-lg"></div>

    </div>
  </div>
</div>

<div class="spacer"></div>
{% include '../organisms/footer-mandats.html.swig' with {'theme': 'cip'} %}
