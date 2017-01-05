---
title: alert
name: alert
collection: atoms
notes: |
  ##### Usage : `alert`
  ##### Options :
  - **alert_type** - <i>String</i> - <b>alert-['success'|'danger'|'info'|'warning']</b>
---
<div class="alert alert-{{ alert_type|default('info') }}">
  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
  <strong>Info!</strong> Indique un changement ou une action d'information neutre.
</div>
