---
title: attachments-rentals
name: attachments-rentals
collection: organisms
notes: |
  ##### Usage : `attachments-rentals`
  ##### Options :
  - **option** - Type
---
<div class="attachements-wrapper">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 last-news-heading">
        <div class="h2 pull-left">Locations</div>
        <a class="pretty-link pretty-link-berrylight-gray pull-right">Voir tous les biens à louer</a>
      </div>
    </div>
	<div class="spacer spacer-sm"></div>
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
