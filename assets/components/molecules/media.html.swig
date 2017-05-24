---
title: Media
name: media
collection: molecules
bootstrap: http://getbootstrap.com/components/#media
variants:
  single_file: File
  grp_files: Group files
notes: |
  Abstract object styles for building various types of components (like files, Tweets, etc) that feature a left- or right-aligned image alongside textual content.
---
<div class="media">
  <div class="media-left">
    {%- if variant == 'single_file' %}
      <span class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-document-file"></span>
    {% elseif variant == 'grp_files' %}
      <button class="btn btn-invisible btn-collapse btn-xs" data-toggle="collapse" data-target="#card-file--1" aria-expanded="true" aria-hidden="true">
        <span class="caret" aria-hidden="true"></span>
        <span class="retraitespopulaires-icon retraitespopulaires-icon-3x retraitespopulaires-icon-document-group text-primary aria-hidden="true""></span>
      </button>
    {% else %}
      <a href="#">
        <img class="media-object" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PCEtLQpTb3VyY2UgVVJMOiBob2xkZXIuanMvNjR4NjQKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNWMzYTkyMTM1NSB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1YzNhOTIxMzU1Ij48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSIxMy40Njg3NSIgeT0iMzYuNSI+NjR4NjQ8L3RleHQ+PC9nPjwvZz48L3N2Zz4=" alt="">
      </a>
    {% endif %}
    </div>
    <div class="media-body">
    {%- if variant == 'single_file' %}
      <a target="_blank" href="#" class="pretty-link h5">All inclusive de la séance du 01 janvier 2017
        <span class="text-muted text-small"> - PDF</span>
      </a>
    {% elseif variant == 'grp_files' %}
      <span class="pretty-link h5" data-toggle="collapse" data-target="#card-file--1" aria-expanded="true">All inclusive de la séance du 15 février 2017</span>
    {% else %}
      <h4 class="media-heading">Media heading</h4>
      <p> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
    {% endif %}

    {%- if variant == 'single_file' or variant == 'grp_files' %}
      <div class="text-muted text-square-separation">
        <small class="text-small">V. 20160215-001</small>
        <small class="text-small">20 Mars, 17:42</small>
      </div>

      <div class="text-square-separation">
        {%- if variant == 'grp_files' %}<small><a href="#" class="pretty-link">Télécharger</a></small>{% endif %}
        <small><a href="#" class="pretty-link">Mettre à jour</a></small>
        <small><a href="#" class="pretty-link">Voir l'historique</a></small>
        <small><a href="#" class="pretty-link text-danger">Supprimer</a></small>
      </div>
    {% endif %}

    {%- if variant == 'grp_files' %}
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
