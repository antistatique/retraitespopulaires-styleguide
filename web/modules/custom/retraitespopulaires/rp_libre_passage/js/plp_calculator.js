(function ($) {
  'use strict';

  // on domReady
  $(function () {
    var $PLPCalculatorForm = $('#rp-libre-passage-plp-calculator-form');

    // Form not found, skip everything
    if (!$PLPCalculatorForm.size()) {
      return;
    }

    // /////////////////////////////////////////////////////////////////////////////////////
    // vars

    var $civilStateInput = $('#edit-civil-state');
    var $civilStatusInputs = $('#edit-civil-status input');
    var $percentInput = $('#edit-percent');
    var $ageInput = $('#edit-age');

    // /////////////////////////////////////////////////////////////////////////////////////
    // binding

    $civilStatusInputs.bind('change', function (e) {
      var $this = $(this);

      switch ($this.val()) {
        case 'Oui':
          $percentInput.removeAttr('readonly');
          $percentInput.removeAttr('disabled');
          $percentInput.parents('.form-group').removeClass('readonly');
          break;
        case 'Non':
          $percentInput.attr('readonly');
          $percentInput.attr('disabled', 'disabled');
          $percentInput.parents('.form-group').addClass('readonly');
          break;
      }
    });
    // $civilStatusInputs.change();

    $civilStateInput.bind('change', function (e) {
      var $this = $(this);

      // Remove all item of ageInput
      $ageInput.find('option').remove();
      $ageInput.removeAttr('readonly');
      $ageInput.removeAttr('disabled');
      $ageInput.parents('.form-group').removeClass('readonly');

      var data = [];
      switch ($this.val()) {
        // Set according avaialble age
        case 'Madame':
          if (drupalSettings.age_women.length > 0) {
            data = drupalSettings.age_women;
          }
          break;
          // Set according avaialble age
        case 'Monsieur':
          if (drupalSettings.age_men.length > 0) {
            data = drupalSettings.age_men;
          }
          break;
      }

      // Add elements to select
      for (var key in data) {
          var obj = data[key];
           $ageInput.append($('<option></option>')
             .attr('value', obj.value)
             .text(obj.value + '%')
           );
      }
    });
    // $civilStateInput.change();

  });
})(jQuery);
