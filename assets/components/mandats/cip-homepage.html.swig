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
            {% include '../molecules/teaser-basicpage.html.swig' with {'basicpage_theme' : 'cip', 'basicpage_title': 'Simulateurs', 'basicpage_body': "Planifier votre retraite en fonction d'une date ou d'une rente souhaitée"} %}
          </div>
          <div class="col-xs-12 col-sm-4">
            {% include '../molecules/teaser-basicpage.html.swig' with {'basicpage_theme' : 'cip', 'basicpage_title': 'Résultats', 'basicpage_body': 'Résultats du 3e trimestre 2016. Au 30 septembre 2016, la CIP a réalisé une performance cumulée estimée à 1,6%. '} %}
          </div>
          <div class="col-xs-12 col-sm-4">
            {% include '../molecules/teaser-basicpage.html.swig' with {'basicpage_theme' : 'cip', 'basicpage_title': 'Documentation', 'basicpage_body': 'Publications, formulaires, lois.'} %}
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
              {% include '../molecules/teaser-news.html.swig' with {'news_title': "
        Nouvelle composition du Conseil d'administration au 1er juillet 2016", 'news_body': "Laurence Favre et Fabienne Freymond Cantone succèdent à Didier Tenthorey et Laurent Ballif, arrivant au terme de leur mandat. Jean-François Niklaus reprend la présidence et Gilbert Gubler la vice-présidence.", 'news_date' : 'Juillet 2016', 'news_type' : 'Infos et communiqués', 'news_theme' : 'cip'} %}
            </div>
            <div class="col-xs-12 col-md-6">
              {% include '../molecules/teaser-news.html.swig' with {'news_title': "
        Le rapport de gestion 2015 est sorti", 'news_body': "En 2015, la CIP réalise une performance de 3,7% dans un contexte économique mondial chahuté. Ce résultat reste toutefois en dessous du besoin en rendement du plan de prévoyance", 'news_date' : 'Juin 2016', 'news_type' : 'Bulletin CIP', 'news_theme' : 'cip'} %}
            </div>
          </div>
        </div>
      </div>
      <div class="spacer spacer-lg"></div>

    </div>
  </div>
</div>

<div class="spacer"></div>
{% include '../organisms/footer-mandats.html.swig' with {'footer_mandats_theme': 'cip'} %}
