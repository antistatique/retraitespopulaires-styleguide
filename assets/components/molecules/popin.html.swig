---
title: Popin
name: popin
collection: molecules
notes: |
  Will display a popin at the lower right corner after a few seconds. It can be collapsed.
---
<div class="popin alert alert-primary alert-dismissible" role="dialog" aria-labelledby="popin-title" aria-describedby="popin-body">
  <div class="collapse popin-body" id="popin-body">
    <p>Content here.</p>
  </div>
  <div class="collapse in popin-body-closed" id="popin-title">
    <p>Title here.</p>
  </div>
  <button class="collapsed" data-toggle="collapse" data-target="#popin-title,#popin-body" aria-expanded="false" aria-controls="popin-body">Toggle</button>
  <button type="button" class="close" data-dismiss="alert" aria-label="Fermer"><span aria-hidden="true">&times;</span></button>
</div>
