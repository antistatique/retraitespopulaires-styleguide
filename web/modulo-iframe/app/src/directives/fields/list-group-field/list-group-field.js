define('list-group-field', [
   'app',
   'localization',
   'int'
], function(app) {
   'use strict';

   var selectionfield = app.register.directive('listgroup', [function() {
      return {
         restrict: 'E',
         scope: {
            ngModel: '=',
            selectedItems: '=',
            showItem: '=?',
            label: '@'
         },
         templateUrl: 'src/directives/fields/list-group-field/list-group-field.html',
         controller: ['$scope', 'localize', function($scope, localize) {
               $scope.arrayMode = ($scope.selectedItems instanceof Array);
               // if arrayMode = true then user can select more than one item.

               $scope.itemSelected = function(item, $event) {

                 if (!$scope.arrayMode) {
                    $($event.target).parent().children().removeClass("active");
                    if ($scope.selectedItems === item) {
                       $scope.selectedItems = null;
                       $($event.target).removeClass("active");
                    }
                    else {
                       $scope.selectedItems = item;
                       $($event.target).addClass("active");
                    }
                 }
                 else {
                     var index = $scope.selectedItems.indexOf(item) ;
                     if (index >= 0) {
                        $scope.selectedItems.splice(index, 1);
                        $($event.target).removeClass("active");
                     }
                     else {
                        $scope.selectedItems.push(item);
                        $($event.target).addClass("active");
                     }
                 }
               };
         }],
         compile: function(element, attrs) {

            return function(scope, element, attrs) {
               scope.fieldId = attrs.ngModel.replace(/\./g, '_');
            };
         }
      };
   }]);

   return selectionfield;
});
