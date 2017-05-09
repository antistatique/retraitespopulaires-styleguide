---
title: Card
name: card
wrapper: col-sm-6
collection: molecules
notes: |
  - `card` (`card-light`, `card-horizontal`)
  - `card-img-top` > `card-img-bg`/`card-img` (`card-img-top-center` to center small image), fallback to loader (if broken) or icon
  - image side
  - `card-subhead`
  - `card-title`
  - `card-body`
  - `card-footer` (+ `bg-berrylight-gray`) (`card-footer-justify`)
---
<a href="#" class="card">
  <div class="card-img-top">
    <div class="card-img-bg" style="background-image: url('https://unsplash.it/780/780?image=1005');"></div>
    {#<img class="card-img" src="https://unsplash.it/780/780?image=1005" alt="card image">#}
    <div class="loader-image">
      {% include '../atoms/loader.html.swig' with {'loader_type': 'yingyang'} %}
    </div>
  </div>
  <div class="card-body">
    <p class="card-subhead">Subheading</p>
    <h3 class="card-title h1">Lorem Ipsum Dolor Sit Amet</h3>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde debitis, consequuntur dolor neque eveniet velit.</p>
  </div>
  {#<div class="card-footer bg-berrylight-gray">
    Footer here
  </div>#}
</a>
