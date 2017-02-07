---
title: teaser-contact-detail
name: teaser-contact-detail
collection: molecules
notes: |
  ##### Usage : `teaser-contact-detail`
  ##### Options :
  - **teaser_contact_detail_theme** - <i>String</i> - <b>teaser-contact-detail-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="teaser-contact-detail teaser-contact-detail-{{ teaser_contact_detail_theme }}">
  <h2>Dominique Schmid</h2>
  <div class="teaser-contact-detail-body">
    <div class="spacer spacer-sm"></div>
    <p>
      <strong>Integer dictum</strong> <br />
      Maecenas a condimentum <br />
      Nulla
    </p>
  </div>
  <div class="teaser-contact-detail-infos">
    <a href="tel:#">
      <div class="text-{{ teaser_contact_detail_theme }} text-small label">Par téléphone</div>
      <div class="text-{{ teaser_contact_detail_theme }} text-bold">025 789 98 12</div>
    </a>
    <a class="text-{{ teaser_contact_detail_theme }} text-bold" href="mailto:#">Par e-mail</a>
  </div>
</div>
