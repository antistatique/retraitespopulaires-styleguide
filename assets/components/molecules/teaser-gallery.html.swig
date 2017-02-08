---
title: teaser-gallery
name: teaser-gallery
collection: molecules
notes: |
  ##### Usage : `teaser-gallery`
  ##### Options :
  - **teaser_gallery_theme** - <i>String</i> - <b>teaser-gallery-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<figure itemprop="associatedMedia" class="teaser-gallery teaser-gallery-{{ teaser_gallery_theme|default('primary') }}" itemscope itemtype="http://schema.org/ImageObject">
  <div class="wrapper-figure">
    <div class="figure-cover">
      <a
        href="https://unsplash.it/200/200"
        data-height="800"
        data-width="800"
        data-size="800x800"
        data-index="{{ teaser_gallery_index|default(0) }}"
      >
        <div class="figure-overlay">
          <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search" aria-hidden="true"></i>
          <p class="text-uppercase small m-b-0">voir l'image</p>
        </div>
        <picture>
          <img class="img-responsive" src="https://unsplash.it/200/200">
        </picture>
      </a>
      </div>
  </div>
</figure>
