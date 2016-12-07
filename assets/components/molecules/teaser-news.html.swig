---
title: teaser-news
name: teaser-news
collection: molecules
notes: |
  ##### Usage : `teaser-news`
  - **body_news** - <i>String</i>
  - **title_news** - <i>String</i>
  - **date_news** - <i>String</i>
  - **type_news** - <i>String</i>
  - **theme_news** - <i>String</i> - <b>teaser-news-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<a href="#" class="teaser teaser-{{ theme_news }} teaser-fullclick teaser-news teaser-news-{{ theme_news }} shadow shadow-down">
  <div class="news-heading">
    <div class="heading-image" style="background-image: url(https://unsplash.it/1400/780)"></div>
    <div class="loader-image">{% include '../atoms/loader.html.swig' with {'loader_type': 'yingyang', 'loader_theme': theme} %}</div>
  </div>
  <div class="news-body">
    <div class="news-title h1 pretty-link">{{ title_news|default('Bella Vita') }}</div>
    <div class="spacer spacer-xs"></div>
    <p>{{ body_news|default('Le magazine clientèle de Retraites Populaires') }}</p>
    <div class="spacer spacer-sm"></div>
    <div class="news-extra">
      <span class="news-date">{{ date_news|default('Décembre 2015') }}</span> <span class="news-type">{{ type_news|default('Bella Vita') }}</span>
    </div>
  </div>
</a>
