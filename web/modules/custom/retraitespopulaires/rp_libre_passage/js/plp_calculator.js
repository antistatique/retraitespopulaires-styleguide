(function ($) {
  'use strict';

  // on domReady
  $(function () {
    let $PLPCalculatorForm = $('#rp-libre-passage-plp-calculator-form');

    // Form not found, skip everything
    if (!$PLPCalculatorForm.length) {
      return;
    }

    // /////////////////////////////////////////////////////////////////////////////////////
    // vars

    let $civilStateInput = $('#edit-civil-state');
    let $civilStatusInputs = $('#edit-civil-status input');
    let $percentInput = $('#edit-percent');
    let $ageInput = $('#edit-age');

    // /////////////////////////////////////////////////////////////////////////////////////
    // binding

    $civilStatusInputs.bind('change', function (e) {
      let $this = $(this);
      console.log($this);

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
    $civilStatusInputs.each(function() {
      let $this = $(this);
      if ($this.is(':checked')) {
        $this.change();
      }
    });

    $civilStateInput.bind('change', function (e) {
      let $this = $(this);

      // Remove all item of ageInput
      $ageInput.find('option').remove();
      $ageInput.removeAttr('readonly');
      $ageInput.removeAttr('disabled');
      $ageInput.parents('.form-group').removeClass('readonly');

      let data = [];
      switch ($this.val()) {
        // Set according avaialble age
        case 'woman':
          if (drupalSettings.age_women.length > 0) {
            data = drupalSettings.age_women;
          }
          break;
          // Set according avaialble age
        case 'man':
          if (drupalSettings.age_men.length > 0) {
            data = drupalSettings.age_men;
          }
          break;
      }

      // Add elements to select
      for (let key in data) {
        let obj = data[key];
        $ageInput.append($('<option></option>')
          .attr('value', obj.value)
          .text(obj.value)
        );
      }
    });
    $civilStateInput.change();

  });
})(jQuery);
