jQuery(document).ready(function(){
  // Save to cookie when collapse change
  jQuery('.category-collapse').click(function(event){
    let target = jQuery(event.currentTarget);
    jQuery.cookie('rp_quickwin_category_' + target.data('categoryId'), (target.hasClass('collapsed') ? 'expand' : 'collapse'), { expires: 0.1 });
  });

  // Open needed collapse
  jQuery('.category-collapse').each(function (index, element) {
    element = jQuery(element);
    if (jQuery.cookie('rp_quickwin_category_'+ element.data('categoryId')) && jQuery.cookie('rp_quickwin_category_'+ element.data('categoryId')) === 'expand'){
      element.click();
    }
  });
});
