---
title: big-menu
name: big-menu
collection: molecules
notes: |
  ##### Usage : `big-menu`
  Ce composant est visible dans le template "<a href="/retraitespopulaires-styleguide/big-menu">Big-Menu</a>"
---
<div class="big-menu">
  <div class="container-big-menu container-fuild">
    <div class="row">
      <div class="col-no-padding col-xs-12 visible-xs">
      {% include '../molecules/search-form.html.swig' %}
      <div class="spacer"></div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-9">
        <div class="row">
          <div class="swiper-menu">
            <div class="hidden-xs hidden-sm">
              {% include '../molecules/big-menu-empty.html.swig' %}
            </div>
            <div class="swiper-column-wrapper col-xs-12 col-md-4">
              <div class="swiper-column swiper-column-1">
                <ul data-list="swiper-main" class="swiper-list swiper-list-first list-no-padding swiper-list-primary list-no-style" role="navigation">
                  <li>
                    <a href="#" class="pretty-link text-black-assurance">Assurance vie</a>
                    <a href="swiper-assurance-vie" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-rounded arrow-small arrow-assurance"></a>
                  </li>
                  <li>
                    <a href="#" class="pretty-link text-black-prevoyance">Prévoyance professionnelle</a>
                    <a href="swiper-prevoyance" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-rounded arrow-small arrow-prevoyance"></a>
                  </li>
                  <li>
                    <a href="#" class="pretty-link text-black-immobilier">Immobilier</a>
                    <a href="swiper-immobilier" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-rounded arrow-small arrow-immobilier"></a>
                  </li>
                  <li>
                    <a href="#" class="pretty-link text-black-hypotheque">Financement</a>
                    <a href="swiper-hypotheque" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-rounded arrow-small arrow-hypotheque"></a>
                  </li>
                </ul>
                <div class="spacer"></div>
                <p class="media-heading text-small swiper-padding text-muted">Vous êtes</p>
                <ul class="swiper-list swiper-list-first swiper-list-secondary list-no-style list-no-padding" role="navigation">
                  <li class="text-primary icon-text icon-text-center">
                    <span class="retraitespopulaires-icon retraitespopulaires-icon-placeholder retraitespopulaires-icon-2x"></span> <a href="#" class="icon-text-txt text-cocon h5">Particuliers</a>
                    <a href="swiper-assurance-vie" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-rounded arrow-small"></a>
                  </li>
                  <li class="text-primary icon-text icon-text-center">
                    <span class="retraitespopulaires-icon retraitespopulaires-icon-placeholder retraitespopulaires-icon-2x"></span> <a href="#" class="icon-text-txt text-cocon h5">Professionnels</a>
                    <a href="swiper-assurance-vie" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-rounded arrow-small"></a>
                  </li>
                  <li class="text-primary icon-text icon-text-center">
                    <span class="retraitespopulaires-icon retraitespopulaires-icon-placeholder retraitespopulaires-icon-2x"></span> <a href="#" class="icon-text-txt text-cocon h5">Collectivés</a>
                    <a href="swiper-assurance-vie" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-rounded arrow-small"></a>
                  </li>
                </ul>
                <div class="spacer"></div>
              </div>
            </div>
            <div class="swiper-column-wrapper swiper-column-wrapper-2 col-xs-12 col-md-4">
              <div class="swiper-column swiper-column-2">
                <ul data-list="swiper-assurance-vie" class="swiper-list swiper-list-alternative swiper-list-middle list-no-padding list-spaced list-no-style" role="navigation">
                  <li class="swiper-back visible-xs visible-sm">
                    <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-assurance"></a>
                    <a href="#" class="text-muted pretty-link-hover-assurance">Assurance vie</a>
                  </li>
                  <li>
                    <a href="#" class="pretty-link-hover-assurance">Assurer les employés</a>
                    <a href="swiper-assurer-les-employes" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-assurance"></a>
                  </li>
                  <li>
                    <a href="#" class="pretty-link-hover-assurance">Indépendants</a>
                    <a href="swiper-independants" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-assurance"></a>
                  </li>
                </ul>

                <ul data-list="swiper-prevoyance" class="swiper-list swiper-list-alternative swiper-list-middle list-no-padding list-spaced list-no-style" role="navigation">
                  <li class="swiper-back visible-xs visible-sm">
                    <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-prevoyance"></a>
                    <a href="#" class="text-muted pretty-link-hover-prevoyance">Prévoyance professionnel</a>
                  </li>
                  <li>
                    <a href="#" class="pretty-link-hover-prevoyance">Plan complémentaires</a>
                    <a href="swiper-complementaires" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-prevoyance"></a>
                  </li>
                  <li>
                    <a href="#" class="pretty-link-hover-prevoyance">Gestion de mandats</a>
                    <a href="swiper-gestion-de-mandats" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-next arrow-small arrow-prevoyance"></a>
                  </li>
                </ul>

              </div>
            </div>
            <div class="swiper-column-wrapper swiper-column-wrapper-3 col-xs-12 col-md-4">
              <div class="swiper-column swiper-column-3 swiper-column-waiting">
                <ul data-list="swiper-complementaires" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
                  <li class="swiper-back visible-xs visible-sm">
                    <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-prevoyance"></a>
                    <a href="#" class="text-muted pretty-link-hover-prevoyance">Plan complémentaires</a>
                  </li>
                  <li>
                    <a href="#" class="pretty-link-hover-prevoyance">Plan complémentaires</a>
                  </li>
                </ul>

                <ul data-list="swiper-gestion-de-mandats" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
                  <li class="swiper-back visible-xs visible-sm">
                    <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-prevoyance"></a>
                    <a href="#" class="text-muted pretty-link-hover-prevoyance">Gestion de mandats</a>
                  </li>
                  <li>
                    <a href="#" class="pretty-link-hover-prevoyance">Phasellus non nunc</a>
                  </li>
                  <li>
                    <a href="#" class="pretty-link-hover-prevoyance">Phasellus non nunc</a>
                  </li>
                  <li>
                    <a href="#" class="pretty-link-hover-prevoyance">Phasellus non nunc</a>
                  </li>
                </ul>

                <ul data-list="swiper-assurer-les-employes" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
                  <li class="swiper-back visible-xs visible-sm">
                    <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-assurance"></a>
                    <a href="#" class="text-muted pretty-link-hover-assurance">Assurer les employés</a>
                  </li>
                  <li>
                    <a href="#" class="pretty-link-hover-assurance">Mauris suscipit</a>
                  </li>
                </ul>

                <ul data-list="swiper-independants" class="swiper-list swiper-list-alternative swiper-list-last list-no-padding list-spaced list-no-style" role="navigation">
                  <li class="swiper-back visible-xs visible-sm">
                    <a href="swiper-main" class="retraitespopulaires-icon retraitespopulaires-icon-arrow-thin arrow arrow-back arrow-small arrow-flip arrow-assurance"></a>
                    <a href="#" class="text-muted pretty-link-hover-prevoyance">Indépendant</a>
                  </li>
                  <li>
                    <a href="#" class="pretty-link-hover-assurance">Donec aliquet</a>
                  </li>
                  <li>
                    <a href="#" class="pretty-link-hover-assurance">Donec aliquet</a>
                  </li>
                  <li>
                    <a href="#" class="pretty-link-hover-assurance">Donec aliquet</a>
                  </li>
                  <li class="active">
                    <a href="#" class="pretty-link-hover-assurance">Donec aliquet</a>
                  </li>
                  <li>
                    <a href="#" class="pretty-link-hover-assurance">Donec aliquet</a>
                  </li>
                  <li>
                    <a href="#" class="pretty-link-hover-assurance">Donec aliquet</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-2 col-md-offset-1">
        {% include '../molecules/big-menu-secondary-nav.html.swig' %}
      </div>
    </div>
  </div>
</div>
