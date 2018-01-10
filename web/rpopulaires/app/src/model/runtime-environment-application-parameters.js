define('runtime-environment-application-parameters', [], function() {
   'use strict';
   var parameters = {};
   parameters = {
    "toEmail": "",
    "printServiceURL": "",
    "productListServiceURL": "https://uat.logismata.ch/puma/productList",
    "serverCalculation": true,
    "authenticationServiceURL": "https://uat.logismata.ch/puma/authentication",
    "calculatorServiceURL": "https://uat.logismata.ch/puma/calculator",
    "storageServiceURL": "",
    "contactServiceURL": "",
    "contactCustomizationUrl": "",
    "requirePaths": {},
    "authorizedContainers": [
        "http://rp.localhost",
        "http://rp.test",
        "https://www.retraitespopulaires.ch",
        "https://wwweti.retraitespopulaires.ch"
    ]
};
   return parameters;
});
