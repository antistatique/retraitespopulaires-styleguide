/**
 * JS for NPA field with Logismata API
 */
jQuery(document).ready(function () {
  // Get all npa field on the page
  let npaFieldElements = jQuery('.form-npa');

  // Get the url and the token for logismata
  let url = npaFieldElements.data('url');
  let authToken = npaFieldElements.data('authtoken');

  // Current selected npa field
  let currentSelectedFieldElement = null;

  // On click for location dropdown on the page (dynamic with create later)
  jQuery(document).on('click', '.location-dropdown li', function (event) {
    // Change field value and remove list
    let target = jQuery(event.target);
    currentSelectedFieldElement.val(target.text());
    target.parent().remove();
  });

  // Changed selected element when mouse is over
  jQuery(document).on('mouseover', '.location-dropdown li', function (event) {
    jQuery('.location-dropdown li.selected').removeClass('selected');
    jQuery(event.target).addClass('selected');
  });

  // On focus and input show list
  npaFieldElements.on('focus input', function(event) {
    // Remove last location dropdown and save the current target element
    jQuery('.location-dropdown').remove();
    currentSelectedFieldElement = jQuery(event.target);

    // Get the new location from logismata
    searchLocation(currentSelectedFieldElement.val(), function(data){
      // Show the list only if this is needed
      if (data.response.length > 0) {
        currentSelectedFieldElement.after('<ul class="location-dropdown"></ul>');
        let locationDropdown = jQuery('.location-dropdown');

        // Add each location
        for (let i = 0; i < data.response.length; i++) {
          let location = data.response[i];
          locationDropdown.append('<li'+ (i === 0 ? ' class="selected"': '') +'>' + location.zip + ' ' + location.city + '</li>')
        }
      }
    });
  });

  // To navigate in dropdown menu
  npaFieldElements.on('keydown', function (key) {
    let currentSelectedLocation = jQuery('.location-dropdown li.selected');
    if (currentSelectedLocation.length > 0) {
      switch (key.keyCode) {
          // If arrow up or down
        case 38:
        case 40:
          event.preventDefault();
          let newSelectedLocation = null;
          let newSelectedPosition = null;
          // If arrow up
          if (key.keyCode === 38) {
            // If first element go to last or if not go to prev
            newSelectedLocation = currentSelectedLocation.is(':first-child') ? currentSelectedLocation.siblings(':last-child') : currentSelectedLocation.prev();
            // Calculate the new position (.siblings(':first-child') don't work when on first child, that's why .parent().children(':first-child'))
            newSelectedPosition = newSelectedLocation.position().top - newSelectedLocation.parent().children(':first-child').position().top;
          }
          // If arrow down
          else {
            // If last element go to first or if not go to next
            newSelectedLocation = currentSelectedLocation.is(':last-child') ? currentSelectedLocation.siblings(':first-child') : currentSelectedLocation.next();
            // Calculate the new position (.siblings(':first-child') don't work when on first child, that's why .parent().children(':first-child'))
            newSelectedPosition = newSelectedLocation.position().top - newSelectedLocation.parent().children(':first-child').position().top - newSelectedLocation.parent().height() + newSelectedLocation.outerHeight();
          }
          // Change the selected item
          currentSelectedLocation.removeClass('selected');
          newSelectedLocation.addClass('selected');

          // Scroll to new selected if needed
          if (newSelectedLocation.position().top <= 0 || newSelectedLocation.position().top + newSelectedLocation.height() >= newSelectedLocation.parent().height()) {
            newSelectedLocation.parent().animate({scrollTop: newSelectedPosition}, 0);
          }
          break;

        case 13:
          // Simulate a click on the element
          currentSelectedLocation.click();
          break;
      }
    }
  });

  // Remove the list when the field is no more focused
  npaFieldElements.focusout(function(){
    // Don't hide dropdown if mouse is hover
    if (jQuery('.location-dropdown li:hover').length === 0) {
      jQuery('.location-dropdown').remove();
    }
  });

  // Get location
  function searchLocation(search, callback){
    jQuery.ajax({
      url: url,
      type: 'PUT',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        'authToken': authToken,
        request: {
          'method': 'searchLocations',
          // 2 is for default language (0=all, 1=german, 2=french, 3=italian) and 756 is for country (0=all, 756=CH, 438=LI)
          'params': [ search, 2, 756 ]
        }
      }),
      success: function (data) {
        callback(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error:" + jqXHR.status + " - " + errorThrown);
      }
    });
  }
});
