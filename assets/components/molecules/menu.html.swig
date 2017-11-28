---
title: Menu
name: menu
collection: molecules
notes: |
  This component is visible into the [basic page](/basic-page).
---
<nav class="rp-access-nav">
  <ul>
    <li><a class="btn btn-primary" href="/" accesskey="1">Page d'accueil du site Retraites Populaires</a></li>
    <li><a class="btn btn-primary" href="#main-content" accesskey="2" >Passer la navigation</a></li>
    <li><a class="btn btn-primary" href="#full-accessible-navigation" accesskey="3" >Accéder à la navigation</a></li>
    <li><a class="btn btn-primary" href="/recherche" accesskey="4" >Accéder au champ de recherche</a></li>
    <li><a class="btn btn-primary" href="mailto:info@retraitespopulaires.ch" accesskey="9">Contacter un conseiller</a></li>
  </ul>
</nav>

<div class="mobile-menu" id="mobile-menu">
  <div class="container-collapser-menu">
    <div class="collapser-menu">
      {% include '../atoms/organic-lines.html.swig' with {'organic_lines_theme': 'assurance'} %}

      <div class="container">
        <div class="col-xs-12">
          <ul class="list-no-style list-no-padding" role="navigation" id="main-navigation">
            <li>
              <div class="collapser-menu-item">
                <span>
                  <a href="/assurance-vie" class="pretty-link">Assurance vie</a>
                </span>
                <button class="btn btn-circle btn-outline btn-primary collapsed" title="Ouvrir le sous-menu Assurance vie" type="button" data-toggle="collapse" data-target="#submenu1" aria-expanded="false">
                  <span class="retraitespopulaires-icon retraitespopulaires-icon-angle" aria-hidden="true"></span>
                </button>
              </div>
              <div class="collapse" id="submenu1">
                <ul>
                  <li>
                    <div class="collapser-menu-item">
                      <span>
                        <a href="/assurance-vie/produits" class="pretty-link">Produits</a>
                      </span>
                      <button class="btn btn-circle btn-outline btn-primary collapsed" title="Ouvrir le sous-menu Produits" type="button" data-toggle="collapse" data-target="#submenu2" aria-expanded="false">
                        <span class="retraitespopulaires-icon retraitespopulaires-icon-angle" aria-hidden="true"></span>
                      </button>
                    </div>
                    <div class="collapse" id="submenu2">
                      <ul>
                        <li class=" menu-link-content5da93b14-48bd-4034-b465-4dec22b2981f">
                          <div class="collapser-menu-item">
                            <span>
                              <a href="/assurance-vie/produits/rente-immediate" class="pretty-link">RP Rente immédiate</a>
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="spacer"></div>
    </div>

  </div>
</div>
