---
title: push-menu
name: push-menu
collection: molecules
notes: |
  ##### Usage : `push-menu`
  Responsive tray for mobile. Specially used as mobile main navigation.
  ##### Options :
    - **push-menu_theme** - <i>String</i> - <b>push-menu-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<nav class="push-menu push-menu-{{ push_menu_theme|default('primary') }}" aria-label="Navigation principale - Mobile">
  <ul class="list-unstyled m-b-1">
    <li><a href="#">Prévoyance</a></li>
    <li class="active">
      <a href="#main-content"><span class="sr-only">Page active</span> Immobilier</a>
    </li>
    <li><a href="#">Prêts</a></li>
    <li><a href="#">Actualités <span class="sr-only">(current)</span></a></li>
    <li><a href="#">CIP</a></li>
    <li><a href="#">Contact</a></li>
  </ul>

  <ul class="prenavbar prenavbar-{{ prenavbar_theme|default('primary') }} list-unstyled m-0" role="navigation" aria-label="Navigation d'en-tête">
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
</nav>
