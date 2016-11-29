---
title: cip-basicpage-prevoyance
name: cip-basicpage-prevoyance
collection: mandats
styleguide: false
layout: mandats.html.swig
---
{% include '../organisms/header.html.swig' with {'light': true, 'theme': 'cip'} %}

{% include '../atoms/funky-waves.html.swig' with {'theme': 'cip'} %}

<div class="container">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-offset-4 col-lg-8 col-lg-offset-3 col-xl-6 col-xl-offset-3 text-center">
      {% include '../molecules/breadcrumb.html.swig' with {theme: 'text-cip', links: ['Accueil', 'Prévoyance', 'Transiter entre deux emplois', 'Plans de prévoyance']} %}
      <div class="spacer"></div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="col-xs-12 col-md-7 col-md-push-4 col-lg-8 col-lg-push-3 col-xl-6 col-xl-push-3">
      <h1 class="page-title text-center">Plans de prévoyance</h1>
      <div class="spacer"></div>
      <div class="entity-content">
        <h4>La CIP assure principalement les collaborateurs des communes, services et institutions d'utilité publique du canton de Vaud pour la prévoyance professionnelle.</h4>
        <div class="spacer spacer-xs"></div>
        <p>
          Pour remplir sa mission de prévoyance professionnelle, la CIP a mis en place deux principaux plans de prévoyance qui sont les suivants:</p>
        <p>
         <strong>Plan risques.</strong> Ce plan assure les risques d'invalidité et de décès, jusqu'à ce que l'assuré atteigne l'âge d'entrer dans le plan ordinaire. Comme son nom l'indique, seul le risque est assuré. Par conséquent l'assuré a droit à des prestations seulement si le risque couvert se réalise.
        </p>
        <p>
          <strong>Plan ordinaire.</strong> Ce second plan assure non seulement les risques liés au décès et à l'invalidité, mais également le risque de vieillesse. En cas de vie au moment de la retraite le plan prévoit une rente de 60% au maximum du salaire assuré, à condition que l'assuré ait cotisé durant la durée d'assurance totale qui est de 40 années. Ce système est dit de la "primauté des prestations".
        </p>
        <p>
          <strong>Plan minimum LPP.</strong> Ce troisième plan ne s'applique que dans des cas restreints et particuliers. Il assure le minimum défini dans la LPP.
        </p>
        <hr>
        <h3>Cotisations et contributions</h3>
        <p>Les cotisations sont prélevées en pourcent du salaire cotisant:</p>
        <div class="spacer spacer-ml"></div>
        {% include '../organisms/mandats-table.html.swig' %}
        <div class="spacer spacer-ml"></div>
        <p>Selon l'employeur, la variante A ou B est appliquée. L'employeur va au-delà du minimum légal fixé dans la LPP, puisqu'il verse un total de 15% ou 16% du salaire cotisant au titre de la prévoyance.</p>
      </div>
    </div>
    <div class="col-xs-12 col-md-4 col-md-pull-7 col-lg-3 col-lg-pull-8 col-xl-2 col-xl-pull-6">
      <div class="spacer spacer-xl visible-xs visible-sm"></div>
      {% include '../molecules/secondary-nav.html.swig' with {'theme': 'cip', 'json': 'cip'} %}
    </div>
  </div>
</div>

<div class="spacer spacer-lg"></div>
{% include '../organisms/mandats-attachements-contact.html.swig' with {'attachments_contact_theme': 'cip'} %}
<div class="spacer"></div>
{% include '../organisms/mandats-footer.html.swig' %}
