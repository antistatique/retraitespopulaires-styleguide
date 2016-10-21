---
title: facets-list
name: facets-list
collection: atoms
notes: |
  ##### Usage : `facets-list`
  ##### Options :
  - **title** - <i>String</i>
  - **links** - <i>Array</i>
---
<p class="media-heading text-muted">{{ title }}</p>
<ul class="facets-list">
  {% for link in links %}
    <li><a href="#" class="pretty-link">{{ link }}</a></li>
  {% endfor %}
</ul>
