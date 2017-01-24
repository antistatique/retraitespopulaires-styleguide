---
title: teaser-contact-placeholder
name: teaser-contact-placeholder
collection: molecules
notes: |
  ##### Usage : `teaser-contact-placeholder`
  ##### Options :
  - **teaser_contact_placeholder_theme** - <i>String</i> - <b>teaser-contact-placeholder-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="teaser-contact-placeholder teaser-contact-placeholder-{{ teaser_contact_placeholder_theme }} shadow shadow-down">
  <a href="#" class="teaser-contact-placeholder-heading">
    <div class="heading-image" style="background-image: url(https://unsplash.it/780/780?image=898)"></div>
    <div class="loader-image">{% include '../atoms/loader.html.swig' with {'loader_type': 'yingyang', 'loader_theme': teaser_contact_placeholder_theme} %}</div>
  </a>
  <div class="teaser-contact-placeholder-body">

    <p>N'hésitez pas à nous contacter au <a class="pretty-link text-no-wrap text-bold text-{{ teaser_contact_placeholder_theme }}" href="tel:0213482626">021 348 26 26</a>.</p>
    <hr />
    <p>Ou retrouvez votre contact régional en entrant votre code postal<p>
    <form class="form-inline">
      <div class="form-group">
        <input class="form-control form-control-{{ teaser_contact_placeholder_theme }}" id="zip" type="text" placeholder="Votre NPA"></input>
      </div>
      <div class="form-group">
        <input class="btn btn-{{ teaser_contact_placeholder_theme }}" type="submit" value="Trouver"></input>
      </div>
    </form>
  </div>
</div>
