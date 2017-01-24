---
title: teaser-news
name: teaser-news
collection: molecules
notes: |
  ##### Usage : `teaser-news`
  - **news_body** - <i>String</i>
  - **news_title** - <i>String</i>
  - **news_date** - <i>String</i>
  - **news_type** - <i>String</i>
  - **news_theme** - <i>String</i> - <b>teaser-news-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<a href="#" class="teaser teaser-{{ news_theme }} teaser-fullclick teaser-news teaser-news-{{ news_theme }} shadow shadow-down">
  <div class="news-heading">
    <div class="heading-image" style="background-image: url(https://unsplash.it/1400/780)"></div>
    <div class="loader-image">{% include '../atoms/loader.html.swig' with {'loader_type': 'yingyang', 'loader_theme': theme} %}</div>
  </div>
  <div class="news-body">
    <div class="news-title h1 pretty-link">{{ news_title|default('Bella Vita') }}</div>
    <div class="spacer spacer-xs"></div>
    <p>{{ news_body|default('Le magazine clientèle de Retraites Populaires') }}</p>
    <div class="spacer spacer-sm"></div>
    <div class="news-extra">
      <span class="news-date">{{ news_date|default('Décembre 2015') }}</span> <span class="news-type">{{ news_type|default('Bella Vita') }}</span>
    </div>
  </div>
</a>
