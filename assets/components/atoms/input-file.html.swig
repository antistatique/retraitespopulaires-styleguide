---
title: input-file
name: input-file
collection: atoms
notes: |
  ##### Usage : `input-file`
  ##### Options :
  - **input_file_theme** - <i>String</i> - <b>btn-['primary'|'assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<div class="form-group form-file">
  <label>Certificat de salaire</label><br>
  <div class="form-file-handler btn btn-lg btn-{{ input_file_theme|default('primary') }}">
    <label for="inputID">Télécharger votre fichier</label>
    <input class="" id="inputID" type="file"></input>
  </div>
</div>
