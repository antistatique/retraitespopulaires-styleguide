---
title: Funky Waves
name: funky-waves
collection: atoms
variants:
  no-funky: Whitout Funky
  no-cover: Whitout cover
notes: |
  Can be wrapped in `.theme-[theme]` to change look. <br>
  Can be used with the modifier `has-header` to add margin-top when used with fixed header.
---
<div class="wrapper-funky-waves {% if variant != 'no-cover' -%}wrapper-funky-waves-with-cover{% endif %}">
  {% if variant != 'no-cover' -%}
    <picture>
      <source srcset="https://unsplash.it/544/250?image=1057" media="(max-width: 544px)">
      <source srcset="https://unsplash.it/992/350?image=1057" media="(max-width: 992px)">
      <source srcset="https://unsplash.it/1600/436?image=1057" media="(max-width: 1600px)">
      <img class="img-responsive center-block" src="https://unsplash.it/2200/600?image=1057" alt="Image de couverture">
    </picture>
  {% endif %}

  {% if variant != 'no-funky' -%}
    <div class="funky-waves-container">
      <svg class="wave-1" version="1.1" viewBox="0 0 1920 200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
          <path fill="#FFFFFF" d="M1920,136V73 c-189,83-636,77-980-6 C504-40,274-1,0,65.0277l0,70.7052L1920,136z"/>
          <rect fill="#FFFFFF" y="133" width="100%" height="80px" />
      </svg>

      {# Must set the viewBox to 1920*2 when animate  #}
      <svg class="wave-2" version="1.1" viewBox="0 0 3840 200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
       {# Animated path must be 3840 but 1920 width for each frames #}
        <path opacity="0.33" fill="#FFFFFF" d="M2378.24,133.4C2131.57,125.71,1923,74.22,1920,73.48h0C1425.73-36.43,706.86,141.16,458.41,133.4S0,74.21,0,74.21V261.48H3839.83v-188C3345.56-36.43,2626.69,141.16,2378.24,133.4Z"/>
      </svg>

      {# Must set the viewBox to 1920*2 when animate  #}
      <svg class="wave-3" version="1.1" viewBox="0 0 3840 200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
       {# Animated path must be 3840 but 1920 width for each frames #}
        <path opacity="0.33" fill="#FFFFFF" d="M3839.76,105.23c-318.75,96.5-566.89,87.44-884.92,6.43C2598.46,20.88,2223,8.74,1919.76,105c-318.75,96.5-566.89,87.43-884.92,6.43C678.45,20.61,303,8.47-.24,104.69L0,273l1920,.27,1920,.27Z"/>
      </svg>
    </div>
  {% endif %}
</div>

{% if variant != 'no-funky' -%}
  <div class="spacer spacer-xs"></div>
{% endif %}
