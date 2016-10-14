---
title: simulateur-retraite
name: simulateur-retraite
collection: website
styleguide: false
layout: website.html.swig
---
{% include '../organisms/header.html.swig' %}
{% include '../atoms/funky-waves.html.swig' %}

<div class="container">
  <div class="row"></div>
    <div class="col-xs-12 col-md-7 col-md-offset-4 col-lg-8 col-lg-offset-3 col-xl-6 col-xl-offset-3 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {theme: 'text-prevoyance', links: ['Accueil', 'Prévoyance professionnelle', 'Déjà assuré ?', 'Simulateur de retraite CP ECA-RP']} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-push-4 col-lg-8 col-lg-push-3 col-xl-6 col-xl-push-3">
      <h1 class="page-title text-center">Simulateur de retraite CP ECA-RP</h1>
      <div class="spacer"></div>
      <div class="entity-content">
        <div class="row">
          <div class="col-xs-8 col-xs-offset-2">
            <div class="well well-lg">
              <p>Planifier votre retraite en fonction d'une date ou d'une rente souhaitée</p>
              <p>Documents nécessaires pour utiliser ce simulateur:</p>
              <ul class="unordered-list">
                <li>votre dernière situation de prévoyance personnelle</li>
                <li>sa fiche explicative</li>
              </ul>
            </div>
            <div class="spacer"></div>
            {% include '../organisms/form-simulateur-retraite.html.swig' with {'theme': 'prevoyance'} %}
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-4 col-md-pull-7 col-lg-3 col-lg-pull-8 col-xl-2 col-xl-pull-6">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>
      {% include '../molecules/secondary-nav.html.swig' with {'theme': 'prevoyance'} %}
    </div>
  </div>
</div>

<div class="spacer spacer-lg"></div>
{% include '../organisms/attachments-contact.html.swig' %}

<div class="attachements-wrapper">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/card-attachement.html.swig' with {'theme': 'prevoyance', 'type': 'faq', 'title':'Questions fréquentes', 'links': ['Qu’est-ce qu’un 3e pilier A ou prévoyance liée?', 'Comment maintenir son niveau de vie à la retraite?', 'Qu’en est-il du 3e pilier en cas de divorce?'], 'more': 'Accéder à toutes les questions sur le financement'} %}
      </div>
      <div class="col-xs-12 col-md-6">
        {% include '../molecules/card-attachement.html.swig' with {'theme': 'prevoyance', 'type': 'document', 'title':'Documents utiles', 'links': [
        'D’un emploi à l’autre, placer son 2e pilier (24 heures)',
        'Conditions RP Arc-en-ciel',
        'Brochure RP Arc-en-ciel'],
        'more': 'Accéder à tous les formulaires relatifs à la prévoyance professionnelle'} %}
      </div>
    </div>
  </div>
  {% include '../atoms/organic-lines.html.swig' with {'theme': 'prevoyance'} %}
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' %}
