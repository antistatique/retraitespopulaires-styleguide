---
title: Collapser Menu
name: collapser-menu
collection: molecules
wrapper: col-xs-4
notes: |
  Collapser-menu is used in place of the Swiper menu from 3.2.0 and up. <br />
  **This component is visible on the [basic page](/basic-page)**.
---
<div class="collapser-menu">
  <ul class="list-no-style list-no-padding">
    <li class="collapser-first-level">
      <div class="collapser-menu-item">
        <span><a href="#" class="pretty-link">Epargne et prévoyance</a></span>
        <button class="btn btn-sm btn-circle btn-outline btn-primary collapsed " title="Ouvrir le sous-menu Epargne et prévoyance" type="button" data-toggle="collapse" data-target="#menu-link-1" aria-expanded="false" aria-controls="menu-link-1">
          <span class="retraitespopulaires-icon retraitespopulaires-icon-angle" aria-hidden="true"></span>
        </button>
      </div>

      <div class="collapser-menu-collapse collapse" id="menu-link-1" aria-expanded="false">
        <ul>
          <li class="">
            <div class="collapser-menu-item">
              <span>
                <a href="#" class="pretty-link">Epargne Modulo</a>
              </span>
            </div>
          </li>

          <li class="">
            <div class="collapser-menu-item">
              <span>
                <a href="#" class="pretty-link">Epargne Jeune</a>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </li>

    <li class="collapser-first-level">
      <div class="collapser-menu-item">
        <span><a href="#" class="pretty-link">À propos</a></span>
      </div>
    </li>

   <li class="collapser-first-level">
      <div class="collapser-menu-item">
        <span><a href="#" class="pretty-link">Entreprises</a></span>
        <button class="btn btn-sm btn-circle btn-outline btn-primary collapsed " title="Ouvrir le sous-menu Entreprises" type="button" data-toggle="collapse" data-target="#menu-link-2" aria-expanded="false" aria-controls="menu-link-2">
          <span class="retraitespopulaires-icon retraitespopulaires-icon-angle" aria-hidden="true"></span>
        </button>
      </div>

      <div class="collapser-menu-collapse collapse" id="menu-link-2" aria-expanded="false">
        <ul>
          <li class="">
            <div class="collapser-menu-item">
              <span>
                <a href="#" class="pretty-link">Prévoyance des employés</a>
              </span>
              <button class="btn btn-sm btn-circle btn-outline btn-primary" title="Ouvrir le sous-menu Prévoyance des employés" type="button" data-toggle="collapse" data-target="#menu-link-2-1" aria-expanded="true" aria-controls="menu-link-2-1">
                <span class="retraitespopulaires-icon retraitespopulaires-icon-angle" aria-hidden="true"></span>
              </button>
            </div>

            <div class="collapser-menu-collapse collapse in" id="menu-link-2-1" aria-expanded="true" style="">
              <ul>
                <li class="">
                  <div class="collapser-menu-item">
                    <span>
                      <a href="#" class="pretty-link">Notre organisation</a>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </li>

          <li class="">
            <div class="collapser-menu-item">
              <span>
                <a href="#" class="pretty-link">Epargne Jeune</a>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</div>
