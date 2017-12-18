---
title: Teaser Gallery
name: teaser-gallery
collection: molecules
wrapper: col-xs-4
notes: |
  Can be wrapped in `.theme-[theme]` to change look. <br>
  We use the `jQuery` plugin [Photoswipe](http://photoswipe.com/documentation/getting-started.html), check the documentation for advanced usage & parameters.
---
<figure itemprop="associatedMedia" class="teaser-gallery teaser-gallery-primary" itemscope itemtype="http://schema.org/ImageObject">
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
