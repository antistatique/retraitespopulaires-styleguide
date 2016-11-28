---
title: cip-homepage
name: cip-homepage
collection: mandats
styleguide: false
layout: mandats.html.swig
---
{% include '../organisms/header-mandats.html.swig' with {'theme': 'cip'} %}
<div class="spacer spacer-xl"></div>
<div class="spacer spacer-xl hidden-md hidden-lg"></div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12">
      <div class="entity-content">
        <div class="container">
          <h1 class="page-title text-center">Caisse intercommunale de pensions</h1>
          <div class="spacer"></div>
          <div class="row">
            <div class="col-xs-12 col-sm-4">
            {% include '../molecules/teaser-basicpage.html.swig' with {'title_basicpage': 'Simulateurs', 'body_basicpage': "Planifier votre retraite en fonction d'une date ou d'une rente souhaitée"} %}
          </div>
          <div class="col-xs-12 col-sm-4">
            {% include '../molecules/teaser-basicpage.html.swig' with {'title_basicpage': 'Résultats', 'body_basicpage': 'Résultats du 3e trimestre 2016. Au 30 septembre 2016, la CIP a réalisé une performance cumulée estimée à 1,6%. '} %}
          </div>
          <div class="col-xs-12 col-sm-4">
            {% include '../molecules/teaser-basicpage.html.swig' with {'title_basicpage': 'Documentation', 'body_basicpage': 'Publications, formulaires, lois.'} %}
          </div>
          </div>
        </div>
      </div>
      <div class="spacer spacer-lg"></div>
      <div class="row last-news-content">
        <div class="col-xs-12 col-md-4">
          {% include '../molecules/teaser-news.html.swig' with {'title_news': "
    Nouvelle composition du Conseil d'administration au 1er juillet 2016", 'body_news': "Laurence Favre et Fabienne Freymond Cantone succèdent à Didier Tenthorey et Laurent Ballif, arrivant au terme de leur mandat. Jean-François Niklaus reprend la présidence et Gilbert Gubler la vice-présidence.", 'date_news' : 'Juillet 2016', 'type_news' : 'Infos et communiqués'} %}
        </div>
        <div class="col-xs-12 col-md-4">
          {% include '../molecules/teaser-news.html.swig' with {'title_news': "
    Le rapport de gestion 2015 est sorti", 'body_news': "En 2015, la CIP réalise une performance de 3,7% dans un contexte économique mondial chahuté. Ce résultat reste toutefois en dessous du besoin en rendement du plan de prévoyance", 'date_news' : 'Juin 2016', 'type_news' : 'Bulletin CIP'} %}
        </div>
        <div class="col-xs-12 col-md-4">
          {% include '../molecules/teaser-news.html.swig' with {'title_news': "
    Un nouveau quartier convivial prévoit de créer 260 logements et abriter 40 emplois à Crissier", 'body_news': "Les Uttins accueilleront leurs locataires en 2020 dans un cadre architectural de qualité élevée, à 15 minutes de bus de la gare de Renens et à 20 minutes du Flon.", 'date_news' : 'Juillet 2016', 'type_news' : 'Infos et communiqués'} %}
        </div>
      </div>
      <div class="spacer spacer-lg"></div>

    </div>
  </div>
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' with {'light': true, 'theme': 'cip'} %}
