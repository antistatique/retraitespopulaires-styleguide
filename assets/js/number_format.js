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
}
