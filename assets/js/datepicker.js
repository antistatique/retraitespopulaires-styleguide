import $ from 'jquery';

export function datepicker () {
  $('.datepicker').datepicker({
    language: 'fr',
    format: 'dd/mm/yyyy',
  });
}
