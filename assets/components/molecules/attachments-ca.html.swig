---
title: Attachments-ca
name: attachments-ca
collection: molecules
notes: |
  ##### Usage : `attachments-ca`
  - **attachment_ca_title** - <i>String</i>
  - **attachment_ca_version** - <i>String</i>
  - **attachment_ca_theme** - <b>btn-['primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>

---
<div class="row">
  <div class="col-md-9">
    <div class="media">
      <div class="media-left">
        <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-document-file retraitespopulaires-icon-3x text-{{attachment_ca_theme|default('primary')}}"></a>
      </div>
      <div class="media-body">
        <a href="#" class="pretty-link h5 text-{{attachment_ca_theme|default('primary')}}">{{ attachment_ca_title|default('Lorem Ipsum') }} <span class="text-muted text-small">- PDF</span></a><br>
        <span class="text-muted"><small>{{ attachment_ca_version|default('Rerum magnam voluptate nostrum excepturi voluptates labore aut hic.') }}</small></span><br class="hidden-md hidden-lg">
        <a href="#" class="pretty-link text-{{attachment_ca_theme|default('primary')}}"><small>Voir l'historique du document</small></a><br class="hidden-md hidden-lg"><span class="hidden-xs hidden-sm"> | </span>
        <a href="#" class="pretty-link text-{{attachment_ca_theme|default('primary')}}"><small>Mettre à jour le document</small></a>
        <div class="spacer spacer-sm hidden-lg hidden-md"></div>
        <a href="#" class="btn btn-xs btn-outline hidden-md hidden-lg btn-{{attachment_ca_theme|default('primary')}}">Télécharger</a>
      </div>
    </div>
  </div>
  <div class="col-md-3 hidden-xs hidden-sm text-right">
    <a href="#" class="btn btn-outline btn-{{attachment_ca_theme|default('primary')}}">Télécharger</a>
  </div>
</div>
<hr>
