---
title: last-news
name: last-news
collection: organisms
notes: |
  ##### Usage : `last-news`
---
<div class="last-news-wrapper">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 last-news-heading">
        <div class="h2 pull-left">Actualités</div>
        <a class="pretty-link pretty-link-berrylight-gray pull-right">Voir toutes les actualités</a>
      </div>
    </div>

    <div class="row">
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
