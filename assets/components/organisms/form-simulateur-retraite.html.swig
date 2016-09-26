---
title: form-simulateur-retraite
name: form-simulateur-retraite
collection: organisms
notes: |
  ##### Usage : `form-simulateur-retraite`
  ##### Options :
  - **theme** - String
---
<h3>Données personnelles</h3>
<form class="form-simulateur-libre-passage form-simulateur-libre-passage-{{theme}}">
  <div class="form-group">
    <label>Date de la situation de prévoyance</label>
    <div class="input-group">
      <input type="text" class="form-control datepicker" value="02/12/2016">
      <span class="input-group-btn">
        <button class="btn btn-default btn-icon btn-" type="button"><i class="retraitespopulaires-icon retraitespopulaires-icon-placeholder"></i></button>
      </span>
    </div>
  </div>
  <div class="form-group">
    <label for="sexe">Sexe</label>
    <select class="form-control">
      <option>Homme</option>
      <option>Femme</option>
    </select>
  </div>
  <div class="form-group">
    <label>Date de naissance</label>
    <div class="input-group">
      <input type="text" class="form-control datepicker" value="02/12/2016">
      <span class="input-group-btn">
        <button class="btn btn-default btn-icon btn-" type="button"><i class="retraitespopulaires-icon retraitespopulaires-icon-placeholder"></i></button>
      </span>
    </div>
  </div>
  <div class="form-group">
    <label>Date d'entrée théorique dans la caisse</label>
    <div class="input-group">
      <input type="text" class="form-control datepicker" value="02/12/2016">
      <span class="input-group-btn">
        <button class="btn btn-default btn-icon btn-" type="button"><i class="retraitespopulaires-icon retraitespopulaires-icon-placeholder"></i></button>
      </span>
    </div>
  </div>
  <div class="form-group">
    <label for="montant">Dernier degré d'assurance (%)</label>
    <input class="form-control" id="inputID" type="text" placeholder="Définir ici le degrès en pourcent"></input>
    <p class="help-block">Un help-text serait nécessaire ici.</p>
  </div>
   <div class="form-group">
    <label for="montant">Dernier salaire cotisant</label>
    <input class="form-control" id="inputID" type="text" placeholder="Définir ici le salaire cotisant"></input>
    <p class="help-block">Un help-text serait nécessaire ici.</p>
  </div>
  <div class="form-group">
    <label for="montant">Salaire assuré en cas de sortie et avant la retraite (CHF)</label>
    <input class="form-control" id="inputID" type="text" placeholder="Définir ici le montant"></input>
    <p class="help-block">Un help-text serait nécessaire ici.</p>
  </div>
  <div class="form-group">
    <label for="montant">Degré moyen salaire assuré en cas de sortie et avant la retraite</label>
    <input class="form-control" id="inputID" type="text" placeholder="Définir ici le degrès en pourcent"></input>
    <p class="help-block">Un help-text serait nécessaire ici.</p>
  </div>
  <div class="form-group">
    <label for="montant">Degré moyen d'assurance</label>
    <input class="form-control" id="inputID" type="text" placeholder="Définir ici le degré en pourcents"></input>
    <p class="help-block">Un help-text serait nécessaire ici.</p>
  </div>
  <div class="form-group">
    <label for="montant">Compte individuel de préfinancement (CHF)</label>
    <input class="form-control" id="inputID" type="text" placeholder="Définir ici le montant en CHF"></input>
    <p class="help-block">Si la rubrique "Compte individuel de préfinancement" figure sur votre situation de prévoyance, reporter la somme inscrite au point 22. Si cette rubrique n'apparaît pas mettre 0. <br>Il s'agit du montant disponible pour financer tout ou partie de la réduction de la rente en cas de retraite anticipée (soit avant l'âge pivot de 62 ans).</p>
  </div>
  <div class="form-group">
    <label for="montant">Droits transitoires financés par l'employeur (CHF)</label>
    <input class="form-control" id="inputID" type="text" placeholder="Définir ici le montant en CHF"></input>
    <p class="help-block">Si la rubrique "Droits transitoires financés par l'employeur en cas de retraite uniquement" figure sur votre situation de prévoyance, reporter la somme inscrite au point 23. Si cette rubrique n'apparaît pas mettre 0.<br>Il s'agit du montant versé par l'employeur permettant de compenser les effets du nouveau plan. Il sera définitivement acquis et converti en rente viagère au moment de la retraite.</p>
  </div>
  <div class="form-group">
    <label for="montant">Droits à la majoration du supplément temporaire</label>
    <div class="input-radio">
	    <input type="radio" name="oui" value="oui">
	    <label class="option">Oui</label>
	  </div>
	  <div class="input-radio">
	    <input type="radio" name="non" value="non">
	    <label class="option">Non</label>
	  </div>
    <p class="help-block">Cocher "oui" pour les personnes mariées faisant ménage commun et partant à la retraite avant le 1er janvier 2018, dans le cas contraire cocher "non".</p>
  </div>
	<div class="spacer spacer-ml"></div>
	<h3>Choix du mode de calcul de la retraite</h3>
	<div class="form-group">
    <label>Je souhaite partir à la retraite à la date du</label>
    <div class="input-group">
      <input type="text" class="form-control datepicker" value="02/12/2016">
      <span class="input-group-btn">
        <button class="btn btn-default btn-icon btn-" type="button"><i class="retraitespopulaires-icon retraitespopulaires-icon-placeholder"></i></button>
      </span>
      <p class="help-block">Indiquer une date correspondant à un âge se situant entre 58 et 70 ans et mentionner le dernier jour du mois.</p>
    </div>
  </div>
  <div class="form-group">
    <label for="montant">Je souhaite une rente mensuelle d'un montant de (CHF)</label>
    <input class="form-control" id="inputID" type="text" placeholder="Définir ici le montant en CHF"></input>
    <p class="help-block">Rente de retraite mensuelle souhaitée sans le supplément temporaire.</p>
  </div>
	<div class="spacer spacer-ml"></div>
	<h3>Capital retraite</h3>
	<div class="form-group">
		<label>L'assuré peut demander le versement en capital de sa pension de retraite dans une fourchette comprise entre CHF 20'000 et 25% de sa pension de retraite. La demande doit être faite au plus tard 3 mois avant la retraite. Passé ce délai, il n'est plus possible de revenir sur sa décision.</label>
    <div class="input-radio">
	    <input type="radio" name="oui" value="oui">
	    <label class="option">Pas de capital</label>
	  </div>
	  <div class="input-radio">
	    <input type="radio" name="non" value="non">
	    <label class="option">Pourcentage de rente pris en capital</label>
	    <input class="form-control" id="inputID" type="text" placeholder="Définir ici le pourcentage"></input>
	    <p class="help-block">Indiquer le pourcentage de la rente que vous désirez toucher sous forme de capital (maximum 25 %).</p>
	  </div>
	  <div class="input-radio">
	    <input type="radio" name="non" value="non">
	    <label class="option">Montant pris en capital (CHF)</label>
	    <input class="form-control" id="inputID" type="text" placeholder="Définir ici le montant en CHF"></input>
	    <p class="help-block">Indiquer le montant que vous désirez toucher sous forme de capital.<br>NB : si vous désirez connaître le montant maximum possible, veuillez indiquer 25 % dans la rubrique précédente "Pourcentage de rente pris en capital".</p>
	  </div>    
  </div>


  <button type="submit" class="btn btn-primary">Calculer</button>
</form>