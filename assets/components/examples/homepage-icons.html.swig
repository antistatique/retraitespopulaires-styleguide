---
title: Homepage-icons
name: homepage-icons
collection: examples
styleguide: true
layout: examples.html.swig

icons:
  piggybank: Modulo
  familly: Famille
---

<p>piggybank</p>
{% set icon = 'piggybank' %}
{% include "../../icons/homepage-icons.html.swig" with icon %}

<p>familly</p>
{% set icon = 'familly' %}
{% include "../../icons/homepage-icons.html.swig" with icon %}

<p>retirement</p>
{% set icon = 'retirement' %}
{% include "../../icons/homepage-icons.html.swig" with icon %}

<p>settings</p>
{% set icon = 'settings' %}
{% include "../../icons/homepage-icons.html.swig" with icon %}

<p>search</p>
{% set icon = 'search' %}
{% include "../../icons/homepage-icons.html.swig" with icon %}
