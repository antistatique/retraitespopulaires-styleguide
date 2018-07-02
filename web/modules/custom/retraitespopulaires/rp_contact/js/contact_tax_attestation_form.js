(function ($) {
  'use strict';

  // on domReady
  $(function () {
    let $taxAttestationForm = $('#rp-contact-tax-attestation-form');

    // Form not found, skip everything
    if (!$taxAttestationForm.length) {
      return;
    }

    // /////////////////////////////////////////////////////////////////////////////////////
    // vars

    let $titleInputs = $('#edit-title input');
    let $firstnameInput = $('#edit-firstname');
    let $lastnameInput = $('#edit-lastname');
    let $companyInput = $('#edit-company');

    // /////////////////////////////////////////////////////////////////////////////////////
    // binding

    $titleInputs.bind('change', function (e) {
      let $this = $(this);
      switch ($this.val()) {
        case 'Madame':
        case 'Monsieur':
          $firstnameInput.removeAttr('readonly');
          $firstnameInput.parents('.form-group').removeClass('readonly');
          $lastnameInput.removeAttr('readonly');
          $lastnameInput.parents('.form-group').removeClass('readonly');
          $companyInput.attr('readonly', 'readonly');
          $companyInput.parents('.form-group').addClass('readonly');
          break;
        case 'Société':
          $firstnameInput.attr('readonly', 'readonly');
          $firstnameInput.parents('.form-group').addClass('readonly');
          $lastnameInput.attr('readonly', 'readonly');
          $lastnameInput.parents('.form-group').addClass('readonly');
          $companyInput.removeAttr('readonly');
          $companyInput.parents('.form-group').removeClass('readonly');
          break;
      }

    });
  });
})(jQuery);
