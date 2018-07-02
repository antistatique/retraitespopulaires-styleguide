(function ($) {
  'use strict';

  // on domReady
  $(function () {
    var $depreciationForm = $('#rp-contact-depreciation-form');

    // Form not found, skip everything
    if (!$depreciationForm.length) {
      return;
    }

    // /////////////////////////////////////////////////////////////////////////////////////
    // vars

    var $titleInputs = $('#edit-title input');
    var $firstnameInput = $('#edit-firstname');
    var $lastnameInput = $('#edit-lastname');
    var $companyInput = $('#edit-company');

    // /////////////////////////////////////////////////////////////////////////////////////
    // binding

    $titleInputs.bind('change', function (e) {
      var $this = $(this);
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
