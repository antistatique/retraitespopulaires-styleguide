define('label-field', [
   'app',
   'float',
   'jquery-ui-touch-punch',
   'jquery-ui'
], function(app) {
   'use strict';

   var labelfield = app.register.directive('labelfield', [function() {
      return {
         restrict: 'E',
         scope: {
            label: '@',
            isEditable: '=?',
            id: '@',
            onEdit: '&'
         },
         templateUrl: 'src/directives/fields/label-field/label-field.html'
      };
   }]);

   return labelfield;
});
