(function ($) {
  'use strict';

  // on domReady
  $(function () {
    var $searchZipForm = $('form.js-search-zip');

    // Form not found, skip everything
    if (!$searchZipForm.length) {
      return;
    }

    // /////////////////////////////////////////////////////////////////////////////////////
    // vars

    var $zipResults = $searchZipForm.find('.js-zip-results');
    var $zipResultsList = $searchZipForm.find('.js-zip-results-list');
    var $zipResultsLoader = $zipResults.find('.js-zip-loader');
    var $zipInput = $searchZipForm.find('.js-zip-input');

    // /////////////////////////////////////////////////////////////////////////////////////
    // Binding

    $searchZipForm.bind('submit', function (e) {
      e.preventDefault();
      searchZip();
    });

    // /////////////////////////////////////////////////////////////////////////////////////
    // functions

    function searchZip() {
      var zip = parseInt($zipInput.val());

      if (!zip || isNaN(zip)) {
        return;
      }

      // Clean the results
      $zipResultsList.html('');
      $zipResultsLoader.toggleClass('hidden');

      $.ajax({
        url: $searchZipForm.attr('data-ajax') + '/' + zip,
        data : {'theme': $searchZipForm.attr('data-theme')}
      }).done(function (html) {
        // display the results
        $zipResultsList.html('');
        $zipResultsLoader.toggleClass('hidden');
        $zipResultsList.html(html);
      });
    }
  });
})(jQuery);
