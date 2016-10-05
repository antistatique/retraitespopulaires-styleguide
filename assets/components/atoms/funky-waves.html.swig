---
title: funky-waves
name: funky-waves
collection: atoms
notes: |
  ##### Usage : `funky-waves`
  ##### Options :
  - **img** - String
---

<div class="wrapper-funky-waves has-header">
  {% if img  %}
    <img src="{{ img }}" />
  {% else  %}
    <picture>
      <source srcset="https://unsplash.it/544/250?image=1057" media="(max-width: 544px)">
      <source srcset="https://unsplash.it/992/350?image=1057" media="(max-width: 992px)">
      <source srcset="https://unsplash.it/1600/436?image=1057" media="(max-width: 1600px)">
      <img class="img-responsive center-block" src="https://unsplash.it/2200/600?image=1057" alt="Image de couverture">
    </picture>
  {% endif %}

  <div class="funky-waves-container">

    <svg class="wave-1" version="1.1" viewBox="0 0 1920 200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
        <path fill="#FFFFFF" d="M1920,136V73 c-189,83-636,77-980-6 C504-40,274-1,0,65.0277l0,70.7052L1920,136z"/>
        <rect fill="#FFFFFF" y="120" width="100%" height="80px" />
    </svg>

    <svg class="wave-2" version="1.1" viewBox="0 0 1920 200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
      <path opacity="0.33" fill="#FFFFFF" d="M1920,224V35 C1425-73,706,103,458,95 C209,88,0,36,0,36.7297L0,224H1920z"/>
      <rect opacity="0.33" fill="#FFFFFF" y="120" width="100%" height="80px" />
    </svg>

    <svg class="wave-3" version="1.1" viewBox="0 0 1920 250" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
      <path opacity="0.33" fill="#FFFFFF" d="M1920,255.7411 c-238.2285,5.4757-530.3276-76.7562-851.5579-167.1589 C714.4314-11.0472,354.1524-46.003,0,86.859l0,168.6148L1920,255.7411L1920,255.7411z"/>
      <rect opacity="0.33" fill="#FFFFFF" y="170" width="100%" height="80px" />
    </svg>
  </div>

</div>
