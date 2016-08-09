---
title: big-menu
name: big-menu
collection: molecules
notes: |
  ##### Usage : `big-menu`
---
<div class="big-menu active">
  <div class="container-big-menu">
    <div class="container">
      {# <div class="row">
        <div class="col-xs-12">
          <form class="form-inline">
            <div class="form-group">
              <label for="search">Rechercher</label>
              <input type="search" class="form-control" id="search" placeholder="Un produit, un document, un contact, ...">
            </div>
            <button type="submit" class="btn btn-invisible"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i></button>
          </form>
        </div>
      </div> #}
      <div class="row">
        <div class="col-md-12 big-menu-wrapper-profils text-center visible-xs visible-sm">
            <div class="spacer spacer-md"></div>
            <div class="btn-group" role="group">
              <a href="#" type="button" class="btn btn-default">Particulier</a>
              <a href="#" type="button" class="btn btn-default">Entreprise</a>
              <a href="#" type="button" class="btn btn-default">Collectivité</a>
            </div>
            <div class="spacer spacer-md"></div>
        </div>
        <div class="col-md-8 big-menu-wrapper-nav">
          <div class="row big-menu-wrapper-professions">
            <div class="col-md-3">
              <div class="profession-wrapper">
                <div class="profession-title">
                  <h3 class="inline-block">
                    <a href="#">Assurance vie</a>
                  </h3>
                  <a class="inline-block pull-right" role="button" data-toggle="collapse" href="#assurance-vie" aria-expanded="true" aria-controls="assurance-vie">
                    <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i>
                  </a>
                  <div class="clearfix"></div>
                </div>
                <div id="assurance-vie" class="collapse in">
                  <ul>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="profession-wrapper">
                <div class="profession-title">
                  <h3 class="inline-block">
                    <a href="#">Prévoyance professionnelle</a>
                  </h3>
                  <a class="inline-block pull-right" role="button" data-toggle="collapse" href="#prevoyance-professionnelle" aria-expanded="false" aria-controls="prevoyance-professionnelle">
                    <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i>
                  </a>
                  <div class="clearfix"></div>
                </div>
                <div id="prevoyance-professionnelle" class="collapse">
                  <ul>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="profession-wrapper">
                <div class="profession-title">
                  <h3 class="inline-block">
                    <a href="#">Immobilier</a>
                  </h3>
                  <a class="inline-block pull-right" role="button" data-toggle="collapse" href="#immobilier" aria-expanded="false" aria-controls="immobilier">
                    <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i>
                  </a>
                  <div class="clearfix"></div>
                </div>
                <div id="immobilier" class="collapse">
                  <ul>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="profession-wrapper">
                <div class="profession-title">
                  <h3 class="inline-block">
                    <a href="#">Financement</a>
                  </h3>
                  <a class="inline-block pull-right" role="button" data-toggle="collapse" href="#financement" aria-expanded="false" aria-controls="financement">
                    <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i>
                  </a>
                  <div class="clearfix"></div>
                </div>
                <div id="financement" class="collapse">
                  <ul>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                    <li>RP</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="row big-menu-wrapper-shortcuts">
            <div class="col-xs-12">
              <div class="shortcuts-wrapper">
                <ul class="unstyled-list">
                  <li><a href="#">À propos</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Actualités</a></li>
                  <li><a href="#">Press</a></li>
                  <li><a href="#">Emplois</a></li>
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#" class="btn btn-default">Connexion</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="big-menu-wrapper-contact">
            <div class="row big-menu-wrapper-contact-info">
              <div class="col-md-4">
                <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i>
                021 348 21 11
              </div>
              <div class="col-md-4">
                <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i>
                info@retraitespopulaires.ch
              </div>
              <div class="col-md-4 visible-md visible-lg">
                <ul class="inline-list">
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i></a></li>
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i></a></li>
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i></a></li>
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i></a></li>
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i></a></li>
                </ul>
              </div>
            </div>
            <div class="row big-menu-wrapper-contact-places">
              <div class="col-md-4">
                <div class="media">
                  <a class="media-left" href="#">
                    <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i>
                  </a>
                  <div class="media-body">
                    <h4 class="media-heading">Agence de Lausanne et Siège</h4>
                    <a href="tel#">021 348 21 11</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="media">
                  <a class="media-left" href="#">
                    <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i>
                  </a>
                  <div class="media-body">
                    <h4 class="media-heading">Agence d'Yverdon-les-Bains</h4>
                    <a href="tel#">021 348 28 21</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="media">
                  <a class="media-left" href="#">
                    <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i>
                  </a>
                  <div class="media-body">
                    <h4 class="media-heading">Agence de Nyon</h4>
                    <a href="tel#">021 348 20 20</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="row big-menu-wrapper-socials visible-xs visible-sm">
              <div class="col-xs-12">
                <ul class="inline-list text-center">
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i></a></li>
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i></a></li>
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i></a></li>
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i></a></li>
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-search"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
