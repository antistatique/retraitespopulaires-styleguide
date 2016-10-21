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
        <div class="h2 pull-left">Retraites&nbsp;Populaires est à votre disposition</div>
        <a class="pretty-link pretty-link-berrylight-gray pull-right text-{{ attachments_contact_theme }}">Contacter Retraites&nbsp;Populaires</a>
      </div>
    </div>

    <div class="spacer"></div>
    <div class="row">
      <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
        {% include '../molecules/teaser-contact.html.swig' with {theme: attachments_contact_theme} %}
      </div>
    </div>
  </div>
</div>
