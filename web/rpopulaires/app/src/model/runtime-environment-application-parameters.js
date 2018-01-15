define('runtime-environment-application-parameters', [], function() {
   'use strict';
   var parameters = {};
   parameters = {
    "toEmail": "",
    "printServiceURL": "",
    "productListServiceURL": "https://services.logismata.ch/puma/productList",
    "serverCalculation": true,
    "authenticationServiceURL": "https://services.logismata.ch/puma/authentication",
    "calculatorServiceURL": "https://services.logismata.ch/puma/calculator",
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
