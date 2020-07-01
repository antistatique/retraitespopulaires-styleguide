import $ from 'jquery';

export function number_format () {
  $('.form-chf-numeric').autoNumeric('init',{
    aSep: '\'',
    pSign: 's',
    aSign: ' CHF'
  });

  $('.form-surface-numeric').autoNumeric('init',{
    aSep: '\'',
    mDec: '0',
    pSign: 's',
    aSign: ' m2'
  });

  $('.form-year-numeric').autoNumeric('init',{
    aSep: '\'',
    mDec: '0',
    pSign: 's',
    aSign: ' Ans'
  });

  $('.form-percent-numeric').autoNumeric('init',{
    aSep: '\'',
    pSign: 's',
    aSign: ' %'
  });

  // To be sure that the format is respected (when back on browser)
  $('.form-chf-numeric').autoNumeric('update');
  $('.form-surface-numeric').autoNumeric('update');
  $('.form-year-numeric').autoNumeric('update');
  $('.form-percent-numeric').autoNumeric('update');

  // Replace formatted value to raw one when submitting forms
  $(document).on('submit', 'form', function() {
    const $this = $(this);

    $this.find('.form-chf-numeric').each(function(i, el){
      const $el = $(el);
      $el.val($el.autoNumeric('get'));
    });

    $this.find('.form-surface-numeric').each(function(i, el){
      const $el = $(el);
      $el.val($el.autoNumeric('get'));
    });

    $this.find('.form-year-numeric').each(function(i, el){
      const $el = $(el);
      $el.val($el.autoNumeric('get'));
    });

    $this.find('.form-percent-numeric').each(function(i, el){
      const $el = $(el);
      $el.val($el.autoNumeric('get'));
    });
  });
}
