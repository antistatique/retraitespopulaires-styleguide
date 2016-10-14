---
title: teaser-news
name: teaser-news
collection: molecules
notes: |
  ##### Usage : `teaser-news`
---
<div class="teaser-news shadow shadow-down">
  <a href="#" class="news-heading">
    <div class="heading-image" style="background-image: url(https://unsplash.it/1400/780)"></div>
    <div class="loader-image">{% include '../atoms/loader.html.swig' with {'loader_type': 'yingyang', 'loader_theme': theme} %}</div>
  </a>
  <div class="news-body">
    <a href="#" class="news-title h1 pretty-link">Bella vita numéro 46</a>
    <div class="spacer spacer-xs"></div>
    <p>Le magazine clientèle de Retraites Populaires<p>
    <div class="spacer spacer-sm"></div>
    <div class="news-extra">
      <span class="news-date">Décembre 2015</span> <span class="news-type">Bella Vita</span>
    </div>
  </div>
</div>
