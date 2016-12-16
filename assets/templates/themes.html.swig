{% extends "base.html.swig" %}

{% import 'styleguide/item.html.swig' as item %}

{% block content %}
<div class="styleguide-item-group">
  <div class="styleguide-item-heading-group">
    <div class="lead">{{contents|raw}}</div>
  </div>
</div>
{% endblock %}
