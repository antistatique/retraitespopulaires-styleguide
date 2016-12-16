---
title: big-menu-secondary-nav
name: big-menu-secondary-nav
collection: molecules
notes: |
  ##### Usage : `big-menu-secondary-nav`
  - **big_menu_secondary_nav_theme** - <b>btn-['outline'|'primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>

---
<div class="big-menu-secondary-nav-wrapper">
  <div class="big-menu-secondary-nav visible-xs visible-sm">
    <div class="row">
      <div class="spacer spacer-sm"></div>
      <div class="col-xs-6">
        <ul class="list-no-style text-right">
          <li><a class="pretty-link text-{{big_menu_secondary_nav_theme|default('primary')}}" href="#">À propos</a></li>
          <li><a class="pretty-link text-{{big_menu_secondary_nav_theme|default('primary')}}" href="#">Contact</a></li>
          <li><a class="pretty-link text-{{big_menu_secondary_nav_theme|default('primary')}}" href="#">Actualités</a></li>
        </ul>
      </div>
      <div class="col-xs-6">
        <ul class="list-no-style list-no-padding">
        <li><a class="pretty-link text-{{big_menu_secondary_nav_theme|default('primary')}}" href="#">Press</a></li>
        <li><a class="pretty-link text-{{big_menu_secondary_nav_theme|default('primary')}}" href="#">Emplois</a></li>
        <li><a class="pretty-link text-{{big_menu_secondary_nav_theme|default('primary')}}" href="#">Connexion <i class="fa fa-lock text-{{big_menu_secondary_nav_theme|default('primary') }}"></i></a></li>
        </ul>
      </div>
      <div class="spacer"></div>
    </div>
  </div>
  <ul class="list-spaced list-no-style list-no-padding hidden-xs hidden-sm" role="navigation">
    <li><a class="pretty-link text-{{big_menu_secondary_nav_theme|default('primary')}}" href="#">À propos</a></li>
    <li><a class="pretty-link text-{{big_menu_secondary_nav_theme|default('primary')}}" href="#">Contact</a></li>
    <li><a class="pretty-link text-{{big_menu_secondary_nav_theme|default('primary')}}" href="#">Actualités</a></li>
    <li><a class="pretty-link text-{{big_menu_secondary_nav_theme|default('primary')}}" href="#">Press</a></li>
    <li><a class="pretty-link text-{{big_menu_secondary_nav_theme|default('primary')}}" href="#">Emplois</a></li>
    <li><a class="pretty-link text-{{big_menu_secondary_nav_theme|default('primary')}}" href="#">Connexion <i class="text-primary fa fa-lock text-{{big_menu_secondary_nav_theme|default('primary') }}"></i></a></li>
    <li><a class="pretty-link text-{{big_menu_secondary_nav_theme|default('primary')}}" href="#">FAQ</a></li>
  </ul>
</div>
