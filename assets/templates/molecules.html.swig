{% extends "base.html.swig" %}

{% import 'styleguide/item.html.swig' as item %}

{% block content %}
  <div class="styleguide-item-group" id="molecules">

  {% if collections.molecules.length > 0 %}
    <div class="lead">{{contents|raw}}</div>
    {% for molecule in collections.molecules %}
      {{item.default('molecule', molecule, loop)}}
    {% endfor %}
  {% else %}
    <div data-styleguide-toggle="labels">
      <div class="lead">{{contents|raw}}</div>
    </div>
  {% endif %}

  </div>
{% endblock %}
