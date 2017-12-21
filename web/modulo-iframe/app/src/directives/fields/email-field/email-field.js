define('email-field', [
   'app'
], function(app) {
   'use strict';

   var field = app.register.directive('emailfield', [function() {
      return {
         restrict: 'E',
         require: '?ngModel', // get a hold of NgModelController
         scope: {
            label: '@',
            showLabel: '@',
            ngModel: '=',
            isRequired: '@',
            placeholder: '@'
         },
         templateUrl: 'src/directives/fields/email-field/email-field.html',
         compile: function(element, attrs) {
            return {
               pre: function preLink(scope, element, attrs, controller) {
                  scope.fieldId = attrs.ngModel.replace(/\./g, '_');
                  scope.emailModel = scope.ngModel;
                  scope.isValid = function() {
                     return scope.emailModel !== '' && scope.$eval(scope.fieldId + 'Form').$valid;
                  };
                  scope.$watch('emailModel', function(newValue, oldValue) {
                     if (newValue !== oldValue) {
                        if (scope.isValid()) {
                           scope.$eval('ngModel = emailModel');
                        }
                        else {
                           scope.$eval('ngModel = null');
                        }
                     }
                  });
                  scope.$watch('ngModel', function(newValue, oldValue) {
                     if (newValue !== oldValue && scope.isValid()) {
                        scope.emailModel = newValue;
                     }
                  });

               }
            };
         }
      };
   }]);

   return field;
});


