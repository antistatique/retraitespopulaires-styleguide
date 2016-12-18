{% extends "base.html.swig" %}

{% import 'styleguide/item.html.swig' as item %}


{% block content %}

<div class="styleguide-item-heading-group">
  <div class="lead">{{contents|raw}}</div>
</div>

{% if collections.atoms.length > 0 %}
<div class="styleguide-item-group" id="atoms">
  <h2>Atoms</h2>
  {% for atom in collections.atoms %}
  {{item.default('atom' ,atom, loop)}}
  {% endfor %}
  {% else %}
  <div class="styleguide-item-heading-group" data-styleguide-toggle="labels">
    <div class="lead">{{contents|raw}}</div>
  </div>
</div>
{% endif %}

{% if collections.molecules.length > 0 %}
<div class="styleguide-item-group" id="molecules">
  <h2>Molecules</h2>
  {% for molecule in collections.molecules %}
  {{item.default('molecule', molecule, loop)}}
  {% endfor %}
  {% else %}
  <div class="styleguide-item-heading-group" data-styleguide-toggle="labels">
    <div class="lead">{{contents|raw}}</div>
  </div>
</div>
{% endif %}

{% if collections.organisms.length > 0 %}

<div class="styleguide-item-group" id="organisms">
  <div class="styleguide-item-heading-group">
    <div class="lead">{{contents|raw}}</div>
  </div>
  {% for organism in collections.organisms %}
  {{item.default('organism', organism, loop)}}
  {% endfor %}
  {% else %}
  <div class="styleguide-item-heading-group" data-styleguide-toggle="labels">
    <div class="lead">{{contents|raw}}</div>
  </div>
</div>
{% endif %}


{% endblock %}
