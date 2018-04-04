jQuery(document).ready(function(){
  jQuery('.category-collapse').click(function(event){
    var target = jQuery(event.currentTarget);
    jQuery.ajax({
      url: '/rp_quickwin/' + (target.hasClass('collapsed') ? 'expand' : 'collapse') + '/' + target.attr('category-id'),
      method: 'GET',
      dataType: 'json'
    });
  });
});