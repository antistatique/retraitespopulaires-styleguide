define('contact-service', [
   'angular',
   'logger',
   'parameters-manager',
   'localization'
], function(angular, Logger, parametersManager) {
   'use strict';

   var log = Logger.get('contactService');
   var asynchLog = Logger.get('AsynchronousModeProfile');

   var contactServiceModule = angular.module('contactServiceModule', []);

   contactServiceModule.factory('contactService', ['$http', '$q', 'storageService', 'localize',
      function($http, $q, storageService, localize) {
         var contactService = {
            getServiceURL: function() {
               return parametersManager.baseApplicationParameters.contactServiceURL + '/' +
                      parametersManager.baseApplicationParameters.contactCustomization;
            },
            
            contact: function(email, onlineCalc) {
               var location = window.location.origin.toString() + window.location.pathname.toString();
               var emailContactObject = {};
               emailContactObject = {
                  from : '',
                  to : parametersManager.baseApplicationParameters.toEmail,
                  cc : [],
                  bcc : [],
                  subject :  email.subject,
                  message :  (email.message === null ? ' ' : email.message.replace(/\n/g, "<br>")),
                  mimeType : email.mimeType,
                  language : email.language,
                  country  : email.country,
                  messageVars: [
                     "salutation::"       + (email.salutation === null ? ' ' : email.salutation),
                     "firstName::"        + (email.firstName === null ? ' ' : email.firstName),
                     "lastName::"         + (email.lastName === null ? ' ' : email.lastName),
                     "street::"           + (email.street === null ? ' ' : email.street),
                     "zipCode::"          + (email.zipCode === null ? ' ' : email.zipCode),
                     "place::"            + (email.place === null ? ' ' : email.place),
                     "birthDate::"        + (email.birthDate === null ? ' ' : email.birthDate),
                     "children::"         + (email.children === null ? ' ' : email.children),
                     "themes::"           + (email.themes === null ? ' ' : email.themes),
                     "contactedBy::"      + (email.contactedBy === null ? ' ' : email.contactedBy),
                     "contact::"          + (email.contact === null ? ' ' : email.contact),
                     "regularCustomer::"  + (email.regularCustomer === null ? ' ' : email.regularCustomer),
                     "customization::"    + parametersManager.baseApplicationParameters.contactCustomization,
                     "applicationtitel::" + localize.getLocalizedString('Application.Title'),
                     "applicationurl::"   + "<a href=" + location + ">" + location + "</a>"
                  ]
               };
               var that = this;
               if (email.attachData) {
                  return storageService.storeAnonymousDossier(onlineCalc).then(function(dossierId) {
                     emailContactObject.messageVars.push("url:: <a href=" + email.url + "?dossierId=" + dossierId + ">" + email.url + "?dossierId=" + dossierId + "</a>");
                     return that.sendEmail(emailContactObject);
                  });
               }
               else {
                  emailContactObject.messageVars.push("url:: ");
                  return this.sendEmail(emailContactObject);
               }
            },
            
            sendEmail: function(email) {
               var deferred = $q.defer();

               var url = this.getServiceURL() + "/sendEmail";
               
                     
               $http({
                  timeout: parametersManager.baseApplicationParameters.contactTimeout,
                  method: 'POST',
                  url: url,
                  responseType: 'json',
                  cache: false,
                  headers: {
                     'Content-Type': 'application/json; charset=utf-8'
                  },
                  data: {
                     userDataObject: {userId: "Test"},
                     emailObject: email
                  }
               }).success(function(data, status, headers, config) {
                  deferred.resolve({status: ContactServiceResultStatus.OK});
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;

                  if (status === 401) {
                     resultStatus = ContactServiceResultStatus.UNAUTHORIZED;
                  }
                  else {
                     resultStatus = ContactServiceResultStatus.SERVERERROR;
                  }

                  deferred.reject({status: resultStatus});
               });

               return deferred.promise;
            }
         };

         return contactService;
      }
   ]);

   return contactServiceModule;
});
