---
title: card-attachement
name: card-attachement
collection: molecules
notes: |
  ##### Usage : `card-attachement`
  ##### Options :
  - **title** - <i>String</i>
  - **type** - <i>String</i> ['faq'|'document']
  - **links** - <i>Array</i>
  - **more** - <i>String</i>
  - **theme** - <i>String</i> - <b>card-attachement-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="card-attachement card-attachement-{{theme}} shadow shadow-down">
  <div class="card-title h2">{{ title|default('Lorem') }}</div>
  <ul class="card-content list-spaced list-unstyled">
    {% for link in links %}
      <li>
        {% if type == 'document' %}
          <div class="media">
            <div class="media-left">
              <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-document-file retraitespopulaires-icon-2x"></a>
            </div>
            <div class="media-body">
              <a href="#" class="pretty-link h5">{{ link }} <span class="text-muted text-small">- PDF</span></a>
            </div>
          </div>
        {% else %}
          <a class="text-bold pretty-link h5" href="#">{{ link }}</a>
        {% endif %}
      </li>
    {% endfor %}
  </ul>
  <div class="card-footer">
    <div class="icon-text icon-text-center">
      {% if type == 'document' %}
        <span class="retraitespopulaires-icon retraitespopulaires-icon-2x text-primary retraitespopulaires-icon-documents-thick"></span>
      {% else %}
        <span class="retraitespopulaires-icon retraitespopulaires-icon-2x text-primary retraitespopulaires-icon-faq-thick"></span>
      {% endif %}
      <div class="icon-text-txt"><a class="text-bold pretty-link pretty-link-berrylight-gray h5" href="#">{{ more|default('En apprendre plus') }}</a></div>
    </div>
  </div>
</div>
