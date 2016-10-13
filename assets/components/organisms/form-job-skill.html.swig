---
title: form-job-skill
name: form-job-skill
collection: organisms
notes: |
  ##### Usage : `form-job-skill`
---
<form class="form-job-signup">
  <h3>Domaines d'expertise</h3>
  <fieldset class="fieldset-bordered">
    <div class="form-group">
      <label>Votre domaine d'expertise N°1</label>
      <select name="skills_1" class="form-control">
        <option value="_default">Sélectionner</option>
        <option value="...">...</option>
      </select>
    </div>
    <div class="form-group">
      <label>Votre domaine d'expertise N°2</label>
      <select name="skills_2" class="form-control">
        <option value="_default">Sélectionner</option>
        <option value="...">...</option>
      </select>
    </div>
    <div class="form-group">
      <label>Votre domaine d'expertise N°3</label>
      <select name="skills_3" class="form-control">
        <option value="_default">Sélectionner</option>
        <option value="...">...</option>
      </select>
    </div>
  </fieldset>

  <h3>Informations complémentaires</h3>
  <fieldset class="fieldset-bordered">
    <div class="form-group">
      <label class="">Vos compétences</label>
      <div class="input-text">
        <textarea class="form-control" name="skills" rows="3" cols="60"></textarea>
      </div>
    </div>
    <div class="form-group">
      <label class="">Vos centres d'intérêt</label>
      <div class="input-text">
        <textarea class="form-control" name="interests" rows="3" cols="60"></textarea>
      </div>
    </div>
    <div class="form-group">
      <label class="">Vos publications</label>
      <div class="input-text">
        <textarea class="form-control" name="publications" rows="2" cols="30"></textarea>
      </div>
    </div>
    <div class="form-group">
      <label class="">Vos adhésions à des groupes</label>
      <div class="input-text">
        <textarea class="form-control" name="memberships" rows="2" cols="30"></textarea>
      </div>
    </div>
    <div class="form-group">
      <label class="">Votre prétention salariale</label>
      <div class="input-text">
        <input type="text" size="10" name="pay" class="form-control text-right" placeholder="CHF" value="">
      </div>
    </div>
  </fieldset>

  <hr />

  <button type="submit" class="btn btn-primary btn-lg pull-right">Enregistrer</button>
  <div class="clearfix"></div>
</form>
