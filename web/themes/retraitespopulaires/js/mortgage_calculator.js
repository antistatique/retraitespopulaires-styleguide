;(function($, MORTGAGE_RATES, MORTGAGE_SETTINGS) {
  console.log('Calculator');
  console.log(MORTGAGE_RATES);
  console.log(MORTGAGE_SETTINGS);

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
    $minimalIncomeForEquityCapitalInput = $('.js-minimal-income-for-equity-capital'),
    $incomeInput = $('.js-income-input'),
    $maxAmountForIncomeInput = $('.js-max-amount-for-income'),
    $minEquityCapitalForIncomeInput = $('.js-min-equity-capital-for-income'),
    $rateSelect = $('.js-rate-name'),
    $rateInput = $('.js-rate')
    ;
  
})(jQuery, window.MORTGAGE_RATES, window.MORTGAGE_SETTINGS);
