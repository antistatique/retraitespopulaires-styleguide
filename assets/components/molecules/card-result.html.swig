---
title: Card Result
name: card-result
collection: molecules
variants:
  file: File Result
---
<div class="card card-light card-hover card-no-shadow">
  <div class="card-body">
    {%- if variant == 'file' %}
    <h3 class="card-title">
      <a href="#0">Titre du document qui correspond à la recherche</a>
    </h3>
    <p class="tooltip-container">
      <button class="btn btn-circle btn-outline btn-xs tooltip-shift" data-toggle="popover" data-placement="bottom" data-content="Accueil › Catégorie ou autre › Dossier ou taxonomie">
        <span class="retraitespopulaires-icon retraitespopulaires-icon-angle retraitespopulaires-icon-flip-vertical" aria-hidden="true"></span>
      </button>
      <span class="text-muted" title="accueil › catégorie ou autre › dossier ou taxonomie › nom_du_fichier_telechargeable.pdf"><span class="sr-only">Chemin du fichier: accueil, catégorie ou autre, dossier ou taxonomie, </span>nom_du_fichier_telechargeable.pdf</span>
    </p>
    {%- else %}
    <div class="card-justify">
      <h3 class="card-title">
        <a href="#0">Titre du document de presse ou d'information</a>
      </h3>
      <div class="card-actions">
        <a href="#0" class="btn btn-sm btn-outline text-uppercase btn-normal">Détails</a>
        <a href="#0" class="btn btn-sm btn-primary text-uppercase btn-normal">Télécharger</a>
      </div>
    </div>
    <hr class="card-separator">
    <p class="text-muted">
      <strong>Assurance vie</strong>
      <span class="text-square-bullet">Le 24 avril 2017, par Lorraine Clément</span>
    </p>
    {%- endif %}
    <h4 class="title-mini">Extrait</h4>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. <mark>Impedit</mark> ipsa, temporibus necessitatibus ipsum dignissimos quas accusamus quos in tenetur aut autem aliquid doloribus veniam fugit ea vel. Deleniti ipsam, cum tempore ratione asperiores consequuntur, adipisci vitae minus aut porro nulla, delectus, provident obcaecati ad modi dolores ducimus et repellat reiciendis.</p>
    <h4 class="title-mini">Thèmes</h4>
    {% spaceless %}
    <ul class="unordered-list list-inline">
      <li><a href="" class="pretty-link">Économie</a></li>
      <li><a href="" class="pretty-link">Devises</a></li>
      <li><a href="" class="pretty-link">Banques centrales</a></li>
    </ul>
    {% endspaceless %}
  </div>
</div>
