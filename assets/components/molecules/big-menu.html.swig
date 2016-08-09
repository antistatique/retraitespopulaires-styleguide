---
title: big-menu
name: big-menu
collection: molecules
notes: |
  ##### Usage : `big-menu`
  Ce composant est visible dans le template "<a href="/retraitespopulaires-styleguide/big-menu">Big-Menu</a>"
---
<div class="big-menu active">
  <div class="container-big-menu">
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <form class="">
            <div class="form-group">
              <label class="label-hidden"></label>
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Chercher un produit, un document, un contact, ..." data-title="Rechercher">
                <span class="input-group-btn">
                  <button class="btn btn-default btn-icon" type="button"><i class="retraitespopulaires-icon retraitespopulaires-icon-search"></i></button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
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
              <div class="collapse-wrapper">
                <div class="collapse-title">
                  <h5 class="inline-block">
                    <a class="color-assurance-vie" href="#">Assurance vie</a>
                  </h5>
                  <a class="inline-block pull-right" role="button" data-toggle="collapse" href="#assurance-vie" aria-expanded="true" aria-controls="assurance-vie">
                    <i class="retraitespopulaires-icon retraitespopulaires-icon-angle"></i>
                  </a>
                  <div class="clearfix"></div>
                </div>
                <div id="assurance-vie" class="collapse-body collapse in">
                  <ul class="unordered-list treeview-list">
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a>
                      <ul class="unordered-list treeview-list">
                        <li><a href="#">Lien</a></li>
                        <li><a href="#">Lien</a></li>
                        <li><a href="#">Lien</a></li>
                        <li><a href="#">Lien</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="collapse-wrapper">
                <div class="collapse-title">
                  <h5 class="inline-block">
                    <a class="color-prevoyance-profesionnelle" href="#">Prévoyance professionnelle</a>
                  </h5>
                  <a class="inline-block pull-right collapsed" role="button" data-toggle="collapse" href="#prevoyance-professionnelle" aria-expanded="false" aria-controls="prevoyance-professionnelle">
                    <i class="retraitespopulaires-icon retraitespopulaires-icon-angle"></i>
                  </a>
                  <div class="clearfix"></div>
                </div>
                <div id="prevoyance-professionnelle" class="collapse-body collapse">
                  <ul class="unordered-list treeview-list">
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="collapse-wrapper">
                <div class="collapse-title">
                  <h5 class="inline-block">
                    <a class="color-immobilier" href="#">Immobilier</a>
                  </h5>
                  <a class="inline-block pull-right collapsed" role="button" data-toggle="collapse" href="#immobilier" aria-expanded="false" aria-controls="immobilier">
                    <i class="retraitespopulaires-icon retraitespopulaires-icon-angle"></i>
                  </a>
                  <div class="clearfix"></div>
                </div>
                <div id="immobilier" class="collapse-body collapse">
                  <ul class="unordered-list treeview-list">
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="collapse-wrapper">
                <div class="collapse-title">
                  <h5 class="inline-block">
                    <a class="color-financement" href="#">Financement</a>
                  </h5>
                  <a class="inline-block pull-right collapsed" role="button" data-toggle="collapse" href="#financement" aria-expanded="false" aria-controls="financement">
                    <i class="retraitespopulaires-icon retraitespopulaires-icon-angle"></i>
                  </a>
                  <div class="clearfix"></div>
                </div>
                <div id="financement" class="collapse-body collapse">
                  <ul class="unordered-list treeview-list">
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                    <li><a href="#">Lien</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="row big-menu-wrapper-shortcuts">
            <div class="col-xs-12">
              <div class="shortcuts-wrapper">
                <ul class="unordered-list">
                  <li><a href="#">À propos</a></li>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Actualités</a></li>
                  <li><a href="#">Press</a></li>
                  <li><a href="#">Emplois</a></li>
                  <li><a href="#">FAQ</a></li>
                </ul>
                <a href="#" class="btn btn-default">Connexion</a>
              </div>
            </div>
          </div>
          <div class="big-menu-wrapper-contact">
            <div class="row big-menu-wrapper-contact-info">
              <div class="col-md-4">
                <div class="media">
                  <a class="media-left" href="tel:+41213482111">
                    <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-phone"></i>
                  </a>
                  <div class="media-body">
                    <a href="tel:+41213482111">021 348 21 11</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="media">
                  <a class="media-left" href="mailto:info@retraitespopulaires.ch">
                    <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-mail"></i>
                  </a>
                  <div class="media-body">
                    <a href="mailto:info@retraitespopulaires.ch">info@retraitespopulaires.ch</a>
                  </div>
                </div>
              </div>
              <div class="col-md-4 visible-md visible-lg">
                <ul class="inline-list">
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-facebook"></i></a></li>
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-twitter"></i></a></li>
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-instagram"></i></a></li>
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-linkedin"></i></a></li>
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-youtube"></i></a></li>
                </ul>
              </div>
            </div>
            <div class="row big-menu-wrapper-contact-places">
              <div class="col-md-4">
                <div class="media">
                  <a class="media-left" href="#">
                    <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-location-pin"></i>
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
                    <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-location-pin"></i>
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
                    <i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-location-pin"></i>
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
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-facebook"></i></a></li>
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-twitter"></i></a></li>
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-instagram"></i></a></li>
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-linkedin"></i></a></li>
                  <li><a href="#"><i class="retraitespopulaires-icon retraitespopulaires-icon-2x retraitespopulaires-icon-youtube"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
