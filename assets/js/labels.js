import $ from 'jquery';

export function labels () {
  $('.list-inline').on('click', '.js-toggle-labels', function() {
    console.log($(this));
    $(this).toggleClass('collapsed').parents('.list-inline').find('.hidden').toggleClass('hidden');
  });
}
