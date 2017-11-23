---
title: Collapser Menu
name: collapser-menu
collection: molecules
notes: |
  Collapser-menu is used in place of the Swiper menu from 3.2.0 and up.
---
<ul class="collapser-menu">
  <li>
    <div class="collapser-menu-item">
      <a class="pretty-link" href="#">Lien</a>
      <button class="arrow-next btn btn-circle btn-outline btn-primary" title="Dérouler le sous-menu Lien" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        <span class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin" aria-hidden="true"></span>
      </button>
    </div>

    <ul id="collapseExample">
      ...
    </ul>
  </li>
</ul>
