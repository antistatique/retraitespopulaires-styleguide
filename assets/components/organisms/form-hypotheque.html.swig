---
title: form-hypotheque
name: form-hypotheque
collection: organisms
notes: |
  ##### Usage : `form-hypotheque`
---
<table class="table-{{size}} table-hypotheque tablesaw tablesaw-stack" data-tablesaw-mode="stack">
   <thead>
    <tr>
       <th><strong>1. Prix d'achat</strong></th>
       <th></th>
    </tr>
   </thead>
   <tbody>
    <tr>
       <td>Introduisez ici le montant d'achat du bien immobilier</td>
       <td><input type="email" class="form-control form-control-hypotheque" id="exampleInputEmail1" placeholder="Le montant en CHF"></td>
    </tr>
    <tr>
       <td>Prix d'achat y compris droits de mutations et frais de notaire (+5%)</td>
       <td>Valeur calculée selon montant entré</td>
    </tr>
    <tr>
       <td>Revenu annuel net (min.)</td>
       <td>Valeur calculée selon montant entré</td>
    </tr>
    <tr>
       <td>Fonds propres (min.)</td>
       <td>Valeur calculée selon montant entré</td>
    </tr>
   </tbody>
  </table>
  <div class="spacer spacer-md"></div>
  <table class="table-{{size}} table-hypotheque tablesaw tablesaw-stack" data-tablesaw-mode="stack">
   <thead>
    <tr>
       <th><strong>2. Fonds propres</strong></th>
       <th></th>
    </tr>
   </thead>
   <tbody>
    <tr>
       <td>Les fonds propres doivent au moins représenter 20% du prix d'achat</td>
       <td><input type="email" class="form-control form-control-hypotheque" id="exampleInputEmail1" placeholder="Le montant en CHF"></td>
    </tr>
    <tr>
       <td>Prix d'achat (max.) sans droits de mutations et frais de notaire</td>
       <td>Valeur calculée selon montant entré</td>
    </tr>
    <tr>
       <td>Revenu annuel net (min.)</td>
       <td>Valeur calculée selon montant entré</td>
    </tr>
   </tbody>
  </table>
  <div class="spacer spacer-md"></div>
  <table class="table-{{size}} table-hypotheque tablesaw tablesaw-stack" data-tablesaw-mode="stack">
   <thead>
    <tr>
       <th><strong>3. Revenu annuel net</strong></th>
       <th></th>
    </tr>
   </thead>
   <tbody>
    <tr>
       <td>Revenu anuel net du ménage</td>
       <td><input type="email" class="form-control form-control-hypotheque" id="exampleInputEmail1" placeholder="Le montant en CHF"></td>
    </tr>
    <tr>
       <td>Prix d'achat (max.) sans droits de mutations et frais de notaire</td>
       <td>Valeur calculée selon montant entré</td>
    </tr>
    <tr>
       <td>Fonds propres (min.)</td>
       <td>Valeur calculée selon montant entré</td>
    </tr>
   </tbody>
  </table>
  <div class="spacer spacer-md"></div>
  <table class="table-{{size}} table-hypotheque tablesaw tablesaw-stack" data-tablesaw-mode="stack">
   <thead>
    <tr>
       <th><strong>4. Taux souhaité en 1er rang</strong></th>
       <th></th>
    </tr>
   </thead>
   <tbody>
    <tr>
       <td>Sélectionnez le taux qui vous intéresse en premier rang</td>
       <td>
        <select class="form-control form-control-hypotheque">
          <option>Fixe à 1 an</option>
          <option>Fixe à 2 ans</option>
          <option>Fixe à 3 ans</option>
          <option>Fixe à 4 ans</option>
          <option>Fixe à 5 ans</option>
          <option>Fixe à 6 ans</option>
          <option>Fixe à 7 ans</option>
          <option>Fixe à 8 ans</option>
          <option>Fixe à 9 ans</option>
          <option>Fixe à 10 ans</option>
          <option>Fixe à 11 ans</option>
          <option>Fixe à 12 ans</option>
          <option>Fixe à 13 ans</option>
          <option>Fixe à 14 ans</option>
          <option>Fixe à 15 ans</option>
          <option>Fixe à 16 ans</option>
          <option>Fixe à 17 ans</option>
          <option>Fixe à 18 ans</option>
          <option>Fixe à 19 ans</option>
          <option>Fixe à 20 ans</option>
        </select>
      </td>
    </tr>
    <tr>
       <td>Taux en pourcent</td>
       <td>Valeur calculée selon montant entré</td>
    </tr>
   </tbody>
  </table>
  <div class="form-group readonly">
    <input type="text" class="form-control form-control-hypotheque full-width" value="Les taux utilisés sont ceux de septembre 2016" readonly></input>
  </div>
  <div class="spacer spacer-md"></div>
  <button type="submit" class="btn btn-default btn-hypotheque pull-right">Calculer</button>
