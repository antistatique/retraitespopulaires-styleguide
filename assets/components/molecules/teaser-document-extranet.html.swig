---
title: teaser-document-extranet
name: teaser-document-extranet
collection: molecules
notes: |
  ##### Usage : `teaser-document-extranet`
  - **teaser_document_extranet_title** - <i>String</i>
  - **teaser_document_extranet_version** - <i>String</i>
  - **teaser_document_extranet_theme** - <b>['primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="row">
  <div class="col-md-9">
    <div class="media">
      <div class="media-left">
        <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-document-file retraitespopulaires-icon-3x text-{{teaser_document_extranet_theme|default('primary')}}"></a>
      </div>
      <div class="media-body">
        <a href="#" class="pretty-link h5 text-{{teaser_document_extranet_theme|default('primary')}}">{{ teaser_document_extranet_title|default('Lorem Ipsum') }} <span class="text-muted text-small">- PDF</span></a><br>
        <span class="text-muted"><small>{{ teaser_document_extranet_version|default('Rerum magnam voluptate nostrum excepturi voluptates labore aut hic.') }}</small></span><br class="hidden-md hidden-lg">
        <a href="#" class="pretty-link text-{{teaser_document_extranet_theme|default('primary')}}"><small>Voir l'historique du document</small></a><br class="hidden-md hidden-lg"><span class="hidden-xs hidden-sm"> | </span>
        <a href="#" class="pretty-link text-{{teaser_document_extranet_theme|default('primary')}}"><small>Mettre à jour le document</small></a>
        <div class="spacer spacer-sm hidden-lg hidden-md"></div>
        <a href="#" class="btn btn-xs btn-outline hidden-md hidden-lg btn-{{teaser_document_extranet_theme|default('primary')}}">Télécharger</a>
      </div>
    </div>
  </div>
  <div class="col-md-3 hidden-xs hidden-sm text-right">
    <a href="#" class="btn btn-outline btn-{{teaser_document_extranet_theme|default('primary')}}">Télécharger</a>
  </div>
</div>
<hr>
