---
title: list
name: list
collection: atoms
changes:
  3.0.0: New component grouping all `-list` components
variants:
  default: Unordered List
  ordered-list: Ordered List
  facets-list: Facets List
  treeview-list: Treeview List
---
{% if variant != 'ordered-list' -%}
<ul class="{{ variant|default('unordered-list') }}">
{%- else -%}
<ol class="{{ variant|default('ordered-list') }}">
{%- endif %}
  <li><a href="#" class="pretty-link">Liens 1</a></li>
  <li><a href="#" class="pretty-link">Velit quia eum est dolore quod et repellat.</a></li>
{% if variant != 'ordered-list' -%}
</ul>
{%- else -%}
</ol>
{%- endif %}
