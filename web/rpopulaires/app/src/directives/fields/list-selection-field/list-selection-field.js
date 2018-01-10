define('list-selection-field', [
   'app',
   'localization',
   'int'
], function(app) {
   'use strict';

   var listSelectionField = app.register.directive('listSelectionField', ['$timeout', function($timeout) {
      return {
         restrict: 'E',
         scope: {
            label: '@',
            ngModel: '=',
            onChange: '&',
            options: '=?',
            disabled: '=?',
            keyName: '@',
            descriptionsName: '@',
            descriptionName: '@',
            listId: '=?'
         },
         templateUrl: 'src/directives/fields/list-selection-field/list-selection-field.html',
         controller: ['$scope', 'localize', function($scope, localize) {
            if ($scope.listId) {
               $scope.fieldId = $scope.listId;
            }
            if ($scope.disabled === undefined) {
               $scope.disabled = false;
            }
            if (window.isIE9) {
               $scope.showSelect = false;
            }
            else {
               $scope.showSelect = true;
            }
            $scope.getOptionKey = function(option) {
               return option[$scope.keyName];
            };
            $scope.getDescription = function(option) {
               if ($scope.descriptionsName === undefined) {
                  return option[$scope.descriptionName];
               }
               else {
                  var descriptions = option[$scope.descriptionsName];
                  return localize.getTranslatedDescription(descriptions);
               }
            };
         }],
         compile: function(element, attrs) {
            return function(scope, element, attrs) {
               // adds an id based on the ngModel attribute, for easier identification from tests
               if (scope.fieldId === undefined) {
                  scope.fieldId = attrs.ngModel.replace(/\./g, '_');
               }

               //Watch our local model and call the onChange function
               scope.$watch(function() {
                  return scope.ngModel;
               }, function(newValue, oldValue) {
                  if (newValue !== oldValue) {
                     if (scope.editing) {
                        scope.onChange();
                     }
                  }
               });

               var field = $(element).find("select");
               field.on('focus', function() {
                  scope.editing = true;
               });

               field.on('blur', function() {
                  scope.editing = false;
               });

               if (window.isIE9) {
                  var select = $(element).find('select');
                  $timeout(function() {
                     scope.showSelect = true;
                     select[0].style.width = "99.9%";
                     $timeout(function() {
                        select[0].style.width = "100%";
                     });
                  });
               }
            };
         }
      };
   }]);

   return listSelectionField;
});
