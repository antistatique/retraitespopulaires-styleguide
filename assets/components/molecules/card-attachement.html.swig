---
title: card-attachement
name: card-attachement
collection: molecules
notes: |
  ##### Usage : `card-attachement`
  ##### Options :
  - **card_attachement_title** - <i>String</i>
  - **card_attachement_type** - <i>String</i> ['faq'|'document']
  - **card_attachement_links** - <i>Array</i>
  - **card_attachement_more** - <i>String</i>
  - **card_attachement_theme** - <i>String</i> - <b>card-attachement-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="card-attachement card-attachement-{{card_attachement_theme}} shadow shadow-down">
  <div class="card-title h2">{{ card_attachement_title|default('Lorem') }}</div>
  <ul class="card-content list-spaced list-unstyled">
    {% for link in card_attachement_links %}
      <li>
        {% if card_attachement_type == 'document' %}
          <a href="#" class="media">
            <div class="media-left">
              <span class="retraitespopulaires-icon retraitespopulaires-icon-document-file retraitespopulaires-icon-2x"></span>
            </div>
            <div class="media-body">
              <span class="h5"><span class="pretty-link">{{ link }}</span> <span class="text-muted text-small">- PDF</span></span>
            </div>
          </a>
        {% else %}
          <a class="text-bold h5" href="#"><span class="pretty-link">{{ link }}</span></a>
        {% endif %}
      </li>
    {% endfor %}
  </ul>
  <div class="card-footer">
    <div class="icon-text icon-text-center">
      {% if card_attachement_type == 'document' %}
        <span class="retraitespopulaires-icon retraitespopulaires-icon-2x text-primary retraitespopulaires-icon-documents-thick"></span>
      {% else %}
        <span class="retraitespopulaires-icon retraitespopulaires-icon-2x text-primary retraitespopulaires-icon-faq-thick"></span>
      {% endif %}
      <div class="icon-text-txt"><a class="text-bold pretty-link pretty-link-berrylight-gray h5" href="#">{{ card_attachement_more|default('En apprendre plus') }}</a></div>
    </div>
  </div>
</div>
