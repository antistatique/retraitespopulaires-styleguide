---
title: header-extranet
name: header-extranet
collection: organisms
notes: |
  ##### Usage : `header-extranet`
  ##### Options :
  - **theme** - <i>String</i> - <b>['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<header class="header-extranet">
  {% include '../atoms/logo-retraitespopulaires.html.swig'%}

  <div class="row">
    <div class="col-sm-4 col-sm-offset-4 hidden-xs">
    {% include '../molecules/search-form.html.swig' with {'search_form_visible':true, 'search_form_placeholder':'Chercher dans le portail ...'} %}
    </div>
    <div class="col-xs-6 col-xs-offset-6 col-sm-3 col-sm-offset-1">
    <!-- Single button -->
    <div class="btn-group pull-right header-vertical-center m-r-1">
      <button type="button" class="btn btn-xs btn-{{theme|default('primary')}} dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         <i class="retraitespopulaires-icon retraitespopulaires-icon-lock"></i> Marc Friederich <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li><a href="#">Mes informations</a></li>
        <li role="separator" class="divider"></li>
        <li><a href="#">Se déconnecter</a></li>
      </ul>
    </div>
    </div>
  </div>



</header>
{% include '../atoms/organic-lines.html.swig' %}
