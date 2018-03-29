jQuery(document).ready(function () {
  var npaElement = jQuery('.form-npa');
  var url = npaElement.attr('url');
  var authToken = npaElement.attr('authToken');
  npaElement.change(function(event) {
    element = jQuery(event.target);

    searchLocation(element.val(), function (data){
      if (data.response.length>0) {
        var firstResult = data.response[0].zip + " " + data.response[0].city;
        element.val(firstResult);
      }
    });
  });


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
          // 0 is for language (0=all, 1=german, 2=ital., 3=french and 756 is for country (0=all, 756=CH, 438=LI)
          'params': [ search, 0, 756 ]
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
