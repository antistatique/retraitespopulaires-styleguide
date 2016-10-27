---
title: liste-emplois
name: jobs
collection: emplois
styleguide: false
layout: emplois.html.swig
---
{% include '../organisms/header.html.swig' with {'light': true} %}
<div class="spacer spacer-xl"></div>
<div class="spacer spacer-xl hidden-md hidden-lg"></div>

<div class="container">
  <div class="row"></div>
    <div class="col-xs-12 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {theme: 'text-primary', links: ['Accueil', 'À propos', 'Emplois']} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-push-4 col-lg-8 col-lg-push-3 col-xl-6 col-xl-push-3">
      <h1 class="page-title text-center">Postes vacants à Retraites Populaires</h1>
      <div class="spacer"></div>
      <div class="row">
        <div class="col-xs-12">
          <table class="table-wide table-primary tablesaw tablesaw-stack" data-tablesaw-mode="stack">
           <thead>
            <tr>
              <th>
                <strong>Poste </strong>
                <a class="text-invert no-underline" href="#"><span class="text-small">▲</span></a>
                <a class="text-invert no-underline" href="#"><span class="text-small">▼</span></a>
              </th>
              <th>
                <strong>Métier</strong>
                <a class="text-invert no-underline" href="#"><span class="text-small">▲</span></a>
                <a class="text-invert no-underline" href="#"><span class="text-small">▼</span></a>
              </th>
              <th>
                <strong>Contrat</strong>
                <a class="text-invert no-underline" href="#"><span class="text-small">▲</span></a>
                <a class="text-invert no-underline" href="#"><span class="text-small">▼</span></a>
              </th>
              <th>
                <strong>Lieu</strong>
                <a class="text-invert no-underline" href="#"><span class="text-small">▲</span></a>
                <a class="text-invert no-underline" href="#"><span class="text-small">▼</span></a>
              </th>
              <th></th>
            </tr>
           </thead>
           <tbody>
            <tr>
               <td><strong>Gestionnaire de dossiers 3e pilier (réf. 3516)</strong></td>
               <td>Assurance vie</td>
               <td>Contrat à durée indéterminée (CDI)</td>
               <td>Lausanne</td>
               <td>{% include '../atoms/button.html.swig' with {theme: 'primary', btn_label: 'Postuler'} %}</td>
            </tr>
            <tr>
               <td><strong>Conseiller/-ère en communication (réf. 3316)</strong></td>
               <td>Marketing et communication</td>
               <td>Contrat à durée indéterminée (CDI)</td>
               <td>Lausanne</td>
               <td>{% include '../atoms/button.html.swig' with {theme: 'primary', btn_label: 'Postuler'} %}</td>
            </tr>
            <tr>
               <td><strong>Assistant(e) administratif/-ve à 80% (réf. 3416)</strong></td>
               <td>Immobilier</td>
               <td>Contrat à durée indéterminée (CDI)</td>
               <td>Lausanne</td>
               <td>{% include '../atoms/button.html.swig' with {theme: 'primary', btn_label: 'Postuler'} %}</td>
            </tr>
            <tr>
               <td><strong>Concierge professionnel à Morges (réf. 3716)</strong></td>
               <td>Immobiliere</td>
               <td>Contrat à durée indéterminée (CDI)</td>
               <td>Lausanne</td>
               <td>{% include '../atoms/button.html.swig' with {theme: 'primary', btn_label: 'Postuler'} %}</td>
            </tr>
           </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-4 col-md-pull-7 col-lg-3 col-lg-pull-8 col-xl-2 col-xl-pull-6">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>
      {% include '../molecules/secondary-nav.html.swig' with {'theme': '', 'json': 'emploi'} %}
    </div>
  </div>
</div>

<div class="spacer"></div>
{% include '../organisms/footer.html.swig' with {'light': true} %}
