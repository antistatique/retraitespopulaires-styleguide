---
title: attachments-rentals
name: attachments-rentals
collection: organisms
notes: |
  ##### Usage : `attachments-rentals`
---
<div class="attachments-rentals-wrapper">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 attachments-rentals-heading">
        <div class="h2">Locations</div>
        <div><a class="pretty-link pretty-link-berrylight-gray">Voir tous les biens à louer</a></div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/teaser-rental.html.swig' with {"rental_orientation": 'auto'} %}
      </div>
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/teaser-rental.html.swig' with {"rental_orientation": 'auto'} %}
      </div>
    </div>
  </div>
</div>
