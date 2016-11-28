{% extends "base.html.swig" %}

{% block content %}
  {% set path = '../components/mandats/' + name + '.html.swig' %}
  <div id="page-wrapper">
    {% include path %}
  </div>
{% endblock %}

{% block javascripts %}
{% endblock %}
