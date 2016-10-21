---
title: table
name: table
collection: molecules
notes: |
  ##### Usage : `table`
  ##### Options :
  - **size** - <i>String</i> - <b>table-['wide'|'condensed']</b>
  - **theme** - <i>String</i> - <b>table-['assurance'|'prevoyance'|'immobilier'|'hypotheque'|'institutionnel'|'profelia'|'cpev'|'cip']</b>
---
<table class="table-{{size}} table-{{theme}} tablesaw tablesaw-stack" data-tablesaw-mode="stack">
 <thead>
  <tr>
     <th><strong>Entête importante</strong></th>
     <th>A gauche</th>
     <th><div class="text-center">Centré</div></th>
     <th><div class="text-right">Chiffres #1</div></th>
     <th><div class="text-right">Chiffres #2</div></th>
  </tr>
 </thead>
 <tbody>
  <tr>
     <td>Première ligne</td>
     <td>Carmin</td>
     <td><div class="text-center text-icon"><span class="text-danger retraitespopulaires-icon retraitespopulaires-icon-arrow-down-right"></span></div></td>
     <td><div class="text-right">-2,2%</div></td>
     <td><div class="text-right">12'0400.-</div></td>
  </tr>
  <tr>
     <td>Une sconde information</td>
     <td>Ocre</td>
     <td><div class="text-center text-icon"><span class="text-success angle angle-force-top retraitespopulaires-icon retraitespopulaires-icon-arrow-up-right"></span></div></td>
     <td><div class="text-right">+0,2%</div></td>
     <td><div class="text-right">1'1050.-</div></td>
  </tr>
  <tr>
     <td>Et de trois</td>
     <td>Turquoise</td>
     <td><div class="text-center text-icon"><span class="text-muted retraitespopulaires-icon retraitespopulaires-icon-arrow"></span></div></td>
     <td><div class="text-right">—</div></td>
     <td><div class="text-right">127'746.-</div></td>
  </tr>
 </tbody>
</table>
