/**
 * This is a temp file, we will add this in the styleguide later
 */
jQuery( document ).ready(function() {
  // To be sure that the format is respected (when back on browser)
  jQuery('.form-chf-numeric').autoNumeric('update');

  // Add slider to each div with slider class
  jQuery('.slider').each(function(index, element) {
    // Get the JQuery element and the input with the slider
    element = jQuery(element);
    var input = element.siblings('div').find('input');

    // Init slider for this element
    element.slider({
      orientation: 'horizontal',
      range: 'min',
      max: Number(element.attr('max')),
      min: Number(element.attr('min')),
      step: Number(element.attr('step')),
      value: input.autoNumeric('get'),
      animate: 100,
      // For update input
      slide: function (event, ui) {
        input.autoNumeric('set', ui.value);
      }
    });

    // Listen change event for update slider
    input.change(function() {
      element.slider('value', input.autoNumeric('get'));
    });
  });
});