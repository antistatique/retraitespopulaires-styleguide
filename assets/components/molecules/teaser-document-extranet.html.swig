---
title: Teaser Document Extranet
name: teaser-document-extranet
collection: molecules
notes: |
  ##### Usage : `teaser-document-extranet`
  - **teaser_document_extranet_title** - <i>String</i>
  - **teaser_document_extranet_version** - <i>String</i>
  - **teaser_document_extranet_theme** - <b>['primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="teaser-document-extranet">
  <div class="row">
    <div class="col-sm-6 col-md-9">
      <div class="media">
        <div class="media-left">
          {% set classes = [
            'retraitespopulaires-icon',
            'retraitespopulaires-icon-3x',
            'retraitespopulaires-icon-placeholder',
            'text-primary',
          ] %}
          <a href="#" class="{{ classes|join(' ') }}"></a>
        </div>
        <div class="media-body">

          <a href="#" class="pretty-link h5 text-{{teaser_document_extranet_theme|default('primary')}}">
            {{ teaser_document_extranet_title|default('Lorem Ipsum') }}
            <span class="text-muted text-small">- PDF</span>
          </a>

          <div class="teaser-document-extranet-meta">
            <div class="text-muted">
              <small>Version: {{ teaser_document_extranet_version|default('20160512-001') }}</small>
            </div>

            <a href="#" class="pretty-link text-{{teaser_document_extranet_theme|default('primary')}}"><small>Voir l'historique</small></a>
            <span>|</span>
            <a href="#" class="pretty-link text-{{teaser_document_extranet_theme|default('primary')}}"><small>Remplacer</small></a>
            <span>|</span>
            <a href="#" class="pretty-link text-danger"><small>Supprimer</small></a>
          </div>

          {# Sub-Files #}
          <div class="collapse" id="teaser-document-extranet-files">
            <div class="spacer spacer-sm"></div>
            <div class="teaser-subdocument-extranet">
              <small class="text-bold">{{ teaser_document_extranet_title|default('Lorem Ipsum') }}
              <span class="text-muted text-small">- PDF</span></small>

              <div class="teaser-document-extranet-meta">
                <div class="text-muted">
                  <small>Version: {{ teaser_document_extranet_version|default('20160512-001') }}</small>
                </div>

                <a href="#" class="pretty-link text-{{teaser_document_extranet_theme|default('primary')}}"><small>Voir l'historique</small></a>
                <span>|</span>
                <a href="#" class="pretty-link text-{{teaser_document_extranet_theme|default('primary')}}"><small>Remplacer</small></a>
                <span>|</span>
                <a href="#" class="pretty-link text-danger"><small>Supprimer</small></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-6 col-md-3 text-right">
      <div class="spacer spacer-sm visible-xs"></div>
      <div class="teaser-document-extranet-actions">
        <a href="#" class="btn btn-outline">Télécharger le groupe</a>
        <span class="btn btn-primary btn-toggle" data-toggle="collapse" data-target="#teaser-document-extranet-files" aria-expanded="false" aria-controls="teaser-document-extranet-files" aria-label="Voir le détail">
          <span class="retraitespopulaires-icon retraitespopulaires-icon-placeholder" aria-hidden="true"></span>
        </span>
      </div>
    </div>
  </div>

  <hr>
</div>
