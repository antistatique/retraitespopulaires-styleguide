define('password-field', [
   'app',
   'model-constants'
], function(app) {
   'use strict';

   var field = app.register.directive('passwordfield', ['localize', function(localize) {
      return {
         restrict: 'E',
         require: '?ngModel', // get a hold of NgModelController
         scope: {
            label: '@',
            showLabel: '@',
            evaluatePassword: '&',
            ngModel: '=',
            placeholder: '@',
            id: '@'
         },
         templateUrl: 'src/directives/fields/password-field/password-field.html',
         compile: function(element, attrs) {
            return {
               pre: function preLink(scope, element, attrs, controller) {
                  scope.passwordStatusMessage = "";
   
                  if (scope.id !== undefined && scope.id.length > 0) {
                     scope.fieldId = scope.id.replace(/\./g, '_');
                  }
                  else {
                     // adds an id based on the ngModel attribute, for easier identification from tests
                     scope.fieldId = attrs.ngModel.replace(/\./g, '_');
                  }
                  scope.isInvalid = function() {
                     return scope.score === PasswordStrength.INVALID;
                  };
                  scope.isWeak = function() {
                     return scope.score === PasswordStrength.WEAK;
                  };
                  scope.isMedium = function() {
                     return scope.score === PasswordStrength.MEDIUM;
                  };
                  scope.isStrong = function() {
                     return scope.score === PasswordStrength.STRONG;
                  };

                  scope.showPasswordStatusMessage = function() {
                     return scope.score !== PasswordStrength.UNDEFINED;
                  };
                  scope.getPasswordStatusMessage = function() {
                     if (scope.ngModel.length === 0) {
                        return localize.getLocalizedString('register.EmptyPassword');
                     }
                     if (scope.score === PasswordStrength.MEDIUM) {
                        return localize.getLocalizedString('register.MediumPassword');
                     }
                     if (scope.score === PasswordStrength.STRONG) {
                        return localize.getLocalizedString('register.StrongPassword');
                     }
                     return localize.getLocalizedString('register.WeakPassword');
                  };

                  scope.$watch('ngModel', function(val, old) {
                     scope.score = scope.evaluatePassword({password: val});
                     if (scope.score === undefined) {
                        scope.score = PasswordStrength.UNDEFINED;
                     }
                  });
               }
            };
         }
      };
   }]);

   return field;
});


