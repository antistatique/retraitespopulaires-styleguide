---
title: facets-list
name: facets-list
collection: atoms
notes: |
  ##### Usage : `facets-list`
  ##### Options :
  - **title** - <i>String</i>
  - **links** - <i>Array</i>
  - **facets_theme** - <i>String</i> - <b>['outline'|'primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<p class="media-heading text-muted">{{ title }}</p>
<ul class="facets-list">
  {% if links %}
    {% for link in links %}
      <li><a href="#" class="pretty-link text-{{facets_theme}}">{{ link }}</a></li>
    {% endfor %}
  {% else %}
      <li><a href="#" class="pretty-link text-{{facets_theme}}">Liens 1</a></li>
      <li><a href="#" class="pretty-link text-{{facets_theme}}">Velit quia eum est dolore quod et repellat.</a></li>
  {% endif %}
</ul>
