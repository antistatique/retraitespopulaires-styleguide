---
title: Attachments-ca
name: attachments-ca
collection: molecules
notes: |
  ##### Usage : `attachments-ca`
  - **title_attachment** - <i>String</i>
  - **version_attachment** - <i>String</i>
  - **theme_attachment** - <b>btn-['outline'|'primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>

---
<div class="row">
  <div class="col-md-9">
    <div class="media">
      <div class="media-left">
        <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-document-file retraitespopulaires-icon-3x retraitespopulaires-icon-{{theme_attachment}}"></a>
      </div>
      <div class="media-body">
        <a href="#" class="pretty-link h5 text-{{theme_attachment}}">{{ title_attachment|default('Lorem Ipsum') }} <span class="text-muted text-small">- PDF</span></a><br>
        <span class="text-muted"><small>{{ version_attachment|default('Rerum magnam voluptate nostrum excepturi voluptates labore aut hic.') }}</small></span><br class="hidden-md hidden-lg">
        <a href="#" class="pretty-link text-{{theme_attachment}}"><small>Voir l'historique du document</small></a><br class="hidden-md hidden-lg"><span class="hidden-xs hidden-sm"> | </span>
        <a href="#" class="pretty-link text-{{theme_attachment}}"><small>Mettre à jour le document</small></a>
        <div class="spacer spacer-sm hidden-lg hidden-md"></div>
        <a href="#" class="btn btn-xs btn-outline hidden-md hidden-lg btn-{{theme_attachment}}">Télécharger</a>
      </div>
    </div>
  </div>
  <div class="col-md-3 hidden-xs hidden-sm text-right">
    <a href="#" class="btn btn-outline btn-{{theme_attachment}}">Télécharger</a>
  </div>
</div>
<hr>
