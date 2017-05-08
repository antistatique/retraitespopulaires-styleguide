{% extends "base.html.swig" %}

{% import 'styleguide/item.html.swig' as item %}

{% block content %}
  <div class="styleguide-item-group" id="organisms">

  {% if collections.organisms.length > 0 %}
    <div class="lead">{{contents|raw}}</div>
    {% for organism in collections.organisms %}
      {{item.default('organism', organism, loop)}}
    {% endfor %}
  {% else %}
    <div data-styleguide-toggle="labels">
      <div class="lead">{{contents|raw}}</div>
    </div>
  {% endif %}

  </div>
{% endblock %}
