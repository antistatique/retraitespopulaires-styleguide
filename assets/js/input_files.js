import $ from 'jquery';

export function input_files () {

  $('.form-file').each(function() {
    const $handler = $(this).find('.form-file-handler'),
          $this = $(this),
          $input = $(this).find('[type="file"]');

    $this.on('change', function() {
      let files = $input[0].files;
      let $files = $(this).find('.files');
      if ($files.length == 0) {
        $('<div class="files"></div>').insertAfter($handler);
        $files = $(this).find('.files');
      } else {
        // Clean the list
        $files.html('');
      }

      if( files.length == 1 ) {
        $files.html('<small><i class="retraitespopulaires-icon retraitespopulaires-icon-documents-thick" aria-hidden="true"></i> <span>' +files[0].name +'</span></small>');
      }
      else {
        for (let x = 0; x < files.length; x++) {
          $files.append('<small><i class="retraitespopulaires-icon retraitespopulaires-icon-documents-thick" aria-hidden="true"></i> <span>' +files[x].name+'</span></small>');
        }
      }
    });
  });
}
