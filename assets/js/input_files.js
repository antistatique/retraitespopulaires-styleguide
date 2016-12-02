import $ from 'jquery';

export function input_files () {

  $('.form-file').each(function() {
    const $label  = $(this).find('label'),
          labelVal = $label.text(),
          $handler = $(this).find('.form-file-handler'),
          $this = $(this);

    $this.on('change', function(e) {
      let fileName = '';
      if( this.files && this.files.length > 1 ) {
        fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
      }
      else {
        fileName = e.target.value.split( '\\' ).pop();
      }

      if( fileName ) {
        $('<small><i class="retraitespopulaires-icon retraitespopulaires-icon-documents-thick" aria-hidden="true"></i> <span>' +fileName +'</span></small>').insertAfter($handler);
      }
      else {
        $label.text(labelVal);
      }
    });
  });

}
