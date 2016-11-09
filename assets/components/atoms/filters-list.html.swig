---
title: filters-list
name: filters-list
collection: atoms
notes: |
  ##### Usage : `filters-list`
  ##### Options :
  - **title_filters_list** - <i>String</i>
  - **links_filters_list** - <i>Array</i>
  - **theme_filters_list** - <i>String</i> - <b>['primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<p class="media-heading text-muted">{{ title_filters_list|default('Votre versement') }}</p>
<ul class="filters-list">
  {% for link in links|default(['Une seule prime', 'Plusieurs prime']) %}
    <li>
      <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-checked"></i>
      <a href="#" class="pretty-link text-{{ theme_filters_list }}">{{ link }}</a>
    </li>
  {% endfor %}
</ul>
