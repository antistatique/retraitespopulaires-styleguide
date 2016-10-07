---
title: attachments-offers
name: attachments-offers
collection: organisms
notes: |
  ##### Usage : `attachments-offers`
  ##### Options :
  - **theme** - string
---
<div class="attachements-wrapper">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 last-news-heading">
        <div class="h2 pull-left">Coupons Bella Vita</div>
      </div>
    </div>
	<div class="spacer spacer-sm"></div>
    <div class="row">
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/teaser-offer.html.swig' %}
      </div>
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/teaser-offer.html.swig' %}
      </div>
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/teaser-offer.html.swig' %}
      </div>
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/teaser-offer.html.swig' %}
      </div>
    </div>
  </div>
  {% include '../atoms/organic-lines.html.swig' %}
</div>
