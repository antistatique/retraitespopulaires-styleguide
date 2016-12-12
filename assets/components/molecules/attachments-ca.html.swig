---
title: Attachments-ca
name: attachments-ca
collection: molecules
notes: |
  ##### Usage : `attachments-ca`
  - **title_attachment** - <i>String</i>
  - **version_attachment** - <i>String</i>
---
<div class="row">
  <div class="col-md-9">
    <div class="media">
      <div class="media-left">
        <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-document-file retraitespopulaires-icon-3x"></a>
      </div>
      <div class="media-body">
        <a href="#" class="pretty-link h5">{{ title_attachment|default('Lorem Ipsum') }} <span class="text-muted text-small">- PDF</span></a><br>
        <span class="text-muted"><small>{{ version_attachment|default('Rerum magnam voluptate nostrum excepturi voluptates labore aut hic.') }}</small></span><br class="hidden-md hidden-lg">
        <a href="#" class="pretty-link"><small>Voir l'historique du document</small></a><br class="hidden-md hidden-lg"><span class="hidden-xs hidden-sm"> | </span>
        <a href="#" class="pretty-link"><small>Mettre à jour le document</small></a>
        <div class="spacer spacer-sm hidden-lg hidden-md"></div>
        <a href="#" class="btn btn-xs btn-outline hidden-md hidden-lg">Télécharger</a>
      </div>
    </div>
  </div>
  <div class="col-md-3 hidden-xs hidden-sm text-right">
    <a href="#" class="btn btn-outline">Télécharger</a>
  </div>
</div>
<hr>
