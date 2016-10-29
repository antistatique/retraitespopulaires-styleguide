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
      var amount = parseFloat($(this).val());
      updateAmountInputs(amount);
    });

    $equityCapitalInput.bind('keyup change', function(e) {
      var equityCapital = parseFloat($(this).val());
      updateEquityCapitalInputs(equityCapital);
    });

    $incomeInput.bind('keyup change', function(e) {
      var income = parseFloat($(this).val());
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

    updateAmountInputs(parseFloat($amountInput.val()));
    updateEquityCapitalInputs(parseFloat($equityCapitalInput.val()));
    updateIncomeInputs(parseFloat($incomeInput.val()));
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

      $amountWithFeeInput.val(amountWithFee);
      $minimalIncomeForAmountInput.val(minimalIncome);
      $minimalEquityCapitalForAmount.val(minimalEquityCapital);
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

      $maxAmountForEquityCapitalInput.val(maxAmount);
      $minimalIncomeForEquityCapitalInput.val(minIncome);
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

      $maxAmountForIncomeInput.val(maxAmount);
      $minEquityCapitalForIncomeInput.val(minEquityCapital);
    }

    function updateRateInputs(firstRate, secondRate) {
      $rateInput.val(firstRate);
    }

    function updateResults() {
      var amount = parseFloat($amountInput.val());
      var equityCapital = parseFloat($equityCapitalInput.val());
      var income = parseFloat($incomeInput.val());
      var firstRate = parseFloat($rateInput.val());
      var secondRate = parseFloat($rateSelect.find(':selected').data('second-rate'));

      if (!amount || isNaN(amount) || !equityCapital || isNaN(equityCapital) || !income || isNaN(income)) {
        resetResult();
        return;
      }

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
      $monthlyLivingCost.text(monthlyLivingCost);
      $yearlyLivingCost.text(yearlyLivingCost);
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
    return price;
  }

})(jQuery, window.MORTGAGE_RATES, window.MORTGAGE_SETTINGS);
