---
title: form-simulateur-retraite
name: form-simulateur-retraite
collection: organisms
notes: |
  ##### Usage : `form-simulateur-retraite`
---
<form class="form-simulateur-libre-passage">
  <h3>Données personnelles</h3>
  <fieldset class="fieldset-bordered">
    <div class="form-group">
      <label>Date de la situation de prévoyance</label>
      <div class="input-group">
        <input type="text" class="form-control datepicker" value="02/12/2016">
        <span class="input-group-btn no-events">
          <button class="btn btn-default-invert btn-icon btn-" type="button"><i class="retraitespopulaires-icon retraitespopulaires-icon-calendar"></i></button>
        </span>
      </div>
    </div>

    <div class="form-group">
      <label class="d-block">Sexe</label>
      <div class="form-group-inline">
        <div class="input-radio radio-inline">
          <input type="radio" name="taste" value="f">
          <label class="option">Femme</label>
        </div>
        <div class="input-radio radio-inline">
          <input type="radio" name="taste" value="h">
          <label class="option">Homme</label>
        </div>
        <div class="input-radio radio-inline">
          <input type="radio" name="taste" value="other">
          <label class="option">Ne souhaite pas répondre</label>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label>Date de naissance</label>
      <div class="input-group">
        <input type="text" class="form-control datepicker" value="02/12/2016">
        <span class="input-group-btn no-events">
          <button class="btn btn-default-invert btn-icon btn-" type="button"><i class="retraitespopulaires-icon retraitespopulaires-icon-calendar"></i></button>
        </span>
      </div>
    </div>
    <div class="form-group">
      <label>Date d'entrée théorique dans la caisse</label>
      <div class="input-group">
        <input type="text" class="form-control datepicker" value="02/12/2016">
        <span class="input-group-btn no-events">
          <button class="btn btn-default-invert btn-icon btn-" type="button"><i class="retraitespopulaires-icon retraitespopulaires-icon-calendar"></i></button>
        </span>
      </div>
    </div>
  </fieldset>

  <fieldset class="fieldset-bordered">
    <div class="form-group">
      <label for="montant">Dernier degré d'assurance</label>
      <input class="form-control text-right" id="inputID" type="number" placeholder="%"></input>
      <p class="help-block">Equivaut au <strong>pourcentage d'activité</strong> actuel ou au pourcentage d'activité antiérieur maintenu par des cotisations complémentaires.</p>
    </div>
     <div class="form-group">
      <label for="montant">Dernier salaire cotisant</label>
      <input class="form-control" id="inputID" type="number" placeholder="CHF"></input>
      <p class="help-block">Salaire sur lequel seront prélevées les cotisations et qui correspond au <strong>salaire annuel</strong> brut diminué d'une déudction de coordination.</p>
    </div>
    <div class="form-group">
      <label for="montant">Salaire assuré en cas de sortie et avant la retraite</label>
      <input class="form-control" id="inputID" type="number" placeholder="CHF"></input>
      <p class="help-block">Avant 57 ans, il est égal au <strong>dernier salaire cotisant</strong>. À partir de 57 ans, il correspond à la <strong>moyenne des salires cotisants</strong> mais au plus sur uen durée de 5ans.</p>
    </div>
    <div class="form-group">
      <label for="montant">Degré moyen d'assurance</label>
      <input class="form-control text-right" id="inputID" type="number" placeholder="%"></input>
      <p class="help-block">Moyenne des degrés d'assurance sur la période décrite pour le salaire assurle en cas de sortie et avant la retraite (ci-dessus).</p>
    </div>
  </fieldset>

  <fieldset class="fieldset-bordered">
    <div class="form-group">
      <label for="montant">Compte individuel de préfinancement</label>
      <input class="form-control" id="inputID" type="text" placeholder="CHF"></input>
      <p class="help-block">Montant disponible pour financer tout ou partie de la réduction de la rente en cas de retraite anticipée (soit avant l'âge pivot de 62 ans).</p>
    </div>
    <div class="form-group">
      <label for="montant">Droits transitoires financés par l'employeur </label>
      <input class="form-control" id="inputID" type="text" placeholder="CHF"></input>
      <p class="help-block">Montant versé par l'employeur permettant de compenser les effets du nouveau plan. Il sera définitiveement acquis et converti en rente viagère au moment de la retraite.</p>
    </div>
  </fieldset>

  <fieldset class="fieldset-bordered">
    <div class="form-group">
      <label class="d-block">Droits à la majoration du supplément temporaire</label>
      <div class="form-group-inline">
        <div class="input-radio radio-inline">
          <input type="radio" name="taste" value="yes">
          <label class="option">Oui</label>
        </div>
        <div class="input-radio radio-inline">
          <input type="radio" name="taste" value="no">
          <label class="option">Non</label>
        </div>

        <p class="help-block">Cocher "oui" pour les personnes mariées faisant ménage commun et partant à la retraite avant le 1er janvier 2018, dans le cas contraire cocher "non".</p>
      </div>
    </div>
  </fieldset>

	<div class="spacer spacer-xs"></div>
	<h3>Choix du mode de calcul de la retraite</h3>
  <fieldset class="fieldset-bordered">
  	<div class="form-group">
      <label>Je souhaite partir à la retraite à la date du</label>
      <div class="input-group">
        <input type="text" class="form-control datepicker" value="02/12/2016">
        <span class="input-group-btn no-events">
          <button class="btn btn-default-invert btn-icon btn-" type="button"><i class="retraitespopulaires-icon retraitespopulaires-icon-calendar"></i></button>
        </span>
      </div>
      <p class="help-block">Indiquer une date correspondant à un âge se situant entre 58 et 70 ans et mentionner le dernier jour du mois.</p>
    </div>
    <div class="form-group">
      <label for="montant">Je souhaite une rente mensuelle d'un montant de</label>
      <input class="form-control" id="inputID" type="text" placeholder="CHF"></input>
      <p class="help-block">Rente de retraite mensuelle souhaitée sans le supplément temporaire.</p>
    </div>
  </fieldset>

  <div class="spacer spacer-xs"></div>
	<h3>Capital retraite</h3>
  <div class="spacer spacer-xs"></div>
  <p>L'assuré peut demander le versement en capital de sa pension de retraite dans une fourchette comprise entre CHF 20'000 et 25% de sa pension de retraite. La demande doit être faite au plus tard 3 mois avant la retraite. Passé ce délai, il n'est plus possible de revenir sur sa décision.</p>
  <fieldset class="fieldset-bordered">
  	<div class="form-group">
      <div class="input-radio">
  	    <input type="radio" name="capital" value="oui">
  	    <label class="option">Pas de capital</label>
  	  </div>
    </div>
    <div class="form-group">
  	  <div class="input-radio">
  	    <input type="radio" name="capital" value="non">
  	    <label class="option">Pourcentage de rente pris en capital</label>
      </div>
    </div>
    <div class="form-group">
	    <input class="form-control text-right" id="inputID" type="number" placeholder="%"></input>
	    <p class="help-block">Indiquer le pourcentage de la rente que vous désirez toucher sous forme de capital (maximum 25 %).</p>
    </div>
    <div class="form-group">
  	  <div class="input-radio">
  	    <input type="radio" name="capital" value="non">
  	    <label class="option">Montant pris en capital</label>
      </div>
    </div>
    <div class="form-group">
	    <input class="form-control" id="inputID" type="number" placeholder="CHF"></input>
	    <p class="help-block">Indiquer le montant que vous désirez toucher sous forme de capital.<br> <strong>NB : si vous désirez connaître le montant maximum possible, veuillez indiquer 25 % dans la rubrique précédente "Pourcentage de rente pris en capital".</strong></p>
    </div>
  </fieldset>

  <hr />

  <button type="submit" class="btn btn-primary btn-lg pull-right">Calculer</button>
  <div class="clearfix"></div>
</form>
