---
title: form-job-add-file
name: form-job-add-file
collection: organisms
notes: |
  ##### Usage : `form-job-add-file`
---
<form class="form-job-add-file">
  <h3>Description</h3>
  <fieldset class="fieldset-bordered">
    <div class="form-group">
      <label class="">Titre du document</label>
      <div class="input-text">
        <input type="text" size="10" name="title" class="form-control" placeholder="" value="">
      </div>
    </div>
    <div class="form-group">
      <label>Type de document</label>
      <select name="type" class="form-control">
        <option value="certificat">Certificat de travail</option>
        <option value="...">...</option>
      </select>
    </div>
    <div class="form-group">
      <label class="">Document</label>
      <div class="input-text">
        <input type="file" class="form-control" name="file">
      </div>
      <p class="help-block">Extensions acceptées: txt, jpg, xls, xlsx, csv, doc, <br/>docx, eps, odp, ods, odt, pdf, pps, ppt, pptx, rtf, gif.</p>
    </div>
  </fieldset>

  <hr />
  <a href="#" class="btn btn-outline text-primary pull-left">‹ Retour</a>
  <button type="submit" class="btn btn-primary btn-lg pull-right">Ajouter</button>
  <div class="clearfix"></div>
</form>
