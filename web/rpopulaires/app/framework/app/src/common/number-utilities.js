define('common-number-utilities', [
], function () {
   'use strict';

   var NumberUtilities = function () {
      // Number #isInteger IS NOT supported by IE before 12
      this.isInteger = function(value) {
         try {
            return typeof value === 'number' && value === parseInt(value);
         }
         catch (e) {
            // nop
         }
         return false;
      };
   };
   return new NumberUtilities();
});
