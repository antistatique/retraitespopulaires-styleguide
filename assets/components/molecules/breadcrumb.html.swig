---
title: Breadcrumb
name: breadcrumb
collection: molecules
variants:
  dropdown: With Dropdown
---
<nav role="breadcrumb" aria-label="Vous êtes ici:">
  <h2 class="hidden" aria-level="3">Vous êtes ici:</h2>
  <ul class="breadcrumb">
    <li><a href="#">Accueil</a></li>
    {% if variant == 'dropdown' -%}
    <li>
      <div class="btn-group">
        <button type="button" class="btn btn-outline dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Retraites Populaires <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
          <li><a href="#">CIP</a></li>
        </ul>
      </div>
    </li>
    <li class="active">PV</li>
    {% else -%}
    <li><a class="pretty-link" href="#">Emploi</a></li>
    <li class="active"><span class="sr-only">Page active:</span>Connexion</li>
    {%- endif %}
  </ul>
</nav>
