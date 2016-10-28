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
        amountWithFee = getPrixAchatAvecFra isNotaire(amount, MORTGAGE_SETTINGS.notaryRateFee);
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
  });

})(jQuery, window.MORTGAGE_RATES, window.MORTGAGE_SETTINGS);
