---
title: alerts
name: alerts
collection: examples
styleguide: true
layout: examples.html.swig
---
{% include '../atoms/alert.html.swig' with {'type': 'info'} %}

<div class="alert alert-success">
  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
  <strong>Bravo!</strong> Indique une action réussie ou positive.
</div>

<div class="alert alert-warning">
  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
  <strong>Attention!</strong> Indique un avertissement qui pourrait avoir besoin d'attention.
</div>

<div class="alert alert-danger">
  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
  <strong>Danger!</strong> Indique une action dangereuse ou potentiellement négative.
</div>
