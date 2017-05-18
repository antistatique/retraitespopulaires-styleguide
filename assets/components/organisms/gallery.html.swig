---
title: Gallery
name: gallery
collection: organisms
notes: |
  ##### Usage : `gallery`
---
<div class="gallery media-gallery-media" itemscope itemtype="http://schema.org/ImageGallery">

  <div class="row">
    <div class="gallery-wrapper-item gallery-wrapper-item-lg col-xs-12 col-sm-6">
      <div class="gallery-item">
        {% include '../molecules/teaser-gallery.html.swig' with {teaser_gallery_index: 0} %}
      </div>
    </div>

    <div class="gallery-wrapper-item gallery-wrapper-item-side col-xs-12 col-sm-6">
      <div class="gallery-item">
        {% include '../molecules/teaser-gallery.html.swig' with {teaser_gallery_index: 1} %}
      </div>
      <div class="gallery-item">
        {% include '../molecules/teaser-gallery.html.swig' with {teaser_gallery_index: 2} %}
      </div>
      <div class="gallery-item">
        {% include '../molecules/teaser-gallery.html.swig' with {teaser_gallery_index: 3} %}
      </div>
      <div class="gallery-item">
        {% include '../molecules/teaser-gallery.html.swig' with {teaser_gallery_index: 4} %}
      </div>
    </div>
  </div>

  <div class="row">
    <div class="gallery-item col-xs-12  col-sm-4 col-md-3">
      {% include '../molecules/teaser-gallery.html.swig' with {teaser_gallery_index: 5} %}
    </div>
    <div class="gallery-item col-xs-12  col-sm-4 col-md-3">
      {% include '../molecules/teaser-gallery.html.swig' with {teaser_gallery_index: 6} %}
    </div>
    <div class="gallery-item col-xs-12  col-sm-4 col-md-3">
      {% include '../molecules/teaser-gallery.html.swig' with {teaser_gallery_index: 7} %}
    </div>
    <div class="gallery-item col-xs-12  col-sm-4 col-md-3">
      {% include '../molecules/teaser-gallery.html.swig' with {teaser_gallery_index: 8} %}
    </div>
    <div class="gallery-item col-xs-12  col-sm-4 col-md-3">
      {% include '../molecules/teaser-gallery.html.swig' with {teaser_gallery_index: 9} %}
    </div>
  </div>
</div>
