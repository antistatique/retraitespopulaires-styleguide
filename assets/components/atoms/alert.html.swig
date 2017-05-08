---
title: alert
name: alert
collection: atoms
variants:
  default: Alert Info
  alert-success: Alert Success
  alert-danger: Alert Danger
  alert-warning: Alert Warning
---
<div class="alert {{ variant|default('alert-info') }}">
  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
  <strong>Lorem!</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, commodi.
</div>
