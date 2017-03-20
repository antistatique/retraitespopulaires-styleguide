---
title: tag
name: tag
collection: atoms
notes: |
  ##### Usage : `tag`
  - **tag_theme** - <i>String</i> - <b>tag-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<a href="#" class="tag tag-{{ tag_theme|default('primary') }}">
  Immobilier
  <span class="tag-hole" aria-hidden="true">•</span>
</a>
