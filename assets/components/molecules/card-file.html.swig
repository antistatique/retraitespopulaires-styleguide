---
title: Card File
name: card-file
collection: molecules
variants:
  grp: Group files
notes: |
  This is an implementation of the card component.
---
<div class="card card-no-border card-no-padding card-no-shadow">
  <div class="card-body">
    <div class="media">
      <div class="media-left" aria-hidden="true">
        {%- if variant != 'grp' %}
          <span class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-document-file"></span>
        {% endif %}
        {%- if variant == 'grp' %}
          <button class="btn btn-invisible btn-collapse btn-xs" data-toggle="collapse" data-target="#card-file--1" aria-expanded="true">
            <span class="caret" aria-hidden="true"></span>
            <span class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-document-group text-primary"></span>
          </button>
        {% endif %}
        </div>
        <div class="media-body">

        {%- if variant != 'grp' %}
          <a target="_blank" href="#" class="pretty-link h5">All inclusive de la séance du 01 janvier 2017
            <span class="text-muted text-small"> - PDF</span>
          </a>
        {% endif %}
        {%- if variant == 'grp' %}
          <span class="pretty-link h5" data-toggle="collapse" data-target="#card-file--1" aria-expanded="true">All inclusive de la séance du 15 février 2017</span>
        {% endif %}

        <div class="text-muted text-square-separation">
          <small class="text-small">V. 20160215-001</small>
          <small class="text-small">20 Mars, 17:42</small>
        </div>

        <div class="text-square-separation">
          {%- if variant == 'grp' %}<small><a href="#" class="pretty-link">Télécharger</a></small>{% endif %}
          <small><a href="#" class="pretty-link">Mettre à jour</a></small>
          <small><a href="#" class="pretty-link">Voir l'historique</a></small>
          <small><a href="#" class="pretty-link text-danger">Supprimer</a></small>
        </div>

        {%- if variant == 'grp' %}
          <div class="collapse in" id="card-file--1" aria-expanded="true">
            <div class="spacer spacer-sm"></div>

            <a target="_blank" href="#" class="pretty-link">
              <small class="text-bold">PV 4 20160523<span class="text-muted text-small"> - PDF</span></small>
            </a>
            <div class="text-muted text-square-separation">
                <small class="text-small">V. 20170101-001</small>
                <small class="text-small">28 Mars, 07:29</small>
            </div>
            <a href="#" class="pretty-link text-danger"><small>Supprimer</small></a>
            <div class="spacer spacer-sm"></div>

            <a target="_blank" href="#" class="pretty-link">
              <small class="text-bold">PV 4 20160523<span class="text-muted text-small"> - PDF</span></small>
            </a>
            <div class="text-muted text-square-separation">
                <small class="text-small">V. 20170101-001</small>
                <small class="text-small">28 Mars, 07:29</small>
            </div>
            <a href="#" class="pretty-link text-danger"><small>Supprimer</small></a>
          </div>
        {% endif %}
      </div>
    </div>
  </div>
</div>
