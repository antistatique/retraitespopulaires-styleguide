---
title: teaser-offer
name: teaser-offer
collection: molecules
notes: |
  ##### Usage : `teaser-offer`
  ##### Options :
  - **theme** - String
---
<a href="#" class="teaser teaser-fullclick teaser-offer shadow shadow-down">
  <div class="offer-heading">
    <div class="heading-image" style="background-image: url(https://unsplash.it/780/780?image=1005)"></div>
    <div class="loader-image">{% include '../atoms/loader.html.swig' with {'loader_type': 'yingyang', 'loader_theme': theme} %}</div>
  </div>
  <div class="offer-body">
    <div class="offer-title h1 pretty-link">Festival Lavaux Classic</div>
    <div class="spacer spacer-sm"></div>

    <div class="offer-extra">
      <div class="pull-left offer-date">
        <div>Décembre 2015</div>
      </div>
      <div class="pull-right offer-infos">
        <div>150 tickets</div>
        <div>Se termine dans 5 jours</div>
      </div>
    </div>
  </div>
</a>
