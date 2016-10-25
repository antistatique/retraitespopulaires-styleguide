---
title: attachments-last-news
name: attachments-last-news
collection: organisms
notes: |
  ##### Usage : `attachments-last-news`
---
<div class="last-news-wrapper">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 last-news-heading">
        <div class="h2">Actualités</div>
        <div><a class="pretty-link pretty-link-berrylight-gray">Voir toutes les actualités</a></div>
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
