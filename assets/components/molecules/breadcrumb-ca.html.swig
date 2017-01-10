---
title: breadcrumb-ca
name: breadcrumb-ca
collection: molecules
notes: |
  ##### Usage : `breadcrumb-ca`
  ##### Options :
  - **breadcrumb_ca_theme** - <i>String</i> - <b>['primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---

<nav class="breadcrumb breadcrumb-ca breadcrumb-ca-{{ breadcrumb_ca_theme|default('primary') }}" role="breadcrumb" aria-label="Vous êtes ici:">
<h1 class="hidden" aria-level="3">Vous êtes sur ce chemin.</h1>
<ul class="list-inline list-no-style list-no-padding">
    <li aria-label=""><a class="text-{{ breadcrumb_ca_theme|default('primary') }}" href="#">Accueil</a></li>
    <li class="text-muted" aria-label=">">›</li>
    <li>
    <div class="btn-group">
      <button type="button" class="btn btn-outline dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Retraites Populaires <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li><a href="#">CIP</a></li>
      </ul>
    </div>
    </li>
    <li class="text-muted" aria-label=">">›</li>
    <li>PV</li>
</ul>
</nav>
