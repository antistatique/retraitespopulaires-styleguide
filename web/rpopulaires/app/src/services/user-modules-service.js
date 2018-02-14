define('user-modules-service', [
   'angular',
   'logger',
   'parameters-manager'
], function(angular, Logger, parametersManager) {
   'use strict';
   
   var log = Logger.get('userModulesService');
   
   var userModulesServiceModule = angular.module('userModulesServiceModule', []);
   
   userModulesServiceModule.factory('userModulesService', ['$http', '$q',
      function($http, $q) {
         var userModulesService = {
            requestsArray: [],
            deferredArray: [],
            getServiceURL: function() {
               return parametersManager.baseApplicationParameters.userModulesServiceURL + '/' +
                  parametersManager.baseApplicationParameters.userModulesCustomization;
            },
   
            calculatePricingForModules: function (userModules) {
               var deferred = $q.defer();
               var url = this.getServiceURL() + "/userModulesCalculate";
   
               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'POST',
                  url: url,
                  responseType: 'json',
                  cache: false,
                  headers: {
                     'Content-Type': 'application/json; charset=utf-8'
                  },
                  data: {
                     userModules: userModules
                  }
               }).success(function(data, status, headers, config) {
                  deferred.resolve({status: 200, finalPrice: data.calculatePricingForModules});
               }).error(function(data, status, headers, config) {
                  var resultStatus;
                  deferred.reject({status: resultStatus});
               });
   
               return deferred.promise;
            },
            
            getModules: function() {
               var deferred = $q.defer();
               var url = this.getServiceURL() + '/getModules' ;
               var that = this;
               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'GET',
                  url: url,
                  responseType: 'json',
                  cache: false,
                  headers: {
                     'Content-Type': 'application/json; charset=utf-8'
                  }
               }).success(function(data, status, headers, config) {
                  deferred.resolve({userModulesList: data.userModules});
               }).error(function(data, status, headers, config) {
                  var resultStatus;
                  resultStatus = UserModulesServiceResultStatus.FAILED;
                  deferred.reject({status: resultStatus});
               });
               
               return deferred.promise;
            },

            getModulesByUserId: function(userId) {
   
               var deferred = $q.defer();
               var url = this.getServiceURL() + '/getModulesByUserId' ;
               var that = this;
               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'POST',
                  url: url,
                  responseType: 'json',
                  cache: false,
                  data: {
                     userDataObject: {userId: userId}
                  },
                  headers: {
                     'Content-Type': 'application/json; charset=utf-8'
                  }
               }).success(function(data, status, headers, config) {
                  var modulesForAccountEdition = data.modulesForAccountEdition;
                  deferred.resolve({modulesList: modulesForAccountEdition});
               }).error(function(data, status, headers, config) {
                  var resultStatus;
                  resultStatus = UserModulesServiceResultStatus.FAILED;
                  deferred.reject({status: resultStatus});
               });
               
               return deferred.promise;
            },
   
            updateUserModules: function(userId, userModules) {
               var deferred = $q.defer();
      
               var url = this.getServiceURL() + "/updateUserModules";
               
               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'PUT',
                  url: url,
                  responseType: 'json',
                  cache: false,
                  data: {
                     userId: userId,
                     userModules: userModules
                  }
               }).success(function(data, status, headers, config) {
                  // window.sessionStorage.modulesAuthorized = userModules;
                  deferred.resolve({status: UserModulesServiceResultStatus.SUCCEEDED});
               }).error(function(data, status, headers, config) {
                  var resultStatus;
                  if (status === 401) {
                     resultStatus = UserModulesServiceResultStatus.UNAUTHORIZED;
                  }
                  else {
                     resultStatus = UserModulesServiceResultStatus.FAILED;
                  }
                  deferred.reject({status: resultStatus});
               });
      
               return deferred.promise;
            }
         };
         
         return userModulesService;
      }
   ]);
   
   return userModulesServiceModule;
});
