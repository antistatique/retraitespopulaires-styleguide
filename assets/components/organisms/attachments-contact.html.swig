---
title: attachments-contact
name: attachments-contact
collection: organisms
notes: |
  ##### Usage : `attachments-contact`
  ##### Options :
  - **attachments_contact_theme** - String
---
<div class="attachments-contact">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 last-news-heading">
        <div class="h2 pull-left">Nous sommes disponible pour vous</div>
        <a class="pretty-link pretty-link-berrylight-gray pull-right text-{{ attachments_contact_theme }}">Contacter Retraites Populaires</a>
      </div>
    </div>

    <div class="spacer"></div>
    <div class="row">
      <div class="col-xs-6 col-xs-offset-3">
        {% include '../molecules/teaser-contact.html.swig' with {theme: attachments_contact_theme} %}
      </div>
    </div>
  </div>
</div>
