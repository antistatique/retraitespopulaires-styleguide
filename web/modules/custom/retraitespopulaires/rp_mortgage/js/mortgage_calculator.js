;(function($, MORTGAGE_RATES, MORTGAGE_SETTINGS) {

  // on domReady
  $(function() {
    var $mortgageForm = $('.js-mortgage-calculator');

    // Form not found, skip everything
    if (!$mortgageForm.size()) {
      return;
    }


    var $amountInput = $('.js-amount-input'),
      $amountWithFeeInput = $('.js-amount-with-fee-input'),
      $minimalIncomeForAmountInput = $('.js-minimal-income-for-amount'),
      $minimalEquityCapitalForAmount = $('.js-minimal-equity-capital-for-amount'),
      $equityCapitalInput = $('.js-equity-capital-input'),
      $maxAmountForEquityCapitalInput = $('.js-max-amount-for-equity-capital'),
      $minimalIncomeForEquityCapitalInput = $('.js-minimal-income-for-equity-capital'),
      $incomeInput = $('.js-income-input'),
      $maxAmountForIncomeInput = $('.js-max-amount-for-income'),
      $minEquityCapitalForIncomeInput = $('.js-min-equity-capital-for-income'),
      $rateSelect = $('.js-rate-name'),
      $rateInput = $('.js-rate')
      ;

    $amountInput.bind('keyup change', function (e) {
      var amount = parseFloat($(this).autoNumeric('get'));
      updateAmountInputs(amount);
    });

    $equityCapitalInput.bind('keyup change', function(e) {
      var equityCapital = parseFloat($(this).autoNumeric('get'));
      updateEquityCapitalInputs(equityCapital);
    });

    $incomeInput.bind('keyup change', function(e) {
      var income = parseFloat($(this).autoNumeric('get'));
      updateIncomeInputs(income);
    });

    $rateSelect.bind('change', function (e) {
      var firstRate = parseFloat($(this).val());
      var secondRate = parseFloat($(this).find(':selected').data('second-rate'));

      updateRateInputs(firstRate, secondRate);
    });

    $mortgageForm.bind('submit', function (e) {
      e.preventDefault();
      updateResults();
    });

    updateAmountInputs(parseFloat($amountInput.autoNumeric('get')));
    updateEquityCapitalInputs(parseFloat($equityCapitalInput.autoNumeric('get')));
    updateIncomeInputs(parseFloat($incomeInput.autoNumeric('get')));
    updateRateInputs(parseFloat($rateSelect.val()), parseFloat($rateSelect.find(':selected').data('second-rate')));

    ///////////////////////////////////////////////////////////////////////////////////////
    /// functions
    function updateAmountInputs(amount) {
      var amountWithFee = null,
        minimalIncome = null,
        minimalEquityCapital = null;

      if (!isNaN(amount)) {
        amountWithFee = getPrixAchatAvecFraisNotaire(amount, MORTGAGE_SETTINGS.notaryRateFee);
        minimalIncome = getRevenuAnnuelNetMin(
          amount,
          MORTGAGE_SETTINGS.firstRateMax,
          MORTGAGE_SETTINGS.theoricalCostFirstRate,
          MORTGAGE_SETTINGS.secondRateMax,
          MORTGAGE_SETTINGS.theoricalCostSecondRate,
          MORTGAGE_SETTINGS.maintenanceFees,
          MORTGAGE_SETTINGS.ratioCostIncomeMax
        );
        minimalEquityCapital = getFondsPropresMinPourPrixAchat(amount, MORTGAGE_SETTINGS.equityCapitalMinRate);
      }

      $amountWithFeeInput.autoNumeric('set', amountWithFee);
      $minimalIncomeForAmountInput.autoNumeric('set', minimalIncome);
      $minimalEquityCapitalForAmount.autoNumeric('set', minimalEquityCapital);
    }

    function updateEquityCapitalInputs(equityCapital) {
      var maxAmount = null,
        minIncome = null;

      if (!isNaN(equityCapital)) {
        maxAmount = getPrixAchatSansFraisNotaire(equityCapital, MORTGAGE_SETTINGS.equityCapitalMinRate);
        minIncome = getRevenuAnnuelNetMin(
          maxAmount,
          MORTGAGE_SETTINGS.firstRateMax,
          MORTGAGE_SETTINGS.theoricalCostFirstRate,
          MORTGAGE_SETTINGS.secondRateMax,
          MORTGAGE_SETTINGS.theoricalCostSecondRate,
          MORTGAGE_SETTINGS.maintenanceFees,
          MORTGAGE_SETTINGS.ratioCostIncomeMax
        );
      }

      $maxAmountForEquityCapitalInput.autoNumeric('set', maxAmount);
      $minimalIncomeForEquityCapitalInput.autoNumeric('set', minIncome);
    }

    function updateIncomeInputs(income) {
      var maxAmount = null,
        minEquityCapital = null;

      if (!isNaN(income)) {
        maxAmount = getPrixAchatMaxSansFraisNotairePourRevenu(
          income,
          MORTGAGE_SETTINGS.secondRateMax,
          MORTGAGE_SETTINGS.ratioCostIncomeMax,
          MORTGAGE_SETTINGS.maintenanceFees,
          MORTGAGE_SETTINGS.avgRate,
          MORTGAGE_SETTINGS.advanceRateMax
        );
        minEquityCapital = getFondsPropresMinPourRevenuAnnuel(maxAmount, MORTGAGE_SETTINGS.equityCapitalMinRate);
      }

      $maxAmountForIncomeInput.autoNumeric('set', maxAmount);
      $minEquityCapitalForIncomeInput.autoNumeric('set', minEquityCapital);
    }

    function updateRateInputs(firstRate, secondRate) {
      $rateInput.autoNumeric('set', firstRate);
    }

    function updateResults() {
      var amount = parseFloat($amountInput.autoNumeric('get'));
      var equityCapital = parseFloat($equityCapitalInput.autoNumeric('get'));
      var income = parseFloat($incomeInput.autoNumeric('get'));
      var firstRate = parseFloat($rateInput.autoNumeric('get'));
      var secondRate = parseFloat($rateSelect.find(':selected').data('second-rate'));

      if (!amount || isNaN(amount) || !equityCapital || isNaN(equityCapital) || !income || isNaN(income)) {
        resetResult();
        return;
      }

      // display the results
      $('.js-mortgage-results').removeClass('hidden');

      var amountWithFee = getPrixAchatAvecFraisNotaire(amount, MORTGAGE_SETTINGS.notaryRateFee);

      var firstLoan = getPretEnPremierRang(amount, amountWithFee, equityCapital, MORTGAGE_SETTINGS.firstRateMax);
      var secondLoan = getPretEnDeuxiemeRang(amount, amountWithFee, equityCapital, firstLoan, MORTGAGE_SETTINGS.advanceRateMax);
      var totalLoan = getFinancementHypothecaire(firstLoan, secondLoan);
      var firstInterestLoan = getInteretsEnPremierRang(firstLoan, firstRate/100.0);
      var secondInterestLoan = getInteretsEnDeuxiemeRang(secondLoan, secondRate/100.0);
      var firstAmortisation = getAmortissementEnPremierRang(firstLoan, MORTGAGE_SETTINGS.amortisationFirstRate);
      var secondAmortisation = getAmortissementEnDeuxiemeRang(secondLoan, MORTGAGE_SETTINGS.amortistationSecondRate);
      var maintenanceFee = MORTGAGE_SETTINGS.maintenanceFees;
      var monthlyLivingCost = getChargeMensuelle(firstInterestLoan, secondInterestLoan, firstAmortisation, secondAmortisation, maintenanceFee);
      var yearlyLivingCost = getChargeAnnuelle(firstInterestLoan, secondInterestLoan, firstAmortisation, secondAmortisation, maintenanceFee);

      var deptRate = getTauxEndettement(totalLoan, amount, 100);
      if (deptRate > 100) {
        deptRate = 100;
      }
      if (deptRate < 0) {
        deptRate = 0;
      }

      var deptRateOK = deptRate <= MORTGAGE_SETTINGS.advanceRateMax*100;

      var costRatio = getRapportChargesRevenus(
        firstLoan,
        MORTGAGE_SETTINGS.theoricalCostFirstRate,
        secondLoan,
        MORTGAGE_SETTINGS.theoricalCostSecondRate,
        maintenanceFee,
        income,
        100
      );

      if (costRatio > 100) {
        costRatio = 100;
      }
      if (costRatio < 0) {
        costRatio = 0;
      }

      var costRatioOK = costRatio <= MORTGAGE_SETTINGS.maxCost*100;

      $firstLoan = $('.js-first-loan');
      $secondLoan = $('.js-second-loan');
      $totalLoan = $('.js-total-loan');
      $firstInterestLoan = $('.js-interest-first-loan');
      $secondInterestLoan = $('.js-interest-second-loan');
      $firstRate = $('.js-first-rate');
      $secondRate = $('.js-second-rate');
      $firstAmortisation = $('.js-first-amortisation');
      $secondAmortisation = $('.js-second-amortisation');
      $maintenanceFee = $('.js-maintenance-fee');
      $monthlyLivingCost = $('.js-monthly-living-cost');
      $yearlyLivingCost = $('.js-yearly-living-cost');
      $loanVisualisation = $('.js-visualisation-loan');
      $costVisualisation = $('.js-visualisation-cost');

      $firstLoan.text(formatPrice(firstLoan));
      $secondLoan.text(formatPrice(secondLoan));
      $totalLoan.text(formatPrice(totalLoan));
      $firstInterestLoan.text(formatPrice(firstInterestLoan));
      $secondInterestLoan.text(formatPrice(secondInterestLoan));
      $firstRate.text(firstRate + '%');
      $secondRate.text(secondRate + '%');
      $firstAmortisation.text(formatPrice(firstAmortisation));
      $secondAmortisation.text(formatPrice(secondAmortisation));
      $maintenanceFee.text(formatPrice(maintenanceFee));
      $monthlyLivingCost.text(formatPrice(monthlyLivingCost));
      $yearlyLivingCost.text(formatPrice(yearlyLivingCost));

      $loanVisualisation
        .find('.progress-bar')
        .removeClass('progress-bar-warning progress-bar-success')
        .addClass(deptRateOK ? 'progress-bar-success' : 'progress-bar-warning')
        .attr('aria-valuenow', deptRate)
        .css('width', deptRate + '%')
        .text(deptRate + '%')
        .end()
        .find('.js-text-success, .js-text-warning')
        .addClass('hidden')
        .filter(deptRateOK ? '.js-text-success' : '.js-text-warning').removeClass('hidden')
      ;

      $costVisualisation
        .find('.progress-bar')
        .removeClass('progress-bar-warning progress-bar-success')
        .addClass(costRatioOK ? 'progress-bar-success' : 'progress-bar-warning')
        .attr('aria-valuenow', costRatio)
        .css('width', costRatio + '%')
        .text(costRatio + '%')
        .end()
        .find('.js-text-success, .js-text-warning')
        .addClass('hidden')
        .filter(costRatioOK ? '.js-text-success' : '.js-text-warning').removeClass('hidden')
      ;
    }

    function resetResult() {
      $('.js-first-loan').text('-');
      $('.js-second-loan').text('-');
      $('.js-total-loan').text('-');
      $('.js-interest-first-loan').text('');
      $('.js-interest-second-loan').text('');
      $('.js-first-rate').text('');
      $('.js-second-rate').text('');
      $('.js-first-amortisation').text('');
      $('.js-second-amortisation').text('');
      $('.js-maintenance-fee').text('');
      $('.js-monthly-living-cost').text('');
      $('.js-yearly-living-cost').text('');
    }
  });

  function formatPrice(price) {
    return price.formatMoney(2, '.', '\'') + ' CHF';
  }

  Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d === undefined ? '.' : d,
    t = t === undefined ? ',' : t,
    s = n < 0 ? '-' : '',
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
  };

})(jQuery, window.MORTGAGE_RATES, window.MORTGAGE_SETTINGS);
