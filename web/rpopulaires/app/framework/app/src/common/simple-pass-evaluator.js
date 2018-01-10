define('common-simple-pass-evaluator', 
   ['model-constants'],
function() {
   'use strict';

   var SimplePasswordEvaluator = function (minLength) {
      this.minLength = minLength;
   };
   SimplePasswordEvaluator.prototype.check = function(password) {
         if (!password || password.length < this.minLength) {
            return PasswordStrength.INVALID;
         }      
         /*var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).*$", "g");
         var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
         var enoughRegex = new RegExp("(?=.{6,}).*", "g");*/
         var strongRegex = new RegExp("^(?=.{" + (this.minLength + 2).toString() + ",})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
         var mediumRegex = new RegExp("^(?=.{" + (this.minLength + 1).toString() + ",})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
         var enoughRegex = new RegExp("(?=.{" + this.minLength.toString() + ",}).*", "g");
         
         if (strongRegex.test(password)) {
            return PasswordStrength.STRONG;
         }
         if (mediumRegex.test(password)) {
            return PasswordStrength.MEDIUM;
         }
         if (enoughRegex.test(password)) {
            return PasswordStrength.WEAK;
         }
         return PasswordStrength.INVALID;
      };

   return SimplePasswordEvaluator;
});
