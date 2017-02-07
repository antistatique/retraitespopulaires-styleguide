---
title: attachments-last-news
name: attachments-last-news
collection: organisms
notes: |
  ##### Usage : `attachments-last-news`
  - **attachements_lastnews_theme** - <i>String</i> - <b>['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>

---
<div class="last-news-wrapper">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 last-news-heading">
        <div class="h2">Actualités</div>
        <div><a class="pretty-link pretty-link-berrylight-gray text-{{ attachements_lastnews_theme }}">Voir toutes les actualités</a></div>
      </div>
    </div>

    <div class="row last-news-content">
      <div class="col-xs-12 col-md-4">
        {% include '../molecules/teaser-news.html.swig' %}
      </div>
      <div class="col-xs-12 col-md-4">
        {% include '../molecules/teaser-news.html.swig' %}
      </div>
      <div class="col-xs-12 col-md-4">
        {% include '../molecules/teaser-news.html.swig' %}
      </div>
    </div>
  </div>
</div>
