---
title: Tables
name: tables
collection: examples
styleguide: true
layout: examples.html.swig
---
<div class="row">
  <div class="col-xs-12">
    <h6>Tableau long</h6>
    {% include '../molecules/table.html.swig' with {table_size: 'wide'} %}
  </div>
</div>
<div class="spacer"></div>
<div class="row">
  <div class="col-xs-12">
    <h6>Tableau condensé</h6>
    {% include '../molecules/table.html.swig' with {table_size: 'condensed'} %}
  </div>
</div>
<div class="spacer"></div>
<div class="row theme-assurance">
  <div class="col-xs-12">
    <h6>Tableau long - Thème</h6>
    {% include '../molecules/table.html.swig' with {table_size: 'wide'} %}
  </div>
</div>
<div class="spacer"></div>
<div class="row theme-assurance">
  <div class="col-xs-12">
    <h6>Tableau condensé - Thème</h6>
    {% include '../molecules/table.html.swig' with {table_size: 'condensed'} %}
  </div>
</div>

<div class="spacer"></div>
<div class="row theme-assurance">
  <div class="col-xs-12">
    <h6>Tableau condensé - Thème</h6>


    <table border="1" cellpadding="1" cellspacing="1" class="table-wide tablesaw tablesaw-stack" data-tablesaw-mode="stack" style="width: 100%;" summary="Situation au 31 décembre">
      <caption>Chiffres clés 2015 des institutions gérées</caption>
      <thead>
        <tr>
          <th scope="row">&nbsp;</th>
          <th scope="col">Retraites Populaires</th>
          <th scope="col">CPEV</th>
          <th scope="col">CIP</th>
          <th scope="col">Profelia</th>
          <th scope="col">Somme</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Assurés actifs</th>
          <td>73'390</td>
          <td>34'865</td>
          <td>12'632</td>
          <td>3012</td>
          <td>124'948</td>
        </tr>
        <tr>
          <th scope="row">Pensionnés</th>
          <td>37'157</td>
          <td>16'775</td>
          <td>5838</td>
          <td>848</td>
          <td>61'134</td>
        </tr>
        <tr>
          <th scope="row">Total d'affiliés</th>
          <td>110'547</td>
          <td>51'640</td>
          <td>18'470</td>
          <td>3860</td>
          <td>186'082</td>
        </tr>
        <tr>
          <th scope="row">Total du bilan (CHF)</th>
          <td>6,32 mia</td>
          <td>11,158 mrd</td>
          <td>2,853 mrd</td>
          <td>558,7 mio</td>
          <td>21,033 mrd</td>
        </tr>
        <tr>
          <th scope="row">Encaissement de primes (CHF)</th>
          <td>786 mio</td>
          <td>753,98 mio</td>
          <td>278,62 mio</td>
          <td>56,8 mio</td>
          <td>1,876 mrd</td>
        </tr>
        <tr>
          <th scope="row">Performance brute*</th>
          <td>2%</td>
          <td>3,6%</td>
          <td>3,7%</td>
          <td>-0,1%</td>
          <td>&nbsp;</td>
        </tr>
      </tbody>
    </table>

    <table border="1" cellpadding="1" cellspacing="1" class="table-condensed tablesaw table tablesaw-stack" data-tablesaw-mode="stack" style="width: 100%;" summary="Situation au 31 décembre">
      <caption>Chiffres clés 2015 des institutions gérées</caption>
      <thead>
        <tr>
          <th scope="row">&nbsp;</th>
          <th scope="col">Retraites Populaires</th>
          <th scope="col">CPEV</th>
          <th scope="col">CIP</th>
          <th scope="col">Profelia</th>
          <th scope="col">Somme</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Assurés actifs</th>
          <td>73'390</td>
          <td>34'865</td>
          <td>12'632</td>
          <td>3012</td>
          <td>124'948</td>
        </tr>
        <tr>
          <th scope="row">Pensionnés</th>
          <td>37'157</td>
          <td>16'775</td>
          <td>5838</td>
          <td>848</td>
          <td>61'134</td>
        </tr>
        <tr>
          <th scope="row">Total d'affiliés</th>
          <td>110'547</td>
          <td>51'640</td>
          <td>18'470</td>
          <td>3860</td>
          <td>186'082</td>
        </tr>
        <tr>
          <th scope="row">Total du bilan (CHF)</th>
          <td>6,32 mia</td>
          <td>11,158 mrd</td>
          <td>2,853 mrd</td>
          <td>558,7 mio</td>
          <td>21,033 mrd</td>
        </tr>
        <tr>
          <th scope="row">Encaissement de primes (CHF)</th>
          <td>786 mio</td>
          <td>753,98 mio</td>
          <td>278,62 mio</td>
          <td>56,8 mio</td>
          <td>1,876 mrd</td>
        </tr>
        <tr>
          <th scope="row">Performance brute*</th>
          <td>2%</td>
          <td>3,6%</td>
          <td>3,7%</td>
          <td>-0,1%</td>
          <td>&nbsp;</td>
        </tr>
      </tbody>
    </table>

  </div>
</div>
