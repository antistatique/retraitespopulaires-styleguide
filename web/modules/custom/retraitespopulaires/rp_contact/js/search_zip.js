(function ($) {
  'use strict';

  // on domReady
  $(function () {
    let $searchZipForm = $('form.js-search-zip');

    // Form not found, skip everything
    if (!$searchZipForm.length) {
      return;
    }

    // /////////////////////////////////////////////////////////////////////////////////////
    // vars

    let $zipResults = $searchZipForm.find('.js-zip-results');
    let $zipResultsList = $searchZipForm.find('.js-zip-results-list');
    let $zipResultsLoader = $zipResults.find('.js-zip-loader');
    let $zipInput = $searchZipForm.find('.js-zip-input');

    // /////////////////////////////////////////////////////////////////////////////////////
    // Binding

    $searchZipForm.bind('submit', function (e) {
      e.preventDefault();
      searchZip();
    });

    // /////////////////////////////////////////////////////////////////////////////////////
    // functions

    function searchZip() {
      let zip = parseInt($zipInput.val());

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
