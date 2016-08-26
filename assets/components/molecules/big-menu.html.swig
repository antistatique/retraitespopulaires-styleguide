---
title: big-menu
name: big-menu
collection: molecules
notes: |
  ##### Usage : `big-menu`
  Ce composant est visible dans le template "<a href="/retraitespopulaires-styleguide/big-menu">Big-Menu</a>"
---
<div class="big-menu">
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
                  <a class="inline-block pull-right" role="button" data-toggle="collapse" href="#collapse-assurance-vie" aria-expanded="true" aria-controls="collapse-assurance-vie">
                    <i class="retraitespopulaires-icon retraitespopulaires-icon-angle"></i>
                  </a>
                  <div class="clearfix"></div>
                </div>
                <div id="collapse-assurance-vie" class="collapse-body collapse in">
                  <ul class="unordered-list treeview-list">
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a>
                      <ul class="unordered-list treeview-list">
                        <li><a class="pretty-link" href="#">Lien</a></li>
                        <li><a class="pretty-link" href="#">Lien</a></li>
                        <li><a class="pretty-link" href="#">Lien</a></li>
                        <li><a class="pretty-link" href="#">Lien</a></li>
                      </ul>
                    </li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
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
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
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
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
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
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                    <li><a class="pretty-link" href="#">Lien</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {% include '../molecules/big-menu-secondary-nav.html.swig' %}
          <div class="big-menu-wrapper-contact">
            <div class="big-menu-wrapper-footer">
              {% include '../organisms/footer.html.swig' %}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
