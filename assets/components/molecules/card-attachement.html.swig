---
title: card-attachement
name: card-attachement
collection: molecules
notes: |
  ##### Usage : `card-attachement`
  ##### Options :
  - **theme** - String
  - **title** - String
  - **type** - String
  - **links** - Array
  - **more** - String
---
<div class="card-attachement card-attachement-{{theme}} shadow shadow-down">
  <div class="card-title h2">{{ title }}</div>
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
    <div class="media">
    <div class="media-left">
        <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-placeholder"></a>
    </div>
    <div class="media-body">
      <a class="text-bold pretty-link h5" href="#">{{ more }}</a>
    </div>
    </div>
  </div>
</div>
