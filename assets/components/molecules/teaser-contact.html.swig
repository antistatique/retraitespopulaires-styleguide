---
title: teaser-contact
name: teaser-contact
collection: molecules
notes: |
  ##### Usage : `teaser-contact`
  ##### Options :
  - **theme** - String
---
<div class="teaser-contact teaser-contact-{{ theme }} shadow shadow-down">
  <div class="contact-heading" style="background-image: url(https://unsplash.it/1400/780)"></div>
  <div class="contact-body">
    <p>N'hésitez pas à nous contacter au <a class="pretty-link text-bold text-{{ theme }}" href="tel:0213482626">021 348 26 26</a>.</p>
    <hr />
    <p>Ou retrouvez votre contact régional en entrant votre code postal<p>
    <form class="form-inline">
      <div class="form-group">
        <input class="form-control form-control-{{ theme }}" id="zip" type="text" placeholder="Votre NPA"></input>
      </div>
      <div class="form-group">
        <input class="btn btn-{{ theme }}" type="submit" value="Trouver"></input>
      </div>
    </form>
  </div>
</div>
