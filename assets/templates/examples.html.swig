{% extends "base.html.swig" %}

{% block content %}
  {% set path = '../components/examples/' + name + '.html.swig' %}
  <div id="page-wrapper">
    {% include path %}
  </div>
{% endblock %}

{% block javascripts %}
{% endblock %}
