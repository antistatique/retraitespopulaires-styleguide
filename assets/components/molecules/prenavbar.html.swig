---
title: prenavbar
name: prenavbar
collection: molecules
notes: |
  ##### Usage : `prenavbar`
  ##### Options :
    - **prenavbar_theme** - <i>String</i> - <b>prenavbar-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<ul class="prenavbar prenavbar-{{ prenavbar_theme|default('primary') }} list-unstyled list-inline m-0" role="navigation" aria-label="Navigation d'en-tête">
  <li>
    <a href="#" class="text-muted small" target="">Press</a>
  </li>
  <li>
    <a href="#" class="text-muted small" target="">Extranet</a>
  </li>
  <li>
    <a href="#" class="text-muted small" target="">Questions-réponses</a>
  </li>
  <li>
    <a href="#" class="text-muted small" target="">Documents utiles</a>
  </li>
</ul>
