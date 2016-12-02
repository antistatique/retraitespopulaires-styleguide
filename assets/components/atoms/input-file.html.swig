---
title: input-file
name: input-file
collection: atoms
notes: |
  ##### Usage : `input-file`
  ##### Options :
  - **theme** - <i>String</i> - <b>btn-['primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---

<div class="form-group form-file">
  <div class="label">Certificat de salaire</div>
  <div class="btn btn-lg btn-{{ theme|default('primary') }}">
    <label for="inputID">Télécharger votre fichier</label>
  </div>
  <input class="" id="inputID" type="file"></input>
</div>
