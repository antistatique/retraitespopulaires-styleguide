define('detail-utils', [],
   function() {
   var utils = {};
   utils.summarizeAmountsFromArray = function(arr, skipArray) {
      if (!arr) {
         return 0;
      }
      var sum = 0;
      for (var i = 0; i < arr.length; i++) {
         if (!skipArray || skipArray.indexOf(i) === -1) {
            sum += arr[i].value;
         }
      }
      return sum;
   };
   
   utils.itemHasPlaceholder = function(option) {
      return option.descriptionPlaceholderKey !== undefined || option.descriptionPlaceholderTexts !== undefined;
   };
   
   utils.getItemPlaceholder = function(option, enumName, localize) {
      if (!this.itemHasPlaceholder(option)) {
         return '';
      }
      
      if (option.descriptionPlaceholderTexts !== undefined) {
         return localize.getTranslatedDescription(option.descriptionPlaceholderTexts);
      }
      
      if (option.descriptionPlaceholderKey !== undefined) {
         return localize.getLocalizedString(enumName + '.' + option.descriptionPlaceholderKey);
      }
   };
      
   utils.isItemLabeled = function(option) {
      return option.labelKey !== undefined || option.labelTexts !== undefined;
   };
   
   utils.getItemLabel = function(option, enumName, localize) {
      if (!this.isItemLabeled(option)) {
         return '';
      }
      
      if (option.labelTexts !== undefined) {
         return localize.getTranslatedDescription(option.labelTexts);
      }
      
      if (option.labelKey !== undefined) {
         return localize.getLocalizedString(enumName + '.' + option.labelKey);
      }
   };
   
   utils.updateDetail = function (originDetails, targetDetails) {
      targetDetails.forEach(function(targetDetail) {
         originDetails.forEach(function(originDetail) {
            if (targetDetail.id === originDetail.id) {
               targetDetail.value = originDetail.value;
               if (originDetail.description) {
                  targetDetail.description = originDetail.description;
               }
            }
         });
      });
      return targetDetails;
   };
   
   return utils;
});

