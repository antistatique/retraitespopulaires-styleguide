define('theme-header', [
   'app'
], function(app) {
   'use strict';

   var themeHeader = app.register.directive('themeHeader', [function() {
      return {
         restrict: 'E',
         replace: true,
         scope: {
            text: '@',
            description: '@'
         },
         templateUrl: 'src/directives/theme-header/theme-header.html',
         controller: ['$scope', function($scope) {
         }]
      };
   }]);

   return themeHeader;
});
