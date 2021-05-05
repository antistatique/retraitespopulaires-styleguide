import $ from 'jquery';

export function datepicker () {
  const options = {
    language: 'fr',
    format: 'dd/mm/yyyy',
    showOnFocus: false,
    todayHighlight: true,
  };

  $('.datepicker').datepicker(options);

  $('.datepicker + .input-group-btn').on('click', 'button', function() {
    $(this).parents('.form-group').find('.datepicker').datepicker('show');
  })

  $('.datepicker').on('blur',function(){
    $(this).val($(this).val().replace(/[^\d]/g,"/"));
  })
}
