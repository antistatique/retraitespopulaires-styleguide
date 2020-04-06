import $ from 'jquery';

export function popover () {
 // $('[data-toggle="popover"]').popover();
  $('[data-toggle="popover"]').popover({ trigger: 'hover' }); //For optional on hover
}
