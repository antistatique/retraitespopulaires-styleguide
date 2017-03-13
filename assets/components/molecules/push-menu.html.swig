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
  <ul class="list-unstyled m-b-1 main-navigation">
    <li class="h3"><a class="h3" href="#">Prévoyance</a></li>
    <li class="active">
      <a class="h3" href="#main-content"><span class="sr-only">Page active</span> Immobilier</a>
    </li>
    <li class="h3"><a class="h3" href="#">Prêts</a></li>
    <li class="h3"><a class="h3" href="#">Actualités <span class="sr-only">(current)</span></a></li>
    <li class="h3"><a class="h3" href="#">CIP</a></li>
    <li class="h3"><a class="h3" href="#">Contact</a></li>
  </ul>

  <ul class="prenavbar prenavbar-{{ prenavbar_theme|default('primary') }} list-unstyled m-0 secondary-navigation" role="navigation" aria-label="Navigation d'en-tête">
    <li class="active h6">
      <a href="#" class="active h6" target="">Press</a>
    </li>
    <li class="h6">
      <a href="#" class="h6" target="">Extranet</a>
    </li>
    <li class="h6">
      <a href="#" class="h6" target="">Questions-réponses</a>
    </li>
    <li class="h6">
      <a href="#" class="h6" target="">Documents utiles</a>
    </li>
  </ul>
</nav>
