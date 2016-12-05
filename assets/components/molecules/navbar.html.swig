---
title: navbar
name: navbar
collection: molecules
notes: |
  ##### Usage : `navbar`
  ##### Options :
    - **theme** - <i>String</i> - <b>card-attachement-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<nav class="navbar navbar-default navbar-{{theme}}">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Ouvir/fermer la navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
       <a class="navbar-brand" href="#">
          <img class="header-mandat-logo" src="/retraitespopulaires-styleguide/build/svg/logo_cip.svg" alt="Logo - CIP">
       </a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li><a href="#">Immobilier</a></li>
        <li><a href="#">Prêts</a></li>
        <li><a href="#">Actualités <span class="sr-only">(current)</span></a></li>
        <li><a href="#">CIP</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
