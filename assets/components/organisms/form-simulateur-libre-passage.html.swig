---
title: form-simulateur-libre-passage
name: form-simulateur-libre-passage
collection: organisms
notes: |
  ##### Usage : `form-simulateur-libre-passage`
  ##### Options :
  - **theme** - String
---
<form class="form-simulateur-libre-passage form-simulateur-libre-passage-{{theme}}">
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
    <label for="sexe">Sexe</label>
    <select class="form-control">
      <option>Homme</option>
      <option>Femme</option>
    </select>
  </div>
  <div class="form-group">
    <label for="etat-civil">Marié(e) ou lié(e) par un partenariat enregistré</label>
    <select class="form-control">
      <option>Oui</option>
      <option>Non</option>
    </select>
  </div>
  <div class="form-group">
    <label for="pourcentage-rente">Pourcentage souhaité de la rente de vieillesse versée au conjoint (ou partenaire enregistré) survivant</label>
    <select class="form-control">
      <option>0 %</option>
      <option>60 %</option>
      <option>80 %</option>
      <option>100 %</option>
    </select>
  </div>
  <div class="spacer spacer-sm"></div>
  <h3>Votre apport de libre passage</h3>
  <div class="form-group">
    <label for="montant">Montant (CHF)</label>
    <input class="form-control" id="inputID" type="text" placeholder="Définir ici le montant"></input>
  </div>
  <div class="form-group">
    <label>Date du versement</label>
    <div class="input-group">
      <input type="text" class="form-control datepicker" value="02/12/2016">
      <span class="input-group-btn">
        <button class="btn btn-default btn-icon" type="button"><i class="retraitespopulaires-icon retraitespopulaires-icon-placeholder"></i></button>
      </span>
    </div>
  </div>
  <div class="form-group">
    <label for="age">Âge terme pour le versement des prestations</label>
    <select class="form-control">
      <option>59</option>
      <option>60</option>
      <option>61</option>
      <option>62</option>
      <option>63</option>
      <option>64</option>
      <option>65</option>
      <option>66</option>
      <option>67</option>
      <option>68</option>
      <option>69</option>
    </select>
  </div>
  <button type="submit" class="btn btn-primary">Calculer</button>
</form>