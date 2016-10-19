---
title: cards
name: cards
collection: examples
styleguide: true
layout: examples.html.swig
---
<div class="row">
  <div class="col-xs-12 col-sm-6">
    {% include '../molecules/card-attachement.html.swig' %}
  </div>
  <div class="col-xs-12 col-sm-6">
    <div class="card-attachement card-attachement-assurance shadow shadow-down">
      <div class="card-title h2">Documents utiles</div>
      <ul class="card-content list-spaced list-unstyled">
        <li class="">
          <div class="media">
            <div class="media-left">
              <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-document-file retraitespopulaires-icon-2x"></a>
            </div>
            <div class="media-body">
              <a href="#" class="pretty-link h5">Brochure Conseil global <span class="text-muted text-small">- PDF</span></a>
            </div>
          </div>
        </li>
        <li class="">
          <div class="media">
            <div class="media-left">
              <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-document-file retraitespopulaires-icon-2x"></a>
            </div>
            <div class="media-body">
              <a href="#" class="pretty-link h5">Procuration <span class="text-muted text-small">- PDF</span></a>
            </div>
          </div>
        </li>
        <li class="">
          <div class="media">
            <div class="media-left">
              <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-document-file retraitespopulaires-icon-2x"></a>
            </div>
            <div class="media-body">
              <a href="#" class="pretty-link h5">Modification des primes et prestations <span class="text-muted text-small">- PDF</span></a>
            </div>
          </div>
        </li>
      </ul>
      <div class="card-footer">
        <div class="media">
          <div class="media-left">
              <a href="#" class="retraitespopulaires-icon retraitespopulaires-icon-document-file"></a>
          </div>
          <div class="media-body">
            <a class="text-bold pretty-link h5" href="#">Accéder à tous les formulaires relatifs à l'assurance vie</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
