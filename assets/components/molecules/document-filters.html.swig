---
title: Document filters
name: document-filters
collection: molecules
---
<form class="document-filters">
  <div class="row">
    <div class="col-sm-6 col-md-7 col-lg-8">
      <label for="#categorySelect" class="h5">Filtrer par catégorie:</label>
      <select id="categorySelect" class="form-control">
        <option value="toutes" selected>Toutes</option>
        <option value="document-institutionnel">Document institutionnel</option>
        <option value="prevoyance-particuliers">Prévoyance particuliers (3ème et 2ème pilier)</option>
        <option value="prevoyance-professionnelle-entreprise">Prévoyance professionnelle entreprise</option>
        <option value="immobiler">Immobilier</option>
        <option value="prets">Prêts</option>
        <option value="brochures-et-fiches-explicatives">Brochures et fiches explicatives</option>
        <option value="formulaires">Formulaires</option>
        <option value="rapports-annuels">Rapports annuels</option>
        <option value="etudes">Etudes</option>
        <option value="reglementation">Réglementation</option>
      </select>
    </div>
    <div class="col-sm-6 col-md-5 col-lg-4">
      <label for="#yearSelect" class="h5">Filtrer par année:</label>
      <select id="yearSelect" class="form-control">
        <option selected>Année</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
        <option value="2017">2017</option>
        <option value="2016">2016</option>
        <option value="2015">2015</option>
        <option value="2014">2014</option>
      </select>
    </div>
  </div>
</form>
