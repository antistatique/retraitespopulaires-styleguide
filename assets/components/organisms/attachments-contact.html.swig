---
title: attachments-contact
name: attachments-contact
collection: organisms
notes: |
  ##### Usage : `attachments-contact`
  ##### Options :
  - **attachments_contact_theme** - <i>String</i> - <b>['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="attachments-contact">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 attachments-contact-heading">
        <div class="h2">Retraites&nbsp;Populaires est à votre disposition</div>
        <div><a class="pretty-link pretty-link-berrylight-gray text-{{ attachments_contact_theme }}">Contacter Retraites&nbsp;Populaires</a></div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
        {% include '../molecules/teaser-contact.html.swig' with {theme: attachments_contact_theme} %}
      </div>
    </div>
  </div>
</div>
