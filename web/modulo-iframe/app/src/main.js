
define('application-constants', [
], function() {

   StorageMode = {};
   StorageMode.LOCAL = 'local';
   StorageMode.SESSION = 'session';
   StorageMode.NONE = 'none';

   IncomeAtPensionMode = {};
   IncomeAtPensionMode.SIMPLE = 'simple';
   IncomeAtPensionMode.FULL = 'full';

   IncomeAtPensionAlternativeMode = {};
   IncomeAtPensionAlternativeMode.NONE = 'none';
   IncomeAtPensionAlternativeMode.SIMPLE = 'simple';

   RiskAlternativeMode = {};
   RiskAlternativeMode.NONE = 'none';
   RiskAlternativeMode.SIMPLE = 'simple';
   
   RiskMode = {};
   RiskMode.SIMPLE = 'simple';
   RiskMode.FULL = 'full';
   
   HouseAffordabilityScenarioMode = {};
   HouseAffordabilityScenarioMode.SIMPLE = 'simple';
   HouseAffordabilityScenarioMode.FULL = 'full';
   
   HouseAffordabilityAlternativeMode = {};
   HouseAffordabilityAlternativeMode.NONE = 'none';
   HouseAffordabilityAlternativeMode.SIMPLE = 'simple';
   HouseAffordabilityAlternativeMode.FULL = 'full';
   
   HouseAffordabilityAlternativeRiskMode = {};
   HouseAffordabilityAlternativeRiskMode.NONE = 'none';
   HouseAffordabilityAlternativeRiskMode.SIMPLE = 'simple';
   HouseAffordabilityAlternativeRiskMode.FULL = 'full';
   
   AmortizationComparisonMode = {};
   AmortizationComparisonMode.SIMPLE = 'simple';
   AmortizationComparisonMode.FULL = 'full';
   
   TaxableIncomeMode = {};
   TaxableIncomeMode.SIMPLE = 'simple';
   TaxableIncomeMode.FULL = 'full';
   
   InheritanceMode = {};
   InheritanceMode.SIMPLE = 'simple';
   InheritanceMode.FULL = 'full';
   
   RelevantIncomeMode = {};
   RelevantIncomeMode.GROSS = 'gross';
   RelevantIncomeMode.NET = 'net';

   return {};
});



define('base-application-parameters', [
   'application-constants'
], function() {
   'use strict';
   var parameters = {
      googleAnalyticsID : undefined,

      // Storage options: NONE, LOCAL, SESSION
      storageMode: StorageMode.NONE,
      
      serverCalculation: false,

      // HostAddress: use "localhost" for local development, or change to a meaningful host address to access remotely
      // See related configuration in server side
      printServiceURL: 'http://localhost:8080/puma/print',
      informParentWindowOnPrintSuccess: false,
      fileServiceURL: 'http://localhost:8080/puma/file',
      calculatorServiceURL: 'http://localhost:8080/puma/calculator',
      productListServiceURL: '',
      userModulesServiceURL: 'http://localhost:8080/puma/userModules',
      mediaServiceURL: 'http://localhost:8080/puma/media',
      statisticsServiceURL: 'http://localhost:8080/puma/statistics',
      
      contactServiceURL: '',
      contactCustomizationUrl : '',
      screenContactUrlByIframe: true,
      toEmail: '',
      dossierExpirationDays: '',
      rentalVsCapitalPDFURL: '',

      // Document name for printing
      printDocName: 'online.standard',

      // Customization name for printing
      printCustomization: 'standard',

      // Customization name for storage
      storageCustomization: 'standard',
      
      // Customization name for calculator
      calculatorCustomization: 'rpopulaires',

      // Customization name for calculator simple affordability
      calculatorMainHouseAffordabilityCustomization: null,
      calculatorMainHouseCostsCustomization: null,
      calculatorSecondHouseAffordabilityCustomization: null,
      calculatorSecondHouseCostsCustomization: null,

      // Customization name for userModulesCustomization
      userModulesCustomization: 'standard',

      // Customization name for productList
      productListCustomization: 'standard',
      
      // Customization name for contact
      contactCustomization: 'standard',
      
      // Customization name for media
      mediaCustomization: 'standard',
      
      // Customization name for statistics
      statisticsCustomization: 'standard',

      // HostAddress: use "localhost" for local development, or change to a meaningful host address to access remotely
      // See related configuration in server side
      authenticationServiceURL: '',

      // HostAddress: use "localhost" for local development, or change to a meaningful host address to access remotely
      // See related configuration in server side
      storageServiceURL: '',

      httpTimeout: 8000,

      contactTimeout: 16000,
      incomeAtPensionLongTermAvailable: true,

      incomeAtPensionMode: IncomeAtPensionMode.SIMPLE,
      incomeAtPensionAlternativeMode: IncomeAtPensionAlternativeMode.SIMPLE,
      incomeAtPensionFirstPillarIncomeOptionAvailable: true,
      incomeAtPensionSecondPillarSelectionAvailable: true,
      incomeAtPensionBridgingRentAvailable: true,
      fortunePensionInterestOptionsAvailable: false, // options available in income at pension and risk, fortune tab

      riskMode: RiskMode.FULL,
      riskAllowSecondPersonFocusing: true, 
            
      houseAffordabilityScenarioMode: HouseAffordabilityScenarioMode.SIMPLE,
      houseAffordabilityAlternativeMode: HouseAffordabilityAlternativeMode.NONE,
      houseAffordabilityAlternativeRiskMode: HouseAffordabilityAlternativeRiskMode.NONE,
      
      amortizationComparisonMode: AmortizationComparisonMode.FULL,
      
      taxableIncomeMode: TaxableIncomeMode.SIMPLE,
      
      inheritanceMode: InheritanceMode.FULL,
      inheritanceSelectMode: false,

      relevantIncomeMode: RelevantIncomeMode.GROSS,
   
      consultantMode: false,

      // Paths for RequireJS.
      // Allows setting deploy paths as parameters
      // Example usage:
      //    requirePaths: {
      //          'wolf-calc': [
      //             'https://services.logismata.ch/components/wolf/ch.logismata.online.calc-shared-min'
      //          ]
      //       }
      requirePaths: null,

      // Allows specifying authorized containers, when the application works in an iframe
      authorizedContainers: [],

      authorizedCalculators: []
   };
   return parameters;
});



define('enums-constants', [], function() {
Sex = {};
Sex.MALE = 1;
Sex.FEMALE = 2;


SexOptions = [
Sex.MALE, 
Sex.FEMALE
];


CivilStatus = {};
CivilStatus.SINGLE = 1;
CivilStatus.MARRIED = 2;
CivilStatus.SINGLE_IN_CONCUBINAGE = 3;


CivilStatusOptions = [
CivilStatus.SINGLE, 
CivilStatus.MARRIED, 
CivilStatus.SINGLE_IN_CONCUBINAGE
];


ProfessionalStatus = {};
ProfessionalStatus.EMPLOYEE = 1;
ProfessionalStatus.SELF_EMPLOYEE_SECOND_PILLAR_INSURED = 2;
ProfessionalStatus.SELF_EMPLOYEE_NO_SECOND_PILLAR_INSURED = 3;


ProfessionalStatusOptions = [
ProfessionalStatus.EMPLOYEE, 
ProfessionalStatus.SELF_EMPLOYEE_SECOND_PILLAR_INSURED, 
ProfessionalStatus.SELF_EMPLOYEE_NO_SECOND_PILLAR_INSURED
];


Saving3aInvestmentOptions = {};
Saving3aInvestmentOptions.BANKACCOUNT3A = 1;
Saving3aInvestmentOptions.OTHERINVESTMENT3A = 2;


Saving3aInvestmentOptionsOptions = [
Saving3aInvestmentOptions.BANKACCOUNT3A, 
Saving3aInvestmentOptions.OTHERINVESTMENT3A
];


HouseInterestOptions = {};
HouseInterestOptions.LIBOR = 1;
HouseInterestOptions.VARIABLEMORTGAGE = 2;
HouseInterestOptions.FIXEDRATEMORTGAGE = 3;
HouseInterestOptions.DISCOUNTRATE = 4;


HouseInterestOptionsOptions = [
HouseInterestOptions.LIBOR, 
HouseInterestOptions.VARIABLEMORTGAGE, 
HouseInterestOptions.FIXEDRATEMORTGAGE, 
HouseInterestOptions.DISCOUNTRATE
];


HouseInterestOptions2 = {};
HouseInterestOptions2.FESTHYPOTHEK1JAHR = 1;
HouseInterestOptions2.FESTHYPOTHEK2JAHR = 2;
HouseInterestOptions2.FESTHYPOTHEK3JAHR = 3;
HouseInterestOptions2.VARIABLEHYPOTHEK = 4;


HouseInterestOptions2Options = [
HouseInterestOptions2.FESTHYPOTHEK1JAHR, 
HouseInterestOptions2.FESTHYPOTHEK2JAHR, 
HouseInterestOptions2.FESTHYPOTHEK3JAHR, 
HouseInterestOptions2.VARIABLEHYPOTHEK
];


PasswordStrength = {};
PasswordStrength.UNDEFINED = 0;
PasswordStrength.INVALID = 1;
PasswordStrength.WEAK = 2;
PasswordStrength.MEDIUM = 3;
PasswordStrength.STRONG = 4;


PasswordStrengthOptions = [
PasswordStrength.UNDEFINED, 
PasswordStrength.INVALID, 
PasswordStrength.WEAK, 
PasswordStrength.MEDIUM, 
PasswordStrength.STRONG
];


StorageServiceResultStatus = {};
StorageServiceResultStatus.OK = 1;
StorageServiceResultStatus.SERVERERROR = 2;
StorageServiceResultStatus.UNAUTHORIZED = 3;
StorageServiceResultStatus.DOSSIERNOTFOUND = 4;
StorageServiceResultStatus.DOSSIERNOTAVAILABLE = 5;


StorageServiceResultStatusOptions = [
StorageServiceResultStatus.OK, 
StorageServiceResultStatus.SERVERERROR, 
StorageServiceResultStatus.UNAUTHORIZED, 
StorageServiceResultStatus.DOSSIERNOTFOUND, 
StorageServiceResultStatus.DOSSIERNOTAVAILABLE
];


ContactServiceResultStatus = {};
ContactServiceResultStatus.OK = 1;
ContactServiceResultStatus.SERVERERROR = 2;
ContactServiceResultStatus.UNAUTHORIZED = 3;
ContactServiceResultStatus.DOSSIERNOTFOUND = 4;


ContactServiceResultStatusOptions = [
ContactServiceResultStatus.OK, 
ContactServiceResultStatus.SERVERERROR, 
ContactServiceResultStatus.UNAUTHORIZED, 
ContactServiceResultStatus.DOSSIERNOTFOUND
];


AuthenticationServiceRegistrationResultStatus = {};
AuthenticationServiceRegistrationResultStatus.SUCCEEDED = 1;
AuthenticationServiceRegistrationResultStatus.FAILED = 2;
AuthenticationServiceRegistrationResultStatus.USERALREADYEXISTS = 3;


AuthenticationServiceRegistrationResultStatusOptions = [
AuthenticationServiceRegistrationResultStatus.SUCCEEDED, 
AuthenticationServiceRegistrationResultStatus.FAILED, 
AuthenticationServiceRegistrationResultStatus.USERALREADYEXISTS
];


AuthenticationServiceLoginResultStatus = {};
AuthenticationServiceLoginResultStatus.SUCCEEDED = 1;
AuthenticationServiceLoginResultStatus.FAILED = 2;
AuthenticationServiceLoginResultStatus.INVALIDUSERORPASSWORD = 3;
AuthenticationServiceLoginResultStatus.USERINACTIVE = 4;
AuthenticationServiceLoginResultStatus.USERBLOCKED = 5;


AuthenticationServiceLoginResultStatusOptions = [
AuthenticationServiceLoginResultStatus.SUCCEEDED, 
AuthenticationServiceLoginResultStatus.FAILED, 
AuthenticationServiceLoginResultStatus.INVALIDUSERORPASSWORD, 
AuthenticationServiceLoginResultStatus.USERINACTIVE, 
AuthenticationServiceLoginResultStatus.USERBLOCKED
];


AuthenticationServiceLoginRememberedUserResultStatus = {};
AuthenticationServiceLoginRememberedUserResultStatus.SUCCEEDED = 1;
AuthenticationServiceLoginRememberedUserResultStatus.FAILED = 2;
AuthenticationServiceLoginRememberedUserResultStatus.INVALIDUSER = 3;


AuthenticationServiceLoginRememberedUserResultStatusOptions = [
AuthenticationServiceLoginRememberedUserResultStatus.SUCCEEDED, 
AuthenticationServiceLoginRememberedUserResultStatus.FAILED, 
AuthenticationServiceLoginRememberedUserResultStatus.INVALIDUSER
];


AuthenticationServiceUpdateUserAccountResultStatus = {};
AuthenticationServiceUpdateUserAccountResultStatus.SUCCEEDED = 1;
AuthenticationServiceUpdateUserAccountResultStatus.FAILED = 2;
AuthenticationServiceUpdateUserAccountResultStatus.INVALIDUSERORPASSWORD = 3;
AuthenticationServiceUpdateUserAccountResultStatus.UNAUTHORIZED = 4;


AuthenticationServiceUpdateUserAccountResultStatusOptions = [
AuthenticationServiceUpdateUserAccountResultStatus.SUCCEEDED, 
AuthenticationServiceUpdateUserAccountResultStatus.FAILED, 
AuthenticationServiceUpdateUserAccountResultStatus.INVALIDUSERORPASSWORD, 
AuthenticationServiceUpdateUserAccountResultStatus.UNAUTHORIZED
];


AuthenticationServiceUpdatePasswordResultStatus = {};
AuthenticationServiceUpdatePasswordResultStatus.SUCCEEDED = 1;
AuthenticationServiceUpdatePasswordResultStatus.FAILED = 2;
AuthenticationServiceUpdatePasswordResultStatus.INVALIDUSERORPASSWORD = 3;
AuthenticationServiceUpdatePasswordResultStatus.UNAUTHORIZED = 4;


AuthenticationServiceUpdatePasswordResultStatusOptions = [
AuthenticationServiceUpdatePasswordResultStatus.SUCCEEDED, 
AuthenticationServiceUpdatePasswordResultStatus.FAILED, 
AuthenticationServiceUpdatePasswordResultStatus.INVALIDUSERORPASSWORD, 
AuthenticationServiceUpdatePasswordResultStatus.UNAUTHORIZED
];


AuthenticationServiceResetPasswordResultStatus = {};
AuthenticationServiceResetPasswordResultStatus.SUCCEEDED = 1;
AuthenticationServiceResetPasswordResultStatus.FAILED = 2;
AuthenticationServiceResetPasswordResultStatus.USERNOTFOUND = 3;


AuthenticationServiceResetPasswordResultStatusOptions = [
AuthenticationServiceResetPasswordResultStatus.SUCCEEDED, 
AuthenticationServiceResetPasswordResultStatus.FAILED, 
AuthenticationServiceResetPasswordResultStatus.USERNOTFOUND
];


AuthenticationServiceRegistrationConfirmationResultStatus = {};
AuthenticationServiceRegistrationConfirmationResultStatus.SUCCEEDED = 1;
AuthenticationServiceRegistrationConfirmationResultStatus.ALREADYCONFIRMED = 2;
AuthenticationServiceRegistrationConfirmationResultStatus.SERVERERROR = 3;
AuthenticationServiceRegistrationConfirmationResultStatus.NOCONFIRMATIONPENDING = 4;
AuthenticationServiceRegistrationConfirmationResultStatus.EXPIREDORINVALIDDATA = 5;


AuthenticationServiceRegistrationConfirmationResultStatusOptions = [
AuthenticationServiceRegistrationConfirmationResultStatus.SUCCEEDED, 
AuthenticationServiceRegistrationConfirmationResultStatus.ALREADYCONFIRMED, 
AuthenticationServiceRegistrationConfirmationResultStatus.SERVERERROR, 
AuthenticationServiceRegistrationConfirmationResultStatus.NOCONFIRMATIONPENDING, 
AuthenticationServiceRegistrationConfirmationResultStatus.EXPIREDORINVALIDDATA
];


AuthenticationServiceCreateCalculatorServiceTokenResultStatus = {};
AuthenticationServiceCreateCalculatorServiceTokenResultStatus.SUCCEEDED = 1;
AuthenticationServiceCreateCalculatorServiceTokenResultStatus.FAILED = 2;
AuthenticationServiceCreateCalculatorServiceTokenResultStatus.USERNOTFOUND = 3;


AuthenticationServiceCreateCalculatorServiceTokenResultStatusOptions = [
AuthenticationServiceCreateCalculatorServiceTokenResultStatus.SUCCEEDED, 
AuthenticationServiceCreateCalculatorServiceTokenResultStatus.FAILED, 
AuthenticationServiceCreateCalculatorServiceTokenResultStatus.USERNOTFOUND
];


PrintServiceResultStatus = {};
PrintServiceResultStatus.OK = 1;
PrintServiceResultStatus.SERVERERROR = 2;
PrintServiceResultStatus.NOCONTENT = 3;
PrintServiceResultStatus.PREPARATIONERROR = 4;


PrintServiceResultStatusOptions = [
PrintServiceResultStatus.OK, 
PrintServiceResultStatus.SERVERERROR, 
PrintServiceResultStatus.NOCONTENT, 
PrintServiceResultStatus.PREPARATIONERROR
];


FileServiceResultStatus = {};
FileServiceResultStatus.OK = 1;
FileServiceResultStatus.SERVERERROR = 2;
FileServiceResultStatus.PREPARATIONERROR = 3;


FileServiceResultStatusOptions = [
FileServiceResultStatus.OK, 
FileServiceResultStatus.SERVERERROR, 
FileServiceResultStatus.PREPARATIONERROR
];


CalculatorServiceResultStatus = {};
CalculatorServiceResultStatus.OK = 1;
CalculatorServiceResultStatus.SERVERERROR = 2;
CalculatorServiceResultStatus.UNAUTHORIZED = 3;


CalculatorServiceResultStatusOptions = [
CalculatorServiceResultStatus.OK, 
CalculatorServiceResultStatus.SERVERERROR, 
CalculatorServiceResultStatus.UNAUTHORIZED
];


UserModulesServiceResultStatus = {};
UserModulesServiceResultStatus.SUCCEEDED = 1;
UserModulesServiceResultStatus.FAILED = 2;


UserModulesServiceResultStatusOptions = [
UserModulesServiceResultStatus.SUCCEEDED, 
UserModulesServiceResultStatus.FAILED
];


MediaServiceGetResultStatus = {};
MediaServiceGetResultStatus.SUCCEEDED = 1;
MediaServiceGetResultStatus.FAILED = 2;
MediaServiceGetResultStatus.MEDIANOTFOUND = 3;


MediaServiceGetResultStatusOptions = [
MediaServiceGetResultStatus.SUCCEEDED, 
MediaServiceGetResultStatus.FAILED, 
MediaServiceGetResultStatus.MEDIANOTFOUND
];


MediaServiceUpdateResultStatus = {};
MediaServiceUpdateResultStatus.SUCCEEDED = 1;
MediaServiceUpdateResultStatus.FAILED = 2;
MediaServiceUpdateResultStatus.USERNOTFOUND = 3;


MediaServiceUpdateResultStatusOptions = [
MediaServiceUpdateResultStatus.SUCCEEDED, 
MediaServiceUpdateResultStatus.FAILED, 
MediaServiceUpdateResultStatus.USERNOTFOUND
];


StatisticsServiceInsertStatisticResultStatus = {};
StatisticsServiceInsertStatisticResultStatus.SUCCEEDED = 1;
StatisticsServiceInsertStatisticResultStatus.FAILED = 2;


StatisticsServiceInsertStatisticResultStatusOptions = [
StatisticsServiceInsertStatisticResultStatus.SUCCEEDED, 
StatisticsServiceInsertStatisticResultStatus.FAILED
];



return {};
});


define('model-constants', ['enums-constants'
], function() {
/*
   CivilStatusOptions = [
       CivilStatus.SINGLE,
       CivilStatus.MARRIED,
       CivilStatus.SINGLE_IN_CONCUBINAGE
   ];
   
   ProfessionalStatusOptions = [
       ProfessionalStatus.EMPLOYEE,
       ProfessionalStatus.SELF_EMPLOYEE_SECOND_PILLAR_INSURED,
       ProfessionalStatus.SELF_EMPLOYEE_NO_SECOND_PILLAR_INSURED
   ];
*/
   return {};
});



define('base-model-parameters', [
   'model-constants'
], function() {
   'use strict';
   var currentYear = new Date().getFullYear();
   var parameters = {
      //SHARED PARAMETERS
      locationDefault: {ch: '8000 Zürich', li: '9490 Vaduz'},   // - , - , ct, mt, 3as, - , - , - , -
      civilStatus: CivilStatus.MARRIED,                   // - , - , ct, mt, 3as, - , - , - , p
      professionalStatus: ProfessionalStatus.EMPLOYEE,
      numberOfChildren : 0, // - , - , ct, mt, 3as, - , - , - , -
      numberOfChildrenOptions: [0, 1, 2, 3, 4],
      mainPersonSex: Sex.FEMALE,
      secondPersonSex: Sex.MALE,
      mainPersonBirthYear: 1970,                         // - , - , ct, - , 3as, - , - , - , p
      secondPersonBirthYear: 1975,                       // - , - , - , - , -  , - , - , - , p
      minimumAge: 18,

      grossIncome: 100000,                               // ha, - , - , mt, 3as, - , - , - , -
      grossIncomeManualMode: true,
      consumptionDuration: 10,
      interestRate: 1.0,
      monthlySavingCapacity: 500,

      taxableIncome: null,                               // - , - , - , mt, 3as, - , - , - , -
      grossFortune: 0,                                   // - , - , - , mt, 3as, - , - , - , -
      taxableFortune: 0,                                 // - , - , - , mt, 3as, - , - , - , -
      isBaseDataExpanded: true,

      // used when listEventsEnabled=true   
      measureTypeOptions_multicalc : {},
      
      // used when listEventsEnabled=true   
      responsibleTypeOptions : {
         default: '1',
         products: [
            {
               code: '1',
               descriptions: {
                  de : "Kunde",
                  en : "Kunde",
                  it : "Kunde",
                  fr : "Client"
               }
            },
            {
               code: '2',
               descriptions: {
                  de : "Kundenberater/in",
                  en : "Kundenberater/in",
                  it : "Kundenberater/in",
                  fr : "Conseiller/ère"
               }
            }
         ]
      },

      //Multicalc
      mainPersonAge: 45,
      mainPersonGrossIncome: 100000,
      mainPersonDisabilityRent: 0,
      mainPersonDisabilityChildrenRent: 0,
      mainPersonWidowRent: 0,
      mainPersonOrphanRent: 0,
      mainPersonPensionRent: 0,
      secondPersonDisabilityRent: 0,
      secondPersonDisabilityChildrenRent: 0,
      secondPersonWidowRent: 0,
      secondPersonOrphanRent: 0,
      secondPersonPensionRent: 0,
      fortuneUsablePercentage: 100.0,
      additionalDisabilityRent: 0.0,
      additionalDeathCapital: 0.0,
      disabilityNeedPercentage: 80.0,
      deathNeedPercentage: 80.0
   };

   return parameters;
});


define('common-numeric-parameter', [],
function() {
   'use strict';

   var NumericParameter = function (min, max, slider_min, slider_max, slider_step) {
      this.min = min;
      this.max = max;
      this.slider_min = slider_min;
      if (this.slider_min === null || this.slider_min === undefined) {
         this.slider_min = min;
      }
      this.slider_max = slider_max;
      if (this.slider_max === null || this.slider_max === undefined) {
         this.slider_max = max;
      }
      this.slider_step = slider_step;
      if (this.slider_step === null || this.slider_step === undefined) {
         this.slider_step = 1;
      }
   };

   return NumericParameter;
});


define('base-view-parameters', [
   'common-numeric-parameter',
   'model-constants'
], function(NumericParameter) {
   'use strict';

   var currentYear = new Date().getFullYear();
   var parameters = {
      customization: 'standard',
      availableLanguages: ['de', 'fr', 'it', 'en'],
      languageSelectionEnabled: false,
      availableCountries: ['CH', 'LI'],
      countrySelectionEnabled: false,
      calculatorSelectionEnabled: false,
      newConsultingIconEnabled: false,
      mainSecondHouseDistinctionEnabled: false,
      contactIconEnabled: true,
      navigationBar: false,
      iconButtonBar: true,
      isIconButtonBarFixed: false, // the icon button bar is always visible and the hamburger is always hidden if true
      singleCalculation: true,
      showCopyrightDisclaimer: true,
      groupDelimiter: "'",
      amountDecimalDelimiter: ".",
      percentageDecimalDelimiter: ",",
      useMixedGroupingSeparator: false,
      animationFocusDuration: 300,   // if it is modified, the $animation-slide-duration constant in style.scss must be amended
      animationDuration: 220,   // if it is modified, the $animation-slide-duration constant in style.scss must be amended
      askConsultantDataForPrinting: false,
      askCustomerReferenceForPrinting: false,
      customerNumberEnabled: false,
      eventPlanIconEnabled: false,
      maxEventPlansAllowed: 10,
      listEventsEnabled: false,
      eventResponsibleEnabled: false,
      showGapLongTermChart: false,
      eventDateValidation: false,
      deleteCustomerInfo: true,
      
      age: new NumericParameter(18, 63),
      numberOfChildren: new NumericParameter(0, 5),
      grossIncome: new NumericParameter(0, 250000, 0, 250000, 5000),
      //
      // Monthly premium. Range is between 0 and maximal allowed deposit for people with or without BVG. The Wolf service provides the two allowed limits. Default is the maximum.
      monthlySavingCapacity: new NumericParameter(0, 5000, 0, 5000, 50),
      interestRate: new NumericParameter(0.0, 3.0, 0.0, 3.0, 0.1),

      //Risk
      additionalDeathCapital: new NumericParameter(0, 100000000, 0, 2000000, 50000),
      need: new NumericParameter(0, 250000, 0, 250000, 5000),
   
      // saving3a colors
      investmentColor: '#E73758',                // same as $result-footer-background-color, $bulletInvestment
      interestColor: '#CBA6AD',                  // same as $bulletInterest
      totalTaxSavingColor: '#940303',            // same as $bulletTaxSaving
      saving3aAlternativeCurrentTaxColor: '#999999',
      saving3aAlternativeAlternativeTaxColor: '#726552',
      saving3aAlternativeSavingColor: '#009900',
      saving3aAlternativeIncreaseColor: '#E52C2A',

      //risk colors
      riskDonutTotalRentColor: 'rgb(113,147,145)',
      riskDonutGapColor: 'rgb(171,21,48)',
      riskDisabilityGapColor: '#FCC433',             // same as $close-button-color-disability, $result-footer-background-color-disability
      riskDeathGapColor: '#5bc0de',                  // same as $close-button-color-death, $result-footer-background-color-death
      riskDonutFortuneColor: 'rgb(153,153,153)',
      riskIncomeColor: '#E8EAE6',
      riskFirstPillarColor: 'rgb(51,88,103)',
      riskDisabilityFirstPillarColor: '#CE9B19',     // same as $result-footer-link-tag-disability: bisque
      riskDeathFirstPillarColor: '#008EA9',          // same as $result-footer-link-tag-death:
      riskSecondPillarColor: 'rgb(176,196,207)',
      riskDisabilitySecondPillarColor: '#8C6910',    // same as $bulletSecondPillarRentDisability
      riskDeathSecondPillarColor: '#006578',         // same as $bulletSecondPillarRentDeath
      riskNeedColor: 'rgb(0,0,0)',
      riskFortuneColor: 'rgb(153,153,153)',
      riskAdditionalColor: 'rgb(247,240,200)',

      useGeoLocation: false,
      calculatorsSettings : {
         contactUrl: "contact-to-whatever",
         facebookUrl: undefined,
         socialMediaUrls: undefined,
         multicalc:{
            isAvailable: true,
            contactUrl: "multicalc-contact-to-whatever",
            socialMediaUrls: undefined
         }
      },

      routeSettings: {
         overview: {
         }
      },

      languages: [
         {id : 'de', order: 1},
         {id : 'fr', order: 2},
         {id : 'it', order: 3},
         {id : 'en', order: 4}
      ],

      countries: [
         {id : 'CH', order: 1},
         {id : 'LI', order: 2}
      ],

      // Timeout to hide messages
      messageTimeout: 5000,
      
      loadingFadeInDuration: 300,
      loadingFadeOutDuration: 600,
      fieldAcceptModelTimeout: 300,

      teasersColumnsSm: 2
   };
   return parameters;
});


define('custom-application-parameters', [
   'application-constants'
], function() {
   'use strict';
   var parameters = {
      // Customization name for printing
      printCustomization: 'rpopulaires',
      // Customization name for storage
      storageCustomization: 'rpopulaires',
      //Customization name for authentication
      authenticationCustomization: 'rpopulaires',

      contactServiceURL: 'http://localhost:8080/puma/contact',
      contactCustomizationUrl : '',
      screenContactUrlByIframe: true,
      toEmail: '',
      
      serverCalculation: true,
      // authenticationServiceURL: 'http://localhost:8080/puma/authentication',
      authenticationServiceURL: 'https://uat.logismata.ch/puma/authentication',
      // calculatorServiceURL: 'http://localhost:8080/puma/calculator',
      calculatorServiceURL: 'https://uat.logismata.ch/puma/calculator',

      //Customization name for contact
      contactCustomization: 'rpopulaires',
      //Customization name for calculators
      calculatorCustomization: 'rpopulaires',
      // Customization name for productList
      productListCustomization: 'rpopulaires',
     
      authorizedContainers: ["http://localhost:8788"],
      incomeAtPensionLongTermAvailable: false, 
      incomeAtPensionAlternativeMode: IncomeAtPensionAlternativeMode.FULL,
      incomeAtPensionMode: IncomeAtPensionMode.FULL,
      
      incomeAtPensionFirstPillarIncomeOptionAvailable: true,
      
      fortunePensionInterestOptionsAvailable: false, // options available in income at pension and risk, fortune tab
      incomeAtPensionSecondPillarSelectionAvailable: true,
      houseAffordabilityAlternativeMode: HouseAffordabilityAlternativeMode.FULL,
      houseAffordabilityAlternativeRiskMode: HouseAffordabilityAlternativeRiskMode.NONE
   };
   return parameters;
});



define('custom-model-parameters', [
   'model-constants'
], function() {
   'use strict';
   var currentYear = new Date().getFullYear();

   var parameters = {
      locationDefault: {ch: '1006 Lausanne', li: '9490 Vaduz'}
   };
   return parameters;
});


define('custom-view-parameters', [
], function() {
   'use strict';

   var parameters = {
      singleCalculation: true,
      navigationBar: false,
      
      iconButtonBar: true,     
      availableLanguages: ['fr'],
      languageSelectionEnabled: false,
      availableCountries: ['CH'],
      countrySelectionEnabled: false,
      calculatorSelectionEnabled: false,
      newConsultingIconEnabled: false,
      mainSecondHouseDistinctionEnabled: false,
      contactIconEnabled: false,
      useMixedGroupingSeparator: true,
      askConsultantDataForPrinting: false,
      askCustomerReferenceForPrinting: false,
      customerNumberEnabled: false,
      eventPlanIconEnabled: false,
      
      useGeoLocation: false,
      calculatorsSettings : {
         contactUrl: 'https://www.somewhere.ch'
      }

      // ----------------------------------------------------------------------
      // NEW COLORS (copied from excel with colors) END
      // ----------------------------------------------------------------------

      
   }; 
   return parameters;
});


define('deploy-application-parameters', [], function() {
   'use strict';
   var parameters = {};
   parameters = {"authorizedContainers":["http://localhost"]};
   return parameters;
});


define('deploy-model-parameters', [], function() {
   'use strict';
   var parameters = {};
   parameters = {};
   return parameters;
});


define('deploy-view-parameters', [], function() {
   'use strict';
   var parameters = {};
   parameters = {};
   return parameters;
});


define('common-object-utilities', [
   'logger'
], function (Logger) {
   'use strict';

   var log = Logger.get('ObjectUtilities');

   var ObjectUtilities = function () {
      this.extendDeep = function (dest, origin) {
         for (var attr in origin) {
            try {
               if (origin[attr] !== undefined && typeof origin[attr] === 'object' && origin[attr] !== null && !Array.isArray(origin[attr])) {
                  if (dest[attr] && typeof dest[attr] === 'object' && dest[attr] !== null) {
                     this.extendDeep(dest[attr], origin[attr]);
                  }
                  else {
                     dest[attr] = origin[attr];
                  }
               }
               else {
                  dest[attr] = origin[attr];
               }
            }
            catch (TypeError) {
               continue;
            }
         }
         return dest;
      };

      this.equals = function (x, y) {
         // for null, undefined and primitives
         if (x === y) {
            return true;
         }
         // arent objects, then are primitives with different values, or an object and a primitive
         if (!(x instanceof Object) || !(y instanceof Object)) {
            return x === y;
         }
         // only wrapper used is Date. String, Number and Regex arent used
         if (x instanceof Date && y instanceof Date) {
            return x.getTime() === y.getTime();
         }

         if (Array.isArray(x)) {
            if (!Array.isArray(y)) {
               return false;
            }
            else if (x.length !== y.length) {
               return false;
            }
         }

         for (var attr in x) {
            // x object properties dont match with y
            if (!y.hasOwnProperty(attr)) {
               return false;
            }

            if (x[attr] === y[attr]) {
               continue;
            }

            if (!this.equals(x[attr], y[attr])) {
               return false;
            }
         }
         // verify x and y have same properties
         for (attr in y) {
            if (!x.hasOwnProperty(attr)) {
               return false;
            }
         }

         return true;
      };

      /**
       * Get the value of an object's attribute specified in a string.
       * 
       * Example: if you have obj = { a: {b: 111}, c: 222 }
       * 
       * if you specify "a.b" on obj, you will get 111 (i.e. obj.a.b)
       * 
       * @param {type} obj
       * @param {type} str
       * @returns {unresolved}
       */
      this.getValueThroughString = function (obj, str) {
         str = str.split(".");
         for (var i = 0; i < str.length; i++) {
            obj = obj[str[i]];
         }
         return obj;
      };

      /**
       * Set the value of an object's attribute specified in a string.
       * 
       * Example: if you have obj = { a: {b: 111}, c: 222 }
       * 
       * if you specify "a.b" on obj, with value 333, you will set 333 on obj.a.b
       * 
       * @param {type} object
       * @param {type} string
       * @param {type} value
       * @returns {unresolved}
       */
      this.setValueThroughString = function (object, string, value) {
         var parts = string.split(/\.(?=[^.]+$)/);
         if (parts.length === 1) {
            object[parts[0]] = value;
         }
         else if (parts.length === 2) {
            this.getValueThroughString(object, parts[0])[parts[1]] = value;
         }
      };
      
      this.protect = function(object) {
         if (!object) {
            return;
         }
         var item;
         if (Array.isArray(object)) {
            for (var index = 0; index < object.length; index++) {
               item = object[index];
               if (item !== null && typeof item === 'object') {
                  this.protect(item);
               }
            }
         }
         else {
            Object.preventExtensions(object);
            for (var itemName in object) {
               item = object[itemName];
               if (item !== null && typeof item === 'object') {
                  this.protect(item);
               }
            }
         }
      };

   };
   return ObjectUtilities;
});


define('parameters-decorator', [
], function() {

   return {
      onCustomizedApplicationParameters: function(applicationParameters) {
         return applicationParameters;
      },
      onCustomizedModelParameters: function(modelParameters) {
         return modelParameters;
      },
      onCustomizedViewParameters: function(viewParameters) {
         return viewParameters;
      }
   };
});


define('parameters-manager', [
   'base-application-parameters',
   'base-model-parameters',
   'base-view-parameters',
   'custom-application-parameters',
   'custom-model-parameters',
   'custom-view-parameters',
   'deploy-application-parameters',
   'deploy-model-parameters',
   'deploy-view-parameters',
   'common-object-utilities',
   'parameters-decorator'
], function(baseApplicationParameters,
            baseModelParameters,
            baseViewParameters,
            customApplicationParameters,
            customModelParameters,
            customViewParameters,
            deployApplicationParameters,
            deployModelParameters,
            deployViewParameters,
            ObjectUtilities,
            parametersDecorator) {

   var objectUtilities = new ObjectUtilities();
   var applicationParameters = objectUtilities.extendDeep(baseApplicationParameters, customApplicationParameters);
   applicationParameters = parametersDecorator.onCustomizedApplicationParameters(applicationParameters);
   applicationParameters = objectUtilities.extendDeep(applicationParameters, deployApplicationParameters);

   var modelParameters = objectUtilities.extendDeep(baseModelParameters, customModelParameters);
   modelParameters = parametersDecorator.onCustomizedModelParameters(modelParameters);
   modelParameters = objectUtilities.extendDeep(modelParameters, deployModelParameters);
   
   var viewParameters = objectUtilities.extendDeep(baseViewParameters, customViewParameters);
   viewParameters = parametersDecorator.onCustomizedViewParameters(viewParameters);
   viewParameters = objectUtilities.extendDeep(viewParameters, deployViewParameters);

   require(
         ['runtime-environment-application-parameters'],
         function(runtimeEnvironmentApplicationParameters) {
            applicationParameters = objectUtilities.extendDeep(applicationParameters, runtimeEnvironmentApplicationParameters);
         },
         function() {
            // ignore, it's intentionally expected that some customers won't have runtime enviroment parameters
         });
   
   require(
         ['runtime-environment-model-parameters'],
         function(runtimeEnvironmentModelParameters) {
            modelParameters = objectUtilities.extendDeep(modelParameters, runtimeEnvironmentModelParameters);
         },
         function() {
            // ignore, it's intentionally expected that some customers won't have runtime enviroment parameters
         });
   
   require(
         ['runtime-environment-view-parameters'],
         function(runtimeEnvironmentViewParameters) {
            viewParameters = objectUtilities.extendDeep(viewParameters, runtimeEnvironmentViewParameters);
         },
         function() {
            // ignore, it's intentionally expected that some customers won't have runtime enviroment parameters
         });

   return {baseApplicationParameters: applicationParameters,
           baseModelParameters: modelParameters,
           baseViewParameters: viewParameters};
});


define('routes-handler', [
   'parameters-manager'
], function(parametersManager) {
   'use strict';
   /***** ATTENTION: THIS IS NOT A SERVICE THIS IS A CONFIGURATION OBJECT *****/

   var routesHandler = {
      routeSettings: parametersManager.baseViewParameters.routeSettings,
      calculatorsSettings: parametersManager.baseViewParameters.calculatorsSettings,
      html5: false,
      reset: function() {
         this.routeSettings = parametersManager.baseViewParameters.routeSettings;
         this.calculatorsSettings = parametersManager.baseViewParameters.calculatorsSettings;
      },
      getSourcePath: function() { 
         // This method returns the source path from the app
         // example 1: (without iframe) browser url = https://uat.logismata.ch/intranetdemo/sparen
         // result: https://uat.logismata.ch/intranetdemo
         // example 2: (with iframe) browser url = http://localhost:9305/llbrechner/sparen
         // iframe url = http://localhost:9305/llbrechner/app/sparen
         // result: http://localhost:9305/llbrechner/sparen
         
         var sourcePath = window.parent.location.href;
         var lastPart = angular.element(document.body).injector().get('locationService').getPath();
         if (sourcePath.toString().indexOf(lastPart) !== -1) {
            sourcePath = sourcePath.substr(0, sourcePath.indexOf(lastPart));
            sourcePath = sourcePath.concat("/");
         }
         return sourcePath;
      },
      getPathByLanguage: function(route, lang) { //See the wiki for more details about this
         var dash = true;
         var numberSign = false;
         var pointPlusBar = false;

         // stuff before conversion
         var hasHashSign = route.indexOf('#');
         if (hasHashSign > 0) {
           route = route.slice(hasHashSign + 1, route.length);
           numberSign = true;
         }
         if (route.substr(0, 2) === "./") {
            route = route.substr(1, route.length);
            pointPlusBar = true;
         }
         if (route.substr(0, 1) !== "/") {
            route = "/" + route;
            dash = false;
         }

         var result = "/";

         if (route !== "/") {
            var routeParts = route.split('/').filter(function(path) {
               return path !== '';
            });
            var firstSubPath = routeParts[0];
            var secondSubPath = routeParts[1];

            if (firstSubPath !== undefined) {
               if (this.routeSettings.themes[firstSubPath] !== undefined) {
                  var theme = firstSubPath;
                  result = "/" + this.routeSettings.themes[theme].overview[lang];

                  if (secondSubPath !== undefined) {
                     var calculation = secondSubPath;
                     ////
                     if (this.routeSettings.themes[theme] === undefined) {
                        console.error("THEME " + theme + " IS MISSING (LANGUAGE " + lang + ")");
                     }
                     else if (this.routeSettings.themes[theme].calculations[calculation] === undefined) {
                        console.error("THEME " + theme + " HAS NO CALCULATION NAMED " + calculation + "(LANGUAGE " + lang + ")");
                     }
                     ////
                     result += '/' + this.routeSettings.themes[theme].calculations[calculation][lang];
                  }
               }
               else {
                  result = "/" + this.routeSettings[firstSubPath][lang];
               }
            }
         }

         // stuff after conversion
         if (!dash) {
            result = result.substr(1, result.length);
         }
         if (pointPlusBar) {
            if (numberSign || !this.html5) {
            result = '/#' + result;
         }
            result = '.' + result;
         }
         else {
            if (numberSign || !this.html5) {
               result = '#' + result;
            }
         }

         return result;
      },
      getCheckedPath: function(path, lang) { //See the wiki (http://192.168.123.4/MediaWiki/index.php?title=URLs)  for more details about this
         var newPath = this.getPathByLanguage(path, lang);
         if (newPath.substr(0, 1) === "#") {
            newPath = newPath.substr(1, newPath.length);
         }
         return newPath;
      },
      getPathByIdAndLanguage: function(id, lang) {
         var result = "/";

         if (id !== "") {
            var idParts = id.split('.').filter(function(part) {
               return part !== '';
            });
            var firstSubId = idParts[0];
            var secondSubId = idParts[1];

            if (firstSubId !== undefined) {
               if (this.routeSettings.themes[firstSubId] !== undefined) {
                  var theme = firstSubId;
                  if (this.routeSettings.themes[theme].overview[lang] === undefined) {
                     console.error("THEME " + theme + " IS MISSING (LANGUAGE " + lang + ")");
                     //TODO: ask defaultLanguage from localization
                     result = "/" + this.routeSettings.themes[theme].overview.de;
                  }
                  else {
                     result = "/" + this.routeSettings.themes[theme].overview[lang];
                  }

                  if (secondSubId !== undefined) {
                     var calculation = secondSubId;
                     if (this.routeSettings.themes[theme].calculations[calculation] === undefined) {
                        console.error("THEME " + theme + " HAS NO CALCULATION NAMED " + calculation + ")");
                     }
                     else {
                        if (this.routeSettings.themes[theme].calculations[calculation][lang] === undefined) {
                           console.error("THEME " + theme + " HAS NO CALCULATION NAMED " + calculation + "(LANGUAGE " + lang + ")");
                           result += '/' + this.routeSettings.themes[theme].calculations[calculation].de;
                        }
                        else {
                           result += '/' + this.routeSettings.themes[theme].calculations[calculation][lang];
                        }
                     }
                  }
               }
               else {
                  if (this.routeSettings[firstSubId][lang] === undefined) {
                     console.error("CONTROLLER " + firstSubId + " IS MISSING (LANGUAGE " + lang + ")");
                     result = "/" + this.routeSettings[firstSubId].de;
                  }
                  else {
                     result = "/" + this.routeSettings[firstSubId][lang];                     
                  }
               }
            }
         }

         return result;
      },
      prepareRouteBeforeConversion: function(route) {
         // stuff before conversion
         if (route.substr(0, 1) === "#") {
            route = route.substr(1, route.length);
         }
         if (route.substr(0, 2) === "./") {
            route = route.substr(1, route.length);
         }
         if (route.substr(0, 1) !== "/") {
            route = "/" + route;
         }
         var index = route.indexOf("?");
         if (index >= 0) {
            route = route.substr(0, index);
         }
         return route;
      },
      getRouteParts: function(route) {
         route = this.prepareRouteBeforeConversion(route);
         var routeParts = route.split('/').filter(function(path) {
            return path !== '';
         });
         return routeParts;
      },

      getId: function() { //See the wiki (http://192.168.123.4/MediaWiki/index.php?title=URLs) for more details about this
         var result = angular.element(document.body).injector().get('locationService').getPath();

         result = this.prepareRouteBeforeConversion(result);
         var routeParts = this.getRouteParts(result);

         var themePath = routeParts[0];
         var calculationPath = routeParts[1];
         var originalPath = "";
         var langName;

         if (themePath !== undefined) {
            for (var themeName in this.routeSettings.themes) {
               var theme = this.routeSettings.themes[themeName];
               if (this.calculatorsSettings.themes[themeName] === undefined) {
                  //Ignore undefined themes
                  continue;
               }
               for (langName in theme.overview) {
                  if (calculationPath !== undefined) {
                     for (var calculatorName in theme.calculations) {
                        var calculator = theme.calculations[calculatorName];
                        originalPath = "/" + theme.overview[langName] + "/" + calculator[langName];
                        if (result === originalPath) {
                           return themeName + "." + calculatorName;
                        }
                     }
                  }
                  else {
                     originalPath = "/" + theme.overview[langName];
                     if (result === originalPath) {
                        return themeName;
                     }
                  }
               }
            }
         }

         // try as other controller
         for (var controllerName in this.routeSettings) {
            var controller = this.routeSettings[controllerName];
            for (langName in controller) {
               originalPath = "/" + controller[langName];
               if (result === originalPath) {
                  return controllerName;
               }
            }
         }

         // this route has no translation so I return the original (for example route '/')
         return result.replace('/', '');
      }
   };
   return routesHandler;
});


define('theme-manager', [
   'logger'
], function(Logger) {
   'use strict';

   var log = Logger.get('ThemeManager');
   var currentThemeId = null;
   var currentSubThemeId = null;
   var currentTheme;
   var visitedThemes = [];
   var ThemeManager = function() {
      this.getVisitedThemes = function() {
         return visitedThemes;
      };
      
      this.getCurrentThemeId = function() {
         return currentThemeId;
      };
      
      this.isThemeSelected = function(theme) {
         return theme === currentThemeId;
      };

      this.getCurrentSubThemeId = function() {
         return currentSubThemeId;
      };
      
      this.isSubThemeSelected = function(subTheme) {
         var isSelected = subTheme === currentSubThemeId;
         return isSelected;
      };
      
      this.isThemeMainSelected = function(theme) {
         if (this.isThemeSelected(theme) && (currentSubThemeId === null || currentSubThemeId === undefined)) {
            return true;
         }
         return false;
      };

      this.setTheme = function(themeId, subThemeId) {
         if (themeId === undefined || themeId === null) {
            return;
         }
         visitedThemes.push(themeId);
         visitedThemes = visitedThemes.filter(function(item, pos) {
            return visitedThemes.indexOf(item) === pos;
         });
         var newTheme = "Theme" + themeId.charAt(0).toUpperCase() + themeId.slice(1);
         currentTheme = newTheme;
         currentThemeId = themeId;
         currentSubThemeId = subThemeId;
      };
   };

   return ThemeManager;
});


define('common-currency-formatter', [
], function() {
   'use strict';

   var CurrencyFormatter = function(groupingSeparator, decimalSeparator, useMixedGroupingSeparator) {
      var _groupingSeparator = groupingSeparator;
      var _decimalSeparator = decimalSeparator;
      var _useMixedGroupingSeparator = useMixedGroupingSeparator;

      this.formatCurrency = function(number, showDecimals, numberOfDecimals) {
         var iCents = 0;
         var sMinus = "";
         var iNum;
         var sVal;

         if (numberOfDecimals === null) {
            numberOfDecimals = 2;
         }

         if (!showDecimals) {
            numberOfDecimals = 0;
         }

         if (typeof(number) === "number") {
            iNum = number;
         }
         else {
            if (typeof(number) !== "string") {
               number = String(number);
            }

            if (number === "") {
               number = "0";
            }

            number = this.cleanGroupDelimiters(number);

            iNum = this.parseNumberWithDecimals(number);
         }

         if (isNaN(iNum)) {
            iNum = 0;
         }

         iNum = Math.round(iNum * Math.pow(10, numberOfDecimals)) / Math.pow(10, numberOfDecimals);

         if (iNum < 0) {
            sMinus = "-";
            iNum = Math.abs(iNum);
         }

         if (iNum !== parseInt(iNum, 10)) {
            iCents = iNum - parseInt(iNum, 10);
            iCents = Math.round(iCents * Math.pow(10, numberOfDecimals)) / Math.pow(10, numberOfDecimals);
            iNum = Math.round(iNum - iCents);
            iCents = Math.round(iCents * Math.pow(10, numberOfDecimals));
         }
         
         if (_useMixedGroupingSeparator) {
            sVal = sMinus + this.addGroupMixedSeparator(String(iNum));
         }
         else {
            sVal = sMinus + this.addGroupUnitarySeparator(String(iNum));
         }
         
         if (showDecimals && numberOfDecimals > 0) {
            sVal = sVal + _decimalSeparator + this.fillZeroLeft(String(iCents), numberOfDecimals);
         }

         return sVal;
      };

      // --------------------------------------------------------------------------------
      // private
      this.addGroupMixedSeparator = function(amount) {
         var amountString = "";
         try {
            var amountValue = parseInt(amount, 10);
            amountString = String(amountValue);
            if (amountString >= 10000) {
                for (var i = 0; i < Math.floor((amountString.length - (1 + i)) / 3); i++) {
                    amountString = amountString.substring(0, amountString.length - (4 * i + 3)) + _groupingSeparator + amountString.substring(amountString.length - (4 * i + 3));
                }
            }
         }
         catch (exception) {
            // TODO
         }

         return amountString.toString();
      };
      
      this.addGroupUnitarySeparator = function(amount) {
         var amountString = "";
         try {
            var amountValue = parseInt(amount, 10);
            amountString = String(amountValue);
            for (var i = 0; i < Math.floor((amountString.length - (1 + i)) / 3); i++) {
               amountString = amountString.substring(0, amountString.length - (4 * i + 3)) + _groupingSeparator + amountString.substring(amountString.length - (4 * i + 3));
            }
         }
         catch (exception) {
            // TODO
         }

         return amountString.toString();
      };

      this.fillZeroLeft = function(sNumber, iNumberOfDecimals) {
         while (sNumber.length < iNumberOfDecimals) {
            sNumber = "0" + sNumber;
         }

         return sNumber;
      };

      // assumes group delimiters were already removed
      this.parseNumberWithDecimals = function(number) {
         var integerString;
         var integerValue;
         var decimalsString;
         var numberOfDecimals;
         var decimalsValue;
         var position;
         var negative;

         // check if negative, then remove sign for further analysis
         negative = number.indexOf("-") > -1;
         number = number.replace("-", "");

         position = number.indexOf(_decimalSeparator);

         if (position === -1) {
            // no decimals
            integerString = number;
            decimalsString = "0";
         }
         else if (position === 0) {
            // starts with decimal separator (for example: ".12345"
            integerString = 0;
            decimalsString = number.substring(position + 1);
         }
         else {
            integerString = number.substring(0, position);
            decimalsString = number.substring(position + 1);
         }

         integerValue = parseInt(integerString, 10);

         numberOfDecimals = decimalsString.length;
         decimalsValue = parseInt(decimalsString, 10) / Math.pow(10, numberOfDecimals);

         var numberWithDecimals = integerValue + decimalsValue;

         if (negative) {
            numberWithDecimals = numberWithDecimals * -1;
         }

         // ensure proper rounding because of floating point errors
         // example: 9 + 0.99999999999 does not result in 9.99999999999, but in 9.999999999989999
         numberWithDecimals = Math.round(numberWithDecimals * Math.pow(10, numberOfDecimals)) / Math.pow(10, numberOfDecimals);

         return numberWithDecimals;
      };

      this.cleanGroupDelimiters = function(number) {
         while (number.indexOf(_groupingSeparator) !== -1) {
            number = number.replace(_groupingSeparator, "");
         }

         return number;
      };
   };

   return CurrencyFormatter;
});


define('common-localization', [
   'logger',
   'common-currency-formatter'
], function(Logger, CurrencyFormatter) {
   'use strict';

   var log = Logger.get('localization');
   var logDetail = Logger.get('localizationDetail');

   var regExpCache = {};
   var Localization = function(enums, groupDelimiter, amountDecimalDelimiter, percentageDecimalDelimiter, useMixedGroupingSeparator) {
      var _enums = enums;
      var _log_untranslated = false;

      if (logDetail && !logDetail.enabledFor(Logger.DEBUG)) {
         logDetail = undefined;
      }

      this.replaceFixedPercentage = function(translated) {
         // Create a RegExp to search for a fixed placeholder
         // Example placeholders:
         //    * "<10|fixedPercentage>"
         var regExp;
         var placeholderKey = 'fixedPercentage';
         if (regExpCache[placeholderKey] === undefined) {
            regExp = new RegExp('<([0-9\.]*?).fixedPercentage(.*?)>', '');
            regExpCache[placeholderKey] = regExp;
         }
         else {
            regExp = regExpCache[placeholderKey];
         }

         var matches = regExp.exec(translated);

         while (matches !== null && matches.length >= 3) {
            var value = matches[1];
            value = parseFloat(value);

            var decimals = 2;
            if (matches[2].indexOf(":") >= 0) {
               var decimalsParameter = matches[2].split(":")[1];
               var intDecimalsParameter = parseInt(decimalsParameter);
               if (!isNaN(intDecimalsParameter)) {
                  decimals = intDecimalsParameter;
               }
            }

            translated = translated.replace(matches[0], this.getLocalizedString('GenericFormats', 'Percentage', {'VALUE': value, 'DECIMALS': decimals}));
            matches = regExp.exec(translated);
         }

         return translated;
      };

      this.replaceFixedCurrencyWithSymbol = function(translated) {
         // Create a RegExp to search for a fixed placeholder
         // Example placeholders:
         //    * "<10|fixedCurrencyWithSymbol>"
         var regExp;
         var placeholderKey = 'fixedCurrencyWithSymbol';
         if (regExpCache[placeholderKey] === undefined) {
            regExp = new RegExp('<([0-9\.]*?).fixedCurrencyWithSymbol(.*?)>', '');
            regExpCache[placeholderKey] = regExp;
         }
         else {
            regExp = regExpCache[placeholderKey];
         }

         var matches = regExp.exec(translated);
         while (matches !== null && matches.length >= 3) {
            var value = matches[1];
            value = parseFloat(value);

            var decimals = 0;
            if (matches[2].indexOf(":") >= 0) {
               var decimalsParameter = matches[2].split(":")[1];
               var intDecimalsParameter = parseInt(decimalsParameter);
               if (!isNaN(intDecimalsParameter)) {
                  decimals = intDecimalsParameter;
               }
            }

            translated = translated.replace(matches[0], this.getLocalizedString('GenericFormats', 'CurrencyWithSymbol', {'VALUE': value, 'DECIMALS': decimals}));
            matches = regExp.exec(translated);
         }

         return translated;
      };

      this.replaceFixedPlaceholders = function(translated) {
         translated = this.replaceFixedPercentage(translated);
         translated = this.replaceFixedCurrencyWithSymbol(translated);
         return translated;
      };

      /**
       * Applies formatting to placeholder values
       * 
       * @param placeholderValue Value before formatting
       * @param {String} format Format type
       * @returns {String} Placeholder value after applying formatting
       */
      this.applyFormatting = function(placeholderValue, format) {
         var decimals;
         var decimalsParameter;
         var intDecimalsParameter;

         if (format.indexOf("percentage") === 0) {
            decimals = 2;
            if (format.indexOf(":") >= 0) {
               decimalsParameter = format.split(":")[1];
               intDecimalsParameter = parseInt(decimalsParameter);
               if (!isNaN(intDecimalsParameter)) {
                  decimals = intDecimalsParameter;
               }
            }
            placeholderValue = this.getLocalizedString('GenericFormats', 'XRate',
                  {'VALUE': new CurrencyFormatter(groupDelimiter, percentageDecimalDelimiter, useMixedGroupingSeparator).formatCurrency(placeholderValue, true, decimals)});
         }
         else if (format.indexOf("currencyWithSymbol") === 0) {
            decimals = 0;
            if (format.indexOf(":") >= 0) {
               decimalsParameter = format.split(":")[1];
               intDecimalsParameter = parseInt(decimalsParameter);
               if (!isNaN(intDecimalsParameter)) {
                  decimals = intDecimalsParameter;
               }
            }
            placeholderValue = this.getLocalizedString('GenericFormats', 'XAmountWithSymbol',
                  {'VALUE': new CurrencyFormatter(groupDelimiter, amountDecimalDelimiter, useMixedGroupingSeparator).formatCurrency(placeholderValue, true, decimals)});
         }
         else if (format.indexOf("currency") === 0) {
            decimals = 0;
            if (format.indexOf(":") >= 0) {
               decimalsParameter = format.split(":")[1];
               intDecimalsParameter = parseInt(decimalsParameter);
               if (!isNaN(intDecimalsParameter)) {
                  decimals = intDecimalsParameter;
               }
            }
            placeholderValue = this.getLocalizedString('GenericFormats', 'XAmount',
                  {'VALUE': new CurrencyFormatter(groupDelimiter, amountDecimalDelimiter, useMixedGroupingSeparator).formatCurrency(placeholderValue, true, decimals)});
         }

         // add more formattings as needed

         return placeholderValue;
      };

      /**
       * Replaces a single placeholder in a translated text
       * 
       * @param {String} translated Translated text
       * @param {String} placeholderKey Placeholder Key
       * @param placeholderValue Placeholder Value
       * @returns {String} The translated text after replacing the placeholder
       */
      this.replacePlaceholder = function(translated, placeholderKey, placeholderValue) {
         // Create a RegExp to search for a placeholder with possible formatting
         // Example placeholders:
         //    * "The value is <AMOUNT>"
         //    * "The value <AMOUNT|currency> is formatted"
         var regExp;
         if (regExpCache[placeholderKey] === undefined) {
            regExp = new RegExp('.*<(' + placeholderKey + '[a-zA-Z0-9:\|]*?)>.*', '');
            regExpCache[placeholderKey] = regExp;
         }
         else {
            regExp = regExpCache[placeholderKey];
         }

         var matches = regExp.exec(translated);

         if (matches === null || matches.length !== 2) {
            return translated;
         }

         // Get the Full match (in the examples, "<AMOUNT>" or "<AMOUNT|currency>")
         // This is the value that must be replaced in the translated text
         var fullPlaceholder = matches[1];

         // search for possible formatting
         var parts = fullPlaceholder.split('|');
         if (parts.length > 1) {
            for (var partIndex = 1; partIndex < parts.length; partIndex++) {
               var format = parts[partIndex];

               placeholderValue = this.applyFormatting(placeholderValue, format);
            }
         }

         translated = translated.replace('<' + fullPlaceholder + '>', placeholderValue);

         return translated;
      };

      /**
       * Replaces all placeholders in a translated text
       * 
       * @param {String} translated Translated text
       * @param {Object} placeholders An object with placeholders keys and values: { KEY1: VALUE1, KEY2: VALUE2, KEY3: VALUE3}
       * @returns {String} The translated text after replacing all placeholders
       */
      this.replacePlaceholders = function(translated, placeholders) {
         if (placeholders === undefined) {
            return translated;
         }

         var keys = [];
         var key;
         var value;
         for (key in placeholders) {
            keys.push(key);
         }

         // sort placeholders to ensure proper replacement in case of placeholders with an equal beginning (example AMOUNT and AMOUNT2)
         // (see regular expression used to search for placeholders)
         keys.sort(function(key1, key2) {
            return key2.length - key1.length;
         });

         // retry placeholder replacement until no placeholders are left (useful for placeholders that include placeholders itself).
         var changed;
         do {
            changed = false;
            for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
               key = keys[keyIndex];
               value = placeholders[key];
               var translatedWithReplacedPlaceholder = this.replacePlaceholder(translated, key, value);
               if (translated !== translatedWithReplacedPlaceholder) {
                  changed = true;
               }
               translated = translatedWithReplacedPlaceholder;
            }
         } while (changed);

         return translated;
      };

      /**
       * Answers a default untranslated enum value for cases of error
       *
       * @param {String} enumName Enum name
       * @param {String} enumKey Enum key
       * @returns {String} A default untranslated text
       */
      this.getUntranslatedEnum = function(enumName, enumKey) {
         if (_log_untranslated === true) {
            log.error("UNTRANSLATED ENUM:" + enumName + " KEY: " + enumKey);
         }

         return "@" + enumKey;
      };

      /**
       * Answers a localized string for the given enum name and enum key, filling placeholders
       * 
       * @param {String} enumName Enum name
       * @param {String} enumKey Enum key
       * @param {Object} placeholders An object with placeholders keys and values: { KEY1: VALUE1, KEY2: VALUE2, KEY3: VALUE3}
       * @returns {String} A localized string
       */
      this.getLocalizedString = function(enumName, enumKey, placeholders) {
         var localizedString;
         
         if (!placeholders) {
            var cachedResult = this.getCachedResult(enumName, enumKey);
            if (cachedResult !== undefined) {
               return cachedResult.longValue;
            }
         }

         var localizedEnum = this.getLocalizedEnum(enumName, enumKey, placeholders);

         if (typeof localizedEnum === 'object') {
            var translated = this.replaceFixedPlaceholders(localizedEnum.longValue);
            
            if (placeholders) {
               translated = this.replacePlaceholders(translated, placeholders);
            }
            else {
               localizedEnum.longValue = translated;
               this.cacheResult(enumName, enumKey, localizedEnum);
            }
            localizedString = translated;
         }
         else {
            localizedString = localizedEnum;
         }

         return localizedString;
      };
      
      /**
       * Answers a localized string for the given enum name and enum key, filling placeholders
       * 
       * @param {String} enumName Enum name
       * @param {String} enumKey Enum key
       * @param {Object} placeholders An object with placeholders keys and values: { KEY1: VALUE1, KEY2: VALUE2, KEY3: VALUE3}
       * @returns {String} A localized string
       */
      this.getLocalizedShortString = function(enumName, enumKey) {
         var cachedResult = this.getCachedResult(enumName, enumKey);
         if (cachedResult !== undefined) {
            return cachedResult.shortValue;
         }
         
         var localizedEnum = this.getLocalizedEnum(enumName, enumKey);
         this.cacheResult(enumName, enumKey, localizedEnum);
         
         return localizedEnum.shortValue;
      };

      /**
       * Caches the results of a localized object that do not require placeholders.
       * @param {String} enumName Name of the enum
       * @param {String} enumKey Key of the enum item
       * @param {String} translated Localized object to cache
       */
      this.cacheResult = function(enumName, enumKey, localizedEnum) {
         if (this.cache === undefined) {
            this.cache = {};
         }

         if (this.cache[enumName] === undefined) {
            this.cache[enumName] = {};
         }

         this.cache[enumName][enumKey] = localizedEnum;
      };

      /**
       * Answers a cached results of simple translations that do not require placeholders.
       * @param {String} enumName Name of the enum
       * @param {String} enumKey Key of the enum item
       * @returns {String} Cached translated text
       */
      this.getCachedResult = function(enumName, enumKey) {
         if (this.cache === undefined) {
            return undefined;
         }

         if (this.cache[enumName] === undefined) {
            return undefined;
         }

         return this.cache[enumName][enumKey];
      };

      this.hasKey = function(enumName, enumKey) {
         if (typeof _enums !== "object") {
            return false;
         }

         var theEnum = _enums[enumName];
         if (theEnum === undefined) {
            return false;
         }

         return theEnum[enumKey] !== undefined;
      };

      this.getLocalizedEnum = function(enumName, enumKey, placeholders) {
         // trick to avoid wasted time when the log is not enabled (since this method is called a lot of times)
         if (logDetail) {
            logDetail.debug("SEARCH FOR ENUM: " + enumName + " KEY: " + enumKey);
         }

         if (typeof _enums !== "object") {
            log.error("NO ENUMS DEFINED");
            return this.getUntranslatedEnum(enumName, enumKey);
         }

         var theEnum = _enums[enumName];
         if (theEnum === undefined) {
            log.error("NO ENUM FOR " + enumName);
            return this.getUntranslatedEnum(enumName, enumKey);
         }

         var localizedEnum;
         if (isNaN(enumKey)) {
            if (theEnum[enumKey] === undefined) {
               return this.getUntranslatedEnum(enumName, enumKey);
            }
            localizedEnum = theEnum[enumKey];
         }
         else {
            localizedEnum = this.getLocalizedEnumByNumber(enumName, enumKey);
         }
         return localizedEnum;
      };
      
      this.getLocalizedEnumByNumber = function(enumName, enumNumber) {
         // trick to avoid wasted time when the log is not enabled (since this method is called a lot of times)
         if (logDetail) {
            logDetail.debug("SEARCH FOR ENUM: " + enumName + " Code: " + enumNumber);
         }

         if (typeof _enums !== "object") {
            log.error("NO ENUMS DEFINED");
            return this.getUntranslatedEnum(enumName, enumNumber);
         }

         var theEnum = _enums[enumName];
         if (theEnum === undefined) {
            log.error("NO ENUM FOR " + enumName);
            return this.getUntranslatedEnum(enumName, enumNumber);
         }

         for (var attIndex in theEnum) {
            if (theEnum[attIndex].number === enumNumber.toString()) {
               return theEnum[attIndex];
            }
         }
         return this.getUntranslatedEnum(enumName, enumNumber);
      };

      /**
       * Answers a localized description from an enum list
       *
       * @param {String} enumName Enum name
       * @param {type} enumNumber The enum code to search for
       * @returns {String} The translated long description of the enum entry corresponding to the given enum code
       */

      this.getLocalizedEnumDescriptionByNumber = function(enumName, enumNumber) {
         var localizedEnum = this.getLocalizedEnumByNumber(enumName, enumNumber);
         return (typeof localizedEnum === 'object') ? localizedEnum.longValue : localizedEnum;
      };
      
      /**
       * Answers a localized short description from an enum list
       *
       * @param {String} enumName Enum name
       * @param {type} enumNumber The enum code to search for
       * @returns {String} The translated short description of the enum entry corresponding to the given enum code
       */
      
      this.getLocalizedEnumShortDescriptionByNumber = function(enumName, enumNumber) {
         var localizedEnum = this.getLocalizedEnumByNumber(enumName, enumNumber);
         return (typeof localizedEnum === 'object') ? localizedEnum.shortValue : localizedEnum;
      };
   };

   return Localization;
});


define('active-controller', [
   'angular'
], function(angular) {
   'use strict';

   var activeControllerModule = angular.module('activeControllerModule', []);

   activeControllerModule.factory('activeController', function() {
      var activeController = {
         activeController : null,
         set : function(controllerName) {
            this.activeController = controllerName;
         },
         clear : function() {
            this.activeController = null;
         },
         getActiveController : function() {
            return this.activeController;
         }
      };

      return activeController;
   });

   return activeControllerModule;
});


define('localization', [
   'angular',
   'common-localization',
   'logger',
   'parameters-manager',
   'active-controller'
], function(angular, Localization, Logger, parametersManager) {
   'use strict';

   var log = Logger.get('localization');
   var localization = angular.module('localization', []);

   var defaultLanguage;
   var defaultCountry;

   if (parametersManager.baseViewParameters.availableLanguages && parametersManager.baseViewParameters.availableLanguages.length > 0) {
      defaultLanguage = parametersManager.baseViewParameters.availableLanguages[0];
   }
   else {
      defaultLanguage = 'de';
   }

   if (parametersManager.baseViewParameters.availableCountries && parametersManager.baseViewParameters.availableCountries.length > 0) {
      defaultCountry = parametersManager.baseViewParameters.availableCountries[0];
   }
   else {
      defaultCountry = 'CH';
   }

   // create our localization service
   localization.factory('localize', ['$http', '$rootScope', '$window', '$route', 'activeController',
      function($http, $rootScope, $window, $route, activeController) {

         function getEnumPair(value) {
            var enumName = 'Default'; //default, just in case
            var enumParts = value.split('.');
            if (enumParts.length === 2) {
               enumName = enumParts[0];
               value = enumParts[1];
            }
            else {
               if (activeController.getActiveController() !== undefined) {
                  enumName = activeController.getActiveController();
               }
               else if ($route && $route.current && $route.current.$$route && $route.current.$$route.controller) {
                  enumName = $route.current.$$route.controller.replace('Controller', '');
               }
            }
            return { enumName: enumName, value: value};
         }

         function checkResourceFileLoaded() {
            // check to see if the resource file has been loaded
            if (!localize.resourceFileLoaded) {
               // call the init method
               localize.initLocalizedResources();
               // set the flag to keep from looping in init
               localize.resourceFileLoaded = true;

               return false;
            }
            return true;
         }

         var localize = {
            // path to look for localizations
            path: './resources/enums',

            // use the $window service to get the language of the user's browser
            language : $window.navigator.userLanguage || $window.navigator.language,
            country : defaultCountry,

            enums : [],

            // flag to indicate if the service has loaded the resource file
            resourceFileLoaded : false,

            loading: false,

            defaultLanguage : defaultLanguage,
            defaultCountry : defaultCountry,
            
            activeLanguage: null,
            activeCountry: null,

            setLanguage : function(languageId, onSuccess, onFailure) {
               var previousLanguage = localize.language;
               log.debug('Setting language ' + languageId + ' (previous was ' + previousLanguage + ')');

               if (previousLanguage === languageId) {
                  log.warn('Language already set, skipping');
                  return;
               }

               window.sessionStorage.language = languageId;
               localize.language = languageId;
               localize.activeLanguage = null;

               localize.loadResources(
                  function() {
                     if (onSuccess) {
                        onSuccess();
                     }
                     $rootScope.$broadcast('languageChangeSuccess');
                  },
                  function() {
                     log.debug('Setting language back to ' + previousLanguage);
                     // the request failed, set previous language
                     window.sessionStorage.language = previousLanguage;
                     localize.language = previousLanguage;
                     localize.activeLanguage = null;
                     localize.successCallback(localize.enums);
                     if (onSuccess) {
                        onSuccess();
                     }
                     if (onFailure) {
                        onFailure();
                     }
                     $rootScope.$broadcast('languageChangeFailed');
                  }
               );
            },

            setCountry : function(countryId, onSuccess, onFailure) {
               var previousCountry = localize.country;
               log.debug('Setting country ' + countryId + ' (previous was ' + previousCountry + ')');

               if (previousCountry === countryId) {
                  log.warn('Country already set, skipping');
                  return;
               }

               window.sessionStorage.country = countryId;
               localize.country = countryId;
               localize.activeCountry = null;
               
               // The countries was cached because while loading a new resourse the method localize.getLocalizedShortString('Countries.??') return ""
               // and we need it in isCountry??
               localize.cachedCountries = {
                  CH: localize.getLocalizedShortString('Countries.CH'),
                  LI: localize.getLocalizedShortString('Countries.LI')
               };

               localize.loadResources(
                  function() {
                     if (onSuccess) {
                        onSuccess();
                     }
                     $rootScope.$broadcast('countryChangeSuccess');
                     localize.cachedCountries = undefined;
                  },
                  function() {
                     log.debug('Setting country back to ' + previousCountry);
                     // the request failed, set previous country
                     window.sessionStorage.country = previousCountry;
                     localize.country = previousCountry;
                     localize.activeCountry = null;
                     localize.successCallback(localize.enums);
                     if (onSuccess) {
                        onSuccess();
                     }
                     if (onFailure) {
                        onFailure();
                     }
                     $rootScope.$broadcast('countryChangeFailed');
                     localize.cachedCountries = undefined;
                  }
               );
            },

            successCallback : function(data) {
               // store the returned array in the dictionary
               localize.enums = data;
               localize.localization = new Localization(
                     localize.enums,
                     parametersManager.baseViewParameters.groupDelimiter,
                     parametersManager.baseViewParameters.amountDecimalDelimiter,
                     parametersManager.baseViewParameters.percentageDecimalDelimiter,
                     parametersManager.baseViewParameters.useMixedGroupingSeparator);

               log.debug('Enums loaded for ' + localize.language + '_' + localize.country);
               localize.loading = false;
               // set the flag that the resource are loaded
               localize.resourceFileLoaded = true;
               // broadcast that the file has been loaded
               $rootScope.$emit('localizeResourcesUpdates');
            },

            getActiveLanguage: function() {
               if (localize.activeLanguage === null) {
                  localize.activeLanguage = localize.language.replace(/\-.*/, '');
                  localize.activeLanguage = localize.activeLanguage.toLowerCase();
                  if (parametersManager.baseViewParameters.availableLanguages.indexOf(localize.activeLanguage) === -1) {
                     localize.activeLanguage = localize.defaultLanguage;
                  }
               }

               return localize.activeLanguage;
            },

            getActiveLanguageCode: function() {
               var activeLanguage = localize.getActiveLanguage();
               switch (activeLanguage) {
                  case 'de': {
                     return '1';
                  }
                  case 'fr': {
                     return '2';
                  }
                  case 'it': {
                     return '3';
                  }
                  case 'en': {
                     return '4';
                  }
                  default: {
                     return '1';
                  }
               }
            },
            
            getActiveCountryCode: function() {
               if (this.isCountryCh()) {
                  return 756;
               }
               if (this.isCountryLi()) {
                  return 438;
               }
               return 0;//all
            },            

            getActiveCountry: function() {
               if (localize.activeCountry === null) {
                  localize.activeCountry = localize.country.replace(/\-.*/, '');
                  localize.activeCountry = localize.activeCountry.toUpperCase();
                  if (parametersManager.baseViewParameters.availableCountries.indexOf(localize.activeCountry) === -1) {
                      localize.activeCountry = localize.defaultCountry;
                  }
               }

               return localize.activeCountry;
            },
           
            getTranslatedDescription: function(descriptions) {
               if (descriptions[localize.getActiveLanguage().toLowerCase()] !== undefined) {
                  return descriptions[localize.getActiveLanguage().toLowerCase()];
               }
               else {
                  return descriptions[localize.defaultLanguage];
               }
            },

            getSessionStoredLanguage: function() {
               return window.sessionStorage.language;
            },

            getSessionStoredCountry: function() {
               return window.sessionStorage.country;
            },

            getURL : function() {
               var activeLanguage = localize.getActiveLanguage();
               var activeCountry = localize.getActiveCountry();
               log.debug('language ' + activeLanguage);

               var url = localize.path + '/Enums_' + activeLanguage.toUpperCase() + '_' + activeCountry.toUpperCase() + '.json';
               log.debug('About to load ' + url);

               return url;
            },

            loadResources : function(onSuccess, onError) {
               log.debug('Loading definitions for language ' + localize.language);
               localize.loading = true;

               // request the resource file
               $http({ method:'GET', url: localize.getURL(), cache: true })
                  .success(function(data) {
                     localize.successCallback(data);
                     if (onSuccess) {
                        onSuccess();
                     }
                  })
                  .error(function() {
                     log.debug('ERROR loading language ' + localize.language);
                     localize.loading = false;
                     if (onError) {
                        onError();
                     }
               });
            },

            initLocalizedResources : function() {
               localize.loadResources(
                  function() {
                     //no special handling here when success
                  },
                  function() {
                     // the request failed, set default language
                     localize.setLanguage(localize.defaultLanguage);
                     localize.loadResources();
                  }
               );
            },

            getLocalizedString : function(value, placeholders) {
               //For debugging purposes programmers can change this in order to
               //see different results for non-translated strings
               var debugging = false;

               //return 'LOCALIZED'; // for i18n debugging
               if (localize.loading) {
                  if (debugging) {
                     return '!' + value + '!';
                  }

                  return '';
               }
               var enumPair = getEnumPair(value);
               var enumName = enumPair.enumName;
               value = enumPair.value;
               /*var enumName = 'Default'; //default, just in case
               var enumParts = value.split('.');
               if (enumParts.length === 2) {
                  enumName = enumParts[0];
                  value = enumParts[1];
               }
               else {
                  if (activeController.getActiveController() !== undefined) {
                     enumName = activeController.getActiveController();
                  }
                  else if ($route && $route.current && $route.current.$$route && $route.current.$$route.controller) {
                     enumName = $route.current.$$route.controller.replace('Controller', '');
                  }
               }*/

               // check to see if the resource file has been loaded
               /*if (!localize.resourceFileLoaded) {
                  // call the init method
                  localize.initLocalizedResources();
                  // set the flag to keep from looping in init
                  localize.resourceFileLoaded = true;

                  if (debugging) {
                     return '!' + value + '!';
                  }

                  return '';
               }*/

               if (!checkResourceFileLoaded()) {
                  if (debugging) {
                     return '!' + value + '!';
                  }

                  return '';
               }

               if (typeof localize.enums === 'object') {
                  return localize.localization.getLocalizedString(enumName, value, placeholders);
               }

               return '@' + value;
            },

            getLocalizedShortString : function(value) {
               //For debugging purposes programmers can change this in order to
               //see different results for non-translated strings
               var debugging = false;
               
               //return 'LOCALIZED'; // for i18n debugging
               if (localize.loading) {
                  if (debugging) {
                     return '!' + value + '!';
                  }
                  
                  return '';
               }
               
               var enumPair = getEnumPair(value);
               var enumName = enumPair.enumName;
               value = enumPair.value;

               if (!checkResourceFileLoaded()) {
                  if (debugging) {
                     return '!' + value + '!';
                  }
                  
                  return '';
               }
               
               if (typeof localize.enums === 'object') {
                  return localize.localization.getLocalizedShortString(enumName, value);
               }
               
               return '@' + value;
            },
            
            hasKey : function(value) {
               if (localize.loading) {
                  return false;
               }
               var enumPair = getEnumPair(value);
               var enumName = enumPair.enumName;
               value = enumPair.value;

               if (!checkResourceFileLoaded()) {
                  return false;
               }

               if (typeof localize.enums === 'object') {
                  return localize.localization.hasKey(enumName, value);
               }

               return false;
            },

            replace: function(elm, str) {
               var tag = localize.getLocalizedString(str);
               // update the element only if data was returned
               if ((tag !== null) && (tag !== undefined) && (tag !== '')) {
                  // insert the text into the element
                  elm.html(tag);
               }
            },
            
            getLocalizedEnumDescriptionByNumber : function(enumName, enumNumber) {
               return localize.localization.getLocalizedEnumDescriptionByNumber(enumName, enumNumber);
            },
            
            isCountryLi: function() {
               var isCountryLi = false;
               if (localize.loading && localize.cachedCountries !== undefined) {
                  isCountryLi = localize.getActiveCountry() === localize.cachedCountries.LI;
               }
               else {
                  isCountryLi = (localize.getActiveCountry() === localize.getLocalizedShortString('Countries.LI'));
               }
               return isCountryLi;
            },
            
            isCountryCh: function() {
               var isCountryCh = false;
               if (localize.loading && localize.cachedCountries !== undefined) {
                  isCountryCh = localize.getActiveCountry() === localize.cachedCountries.CH;
               }
               else {
                  isCountryCh = (localize.getActiveCountry() === localize.getLocalizedShortString('Countries.CH'));
               }
               return isCountryCh;
            }
         };
         
         // return the local instance when called
         return localize;
      }
   ]);

   return localization;
});



define('version-transformations', [
   'logger'
], function(Logger) {
   'use strict';

   var log = Logger.get('VersionTransformations');

   var getPathArray = function(pathString) {
      pathString = pathString.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
      pathString = pathString.replace(/^\./, '');           // strip a leading dot
      var pathArray = pathString.split('.');
      return pathArray;
   };
         
   var getAttributeByPath = function(obj, pathString) {
      var a = getPathArray(pathString);
      for (var i = 0, n = a.length; i < n; ++i) {
          var k = a[i];
          if (k in obj) {
              obj = obj[k];
          }
          else {
              return null;
          }
      }
      return obj;
   };
   var checkParent = function(obj, pathString) {
      if (pathString === '') {
         return false;
      }
      var a = getPathArray(pathString);
      if (a.length === 1) {
         return true;
      }
      a.pop();
      var parentString = a.join('.');
      if (checkPath(obj, parentString)) {
         return getAttributeByPath(obj, parentString) instanceof Object;
      }
      return false;
   };

   var checkPath = function(obj, pathString) {
      var a = getPathArray(pathString);
      for (var i = 0; i < a.length; i++) {
         if (!obj || !obj.hasOwnProperty(a[i])) {
            return false;
         }
         obj = obj[a[i]];
      }
      return true;
   };     

   var setAttributeByPath = function(obj, pathString, value) {
      var a = getPathArray(pathString);            
      var k;
      for (var i = 0, n = a.length; i < n; ++i) {
         k = a[i];
         if (k in obj && i < a.length - 1) {
            obj = obj[k];
         }
         else {
            if (i < a.length - 1) {
              obj[k] = {};
              obj = obj[k];
            }
         }
      }
      if (value !== undefined) {
         obj[k] = value;
      }
      else {
         delete obj[k];
      }
   };

   var deleteAttributeByPath = function(obj, pathString) {
      if (checkPath(obj, pathString)) {
         setAttributeByPath(obj, pathString, undefined);
      }
   };


   // MODEL TRANSFORMATION
   var ModelTransformation = function(update) {
      this.update = update;
   };
   ModelTransformation.prototype = {
      transform: function(object) {
                     return this.update(object);
                 }
   };

   //ADD
   var ModelTransformationAdd = function(from, value, comment) {
      this.from = from;
      this.value = value;
   };
   ModelTransformationAdd.prototype = {
      transform: function(object)  {
         if (!checkPath(object, this.from) && checkParent(object, this.from)) {
            setAttributeByPath(object, this.from, this.value);
         }
         return object;
      }
   };

   //REMOVE
   var ModelTransformationRemove = function(from, comment) {
      this.from = from;
      this.comment = comment;
   };
   ModelTransformationRemove.prototype = {
      transform: function(object) {
                     deleteAttributeByPath(object, this.from);
                     return object;
                  }
   };

   //RENAME
   var ModelTransformationRename = function(path, from, to, comment) {
      this.from = path + "." + from;
      this.to = path + "." + to;
      this.comment = comment;
   };
   ModelTransformationRename.prototype = {
      transform: function (object) {
         if (checkPath(object, this.from) && !checkPath(object, this.to) && checkParent(object, this.to)) {
            this.value = getAttributeByPath(object, this.from);
            deleteAttributeByPath(object, this.from);
            setAttributeByPath(object, this.to, this.value);
         }               
         return object;
      }
   };

   //MOVE
   var ModelTransformationMove = function(from, to, comment) {
      this.from = from;
      this.to = to;
      this.comment = comment;
   };
   ModelTransformationMove.prototype = {
      transform: function (object) {
         if (checkPath(object, this.from) && !checkPath(object, this.to) && checkParent(object, this.to)) {
            var value = getAttributeByPath(object, this.from);
            deleteAttributeByPath(object, this.from);
            setAttributeByPath(object, this.to, value);
         }               
         return object;
      }
   };

   //MOVE OR ADD
   var ModelTransformationMoveOrAdd = function(from, to, valueForAdd, comment) {
      this.from = from;
      this.to = to;
      this.valueForAdd = valueForAdd;
      this.comment = comment;
   };
   ModelTransformationMoveOrAdd.prototype = {
      transform: function (object) {
         if (!checkPath(object, this.to) && checkParent(object, this.to)) {
            if (checkPath(object, this.from)) {
               var value = getAttributeByPath(object, this.from);
               deleteAttributeByPath(object, this.from);
               setAttributeByPath(object, this.to, value);
            }
            else {
               setAttributeByPath(object, this.to, this.valueForAdd);
            }
         }
         return object;
      }
   };

   //COPY
   var ModelTransformationCopy = function(from, to, comment) {
      this.from = from;
      this.to = to;
      this.comment = comment;
   };
   ModelTransformationCopy.prototype = {
      transform: function (object) {
         if (checkPath(object, this.from) && checkParent(object, this.to)) {
            this.value = getAttributeByPath(object, this.from);
            setAttributeByPath(object, this.to, this.value);
         }
         return object;
      }
   };

   //TRANSFORM VALUE
   var ModelTransformationTransformValue = function(from, transformation, comment) {
      this.from = from;
      this.transformation = transformation;
      this.comment = comment;
   };
   ModelTransformationTransformValue.prototype = {
      transform: function (object) {
         if (checkPath(object, this.from)) {
            this.value = getAttributeByPath(object, this.from);
            this.value = this.transformation(this.value);
            setAttributeByPath(object, this.from, this.value);
         }               
         return object;
      }
   };



   // VERSION
   var Version = function Version(versionNumber) {
      if (isNaN(versionNumber)) {
         throw "versionNumber isNaN";
      }
      this.versionNumber = versionNumber;
      this.transformations = [];
   };

   Version.prototype.addTransformation = function(transformation) {
      this.transformations.push(transformation);
   };

   Version.prototype.addTransformations = function() {
      for (var index = 0; index < arguments.length; index++) {
         this.addTransformation(arguments[index]);
      }
   };
         
   var versionTransformations = {};

   versionTransformations.Version = Version;
   versionTransformations.ModelTransformation = ModelTransformation;
   versionTransformations.ModelTransformationAdd = ModelTransformationAdd;
   versionTransformations.ModelTransformationRemove = ModelTransformationRemove;
   versionTransformations.ModelTransformationRename = ModelTransformationRename;
   versionTransformations.ModelTransformationMove = ModelTransformationMove;
   versionTransformations.ModelTransformationMoveOrAdd = ModelTransformationMoveOrAdd;
   versionTransformations.ModelTransformationCopy = ModelTransformationCopy;
   versionTransformations.ModelTransformationTransformValue = ModelTransformationTransformValue;
   versionTransformations.getAttributeByPath = getAttributeByPath;
   versionTransformations.setAttributeByPath = setAttributeByPath;
   versionTransformations.checkPath = checkPath;
   versionTransformations.checkParent = checkParent;
   versionTransformations.deleteAttributeByPath = deleteAttributeByPath;

   return versionTransformations;
});


define('model-version-1.0', [
   'version-transformations'
], function (versionTransformations) {
   'use strict';
   
   var version = new versionTransformations.Version(1.0);
   return version;
});


define('version-manager', [
   'angular',
   'logger'
], function(angular, Logger) {
   'use strict';

   var versionManagerModule = angular.module('versionManagerModule', []);

   versionManagerModule.factory('versionManager', ['$q', '$rootScope',
      function($q, $rootScope) {
         var log = Logger.get('VersionManager');
         
         // VERSION MANAGER
         var VersionManager = function VersionManager() {
            this.versions = [];
         };

         VersionManager.prototype.indexOf = function(versionNumber) {
            for (var index = 0; index < this.versions.length; index++) {
               if (this.versions[index].versionNumber === versionNumber) {
                  return index;
               }
            }
            return -1;
         };

         VersionManager.prototype.addVersion = function(version) {
            if (isNaN(version.versionNumber)) {
               throw "versionNumber isNaN";
            }
            if (this.indexOf(version.versionNumber) === -1) {
               var pos = 0;
               while (this.versions[pos] && version.versionNumber > this.versions[pos].versionNumber) {
                  pos += 1;
               }
               this.versions.splice(pos, 0, version);
            }
            else {
               throw new Error('Version ' + version.versionNumber + ' already exists.');
            }
         };
         
         VersionManager.prototype.addVersions = function() {
            for (var index = 0; index < arguments.length; index++) {
               this.addVersion(arguments[index]);
            }
         };
         
         function initializeSavedStates(object) {
            var injector = angular.element(document.body).injector();

            // force base state initialization, in case of loading a very empty dossier
            injector.get('baseState');

            for (var property in object) {
               if (object.hasOwnProperty(property)) {
                  if (property !== 'version') {
                     injector.get(property + 'State');
                  }
               }
            }
         }
         var errorFunction = function(error) {
            return $q.reject(error);
         };
         
         VersionManager.prototype.getCurrentVersion = function() {
            if (this.versions.length > 0) {
               return this.versions[this.versions.length - 1].versionNumber;
            }
            return null;
         };
         
         VersionManager.prototype.needsToUpdate = function(object) {
            var length = this.versions.length;
            if (length > 0 && (!object.version || this.versions[length - 1].versionNumber > object.version)) {
               return true;
            }
            return false;
         };
         
         VersionManager.prototype.update = function(object, toVersionNumber) {
            initializeSavedStates(object);
            $rootScope.$broadcast("storageReset");
            
            var deferred = $q.defer();
            var currentPromise = deferred.promise;
            if (this.needsToUpdate(object)) {
               var currentPos = this.indexOf(object.version);
               var start = currentPos + 1;
               if (!toVersionNumber) {
                  toVersionNumber = this.getCurrentVersion();
               }
               var end = this.indexOf(toVersionNumber);

               for (var index = start; index <= end; index++) {
                  var version = this.versions[index];
                  /*
                  var i, j, k;
  
                  var e = new Error('dummy');
                  var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
                      .replace(/^\s+at\s+/gm, '')
                      .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
                      .split('\n');
                  */
                  
                  for (var tindex = 0; tindex < version.transformations.length; tindex++) {
                     var transformation = version.transformations[tindex];
                     currentPromise = currentPromise.then(
                             transformation.transform.bind(transformation)
                             ).catch(
                             errorFunction
                             );
                  }
               }
               currentPromise.then(function() {
                  object.version = toVersionNumber;
                  return object;
               }).catch(
                  errorFunction
               );
            }
            deferred.resolve(object);
            return currentPromise;
         };

         return VersionManager;
      }
   ]);

   return versionManagerModule;
});


define('model-updater', [
   'angular',
   'version-transformations',
   'model-version-1.0',
   'version-manager'
], function (angular, versionTransformations) {
   'use strict';
   var modelUpdaterModule = angular.module('modelUpdaterModule', ['versionManagerModule']);

   var versions = [];
   for (var argumentIndex = 0; argumentIndex < arguments.length; argumentIndex++) {
      var argument = arguments[argumentIndex];

      if (argument instanceof versionTransformations.Version) {
         versions.push(argument);
      }
   }

   modelUpdaterModule.factory('modelUpdater', ['versionManager', function (VersionManager) {
      var manager = new VersionManager();

      try {
         for (var versionIndex = 0; versionIndex < versions.length; versionIndex++) {
            var version = versions[versionIndex];
            manager.addVersion(version);
         }

         return manager;
      }
      catch (error) {
         throw error;
      }
   }]);
   return modelUpdaterModule;
});


define('storage-manager', [
   'angular',
   'parameters-manager',
   'common-object-utilities',
   'ng-storage',
   'application-constants',
   'model-updater'
], function(angular, parametersManager, ObjectUtilities) {
   'use strict';

   var storageManagerModule = angular.module('storageManagerModule', ['ngStorage']);
   var storageObject;

   storageManagerModule.factory('storageManager', ['$localStorage', '$sessionStorage', 'modelUpdater',
         function($localStorage, $sessionStorage, modelUpdater) {
            var manager = {
               initStorage : function() {
                  // get storage mode every time (tests change it while the app is running)
                  var storageMode = parametersManager.baseApplicationParameters.storageMode;

                  if (storageMode === StorageMode.NONE) {
                     //this is the obvious place for the following line, but it break the local storage test
                     //$localStorage.$reset();
                     //TODO: find a new way to reset the localStorage
                     storageObject = {};
                  }
                  else if (storageMode === StorageMode.LOCAL) {
                     storageObject = $localStorage;
                  }
                  else if (storageMode === StorageMode.SESSION) {
                     $localStorage.$reset();
                     storageObject = $sessionStorage;
                  }

                  if (storageObject && !storageObject.onlineCalc) {
                     storageObject.onlineCalc = {version: modelUpdater.getCurrentVersion()};
                  }

                  var objectUtilities = new ObjectUtilities();
                  for (var modelName in storageObject.onlineCalc) {
                     var model = storageObject.onlineCalc[modelName];
                     if (model instanceof Object) {
                        objectUtilities.protect(model);
                     }
                  }
               },
               
               getStoredObject : function(controllerName) {
                  return this.getFullStoredObject()[controllerName];
               },

               getFullStoredObject : function() {
                  if (modelUpdater.needsToUpdate(storageObject.onlineCalc)) {
                     storageObject.onlineCalc = {version: modelUpdater.getCurrentVersion()};
                  }
                  return storageObject.onlineCalc;
               },
               
               updateStoredObjectWith: function(anotherObject) {
                  var onlineCalc = this.getFullStoredObject();
                  var objectUtilities = new ObjectUtilities();
                  objectUtilities.extendDeep(onlineCalc, anotherObject);
                  for (var modelName in onlineCalc) {
                     var model = onlineCalc[modelName];
                     objectUtilities.protect(model);
                  }
               },

               storeObject : function(controllerName, obj) {
                  storageObject.onlineCalc[controllerName] = obj;
               },
               
               reset : function() {
                  $localStorage.$reset();
                  $sessionStorage.$reset();
                  storageObject = undefined;
                  
                  this.initStorage();
               },

               /*
                * SessionStorage
                */
               storeOnBrowserSessionStorage : function(objName, obj) {
                  window.sessionStorage.setItem(objName,  JSON.stringify(obj));
               },
               getFromBrowserSessionStorage : function(objName) {
                  var value = window.sessionStorage.getItem(objName);
                  if (value) {
                     try {
                        value = JSON.parse(value);
                        return value;
                     }
                     catch (err) {
                        return value;
                     }
                  }
               },
               removeFromBrowserSessionStorage : function(objName) {
                  window.sessionStorage.removeItem(objName);
               },
               clearBrowserSessionStorage : function() {
                  window.sessionStorage.clear();
               },
               
               
               
               /*
                * LocalStorage
                * ngStorage fails synchronizing to window.localStorage object. So
                * we record some values directly in window.localStorage when we need to keep them
                * after $localStorage.$reset
                */
               storeOnBrowserLocalStorage : function(objName, obj) {
                  if (typeof obj === 'string') {
                     window.localStorage.setItem(objName,  obj);
                  }
                  else {
                     window.localStorage.setItem(objName,  JSON.stringify(obj));
                  }
               },
               getFromBrowserLocalStorage : function(objName) {
                  var value = window.localStorage.getItem(objName);
                  if (value === "undefined") {
                     return '';
                  }
                  else {
                     try {
                        return JSON.parse(value);
                     }
                     catch (error) {
                        return value;
                     }
                  }
               },
               removeFromBrowserLocalStorage : function(objName) {
                  window.localStorage.removeItem(objName);
               }
               
            };

            manager.initStorage();

            return manager;
         }
      ]
   );

   return storageManagerModule;
});


define('calculators-manager', [
   'angular',
   'parameters-manager',
   'localization',
   'storage-manager'
], function(angular, parametersManager) {
   'use strict';

   var calculatorsManagerModule = angular.module('calculatorsManagerModule', []);
   var availableThemesCalculators = null;
   var availableCalculators = null;
   var availableThemes = null;
   var socialMediaUrls = null;
   var settings = parametersManager.baseViewParameters.calculatorsSettings;
   var baseViewParameters = parametersManager.baseViewParameters;
   var authorizedCalculators = parametersManager.baseApplicationParameters.authorizedCalculators;
   
   calculatorsManagerModule.factory('calculatorsManager', ['localize', '$rootScope', '$route', 'storageManager', function(localize, $rootScope, $route, storageManager) {
      // check if the browser supports cross domain
      // require wolf-calc only on service creation, and not as a in-advance dependency,
      // needed to allow dynamic configuration of the wolf deploy path
      var checkSupportCrossDomain = function() {
         var onlineSources = require.toUrl('wolf-calc');
         var currentUrl = window.location.protocol + "//" + window.location.hostname;
         return !window.isIE9 || (window.isIE9 && (onlineSources.slice(0, currentUrl) === currentUrl));
      };
      var supportCrossDomain = checkSupportCrossDomain();

      var calculatorsManager = {
         crossDomainSupported: function() {
            return supportCrossDomain;
         },
         isApplicationOverviewAvailable: function() {
            if (settings.overview.isAvailable !== undefined) {
               return settings.overview.isAvailable;
            }
            if (settings.isAvailable !== undefined) {
               return settings.isAvailable;
            }
            return true;
         },
         isCalculatorAvailable : function(calculatorId) {
            if (!supportCrossDomain) {
               return false;
            }
            var nameObj = this.getCalculatorNameObject(calculatorId);
            if (!nameObj || !nameObj.calculator) {
               return false;
            }
            var themeObj = settings.themes[nameObj.theme];
            if (themeObj === undefined) {
               return false;
            }
            return this.searchCalculatorAvailability(nameObj.theme, nameObj.calculator);
         },

         //expect a calculatorId (theme.calculator) containing theme and calculator and return an object with both strings

         getCalculatorNameObject: function(calculatorId) {
            var theme = null;
            var calculator = null;
            var parts = calculatorId.split(/[.#]/).filter(function(el) {
                  return el !== '';
               });
            if (parts.length < 1 || parts.length > 2) {
               return null;
            }
            theme = parts[0];
            if (parts.length === 2) {
               calculator = parts[1];
            }
            return {theme: theme, calculator: calculator};
         },

         getThemeNameFromString: function(calculatorId) {
            calculatorId = calculatorId.replace('/', '');
            var parts = calculatorId.split(/[.#]/).filter(function(el) {
                  return el !== '';
               });
            if (parts.length === 0) {
               return null;
            }
            return parts[0];
         },

         getCalculatorNameFromString: function(calculatorId) {
            var parts = calculatorId.split(/[.#]/).filter(function(el) {
                  return el !== '';
               });
            if (parts.length !== 2) {
               return null;
            }
            return parts[1];
         },

         isCalculatorAvailableForCurrentCountry: function(theme, calculator) {
            var country = localize.getActiveCountry();
            if ($route.current.params.country) {
               //The user specified the country in the URL, so use it
               country = $route.current.params.country.toUpperCase();
            }
            return (settings.themes[theme].calculations[calculator].availableCountries === undefined || 
                    settings.themes[theme].calculations[calculator].availableCountries.indexOf(country) > -1);
         },
         availabilityConditions: function(theme, calculator) {
            if (settings.themes[theme].calculations[calculator].isAvailable !== undefined) {
               return settings.themes[theme].calculations[calculator].isAvailable && this.isCalculatorAvailableForCurrentCountry(theme, calculator);
            }
            if (settings.themes[theme].isAvailable !== undefined) {
               return settings.themes[theme].isAvailable && this.isCalculatorAvailableForCurrentCountry(theme, calculator);
            }
            if (settings.isAvailable !== undefined) {
               return settings.isAvailable && this.isCalculatorAvailableForCurrentCountry(theme, calculator);
            }

            return true;
         },

         searchCalculatorAvailability: function(theme, calculator) {
            if (authorizedCalculators === undefined || authorizedCalculators === null || authorizedCalculators.length === 0) {
               return this.availabilityConditions(theme, calculator);
            }
            else {
               return (authorizedCalculators.indexOf(calculator) !== -1 && this.availabilityConditions(theme, calculator));
            }
         },
         searchThemeAvailability: function(theme) {
            if (settings.themes[theme].overview.isAvailable !== undefined) {
               return settings.themes[theme].overview.isAvailable;
            }
            if (settings.themes[theme].isAvailable !== undefined) {
               return settings.themes[theme].isAvailable;
            }
            if (settings.isAvailable !== undefined) {
               return settings.isAvailable;
            }

            return true;
         },

         availableThemesCalculators: function() {
            if (availableThemesCalculators !== null) {
               if (availableThemesCalculators.length !== 0) {
                  return availableThemesCalculators;   
               }
            }
            availableThemesCalculators = [];
            if (!supportCrossDomain) {
               return;
            }
            for (var themeKey in settings.themes) {
               if (settings.themes[themeKey] === undefined) {
                  //Ignore undefined themes
                  continue;
               }
               if (settings.themes.hasOwnProperty(themeKey)) {
                  var theme = settings.themes[themeKey];
                  for (var calcKey in theme.calculations) {
                     if (theme.calculations.hasOwnProperty(calcKey)) {
                        if (this.searchCalculatorAvailability(themeKey, calcKey)) {
                           availableThemesCalculators.push({theme:themeKey, calculator:calcKey});
                        }
                     }
                  }
               }
            }
            return availableThemesCalculators;
         },

         availableCalculatorsByTheme: function(theme) {
            return this.availableThemesCalculators().filter(function(el) {
               return el.theme === theme;
            });
         },

         // Return a list of strings with the name of the available calculators without duplicates
         availableCalculators: function() {
            if (availableCalculators !== null) {
               return availableCalculators;
            }
            availableCalculators = [];
            if (!supportCrossDomain) {
               return availableCalculators;
            }
            var calcs = [];
            var themeCalcs = this.availableThemesCalculators();
            for (var themeCalcIndex in themeCalcs) {
               calcs.push(themeCalcs[themeCalcIndex].calculator);
            }
            availableCalculators = calcs.filter(function(elem, pos) {
               return calcs.indexOf(elem) === pos;
            });
            return availableCalculators;
         },

         availableThemes: function() {
            if (!availableThemes) {
               availableThemes = [];
               if (supportCrossDomain) {
                  var themes = settings.themes;
                  for (var key in themes) {
                     if (settings.themes[key] === undefined) {
                        //Ignore undefined themes
                        continue;
                     }
                     if (this.searchThemeAvailability(key)) {
                        var theme = themes[key];
                        theme.id = key; //extend the theme with the id
                        availableThemes.push(theme);
                     }
                  }
               }
               availableThemes.sort(function(theme1, theme2) {
                  return theme1.order - theme2.order;
               });

            }
            return availableThemes;
         },

         isThemeAvailable: function(themeId) {
            return $.grep(this.availableThemes(), function(theme) {
               return theme.id === themeId;
            }).length > 0;
         },

         getCalculatorsByName: function(calculatorName) {
            var themesCalculators = this.availableThemesCalculators();
            var calculators = themesCalculators.filter(function(el) {
               return el.calculator === calculatorName;
            });
            return calculators;
         },

         isAnyCalculatorAvailableByName: function(calculatorName) {
            var calculators = this.getCalculatorsByName(calculatorName);
            return calculators.length > 0;
         },

         /**
          * Answers any path for a given calculator name (there can be many).
          *
          * The calculator name and the returned path are both non translated.
          *
          * Examples:
          *    "houseAffordability" ==> "house/houseAffordability"
          *    "capitalizationTax"  ==> "taxes/capitalizationTax"
          *
          * @param {String} calculatorName A calculator name
          * @returns {String} Any path reaching that calculator
          */
         getAnyPathForCalculatorByName: function(calculatorName) {
            var calculators = this.getCalculatorsByName(calculatorName);
            if (calculators.length === 0) {
               return null;
            }
            return calculators[0].theme + '/' + calculators[0].calculator;
         },

         /**
          * Answers a path for a given calculator and theme.
          *
          * The calculator name, theme name and the returned path are all non translated.
          *
          * @param {type} theme A theme name
          * @param {type} calculator A calculator name
          * @returns {String} Path reaching the given calculator in the given theme
          */
         getCalculatorPath: function(theme, calculator) {
            return theme + '/' + calculator;
         },

         isValidNonEmptyString : function(value) {
            return (value !== undefined && value !== null && value !== '');
         },

         getContactUrl: function(themeCalculatorName) {
            var themeName = null;
            var calculatorName = null;
            if (themeCalculatorName !== "multicalc") {
               var nameObj = this.getCalculatorNameObject(themeCalculatorName);
               if (nameObj === null) {
                  return null;
               }
               themeName = nameObj.theme;
               calculatorName = nameObj.calculator;
            }


            // the URL can be specified for each theme/calculator, for the full theme, or for the full app,
            // and for all those cases, as a single URL for all languages or as separated URLs for each language.
            var language = localize.getActiveLanguage();
            var contactUrlObj = null;
            if (this.isValidNonEmptyString(calculatorName) && settings.themes[themeName] !== undefined && settings.themes[themeName].calculations[calculatorName] !== undefined) {
               // try for the calculator, as single URL for all languages
               contactUrlObj = settings.themes[themeName].calculations[calculatorName].contactUrl;
               if (typeof(contactUrlObj) === "string") {
                  return contactUrlObj;
               }

               // try for the calculator, as separated URL for each languages
               if (typeof(contactUrlObj) !== "undefined" && contactUrlObj !== null) {
                  return contactUrlObj[language];
               }
            }

            if (this.isValidNonEmptyString(themeName) && settings.themes[themeName] !== undefined) {
               // try for the theme, as single URL for all languages
               contactUrlObj = settings.themes[themeName].contactUrl;
               if (typeof(contactUrlObj) === "string") {
                  return contactUrlObj;
               }

               // try for the theme, as separated URL for each languages
               if (typeof(contactUrlObj) !== "undefined" && contactUrlObj !== null) {
                  return contactUrlObj[language];
               }
            }

            // try for the full app, as single URL for all languages
            if (typeof(settings.contactUrl) === "string") {
               return settings.contactUrl;
            }

            // try for the full app, as separated URL for each languages
            if (typeof(settings.contactUrl) !== "undefined") {
               return settings.contactUrl[language];
            }

            return null;
         },
         //SocialMedia
         addSocialMedia: function(currentSocialMedia, socialMediaUrlsObjs, language) {
            for (var socialMediaEl in socialMediaUrlsObjs) {
               if (currentSocialMedia[socialMediaEl] === undefined || currentSocialMedia[socialMediaEl] === null) {
                  if (typeof(socialMediaUrlsObjs[socialMediaEl]) === 'string') {
                     currentSocialMedia[socialMediaEl] = socialMediaUrlsObjs[socialMediaEl];
                  }
                  else if (typeof(socialMediaUrlsObjs[socialMediaEl]) !== 'undefined') {
                     currentSocialMedia[socialMediaEl] = socialMediaUrlsObjs[socialMediaEl][language];
                  }
               }
            }
         },
         getSocialMediaUrl: function(path, socialMediaId) {
            var url = this.getSocialMediaUrls()[path][socialMediaId];
            return url;
         },
         getSocialMediaUrls: function() {
            if (socialMediaUrls !== undefined && socialMediaUrls !== null) {
               return socialMediaUrls;
            }
            socialMediaUrls = {};
            var language = localize.getActiveLanguage();
            var calculatorsSettings = parametersManager.baseViewParameters.calculatorsSettings;
            for (var themeName in calculatorsSettings.themes) {
               if (calculatorsSettings.themes[themeName] === undefined) {
                  //Ignore undefined themes
                  continue;
               }
               var themeSettings = calculatorsSettings.themes[themeName];
               for (var calculatorName in themeSettings.calculations) {
                  var calculatorSettings = themeSettings.calculations[calculatorName];
                  var calculatorSocialMediaUrls = {};
                  this.addSocialMedia(calculatorSocialMediaUrls, calculatorSettings.socialMediaUrls, language);
                  this.addSocialMedia(calculatorSocialMediaUrls, themeSettings.socialMediaUrls, language);
                  this.addSocialMedia(calculatorSocialMediaUrls, calculatorsSettings.socialMediaUrls, language);
                  var calculatorId = themeName + '.' + calculatorName;
                  socialMediaUrls[calculatorId] = calculatorSocialMediaUrls;
               }
               var themeSocialMediaUrls = {};
               this.addSocialMedia(themeSocialMediaUrls, themeSettings.overview.socialMediaUrls, language);
               this.addSocialMedia(themeSocialMediaUrls, themeSettings.socialMediaUrls, language);
               this.addSocialMedia(themeSocialMediaUrls, calculatorsSettings.socialMediaUrls, language);
               socialMediaUrls[themeName] = themeSocialMediaUrls;
            }
            var overviewSocialMediaUrls = {};
            this.addSocialMedia(overviewSocialMediaUrls, calculatorsSettings.overview.socialMediaUrls, language);
            this.addSocialMedia(overviewSocialMediaUrls, calculatorsSettings.socialMediaUrls, language);
            socialMediaUrls.overview = overviewSocialMediaUrls;

            return socialMediaUrls;
         },
         getAvailableSocialMedia: function(themeCalculatorName) {
            var socialMedia = this.getSocialMediaUrls()[themeCalculatorName];
            var availableSocialMedia = [];
            if (socialMedia !== undefined) {
               for (var el in socialMedia) {
                  if (this.isValidNonEmptyString(socialMedia[el])) {
                     availableSocialMedia.push(el);
                  }
               }
            }
            return availableSocialMedia;
         },
         resetSocialMediaUrl: function() {
            socialMediaUrls = null;
         },
         reset: function() {
            settings = parametersManager.baseViewParameters.calculatorsSettings;
            authorizedCalculators = parametersManager.baseApplicationParameters.authorizedCalculators;
            availableThemesCalculators = null;
            availableCalculators = null;
            availableThemes = null;
            this.resetSocialMediaUrl();
         }
      };

      $rootScope.$on('countryChangeSuccess', function() {
         calculatorsManager.reset();
      });

      return calculatorsManager;
   }]);

   return calculatorsManagerModule;
});




define('route-resolver', [
   'angular',
   'parameters-manager',
   'routes-handler',
   'calculators-manager'
], function(angular, parametersManager) {
   'use strict';

   var routeResolver = function() {
      this.$get = function() {
         return this;
      };

      this.route = (function() {
         var resolveDependencies = function($q, $rootScope, dependencies) {
            var defer = $q.defer();
            require(dependencies, function() {
               defer.resolve();
               $rootScope.$apply();
            });

            return defer.promise;
         };

         var resolve = function(templateUrl, controllerName, controllerDependency, reloadOnSearch, isCalculatorAvailable) {
            if (reloadOnSearch === undefined) {
               reloadOnSearch = true;
            }

            var routeDef = {};
            routeDef.templateUrl = templateUrl;
            routeDef.controller = controllerName;
            routeDef.reloadOnSearch = reloadOnSearch;
            routeDef.resolve = {
               load: ['$q', '$rootScope', 'locationService', 'calculatorsManager', function($q, $rootScope, locationService, calculatorsManager) {
                  var dependencies = [controllerDependency];
                  if (locationService.getSearch().consultantMode) { /* for_development_only */
                     parametersManager.baseApplicationParameters.consultantMode = locationService.getSearch().consultantMode === "true"; /* for_development_only */
                  }/* for_development_only */
                  if (parametersManager.baseApplicationParameters.consultantMode) {
                     if (typeof(isCalculatorAvailable) === "function" && !isCalculatorAvailable(calculatorsManager)) {
                        locationService.setPath('/login');
                     }
                     else {
                        if (window.sessionStorage.userLogged === undefined &&
                            controllerName !== 'registerController' &&
                            controllerName !== 'confirmationController' &&
                            controllerName !== 'loginController'  &&
                            controllerName !== 'userAccountController'  &&
                            controllerName !== 'consultantUserAccountController'  &&
                            controllerName !== 'resetPasswordController') {
                           locationService.setPath('/login');
                        }
                        else if (controllerName === 'overviewController' && window.sessionStorage.userLogged === undefined) {
                           locationService.setPath('/login');
                        }
                     }
                  }
                  else {
                     if (typeof(isCalculatorAvailable) === "function" && !isCalculatorAvailable(calculatorsManager)) {
                        locationService.setPath('/');
                     }
                  }
                  return resolveDependencies($q, $rootScope, dependencies);
               }]
            };

            return routeDef;
         };

         return {
            resolve: resolve
         };
      }());
   };

   var servicesApp = angular.module('routeResolverServices', []);

   //Must be a provider since it will be injected into module.config()
   servicesApp.provider('routeResolver', routeResolver);
});


define('custom-route-registrator', [
], function() {
   'use strict';

   var routeRegistrator = {
      registerRoute: function($routeProvider, routeResolver, lang) {
      }
   };

   return routeRegistrator;
});


define('route-registrator', [
   'angular',
   'routes-handler',
   'parameters-manager',
   'custom-route-registrator'
], function(angular, RoutesHandler, parametersManager, customRouteRegistrator) {
   'use strict';

   /**
    * The Route Registrator takes care of registering routes for controllers.
    * It's separated from the main App configuration in order to allow tests to redefine translated routes and then reload them.
    * Since it's still used from the App configuration, it must also be registered as a Provider.
    */

   /**
    * Route Registrator itself, single instance.
    */
   var routeRegistrator = {
      reset: function() {
         RoutesHandler.reset();
         //TODO: more?
      },
      registerCalculatorRoute: function($routeProvider, path, lang, resolvedRoute) {
         $routeProvider.when(RoutesHandler.getCheckedPath(path, lang), resolvedRoute);
      },
      
      registerRoute: function($routeProvider, routeResolver, lang) {
         $routeProvider.when(RoutesHandler.getCheckedPath('/', lang),
            routeResolver.resolve('src/controllers/multicalc/multicalc.html', 'multicalcController', 'multicalc-controller', true));
         
         customRouteRegistrator.registerRoute($routeProvider, routeResolver, lang);

         $routeProvider.otherwise({redirectTo : '/'});
      }
   };

   /**
    * Route Registrator Provider
    */
   var routeRegistratorProvider = function() {
      this.$get = function() {
         return this;
      };

      this.routeRegistrator = routeRegistrator;
   };

   var servicesApp = angular.module('routeRegistratorServices', []);

   //Must be a provider since it will be injected into module.config()
   servicesApp.provider('routeRegistrator', routeRegistratorProvider);
});


define('state', [
   'angular',
   'common-object-utilities',
   'storage-manager',
   'model-constants'
], function (angular, ObjectUtilities) {
   'use strict';
   var stateModule = angular.module('stateModule', ['storageManagerModule']);
   stateModule.factory('state', ['storageManager', '$rootScope', function (storageManager, $rootScope) {
      var objectUtilities = new ObjectUtilities();

      var state;

      state = {};

      state.create = function(id, modelCreator, refresh) {
         var model;

         model = storageManager.getStoredObject(id);

         if (!model) {
            model = modelCreator();
            objectUtilities.protect(model);
            refresh(model);
            storageManager.storeObject(id, model);
         }

         $rootScope.$on('storageReset', function() {
            refresh(model);
            storageManager.storeObject(id, model);
         });

         var newState = {};
         newState.getModel = function() {
            return model;
         };
         newState.get = function() {
            return storageManager.getStoredObject(id);
         };
         newState.createModel = function(model) {
            objectUtilities.protect(model);
            return model;
         };
         return newState;
      };

      //Needed for cases in which the state is used as helper
      state.createModel = function(model) {
         objectUtilities.protect(model);
         return model;
      };

      return state;
   }]);
   return stateModule;
});


define('base-model', [
], function() {
   'use strict';

   var HouseFinancing = function() {
      this.class1MortgagesInitialized = null;
      this.class1Mortgages = null;
      this.class2Mortgage = null;
      this.specialConditions = null;
      this.class1MortgageAmount = null;
      this.class2MortgageAmount = null;
      this.totalAmortizationAmount = null;
      this.yearlyAmortizationAmount = null;
      this.hasClass2Mortgage = null;

      Object.preventExtensions(this);
   };

   var House = function() {
      this.ownCapital = null;
      this.houseValue = null;
      this.effectiveCostMortgageInterestRate = null;
      this.selectedInterest = null;
      this.financing = new HouseFinancing();

      Object.preventExtensions(this);
   };

   var model = {
      HouseFinancing: HouseFinancing,
      House: House
      };
   return model;
});


define('base-state', [
   'angular',
   'parameters-manager',
   'base-model',
   'state',
   'storage-manager',
   'model-constants'
], function (angular, parametersManager, baseModel) {
   'use strict';
   var baseStateModule = angular.module('baseStateModule', ['storageManagerModule']);
   baseStateModule.factory('baseState', ['storageManager', '$rootScope', 'state', function (storageManager, $rootScope, state) {

      var refresh = function (baseState) {
         baseState.relationship = null;
         baseState.relationshipSinceYear = null;
         baseState.mainPerson.defaultCivilStatus = null;
         baseState.mainPerson.civilStatus = null;
         baseState.mainPerson.confession = null;
         baseState.mainPerson.sex = null;
         baseState.mainPerson.birthYear = null;
         baseState.mainPerson.grossIncome = null;
         baseState.mainPerson.taxableIncome = null;
         baseState.mainPerson.yearlyNetIncome = null;
         baseState.mainPerson.monthlyNetIncome = null;
         baseState.mainPerson.grossFortune = null;
         baseState.mainPerson.taxableFortune = null;
         baseState.mainPerson.entryType = null;
         baseState.mainPerson.firstPillarBase = null;
         baseState.mainPerson.missingYears = null;
         baseState.mainPerson.secondPillarBase = null;
         baseState.mainPerson.secondPillarRent = null;
         baseState.mainPerson.secondPillarCapital = null;
         baseState.mainPerson.numberOfOwnChildren = null;
         baseState.mainPerson.averageIncome = null;
         baseState.mainPerson.disabilityRent = null;
         baseState.mainPerson.disabilityChildrenRent = null;
         baseState.mainPerson.widowRent = null;
         baseState.mainPerson.orphanRent = null;
         baseState.mainPerson.pensionRent = null;
         baseState.mainPerson.manualDisabilityChildrenRent = false;
         baseState.mainPerson.manualDisabilityRent = false;
         baseState.mainPerson.manualWidowRent = false;
         baseState.mainPerson.manualOrphanRent = false;
         baseState.mainPerson.manualPensionRent = false;
         
         baseState.secondPerson.defaultCivilStatus = null;
         baseState.secondPerson.civilStatus = null;
         baseState.secondPerson.confession = null;
         baseState.secondPerson.sex = null;
         baseState.secondPerson.birthYear = null;
         baseState.secondPerson.grossIncome = null;
         baseState.secondPerson.taxableIncome = null;
         baseState.secondPerson.yearlyNetIncome = null;
         baseState.secondPerson.monthlyNetIncome = null;
         baseState.secondPerson.grossFortune = null;
         baseState.secondPerson.taxableFortune = null;
         baseState.secondPerson.entryType = null;
         baseState.secondPerson.firstPillarBase = null;
         baseState.secondPerson.missingYears = null;
         baseState.secondPerson.secondPillarBase = null;
         baseState.secondPerson.secondPillarRent = null;
         baseState.secondPerson.secondPillarCapital = null;
         baseState.secondPerson.numberOfOwnChildren = null;
         baseState.secondPerson.disabilityChildrenRent = null;
         baseState.secondPerson.disabilityRent = null;
         baseState.secondPerson.widowRent = null;
         baseState.secondPerson.orphanRent = null;
         baseState.secondPerson.pensionRent = null;
         baseState.secondPerson.manualDisabilityChildrenRent = false;
         baseState.secondPerson.manualDisabilityRent = false;
         baseState.secondPerson.manualWidowRent = false;
         baseState.secondPerson.manualOrphanRent = false;
         baseState.secondPerson.manualPensionRent = false;

         baseState.hasDetailedNumberOfChildren = null;
         baseState.numberOfChildren = null;
         baseState.numberOfCoupleChildren = null;
         baseState.zipAndLocation = null; //don't set. It will be loaded later
         baseState.country = null;

         baseState.isBaseDataExpanded = null;
         baseState.tax.grossIncome = null;
         baseState.tax.taxableIncome = null;
         baseState.tax.taxableIncomeDetailed = false;
         baseState.tax.grossFortune = null;
         baseState.tax.taxableFortune = null;
         baseState.tax.yearlyNetIncome = null;
         baseState.tax.monthlyNetIncome = null;
         baseState.tax.entryType = null;
         baseState.tax.taxableIncomeDetail.countryTaxableIncome = null;
         baseState.tax.taxableIncomeDetail.cantonalRateDecisiveIncome = null;
         baseState.tax.taxableIncomeDetail.countryRateDecisiveIncome = null;

         baseState.house.ownCapital = null;
         baseState.house.houseValue = null;
         baseState.house.effectiveCostMortgageInterestRate = null;
         baseState.house.selectedInterest = null;

         baseState.house.financing.class1MortgagesInitialized = false;
         baseState.house.financing.class1Mortgages = [];

         baseState.house.financing.class2Mortgage = null;
         baseState.house.financing.class1MortgageAmount = null;
         baseState.house.financing.class2MortgageAmount = null;
         baseState.house.financing.totalAmortizationAmount = null;
         baseState.house.financing.yearlyAmortizationAmount = null;
         baseState.house.financing.hasClass2Mortgage = null;
         baseState.house.financing.specialConditions.assigned = null;

         baseState.saving.endCapital = null;
         baseState.saving.initialInvestment = null;
         baseState.saving.modality = null;
         baseState.saving.monthlyPeriodicInvestment = null;
         baseState.saving.yearlyPeriodicInvestment = null;
         baseState.saving.duration = null;
         baseState.saving.selectedInterest = null;
         baseState.saving.interestRate = null;
         baseState.saving.specialConditions = null;

         baseState.defaultGrossIncome = null;
         baseState.defaultNetIncome = null;
         baseState.currentFortune = null;
         baseState.pensionInterest = null;
         baseState.selectedFortunePension = null;
         baseState.showPensionNeedAsPercentage = null;
         baseState.pensionNeedPercentage = null;
         baseState.pensionNeedAmount = null;
         baseState.yearlySavings = null;
         baseState.thirdPillarRent = null;

         if (!parametersManager.baseViewParameters.askConsultantDataForPrinting) {
            storageManager.removeFromBrowserLocalStorage('consultantInfo');
            storageManager.removeFromBrowserLocalStorage('additionalData');
         }
         else {
            // on new consulting, check if delete customer info paramter is true before deleting the data
            if (parametersManager.baseViewParameters.deleteCustomerInfo) {
               baseState.additionalPrintingData.customerInfo = "";
               baseState.additionalPrintingData.customerNumber = "";
            }
            

            var consultantInfo = storageManager.getFromBrowserLocalStorage('consultantInfo');
            if (consultantInfo) {
               baseState.additionalPrintingData.consultantInfo = consultantInfo;
            }
            else {
               storageManager.storeOnBrowserLocalStorage('consultantInfo', baseState.additionalPrintingData.consultantInfo);
            }

            var additionalData = storageManager.getFromBrowserLocalStorage('additionalData');
            if (additionalData) {
               baseState.additionalPrintingData.additionalData = state.createModel(additionalData);
            }
            else {
               storageManager.storeOnBrowserLocalStorage('additionalData', baseState.additionalPrintingData.additionalData);
            }
         }
      };

      var modelCreator = function() {
         var baseState;
         baseState = {};

         baseState.relationship = null;
         baseState.relationshipSinceYear = null;
         baseState.hasDetailedNumberOfChildren = null;
         baseState.numberOfChildren = null;
         baseState.numberOfCoupleChildren = null;
         baseState.zipAndLocation = null;
         baseState.country = null;
         baseState.isBaseDataExpanded = null;
         baseState.defaultGrossIncome = null;
         baseState.defaultNetIncome = null;
         baseState.currentFortune = null;
         baseState.pensionInterest = null;
         baseState.selectedFortunePension = null;
         baseState.showPensionNeedAsPercentage = null;
         baseState.pensionNeedPercentage = null;
         baseState.pensionNeedAmount = null;
         baseState.yearlySavings = null;
         baseState.thirdPillarRent = null;

         baseState.additionalPrintingData = {
            customerInfo: null,
            customerNumber: null,
            consultantInfo: "", //TODO: should be null, but check its usage
            additionalData: null
         };

         baseState.house = {
            ownCapital: null,
            houseValue: null,
            effectiveCostMortgageInterestRate: null,
            selectedInterest: null,
            financing: {
               class1MortgagesInitialized: null,
               class1Mortgages: null,
               class2Mortgage: null,
               specialConditions: {
                  assigned: null
               },
               class1MortgageAmount: null,
               class2MortgageAmount: null,
               totalAmortizationAmount: null,
               yearlyAmortizationAmount: null,
               hasClass2Mortgage: null
            }
         };
         baseState.mainPerson = {
            defaultCivilStatus: null,
            civilStatus: null,
            confession: null,
            sex: null,
            birthYear: null,
            grossIncome: null,
            taxableIncome: null,
            monthlyNetIncome: null,
            yearlyNetIncome: null,
            grossFortune: null,
            taxableFortune: null,
            entryType: null,
            firstPillarBase: null,
            missingYears: null,
            secondPillarBase: null,
            secondPillarRent: null,
            secondPillarCapital: null,
            numberOfOwnChildren: null,
            averageIncome: null,
            disabilityRent: null,
            disabilityChildrenRent: null,
            widowRent: null,
            orphanRent: null,
            pensionRent: null,
            manualDisabilityChildrenRent: null,
            manualDisabilityRent: null,
            manualWidowRent: null,
            manualOrphanRent: null,
            manualPensionRent: null
         };

         baseState.secondPerson = {
            defaultCivilStatus: null,
            civilStatus: null,
            confession: null,
            sex: null,
            birthYear: null,
            grossIncome: null,
            taxableIncome: null,
            grossFortune: null,
            taxableFortune: null,
            monthlyNetIncome: null,
            yearlyNetIncome: null,
            entryType: null,
            firstPillarBase: null,
            missingYears: null,
            secondPillarBase: null,
            secondPillarRent: null,
            secondPillarCapital: null,
            numberOfOwnChildren: null,
            averageIncome: null,
            disabilityRent: null,
            disabilityChildrenRent: null,
            widowRent: null,
            orphanRent: null,
            pensionRent: null,
            manualDisabilityChildrenRent: null,
            manualDisabilityRent: null,
            manualWidowRent: null,
            manualOrphanRent: null,
            manualPensionRent: null
         };

         baseState.tax = {
            grossIncome: null,
            taxableIncome: null,
            taxableIncomeDetailed: false,
            grossFortune: null,
            taxableFortune: null,
            yearlyNetIncome: null,
            monthlyNetIncome: null,
            entryType: null,
            taxableIncomeDetail: {
               countryTaxableIncome: null,
               cantonalRateDecisiveIncome: null,
               countryRateDecisiveIncome: null
            }
         };

         baseState.saving = {
            endCapital: null,
            initialInvestment: null,
            modality: null,
            monthlyPeriodicInvestment: null,
            yearlyPeriodicInvestment: null,
            duration: null,
            selectedInterest:null,
            interestRate: null,
            specialConditions: null
         };
         
         
         return baseState;
      };

      return state.create('base', modelCreator, refresh).getModel();
   }]);
   return baseStateModule;
});



define('calculator-service', [
   'angular',
   'logger',
   'parameters-manager'
], function(angular, Logger, parametersManager) {
   'use strict';

   var log = Logger.get('calculatorService');
   var asynchLog = Logger.get('AsynchronousModeProfile');
   var asynchDetailLog = Logger.get('AsynchronousModeDetailedProfile');

   var calculatorServiceModule = angular.module('calculatorServiceModule', []);

   calculatorServiceModule.factory('calculatorService', ['$http', '$q', 'authenticationService',
      function($http, $q, authenticationService) {
         if (asynchDetailLog && !asynchDetailLog.enabledFor(Logger.DEBUG)) {
            asynchDetailLog = undefined;
         }

         var calculatorService = {
            requestsArray: [],
            deferredArray: [],
            calculatorInitializationDeferred: {},
            getServiceURL: function() {
               return parametersManager.baseApplicationParameters.calculatorServiceURL + '/' +
                      parametersManager.baseApplicationParameters.calculatorCustomization;
            },
            
            /**
             * For some reason, the calculations use different names on server side
             * @param {String} calculatorName Name of the calculator as the web application knows it
             * @returns {String} Name of the calculator as the server application knows it
             */
            getServerCalculatorName: function(calculatorName) {
               if (calculatorName === "ch.logismata.online.calc") {
                  return 'online.tax';
               }
               if (calculatorName === "ch.logismata.rpopulaires.calc") {
                  return 'rpopulaires';
               }
            },

            getLocalCalculatorByName: function(calculatorName) {
               if (calculatorName === "ch.logismata.online.calc") {
                  return ch.logismata.online.calc;
               }
               if (calculatorName === "ch.logismata.rpopulaires.calc") {
                  return ch.logismata.rpopulaires.modulo;
               }
            },

            getLocalCalculatorRequireName: function(calculatorName) {
               if (calculatorName === "ch.logismata.online.calc") {
                  return 'wolf-calc';
               }
               if (calculatorName === "ch.logismata.rpopulaires.calc") {
                  return 'wolf-rpopulaires';
               }
            },

            initializeCalculator: function(calculatorName) {
               if (this.calculatorInitializationDeferred[calculatorName]) {
                  return this.calculatorInitializationDeferred[calculatorName].promise;
               }

               var deferred = $q.defer();
               this.calculatorInitializationDeferred[calculatorName] = deferred;

               asynchLog.debug("initializing calculator " + calculatorName);

               var localCalculatorRequireName = this.getLocalCalculatorRequireName(calculatorName);
               var that = this;
               require([localCalculatorRequireName], function() {
                  var calculatorUrl = require.toUrl(localCalculatorRequireName);
                  var calculatorPath = calculatorUrl.substring(0, calculatorUrl.lastIndexOf('/'));
                  var calculator = that.getLocalCalculatorByName(calculatorName);
                  calculator.loadFrom(calculatorPath);
                  deferred.resolve();
               });
               
               return deferred.promise;
            },

            initializeRequestedCalculators: function(calculatorNames) {
               var initializeCalculatorPromises = [];

               for (var index = 0; index < calculatorNames.length; index++) {
                  var calculatorName = calculatorNames[index];

                  initializeCalculatorPromises.push(this.initializeCalculator(calculatorName));
               }

               return $q.all(initializeCalculatorPromises);
            },
            doLocalCalculations: function(requests) {
               var deferred = $q.defer();
               var results = [];
               var result = {};
               var calculator;
               var calculation;
               var index;

               var calculatorNames = [];
               for (index = 0; index < requests.length; index++) {
                  var calculatorName = requests[index].calculatorName;
                  if (calculatorNames.indexOf(calculatorName) === -1) {
                     calculatorNames.push(calculatorName);
                  }
               }

               var that = this;
               this.initializeRequestedCalculators(calculatorNames).then(function() {
                  for (index = 0; index < requests.length; index++) {
                     try {
                        calculator = that.getLocalCalculatorByName(requests[index].calculatorName);
                        calculation = calculator[requests[index].calculationName];
                     }
                     catch (error) {
                        log.error("Error finding calculation. " +
                              "calculator=" + requests[index].calculatorName + " " +
                              "calculation=" + requests[index].calculationName + " " +
                              "parameters=" + JSON.stringify(requests[index].calculationParameters)
                              );
                        throw error;
                     }
                        
                     asynchLog.debug("CALC " + requests[index].calculationName);
                     if (asynchDetailLog) {
                        asynchDetailLog.debug("CALC " + requests[index].calculationName + " INDEX " + index + " parameters: " + requests[index].calculationParameters.length);
                     }

                     try {
                        result.response = calculation.apply(calculator, requests[index].calculationParameters);
                        result.errorCode = 0; // errorCode OK
                        results.push(result);
                     }
                     catch (error) {
                        log.error("Error calling calculator. " +
                              "calculator=" + requests[index].calculatorName + " " +
                              "calculation=" + requests[index].calculationName + " " +
                              "parameters=" + JSON.stringify(requests[index].calculationParameters)
                              );
                        throw error;
                     }

                     result = {};
                  }

                  for (index = 0; index < requests.length; index++) {
                     if (asynchDetailLog) {
                        asynchDetailLog.debug("Result " + index + " : " + requests[index].calculatorName + " - " + requests[index].calculationName + " : " + JSON.stringify(results[index]));
                     }
                  }
   //               //for testing delay on calculations
   //               /* jshint ignore:start */                        
   //                  setTimeout(function() {
   //                     deferred.resolve(results);
   //                  }, 1000);
   //                  /* jshint ignore:end */
   //                  
   //               //for testing delay on calculations

                  deferred.resolve(results);
               });

               return deferred.promise;
            },
            doServerCalculations: function(requests) {
               var deferred = $q.defer();
               var url = this.getServiceURL() + '/calculate';
               
               var serverRequests = [];
               var index;
               
               for (index = 0; index < requests.length; index++) {
                  serverRequests[index] = {};
                  serverRequests[index].calculatorName = this.getServerCalculatorName(requests[index].calculatorName);
                  serverRequests[index].method = requests[index].calculationName;
                  serverRequests[index].params = requests[index].calculationParameters;
               }
               
               var that = this;
               authenticationService.getCalculatorServiceToken().then(function(result) {
                  $http({
                     timeout: parametersManager.baseApplicationParameters.httpTimeout,
                     method: 'PUT',
                     url: url,
                     responseType: 'json',
                     cache: false,
                     headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                     },
                     data: {
                        authToken : result.authToken,
                        requests : serverRequests
                     }
                  }).success(function(data, status, headers, config) {
                     var responses = [];
                     var index;

                     if (data.responses) {
                        for (index = 0 ; index < data.responses.length; index++) {
                           responses.push(data.responses[index]);
                        }
                     }

                     if (data.response && data.errorCode !== undefined) {
                        responses.push(data);
                     }

                     deferred.resolve(responses);
                  }).error(function(data, status, headers, config) {
                     var resultStatus;

                     if (status === 401) {//if the token expires, clear the token and do everything again 
                        authenticationService.clearCalculatorServiceToken();
                        return that.doServerCalculations(requests);
                     }
                     else {
                        resultStatus = CalculatorServiceResultStatus.SERVERERROR;
                     }
                     deferred.reject({status: resultStatus});
                  });

               });
               
               return deferred.promise;
            },
            doCalculations: function(requests) {
               if (parametersManager.baseApplicationParameters.serverCalculation) {
                  return this.doServerCalculations(requests);
               }
               else {
                  return this.doLocalCalculations(requests);
               }
            },
            addRequest: function(request) {
               var deferred = $q.defer();
               var newRequest = {
                  calculatorName: request.calculatorName,
                  calculationName: request.calculationName,
                  calculationParameters: request.calculationParameters
               };
               asynchLog.debug("addRequest - request" + request.calculationName);
               if (asynchDetailLog) {
                  asynchDetailLog.debug("addRequest - request" + JSON.stringify(request));
               }
               this.requestsArray.push(newRequest);
               this.deferredArray.push(deferred);
               return deferred.promise;
            },
            sendRequest: function(request) {
               var newRequest = {
                  calculatorName: request.calculatorName,
                  calculationName: request.calculationName,
                  calculationParameters: request.calculationParameters
               };
               asynchLog.debug("sendRequest - request" + request.calculationName);
               if (asynchDetailLog) {
                  asynchDetailLog.debug("sendRequest - request" + JSON.stringify(request));
               }
               
               return this.doCalculations([newRequest]);
            },
            sendRequests: function() {
               var deferred = $q.defer();
               asynchLog.debug("SEND REQUESTS");
               var index;
               var requestsArray = this.requestsArray.slice();
               var deferredArray = this.deferredArray.slice();
               this.requestsArray = [];
               this.deferredArray = [];
               if (requestsArray.length > 0) {
                  for (index = 0; index < requestsArray.length; index++) {
                     if (asynchDetailLog) {
                        asynchDetailLog.debug("Request " + index + " : " + requestsArray[index].calculatorName + " - " + requestsArray[index].calculationName);
                     }
                  }
                  return this.doCalculations(requestsArray).then(
                     function(results) {
                        for (index = 0; index < deferredArray.length; index++) {
                           if (results[index].errorCode === 0) {
                              deferredArray[index].resolve(results[index].response);
                           }
                           else {
                              deferredArray[index].reject(results[index]);
                           }                        
                        }
//                        //for testing delay on calculations
//                        /* jshint ignore:start */                        
//                           setTimeout(function() {
//                              deferred.resolve();
//                           }, 1000);
//                           /* jshint ignore:end */
//
//                        //for testing delay on calculations
                        deferred.resolve(results);
                        
                     },
                     function() {
                        deferred.reject();
                     }
                  );
               }
               else {
//                  //for testing delay on calculations
//                  /* jshint ignore:start */                        
//                     setTimeout(function() {
//                        deferred.resolve();
//                     }, 1000);
//                     /* jshint ignore:end */
//
//                  //for testing delay on calculations
                  deferred.resolve();
                  return deferred.promise;
               }
            }
         };

         return calculatorService;
      }
   ]);

   return calculatorServiceModule;
});


define('tax-calculator', [
   'angular',
   'logger',
   'parameters-manager',
   'calculator-service'
], function(angular, Logger, parametersManager) {
   'use strict';

   var log = Logger.get('TaxCalculator');
   var asynchLog = Logger.get('AsynchronousModeProfile');

   var taxCalculatorModule = angular.module('taxCalculatorModule', []);

   taxCalculatorModule.factory('taxCalculator', ['calculatorService', 'localize', '$q', function(calculatorService, localize, $q) {
      var getActiveCountryCode = function() {
         if (localize.isCountryCh()) {
            return 756;
         }
         if (localize.isCountryLi()) {
            return 438;
         }
         return 756; // default to CH
      };

      var taxCalculator = {
         activateCH: function() {
            var request = {
               calculatorName: 'ch.logismata.online.law',
               calculationName: 'activateCH',
               calculationParameters: []
            };
            return calculatorService.addRequest(request);
         },

         setActiveCountry: function() {
            var countryMethod;

            if (localize.isCountryCh()) {
               countryMethod = 'activateCH';
            }
            else if (localize.isCountryLi()) {
               countryMethod = 'activateLI';
            }
            else {
               countryMethod = 'activateCH';
            }

            var request = {
               calculatorName: 'ch.logismata.online.law',
               calculationName: countryMethod,
               calculationParameters: []
            };

            return calculatorService.addRequest(request);
         },

         calculateTaxableIncomeStatePromise : function(taxLocalityId, age, civilStatus, confession, numberOfChildren, grossIncome, isEmployee) {
            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcTaxableIncomeState',
               calculationParameters: [taxLocalityId, age, civilStatus, confession, numberOfChildren, grossIncome, isEmployee]
            };
            return calculatorService.addRequest(request);
         },
         
         calculateTaxableIncomeCountryPromise : function(taxLocalityId, age, civilStatus, confession, numberOfChildren, grossIncome, isEmployee) {
            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcTaxableIncomeCountry',
               calculationParameters: [taxLocalityId, age, civilStatus, confession, numberOfChildren, grossIncome, isEmployee]
            };
            return calculatorService.addRequest(request);
         },

         
         
         calculateGrossIncomeStatePromise : function(taxLocalityId, age, civilStatus, confession, numberOfChildren, taxableIncome, isEmployee) {
            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcGrossIncomeState',
               calculationParameters: [taxLocalityId, age, civilStatus, confession, numberOfChildren, taxableIncome, isEmployee]
            };
            return calculatorService.addRequest(request);
         },
         
         calculateGrossIncomeCountry : function(taxLocalityId, age, civilStatus, confession, numberOfChildren, taxableIncome, isEmployee) {
            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcGrossIncomeCountry',
               calculationParameters: [taxLocalityId, age, civilStatus, confession, numberOfChildren, taxableIncome, isEmployee]
            };
            return calculatorService.addRequest(request);
         },

         calculateTaxableFortunePromise : function(taxLocalityId, age, civilStatus, numberOfChildren, grossFortune) {
            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcTaxableFortune',
               calculationParameters: [taxLocalityId, age, civilStatus, numberOfChildren, grossFortune]
            };
            return calculatorService.addRequest(request);
         },

         calculateGrossFortunePromise : function(taxLocalityId, age, civilStatus, numberOfChildren, taxableFortune) {
            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcGrossFortune',
               calculationParameters: [taxLocalityId, age, civilStatus, numberOfChildren, taxableFortune]
            };
            return calculatorService.addRequest(request);
         },

         calculateIncomeTax : function(taxLocalityId, age, civilStatus, confession, numberOfChildren,
                                       incometype, income, fortune,
                                       s3asaving, incomechange, fortunechange) {
            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcIncomeTax',
               calculationParameters: [taxLocalityId, age, civilStatus, confession, numberOfChildren,
                                       incometype, income, fortune,
                                       s3asaving, incomechange, fortunechange]
            };
            return calculatorService.addRequest(request);
         },

         calculateCapitalizationTax : function(taxLocalityId, civilStatus, confession, numberOfChildren, sex, endAge, endYear, capital, numberOfPayments) {
            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcCapitalTax',
               calculationParameters: [taxLocalityId, civilStatus, confession, numberOfChildren, sex, endAge, endYear, capital, numberOfPayments]
            };
            return calculatorService.addRequest(request);
         },

         calculateSimpleSaving : function(invest, periodical, monthlybase, duration, interestRate, specialConditions, interestRanges, debtInterest) {
            var customizing = parametersManager.baseApplicationParameters.calculatorCustomization;
            var savingType = 1; // calculate end value
            var data = {
               invest: invest,
               periodical: periodical,
               monthlybase: monthlybase,
               duration: duration,
               interest: interestRate,
               neg_interest: debtInterest,
               interestranges: interestRanges,
               inflationrate: null,
               endcapital: null,
               specialconditions: specialConditions
            };

            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcSaving',
               calculationParameters: [customizing, savingType, data]
            };
            return calculatorService.addRequest(request);
         },

         calculateSimpleSavingInvest : function(invest, monthlybase, duration, interestRate, endCapital, specialConditions, interestRanges, debtInterest) {
            var customizing = parametersManager.baseApplicationParameters.calculatorCustomization;
            var savingType = 2; // calculate periodical investment
            var data = {
               invest: invest,
               periodical: null,
               monthlybase: monthlybase,
               duration: duration,
               interest: interestRate,
               neg_interest: debtInterest,
               interestranges: interestRanges,
               inflationrate: null,
               endcapital: endCapital,
               specialconditions: specialConditions
            };

            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcSaving',
               calculationParameters: [customizing, savingType, data]
            };
            return calculatorService.addRequest(request);
         },

         calculateSimpleSavingDuration : function(invest, periodical, monthlybase, interestRate, endCapital, specialConditions, interestRanges, debtInterest) {
            var customizing = parametersManager.baseApplicationParameters.calculatorCustomization;
            var savingType = 3; // calculate duration (expand last year)
            var data = {
               invest: invest,
               periodical: periodical,
               monthlybase: monthlybase,
               duration: null,
               interest: interestRate,
               neg_interest: debtInterest,
               interestranges: interestRanges,
               inflationrate: null,
               endcapital: endCapital,
               specialconditions: specialConditions
            };

            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcSaving',
               calculationParameters: [customizing, savingType, data]
            };
            return calculatorService.addRequest(request);
         },
                  
         //formatter.js
         calcExpression : function(expression, trowException, decimalDelimiter, groupDelimiter) {
            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcExpression',
               calculationParameters: [expression, trowException, decimalDelimiter, groupDelimiter]
            };
            return calculatorService.addRequest(request);
         },
         
         roundValue : function(value) {
            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'roundValue',
               calculationParameters: [value]
            };
            return calculatorService.addRequest(request);
         },
         
         calculate3aSaving: function(
            taxLocalityId,
            civilStatus,
            confession,
            numberOfChildren,
            taxableIncomeState,
            taxableIncomeCountry,
            periodical,
            duration,
            yieldrate,
            sex,
            paymentAge,
            paymentYear,
            numberOfPayments,
            initialInvestment) {

            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcS3aSaving',
               calculationParameters: [taxLocalityId,
                                       civilStatus,
                                       confession,
                                       numberOfChildren,
                                       taxableIncomeState,
                                       taxableIncomeCountry,
                                       periodical,
                                       duration,
                                       yieldrate,
                                       sex,
                                       paymentAge,
                                       paymentYear,
                                       numberOfPayments,
                                       initialInvestment]
            };
            return calculatorService.addRequest(request);
         },

         /**
          * Answers max 3a investment values.
          * Forces country to CH first, since these values are used only for CH, then sets the active country in case other calls come later.
          */
         getMax3aInvestmentValues: function() {
            return $q.all([
               this.activateCH(),
               this.getMax3aInvestmentWithSecondPillarPromise(),
               this.getMax3aInvestmentWithoutSecondPillarPromise(),
               this.getMax3aInvestmentWithoutSecondPillarTwoPersonPromise(),
               this.setActiveCountry()
            ]).then(function(results) {
               // var activateCHResult = results[0]; // country activation has no return value
               var max3aInvestmentWithSecondPillarResult = results[1];
               var max3aInvestmentWithoutSecondPillarResult = results[2];
               var max3aInvestmentWithoutSecondPillarTwoPersonResult = results[3];
               // var setActiveCountryResult = results[4]; // country activation has no return value

               return {
                  max3aInvestmentWithSecondPillar: max3aInvestmentWithSecondPillarResult,
                  max3aInvestmentWithoutSecondPillar: max3aInvestmentWithoutSecondPillarResult,
                  max3aInvestmentWithoutSecondPillarTwoPerson: max3aInvestmentWithoutSecondPillarTwoPersonResult
               };
            });
         },

         /**
          * Answers the maximum 3a investment for workers with second pillar
          */
         getMax3aInvestmentWithSecondPillarPromise: function() {
            var request = {
               calculatorName: 'ch.logismata.online.law',
               calculationName: 'getMax3aPremiumWithBVG',
               calculationParameters: []
            };
            return calculatorService.addRequest(request);
         },

         /**
          * Answers the maximum 3a investment for workers (employee or independent) without second pillar
          */
         getMax3aInvestmentWithoutSecondPillarPromise: function() {
            var request = {
               calculatorName: 'ch.logismata.online.law',
               calculationName: 'getMax3aPremiumWithoutBVG',
               calculationParameters: []
            };
            return calculatorService.addRequest(request);
         },

         /**
          * Answers the maximum 3a investment for 2 persons (employee or independent) without second pillar
          */
         getMax3aInvestmentWithoutSecondPillarTwoPersonPromise: function() {
            var request = {
               calculatorName: 'ch.logismata.online.law',
               calculationName: 'getMax3aPremiumWithoutBVG',
               calculationParameters: []
            };
            return calculatorService.addRequest(request).then(function(max3aPremiumWithoutBVG) {
               return max3aPremiumWithoutBVG * 2;
            });
         },
         
         calcInheritanceEstate: function(matrimonialType, totalFortune, survivingPersonFortune, deceasedPersonFortune) {
            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcInheritanceEstate',
               calculationParameters: [
                  matrimonialType,
                  totalFortune,
                  survivingPersonFortune,
                  deceasedPersonFortune
               ]
            };
            
            return calculatorService.addRequest(request);
         },

         calculateConsumptionEndCapital : function(capital, withdrawal, monthlybase, duration, interestRate, specialConditions, interestRanges, debtInterest) {
            var customizing = parametersManager.baseApplicationParameters.calculatorCustomization;
            var withdrawalType = 1; // calculate end capital
            var data = {
               startcapital: capital,
               withdrawal: withdrawal,
               monthlybase: monthlybase,
               duration: duration,
               interest: interestRate,
               neg_interest: debtInterest,
               interestranges: interestRanges,
               inflationrate: null,
               endcapital: null,
               specialconditions: specialConditions
            };

            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcWithdrawal',
               calculationParameters: [customizing, withdrawalType, data]
            };
            return calculatorService.addRequest(request);
         },

         calculateConsumptionWithdrawal : function(capital, monthlybase, duration, interestRate, endCapital, specialConditions, interestRanges, debtInterest) {
            var customizing = parametersManager.baseApplicationParameters.calculatorCustomization;
            var withdrawalType = 2; // calculate periodical withdrawal
            var data = {
               startcapital: capital,
               withdrawal: null,
               monthlybase: monthlybase,
               duration: duration,
               interest: interestRate,
               neg_interest: debtInterest,
               interestranges: interestRanges,
               inflationrate: null,
               endcapital: endCapital,
               specialconditions: specialConditions
            };

            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcWithdrawal',
               calculationParameters: [customizing, withdrawalType, data]
            };
            return calculatorService.addRequest(request);
         },

         calculateConsumptionDuration : function(capital, withdrawal, monthlybase, interestRate, endCapital, specialConditions, interestRanges, debtInterest) {
            var customizing = parametersManager.baseApplicationParameters.calculatorCustomization;
            var withdrawalType = 3; // calculate duration (expand last year)
            var data = {
               startcapital: capital,
               withdrawal: withdrawal,
               monthlybase: monthlybase,
               duration: null,
               interest: interestRate,
               neg_interest: debtInterest,
               interestranges: interestRanges,
               inflationrate: null,
               endcapital: endCapital,
               specialconditions: specialConditions
            };

            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcWithdrawal',
               calculationParameters: [customizing, withdrawalType, data]
            };
            return calculatorService.addRequest(request);
         },

         calculateFreeAvailableFortune : function(startYear, duration, liqReserve, fortune, interest, negInterest, saving, changes, roundres) {
            var customizing = parametersManager.baseApplicationParameters.calculatorCustomization;
            
            var data = {
               startyear:    startYear,
               duration:     duration,
               liqreserve:   liqReserve,
               fortune:      fortune,
               interest:     interest,
               neg_interest: negInterest,
               saving:       saving,
               changes:      changes
            };
            
            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcFreeAvailableFortune',
               calculationParameters: [
                  customizing,
                  data,
                  roundres
               ]
            };
            return calculatorService.addRequest(request);
         },
         
         calculateNetIncomeFromGrossIncome : function(grossIncome, age, country) {
            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcNetIncome',
               calculationParameters: [grossIncome, age, country]
            };
            return calculatorService.addRequest(request);
         },
         
         calculateGrossIncomeFromNetIncome : function(netIncome, age, country) {
            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcGrossIncomeFromNetIncome',
               calculationParameters: [netIncome, age, country]
            };
            return calculatorService.addRequest(request);
         },
         
         calcNetIncomeFromTaxableIncome : function(locationid, age, civil, confession, children, taxableincome, isemployee, country) {
            var request = {
               calculatorName: 'ch.logismata.online.calc',
               calculationName: 'calcNetIncomeFromTaxableIncome',
               calculationParameters: [locationid, age, civil, confession, children, taxableincome, isemployee, country]
            };
            return calculatorService.addRequest(request);
         },
         
         sendRequests: function() {
            return calculatorService.sendRequests();
         }
      };

      return taxCalculator;
   }]);

   return taxCalculatorModule;
});


define('rpopulaires-calculator', [
   'angular',
   'logger',
   'calculator-service'
], function(angular, Logger, model) {
   'use strict';

   var rpopulairesCalculatorModule = angular.module('rpopulairesCalculatorModule', []);
   var log = Logger.get('RPopulairesCalculator');
   var asynchLog = Logger.get('AsynchronousModeProfile');

   rpopulairesCalculatorModule.factory('rpopulairesCalculator', ['calculatorService', 'localize', function(calculatorService, localize) {
      
      var rpopulairesCalculator = {
         calculatorName: 'ch.logismata.rpopulaires.calc',

         SCENARIO_PENSION_BOTH: 1, //retirement both, old age pensions for both people
         SCENARIO_PENSION_MAIN: 2, //retirement p1
         SCENARIO_DISABILITY_SICKNESS_MAIN: 3, //disability in case of illness/sickeness
         SCENARIO_DISABILITY_ACCIDENT_MAIN: 4, //disability in case of accident
         SCENARIO_DEATH_SICKNESS_MAIN: 5, //death in case of illness/sickeness
         SCENARIO_DEATH_ACCIDENT_MAIN: 6, //death in case of accident
         SCENARIO_PENSION_SECOND: 7, //retirement p2
         SCENARIO_DISABILITY_SICKNESS_SECOND: 8, //disability in case of illness/sickeness
         SCENARIO_DISABILITY_ACCIDENT_SECOND: 9, //disability in case of accident
         SCENARIO_DEATH_SICKNESS_SECOND: 10, //death in case of illness/sickeness
         SCENARIO_DEATH_ACCIDENT_SECOND: 11, //death in case of accident

         _call: function(method, parameters) {
            log.debug(method + ": " + JSON.stringify(parameters));
            var request = {
               calculatorName: this.calculatorName,
               calculationName: method,
               calculationParameters: parameters
            };
            return calculatorService.addRequest(request);
         },
         
         getTaxBaseInfo: function() {
            return this._call('getTaxBaseInfo', []);
         },

         getMax3aPremiumWithBVG: function() {
            return this._call('getMax3aPremiumWithBVG', []);
         },

         getMax3aPremiumWithoutBVG: function() {
            return this._call('getMax3aPremiumWithoutBVG', []);
         },

         checkScenarioSingle: function(parameters) {
            return this._call('checkScenarioSingle', [
               new Date().getFullYear(),
               parameters.scenario,
               {
                  sex: parameters.focusedPersonSex,
                  birthyear: parameters.focusedPersonBirthYear
               },
               parameters.numberOfChildren
            ]);
        },

         checkScenarioCouple: function(parameters) {
            return this._call('checkScenarioCouple', [
               new Date().getFullYear(),
               parameters.scenario,
               parameters.married,
               parameters.marriedSince,
               {
                  sex: parameters.focusedPersonSex,
                  birthyear: parameters.focusedPersonBirthYear
               },
               {
                  sex: parameters.unfocusedPersonSex,
                  birthyear: parameters.unfocusedPersonBirthYear
               }
            ]);
        },
        
        calcBasisSingle: function(parameters) {
            return this._call('calcBasisSingle', [
               new Date().getFullYear(),
               {
                  sex: parameters.focusedPersonSex,
                  birthyear: parameters.focusedPersonBirthYear,
                  job: parameters.focusedPersonJob,
                  income: parameters.focusedPersonGrossIncome,
                  ahv_mode: parameters.focusedPersonFirstPillarBase,
                  ahv_average: parameters.focusedPersonAverageIncome,
                  ahv_missing: parameters.focusedPersonMissingYears,
                  bvg_mode: parameters.focusedPersonSecondPillarBase
               },
               parameters.numberOfChildren
            ]);
        },


        calcBasisCouple: function(parameters) {
            return this._call('calcBasisCouple', [
               new Date().getFullYear(),
               parameters.married,
               parameters.marriedSince,
               {
                  sex: parameters.focusedPersonSex,
                  birthyear: parameters.focusedPersonBirthYear,
                  job: parameters.focusedPersonJob,
                  income: parameters.focusedPersonGrossIncome,
                  ahv_mode: parameters.focusedPersonFirstPillarBase,
                  ahv_average: parameters.focusedPersonAverageIncome,
                  ahv_missing: parameters.focusedPersonMissingYears,
                  bvg_mode: parameters.focusedPersonSecondPillarBase
               },
               {
                  sex: parameters.unfocusedPersonSex,
                  birthyear: parameters.unfocusedPersonBirthYear,
                  job: parameters.unfocusedPersonJob,
                  income: parameters.unfocusedPersonGrossIncome,
                  ahv_mode: parameters.unfocusedPersonFirstPillarBase,
                  ahv_average: parameters.unfocusedPersonAverageIncome,
                  ahv_missing: parameters.unfocusedPersonMissingYears,
                  bvg_mode: parameters.unfocusedPersonSecondPillarBase
               },
               parameters.numberOfChildren,
               parameters.focusedPersonNumberOfOwnChildren,
               parameters.unfocusedPersonNumberOfOwnChildren
            ]);
        },
         
         
         calcScenarioSingle: function(scenario, parameters) {
            return this._call('calcScenarioSingle', [
               new Date().getFullYear(),
               scenario,
               {
                  sex: parameters.focusedPersonSex,
                  birthyear: parameters.focusedPersonBirthYear,
                  job: parameters.focusedPersonJob,
                  income: parameters.focusedPersonGrossIncome,
                  ahv_mode: parameters.focusedPersonFirstPillarBase,
                  ahv_average: parameters.focusedPersonAverageIncome,
                  ahv_missing: parameters.focusedPersonMissingYears,
                  bvg_mode: parameters.focusedPersonSecondPillarBase,
                  bvg_iv_rente: parameters.focusedPersonDisabilityRent,
                  bvg_iv_child: parameters.focusedPersonDisabilityChildrenRent,
                  bvg_widow: parameters.focusedPersonWidowRent,
                  bvg_orphan: parameters.focusedPersonOrphanRent,
                  bvg_pension: parameters.focusedPersonPensionRent
               },
               parameters.numberOfChildren,
               {
                  fortune: parameters.currentFortune,
                  interest: parameters.pensionInterest,
                  show_children: parameters.showChildrenRent,
                  dis_need: parameters.disabilityNeedPercentage,
                  dis_extra_rente: parameters.disabilityAdditionalRent,
                  death_need: parameters.deathNeedPercentage,
                  death_extra_capital: parameters.deathAdditionalRent,
                  pension_need: parameters.pensionNeedPercentage,
                  pension_extra_saving: parameters.pensionAdditionalSaving,
                  pension_extra_rente: parameters.pensionAdditionalRent
               }
            ]);
         },
         
         calcScenarioCouple: function(scenario, parameters) {
            return this._call('calcScenarioCouple', [
               new Date().getFullYear(),
               scenario,
               parameters.married,
               parameters.marriedSince,
               {
                  sex: parameters.focusedPersonSex,
                  birthyear: parameters.focusedPersonBirthYear,
                  job: parameters.focusedPersonJob,
                  income: parameters.focusedPersonGrossIncome,
                  ahv_mode: parameters.focusedPersonFirstPillarBase,
                  ahv_average: parameters.focusedPersonAverageIncome,
                  ahv_missing: parameters.focusedPersonMissingYears,
                  bvg_mode: parameters.focusedPersonSecondPillarBase,
                  bvg_iv_rente: parameters.focusedPersonDisabilityRent,
                  bvg_iv_child: parameters.focusedPersonDisabilityChildrenRent,
                  bvg_widow: parameters.focusedPersonWidowRent,
                  bvg_orphan: parameters.focusedPersonOrphanRent,
                  bvg_pension: parameters.focusedPersonPensionRent
               },
               {
                  sex: parameters.unfocusedPersonSex,
                  birthyear: parameters.unfocusedPersonBirthYear,
                  job: parameters.unfocusedPersonJob,
                  income: parameters.unfocusedPersonGrossIncome,
                  ahv_mode: parameters.unfocusedPersonFirstPillarBase,
                  ahv_average: parameters.unfocusedPersonAverageIncome,
                  ahv_missing: parameters.unfocusedPersonMissingYears,
                  bvg_mode: parameters.unfocusedPersonSecondPillarBase,
                  bvg_iv_rente: parameters.unfocusedPersonDisabilityRent,
                  bvg_iv_child: parameters.unfocusedPersonDisabilityChildrenRent,
                  bvg_widow: parameters.unfocusedPersonWidowRent,
                  bvg_orphan: parameters.unfocusedPersonOrphanRent,
                  bvg_pension: parameters.unfocusedPersonPensionRent
               },
               parameters.numberOfChildren,
               parameters.focusedPersonNumberOfOwnChildren,
               parameters.unfocusedPersonNumberOfOwnChildren,
               {
                  fortune: parameters.currentFortune,
                  interest: parameters.pensionInterest,
                  show_children: parameters.showChildrenRent,
                  dis_need: parameters.disabilityNeedPercentage,
                  dis_extra_rente: parameters.disabilityAdditionalRent,
                  death_need: parameters.deathNeedPercentage,
                  death_extra_capital: parameters.deathAdditionalRent,
                  pension_need: parameters.pensionNeedPercentage,
                  pension_extra_saving: parameters.pensionAdditionalSaving,
                  pension_extra_rente: parameters.pensionAdditionalRent
               }
            ]);
         },
         
         calcSparenJSON: function(parameters) {
            return this._call('calcSparenJSON', [
               JSON.stringify({
                  year: parameters.year,
                  union: parameters.union,
                  gender: parameters.gender,
                  age: parameters.age,
                  children: parameters.children,
                  income: parameters.income,
                  is_empl: parameters.is_empl,
                  has_bvg: parameters.has_bvg,
                  locality: parameters.locality,
                  premium: parameters.premium,
                  interest: parameters.interest,
                  consumption: parameters.consumption
               })
            ]);
         },
         
         calcRisikoJSON: function(parameters) {
            return this._call('calcRisikoJSON', [
               JSON.stringify({
                  year: parameters.year,
                  union: parameters.union,
                  age: parameters.age,
                  children: parameters.children,
                  income: parameters.income,
                  is_empl: parameters.is_empl,
                  has_bvg: parameters.has_bvg,
                  need_disab: parameters.need_disab,
                  need_death: parameters.need_death
               })
            ]);
         }
      };

      return rpopulairesCalculator;
   }]);

   return rpopulairesCalculatorModule;
});


define('multicalc-model', [
], function() {
   'use strict';

   var MulticalcScenario = function() {
      this.professionalStatus = null;
      this.age = null;
      this.monthlySavingCapacity = null;
      this.interestRate = null;
      this.disabilityNeed =  null;
      this.deathNeed =  null;
   };
   
   var RiskResult = function() {
      this.benefits = 0.0;
      this.gap = 0.0;               
      this.secondPillarRent = 0.0;  
      this.firstPillarRent = 0.0; 
   };
   
   var Saving3aResult = function() {
      this.taxSavings = 0.0;
      this.interest = 0.0;
      this.savings = 0.0;
      this.capitalizationTax = 0.0; 
      this.netCapital = 0.0;
      this.netYield = 0.0;
      this.duration = 0.0;
      this.taxSavingsSet = [];
      this.interestSet = [];
      this.savingsSet = [];
   };
   
   var MulticalcResult = function() {
      this.saving3a = new Saving3aResult();
      this.disability = new RiskResult();
      this.death = new RiskResult();
   };
   
   var model = {
      MulticalcScenario: MulticalcScenario,
      MulticalcResult: MulticalcResult
   };
   return model;
});



define('multicalc-state', [
   'angular',
   'multicalc-model',
   'state',
   'storage-manager'
], function(angular, model) {
   'use strict';
   var multicalcStateModule = angular.module('multicalcStateModule', ['storageManagerModule']);

   multicalcStateModule.factory('multicalcState',
      ['state', function(state) {

      var refresh = function(multicalc) {      
         multicalc.professionalStatus = null;
         multicalc.age = null;
         multicalc.monthlySavingCapacity = null;
         multicalc.interestRate = null;
         multicalc.disabilityNeed = null;
         multicalc.deathNeed = null;         
      };

      var modelCreator = function() {
         return new model.MulticalcScenario();
      };

      return state.create('multicalc', modelCreator, refresh);
   }]);

   return multicalcStateModule;
});


define('formatter', [
   'angular',
   'logger',
   'common-currency-formatter',
   'parameters-manager',
   'wolf-tools'
], function(angular, Logger, CurrencyFormatter, parametersManager) {
   'use strict';

   var log = Logger.get('Formatter');
   var formatterModule = angular.module('formatterModule', []);
   var baseViewParameters = parametersManager.baseViewParameters;

   formatterModule.factory('formatter', function() {
      var formatter = {         
         _amountCurrencyFormatter : new CurrencyFormatter(baseViewParameters.groupDelimiter, baseViewParameters.amountDecimalDelimiter, baseViewParameters.useMixedGroupingSeparator),
         _percentageCurrencyFormatter : new CurrencyFormatter(baseViewParameters.groupDelimiter, baseViewParameters.percentageDecimalDelimiter, baseViewParameters.useMixedGroupingSeparator),
         formatCurrency : function(value, isPercentage) {
            log.debug("about to format: " + value);
            var formatted = {};
            if (isPercentage) {
               formatted = this._percentageCurrencyFormatter.formatCurrency(value, false, 0);
            }
            else {               
               formatted = this._amountCurrencyFormatter.formatCurrency(value, false, 0);
            }
            log.debug("formatted: " + formatted);
            return formatted;
         },
         formatCurrencyWithDecimals : function(value, decimals, isPercentage) {
            log.debug("about to format: " + value);
            var formatted = {};
            if (isPercentage) {
               formatted = this._percentageCurrencyFormatter.formatCurrency(value, true, decimals);
            }
            else {               
               formatted = this._amountCurrencyFormatter.formatCurrency(value, true, decimals);
            }
            log.debug("formatted: " + formatted);
            return formatted;
         },
         unformat : function(formatted, isPercentage) {
            var string = String(formatted); //make sure we have a string
            log.debug("about to unformat string: " + string);
            var unformatted = {};
            if (isPercentage) {
               //if the model was previously unformated it is necesary change . for the decimal delimiter
               string = string.replace(".", baseViewParameters.percentageDecimalDelimiter);
               unformatted = ch.logismata.wolftools.calcExpression(string, false, baseViewParameters.percentageDecimalDelimiter, baseViewParameters.groupDelimiter);
            }
            else {               
               unformatted = ch.logismata.wolftools.calcExpression(string, false, baseViewParameters.amountDecimalDelimiter, baseViewParameters.groupDelimiter);
            } 
            log.debug("unformatted: " + unformatted);
            return unformatted;
         },
         check : function(formatted, isPercentage) {
            var string = String(formatted); //make sure we have a string

            log.debug("about to check format of string: " + string);
            try {
               var unformatted = {};
               if (isPercentage) {
                  //if the model was previously unformated it is necesary change . for the decimal delimiter
                  string = string.replace(".", baseViewParameters.percentageDecimalDelimiter);
                  unformatted = ch.logismata.wolftools.calcExpression(string, true, baseViewParameters.percentageDecimalDelimiter, baseViewParameters.groupDelimiter);
               }
               else {               
                  unformatted = ch.logismata.wolftools.calcExpression(string, true, baseViewParameters.amountDecimalDelimiter, baseViewParameters.groupDelimiter);
               }
               log.debug("unformatted after check: " + unformatted);
               return true;
            }
            catch (exception) {
               return false;
            }
         },
         roundValue : function(value) {
            log.debug("about to round: " + value);
            var rounded;
            rounded = ch.logismata.wolftools.roundValue(value);
            log.debug("rounded value: " + rounded);
            return rounded;
         },
         reset: function() {
            this._amountCurrencyFormatter = new CurrencyFormatter(baseViewParameters.groupDelimiter, baseViewParameters.amountDecimalDelimiter, baseViewParameters.useMixedGroupingSeparator);
            this._percentageCurrencyFormatter = new CurrencyFormatter(baseViewParameters.groupDelimiter, baseViewParameters.percentageDecimalDelimiter, baseViewParameters.useMixedGroupingSeparator);
         }
      };

      return formatter;
   });

   return formatterModule;
});


define('route-translator', [
   'angular',
   'logger',
   'routes-handler',
   'localization'
], function(angular, Logger, RoutesHandler) {
   'use strict';

   var log = Logger.get('routeTranslator');
   var localization = angular.module('route-translator', []);

   // create our localization service
   localization.factory('translateRoute', ['localize',
      function(localize) {

         var routeTranslator = {
            /**
             * Translates routes.
             * Examples:
             * ""                      ==> "#"
             * "house"                 ==> "#wohnen"
             * "taxes/marginalTaxRate" ==> "#steuern/steuerrechner"
             *
             * @param {String} route
             * @returns {String} translated route
             */
            perform : function(route) {
               if (route.substr(0, 1) === "#") {
                  log.error("route came with # at the beginning");
               }

               if (route.substr(0, 1) === ".") {
                  log.error("route came with . at the beginning");
               }

               if (route.length > 1 && route.substr(0, 1) === "/") {
                  log.error("route came with / at the beginning");
               }

               var translatedRoute = RoutesHandler.getPathByLanguage(route, localize.getActiveLanguage());

               return translatedRoute;
            },

            getPath: function(route) {
               var translatedRoute = this.perform(route);
               if (translatedRoute.substr(0, 1) === "#") {
                  translatedRoute = translatedRoute.substr(1, translatedRoute.length);
               }
               return translatedRoute;
            }
         };

         // return the local instance when called
         return routeTranslator;
      }
   ]);

   return localization;
});


define('localization-filter', [
   'angular',
   'logger',
   'localization'
], function(angular, Logger) {
   'use strict';

   var log = Logger.get('LocalizationFilter');
   var localizationFilter = angular.module('localizationFilter', []);

   localizationFilter.filter('i18n',
      [
         'localize',
         function(localize) {
            var filter = function() {
               // trick to avoid wasted time when the log is not enabled (since this method is called a lot of times)
               if (log) {
                  if (log.enabledFor(Logger.DEBUG)) {
                     log.debug("i18n filter with key " + arguments[0]);
                  }
                  else {
                     log = undefined;
                  }
               }

               return localize.getLocalizedString.apply(null, arguments);
            };

            // Since AngularJS 1.3, filters which are not stateless (depending at the scope) have to explicit define this behavior.
            filter.$stateful = true;

            return filter;
         }
      ]
   );

   localizationFilter.filter('amount',
      [
         'localize',
         function(localize) {
            var filter = function(input, numberOfDecimals) {
               // trick to avoid wasted time when the log is not enabled (since this method is called a lot of times)
               if (log) {
                  if (log.enabledFor(Logger.DEBUG)) {
                     log.debug("amount filter with value " + input);
                  }
                  else {
                     log = undefined;
                  }
               }

               if (numberOfDecimals === null || numberOfDecimals === undefined) {
                  numberOfDecimals = 0;
               }

               return localize.getLocalizedString('GenericFormats.Amount', {'VALUE': input, 'DECIMALS': numberOfDecimals});
            };

            // Since AngularJS 1.3, filters which are not stateless (depending at the scope) have to explicit define this behavior.
            filter.$stateful = true;

            return filter;
         }
      ]
   );

   localizationFilter.filter('percentage',
      [
         'localize',
         function(localize) {
            var filter = function(input, numberOfDecimals) {
               // trick to avoid wasted time when the log is not enabled (since this method is called a lot of times)
               if (log) {
                  if (log.enabledFor(Logger.DEBUG)) {
                     log.debug("percentage filter with value " + input);
                  }
                  else {
                     log = undefined;
                  }
               }

               if (numberOfDecimals === null || numberOfDecimals === undefined) {
                  numberOfDecimals = 2;
               }

               return localize.getLocalizedString('GenericFormats.Percentage', {'VALUE': input, 'DECIMALS': numberOfDecimals});
            };

            // Since AngularJS 1.3, filters which are not stateless (depending at the scope) have to explicit define this behavior.
            filter.$stateful = true;

            return filter;
         }
      ]
   );

   return localizationFilter;
});


define('localization-directive', [
   'angular',
   'localization'
], function(angular) {
   'use strict';

   var localizationDirective = angular.module('localizationDirective', []);

   localizationDirective.directive('i18n',
      [
         'localize',
         function(localize) {
            return {
               restrict : "EAC",
               link : function(scope, elm, attrs) {
                  var str = attrs.i18n ? attrs.i18n : elm.html();

                  if (localize.resourceFileLoaded) {
                     localize.replace(elm, str);
                  }
                  else {
                     var deregister = scope.$on('localizeResourcesUpdates',
                     function() {
                        deregister();
                        localize.replace(elm, str);
                     });
                  }
               }
            };
         }
      ]
   );

   return localizationDirective;
});


define('loading-controller', [
   'angular',
   'logger',
   'parameters-manager',
   'jquery-easing'
], function(angular, Logger, parametersManager) {
   'use strict';

   var loadingModule = angular.module('loadingModule', []);
   var log = Logger.get('LoadingService');
   // create our localization service
   loadingModule.factory('loadingService', ['$rootScope', '$timeout',
         function($rootScope, $timeout) {
            var loading = {
               // path to look for localizations
               loading: false,
               stopped: false,
               timeOutPromise: 0,

               showLoader : function() {
                  loading.loading = true;
                  $rootScope.$emit('loadingChanged');
                  $rootScope.loaded = false;
                  var options = {
                     duration: parametersManager.baseViewParameters.loadingFadeInDuration,
                     easing: jQuery.easing.easeInExpo
                  };
                  $('#loader').fadeIn(options);

               },               
               startLoadingForAsync : function() {
                  log.debug('startLoading');
                  if (loading.timeOutPromise === 0) {
                     log.debug('setting timeout');
                     loading.timeOutPromise = $timeout(loading.showLoader, 100);
                  }
               },
               startLoading : function() {
                  var newURL = arguments[1];
                  var oldURL = arguments[2];
                  if (newURL.split("?")[0] !== oldURL.split("?")[0]) {
                     log.debug('startLoading');
                     if (loading.timeOutPromise === 0) {
                        log.debug('setting timeout');
                        loading.timeOutPromise = $timeout(loading.showLoader, 100);
                     }
                  }
               },
               finishLoading : function() {
                  if (loading.timeOutPromise !== 0) {
                     $timeout.cancel(loading.timeOutPromise);
                  }
                  loading.loading = false;
                  loading.stopped = true;
                  loading.timeOutPromise = 0;
                  $rootScope.$emit('loadingChanged');

                  $('#loader').fadeOut(parametersManager.baseViewParameters.loadingFadeOutDuration, function() {
                     $rootScope.$broadcast('refreshStatus');
                  });

                  log.debug('finishLoading');
               }
            };
            $rootScope.$on('$locationChangeStart', loading.startLoading);

            // return the local instance when called
            return loading;
         }
      ]
   );

   return loadingModule;
});





define('custom-filters', [
   'angular'
], function(angular) {
   'use strict';

   var customFilters = angular.module('customFilters', []);

   return customFilters;
});


define('language-controller', [
   'app',
   'parameters-manager',
   'routes-handler',
   'logger',
   'calculators-manager'
], function(app, parametersManager, routesHandler, Logger) {
   'use strict';

   var log = Logger.get('localization');

   return function(app) {
      var languageController = app.controller('languageController', ['$scope', 'localize', '$timeout', 'calculatorsManager', 'locationService',
         function($scope, localize, $timeout, calculatorsManager, locationService) {
         $scope.localize = localize;

         $scope.languageSelectionAvailable = function() {
            return parametersManager.baseViewParameters.languageSelectionEnabled &&
                   parametersManager.baseViewParameters.availableLanguages.length > 1;
         };

         $scope.availableLanguages = function() {
            var allLanguages = parametersManager.baseViewParameters.languages;
            var availableLanguages = allLanguages.filter(function(language) {
               return parametersManager.baseViewParameters.availableLanguages.indexOf(language.id) >= 0;
            });
            return availableLanguages;
         };

         $scope.setLanguageId = function(languageId) {
            log.debug("TRY TO SET LANGUAGE TO " + languageId);
            //var previousLanguage = localize.getActiveLanguage();

            if ($(document).width() <= 750) {
               setTimeout(function() {
                  $('.navbar-toggle').click();
               });
            }
            localize.setLanguage(languageId, function() {
               log.debug("LANGUAGE SET TO " + localize.language);
               calculatorsManager.resetSocialMediaUrl();
               $timeout(function() {
                  //Workaround for closing language popup (known reported bug in Bootstrap)
                  $("#languagesMenu").click();
               });

               var newLanguage = localize.getActiveLanguage();
               var path = locationService.getPath();
               var id = routesHandler.getId();
               path = routesHandler.getPathByIdAndLanguage(id, newLanguage);
               locationService.setPath(path);
            });
         };

         $scope.getActiveLanguage = function() {
            return localize.getActiveLanguage();
         };

         $scope.getActiveLanguageClass = function() {
            return 'language-icon-' + $scope.getActiveLanguage();
         };

         $scope.isGerman = function() {
            return localize.getActiveLanguage() === "DE";
         };

         $scope.isEnglish = function() {
            return localize.getActiveLanguage() === "EN";
         };

         $scope.isFrench = function() {
            return localize.getActiveLanguage() === "FR";
         };

         $scope.isItalian = function() {
            return localize.getActiveLanguage() === "IT";
         };

      }]);

      return languageController;
   };
});


define('calculator-item-link', [
   'loading-controller',
   'localization',
   'calculators-manager',
   'route-translator'
], function() {
   'use strict';
   return function(app) {
      var calculatorItemLink = app.directive('calculatorItemLink', [function() {
         return {
            restrict: 'E',
            //transclude:'element',
            replace: true,
            scope: {
               calculator: '@',
               onClick: '&'
            },
            templateUrl: 'src/directives/calculator-item-link/calculator-item-link.html',
            controller: ['$scope', 'calculatorsManager', 'translateRoute', 'localize', function($scope, calculatorsManager, translateRoute, localize) {
               $scope.isCalculatorAvailable = function() {
                  return calculatorsManager.isAnyCalculatorAvailableByName($scope.calculator);
               };
               $scope.getPath = function() {
                  var route = calculatorsManager.getAnyPathForCalculatorByName($scope.calculator);
                  if (route === undefined || route === null) {
                     return "";
                  }
                  return route;
               };
               $scope.getTranslatedPath = function() {
                  var route = calculatorsManager.getAnyPathForCalculatorByName($scope.calculator);
                  if (route === undefined || route === null) {
                     return "";
                  }
                  return translateRoute.perform(route);
               };
               $scope.getText = function() {
                  var entry = $scope.calculator.charAt(0).toUpperCase() + $scope.calculator.slice(1);
                  return localize.getLocalizedString('Application.' + entry);
               };
               $scope.getId = function() {
                  return "all_calculators_" + $scope.calculator;
               };
            }]
         };
      }]);
      return calculatorItemLink;
   };
});



define('storage-service', [
   'angular',
   'logger',
   'parameters-manager',   
   'localization'
], function(angular, Logger, parametersManager) {
   'use strict';

   var log = Logger.get('storageService');

   var storageServiceModule = angular.module('storageServiceModule', []);

   storageServiceModule.factory('storageService', ['$http', '$q', 'authenticationService', 'localize',
      function($http, $q, authenticationService, localize) {
         var storageService = {
            getServiceURL: function() {
               return parametersManager.baseApplicationParameters.storageServiceURL + '/' +
                      parametersManager.baseApplicationParameters.storageCustomization;
            },

            storeAnonymousDossier: function(onlineCalc) {
               var deferred = $q.defer();

               var url = this.getServiceURL() + "/storeDossier";
             
               var dossier = {
                  userId: 'AnonymousContactDossier',                  
                  name: '',
                  onlineCalc: onlineCalc,
                  expirationDate: new Date(new Date().getTime() +
                          (1000 * 60 * 60 * 24 * parametersManager.baseApplicationParameters.dossierExpirationDays)
                          ).toISOString().slice(0, 10)
               };

               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'PUT',
                  url: url,
                  responseType: 'json',
                  cache: false,
                  headers: {
                     'Content-Type': 'application/json; charset=utf-8'
                  },
                  data: {
                     authToken: null,
                     dossierDataObject: dossier,
                     isAnonymousDossier: true
                  }
               }).success(function(data, status, headers, config) {
                  deferred.resolve(data.id);
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;

                  if (status === 401) {
                     resultStatus = StorageServiceResultStatus.UNAUTHORIZED;
                  }
                  if (status === 403) {
                     resultStatus = StorageServiceResultStatus.DOSSIERNOTAVAILABLE;
                  }
                  else {
                     resultStatus = StorageServiceResultStatus.SERVERERROR;
                  }

                  deferred.reject({status: resultStatus});
               });

               return deferred.promise;
            },

            storeDossier: function(userId, id, name, onlineCalc, authToken) {
               var deferred = $q.defer();

               var url = this.getServiceURL() + "/storeDossier";

               var dossier = {
                  userId: userId,
                  id: id,
                  name: name,
                  onlineCalc: onlineCalc,
                  modificationDate: new Date()
               };

               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'PUT',
                  url: url,
                  responseType: 'json',
                  cache: false,
                  headers: {
                     'Content-Type': 'application/json; charset=utf-8'
                  },
                  data: {
                     authToken: authToken,
                     dossierDataObject: dossier,
                     isAnonymousDossier: false
                  }
               }).success(function(data, status, headers, config) {
                  dossier.id = data.id;
                  window.sessionStorage.setItem('currentDossierId', dossier.id);
                  window.sessionStorage.setItem('currentDossierName', dossier.name);
                  authenticationService.setAuthToken(data.authToken);
                  deferred.resolve({status: StorageServiceResultStatus.OK});
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;

                  if (status === 401) {
                     resultStatus = StorageServiceResultStatus.UNAUTHORIZED;
                     authenticationService.logOut();
                  }
                  else {
                     resultStatus = StorageServiceResultStatus.SERVERERROR;
                  }

                  deferred.reject({status: resultStatus});
               });

               return deferred.promise;
            },

            getDossier: function(userId, id, authToken) {
               var deferred = $q.defer();

               var url = this.getServiceURL() + '/getDossier';

               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'GET',
                  url: url,
                  params: {
                     userId: userId,
                     id: id,
                     authToken: authToken
                  }
               }).success(function(data, status, headers, config) {
                  if (data.dossier.onlineCalc.base.country) {
                     if (localize.getActiveCountry() !== data.dossier.onlineCalc.base.country) {
                        localize.setCountry(data.dossier.onlineCalc.base.country, function() {
                           //do nothing
                        }, function() {
                           localize.setCountry(localize.defaultCountry);
                        });
                     }
                  }
                  window.sessionStorage.setItem('currentDossierId', data.dossier.id);
                  window.sessionStorage.setItem('currentDossierName', data.dossier.name);
                  authenticationService.setAuthToken(data.authToken);
                  deferred.resolve({status: StorageServiceResultStatus.OK, dossier: data.dossier});
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;

                  if (status === 401) {
                     resultStatus = StorageServiceResultStatus.UNAUTHORIZED;
                     authenticationService.logOut();
                  }
                  else if (status === 404) {
                     resultStatus = StorageServiceResultStatus.DOSSIERNOTFOUND;
                  }
                  else {
                     resultStatus = StorageServiceResultStatus.SERVERERROR;
                  }

                  deferred.reject({status: resultStatus});
               });

               return deferred.promise;
            },

            getDossierList: function(userId, authToken) {
               var deferred = $q.defer();

               var url = this.getServiceURL() + "/getDossierList";

               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'GET',
                  url: url,
                  params: {
                     userId: userId,
                     authToken: authToken
                  }
               }).success(function(data, status, headers, config) {
                  authenticationService.setAuthToken(data.authToken);
                  deferred.resolve({status: StorageServiceResultStatus.OK, dossiers: data.dossiers});
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;

                  if (status === 401) {
                     resultStatus = StorageServiceResultStatus.UNAUTHORIZED;
                     authenticationService.logOut();
                  }
                  else {
                     resultStatus = StorageServiceResultStatus.SERVERERROR;
                  }

                  deferred.reject({status: resultStatus});
               });

               return deferred.promise;
            },

            removeDossier: function(userId, ids, authToken) {
               var deferred = $q.defer();

               var url = this.getServiceURL() + "/removeDossier";

               var dossierDataObject = {
                  userId: userId,
                  ids: ids
               };

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
                     authToken: authToken,
                     dossierDataObject: dossierDataObject
                  }
               }).success(function(data, status, headers, config) {
                  for (var index = 0; index < ids.length; index++) {
                     var id = ids[index];

                     if (window.sessionStorage.currentDossierId === id) {
                        window.sessionStorage.setItem('currentDossierId', null);
                        window.sessionStorage.setItem('currentDossierName', "");
                     }
                     
                  }
                  authenticationService.setAuthToken(data.authToken);
                  deferred.resolve({status: StorageServiceResultStatus.OK});
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;

                  if (status === 401) {
                     resultStatus = StorageServiceResultStatus.UNAUTHORIZED;
                     authenticationService.logOut();
                  }
                  else {
                     resultStatus = StorageServiceResultStatus.SERVERERROR;
                  }

                  deferred.reject({status: resultStatus});
               });

               return deferred.promise;
            },
            
            forgetDossier: function() {
               window.sessionStorage.setItem('currentDossierId', null);
               window.sessionStorage.setItem('currentDossierName', "");
            },

            getCurrentDossierId: function() {
               return window.sessionStorage.currentDossierId;
            },

            getCurrentDossierName: function() {
               return window.sessionStorage.currentDossierName;
            }
         };

         return storageService;
      }
   ]);

   return storageServiceModule;
});


define('store-method-link', [
   'parameters-manager',
   'loading-controller',
   'localization',
   'route-translator',
   'storage-service'
], function(parametersManager) {
   'use strict';
   return function(app) {
      var savmeMethodLink = app.directive('storeMethodLink', ['storageService', function(storageService) {
         return {
            restrict: 'E',
            //transclude:'element',
            replace: true,
            scope: {
               storeMethod: '@',
               onClick: '&'
            },
            templateUrl: 'src/directives/store-method-link/store-method-link.html',
            controller: ['$scope', 'translateRoute', 'localize', function($scope,  translateRoute, localize) {
               $scope.getPath = function() {
                  var route = $scope.storeMethod;
                  if (route === undefined || route === null) {
                     return "";
                  }
                  return route;
               };
               $scope.getTranslatedPath = function() {
                  if ($scope.storeMethod !== 'save') { // save is an action that does not have view
                     var route = translateRoute.getPath($scope.storeMethod);
                     if (route === undefined || route === null) {
                        return "";
                     }
                  }
                  return '';
               };
               $scope.getText = function() {
                  var entry = $scope.storeMethod.charAt(0).toUpperCase() + $scope.storeMethod.slice(1);
                  if (entry === 'Save') {
                     return localize.getLocalizedString('Application.' + entry) + " (" + $scope.getDossierName() + ")";
                  }
                  return localize.getLocalizedString('Application.' + entry);
               };
               $scope.getId = function() {
                  return "store_method_" + $scope.storeMethod;
               };
               $scope.getDossierName = function() {
                  return storageService.getCurrentDossierName();
               };
            }]
         };
      }]);
      return savmeMethodLink;
   };
});



define('text-field', [
   'app'
], function(app) {
   'use strict';

   return function(app) {
   var field = app.directive('textfield', [function() {
      return {
         restrict: 'E',
         require: '?ngModel', // get a hold of NgModelController
         scope: {
            label: '@',
            showLabel: '@',
            ngModel: '=',
            maxlength: '@',
            placeholder: '@',
            id: '@',
            isRequired: '@',
            enabled: '=?',
            isEditable: '=?',
            onEdit: '&',            
            onChange: '&'
         },
         templateUrl: 'src/directives/fields/text-field/text-field.html',
         compile: function(element, attrs) {
            return {
               pre: function preLink(scope, element, attrs, controller) {                   
                  
                  if (scope.id !== undefined && scope.id.length > 0) {
                     scope.fieldId = scope.id.replace(/\./g, '_');
                  }
                  else {
                     // adds an id based on the ngModel attribute, for easier identification from tests
                     scope.fieldId = attrs.ngModel.replace(/\./g, '_');
                  }
                  
                  scope.$watch('ngModel', function(val, old) {
                     scope.onChange();
                  });
                  scope.isDisabled = function() {
                     if (scope.enabled !== undefined) {
                        return !scope.enabled;
                     }
                     return false;
                  };
                  
               }
            };
         }
      };
   }]);

   return field;
   };
});




define('authentication-service', [
   'angular',
   'logger',
   'parameters-manager',
   'storage-manager'
], function(angular, Logger, parametersManager) {
   'use strict';

   var log = Logger.get('authenticationService');

   var authenticationServiceModule = angular.module('authenticationServiceModule', []);

   authenticationServiceModule.factory('authenticationService', ['$http', '$q', 'storageManager',
      function($http, $q, storageManager) {
         var authenticationService = {
            getServiceURL: function() {
               return parametersManager.baseApplicationParameters.authenticationServiceURL + '/' +
                      parametersManager.baseApplicationParameters.authenticationCustomization;
            },

            isAlreadyRegistered: function(userData) {
               var deferred = $q.defer();

               var url = this.getServiceURL() + "/isAlreadyRegistered";

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
                     userDataObject: userData
                  }
               }).success(function(data, status, headers, config) {
                  deferred.resolve({status: AuthenticationServiceRegistrationResultStatus.SUCCEEDED});
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;
                  if (status === 409) {
                     resultStatus = AuthenticationServiceRegistrationResultStatus.USERALREADYEXISTS;
                  }
                  else {
                     resultStatus = AuthenticationServiceRegistrationResultStatus.FAILED;
                  }
                  deferred.reject({status: resultStatus});
               });

               return deferred.promise;
            },

            register: function(userData, emailData) {
               var deferred = $q.defer();

               var url = this.getServiceURL() + "/register";

               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'PUT',
                  url: url,
                  responseType: 'json',
                  cache: false,
                  headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                  },
                  data: {
                     userDataObject: userData,
                     emailObject: emailData
                  }
               }).success(function(data, status, headers, config) {
                  deferred.resolve({status: AuthenticationServiceRegistrationResultStatus.SUCCEEDED});
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;
                  if (status === 409) {
                     resultStatus = AuthenticationServiceRegistrationResultStatus.USERALREADYEXISTS;
                  }
                  else {
                     resultStatus = AuthenticationServiceRegistrationResultStatus.FAILED;
                  }
                  deferred.reject({status: resultStatus});
               });

               return deferred.promise;
            },

            confirmRegistration: function(userId, confirmationToken) {
               var deferred = $q.defer();

               var url = this.getServiceURL() + "/confirmRegistration";

               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'POST',
                  url: url,
                  responseType: 'json',
                  cache: false,
                  data: {
                     confirmationToken: confirmationToken,
                     userDataObject: {userId: userId}
                  },
                  headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                  }
               }).success(function(data, status, headers, config) {
                  if (data.alreadyConfirmed) {
                     deferred.resolve({status: AuthenticationServiceRegistrationConfirmationResultStatus.ALREADYCONFIRMED});
                  }
                  else {
                     deferred.resolve({status: AuthenticationServiceRegistrationConfirmationResultStatus.SUCCEEDED});
                  }
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;
                  if (status === 400) {
                     resultStatus = AuthenticationServiceRegistrationConfirmationResultStatus.SERVERERROR;
                  }
                  if (status === 401) {
                     resultStatus = AuthenticationServiceRegistrationConfirmationResultStatus.EXPIREDORINVALIDDATA;
                  }

                  if (status === 404) {
                     resultStatus = AuthenticationServiceRegistrationConfirmationResultStatus.NOCONFIRMATIONPENDING;
                  }
                  deferred.reject({status: resultStatus});
               });

               return deferred.promise;
            },

            login: function(userData) {
               var deferred = $q.defer();

               var url = this.getServiceURL() + "/login";

               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'POST',
                  url: url,
                  responseType: 'json',
                  cache: false,
                  data: {
                     userDataObject: userData
                  }
               }).success(function(data, status, headers, config) {
                  if (window.localStorage.pcId === undefined) {
                     window.localStorage.pcId = data.pcId;
                  }
                  window.sessionStorage.authToken = data.result.authToken;
                  window.sessionStorage.userLogged = userData.userId;
                  window.sessionStorage.userData = JSON.stringify((data.result.userData) ? data.result.userData : {});
                  if (userData.userId === parametersManager.baseApplicationParameters.demoAccountUser) {
                     //TODO check on calculators-manager to avoid hardcoding
                     window.sessionStorage.modulesAuthorized = "multicalc";
                  }
                  else {
                     window.sessionStorage.modulesAuthorized = data.result.modulesAuthorized;
                  }
                  if (data.result.userData && parametersManager.baseApplicationParameters.consultantMode) {
                     storageManager.storeOnBrowserLocalStorage('customerNumber', data.result.userData.customerNumber);
                     storageManager.storeOnBrowserLocalStorage('customerInfo', data.result.userData.customerInfo);
                     storageManager.storeOnBrowserLocalStorage('consultantInfo', data.result.userData.consultantInfo);
                  }
                  deferred.resolve({status: AuthenticationServiceLoginResultStatus.SUCCEEDED,
                     userLogged: userData.userId, modulesAuthorized: data.result.modulesAuthorized,
                     authToken: data.result.authToken});
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;
                  if (status === 404) {
                     resultStatus = AuthenticationServiceLoginResultStatus.INVALIDUSERORPASSWORD;
                  }
                  else if (status === 401) {
                     resultStatus = AuthenticationServiceLoginResultStatus.USERINACTIVE;
                  }
                  else if (status === 403) {
                     resultStatus = AuthenticationServiceLoginResultStatus.USERBLOCKED;
                  }
                  else {
                     resultStatus = AuthenticationServiceLoginResultStatus.FAILED;
                  }
                  deferred.reject({status: resultStatus});
               });

               return deferred.promise;
            },
            
            loginRememberedUser: function(userData) {
               var deferred = $q.defer();
               
               var url = this.getServiceURL() + "/loginRememberedUser";
               
               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'POST',
                  url: url,
                  responseType: 'json',
                  cache: false,
                  data: {
                     userDataObject: userData
                  }
               }).success(function(data, status, headers, config) {
                  window.sessionStorage.authToken = data.authToken;
                  window.sessionStorage.userLogged = userData.userId;
                  window.sessionStorage.modulesAuthorized = data.modulesAuthorized;
                  window.sessionStorage.userData = (data.userData) ? JSON.stringify(data.userData) : {};
                  if (data.userData && parametersManager.baseApplicationParameters.consultantMode) {
                     storageManager.storeOnBrowserLocalStorage('customerNumber', data.userData.customerNumber);
                     storageManager.storeOnBrowserLocalStorage('customerInfo', data.userData.customerInfo);
                     storageManager.storeOnBrowserLocalStorage('consultantInfo', data.userData.consultantInfo);
                  }
                  deferred.resolve({status: AuthenticationServiceLoginRememberedUserResultStatus.SUCCEEDED});
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;
                  if (status === 401) {
                     resultStatus = AuthenticationServiceLoginRememberedUserResultStatus.INVALIDUSER;
                  }
                  else {
                     resultStatus = AuthenticationServiceLoginRememberedUserResultStatus.FAILED;
                  }
                  deferred.reject({status: resultStatus});
               });
               
               return deferred.promise;
            },
   
            checkUserAvailability: function(userId) {
               var deferred = $q.defer();
      
               var url = this.getServiceURL() + "/checkUserAvailability";
   
               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'GET',
                  url: url,
                  params: {
                     userId: userId
                  },
                  headers: {
                     'Content-Type': 'application/json; charset=utf-8'
                  }
               }).success(function(data, status, headers, config) {
                  deferred.resolve({status: AuthenticationServiceRegistrationResultStatus.USERAVAILABLE});
               }).error(function(data, status, headers, config) {
                  var resultStatus;
                  if (status === 409) {
                     resultStatus = AuthenticationServiceRegistrationResultStatus.USERALREADYEXISTS;
                  }
                  else {
                     resultStatus = AuthenticationServiceRegistrationResultStatus.FAILED;
                  }
                  deferred.reject({status: resultStatus});
               });
      
               return deferred.promise;
            },

            sendReactivationEmail: function(userData, emailData) {
               var deferred = $q.defer();

               var url = this.getServiceURL() + "/sendActivationEmail";

               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'POST',
                  url: url,
                  responseType: 'json',
                  cache: false,
                  data: {
                     userDataObject: userData,
                     emailObject: emailData
                  }
               }).success(function(data, status, headers, config) {
                  deferred.resolve({status: AuthenticationServiceLoginResultStatus.SUCCEEDED});
               })
               .error(function(data, status, headers, config) {
                  var resultStatus = AuthenticationServiceLoginResultStatus.FAILED;
                  deferred.reject({status: resultStatus});
               });
               return deferred.promise;
            },

            updateUser: function(currentUser, userToUpdate, confirmationToken) {
               var deferred = $q.defer();

               var url = this.getServiceURL() + "/updateUser";
               var token = this.getAuthToken();
               if (!token) {
                  token = confirmationToken;
               }
               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'PUT',
                  url: url,
                  responseType: 'json',
                  cache: false,
                  data: {
                     authToken: token,
                     userDataObject: currentUser,
                     userDataToUpdateObject: userToUpdate
                  }
               }).success(function(data, status, headers, config) {
                  window.sessionStorage.authToken = data.authToken;
                  deferred.resolve({status: AuthenticationServiceUpdateUserAccountResultStatus.SUCCEEDED});
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;
                  if (status === 401) {
                     resultStatus = AuthenticationServiceUpdateUserAccountResultStatus.UNAUTHORIZED;
                  }
                  else if (status === 404) {
                     resultStatus = AuthenticationServiceUpdateUserAccountResultStatus.INVALIDUSERORPASSWORD;
                  }
                  else {
                     resultStatus = AuthenticationServiceUpdateUserAccountResultStatus.FAILED;
                  }
                  deferred.reject({status: resultStatus});
               });

               return deferred.promise;
            },
            
            updatePassword: function(currentUser, userToUpdate, confirmationToken) {
               var deferred = $q.defer();
               
               var url = this.getServiceURL() + "/updatePassword";
               var token = this.getAuthToken();
               if (!token) {
                  token = confirmationToken;
               }
               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'PUT',
                  url: url,
                  responseType: 'json',
                  cache: false,
                  data: {
                     authToken: token,
                     userDataObject: currentUser,
                     userDataToUpdateObject: userToUpdate
                  }
               }).success(function(data, status, headers, config) {
                  window.sessionStorage.authToken = data.authToken;
                  deferred.resolve({status: AuthenticationServiceUpdatePasswordResultStatus.SUCCEEDED});
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;
                  if (status === 401) {
                     resultStatus = AuthenticationServiceUpdatePasswordResultStatus.UNAUTHORIZED;
                  }
                  else if (status === 404) {
                     resultStatus = AuthenticationServiceUpdatePasswordResultStatus.INVALIDUSERORPASSWORD;
                  }
                  else {
                     resultStatus = AuthenticationServiceUpdatePasswordResultStatus.FAILED;
                  }
                  deferred.reject({status: resultStatus});
               });
               
               return deferred.promise;
            },

            resetPassword: function(userData, emailData) {
               var deferred = $q.defer();
               var url = this.getServiceURL() + "/resetPassword";

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
                     userDataObject: userData,
                     emailObject: emailData
                  }
               }).success(function(data, status, headers, config) {
                  window.sessionStorage.authToken = data.authToken;
                  deferred.resolve({status: AuthenticationServiceResetPasswordResultStatus.SUCCEEDED});
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;
                  if (status === 404) {
                     resultStatus = AuthenticationServiceResetPasswordResultStatus.USERNOTFOUND;
                  }
                  else {
                     resultStatus = AuthenticationServiceResetPasswordResultStatus.FAILED;
                  }
                  deferred.reject({status: resultStatus});
               });

               return deferred.promise;
            },
               
            getPcId: function() {
               if (window.localStorage.pcId === undefined) {
                  return null;
               }
               else {
                  return window.localStorage.pcId;
               }
            },
            
            getUserLogged: function() {
               return window.sessionStorage.userLogged;
            },
            
            getUserData: function() {
               return JSON.parse((window.sessionStorage.userData) ? window.sessionStorage.userData : null);
            },
            
            getAuthToken: function() {
               return window.sessionStorage.authToken;
            },
            
            setAuthToken: function(authToken) {
               window.sessionStorage.authToken = authToken;
            },
            
            isUserLogged: function() {
               return window.sessionStorage.userLogged !== undefined;
            },
            
            isDemoAccount: function() {
               return window.sessionStorage.userLogged === parametersManager.baseApplicationParameters.demoAccountUser;
            },

            logOut: function() {
               window.localStorage.setItem('user', '');
               window.localStorage.setItem('token', '');
               window.sessionStorage.clear();
            },
            
            clearCalculatorServiceToken: function() {
               window.calculatorServiceToken = undefined;
            },
            
            getCalculatorServiceToken: function() {
               var deferred = $q.defer();
               var that = this;
               if (parametersManager.baseApplicationParameters.serverCalculation) {
                  if (window.calculatorServiceToken !== undefined) {
                     deferred.resolve({authToken: window.calculatorServiceToken});
                  }
                  else {
                     return that.createCalculatorServiceToken();
                  }
               }
               return deferred.promise;
            },
            
            createCalculatorServiceToken: function() {
               var deferred = $q.defer();
               var url = this.getServiceURL() + "/createToken";

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
                  window.calculatorServiceToken = data.authToken;
                  deferred.resolve({status: AuthenticationServiceCreateCalculatorServiceTokenResultStatus.SUCCEEDED, authToken: data.authToken});
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;
                  if (status === 404) {
                     resultStatus = AuthenticationServiceCreateCalculatorServiceTokenResultStatus.USERNOTFOUND;
                  }
                  else {
                     resultStatus = AuthenticationServiceCreateCalculatorServiceTokenResultStatus.FAILED;
                  }
                  deferred.reject({status: resultStatus});
               });

               return deferred.promise;
            }
         };

         return authenticationService;
      }
   ]);

   return authenticationServiceModule;
});


define('location-breadcrumbs', [
   'angular',
   'routes-handler',
   'logger',
   'localization'
], function(angular, routesHandler, Logger) {
   'use strict';

   /**
    * This service is designed to store a breadcrumb trail of the navigation when needed.
    * Sometimes users are moved from the original workflow they are following, to login or save their progress. This service
    * allow the developers to keep a record of the new workflow in case we need to move the user back to the original workflow.
    */

   var log = Logger.get('locationBreadcrumbs');

   var locationBreadcrumbsModule = angular.module('locationBreadcrumbsModule', []);

   locationBreadcrumbsModule.factory('locationBreadcrumbsService', ['locationService', 'localize',
      function(locationService, localize) {
         var locationBreadcrumbs = {
            breadcrumbs: [],

            /**
             * Discards repeated contiguous series of Breadcrumbs at the top.
             * Examples:
             *    A B Y Z Y Z  ==> A B Y Z
             *    A B W X Y Z W X Y Z ==> A B W X Y Z
             */
            discardRepeatedBreadcrumbGroups: function() {
               if (this.breadcrumbs.length === 0) {
                  return;
               }

               var topBreadcrumbIndex = this.breadcrumbs.length - 1;
               var topBreadcrumb = this.breadcrumbs[topBreadcrumbIndex];
               var previousAppearanceOfTopBreadcrumbIndex = -1;
               for (var index = topBreadcrumbIndex - 1; index >= 0; index--) {
                  var breadcrumb = this.breadcrumbs[index];
                  if (breadcrumb.id === topBreadcrumb.id) {
                     previousAppearanceOfTopBreadcrumbIndex = index;
                     break;
                  }
               }
               this.breadcrumbs.lastIndexOf(topBreadcrumb, topBreadcrumbIndex - 1);

               // if the top breadcrumb does not appear before, there's no possible repeated serie
               if (previousAppearanceOfTopBreadcrumbIndex === -1) {
                  return;
               }

               // check if there's enough history for a repeated serie
               var serieLenght = topBreadcrumbIndex - previousAppearanceOfTopBreadcrumbIndex;
               if (previousAppearanceOfTopBreadcrumbIndex < serieLenght) {
                  return;
               }

               // compare elements of the series for each position
               for (index = topBreadcrumbIndex; index > previousAppearanceOfTopBreadcrumbIndex; index--) {
                  var topSerieBreadcrumb = this.breadcrumbs[index];
                  var previousSerieBreadcrumb = this.breadcrumbs[index - serieLenght];

                  // if some element is different, there's no repeated serie
                  if (topSerieBreadcrumb.id !== previousSerieBreadcrumb.id) {
                     return;
                  }
               }

               // repeated serie found, remove top serie
               this.breadcrumbs.splice(previousAppearanceOfTopBreadcrumbIndex + 1);
            },

            forgetOlderBreadcrumbs: function() {
               var maxlenght = 10;
               if (this.breadcrumbs.length > maxlenght) {
                  this.breadcrumbs.splice(0, this.breadcrumbs.length - maxlenght);
               }
            },
            
            push: function(canGoBack) {
               var id = routesHandler.getId();
               var search = locationService.getSearch();

               // do not add the path if it's already the last one
               if (this.breadcrumbs.length > 0 && this.breadcrumbs[this.breadcrumbs.length - 1].id === id &&
                   this.breadcrumbs[this.breadcrumbs.length - 1].search === search) {
                  return;
               }

               //if there is already one element with the same path but with a different search, this will be replaced
               if (this.breadcrumbs.length > 0 && this.breadcrumbs[this.breadcrumbs.length - 1].id === id &&
                  this.breadcrumbs[this.breadcrumbs.length - 1].search !== search) {
                  this.breadcrumbs[this.breadcrumbs.length - 1] = {id: id, search: search, canGoBack: canGoBack};
                  this.discardRepeatedBreadcrumbGroups();

                  // remember only a limited amount of breadcrumbs
                  this.forgetOlderBreadcrumbs();
                  return;
               }
               
               this.breadcrumbs.push({id: id, search: search, canGoBack: canGoBack});

               this.discardRepeatedBreadcrumbGroups();

               // remember only a limited amount of breadcrumbs
               this.forgetOlderBreadcrumbs();
            },

            pop: function() {
               if (this.breadcrumbs.length === 0) {
                  locationService.clearSearch();
                  locationService.setPath('/');
               }
               else {
                  locationService.setUrl(locationService.getPath());

                  var language = localize.getActiveLanguage();
                  var currentId = routesHandler.getId();

                  var breadcrumb = this.breadcrumbs.pop();
                  var id = breadcrumb.id;
                  var path = routesHandler.getPathByIdAndLanguage(id, language);
                  var isValidBreadcrumb = id !== currentId && breadcrumb.canGoBack();
                  var search = breadcrumb.search;
                  while (this.breadcrumbs.length > 0 && !isValidBreadcrumb) {
                     breadcrumb = this.breadcrumbs.pop();
                     id = breadcrumb.id;
                     path = routesHandler.getPathByIdAndLanguage(id, language);
                     isValidBreadcrumb = id !== currentId && breadcrumb.canGoBack();
                     search = breadcrumb.search;
                  }

                  if (isValidBreadcrumb) {
                     locationService.setPath(path).setSearch(search);
                  }
                  else {
                     locationService.setPath('/');
                  }
               }
            }
         };

         return locationBreadcrumbs;
      }
   ]);

   return locationBreadcrumbsModule;
});


define('profile-common', [
   'angular',
   'logger',
   'parameters-manager',
   'authentication-service',
   'location-breadcrumbs'
], function(angular, Logger, parametersManager) {
   'use strict';
   
   var log = Logger.get('profileCommon');
   
   var profileCommonModule = angular.module('profileCommonModule', []);
   
   profileCommonModule.factory('profileCommon', ['locationService', 'localize', 'translateRoute', 'authenticationService', '$rootScope',
      function(locationService, localize, translateRoute, authenticationService, $rootScope) {
         var profileCommon = {
            getServiceURL: function() {
               return parametersManager.baseApplicationParameters.authenticationServiceURL + '/' +
                  parametersManager.baseApplicationParameters.authenticationCustomization;
            },
            getUserLogged: function() {
               if (this.isDemoAccount()) {
                  return localize.getLocalizedString('DemoAccount');
               }
               else {
                  return authenticationService.getUserLogged();
               }
            },
   
            isDemoAccount: function() {
               return authenticationService.getUserLogged() === parametersManager.baseApplicationParameters.demoAccountUser;
            },
   
            logOut: function() {
               authenticationService.logOut();
               $rootScope.$broadcast("storageReset");
               locationService.setPath('/');
            },
   
            logIn: function() {
               locationService.clearSearch(); //clean the query parameters
               locationService.setPath(translateRoute.getPath('login'));
            },
   
            register: function() {
               locationService.clearSearch(); //clean the query parameters
               locationService.setPath(translateRoute.getPath('register'));
            },
   
            showLogin: function() {
               if ($rootScope.activeController !== 'login') {
                  return true;
               }
               else {
                  return false;
               }
            },
     
            showRegister: function() {
               if ($rootScope.activeController === 'login') {
                  return true;
               }
               else {
                  return false;
               }
            },
      
            onUserLogged: function() {
               if (authenticationService.isDemoAccount()) {
                  return;
               }
               locationService.clearSearch(); //clean the query parameters
               if (parametersManager.baseApplicationParameters.consultantMode) {
                  locationService.setPath(translateRoute.getPath("consultantUserAccount"));
               }
               else {
                  locationService.setPath(translateRoute.getPath("userAccount"));
               }
            }
         };
         
         return profileCommon;
      }
   ]);
   
   return profileCommonModule;
});


define('custom-icon-button-bar', [
   'app'
], function(app) {
   'use strict';

   return function(app) {
      var customIconButtonBar = app.controller('customIconButtonBarController', ['$scope',
         function($scope) {
         }
      ]);
      return customIconButtonBar;
   };
});


define('icon-button-bar', [
   'app',
   'parameters-manager',
   'storage-manager',
   'text-field',
   'profile-common',
   'custom-icon-button-bar'
], function(app, parametersManager) {
   'use strict';
   return function(app) {
      var iconButtonBar = app.directive('iconButtonBar', ['storageManager', '$rootScope', 'localize', '$injector',
         function(storageManager, $rootScope, localize, $injector) {
         return {
            restrict: 'E',
            scope: {
               onPrint: '&',
               showPrint: '&',
               onContact: '&',
               showContact: '&',
               onNew: '&',
               showNew: '&',
               showSave: '&',
               showEventPlan: '&',
               isAnyEventPlan: '&',
               showDossier: '&'
            },
            templateUrl: 'src/directives/icon-button-bar/icon-button-bar.html',
            link: function(scope, element, attrs) {
               $injector.invoke(['$controller', function ($controller) {
                  $controller('customIconButtonBarController', {$scope: scope});
               }]);
           
               scope.anyButton = function() {
                  var languageSelection = parametersManager.baseViewParameters.languageSelectionEnabled &&
                                            parametersManager.baseViewParameters.availableLanguages.length > 1;
                  var countrySelection = parametersManager.baseViewParameters.countrySelectionEnabled &&
                                           parametersManager.baseViewParameters.availableCountries.length > 1;
                  var socialMedia = scope.availableMedia().length > 0;
                  return scope.showSave() ||
                         scope.showDossier() ||     
                         scope.showNew() ||
                         scope.showEventPlan() ||
                         scope.showCalculatorsButton() ||
                         scope.showPrint() ||
                         scope.showContact() ||
                         scope.showCalculatorsButton() ||
                         languageSelection ||
                         countrySelection ||
                         socialMedia;
               };

               scope.onEventPlan = function() {
                  scope.$parent.onEventPlan();
               };
               scope.isAnyEventPlan = function() {
                  return (scope.$parent.isAnyEvent) ? scope.$parent.isAnyEvent() : false;
               };
               scope.onSocialMediaButton = function(id, $event) {
                  // when calling with ng-click, we don't want the url defined in ng-href to be opened too
                  $event.preventDefault();

                  return scope.$parent.onSocialMediaButton(id);
               };
               scope.getSocialMediaUrl = function(id) {
                  return scope.$parent.getSocialMediaUrl(id);
               };
               scope.availableMedia = function() {
                  return scope.$parent.getAvailableSocialMedia();
               };
               scope.showCalculatorsButton = function() {
                  return scope.$parent.showCalculatorsButton();
               };
               scope.isIconButtonBarFixed = function() {
                  return parametersManager.baseViewParameters.isIconButtonBarFixed;
               };
               scope.showIconButtonBar = function() {
                  return parametersManager.baseViewParameters.iconButtonBar;
               };
               scope.getDossierDropdownClass = function() {
                  return scope.$parent.showSeparator() ?
                  'icon-button-bar__dossier-dropdown--with-separator' :
                  'icon-button-bar__dossier-dropdown--without-separator';
               };
               scope.openAdditionalPrintingData = function() {
                  if (scope.askConsultantDataForPrinting() && !scope.additionalPrintingData) {
                     var baseState = storageManager.getStoredObject('base');
                     if (baseState) {
                        scope.additionalPrintingData = baseState.additionalPrintingData;
                     }

                     if (!scope.additionalPrintingData) {
                        scope.additionalPrintingData = {
                           customerNumber: 0,
                           customerInfo: '',
                           consultantInfo: '',
                           additionalData: ''
                        };
                     }

                     var customerNumber = storageManager.getFromBrowserSessionStorage('customerNumber');
                     if (customerNumber) {
                        scope.additionalPrintingData.customerNumber = customerNumber;
                     }
                     var customerInfo = storageManager.getFromBrowserSessionStorage('customerInfo');
                     if (customerInfo) {
                        scope.additionalPrintingData.customerInfo = customerInfo;
                     }
                     var consultantInfo = storageManager.getFromBrowserLocalStorage('consultantInfo');
                     if (consultantInfo) {
                        scope.additionalPrintingData.consultantInfo = consultantInfo;
                     }
                     var additionalData = storageManager.getFromBrowserLocalStorage('additionalData');
                     if (additionalData) {
                        scope.additionalPrintingData.additionalData = additionalData;
                        scope.additionalPrintingData.additionalData.description = additionalData.bankCode + " " + additionalData.bankName;
                     }
                  }

                  $('#additionalPrintingDataModal').on('show.bs.modal', function () {
                     scope.customerNumberEnabled = scope.additionalPrintingData &&
                     (!scope.additionalPrintingData.customerNumber ||
                     scope.additionalPrintingData.customerNumber && scope.additionalPrintingData.customerNumber.length === 0);
                     
                     scope.additionalPrintingDataAux = $.extend(true, {}, scope.additionalPrintingData);
                     
                     // Workarround T2795: bcvs, inside iframe, mobile size: finanz coach modal dialog can appear in a non visible (scrolled up) area.
                     if (window.matchMedia("only screen and (min-width: 516px)").matches) {
                        // Workarround T2863: iframe is re-positioned when opening finance-coach in IE and when before the users scrolled down
                        // IE Fix:  bootstrap does a focus, which screws up the iframe by scrolling the parent window
                        setTimeout(function() {
                           $('#additionalPrintingDataModal').find('.modal-dialog').off('bsTransitionEnd');

                           // the code below would normally belong to the shown.bs.modal event.
                           // the woraround above, however, for some unknown reason, prevents the shown.bs.modal event to be triggered.
                           // running the code here is however more or less the same, because the timeout gets triggered when the dialog is shown.
                           
                           // nothing to do when shown.bs.modal yet.
                        }, 350);
                     }
                     
                     var additionalData = storageManager.getFromBrowserLocalStorage('additionalData');
                     if (additionalData) {
                        if (scope.getBankData) {
                           scope.getBankData(additionalData).then(function(result) {
                              if (result) {
                                 scope.additionalPrintingData.additionalData = $.extend(true, {}, result);
                                 scope.additionalPrintingData.additionalData.description = result.bankCode + " " + result.bankName;
                              }
                              else {
                                 scope.additionalPrintingData.additionalData = null;
                              }
                           });
                        }
                     }
                     
                  }).modal('show');
               };
               scope.onCancelConsultantDataEdition = function() {
                  scope.additionalPrintingData.customerNumber = scope.additionalPrintingDataAux.customerNumber;
                  scope.additionalPrintingData.customerInfo = scope.additionalPrintingDataAux.customerInfo;
                  scope.additionalPrintingData.consultantInfo = scope.additionalPrintingDataAux.consultantInfo;
               };
               scope.goToEventPlan = function () {
                  scope.onCancelConsultantDataEdition();
                  $('#additionalPrintingDataModal').modal('hide');
                  scope.onEventPlan();
               };
               scope.getEventPlanLabel = function () {
                  return (scope.isAnyEventPlan()) ? localize.getLocalizedString('additionalPrintingData.HasEventText') : localize.getLocalizedString('additionalPrintingData.NoEventText');
               };
               scope.getEventPlanLabelLink = function () {
                  return (scope.isAnyEventPlan()) ? localize.getLocalizedString('additionalPrintingData.HasEventTextLink') : localize.getLocalizedString('additionalPrintingData.NoEventTextLink');
               };
               scope.askConsultantDataForPrinting = function() {
                  return parametersManager.baseViewParameters.askConsultantDataForPrinting;
               };
               scope.askCustomerReferenceForPrinting = function() {
                  return parametersManager.baseViewParameters.askCustomerReferenceForPrinting;
               };

               scope.testData = function() {
                  return (scope.customTestData) ? scope.customTestData() : true;
               };
               scope.onSendPrint = function() {
                  if (scope.testData()) {
                     scope.onPrint({'additionalPrintingData': scope.additionalPrintingData});
                     $('#additionalPrintingDataModal').modal('hide');
                  }
               };
            },
            controller: ['$scope', '$window', '$timeout', 'profileCommon', function($scope, $window, $timeout, profileCommon) {
               //FIX FOR IE11 PROBLEM
               //In IE11, the ng-cloak in the different divs of the html are somehow ignored,
               //resulting in a flicker of the icon tool bar for customizations where this bar
               //is not desired (that is, the icon tool bar appeared at the beginning and then
               //quickly disappeared).
               //To fix it (at least until a better fix is found), we attach by default a css class
               //hiding the toolbar. If the customization does not need the toolbar, it will never
               //be shown. On the other hand, customizations that want the toolbar will enter
               //the "if" statement below, effectively changing this css class to indicate that
               //the toolbar must be shown.
               var shouldShowIconButtonBar = parametersManager.baseViewParameters.iconButtonBar;
               if (shouldShowIconButtonBar) {
                  $(".icon-button-bar__tool-bar-visibility").css('display', 'block');
               }

               var onResize = function() {
                  modifyHeight();
               };
               window.addEventListener('resize', onResize, false);

               $(".navbar-toggle").click(function() {
                  modifyHeight();
               });

               $(".dropdown").click(function() {
                  modifyHeight();
               });
      
               $scope.getUserLogged = function() {
                  return profileCommon.getUserLogged();
               };
               $scope.logOut = function() {
                  return profileCommon.logOut();
               };
               $scope.logIn = function() {
                  return profileCommon.logIn();
               };
               $scope.signUp = function() {
                  return profileCommon.signUp();
               };
               $scope.onUserLogged = function() {
                  return profileCommon.onUserLogged();
               };
               
               $scope.isCustomerNumberEnabled = function() {
                  return parametersManager.baseViewParameters.customerNumberEnabled || $scope.customerNumberEnabled;
               };

               function ulElementsHeightSum() {
                  var sum = 0;
                  $(".icon-button-bar__tool-bar li a").each(function() {
                     if ($(this).height() > 0) {
                        sum += $(this).height();
                        sum += parseFloat($(this).css('padding-top'));
                        sum += parseFloat($(this).css('padding-bottom'));
                        sum += parseFloat($(this).css('margin-top'));
                        sum += parseFloat($(this).css('margin-bottom'));
                        sum += parseFloat($(this).css('border-top'));
                        sum += parseFloat($(this).css('border-bottom'));
                     }
                  });
                  return sum;
               }

               function modifyHeight() {
                  setTimeout(function() {
                     var iconToolbar = $("#IconToolbar");

                     var sum = ulElementsHeightSum();
                     if (sum > $window.outerHeight) {
                        iconToolbar.css('height', $window.outerHeight - 50);
                     }
                     else {
                        sum += parseFloat(iconToolbar.css('padding-top'));
                        sum += parseFloat(iconToolbar.css('padding-bottom'));
                        sum += parseFloat(iconToolbar.css('margin-top'));
                        sum += parseFloat(iconToolbar.css('margin-bottom'));
                        sum += parseFloat(iconToolbar.css('border-top'));
                        sum += parseFloat(iconToolbar.css('border-bottom'));

                        iconToolbar.css('height', sum);
                     }
                  }, 50);
               }
            }]
         };
      }]);
      return iconButtonBar;
   };
});



define('navigation-bar', [
   'app',
   'theme-manager',
   'logger'
], function(app, ThemeManager, Logger) {
   'use strict';
   var availableThemes;
   var themeManager =  new ThemeManager();
   var log = Logger.get('NavigationBar');
   return function(app) {
      var navigationBar = app.directive('navigationBar', ['$rootScope', function($rootScope) {
         return {
            restrict: 'E',
            replace: false,
            scope: {
               onPrint: '&'
            },
            templateUrl: 'src/directives/navigation-bar/navigation-bar.html',
            link: function(scope, element, attrs) {

               scope.showPrint = function() {
                  return attrs.onPrint !== undefined;
               };

               scope.showNavigationBar = function() {
                  return !$rootScope.singleCalculation && $rootScope.navigationBar;
               };
            },
            controller: ['$scope', 'locationService', 'localize', 'translateRoute', 'calculatorsManager',
               function($scope, locationService, localize, translateRoute, calculatorsManager) {

                  $scope.notEmpty = function(enumKey) {
                     return localize.getLocalizedString(enumKey) !== "";
                  };

                  $scope.cleanPath = function(path) {
                     if (path.slice(0, 2) === "#/") {
                        path = path.slice(2);
                     }

                     if (path.slice(0, 1) === "/") {
                        path = path.slice(1);
                     }

                     if (path.slice(0, 1) === "#") {
                        path = path.slice(1);
                     }


                     if (path.slice(path.length - 1, path.length) === "/") {
                        path = path.slice(0, path.length - 1);
                     }

                     return path;
                  };

                  $scope.navigateToRoot = function(linkLocation, $event) {
                     locationService.clearSearch(); //clean the query parameters
                     locationService.setPath(translateRoute.getPath("/"));
                     $scope.initLoadingBar(linkLocation, $event);
                     // prevent a new location change because of the href in the anchor
                     $event.preventDefault();
                  };

                  $scope.initLoadingBar = function(linkLocation, $event) {
                     if ($scope.viewControllerInitializationInProgress) {
                        log.debug("navigation prevented while view controller initialization is in progress");
                        return;
                     }

                     var currentLocation = locationService.getPath();
                     var translatedLinkLocation = translateRoute.perform(linkLocation);

                     // clean paths to avoid differences because of slashes at begin or end
                     currentLocation = $scope.cleanPath(currentLocation);
                     linkLocation = $scope.cleanPath(linkLocation);
                     translatedLinkLocation = $scope.cleanPath(translatedLinkLocation);
                     
                  };

                  $scope.translateRoute = translateRoute;
                  $scope.isCalculatorAvailable = function(calculatorId) {
                     return calculatorsManager.isCalculatorAvailable(calculatorId);
                  };

                  $scope.isThemeAvailable = function(theme) {
                     return calculatorsManager.isThemeAvailable(theme);
                  };

                  var getThemeId = function(theme) {
                     // e.g. ThemeHouse
                     return 'Theme' + theme.charAt(0).toUpperCase() + theme.slice(1);
                  };


                  var getEnumKey = function(theme) {
                     //e.g. Application.House
                     return 'Application.' + theme.charAt(0).toUpperCase() + theme.slice(1);
                  };

                  //var label = localize.getLocalizedString(enumKey);
                  $scope.getLocalizedString = function(enumKey) {
                     return localize.getLocalizedString(enumKey);
                  };
                  $scope.availableThemes = function() {
                     if (availableThemes === undefined) {
                        availableThemes = [];
                        var themes = calculatorsManager.availableThemes();
                        for (var indexTheme in themes) {
                           var theme = themes[indexTheme].id;
                           var themeId = getThemeId(theme); // e.g. ThemeHouse
                           var subThemesId = getThemeId(theme) + 'SubThemes';  // e.g. ThemeHouseSubThemes
                           var subThemeMainId = getThemeId(theme) + 'SubThemeMain'; // e.g. ThemeHouseSubThemeMain
                           var themeEnumKey = getEnumKey(theme);
                           availableThemes.push({name: theme, id: themeId, subThemesId: subThemesId, subThemeMainId: subThemeMainId, themeEnumKey: themeEnumKey});
                        }
                     }
                     return availableThemes;
                  };

                  /**
                   * The following watch has sense only for testing
                   * 
                   * availableThemes is filled from calculatorsManager.availableThemes()
                   * (but a different item structure is used).
                   * This watch checks that if calculatorsManager.availableThemes() returns
                   * something different, we set our internal availableThemes to undefined,
                   * so the next time that $scope.availableThemes() is called we will  use
                   * the new stuff from the calculatorManager.
                   * This makes sense only in tests, since a normal application just has a single
                   * structure of themes, which doesn't change.
                   */
                  $scope.$watch(function() {
                     return calculatorsManager.availableThemes();
                  },
                  function() {
                     availableThemes = undefined;
                  });

                  $scope.availableCalculatorsByTheme = function(theme) {
                     if (theme === undefined) {
                        return [];
                     }
                     var calcsByTheme =  calculatorsManager.availableCalculatorsByTheme(theme);
                     for (var index in calcsByTheme) {
                        var calculator = calcsByTheme[index].calculator;
                        var keyPrefix = theme.charAt(0).toLowerCase() + theme.slice(1) + ".";
                        calcsByTheme[index].calculatorEnumKey = keyPrefix + calculator.charAt(0).toUpperCase() + calculator.slice(1);
                     }
                     return calcsByTheme;
                  };

                  $scope.availableCalculators = function() {
                     return calculatorsManager.availableCalculators();
                  };

                  $scope.isThemeSelected = function(theme) {
                     return themeManager.isThemeSelected(theme);
                  };

                  $scope.isSubThemeSelected = function(subTheme) {
                     return themeManager.isSubThemeSelected(subTheme);
                  };

                  $scope.isThemeMainSelected = function(theme) {
                     return themeManager.isThemeMainSelected(theme);
                  };

                  $scope.getRouteForOverview = function() {
                     if ($scope.viewControllerInitializationInProgress) {
                        return "";
                     }

                     return translateRoute.perform('');
                  };

                  $scope.getRouteForTheme = function(theme) {
                     if ($scope.viewControllerInitializationInProgress) {
                        return "";
                     }

                     return translateRoute.perform(theme.name);
                  };

                  $scope.getRouteForCalculator = function(theme, calcByTheme) {
                     if ($scope.viewControllerInitializationInProgress) {
                        return "";
                     }

                     return translateRoute.perform(theme.name + '/' + calcByTheme.calculator);
                  };

                  $rootScope.$on('viewControllerInitializationStarted', function () {
                     $scope.viewControllerInitializationInProgress = true;
                  });

                  $rootScope.$on('viewControllerInitializationFinished', function () {
                     $scope.viewControllerInitializationInProgress = false;
                  });
               }
            ]
         };
      }]);
      return navigationBar;
   };
});


define('title-link', [
   'app'
], function(app) {
   'use strict';
   return function(app) {
      var titleLink = app.directive('titleLink', [function() {
         return {
            restrict: 'E',
            replace: false,
            scope: {
               onPrint: '&'
            },
            templateUrl: 'src/directives/title-link/title-link.html',
            link: function(scope, element, attrs) {
            },
            controller: ['$scope', 'locationService', 'translateRoute',
               function($scope, locationService, translateRoute) {
                  
                  $scope.cleanPath = function(path) {
                     if (path.slice(0, 2) === "#/") {
                        path = path.slice(2);
                     }

                     if (path.slice(0, 1) === "/") {
                        path = path.slice(1);
                     }

                     if (path.slice(0, 1) === "#") {
                        path = path.slice(1);
                     }


                     if (path.slice(path.length - 1, path.length) === "/") {
                        path = path.slice(0, path.length - 1);
                     }

                     return path;
                  };

                  $scope.navigateToRoot = function(linkLocation, $event) {
                     locationService.clearSearch(); //clean the query parameters
                     locationService.setPath(translateRoute.getPath("/"));
                     $scope.initLoadingBar(linkLocation, $event);
                     // prevent a new location change because of the href in the anchor
                     $event.preventDefault();
                  };

                  $scope.initLoadingBar = function(linkLocation, $event) {
                     var currentLocation = locationService.getPath();
                     var translatedLinkLocation = translateRoute.perform(linkLocation);

                     // clean paths to avoid differences because of slashes at begin or end
                     currentLocation = $scope.cleanPath(currentLocation);
                     linkLocation = $scope.cleanPath(linkLocation);
                     translatedLinkLocation = $scope.cleanPath(translatedLinkLocation);

                  };

                  $scope.translateRoute = translateRoute;
               }
            ]
         };
      }]); 
      return titleLink;
   };
});


define('debugging-view', [
   'app'
], function(app) {
   'use strict';
   return function(app) {
      var debuggingView = app.directive('debuggingView', ['$rootScope', function($rootScope) {
         return {
            restrict: 'E',
            replace: false,
            scope: {
               //something: '&'
            },
            templateUrl: 'src/directives/debugging-view/debugging-view.html',
            /*link: function(scope, element, attrs) {
            },*/
            controller: ['$scope',
               function($scope) {
                  
                  $scope.lastTimestamp = undefined;
                  
                  $rootScope.$on('debug', function(event, message, area) {
                     var timestamp = Date.now();
                     var view = document.getElementById("debuggingView");
                     var areaSuffix = area ? " [" + area + "]" : "";
                     var timestampDifferenceSuffix = $scope.lastTimestamp ? " - " + (timestamp - $scope.lastTimestamp) + "ms" : "";
                     var messageToShow = timestamp + " - " +  message + areaSuffix + timestampDifferenceSuffix;
                     view.innerHTML = view.innerHTML + "<br>" + messageToShow;
                     $scope.lastTimestamp = timestamp;
                  });
                  
               }
            ]
         };
      }]); 
      return debuggingView;
   };
});


define('theme-box', [
   'route-translator'
], function() {
   'use strict';
   return function(app) {
      return app.component('themeBox', {
         bindings: {
            target: '@',
            themeBoxTitle: '@',
            text: '@',
            linkText: '@'
         },
         templateUrl: 'src/directives/theme-box/theme-box.html',
         controller: ['$timeout', 'locationService', 'translateRoute', function($timeout, locationService, translateRoute) {
            var that = this;

            function getBox() {
               return $("#" + that.target + "ThemeBox");
            }

            function goToTheme() {
               locationService.clearSearch(); //clean the query parameters
               locationService.setPath(translateRoute.getPath(that.target));
            }

            this.onLinkClick = function() {
               getBox().addClass('theme-selected');
               $timeout(goToTheme, 100);
            };
         }]
      });
   };
});


define('base-data-summary', [
], function() {
   'use strict';
   return function(app) {
      return app.component('baseDataSummary', {
         bindings: {
            civilStatus: '=?',
            numberOfChildren: '=?',
            zipAndLocation: '=?',
            extraRow1: '@',
            extraRow2: '@'
         },
         templateUrl: 'src/directives/base-data-summary/base-data-summary.html',
         controller: ['localize', function(localize) {
            this.getNumberOfChildren = function() {
               // protection for the case when angular starts rendering parts of the view too early, before the model is fully initialized
               if (this.numberOfChildren === null) {
                  return "";
               }

               return localize.getLocalizedString(this.numberOfChildren === 1 ? 'Application.Child' : 'Application.Children', {'NUMBEROFCHILDREN' : this.numberOfChildren});
            };

            this.getCivilStatus = function() {
               // protection for the case when angular starts rendering parts of the view too early, before the model is fully initialized
               if (this.civilStatus === null) {
                  return "";
               }

               return localize.getLocalizedEnumDescriptionByNumber('CivilStatus', this.civilStatus);
            };

            this.getCivilStatusClass = function() {
               // protection for the case when angular starts rendering parts of the view too early, before the model is fully initialized
               if (this.civilStatus === null) {
                  return "";
               }

               if (this.civilStatus === CivilStatus.SINGLE) {
                  return "single";
               }
               else if (this.civilStatus === CivilStatus.SINGLE_IN_CONCUBINAGE) {
                  return "single-in-concubinage";
               }
               else if (this.civilStatus === CivilStatus.MARRIED) {
                  return "married";
               }
               else if (this.civilStatus === CivilStatus.REGISTERED_PARTNERSHIP) {
                  return "partnership";
               }
               else {
                  return "single";
               }
            };
         }]
      });
   };
});


 /*
 * This is a near-direct port of Robert Penner's easing equations. Please shower Robert with
 * praise and all of your admiration. His license is provided below.
 *
 * For information on how to use these functions in your animations, check out: 
 * http://www.kirupa.com/html5/animating_with_easing_functions_in_javascript.htm
 *
 * -Kirupa
 */


/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */


function linearEase(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * currentIteration / totalIterations + startValue;
}

function easeInQuad(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * (currentIteration /= totalIterations) * currentIteration + startValue;
}

function easeOutQuad(currentIteration, startValue, changeInValue, totalIterations) {
	return -changeInValue * (currentIteration /= totalIterations) * (currentIteration - 2) + startValue;
}

function easeInOutQuad(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * currentIteration * currentIteration + startValue;
	}
	return -changeInValue / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
}

function easeInCubic(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue;
}

function easeOutCubic(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
}

function easeInOutCubic(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * Math.pow(currentIteration, 3) + startValue;
	}
	return changeInValue / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
}

function easeInQuart(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * Math.pow (currentIteration / totalIterations, 4) + startValue;
}

function easeOutQuart(currentIteration, startValue, changeInValue, totalIterations) {
	return -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) + startValue;
}

function easeInOutQuart(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * Math.pow(currentIteration, 4) + startValue;
	}
	return -changeInValue/2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue;
}

function easeInQuint(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * Math.pow (currentIteration / totalIterations, 5) + startValue;
}

function easeOutQuint(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 5) + 1) + startValue;
}

function easeInOutQuint(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * Math.pow(currentIteration, 5) + startValue;
	}
	return changeInValue / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue;
}

function easeInSine(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * (1 - Math.cos(currentIteration / totalIterations * (Math.PI / 2))) + startValue;
}

function easeOutSine(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * Math.sin(currentIteration / totalIterations * (Math.PI / 2)) + startValue;
}

function easeInOutSine(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue / 2 * (1 - Math.cos(Math.PI * currentIteration / totalIterations)) + startValue;
}

function easeInExpo(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * Math.pow(2, 10 * (currentIteration / totalIterations - 1)) + startValue;
}

function easeOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
}

function easeInOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
	}
	return changeInValue / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
}

function easeInCirc(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * (1 - Math.sqrt(1 - (currentIteration /= totalIterations) * currentIteration)) + startValue;
}

function easeOutCirc(currentIteration, startValue, changeInValue, totalIterations) {
	return changeInValue * Math.sqrt(1 - (currentIteration = currentIteration / totalIterations - 1) * currentIteration) + startValue;
}

function easeInOutCirc(currentIteration, startValue, changeInValue, totalIterations) {
	if ((currentIteration /= totalIterations / 2) < 1) {
		return changeInValue / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue;
	}
	return changeInValue / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue;
};
define("easing", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.easing;
    };
}(this)));


define('common-chart-animator', [
   'logger',
   'easing'
], function(Logger) {

   var log = Logger.get('ChartAnimator');
   var flowLog = Logger.get('ChartAnimatorFlow');
   var detailLog = Logger.get('ChartAnimatorDetail');
   var timingLog = Logger.get('ChartAnimatorTiming');
   var animationDetailLog = Logger.get('ChartAnimatorAnimationDetail');

   /**
    * ChartAnimator
    * 
    * This object acts as a helper for animating charts. There can be three
    * different phases in animtion:
    * 
    * - Step animation
    *   This phase is always present. It animates the set values from the
    *   original situation to the final situation, during a certain period of
    *   time.
    * - RescaleY animation
    *   This is an optional phase (some charts don't provide support for this)
    *   It is used to animate the Y-axis scale from the original situation
    *   to the final situation.
    * - RescaleX animation
    *   This is an optional phase (some charts don't provide support for this)
    *   It is used to animate the X-axis scale from the original situation
    *   to the final situation (i.e. it adds or removes columns with an
    *   animation)
    * 
    * 
    * Delegate:
    * 
    * Required functions:
    * - createPlot(sets) : plot
    * - getSetsForDrawing : sets
    * - createDrawObjectForCurrentState() : drawObject
    *      Creates a draw object for the current state, which contains all
    *      the necessary information for a complete smooth transition draw.
    * 
    * Optional functions:
    * - beforeDrawing() : void
    * - getTicks(sets, drawObject) : ticks
    * - onAnimationStepSetDefined(set, currentDraw) : void
    * - onRedraw(sets, plot, drawObject, measureMode) : void
    * - onSetAnimationStarting(drawObject) : void
    * - onDrawFromScratch(sets, drawObject) : void
    * - onRescaleY(scale, plot) : void
    * - hasExtraChanges(drawObject) : boolean
    * - fillDifferenceSet(differenceSet, previousSet, newSet, smoothSteps, currentDraw) : void
    * - getSetsForMeasurement(drawObject) : sets
    * - fillAnimationStepSet(stepSet, previousSet, differenceSet, calculateStep, currentDraw) : void
    * - fillRescaleXStepSet(rescaleXStepSet, set, differenceSet, columns) : void
    * 
    * @returns {ChartAnimator}
    */
   var ChartAnimator = function() {

      function calculateFPS(duration, steps) {
         return Math.round(1000 * steps / duration);
      }

      /**
       * Animation
       * 
       * Represents a running animation.
       * 
       * @returns {Animation}
       */
      var Animation = function() {
         this.create = function(name, ticket, duration, steps, expectedStepDuration, callback) {
            var animation = {};
            animation.name = name;
            animation.ticket = ticket;
            animation.startTime = new Date(); //just in case start() is never called
            animation.duration = duration;
            animation.steps = steps;
            animation.expectedStepDuration = expectedStepDuration;
            animation.callback = callback;
            animation.idleTime = 0.1;
            animation.stepStart = null;
            animation.averageStepDuration = null;
            animation.averageTimeoutOverhead = null;
            animation.step = 0;
            animation.cancelled = false;

            if (animation.expectedStepDuration <= 50) {
               //fast machine
               animation.idleTime = Math.max(Math.round(animation.duration / animation.steps) - animation.expectedStepDuration, 1);
            }
            else {
               //slow machine
               animation.idleTime = 0.1;
            }
               
            timingLog.debug(animation.name + " animation (" + animation.duration + " / " + animation.steps + "). Idle time: " + animation.idleTime);

            animation.showCancelMessage = function() {
               var realDuration = new Date() - animation.startTime;
               timingLog.debug("animation cancelled, total time: " + realDuration + " (executed " + animation.step + " of " +  animation.steps + " steps)");
            };
            
            animation.endStep = function() {
               if (animation.stepStart !== null) {
                  var currentStepDuration = new Date() - animation.stepStart;
                  //timingLog.debug("current step duration: " + currentStepDuration);
                  //There was a step before, so measure its duration
                  if (animation.averageStepDuration === null) {
                     animation.averageStepDuration = currentStepDuration;
                  }
                  else {
                     animation.averageStepDuration = (animation.averageStepDuration + currentStepDuration) / 2;
                  }
                  animation.step++;
               }
            };

            animation.wait = function() {
               animation.endStep();
               if (animation.cancelled) {
                  animation.showCancelMessage();
                  return;
               }
               animation.stepStart = new Date();
               //setTimeout(callback, animation.idleTime);
               setTimeout(function() {
                  var timeoutOverhead = new Date() - animation.stepStart;
                  if (animation.averageTimeoutOverhead === null) {
                     animation.averageTimeoutOverhead = timeoutOverhead;
                  }
                  else {
                     animation.averageTimeoutOverhead = (animation.averageTimeoutOverhead + timeoutOverhead) / 2;
                  }
                  if (animation.cancelled) {
                     animation.showCancelMessage();
                     return;
                  }
                  callback(animation);
               }, animation.idleTime);
            };

            animation.start = function() {
               animation.startTime = new Date();
               animation.step = 0;
               animation.wait();
            };

            animation.resume = function() {
               animation.wait();
            };

            animation.stop = function() {
               animation.endStep();
               animation.averageStepDuration = Math.round(animation.averageStepDuration);
               animation.averageTimeoutOverhead = Math.round(animation.averageTimeoutOverhead);
               var realDuration = new Date() - animation.startTime;
               timingLog.debug("animation finished, total time: " + realDuration + " (expected: " + (animation.steps * animation.expectedStepDuration) + ")");
               timingLog.debug("                    avg. step time: " + animation.averageStepDuration + " (expected: " + animation.expectedStepDuration + ")");
               timingLog.debug("                    avg. timeout: " + animation.averageTimeoutOverhead + " (expected: " + animation.idleTime + ")");
               timingLog.debug("                    FPS: " + calculateFPS(realDuration, animation.steps) + ")");
            };

            animation.cancel = function() {
               animation.cancelled = true;
            };

            return animation;
         };
      };

      /**
       * Constructor method for the chart animator.
       * 
       * @param {string} id
       * @param {object} delegate
       * @returns {object} instance of the chart animator
       */
      this.create = function(id, delegate) {
         var animator = {};

         animator.delegate = delegate;

         animator.id = id;
         animator.plot = null;
         animator.drawing = false;

         //Smooth transitions
         animator.smoothTransitions = true;
         animator.previousSets = [];
         animator.previousMax = 0;
         animator.previousColumns = 0;
         animator.differenceSets = [];
         animator.smoothDuration = 400;
         animator.smoothSteps = 50;
         animator.smoothCurrentStep = -1;
         animator.drawingStep = false;
         animator.currentDraw = null;
         animator.pendingDraw = false;
         animator.pendingReset = false;
         animator.rescaleYDuration = 200;
         animator.rescaleYSteps = 25;
         animator.rescaleYStep = -1;
         animator.targetScale = -1;
         animator.previousScale = -1;
         animator.newScale = -1;
         animator.onScaleCallback = null;
         animator.diffColumnsPerStep = 0;
         animator.drawingStepColumns = 0;
         animator.rescaleXDuration = 400;
         animator.rescaleXSteps = 15;
         animator.rescaleXStep = -1;
         animator.rescaleXDelta = 0;
         animator.rescaleXSets = null;
         animator.onRebuiltCallback = null;
         animator.animateRescaleX = false;
         animator.sortSets = false;
         animator.sortAtEachStep = false;
         animator.stepDuration = 0;
         animator.minimumSteps = 5;
         animator.maximumExtraDurationPercentage = 0.30;
         animator.maximumFPS = 60;
         animator.configured = false;
         animator.nextAvailableTicket = 0;
         animator.currentTicket = -1;
         animator.pendingTicket = -1;

         animator.isCanvasReady = function() {
            //Check if the canvas is ready for drawing
            var canvas = $(this.id);
            var width = canvas.width();
            var height = canvas.height();
            if (width === 0 || width === undefined || height === 0 || height === undefined) {
               return false;
            }
            return true;
         };

         function isReadyForDrawing() {
            //Check if the canvas is ready for drawing
            var canvas = $(animator.id);

            //TODO: this check would be correct to avoid drawing charts not currently visible.
            //      But it causes some charts to draw and animate like crazy under certain conditions
            //      (when they are made finally visible).
//            if (!canvas.is(":visible")) {
//               //If the canvas is not visible, skip drawing to avoid exceptions
//               log.debug("CHART NOT VISIBLE, SKIPPING " + this.id + " (width=" + width + " height=" + height + ")");
//               return false;
//            }

            var width = canvas.width();
            //TODO: there are some cases in which Chrome incorrectly returns 100 as pixels, although it's 100%
//            var cssWidth = canvas.css("width");
//            console.log("CHART " + this.id + " computed: " + width + " css: " + cssWidth);
//            if (width === 100 && cssWidth === "100%") {
//               console.error("PROBLEM DETECTED IN " + this.id);
//            }
            var height = canvas.height();
            if (width === 0 || width === undefined || height === 0 || height === undefined) {
               //If the canvas is somehow invalid, skip drawing to avoid exceptions
               log.debug("SKIP DRAWING OF CHART " + this.id + " (width=" + width + " height=" + height + ")");
               return false;
            }
            return true;
         }
         
         animator.draw = function() {
            if (animator.drawing) {
               animator.pendingTicket = animator.createTicket();
               flowLog.debug("Already drawing " + this.id + ", ticket " + animator.currentTicket + " ==> marking as pending (ticket " + animator.pendingTicket + ")");
               animator.pendingDraw = true;
               return;
            }
            animator._draw();
         };
         
         animator.createTicket = function() {
            return animator.nextAvailableTicket++;
         };
         
         animator.processTicket = function(ticket) {
            if (animator.currentTicket !== -1) {
               flowLog.error("ERROR: trying to process ticket " + ticket + " while still processing ticket " + animator.currentTicket);
               return false;
            }
            animator.currentTicket = ticket;
            flowLog.debug("STARTING TO PROCESS TICKET " + animator.currentTicket + " ON " + animator.id);
            return true;
         };

         animator.finishTicket = function(ticket) {
            if (ticket !== animator.currentTicket) {
               flowLog.error("TRYING TO FINISH TICKET " + ticket + " but current ticket is " + animator.currentTicket);
               return;
            }
            flowLog.debug("FINISHED TICKET " + animator.currentTicket);
            animator.currentTicket = -1;
         };

         animator._draw = function() {
            animator.drawing = true;

            if (!isReadyForDrawing()) {
               animator.drawing = false;
               return;
            }

            var newTicket = animator.createTicket();
            if (!animator.processTicket(newTicket)) {
               console.error("NEW TICKET " + newTicket + " CANNOT BE PROCESSED");
               return;
            }

            var animate = animator.smoothTransitions;
            
            if (animator.delegate.beforeDrawing) {
               var shouldAnimate = animator.delegate.beforeDrawing();
               if (animate && shouldAnimate !== undefined) {
                  animate = shouldAnimate;
               }
            }

            var sets = animator.delegate.getSetsForDrawing();

            if (!animate || animator.plot === null || animator.pendingReset) {
               //This is the very first time that the chart is being drawn
               log.debug("Normal draw for " + animator.id);
               detailLog.debug("Sets to draw: " + JSON.stringify(sets));
               animator.drawFromScratch(sets);
               detailLog.debug("drawFromScratch finished");

               animator.finishTicket(animator.currentTicket);
               animator.drawing = false;
               animator.pendingReset = false;
            }
            else {
               if (animator.smoothTransitions) {
                  animator.drawSmooth(animator.delegate.createDrawObjectForCurrentState());
               }
               else {
                  var setsToRedraw = $.extend(true, [], sets);
                  animator.redraw(setsToRedraw);
                  animator.finishTicket(animator.currentTicket);
                  animator.drawing = false;
               }
            }
         };

         /**
          * measureStepDuration
          * 
          * Measures the step duration for the chart. This is normally
          * affected by the device speed.
          * Note that this is executed before the chart animates itself for
          * the very first time, so the involved sets are the previous ones
          * (unless getSetsForMeasurement is defined, in which case
          * the chart can explicitely indicate which sets to use).
          * 
          * @param {type} drawObject
          * @returns {Number}
          */
         animator.measureStepDuration = function(drawObject) {
            var initialPlot = animator.plot;
            var measurementSets = animator.delegate.getSetsForMeasurement ?
                                       animator.delegate.getSetsForMeasurement(drawObject) :
                                       drawObject.previousSets;
            var sets;
            var timeStart;
            var averageStepDuration = null;

            for (var measureIndex = 0; measureIndex < 10; measureIndex++) {
               // This clone of sets was added because there are cases where it is needed,
               // for example in fortune chart when it has null values or peaks it crash without this clone
               sets = $.extend(true, [], measurementSets);
               timeStart = new Date();
               animator.redraw(sets, true);
               var stepDuration = new Date() - timeStart;
               //timingLog.debug("Measure " + measureIndex + " for " + this.id + "=" + stepDuration);
               if (averageStepDuration === null) {
                  averageStepDuration = stepDuration;
               }
               else {
                  averageStepDuration = (averageStepDuration + stepDuration) / 2;
               }
            }
            
            averageStepDuration = Math.round(averageStepDuration * 6); //TODO: explain why
            
            // same of previous clone
            sets = $.extend(true, [], measurementSets);
            //Restore the initial plot, as if nothing had happened
            initialPlot.draw();

            return averageStepDuration;
         };

         animator.configureAnimation = function(drawObject) {
            animator.stepDuration = animator.measureStepDuration(drawObject);
            timingLog.debug("Average step duration for " + this.id + "=" + animator.stepDuration);

            var animationParameters;

            animationParameters = animator.checkAnimationDuration(animator.smoothDuration, animator.smoothSteps, animator.stepDuration);
            if (animationParameters === null) {
               animator.smoothTransitions = false;
            }
            else {
               animator.smoothDuration = animationParameters.duration;
               animator.smoothSteps = animationParameters.steps;
            }

            animationParameters = animator.checkAnimationDuration(animator.rescaleYDuration, animator.rescaleYSteps, animator.stepDuration);
            if (animationParameters === null) {
               animator.smoothTransitions = false;
            }
            else {
               animator.rescaleYDuration = animationParameters.duration;
               animator.rescaleYSteps = animationParameters.steps;
            }

            animationParameters = animator.checkAnimationDuration(animator.rescaleXDuration, animator.rescaleXSteps, animator.stepDuration);
            if (animationParameters === null) {
               animator.smoothTransitions = false;
            }
            else {
               animator.rescaleXDuration = animationParameters.duration;
               animator.rescaleXSteps = animationParameters.steps;
            }
            animator.configured = true;
            animator.showAnimationConfiguration();
         };

         animator.showParameter = function(name, maximumDuration, steps) {
            var duration = Math.round(steps * animator.stepDuration);
            timingLog.debug("--> " + name + " parameters: " + duration + " (max. " + maximumDuration + ") / " + steps +
                    " FPS: " + animator.calculateFPS(duration, steps));
         };

         animator.showAnimationConfiguration = function() {
            timingLog.debug("-------------------------------------------------------");
            if (!animator.smoothTransitions) {
               timingLog.debug("No animation support for " + this.id);
            }
            else {
               timingLog.debug("Animation configuration for " + this.id);
               animator.showParameter("animation", animator.smoothDuration, animator.smoothSteps);
               animator.showParameter("rescaleY", animator.rescaleYDuration, animator.rescaleYSteps);
               animator.showParameter("rescaleX", animator.rescaleXDuration, animator.rescaleXSteps);
            }
            timingLog.debug("-------------------------------------------------------");
         };

         animator.calculateFPS = function(duration, steps) {
            return Math.round(1000 * steps / duration);
         };

         animator.calculateDuration = function(fps, steps) {
            return Math.round(1000 * steps / fps);
         };

         animator.calculateSteps = function(fps, duration) {
            return Math.round(duration * fps / 1000);
         };

         animator.checkAnimationDuration = function(specifiedDuration, specifiedSteps, estimatedStepDuration) {
            var specifiedFPS = animator.calculateFPS(specifiedDuration, specifiedSteps);
            timingLog.debug("Checking animation duration: " + specifiedDuration + " / " + specifiedSteps + " (FPS=" + specifiedFPS + ")");
            
            if (specifiedFPS > animator.maximumFPS) {
               //FPS is too high, adjust the duration to match the maximum allowed
               specifiedDuration = animator.calculateDuration(animator.maximumFPS, specifiedSteps);
               specifiedStepDuration = specifiedDuration / specifiedSteps;
               specifiedFPS = animator.calculateFPS(specifiedDuration, specifiedSteps);
               timingLog.debug("FPS was too high. New parameters: " + specifiedDuration + " / " + specifiedSteps + " (FPS=" + specifiedFPS + ")");
            }
            
            var estimatedDuration = specifiedSteps * estimatedStepDuration;
            
            if (estimatedDuration > specifiedDuration) {
               var adjustedSteps;
               //Try to adjust the steps
               adjustedSteps = Math.floor(specifiedDuration / estimatedStepDuration);
               estimatedDuration = adjustedSteps * estimatedStepDuration;
               if (estimatedDuration <= specifiedDuration && adjustedSteps >= animator.minimumSteps) {
                  timingLog.debug("...fixed, new steps=" + adjustedSteps);
                  return {duration: specifiedDuration, steps: adjustedSteps};
               }
               //Try to give some extra duration and adjust again
               var extendedDuration = specifiedDuration * (1 + animator.maximumExtraDurationPercentage);
               adjustedSteps = Math.floor(extendedDuration / estimatedStepDuration);
               estimatedDuration = adjustedSteps * estimatedStepDuration;
               if (estimatedDuration <= extendedDuration && adjustedSteps >= animator.minimumSteps) {
                  timingLog.debug("...fixed, new steps=" + adjustedSteps + " new duration=" + extendedDuration);
                  return {duration: extendedDuration, steps: adjustedSteps};
               }
               timingLog.debug("...animation not possible!!!");
               timingLog.debug("...(adjusted steps: " + adjustedSteps + ")");
               
               return null;
            }
            
            return {duration: specifiedDuration, steps: specifiedSteps};
            
         };

         animator.drawFromScratch = function(sets, drawObject) {
            try {
               if (animator.delegate.onDrawFromScratch) {
                  animator.delegate.onDrawFromScratch(sets, drawObject);
               }
               //The following null assignment is needed for correct ytick calculation. Some charts
               //ask for the current plot's ticks to determine if they will show or hide a tick; since
               //we are dismissing the previous chart, we indicate it with the null assignment so no
               //previous (and incorrect) tick usage is made.
               animator.plot = null;
               animator.plot = animator.delegate.createPlot(sets);
            }
            catch (exception) {
               log.error("drawFromScratch for chart " + animator.id + " failed! " + exception);
            }
         };

         /**
          * Creates an empty set based on the given one.
          * All the fields are copied except the data itself.
          * 
          * @param {set} baseSet
          * @returns {set}
          */
         animator.createEmptySet = function(baseSet) {
            var emptySet = {};
            emptySet.color = baseSet.color;
            emptySet.label = baseSet.label;
            emptySet.order = baseSet.order;
            emptySet.stack = baseSet.stack;
            emptySet.lines = baseSet.lines;
            emptySet.wrapper = baseSet.wrapper;
            if (Array.isArray(baseSet.data)) {
               emptySet.data = [];
            }
            else {
               emptySet.data = 0;
            }
            return emptySet;
         };

         /**
          * Fills the set containing the difference values between
          * the previous and the new set.
          * - _needsAnimation
          *          set animation is always performed on the
          *          common columns between the previous and the new
          *          set, so this flag indicates if there are changes
          *          on any one of those columns (thus, they should
          *          be animated).
          * 
          * @param {array} differenceSet
          * @param {array} previousSet
          * @param {array} newSet
          * @param {int} smoothSteps
          * @param {object} currentDraw
          * @returns {void}
          */
         animator.fillDifferenceSetForXYCharts = function(differenceSet, previousSet, newSet, smoothSteps, currentDraw) {
            var totalNumberOfItems = Math.max(currentDraw.previousColumns, currentDraw.columns);
            var numberOfItemsForAnimation = Math.min(previousSet.data.length, newSet.data.length);
            
            var stepDifference;
            
            differenceSet._hasChanges = false;
            differenceSet._needsAnimation = false;

            for (var itemIndex = 0; itemIndex < totalNumberOfItems; itemIndex++) {
               if (itemIndex >= previousSet.data.length) {
                  //New item
                  if (itemIndex < newSet.data.length) {
                     stepDifference = (newSet.data[itemIndex][1] !== null) ? (newSet.data[itemIndex][1] / smoothSteps) : newSet.data[itemIndex][1];
                  }
                  else {
                     //The new item does not even exist on the new set.
                     //This should not normally happen must be considered.
                     //Situation: some sets have more columns than others
                     stepDifference = 0;
                  }
                  differenceSet._hasChanges = true;
                  //differenceSet._needsAnimation = true;
               }
               else if (itemIndex >= newSet.data.length) {
                  //Removed item
                  stepDifference = -previousSet.data[itemIndex][1] / smoothSteps; //0;
                  //console.debug("REMOVAL " + previousSet.data[itemIndex][1] + " (step diff: " + stepDifference + ")");
                  differenceSet._hasChanges = true;
                  //differenceSet._needsAnimation = true;
               }
               else {
                  //Item was only modified, calculate the difference
                  var previousValue = previousSet.data[itemIndex][1];
                  var newValue = newSet.data[itemIndex][1];
                  if (newValue === null && previousValue === null) {
                     //log.debug("NULL");
                     stepDifference = null;
                  }
                  else {
                     var totalDifference = newSet.data[itemIndex][1] - previousSet.data[itemIndex][1];
                     stepDifference = totalDifference / smoothSteps;
                  }
               }
               differenceSet.data.push([itemIndex, stepDifference]);
               if (stepDifference !== 0 && stepDifference !== null) {
                  differenceSet._hasChanges = true;
               }
               if (itemIndex < numberOfItemsForAnimation && stepDifference !== 0 && stepDifference !== null) {
                  differenceSet._needsAnimation = true;
               }
            }
         };

         /**
          * Creates a set containing the difference values between
          * the previous and the new set. Besides the values themselves
          * there is one flag:
          * - _hasChanges
          *          indicates if the difference set really brings
          *          changes between the previous and the new set.
          * 
          * @param {array} differenceSet
          * @param {array} previousSet
          * @param {array} newSet
          * @param {int} smoothSteps
          * @param {object} currentDraw
          * @returns {void}
          */
         animator.fillDifferenceSetForNonXYCharts = function(differenceSet, previousSet, newSet, smoothSteps, currentDraw) {
            var stepDifference;
            
            differenceSet._hasChanges = false;
            differenceSet._needsAnimation = false;

            var totalDifference = newSet.data - previousSet.data;
            stepDifference = totalDifference / smoothSteps;

            differenceSet.data = stepDifference;
            if (stepDifference !== 0) {
               differenceSet._hasChanges = true;
               differenceSet._needsAnimation = true;
            }
            
            return differenceSet;
         };

         /**
          * Creates a set containing the difference values between
          * the previous and the new set. Besides the values themselves
          * there are two flags expected to be filled by the delegate:
          * - _hasChanges
          *          indicates if the difference set really brings
          *          changes between the previous and the new set.
          * - _needsAnimation
          *          indicates if the set needs animation
          * 
          * @param {array} previousSet
          * @param {array} newSet
          * @returns {array} difference set
          */
         animator.createDifferenceSet = function(previousSet, newSet) {
            var differenceSet = animator.createEmptySet(newSet);

            if (animator.delegate.fillDifferenceSet) {
               animator.delegate.fillDifferenceSet(differenceSet, previousSet, newSet, animator.smoothSteps, animator.currentDraw);
            }
            else {
               //Generic way of filling the difference set
               if (animator.currentDraw.xychart) {
                  animator.fillDifferenceSetForXYCharts(differenceSet, previousSet, newSet, animator.smoothSteps, animator.currentDraw);
               }
               else {
                  animator.fillDifferenceSetForNonXYCharts(differenceSet, previousSet, newSet, animator.smoothSteps, animator.currentDraw);
               }
            }

            return differenceSet;
         };

         /**
          * Indicates if set animation is needed for at least
          * one set. Please see #createDifferenceSet for further
          * explanation.
          * 
          * @returns {Boolean}
          */
         animator.needsSetAnimation = function() {
            var numberOfSets = animator.differenceSets.length;

            for (var setIndex = 0; setIndex < numberOfSets; setIndex++) {
               var differenceSet = animator.differenceSets[setIndex];
               if (differenceSet._needsAnimation) {
                  return true;
               }
            }
            return false;
            
         };

         animator.calculateAnimationStepValue = function(previousValue, differenceValue, calculateStep) {
            var stepValue;
            if (differenceValue !== null && typeof differenceValue === 'object') {
               var fixedSpecification = differenceValue;
               previousValue = fixedSpecification.previousValue;
               differenceValue = fixedSpecification.difference;
               animationDetailLog.debug("Fixed specification previous value: " + previousValue + " diff: " + differenceValue);
            }
            if (differenceValue === null) {
               stepValue = null;
            }
            else {
               if (differenceValue < 0) {
                  var deltaValue = calculateStep(0, -differenceValue);
                  stepValue = previousValue - deltaValue;
                  //console.debug("remove " + differenceValue + ": " + previousValue + " --> " + stepValue + " delta: " + deltaValue);
               }
               else {
                  stepValue = calculateStep(previousValue, differenceValue);
               }
            }

            //log.debug("creating step: " + currentStep + " index: " + itemIndex + " value: " + stepValue);
            if (stepValue !== null) {
               stepValue = Math.round(stepValue); //needed to avoid representation problems in Chrome
            }
            return stepValue;
         };

         /**
          * Applies the difference set to the previous set,
          * generating the set needed for the current step.
          * 
          * @param {array} stepSet
          * @param {array} previousSet
          * @param {array} differenceSet
          * @param {function} calculateStep
          * @param {object} currentDraw
          * @returns {void}
          */
         animator.fillAnimationStepSetForXYChart = function(stepSet, previousSet, differenceSet, calculateStep, currentDraw) {
            var numberOfItems = Math.min(currentDraw.previousColumns, currentDraw.columns);

            var stepValue;

            for (var itemIndex = 0; itemIndex < numberOfItems; itemIndex++) {
               var differenceValue = differenceSet.data[itemIndex][1];
               if (itemIndex >= previousSet.data.length) {
                  //New item
                  stepValue = (differenceValue !== null) ? calculateStep(0, differenceValue) : differenceValue;

                  if (stepValue !== null) {
                     stepValue = Math.round(stepValue); //needed to avoid representation problems in Chrome
                  }
               }
               else {
                  //Item was only modified
                  var previousValue = previousSet.data[itemIndex][1];
                  animationDetailLog.debug("Index " + itemIndex + " previous value: " + previousValue + " diff: " + differenceValue);
                  stepValue = this.calculateAnimationStepValue(previousValue, differenceValue, calculateStep);
               }
               
               stepSet.data.push([itemIndex, stepValue]);
            }

            return stepSet;
         };

         /**
          * Applies the difference set to the previous set,
          * generating the set needed for the current step.
          * 
          * @param {array} stepSet
          * @param {array} previousSet
          * @param {array} differenceSet
          * @param {function} calculateStep
          * @param {object} currentDraw
          * @returns {void}
          */
         animator.fillAnimationStepSetForNonXYChart = function(stepSet, previousSet, differenceSet, calculateStep, currentDraw) {

            //stepSet.data = previousSet.data + differenceSet.data * currentStep;
            stepSet.data = calculateStep(previousSet.data, differenceSet.data);

            return stepSet;
         };

         /**
          * Applies the difference set to the previous set,
          * generating the set needed for the current step.
          * 
          * @param {array} previousSet
          * @param {array} differenceSet
          * @param {int} currentStep
          * @returns {array} current step
          */
         animator.createAnimationStepSet = function(previousSet, differenceSet, currentStep) {
            //console.debug("animating " + differenceSet.label + " / " + currentStep + "/" + animator.smoothSteps);
            var stepSet = animator.createEmptySet(differenceSet);

            var calculateStep = function(startValue, differenceValue) {
               //easeInOutQuad
               //easeInOutCubic
               //easeInOutQuart
               //easeInOutQuint
               //easeInOutSine
               //easeInOutExpo
               //easeInOutCirc
               return easeInOutQuint(currentStep, startValue, differenceValue * currentStep, animator.smoothSteps);
               //return startValue + differenceValue * currentStep;
            };

            if (animator.delegate.fillAnimationStepSet) {
               animator.delegate.fillAnimationStepSet(stepSet, previousSet, differenceSet, calculateStep, animator.currentDraw);
            }
            else {
               if (animator.currentDraw.xychart) {
                  animator.fillAnimationStepSetForXYChart(stepSet, previousSet, differenceSet, calculateStep, animator.currentDraw);
               }
               else {
                  animator.fillAnimationStepSetForNonXYChart(stepSet, previousSet, differenceSet, calculateStep, animator.currentDraw);
               }
            }


            if (animator.delegate.onAnimationStepSetDefined) {
               animator.delegate.onAnimationStepSetDefined(stepSet, animator.currentDraw);
            }

            return stepSet;
         };

         animator.fillRescaleXStepSetForXYChart = function(rescaleXStepSet, set, differenceSet, columns) {
            //log.debug("createRescaleXStepSet: columns to consider: " + columnsForStep);
            //log.debug("createStepSet: number of items: " + numberOfItems);

            var stepValue;

            for (var itemIndex = 0; itemIndex < columns; itemIndex++) {
               if (itemIndex < set.data.length) {
                  stepValue = set.data[itemIndex][1];
               }
               else {
                  //New column
                  stepValue = differenceSet.data[itemIndex][1];
               }
               rescaleXStepSet.data.push([itemIndex, stepValue]);
            }
         };

         animator.createRescaleXStepSet = function(set, differenceSet, columns) {
            var rescaleXStepSet = animator.createEmptySet(set);

            //log.debug("createRescaleXStepSet: columns to consider: " + columnsForStep);
            //log.debug("createStepSet: number of items: " + numberOfItems);

            if (animator.delegate.fillRescaleXStepSet) {
               animator.delegate.fillRescaleXStepSet(rescaleXStepSet, set, differenceSet, columns);
            }
            else if (animator.currentDraw.xychart) {
               animator.fillRescaleXStepSetForXYChart(rescaleXStepSet, set, differenceSet, columns);
            }

            return rescaleXStepSet;
         };

         animator.drawSmooth = function(drawObject) {
            /*if (!animator.configured) {
               animator.configureAnimation(drawObject);
            }*/

            log.debug("*** START DRAW SMOOTH FOR " + animator.id + " ***");
            animator.initialTime = new Date();
            //console.error("Time since slider moved: " + (new Date() - document._sliderStartTime));

            animator.currentDraw = drawObject;

            if (drawObject.maintainScale) {
               animator.previousScale = 0;
               animator.newScale = 0;
            }
            else {
               animator.previousScale = animator.getScaleForSets(drawObject.previousSets, drawObject.previousTicks);
               animator.newScale = animator.getScaleForSets(drawObject.newSets, drawObject.newTicks);
            }

            var previousSets = drawObject.previousSets;
            var newSets = drawObject.newSets;
                       
            detailLog.debug("previous sets (" + previousSets.length + "): " + JSON.stringify(previousSets));
            detailLog.debug("new sets (" + newSets.length + "): " + JSON.stringify(newSets));
            detailLog.debug("columns: " + drawObject.previousColumns + " --> " + drawObject.columns);
            detailLog.debug("scale: " + animator.previousScale + " --> " + animator.newScale);

            detailLog.debug("new sets details:");
            for (setIndex = 0; setIndex < newSets.length; setIndex++) {
               var set = newSets[setIndex];
               detailLog.debug("   " + set.label + ": number of items = " + set.data.length);
            }

            animator.newSets = newSets;

            //Preparation for smooth transitions
            animator.differenceSets = [];

            var differenceSet;
            var previousSet;
            var newSet;
            var setIndex;
            var hasChanges = (drawObject.columns !== drawObject.previousColumns);

            //Find out the names of the series (maximum set)
            var allSets = [];
            animator.addSetsUnique(previousSets, allSets);
            animator.addSetsUnique(newSets, allSets);
            if (animator.sortSets) {
               animator.sort(allSets);
            }

            for (setIndex = 0; setIndex < allSets.length; setIndex++) {
               var previousIndex = animator.indexOfSet(allSets[setIndex].label, previousSets);
               var newIndex = animator.indexOfSet(allSets[setIndex].label, newSets);

               if (previousIndex === -1 && newIndex > -1) {
                  //New set was added
                  newSet = newSets[newIndex];
                  previousSet = animator.createEmptySet(newSet);
                  differenceSet = animator.createDifferenceSet(previousSet, newSet);
                  differenceSet._needsAnimation = true;
                  differenceSet._isNew = true;
                  hasChanges = true;
               }
               else if (previousIndex > -1 && newIndex === -1) {
                  //Removed existing set
                  previousSet = previousSets[previousIndex];
                  newSet = animator.createEmptySet(previousSet);
                  differenceSet = animator.createDifferenceSet(previousSet, newSet);
                  differenceSet._needsAnimation = true;
                  differenceSet._isRemoved = true;
                  hasChanges = true;
               }
               else {
                  //Set was only modified, calculate the difference
                  differenceSet = animator.createDifferenceSet(previousSets[previousIndex], newSets[newIndex]);
               }
               animator.differenceSets.push(differenceSet);
               if (differenceSet._hasChanges) {
                  hasChanges = true;
               }
            }

            if (!hasChanges && animator.delegate.hasExtraChanges) {
               //If there were no changes detected, look for "extra" changes
               //(these are changes that depend upon the specific chart)
               hasChanges = animator.delegate.hasExtraChanges(drawObject);
            }

            if (!hasChanges) {
               animator.finishTicket(animator.currentTicket);
               animator.drawing = false;
               log.debug("There are no changes to draw");
               //console.error("Time since slider moved: " + (new Date() - document._sliderStartTime));
               animator.cleanupSmoothDraw();
               animator.checkPendingSmoothDraw();
               return;
            }

            detailLog.debug("difference sets: " + JSON.stringify(animator.differenceSets));

            var totalDiffColumns = drawObject.columns - drawObject.previousColumns;
            animator.diffColumnsPerStep = totalDiffColumns / animator.smoothSteps;

            detailLog.debug("difference columns per step: " + animator.diffColumnsPerStep);

            if (totalDiffColumns >= 0) {
               animator.startAnimationOnRebuiltChart();
            }
            else {
               animator.rescaleX(drawObject.previousSets, function() {
                  animator.startAnimationOnRebuiltChart();
               });
            }
         };

         animator.startAnimationOnRebuiltChart = function() {
            if (animator.previousScale === animator.newScale) {
               //No scale animation needed
               animator.setScale(animator.getScaleForPreviousState());
               animator.startSetAnimation();
            }
            else if (animator.previousScale < animator.newScale) {
               //Scale is growing, so first shrink the current chart
               //into the bigger scale.

               animator.rescaleY(function() {
                  //Chart is scaled, now animate
                  animator.startSetAnimation();
               });
            }
            else {
               //Scale is shrinking, so maintain the bigger scale while
               //animating the series. Later we will animate the scale to its
               //final place
               animator.setScale(animator.getScaleForPreviousState());
               animator.startSetAnimation();
            }
         };

         animator.rescaleX = function(sets, onRebuiltCallback) {
            flowLog.debug("*** RESCALING X FOR TICKET " + animator.currentTicket + " ***");
            log.debug("*** RESCALING X ON " + animator.id + " FROM " + animator.currentDraw.previousColumns + " TO " + animator.currentDraw.columns + " ***");

            animator.rescaleXSets = sets;
            animator.onRebuiltCallback = onRebuiltCallback;
            //Fix scale while rescaleXing
            animator.setScale(animator.getCurrentScale());

            if (!animator.animateRescaleX) {
               animator.setColumns(animator.currentDraw.columns);
               animator.onRebuiltCallback();
               return;
            }

            animator.rescaleXStartTime = new Date();
            //chart.targetScale = chart.getScaleForFinalState(); //chart.currentDraw.max * 1.15;
            var differenceColumns = animator.currentDraw.columns - animator.currentDraw.previousColumns;
            animator.rescaleXSteps = Math.abs(differenceColumns);
            animator.rescaleXDelta = differenceColumns / animator.rescaleXSteps;
            animator.rescaleXStep = 0;

            animator.rescaleXAnimation = new Animation().create("RescaleX",
                                                                animator.currentTicket,
                                                                animator.rescaleXDuration,
                                                                animator.rescaleXSteps,
                                                                animator.stepDuration,
                                                                animator.drawRescaleXStep);
            animator.rescaleXAnimation.start();
         };

         animator.drawRescaleXStep = function(animation) {
            if (animation.ticket !== animator.currentTicket) {
               console.error("SCALEX ANIMATION STEP FOR TICKET " + animation.ticket + ", CURRENT TICKET IS " + animator.currentTicket);
               return;
            }

            if (animator.rescaleXStep === -1) {
               animationDetailLog.error("Invalid rescaleX step");
               return;
            }
            
            animationDetailLog.debug("Drawing rescaleX step " + animator.rescaleXStep);
            
            var newColumns = animator.currentDraw.previousColumns + (animator.rescaleXStep * animator.rescaleXDelta);
            
            animator.setColumns(newColumns);

            if (animator.rescaleXStep === animator.rescaleXSteps) {
               animator.rescaleXStep = -1;
               //chart.setAutomaticScale();
               animator.rescaleXAnimation.stop();
               animator.rescaleXAnimation = null;
               var elapsedTime = new Date() - animator.rescaleXStartTime;
               timingLog.debug("REBUILD ELAPSED TIME: " + elapsedTime + " ms");
               animator.onRebuiltCallback();
               return;
            }
            
            animator.rescaleXStep++;
            animator.rescaleXAnimation.resume();
         };

         animator.setColumns = function(newColumns) {
            animationDetailLog.debug("rescaleX to " + newColumns + " columns");

            var stepSets = [];
            for (var setIndex = 0; setIndex < animator.rescaleXSets.length; setIndex++) {
               var stepSet = animator.createRescaleXStepSet(animator.rescaleXSets[setIndex], animator.differenceSets[setIndex], newColumns);
               stepSets.push(stepSet);
            }

            animator.redraw(stepSets);
         };


         /**
          * Sets the scale of the chart
          * 
          * @param {float} scale
          * @returns {void}
          */
         animator.setScale = function(scale) {
            var axes = animator.plot.getAxes();
            animationDetailLog.debug("setting scale to " + scale + " (was " + axes.yaxis.max + ")");
            axes.yaxis.options.max = scale;

            if (animator.delegate.onRescaleY) {
               animator.delegate.onRescaleY(scale, animator.plot);
            }

            animator.plot.setupGrid();
            animator.plot.draw();
         };

         /**
          * Starts the scale animation
          * 
          * @param {function} onScaledCallback
          * @returns {void}
          */
         animator.rescaleY = function(onScaledCallback) {
            flowLog.debug("*** RESCALING Y FOR TICKET " + animator.currentTicket + " ***");
            log.debug("*** RESCALING Y ON " + animator.id);
            animator.rescaleYStartTime = new Date();
            animator.targetScale = animator.getScaleForFinalState();
            detailLog.debug("Rescaling to " + animator.targetScale);
            /*if (chart.targetScale === chart.getCurrentScale()) {
               log.debug("Skip (already current scale)");
               chart.rescaleYStep = -1;
               //chart.setScale(chart.targetScale);
               onScaledCallback();
               return;
            }*/
            animator.onScaleCallback = onScaledCallback;
            animator.rescaleYStep = 0;

            animator.rescaleYAnimation = new Animation().create("RescaleY",
                                                                animator.currentTicket,
                                                                animator.rescaleYDuration,
                                                                animator.rescaleYSteps,
                                                                animator.stepDuration,
                                                                animator.drawRescaleYStep);
            animator.rescaleYAnimation.start();
         };

         animator.drawRescaleYStep = function(animation) {
            if (animation.ticket !== animator.currentTicket) {
               console.error("SCALEY ANIMATION STEP FOR TICKET " + animation.ticket + ", CURRENT TICKET IS " + animator.currentTicket);
               return;
            }

            if (animator.rescaleYStep === -1) {
               animationDetailLog.error("Invalid rescaleY step");
               return;
           }
            
            animationDetailLog.debug("Drawing rescaleY step " + animator.rescaleYStep);
            if (animator.rescaleYStep === animator.rescaleYSteps) {
               animator.rescaleYStep = -1;
               animator.setScale(animator.targetScale);
               animator.rescaleYAnimation.stop();
               animator.rescaleYAnimation = null;
               var elapsedTime = new Date() - animator.rescaleYStartTime;
               timingLog.debug("RESCALEY ELAPSED TIME: " + elapsedTime + " ms");
               animator.onScaleCallback();
               return;
            }

            var totalDiff = animator.targetScale - animator.previousScale;
            var stepDiff = totalDiff / animator.rescaleYSteps;

            animator.setScale(animator.previousScale + stepDiff * animator.rescaleYStep);
            
            animator.rescaleYStep++;
            animator.rescaleYAnimation.resume();
         };

         /**
          * Starts the set animation. This is always performed
          * on the common columns between the previous and the new sets.
          * 
          * @returns {void}
          */
         animator.startSetAnimation = function() {
            flowLog.debug("*** ANIMATING SETS FOR TICKET " + animator.currentTicket + " ***");
            log.debug("*** ANIMATING SETS ***");
            if (!animator.needsSetAnimation()) {
               log.debug("No animation needed for the sets, skip");
               animator.finishSetAnimation();
               return;
            }
            animator.animationStartTime = new Date();
            animator.smoothCurrentStep = 0;
            animator.drawingStepColumns = animator.currentDraw.previousColumns;

            if (animator.delegate.onSetAnimationStarting) {
               animator.delegate.onSetAnimationStarting(animator.currentDraw);
            }

            animator.setAnimation = new Animation().create("Set",
                                                           animator.currentTicket,
                                                           animator.smoothDuration,
                                                           animator.smoothSteps,
                                                           animator.stepDuration,
                                                           animator.drawAnimationStep);
            animator.setAnimation.start();
         };

         animator.finishSetAnimation = function() {
            animator.smoothCurrentStep = -1;
            if (animator.currentDraw.previousColumns < animator.currentDraw.columns) {
               //There are new columns, so add them
               animator.rescaleX(animator.currentDraw.newSets, function() {
                  animator.finishWholeAnimation();
               });
            }
            else {
               animator.finishWholeAnimation();
            }
         };

         animator.finishWholeAnimation = function() {
            if (animator.previousScale > animator.newScale && animator.currentDraw.max > 0) {
               //A rescale in Y is still needed
               animator.rescaleY(function() {
                  //Chart is scaled, draw the final state
                  animator.drawFinalState();
               });
            }
            else {
               //This is the last step, just draw the final situation and exit
               animator.drawFinalState();
            }
         };
         
         /**
          * Draws a single animation step.
          * This function is called repeatedly using timeouts,
          * once for each step.
          * 
          * @param {object} animation
          * @returns {void}
          */
         animator.drawAnimationStep = function(animation) {
            if (animation.ticket !== animator.currentTicket) {
               console.error("SET ANIMATION STEP FOR TICKET " + animation.ticket + ", CURRENT TICKET IS " + animator.currentTicket);
               return;
            }

            if (animator.drawingStep) {
               animationDetailLog.error("Already drawing step!");
               return;
            }

            if (animator.smoothCurrentStep === -1) {
               animationDetailLog.error("Invalid draw step");
               return;
            }

            animator.drawingStep = true;

            log.debug("Set animation step " + animator.smoothCurrentStep + " (" + animator.id + ")");
            if (animator.smoothCurrentStep === animator.smoothSteps) {
               animator.setAnimation.stop();
               animator.setAnimation = null;
               var elapsedTime = new Date() - animator.animationStartTime;
               timingLog.debug("ANIMATION ELAPSED TIME: " + elapsedTime + " ms");
               animator.finishSetAnimation();
               return;
            }
            
            //Create step sets
            var stepSets = [];
            var stepSet;
            var previousSets = animator.currentDraw.previousSets;

            for (var setIndex = 0; setIndex < animator.differenceSets.length; setIndex++) {
               var differenceSet = animator.differenceSets[setIndex];
               var previousIndex = animator.indexOfSet(differenceSet.label, previousSets);
               if (previousIndex === -1) {
                  //New set
                  stepSet = animator.createAnimationStepSet(animator.createEmptySet(differenceSet), differenceSet, animator.smoothCurrentStep);
               }
               else {
                  //Modified or removed set
                  stepSet = animator.createAnimationStepSet(previousSets[previousIndex], differenceSet, animator.smoothCurrentStep);
               }

               stepSets.push(stepSet);
               if (differenceSet._isNew) {
                  animationDetailLog.debug("New set in step: " + stepSet);
               }
               if (differenceSet._isRemoved) {
                  animationDetailLog.debug("Removed set in step: " + stepSet);
               }
            }

            animationDetailLog.debug("Sets for step " + animator.smoothCurrentStep + ": " + JSON.stringify(stepSets));
            //log.debug("Considered columns: " + animator.drawingStepColumns);

            //log.debug("set sets details:");
            //for (setIndex = 0; setIndex < stepSets.length; setIndex++) {
            //   var set = stepSets[setIndex];
            //   var total = 0;
            //   for (var itemIndex = 0; itemIndex < set.data.length; itemIndex++) {
            //      var item = set.data[itemIndex];
            //      total += item[1];
            //   }
            //   log.debug("   " + set.label + ": number of items = " + set.data.length + " total: " + total);
            //}

            animator.redraw(stepSets);

            animator.smoothCurrentStep++;
            animator.drawingStepColumns += animator.diffColumnsPerStep;

            animator.drawingStep = false;

            animator.setAnimation.resume();
         };

         /*function sleep(millis) {
           var date = new Date();
           var curDate = null;
           do {
              curDate = new Date();
           } while(curDate-date < millis);
         }*/

         animator.drawFinalState = function() {
            flowLog.debug("ANIMATIONS FINISHED - DRAW FINAL STATE");
            log.debug("DRAW FINAL STATE");

            animator.drawFromScratch(animator.currentDraw.newSets, animator.currentDraw);

            animator.cleanupSmoothDraw();

            var endTime = new Date();
            timingLog.debug("Total animation draw time: " + (endTime - animator.initialTime));
            //console.error("Time since slider moved: " + (new Date() - document._sliderStartTime));

            animator.checkPendingSmoothDraw();
         };

         /**
          * Returns the scale for the given sets of data.
          * 
          * @param {Array} sets
          * @param {Array} ticks
          * @returns {float} scale
          */
         animator.getScaleForSets = function(sets, ticks) {
            var setsToUse = sets;
            if (animator.delegate.getSetsForScaleMesurement) {
               setsToUse = animator.delegate.getSetsForScaleMesurement(sets);
            }
            var axes = animator.plot.getAxes();
            var currentMax = axes.yaxis.options.max;
            var currentTicks = axes.yaxis.options.ticks;
            var currentData = animator.plot.getData();
            axes.yaxis.options.max = null;
            if (ticks) {
               axes.yaxis.options.ticks = ticks;
            }
            animator.plot.setData(setsToUse);
            animator.plot.setupGrid();
            var scaleForSets = axes.yaxis.max;
            //Set the current values again
            axes.yaxis.options.max = currentMax;
            if (ticks) {
               axes.yaxis.options.ticks = currentTicks;
            }
            animator.plot.setData(currentData);
            animator.plot.setupGrid();

            return scaleForSets;
         };

         animator.getScaleForFinalState = function() {
            return animator.getScaleForSets(animator.currentDraw.newSets, animator.currentDraw.newTicks);
         };

         animator.getScaleForPreviousState = function() {
            return animator.getScaleForSets(animator.currentDraw.previousSets, animator.currentDraw.previousTicks);
         };

         animator.getCurrentScale = function() {
            var axes = animator.plot.getAxes();
            var currentScale = axes.yaxis.max;
            return currentScale;
         };

         animator.checkPendingSmoothDraw = function() {
            if (animator.pendingDraw) {
               animator.drawing = true;
               var pendingTicket = animator.pendingTicket;
               animator.pendingTicket = -1;
               log.debug("DRAWING PENDING SETS FOR " + animator.id);
               flowLog.debug("DRAWING PENDING TICKET " + pendingTicket + " FOR " + animator.id);
               
               if (!animator.processTicket(pendingTicket)) {
                  return;
               }
               
               var animate = true;
               
               if (animator.delegate.beforeDrawing) {
                  var shouldAnimate = animator.delegate.beforeDrawing();
                  if (shouldAnimate !== undefined) {
                     animate = shouldAnimate;
                  }
               }
               if (animate) {
                  var pendingDrawObject = animator.delegate.createDrawObjectForCurrentState();
                  animator.pendingDraw = false;
                  animator.drawSmooth(pendingDrawObject);
               }
               else {
                  //TODO: REFACTOR
                  var sets = animator.delegate.getSetsForDrawing();
                  animator.drawFromScratch(sets);
                  animator.cleanupSmoothDraw();
               }
            }
         };

         animator.cleanupSmoothDraw = function() {
            animator._cleanupCurrentDrawing();
            animator.finishTicket(animator.currentTicket);
            animator.drawing = false;
         };
         
         animator._cleanupCurrentDrawing = function() {
            animator.smoothCurrentStep = -1;
            animator.differenceSets = [];
            animator.currentDraw = null;
            animator.drawingStep = false;
            animator.rescaleYStep = -1;
            animator.targetScale = -1;
            animator.onScaleCallback = null;
            animator.diffColumnsPerStep = 0;
            animator.drawingStepColumns = 0;
         };

         animator.resetDrawing = function() {
            flowLog.debug("RESET DRAWING " + animator.id);
            log.debug("RESET DRAWING " + animator.id);
            
            if (!animator.isCanvasReady()) {
               log.debug("Canvas is not ready for drawing.");
               log.debug("Reset drawing will be performed next time draw is called.");
               animator.pendingReset = true;
               return;
            }

            if (animator.drawing) {
               flowLog.debug("WARNING! trying to reset drawing while a previous drawing process is in progress");
               animator._cancelAnimations();
            }
            animator.drawing = true;
            if (animator.pendingDraw) {
               flowLog.debug("WARNING! There was a pending draw!");
               animator.pendingDraw = false;
            }
            var hadSmoothTransitions = animator.smoothTransitions;
            animator.smoothTransitions = false;
            animator._draw();
            animator.smoothTransitions = hadSmoothTransitions;
            animator.drawing = false;
            flowLog.debug("FINISHED RESET DRAWING");
            if (animator.pendingDraw) {
               flowLog.error("PENDING DRAW WHILE RESET DRAWING WAS EXECUTING!!!");
            }
         };
         
         /**
          * Redraw the chart with the given sets
          * 
          * @param {Array} sets
          * @param measureMode
          * @returns {void}
          */
         animator.redraw = function(sets, measureMode) {
            if (animator.sortAtEachStep) {
               animator.sort(sets);
            }
            var isMeasureMode = measureMode ? measureMode : false;
            if (!isMeasureMode && animator.delegate.getTicks) {
               var ticks = animator.delegate.getTicks(sets, animator.currentDraw);
               //log.debug("ticks: " + JSON.stringify(ticks));
               animator.plot.getAxes().yaxis.options.ticks = ticks;
            }

            var setsToDraw = sets;
            if (animator.delegate.onRedraw) {
               var returnedSets = animator.delegate.onRedraw(sets, animator.plot, animator.currentDraw, isMeasureMode);
               if (returnedSets !== undefined) {
                  setsToDraw = returnedSets;
               }
            }

            animator.plot.setData(setsToDraw);
            animator.plot.setupGrid();
            animator.plot.draw();
         };

         animator.setSortSets = function(sortSets) {
            animator.sortSets = sortSets;
         };

         /**
          * Find a set by label
          * 
          * @param {set} set
          * @param {Array) sets
          * @returns {bool}
          */
         animator.findSet = function(set, sets) {
            for (var index = 0; index < sets.length; index++) {
               var each = sets[index];
               if (each.label === set.label) {
                  return true;
               }
            }
            return false;
         };

         /**
          * Finds a set by label and returns its index
          * 
          * @param {String} label
          * @param {Array} sets
          * @returns {int} -1 if not found
          */
         animator.indexOfSet = function(label, sets) {
            for (var index = 0; index < sets.length; index++) {
               var each = sets[index];
               if (each.label === label) {
                  return index;
               }
            }
            return -1;
         };

         animator.addSetsUnique = function(sets, targetSets) {
            for (var index = 0; index < sets.length; index++) {
               var set = sets[index];
               if (animator.indexOfSet(set.label, targetSets) === -1) {
                  targetSets.push(set);
               }
            }
         };
         
         animator.sort = function(sets) {
            sets.sort(function(set1, set2) {
               return set1.order - set2.order;
            });
         };

         animator.cancelAnimations = function() {
            animator.drawing = false;
            animator._cancelAnimations();
         };

         animator._cancelAnimations = function() {
            if (animator.currentTicket > -1) {
               flowLog.debug("CANCELLING ANIMATIONS FOR TICKET " + animator.currentTicket);
            }
            animator.currentTicket = -1;
            try {
               if (animator.rescaleXAnimation !== null) {
                  animator.rescaleXAnimation.cancel();
               }
            }
            catch (exception) {
            }
            try {
               if (animator.rescaleYAnimation !== null) {
                  animator.rescaleYAnimation.cancel();
               }
            }
            catch (exception) {
            }
            try {
               if (animator.setAnimation !== null) {
                  animator.setAnimation.cancel();
               }
            }
            catch (exception) {
            }
            animator._cleanupCurrentDrawing();
         };

         animator.dismiss = function() {
            animator.cancelAnimations();
         };
         
         // START OF WORKAROUND FOR CHROME
         //
         // There is a problem in Chrome when running in 2D-Canvas Acceleration mode (go to chrome://flags, check "Beschleunigtes 2D-Canvas")
         // In that situation, if you print a PDF and, while the PDF tab is still showing, you close the bottom bar and then, when you come
         // back to the application, the chart is blank, and the only way to make it draw again is to resize the browser (or else to go to another
         // tab and come back again).
         // This is a workaround until a better solution is found.
         //

         if (window.chrome) {
            log.debug("You are in CHROME!");

            var workaroundForChrome = function() {
               log.debug("WORKAROUND FOR " + animator.id);
               var canvas = $(animator.id);
               //log.debug("   canvas=" + JSON.stringify(canvas));
               log.debug("   length=" + canvas.length);
               if (canvas.length === 0) {
                  //Indicate that the canvas is not there anymore
                  return false;
               }
               log.debug("   width=" + canvas.width());
               log.debug("   css width=" + canvas.css("width"));
               log.debug("   visible=" + canvas.is(":visible"));
               if (canvas.is(":visible")) {
                  //var originalCssWidth = canvas.css("width");
                  var width = parseInt(canvas.width());
                  canvas.width(width + 1);
                  animator.resetDrawing();
                  canvas.css("width", "100%");
                  animator.resetDrawing();
               }
               else {
                  log.debug("   Skipping (not visible)");
               }
               return true;
            };

            var handler = function() {
               if (!document.hidden) {
                  //log.debug("chrome visibility change. hidden? " + document.hidden);
                  if (!workaroundForChrome()) {
                     log.debug("Removing workaround for " + animator.id);
                     document.removeEventListener('webkitvisibilitychange', handler);
                  }
               }
            };
            log.debug("Installing workaround for " + animator.id);
            document.addEventListener('webkitvisibilitychange', handler);
         }


         // END OF WORKAROUND

         return animator;
      };
   };
   

   return ChartAnimator;
});


define('common-chart-interactivity', [
   'logger'
], function(Logger) {

   var log = Logger.get('ChartInteractivity');

   /**
    * ChartInteractivity
    * 
    * This object gives interactivity support for Flot charts.
    * 
    * @returns {ChartInteractivity}
    */
   var ChartInteractivity = function() {
      this.create = function(id) {
         log.debug("Creating chart interactivity support for " + id);
         var interactivity = {};

         interactivity.id = id;
         interactivity.tooltip = null;
         interactivity.hoverline = null;
         interactivity.onHoverHandler = null;
         interactivity.isEnabledHandler = null;
         interactivity.hoverTimeoutDuration = 3000;
         interactivity.hoverTimeout = null;
         interactivity.hoverFadeInDuration = 200;
         interactivity.hoverFadeOutDuration = 200;
         interactivity.minimumX = 1.0;
         interactivity.maximumX = 0.0;
         interactivity.minimumY = 0.0;
         interactivity.maxValue = 0; //see activate
         interactivity.messages = [];
         //interactivity.idleTimer = undefined;
         interactivity.preloadMessages = true;
         interactivity.debuggingEnabled = false;
         interactivity.debugPopup = null;
         interactivity.dragging = false;
         interactivity.draggingStopTime = null;
         interactivity.waitTimeAfterDragging = 500;
         interactivity.considerLastColumn = false;
         interactivity.useRoundingForColumnConversion = true;
         ////

         /**
          * Trick to force hiding the tooltip as soon as the mouse moves outside the chart
          * 
          * @param {type} event
          * @returns {undefined}
          */
         interactivity.onDocumentMouseMove = function(event) {
            //console.debug("document mouse move " + event.pageX + ", " + event.pageY);
            //interactivity.addDebuggingLine("document mouse move " + event.pageX + ", " + event.pageY);
            if (interactivity.eventHolder) {
               var offset = interactivity.eventHolder.offset();
               //console.debug(" holder: " + offset.left + ", " + offset.top + " size: " + interactivity.eventHolder.width() + "x" + interactivity.eventHolder.height());
               //interactivity.addDebuggingLine(" holder: " + offset.left + ", " + offset.top + " size: " + interactivity.eventHolder.width() + "x" + interactivity.eventHolder.height());
               
               var insideChart = event.pageX >= offset.left && event.pageX <= (offset.left + interactivity.eventHolder.width()) &&
                                 event.pageY >= offset.top && event.pageY <= (offset.top + interactivity.eventHolder.height());
               
               if (!insideChart) {
                  //console.error("HIDE " + interactivity.id);
                  //interactivity.addDebuggingLine("HIDE " + interactivity.id);
                  interactivity.hide();
               }
               
            }
         };

         document.addEventListener('mousemove', interactivity.onDocumentMouseMove, false);
         ////
         
         interactivity.setOnHover = function(onHoverHandler) {
            interactivity.onHoverHandler = onHoverHandler;
         };

         interactivity.setIsEnabledHandler = function(isEnabledHandler) {
            interactivity.isEnabledHandler = isEnabledHandler;
         };

         interactivity.setMinimumX = function(minimumX) {
            interactivity.minimumX = minimumX;
         };

         interactivity.setMaximumX = function(maximumX) {
            log.debug("Setting max x: " + maximumX);
            interactivity.maximumX = maximumX;
         };

         interactivity.setMinimumY = function(minimumY) {
            interactivity.minimumY = minimumY;
         };

         interactivity.setPreloadMessages = function(preloadMessages) {
            interactivity.preloadMessages = preloadMessages;
         };
         
         interactivity.setConsiderLastColumn = function(considerLastColumn) {
            interactivity.considerLastColumn = considerLastColumn;
         };

         interactivity.hide = function() {
            if (interactivity.tooltip !== null) {
               interactivity.tooltip.fadeOut(interactivity.hoverFadeOutDuration);
            }
            if (interactivity.hoverline !== null) {
               interactivity.hoverline.fadeOut(interactivity.hoverFadeOutDuration);
            }
         };

         interactivity.onBind = function(plot, eventHolder) {

            interactivity.eventHolder = eventHolder;

            eventHolder.unbind();

            eventHolder.bind("click", function (event) {
               var placeholder = $(interactivity.id);
               var offset = eventHolder.offset();
               interactivity.onTouch(event.originalEvent, plot, placeholder, offset, "click", false);
            });

            eventHolder.bind("mousemove", function (event) {

               if (interactivity.draggingStopTime !== null && new Date() - interactivity.draggingStopTime < interactivity.waitTimeAfterDragging) {
                  //Right after a dragging stopped, a new mouse move with the last point is triggered.
                  //With this wait time we avoid processing that movement (which would end up showing the popup again)
                  return;
               }

               interactivity.draggingStopTime = null;
               
               var placeholder = $(interactivity.id);
               var offset = eventHolder.offset();
               interactivity.onTouch(event.originalEvent, plot, placeholder, offset, "mousemove", false);
            });

            /*eventHolder.bind("mouseleave", function (event) {
               if (event.originalEvent.toElement === undefined || event.originalEvent.toElement === null) {
                  return;
               }
               if (event.originalEvent.toElement.id !== null) {
                  if (event.originalEvent.toElement.id.indexOf("hoverline") === 0 ||
                      event.originalEvent.toElement.id.indexOf("tooltip") === 0) {
                     return;
                  }
               }
               log.debug("mouseleave to " + event.originalEvent.toElement.id);
               interactivity.hide();
            });*/

            eventHolder.bind("mousedown", function (event) {
               interactivity.startDragging();
            });

            eventHolder.bind("touchstart", function (event) {
               event.preventDefault();

               interactivity.dragging = true;

               if (event.originalEvent.targetTouches) {
                  event = event.originalEvent.targetTouches[0];
               }
               else {
                  event = event.originalEvent;
               }

               var placeholder = $(interactivity.id);
               var offset = eventHolder.offset();
               interactivity.onTouch(event, plot, placeholder, offset, "touchstart", true);
            });

            eventHolder.bind("touchmove", function (event) {
               event.preventDefault();

               if (event.originalEvent.targetTouches) {
                  event = event.originalEvent.targetTouches[0];
               }
               else {
                  event = event.originalEvent;
               }

               var placeholder = $(interactivity.id);
               var offset = eventHolder.offset();
               interactivity.onTouch(event, plot, placeholder, offset, "touchmove", true);
            });

            eventHolder.bind("touchend", function (event) {
               event.preventDefault();

               interactivity.dragging = false;

               log.debug("touchend");
               interactivity.hide();
            });
         };

         interactivity.fetchMessage = function(column, callback) {
            log.debug("| fetching " + column);
            interactivity.onHoverHandler(column).then(function(message) {
               log.debug("| caching " + column);
               interactivity.messages[column] = message;
               if (callback) {
                  callback(message);
               }
            });
         };

         interactivity.justFetchMessages = function() {
            log.debug("Fetching messages for " + interactivity.columns + " columns");
            interactivity.onHoverHandler(interactivity.columns).then(function(messages) {
               interactivity.messages = messages;
            });
            /*
            log.debug("| fetching " + column);
            interactivity.onHoverHandler(column).then(function(message) {
               log.debug("| caching " + column);
               interactivity.messages[column] = message;
            });
             */
         };

         /*
         interactivity.fetchAndStartTimer = function(column) {
            interactivity.fetchMessage(column, function(message) {
               interactivity.startIdleTimer();
            });
         };
         */

         /*
         interactivity.onIdle = function() {
            interactivity.cancelIdleTimer();
            log.debug("| idle " + interactivity.id);

            for (var column = 0; column <= interactivity.columns; column++) {
               if (interactivity.messages[column] === undefined) {
                  interactivity.fetchAndStartTimer(column);
                  return;
               }
            }
         };
         */

         /*
         interactivity.cancelIdleTimer = function() {
            if (!interactivity.preloadMessages) {
               return;
            }

            log.debug("| cancelling timer " + interactivity.idleTimer);
            log.debug("--------------------------------------------");
            window.clearTimeout(interactivity.idleTimer);
            interactivity.idleTimer = undefined;
         };
         */

         /*
         interactivity.startIdleTimer = function() {
            if (!interactivity.preloadMessages) {
               return;
            }
            interactivity.idleTimer = window.setTimeout(interactivity.onIdle, 100);
            log.debug("--------------------------------------------");
            log.debug("| starting timer " + interactivity.idleTimer);
         };
         */

         interactivity.activate = function(plot) {
            if (!interactivity.onHoverHandler) {
               return;
            }

            var axes = plot.getAxes();
            var maxValue = axes.yaxis.max;
            interactivity.maxValue = maxValue;
            
            interactivity.messages = []; //clear message cache
            interactivity.columns = axes.xaxis.max;
            interactivity.columns += (interactivity.considerLastColumn) ? 1 : 0;

            if (interactivity.debuggingEnabled) {
               var debugPopupid = "debugPopup" + interactivity.id.replace("#", "");
               interactivity.debugPopup = $("#" + debugPopupid);
               if (interactivity.debugPopup !== null) {
                  interactivity.debugPopup.remove();
                  interactivity.debugPopup = [];
               }
               $("<div id='" + debugPopupid + "' class='chart-popup-debugger'></div>").appendTo("body");
               interactivity.debugPopup = $("#" + debugPopupid);
               interactivity.debugPopup.on("click", function() {
                  $(this).empty();
                  $(this).hide();
               });
            }

            //Cache messages while idle
            /*
            interactivity.cancelIdleTimer();
            interactivity.startIdleTimer();
            */
            interactivity.justFetchMessages();
            
            var placeholder = $(this.id);
            //var offset = $(this.id).offset();
            //var overlay = $(interactivity.id + " .flot-overlay");
            //var offset = overlay.offset();

            var tooltipid = "tooltip" + interactivity.id.replace("#", "");
            interactivity.tooltip = $("#" + tooltipid);
            if (interactivity.tooltip !== null) {
               interactivity.tooltip.remove();
               interactivity.tooltip = [];
            }
            $("<div id='" + tooltipid + "' class='chart-popup'></div>").appendTo("body");
            interactivity.tooltip = $("#" + tooltipid);
            interactivity.tooltip.bind("mouseleave", function (event) {
               var movingToCanvas = (event.originalEvent.toElement === interactivity.eventHolder[0]);
               if (!movingToCanvas) {
                  interactivity.hide();
               }
            });
            interactivity.tooltip.bind("mouseover", function (event) {
               //If the mouse is moved within the tooltip, we want the interactivity to react
               //as if it was moved over the canvas itself
               var placeholder = $(interactivity.id);
               var offset = interactivity.eventHolder.offset();
               interactivity.onTouch(event.originalEvent, plot, placeholder, offset, "mousemove", false);
            });

            if (interactivity.hoverline !== null) {
               interactivity.hoverline.remove();
            }

            var hoverlineid = "hoverline" + interactivity.id.replace("#", "");
            interactivity.hoverline = $("#" + hoverlineid);
            if (interactivity.hoverline !== null) {
               interactivity.hoverline.remove();
               interactivity.hoverline = [];
            }
            placeholder.append("<div id='" + hoverlineid + "' class='chart-hover-line'></div>");
            interactivity.hoverline = $("#" + hoverlineid);
            interactivity.hoverline.bind("mousedown", function (event) {
               interactivity.startDragging();
               
               var placeholder = $(interactivity.id);
               var offset = interactivity.eventHolder.offset();
               interactivity.onTouch(event.originalEvent, plot, placeholder, offset, "mousemove", false);

               return false;
            });

         };

         interactivity.onTouch = function(event, plot, placeholder, offset, which, withFinger) {
            //event.preventDefault();

            // interactivity.cancelIdleTimer();

            var plotOffset = plot.getPlotOffset();

            //Get position relative to the canvas
            var canvasX = event.pageX - offset.left - plotOffset.left;
            var canvasY = event.pageY - offset.top - plotOffset.top;

            var width = plot.width();
            var height = plot.height();

            log.debug("=============================================================================");
            log.debug(which + " at " + canvasX + ", " + canvasY + " (size " + width + "x" + height + ")");
            log.debug(" absolute: " + event.pageX + ", " + event.pageY + " (offset left: " + offset.left + " top:" + offset.top + ")");

            if (interactivity.debuggingEnabled) {
               interactivity.addDebuggingLine("<b>touch " + canvasX + ", " + canvasY + "</b>");
            }

            //Check if the touch is made within the plot's bounds
            if (canvasX < 0 || canvasX >= width || canvasY < 0 || canvasY >= height) {
               log.debug("OUT OF BOUNDS " + canvasX + ", " + canvasY + " (size " + width + "x" + height + ")");
               interactivity.addDebuggingLine("<b>OUT OF BOUNDS " + canvasX + ", " + canvasY + " (size " + width + "x" + height + ")" + "</b>");
               interactivity.hide();
               // interactivity.startIdleTimer();
               return;
            }

            var pos = plot.c2p({ left: canvasX, top: canvasY });

            pos.pageX = event.pageX;
            pos.pageY = event.pageY;

            log.debug(interactivity.id + " " + JSON.stringify(pos));

            interactivity.onInteractivity(pos, placeholder, offset, withFinger);

            // interactivity.startIdleTimer();
         };

         interactivity.onInteractivity = function(pos, placeholder, offset, withFinger) {
            if (interactivity.isEnabledHandler !== null) {
               if (!interactivity.isEnabledHandler()) {
                  return;
               }
            }

            //if (pos.x < interactivity.minimumX || pos.x > interactivity.maximumX || pos.y < interactivity.minimumY || pos.y > interactivity.maxValue) {
            if (pos.x < interactivity.minimumX || pos.x > interactivity.maximumX) {
               //log.debug("HIDE interactivity on " + JSON.stringify(pos));
               //log.debug("maxvalue = " + interactivity.maxValue);
               //log.debug("id = " + interactivity.id);
               log.debug("hide for " + JSON.stringify(pos));
               interactivity.hide();
            }
            else {
               //log.debug("SHOW " + maxValue + " " + interactivity.maxValue);

               var column = interactivity.useRoundingForColumnConversion ? Math.round(pos.x) : Math.floor(pos.x);

               log.debug("==> COLUMN: " + column);
               
               var message = interactivity.messages[column];
               
               if (message) {
                  interactivity.show(message, pos, placeholder, offset, withFinger);
               }
               /*if (message === undefined) {
                  interactivity.fetchMessage(column, function(message) {
                     interactivity.show(message, pos, placeholder, offset, withFinger);
                  });
               }
               else {
                  //message already cached
                  interactivity.show(message, pos, placeholder, offset, withFinger);
               }*/
            }
         };
         
         interactivity.show = function(message, pos, placeholder, offset, withFinger) {
            if (message === null) {
               interactivity.hide();
               return;
            }

            if (interactivity.hoverTimeout !== null) {
               window.clearTimeout(interactivity.hoverTimeout); //cancel previous timeout
            }
            if (!interactivity.dragging) {
               //we only want the automatic hide when hovering with the mouse
               interactivity.hoverTimeout = window.setTimeout(function() {
                  interactivity.hide();
               }, interactivity.hoverTimeoutDuration);
            }

            interactivity.tooltip.empty();
            interactivity.tooltip.append(message);
            var tooltipWidth = interactivity.tooltip.width();
            var tooltipHeight = interactivity.tooltip.height();
            
            var x;
            var y;

            if (withFinger) {
               //If the touch is made with a finger (actual touch on mobile devices) we need to reserve
               //some space and position the popup correctly so the user won't hide the message with his own finger
               y = pos.pageY - 40 - tooltipHeight;
               x = pos.pageX - 10 - tooltipWidth;
            }
            else {
               //In case of mouse events (standard computers) we place the popup differently
               y = pos.pageY + 10;
               x = pos.pageX + 10;
            }
            
            var endy = y + tooltipHeight;
            var endx = x + tooltipWidth;
            
            var visibleAreaStartX = $(window).scrollLeft();
            var visibleAreaStartY = $(window).scrollTop();
            var visibleAreaEndX = visibleAreaStartX + $(window).width() - 10; //extra space for scrollbars
            var visibleAreaEndY = visibleAreaStartY + $(window).height() - 10; //extra space for scrollbars

            //Check that x stays within the visible area
            if (endx > visibleAreaEndX) {
               x -= (endx - visibleAreaEndX);
            }
            if (x < visibleAreaStartX) {
               x += (visibleAreaStartX - x);
            }

            //Check that y stays within the visible area
            if (endy > visibleAreaEndY) {
               y -= (endy - visibleAreaEndY);
            }
            if (y < visibleAreaStartY) {
               y += (visibleAreaStartY - y);
            }

            interactivity.tooltip.stop(true);
            interactivity.tooltip.css({top: y, left: x});
            interactivity.tooltip.fadeIn(interactivity.hoverFadeInDuration);
            interactivity.hoverline.stop(true);
            interactivity.hoverline
                     .css({top: 0, left: pos.pageX - offset.left, height: placeholder.height()})
                     .fadeIn(interactivity.hoverFadeInDuration);

            if (interactivity.debuggingEnabled) {
               //TODO: this code MUST be reactivated for proper debugging support.
               //      We leave it commented out as a hack until we find out a solution
               //      for slow behaviour of touch events on iPad.
               interactivity.debugPopup.css({top: visibleAreaStartY, left: visibleAreaStartX});
               interactivity.debugPopup.show();
               
               //console.debug("debug length: " + interactivity.debugPopup.html().length);
               //hack to avoid getting a very big debug popup
               //(makes everything slower)
               if (interactivity.debugPopup.html().length > 5000) {
                  //console.error("clean");
                  interactivity.debugPopup.empty();
               }
            }
         };
         
         interactivity.startDragging = function() {
            interactivity.dragging = true;
            $(document).disableSelection();
            $(document).one("mouseup", interactivity.stopDragging);
         };

         interactivity.stopDragging = function(event) {
            interactivity.dragging = false;
            $(document).enableSelection();
            interactivity.hide();
            interactivity.draggingStopTime = new Date();
         };

         interactivity.configureOptions = function(options) {
            if (!options.hooks) {
               options.hooks = {};
            }

            if (!options.hooks.bindEvents) {
               options.hooks.bindEvents = [];
            }

            if (options.hooks.bindEvents.indexOf(interactivity.onBind) === -1) {
               options.hooks.bindEvents.push(interactivity.onBind);
            }
            
            if (!options.grid) {
               options.grid = {};
            }

            options.grid.hoverable = true;
            options.grid.clickable = true;
         };

         interactivity.addDebuggingLine = function(message) {
            if (interactivity.debuggingEnabled) {
               interactivity.debugPopup.html(interactivity.debugPopup.html() + message + "<br>");
               interactivity.debugPopup.scrollTop(interactivity.debugPopup[0].scrollHeight);
            }
         };

         interactivity.dismiss = function() {
            interactivity.hide();
            //TODO: more dismiss stuff
         };

         return interactivity;
      };
   };

   return ChartInteractivity;

   function objectToString(object) {
      var output = '';
      for (var property in object) {
         if (typeof(object[property] === "function")) {
            output += property + ": function\n";
         }
         else {
            output += property + ': ' + object[property] + '\n';
         }
      }
      return output;
   }
   
});


define('base-chart', [
   'logger',
   'common-chart-animator',
   'common-chart-interactivity',
   'jquery-flot',
   'jquery-flot-stack',
   'jquery-flot-axislabels',
   'jquery-flot-pie',
   'jquery-flot-resize'
], function(Logger, ChartAnimator, ChartInteractivity) {

   var log = Logger.get('BaseChart');

   var Chart = function() {
      
      this.createChart = function(id, hasInteractivity) {
         var chart = {};
         
         chart.id = "#" + id;
         chart.sets = [];
         chart.previousSets = [];
         chart.animator = new ChartAnimator().create(chart.id, chart);
         chart.interactivity = (hasInteractivity) ? new ChartInteractivity().create(chart.id) : undefined;
         
         //This is a fix for the overlaps() function, so it can work
         //even if the chart is not showing (which normally gives a 0 height)
         chart.height = 0; //see prepare
         chart.defaultHeight = 0;
         
         chart.clearSets = function() {
            this.previousSets = this.sets;
            this.sets = [];
         };
         
         chart.draw = function() {
            log.debug("Draw of " + chart.id);
            chart.animator.draw();
            if (hasInteractivity) {
               chart.interactivity.hide();
            }
            
            return true; //drawing finished ok
         };

         chart.resetDrawing = function() {
            log.debug("Reset drawing of " + chart.id);
            chart.animator.resetDrawing();
            if (hasInteractivity) {
               chart.interactivity.hide();
            }
         };

         chart.dismiss = function() {
            log.debug("Dismissal of " + chart.id);
            chart.animator.dismiss();
            if (hasInteractivity) {
               chart.interactivity.dismiss();
            }
         };
         
         chart.getSetsForDrawing = function() {
            return chart.sets;
         };

         chart.setDefaultHeight = function(defaultHeight) {
            chart.defaultHeight = defaultHeight;
         };

         chart.ensureHeightIsValid = function() {
            var placeholder = $(chart.id);

            chart.height = placeholder.height();
            if (chart.height === 0) {
               chart.height = chart.defaultHeight;
            }
         };
         
         return chart;
      };
   };

   return Chart;
});


define('common-chart-utilities', [
   'logger'
], function(Logger) {

   var log = Logger.get('ChartCommon');

   var ChartCommon = function(chart, currencyFormatter) {
      
      this.formatTickValue = function(value) {
         if (chart.useThousandsForTicks) {
            if (chart.decimalsForTicks === 0) {
               //no decimals
               return currencyFormatter.formatCurrency(Math.round(value / 1000.0));
            }
            var factor = Math.pow(10, chart.decimalsForTicks);
            return currencyFormatter.formatCurrency(Math.round(value / 1000.0 * factor) / factor, true, chart.decimalsForTicks);
         }
         else {
            // only for repop, workaround
            return "CHF " + currencyFormatter.formatCurrency(value);
         }
      };
      
      this.getRawTicks = function(rawTicks) {
         //Use our own calculated ticks (see prepare), instead of flot ticks.
         //In this way, they will be correct even if the chart couldn't be
         //properly rendered (for example, when it is not being displayed).
         //var rawTicks = chart.options.yaxis.ticks;
         if (chart.topValueFactor > 1.0) {
            rawTicks.pop(); //remove added item
         }
         
         var ticks = [];
         for (var index = 0; index < rawTicks.length; index++) {
            var value = rawTicks[index];
            //Use same tick format as flot
            var tick = {
               label: chart.utils.formatTickValue(value),
               v: value
            };
            ticks.push(tick);
         }

         return ticks;
      };
      
      this.overlaps = function(value, values, placeholder) {
         for (var i = 0; i < values.length; i++) {
            var each = values[i];
            if (this.getPixels(each, value, placeholder) <= 15) {
               return true;
            }
         }
         return false;
      };
      
      this.getPixels = function(value1, value2, placeholder) {
         var diff = Math.abs(value1 - value2);
         var pixels = diff * chart.height / (chart.max - chart.min);
         return pixels;
      };
      
      this.isBlankSet = function(set) {
         for (var itemIndex = 0; itemIndex < set.data.length; itemIndex++) {
            var item = set.data[itemIndex];
            if (item[1] !== 0) {
               return false;
            }
         }
         return true;
      };
      
      this.removeBlankItemsFromSets = function(sets) {
         var indicesToRemove = [];
         for (var setIndex = 0; setIndex < sets.length; setIndex++) {
            if (this.isBlankSet(sets[setIndex])) {
               indicesToRemove.push(setIndex);
            }
         }
         //Remove blank items to avoid crazy area drawing in Chrome
         var removedItems = 0;
         for (var removalIndex = 0; removalIndex < indicesToRemove.length; removalIndex++) {
            var indexToRemove = indicesToRemove[removalIndex] - removedItems;
            sets.splice(indexToRemove, 1);
            removedItems++;
         }
      };

      this.determineTickAppearance = function(max) {
         // if (max < 1000) {
            chart.useThousandsForTicks = false;
         /*}
         else {*/
            /*chart.useThousandsForTicks = true;*/
            /*if (max >= 1000 && max < 10000) {
               chart.decimalsForTicks = 1;
            }
            else {
               chart.decimalsForTicks = 0;
            }
         }*/
      };
      
      this.hasSetNullValues = function(set) {
         var setWithNulls = false;
         for (var dataIndex = 0; dataIndex < set.data.length; dataIndex++) {
            if (set.data[dataIndex].begin === null || set.data[dataIndex].end === null) {
               setWithNulls = true;
               break;
            }
         }
         return setWithNulls;
      };
      
      this.isSetALine = function(set) {
         return set.lines !== undefined;
      };
      
      this.findSetFromOrder = function(order) {
         var setRtn = null;
         chart.series.forEach(function(serie) {
            chart.sets.forEach(function(set) {
               if (serie.order === order && serie.name === set.label) {
                  setRtn = set;
               }
            });
         });
         return setRtn;
      };
   };
   
   return ChartCommon;
});


define('base-bar-chart', [
   'logger',
   'base-chart',
   'common-chart-utilities'
], function(Logger, BaseChart, ChartUtils) {

   var log = Logger.get('BaseBarChart');

   var BaseBarChart = function() {
      this.createChart = function(id, hasInteractivity, currencyFormatter) {
         var chart = new BaseChart().createChart(id, hasInteractivity);
         chart.utils = new ChartUtils(chart, currencyFormatter);
         
         chart.options = null;
         chart.max = 0;
         chart.min = 0;
         chart.series = [];
         chart.previousMax = 0;
         chart.previousOptions = null;

         chart.animator.setSortSets(true);
         
         chart.labelThounsandsForTicks = "";
         chart.labelCurrency = "";
         chart.labelYearString = "";

         chart.setChartLabels = function(labelThounsandsForTicks, labelCurrency, labelYearString) {
            chart.labelThounsandsForTicks = (labelThounsandsForTicks !== undefined) ? labelThounsandsForTicks : chart.labelThounsandsForTicks;
            chart.labelCurrency = (labelCurrency !== undefined) ? labelCurrency : chart.labelCurrency;
            chart.labelYearString = (labelYearString !== undefined) ? labelYearString : chart.labelYearString;
         };

         return chart;
      };
   };

   return BaseBarChart;
});


define('common-column-chart', [
   'base-bar-chart',
   'common-currency-formatter',
   'logger'
], function(BaseBarChart, CurrencyFormatter, Logger) {

   var log = Logger.get('ColumnChart');

   var ColumnChart = function() {
      this.createColumnChart = function(id, currencyFormatter) {
         var chart = new BaseBarChart().createChart(id, true, currencyFormatter);

         chart.columns = [];
         chart.visibleColumns = [];
         chart.previousVisibleColumns = 0;

         chart.shouldShowColumnNames = true;
         chart.shouldShowEmptyColumns = false;
         
         //Limits are fixed on this chart, so set them at the beginning
         chart.interactivity.setMinimumX(0.0);
         chart.interactivity.setMaximumX(10.0); //TODO
         chart.interactivity.setIsEnabledHandler(function() {
            return !chart.animator.drawing;
         });

         chart.setOnHover = function(onHoverHandler) {
            chart.interactivity.setOnHover(onHoverHandler);
         };

         chart.addSerie = function(name, color, isLine, column, lineThickness) {
            var serie    = {};
            serie.name   = name;
            serie.color  = color;
            serie.isLine = isLine;
            serie.column = column;
            serie.order  = chart.series.length;
            serie.lineThickness = lineThickness ? lineThickness : 2;
            
            chart.series.push(serie);
         };
         
         chart.addColumn = function(id, name) {
            var column = {};
            column.index = chart.columns.length;
            column.id = id;
            column.name = name;
            column.visible = true;
            
            chart.columns.push(column);
         };

         chart.setColumnVisibility = function(columnId, visibility) {
            var column = findColumn(columnId);
            if (column) {
               column.visible = visibility;
            }
         };
         
         chart.setData = function(values) {
            chart.pendingDraw = {
               values: values,
               id: Date.now()
            };
         };
         
         chart.createSets = function(seriesParam) {
            chart.previousSets    = chart.sets;
            chart.previousMax     = chart.max;
            chart.previousOptions = chart.options;
            
            var series           = $.extend(true, [], seriesParam);
            var columns          = $.extend(true, [], chart.columns);
            var values           = chart.pendingDraw.values;
            var sets             = [];
            //var excludedSeries   = [];
            var value;

            var column;
            var columnIndex;
            var serieIndex;
            var serie;

            // Find all values to exclude
            for (var valueIndex = 0; valueIndex < values.length; valueIndex++) {
               value = values[valueIndex];
               serie = series[valueIndex];
               serie.show = true;
               serie.value = value;
               if (!$.isNumeric(value)) {
                  serie.show = false;
                  serie.value = undefined;
               }
            }

            if (!chart.shouldShowEmptyColumns) {
               for (columnIndex = 0; columnIndex < columns.length; columnIndex++) {
                  column = columns[columnIndex];
                  var seieresForColumn = getSeriesForColumn(column, series);
                  var shouldShowColumn = false;
                  for (serieIndex = 0; serieIndex < seieresForColumn.length; serieIndex++) {
                     serie = seieresForColumn[serieIndex];
                     if (serie.show) {
                        shouldShowColumn = true;
                     }
                  }
                  if (!shouldShowColumn) {
                     column.visible = false;
                  }
               }
            }
            
            chart.visibleColumns = [];
            for (columnIndex = 0; columnIndex < columns.length; columnIndex++) {
               column = columns[columnIndex];
               if (column.visible) {
                  chart.visibleColumns.push(column);
               }
            }

            //Create the sets
            for (serieIndex = 0; serieIndex < series.length; serieIndex++) {
               serie = series[serieIndex];
               
               if (!serie.show) {
                  continue;
               }

               var data = [];
               var dataIndex = 0;

               for (columnIndex = 0; columnIndex < columns.length; columnIndex++) {
                  column = columns[columnIndex];
                  if (column.visible) {
                     value = undefined;
                     if (column.index === serie.column) {
                        value = serie.value;
                     }
                     data.push([dataIndex++, value]);
                  }
               }
               
               var set = { label: serie.name, data: data, color: serie.color, order: serie.order };
               if (serie.isLine) {
                  dataSet = [];
                  dataSet.push([-1, serie.value]);
                  dataSet.push([chart.visibleColumns.length, serie.value]);

                  set.data  = dataSet;
                  set.stack = false;
                  set.lines = { show: true, fill: false, steps: false, lineWidth: serie.lineThickness };
               }
               
               sets.push(set);
            }
            
            log.debug("Columns: ");
            chart.columns.forEach(function(data) {
               log.debug(JSON.stringify(data));
            });
            log.debug("Series:  ");
            chart.series.forEach(function(data) {
               log.debug(JSON.stringify(data));
            });
            log.debug("Sets:    ");
            sets.forEach(function(data, index) {
               log.debug(JSON.stringify(sets[index]));
            });

            return sets;
         };
         
         chart.beforeDrawing = function() {
            chart.prepare();
            
            return this.previousVisibleColumns === this.visibleColumns.length;
         };

         chart.draw = function() {
            log.debug("Drawing comparative chart " + chart.id);
            chart.animator.draw();
         };
         
         chart.resetDrawing = function() {
            chart.animator.resetDrawing();
         };

         chart.prepare = function() {
            chart.sets = chart.createSets(chart.series);
            chart.max = chart.getMaxValue();
            chart.utils.determineTickAppearance(chart.max);
            chart.ensureHeightIsValid();
            
            var xticks = [];
            chart.visibleColumns.forEach(function(data, index) {
               xticks.push([index, data.name]);
            });
            
            chart.options = {
               series: {
                  stack: true,
                  shadowSize: 0,
                  bars: {
                     show: true,
                     fill: 1.0, //opacity of the fill
                     barWidth: 0.75,
                     align: "center"
                  }
               },
               legend: {
                  show: false
               },
               xaxis: {
                  show: chart.shouldShowColumnNames,
                  ticks: xticks,
                  color: "rgba(0,0,0,0)", //make the lines transparent
                  min: -0.6,
                  max: chart.visibleColumns.length - 0.4
               },
               yaxis: {
                  ticks: chart.getTicks(chart.sets),
                  color: "rgba(0,0,0,0)", //make the lines transparent
                  min: 0.0,
                  tickFormatter: chart.utils.formatTickValue
               },
               grid: {
                  //show: false,
                  aboveData: true,
                  borderWidth: {
                     top: 0,
                     left: 1,
                     bottom: 1,
                     right: 0
                  },
                  margin: {
                     top: 20,
                     left: 5,
                     bottom: 0,
                     right: 0
                  }
               }
            };
         };
         
         chart.getMaxValue = function() {
            var max = 0;
            
            for (var columnIndex = 0; columnIndex < chart.visibleColumns.length; columnIndex++) {
               var currentValue = 0;
               var currentDataIndex = 0;
               var previousDataIndex = 0;
               for (var index = 0; index < chart.sets.length; index++) {
                  var data = chart.sets[index].data;
                  if (!chart.sets[index].lines) {
                     for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {
                        currentDataIndex = data[dataIndex][0];
                        if (currentDataIndex === columnIndex) {
                           if (currentDataIndex === previousDataIndex) {
                              currentValue += (!isNaN(data[dataIndex][1])) ? data[dataIndex][1] : 0;
                           }
                           else {
                              currentValue = (!isNaN(data[dataIndex][1])) ? data[dataIndex][1] : 0;
                           }
                           previousDataIndex = currentDataIndex;
                           
                           if (currentValue > max) {
                              max = currentValue;
                           }
                           
                           break;
                        }
                     }
                  }
               }
            }

            return max;
         };
         
         chart.drawLabels = function() {
            //Add currency string
            var currencyString;
            if (chart.useThousandsForTicks) {
               currencyString = chart.labelThounsandsForTicks; //this.getString("Charts.ThousandCurrency");
            }
            else {
               currencyString = chart.labelCurrency; //this.getString("Charts.Currency");
            }
         };

         chart.dismiss = function() {
            log.debug("Dismissal of " + chart.id);
            chart.animator.dismiss();
         };

         chart.showColumnNames = function(shouldShowColumnNames) {
            chart.shouldShowColumnNames = shouldShowColumnNames;
         };

         chart.showEmptyColumns = function(shouldShowEmptyColumns) {
            chart.shouldShowEmptyColumns = shouldShowEmptyColumns;
         };
         
         
         //
         // DELEGATE METHODS FOR CHART ANIMATOR
         //

         /**
          * Creates a draw object for the current state, which contains all
          * the necessary information for a complete smooth transition draw.
          * 
          * @returns {DrawObject} draw object
          */
         chart.createDrawObjectForCurrentState = function() {
            var previousTicks = [];
            if (this.previousOptions) {
               previousTicks = this.previousOptions.yaxis.ticks;
            }
            
            return {
               xychart: true,
               previousSets: $.extend(true, [], this.previousSets),
               newSets: $.extend(true, [], this.sets),
               previousMax: this.previousMax,
               max: this.max,
               previousColumns: this.previousVisibleColumns,
               columns: this.visibleColumns.length,
               previousTicks: previousTicks,
               newTicks: this.options.yaxis.ticks
            };
         };
   
         /**
          * onDrawFromScratch
          *
          * We override this function in order to correctly store the previous sets.
          * This function is called when we are about to draw the chart from scratch,
          * either because we had no animation, or as the final state of an already
          * made animation.
          * We can thus safely assume that at this point, the sets, max, and columns
          * are the ones we are about to draw in createPlot (see below).
          * So we consider these objects as the ones which will be shown, and thus
          * they are valid for later animator analysis to determine if there are
          * changes that require drawing.
          *
          * @param {array} sets
          * @param {object} drawObject
          * @returns {void}
          */
         chart.onDrawFromScratch = function(sets, drawObject) {
            if (drawObject) {
               this.previousVisibleColumns = drawObject.columns;
            }
            else {
               this.previousVisibleColumns = this.visibleColumns.length;
            }
         };

         chart.createPlot = function(sets) {
            chart.interactivity.configureOptions(this.options);
            var plot = $.plot($(chart.id), sets, this.options);
            chart.drawLabels();
            chart.interactivity.setPreloadMessages(false);
            chart.interactivity.activate(plot);
            chart.interactivity.setMinimumX(this.options.xaxis.min);
            return plot;
         };

         chart.onAnimationStepSetDefined = function(set, currentDraw) {
            if (set.stack === false) {
               //it's a line set, so adjust the boundaries so the line
               //goes through the empty space at left and right
               dataSet = [];
               dataSet.push([-1, set.data[0][1]]);
               dataSet.push([currentDraw.columns, set.data[0][1]]);

               set.data  = dataSet;
            }
         };

         chart.onRedraw = function(sets, plot) {
            chart.utils.removeBlankItemsFromSets(sets);
         };
                  
         chart.getTicks = function(sets) {
            //Handmade code to avoid overlaps
            var yticks = [0];
            var placeholder = $(chart.id);
            
            var max;
            
            for (var columnIndex = 0; columnIndex < chart.columns.length; columnIndex++) {
               var currentValue = 0;
               var currentDataIndex = 0;
               var previousDataIndex = 0;
               for (var index = 0; index < sets.length; index++) {
                  var data = sets[index].data;
                  
                  for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {
                     currentDataIndex = data[dataIndex][0];
                     // with lines currentDataIndex is -1
                     if (currentDataIndex === columnIndex || currentDataIndex === -1) {
                        if (currentDataIndex === previousDataIndex && !sets[index].lines) {
                           currentValue += (!isNaN(data[dataIndex][1])) ? data[dataIndex][1] : 0;
                        }
                        else {
                           currentValue = (!isNaN(data[dataIndex][1])) ? data[dataIndex][1] : 0;
                        }
                        previousDataIndex = currentDataIndex;

                        max = currentValue;
                        if (dataIndex - 1 > 0) {
                           var previousValue = data[dataIndex - 1][1];
                           if (previousValue !== undefined) {
                              max = Math.max(currentValue, previousValue);
                           }
                        }
                        
                        if (!chart.utils.overlaps(currentValue, yticks, placeholder)) {
                           yticks.push(currentValue);
                        }
                        break;
                     }
                  }
               }
            }

            return yticks;
         };
         
         function findColumn(id) {
            var column;
            for (var columnIndex = 0; columnIndex < chart.columns.length; columnIndex++) {
               column = chart.columns[columnIndex];
               if (column.id === id) {
                  return column;
               }
            }
            return null;
         }

         function getSeriesForColumn(column, allSeries) {
            var seriesForColumn = [];
            for (var serieIndex = 0; serieIndex < allSeries.length; serieIndex++) {
               var serie = allSeries[serieIndex];
               if (serie.column === column.index) {
                  seriesForColumn.push(serie);
               }
            }
            return seriesForColumn;
         }

         return chart;
      };
   };

   return ColumnChart;
});


define('column-graph', [
   'parameters-manager',
   'logger',
   'common-column-chart',
   'common-currency-formatter'
], function(parametersManager, Logger, ColumnChart, CurrencyFormatter) {
   'use strict';

   /**
    * Column Graph
    * 
    * Specific functions expected to be defined in the bridge:
    * 
    * - configureChart(columnChart): should setup the chart (called only once).
    * - updateChart(columnChart): should add the desired sets, with values and colors.
    * 
    * @param {type} app
    * @returns {unresolved}
    */

   var log = Logger.get('ColumnGraph');

   return function(app) {
      return app.component('columnGraph', {
         bindings: {
            id: '@',
            bridge: '='
         },
         templateUrl: 'src/directives/graphs/column-graph/column-graph.html',
         controller: ['$timeout', function($timeout) {
            log.debug("START COLUMN GRAPH");

            var that = this;

            if (that.id !== undefined && that.id.length > 0) {
               that.fieldId = that.id.replace(/\./g, '_');
            }
            else {
               that.fieldId = "";
            }

            that.canvasId = that.fieldId + "ColumnCanvas";

            that.bridge.update = function() {
               log.debug("UPDATE: " + that.canvasId);
               that.refreshHandler.update();
            };

            that.bridge.forceDraw = function() {
               log.debug("FORCE DRAW: " + that.canvasId);
               that.refreshHandler.forceDraw();
            };

            that.bridge.getVisibleRefreshHandlers = function() {
               return [that.refreshHandler];
            };

            that.bridge.getChart = function() {
               return that.getColumnChart();
            };

            that.getColumnChart = function() {
               if (!that.columnChart) {
                  that.columnChart = new ColumnChart().createColumnChart(
                     that.canvasId,
                     new CurrencyFormatter(parametersManager.baseViewParameters.groupDelimiter,
                                           parametersManager.baseViewParameters.amountDecimalDelimiter,
                                           parametersManager.baseViewParameters.useMixedGroupingSeparator));
                  that.bridge.configureChart(that.columnChart);
               }
               return that.columnChart;
            };

            var updater = that.bridge.createChartUpdater(that.getColumnChart(), function(columnChart) {
               that.bridge.updateChart(columnChart);
            });
            that.refreshHandler = that.bridge.createRefreshHandler(that.canvasId, updater);

         }]
      });
   };

});


define('multicalc-risk', [
   'parameters-manager',
   'logger',
   'column-graph',
   'base-state'
], function(parametersManager, Logger) {
   'use strict';

   var log = Logger.get('MulticalcRisk');

   return function(app) {
      return app.component('multicalcRisk', {
         bindings: {
            id: '@',
            result: '=',
            bridge: '=',
            data: '=',
            calculate: '&',
            contact: '&',
            need: '='
         },
         templateUrl: 'src/controllers/multicalc/multicalc-risk/multicalc-risk.html',
         controller: ['baseState', 'localize', '$timeout', function(baseState, localize, $timeout) {
            var that = this;
            that.baseViewParameters = parametersManager.baseViewParameters;
            that.collapsed = true;

            if (that.id !== undefined && that.id.length > 0) {
               that.fieldId = that.id.replace(/\./g, '_');
            }
            else {
               that.fieldId = "";
            }

            that.mainId = that.fieldId + "Result";
            that.chartId = that.mainId + "Chart";
            that.riskType = that.fieldId.indexOf("Death") !== -1 ? "Death" : "Disability";
            that.bridge.update = function() {
               that.chartBridge.update();
            };
            
            that.bridge.forceDraw = function() {
               log.debug("RISK ON ACTIVE CHART DRAW!");
               log.debug("result=" + JSON.stringify(that.result));
               that.chartBridge.forceDraw();
            };

            that.bridge.getVisibleRefreshHandlers = function() {
               return that.chartBridge.getVisibleRefreshHandlers();
            };

            that.chartBridge = that.bridge.newBridge();
            that.chartBridge.configureChart = function(columnChart) {
               columnChart.addColumn("today", localize.getLocalizedString("MulticalcRisk.ColumnToday"));
               columnChart.addColumn("risk", localize.getLocalizedString("MulticalcRisk.Column" + that.riskType));
               columnChart.showEmptyColumns(false);
               var gapColor = "risk" + that.riskType + "GapColor";
               var ahvColor = "risk" + that.riskType + "FirstPillarColor";
               var bvgColor = "risk" + that.riskType + "SecondPillarColor";
               columnChart.addSerie("income", parametersManager.baseViewParameters.riskIncomeColor, false, 0);
               columnChart.addSerie("bvg", parametersManager.baseViewParameters[bvgColor], false, 1);
               columnChart.addSerie("ahv", parametersManager.baseViewParameters[ahvColor], false, 1);
               columnChart.addSerie("gap", parametersManager.baseViewParameters[gapColor] , false, 1);
               columnChart.addSerie("need", parametersManager.baseViewParameters.riskNeedColor, true, undefined, parametersManager.baseViewParameters.needLineThickness);

               columnChart.setChartLabels(
                     localize.getLocalizedString('Charts.ThousandCurrency'),
                     localize.getLocalizedString('Charts.Currency')
               );
               
               columnChart.setOnHover(function(columns) {
                  return that.bridge.loadTemplateArray(
                        that.chartId + 'ColumnCanvasContainer',
                        'src/controllers/multicalc/multicalc-risk/multicalc-risk-chart-popup.html',
                        columns,
                        function(popupScope, column) {
                           popupScope.column = column;
                           popupScope.that = that;
                           var findSetFromOrder = that.chartBridge.getChart().utils.findSetFromOrder;
                           var set;
                           set = findSetFromOrder(0);
                           popupScope.grossIncome = (set === null) ? 0 : set.data[column][1];
                           set = findSetFromOrder(column === 1 ? 1 : 5);
                           popupScope.secondPillarRent = (set === null) ? 0 : set.data[column][1];
                           set = findSetFromOrder(column === 1 ? 2 : 6);
                           popupScope.firstPillarRent = (set === null) ? 0 : set.data[column][1];
                        });
               });
            };
            
            that.chartBridge.updateChart = function(columnChart) {
               var getValueOrNull = function(value) {
                  return value > 0 ? value : null;
               };
               var columnChartValues = [];
               columnChartValues.push(getValueOrNull(baseState.mainPerson.grossIncome));
               columnChartValues.push(that.result.secondPillarRent);
               columnChartValues.push(that.result.firstPillarRent);
               columnChartValues.push(that.result.gap);
               columnChartValues.push(getValueOrNull(that.need));
               columnChart.setData(columnChartValues);
            };

            $timeout(function() {
               // since the id is dynamic, we must wait for a first render
               $('#' + that.riskType).collapse("hide");
               $('#' + that.riskType).on('shown.bs.collapse', function () {
                  that.bridge.forceDraw();
               });
            });

            that.toggleCollapse = function() {
                $('#' + that.riskType).collapse("toggle");
                that.collapsed = !that.collapsed;
            };
         }]
      });
   };
});


define('common-area-chart', [
   'base-bar-chart',
   'logger'
], function(BaseBarChart, Logger) {

   var log = Logger.get('AreaChart');

   /**
    * AreaChart
    * 
    * This object represents an XY-chart with filled areas, called sets.
    * Each set can have a color and a group of values for the columns.
    * 
    * @returns {AreaChart}
    */
   var AreaChart = function() {
      this.create = function(id, currencyFormatter) {
         log.debug("Creating area chart for " + id);
         var chart = new BaseBarChart().createChart(id, true, currencyFormatter);

         chart.columns = 0;
         chart.previousSets = [];
         chart.previousColumns = 0;
         chart.addCurrencyLabel = false;
         chart.XAxisLeftLabel = "";
         chart.XAxisRightLabel = "";

         chart.interactivity.setIsEnabledHandler(function() {
            return !chart.animator.drawing;
         });

         chart.setUpAsAreaChart = function() {
            this.addCurrencyLabel = true;
            this.options = {
               series: {
                  stack: true,
                  shadowSize: 0,
                  lines: {
                     show: true,
                     fill: 1.0, //opacity of the fill
                     steps: false,
                     lineWidth: 1
                  },
                  bars: {
                     show: false,
                     barWidth: 0.6
                  }
               },
               legend: {
                  show: false
               },
               xaxis: {
                  show: true,
                  color: "white",
                  min: 0.0,
                  ticks: 0
               },
               yaxis: {
                  tickFormatter: chart.formatTickValue,
//                  tickFormatter: this.utils.formatTickValue,
                  min: 0.0,
                  ticks: 3
               },
               grid: {
                  show: true,
                  //color: "red",
                  aboveData: false,
                  margin: {
                     top: 25,
                     left: 0,
                     bottom: 0,
                     right: 0
                  },
                  markings: [{ xaxis: { from: 0, to: 0 }, color: "#000" },
                             { yaxis: { from: 0, to: 0 }, color: "#000" }],
                  borderWidth: 0
               },
               xaxes: [{
                     // axisLabel: chart.xAxisLabel,
                     axisLabelUseHtml: true
                  }]
            };
         };

         chart.setOnHover = function(onHoverHandler) {
            chart.interactivity.setOnHover(onHoverHandler);
         };

         chart.setXAxisLeftLabel = function(newLabel) {
           // chart.options.xaxes[0].axisLabel = newLabel;
           chart.XAxisLeftLabel = newLabel;
         };
         
         chart.setXAxisRightLabel = function(newLabel) {
           // chart.options.xaxes[0].axisLabel = newLabel;
           chart.XAxisRightLabel = newLabel;
         };

         chart.setXAxisFormatter = function(tickDecimals) {
            this.options.xaxis.tickDecimals = tickDecimals;
            this.options.xaxis.tickFormatter = function axisFormatter(val, axis) {
               return val.toFixed(axis.tickDecimals);
            };
         };

         chart.setXAxisOffset = function(offset) {
            this.options.xaxis.offset = offset;
            this.options.xaxis.tickFormatter = function axisFormatter(val, axis) {
               return (axis.options.offset + val).toFixed(axis.tickDecimals);
            };
         };

         chart.buildDataSet = function(data) {
            var rawSet = [];
            var size = data.length;
            for (var i = 0; i < size; i++) {
               var value = data[i];
               rawSet.push([i, value]);
               this.max = Math.max(this.max, value);
               //log.debug("adding " + i + " value: " + value);
            }
            if (size > chart.columns) {
               chart.columns = size;
            }
            return rawSet;
         };

         chart.addSet = function(label, color, data) {
            var rawSet = this.buildDataSet(data);
            var set;
            set = {
               label: label,
               data: rawSet,
               color: color
            };
            this.sets.push(set);
         };
         
         chart.addLineSet = function(label, color, data) {
            var rawSet = this.buildDataSet(data);
            var set;
            set = {
               label: label,
               data: rawSet,
               color: color,
               stack: false,
               lines: {
                  show: true,
                  fill: false,
                  steps: false,
                  lineWidth: 2
               }
            };
            this.sets.push(set);
         };

         chart.clearSets = function() {
            this.sets = [];
            this.max = 0;
            this.columns = 0;
         };

         chart.drawLabels = function() {
            if (this.addCurrencyLabel) {
               //Add currency string
               var currencyString;
               if (chart.useThousandsForTicks) {
                  currencyString = chart.labelThounsandsForTicks; //this.getString("Charts.ThousandCurrency");
               }
               else {
                  currencyString = chart.labelCurrency; //this.getString("Charts.Currency");
               }

               var placeholder = $(this.id);
               placeholder.append("<div class='area-chart-left-label'>" + chart.XAxisLeftLabel + "</div>");
               placeholder.append("<div class='area-chart-right-label'>" + chart.XAxisRightLabel + "</div>");
               var currencyLabelId = this.id.replace("#", "") + "CurrencyLabel";
               chart.currencyLabel = $("#" + currencyLabelId);
            }
         };

         chart.updateCurrencyLabel = function() {
            var currencyString;
            if (chart.useThousandsForTicks) {
               currencyString = chart.labelThounsandsForTicks;
            }
            else {
               currencyString = chart.labelCurrency;
            }
            if (chart.currencyLabel !== null) {
               chart.currencyLabel.html(currencyString);
            }
         };

         chart.formatTickValue = function(value) {
            return (chart.max === 0) ? "" : chart.utils.formatTickValue(value);
         };
         
         chart.getYTicks = function() {
            var plot = chart.animator.plot;
            var axes = plot.getAxes();
            return axes.yaxis.ticks;
         };

         chart.getXTicks = function() {
            var plot = chart.animator.plot;
            var axes = plot.getAxes();
            return axes.xaxis.ticks;
         };

         //
         // DELEGATE METHODS FOR CHART ANIMATOR
         //

         /**
          * Creates a draw object for the current state, which contains all
          * the necessary information for a complete smooth transition draw.
          * 
          * @returns {DrawObject} draw object
          */
         chart.createDrawObjectForCurrentState = function() {
            return { xychart: true,
                     previousSets: $.extend(true, [], this.previousSets),
                     newSets: $.extend(true, [], this.sets),
                     previousMax: this.previousMax,
                     max: this.max,
                     previousColumns: this.previousColumns,
                     columns: this.columns
                   };
         };

         chart.beforeDrawing = function() {
            chart.utils.determineTickAppearance(this.max);
         };

         /**
          * onDrawFromScratch
          * 
          * We override this function in order to correctly store the previous sets.
          * This function is called when we are about to draw the chart from scratch,
          * either because we had no animation, or as the final state of an already
          * made animation.
          * We can thus safely assume that at this point, the sets, max, and columns
          * are the ones we are about to draw in createPlot (see below).
          * So we consider these objects as the ones which will be shown, and thus
          * they are valid for later animator analysis to determine if there are
          * changes that require drawing.
          *
          * @param {array} sets
          * @param {object} drawObject
          * @returns {void}
          */
         chart.onDrawFromScratch = function(sets, drawObject) {
            if (drawObject) {
               this.previousSets = drawObject.newSets;
               this.previousMax = drawObject.max;
               this.previousColumns = drawObject.columns;
            }
            else {
               this.previousSets = this.sets;
               this.previousMax = this.max;
               this.previousColumns = this.columns;
            }
         };

         chart.createPlot = function(sets) {
            chart.utils.determineTickAppearance(this.max);
            chart.interactivity.configureOptions(this.options);
            var plot = $.plot(this.id, sets, this.options);
            chart.drawLabels();
            chart.interactivity.setConsiderLastColumn(true);
            chart.interactivity.setMaximumX(chart.columns - 1);
            chart.interactivity.activate(plot);
            return plot;
         };

         chart.onRedraw = function(sets, plot) {
            //Use the current scale to figure out the tick appearance
            var scale = plot.getAxes().yaxis.options.max;
            
            chart.utils.determineTickAppearance(scale);
            chart.updateCurrencyLabel();
         };
         
         chart.onRescaleY = function(scale, plot) {
            chart.utils.determineTickAppearance(scale);
            chart.updateCurrencyLabel();
         };

         chart.setUpAsAreaChart();

         return chart;
      };
   };
   

   return AreaChart;
});


define('multicalc-saving3a', [
   'parameters-manager',
   'logger',
   'common-area-chart',
   'column-graph',
   'base-state'
], function(parametersManager, Logger, AreaChart) {
   'use strict';

   var log = Logger.get('MulticalcSaving3a');

   return function(app) {
      return app.component('multicalcSaving3a', {
         bindings: {
            id: '@',
            scenario: '=',
            result: '=',
            bridge: '=',
            data: '=',
            calculate: '&',
            contact: '&'
         },
         templateUrl: 'src/controllers/multicalc/multicalc-saving3a/multicalc-saving3a.html',
         controller: ['$timeout', 'baseState', 'localize', function($timeout, baseState, localize) {
            var that = this;  
            that.baseViewParameters = parametersManager.baseViewParameters;
            that.collapsed = true;

            that.bridge.update = function() {
               that.refreshHandler.update();
            };

            that.bridge.forceDraw = function() {
               that.refreshHandler.forceDraw();
            };

            that.bridge.getVisibleRefreshHandlers = function() {
                return [that.refreshHandler];
            };
            
            that.updateChart = function(chart) {
                chart.clearSets();
                chart.addSet("savings", that.baseViewParameters.investmentColor, that.result.savingsSet);
                chart.addSet("interest", that.baseViewParameters.interestColor, that.result.interestSet);
                chart.addSet("taxSavings", that.baseViewParameters.totalTaxSavingColor, that.result.taxSavingsSet);
                chart.setXAxisOffset(that.scenario.age);
                chart.setXAxisLeftLabel(localize.getLocalizedString('MulticalcSaving3a.Today'));
                chart.setXAxisRightLabel(localize.getLocalizedString('MulticalcSaving3a.RetirementAge'));
            };
            
            that.getAreaChart = function() {
               if (!that.standardChart) {
                  that.standardChart = new AreaChart().create("saving3aStandardChartCanvas", that.bridge.getDefaultCurrencyFormatter());
                  that.standardChart.setXAxisFormatter(0);
                  that.standardChart.setChartLabels(localize.getLocalizedString('Charts.ThousandCurrency'), localize.getLocalizedString('Charts.Currency'),
                     localize.getLocalizedString('Charts.Age'));
                  that.standardChart.setOnHover(function(columns) {
                     return that.bridge.loadTemplateArray(
                           'standardChart',
                           'src/controllers/multicalc/multicalc-saving3a/multicalc-saving3a-chart-popup.html',
                           columns,
                           function(popupScope, column) {
                              popupScope.column = column + that.scenario.age;
                              popupScope.taxSaving = that.result.taxSavingsSet[column];
                              popupScope.interest = that.result.interestSet[column];
                              popupScope.investment = that.result.savingsSet[column];
                           });
                  });
               }
               return that.standardChart;
            };

            var updater = that.bridge.createChartUpdater(that.getAreaChart(), function(areaChart) {
               that.updateChart(areaChart);
            });

            that.refreshHandler = that.bridge.createRefreshHandler("saving3aStandardChartCanvas", updater);

            $('#saving3a').collapse("hide");
            $('#saving3a').on('shown.bs.collapse', function () {
               that.bridge.forceDraw();
            });

            that.toggleCollapse = function() {

                $('#saving3a').collapse("toggle");
                that.collapsed = !that.collapsed;
            };
         }]
      });
   };
});


define('profile-bar', [
   'app',
   'logger',
   'profile-common'
], function(app) {
   'use strict';
   return function(app) {
      var profileBar = app.directive('profileBar', ['$rootScope', function($rootScope) {
         return {
            restrict: 'E',
            scope: {
               onPrint: '&'
            },
            templateUrl: 'src/directives/profile-bar/profile-bar.html',
            link: function(scope, element, attrs) {
               scope.showProfileBar = function() {
                  return !$rootScope.singleCalculation && $rootScope.hasAuthenticationURL;
               };
            },
            controller:['$scope', 'profileCommon',
               function($scope, profileCommon) {
                  $scope.getUserLogged = function() {
                     return profileCommon.getUserLogged();
                  };
                  $scope.isDemoAccount = function() {
                     return profileCommon.isDemoAccount();
                  };
                  $scope.logOut = function() {
                     return profileCommon.logOut();
                  };
                  $scope.logIn = function() {
                     return profileCommon.logIn();
                  };
                  $scope.register = function() {
                     return profileCommon.register();
                  };
                  $scope.showLogin = function() {
                     return profileCommon.showLogin();
                  };
                  $scope.showRegister = function() {
                     return profileCommon.showRegister();
                  };
                  $scope.signUp = function() {
                     return profileCommon.signUp();
                  };
                  $scope.onUserLogged = function() {
                     return profileCommon.onUserLogged();
                  };
               }
            ]
         };
      }]);
      return profileBar;
   };
});


define('src/iframe-helper.js', [
   'parameters-manager',
   'jquery'
], function(parametersManager) {
   'use strict';

   /*
    * Helper functions used to communicate with main window
    */
   var authorizedOrigins = [];

   function sendMessageToMainFrame(message, parameters) {
      //console.debug(">>> Sending message to main window: " + message);
      var parent = window.parent;
      if (parent) {
         message = {
            message: message,
            parameters: parameters
         };
         var domains = authorizedOrigins;
         if (domains.length === 0) {
            domains = parametersManager.baseApplicationParameters.authorizedContainers;
         }
         for (var i = 0; i < domains.length; i++) {
            parent.postMessage(message, domains[i]);
         }
      }
   }
   /* Function receives emits and sent to mainframe
    * 
    * @param {type} message
    * @param {type} parameters
    * @returns {undefined}
    */
   function initializeNotifications() {
      var lastID;
      var iFrameBody = $('body');
      if (iFrameBody.injector !== undefined && iFrameBody.injector() !== undefined) {
         var $rootScope = iFrameBody.injector().get('$rootScope');
         if ($rootScope !== undefined) {

            $rootScope.$on('$routeChangeSuccess', function() {
               var routesHandler = require('routes-handler');
               var id = routesHandler.getId();
               if (lastID !== id) {
                  lastID = id;
                  sendMessageToMainFrame("onRouteChanged", id);
               }
            });

            $rootScope.$on('documentTitleChanged', function(event, title) {
               sendMessageToMainFrame("onDocumentTitleChanged", title);
            });

            $rootScope.$on('viewTitleChanged', function(event, title) {
               sendMessageToMainFrame("onViewTitleChanged", title);
            });

            $rootScope.$on('openContactUrl', function(event, url) {
               sendMessageToMainFrame("openContactUrl", url);
            });

            $rootScope.$on('printSuccessful', function(event, contentBlob) {
               // inform about the successful print, sending the generated pdf as base64
               var fileReader = new FileReader();
               fileReader.addEventListener("loadend", function() {
                  var bytes = new Uint8Array(fileReader.result);
                  var length = bytes.byteLength;
                  var binary = '';
                  var index = 0;
                  var sendIndex = 0;
                  var chunkIndex = 0;
                  while (index < length) {
                     binary += String.fromCharCode(bytes[index]);
                     index++;
                     sendIndex++;

                     if (sendIndex >= 100000 || index === length) {
                        var base64 = btoa(binary, '');
                        // the postMessages sent between frame and main window can arrive at random order (this happens specially while debugging)
                        // the chunkIndex is used to sort the chunks with their correct order
                        sendMessageToMainFrame('onPrintSuccessfulChunk', {chunkIndex: chunkIndex, content: base64});

                        chunkIndex++;
                        sendIndex = 0;
                        binary = '';
                     }
                  }

                  sendMessageToMainFrame('onPrintSuccessfulEnd', {chunkCount: chunkIndex, length: length});
               });
               fileReader.readAsArrayBuffer(contentBlob);
            });
         }
      }
      else {
         window.setTimeout(initializeNotifications, 100);
      }
   }

   function initializeHeightInterval() {
      var lastHeight;

      setInterval(function() {
         var mainContent = $("#main-content");
         var currentHeight = mainContent.height();

         if (currentHeight !== lastHeight) {
            //console.debug("Height changed! New height: " + currentHeight);
            lastHeight = currentHeight;
            sendMessageToMainFrame("onInnerFrameChanged", currentHeight);
         }
      }, 50);
   }

   /**
    * Function called from the main window with messages that could be interesting for the iframe. It process messages that were sent by iframe
    *
    * @param {type} message Message type
    * @param {type} parameters Optional parameters for the message
    */
   window.processMessage = function(message, parameters) {
      //console.debug("iframe message: " + message);

      if (message === "onNavigation") {
         var link = parameters;
         var body = $('body');
         var $rootScope = body.injector().get('$rootScope');
         var locationService = body.injector().get('locationService');
         var translateRoute = body.injector().get('translateRoute');
         $rootScope.$apply(function() {
            $('.modal.in').removeClass('in').modal('hide');
            //dismiss modal backdrop
            $('.modal-backdrop').hide();
            locationService.setPath(translateRoute.getPath(link));
         });
      }

      if (message === "onIFrameScroll") {
         //if (window.matchMedia("only screen and (max-width: 516px)").matches) {
            var position = parameters;
            if (position < 10) {
               position = 10;
            }
            var modal = $('.modal');
            if (modal.is(':visible')) {
               modal.css('top', position);
            }
         //}
      }

      if (message === "getDataFromQuickWin") {
         var iFrameBody = $('body');
         if (iFrameBody.injector !== undefined && iFrameBody.injector() !== undefined) {
            var storageManager = iFrameBody.injector().get('storageManager');
            var fullData = storageManager.getFullStoredObject();
            sendMessageToMainFrame("onGetDataFromQuickWin", fullData);
         }
      }
   };

   /* Cross Domain Messages */
   window.addEventListener("message", receiveMessage, false);
   
   function isAuthorized(origin) {
      var result = false;

      var knownOrigins = parametersManager.baseApplicationParameters.authorizedContainers;
      
      for (var index = 0; index < knownOrigins.length; index++) {
         if (origin === knownOrigins[index] || 
             knownOrigins[index] === "*") {
            result = true;
         }
      }

      if (result) {
         if (authorizedOrigins.indexOf(origin) === 0) {
            console.log("origin " + origin + " added to list authorizedOrigins");
            authorizedOrigins.push(origin);
         }
      }
      
      return result;
   }

   function receiveMessage(event) {
     if (!isAuthorized(event.origin)) {
       return;
    }

     window.processMessage(event.data.message, event.data.parameters);
   }

   /* Cross Domain Messages End*/

   initializeNotifications();
   initializeHeightInterval();
});


define('custom-scripts', [
   'src/iframe-helper.js'
]);


define('message-service', [
   'angular',
   'logger',
   'toastr'
], function(angular, Logger, toastr) {
   'use strict';

   var log = Logger.get('messageService');

   var messageServiceModule = angular.module('messageServiceModule', []);

   messageServiceModule.factory('messageService', ['localize',
      function(localize) {
         var messageService = {
            MESSAGE_INFO: "info",
            MESSAGE_SUCCESS: "success",
            MESSAGE_WARNING: "warning",
            MESSAGE_DANGER: "danger",

            alertMessages: [],

            prepareLocalizedText: function(enumName, enumKey, params) {
               return {id: enumName + '.' + enumKey, params: params};
            },

            indexOfAlertMessage: function(message) {
               for (var index = 0; index < this.alertMessages.length; index++) {
                  if (this.alertMessages[index].type === message.type && this.alertMessages[index].localizedText.id === message.localizedText.id) {
                     return index;
                  }
               }

               return -1;
            },

            addAlertMessage: function(message) {
               var index = this.indexOfAlertMessage(message);
               if (index < 0) {
                  this.alertMessages.push(message);

                  var text = localize.getLocalizedString(message.localizedText.id, message.localizedText.params);

                  if (message.actions.length > 0) {
                     text += '<br><br>';
                     for (var actionIndex = 0; actionIndex < message.actions.length; actionIndex++) {
                        var action = message.actions[actionIndex];
                        var actionLabel = localize.getLocalizedString(action.localizedLabel.id, action.localizedLabel.params);
                        text += '<button type="button" class="btn-default" id="' + action.id + '">' + actionLabel + '</button>';
                     }
                  }

                  var that = this;
                  var options = {
                     preventDuplicates: true,
                     closeButton: true,
                     timeOut: (message.actions.length === 0) ? (message.timeout ? message.timeout : 0) : 0,
                     extendedTimeOut: 0,
                     tapToDismiss: message.actions.length === 0,
                     hideDuration: 0,
                     positionClass: (message.actions.length === 0) ? "toast-top-right" : "toast-top-center",
                     onclick: function(event) {
                        var closeMessage = false;

                        if (message.actions.length > 0) {
                           for (var actionIndex = 0; actionIndex < message.actions.length; actionIndex++) {
                              var action = message.actions[actionIndex];
                              if (action.id === event.target.id) {
                                 action.fn();
                                 closeMessage = true;
                                 // force remove, sometimes it refuses to do it
                                 toastr.remove(message.htmlElement);
                              }
                           }
                        }
                        else {
                           closeMessage = true;
                        }

                        if (!closeMessage) {
                           throw "prevent closing of message";
                        }

                        that.removeMessage(message);
                     }
                  };

                  if (message.type === this.MESSAGE_INFO) {
                     message.htmlElement = toastr.info(text, '', options);
                  }
                  else if (message.type === this.MESSAGE_SUCCESS) {
                     message.htmlElement = toastr.success(text, '', options);
                  }
                  else if (message.type === this.MESSAGE_WARNING) {
                     message.htmlElement = toastr.warning(text, '', options);
                  }
                  else if (message.type === this.MESSAGE_DANGER) {
                     message.htmlElement = toastr.error(text, '', options);
                  }
               }
            },

            addMessage: function(message) {
               if (message.actions === undefined) {
                  message.actions = [];
               }

               if (!message.localizedText && message.enumName && message.enumKey && message.enumName.length > 0 && message.enumKey.length > 0) {
                  message.localizedText = this.prepareLocalizedText(message.enumName, message.enumKey, message.enumParams);
               }

               if (message.removeOtherGroupMessages && message.group && message.group.length > 0) {
                  this.removeAllMessagesWithGroup(message.group);
               }

               this.addAlertMessage(message);
            },

            removeMessage: function(message) {
               var index = this.indexOfAlertMessage(message);
               while (index >= 0) {
                  this.alertMessages.splice(index, 1);
                  index = this.indexOfAlertMessage(message);
               }
            },

            removeAllMessagesWithGroup: function(group) {
               for (var index = this.alertMessages.length - 1; index >= 0; index--) {
                  var message = this.alertMessages[index];
                  if (message.group === group) {
                     var hideDuration = toastr.options.hideDuration;
                     toastr.options.hideDuration = 0;
                     toastr.clear(message.htmlElement, {force: true});
                     toastr.options.hideDuration = hideDuration;
                     this.alertMessages.splice(index, 1);
                  }
               }
            },

            removeMessagesOnNavigation: function() {
               for (var index = this.alertMessages.length - 1; index >= 0; index--) {
                  var message = this.alertMessages[index];
                  if (message.dismissOnNavigation) {
                     var hideDuration = toastr.options.hideDuration;
                     toastr.options.hideDuration = 0;
                     toastr.clear(message.htmlElement, {force: true});
                     toastr.options.hideDuration = hideDuration;
                     this.alertMessages.splice(index, 1);
                  }
               }
            },

            removeAllMessages: function() {
               for (var index = this.alertMessages.length - 1; index >= 0; index--) {
                  var message = this.alertMessages[index];
                  toastr.clear(message.htmlElement);
               }
               this.alertMessages = [];
            },

            getMessagesWithType: function(type) {
               return this.alertMessages.filter(function(message) {
                  return message.type === type;
               });
            }
         };

         return messageService;
      }
   ]);

   return messageServiceModule;
});


define('google-analytics-service', [
   'angular',
   'logger',
   'parameters-manager',
   'routes-handler'
], function(angular, Logger, parametersManager, routesHandler) {
   'use strict';

   var log = Logger.get('googleAnalyticsService');

   var googleAnalyticsServiceModule = angular.module('googleAnalyticsServiceModule', []);

   googleAnalyticsServiceModule.factory('googleAnalyticsService', ['$window', 'locationService', '$rootScope', function($window, locationService, $rootScope) {
      /**
       * Store events that were already sent for each controller.
       * The stored events are reset when a new consulting is started.
       * 
       * @type Array|Array
       */
      var eventsSentForConsulting = [];

      $rootScope.$on('newConsulting', function () {
         eventsSentForConsulting = [];
      });


      var googleAnalyticsService = {
         /**
          * Resets the events sent for the current consulting.
          * Useful for tests.
          */
         resetEventsSentForConsulting: function() {
            eventsSentForConsulting = [];
         },
         
         /**
          * List of Trackers.
          * The parameter googleAnalyticsID, if defined, must be an Array.
          * It's intentionally read each time so tests can change the parameter as needed.
          * 
          * @type Array|Array
          */
         getTrackers: function() {
            var trackers = parametersManager.baseApplicationParameters.googleAnalyticsID;
            if (!(trackers instanceof Array)) {
               trackers = [];
            }

            return trackers;
         },
         
         getPage: function() {
            // full path, in deployment could be something like '/webappdemo/wohnen/amorvergleich/'
            var fullPath = location.pathname;
            // application path, containing only the angular path, for example '/wohnen/amorvergleich/'
            var appPath = locationService.getPath();
            // base path, containing only the first part of the path, without the angular application path, for example '/webappdemo'
            var basePath = fullPath;
            if (appPath !== "/") {
               basePath = basePath.replace(appPath, "");
            }
            // untranslated application path, same as the application path but without translation, for example '/house/amortizationComparison'
            var path = routesHandler.getPathByIdAndLanguage(routesHandler.getId(), 'en');
            // page path, combining the base path and the untranslated application path, for example '/webappdemo/house/amortizationComparison'
            var page = basePath + path;
            // remove whatever double '/' chars that could have resulted
            page = page.replace("//", "/");

            return page;
         },
         
         /**
          * Sends a pageview event.
          */
         sendPageView: function() {
            var page = this.getPage();
            this.getTrackers().forEach(function (analyticsAccount) {
               log.debug("sending pageview event for tracker with name=" + analyticsAccount.name + ", page=" + page);
               $window.ga(analyticsAccount.name + '.set', 'page', page);
               $window.ga(analyticsAccount.name + '.send', 'pageview', { page: page });
            });
         },

         /**
          * Sends an event, using the current controller as eventCategory and the given eventAction.
          * 
          * @param {String} eventAction EventAction to send
          */
         sendEvent: function(eventAction) {
            var page = this.getPage();
            this.getTrackers().forEach(function (analyticsAccount) {
               log.debug("sending event for tracker with name=" + analyticsAccount.name + ", category=" + page + ", action=" + eventAction);
               $window.ga(analyticsAccount.name + '.send', 'event', page, eventAction);
            });
         },

         /**
          * Sends an event, but first checks if the same event was sent before in the current consulting session.
          * If the given eventAction was already sent for the current controller, this event is ignored.
          * If the event is new, it's sent and then stored to avoid sending a similar event later.
          * The stored events are reset when a new consulting is started.
          * 
          * @param {String} eventAction EventAction to send
          */
         sendEventOnceByConsulting: function(eventAction) {
            var page = this.getPage();

            var event = {
               eventCategory: page,
               eventAction: eventAction
            };

            for (var index = 0; index < eventsSentForConsulting.length; index++) {
               var sentEvent = eventsSentForConsulting[index];

               if (sentEvent.eventCategory === event.eventCategory && sentEvent.eventAction === event.eventAction) {
                  return;
               }
            }

            eventsSentForConsulting.push(event);

            this.sendEvent(eventAction);
         }
      };

      return googleAnalyticsService;
   }]);

   return googleAnalyticsServiceModule;
});


define('common-color-tool-set', [
], function() {
   'use strict';

   var colorToolSet = {};
   
   colorToolSet.colorComponentFromStr = function(numStr, percent) {
       var num = Math.max(0, parseInt(numStr, 10));
       return percent ?
           Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
   };

   colorToolSet.rgbToHex = function(rgb) {
      var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
      var hex = "";
      var result = rgbRegex.exec(rgb);
      if (result) {
         var r = colorToolSet.colorComponentFromStr(result[1], result[2]);
         var g = colorToolSet.colorComponentFromStr(result[3], result[4]);
         var b = colorToolSet.colorComponentFromStr(result[5], result[6]);
         hex = "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16);
      }
      return hex;
   };
   
   colorToolSet.hexToRgb = function(hex) {
      var f = hex.substring(0, 3).toUpperCase();
      if (f === "RGB") {
         return hex;
      }
      
      hex = (hex.indexOf("#") === 0) ? hex.substr(1, hex.length) : hex;

      var bigint = parseInt(hex, 16);
      var r = (bigint >> 16) & 255;
      var g = (bigint >> 8) & 255;
      var b = bigint & 255;

      return "RGB(" + r + "," + g + "," + b + ")";
   };
   
   /**
    *  Example Lighten:
    *     shadeColor("#63C6FF", 40);
    *  Example Darken:
    *     shadeColor("#63C6FF", -40);
    */
   colorToolSet.shadeColor = function(color, percent) {
      var R = 0;
      var G = 0;
      var B = 0;
      
      var pref = color.substring(0, 3).toUpperCase();
      if (pref === "RGB") {
         var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
         var result = rgbRegex.exec(color);
         if (result) {
            R = colorToolSet.colorComponentFromStr(result[1], result[2]);
            G = colorToolSet.colorComponentFromStr(result[3], result[4]);
            B = colorToolSet.colorComponentFromStr(result[5], result[6]);
         }
      }
      else {
         var f = parseInt(color.slice(1), 16);
         R = f >> 16;
         G = f >> 8&0x00FF;
         B = f & 0x0000FF;
      }
      
      var t = percent < 0 ? 0 : 255;
      var p = percent < 0 ? percent * -1 : percent;
      p = p / 100.0;
      
      var RR = (Math.round((t - R) * p) + R) * 0x10000;
      var GG = (Math.round((t - G) * p) + G) * 0x100;
      var BB = (Math.round((t - B) * p) + B);
      return "#" + (0x1000000 + RR + GG + BB).toString(16).slice(1);
   };

   return colorToolSet;
});


define('print-service', [
   'angular',
   'logger',
   'parameters-manager',
   'handlebars',
   'common-color-tool-set',
   'swag'
], function(angular, Logger, parametersManager, Handlebars, colorToolSet) {
   'use strict';

   var log = Logger.get('printService');

   var printServiceModule = angular.module('printServiceModule', []);

   printServiceModule.factory('printService', ['localize', '$http', '$q', '$templateCache', 'authenticationService',
      function(localize, $http, $q, $templateCache, authenticationService) {
         var registerHandlebarsHelpers = function() {
            Swag.registerHelpers(Handlebars);

            Handlebars.registerHelper('log', function(value) {
               log.debug(value);
            });

            Handlebars.registerHelper('resolvedEnumDescription', function(enumName, enumOptions, optionValue) {
               return localize.getLocalizedEnumDescriptionByNumber(enumName, optionValue);
            });

            Handlebars.registerHelper('resolvedEnum', function(scope, valueEnumKey, placeholders) {
               var hasDot = false;
               if (typeof valueEnumKey === "string") {
                  hasDot = valueEnumKey.indexOf(".") > -1;
               }

               if (placeholders !== undefined && typeof placeholders === "string") {
                  // uses the flag noEscape:true to avoid double escaping of HTML characters (&nbsp; --> &amp;nbsp;)
                  var template = Handlebars.compile(placeholders, {noEscape: true});
                  var str = template(scope);
                  try {
                     placeholders = JSON.parse(str);
                  }
                  catch (err) {
                     throw new Handlebars.Exception('Error parsing placeholder: ' + str);
                  }
               }

               if (scope.printTemplateEnum === undefined) {
                  if (localize.hasKey("Print." + valueEnumKey)) {
                     return localize.getLocalizedString("Print." + valueEnumKey, placeholders);
                  }
               }

               if (hasDot && localize.hasKey(valueEnumKey)) {
                  return localize.getLocalizedString(valueEnumKey, placeholders);
               }
               else {
                  if (localize.hasKey(scope.printTemplateEnum + "." + valueEnumKey)) {
                     return localize.getLocalizedString(scope.printTemplateEnum + "." + valueEnumKey, placeholders);
                  }
                  else if (localize.hasKey("Print." + valueEnumKey)) {
                     return localize.getLocalizedString("Print." + valueEnumKey, placeholders);
                  }
                  else {
                     throw new Handlebars.Exception('Key ' + valueEnumKey + ' not found.');
                  }
               }
            });

            Handlebars.registerHelper('isNotNull', function(object) {
               return object !== null;
            });

            Handlebars.registerHelper('isNull', function(object) {
               return object === null;
            });

            Handlebars.registerHelper('isDefined', function(object) {
               return object !== undefined;
            });

            Handlebars.registerHelper('length', function(object) {
               return (object !== undefined) ? object.length : 0;
            });

            Handlebars.registerHelper('getActiveLanguageCode', function(boolean) {
               var code = localize.getActiveLanguageCode();
               return code;
            });

            Handlebars.registerHelper('getActiveLanguageDescriptionFromArray', function(array) {
               var activeLanguageCode = localize.getActiveLanguage();
               return (array !== undefined) ? array[activeLanguageCode] : "";
            });

            Handlebars.registerHelper('formatAmount', function(value) {
               var roundedValue = Math.round(value);
               return localize.getLocalizedString('GenericFormats.Amount', {'VALUE': roundedValue, 'DECIMALS': 0});
            });

            Handlebars.registerHelper('formatCurrencyWithSymbol', function(value) {
               var roundedValue = Math.round(value);
               return localize.getLocalizedString('GenericFormats.CurrencyWithSymbol', {'VALUE': roundedValue, 'DECIMALS': 0});
            });

            Handlebars.registerHelper('formatCurrencyWithSymbolWithConcatenatedPercentage', function(currencyValue, percentageValue) {
               var roundedCurrencyValue = Math.round(currencyValue);
               return localize.getLocalizedString('GenericFormats.CurrencyWithSymbolWithConcatenatedPercentage',
                     {'VALUE': roundedCurrencyValue, 'DECIMALS': 0, 'VALUE_PERCENTAGE': percentageValue, 'DECIMALS_PERCENTAGE': 2});
            });

            Handlebars.registerHelper('labelWithConcatenatedPercentage', function(label, percentageValue) {
               return localize.getLocalizedString('GenericFormats.LabelWithConcatenatedPercentage',
                     {'LABEL': label, 'VALUE_PERCENTAGE': percentageValue, 'DECIMALS_PERCENTAGE': 2});
            });

            Handlebars.registerHelper('absValue', function(value) {
               return Math.abs(value);
            });

            Handlebars.registerHelper('negativeValue', function(value) {
               return -value;
            });

            Handlebars.registerHelper('hexToRgb', function(hex) {
               return colorToolSet.hexToRgb(hex);
            });

            Handlebars.registerHelper('getTipTypeIcon', function(type) {
               if (type === FinanceCoachInfoType.INFORMATION) {
                  return "info";
               }
               else if (type === FinanceCoachInfoType.ADVANTAGE) {
                  return "advantage";
               }
               if (type === FinanceCoachInfoType.DISADVANTAGE) {
                  return "disadvantage";
               }
               else if (type === FinanceCoachInfoType.EQUALITY) {
                  return "equality";
               }
               else if (type === FinanceCoachInfoType.CONTACT) {
                  return "contact";
               }
               else if (type === FinanceCoachPrintInfoType.LAW) {
                  return "law";
               }
               else if (type === FinanceCoachPrintInfoType.CONSULTANT) {
                  return "askconsultant";
               }
               else if (type === FinanceCoachPrintInfoType.DATASAFETY) {
                  return "datasafety";
               }
            });

            Handlebars.registerHelper('hideItemIfEmpty', function(hideIfEmpty, values, scope, options) {
               var or = false;
               var template = Handlebars.compile(values);
               values = template(scope).split(",");

               for (var index = 0, l = values.length; index < l; ++index) {
                  var value = values[index].trim();
                  if ((value === true)    ||
                      (Number(value) > 0) ||
                      (isNaN(Number(value)) && value.length > 0)) {
                     or = true;
                     break;
                  }
               }

               if (((hideIfEmpty === true.toString()) && or) || (hideIfEmpty === false.toString() || hideIfEmpty === undefined)) {
                 return options.fn(this);
               }
               else {
                 return options.inverse(this);
               }
            });

            Handlebars.registerHelper('formatTicLabel', function(value) {
               var factor = Math.pow(10, 1);
               var roundedValue = Math.round(value / 1000.0 * factor) / factor;
               return localize.getLocalizedString('GenericFormats.Amount', {'VALUE': roundedValue, 'DECIMALS': 1});
            });

            Handlebars.registerHelper('percentage', function(value, decimalsParam) {
               if (value === undefined || value === null || value.toString().length === 0) {
                  return "";
               }

               var roundedValue = Math.round(value * 100) / 100;
               var decimals = (typeof decimalsParam === "number") ? decimalsParam : 2;
               return localize.getLocalizedString('GenericFormats.Percentage', {'VALUE': roundedValue, 'DECIMALS': decimals});
            });

            Handlebars.registerHelper('integerPercentage', function(value) {
               if (value === undefined || value === null || value.toString().length === 0) {
                  return "";
               }

               var roundedValue = Math.round(value * 100) / 100;
               return localize.getLocalizedString('GenericFormats.Percentage', {'VALUE': roundedValue, 'DECIMALS': 0});
            });

            Handlebars.registerHelper('nextArrayValue', function(array, index) {
               return array[index + 1];
            });

            Handlebars.registerHelper('arrayValue', function(array, index) {
               return array[index];
            });

            Handlebars.registerHelper('multiLineText', function(value) {
               if (value === null || value === undefined || typeof value !== "string") {
                  return value;
               }

               // replace "\n" with html version
               value = value.replace(/\n/g, "<br>");
               return value;
            });

            Handlebars.registerHelper('block-params', function() {
               var args = [];
               var options = arguments[arguments.length - 1];
               for (var i = 0; i < arguments.length - 1; i++) {
                 args.push(arguments[i]);
               }

               return options.fn(this, {data: options.data, blockParams: args});
            });

            /**
             * This Helper function was added to resolve the cases where you have a object with prototype fuctions
             * and use this, for example:
             *  Tips.prototype = {
             *     get: function() {
             *        return this.list;
             *     }
             *  };
             * When you have 'this' inside a prototype function, Handlebars don´t work correctly.
             *
             * @param {Object} obj Object on which the function must be called
             * @param {String} fn Name of the function to call
             */
            Handlebars.registerHelper('callPrototypeFunction', function(obj, fn) {
               return obj[fn]();
            });

         };

         var basicLoadTemplate = function(templateUrl) {
            return $http.get(templateUrl, {cache: $templateCache});
         };

         var registerHandlebarsPartials = function() {
            return $q.all([
               basicLoadTemplate('src/template/print/title-print-template.xml').then(function(filledTemplate) {
                  Handlebars.registerPartial("TitleLocalized", filledTemplate.data);
               }),
               basicLoadTemplate('src/template/print/header-title-print-template.xml').then(function(filledTemplate) {
                  Handlebars.registerPartial("HeaderTitle", filledTemplate.data);
               }),
               basicLoadTemplate('src/template/print/finance-coach-print-template.xml').then(function(filledTemplate) {
                  Handlebars.registerPartial("FinanceCoach", filledTemplate.data);
               }),
               basicLoadTemplate('src/template/print/item-print-template.xml').then(function(filledTemplate) {
                  Handlebars.registerPartial("Item", filledTemplate.data);
               }),
               basicLoadTemplate('src/template/print/tips-print-template.xml').then(function(filledTemplate) {
                  Handlebars.registerPartial("Tips", filledTemplate.data);
               }),
               basicLoadTemplate('src/template/print/serie-items-print-template.xml').then(function(filledTemplate) {
                  Handlebars.registerPartial("SerieItems", filledTemplate.data);
               }),
               basicLoadTemplate('src/template/print/y-axis-print-template.xml').then(function(filledTemplate) {
                  Handlebars.registerPartial("YAxis", filledTemplate.data);
               }),
               basicLoadTemplate('src/template/print/x-axis-print-template.xml').then(function(filledTemplate) {
                  Handlebars.registerPartial("XAxis", filledTemplate.data);
               }),
               basicLoadTemplate('src/template/print/event-list-print-template.xml').then(function(filledTemplate) {
                  Handlebars.registerPartial("EventList", filledTemplate.data);
               }),
               basicLoadTemplate('src/template/print/additional-printing-data.xml').then(function(filledTemplate) {
                  Handlebars.registerPartial("AdditionalPrintingData", filledTemplate.data);
               })
            ]);
         };

         var initialize = function() {
            registerHandlebarsHelpers();
            return registerHandlebarsPartials();
         };

         var initialized = false;

         var printService = {
            registerTemplate: function(templateName, path) {
               basicLoadTemplate(path).then(function(filledTemplate) {
                  Handlebars.registerPartial(templateName, filledTemplate.data);
               });
            },
            print: function(templateString, printTemplateName, $scope, outputFileName, outputDirKey) {
               var initializePromise;
               if (initialized) {
                  initializePromise = $q.when();
               }
               else {
                  initializePromise = initialize().then(function() {
                     initialized = true;
                  });
               }

               return initializePromise.then(function() {
                  var deferred = $q.defer();
                  var filledTemplate;

                  try {
                     var template = Handlebars.compile(templateString);
                     filledTemplate = template($scope);
                  }
                  catch (err) {
                     log.error("Handlbars error: " + err);
                     deferred.reject({status: PrintServiceResultStatus.PREPARATIONERROR});
                     return deferred.promise;
                  }

                  $http({
                     timeout: parametersManager.baseApplicationParameters.httpTimeout,
                     method: 'POST',
                     url: parametersManager.baseApplicationParameters.printServiceURL + "/getPrint",
                     params: {
                        printTemplateName: printTemplateName,
                        printDocName: parametersManager.baseApplicationParameters.printDocName,
                        customization: parametersManager.baseApplicationParameters.printCustomization,
                        userId: authenticationService.getUserLogged(),
                        fileOutputName: outputFileName,
                        keyPrefixOutputDir: outputDirKey
                     },
                     responseType: 'arraybuffer',
                     cache: false,
                     headers: {
                       'Content-Type': 'text/xml; charset=utf-8'
                     },
                     data: filledTemplate
                  }).success(function(data, status, headers, config) {
                     // check for "no content" status
                     if (status === 204) {
                        deferred.reject({status: PrintServiceResultStatus.NOCONTENT});
                        return;
                     }

                     // check for empty response
                     if (data.byteLength === 0) {
                        deferred.reject({status: PrintServiceResultStatus.NOCONTENT});
                        return;
                     }

                     var contentBlob = new Blob([data], {type: 'application/pdf'});
                     deferred.resolve({status: PrintServiceResultStatus.OK, content: contentBlob});
                  }).error(function(data, status, headers, config) {
                     deferred.reject({status: PrintServiceResultStatus.SERVERERROR});
                  });

                  return deferred.promise;
               });
            }
         };

         return printService;
      }
   ]);

   return printServiceModule;
});


define('file-service', [
   'angular',
   'logger',
   'parameters-manager',
   'handlebars',
   'common-color-tool-set',
   'swag'
], function(angular, Logger, parametersManager, Handlebars, colorToolSet) {
   'use strict';

   var log = Logger.get('fileService');

   var fileServiceModule = angular.module('fileServiceModule', []);

   fileServiceModule.factory('fileService', ['localize', '$http', '$q', '$templateCache',
      function(localize, $http, $q, $templateCache) {
         var registerHandlebarsHelpers = function() {
            Swag.registerHelpers(Handlebars);

            Handlebars.registerHelper('fs-multiLineText', function(value) {
               if (value === null || value === undefined || typeof value !== "string") {
                  return value;
               }

               // replace "\n" with html version
               value = value.replace(/\n/g, "<br>");
               return value;
            });
         };

         var basicLoadTemplate = function(templateUrl) {
            return $http.get(templateUrl, {cache: $templateCache});
         };

         var initialize = function() {
            registerHandlebarsHelpers();
         };

         var initialized = false;

         var fileService = {
            registerTemplate: function(templateName, path) {
               basicLoadTemplate(path).then(function(filledTemplate) {
                  Handlebars.registerPartial(templateName, filledTemplate.data);
               });
            },
            saveCSV: function(data, outputFileName, outputFileEncoding, outputDirKey) {
               if (!initialized) {
                  initialize();
                  initialized = true;
               }

               var deferred = $q.defer();

               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'POST',
                  url: parametersManager.baseApplicationParameters.fileServiceURL + "/save",
                  params: {
                     fileOutputName: outputFileName,
                     fileOutputEncoding: outputFileEncoding,
                     keyPrefixOutputDir: outputDirKey
                  },
                  responseType: 'arraybuffer',
                  cache: false,
                  headers: {
                     'Content-Type': 'text/xml; charset=utf-8'
                  },
                  data: data
               }).success(function(data, status, headers, config) {
                  deferred.resolve({status: FileServiceResultStatus.OK});
               }).error(function(data, status, headers, config) {
                  deferred.reject({status: FileServiceResultStatus.SERVERERROR});
               });

               return deferred.promise;
            },
            save: function(templateString, $scope, outputFileName, outputFileEncoding, outputDirKey) {
               if (!initialized) {
                  initialize();
                  initialized = true;
               }

               var deferred = $q.defer();
               var filledTemplate;

               try {
                  var template = Handlebars.compile(templateString);
                  filledTemplate = template($scope);
               }
               catch (err) {
                  log.error("Handlbars error: " + err);
                  deferred.reject({status: FileServiceResultStatus.PREPARATIONERROR});
                  return deferred.promise;
               }

               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'POST',
                  url: parametersManager.baseApplicationParameters.fileServiceURL + "/save",
                  params: {
                     fileOutputName: outputFileName,
                     fileOutputEncoding: outputFileEncoding,
                     keyPrefixOutputDir: outputDirKey
                  },
                  responseType: 'arraybuffer',
                  cache: false,
                  headers: {
                     'Content-Type': 'text/xml; charset=utf-8'
                  },
                  data: filledTemplate
               }).success(function(data, status, headers, config) {
                  deferred.resolve({status: FileServiceResultStatus.OK});
               }).error(function(data, status, headers, config) {
                  deferred.reject({status: FileServiceResultStatus.SERVERERROR});
               });

               return deferred.promise;
            },
            packageFileList: function(fileNames, outputFileName, outputDirKey) {
               if (!initialized) {
                  initialize();
                  initialized = true;
               }

               var deferred = $q.defer();

               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'POST',
                  url: parametersManager.baseApplicationParameters.fileServiceURL + "/packageFileList",
                  params: {
                     fileOutputName: outputFileName,
                     keyPrefixOutputDir: outputDirKey
                  },
                  responseType: 'arraybuffer',
                  cache: false,
                  headers: {
                     'Content-Type': 'application/json; charset=utf-8'
                  },
                  data: JSON.stringify(fileNames)
               }).success(function(data, status, headers, config) {
                  deferred.resolve({status: FileServiceResultStatus.OK});
               }).error(function(data, status, headers, config) {
                  deferred.reject({status: FileServiceResultStatus.SERVERERROR});
               });

               return deferred.promise;
            }
         };

         return fileService;
      }
   ]);

   return fileServiceModule;
});


define('product-list-service', [
   'angular',
   'logger',
   'parameters-manager',
   'common-object-utilities'
], function(angular, Logger, parametersManager, ObjectUtilities) {
   'use strict';

   var log = Logger.get('productListService');
   var objectUtilities = new ObjectUtilities();

   var productListServiceModule = angular.module('productListServiceModule', []);

   productListServiceModule.factory('productListService', ['$http', '$q',
      function($http, $q) {
         var productListService = {
            requestsArray: [],
            deferredArray: [],
            getServiceURL: function() {
               return parametersManager.baseApplicationParameters.productListServiceURL + '/' +
                      parametersManager.baseApplicationParameters.productListCustomization;
            },

            getProductList: function(id) {
               log.debug("getProductList called");
               if (parametersManager.baseApplicationParameters.productListServiceURL) {
                  return this.getServerProductList(id);
               }
               else {
                  return this.getLocalProductList(id);
               }
            },
            
            getLocalProductList: function(id) {
               var deferred = $q.defer();
               var productList = JSON.parse(JSON.stringify(parametersManager.baseModelParameters[id]));
               protect(productList);
               deferred.resolve({status: 0, list: productList});
               return deferred.promise;
            },
            getServerProductList: function(id) {
               var deferred = $q.defer();
               var url = this.getServiceURL() + '/getProductList?id=' + id;
               var that = this;
               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'GET',
                  url: url,
                  responseType: 'json',
                  cache: true,
                  headers: {
                     'Content-Type': 'application/json; charset=utf-8'
                  }
               }).success(function(data, status, headers, config) {
                  var productList = data.response;
                  protect(productList);
                  deferred.resolve({status: 0, list: productList});
               }).error(function(data, status, headers, config) {
                  if (status === 404 || status === -1) { //Not Found or communication problem
                     return that.getLocalProductList(id).then(function(object) {
                        deferred.resolve({status: status, list: object.list});
                     });
                  }
                  deferred.reject({status: status});
               });
               
               return deferred.promise;
            },
            
            getSelectedOptionFromCode: function(options, code) {
               var optionsByCode = options.filter(function(option) {
                  return option.code === code;
               });

               if (optionsByCode.length > 0) {
                  return optionsByCode[0];
               }
               else {
                  return null;
               }
            },
            
            getInitializeOptionsAndSelected: function(options, defaultCode, selected, emptyElement) {
               if (options.length > 0) {
                  if (selected !== null && selected !== undefined) {
                     selected = this.getSelectedOptionFromCode(options, selected.code);
                  }

                  if (selected === null || selected === undefined) {
                     var defaultOptions = options.filter(function(option) {
                        return option.code === defaultCode;
                     });

                     if (defaultOptions.length > 0) {
                        selected = defaultOptions[0];
                     }
                     else {
                        selected = options[0];
                     }
                  }
               }
               else { //the list is empty
                  options = [emptyElement];
                  selected = emptyElement;
               }

               return {
                  options: options,
                  selected: selected
               };
            }
         };

         return productListService;
      }
   ]);

   function protect(productList) {
      var item;
      if (Array.isArray(productList)) {
         for (var index = 0; index < productList.length; index++) {
            item = productList[index];
            //TODO: this is needed when using the product list inside an ng-options tag
            //      (for an example, see list-selection-field.html)
            item.$$hashKey = "";
            if (item !== null && typeof item === 'object') {
               protect(item);
            }
         }
      }
      else {
         Object.preventExtensions(productList);
         for (var itemName in productList) {
            item = productList[itemName];
            if (item !== null && typeof item === 'object') {
               protect(item);
            }
         }
      }
   }

   return productListServiceModule;
});


define('zip-and-location-service', [
   'angular',
   'logger',
   'common-object-utilities',
   'parameters-manager',
   'calculator-service'
], function(angular, Logger, ObjectUtilities, parametersManager) {
   'use strict';

   var log = Logger.get('ZipAndLocationService');
   var asynchLog = Logger.get('AsynchronousModeProfile');
   var objectUtilities = new ObjectUtilities();

   var zipAndLocationServiceModule = angular.module('zipAndLocationServiceModule', []);

   zipAndLocationServiceModule.factory('zipAndLocationService', ['calculatorService', '$q', 'localize', function(calculatorService, $q, localize) {
      var getActiveLanguageCode = function() {
         var lan = localize.getActiveLanguage().toUpperCase();
         //0=all, 1=german, 2=ital., 3=french
         if (lan === 'DE') {
            return 1;
         }
         if (lan === 'FR') {
            return 2;
         }
         if (lan === 'IT') {
            return 3;
         }
         return 0;
      };
      
      var getActiveCountryCode = function() {
         if (localize.isCountryCh()) {
            return 756;
         }
         if (localize.isCountryLi()) {
            return 438;
         }
         return 0;//all
      };

      var sendRequest = function(request) {
         if (request === undefined) {
            var deferred = $q.defer();
            deferred.resolve([]);
            return deferred.promise;
         }
         return calculatorService.sendRequest(request).then(function(taxLocations) {
            return normalizeResults(taxLocations[0].response);
         });
      };

      var normalizeResults = function(locations) {
         var index;
         for (index = 0; index < locations.length; index++) {
            locations[index].zipAndLocation = locations[index].zip + ' ' + locations[index].city;
            objectUtilities.protect(locations[index]);
         }
         return locations;
      };

      var getCountryCodeForSearch = function(searchByCountry) {
         if (searchByCountry === undefined) {
            searchByCountry = true;
         }

         var countryCode;
         if (searchByCountry) {
            countryCode = getActiveCountryCode();
         }
         else {
            countryCode = undefined;
         }

         return countryCode;
      };

      var getMoreImportanLocationByLanguage = function(locations) {
         var taxLocations = normalizeResults(locations);
         if (taxLocations.length > 0) {
            return taxLocations[0];
         }
         else {
            return null;
         }
      };

      var getMoreImportantLocation = function(locations) {
         var index;
         for (index = 0; index < locations.length; index++) {
            asynchLog.debug("ZipAndLocationService - searchMoreImportantLocationPromise - locations " + index + " : " + JSON.stringify(locations[index]));
         }
         var taxLocations = normalizeResults(locations);
         for (index = 0; index < taxLocations.length; index++) {
            asynchLog.debug("ZipAndLocationService - searchMoreImportantLocationPromise - taxLocations " + index + " : " + JSON.stringify(taxLocations[index]));
         }
         if (taxLocations.length > 0) {
            var minTaxLocalityID = 999999999;
            var moreImportantLocation = null;
            for (index = 0; index < taxLocations.length; index++) {
               var taxLocation = taxLocations[index];

               if (taxLocation.id < minTaxLocalityID) {
                  minTaxLocalityID = taxLocation.id;
                  moreImportantLocation = taxLocation;
               }
            }
            return moreImportantLocation;
         }
         else {
            return null;
         }
      };

      var zipAndLocationService = {
         searchLocations: function(query, searchByCountry) {
            if (query === "") {
               return;
            }

            var request = {
               calculatorName: 'ch.logismata.rpopulaires.calc',
               calculationName: 'searchLocations',
               calculationParameters: [query, getActiveLanguageCode(), getCountryCodeForSearch(searchByCountry)]
            };
            return sendRequest(request);
         },

         searchLocationsAround: function(lat, log, topN, searchByCountry) {
            var request = {
               calculatorName: 'ch.logismata.rpopulaires.calc',
               calculationName: 'searchLocationsAround',
               calculationParameters: [lat, log, topN, getActiveLanguageCode(), getCountryCodeForSearch(searchByCountry)]
            };
            return sendRequest(request);
         },
                
         getActiveCountryLocationDefault : function() {
            return parametersManager.baseModelParameters.locationDefault[localize.getActiveCountry().toLowerCase()];
         },

         getActiveCountryLocationChangeDefault : function() {
            return parametersManager.baseModelParameters.locationChangeDefault[localize.getActiveCountry().toLowerCase()];
         },

         searchMoreImportantLocationPromise : function(query, searchByCountry) {
            if (query === "") {
               return $q.when(null);
            }

            var request = {
               calculatorName: 'ch.logismata.rpopulaires.calc',
               calculationName: 'searchLocations',
               calculationParameters: [query, getActiveLanguageCode(), getCountryCodeForSearch(searchByCountry)]
            };
            return calculatorService.addRequest(request).then(function(locations) {
               return getMoreImportanLocationByLanguage(locations);
            });
         },

         searchMoreImportantLocation: function(query, searchByCountry) {
            if (query === "") {
               return;
            }

            var request = {
               calculatorName: 'ch.logismata.rpopulaires.calc',
               calculationName: 'searchLocations',
               calculationParameters: [query, getActiveLanguageCode(), getCountryCodeForSearch(searchByCountry)]
            };
            return sendRequest(request).then(function(locations) {
               return getMoreImportantLocation(locations);
            });
         }
      };

      return zipAndLocationService;
   }]);

   return zipAndLocationServiceModule;
});


define('basket-service', [
   'angular',
   'logger'
], function(angular, Logger) {
   'use strict';
   var log = Logger.get('basketService');

   var basketServiceModule = angular.module('basketServiceModule', []);

   basketServiceModule.factory('basketService', [
      function() {
         var items = {};
         var basketService = {
            containsItem: function(attributeName) {
               return items.hasOwnProperty(attributeName);
            },
            addItem: function(attributeName, value) {
               items[attributeName] = value;
            },
            getItem: function(attributeName) {
               var item = null;
               if (this.containsItem(attributeName)) {
                  item = items[attributeName];
               }
               return item;
            },
            consumeItem: function(attributeName) {
               var item = null;
               if (this.containsItem(attributeName)) {
                  item = items[attributeName];
                  delete items[attributeName];
               }
               return item;
            },
            clear: function() {
               items = {};
            }
         };
         return basketService;
      }
   ]);

   return basketServiceModule;
});


define('media-service', [
   'angular',
   'logger',
   'parameters-manager'
], function(angular, Logger, parametersManager) {
   'use strict';

   var log = Logger.get('mediaService');

   var mediaServiceModule = angular.module('mediaServiceModule', []);

   mediaServiceModule.factory('mediaService', ['$http', '$q',
      function($http, $q) {
         var mediaService = {
            getServiceURL: function() {
               return parametersManager.baseApplicationParameters.mediaServiceURL + '/' +
                      parametersManager.baseApplicationParameters.mediaCustomization;
            },
            getMedia: function(user) {
               var deferred = $q.defer();

               var url = this.getServiceURL() + "/getMedia";

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
                     userId: user
                  }
               }).success(function(data, status, headers, config) {
                  deferred.resolve({status: MediaServiceGetResultStatus.SUCCEEDED, data: data.media });
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;
                  if (status === 404) {
                     resultStatus = MediaServiceGetResultStatus.MEDIANOTFOUND;
                  }
                  else if (status === 400) {
                     resultStatus = MediaServiceGetResultStatus.FAILED;
                  }
                  deferred.reject({status: resultStatus});
               });
               return deferred.promise;
            },
            updateMedia: function(userId, fileName, image) {
               var deferred = $q.defer();

               var url = this.getServiceURL() + "/updateMedia";
               
               var media = {userId: userId, fileName: fileName, image: image};

               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'PUT',
                  url: url,
                  responseType: 'json',
                  cache: false,
                  headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                  },
                  data: {
                     media: media
                  }
               }).success(function(data, status, headers, config) {
                  deferred.resolve({status: MediaServiceUpdateResultStatus.SUCCEEDED});
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;
                  if (status === 404) {
                     resultStatus = MediaServiceUpdateResultStatus.USERNOTFOUND;
                  }
                  else {
                     resultStatus = MediaServiceUpdateResultStatus.FAILED;
                  }
                  deferred.reject({status: resultStatus});
               });
               return deferred.promise;
            }
         };

         return mediaService;
      }
   ]);
   return mediaServiceModule;
});


define('statistics-service', [
   'angular',
   'logger',
   'parameters-manager',
   'authentication-service'
], function(angular, Logger, parametersManager) {
   'use strict';

   var log = Logger.get('statisticsService');

   var statisticsServiceModule = angular.module('statisticsServiceModule', []);

   statisticsServiceModule.factory('statisticsService', ['$http', '$q', 'authenticationService',
      function($http, $q, authenticationService) {
         var statisticsService = {
            getServiceURL: function() {
               return parametersManager.baseApplicationParameters.statisticsServiceURL + '/' +
                      parametersManager.baseApplicationParameters.statisticsCustomization;
            },
            logStatistic: function(event, statistics) {
               var deferred = $q.defer();

               var url = this.getServiceURL() + "/insertStatistic";

               statistics.event = event;
               
               $http({
                  timeout: parametersManager.baseApplicationParameters.httpTimeout,
                  method: 'PUT',
                  url: url,
                  responseType: 'json',
                  cache: false,
                  headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                  },
                  data: {
                     statistics: statistics
                  }
               }).success(function(data, status, headers, config) {
                  deferred.resolve({status: StatisticsServiceInsertStatisticResultStatus.SUCCEEDED});
               })
               .error(function(data, status, headers, config) {
                  var resultStatus;
                  if (status === 400) {
                     resultStatus = StatisticsServiceInsertStatisticResultStatus.FAILED;
                  }
                  deferred.reject({status: resultStatus});
               });
               return deferred.promise;
            }
         };

         return statisticsService;
      }
   ]);
   return statisticsServiceModule;
});


define('log-statistics-service', [
   'angular',
   'logger',
   'parameters-manager',
   'google-analytics-service',
   'statistics-service'
], function(angular, Logger, parametersManager) {
   'use strict';

   var log = Logger.get('logStatisticsService');

   var logStatisticsServiceModule = angular.module('logStatisticsServiceModule', []);

   logStatisticsServiceModule.factory('logStatisticsService', ['statisticsService', 'googleAnalyticsService',
      function(statisticsService, googleAnalyticsService) {
         var logStatisticsService = {
            sendEvent: function(eventAction, statistics) {
               googleAnalyticsService.sendEvent(eventAction);
               if (parametersManager.baseApplicationParameters.consultantMode) {
                  statisticsService.logStatistic(eventAction, statistics);
               }
            },
            
            sendEventOnceByConsulting: function(eventAction, statistics) {
               googleAnalyticsService.sendEventOnceByConsulting(eventAction);
               if (parametersManager.baseApplicationParameters.consultantMode) {
                  statisticsService.logStatistic(eventAction, statistics);
               }
            }
         };

         return logStatisticsService;
      }
   ]);
   return logStatisticsServiceModule;
});


define('location-service', [
   'angular',
   'logger'
], function(angular, Logger) {
   'use strict';

   var log = Logger.get('locationService');

   var locationServiceModule = angular.module('locationServiceModule', []);

   locationServiceModule.factory('locationService', ['$location',
      function($location) {
         var angularLocationService = $location;

         var locationService = {
            absUrl: function() {
               return angularLocationService.absUrl();
            },
            getUrl: function() {
               return angularLocationService.url();
            },
            setUrl: function(url) {
               angularLocationService.url(url);

               // check for iframe
               if (window.parent !== window) {
                  // in case of iframe, avoid generating browser history
                  angularLocationService.replace();
               }

               return this;
            },
            protocol: function() {
               return angularLocationService.protocol();
            },
            host: function() {
               return angularLocationService.host();
            },
            port: function() {
               return angularLocationService.port();
            },
            getPath: function() {
               return angularLocationService.path();
            },
            setPath: function(path) {
               angularLocationService.path(path);

               // check for iframe
               if (window.parent !== window) {
                  // in case of iframe, avoid generating browser history
                  angularLocationService.replace();
               }

               return this;
            },
            getSearch: function() {
               return angularLocationService.search();
            },
            setSearch: function(search, paramValue) {
               if (paramValue) {
                  angularLocationService.search(search, paramValue);
               }
               else {
                  angularLocationService.search(search);
               }

               // check for iframe
               if (window.parent !== window) {
                  // in case of iframe, avoid generating browser history
                  angularLocationService.replace();
               }

               return this;
            },
            getHash: function() {
               return angularLocationService.hash();
            },
            setHash: function(hash) {
               angularLocationService.hash(hash);
               return this;
            },
            replace: function() {
               angularLocationService.replace();
               return this;
            },
            getState: function() {
               return angularLocationService.state();
            },
            setState: function(state) {
               angularLocationService.state(state);
               return this;
            },
            clearSearch: function() {
               this.setSearch({});
            }
         };

         return locationService;
      }
   ]);
   return locationServiceModule;
});


define('tab-selector', [
], function() {
   'use strict';

   return function(app) {
      return app.component('tabSelector', {
         transclude: true,
         bindings: {
         },
         templateUrl: 'src/directives/tab-selector/tab-selector.html',
         controller: ['$timeout', function($timeout) {
         }]
      });
   };

});


define('tab-selector-link', [
], function() {
   'use strict';

   return function(app) {
      return app.component('tabSelectorLink', {
         bindings: {
            id: '@',
            title: '@',
            isSelected: '&',
            onSelected: '&'
         },
         templateUrl: 'src/directives/tab-selector-link/tab-selector-link.html',
         controller: ['$timeout', function($timeout) {
            var that = this;

            if (that.id !== undefined && that.id.length > 0) {
               that.fieldId = that.id.replace(/\./g, '_');
            }
            else {
               that.fieldId = "";
            }
            that.fieldId += "TabSelectorLink";

         }]
      });
   };

});


define('topic-chooser', [
], function() {
   'use strict';

   return function(app) {
      return app.component('topicChooser', {
         transclude: true,
         bindings: {
            collapsedLabel: '@',
            showTopicContent: '=',
            chooserId: '@'
         },
         templateUrl: 'src/directives/topic-chooser/topic-chooser.html',
         controller: ['$timeout', function($timeout) {
            this.has4VisibleLinks = function() {
               var chooser = document.getElementById(this.chooserId + "TopicChooser");
               if (chooser !== null) {
                  var links = chooser.getElementsByTagName("topic-link");
                  var visibleLinks = [];
                  
                  for (var i = 0 ; i < links.length; i++) {
                     if (links[i].firstElementChild !== null) {
                        visibleLinks.push(links[i]);
                     }
                  }
                  return visibleLinks.length === 4;
               }
               else {
                  return false;
               }
            };
         }]
      });
   };

});


define('topic-link', [
], function() {
   'use strict';

   return function(app) {
      return app.component('topicLink', {
         bindings: {
            topicId: '@',
            collapsedLabel: '@',
            expandedLabel: '@',
            titleLabel: '@',
            descriptionLabel: '@',
            selectedClass: '@',
            unselectedClass: '@',
            available: '=?',
            showTopicContent: '=?',
            isSelected: '&',
            onSelected: '&'
         },
         templateUrl: 'src/directives/topic-link/topic-link.html',
         controller: ['$timeout', function($timeout) {
            var that = this;
            
            if (that.showTopicContent === undefined) {
               that.showTopicContent = true;
            }                   
            if (that.available === undefined) {
               that.available = true;
            }

            if (that.topicId !== undefined && that.topicId.length > 0) {
               that.fieldId = that.topicId.replace(/\./g, '_');
            }
            else {
               that.fieldId = "TopicLink";
            }
            that.collapsedId = "home" + that.fieldId.charAt(0).toUpperCase() + that.fieldId.slice(1);
            that.linkId = that.fieldId;

            that.onClicked = function() {
               that.showTopicContent = true;
               that.onSelected();
            };

         }]
      });
   };

});


define('topic-panel', [
], function() {
   'use strict';

   return function(app) {
      return app.component('topicPanel', {
         transclude: true,
         bindings: {
            title: '@',
            footer: '@',
            showBallonSeparator: '='
         },
         templateUrl: 'src/directives/topic-panel/topic-panel.html',
         controller: ['$timeout', function($timeout) {
         }]
      });
   };

});


define('common-donut-chart', [
   'base-chart',
   'logger'
], function(BaseChart, Logger) {

   var log = Logger.get('DonutChart');

   var DonutChart = function() {
      this.create = function(id, currencyFormatter) {
         log.debug("Creating donut chart for " + id);
         var chart = new BaseChart().createChart(id, currencyFormatter);

         //Setup as donut chart
         chart.options = {
            series: {
               pie: {
                  radius: 0.99,
                  innerRadius: 0.74,
                  label:{show: false},
                  show: true,
                  offset:{left:0}
               }
            },
            legend: {
                show: false
            }
         };

         chart.addSet = function(label, color, number, order) {
            var set = {
               label: label,
               data: number,
               color: color,
               order: order
            };
            
            if (order) {
               this.animator.setSortSets(true);
               this.animator.sortAtEachStep = true;
            }
            
            this.sets.push(set);
         };

         //
         // DELEGATE METHODS FOR CHART ANIMATOR
         //

         chart.createDrawObjectForCurrentState = function() {
            return { xychart: false,
                     previousSets: $.extend(true, [], this.previousSets),
                     newSets: $.extend(true, [], this.sets),
                     previousColumns: 0,
                     columns: 0,
                     maintainScale : true
                   };
         };

         chart.createPlot = function(sets) {
            return $.plot(this.id, sets, this.options);
         };

         return chart;
      };
   };
   
   return DonutChart;
});


define('donut-graph', [
   'parameters-manager',
   'logger',
   'common-donut-chart',
   'common-currency-formatter'
], function(parametersManager, Logger, DonutChart, CurrencyFormatter) {
   'use strict';

   /**
    * Donut Graph
    * 
    * Specific functions expected to be defined in the bridge:
    * 
    * - updateChart(donutChart): should add the desired sets, with values and colors.
    * 
    * @param {type} app
    * @returns {unresolved}
    */

   var log = Logger.get('DonutGraph');

   return function(app) {
      return app.component('donutGraph', {
         bindings: {
            id: '@',
            bridge: '=',
            size: '@', //small, medium [optional]
            innerText: '@',
            secondaryText: '@'
         },
         templateUrl: 'src/directives/graphs/donut-graph/donut-graph.html',
         controller: [function() {
            log.debug("START DONUT GRAPH");

            var that = this;

            if (that.id !== undefined && that.id.length > 0) {
               that.fieldId = that.id.replace(/\./g, '_');
            }
            else {
               that.fieldId = "";
            }

            that.canvasId = that.fieldId + "DonutCanvas";

            that.bridge.update = function() {
               log.debug("UPDATE: " + that.canvasId);
               that.refreshHandler.update();
            };

            that.bridge.forceDraw = function() {
               log.debug("FORCE DRAW: " + that.canvasId);
               that.refreshHandler.forceDraw();
            };

            that.bridge.getVisibleRefreshHandlers = function() {
               return [that.refreshHandler];
            };

            that.getDonutChart = function() {
               if (!that.donutChart) {
                  that.donutChart = new DonutChart().create(
                     that.canvasId,
                     new CurrencyFormatter(parametersManager.baseViewParameters.groupDelimiter,
                                           parametersManager.baseViewParameters.amountDecimalDelimiter,
                                           parametersManager.baseViewParameters.useMixedGroupingSeparator));
               }
               return that.donutChart;
            };
            
            that.getSizeClass = function() {
               if (that.size === undefined || that.size === "") {
                  return "";
               }

               return "donut-graph__canvas--" + that.size;
            };

            that.getInnerTextClass = function() {
               var size = that.size;
               if (that.size === undefined || that.size === "") {
                  size = "medium";
               }

               return "donut-graph__text--" + size;
            };

            that.getInnerSecondaryTextClass = function() {
               var size = that.size;
               if (that.size === undefined || that.size === "") {
                  size = "medium";
               }

               return "donut-graph__secondary-text--" + size;
            };

            var updater = that.bridge.createChartUpdater(that.getDonutChart(), function(donutChart) {
               donutChart.clearSets();
               that.bridge.updateChart(donutChart);
            });
            that.refreshHandler = that.bridge.createRefreshHandler(that.canvasId, updater);

         }]
      });
   };

});


define('common-series-utilities', [
   'logger',
   'common-object-utilities'
], function(Logger, ObjectUtilities) {
   'use strict';

   var log = Logger.get('SeriesUtilities');
   var detailLog = Logger.get('SeriesUtilitiesDetail');

   var SeriesUtilities = function(asSteps) {
      this.asSteps = asSteps;
   };

   SeriesUtilities.prototype.getSetsFromSeries = function(series, addZeroSets) {
      var sets = [];
      var set;
      var serie;

      addZeroSets = addZeroSets === undefined ? true : addZeroSets;

      for (var index = 0; index < series.length; index++) {
         serie = series[index];
         set = createSetFromSerie(serie, this.asSteps);
         sets.push(set);
         if (addZeroSets) {
            sets.push(createZeroSet(serie.values.length));
         }
      }

      return sets;
   };

   SeriesUtilities.prototype.normalizeSets = function(sets) {
      var targetSets = [];
      var set;

      for (var index = 0; index < sets.length; index++) {
         set = sets[index];
         targetSets.push(set);
         targetSets.push(createZeroSetFromSet(set));
      }

      return targetSets;
   };

   SeriesUtilities.prototype.getWrapperSetsFromSeries = function(series) {
      var sets = [];
      var set;
      var serie;

      for (var index = 0; index < series.length; index++) {
         serie = series[index];
         set = createWrapperSetFromSerie(serie, this.asSteps);
         sets.push(set);
      }

      return sets;
   };

   SeriesUtilities.prototype.getSetsFromWrapperSets = function(wrapperSets) {
      var sets = [];
      var set;
      var wrapperSet;

      for (var index = 0; index < wrapperSets.length; index++) {
         wrapperSet = wrapperSets[index];
         set = createSetFromWrapperSet(wrapperSet, this.asSteps);
         sets.push(set);
         sets.push(createZeroSet(wrapperSet.data.length));
      }

      return sets;
   };

   SeriesUtilities.prototype.translateSeries = function(series, sourceTimePeriods, targetTimePeriods) {
      detailLog.debug("--------------------------------------------------------------------------------------");
      detailLog.debug("TRANSLATING PREVIOUS SERIES");
      detailLog.debug("");
      var originalRepresentationList = buildRepresentationList(sourceTimePeriods);
      var targetRepresentationList = buildRepresentationList(targetTimePeriods);

      var translatedPreviousSeries = [];
      var targetRepresentation;

      for (var serieIndex = 0; serieIndex < series.length; serieIndex++) {
         var serie = series[serieIndex];
         var translatedSerie = { name: serie.name, order: serie.order, color: serie.color, isLine: serie.isLine, lineThickness: serie.lineThickness, values: [] };

         detailLog.debug("TRANSLATING SERIE" + serie.order);
         ////
         for (var serieValuesIndex = 0; serieValuesIndex < serie.values.length; serieValuesIndex++) {
            var serieValuesItem = serie.values[serieValuesIndex];
            detailLog.debug("        " + serieValuesIndex + ": " + JSON.stringify(serieValuesItem));
         }
         ////

         for (var targetRepresentationIndex = 0; targetRepresentationIndex < targetRepresentationList.length; targetRepresentationIndex++) {
            targetRepresentation = targetRepresentationList[targetRepresentationIndex];

            var translatedSerieItem = generateTranslatedSerieItem(targetRepresentation, originalRepresentationList, serie);
            translatedSerie.values.push(translatedSerieItem);
         }

         translatedPreviousSeries.push(translatedSerie);

         detailLog.debug("Original: " + JSON.stringify(serie));
         detailLog.debug("Translated: " + JSON.stringify(translatedSerie));
         detailLog.debug("");
      }
      
      return translatedPreviousSeries;
   };

   SeriesUtilities.prototype.hasSerieNullValues = function(serie) {
      var serieWithNulls = false;
      for (var dataIndex = 0; dataIndex < serie.values.length; dataIndex++) {
         if (serie.values[dataIndex].begin === null || serie.values[dataIndex].end === null) {
            serieWithNulls = true;
            break;
         }
      }
      return serieWithNulls;
   };

   SeriesUtilities.prototype.getMaxSerieValue = function(series) {
      var max = 0;

      for (var valueIndex = 0; valueIndex < series[0].values.length; valueIndex++) {
         var accumulatedBegin = 0;
         var accumulatedEnd = 0;
         var serieIndex;
         var serie;

         for (serieIndex = 0; serieIndex < series.length; serieIndex++) {
            serie = series[serieIndex];

            if (!serie.isLine) {
               accumulatedBegin += serie.values[valueIndex].begin;
               accumulatedEnd += serie.values[valueIndex].end;
            }
         }

         if (accumulatedBegin > max) {
            max = accumulatedBegin;
         }

         if (accumulatedEnd > max) {
            max = accumulatedEnd;
         }

         for (serieIndex = 0; serieIndex < series.length; serieIndex++) {
            serie = series[serieIndex];

            if (serie.isLine) {
               if (serie.values[valueIndex].begin > max) {
                  max = serie.values[valueIndex].begin;
               }

               if (serie.values[valueIndex].end > max) {
                  max = serie.values[valueIndex].end;
               }
            }
         }
      }

      return max;
   };
   
   SeriesUtilities.prototype.getMinSerieValue = function(series) {
      var min = 0;
      
      for (var valueIndex = 0; valueIndex < series[0].values.length; valueIndex++) {
         var accumulatedBegin = 0;
         var accumulatedEnd = 0;
         var serieIndex;
         var serie;
         
         for (serieIndex = 0; serieIndex < series.length; serieIndex++) {
            serie = series[serieIndex];
            
            if (!serie.isLine) {
               accumulatedBegin += serie.values[valueIndex].begin;
               accumulatedEnd += serie.values[valueIndex].end;
            }
         }
         
         if (accumulatedBegin < min) {
            min = accumulatedBegin;
         }
         
         if (accumulatedEnd < min) {
            min = accumulatedEnd;
         }
         
         for (serieIndex = 0; serieIndex < series.length; serieIndex++) {
            serie = series[serieIndex];
            
            if (serie.isLine) {
               if (serie.values[valueIndex].begin < min) {
                  min = serie.values[valueIndex].begin;
               }
               
               if (serie.values[valueIndex].end < min) {
                  min = serie.values[valueIndex].end;
               }
            }
         }
      }
      
      return min;
   };
   
   SeriesUtilities.prototype.mergeTimePeriods = function(previousTimePeriods, timePeriods) {
      var firstRepresentationList  = buildRepresentationList(previousTimePeriods);
      var secondRepresentationList = buildRepresentationList(timePeriods);
      var mergeRepresentationList  = mergeRepresentationLists(firstRepresentationList, secondRepresentationList);
      
      var timePeriodsMerged = distributesRepresentationListPercentageInTimePeriods(mergeRepresentationList, $.extend(true, [], timePeriods));
      timePeriodsMerged.representationList = mergeRepresentationList;
      
      return timePeriodsMerged;
   };

   // ***************************************************************************************************************

   // Internal functions

   /**
    * getData
    * 
    * This is the main conversion algorithm between series values (object with begin and end)
    * and set data (items with index and value)
    * 
    * @param {Array} values
    * @param asSteps
    * @returns {Array}
    */
   function getData(values, asSteps) {
      fixValues(values, asSteps);

      var data = [];
      var setIndex = 0;
      for (var valueIndex = 0; valueIndex < values.length; valueIndex++) {
         var value = values[valueIndex];
         var dataItem;
         dataItem = [setIndex, value.begin];
         data.push(dataItem);
         setIndex++;
         dataItem = [setIndex, value.end];
         data.push(dataItem);
      }
      return data;
   }

   /**
    * fixValues
    * 
    * Fix for a special situation which causes Flot to draw a blank area on the chart:
    * Assume this serie:
    * 
    * 0: {b0, e0}, 1: {b1, e1}, 2: {b2, null},  3: {null, null}
    * 
    * This is converted to set data in this way:
    * [0, b0], [1, e0], [1, b1], [2, e1], [2, b2], [3, null], [3, null], [4, null]
    * 
    * Which causes the descripted problem in Flot. The solution is to set a zero in the first
    * 'begin' item of null value. That is:
    * 
    * [0, b0], [1, e0], [1, b1], [2, e1], [2, b2], [3, 0], [3, null], [4, null]
    * 
    * @param {Array} values
    * @param asSteps
    * @returns {void}
    */
   function fixValues(values, asSteps) {
      var previousItemHasNullChange = false;
      for (var valueIndex = 0; valueIndex < values.length; valueIndex++) {
         var valueItem = values[valueIndex];
         if (previousItemHasNullChange && valueItem.begin === null) {
            log.debug("INVALID NULL ARRANGEMENT AT INDEX " + valueIndex);
            var previousDataItem = values[valueIndex - 1];
            previousDataItem.end = asSteps ? null : 0;
            break;
         }
         previousItemHasNullChange = valueItem.begin !== null && valueItem.end === null;
      }
   }

   function createSetFromSerie(serie, asSteps) {
      log.debug("Creating set for " + serie.name);
      var set;
      if (serie.isLine) {
         set = {
            label: serie.name,
            order: serie.order,
            data: getData(serie.values, asSteps),
            color: serie.color,
            stack: false,
            lines: {
               show: true,
               fill: false,
               steps: false,
               lineWidth: serie.lineThickness
            }
         };
      }
      else {
         set = {label: serie.name, order: serie.order, data: getData(serie.values, asSteps), color: serie.color};
      }

      return set;
   }

   function createSetFromWrapperSet(wrapperSet, asSteps) {
      log.debug("Creating set for wrapper set " + wrapperSet.label);
      var set;
      set = {
         label: wrapperSet.label,
         order: wrapperSet.order,
         data: getData(wrapperSet.data, asSteps),
         color: wrapperSet.color,
         stack: wrapperSet.stack,
         lines: wrapperSet.lines
      };

      return set;
   }

   function createZeroSet(valuesLength) {
      var set;
      set = {label: "zeroes", order: 1234, data: [], color: "whatever"};

      var setIndex = 0;
      for (var serieIndex = 0; serieIndex < valuesLength; serieIndex++) {
         var dataItem;
         dataItem = [setIndex, 0];
         set.data.push(dataItem);
         setIndex++;
         dataItem = [setIndex, 0];
         set.data.push(dataItem);
      }

      set.stack = true;
      set.lines = {show: false};
      set.bars = {show: false};
      return set;
   }

   function createZeroSetFromSet(set) {
      var zeroSet;
      zeroSet = {label: "zeroes", order: 1234, data: [], color: "whatever"};

      for (var dataIndex = 0; dataIndex < set.data.length; dataIndex++) {
         var dataItem = set.data[dataIndex];
         var targetDataItem;
         targetDataItem = [dataItem[0], 0];
         zeroSet.data.push(targetDataItem);
      }

      zeroSet.stack = true;
      zeroSet.lines = {show: false};
      zeroSet.bars = {show: false};
      return zeroSet;
   }

   function createWrapperSetFromSerie(serie, asSteps) {
      log.debug("Creating wrapper set for " + serie.name);

      if (serie.name === undefined) {
         log.error("serie has no name!");
      }

      var set;
      if (serie.isLine) {
         set = {
            label: serie.name,
            order: serie.order,
            data: [],
            color: serie.color,
            stack: false,
            lines: {
               show: true,
               fill: false,
               steps: false,
               lineWidth: serie.lineThickness
            }
         };
      }
      else {
         set = {label: serie.name, order: serie.order, data: [], color: serie.color};
      }
      set.wrapper = true;

      for (var serieIndex = 0; serieIndex < serie.values.length; serieIndex++) {
         var value = serie.values[serieIndex];
         var dataItem;
         dataItem = { begin: value.begin, end: value.end };
         set.data.push(dataItem);
      }

      log.debug("   Wrapper set: " + JSON.stringify(set));

      return set;
   }

   function buildRepresentationList(timePeriods) {
      log.debug("------------------------------------------------------");
      
      var representationList = [];
      if (timePeriods.representationList) {
         representationList = timePeriods.representationList;
      }
      else {
         var accumulatedWidth = 0;
         var itemIndex = 0;
         for (var timePeriodIndex = 0; timePeriodIndex < timePeriods.length; timePeriodIndex++) {
            var timePeriod = timePeriods[timePeriodIndex];

            var itemPercentage = timePeriod.widthPercentage / timePeriod.duration;
            for (var timePeriodItemIndex = 0; timePeriodItemIndex < timePeriod.duration; timePeriodItemIndex++) {
               var representation = {};
               representation.fromPercentage = accumulatedWidth + timePeriodItemIndex * itemPercentage;
               representation.toPercentage = accumulatedWidth + (timePeriodItemIndex + 1) * itemPercentage;
               representation.itemIndex = itemIndex;
               representationList.push(representation);

               log.debug(itemIndex + ": " + timePeriodItemIndex + " from: " + representation.fromPercentage + " to: " + representation.toPercentage);

               itemIndex++;
            }
            accumulatedWidth += timePeriod.widthPercentage;
            timePeriods.representationList = representationList;
         }
      }
      
      return representationList;
   }

   function generateTranslatedSerieItemValue(targetPercentage, originalRepresentationList, originalSerie, takePreviousRepresentation) {
      var value;

      var percentage = targetPercentage;
      var originalRepresentation = findRepresentation(percentage, originalRepresentationList, takePreviousRepresentation);

      if (originalRepresentation) {
         var firstValue = originalSerie.values[originalRepresentation.itemIndex].begin;
         var secondValue = originalSerie.values[originalRepresentation.itemIndex].end;

         var diffToFirst = percentage - originalRepresentation.fromPercentage;
         var diffToSecond = originalRepresentation.toPercentage - percentage;

         if (firstValue === null && secondValue === null) {
            value = null;
         }
         else if (firstValue !== null && secondValue === null ||
                  firstValue === null && secondValue !== null) {
            detailLog.debug("DOUBT on " + originalSerie.label + "[" + originalRepresentation.itemIndex + "] between " + firstValue + " and " + secondValue);
            if (diffToFirst <= diffToSecond) {
               value = firstValue;
            }
            else {
               value = secondValue;
            }
         }
         else {
            if (percentage === originalRepresentation.fromPercentage) {
               value = firstValue;
            }
            else if (percentage === originalRepresentation.toPercentage) {
               value = secondValue;
            }
            else {
               //Interpolation
               value = (percentage - originalRepresentation.fromPercentage) / (originalRepresentation.toPercentage - originalRepresentation.fromPercentage) *
                       (secondValue - firstValue) + firstValue;
            }
         }

         ////
         detailLog.debug("---> translating serie " + originalSerie.name + ": [index= " + originalRepresentation.itemIndex +
                 " begin=" + firstValue + " end=" + secondValue + "] ==> [ value=" + value + "]");
         ////
      }
      else {
         //TODO: check
         detailLog.error("ERROR: no representation found for percentage " + percentage);
         value = -1;
      }

      return value;
   }

   function generateTranslatedSerieItem(targetRepresentation, originalRepresentationList, originalSerie) {
      var serieItem = {};

      detailLog.debug("---> translating serie " + originalSerie.name + " index " + targetRepresentation.itemIndex);

      serieItem.begin = generateTranslatedSerieItemValue(targetRepresentation.fromPercentage, originalRepresentationList, originalSerie, false);
      serieItem.end = generateTranslatedSerieItemValue(targetRepresentation.toPercentage, originalRepresentationList, originalSerie, true);

      detailLog.debug("     result: begin=" + serieItem.begin + " end=" + serieItem.end);

      return serieItem;
   }

   function findRepresentation(percentage, representationList, takePreviousRepresentation) {
      var previousRepresentation;
      for (var representationIndex = 0; representationIndex < representationList.length; representationIndex++) {
         var representation = representationList[representationIndex];

         if (takePreviousRepresentation && percentage === representation.fromPercentage) {
            return previousRepresentation;
         }

         if (percentage >= representation.fromPercentage && percentage < representation.toPercentage) {
            return representation;
         }
         previousRepresentation = representation;
      }

      //In case of 100%, this fix finds the correct representation
      if (previousRepresentation && percentage <= previousRepresentation.toPercentage) {
         return previousRepresentation;
      }

      return undefined;
   }
   
   function mergeRepresentationLists(firstRepresentationList, secondRepresentationList) {
      var mergeRepresentationList = [];
      
      var objectUtilities = new ObjectUtilities();
      if (!objectUtilities.equals(firstRepresentationList, secondRepresentationList)) {
         detailLog.debug("mergeRepresentations: ");

         var firstRepListIndex = 0;
         var secondRepListIndex = 0;
         var mergeRepListIndex = 0;
         var fromPercentage = 0;
         
         var hundredPerCent = false;
         while (!hundredPerCent) {
            var firstRepItem   = firstRepresentationList[firstRepListIndex];
            var secondRepItem  = secondRepresentationList[secondRepListIndex];
            var mergeRepItem   = {fromPercentage: fromPercentage, toPercentage: 0, itemIndex: mergeRepListIndex};
            
            // to equals
            if (firstRepItem.toPercentage === secondRepItem.toPercentage) {
               mergeRepItem.toPercentage = firstRepItem.toPercentage;
               firstRepListIndex++;
               secondRepListIndex++;
            }
            // firstRepItem.toPercentage between from and to of secondRepItem
            else if (firstRepItem.toPercentage > secondRepItem.fromPercentage &&
                     firstRepItem.toPercentage < secondRepItem.toPercentage) {
               mergeRepItem.toPercentage = firstRepItem.toPercentage;
               firstRepListIndex++;
            }
            else {
               mergeRepItem.toPercentage = secondRepItem.toPercentage;
               secondRepListIndex++;
            }
            
            fromPercentage = mergeRepItem.toPercentage;
            mergeRepresentationList.push(mergeRepItem);
            mergeRepListIndex++;
            
            detailLog.debug(mergeRepItem.itemIndex + ": " + " from: " + mergeRepItem.fromPercentage + " to: " + mergeRepItem.toPercentage);
            
            hundredPerCent = mergeRepItem.toPercentage === 100;
         }
      }
      else {
         detailLog.debug("mergeRepresentations: firstRepresentationList and secondRepresentationList are equals");
         mergeRepresentationList = firstRepresentationList;
      }
      
      return mergeRepresentationList;
   }
   
   function distributesRepresentationListPercentageInTimePeriods(representationList, timePeriods) {
      var minWidth = 0;
      for (var timePeriodIndex = 0; timePeriodIndex < timePeriods.length; timePeriodIndex++) {
         var timePeriodItem = timePeriods[timePeriodIndex];
         var timePeriodItemDuration = 0;
         for (var repListIndex = 0; repListIndex < representationList.length; repListIndex++) {
            var repListItem = representationList[repListIndex];
            var maxWidth = timePeriodItem.widthPercentage + minWidth;
            // toPercentage equals maxWidth or toPercentage between minWidth and maxWidth
            if (repListItem.toPercentage === maxWidth || (repListItem.toPercentage > minWidth && repListItem.toPercentage < maxWidth)) {
               timePeriodItemDuration++;
            }
         }
         timePeriodItem.duration = timePeriodItemDuration;
         minWidth += timePeriodItem.widthPercentage;
      }
      
      return timePeriods;
   }
   
   return SeriesUtilities;
});


define('common-bar-chart-delegate', [
   'common-series-utilities',
   'logger'
], function(SeriesUtilities, Logger) {

   var log = Logger.get('BarChartDelegate');
   var detailLog = Logger.get('BarChartDelegateDetail');

   /**
    * BarChartDelegate
    * 
    * This is the delegate used by the BarChart. It uses double-indexes for the
    * items sent to flot.
    * 
    * @param {type} chart
    * @returns {BarChartDelegate}
    */

   var BarChartDelegate = function(chart) {
      this.chart = chart;
   };

   BarChartDelegate.prototype.createSets = function(series) {
      var seriesUtilities = new SeriesUtilities(!this.chart.smoothing);
      var sets = seriesUtilities.getWrapperSetsFromSeries(series);
      return sets;
   };

   BarChartDelegate.prototype.createDrawObjectForCurrentState = function() {
      dumpTimePeriods(this.chart.previousTimePeriods, "Previous time periods");
      dumpTimePeriods(this.chart.timePeriods, "New time periods");

      var previousTicks = [];
      if (this.chart.previousOptions) {
         previousTicks = this.chart.previousOptions.yaxis.ticks;
      }

      var previousSets = this.chart.previousSets;
      var previousColumns = this.chart.previousColumns;
      var mergedTimePeriods;
      var translatedPreviousSeries;
      var translatedNewSeries;
      var translatedNewSets;
      
      var seriesUtilities = new SeriesUtilities(!this.chart.smoothing);

      mergedTimePeriods = seriesUtilities.mergeTimePeriods(this.chart.previousTimePeriods, this.chart.timePeriods);

      translatedPreviousSeries = seriesUtilities.translateSeries(this.chart.previousSeriesValues, this.chart.previousTimePeriods, mergedTimePeriods);
      translatedNewSeries = seriesUtilities.translateSeries(this.chart.series, this.chart.timePeriods, mergedTimePeriods);

      var mergedTPColumns = 0;
      for (var timePeriodIndex = 0; timePeriodIndex < mergedTimePeriods.length; timePeriodIndex++) {
         mergedTPColumns += mergedTimePeriods[timePeriodIndex].duration;
      }

      previousColumns = mergedTPColumns;
      previousSets = seriesUtilities.getWrapperSetsFromSeries(translatedPreviousSeries);
      translatedNewSets = seriesUtilities.getWrapperSetsFromSeries(translatedNewSeries);

      this.chart.animator.animateRescaleX = false;

      if (previousSets[0].data.length !== previousColumns) {
         console.error("MISMATCH IN COLUMNS. INFORMED: " + previousColumns + " REAL: " + previousSets[0].data.length);
      }

      ////ONLY FOR DEBUGGING
      log.debug("Generating translated previous sets...");
      var translatedPreviousSets = seriesUtilities.getSetsFromSeries(translatedPreviousSeries);
      log.debug("TRANSLATED PREVIOUS SETS: " + JSON.stringify(translatedPreviousSets));
      ////

      return { xychart: true,
               previousSets: $.extend(true, [], previousSets),
               measurementSets: $.extend(true, [], this.chart.previousSets),
               newSets: $.extend(true, [], translatedNewSets),
               previousMax: this.chart.previousMax,
               max: this.chart.max,
               previousColumns: previousColumns + 1, // we show the begin value of all columns plus the end value of the last column
               columns: mergedTPColumns + 1, // we show the begin value of all columns plus the end value of the last column
               previousTicks: previousTicks,
               newTicks: this.chart.options.yaxis.ticks,
               //Extra data for checking changes
               previousTimePeriods: $.extend(true, [], this.chart.previousTimePeriods),
               timePeriods: $.extend(true, [], mergedTimePeriods),
               series: $.extend(true, [], translatedNewSeries),
               translatedPreviousSeries: translatedPreviousSeries
             };
   };

   BarChartDelegate.prototype.createPlot = function(sets) {
      var plot;
      //Ignore the passed sets - Just create the sets from the target series
      var seriesUtilities = new SeriesUtilities(!this.chart.smoothing);
      var normalizedSets = seriesUtilities.getSetsFromSeries(this.chart.series, true);

      this.chart.interactivity.configureOptions(this.chart.options);
      
      log.debug("createPlot: sets for drawing: " + JSON.stringify(normalizedSets));
      plot = $.plot($(this.chart.id), normalizedSets, this.chart.options);

      this.chart.drawLabels(plot);
      this.chart.interactivity.setMaximumX(this.chart.columnMode ? this.chart.columns : this.chart.columns - 1);
      this.chart.interactivity.activate(plot);

      return plot;
   };

   BarChartDelegate.prototype.getSetsForDrawing = function() {
      return this.chart.sets;
   };

   BarChartDelegate.prototype.getSetsForMeasurement = function(drawObject) {
      return drawObject.measurementSets;
   };

   BarChartDelegate.prototype.getTicks = function(sets) {
      return this.chart.calculateVerticalTicks(this.chart.columns, sets, this.chart.max, this.chart.timePeriods);
   };

   BarChartDelegate.prototype.beforeDrawing = function() {
      if (this.chart.pendingDraw) {
         log.debug("Dispatching pending draw " + this.chart.pendingDraw.id);
         this.chart._setTimePeriods(this.chart.pendingDraw.timePeriods);
         this.chart._setValues(this.chart.pendingDraw.values);
         this.chart._setEndingLabel(this.chart.pendingDraw.endingLabel);
         this.chart.prepare();
         this.chart.pendingDraw = null;
      }
      if (this.chart.xAxisTransformationHash !== this.chart.calculateHash(this.chart.previousTimePeriods)) {
         detailLog.debug("use PREVIOUS time periods");
         this.chart.calculateXAxisTransformation(this.chart.previousTimePeriods);
         this.chart.options.xaxis.max = this.chart.previousColumns;
         this.chart.calculateHorizontalTicks(this.chart.previousTimePeriods);
         this.chart.calculateMarkings(this.chart.previousTimePeriods);
      }
   };

   BarChartDelegate.prototype.onDrawFromScratch = function(sets, drawObject) {
      var timePeriods = this.chart.timePeriods;
      var columns = this.chart.columns;
      if (this.chart.xAxisTransformationHash !== this.chart.calculateHash(timePeriods)) {
         detailLog.debug("use NEW time periods (drawing from scratch)");
         this.chart.calculateXAxisTransformation(timePeriods);
         this.chart.options.xaxis.max = columns;
            this.chart.calculateHorizontalTicks(timePeriods);
         this.chart.calculateMarkings(timePeriods);
      }
      if (this.chart.autoCalculateTicks) {
         //Make flot autocalculate ticks again (they may be hidden
         //if we animated the chart)
         this.chart.autocalculateHorizontalTicks();
      }
   };

   BarChartDelegate.prototype.onSetAnimationStarting = function(drawObject) {
      detailLog.debug("STARTING SET ANIMATION!");
   };

   BarChartDelegate.prototype.onRedraw = function(wrapperSets, plot, drawObject, measureMode) {
      if (measureMode) {
         //Special handling when measuring the step duration
         return;
      }

      var timePeriods = drawObject ? drawObject.timePeriods : this.chart.timePeriods;
      var columns = drawObject ? drawObject.columns - 1 : this.chart.columns;
      if (this.chart.xAxisTransformationHash !== this.chart.calculateHash(timePeriods)) {
         detailLog.debug("use NEW time periods");
         this.chart.calculateXAxisTransformation(timePeriods);
         plot.getOptions().xaxis.max = columns;
         plot.getAxes().xaxis.max = columns;
         plot.getAxes().xaxis.options.max = columns;
         if (this.chart.autoCalculateTicks && drawObject) {
            //We don't want horizontal ticks while animating
            this.chart.removeHorizontalTicks();
         }
         else {
            this.chart.calculateHorizontalTicks(timePeriods);
         }
         this.chart.calculateMarkings(timePeriods);
      }

      plot.getOptions().grid.markings = this.chart.options.grid.markings;
      if (this.chart.options.xaxis.ticks !== undefined && plot.getOptions().xaxis.ticks && plot.getOptions().xaxis.ticks.length !== this.chart.options.xaxis.ticks.length) {
         detailLog.debug("xaxis changed from " + plot.getOptions().xaxis.ticks.length + " to " + this.chart.options.xaxis.ticks.length);
      }
      plot.getOptions().xaxis.ticks = this.chart.options.xaxis.ticks;
      plot.getOptions().xaxes[0].ticks = this.chart.options.xaxis.ticks;
      this.chart.drawLabels(plot);

      log.debug("onRedraw - animation step " + this.chart.animator.smoothCurrentStep);

      for (var setIndex = 0; setIndex < wrapperSets.length; setIndex++) {
         var wrapperSet = wrapperSets[setIndex];
         if (!wrapperSet.wrapper) {
            console.error("This is not a wrapper set! " + wrapperSet.label);
         }
      }

      var seriesUtilities = new SeriesUtilities(!this.chart.smoothing);
      var sets = seriesUtilities.getSetsFromWrapperSets(wrapperSets);

      log.debug("onRedraw: sets for drawing: " + JSON.stringify(sets));

      return sets;
   };

   BarChartDelegate.prototype.hasExtraChanges = function(drawObject) {
      if (drawObject.previousTimePeriods.length !== drawObject.timePeriods.length) {
         log.debug("HAS EXTRA CHANGES: number of time periods");
         return true;
      }
      //Number of time periods are equal. Check the contents
      var previousTimePeriod;
      var timePeriod;
      for (var timePeriodIndex = 0; timePeriodIndex < drawObject.previousTimePeriods.length; timePeriodIndex++) {
         previousTimePeriod = drawObject.previousTimePeriods[timePeriodIndex];
         timePeriod = drawObject.timePeriods[timePeriodIndex];
         if (previousTimePeriod.duration !== timePeriod.duration ||
             previousTimePeriod.widthPercentage !== timePeriod.widthPercentage ||
             previousTimePeriod.label !== timePeriod.label) {
             log.debug("HAS EXTRA CHANGES: time period content");
             return true;
         }
      }
      return false;
   };

   BarChartDelegate.prototype.fillDifferenceSet = function(differenceSet, previousSet, newSet, smoothSteps, currentDraw) {
      function calculateDifference(previousValue, newValue) {
         if (newValue === null && previousValue === null) {
            //log.debug("NULL");
            return null;
         }
         else {
            var totalDifference = newValue - previousValue;
            return totalDifference / smoothSteps;
         }
      }

      differenceSet._hasChanges = false;
      differenceSet._needsAnimation = false;

      for (var itemIndex = 0; itemIndex < previousSet.data.length; itemIndex++) {
         var previousItem = previousSet.data[itemIndex];
         var newItem = newSet.data[itemIndex];
         
         if (!previousItem || !newItem) {
            console.error("One of the items are undefined!");
         }

         var beginDifference = calculateDifference(previousItem.begin, newItem.begin);
         var endDifference = calculateDifference(previousItem.end, newItem.end);
         
         differenceSet.data.push({ begin: beginDifference, end: endDifference });

         if ((beginDifference !== 0 && beginDifference !== null) ||
             (endDifference !== 0 && endDifference !== null)) {
            differenceSet._hasChanges = true;
            differenceSet._needsAnimation = true;
         }
      }

      detailLog.debug("===> DIFFERENCE SET: " + JSON.stringify(differenceSet));
   };

   BarChartDelegate.prototype.fillAnimationStepSet = function(stepSet, previousSet, differenceSet, calculateStep, currentDraw) {
      for (var itemIndex = 0; itemIndex < previousSet.data.length; itemIndex++) {
         var previousItem = previousSet.data[itemIndex];
         var differenceItem = differenceSet.data[itemIndex];
         
         var beginStepValue = this.chart.animator.calculateAnimationStepValue(previousItem.begin, differenceItem.begin, calculateStep);
         var endStepValue = this.chart.animator.calculateAnimationStepValue(previousItem.end, differenceItem.end, calculateStep);

         stepSet.data.push({ begin: beginStepValue, end: endStepValue });
      }

      return stepSet;
   };
   
   BarChartDelegate.prototype.fillRescaleXStepSet = function(rescaleXStepSet, set, differenceSet, columns) {
      for (var itemIndex = 0; itemIndex < columns; itemIndex++) {
         var differenceItem = differenceSet.data[itemIndex];
         rescaleXStepSet.data.push({ begin: differenceItem.begin, end: differenceItem.end });
      }
   };
   
   BarChartDelegate.prototype.getSetsForScaleMesurement = function(sets) {
      var returnSets = sets;
      var evaluateSet = sets[0];
      if (evaluateSet !== undefined && evaluateSet.wrapper) {
         var seriesUtilities = new SeriesUtilities(!this.chart.smoothing);
         returnSets = seriesUtilities.getSetsFromWrapperSets(sets);
      }
      return returnSets;
   };

   // ********************************************************************************************************

   // Internal methods

   function dumpTimePeriods(timePeriods, title) {
      detailLog.debug("------------------------------------------------------");
      detailLog.debug(title);
      var start = 0;
      for (var i = 0; i < timePeriods.length; i++) {
         var timePeriod = timePeriods[i];
         var end = start + timePeriod.duration;
         detailLog.debug(timePeriod.id + ": (" + start + " - " + (end - 1) + ") duration=" + timePeriod.duration + " label=" + timePeriod.label + " width %=" + timePeriod.widthPercentage);

         start = end;
      }
   }

   return BarChartDelegate;
});


define('common-bar-chart', [
   'base-bar-chart',
   'common-bar-chart-delegate',
   'common-series-utilities',
   'logger'
], function(BaseBarChart, BarChartDelegate, SeriesUtilities, Logger) {

   var log = Logger.get('BarChart');
   var detailLog = Logger.get('BarChartDetail');

   var BarChart = function() {
      this.createBarChart = function(id, currencyFormatter) {
         var chart = new BaseBarChart().createChart(id, true, currencyFormatter);

         chart.previousSeriesValues = [];
         chart.timePeriods = [];
         chart.previousTimePeriods = [];
         chart.topMargin = 20;
         chart.topValueFactor = 1.0; //the top value on the chart can be greater than the max value
         chart.endingLabel = null;
         chart.smoothing = false;
         chart.pendingDraw = null;
         chart.autoCalculateTicks = false;
         chart.showXAxis = true;
         chart.columnMode = false;

         chart.xAxisTransformationHash = 0;
         chart.xAxisTransformation = [];
         chart.xAxisInverseTransformation = [];

         chart.columns = 0;
         chart.previousColumns = 0;
         chart.titles = [];
         chart.previousTitles = [];
         chart.labelElements = [];

         chart.delegate = new BarChartDelegate(chart);
         chart.animator.delegate = chart.delegate;
         
         chart.localize = null;

         ////
         detailLog.debug("INITIALIZING CHART " + id);
         if (document.testSeries === undefined && id === "alternativeIncomeDevelopmentCanvas") {
            document.testSeries = testSeries;
            document.testSets = testSets;
            document.testReset = testReset;
         }
         ////
         
         //Limits are fixed on this chart, so set them at the beginning
         chart.interactivity.setMinimumX(0.0);
         chart.interactivity.setMaximumX(10.0); //TODO
         chart.interactivity.setIsEnabledHandler(function() {
            return !chart.animator.drawing;
         });

         chart.setOnHover = function(onHoverHandler) {
            chart.interactivity.setOnHover(onHoverHandler);
         };

         chart.addSerie = function(name, color, isLine, order, lineThickness) {
            var serie = {};
            serie.name = name;
            serie.color = color;
            serie.isLine = isLine;
            serie.order = order;
            serie.lineThickness = lineThickness ? lineThickness : 2;

            chart.series.push(serie);
         };

         chart.setData = function(timePeriods, values, endingLabel) {
            chart.pendingDraw = {
               timePeriods: timePeriods,
               values: values,
               endingLabel: endingLabel,
               id: Date.now()
            };
            log.debug("Storing pending draw " + chart.pendingDraw.id);
         };

         chart.prepare = function() {
            chart.max = chart.getMaxValue();
            chart.min = chart.getMinValue();
            
            var minimumForChart; //let flot handle it
            if (chart.max === 0 && chart.min === 0) {
               //If there is no data, make sure that the x axis stays at the bottom
               minimumForChart = 0;
            }
            
            chart.utils.determineTickAppearance(chart.max);
            chart.ensureHeightIsValid();
            chart.sets = chart.delegate.createSets(chart.series);
            chart.columns = chart.getColumnCount();

            var yticks   = chart.calculateVerticalTicks(chart.columns, chart.sets, chart.max, chart.timePeriods);
            var xticks   = chart.calculateHorizontalTicks(chart.timePeriods);
            var markings = chart.calculateMarkings(chart.timePeriods);
            
            chart.options = {
               series: {
                  stack: true,
                  shadowSize: 0,
                  lines: {
                     show: true,
                     fill: 1.0, //opacity of the fill
                     steps: false,
                     lineWidth: 0
                  },
                  bars: {
                     show: false,
                     barWidth: 0.6
                  }
               },
               legend: {
                  show: false
               },
               xaxis: {
                  show: chart.showXAxis,
                  ticks: xticks,
                  tickDecimals: 0,
                  color: chart.getXaxisColor(),
                  min: 0,
                  max: chart.columns,
                  transform: chart.xaxisTransform,
                  inverseTransform: chart.xaxisInverseTransform
               },
               yaxis: {
                  ticks: yticks,
                  color: (!chart.autoCalculateTicks) ? chart.getYaxisColor() : undefined,
                  tickFormatter: this.tickFormatter,
                  min: minimumForChart
               },
               grid: {
                  // show: true,
                  aboveData: (!chart.autoCalculateTicks) ? true : false,
                  borderWidth: {
                     top: 0,
                     left: 0,
                     bottom: 0,
                     right: 0
                  },
                  margin: {
                     top: chart.topMargin,
                     left: 5,
                     bottom: 0,
                     right: 0
                  },
                  markings: markings,
                  hoverable: true,
                  clickable: true
               }
            };
         };

         chart.xaxisTransform = function(v) {
            if (chart.columnMode) {
               return v;
            }
            return chart.xAxisTransformation[v];
         };

         chart.xaxisInverseTransform = function(v) {
            if (chart.columnMode) {
               return v;
            }
            for (var index = 0; index < chart.xAxisInverseTransformation.length; index++) {
               var transformation = chart.xAxisInverseTransformation[index];

               if (transformation.from <= v && v < transformation.to) {
                  return transformation.index;
               }
            }

            return v;
         };

         chart.calculatePossibleVerticalTicks = function(columns, sets, max, timePeriods) {
            var yticks = [];
            var sum;
            
            yticks.push(0);
            
            //Fill the sets with real values
            for (var columnIndex = 0; columnIndex < columns; columnIndex++) {
               sum = 0;
               
               var columnIndexOnTimePeriod = (columnIndex === columns - 1) ? chart.isColumnIndexOnTimePeriod(columnIndex + 1, timePeriods) : chart.isColumnIndexOnTimePeriod(columnIndex, timePeriods);
               
               for (var setIndex = 0; setIndex < sets.length; setIndex++) {
                  var dataSets = sets[setIndex].data;

                  // this if make that the ytiks will be added well when chart.smoothing === true
                  if (chart.smoothing && (columnIndex === columns - 1)) {
                     sum += dataSets[columnIndex].end;
                  }
                  else {
                     // If (smoothing and set with nulls) or (is a line)
                     if ((chart.smoothing && (setIndex > 0) && (columnIndex > 0) && chart.utils.hasSetNullValues(sets[setIndex - 1])) ||
                         (chart.utils.isSetALine(sets[setIndex]))) {
                        sum = dataSets[columnIndex].begin;
                     }
                     else {
                        sum += dataSets[columnIndex].begin;
                     }
                  }
                  
                  if (yticks.indexOf(sum) < 0 &&
                      ((chart.smoothing && (columnIndexOnTimePeriod || columnIndex === 0)) || !chart.smoothing)) {
                     yticks.push(sum);
                  }
                  
                  if (chart.utils.isSetALine(sets[setIndex])) {
                     sum = 0;
                  }
               }
            }
            
            return yticks;
         };
         
         chart.calculateVerticalTicks = function(columns, sets, max, timePeriods) {
            if (chart.autoCalculateTicks) {
               return undefined;
            }
            
            var yticks = [];
            
            var possibleTicks = chart.calculatePossibleVerticalTicks(columns, sets, max, timePeriods);

            var placeholder = $(chart.id);
            possibleTicks.forEach(function(possibleTick) {
               var tick = (max > possibleTick) ? possibleTick : max;
               
               if (tick !== null && !chart.utils.overlaps(tick, yticks, placeholder)) {
                  yticks.push(tick);
               }
            });
            
            if (chart.topValueFactor > 1.0) {
               yticks.push(max * chart.topValueFactor);
            }
            return yticks;
         };
         
         // TODO:
         chart.calculateVerticalTicksOLD = function(columns, series, max, timePeriods) {
            if (chart.autoCalculateTicks) {
               return undefined;
            }
            
            var placeholder = $(chart.id);
            var yticks = [0];
            var sum;
            var columnIndex;
            var serieIndex;
            var valuesForSerie;
            var seriesUtilities = new SeriesUtilities(!chart.smoothing);

            //Fill the sets with real values
            for (columnIndex = 0; columnIndex < columns; columnIndex++) {
               sum = 0;
               
               var columnIndexOnTimePeriod = (columnIndex === columns - 1) ? chart.isColumnIndexOnTimePeriod(columnIndex + 1, timePeriods) : chart.isColumnIndexOnTimePeriod(columnIndex, timePeriods);

               for (serieIndex = 0; serieIndex < series.length; serieIndex++) {
                  valuesForSerie = series[serieIndex].values;
                  var begin = valuesForSerie[columnIndex].begin;
                  var end = valuesForSerie[columnIndex].end;
                  
                  // Do not show null values in the chart.
                  // A null value means that the serie has no meaningful value for this column
                  // That's not the same as having value 0 (meaning that the serie is valid for the column, but just has 0 value).
                  // In case of value 0, a 1 pixel line is drawn, while nothing appears when the value is null.
                  if (end === null && !series[serieIndex].isLine) {
                     if (chart.smoothing && columnIndex > 0) {
                        begin = valuesForSerie[columnIndex - 1].end;
                     }
                     else {
                       continue;
                     }
                  }

                  if (series[serieIndex].isLine) {
                     if (begin !== null &&
                         yticks.indexOf(begin) < 0 &&
                         !chart.utils.overlaps(begin, yticks, placeholder) &&
                         ((chart.smoothing && (columnIndexOnTimePeriod || columnIndex === 0)) || !chart.smoothing)) {
                        yticks.push(begin);
                     }
                  }
                  else {
                     // this if make that the ytiks will be added well when chart.smoothing === true
                     if (chart.smoothing && (columnIndex === columns - 1)) {
                        sum += end;
                     }
                     else {
                        if (chart.smoothing && (serieIndex > 0) && (columnIndex > 0) && seriesUtilities.hasSerieNullValues(series[serieIndex - 1])) {
                           sum = begin;
                        }
                        else {
                           sum += begin;
                        }
                     }
                     
                     if (yticks.indexOf(sum) < 0 &&
                         !chart.utils.overlaps(sum, yticks, placeholder) &&
                         ((chart.smoothing && (columnIndexOnTimePeriod || columnIndex === 0)) || !chart.smoothing)) {
                        yticks.push(sum);
                     }
                  }
               }
            }

            if (chart.topValueFactor > 1.0) {
               yticks.push(max * chart.topValueFactor);
            }
            
            return yticks;
         };
         
         chart.calculateHorizontalTicks = function(timePeriods) {
            if (chart.autoCalculateTicks) {
               return undefined;
            }
            
            var xticks = [];
            var accumulatedColumnCount = 0;

            for (var timePeriodIndex = 0; timePeriodIndex < timePeriods.length; timePeriodIndex++) {
               var timePeriod = timePeriods[timePeriodIndex];
               xticks.push([accumulatedColumnCount, timePeriod.label]);
               accumulatedColumnCount += timePeriod.duration;
            }
            
            if (chart.endingLabel !== null) {
               xticks.push([accumulatedColumnCount, String(chart.endingLabel)]);
            }

            log.debug("xticks: " + JSON.stringify(xticks));
            
            if (chart.options !== null) {
               chart.options.xaxis.ticks = xticks;
            }
            
            return xticks;
         };

         chart.removeHorizontalTicks = function() {
            if (chart.options !== null) {
               chart.options.xaxis.ticks = [""];
            }
         };

         chart.autocalculateHorizontalTicks = function() {
            if (chart.options !== null) {
               chart.options.xaxis.ticks = undefined;
            }
         };

         chart.calculateMarkings = function(timePeriods) {
            var markings = [];
            var accumulatedColumnCount = 0;
            var titles = [];
            markings.push({yaxis: {from: 0, to: 0},
                  color: "#000000", //#75777a
                  lineWidth: 1.5});
            for (var timePeriodIndex = 0; timePeriodIndex < timePeriods.length; timePeriodIndex++) {
               var timePeriod = timePeriods[timePeriodIndex];
               markings.push({xaxis: {from: accumulatedColumnCount, to: accumulatedColumnCount},
                  /*yaxis: {from: 0, to: chart.max},*/
                  color: "#000000",
                  lineWidth: 1.5});
               //verticalLines.push({xValue: accumulatedColumnCount});
               
               if (timePeriod.title) {
                  titles.push({label: timePeriod.title, column: accumulatedColumnCount});
               }
               
               accumulatedColumnCount += timePeriod.duration;
            }

            chart.titles = titles;

            if (chart.options !== null) {
               chart.options.grid.markings = markings;
            }
            
            return markings;
         };

         chart.getColumnCount = function() {
            return chart.series[0].values.length;
         };

         /**
          * getMeasurements
          * 
          * Returns the calculated measurements for the chart.
          * IMPORTANT: if there is a pending draw, it will be taken as the active
          *            chart situation, and thus its measurements will be returned.
          * 
          * @returns {measurements}
          */
         chart.getMeasurements = function() {
            var measurements = {};
            
            var yticks = [];
            if (this.pendingDraw) {
               //Use the pending series
               var pendingSeries = [];
               for (var serieIndex = 0; serieIndex < chart.series.length; serieIndex++) {
                  var pendingSerie = $.extend(true, {}, chart.series[serieIndex]);
                  pendingSerie.values = chart.pendingDraw.values[serieIndex];
                  pendingSeries.push(pendingSerie);
               }

               this.ensureHeightIsValid();

               var pendingMax = new SeriesUtilities(!chart.smoothing).getMaxSerieValue(pendingSeries);
               var columns = pendingSeries[0].values.length;

               measurements.maxValue = pendingMax;
               measurements.yticks = chart.utils.getRawTicks(chart.calculateVerticalTicksOLD(columns, pendingSeries, pendingMax, chart.pendingDraw.timePeriods));
            }
            else {
               measurements.maxValue = this.max;
               measurements.yticks = chart.utils.getRawTicks(chart.options.yaxis.ticks);
            }

            return measurements;
         };

         chart.getMaxValue = function() {
            var seriesUtilities = new SeriesUtilities(!chart.smoothing);
            return seriesUtilities.getMaxSerieValue(this.series);
         };
         
         chart.getMinValue = function() {
            var seriesUtilities = new SeriesUtilities(!chart.smoothing);
            return seriesUtilities.getMinSerieValue(this.series);
         };
         
         chart.getXaxisColor = function() {
            return "rgba(0,0,0,0)"; //make the lines transparent
         };
         
         chart.getYaxisColor = function() {
            return "rgba(0,0,0,0)"; //make the lines transparent
         };
         
         chart.calculateHash = function(timePeriods) {
            var hash = 0;
            var hashMultiplier = 1;

            for (var timePeriodIndex = 0; timePeriodIndex < timePeriods.length; timePeriodIndex++) {
               var timePeriod = timePeriods[timePeriodIndex];
               
               hash += timePeriod.duration * hashMultiplier;
               hashMultiplier *= 100;
            }
            return hash;
         };
         
         chart.calculateXAxisTransformation = function(timePeriods) {
            log.debug("Calculating x-axis transformation for " + timePeriods.length + " time periods.");
            chart.xAxisTransformation = [];
            chart.xAxisInverseTransformation = [];
            
            var totalColumnIndex = 0;
            var accumulatedPercentage = 0;
            
            if (timePeriods.representationList) {
               for (var representationIndex = 0; representationIndex < timePeriods.representationList.length; representationIndex++) {
                  var representation = timePeriods.representationList[representationIndex];
                  chart.xAxisTransformation[totalColumnIndex] = representation.fromPercentage;
                  chart.xAxisInverseTransformation.push({ from: representation.fromPercentage, to: representation.toPercentage, index: totalColumnIndex});
                  detailLog.debug("   index: " + representationIndex + " transformed: " + representation.fromPercentage + " idx: " + totalColumnIndex);
                  accumulatedPercentage = representation.toPercentage;
                  totalColumnIndex++;
               }
            }
            else {
               for (var timePeriodIndex = 0; timePeriodIndex < timePeriods.length; timePeriodIndex++) {
                  var timePeriod = timePeriods[timePeriodIndex];
                  var columnWidth = timePeriod.widthPercentage / timePeriod.duration;

                  detailLog.debug("Time period " + timePeriodIndex);
                  for (var durationIndex = 0; durationIndex < timePeriod.duration; durationIndex++) {
                     var percentageFrom = accumulatedPercentage;
                     var percentageTo = accumulatedPercentage + columnWidth;
                     chart.xAxisTransformation[totalColumnIndex] = percentageFrom;
                     chart.xAxisInverseTransformation.push({ from: percentageFrom, to: percentageTo, index: totalColumnIndex});
                     detailLog.debug("   index: " + durationIndex + " transformed: " + percentageFrom + " idx: " + totalColumnIndex);
                     accumulatedPercentage += columnWidth;
                     totalColumnIndex++;
                  }
               }
            }
            chart.xAxisTransformation[totalColumnIndex] = 100;
            chart.xAxisInverseTransformation.push({ from: accumulatedPercentage, to: 100, index: totalColumnIndex});
            chart.xAxisTransformationHash = chart.calculateHash(timePeriods);
         };

         chart.setTopMargin = function(topMargin) {
            chart.topMargin = topMargin ? topMargin : 10;
         };

         chart.setTopValueFactor = function(topValueFactor) {
            chart.topValueFactor = topValueFactor;
         };

         chart.setSmoothing = function (smoothing) {
            chart.smoothing = smoothing;
         };
         
         chart.setAutoCalculateTicks = function (autoCalculateTicks) {
            chart.autoCalculateTicks = autoCalculateTicks;
         };
         
         chart.drawLabels = function(plot) {
            var element;
            for (var elementIndex = 0; elementIndex < chart.labelElements.length; elementIndex++) {
               element = chart.labelElements[elementIndex];
               element.remove();
            }
            chart.labelElements = [];
            
            var placeholder = $(chart.id);
            //Add currency string
            var currencyString;
            if (chart.useThousandsForTicks) {
               currencyString = chart.labelThounsandsForTicks; //this.getString("Charts.ThousandCurrency");
            }
            else {
               currencyString = chart.labelCurrency; //this.getString("Charts.Currency");
            }

            var yearString = chart.labelYearString; //this.getString("Charts.Year");
            
            element = $("<div class='chart-bottomright-label'>" + yearString + "</div>").appendTo(placeholder);
            chart.labelElements.push(element);
            
            var labelY = chart.topMargin - 20;
            if (labelY < 0) {
               labelY = 0;
            }
            
            element = $("<div class='chart-topleft-label' style='top: " + labelY + "px;'>" + currencyString + "</div>").appendTo(placeholder);
            chart.labelElements.push(element);

            //Titles
            for (var titleIndex = 0; titleIndex < chart.titles.length; titleIndex++) {
               var title = chart.titles[titleIndex];

               var offset = plot.pointOffset({ x: title.column, y: chart.max * chart.topValueFactor});
               var topPosition = labelY;
               var leftPosition = offset.left + 5;

               element = $("<div class='chart-topleft-label' style='left: " + leftPosition + "px; top: " + topPosition + "px'>" + title.label + "</div>").appendTo(placeholder);
               chart.labelElements.push(element);
            }
         };

         chart.tickFormatter = function(value, axis) {
            if (chart.topValueFactor > 1.0 && axis.direction === "y") {
               //If we have a plot already, hide the last tick
               if (chart.animator.plot) {
                  var axes = chart.animator.plot.getAxes();
                  var options = axes.yaxis.options;
                  if (options.ticks !== undefined && options.ticks.length > 0 && value >= options.ticks[options.ticks.length - 1]) {
                     return "";
                  }
               }
               //If we don't have a plot (i.e. it is the first time we are drawing)
               //use the max value to figure out which one we should hide
               if (value === chart.max * chart.topValueFactor) {
                  //The top value is just a "fake" value to give space for other labels,
                  //so we don't want to show this value
                  return "";
               }
            }
            

            return chart.utils.formatTickValue(value);
         };

         chart.getXTicks = function() {
            var plot = chart.animator.plot;
            if (plot === null) {
               return [];
            }

            var axes = plot.getAxes();
            return axes.xaxis.ticks;
         };

         chart.isSetForDrawing = function(orderParam) {
            for (var valueIndex = 0; valueIndex < chart.sets.length; valueIndex++) {
               if (chart.sets[valueIndex].order === orderParam) {
                  return true;
               }
            }
            return false;
         };

         chart.findPreviousSeriesValues = function(order) {
            for (var index = 0; index < chart.previousSeriesValues.length; index++) {
               var object = chart.previousSeriesValues[index];
               if (object.order === order) {
                  return object.values;
               }
            }
            return undefined;
         };
         
         chart.hideXAxis = function() {
            chart.showXAxis = false;
         };
         
         chart.setColumnMode = function() {
            chart.columnMode = true;
            chart.interactivity.useRoundingForColumnConversion = false;
         };

         // Data functions (used internally)

         chart._setTimePeriods = function(timePeriods) {
            log.debug("Setting time periods (" + timePeriods.length + ")");
            chart.previousTimePeriods = chart.timePeriods;

            chart.timePeriods = timePeriods;

            //chart.calculateXAxisTransformation(chart.timePeriods);
         };

         chart._setValues = function(valuesForSeries) {
            detailLog.debug("SET VALUES:");
            chart.previousSets = chart.sets;
            chart.previousMax = chart.max;
            chart.previousOptions = chart.options;
            chart.previousTitles = chart.titles;
            chart.previousColumns = chart.columns;

            chart.previousSeriesValues = [];
            for (var serieIndex = 0; serieIndex < chart.series.length; serieIndex++) {
               var serie = chart.series[serieIndex];
               chart.previousSeriesValues.push({order: serie.order, name: serie.name, color: serie.color, isLine: serie.isLine, lineThickness: serie.lineThickness, values: serie.values});
               serie.values = valuesForSeries[serieIndex];
               detailLog.debug("---> Serie " + serie.order + " (" + serie.name + ") values=" + JSON.stringify(serie.values));
            }
         };

         chart._setEndingLabel = function(endingLabel) {
            chart.endingLabel = endingLabel;
         };
         
         chart.isColumnIndexOnTimePeriod = function(index, timePeriods) {
            var duration = 0;
            for (var i = 0; i < timePeriods.length; i++) {
               duration += timePeriods[i].duration;
               if (index === duration) {
                  return true;
               }
            }
            return false;
         };

         function dumpArray(array) {
            for (var index = 0; index < array.length; index++) {
               detailLog.debug(JSON.stringify(array[index]));
               detailLog.debug("-------------------------------------------------------");
            }
         }

         function testSeries(series) {
            detailLog.debug("TESTING CHART");
            detailLog.debug("");

            var seriesUtilities = new SeriesUtilities(!chart.smoothing);

            if (series === undefined) {
               series = chart.series;
            }

            detailLog.debug("Series:");
            dumpArray(series);
            detailLog.debug("Columns: " + chart.columns);

            var sets = seriesUtilities.getSetsFromSeries(series, true);

            detailLog.debug("Sets:");
            dumpArray(sets);
            
            $.plot($(chart.id), sets, chart.options);

            return "done.";
         }

         function testSets(sets) {
            var plot = $.plot($(chart.id), sets, chart.options);
            chart.drawLabels(plot);
            
            return "done (" + sets.length + " sets)";
         }

         function testReset() {
            detailLog.debug("TESTING CHART (RESET)");
            detailLog.debug("");

            detailLog.debug("Sets:");
            dumpArray(chart.sets);

            chart.resetDrawing();

            return "done.";
         }

         return chart;
      };
   };

   return BarChart;
});


define('bar-graph', [
   'parameters-manager',
   'logger',
   'common-bar-chart',
   'common-currency-formatter'
], function(parametersManager, Logger, BarChart, CurrencyFormatter) {
   'use strict';
   
   /**
    * Bar Graph
    *
    * Specific functions expected to be defined in the bridge:
    *
    * - updateChart(barChart): should set the values for time periods and sets
    *
    * @param {type} app
    * @returns {unresolved}
    */
   
   var log = Logger.get('BarGraph');
   
   return function(app) {
      return app.component('barGraph', {
         bindings: {
            id: '@',
            bridge: '='
         },
         templateUrl: 'src/directives/graphs/bar-graph/bar-graph.html',
         controller: [function() {
            log.debug("START BAR GRAPH");
            
            var that = this;
            
            if (that.id !== undefined && that.id.length > 0) {
               that.fieldId = that.id.replace(/\./g, '_');
            }
            else {
               that.fieldId = "";
            }
            
            that.canvasId = that.fieldId + "BarCanvas";
            
            that.bridge.update = function() {
               log.debug("UPDATE: " + that.canvasId);
               that.refreshHandler.update();
            };
            
            that.bridge.forceDraw = function() {
               log.debug("FORCE DRAW: #" + that.canvasId);
               that.refreshHandler.forceDraw();
            };

            that.bridge.getVisibleRefreshHandlers = function() {
               return [that.refreshHandler];
            };
            
            that.bridge.getChart = function() {
               return that.getBarChart();
            };
            
            that.getBarChart = function() {
               if (!that.barChart) {
                  that.barChart = new BarChart().createBarChart(
                     that.canvasId,
                     new CurrencyFormatter(parametersManager.baseViewParameters.groupDelimiter,
                                           parametersManager.baseViewParameters.amountDecimalDelimiter,
                                           parametersManager.baseViewParameters.useMixedGroupingSeparator));
                  that.bridge.setupChart(that.barChart);
               }
               return that.barChart;
            };
            
            var updater = that.bridge.createChartUpdater(that.getBarChart(), function(barChart) {
               that.bridge.updateChart(barChart);
            });
            that.refreshHandler = that.bridge.createRefreshHandler(that.canvasId, updater);
            
         }]
      });
   };
   
});


define('expandable-panel-list', [
], function() {
   'use strict';

   return function(app) {
      return app.component('expandablePanelList', {
         restrict: 'E',
         transclude: true,
         templateUrl: 'src/directives/expandable-panel-list/expandable-panel-list.html',
         bindings: {
            bridge: '=?'
         },
         controller: function() {
            var that = this;
            that.expandedPanelId = null;

            that.bridge.expandedPanelId = function() {
               return that.expandedPanelId;
            };

            that.bridge.collapse = function() {
               that.expandedPanelId = null;
            };

            that.bridge.isExpanded = function(id) {
               return (id === that.expandedPanelId);
            };

            that.bridge.expand = function(id) {
               if (that.expandedPanelId === id) {
                  that.expandedPanelId = null;
               }
               else {
                  that.expandedPanelId = id;
               }
            };
         }
      });
   };
});


define('expandable-panel', [],function() {
   'use strict';

   return function(app) {
      return app.component('expandablePanel', {
         restrict: 'E',
         transclude: true,
         bindings: {
         },
         templateUrl: 'src/directives/expandable-panel/expandable-panel.html',
         controller: function() {
         }
      });
   };
});


define('expandable-panel-item', [],function() {
   'use strict';

   return function(app) {
      return app.component('expandablePanelItem', {
         restrict: 'E',
         transclude: true,
         bindings: {
            isExpanded: '=?'
         },
         templateUrl: 'src/directives/expandable-panel-item/expandable-panel-item.html',
         controller: function() {
         }
      });
   };
});


define('app', [
   'require',
   'angular',
   'logger',
   'routes-handler',
   'parameters-manager',
   'theme-manager',
   'route-resolver',
   'route-registrator',
   'angular-route',
   'angular-animate',
   'angular-sanitize',
   'bootstrap',
   'ui-bootstrap',
   'state',
   'base-state',
   'tax-calculator',
   'rpopulaires-calculator',
   'multicalc-state',
   'formatter',
   'localization',
   'route-translator',
   'localization-filter',
   'localization-directive',
   'loading-controller',
   'active-controller',
   'custom-filters',
   'language-controller',
   'calculators-manager',
   'storage-manager',
   'version-manager',
   'calculator-item-link',
   'store-method-link',
   'text-field',
   'icon-button-bar',
   'navigation-bar',
   'title-link',
   'debugging-view',
   'theme-box',
   'base-data-summary',
   'multicalc-risk',
   'multicalc-saving3a',
   'profile-bar',
   'profile-common',
   'custom-scripts',
   'message-service',
   'google-analytics-service',
   'print-service',
   'file-service',
   'authentication-service',
   'storage-service',
   'product-list-service',
   'calculator-service',
   'zip-and-location-service',
   'basket-service',
   'media-service',
   'statistics-service',
   'log-statistics-service',
   'location-service',
   'location-breadcrumbs',
   'model-updater',
   'tab-selector',
   'tab-selector-link',
   'topic-chooser',
   'topic-link',
   'topic-panel',
   'donut-graph',
   'column-graph',
   'bar-graph',
   'expandable-panel-list',
   'expandable-panel',
   'expandable-panel-item'
], function(require, angular, Logger, RoutesHandler, parametersManager) {
   'use strict';

   function configureLoggers() {
      //Generic
      Logger.get('AsynchronousModeProfile').setLevel(Logger.ERROR);
      Logger.get('AsynchronousModeDetailedProfile').setLevel(Logger.ERROR);
      
      //Directives
      Logger.get('NumericField').setLevel(Logger.ERROR);
      Logger.get('SliderField').setLevel(Logger.ERROR);
      Logger.get('DonutGraph').setLevel(Logger.ERROR);
      Logger.get('ColumnGraph').setLevel(Logger.ERROR);
      Logger.get('BarGraph').setLevel(Logger.ERROR);

      //Filters
      Logger.get('LocalizationFilter').setLevel(Logger.ERROR);

      //Services
      Logger.get('localization').setLevel(Logger.ERROR);
      Logger.get('localizationDetail').setLevel(Logger.ERROR);
      Logger.get('savingCalculator').setLevel(Logger.ERROR);
      Logger.get('RPopulairesCalculator').setLevel(Logger.ERROR);
      Logger.get('Formatter').setLevel(Logger.ERROR);
      Logger.get('LoadingService').setLevel(Logger.ERROR);
      Logger.get('LoadingController').setLevel(Logger.ERROR);
      Logger.get('TaxCalculator').setLevel(Logger.ERROR);
      Logger.get('messageService').setLevel(Logger.ERROR);
      Logger.get('googleAnalyticsService').setLevel(Logger.ERROR);
      Logger.get('printService').setLevel(Logger.ERROR);
      Logger.get('fileService').setLevel(Logger.ERROR);
      Logger.get('authenticationService').setLevel(Logger.ERROR);
      Logger.get('storageService').setLevel(Logger.ERROR);
      Logger.get('calculatorService').setLevel(Logger.ERROR);
      Logger.get('zipAndLocationService').setLevel(Logger.ERROR);
      Logger.get('productListService').setLevel(Logger.ERROR);
      Logger.get('routeTranslator').setLevel(Logger.ERROR);
      Logger.get('versionManager').setLevel(Logger.ERROR);
      Logger.get('mediaService').setLevel(Logger.ERROR);
      Logger.get('statisticsService').setLevel(Logger.ERROR);
      Logger.get('logStatisticsService').setLevel(Logger.ERROR);
      Logger.get('locationService').setLevel(Logger.ERROR);

      //Common
      Logger.get('RefreshHandler').setLevel(Logger.ERROR);
      Logger.get('ScopeHelper').setLevel(Logger.ERROR);
      Logger.get('ThemeManager').setLevel(Logger.ERROR);
      Logger.get('BaseChart').setLevel(Logger.ERROR);
      Logger.get('ComparativeChart').setLevel(Logger.ERROR);
      Logger.get('BarChart').setLevel(Logger.ERROR);
      Logger.get('BarChartDetail').setLevel(Logger.ERROR);
      Logger.get('BarChartDelegate').setLevel(Logger.ERROR);
      Logger.get('BarChartDelegateDetail').setLevel(Logger.ERROR);
      Logger.get('SingleBarChart').setLevel(Logger.ERROR);
      Logger.get('AreaChart').setLevel(Logger.ERROR);
      Logger.get('DonutChart').setLevel(Logger.ERROR);
      Logger.get('ColumnChart').setLevel(Logger.ERROR);
      Logger.get('ChartAnimator').setLevel(Logger.ERROR);
      Logger.get('ChartAnimatorFlow').setLevel(Logger.ERROR);
      Logger.get('ChartAnimatorDetail').setLevel(Logger.ERROR);
      Logger.get('ChartAnimatorTiming').setLevel(Logger.ERROR);
      Logger.get('ChartAnimatorAnimationDetail').setLevel(Logger.ERROR);
      Logger.get('ChartInteractivity').setLevel(Logger.ERROR);
      Logger.get('HouseObject').setLevel(Logger.ERROR);
      Logger.get('PercentageIndicator').setLevel(Logger.ERROR);
      Logger.get('ObjectUtilities').setLevel(Logger.ERROR);
      Logger.get('SeriesUtilities').setLevel(Logger.ERROR);
      Logger.get('SeriesUtilitiesDetail').setLevel(Logger.ERROR);
      Logger.get('ChartUtilities').setLevel(Logger.ERROR);

      //Base Controllers
      Logger.get('Base').setLevel(Logger.ERROR);
      Logger.get('BaseStatus').setLevel(Logger.ERROR);
      Logger.get('BaseUrlParameters').setLevel(Logger.ERROR);
      Logger.get('BaseSaving').setLevel(Logger.ERROR);
      Logger.get('CustomBaseController').setLevel(Logger.ERROR);

      //Calculator Controllers
      Logger.get('Multicalc').setLevel(Logger.ERROR);
      Logger.get('MulticalcDisability').setLevel(Logger.ERROR);
      Logger.get('MulticalcSaving3a').setLevel(Logger.ERROR);
      Logger.get('MulticalcScenario').setLevel(Logger.ERROR);
      Logger.get('MulticalcRisk').setLevel(Logger.ERROR);
   }

   //Logging configuration
   Logger.useDefaults();
   Logger.setHandler(function(messages, context) {
      var console = window.console;
      var hdlr = console.log;

      if (console.debug) {
         hdlr = console.debug;
      }

      if (context.level === Logger.WARN) {
         messages[0] = "WARNING: " + messages[0];
      }
      else if (context.level === Logger.ERROR) {
         messages[0] = "ERROR: " + messages[0];
         hdlr = console.error;
      }

      // Prepend the logger's name to the log message for easy identification.
      if (context.name) {
         messages[0] = "[" + context.name + "] " + messages[0];
      }

      // Prepend the time to the log message
      var time = new Date().getTime();
      messages[0] = String(time) + " " + messages[0];

      hdlr.apply(console, messages);
   });

   configureLoggers();

   var app = angular.module('app', [
      'ngRoute',
      'ngAnimate',
      'ngSanitize',
      'routeResolverServices',
      'routeRegistratorServices',
      'ui.bootstrap',
      'storageManagerModule',
      'versionManagerModule',
      'stateModule',
      'baseStateModule',
      'rpopulairesCalculatorModule',
      'formatterModule',
      'taxCalculatorModule',
      'activeControllerModule',
      'multicalcStateModule',
      'localization',
      'route-translator',
      'localizationFilter',
      'localizationDirective',
      'customFilters',
      'loadingModule',
      'calculatorsManagerModule',
      'messageServiceModule',
      'googleAnalyticsServiceModule',
      'printServiceModule',
      'fileServiceModule',
      'authenticationServiceModule',
      'storageServiceModule',
      'calculatorServiceModule',
      'zipAndLocationServiceModule',
      'productListServiceModule',
      'locationBreadcrumbsModule',
      'modelUpdaterModule',
      'basketServiceModule',
      'profileCommonModule',
      'mediaServiceModule',
      'statisticsServiceModule',
      'logStatisticsServiceModule',
      'locationServiceModule'
   ]);

   require('language-controller')(app);
   require('calculator-item-link')(app);
   require('store-method-link')(app);
   require('text-field')(app);
   require('custom-icon-button-bar')(app);
   require('icon-button-bar')(app);
   require('navigation-bar')(app);
   require('title-link')(app);
   require('profile-bar')(app);
   require('debugging-view')(app);
   require('theme-box')(app);
   require('base-data-summary')(app);
   require('multicalc-risk')(app);
   require('multicalc-saving3a')(app);
   require('tab-selector')(app);
   require('tab-selector-link')(app);
   require('donut-graph')(app);
   require('column-graph')(app);
   require('topic-chooser')(app);
   require('topic-link')(app);
   require('topic-panel')(app);
   require('bar-graph')(app);
   require('expandable-panel-list')(app);
   require('expandable-panel')(app);
   require('expandable-panel-item')(app);

   app.config(['$routeProvider',
      'routeResolverProvider',
      'routeRegistratorProvider',
      '$controllerProvider',
      '$compileProvider',
      '$filterProvider',
       '$locationProvider', /* uncomment_on_deployment */
      '$provide',
      function($routeProvider,
         routeResolverProvider,
         routeRegistratorProvider,
         $controllerProvider,
         $compileProvider,
         $filterProvider,
          $locationProvider, /* uncomment_on_deployment */
         $provide) {

      $provide.factory('$routeProvider', function () {
         return $routeProvider;
      });

      app.register = {
          controller: $controllerProvider.register,
          directive: $compileProvider.directive,
          component: app.component,
          filter: $filterProvider.register,
          factory: $provide.factory,
          service: $provide.service
      };

      // use the HTML5 History API
       if (!window.isIE9) { /* uncomment_on_deployment */
          $locationProvider.html5Mode(true).hashPrefix('!');  /* uncomment_on_deployment */
          RoutesHandler.html5 = true;       /* uncomment_on_deployment */
       } /* uncomment_on_deployment */

      // Define routes - controllers will be loaded dynamically
      var routeResolver = routeResolverProvider.route;
      var routeRegistrator = routeRegistratorProvider.routeRegistrator;

      routeRegistrator.registerRoute($routeProvider, routeResolver, 'en'); /* for_development_only */

      // register routes for available languages
      for (var index = 0; index < parametersManager.baseViewParameters.availableLanguages.length; index++) {
         var language = parametersManager.baseViewParameters.availableLanguages[index];
         routeRegistrator.registerRoute($routeProvider, routeResolver, language);
      }
   }]);

   app.run(['$rootScope', function($rootScope) {
      // Fix for problem on full refresh of the application when embedded in an iframe on Firefox.
      // The problem is that Firefox fails to update the location.href of the iframe when performing a full refresh (Ctrl+Shift+r).
      // The problem is better explained here: https://bugzilla.mozilla.org/show_bug.cgi?id=849605 (unsolved at the moment of this writing).
      // That causes confusion to Angular's $locationWatch, which keeps triggering location changes, because it compares to the non-updated location.href.
      // This continues until Firefox detects a script running forever, making Firefox unresponsive (memory and cpu usage raises), and eventually crashing.
      // The fix consist in manually updating the location.href of the iframe.
      $rootScope.singleCalculation = parametersManager.baseViewParameters.singleCalculation;
      $rootScope.navigationBar = parametersManager.baseViewParameters.navigationBar;
      $rootScope.consultantMode = parametersManager.baseApplicationParameters.consultantMode;
      $rootScope.showCopyrightDisclaimer = parametersManager.baseViewParameters.showCopyrightDisclaimer;
      $rootScope.hasAuthenticationURL =
               parametersManager.baseApplicationParameters.authenticationServiceURL !== undefined &&
               parametersManager.baseApplicationParameters.authenticationServiceURL !== null &&
               parametersManager.baseApplicationParameters.authenticationServiceURL !== '';

      $rootScope.appVersion = window.appVersion;
      $rootScope.hasVersion = window.appVersion !== "raven_version" ;

      window.onhashchange = function() {
         $('.modal.in').removeClass('in').modal('hide');
         $('.modal-backdrop').hide();
      };



      // check for Firefox and iframe
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && window.frameElement !== null) {
         // watch location changes, the new url is sent as parameter (see Angular's $locationWatch and afterLocationChange)
         $rootScope.$on('$locationChangeSuccess', function(event, newURL) {
            // check if the url is really different to avoid triggering any undesired side-effects
            if (location.href !== newURL) {
               // update the location.href of the iframe (what Firefox for some reason fails to do)
               location.href = newURL;
            }
         });
      }
   }]);

   return app;
});


define('app-startup', [
   'require',
   'angular',
   'parameters-manager',
   'domReady',
   'app'
], function(requireFunction, angular, parametersManager) {
   'use strict';

   requireFunction(['domReady!'], function(document) {
      // Add paths for RequireJS.
      // Allows setting deploy paths as parameters
      if (typeof(parametersManager.baseApplicationParameters.requirePaths) === "object") {
         require.config({
            paths: parametersManager.baseApplicationParameters.requirePaths
         });
      }

      angular.bootstrap(document, ['app']);
   });
});


require.config({
   // alias libraries paths
   paths: {
      'domReady': [
         '../lib/requirejs-2.3.5/domReady-2.0.1-dev', /* for_development_only */

         '../lib/requirejs-2.3.5/domReady-2.0.1'
      ],
      'angular': [
         '../lib/angular-1.5.11/angular', /* for_development_only */

         '../lib/angular-1.5.11/angular.min'
      ],
      'angular-route': [
         '../lib/angular-1.5.11/angular-route', /* for_development_only */

         '../lib/angular-1.5.11/angular-route.min'
      ],
      'angular-animate': [
         '../lib/angular-1.5.11/angular-animate', /* for_development_only */

         '../lib/angular-1.5.11/angular-animate.min'
      ],
      'angular-sanitize': [
         '../lib/angular-1.5.11/angular-sanitize', /* for_development_only */

         '../lib/angular-1.5.11/angular-sanitize.min'
      ],
      'ui-bootstrap': [
         '../lib/ui-bootstrap-0.13.2/ui-bootstrap-tpls-0.13.2', /* for_development_only */

         '../lib/ui-bootstrap-0.13.2/ui-bootstrap-tpls-0.13.2.min'
      ],
      'bootstrap': [
         '../lib/bootstrap-sass-3.3.7/assets/javascripts/bootstrap', /* for_development_only */

         '../lib/bootstrap-sass-3.3.7/assets/javascripts/bootstrap.min'
      ],
      'kineticjs': [
         '../lib/kineticjs-5.2.0/kinetic-v5.2.0', /* for_development_only */

         '../lib/kineticjs-5.2.0/kinetic-v5.2.0.min'
      ],
      'jquery': [
         '../lib/jquery-3.2.1/jquery-3.2.1', /* for_development_only */

         '../lib/jquery-3.2.1/jquery-3.2.1.min'
      ],
      'jquery-flot': [
         '../framework/app/lib/flot-0.8.2/jquery.flot', /* for_development_only */

         '../framework/app/lib/flot-0.8.2/jquery.flot.min'
      ],
      'jquery-flot-stack': [
         '../framework/app/lib/flot-0.8.2/jquery.flot.stack', /* for_development_only */

         '../framework/app/lib/flot-0.8.2/jquery.flot.stack.min'
      ],
      'jquery-flot-axislabels': [
         '../framework/app/lib/flot-0.8.2/jquery.flot.axislabels'
      ],
      'jquery-flot-pie': [
         '../framework/app/lib/flot-0.8.2/jquery.flot.pie', /* for_development_only */

         '../framework/app/lib/flot-0.8.2/jquery.flot.pie.min'
      ],
      'jquery-flot-resize': [
         '../framework/app/lib/flot-0.8.2/jquery.flot.resize', /* for_development_only */

         '../framework/app/lib/flot-0.8.2/jquery.flot.resize.min'
      ],
      'jquery-visible': [
         '../lib/jquery-visible-1.2.0/jquery.visible', /* for_development_only */
         '../lib/jquery-visible-1.2.0/jquery.visible.min'
      ],
      'jquery-easing': [
         '../lib/jquery-easing-compatibility-1/jquery.easing.compatibility'
       ],
       'jquery-ui': [
          '../lib/jquery-ui-1.10.4/js/jquery-ui-1.10.4', /* for_development_only */
          '../lib/jquery-ui-1.10.4/js/jquery-ui-1.10.4.min'
       ],
       'jquery-ui-touch-punch': [
          '../lib/jquery-ui-touch-punch-master-0.2.3/jquery.ui.touch-punch', /* for_development_only */
          '../lib/jquery-ui-touch-punch-master-0.2.3/jquery.ui.touch-punch.min'
       ],
      'logger': [
         '../lib/logger-1.2.0/logger', /* for_development_only */
         '../lib/logger-1.2.0/logger.min'
      ],
      'filesaver': [
         '../lib/filesaver-2014.11.29/FileSaver', /* for_development_only */

         '../lib/filesaver-2014.11.29/FileSaver.min'
      ],
      'ng-storage': [
         '../lib/ngStorage-0.3.10/ngStorage', /* for_development_only */

         '../lib/ngStorage-0.3.10/ngStorage.min'
      ],
      'handlebars' : [
         '../lib/handlebars-3.0.3/handlebars', /* for_development_only */

         '../lib/handlebars-3.0.3/handlebars.min'
      ],
      'swag' : [
         '../lib/swag-0.6.1/swag', /* for_development_only */
         '../lib/swag-0.6.1/swag.min'
      ],
      'easing' : '../framework/app/lib/easing/easing',
      'toastr': [
         '../lib/toastr/toastr', /* for_development_only */

         '../lib/toastr/toastr.min'
      ],
      'wolf-calc': [
         '../lib/wolf/ch.logismata.online.calc', /* for_development_only */
         'https://services.logismata.ch/components/wolf/ch.logismata.online.calc-min'
      ],
      'wolf-tools': [
         '../lib/wolf/ch.logismata.wolftools-min' // intentionally not marked as for development only, as wolftools are not deployed online like other wolf libs
      ],
      'wolf-rpopulaires': [
         '../lib/wolf/ch.logismata.rpopulaires.calc', /* for_development_only */
         'https://services.logismata.ch/components/wolf/ch.logismata.rpopulaires.calc-min'
      ],

      'common-currency-formatter' : '../framework/app/src/common/currency-formatter',
      'common-localization' : '../framework/app/src/common/localization',
      'common-percentage-indicator' : '../framework/app/src/common/percentage-indicator',
      'base-chart' : '../framework/app/src/common/chart/base-chart',
      'base-bar-chart' : '../framework/app/src/common/chart/base-bar-chart',
      'common-chart-utilities' : '../framework/app/src/common/chart/chart-utilities',
      'common-comparative-chart' : '../framework/app/src/common/chart/comparative-chart',
      'common-column-chart' : '../framework/app/src/common/chart/column-chart',
      'common-bar-chart' : '../framework/app/src/common/chart/bar-chart',
      'common-bar-chart-delegate' : '../framework/app/src/common/chart/bar-chart-delegate',
      'common-single-bar-chart' : '../framework/app/src/common/chart/single-bar-chart',
      'common-area-chart' : '../framework/app/src/common/chart/area-chart',
      'common-donut-chart' : '../framework/app/src/common/chart/donut-chart',
      'common-chart-animator' : '../framework/app/src/common/chart/chart-animator',
      'common-chart-interactivity' : '../framework/app/src/common/chart/chart-interactivity',
      'common-series-utilities': '../framework/app/src/common/chart/series-utilities',
      'common-house' : '../framework/app/src/common/house',
      'common-refresh-handler' : '../framework/app/src/common/refresh-handler',
      'common-numeric-parameter': '../framework/app/src/common/numeric-parameter',
      'common-simple-pass-evaluator': '../framework/app/src/common/simple-pass-evaluator',
      'theme-manager': '../framework/app/src/common/theme-manager',
      'common-object-utilities': '../framework/app/src/common/object-utilities',
      'version-transformations': '../framework/app/src/common/version-transformations',
      'common-extend-deep': '../framework/app/src/common/extend-deep',
      'common-number-utilities': '../framework/app/src/common/number-utilities',
      'common-color-tool-set' : '../framework/app/src/common/color-tool-set',

      'float': 'directives/float',
      'int': 'directives/int',
      'theme-box': 'directives/theme-box/theme-box',
      'result-summary-box': 'directives/result-summary-box/result-summary-box',
      'calculation-header': 'directives/calculation-header/calculation-header',
      'link-to-view': 'directives/link-to-view/link-to-view',
      'theme-header': 'directives/theme-header/theme-header',
      'fancy-box': 'directives/fancy-box/fancy-box',
      'tab-selector': 'directives/tab-selector/tab-selector',
      'tab-selector-link': 'directives/tab-selector-link/tab-selector-link',
      'topic-chooser': 'directives/topic-chooser/topic-chooser',
      'topic-link': 'directives/topic-link/topic-link',
      'topic-panel': 'directives/topic-panel/topic-panel',
      'donut-graph': 'directives/graphs/donut-graph/donut-graph',
      'column-graph': 'directives/graphs/column-graph/column-graph',
      'bar-graph': 'directives/graphs/bar-graph/bar-graph',
      'calculator-item-link': 'directives/calculator-item-link/calculator-item-link',
      'store-method-link': 'directives/store-method-link/store-method-link',
      'numeric-field': 'directives/fields/numeric-field/numeric-field',
      'slider-field': 'directives/fields/slider-field/slider-field',
      'label-field': 'directives/fields/label-field/label-field',
      'email-field': 'directives/fields/email-field/email-field',
      'captcha': 'directives/fields/captcha/captcha',
      'text-field': 'directives/fields/text-field/text-field',
      'password-field': 'directives/fields/password-field/password-field',
      'selection-field': 'directives/fields/selection-field/selection-field',
      'list-selection-field': 'directives/fields/list-selection-field/list-selection-field',
      'list-group-field': 'directives/fields/list-group-field/list-group-field',
      'radio-field': 'directives/fields/radio-field/radio-field',
      'checkbox-field': 'directives/fields/checkbox-field/checkbox-field',
      'zip-and-location-field': 'directives/fields/zip-and-location-field/zip-and-location-field',
      'search-field': 'directives/fields/search-field/search-field',
      'two-tab-field': 'directives/fields/two-tab-field/two-tab-field',
      'localization-directive': 'directives/localization-directive',
      'enter-press': 'directives/enter-press',
      'visibility': 'directives/visibility/visibility',
      'typeahead-watch-changes': 'directives/typeahead-watch-changes',
      'base-data-summary': 'directives/base-data-summary/base-data-summary',
      'table-row': 'directives/table-row/table-row',
      'table-row-list': 'directives/table-row-list/table-row-list',
      'icon-button-bar': 'directives/icon-button-bar/icon-button-bar',
      'custom-icon-button-bar': 'directives/icon-button-bar/custom-icon-button-bar',
      'navigation-bar': 'directives/navigation-bar/navigation-bar',
      'title-link': 'directives/title-link/title-link',
      'debugging-view': 'directives/debugging-view/debugging-view',
      'profile-bar': 'directives/profile-bar/profile-bar',
      'profile-common': 'services/profile-common',
      'expandable-panel-list': 'directives/expandable-panel-list/expandable-panel-list',
      'expandable-panel': 'directives/expandable-panel/expandable-panel',
      'expandable-panel-item': 'directives/expandable-panel-item/expandable-panel-item',
      'application-constants': 'model/application-constants',
      'model-constants': 'model/model-constants',
      'enums-constants': 'model/enums-constants',
      'base-model': 'model/base-model',
      'base-state': 'model/base-state',
      'state': 'model/state',
      'model-updater': 'model/versions/model-updater',
      'model-version-1.0': 'model/versions/model-version-1.0',
      
      'base-controller': 'controllers/base/base',
      'basic-base-controller': 'controllers/base/basic-base',
      'base-incomes-calculator-controller': 'controllers/base/base-incomes-calculator',
      'base-url-parameters-controller': 'controllers/base/base-url-parameters',
      'custom-base-controller': 'controllers/base/custom-base',
      'common-scope-helper' : 'controllers/common/scope-helper',
      'language-controller': 'controllers/language/language-controller',
      'custom-overview-controller': 'controllers/overview/custom-overview',
      'overview-controller': 'controllers/overview/overview',
      'parameters-manager': 'model/parameters-manager',
      'parameters-decorator': 'model/parameters-decorator',
      'base-application-parameters': 'model/base-application-parameters',
      'base-model-parameters': 'model/base-model-parameters',
      'base-view-parameters': 'model/base-view-parameters',
      'custom-application-parameters': 'model/custom-application-parameters',
      'custom-model-parameters': 'model/custom-model-parameters',
      'custom-view-parameters': 'model/custom-view-parameters',
      'deploy-application-parameters': 'model/deploy-application-parameters',
      'deploy-model-parameters': 'model/deploy-model-parameters',
      'deploy-view-parameters': 'model/deploy-view-parameters',
      'runtime-environment-application-parameters': 'model/runtime-environment-application-parameters',
      'runtime-environment-model-parameters': 'model/runtime-environment-model-parameters',
      'runtime-environment-view-parameters': 'model/runtime-environment-view-parameters',

      'edit-dialog-box': 'directives/edit-dialog-box/edit-dialog-box',
      'detail-utils': 'controllers/common/detail-utils',
      'multicalc-manager': 'controllers/common/multicalc/multicalc-manager',

      'multicalc-model': 'controllers/multicalc/multicalc-model',
      'multicalc-state': 'controllers/multicalc/multicalc-state',
      'multicalc-controller': 'controllers/multicalc/multicalc',
      'multicalc-personal-data': 'controllers/multicalc/multicalc-personal-data/multicalc-personal-data',
      'multicalc-risk': 'controllers/multicalc/multicalc-risk/multicalc-risk',
      'multicalc-saving3a': 'controllers/multicalc/multicalc-saving3a/multicalc-saving3a',

      'custom-filters': 'filters/custom-filters',
      'localization-filter': 'filters/localization-filter',

      'formatter': 'services/formatter',
      'tax-calculator': 'services/tax-calculator',
      'rpopulaires-calculator': 'services/rpopulaires-calculator',
      'localization': 'services/localization',
      'route-translator' : 'services/route-translator',
      'active-controller': 'services/active-controller',
      'loading-controller': 'services/loading-controller',
      'route-resolver': 'services/route-resolver',
      'route-registrator': 'services/route-registrator',
      'custom-route-registrator': 'services/custom-route-registrator',
      'routes-handler': 'services/routes-handler',
      'calculators-manager': 'services/calculators-manager',
      'storage-manager': 'services/storage-manager',
      'version-manager': 'services/version-manager',
      'message-service': 'services/message-service',
      'google-analytics-service': 'services/google-analytics-service',
      'print-service': 'services/print-service',
      'file-service': 'services/file-service',
      'authentication-service': 'services/authentication-service',
      'storage-service': 'services/storage-service',
      'product-list-service': 'services/product-list-service',
      'calculator-service': 'services/calculator-service',
      'zip-and-location-service': 'services/zip-and-location-service',
      'media-service': 'services/media-service',
      'statistics-service': 'services/statistics-service',
      'location-service': 'services/location-service',
      'log-statistics-service': 'services/log-statistics-service',
      'basket-service': 'services/basket-service',
      'location-breadcrumbs': 'services/location-breadcrumbs',
      'user-modules-service': 'services/user-modules-service' /* CUSTOM_MAIN_PATHS */
   },
   // angular does not support AMD out of the box, put it in a shim
   shim: {
      'domReady' : {
         exports: 'domReady'
      },
      'jquery' : {
         exports: 'jquery'
      },
      'angular': {
         exports: 'angular',
         deps: ['jquery']
      },
      'angular-route': {
         exports: 'angular_route',
         deps: ['angular']
      },
      'angular-animate': {
         exports: 'angular_animate',
         deps: ['angular']
      },
      'angular-sanitize': {
         exports: 'angular_sanitize',
         deps: ['angular']
      },
      'ui-bootstrap': {
         exports: 'ui_bootstrap',
         deps: ['angular', 'angular-animate']
      },
      'bootstrap': {
         exports: 'bootstrap',
         deps: ['jquery']
      },
      'kineticjs': {
         exports: 'kineticjs'
      },
      'handlebars': {
         exports: 'handlebars'
      },
      'swag': {
         exports: 'swag',
         deps: ['handlebars']
      },
      'jquery-flot': {
         exports: 'jquery_flot',
         deps: ['jquery']
      },
      'jquery-flot-stack': {
         exports: 'jquery_flot_stack',
         deps: ['jquery-flot']
      },
      'jquery-flot-axislabels': {
         exports: 'jquery_flot_axislabels',
         deps: ['jquery-flot-stack']
      },
      'jquery-flot-pie': {
         exports: 'jquery_flot_pie',
         deps: ['jquery-flot-axislabels']
      },
      'jquery-flot-resize': {
         exports: 'jquery_flot_resize',
         deps: ['jquery-flot-pie']
      },
      'jquery-ui': {
         exports: 'jquery-ui',
         deps: ['jquery']
      },
      'jquery-ui-touch-punch': {
         exports: 'jquery-ui-touch-punch',
         deps: ['jquery-ui']
      },
      'filesaver': {
         exports: 'filesaver'
      },
      'ng-storage': {
         exports: 'ng-storage',
         deps: ['angular']
      },
      'wolf-calc': {
         exports: 'wolf_calc'
      },
      'wolf-tools': {
         exports: 'wolf_tools'
      },
      'wolf-rpopulaires': {
         exports: 'wolf_rpopulaires'
      },
      'jquery-visible': {
         exports: 'jquery_visible',
         deps: ['jquery']
      },
      'jquery-easing': {
         exports: 'jquery-easing',
         deps: ['jquery', 'jquery-ui']
      },
      'easing': {
         exports: 'easing'
      },
      'toastr': {
         exports: 'toastr',
         deps: ['jquery']
      }
   },
   // kick start application
   deps: ['app-startup']
});

define("main", function(){});


define('common-refresh-handler', ['logger', 'jquery-visible'],
function(Logger) {
   'use strict';
   var log = Logger.get('RefreshHandler');
   /**
    * Constructor for the refresh handler.
    * 
    * @param {string} elementId Tag id of the component to control
    * @param {object} updater Object with an "update()" method
    * @param {boolean} repaintWhenResizing
    * @returns {RefreshHandler}
    */
   var RefreshHandler = function(elementId, updater, repaintWhenResizing) {
      this.isDirty = false;
      this.elementId = elementId;
      this.updater = updater;
      if (repaintWhenResizing) {
         this.repaintWhenResizing = repaintWhenResizing;
      }
      else {
         this.repaintWhenResizing = true;
      }
      this.drawingEnabled = true;
      this.pendingDrawing = false;
      this.pendingDrawingForced = false;
      this.drawingInterval = null;
      this.drawingRequests = 0;
      this.enabled = true;
   };

   /**
    * Indicates if the component is at least partially
    * shown on screen.
    * @returns bool
    */
   RefreshHandler.prototype.isOnScreen = function() {
      try {
         var element = $('#' + this.elementId);
         //TODO: if we check for real visibility (i.e. not hidden), we sometimes
         //      end up with inconsistent charts because some needed draws are skipped.
         //      Without this hack, though, we have small flickerings.
         //      To be further analyzed.
         /*var visible = element.is(":visible");
         if (!visible) {
            log.warn("Element " + this.elementId + " is hidden");
            return false;
         }*/
         
         return element.visible(true);
      }
      catch (exception) {
         //If the component is not available an exception is thrown.
         //We just ignore it and assume that the component is not
         //on screen (at least, it's not fully functional yet)
         log.warn("Exception when checking on screen visibility of " + this.elementId);
         return false;
      }
   };

   /**
    * Refresh the component if it just appeared on screen and it
    * was marked as dirty.
    * @param {boolean} forced
    */
   RefreshHandler.prototype.refresh = function(forced) {
      //if ((this.isDirty || this.repaintWhenResizing) && this.isOnScreen()) {
      if (this.isDirty || this.repaintWhenResizing) {
         log.debug("COMPONENT " + this.elementId + " was dirty and became visible ==> Refresh");
         if (forced) {
            this.forceDraw();
         }
         else {
            this.draw();
         }
      }
   };

   /**
    * This method updates (redraws) the component if it's being
    * shown on screen. If the component is not shown, it is marked
    * as dirty, so the next time it comes on screen it will be updated.
    */
   RefreshHandler.prototype.update = function() {
      /*if (!this.isOnScreen()) {
         log.debug("AVOID UPDATE FOR COMPONENT " + this.elementId);
         this.isDirty = true;
         return;
      }*/
      log.debug("Updating " + this.elementId);
      this.finalDraw();
      this.isDirty = false;
   };

   /**
    * This method draws the component no matter if it is being shown 
    * on screen or not. Useful at initialization time, when the 
    * components are available but still not properly recognized
    * by the visibility check.
    */
   RefreshHandler.prototype.draw = function() {
      if (!this.enabled) {
         log.debug("RefreshHandler for " + this.elementId + " already disabled, skipping draw");
         return;
      }

      log.debug("DRAW " + this.elementId);
      this.isDirty = false;
      this.finalDraw();
   };

   RefreshHandler.prototype.forceDraw = function() {
      if (!this.enabled) {
         log.debug("RefreshHandler for " + this.elementId + " already disabled, skipping forceDraw");
         return;
      }
      log.debug("FORCE DRAW " + this.elementId);
      this.pendingDrawing = false;
      this.pendingDrawingForced = false;
      this.isDirty = false;

      var successfulDrawing;
      try {
         successfulDrawing = this.updater.update(true);
      }
      catch (error) {
         log.error("Forced drawing failed for " + this.elementId);
         log.error("Error: " + error);
         log.error("Stack: " + error.stack);
         successfulDrawing = false;
      }

      if (!successfulDrawing) {
         log.warn("Drawing was not successful, adding as pending [" + this.elementId + "]");
         this.pendingDrawing = true;
         this.pendingDrawingForced = true;
      }
   };

   RefreshHandler.prototype.finalDraw = function() {
      if (!this.drawingEnabled) {
         log.debug("Adding pending draw for " + this.elementId);
         this.pendingDrawing = true;
         this.pendingDrawingForced = false;
         this.drawingRequests += 1;
         return;
      }
 
      log.debug("Actually drawing " + this.elementId);
      this.drawingEnabled = false;

      var successfulDrawing;
      // First update is mandatory.
      try {
         successfulDrawing = this.updater.update(false);
      }
      catch (error) {
         log.error("Drawing failed for " + this.elementId);
         log.error("Error: " + error);
         successfulDrawing = false;
      }

      if (!successfulDrawing) {
         log.warn("Drawing was not successful, adding as pending [" + this.elementId + "]");
         this.pendingDrawing = true;
         this.pendingDrawingForced = false;
      }

      // Subsequent updates are scheduled to a setInterval timer.
      var that = this;
      this.drawingInterval = setInterval(function() {
         if (that.pendingDrawing) {
            var start = new Date().getMilliseconds();

            log.debug("Timeout drawing pending request [" + this.elementId + "]");
            var successfulDrawing;
            try {
               successfulDrawing = that.updater.update(that.pendingDrawingForced);
            }
            catch (error) {
               log.error("Drawing failed for " + that.elementId);
               log.error("Error: " + error);
               successfulDrawing = false;
            }

            var end = new Date().getMilliseconds();
            log.debug("Drawing time: " + (end - start) + "ms. Skipped draw events: " + that.drawingRequests);

            // Disabled for the time being... if enabled, there should be a counter to avoid retrying forever.
            // if (!successfulDrawing) {
            //    log.warn("Drawing was not successful, re-adding as pending [" + this.elementId + "]");
            //    return;
            // }

            that.pendingDrawing = false;
            that.pendingDrawingForced = false;
            that.drawingRequests = 0;
            that.drawingEnabled = true;
         }
         else {
            clearInterval(that.drawingInterval); 
            that.drawingEnabled = true;
         }
      }, 100);
   };

   RefreshHandler.prototype.dismiss = function() {
      if (this.updater.dismiss === undefined) {
         return;
      }
      try {
         this.updater.dismiss();
      }
      catch (error) {
         log.error("Dismissal failed for " + this.elementId);
         log.error("Error: " + error);
      }
   };

   RefreshHandler.prototype.shutdown = function() {
      clearInterval(this.drawingInterval);
      this.enabled = false;
   };

   return RefreshHandler;
});


define('common-scope-helper', [
   'logger',
   'common-refresh-handler'
], function(Logger, RefreshHandler) {
   'use strict';
   var log = Logger.get('ScopeHelper');
   /**
    * Constructor for the scope helper.
    *
    * @param {object} scope Scope to manage
    * @returns {ScopeHelper}
    */
   var ScopeHelper = function(scope) {
      this.scope = scope;
      this.refreshHandlers = [];
      initializeEventListeners(this);
   };

   /**
    * Creates a refresh handler
    * @param {string} elementId Tag id of the component to control
    * @param {object} updater Object with an "update()" method
    * @param {boolean} repaintWhenResizing Indicates if it should repaint when resizing
    * @returns RefreshHandler
    */
   ScopeHelper.prototype.createRefreshHandler = function(elementId, updater, repaintWhenResizing) {
      var refreshHandler = new RefreshHandler(elementId, updater, repaintWhenResizing);
      this.refreshHandlers.push(refreshHandler);
      return refreshHandler;
   };

   ScopeHelper.prototype.display = function(visibleRefreshHandlers) {
      log.debug("Displaying " + visibleRefreshHandlers.length);
      log.debug(visibleRefreshHandlers);
      for (var i = 0; i < this.refreshHandlers.length; i++) {
         var refreshHandler = this.refreshHandlers[i];
         if (visibleRefreshHandlers.indexOf(refreshHandler) >= 0) {
            showElement(refreshHandler.elementId);
         }
         else {
            hideElement(refreshHandler.elementId);
         }
      }
      
   };

   ScopeHelper.prototype.forEachRefreshHandler = function(callback) {
      for (var i = 0; i < this.refreshHandlers.length; i++) {
         var refreshHandler = this.refreshHandlers[i];
         callback(refreshHandler);
      }
   };

   //PRIVATE FUNCTIONS

   var showElement = function(elementId) {
      var element = document.getElementById(elementId.replace('#', ''));
      if (element === null) {
         // the element is no longer available (the user must have gone to other view)
         return;
      }

      log.debug("MAKE VISIBLE: " + elementId);
      element.classList.remove('transparent-element');
   };

   var hideElement = function(elementId) {
      var element = document.getElementById(elementId.replace('#', ''));
      if (element === null) {
         // the element is no longer available (the user must have gone to other view)
         return;
      }

      log.debug("HIDE: " + elementId);
      element.classList.add('transparent-element');
   };

   function initializeEventListeners(helper) {
      log.debug("initializeEventListeners");
      var onScroll = function() {
         //This code is surrounded with a $apply call so angular can make updates at
         //the end if needed.
         helper.scope.$apply(function() {
            //log.debug("scrolling...");
            for (var i = 0; i < helper.refreshHandlers.length; i++) {
               var refreshHandler = helper.refreshHandlers[i];
               refreshHandler.refresh();
            }
         });
      };

      var onResize = function() {
         //This code is surrounded with a $apply call so angular can make updates at
         //the end if needed.
         helper.scope.$apply(function() {
            log.debug("resizing... ");

            // if the view is still not ready the values to show are not valid and it's better not to update at all
            if (!helper.scope.ready) {
               return;
            }

            for (var i = 0; i < helper.refreshHandlers.length; i++) {
               var refreshHandler = helper.refreshHandlers[i];
               refreshHandler.refresh(true);
            }
         });
      };
      window.addEventListener('resize', onResize, false);
      //window.addEventListener('scroll', onScroll, false);
      helper.scope.$on('$locationChangeStart', function(event) {
         window.removeEventListener('resize', onResize, false);
         for (var i = 0; i < helper.refreshHandlers.length; i++) {
            var refreshHandler = helper.refreshHandlers[i];
            refreshHandler.dismiss();
         }
         //window.removeEventListener('scroll', onScroll, false);
      });
      helper.scope.$on('$routeUpdate', function() {
         //If the route was changed, we stay on the same scope, but the removal
         //of the resize listener is done, too. So we must add the listener again.
         window.addEventListener('resize', onResize, false);
      });
   }

   return ScopeHelper;
});


define('basic-base-controller', [
   'app',
   'parameters-manager',
   'logger',
   'localization',
   'message-service'
], function(app, parametersManager, Logger) {
   'use strict';

   // Base controller ideas taken from http://stackoverflow.com/questions/18509464/determine-active-controller

   var log = Logger.get('BasicBase');
   app.register.controller('basicBaseController', ['$scope', 'messageService',
      function($scope, messageService) {

      // messages have a timeout to remove themself so this is no needed for now
      messageService.removeMessagesOnNavigation();

      $scope.initializeMessages = function(enumName, groupName) {
         $scope.messageHelperEnumName = enumName;
         $scope.messageHelperGroupName = groupName;
      };

      $scope.getEnumNameFrom = function(params) {
         if (params && params.enumName && params.enumName.length > 0) {
            return params.enumName;
         }
         // default value
         return $scope.messageHelperEnumName;
      };

      $scope.getEnumParamsFrom = function(params) {
         if (params && params.enumParams) {
            return params.enumParams;
         }
         // default value
         return null;
      };

      $scope.getTimeoutFrom = function(params) {
         if (params && params.useTimeout) {
            return parametersManager.baseViewParameters.messageTimeout;
         }
         return undefined;
      };

      $scope.getGroupFrom = function(params) {
         if (params && params.group&& params.group.length > 0) {
            return params.group;
         }
         // default value
         return $scope.messageHelperGroupName;
      };

      $scope.getDismissOnNavigationFrom = function(params) {
         if (params && params.dismissOnNavigation !== undefined) {
            return params.dismissOnNavigation;
         }
         // default value
         return true;
      };

      $scope.getActionsFrom = function(params) {
         if (params && params.actions !== undefined) {
            return params.actions;
         }
         // default value
         return [];
      };

      $scope.getRemoveOtherGroupMessagesFrom = function(params) {
         if (params && params.removeOtherGroupMessages !== undefined) {
            return params.removeOtherGroupMessages;
         }
         return true;
      };

      /*
       * type and enumKey are mandatory and haven't default values. Non mandatory attributes must be passed into params
       */
      $scope.createMessage = function(type, enumKey, params) {
         if ((!$scope.messageHelperEnumName || !$scope.messageHelperGroupName) && (params !== undefined && (!params.enumName || !params.group))) {
            log.debug("Messages not initialized!");
         }

         return {
            type: type,
            enumName: $scope.getEnumNameFrom(params),
            enumKey: enumKey,
            enumParams: $scope.getEnumParamsFrom(params),
            timeout: $scope.getTimeoutFrom(params),
            group: $scope.getGroupFrom(params),
            dismissOnNavigation: $scope.getDismissOnNavigationFrom(params),
            actions: $scope.getActionsFrom(params),
            removeOtherGroupMessages: $scope.getRemoveOtherGroupMessagesFrom(params)
         };
      };

      $scope.showMessage = function(type, enumKey, params) {
         if ((!$scope.messageHelperEnumName || !$scope.messageHelperGroupName) && (params !== undefined && (!params.enumName || !params.group))) {            
            log.debug("Messages not initialized!");
         }
         messageService.addMessage($scope.createMessage(type, enumKey, params));
      };

      $scope.showInfoMessage = function(enumKey, params) {
         $scope.showMessage(messageService.MESSAGE_INFO, enumKey, params);
      };

      $scope.showWarningMessage = function(enumKey, params) {
         $scope.showMessage(messageService.MESSAGE_WARNING, enumKey, params);
      };

      $scope.showErrorMessage = function(enumKey, params) {
         $scope.showMessage(messageService.MESSAGE_DANGER, enumKey, params);
      };

      $scope.showSuccessMessage = function(enumKey, params) {
         if (!params) {
            params = {useTimeout:true, dismissOnNavigation: false};
         }
         $scope.showMessage(messageService.MESSAGE_SUCCESS, enumKey, params);
      };

      $scope.clearGroupMessages = function() {
         if (!$scope.messageHelperGroupName) {
            log.debug("Messages not initialized!");
         }
         messageService.removeAllMessagesWithGroup($scope.messageHelperGroupName);
      };

      $scope.clearMessagesForGroup = function(groupName) {
         messageService.removeAllMessagesWithGroup(groupName);
      };
   }]);
});


define('base-incomes-calculator-controller', [
   'app',
   'logger',
   'parameters-manager',
   'tax-calculator',
   'wolf-tools',
   'enums-constants'
], function(app, Logger, parametersManager) {
   'use strict';

   var log = Logger.get('BaseIncomesCalculator');
   app.register.controller('baseIncomesCalculatorController', ['$scope', '$q', 'taxCalculator', 'localize',
      function($scope, $q, taxCalculator, localize) {

      /**
       * IncomesCalculator
       * This object represents the incomesCalculator module.
       */
      var IncomesCalculator = function() {
      };
      var roundValue = ch.logismata.wolftools.roundValue;
      IncomesCalculator.prototype = {
         wrapThePromise: function(calculatePromise) {
            var deferred = $q.defer();
            if ($scope.isReady() || $scope.allPrePromisesResolved()) {
               $scope.requestCalculationsPromise([calculatePromise]).then(function(values) {
                  deferred.resolve(values[0]);
               });
            }
            else {
               $scope.addPrePromise(calculatePromise.then(function(value) {
                  deferred.resolve(value);
               }));
            }

            return deferred.promise;
         },
         
         getCurrentAge: function(birthYear) {
            return new Date().getFullYear() - birthYear;
         },
         
         getSecondPersonConfession: function(base) {
            if (base.secondPerson.confession) {
               return base.secondPerson.confession;
            }
            return base.mainPerson.confession;
         },
         
         getMainPersonIncomePercentage: function(base) {
            var main;
            var second;
            if (base.mainPerson.grossIncome !== null && base.secondPerson.grossIncome !== null) {
               main = base.mainPerson.grossIncome;
               second = base.secondPerson.grossIncome;
            }
            else if (base.mainPerson.yearlyNetIncome !== null && base.secondPerson.yearlyNetIncome !== null) {
               main = base.mainPerson.yearlyNetIncome;
               second = base.secondPerson.yearlyNetIncome;
            }
            else if (base.mainPerson.monthlyNetIncome !== null && base.secondPerson.monthlyNetIncome !== null) {
               main = base.mainPerson.monthlyNetIncome;
               second = base.secondPerson.monthlyNetIncome;
            }
            else if (base.mainPerson.taxableIncome !== null && base.secondPerson.taxableIncome !== null) {
               main = base.mainPerson.taxableIncome;
               second = base.secondPerson.taxableIncome;
            }
            
            if ((main === 0 && second === 0) || (main === null && second === null)) {
               main = parametersManager.baseModelParameters.mainPersonGrossIncome;
               second = parametersManager.baseModelParameters.secondPersonGrossIncome;
            }
            
            if (!second) {
               return 1;
            }
            
            return Math.round(main / (main + second) * Math.pow(10, 6)) / Math.pow(10, 6);
         },         

         getSecondPersonIncomePercentage: function(base) {
            return 1 - this.getMainPersonIncomePercentage(base);
         },
         
         getGrossIncomeFromNetIncomePromise: function(income, base) {
            var calculatePromise = taxCalculator.calculateGrossIncomeFromNetIncome(income, this.getCurrentAge(base.mainPerson.birthYear), localize.getActiveCountryCode());
            return this.wrapThePromise(calculatePromise);
         },         
         
         roundPromise: function(promise) {
            return promise.then(function(value) {
               return roundValue(value);
            });
         },
         
         getTaxGrossIncomePromise: function(base) {
            var grossIncomeDeferred = $q.defer();
            var mainPersonAge = this.getCurrentAge(base.mainPerson.birthYear);
            var secondPersonAge = this.getCurrentAge(base.secondPerson.birthYear);
            var promises;
            var netIncome;
            // 1 - from base.tax.grossIncome itself
            if (base.tax.grossIncome !== null) {
               grossIncomeDeferred.resolve(base.tax.grossIncome);
               return grossIncomeDeferred.promise;
            }
            
            // 2 - calculated from the person's gross incomes
            var grossIncome;
            if (base.mainPerson.grossIncome !== null) {
               grossIncome = base.mainPerson.grossIncome;
               if (base.secondPerson.grossIncome !== null && base.relationship === Relationship.MARRIED) {
                  grossIncome += base.secondPerson.grossIncome;
               }
               grossIncomeDeferred.resolve(roundValue(grossIncome));
               return grossIncomeDeferred.promise;
            }            

            // 3 - calculated from base.tax.yearlyNetIncome
            if (base.tax.yearlyNetIncome !== null) {
               return this.roundPromise(this.getGrossIncomeFromNetIncomePromise(base.tax.yearlyNetIncome, base));
            }

            // 4 - calculated from the summ of base.tax.yearlyNetIncome and base.secondPerson.yearlyNetIncome
            if (base.mainPerson.yearlyNetIncome !== null) {
               promises = [this.getGrossIncomeFromNetIncomePromise(base.mainPerson.yearlyNetIncome, base)];
               if (base.secondPerson.yearlyNetIncome && base.relationship === Relationship.MARRIED) {
                  promises.push(this.getGrossIncomeFromNetIncomePromise(base.secondPerson.yearlyNetIncome, base));
               }
               return this.roundPromise($q.all(promises).then(function(result) {
                  var total = result[0];
                  if (result.length > 1) {
                     total += result[1];
                  }
                  return roundValue(total);
               }));
            }
            
            // 5 - f(tax.monthlyNetIncome)
            if (base.tax.monthlyNetIncome !== null) {
               netIncome = base.tax.monthlyNetIncome * 12;
               return this.roundPromise(this.getGrossIncomeFromNetIncomePromise(netIncome, base));
            }
            
            // 6 - f(mp.monthlyNetIncome + sp.monthlyNetIncome)
            if (base.mainPerson.monthlyNetIncome !== null) {
               promises = [this.getGrossIncomeFromNetIncomePromise(base.mainPerson.monthlyNetIncome * 12, base)];
               if (base.secondPerson.monthlyNetIncome !== null && base.relationship === Relationship.MARRIED) {
                  promises.push(this.getGrossIncomeFromNetIncomePromise(base.secondPerson.monthlyNetIncome * 12, base));
               }
               return this.roundPromise($q.all(promises).then(function(result) {
                  var total = result[0];
                  if (result.length > 1) {
                     total += result[1];
                  }
                  return roundValue(total);
               }));
            }
            
            // 7 - f(tax.taxableIncome)
            if (base.tax.taxableIncome !== null) {
               return this.roundPromise(this.wrapThePromise(taxCalculator.calculateGrossIncomeStatePromise(base.zipAndLocation.id, mainPersonAge, base.mainPerson.civilStatus,
                                                               base.mainPerson.confession, base.numberOfChildren, base.tax.taxableIncome, true)));
            }
            // 8 - f(mp.taxableIncome + sp.taxableIncome)
            if (base.mainPerson.taxableIncome !== null) {
               promises = [taxCalculator.calculateGrossIncomeStatePromise(base.zipAndLocation.id, mainPersonAge, base.mainPerson.civilStatus,
                                                                              base.mainPerson.confession, base.numberOfChildren, base.mainPerson.taxableIncome, true)];
               if (base.secondPerson.taxableIncome !== null && base.relationship === Relationship.MARRIED) {
                  promises.push(taxCalculator.calculateGrossIncomeStatePromise(base.zipAndLocation.id, secondPersonAge, base.secondPerson.civilStatus,
                                                                              base.secondPerson.confession, base.numberOfChildren, base.secondPerson.taxableIncome, true));
               }
               return this.wrapThePromise($q.all(promises).then(function(result) {
                  var total = result[0];
                  if (result.length > 1) {
                     total += result[1];
                  }
                  return roundValue(total);
               }));
            }
            
            // 9 - should return base.defaultGrossIncome
            if (base.defaultGrossIncome !== null) {
               grossIncomeDeferred.resolve(base.defaultGrossIncome);
               return grossIncomeDeferred.promise;
            }
            
            // 10 - calculated from base.defaultNetIncome
            if (base.defaultNetIncome !== null) {
               return this.roundPromise(this.getGrossIncomeFromNetIncomePromise(base.defaultNetIncome, base));
            }
            
            
            // 11 - from baseModelParameters
            var param = parametersManager.baseModelParameters.grossIncome;
            if (param !== undefined || param !== null) {
               grossIncomeDeferred.resolve(param);
               return grossIncomeDeferred.promise;
            }
            grossIncomeDeferred.resolve(null);
            return grossIncomeDeferred.promise;
            
         },

         getPersonGrossIncomePromise: function(base, person, incomePercentage, modelParameter) {
            var grossIncomeDeferred = $q.defer();
            var age = this.getCurrentAge(person.birthYear);
            var netIncome;
            // 1 - from person.grossIncome itself
            if (person.grossIncome !== null) {
               grossIncomeDeferred.resolve(person.grossIncome);
               return grossIncomeDeferred.promise;
            }
            
            // 2 - calculated from base.tax.grossIncome
            if (base.tax.grossIncome !== null) {
               grossIncomeDeferred.resolve(roundValue(base.tax.grossIncome * incomePercentage));
               return grossIncomeDeferred.promise;
            }
            // 3 - calculated from person.yearlyNetIncome
            if (person.yearlyNetIncome !== null) {
               return this.roundPromise(this.getGrossIncomeFromNetIncomePromise(person.yearlyNetIncome, base));
            }

            // 4 - calculated from a percentage of base.tax.yearlyNetIncome
            if (base.tax.yearlyNetIncome !== null) {
               netIncome = base.tax.yearlyNetIncome * incomePercentage;
               return this.roundPromise(this.getGrossIncomeFromNetIncomePromise(netIncome, base));
            }

            // 5 - f(mainPerson.monthlyNetIncome)
            if (person.monthlyNetIncome !== null) {
               netIncome = person.monthlyNetIncome * 12;
               return this.roundPromise(this.getGrossIncomeFromNetIncomePromise(netIncome, base));
            }
            
            // 6 - f(tax.monthlyNetIncome)
            if (base.tax.monthlyNetIncome !== null) {
               netIncome = base.tax.monthlyNetIncome * 12 * incomePercentage;
               return this.roundPromise(this.getGrossIncomeFromNetIncomePromise(netIncome, base));
            }
            
            // 7 - f(mainPerson.taxableIncome)
            if (person.taxableIncome !== null) {
               return this.wrapThePromise(taxCalculator.calculateGrossIncomeStatePromise(base.zipAndLocation.id, age, person.civilStatus,
                                                                              person.confession, base.numberOfChildren, person.taxableIncome, true));
            }
            // 8 - f(tax.taxableIncome)
            if (base.tax.taxableIncome !== null) {
               var taxableIncome = base.tax.taxableIncome * incomePercentage;
               return this.wrapThePromise(taxCalculator.calculateGrossIncomeStatePromise(base.zipAndLocation.id, age, person.civilStatus,
                                                                              person.confession, base.numberOfChildren, taxableIncome, true));
            }
            
            // 9 - calcualted from base.defaultGrossIncome
            if (base.defaultGrossIncome !== null) {
               if (incomePercentage === 1) {
                  grossIncomeDeferred.resolve(base.defaultGrossIncome);
               }
               else {
                  grossIncomeDeferred.resolve(roundValue(base.defaultGrossIncome * incomePercentage));
               }
               return grossIncomeDeferred.promise;
            }

            // 10 - calculated from base.defaultNetIncome
            if (base.defaultNetIncome !== null) {
               netIncome = base.defaultNetIncome * incomePercentage;
               return this.roundPromise(this.getGrossIncomeFromNetIncomePromise(netIncome, base));
            }

            // 11 - from baseModelParameters
            
            if (modelParameter !== undefined && modelParameter !== null) {
               grossIncomeDeferred.resolve(modelParameter);
               return grossIncomeDeferred.promise;
            }
            grossIncomeDeferred.resolve(null);
            return grossIncomeDeferred.promise;
         },         
         getMainPersonGrossIncomePromise: function(base) {
            return this.getPersonGrossIncomePromise(base, base.mainPerson, this.getMainPersonIncomePercentage(base), parametersManager.baseModelParameters.mainPersonGrossIncome);
         },
         getSecondPersonGrossIncomePromise: function(base) {
            return this.getPersonGrossIncomePromise(base, base.secondPerson, this.getSecondPersonIncomePercentage(base), parametersManager.baseModelParameters.secondPersonGrossIncome);
         },
         
         getTaxTaxableIncomePromise: function(base) {
            var taxableIncomeDeferred = $q.defer();
            var that = this;
   
            // 1 -  from base.tax.taxableIncome itself
            if (base.tax.taxableIncome !== null) {
               taxableIncomeDeferred.resolve(base.tax.taxableIncome);
               return taxableIncomeDeferred.promise;
            }
            
            // 2 - calculated from the person's taxable incomes
            var taxableIncome;
            if (base.mainPerson.taxableIncome !== null) {
               taxableIncome = base.mainPerson.taxableIncome;
               if (base.secondPerson.taxableIncome !== null && base.relationship === Relationship.MARRIED) {
                  taxableIncome += base.secondPerson.taxableIncome;
               }
               taxableIncomeDeferred.resolve(taxableIncome);
               return taxableIncomeDeferred.promise;
            }            

            var mainPersonAge = this.getCurrentAge(base.mainPerson.birthYear);
            var secondPersonAge = this.getCurrentAge(base.secondPerson.birthYear);
            // 3 - calculated from base.tax.grossIncome
            if (base.tax.grossIncome !== null) {
               // WARNING: rounding taxable income when calculating from gross income is probably wrong, it must be reanalyzed
               return this.roundPromise(this.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, mainPersonAge,
                     base.mainPerson.civilStatus, base.mainPerson.confession, base.numberOfChildren,
                     base.tax.grossIncome, true)));
            }            
            // 4 - calculated from the sum of person's grossIncomes
            var promises;
            if (base.mainPerson.grossIncome !== null) {
               promises = [this.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, mainPersonAge,
                     base.mainPerson.civilStatus, base.mainPerson.confession, base.numberOfChildren,
                     base.mainPerson.grossIncome, true))];
               if (base.secondPerson.grossIncome !== null) {
                  promises.push(this.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, secondPersonAge,
                     base.secondPerson.civilStatus, this.getSecondPersonConfession(base), base.numberOfChildren,
                     base.secondPerson.grossIncome, true)));
               }
               // WARNING: rounding taxable income when calculating from gross income is probably wrong, it must be reanalyzed
               return this.roundPromise($q.all(promises).then(function(result) {
                  var total = result[0];
                  if (result.length > 1) {
                     total += result[1];
                  }
                  // WARNING: rounding taxable income when calculating from gross income is probably wrong, it must be reanalyzed
                  return roundValue(total);
               }));
            }
            
            // 5 - calculated from base base.tax.yearlyNetIncome
            if (base.tax.yearlyNetIncome !== null) {
               return this.getGrossIncomeFromNetIncomePromise(base.tax.yearlyNetIncome, base).then(function(grossIncome) {
                  return that.roundPromise(that.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, mainPersonAge,
                        base.mainPerson.civilStatus, base.mainPerson.confession, base.numberOfChildren,
                        grossIncome, true)));
               });
            }

            // 6 - calculated from base.mainPerson.yearlyNetIncome plus base.secondPerson.yearlyNetIncome
            if (base.mainPerson.yearlyNetIncome !== null) {
               promises = [this.getGrossIncomeFromNetIncomePromise(base.mainPerson.yearlyNetIncome, base)];
               if (base.secondPerson.yearlyNetIncome !== null && base.relationship === Relationship.MARRIED) {
                  promises.push(this.getGrossIncomeFromNetIncomePromise(base.secondPerson.yearlyNetIncome, base));
               }
               return this.wrapThePromise($q.all(promises).then(function(result) {
                  var anotherPromises = [that.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, mainPersonAge,
                        base.mainPerson.civilStatus, base.mainPerson.confession, base.numberOfChildren,
                        result[0], true))];
                  if (result.length > 1) {
                     anotherPromises.push(that.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, secondPersonAge,
                        base.secondPerson.civilStatus, base.secondPerson.confession, base.numberOfChildren,
                        result[1], true)));
                  }
                  return $q.all(anotherPromises).then(function(anotherResult) {
                     var total = anotherResult[0];
                     if (anotherResult.length > 1) {
                        total += anotherResult[1];
                     }
                     return roundValue(total);
                  });
                  
               }));
            }
            
            // 7 - calculated from base base.tax.monthlyNetIncome
            if (base.tax.monthlyNetIncome !== null) {
               return this.getGrossIncomeFromNetIncomePromise(base.tax.monthlyNetIncome * 12, base).then(function(grossIncome) {
                  return that.roundPromise(that.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, mainPersonAge,
                        base.mainPerson.civilStatus, base.mainPerson.confession, base.numberOfChildren,
                        grossIncome, true)));
               });
            }            
            
            // 8 - f(mp.monthlyNetIncome + sp.monthlyNetIncome)
            if (base.mainPerson.monthlyNetIncome !== null) {
               promises = [this.getGrossIncomeFromNetIncomePromise(base.mainPerson.monthlyNetIncome * 12, base)];
               if (base.secondPerson.monthlyNetIncome !== null && base.relationship === Relationship.MARRIED) {
                  promises.push(this.getGrossIncomeFromNetIncomePromise(base.secondPerson.monthlyNetIncome * 12, base));
               }
               return this.roundPromise($q.all(promises).then(function(result) {
                  var anotherPromises = [that.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, mainPersonAge,
                        base.mainPerson.civilStatus, base.mainPerson.confession, base.numberOfChildren, result[0], true))];
                        if (result.length > 1) {
                           anotherPromises.push(that.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, secondPersonAge,
                           base.secondPerson.civilStatus, base.secondPerson.confession, base.numberOfChildren, result[1], true)));
                        }
                        return $q.all(anotherPromises).then(function(anotherResult) {
                           var total = anotherResult[0];
                           if (anotherResult.length > 1) {
                              total += anotherResult[1];
                           }
                           return roundValue(total);
                        });
                        
               }));
            }            
            
            // 9 - calculated from base.defaultGrossIncome
            if (base.defaultGrossIncome !== null) {
               return this.roundPromise(this.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, mainPersonAge,
                     base.mainPerson.civilStatus, base.mainPerson.confession, base.numberOfChildren,
                     base.defaultGrossIncome, true)));
            } 
            
            // 10 - calculated from base base.defaultNetIncome
            if (base.defaultNetIncome !== null) {
               return this.getGrossIncomeFromNetIncomePromise(base.defaultNetIncome, base).then(function(grossIncome) {
                  return that.roundPromise(that.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, mainPersonAge,
                        base.mainPerson.civilStatus, base.mainPerson.confession, base.numberOfChildren,
                        grossIncome, true)));
               });
            }            

            // 11 - from baseModelParameters
            var param = parametersManager.baseModelParameters.taxableIncome;
            if (param !== undefined && param !== null) {
               taxableIncomeDeferred.resolve(param);
               return taxableIncomeDeferred.promise;
            }
            taxableIncomeDeferred.resolve(null);
            return taxableIncomeDeferred.promise;
         },
         
         getPersonTaxableIncomePromise: function(base, person, incomePercentage, modelParameter) {
            var taxableIncomeDeferred = $q.defer();
            var grossIncome;
            var netIncome;
            var age = this.getCurrentAge(person.birthYear);
            var that = this;
            // 1 - from person.taxableIncome itself
            if (person.taxableIncome !== null) {
               taxableIncomeDeferred.resolve(person.taxableIncome);
               return taxableIncomeDeferred.promise;
            }
            
            // 2 - f(base.tax.taxableIncome)
            if (base.tax.taxableIncome !== null) {
               taxableIncomeDeferred.resolve(roundValue(base.tax.taxableIncome * incomePercentage));
               return taxableIncomeDeferred.promise;
            }
            
            // 3 - calculated from person.grossIncome
            if (person.grossIncome !== null) {
               // WARNING: rounding taxable income when calculating from gross income is probably wrong, it must be reanalyzed
               return this.roundPromise(this.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, age,
                     person.civilStatus, person.confession, base.numberOfChildren,
                     person.grossIncome, true)));
            }

            // 4 - calculated from base.tax.grossIncome
            if (base.tax.grossIncome !== null) {
               grossIncome = base.tax.grossIncome * incomePercentage;
               // WARNING: rounding taxable income when calculating from gross income is probably wrong, it must be reanalyzed
               return this.roundPromise(this.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, age,
                     person.civilStatus, person.confession, base.numberOfChildren,
                     grossIncome, true)));
            }
            
            // 5 - calculated from person.yearlyNetIncome
            if (person.yearlyNetIncome !== null) {
               netIncome = person.yearlyNetIncome;
               return this.getGrossIncomeFromNetIncomePromise(netIncome, base).then(function(grossIncome) {
                  // WARNING: rounding taxable income when calculating from gross income is probably wrong, it must be reanalyzed
                  return that.roundPromise(that.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, age,
                        person.civilStatus, person.confession, base.numberOfChildren,
                        grossIncome, true)));
               });               
            }
            // 6 - calculated from base.tax.yearlyNetIncome
            if (base.tax.yearlyNetIncome !== null) {
               netIncome = base.tax.yearlyNetIncome * incomePercentage;
               return this.getGrossIncomeFromNetIncomePromise(netIncome, base).then(function(grossIncome) {
                  // WARNING: rounding taxable income when calculating from gross income is probably wrong, it must be reanalyzed
                  return that.roundPromise(that.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, age,
                        person.civilStatus, person.confession, base.numberOfChildren,
                        grossIncome, true)));
               });               
            }
            
            // 7 - calculated from person.monthlyNetIncome
            if (person.monthlyNetIncome !== null) {
               return this.getGrossIncomeFromNetIncomePromise(person.monthlyNetIncome * 12, base).then(function(grossIncome) {
                  // WARNING: rounding taxable income when calculating from gross income is probably wrong, it must be reanalyzed
                  return that.roundPromise(that.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, age,
                        person.civilStatus, person.confession, base.numberOfChildren,
                        grossIncome, true)));
               });               
            }
            
            // 8 - calculated from base.tax.monthlyNetIncome
            if (base.tax.monthlyNetIncome !== null) {
               netIncome = base.tax.monthlyNetIncome * incomePercentage * 12;
               return this.getGrossIncomeFromNetIncomePromise(netIncome, base).then(function(grossIncome) {
                  // WARNING: rounding taxable income when calculating from gross income is probably wrong, it must be reanalyzed
                  return that.roundPromise(that.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, age,
                        person.civilStatus, person.confession, base.numberOfChildren,
                        grossIncome, true)));
               });               
            }

            // 9 - calculated from base.defaultGrossIncome
            if (base.defaultGrossIncome !== null) {
               grossIncome = base.defaultGrossIncome * incomePercentage;
               // WARNING: rounding taxable income when calculating from gross income is probably wrong, it must be reanalyzed
               return this.roundPromise(this.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, age,
                     person.civilStatus, person.confession, base.numberOfChildren,
                     grossIncome, true)));
            } 
            
            // 10 - calculated from person's percentage applied to base base.defaultNetIncome
            if (base.defaultNetIncome !== null) {
               netIncome = base.defaultNetIncome * incomePercentage;
               return this.getGrossIncomeFromNetIncomePromise(netIncome, base).then(function(grossIncome) {
                  // WARNING: rounding taxable income when calculating from gross income is probably wrong, it must be reanalyzed
                  return that.roundPromise(that.wrapThePromise(taxCalculator.calculateTaxableIncomeStatePromise(base.zipAndLocation.id, age,
                        person.civilStatus, person.confession, base.numberOfChildren,
                        grossIncome, true)));
               });
            } 
            
            // 11 - from baseModelParameters
            if (modelParameter !== undefined && modelParameter !== null) {
               taxableIncomeDeferred.resolve(modelParameter);
               return taxableIncomeDeferred.promise;
            }
            
            taxableIncomeDeferred.resolve(null);
            return taxableIncomeDeferred.promise;
         },
         getMainPersonTaxableIncomePromise: function(base) {
            return this.getPersonTaxableIncomePromise(base, base.mainPerson, this.getMainPersonIncomePercentage(base), parametersManager.baseModelParameters.taxableIncome);
         },
         getSecondPersonTaxableIncomePromise: function(base) {
            return this.getPersonTaxableIncomePromise(base, base.secondPerson, this.getSecondPersonIncomePercentage(base), parametersManager.baseModelParameters.taxableIncome);
         },
         
         getTaxYearlyNetIncomePromise: function(base) {
            var netIncomeDeferred = $q.defer();
            var netIncome;
            var mainPersonAge = this.getCurrentAge(base.mainPerson.birthYear);
            var secondPersonAge = this.getCurrentAge(base.secondPerson.birthYear);
            var promises;
            var country = localize.getActiveCountryCode();
            // 1 - from base.tax.yearlyNetIncome itself
            if (base.tax.yearlyNetIncome !== null) {
               netIncomeDeferred.resolve(base.tax.yearlyNetIncome);
               return netIncomeDeferred.promise;
            }
            // 2 - calculated from base.mainPerson.yearlyNetIncome and base.secondPerson.yearlyNetIncome
            if (base.mainPerson.yearlyNetIncome !== null) {
               netIncome = base.mainPerson.yearlyNetIncome;
               if (base.secondPerson.yearlyNetIncome !== null && base.relationship === Relationship.MARRIED) {
                  netIncome += base.secondPerson.yearlyNetIncome;
               }
               netIncomeDeferred.resolve(netIncome);
               return netIncomeDeferred.promise;
            }
            // 3 - from base.tax.yearlyNetIncome itself
            if (base.tax.monthlyNetIncome !== null) {
               netIncomeDeferred.resolve(base.tax.monthlyNetIncome * 12);
               return netIncomeDeferred.promise;
            }
            // 4 -from main and second person's monthlyNetIncome
            if (base.mainPerson.monthlyNetIncome !== null) {
               netIncome = base.mainPerson.monthlyNetIncome * 12;
               if (base.secondPerson.monthlyNetIncome !== null && base.relationship === Relationship.MARRIED) {
                  netIncome += base.secondPerson.monthlyNetIncome * 12;
               }
               netIncomeDeferred.resolve(netIncome);
               return netIncomeDeferred.promise;
            }
            // 5 - calculated from base.tax.grossIncome
            if (base.tax.grossIncome !== null) {
               return this.roundPromise(this.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(base.tax.grossIncome, mainPersonAge, country))); 
            }
            // 6 - calculated from base.mainPerson.grossIncome and base.secondPerson.grossIncome
            if (base.mainPerson.grossIncome !== null) {
               promises = [this.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(base.mainPerson.grossIncome, mainPersonAge, country))];
               if (base.secondPerson.grossIncome !== null) {
                  promises.push(this.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(base.secondPerson.grossIncome, secondPersonAge, country)));
               }
               return this.roundPromise($q.all(promises).then(function(result) {
                  var total = result[0];
                  if (result.length > 1) {
                     total += result[1];
                  }
                  return roundValue(total);
               }));
            }            
            // 7 - calculated from base.tax.taxableIncome
            if (base.tax.taxableIncome !== null) {
               return this.wrapThePromise(taxCalculator.calcNetIncomeFromTaxableIncome(base.zipAndLocation.id, mainPersonAge, base.mainPerson.civilStatus,
                                                                              base.mainPerson.confession, base.numberOfChildren, base.tax.taxableIncome, 
                                                                              true, country));
            }
            // 8 - calculated from base.mainPerson.taxableIncome and base.secondPerson.taxableIncome
            if (base.mainPerson.taxableIncome !== null) {
               promises = [taxCalculator.calcNetIncomeFromTaxableIncome(base.zipAndLocation.id, mainPersonAge, base.mainPerson.civilStatus,
                                                                              base.mainPerson.confession, base.numberOfChildren, base.mainPerson.taxableIncome, 
                                                                              true, country)];
               if (base.secondPerson.taxableIncome !== null && base.relationship === Relationship.MARRIED) {
                  promises.push(taxCalculator.calcNetIncomeFromTaxableIncome(base.zipAndLocation.id, secondPersonAge, base.secondPerson.civilStatus,
                                                                               base.secondPerson.confession, base.numberOfChildren, base.secondPerson.taxableIncome, 
                                                                               true, country));
               }
               return this.wrapThePromise($q.all(promises).then(function(result) {
                     var total = result[0];
                     if (result.length > 1) {
                        total += result[1];
                     }
                     return roundValue(total);
                  })
               );
            }            
            
            // 9 - taken from defaultNetIncome 
            if (base.defaultNetIncome !== null) {
               netIncomeDeferred.resolve(base.defaultNetIncome);
               return netIncomeDeferred.promise;
            }            
            
            // 10 - calculated from defaultGrossIncome 
            if (base.defaultGrossIncome !== null) {
               return this.roundPromise(this.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(base.defaultGrossIncome, mainPersonAge, country))); 
            }            

            // 11 - from baseModelParameters
            var param = parametersManager.baseModelParameters.budgetNetIncomeYearly;
            if (param !== undefined && param !== null) {
               netIncomeDeferred.resolve(param);
               return netIncomeDeferred.promise;
            }
            netIncomeDeferred.resolve(null);
            return netIncomeDeferred.promise;
            
         },
         
         getPersonYearlyNetIncomePromise: function(base, person, incomePercentage) {
            var netIncomeDeferred = $q.defer();
            var grossIncome;
            var that = this;
            var age = this.getCurrentAge(person.birthYear);
            var country = localize.getActiveCountryCode();
            
            // 1 - person.yearlyNetIncome itself;
            if (person.yearlyNetIncome !== null) {
               netIncomeDeferred.resolve(person.yearlyNetIncome);
               return netIncomeDeferred.promise;
            }
            
            // 2 - calculated from person.monthlyNetIncome
            if (person.monthlyNetIncome !== null) {
               netIncomeDeferred.resolve(person.monthlyNetIncome * 12);
               return netIncomeDeferred.promise;
            }
            
            // 3 - calculated from base.tax.yearlyNetIncome
            if (base.tax.yearlyNetIncome !== null) {
               if (incomePercentage === 1) {
                  netIncomeDeferred.resolve(base.tax.yearlyNetIncome);
               }
               else {
                  netIncomeDeferred.resolve(roundValue(base.tax.yearlyNetIncome * incomePercentage));
               }
               return netIncomeDeferred.promise;
            }
            
            // 4 - calculated from base.tax.monthlyNetIncome
            if (base.tax.monthlyNetIncome !== null) {
               if (incomePercentage === 1) {
                  netIncomeDeferred.resolve(base.tax.monthlyNetIncome * incomePercentage * 12);
               }
               else {
                  netIncomeDeferred.resolve(roundValue(base.tax.monthlyNetIncome * incomePercentage * 12));
               }
               return netIncomeDeferred.promise;
            }             
            
            // 5 - calculated from person.grossIncome
            if (person.grossIncome !== null) {
               country = localize.getActiveCountryCode();
               grossIncome = person.grossIncome;
               return this.roundPromise(this.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(grossIncome, age, country)));
            }

            // 6 - calculated from base.tax.grossIncome
            if (base.tax.grossIncome !== null) {
               grossIncome = base.tax.grossIncome * incomePercentage;
               return this.roundPromise(this.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(grossIncome, age, country)));               
            }
            
            // 7 - from person.taxableIncome
            if (person.taxableIncome !== null) {
               return that.wrapThePromise(taxCalculator.calculateGrossIncomeStatePromise(base.zipAndLocation.id, age, person.civilStatus,
                  person.confession, base.numberOfChildren, person.taxableIncome, true)).then(function(grossIncome) {
                  return that.roundPromise(that.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(grossIncome, age, country)));
               });
            }
            
            // 8 - from tax.taxableIncome
            if (base.tax.taxableIncome !== null) {
               return that.wrapThePromise(taxCalculator.calculateGrossIncomeStatePromise(base.zipAndLocation.id, age, person.civilStatus,
                  person.confession, base.numberOfChildren, base.tax.taxableIncome * incomePercentage, true)).then(function(grossIncome) {
                  return that.roundPromise(that.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(grossIncome, age, country)));
               });
            }
            
            // 9 - calculated from defaultNetIncome
            if (base.defaultNetIncome !== null) {
               if (incomePercentage === 1) {
                  netIncomeDeferred.resolve(base.defaultNetIncome);
               }
               else {
                  netIncomeDeferred.resolve(roundValue(base.defaultNetIncome * incomePercentage));
               }
               return netIncomeDeferred.promise;
            }  
            
            // 10 - calculated from defaultGrossIncome            
            if (base.tax.grossIncome !== null) {
               grossIncome = base.tax.grossIncome * incomePercentage;
               return this.roundPromise(this.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(grossIncome, age, country)));               
            }            

            // 11 - from baseModelParameters
            var param = parametersManager.baseModelParameters.budgetNetIncomeYearly;
            if (param !== undefined && param !== null) {
               netIncomeDeferred.resolve(roundValue(param * incomePercentage));
               return netIncomeDeferred.promise;
            }
            netIncomeDeferred.resolve(null);
            return netIncomeDeferred.promise;
         },
         
         getMainPersonYearlyNetIncomePromise: function(base) {
            return this.getPersonYearlyNetIncomePromise(base, base.mainPerson, this.getMainPersonIncomePercentage(base));
         },
         getSecondPersonYearlyNetIncomePromise: function(base) {
            return this.getPersonYearlyNetIncomePromise(base, base.secondPerson, this.getSecondPersonIncomePercentage(base));
         },
         
         getTaxMonthlyNetIncomePromise: function(base) {
            var netIncomeDeferred = $q.defer();
            var netIncome;
            var promises;
            var mainPersonAge = this.getCurrentAge(base.mainPerson.birthYear);
            var secondPersonAge = this.getCurrentAge(base.secondPerson.birthYear);
            var country = localize.getActiveCountryCode();
            var that = this;
            // 1 - from base.tax.monthlyNetIncome itself
            if (base.tax.monthlyNetIncome !== null) {
               netIncomeDeferred.resolve(base.tax.monthlyNetIncome);
               return netIncomeDeferred.promise;
            }
            
            // 2 - calculated from base.mainPerson.monthlyNetIncome and base.secondPerson.monthlyNetIncome
            if (base.mainPerson.monthlyNetIncome !== null) {
               netIncome = base.mainPerson.monthlyNetIncome;
               if (base.secondPerson.monthlyNetIncome !== null && base.relationship === Relationship.MARRIED) {
                  netIncome += base.secondPerson.monthlyNetIncome;
               }
               netIncomeDeferred.resolve(netIncome);
               return netIncomeDeferred.promise;
            }

            // 3 - calculated from base.tax.yearlyNetIncome
            if (base.tax.yearlyNetIncome !== null) {
               netIncomeDeferred.resolve(roundValue(base.tax.yearlyNetIncome / 12));
               return netIncomeDeferred.promise;
            }
            
            // 4 - calculated from base.mainPerson.yearlyNetIncome and base.secondPerson.yearlyNetIncome
            
            if (base.mainPerson.yearlyNetIncome !== null) {
               netIncome = base.mainPerson.yearlyNetIncome / 12;
               if (base.secondPerson.yearlyNetIncome !== null && base.relationship === Relationship.MARRIED) {
                  netIncome += base.secondPerson.yearlyNetIncome / 12;
               }
               netIncomeDeferred.resolve(roundValue(netIncome));
               return netIncomeDeferred.promise;
            }            
            // 5 calculated from base.tax.grossIncome (or temporarily from defaultGrossIncome)
            var grossIncome = base.tax.grossIncome;
            if (grossIncome === null) {
               grossIncome = base.defaultGrossIncome;
            }
            if (grossIncome !== null) {
               return this.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(grossIncome, mainPersonAge, country).then(function(yearlyNetIncome) {
                  return roundValue(yearlyNetIncome / 12);
               }));                
            }
            
            // 6 calculated from base.mainPerson.grossIncome and base.secondPerson.grossIncome
            if (base.mainPerson.grossIncome !== null) {
               promises = [this.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(base.mainPerson.grossIncome, mainPersonAge, country))];
               if (base.secondPerson.grossIncome !== null) {
                  promises.push(this.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(base.secondPerson.grossIncome, mainPersonAge, country)));
               }
               return this.roundPromise($q.all(promises).then(function(result) {
                  var total = result[0];
                  if (result.length > 1) {
                     total += result[1];
                  }
                  return roundValue(total / 12);
               }));               
            }

            // 7 - from taxableIncome
            if (base.tax.taxableIncome !== null) {
               return this.wrapThePromise(taxCalculator.calculateGrossIncomeStatePromise(base.zipAndLocation.id, mainPersonAge, base.mainPerson.civilStatus,
                                                               base.mainPerson.confession, base.numberOfChildren, base.tax.taxableIncome, true).then(function(grossIncome) {
                     return that.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(grossIncome, mainPersonAge, country)).then(function(netIncome) {
                        return roundValue(netIncome / 12);
                     });
               }));
            }
            
            // 8 - from person's taxableIncome
            if (base.mainPerson.taxableIncome !== null) {
               promises = [taxCalculator.calcNetIncomeFromTaxableIncome(base.zipAndLocation.id, mainPersonAge, base.mainPerson.civilStatus,
                                                                              base.mainPerson.confession, base.numberOfChildren, base.mainPerson.taxableIncome, 
                                                                              true, country)];
               if (base.secondPerson.taxableIncome !== null && base.relationship === Relationship.MARRIED) {
                  promises.push(taxCalculator.calcNetIncomeFromTaxableIncome(base.zipAndLocation.id, secondPersonAge, base.secondPerson.civilStatus,
                                                                               base.secondPerson.confession, base.numberOfChildren, base.secondPerson.taxableIncome, 
                                                                               true, country));
               }
               return this.wrapThePromise($q.all(promises).then(function(result) {
                     var total = result[0];
                     if (result.length > 1) {
                        total += result[1];
                     }
                     return roundValue(total / 12);
                  })
               );
            }            
            
            // 9 - from base.defaultNetIncome
            if (base.defaultNetIncome !== null) {
               netIncomeDeferred.resolve(roundValue(base.defaultNetIncome / 12));
               return netIncomeDeferred.promise;               
            }
            // 10 - from base.defaultGrossIncome
            if (base.defaultGrossIncome !== null) {
               return this.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(base.defaultGrossIncome, mainPersonAge, country).then(function(netIncome) {
                  return roundValue(netIncome / 12);
               }));
            }

            // 11 - from baseModelParameters
            var param = parametersManager.baseModelParameters.budgetNetIncomeMonthly;
            if (param !== undefined && param !== null) {
               netIncomeDeferred.resolve(param);
               return netIncomeDeferred.promise;
            }
            netIncomeDeferred.resolve(null);
            return netIncomeDeferred.promise;
            
         },

         getPersonMonthlyNetIncomePromise: function(base, person, incomePercentage, modelParameter) {
            var netIncomeDeferred = $q.defer();
            var age = this.getCurrentAge(person.birthYear);      
            var that = this;
            var country = localize.getActiveCountryCode();            
            // 1 - from person.monthlyNetIncome itself
            if (person.monthlyNetIncome !== null) {
               netIncomeDeferred.resolve(person.monthlyNetIncome);
               return netIncomeDeferred.promise;
            }
            // 2 - from mainPerson.yearlyNetIncome
            if (person.yearlyNetIncome !== null) {
              netIncomeDeferred.resolve(roundValue(person.yearlyNetIncome / 12));
              return netIncomeDeferred.promise;
            }
            
            // 3 - from base.tax.monthlyNetIncome
            if (base.tax.monthlyNetIncome !== null) {
               if (incomePercentage === 1) {
                  netIncomeDeferred.resolve(base.tax.monthlyNetIncome);
               }
               else {
                  netIncomeDeferred.resolve(base.tax.monthlyNetIncome * incomePercentage);
               }
               return netIncomeDeferred.promise;
            }
            
            // 4 - from base.tax.yearlyNetIncome
            if (base.tax.yearlyNetIncome !== null) {
               netIncomeDeferred.resolve(roundValue(base.tax.yearlyNetIncome * incomePercentage / 12));
               return netIncomeDeferred.promise;
            }
            
            // 5 - calculated from person.grossIncome
            if (person.grossIncome !== null) {
               return this.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(person.grossIncome, age, country).then(function(yearlyNetIncome) {
                  return roundValue(yearlyNetIncome / 12);
               }));               
            }
            
            // 6 - calculated from base.tax.grossIncome
            if (person.grossIncome !== null) {
               return this.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(person.grossIncome * incomePercentage, 
                                                                                          age, country).then(function(yearlyNetIncome) {
                  return roundValue(yearlyNetIncome / 12);
               }));               
            }

            // 7 - from mainPerson.taxableIncome
            if (person.taxableIncome !== null) {
               return this.wrapThePromise(taxCalculator.calculateGrossIncomeStatePromise(base.zipAndLocation.id, age, person.civilStatus,
                  person.confession, base.numberOfChildren, person.taxableIncome, true)).then(function(grossIncome) {
                  return that.roundPromise(that.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(grossIncome, age, country)).then(
                     function(netIncome) {
                        return roundValue(netIncome / 12);
                     }));
               });
            }
            
            // 8 - from tax.taxableIncome
            if (base.tax.taxableIncome !== null) {
               return this.wrapThePromise(taxCalculator.calculateGrossIncomeStatePromise(base.zipAndLocation.id, age, person.civilStatus,
                  person.confession, base.numberOfChildren, base.tax.taxableIncome * incomePercentage, true)).then(
                     function(grossIncome) {
                        return that.roundPromise(that.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(grossIncome, age, country)).then(
                           function(netIncome) {
                              return roundValue(netIncome / 12);
                           }
                        ));
               });
            }

            // 9 - from base.defaultNetIncome
            if (base.defaultNetIncome !== null) {
               netIncomeDeferred.resolve(roundValue(base.defaultNetIncome * incomePercentage / 12));
               return netIncomeDeferred.promise;
            }
            
            // 10 - calculated from base.defaultGrossIncome
            if (base.defaultGrossIncome !== null) {
               return this.wrapThePromise(taxCalculator.calculateNetIncomeFromGrossIncome(base.defaultGrossIncome * incomePercentage, 
                                                                                          age, country).then(
               function(yearlyNetIncome) {
                  return roundValue(yearlyNetIncome / 12);
               }));               
            }            
            
            // 11 - from baseModelParameters
            if (modelParameter !== undefined && modelParameter !== null) {
               netIncomeDeferred.resolve(roundValue(modelParameter * incomePercentage));
               return netIncomeDeferred.promise;
            }
            netIncomeDeferred.resolve(null);
            return netIncomeDeferred.promise;
         },
         
         getMainPersonMonthlyNetIncomePromise: function(base) {
            return this.getPersonMonthlyNetIncomePromise(base, base.mainPerson, this.getMainPersonIncomePercentage(base), 
            parametersManager.baseModelParameters.budgetNetIncomeMonthly);
         },
         getSecondPersonMonthlyNetIncomePromise: function(base) {
            return this.getPersonMonthlyNetIncomePromise(base, base.secondPerson, this.getSecondPersonIncomePercentage(base), 
            parametersManager.baseModelParameters.budgetNetIncomeMonthly);
         },
         
         updateTaxGrossOrTaxableIncome: function(base) {
            var otherIncomePromise;
            var age = new Date().getFullYear() - base.mainPerson.birthYear;
            var isEmployee = true; // for the time being everyone is considered as Employee

            if (base.tax.entryType === EntryType.GROSS) {
               otherIncomePromise = taxCalculator.calculateTaxableIncomeStatePromise(
                  base.zipAndLocation.id,
                  age,
                  base.mainPerson.civilStatus,
                  base.mainPerson.confession,
                  base.numberOfChildren,
                  base.tax.grossIncome,
                  isEmployee);
            }
            else {
               otherIncomePromise = taxCalculator.calculateGrossIncomeStatePromise(
                  base.zipAndLocation.id,
                  age,
                  base.mainPerson.civilStatus,
                  base.mainPerson.confession,
                  base.numberOfChildren,
                  base.tax.taxableIncome,
                  isEmployee);
            }

            return $scope.requestCalculationsPromise([otherIncomePromise]).then(function(values) {
               var otherIncome = values[0];

               if (base.tax.entryType === EntryType.GROSS) {
                  // don't round taxable income
                  base.tax.taxableIncome = otherIncome;
               }
               else {
                  // round gross income
                  base.tax.grossIncome = roundValue(otherIncome);
               }
            });
         },
         updatePersonsGrossOrTaxableIncome: function(base) {
            var mainPersonOtherIncomePromise;
            var secondPersonOtherIncomePromise;
            var mainPersonAge = new Date().getFullYear() - base.mainPerson.birthYear;
            var secondPersonAge = new Date().getFullYear() - base.secondPerson.birthYear;
            var isEmployee = true; // for the time being everyone is considered as Employee

            // main person
            if (base.mainPerson.entryType === EntryType.GROSS) {
               mainPersonOtherIncomePromise = taxCalculator.calculateTaxableIncomeStatePromise(
                  base.zipAndLocation.id,
                  mainPersonAge,
                  base.mainPerson.civilStatus,
                  base.mainPerson.confession,
                  base.numberOfChildren,
                  base.mainPerson.grossIncome,
                  isEmployee);
            }
            else {
               mainPersonOtherIncomePromise = taxCalculator.calculateGrossIncomeStatePromise(
                  base.zipAndLocation.id,
                  mainPersonAge,
                  base.mainPerson.civilStatus,
                  base.mainPerson.confession,
                  base.numberOfChildren,
                  base.mainPerson.taxableIncome,
                  isEmployee);
            }

            // second person
            if (base.secondPerson.entryType === EntryType.GROSS) {
               secondPersonOtherIncomePromise = taxCalculator.calculateTaxableIncomeStatePromise(
                  base.zipAndLocation.id,
                  secondPersonAge,
                  base.secondPerson.civilStatus,
                  this.getSecondPersonConfession(base),
                  base.numberOfChildren,
                  base.secondPerson.grossIncome,
                  isEmployee);
            }
            else {
               secondPersonOtherIncomePromise = taxCalculator.calculateGrossIncomeStatePromise(
                  base.zipAndLocation.id,
                  secondPersonAge,
                  base.secondPerson.civilStatus,
                  this.getSecondPersonConfession(base),
                  base.numberOfChildren,
                  base.secondPerson.taxableIncome,
                  isEmployee);
            }

            return $scope.requestCalculationsPromise([mainPersonOtherIncomePromise, secondPersonOtherIncomePromise]).then(function(values) {
               var mainPersonOtherIncome = values[0];
               var secondPersonOtherIncome = values[1];

               if (base.mainPerson.entryType === EntryType.GROSS) {
                  // don't round taxable income
                  base.mainPerson.taxableIncome = mainPersonOtherIncome;
               }
               else {
                  // round gross income
                  base.mainPerson.grossIncome = roundValue(mainPersonOtherIncome);
               }

               if (base.secondPerson.entryType === EntryType.GROSS) {
                  // don't round taxable income
                  base.secondPerson.taxableIncome = secondPersonOtherIncome;
               }
               else {
                  // round gross income
                  base.secondPerson.grossIncome = roundValue(secondPersonOtherIncome);
               }
            });
         }
      };

      $scope.incomesCalculator = new IncomesCalculator();
   }]);
});


define('base-url-parameters-controller', [
   'app',
   'logger',
   'common-object-utilities',
   'calculators-manager'
], function(app, Logger, ObjectUtilities) {
   'use strict';

   var log = Logger.get('BaseUrlParameters');
   var asynchLog = Logger.get('AsynchronousModeProfile');

   app.register.controller('baseUrlParametersController', ['$scope', 'locationService', '$route',
      function($scope, locationService, $route) {

      var STRING_TYPE = 0;
      var NUMERIC_TYPE = 1;
      var BOOLEAN_TYPE = 2;
      var CALLBACK_TYPE = 3;

      var objectUtilities = new ObjectUtilities();
      /**
       * UrlParameter
       * 
       * Represents a single url parameter, managed by the UrlParameters "class".
       * @param type
       * @param path
       * @param onProcessed
       * @param removable
       * @param callback - Only considered for parameters of type CALLBACK_TYPE
       */
      var UrlParameter = function(name, type, path, onProcessed, removable, callback) {
         this.name = name;
         this.type = type;
         this.path = path;
         this.onProcessed = onProcessed;
         this.removable = removable;
         this.callback = callback;
      };

      UrlParameter.prototype = {
         _getValue: function(stringValue) {
            switch (this.type) {
               case STRING_TYPE:
                  {
                     return stringValue;
                  }
               case NUMERIC_TYPE:
                  {
                     if (stringValue === "" || isNaN(stringValue)) {
                        return 0.0;
                     }

                     return parseFloat(stringValue);
                  }
               case BOOLEAN_TYPE:
                  {
                     if (stringValue === "") {
                        return false;
                     }

                     return stringValue.toLowerCase() === 'true';
                  }
               case CALLBACK_TYPE:
                  {
                     return this.callback(stringValue);
                  }
            }

            return stringValue;
         },
         apply: function(stringValue) {
            var parameterValue = this._getValue(stringValue);
            log.debug(" applying parameter " + this.name + " value=" + parameterValue);
            asynchLog.debug("applyParameterValue - parameter: " + JSON.stringify(this.name));
            asynchLog.debug("applyParameterValue - parameterValue: " + JSON.stringify(parameterValue));
            asynchLog.debug("applyParameterValue - definition: " + JSON.stringify(this));
            if (this.path !== null) {
               objectUtilities.setValueThroughString($scope, this.path, parameterValue);
            }

            if (this.onProcessed) {
               this.onProcessed(parameterValue);
            }
         }
      };



      /**
       * UrlParameters
       * This object represents the url parameters module.
       * It has a list of url parameters and operations for adding parameters, clearing the
       * list, etc.
       */
      var UrlParameters = function() {
         this.list = [];
      };

      UrlParameters.prototype = {
         clear: function() {
            this.list = [];
         },
         get: function() {
            return this.list;
         },
         addString: function(parameterName, modelPath, onProcessed, removable) {
            removable = typeof removable !== 'undefined' ? removable : true;
            var urlParameter = new UrlParameter(parameterName, STRING_TYPE, modelPath, onProcessed, removable);
            this.list[parameterName.toLowerCase()] = urlParameter;
            return urlParameter;
         },
         /**
          * Defines a possible numeric URL parameter
          *
          * @param {string} parameterName This is the parameter to be used on the URL
          * @param {string} modelPath Path to the model that this parameter should be bound to
          * @param {function} onProcessed Callback function to be called after the parameter is processed
          *                   (i.e. after the associated model is changed)
C          */
         addNumeric: function(parameterName, modelPath, onProcessed, removable) {
            removable = typeof removable !== 'undefined' ? removable : true;
            var urlParameter = new UrlParameter(parameterName, NUMERIC_TYPE, modelPath, onProcessed, removable);
            this.list[parameterName.toLowerCase()] = urlParameter;
            return urlParameter;
         },
         /**
          * Defines a possible boolean URL parameter
          *
          * @param {string} parameterName This is the parameter to be used on the URL
          * @param {string} modelPath Path to the model that this parameter should be bound to
          * @param {function} onProcessed Callback function to be called after the parameter is processed
          *                   (i.e. after the associated model is changed)
          * @param {boolean} removable If the parameter can be safely removed from the URL query string after being used
          * @returns {UrlParameter} Created instance
          */
         addBoolean: function(parameterName, modelPath, onProcessed, removable) {
            removable = typeof removable !== 'undefined' ? removable : true;
            var urlParameter = new UrlParameter(parameterName, BOOLEAN_TYPE, modelPath, onProcessed, removable);
            this.list[parameterName.toLowerCase()] = urlParameter;
            return urlParameter;
         },
         /**
          * Defines a possible URL parameter which final value will be determined by a callback function
          *
          * @param {string} parameterName This is the parameter to be used on the URL
          * @param {string} modelPath Path to the model that this parameter should be bound to
          * @param {function} callback Callback function that will finally resolve the parameter value
          * @param {function} onProcessed Callback function to be called after the parameter is processed
          *                   (i.e. after the associated model is changed)
          * @returns {UrlParameter} Created instance
          */
         addCallback: function(parameterName, modelPath, callback, onProcessed, removable) {
            removable = typeof removable !== 'undefined' ? removable : true;
            var urlParameter = new UrlParameter(parameterName, CALLBACK_TYPE, modelPath, onProcessed, removable, callback);
            this.list[parameterName.toLowerCase()] = urlParameter;
            return urlParameter;
         },
         getParameterFromUrl: function(desiredParameter) {
            desiredParameter = desiredParameter.toLowerCase();
            for (var rawParameter in $route.current.params) {
               var parameter = rawParameter.toLowerCase();
               if (desiredParameter === parameter) {
                  var stringValue = $route.current.params[rawParameter];
                  return stringValue;
               }
            }
            return undefined;
         },
         process: function(callback) {
            var remainingParameters = [];
            for (var parameter in $route.current.params) {
               var stringValue = $route.current.params[parameter];
               log.debug("Parameter: " + parameter + " value: " + stringValue);
               asynchLog.debug("Parameter: " + parameter + " value: " + stringValue);

               var urlParameter = this.list[parameter.toLowerCase()];
               if (urlParameter === undefined) {
                  continue;
               }
               if (!urlParameter.removable) {
                  remainingParameters.push({"name": parameter, "value": stringValue});
               }
               urlParameter.apply(stringValue);
            }
            var newLocation = locationService.getPath();
            for (var i = 0; i < remainingParameters.length; i++) {
               var currentParameter = remainingParameters[i];
               if (currentParameter === remainingParameters[0]) {
                  newLocation = newLocation.concat('?');
               }
               newLocation = newLocation.concat(currentParameter.name + "=" + currentParameter.value);
               if (currentParameter !== remainingParameters[remainingParameters.length - 1]) {
                  newLocation = newLocation.concat('&');
               }
            }

            asynchLog.debug("CHANGING URL (UrlParameters.process)");
            $('.modal.in').removeClass('in').modal('hide');
            //dismiss modal backdrop
            $('.modal-backdrop').hide();
            locationService.setUrl(newLocation);

            if (callback) {
               callback();
            }
         }
      };

      //Publish in our own "namespace"
      $scope.urlParameters = new UrlParameters();
     
   }]);
});


define('enter-press', [
   'app'
], function(app) {
   'use strict';
   var enterPress = app.register.directive ('enterPress', function () {
      return {
         link : function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
               if (event.which === 13) {
                   scope.$apply (function () {
                       scope.$eval (attrs.enterPress);
                   });

                   event.preventDefault();
               }
            });
         }
      };
   });
   return enterPress;
});


//This directive is used in replace of ng-show to fix a flickering on animation on ie and safari
//it uses ng-class with two classes

define('visibility', [
   'app'
], function(app) {
   'use strict';
   var visibility = app.register.directive ('visibility', ['$compile', function ($compile) {
      return {
         restrict: 'A',
         replace: false, 
         terminal: true, //this setting is important, see explanation below
         priority: 1000, //this setting is important, see explanation below
         compile: function compile(element, attrs) {
            element.attr('ng-class', attrs.visibility + " ? '' : 'visibility--off'"); 
            element.removeAttr("visibility"); //remove the attribute to avoid indefinite loop
            element.removeAttr("data-visibility"); //also remove the same attribute with data- prefix in case users specify data-common-things in the html

            return {
               pre: function preLink(scope, iElement, iAttrs, controller) {  },
               post: function postLink(scope, iElement, iAttrs, controller) {  
                 $compile(iElement)(scope);
               }
            };
         }
      };
   }]);
   return visibility;
});

//Explanation why we have to set terminal: true and priority: 1000 (a high number):
//
//When the DOM is ready, angular walks the DOM to identify all registered directives and compile the directives 
//one by one based on priority if these directives are on the same element. We set our custom directive's priority 
//to a high number to ensure that it will be compiled first and with terminal: true, the other directives 
//will be skipped after this directive is compiled.
//
//When our custom directive is compiled, it will modify the element by adding directives and removing itself 
//and use $compile service to compile all the directives (including those that were skipped).
//
//If we don't set terminal:true and priority: 1000, there is a chance that some directives are compiled 
//before our custom directive. And when our custom directive uses $compile to compile 
//the element => compile again the already compiled directives. This will cause unpredictable behavior especially 
//if the directives compiled before our custom directive have already transformed the DOM.
//
//For more information about priority and terminal, check out How to understand the `terminal` of directive?
//
//An example of a directive that also modifies the template is ng-repeat (priority = 1000), when ng-repeat 
//is compiled, ng-repeat make copies of the template element before other directives get applied.
;

define('custom-base-controller', [
   'app'
], function(app) {
   'use strict';

   app.register.controller('customBaseController', ['$scope',
      function($scope) {
      }
   ]);
});


define('typeahead-watch-changes', [
   'app'
], function(app) {
   'use strict';
   var typeaheadWatchChanges = app.register.directive('typeaheadwatchchanges', function() {
      return {
         require: ["ngModel"],
         link: function(scope, element, attr, ctrls) {
            scope.$watch('inputTextModel', function(value) {
               // set an empty text and then reset the value
               // this is needed to ensure that the popup gets open when using geolocation
               // $setViewValue ends up calling some code that checks if the value has really changed, that's why a forced change is needed
               ctrls[0].$setViewValue("");
               ctrls[0].$setViewValue(value);
            });
         }
      };
   });
   return typeaheadWatchChanges;
});



define('search-field', [
   'app',
   'parameters-manager',
   'logger',
   'ui-bootstrap',
   'typeahead-watch-changes'
], function(app, parametersManager, Logger) {
   'use strict';

   var asynchLog = Logger.get('AsynchronousModeProfile');
   
   var searchfield = app.register.directive('searchfield', ['$timeout', '$document', function($timeout, $document) {
      return {
         restrict: 'E',
         scope: {
            label: '@',
            model: '=',
            attribute: '@',
            onChange: '&',
            searchFunction: '=',
            allowEmpty: '@',
            isRequired: '@'
         },
         templateUrl: 'src/directives/fields/search-field/search-field.html',
         controller: ['$scope', function($scope) {
         
            // inputTextModel is a fake model to avoid contention between
            // typeahead model and the selection text field.
            // If only one model is used, the text field sets the current
            // typed string, which is only a string while the model is
            // a ZipAndLocation object. When the selection is finished,
            // the right object is assigned to the model.
            $scope.inputTextModel = null;

            //Each time the main model is changed we want to make sure
            //that the inputTextModel gets correctly updated.
            $scope.$watch(function() {
               return ($scope.model !== undefined) ? $scope.model[$scope.attribute] : null;
            }, function(newValue, oldValue) {
               if (newValue !== oldValue || $scope.inputTextModel === null) {
                  $scope.inputTextModel = ($scope.model !== undefined) ? $scope.model[$scope.attribute] : null;
               }
            });

            $scope.resetInputTextModel = function() {
               $scope.inputTextModel = ($scope.model !== undefined) ? $scope.model[$scope.attribute] : null;
               if ($scope.inputTextModel === undefined) {
                  $scope.searchText();
               }
            };

            $scope.cancelOnEscape = function(event) {
               if (event.keyCode === 27) {
                  $scope.resetInputTextModel();
               }
            };

            $scope.onSelect = function($model) {
               if ($model === "" && $scope.allowEmpty) {
                  $scope.model[$scope.attribute] = null;
               }
               else {
                  $scope.model[$scope.attribute] = $model;
               }
               $scope.onChange();
            };

            $scope.searchText = function(viewValue) {
               return $scope.searchFunction(viewValue).then(function(list) {
                  return list;
               });
            };
            
            // Keeps the active element visible
            $scope.keepActiveListItemVisible = function(element, activeIdx) {
               if (activeIdx === -1) {
                  return;
               }

               var ul = element.find('ul.dropdown-menu')[0];

               if (ul === undefined) {
                  // the popup has not been open yet
                  return;
               }

               var someLi = element.find('ul.dropdown-menu li')[0];

               if (someLi === undefined) {
                  // the popup has not been open yet
                  return;
               }

               var rowHeight = someLi.clientHeight;
               var optionTop = activeIdx * rowHeight;
               var optionBottom = optionTop + rowHeight;
               var ulHeight = ul.offsetHeight;
               if (optionBottom > ul.scrollTop + ulHeight) {
                  ul.scrollTop = (activeIdx - 8 + 1) * rowHeight;
               }
               if (optionTop < ul.scrollTop) {
                  ul.scrollTop = optionTop;
               }
            };

            $scope.resetInputTextModel();
         }],
         compile: function(element, attrs) {
            return {
               pre: function preLink(scope, element, attrs, controller) {
                  // adds an id based on the model attribute, for easier identification from tests
                  scope.fieldId = attrs.model.replace(/\./g, '_') + "_" + attrs.attribute;
               },
               post: function postLink(scope, element, attrs, controller) {
                  // in case of wrong input, resets the input model to a previously valid value (on blur)
                  // WARNING: it relies on the usage of $timeout to let a possible selection in the matches list win over the model reset
                  var input = element.find('input');
                  scope.theInput = input;

                  var getInputValue = function() {
                     if (typeof scope.inputTextModel === "string") {
                        return scope.inputTextModel;
                     }
                     else {
                        if (scope.inputTextModel === null) {
                           return "";
                        }
                        else {
                           return scope.inputTextModel.value;
                        }
                     }
                  };

                  var modelIsValid = function() {
                     if (scope.allowEmpty && getInputValue() === "") {
                        return true;
                     }

                     if (scope.model[scope.attribute] === null) {
                        return false;
                     }

                     if (getInputValue() !== scope.model[scope.attribute].value) {
                        return false;
                     }

                     return true;
                  };

                  input.on('focus', function (event) {
                     $timeout(function() {
                        if (input[0].id === document.activeElement.id) {
                           input.select();
                        }
                     });
                  });

                  input.on('blur', function (event) {
                     if (scope.allowEmpty && scope.inputTextModel === "") {
                        scope.$apply(function() {
                           scope.onSelect("");
                        });
                     }

                     if (!modelIsValid()) {
                        // check if the user typed something good enough to match a valid and unique selection
                        scope.searchText(scope.inputTextModel).then(function(results) {
                           if (results.length === 1) {
                              // if valid and unique, accept it
                              $timeout(function() {
                                 scope.onSelect(results[0]);
                                 scope.resetInputTextModel();
                              });
                           }
                           else {
                              // if not valid, set a timeout: perhaps the focus was lost because the user selected an option from the typeahead popup
                              $timeout(function() {
                                 // check again after the timeout and possible selection from the typeahead popup
                                 if (!modelIsValid()) {
                                    // if the value is still invalid, reset to previous valid
                                    scope.resetInputTextModel();
                                 }
                              }, 250, true);
                           }
                        });
                     }
                  });

                  // WARNING: Using $$childHead as the only way to watch stuff from the typeahead directive
                  scope.$$childHead.$watch('activeIdx', function(activeIdx) {
                     scope.keepActiveListItemVisible(element, activeIdx);
                  });

                  // WARNING: Using $$childHead as the only way to touch stuff from the typeahead directive
                  // The following is a copy of the typeahead's resetMatches method.
                  // It's used to close the popup when the user goes somewhere else outside the search field
                  var resetMatches = function() {
                    scope.$$childHead.matches = [];
                    scope.$$childHead.activeIdx = -1;
                    input.attr('aria-expanded', false);
                  };

                  // The following is a copy of the typeahead's dismissClickHandler method,
                  // just that it handles the mousedown event instead of the click event.
                  // Some elements like the numeric slider do not trigger a click event (because there's drag happening, not a click).
                  // Resets the matches so the popup is closed.
                  var dismissMouseDownHandler = function(evt) {
                     if (!element[0].contains(evt.target)) {
                        resetMatches();
                        scope.$digest();
                     }
                  };

                  $document.bind('mousedown', dismissMouseDownHandler);

                  scope.$on('$destroy', function() {
                     $document.unbind('mousedown', dismissMouseDownHandler);
                  });
               }
            };
         }
      };
   }]);

   return searchfield;
});


define('base-controller', [
   'app',
   'parameters-manager',
   'logger',
   'common-object-utilities',
   'theme-manager',
   'routes-handler',
   'common-scope-helper',
   'common-currency-formatter',
   'basic-base-controller',
   'base-incomes-calculator-controller',
   'base-url-parameters-controller',
   'active-controller',
   'loading-controller',
   'localization',
   'calculators-manager',
   'message-service',
   'google-analytics-service',
   'print-service',
   'file-service',
   'filesaver',
   'storage-manager',
   'storage-service',
   'location-breadcrumbs',
   'enter-press',
   'visibility',
   'calculator-service',
   'custom-base-controller',
   'model-updater',
   'zip-and-location-service',
   'product-list-service',
   'authentication-service',
   'log-statistics-service',
   'location-service',
   'search-field'
], function(app, parametersManager, Logger, ObjectUtilities, ThemeManager, routesHandler, ScopeHelper, CurrencyFormatter) {
   'use strict';

   // Base controller ideas taken from http://stackoverflow.com/questions/18509464/determine-active-controller

   var log = Logger.get('Base');
   var asynchLog = Logger.get('AsynchronousModeProfile');
   var statusLog = Logger.get('BaseStatus');

   app.register.controller('baseController', ['$scope', 'activeController',
      'loadingService', '$rootScope', 'localize', '$timeout', '$window',
      '$templateCache', '$http', '$compile', '$injector',
      'calculatorsManager', 'printService', 'fileService', 'storageManager', 'translateRoute',
      'messageService', 'locationBreadcrumbsService', 'storageService', '$q',
      'calculatorService', 'googleAnalyticsService', 'modelUpdater',
      'zipAndLocationService', 'productListService', 'authenticationService',
      'logStatisticsService', 'locationService',
      function($scope, activeController, loadingService, $rootScope, localize,
               $timeout, $window, $templateCache, $http, $compile, $injector,
               calculatorsManager, printService, fileService, storageManager,
               translateRoute, messageService, locationBreadcrumbsService, storageService, $q,
               calculatorService, googleAnalyticsService, modelUpdater,
               zipAndLocationService, productListService, authenticationService,
               logStatisticsService, locationService) {

      $rootScope.$emit('viewControllerInitializationStarted');

      // inject basic base behaviour
      $injector.invoke(['$controller', function ($controller) {
         $controller('basicBaseController', {$scope: $scope});
      }]);
   
      $injector.invoke(['$controller', function ($controller) {
         $controller('customBaseController', {$scope: $scope});
      }]);

      $injector.invoke(['$controller', function ($controller) {
         $controller('baseIncomesCalculatorController', {$scope: $scope});
      }]);

      $injector.invoke(['$controller', function ($controller) {
         $controller('baseUrlParametersController', {$scope: $scope});
      }]);

      log.debug("starting base controller");

      //Main status flags
      $scope.displayable = false; //the controller's contents can be displayed
      $scope.ready = false;       //the controller is completely ready for normal usage

      $scope.preCalculate = $q.defer();
      $scope.prePromises = [];
      $scope.initialPromise = $q.defer();
      $scope.initialPromises = [];
      $scope.prePromisesDefined = $q.defer();

      $scope.helper = new ScopeHelper($scope);
      $scope.defaultCurrencyFormatter =
              new CurrencyFormatter(parametersManager.baseViewParameters.groupDelimiter,
                                    parametersManager.baseViewParameters.amountDecimalDelimiter,
                                    parametersManager.baseViewParameters.useMixedGroupingSeparator);

      // ***************************
      // **** Private functions ****
      // ***************************
      
      var setupModel = function() {
         $scope.onModelSetup();
         //At this point, all the pre-promises are defined,
         //so fire any pending code on this condition
         $scope.prePromisesDefined.resolve();
      };

      var onRouteUpdate = function() {
         $scope.updateChartsOnCalculate = false;
         $scope.onRouteUpdateBeforeAnimating();
         if ($scope.data && $scope.data.alternativeOpen !== undefined) {
            startAnimation($scope.data.alternativeOpen);
         }
         $scope.onRouteUpdateBeforeCalculating();
         $scope.calculate(function() {
            $scope.onRouteUpdateAfterCalculating();
            $scope.forceActiveChartDraw();
            $scope.setInitialFocusWithAnimation();
         }, true);
      };

      var startAnimation = function(openAlternative) {
         if ($scope.style === "desktop") {
            $scope.sleepResetDrawingChartDuringAnimation = true;
            $('.animated-container').addClass("slide");
            $('.animated-div').addClass('fade-in-out');
            if (!openAlternative) {
               $('.animated-div').removeClass("slide-left");
               $('.animated-div').addClass("slide-right");
            }
            else {
               $('.animated-div').removeClass("slide-right");
               $('.animated-div').addClass("slide-left");
            }

            $('.resultPanel').addClass('fade-in-out');
         }
         else {
            $('.animated-container').removeClass("slide");
            $('.animated-div').removeClass("slide-left");
            $('.animated-div').removeClass("slide-right");

            $('.resultPanel').removeClass('fade-in-out');
         }
      };

      var resolvePrePromises = function() {
         asynchLog.debug("!!! starting resolvePrePromises");
         if (!$scope.hasBeenRejected) {
            var prePromises = $scope.prePromises.slice();
            if (prePromises.length > 0) {
               calculatorService.sendRequests().then(function() {
                  asynchLog.debug("resolveprepromises");
                  $q.all(prePromises).then(function(result) {
                     asynchLog.debug("!!! FINISHED resolvePrePromises");
                     if ($scope.hasPendingPrePromises()) {
                        asynchLog.debug("!!! NEW PRE-PROMISES DETECTED!");
                        resolvePrePromises();
                     }
                     else {
                        $scope.preCalculate.resolve(result);
                     }
                  },
                  function(reason) {
                     $scope.rejectHandler(reason);
                  });
               },
               function(reason) {
                  $scope.rejectHandler(reason);
               });
            }
            else {
               $scope.preCalculate.resolve();
            }
         }
         else {
            $scope.preCalculate.reject();
         }
      };
      var resolveInitialPromises = function() {
         asynchLog.debug("!!! starting resolveInitialPromises");
         if (!$scope.hasBeenRejected) {
            if ($scope.initialPromises.length > 0) {
               calculatorService.sendRequests().then(function() {
                  asynchLog.debug("resolveInitialPromises");
                  $q.all($scope.initialPromises).then(function(result) {
                     asynchLog.debug("!!! FINISHED resolveInitialPromises");
                     if ($scope.hasPendingInitialPromises()) {
                        asynchLog.debug("!!! NEW INITIAL PROMISES DETECTED!");
                        resolveInitialPromises();
                     }
                     else {
                        $scope.initialPromise.resolve(result);
                     }
                  },
                  function(reason) {
                     $scope.rejectHandler(reason);
                  });
               },
               function(reason) {
                  $scope.rejectHandler(reason);
               });
            }
            else {
               $scope.initialPromise.resolve();
            }
         }
         else {
            $scope.initialPromise.reject();
         }
      };

      var restartController = function() {
         $scope.clearPrePromises();
      };

      var finishLoading = function(callback) {
         asynchLog.debug("finishLoading called, waiting...");
         $scope.prePromisesDefined.promise.then(function() {
            asynchLog.debug("==================== finishLoading ====================");
            resolvePrePromises();

            if ($scope.doCalculate) {
               //$scope.whenCalculated(function() {
               $scope.calculated.promise.then(function() {
                  asynchLog.debug("1. INITIAL CALCULATION DONE");
                  statusLog.debug("1. INITIAL CALCULATION DONE");
                  $scope.initialCalculationDone = true;
                  //we need a function to be executed after doCalculate has finished
                  if (typeof(callback) === "function") {
                     callback();
                  }
                  $scope.setStatus();
                  
               });
            }
            else {
               asynchLog.debug("1. INITIAL CALCULATION DONE");
               statusLog.debug("1. INITIAL CALCULATION DONE");
               $scope.initialCalculationDone = true;
               $scope.setStatus();
            }

            var googleAnalyticsTrackers = parametersManager.baseApplicationParameters.googleAnalyticsID;
            if (!(googleAnalyticsTrackers instanceof Array)) {
               googleAnalyticsTrackers = [];
            }
            $window.initializeGoogleAnalytics(googleAnalyticsTrackers);

            // initial focus
            $(document).ready(function() {
               $timeout(function() {
                  $scope.domReady = true;
                  asynchLog.debug("2. DOM READY");
                  statusLog.debug("2. DOM READY");
                  $scope.setStatus();
               });

               // page title
               $timeout(function() {
                  $scope.updateDocumentTitle();
                  $scope.updateDocumentDescription();
                  $scope.broadcastViewTitle();

                  $scope.documentTitleReady = true;
                  asynchLog.debug("3. DOCUMENT TITLE");
                  statusLog.debug("3. DOCUMENT TITLE");
                  $scope.setStatus();
               });
            });

            $('#copyright-disclaimer').show();
            loadingService.finishLoading();

            $scope.baseControllerReady = true;
            asynchLog.debug("4. BASE CONTROLLER READY");
            statusLog.debug("4. BASE CONTROLLER READY");
            $scope.setStatus();

            // tell the breadcrumbs service about this controller
            locationBreadcrumbsService.push($scope.getCanGoBackFunction());
         });
         
         if ($scope.data && $scope.data.alternativeOpen !== undefined) {
            $scope.urlParameters.addBoolean('showAlternative', 'data.alternativeOpen', function(alternativeOpen) {
                  // TODO: reorganize url parameters declaration
                  if ($scope.onShowAlternativeUrlParameterParsed) {
                     $scope.onShowAlternativeUrlParameterParsed(alternativeOpen);
                  }
               }, false);

            $scope.openAlternative = function() {
               if ($scope.onOpenAlternative) {
                  $scope.onOpenAlternative();
               }
               locationService.setSearch("showAlternative=true");
            };

            $scope.closeAlternative = function() {
               if ($scope.onCloseAlternative) {
                  $scope.onCloseAlternative();
               }
               locationService.setSearch("showAlternative=false");
            };
         }
      };

      // **************************
      // **** Public functions ****
      // **************************
      
      $scope.rejectHandler = function(reason) {
         $scope.hasBeenRejected = true;
         log.error(reason);
         $scope.clearScenario(); //necessary for the next calculation to be executed for sure
         $timeout(function() {
            $scope.showErrorMessage('CalculationError',  {enumName: 'Application', group: 'Calculation'});
            if (!$scope.ready) {
               //Make the calculator ready, so the user can at least go
               //to another theme or calculator
               loadingService.finishLoading();
               $scope.ready = true;
               $rootScope.status = 'ready';
               $rootScope.activeController = $scope.controllerName;

               $rootScope.$emit('viewControllerInitializationFinished');
            }
         });
      };

      $scope.onModelSetup = function() {
         //Can be overloaded
      };
      
      $scope.defineUrlParameters = function () {
         //Can be overloaded
      };
      
      $scope.dossierIdUrlParameter = function () {
         $scope.urlParameters.addString('dossierId', null, function(dossierId) {
            $scope.addPrePromise(storageService.getDossier('AnonymousContactDossier', dossierId, null).then(
               function(result) {
                  modelUpdater.update(result.dossier.onlineCalc).then(function() {
                     storageManager.updateStoredObjectWith(result.dossier.onlineCalc);

                     $scope.showSuccessMessage('GetDossierSucceeded', {enumName: 'StorageService', group: 'DossierID', useTimeout: true, dismissOnNavigation: false});
                  }).catch(function(error) {
                     $scope.showErrorMessage('CouldNotUpdateDossier', {enumName: 'StorageService', group: 'DossierID', useTimeout: true, dismissOnNavigation: false});
                  });
               },
               function(result) {
                  if (result.status === StorageServiceResultStatus.DOSSIERNOTAVAILABLE) {
                     $scope.showErrorMessage('DossierNotAvailable', {enumName: 'StorageService', group: 'DossierID', useTimeout: true, dismissOnNavigation: false});
                  }
                  if (result.status === StorageServiceResultStatus.DOSSIERNOTFOUND) {
                     $scope.showErrorMessage('DossierNotFound', {enumName: 'StorageService', group: 'DossierID', useTimeout: true, dismissOnNavigation: false});
                  }
                  else {
                     $scope.showErrorMessage('GetDossierFailed', {enumName: 'StorageService', group: 'DossierID', useTimeout: true, dismissOnNavigation: false});
                  }
               }
            ));
         });
      };

      $scope.onPrintSetup = function(printService) {
         //To be overridden
      };

      $scope.start = function() {
         finishLoading();
         $scope.hasBeenRejected = false;
         resolveInitialPromises();
         $scope.initialPromise.promise.then(function() {
            //Dossier Id url parameter is common to all views
            $scope.dossierIdUrlParameter();
            $scope.defineUrlParameters();
            $scope.urlParameters.process(function() {
               setupModel();
            });
         });
         $scope.onPrintSetup(printService);
      };
      
      $scope.getStatistics = function() {
         var themeManager = new ThemeManager();
         
         var userData = authenticationService.getUserData();
         return {
            pcId: window.localStorage.pcId,
            customer: (userData) ? userData.customerNumber : null,
            userId: authenticationService.getUserLogged(),
            calculator: themeManager.getCurrentSubThemeId()
         };
      };

      // **** INITIAL PROMISES ****
         
      $scope.addInitialPromise = function(promise) {
         $scope.initialPromises.push(promise);
      };
      
      $scope.hasPendingInitialPromises = function() {
         for (var index = 0; index < $scope.initialPromises.length; index++) {
            var initialPromise = $scope.initialPromises[index];
            //asynchLog.debug("status=" + initialPromise.$$state.status);
            if (initialPromise.$$state.status === 0) {
               return true;
            }
         }
         return false;
      };

      // **** PRE-PROMISES ****

      $scope.addPrePromise = function(promise) {
         $scope.prePromises.push(promise);
      };

      $scope.hasPendingPrePromises = function() {
         for (var index = 0; index < $scope.prePromises.length; index++) {
            var prePromise = $scope.prePromises[index];
            //asynchLog.debug("status=" + prePromise.$$state.status);
            if (prePromise.$$state.status === 0) {
               return true;
            }
         }
         return false;
      };

      $scope.clearPrePromises = function() {
         $scope.preCalculate = $q.defer();
         $scope.prePromises = [];
         $scope.hasBeenRejected = false;
      };

      $scope.allPrePromisesResolved = function() {
         return $scope.preCalculate.promise.$$state.status !== 0;
      };

      $scope.onRouteUpdateBeforeAnimating = function() {
         //to be overridden
      };

      $scope.onRouteUpdateBeforeCalculating = function() {
         //to be overridden
      };

      $scope.onRouteUpdateAfterCalculating = function() {
         //to be overridden
      };

      $scope.$on('$routeUpdate', function() {
         asynchLog.debug("ROUTE CHANGED. ready? " + $scope.ready);
         //If the scope is not yet ready, just ignore this route update.
         //See UrlParameters.process
         if (!$scope.ready) {
            return;
         }

         restartController();
         if ($scope.data && $scope.data.alternativeOpen !== undefined) {
            $scope.data.alternativeOpen = false;
         }
         asynchLog.debug("routeUpdate before process");
         $scope.urlParameters.process(function() {
            setupModel();
            $scope.prePromisesDefined.promise.then(function() {
               resolvePrePromises();
            });
            onRouteUpdate();
         });
      });

      $scope.onNewConsulting = function() {
         //to be overridden
      };
      $scope.onBeforeNewConsulting = function() {
         //to be overridden
      };
      
      $scope.$on('newConsulting', function() {
         restartController();

         $scope.onBeforeNewConsulting();
         setupModel();
         $scope.prePromisesDefined.promise.then(function() {
            resolvePrePromises();
            $scope.onNewConsulting();
            if ($scope.getVisibleRefreshHandlers) {
               //Make sure that the correct elements are displayed
               $scope.helper.display($scope.getVisibleRefreshHandlers());
            }
            $scope.calculate();
         });
      });
      
      $scope.shutdown = function() {
         $scope.helper.forEachRefreshHandler(function(refreshHandler) {
            refreshHandler.shutdown();
         });
      };
      
      $("body").scrollTop(0);

      initializeScope();
      initializeCharts();
      initializeDialogs();

      function initializeDialogs() {
         // Dialog support
         $scope.onModalCloseInitialized = false;
         $scope.dialogTemplatePath = undefined; //must be overridden
         
         var formatDialogName = function(dialogName) {
            if (dialogName) {
               var name = dialogName[0].toUpperCase() + dialogName.substring(1);
               return name.replace(/-(.)/g, function(match, group1) {
                  return group1.toUpperCase();
               });
            }
            else {
               return '';
            }
         };

         $scope.openDialog = function(dialogName, path) {
            var templatePath = path;
            if (!templatePath) {
               if (!$scope.dialogTemplatePath) {
                  log.error("variable 'dialogTemplatePath' or 'path' parameter must be defined");
                  return;
                }
               templatePath = $scope.dialogTemplatePath;
            }

            $scope.dialogName = dialogName;
            $scope.templatePath = templatePath + dialogName + '.html';
            $rootScope.$broadcast('setup' + formatDialogName($scope.dialogName));
            var finishDialogSetupDeregister = $rootScope.$on('finish' + formatDialogName($scope.dialogName) + 'Setup', function() {
               $scope.dialogWindowOpen = true;
               $('#editDialogBox' + formatDialogName($scope.dialogName)).modal('show');
               finishDialogSetupDeregister();
            });

            // handle hidden.bs.modal event for selected dialog, be sure to add just one event listener
            if (!$scope.onModalCloseInitialized) {
               $scope.onModalCloseInitialized = true;
               $('#editDialogBox' + formatDialogName($scope.dialogName)).on('hidden.bs.modal', function () {
                  $scope.dialogWindowOpen = false;
               });
            }
         };

         $scope.close = function() {
            $('#editDialogBox' + formatDialogName($scope.dialogName)).modal('hide');
            $scope.calculate();
         };
      }

      // initial focus
      $scope.initiallyFocusedElement = function() {
         // to be overwriten by controllers
         log.error("$scope.initiallyFocusedElement should have been overwritten by concrete controllers");
         return null;
      };

      $scope.setScrollForFocusedElement = function(element) {
         var elementTop = $(element).offset().top;
         var windowScrollTop = $(window).scrollTop();
         var windowInnerHeight = window.innerHeight;
         var offset = elementTop - windowScrollTop;

         if (offset < 0 || offset > windowInnerHeight) {
            // Not in view so scroll to it
            var closestFancyBox = $(element).closest(".fancy-box");
            if (closestFancyBox.length > 0) {
               var fancyBoxTop = closestFancyBox.offset().top;
               $('html,body').scrollTop(fancyBoxTop - 50);
            }
         }
      };

      $scope.setFocus = function(element, forceVisible, callback) {
         // forceVisible defaults to true
         if (forceVisible === undefined) {
            forceVisible = true;
         }

         if (element === null) {
            log.warn("Element to set focus is null");
            if (typeof(callback) === "function") {
               // Execute the callback anyway (the focus couldn't be set but the controller is anyway ready)
               callback();
            }
            return;
         }

         var done = false;
         var count = 0;
         var interval = window.setInterval(function() {
            count++;

            if (count >= 10) {
               // too much retries, forget it
               window.clearInterval(interval);
               log.warn("Couldn't set focus on " + element);
               if (typeof(callback) === "function") {
                  // Execute the callback anyway (the focus couldn't be set but the controller is anyway ready)
                  callback();
               }
               return;
            }

            if (done) {
               // focus already set, don't do it anymore
               window.clearInterval(interval);
               return;
            }

            if ($(element).length === 0) {
               // element does not exist (yet?)
               return;
            }

            var isMobile;
            if (window.matchMedia) {
               isMobile = window.matchMedia("only screen and (max-width: 760px)");
            }
            else {
               // old IE?
               isMobile = { matches: false };
            }

            // It's important that the focused element gets visible.
            if (forceVisible) {
               $scope.setScrollForFocusedElement(element);
            }

            // We don't set the focus in mobile because the virtual keyboard gets open, making the view partially invisible.
            // If the screen is big enough, we suppose the user has a computer with physical keyboard.
            // Even in case of a virtual keyboard, it should not cover much of the screen.
            if (!isMobile.matches) {
               $(element).focus();
            }

            done = $(element)[0].id === document.activeElement.id;

            if (done) {
               window.clearInterval(interval);

               if (typeof(callback) === "function") {
                  callback();
               }
            }
            else {
               log.warn("Setting focus has no effect, will retry");
            }
         }, 100);
      };

      function initializeScope() {
         $scope.calculated = $q.defer();
         $scope.pendingCalculation = undefined;
         $scope.calculating = false;
         $scope.updateChartsOnCalculate = true;

         $scope.onCalculationFinished = function() {
            $scope.refresh();
            $scope.updateChartsOnCalculate = true;

            $scope.calculated = $q.defer();
            $scope.calculating = false;
            if ($scope.pendingCalculation) {
               asynchLog.debug("*** Processing pending calculation");
               $scope.calculate($scope.pendingCalculation.callback);
            }
         };
         
         $scope.onCalculationAborted = function() {
            $scope.calculated = $q.defer();
            $scope.calculating = false;
            if ($scope.pendingCalculation) {
               asynchLog.debug("*** Processing pending calculation");
               $scope.calculate($scope.pendingCalculation.callback);
            }
         };

         $scope.calculate = function(callback, force) {
            asynchLog.debug("*** Calculate called");

            if ($scope.calculating) {
               asynchLog.warn("there is a calculation already running, marking new calculation as pending");
               $scope.pendingCalculation = { callback: callback };
               return;
            }
            else {
               $scope.calculating = true;
               $scope.pendingCalculation = undefined; //ADDED
            }

            $scope.preCalculate.promise.then(function() {
               $scope.hasBeenRejected = false;
               asynchLog.debug("*** ... about to calculate, checking for scope changes");
               if (force === undefined) {
                  force = false;
               }
               if (!force) {
                  if (!$scope.scenarioHasChanged($scope.scenario, $scope.base)) {
                     asynchLog.debug("*** ... doCalculate skipped, no changes");
                     if (typeof(callback) === "function") {
                        callback();
                     }
                     $scope.onCalculationFinished();
                     return;
                  }
               }

               asynchLog.debug("*** ... calling doCalculate");
               if ($scope.doCalculate) {
                  $scope.doCalculate(callback);
               }
               asynchLog.debug("*** ... doCalculate finished");
               //$scope.clearPrePromises();
               $scope.calculated.promise.then(function() {
                  $scope.onCalculationFinished();
               },
               function(reason) {
                  $scope.onCalculationAborted();
               });
            },
            function(reason) {
               $scope.rejectHandler(reason);
               $scope.onCalculationAborted();
            });
         };

         $scope.finishCalculation = function() {
            asynchLog.debug("### finishCalculation");
            if ($scope.scenario && $scope.base) {
               $scope.saveScenario($scope.scenario, $scope.base);
            }
            $scope.calculated.resolve("");
         };
         
         $scope.abortCalculation = function() {
            asynchLog.debug("### abortCalculation");
            $scope.calculated.reject("");
         };

         $scope.whenCalculated = function(callback) {
            if ($scope.doCalculate) {
               //$q.when($scope.calculated || $scope.calculate(), function() {
               $q.when($scope.calculated, function() {
                  asynchLog.debug("REQUEST CALCULATION FINISHED, running callback");
                  if (typeof(callback) === "function") {
                     callback();
                  }
               });
            }
            else {
               if (typeof(callback) === "function") {
                  callback();
               }
            }
         };

         /*
               var spread = function(func) {
                  return function(array) {
                     func.apply(void 0, array);
                  }
               };

               //]).then(spread(function (affCalc, costCalc) {
          */

         $scope.pendingRequestCalculation = undefined;
         $scope.requestCalculated = undefined;
         $scope.requestCalculations = function(calculationRequests, callback, description) {
            asynchLog.debug("Requesting calculation for " + description);
            $scope.clearMessagesForGroup('Calculation');
//            if ($scope.requestCalculated) {
//               asynchLog.debug("status: " + $scope.requestCalculated.$$state.status + " pending: " + $scope.requestCalculated.$$state.pending);
//            }
            if ($scope.requestCalculated && $scope.requestCalculated.$$state.status === 0) {
               asynchLog.warn("there is a request calculation already running (" + $scope.runningCalculationDescription + "), marking new calculation as pending");
               $scope.pendingRequestCalculation = { calculationRequests: calculationRequests, callback: callback, description: description };
               return;
            }
            else {
               $scope.pendingRequestCalculation = undefined;
            }

            $scope.runningCalculationDescription = description;
            asynchLog.debug("request calculations");
            calculatorService.sendRequests().then(function() {
               $scope.requestCalculated = $q.all(calculationRequests).then(function (values) {
                  asynchLog.debug("Calculation requests finished for " + description + ", generating results");
                  ////
                  //callback(values);
                  if (!$scope.hasBeenRejected) {
                     if ($scope.pendingRequestCalculation) {
                        asynchLog.debug("Processing pending request calculation for " + $scope.pendingRequestCalculation.description);
                        var pendingCalculation = $scope.pendingRequestCalculation;
                        //$scope.pendingCalculation = undefined;
                        asynchLog.debug("--> Hanging listener");
                        $scope.requestCalculated.then(function() {
                           $scope.requestCalculations(pendingCalculation.calculationRequests, pendingCalculation.callback, pendingCalculation.description);
                        });
                     }
                     else {
                        $scope.requestCalculated.then(function() {
                           if (typeof(callback) === "function") {
                              callback(values);
                           }
                        });
                     }
                  }
               },
               function(reason) {
                  $scope.abortCalculation();
                  $scope.rejectHandler(reason);
               });
            },
            function(reason) {
               $scope.rejectHandler(reason);
            });
         };

         $scope.requestCalculationsPromise = function(calculationRequests) {
            var deferred = $q.defer();
            $scope.requestCalculations(calculationRequests, function(values) {
               deferred.resolve(values);
            });
            return deferred.promise;
         };

         $scope.onRefresh = function() {
            //by default do nothing
         };

         $scope.refresh = function() {
            if (!$scope.updateChartsOnCalculate) {
               asynchLog.debug("AVOID UPDATE CHARTS ON CALCULATE");
               return;
            }
            //NOTE: This $timeout is needed if the calculation is local, i.e. if it calculates
            //immediately, on the same call. In this case, the following updates fail because
            //the digest cycle is not yet ended and therefore the article is hidden.
            $timeout(function() {
               asynchLog.debug("Refreshing...");
               if ($scope.isReady()) {
                  $scope.onRefresh();
               }
               else {
                  asynchLog.warn("REFRESH AFTER CALCULATION AVOIDED");
               }
            });
         };

         $scope.onActiveChartRedraw = function() {
            //by default do nothing
         };

         $scope.forceActiveChartDraw = function() {
            //Due to a bug in flot, we need to update the chart
            //when it is being shown
            $timeout(function() {
               $timeout(function() {
                  $scope.updateChartsOnCalculate = true;
                  if ($scope.getVisibleRefreshHandlers) {
                     //If we have a list of visible refresh handlers, use it
                     //to ensure that they are the only ones visible (see
                     // ScopeHelper#display)
//                     var list = $scope.getVisibleRefreshHandlers();
//                     var ids = "";
//                     for (var index = 0; index < list; index++) {
//                        ids += list[index].elementId + ", ";
//                     }
                     ////
                     $scope.helper.display($scope.getVisibleRefreshHandlers());
                     $scope.onActiveChartRedraw();
                  }
                  else {
                     //OLD WAY
                     $scope.onActiveChartRedraw();
                  }
               });
            });
         };

         if ($('#alternativeResult').length) {
            $scope.onResize = function() {
               if (($window.outerWidth !== 0 && $window.outerWidth < 516) ||
                   ($window.outerWidth === 0 && screen.width < 516)) {
                  if ($scope.style !== "mobile") {
                     $scope.style = "mobile";
                     $("#alternativeResult").insertAfter($("#alternativeData"));
                  }
               }
               else {
                  if ($scope.style !== "desktop") {
                     $scope.style = "desktop";
                     $("#alternativeData").insertAfter($("#alternativeResult"));
                  }
               }
            };

            $window.onresize = $scope.onResize;
            $timeout(function() {
               $scope.onResize();
            });
         }

         $scope.urlParameters.addCallback('language', 'language', function(language) {
            if (!language) {
               language = localize.getSessionStoredLanguage();
            }

            if (language && language !== localize.getActiveLanguage()) {
               //FIXME? callback for error (feedback)
               localize.setLanguage(language);
            }

            return language;
         });

         $scope.urlParameters.addCallback('country', 'country', function(country) {
            if (!country) {
               country = localize.getSessionStoredCountry();
            }

            if (country && country !== localize.getActiveCountry()) {
               //FIXME? callback for error (feedback)
               localize.setCountry(country);
            }

            return country;
         });

         if ($scope.addCustomBaseUrlParameters) {
            $scope.addCustomBaseUrlParameters();
         }

         $scope.showResultPanel = function() {
            return true;
         };
         
         $scope.createBridge = function() {
            var bridge = {};
            bridge.createChartUpdater = function(chart, buildChartCallback) {
               return $scope.createChartUpdater(chart, buildChartCallback);
            };
            bridge.createRefreshHandler = function(id, updater) {
               return $scope.helper.createRefreshHandler(id, updater);
            };
            bridge.update = function() {
               throw "'update' must be defined!";
            };
            bridge.forceDraw = function() {
               throw "'forceDraw' must be defined!";
            };
            bridge.getChart = function() {
               throw "'getChart' must be defined!";
            };
            bridge.newBridge = function() {
               return $scope.createBridge();
            };
            bridge.openDialog = function(dialogName, path) {
               return $scope.openDialog(dialogName, path);
            };

            bridge.$cleverWatch = function(watchExpression, listener, objectEquality) {
               return $scope.$cleverWatch(watchExpression, listener, objectEquality);
            };

            bridge.loadTemplateArray = function(templateId, templateUrl, length, fillScopeFunction) {
               return $scope.loadTemplateArray(templateId, templateUrl, length, fillScopeFunction);
            };

            bridge.getDefaultCurrencyFormatter = function() {
                return $scope.defaultCurrencyFormatter;
            };

            return bridge;
         };

         $scope.getProductList = function(listName) {
            return productListService.getProductList(listName).then(function(object) {
               if (object.status === -1) {
                  log.warn("Product list " + listName + " could not be loaded from the server: using local version");
               }
               return object.list;
            });
         };
      }

      $scope.setInitialFocus = function(forceVisible, callback) {
         var initiallyFocusedElement = $scope.initiallyFocusedElement();
         $scope.setFocus(initiallyFocusedElement, forceVisible, callback);
      };

      $scope.updateDocumentTitle = function() {
         var themeManager = new ThemeManager();

         var pageTitle = "";
         var currentThemeId = themeManager.getCurrentThemeId();
         var currentSubThemeId = themeManager.getCurrentSubThemeId();
         if (currentThemeId !== null && currentSubThemeId !== null && currentSubThemeId !== undefined) {
            pageTitle = localize.getLocalizedString('PageTitles.' + currentThemeId + '_' + currentSubThemeId);
         }
         else {
            if (currentThemeId !== null) {
               pageTitle = localize.getLocalizedString('PageTitles.' + currentThemeId);
            }
         }

         if (document.title !== pageTitle) {
            document.title = pageTitle;
            $rootScope.$emit('documentTitleChanged', pageTitle);
         }
      };

      $scope.updateDocumentDescription = function() {
         var description = "";
         var themeManager = new ThemeManager();

         if (themeManager.getCurrentThemeId() !== null && themeManager.getCurrentSubThemeId() !== null && themeManager.getCurrentSubThemeId() !== undefined) {
            description = localize.getLocalizedString('PageDescriptions.' + themeManager.getCurrentThemeId() + '_' + themeManager.getCurrentSubThemeId());
         }
         else {
            if (themeManager.getCurrentThemeId() !== null) {
               description = localize.getLocalizedString('PageDescriptions.' + themeManager.getCurrentThemeId());
            }
         }

         if (description === "") {
            description = localize.getLocalizedString('PageDescriptions.Main');
         }

         if (description !== "") {
            $('meta[name=description]').attr('content', description);
         }
      };

      $scope.broadcastViewTitle = function() {
         var viewTitle = localize.getLocalizedString($scope.controllerName + '.Title');
         $rootScope.$emit('viewTitleChanged', viewTitle);
      };

      // localization change listener
      $scope.onLocalizationChange = function() {
         // to be overwriten by controllers
      };

      var localizationChangeListenerDeregister = $rootScope.$on('localizeResourcesUpdates', function () {
         $scope.updateDocumentTitle();
         $scope.updateDocumentDescription();
         $scope.broadcastViewTitle();
         if (!$scope.ready) {
            return;
         }

         restartController();
         if ($scope.data && $scope.data.alternativeOpen !== undefined) {
            $scope.data.alternativeOpen = false;
         }
         asynchLog.debug("routeUpdate before process");
         $scope.urlParameters.process(function() {
            setupModel();
            $scope.prePromisesDefined.promise.then(function() {
               resolvePrePromises();
            });
            //Call specific controller updates for the selected language
            $scope.onLocalizationChange();
            //Refresh and animate
            $scope.forceActiveChartDraw();
            if ($scope.data && $scope.data.alternativeOpen !== undefined) {
               startAnimation($scope.data.alternativeOpen);
            }
            $scope.setInitialFocusWithAnimation();
         });
      });

      // template handling

      /**
       * Stores the loaded template's scope and generated HTML element for clean up
       */
      $scope.templateArrayInfo = {};

      /**
       * Answers the stored scope and generated HTML for a given templateId
       * @param {String} templateId
       * @returns {Object}
       */
      $scope.getTemplateArrayInfoForTemplateId = function(templateId) {
         if (!$scope.templateArrayInfo[templateId]) {
            $scope.templateArrayInfo[templateId] = {
               scopes: [],
               elements: []
            };
         }

         return $scope.templateArrayInfo[templateId];
      };

      /**
       * Cleans the scope and generated HTML for a given templateId
       * @param {String} templateId
       */
      $scope.cleanTemplateArrayInfoForTemplateId = function(templateId) {
         var templateArrayInfo = $scope.getTemplateArrayInfoForTemplateId(templateId);
         for (var index = 0; index < templateArrayInfo.scopes.length; index++) {
            var scope = templateArrayInfo.scopes[index];
            var element = templateArrayInfo.elements[index];
            scope.$destroy();
            element.remove();
         }
         $scope.templateArrayInfo[templateId] = {
               scopes: [],
               elements: []
            };
      };

      /**
       * Loads a template, then generates an array of N HTML elements, each bound with a different child scope.
       * It's normally used for the chart popups.
       * 
       * @param {String} templateId Id of the template, used to identify each template for clean up
       * @param {String} templateUrl Url of the template
       * @param {int} length Number of HTML elements to generate
       * @param {Function} fillScopeFunction Function that fills the scope with different values for the Nth element.
       * @returns {Promise} A promise that is resolved when the array of elements is fully generated.
       */
      $scope.loadTemplateArray = function(templateId, templateUrl, length, fillScopeFunction) {
         var messages = [];

         // It's important to clean previous scope and HTML elements for the given templateId,
         // since Angular calls this method on every digest cycle, and then they start accumulating if the previous ones are not removed
         $scope.cleanTemplateArrayInfoForTemplateId(templateId);

         return $scope.basicLoadTemplate(templateUrl).then(function(response) {
            var templateArrayInfo = $scope.getTemplateArrayInfoForTemplateId(templateId);
            for (var index = 0; index < length; index++) {
               var templateFunction = $compile(response.data.trim());
               var scope = $scope.$new();
               fillScopeFunction(scope, index);
               var element = templateFunction(scope);
               templateArrayInfo.scopes.push(scope);
               templateArrayInfo.elements.push(element);
               messages[index] = element;
            }

            return messages;
         }).then(function() {
            return $timeout(function() {
               return messages;
            });
         });
      };

      $scope.basicLoadTemplate = function(templateUrl) {
         return $http.get(templateUrl, {cache: $templateCache});
      };

      $scope.loadTemplate = function(templateUrl, scope) {
         return $http.get(templateUrl, {cache: $templateCache}).then(function(response) {
            var template = $compile(response.data.trim())(scope);
            return $timeout(function() {
               return template;
            });
         });
      };

      // clever watch
      $scope.$cleverWatch = function(watchExpression, listener, objectEquality) {
         $scope.$watch(
            watchExpression,
            function(newValue, oldValue) {
               if (newValue === oldValue) {
                  return;
               }

               listener(newValue, oldValue);
               resolvePrePromises();
            },
            objectEquality
        );
      };

      // scenario management
      $scope.objectUtilities = new ObjectUtilities();
      $scope.previousScenario = null;
      $scope.previousBase = null;

      $scope.scenarioHasChanged = function(scenario, base) {
         var scenarioHasChanged;
         var baseHasChanged;

         if ($scope.previousScenario === null) {
            // force calculation
            scenarioHasChanged = true;
         }
         else {
            scenarioHasChanged = !$scope.objectUtilities.equals($scope.previousScenario, scenario);
         }

         if ($scope.previousBase === null) {
            // force calculation
            baseHasChanged = true;
         }
         else {
            baseHasChanged = !$scope.objectUtilities.equals($scope.previousBase, base);
         }

         return scenarioHasChanged || baseHasChanged;
      };

      var checkModels = function(model, name, indent) {
         if (!indent) {
            indent = "";
         }
         var item;
         if (Array.isArray(model)) {
            for (var index = 0; index < model.length; index++) {
               item = model[index];
               if (item !== null && typeof item === 'object') {
                  checkModels(item, name + "[" + index + "]", indent + "...");
               }
            }
         }
         else {
            if (Object.isExtensible(model)) {
               log.error(indent + "Model '" + name + "' is not protected!");
               log.error(model);
            }
            for (var itemName in model) {
               item = model[itemName];
               if (item !== null && typeof item === 'object') {
                  checkModels(item, itemName, indent + "...");
               }
            }
         }
      };

      $scope.saveScenario = function(scenario, base) {
         $scope.previousBase = JSON.parse(JSON.stringify(base));
         $scope.previousScenario = JSON.parse(JSON.stringify(scenario));
         checkModels(base, "base");
         checkModels(scenario, "scenario");
      };

      $scope.clearScenario = function() {
         $scope.previousBase = null;
         $scope.previousScenario = null;
      };

      // active controller for enums
      activeController.set($scope.controllerName);

      $scope.$on('$destroy', function() {
         // clear localization change listener
         localizationChangeListenerDeregister();
         executeScriptDeregister();
         showDemoReminderDeregister();

         // clear dialog listeners

         $scope.shutdown();

         // clear active controller for enums
         activeController.clear();
      });

      //Flags needed to make the controller displayable
      $scope.baseControllerReady = false;
      $scope.documentTitleReady = false;
      $scope.loaded = false;
      $scope.initialCalculationDone = false;
      $scope.domReady = false;
      //Additional flag needed to treat the controller as completely ready
      $scope.initialFocusReady = false;

      $scope.isDisplayable = function() {
         return $scope.displayable;
      };

      $scope.isReady = function() {
         return $scope.ready;
      };

      $scope.onReady = function() {
         //by default do nothing
      };

      $scope.setStatus = function() {
         if ($scope.isReady()) {
            return;
         }
         if ($scope.isDisplayable()) {
            if (!$scope.initialFocusReady) {
               // In the initial loading, do not force the focused element to be visible.
               // If the view is scrolled down, the user can't see the title and intro text of the new view.
               $timeout(function() {
                  $scope.setInitialFocus(false, function() {
                     $timeout(function() {
                        $scope.initialFocusReady = true;
                        asynchLog.debug("6. INITIAL FOCUS");
                        statusLog.debug("6. INITIAL FOCUS");
                        $scope.setStatus();
                     });
                  });
               });
            }
            else {
               //Everything is ready
               asynchLog.debug("SCOPE IS READY " + $scope.controllerName);
               $timeout(function() {
                  asynchLog.debug("Calling onReady for " + $scope.controllerName);
                  $scope.onReady();
                  $scope.ready = true;
                  //For PhantomJS
                  asynchLog.debug("**** CONTROLLER READY ****");
                  $rootScope.status = 'ready';
                  $rootScope.activeController = $scope.controllerName;

                  googleAnalyticsService.sendPageView();
                  logStatisticsService.sendEventOnceByConsulting('used', $scope.getStatistics());

                  $rootScope.$emit('viewControllerInitializationFinished');
               });
            }
         }
         else {
            if ($scope.baseControllerReady && $scope.domReady && $scope.documentTitleReady && $scope.loaded && $scope.initialCalculationDone) {
               $scope.displayable = true;
               asynchLog.debug("SCOPE IS DISPLAYABLE " + $scope.controllerName);
               statusLog.debug("SCOPE IS DISPLAYABLE " + $scope.controllerName);
               $timeout(function() {
                  $scope.setStatus();
               });
            }
         }
      };

      /*
       * DO NOT REMOVE this code: it works and can be useful in the future.
       * This create a png file from a canvas and append the img in the place where the canvas is located
       *
       */
      /*
      $scope.takeScreenshotOfCanvasWithID = function(id) {
         //var elementContainer = $(id);//.parent();
         var element = $(id + " canvas");

         if (element.length) {
            var container = element.parent();
            for (var i = 0; i < element.length; i++) {
               var img = element[i].toDataURL("image/png");
               var image = new Image(); //new Image();
               image.id = id.replace('#', '') + "Shot" + i;
               image.src = img;
               //$(image.id).width(10);
               //container[0].appendChild(image);
               img.style.width = '10px';

               //$("<img id='" + id.replace('#', '') + "Shot' src='"+ img +"'>").insertAfter(elementContainer); //.insertAfter(".own-capital-objective-indicator");
               //var screenShot = $(id + "Shot");
            }
            element.hide();
            //elementContainer.hide();
            //checkVariable();
         }
         else {
            log.debug(id + " not found");
         }
         log.debug("take screenshots ends" + new Date().getTime());
      };

      $scope.removeScreenshotOfCanvasWithID = function(id) {
         log.debug("remove canvas screenshots begin" + new Date().getTime());
         var element = $(id + " canvas");
         var screenShot = $("[id^=" + id.replace('#', '') + "Shot]");
         screenShot.remove();
         element.show();
      };*/


//      $scope.onBeforePrint = function() {
//         // Implement in each controller if needed
//      };
//
//      $scope.onAfterPrint = function() {
//         // Implement in each controller if needed
//      };
//
//      window.onbeforeprint = $scope.onBeforePrint;
//      window.onafterprint = $scope.onAfterPrint;
      /*var mediaQueryList = window.matchMedia('print');
      mediaQueryList.addListener(function(mql) {
          if (mql.matches) {
              onBeforePrint();
          }
          else {
              onAfterPrint();
          }
      }); */
         
      

      // ****************
      // **** CHARTS ****
      // ****************
      function initializeCharts() {
         $scope.createChartUpdater = function(chart, buildChartCallback) {
            var chartUpdater = {};
            chartUpdater.showing = true;
            chartUpdater.dismiss = function() {
               chart.dismiss();
            };
            chartUpdater.update = function(forced) {
               if (!$scope.isDisplayable()) {
                  // this could be called from a window resize, before the controller is ready
                  return;
               }

               buildChartCallback(chart);

               if (!$scope.showResultPanel()) {
                  this.showing = false;
                  return;
               }

               if (!this.showing) {
                  this.showing = true;
                  forced = true;
               }

               if (forced) {
                  return $scope.resetDrawing(chart);
               }
               else {
                  return chart.draw();
               }
            };
            return chartUpdater;
         };
      }

      // *******************
      // **** ANIMATION ****
      // *******************
            
      $scope.sleepResetDrawingChartDuringAnimation = false;
      $scope.resetDrawing = function(chart) {
         if (!$scope.sleepResetDrawingChartDuringAnimation) {
            chart.resetDrawing();
         }
         else {
            $scope.sleepResetDrawingChartDuringAnimation = false;
            $timeout(function() {
               chart.resetDrawing();
            }, parametersManager.baseViewParameters.animationDuration);
         }
         return true;
      };

      $scope.setInitialFocusWithAnimation = function() {
         // we must ensure that the height is preserved during the animation, to prevent undesired scrolling.

         // set temporary height
         var body = $("body")[0];
         var previousMinHeight = body.style.minHeight;
         body.style.minHeight = body.clientHeight + "px";

         setTimeout(function() {
            // reset height
            body.style.minHeight = previousMinHeight;

            $scope.setInitialFocus();
         }, parametersManager.baseViewParameters.animationFocusDuration);
      };

      $scope.$on('$routeChangeSuccess', function() {
         var themeManager = new ThemeManager();
         var id = routesHandler.getId();
         var theme = calculatorsManager.getThemeNameFromString(id);
         var calculator = calculatorsManager.getCalculatorNameFromString(id);
         themeManager.setTheme(theme, calculator);
      });

      $scope.$on('languageChangeSuccess', function() {
         $scope.calculate(function() {
            // nothing to do, just needed to set the force parameter in true
         }, true);
      });
      
      $scope.onCountryChangeSuccess = function() {
         // to be overwriten by controllers
      };

      $scope.shouldCalculateOnCountryChange = function(country) {
         // to be overwriten by controllers
         return true;
      };

      //Country handling
      $scope.$on('countryChangeSuccess', function() {
         var baseState = storageManager.getStoredObject('base');
         if (baseState) {
            baseState.country = localize.getActiveCountry();
            zipAndLocationService.searchMoreImportantLocation(zipAndLocationService.getActiveCountryLocationDefault()).then(function (zipAndLocation) {
               
               var getCountry = function(zipAndLocation) {
                  return zipAndLocation.state === "LI" ? "LI" : "CH";
               };

               //ask again in order to avoid override of another promise result
               if (baseState.zipAndLocation !== null) {
                  if (getCountry(baseState.zipAndLocation) === getCountry(zipAndLocation)) {
                     return;
                  }
               }
               baseState.zipAndLocation = zipAndLocation;
            });
         }
         $scope.onCountryChangeSuccess();
         if ($scope.shouldCalculateOnCountryChange(localize.getActiveCountry())) {
            $scope.calculate(function() {
               // nothing to do, just needed to set the force parameter in true
            }, true);
         }
      });

      $scope.$on('languageChangeFailed', function() {
         $timeout(function() {
            $scope.showErrorMessage('LanguageChangeFailed',  {enumName: 'Application', group: 'Language'});
         });
      });

      $scope.$on('countryChangeFailed', function() {
         $timeout(function() {
            $scope.showErrorMessage('countryChangeFailed',  {enumName: 'Application', group: 'Country'});
         });
      });

      //
      var isValidNonEmptyString = function(value) {
         return (value !== undefined && value !== null && value !== '');
      };

      var getCurrentThemeSubThemeString = function() {
         var themeManager = new ThemeManager();
         var themeId = themeManager.getCurrentThemeId();
         var subThemeId = themeManager.getCurrentSubThemeId();
         var id;
         if (isValidNonEmptyString(themeId)) {
            id = themeId;
            if (isValidNonEmptyString(subThemeId)) {
               id += '.' + subThemeId;
            }
         }
         return id;
      };
      $scope.getCurrentContact = function() {
         var id = getCurrentThemeSubThemeString();
         return calculatorsManager.getContactUrl(id);
      };

      $scope.showCalculatorsButton = function() {
         return parametersManager.baseViewParameters.calculatorSelectionEnabled &&
                calculatorsManager.availableCalculators().length > 0;
      };
      
      // Social
      $scope.getSocialMediaUrl = function(socialMediaId) {
         var path = getCurrentThemeSubThemeString();
         return calculatorsManager.getSocialMediaUrl(path, socialMediaId);

      };

      $scope.onSocialMediaButton = function(id) {
         $scope.hideNavBarCollapse();
         var url = $scope.getSocialMediaUrl(id);
         window.open(url);
      };
      
      $scope.getAvailableSocialMedia = function() {
         var id = getCurrentThemeSubThemeString();
         return calculatorsManager.getAvailableSocialMedia(id);
         /*
         var availableMedia = [];
         var socialMediaUrls = parametersManager.baseViewParameters.socialMediaUrls;
         for (var media in socialMediaUrls) {
            if (isValidNonEmptyString(socialMediaUrls[media])) {
               availableMedia.push(media);
            }
         }
         return availableMedia;
         */
      };
      // Contact
      $scope.showContact = function() {
         if (!parametersManager.baseViewParameters.contactIconEnabled) {
            return false;
         }

         // try with contact service
         if (isValidNonEmptyString(parametersManager.baseApplicationParameters.contactServiceURL)) {
            return true;
         }

         // try with contact url
         return isValidNonEmptyString($scope.getCurrentContact());
      };

      $scope.contact = function() {
         logStatisticsService.sendEvent('contact', $scope.getStatistics());

         $scope.hideNavBarCollapse();
         
         // try to communicate with main-frame to get contact screen to show
         if (parametersManager.baseApplicationParameters.screenContactUrlByIframe) {
             $rootScope.$emit('openContactUrl', $scope.getCurrentContact());
             return; 
         }
         // try with contact service
         if (isValidNonEmptyString(parametersManager.baseApplicationParameters.contactServiceURL)) {

            locationBreadcrumbsService.push($scope.getCanGoBackFunction());
            locationService.clearSearch(); //clean the query parameters
            locationService.setPath(translateRoute.getPath("contact"));
            return;
         }

         // try with contact url
         window.open($scope.getCurrentContact());
      };

      // Printing
      $scope.basicShowPrint = function() {
         var themeManager = new ThemeManager();
         var isCalculation = themeManager.getCurrentSubThemeId() !== null && themeManager.getCurrentSubThemeId() !== undefined;
         var hasPrintServiceURL =
            parametersManager.baseApplicationParameters.printServiceURL !== undefined &&
            parametersManager.baseApplicationParameters.printServiceURL !== null &&
            parametersManager.baseApplicationParameters.printServiceURL !== '';
         return isCalculation && hasPrintServiceURL;
      };

      $scope.showPrint = function() {
         return $scope.basicShowPrint();
      };

      $scope.getThemePrintShortTitle = function() {
         var themeManager = new ThemeManager();

         return "PrintShortTitle." + themeManager.getCurrentThemeId();
      };

      $scope.printStartHandlers = [];
      $scope.addPrintStartHandler = function(printStartHandler) {
         $scope.printStartHandlers.push(printStartHandler);
      };

      $scope.updateUser = function(additionalPrintingData) {
         var updateUserPromise;

         if (parametersManager.baseViewParameters.askConsultantDataForPrinting && additionalPrintingData) {
            $scope.additionalPrintingData = additionalPrintingData;
            var baseState = storageManager.getStoredObject('base');
            if (baseState) {
               baseState.additionalPrintingData = additionalPrintingData;
            }
            storageManager.storeOnBrowserLocalStorage('consultantInfo', additionalPrintingData.consultantInfo);
            storageManager.storeOnBrowserLocalStorage('additionalData', additionalPrintingData.additionalData);
            
            if (parametersManager.baseApplicationParameters.consultantMode) {
               storageManager.storeOnBrowserLocalStorage('customerNumber', $scope.additionalPrintingData.customerNumber);
               storageManager.storeOnBrowserLocalStorage('customerInfo', $scope.additionalPrintingData.customerInfo);

               var user = { userId: authenticationService.getUserLogged(), password: "", confirmationToken: ""};
               var userToUpdate = { userId: authenticationService.getUserLogged(), userData: authenticationService.getUserData() };
               
               userToUpdate.userData.customerNumber = $scope.additionalPrintingData.customerNumber;
               userToUpdate.userData.customerInfo = $scope.additionalPrintingData.customerInfo;
               userToUpdate.userData.consultantInfo = $scope.additionalPrintingData.consultantInfo;
               userToUpdate.userData.additionalData = $scope.additionalPrintingData.additionalData;

               var updateUserDeferred = $q.defer();
               updateUserPromise = updateUserDeferred.promise;
               authenticationService.updateUser(user, userToUpdate).then(
                  function() {
                     updateUserDeferred.resolve();
                  },
                  function(result) {
                     updateUserDeferred.reject(result);
                  });
            }
            else {
               updateUserPromise = $q.when();
            }
         }
         else {
            updateUserPromise = $q.when();
         }

         return updateUserPromise;
      };

      $scope.basicPrint = function(printTemplatePath, outputFileName, outputDirKey) {
         return $scope.basicLoadTemplate(printTemplatePath).then(
            function(templateResponse) {
               var templateString = templateResponse.data;

               return printService.print(templateString, $scope.printTemplateName, $scope, outputFileName, outputDirKey).then(
                  function(result) {
                     var contentBlob = result.content;

                     // this is a possibly costly (memory, cpu) operation, do it only if requested
                     if (parametersManager.baseApplicationParameters.informParentWindowOnPrintSuccess) {
                        $rootScope.$emit('printSuccessful', contentBlob);
                     }

                     var anchor = document.createElement('a');

                     if (navigator.userAgent.indexOf('Trident') > 0 || navigator.userAgent.indexOf('MSIE') > 0) {
                        // Internet Explorer:
                        // IE is not happy with the normal download. It works using the SaveFile library.
                        anchor.target = '_blank';
                        // It's better if the pdf is opened within a (simulated) user triggered action
                        anchor.onclick = function() {
                           saveAs(contentBlob, 'print.pdf');
                        };
                        document.body.appendChild(anchor);
                        $timeout(function() {
                           anchor.click();
                        });

                        $scope.showSuccessMessage('PrintSucceeded',  {enumName: 'PrintService', group: 'Print', useTimeout: true});
                     }
                     else {
                        // Browsers other than IE: store a file having its URL
                        var fileURL = URL.createObjectURL(contentBlob);
                        anchor.href = fileURL;
                        anchor.download = 'print.pdf';
                        document.body.appendChild(anchor);
                        $timeout(function() {
                           if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
                              // Safari:
                              // In Safari on iOS, we open the file in a new tab (setting target to blank).
                              // Since normally the popup blocker is on, triggering the file open programmatically fails silently (annoying).
                              // We solve this by showing a button to open the document.
                              // Since this runs from an user triggered event, the file is opened correctly in a new tab.

                              // add open document message, with no timeout (let the user click)
                              $scope.showSuccessMessage('PrintSucceeded', {
                                 enumName: 'PrintService',
                                 group: 'Print',
                                 useTimeout: false, // the user has to open the document manually clicking in the button provided by the message
                                 actions: [
                                    {
                                       localizedLabel: messageService.prepareLocalizedText('PrintService', 'OpenPrintedDocument'),
                                       id: "openPrintedDocument",
                                       fn: function() {
                                          anchor.target = '_blank';
                                          anchor.click();

                                          // remove success message after user opened the document
                                          messageService.removeAllMessagesWithGroup('Print');
                                       }
                                    }
                                    ]
                              });
                           }
                           else {
                              // In Chrome and Firefox, the doc is just saved (it goes to downloads).
                              anchor.click();

                              $scope.showSuccessMessage('PrintSucceeded',  {enumName: 'PrintService', group: 'Print', useTimeout: true});
                           }
                        });
                     }
                  },
                  function(result) {
                     if (result.status === PrintServiceResultStatus.NOCONTENT) {
                        $scope.showErrorMessage('PrintFailed',  {enumName: 'PrintService', group: 'Print'});
                     }

                     if (result.status === PrintServiceResultStatus.SERVERERROR) {
                        $scope.showErrorMessage('PrintFailed',  {enumName: 'PrintService', group: 'Print'});
                     }

                     if (result.status === PrintServiceResultStatus.PREPARATIONERROR) {
                        $scope.showErrorMessage('PrintFailed',  {enumName: 'PrintService', group: 'Print'});
                     }
                  });
            },
            function() {
               $scope.showErrorMessage('PrintFailed',  {enumName: 'PrintService', group: 'Print'});
            });
      };

      $scope.beforePrint = function() {
         logStatisticsService.sendEvent('print', $scope.getStatistics());

         // close nav bar in case the print was triggered with the nav bar open
         $scope.hideNavBarCollapse();
         // remove possible previous success messages
         messageService.removeAllMessagesWithGroup('Print');
         // add info message
         $scope.showInfoMessage('PrintStarted',  {enumName: 'PrintService', group: 'Print'});

         $scope.printStartHandlers.forEach(function(printStartHandler) {
            printStartHandler();
         });
      };

      $scope.print = function(additionalPrintingData) {
         $scope.beforePrint();

         return $scope.updateUser(additionalPrintingData).then(function() {
            return $scope.basicPrint($scope.printTemplatePath);
         });
      };

      $scope.getExtraPrintingData = function(additionalData) {
         // to be overwriten by controllers
      };

      $scope.saveFileCSV = function(data, outputFileName, outputFileEncoding, outputDirKey) {
         return fileService.saveCSV(data, outputFileName, outputFileEncoding, outputDirKey).then(
            function() {
               return;
            },
            function(result) {
               if (result.status === FileServiceResultStatus.SERVERERROR) {
                  $scope.showErrorMessage('SaveFailed',  {enumName: 'FileService', group: 'Print'});
               }

               if (result.status === FileServiceResultStatus.PREPARATIONERROR) {
                  $scope.showErrorMessage('SaveFailed',  {enumName: 'FileService', group: 'Print'});
               }
               throw result;
         });
      };

      $scope.saveFile = function(fileTemplatePath, outputFileName, outputFileEncoding, outputDirKey) {
         return $scope.basicLoadTemplate(fileTemplatePath).then(
            function(templateResponse) {
               return fileService.save(templateResponse.data, $scope, outputFileName, outputFileEncoding, outputDirKey).then(
                  function() {
                     return;
                  },
                  function(result) {
                     if (result.status === FileServiceResultStatus.SERVERERROR) {
                        $scope.showErrorMessage('SaveFailed',  {enumName: 'FileService', group: 'Print'});
                     }

                     if (result.status === FileServiceResultStatus.PREPARATIONERROR) {
                        $scope.showErrorMessage('SaveFailed',  {enumName: 'FileService', group: 'Print'});
                     }

                     throw result;
                  });
            });
      };

      $scope.packageFileList = function(fileNames, outputFileName, outputDirKey) {
         return fileService.packageFileList(fileNames, outputFileName, outputDirKey).then(
            function() {
               return;
            },
            function(result) {
               if (result.status === FileServiceResultStatus.SERVERERROR) {
                  $scope.showErrorMessage('PackageFileList',  {enumName: 'FileService', group: 'Print'});
               }

               throw result;
            });
      };

      // Save
      $scope.showSave = function() {
         var hasAuthenticationURL =
            parametersManager.baseApplicationParameters.authenticationServiceURL !== undefined &&
            parametersManager.baseApplicationParameters.authenticationServiceURL !== null &&
            parametersManager.baseApplicationParameters.authenticationServiceURL !== '';
         return hasAuthenticationURL;
      };

      $scope.save = function() {
         locationService.clearSearch(); //clean the query parameters
         locationService.setPath(translateRoute.getPath('saveAs'));
      };

      $scope.backToPreviousLocation = function() {
         locationBreadcrumbsService.pop();
      };

      $scope.getCanGoBackFunction = function() {
         return function() {
            return true;
         };
      };

      $scope.showSeparator = function() {
         var languageSelection = parametersManager.baseViewParameters.languageSelectionEnabled &&
                   parametersManager.baseViewParameters.availableLanguages.length > 1;
         var countrySelection = parametersManager.baseViewParameters.countrySelectionEnabled &&
                   parametersManager.baseViewParameters.availableCountries.length > 1;
         var socialMedia = $scope.getAvailableSocialMedia().length > 0;
         return $scope.showNew() ||
                $scope.showCalculatorsButton() ||
                $scope.showContact() ||
                $scope.showPrint() ||
                socialMedia ||
                languageSelection ||
                countrySelection;
      };
      
      //New consulting
      $scope.showNew = function() {
         return parametersManager.baseViewParameters.newConsultingIconEnabled;
      };

      $scope.newConsulting = function() {
         $scope.hideNavBarCollapse();
         $scope.showQuestionMessage({enumName:'Application', enumKey:'ResetConsulting'}, function() {
            // force going to standard if the controller was showing the alternative            
            if ($scope.data && $scope.data.alternativeOpen !== undefined) {
               $scope.data.alternativeOpen = false;
            }            
            locationService.clearSearch();
            
            storageManager.reset();
            storageService.forgetDossier();
            storageManager.storeOnBrowserLocalStorage('customerNumber', "");
            storageManager.storeOnBrowserLocalStorage('customerInfo', "");
            $rootScope.$broadcast("storageReset");
            $rootScope.$broadcast("newConsulting");
            logStatisticsService.sendEventOnceByConsulting('used', $scope.getStatistics());
         });
      };

      $scope.expiredOrUnauthorizedMessageWithLogin = function() {
         var yesMessage = messageService.prepareLocalizedText('StorageService', 'LogIn');
         messageService.removeAllMessages();
         var questionMessage = {
            type: messageService.MESSAGE_DANGER,
            localizedText: messageService.prepareLocalizedText('StorageService', 'Unauthorized', null),
            dismissOnNavigation: true,
            actions: [
               {
                  localizedLabel: yesMessage,
                  id: 'questionForLogingAccept',
                  fn: function() {
                     messageService.removeAllMessages();
                     locationService.clearSearch(); //clean the query parameters
                     locationService.setPath(translateRoute.getPath('login'));
                  }
               }
            ]
         };
         messageService.addMessage(questionMessage);

      };

      $scope.hideNavBarCollapse = function() {
         if ($(document).width() <= 750) {
            setTimeout(function() {
               $('.navbar-toggle').click();
            });
         }
      };
      
      $scope.showQuestionMessage = function(enumParams, acceptFunction) {
         var yesMessage = messageService.prepareLocalizedText('Application', 'Yes');
         var noMessage = messageService.prepareLocalizedText('Application', 'No');
         messageService.removeAllMessages();
         var questionMessage = {
            type: messageService.MESSAGE_WARNING,
            localizedText: messageService.prepareLocalizedText(enumParams.enumName, enumParams.enumKey, enumParams.params),
            dismissOnNavigation: true,
            actions: [
               {
                  localizedLabel: yesMessage,
                  id: 'questionAccept',
                  fn: function() {
                     messageService.removeAllMessages();
                     acceptFunction();
                  }
               },
               {
                  localizedLabel: noMessage,
                  id: 'questionCancel',
                  fn: function() {
                     messageService.removeAllMessages();
                  }
               }
            ]
         };
         messageService.addMessage(questionMessage);
      };

      $scope.showDossier = function() {
         return storageService.getCurrentDossierName();
      };
      
      $scope.showEventPlan = function() {
         return parametersManager.baseViewParameters.eventPlanIconEnabled;
      };

      //check if there is an iframe
      if (window === window.parent) {
         document.getElementsByTagName('html')[0].setAttribute('class', 'is-parent');
      }

      var refreshStatusDeregister = $rootScope.$on('refreshStatus', function() {
         $scope.loaded = true;
         asynchLog.debug("5. LOADED");
         statusLog.debug("5. LOADED");
         $scope.setStatus();
         refreshStatusDeregister();
      });
   
      var executeScriptDeregister = $rootScope.$on('executeScript', function (event, action) {
         action($scope);
      });
   
      var logout = function() {
         authenticationService.logOut();
         $rootScope.$broadcast("storageReset");
         locationService.setPath('/login');
      };

      var showDemoReminderDeregister = $rootScope.$on('showDemoReminder', function(event, message) {
         if (message === "DemoAccountSessionExpired") {
            $scope.showErrorMessage(message, {dismissOnNavigation: false, enumName: 'Application', group: 'DemoAccount'});
            logout();
         }
         else {
            $scope.showInfoMessage(message, {enumName: 'Application', group: 'DemoAccount'});
         }
      });

      if ($scope.customInitializeScope) {
         $scope.customInitializeScope();
      }
   }]);
});


define('calculation-header', [
   'app'
], function(app) {
   'use strict';

   var calculationHeader = app.register.directive('calculationHeader', [function() {
      return {
         restrict: 'E',
         replace: true,
         scope: {
            text: '@',
            description: '@'
         },
         templateUrl: 'src/directives/calculation-header/calculation-header.html',
         controller: ['$scope', function($scope) {
         }]
      };
   }]);

   return calculationHeader;
});


define('fancy-box', [
   'app',
   'theme-manager',
   'bootstrap',
   'log-statistics-service'
], function(app, ThemeManager) {
   'use strict';

   var fancybox = app.register.directive('fancybox', [function() {
      return {
         restrict: 'E',
         replace: true,
         transclude: true,
         scope: {
            fancyboxTitle: '@',
            color: '@',
            numberColor: '@',
            readyAction: '&',
            toggleFn: '&',
            toggleState: '=',
            infoContent: '@'
         },
         templateUrl: 'src/directives/fancy-box/fancy-box.html',
         controller: ['$scope', '$attrs', 'logStatisticsService', 'authenticationService', function($scope, $attrs, logStatisticsService, authenticationService) {

            // Generated id to connect collapse link with collapsed content.
            $scope.collapsePanelId = (function() {
               var d = new Date().getTime();
               var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                  var r = (d + Math.random() * 16) % 16 | 0;
                  d = Math.floor(d / 16);
                  return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
               });
               return uuid;
            })();

            if (angular.isDefined($attrs.toggleFn)) {
               $scope.hasToogleFn = true;
            }
            else {
               $scope.hasToogleFn = false;
            }

            $scope.infoImageClass = "show-info-image";
            $scope.infoTextClass = "show-info-text";
            $scope.showInfoImageClass = function() {
               return $scope.infoImageClass;
            };
            $scope.showInfoTextClass = function() {
               return $scope.infoTextClass;
            };
            $scope.showInfo = function () {
               logStatisticsService.sendEventOnceByConsulting('help used', $scope.getStatistics());
               $scope.$apply(function() {
                  $scope.infoImageClass = "hide-info-image";
                  $scope.infoTextClass = "hide-info-text";
               });
            };
            $scope.hideInfo = function () {
               $scope.$apply(function() {
                  $scope.infoImageClass = "show-info-image";
                  $scope.infoTextClass = "show-info-text";
               });
            };

            $scope.getStatistics = function() {
               var themeManager = new ThemeManager();

               var userData = authenticationService.getUserData();
               return {
                  pcId: window.localStorage.pcId,
                  customer: (userData) ? userData.customerNumber : null,
                  userId: authenticationService.getUserLogged(),
                  calculator: themeManager.getCurrentSubThemeId()
               };
            };
         }],
         link: function(scope, element, attrs) {
            var panelCollapseDiv = element.find('.panel-collapse');
            panelCollapseDiv.on('show.bs.collapse', scope.showInfo);
            panelCollapseDiv.on('hide.bs.collapse', scope.hideInfo);
         }
      };
   }]);

   return fancybox;
});


define('link-to-view', [
   'app',
   'theme-manager',
   'fancy-box',
   'log-statistics-service'
], function(app, ThemeManager) {
   'use strict';

   var linkToView = app.register.directive('linkToView', [function() {
      return {
         restrict: 'E',
         replace: true,
         scope: {
            linkTitle: '@',
            linkInfo: '@',
            linkHint: '@',
            openView: '@',
            onOpenView: '&',
            iconType: '@',
            openDialog: '=?',
            onEdit: '&',
            isEnabled: '=?',
            mode: '@'
         },
         templateUrl: 'src/directives/link-to-view/link-to-view.html',
         controller: ['$scope', 'logStatisticsService', 'authenticationService', function($scope, logStatisticsService, authenticationService) {
            $scope.isAlternative = $scope.mode === "alternative";

            $scope.isLinkEnabled = function() {
               var isLinkEnabled = $scope.isEnabled;

               if (isLinkEnabled === undefined || isLinkEnabled === null) {
                  isLinkEnabled = true;
               }

               return isLinkEnabled;
            };

            if ($scope.openDialog === undefined) {
               $scope.openDialog = false;
            }
            if ($scope.isAlternative === undefined) {
               $scope.isAlternative = false;
            }
            $scope.onAnchorClicked = function() {
               if ($scope.isLinkEnabled()) {
                  if (!$scope.isAlternative) {
                     logStatisticsService.sendEventOnceByConsulting('alternative used', $scope.getStatistics());
                  }
                  
                  if ($scope.openDialog) {
                     $scope.onEdit();
                  }
                  else {
                     $scope.onOpenView();
                  }
               }
            };
            $scope.getIconClass = function() {
               if ($scope.iconType !== undefined) {
                  return $scope.iconType;
               }
               else {
                  if ($scope.isAlternative) {
                     return "standard-icon";
                  }
                  else {
                     return "alternative-icon";
                  }
               }
            };
            $scope.getLinkClass = function() {
               if ($scope.isAlternative) {
                  if ($scope.isLinkEnabled()) {
                     return "link-to-standard";
                  }
                  else {
                     return "link-to-standard disabled-link";
                  }
               }
               else {
                  if ($scope.isLinkEnabled()) {
                     return "link-to-alternative";
                  }
                  else {
                     return "link-to-alternative disabled-link";
                  }
               }
            };
            $scope.getHintClass = function() {
               if ($scope.isAlternative) {
                  return "standard-hint";
               }
               else {
                  return "alternative-hint";
               }
            };
            $scope.getOpenClass = function() {
               if ($scope.isAlternative) {
                  return "open-standard";
               }
               else {
                  return "open-alternative";
               }
            };
            $scope.getTextClass = function() {
               if ($scope.isAlternative) {
                  if ($scope.isLinkEnabled()) {
                     return "left-arrow open-standard-text";
                  }
                  return "open-standard-text disabled-text";
               }
               else {
                  if ($scope.isLinkEnabled()) {
                     return "right-arrow open-alternative-text";
                  }
                  return "open-alternative-text disabled-text";
               }
            };
            $scope.getTextId = function() {
               if ($scope.isAlternative) {
                  return "openStandardText";
               }
               else {
                  return "openAlternativeText";
               }
            };
            $scope.getOpenId = function() {
               if ($scope.isAlternative) {
                  return "openStandard";
               }
               else {
                  return "openAlternative";
               }
            };
            $scope.getStatistics = function() {
               var themeManager = new ThemeManager();

               var userData = authenticationService.getUserData();
               return {
                  pcId: window.localStorage.pcId,
                  customer: (userData) ? userData.customerNumber : null,
                  userId: authenticationService.getUserLogged(),
                  calculator: themeManager.getCurrentSubThemeId()
               };
            };
         }]
      };
   }]);

   return linkToView;
});


define('float', [
   'app'
], function(app) {
   'use strict';

   var float = app.register.directive('float', function() {
      return {
         require: 'ngModel',
         link: function(scope, ele, attr, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
               viewValue = viewValue.replace(/'/g, "");

               if (viewValue === "" || isNaN(viewValue)) {
                  return 0.0;
               }

               return parseFloat(viewValue);
            });
         }
      };
   });


   return float;
});


define('numeric-field', [
   'app',
   'parameters-manager',
   'logger',
   'float',
   'formatter',
   'jquery-ui-touch-punch',
   'jquery-ui'
], function(app, parametersManager, Logger) {
   'use strict';

   var log = Logger.get('NumericField');

   var SLIDER_TIMEOUT = parametersManager.baseViewParameters.fieldAcceptModelTimeout;
   var KEY_TIMEOUT = parametersManager.baseViewParameters.fieldAcceptModelTimeout;

   var numericFieldCompile = function(element, attrs, $timeout, formatter, numericFormatter, $rootScope) {
      return {
         pre: function preLink(scope, element, attrs, controller) {
            if (scope.id !== undefined && scope.id.length > 0) {
               scope.fieldId = scope.id.replace(/\./g, '_');
            }
            else {
               // adds an id based on the ngModel attribute, for easier identification from tests
               scope.fieldId = attrs.ngModel.replace(/\./g, '_');
            }
            scope.calculatorId = scope.fieldId + "AddOn";
            scope.showLabel = true;
            scope.showRange = true;
            
            if (scope.showCalculator === undefined) {
               scope.showCalculator = false;
            }

            if (scope.isCurrency === undefined && scope.isPercentage === undefined) {
               if (attrs.type === 'amount') {
                  scope.isCurrency = true;
                  scope.isPercentage = false;
               }
               else {
                  scope.isCurrency = false;
                  scope.isPercentage = false;
               }
            }

            scope.shouldBeDisabled = function() {
               if (scope.enabled !== null) {
                  if (scope.enabled !== undefined) {
                     return !scope.enabled;
                  }
               }

               if (scope.showCalculator) {
                  return !scope.manualEntryModel;
               }

               return false;
            };
            
            scope.disable = function() {
               $timeout(function() {
                  var field = $("#" + scope.fieldId + '_input');
                  field.prop('disabled', true);
                  scope.sliderElement.slider('disable').draggable('disable');
                  scope.sliderHandle = scope.sliderElement.slider('disable').children()[0];
                  scope.sliderHandle.removeAttribute('href');
               });
            };
            
            scope.enable = function() {
               $timeout(function() {
                  var field = $("#" + scope.fieldId + '_input');
                  field.prop('disabled', false);
                  scope.sliderElement.slider('enable').draggable('enable');
               });
            };

            scope.getDivClass = function() {
               if (scope.showCalculator || scope.isPercentage || scope.isCurrency || scope.isEditable) {
                  return "input-group";
               }
               return "";
            };

            scope.onCalculator = function() {
               scope.manualEntryModel = !scope.manualEntryModel;
               if (scope.onEntryModelChanged) {
                  scope.onEntryModelChanged({manualEntry: scope.manualEntryModel});
               }
               if (scope.manualEntryModel) {
                  $timeout(function() {
                     var field = $("#" + scope.fieldId + '_input');
                     field.focus();
                  }, 0, false); // <-- avoid an $apply cycle
               }
            };

            scope.getSliderMax = function() {
               if (scope.sliderMax !== undefined) {
                  log.debug("SLIDER-MAX (REAL): " + scope.sliderMax);
                  return parseFloat(scope.sliderMax);
               }
               if (scope.options !== undefined && scope.options.slider_max !== undefined) {
                  return scope.options.slider_max;
               }
               return 1000;
            };

            scope.getValidatedSliderMax = function() {
               return Math.min(scope.getMax(), scope.getSliderMax());
            };

            scope.getSliderMin = function() {
               if (scope.sliderMin !== undefined) {
                  return parseFloat(scope.sliderMin);
               }
               if (scope.options !== undefined && scope.options.slider_min !== undefined) {
                  return scope.options.slider_min;
               }
               return 0;
            };

            scope.getValidatedSliderMin = function() {
               return Math.max(scope.getMin(), scope.getSliderMin());
            };

            scope.getSliderStep = function() {
               if (scope.sliderStep !== undefined) {
                  return parseFloat(scope.sliderStep);
               }
               if (scope.options !== undefined && scope.options.slider_step !== undefined) {
                  return scope.options.slider_step;
               }
               return 100;
            };
            scope.getMax = function() {
               if (scope.max !== undefined) {
                  return parseFloat(scope.max);
               }
               if (scope.options !== undefined && scope.options.max !== undefined) {
                  return scope.options.max;
               }
               return 1000;
            };
            scope.getMin = function() {
               if (scope.min !== undefined) {
                  return parseFloat(scope.min);
               }
               if (scope.options !== undefined && scope.options.min !== undefined) {
                  return scope.options.min;
               }
               return 0;
            };

            // default value
            attrs.$observe('showRange', function(val) {
                if (angular.isDefined(val)) {
                   scope.showRange = scope.showRange !== "false";
                }
            });
            attrs.$observe('showLabel', function(val) {
                if (angular.isDefined(val)) {
                   scope.showLabel = scope.showLabel !== "false";
                }
            });

            scope.sliderElement = $(element).find('.slider');
            var setValue = function() {
               //$rootScope.$broadcast('debug', "slider setValue " + scope.sliderElement.slider("option", "value"), scope.fieldId);
               $timeout(function() {
                  //$rootScope.$broadcast('debug', "slider about to set  " + scope.sliderElement.slider("option", "value"), scope.fieldId);
                  scope.ngModel = scope.sliderElement.slider("option", "value");
                  $timeout(function() {
                     //$rootScope.$broadcast('debug', "slider about call onChange", scope.fieldId);
                     scope.onChange();
                  });
               });
            };
            var setVisualValue = function() {
               $timeout(function() {
                  scope.visualModel = scope.format(scope.sliderElement.slider("option", "value"));
               });
            };
            scope.sliderElement.slider({
               range: "min",
               max: scope.getValidatedSliderMax(),
               min: scope.getValidatedSliderMin(),
               animate: true,
               step: scope.getSliderStep(),
               value: 0,
               timeoutPromise: undefined,
               change: function(event, ui) {
                  log.debug("SLIDE CHANGE! " + scope.sliderElement.slider("option", "value"));
                  // setValue();
               },
               slide: function(event, ui) {
                  log.debug("SLIDE! " + scope.sliderElement.slider("option", "value"));
                  log.debug("timeout set to " + SLIDER_TIMEOUT);
                  //document._sliderStartTime = new Date();
                  var startTime = new Date();
                  //Visual value is changed directly with a $timeout call (see setVisualValue),
                  //so we avoid calling an apply here
                  setVisualValue();
                  log.debug("end of set visual value: " + (new Date() - startTime));
                  /*scope.$apply(function() {
                     //setVisualValue();
                     scope.visualModel = scope.format(scope.sliderElement.slider("option", "value"));
                     //log.debug("end of slide apply: " + (new Date() - startTime));
                  });*/
                  if (this.timeoutPromise) {
                     $timeout.cancel(this.timeoutPromise); //cancel previous timeout
                  }
                  this.timeoutPromise = $timeout(function() {
                     log.debug("start of timeout promise: " + (new Date() - startTime));
                     log.debug("TIMEOUT SLIDER BEFORE visual is " + scope.visualModel + " model is " + scope.ngModel);
                     log.debug("setValue promise ");
                     setValue();
                     log.debug("TIMEOUT SLIDER AFTER visual is " + scope.visualModel + " model is " + scope.ngModel);
                     log.debug("end of timeout promise: " + (new Date() - startTime));
                  }, SLIDER_TIMEOUT);
               },
               stop: function(event, ui) {
                  scope.onStop();
               }
            }).draggable();

            if (scope.enabled !== null) {
               if (scope.enabled !== undefined && !scope.enabled) {
                  scope.disable();
               }
            }

            scope.isNumeric = function(value) {
               if (typeof value === "string") {
                  value = value.replace(/'/g, ""); //ignore group separators
               }

               return !isNaN(value);
            };

            scope.format = function(raw) {
               return numericFormatter.format(scope, formatter, raw);
            };

            scope.unformat = function(formatted) {
               return numericFormatter.unformat(scope, formatter, formatted);
            };

            scope.accept = function(typingFinished) {
               log.debug("about to unformat " + scope.visualModel);
               var formatVisualField = true;
               //when typing is not yet finished, some conditions must be validated
               if (!typingFinished) {
                  log.debug("checking expression: " + scope.visualModel);
                  var valid = formatter.check(scope.visualModel);
                  //empty --> ignore
                  /*if (scope.visualModel === "") {
                     return;
                  }*/
                  //invalid expression --> ignore
                  if (!valid) {
                     log.debug("INVALID EXPRESSION");
                     return;
                  }

                  //formatVisualField = scope.visualModel !== "" && scope.isNumeric(scope.visualModel);
                  formatVisualField = false;
               }
               $timeout(function() {
                  var raw = scope.unformat(scope.visualModel);
                  if (!typingFinished && scope.minDigits !== undefined && scope.minDigits !== null) {
                     var length = (raw.toString()).replace('.', '').length;
                     if (length < parseInt(scope.minDigits)) {
                        return;
                     }
                  }
                  log.debug("raw number " + raw + " finished? " + typingFinished + " format? " + formatVisualField);
                  if (!typingFinished && formatVisualField) {
                     //when typing is not finished the format is applied before
                     //the min/max validations
                     log.debug("about to format " + raw);
                     scope.visualModel = scope.format(raw);
                  }

                  raw = Math.min(raw, scope.getMax());
                  raw = Math.max(raw, scope.getMin());

                  if (typingFinished && formatVisualField) {
                     //when typing is finished the format is applied after
                     //the min/max validations
                     log.debug("about to format " + raw);
                     scope.visualModel = scope.format(raw);
                  }

                  //model should be unformatted
                  log.debug("model: " + scope.ngModel + " raw: " + raw);
                  if (scope.ngModel !== raw) {
                     log.debug("UPDATING MODEL WITH " + raw);
                     scope.ngModel = raw;
                     $timeout(function() {
                        scope.onChange();
                     });
                  }
               });
            };

            var raw = scope.ngModel;
            var maximum = scope.getMax();
            if (!attrs.avoidInitialValidation) {
               if (raw !== null && maximum !== null && raw > maximum) {
                  scope.ngModel = maximum;
                  log.debug("onChange Max");
                  $timeout(function() {
                     scope.onChange();
                  });
               }
               var minimum = scope.getMin();
               if (raw !== null && minimum !== null && raw < minimum) {
                  scope.ngModel = minimum;
                  log.debug("onChange Min");
                  $timeout(function() {
                     scope.onChange();
                  });
               }
            }

            //first time format
            scope.visualModel = scope.format(scope.ngModel);
            scope.editing = false;
            scope.alreadyTyped = false;

            var timeoutPromise;

            var field = $(element).find("input[type='text']");

            field.on('focus', function() {
               scope.alreadyTyped = false;
               scope.editing = true;
               log.debug("FOCUS TEXT BEFORE visual is " + scope.visualModel + " model is " + scope.ngModel);
               scope.$apply(function() {
                  //start with formatted value
                  //scope.visualModel = scope.format(scope.ngModel);
                  //start with unformatted value
                  scope.visualModel = scope.ngModel;
                  $timeout(function() {
                     if (field[0].id === document.activeElement.id) {
                        field.select();
                     }
                  }, 0, false); // <-- avoid an $apply cycle
               });
               log.debug("FOCUS TEXT AFTER visual is " + scope.visualModel + " model is " + scope.ngModel);
            });

            field.on('blur', function() {
               scope.editing = false;
               log.debug("BLUR TEXT BEFORE visual is " + scope.visualModel + " model was " + scope.ngModel);
               //$rootScope.$broadcast('debug', "BLUR TEXT BEFORE visual is " + scope.visualModel + " model was " + scope.ngModel, scope.fieldId);
               scope.accept(true);
               log.debug("BLUR TEXT AFTER: visual is " + scope.visualModel + " model is " + scope.ngModel);
               //$rootScope.$broadcast('debug', "BLUR TEXT AFTER: visual is " + scope.visualModel + " model is " + scope.ngModel, scope.fieldId);
            });

            field.on('keydown', function(event) {
               if (event.which !== 38 && event.which !== 40) {
                  return;
               }

               var valid = formatter.check(scope.visualModel);
               if (!valid) {
                  return;
               }

               var raw = scope.unformat(scope.visualModel);

               var stepsFromSliderMin = (raw - scope.getSliderMin()) / scope.getSliderStep();
               // fix for floating point rounding errors in division
               stepsFromSliderMin = Math.round(stepsFromSliderMin * 100000000) / 100000000;
               var nextLowerStep = Math.floor(stepsFromSliderMin) * scope.getSliderStep() + scope.getSliderMin();
               // fix for floating point rounding errors in division
               nextLowerStep = Math.round(nextLowerStep * 100000000) / 100000000;
               var nextUpperStep = nextLowerStep + scope.getSliderStep();
               // fix for floating point rounding errors in division
               nextUpperStep = Math.round(nextUpperStep * 100000000) / 100000000;

               if (event.which === 38) {
                  // up
                  if (nextLowerStep < raw && raw < nextUpperStep) {
                     raw = nextUpperStep;
                  }
                  else {
                     raw = raw + scope.getSliderStep();
                  }
               }
               else if (event.which === 40) {
                  // down
                  if (nextLowerStep < raw && raw < nextUpperStep) {
                     raw = nextLowerStep;
                  }
                  else {
                     raw = raw - scope.getSliderStep();
                  }
               }

               raw = Math.round((raw - scope.getSliderMin()) / scope.getSliderStep()) * scope.getSliderStep() + scope.getSliderMin();

               raw = Math.min(raw, scope.getMax());
               raw = Math.max(raw, scope.getMin());

               // ensure a valid final value for the field
               raw = scope.unformat(scope.format(raw));

               scope.$apply(function() {
                  scope.visualModel = raw;
               });
            });

            field.on('keyup', function(event) {
               // avoid useless events: left and right arrows (up and down are used in key down), shift, ctrl, alt
               if (event.which === 37 || event.which === 39 || event.which === 16 || event.which === 17 || event.which === 18) {
                  return;
               }

               // WARNING: the alreadyTyped flag was previously set on keypress, but IE and chrome where not triggering a keypress for the backspace key
               scope.alreadyTyped = true;

               //ngModelCtrl.$setViewValue(...);
               log.debug("KEYUP TEXT BEFORE visual is " + scope.visualModel + " model is " + scope.ngModel);
               /*scope.$apply(function() {
                scope.visualModel = scope.ngModel;
                });*/
               if (timeoutPromise) {
                  $timeout.cancel(timeoutPromise); //cancel previous timeout
               }
               timeoutPromise = $timeout(function() {
                  log.debug("TIMEOUT TEXT BEFORE visual is " + scope.visualModel + " model is " + scope.ngModel);
                  scope.accept(false);
                  log.debug("TIMEOUT TEXT AFTER visual is " + scope.visualModel + " model is " + scope.ngModel);
               }, KEY_TIMEOUT);
               log.debug("KEYUP TEXT AFTER visual is " + scope.visualModel + " model is " + scope.ngModel);
            });
         },
         post: function postLink(scope, element, attrs, controller) {
            //Watch our local model and call the onChange function
            scope.$watch(
               function() {
                  return scope.ngModel;
               },
               function(newValue, oldValue) {
                  log.debug("REAL model changed to " + newValue);
                  //$rootScope.$broadcast('debug', 'numeric field changed: ' + oldValue + ' --> ' + newValue, scope.fieldId);
                  if (!scope.editing) {
                     log.debug("NOT EDITING " + newValue);
                     //Update the visual model
                     var formatted = scope.format(newValue);
                     scope.visualModel = formatted;
                     scope.sliderElement.slider("option", "animate", false);
                  }
                  else {
                     log.debug("EDITING " + newValue);
                     if (!scope.alreadyTyped) {
                        log.debug("NOT ALREADY TYPED " + newValue);
                        //If the user is editing but hasn't typed a character yet, we allow
                        //model changes, because it can happen in cases where a previous field changed the model,
                        //we entered this field now but the calculation of the previous change took a little bit
                        //more time to complete. ask ac/gm if in doubt.
                        scope.visualModel = newValue.toString();
                     }
                  }
                  scope.sliderElement.slider("value", newValue);
                  scope.sliderElement.slider("option", "animate", true);
               });


            if (scope.showCalculator) {
               scope.$watch(
                  function() {
                     return scope.manualEntryModel;
                  },
                  function(newValue, oldValue) {
                     if (oldValue !== undefined && newValue !== undefined && newValue !== oldValue) {
                        scope.onChange();
                     }
                  });
            }

            // watch for changes in slider parameters
            scope.$watch(
               function() {
                  return scope.enabled;
               },
               function(newValue, oldValue) {
                  if (newValue === oldValue) {
                     return;
                  }

                  if (newValue) {
                     scope.enable();
                  }
                  else {
                     scope.disable();
                  }
               });

            
            scope.$watch(
               function() {
                  return scope.sliderMin;
               },
               function() {
                  scope.sliderElement.slider("option", "min", scope.getValidatedSliderMin());
               });

            scope.$watch(
               function() {
                  return scope.max;
               },
               function() {
                  var newSliderMax = scope.getValidatedSliderMax();
                  scope.sliderElement.slider("option", "max", newSliderMax);
               });
               
            scope.$watch(
               function() {
                  return scope.min;
               },
               function() {
                  var newSliderMin = scope.getValidatedSliderMin();
                  scope.sliderElement.slider("option", "min", newSliderMin);
               });

            scope.$watch(
               function() {
                  return scope.sliderMax;
               },
               function() {
                  scope.sliderElement.slider("option", "max", scope.getValidatedSliderMax());
               });

            scope.$watch(
               function() {
                  return scope.sliderStep;
               },
               function() {
                  scope.sliderElement.slider("option", "step", scope.getSliderStep());
               });

            scope.$watch(
               function() {
                  return scope.options;
               },
               function() {
                  scope.sliderElement.slider("option", "min", scope.getValidatedSliderMin());
                  scope.sliderElement.slider("option", "max", scope.getValidatedSliderMax());
                  scope.sliderElement.slider("option", "step", scope.getSliderStep());
               });
                        
            $(document).on('mousedown', '.numeric-field-type', function (e) {
               $(this).hide();
               var BottomElement = document.elementFromPoint(e.clientX, e.clientY);
               $(this).show();
               $(BottomElement).mousedown(); //Manually fire the event for desired underlying element
               return false;
            });
         }
      };
   };
   
   var amountNumericFormatter = {
      format: function(scope, formatter, raw) {
         if (scope.decimals !== undefined && scope.decimals > 0) {
            var decimals = scope.decimals;
            if (scope.maxDecimals && scope.maxDecimals > decimals) {
               decimals = scope.maxDecimals;
            }
            var formatted = formatter.formatCurrencyWithDecimals(raw, decimals, scope.isPercentage);
            if (scope.maxDecimals) {
               var diff = scope.maxDecimals - scope.decimals;
               while (diff > 0 && formatted.slice(-1) === '0') {
                  formatted = formatted.slice(0, -1);
                  diff -= 1;
               }
            }
            return formatted;
         }
         else {
            return formatter.formatCurrency(raw, scope.isPercentage);
         }
      },
      unformat: function(scope, formatter, formatted) {
         var raw = formatter.unformat(formatted, scope.isPercentage);
         var decimals = scope.decimals;
         if (scope.maxDecimals && scope.maxDecimals > decimals) {
            decimals = scope.maxDecimals;
         }
         if (scope.decimals !== undefined && decimals > 0) {
            var factor = Math.pow(10, decimals);
            return Math.round(raw * factor) / factor;
         }
         else {
            return Math.round(raw);
         }

         //return formatter.unformat(formatted);
      }
   };
   
   var integerNumericFormatter = {
      format: function(scope, formatter, raw) {
         return raw;
      },
      unformat: function(scope, formatter, formatted) {
         var unformatted = formatter.unformat(formatted);

         return Math.round(unformatted);
      }
   };

   var numericfield = app.register.directive('numericfield', ['$timeout', 'formatter', '$rootScope', function($timeout, formatter, $rootScope) {
      return {
         restrict: 'E',
         require: ['?ngModel'], // get a hold of NgModelController
         scope: {
            type: '@',
            label: '@',
            ngModel: '=',
            onChange: '&',
            onStop: '&',
            min: '@',
            max: '@',
            sliderMin: '@',
            sliderMax: '@',
            sliderStep: '@',
            showRange: '@',
            showLabel: '@',
            decimals: '@',
            maxDecimals: '@',
            isPercentage: '@',
            isCurrency: '@',
            isEditable: '=?',
            isExpandable: '=?',
            isExpanded: '&',
            minDigits: '@',
            options: '=?',
            avoidInitialValidation: '=?',
            showCalculator: '@',
            manualEntryModel: '=',
            onEntryModelChanged: '&',
            id: '@',
            enabled: '=?',
            onEdit: '&',
            onExpand: '&'
         },
         templateUrl: 'src/directives/fields/numeric-field/numeric-field.html',
         compile: function(element, attrs) {
            if (attrs.avoidInitialValidation === null || attrs.avoidInitialValidation === undefined) {
               attrs.avoidInitialValidation = false;
            }
            
            var numericFormatter = amountNumericFormatter; // Default type = "amount"
            if (attrs.type === "int") {
               numericFormatter = integerNumericFormatter;
            }
            
            return numericFieldCompile(element, attrs, $timeout, formatter, numericFormatter, $rootScope);
         }
      };
   }]);

   return numericfield;
});


define('slider-field', [
   'app',
   'parameters-manager',
   'logger',
   'float',
   'formatter',
   'jquery-ui-touch-punch',
   'jquery-ui'
], function(app, parametersManager, Logger) {
   'use strict';

   var log = Logger.get('SliderField');

   var SLIDER_TIMEOUT = parametersManager.baseViewParameters.fieldAcceptModelTimeout;
   var KEY_TIMEOUT = parametersManager.baseViewParameters.fieldAcceptModelTimeout;

   var amountNumericFormatter = {
      format: function(scope, formatter, raw) {
         if (scope.decimals !== undefined && scope.decimals > 0) {
            var decimals = scope.decimals;
            if (scope.maxDecimals && scope.maxDecimals > decimals) {
               decimals = scope.maxDecimals;
            }
            var formatted = formatter.formatCurrencyWithDecimals(raw, decimals, scope.isPercentage);
            if (scope.maxDecimals) {
               var diff = scope.maxDecimals - scope.decimals;
               while (diff > 0 && formatted.slice(-1) === '0') {
                  formatted = formatted.slice(0, -1);
                  diff -= 1;
               }
            }
            return formatted;
         }
         else {
            return formatter.formatCurrency(raw, scope.isPercentage);
         }
      },
      unformat: function(scope, formatter, formatted) {
         var raw = formatter.unformat(formatted, scope.isPercentage);
         var decimals = scope.decimals;
         if (scope.maxDecimals && scope.maxDecimals > decimals) {
            decimals = scope.maxDecimals;
         }
         if (scope.decimals !== undefined && decimals > 0) {
            var factor = Math.pow(10, decimals);
            return Math.round(raw * factor) / factor;
         }
         else {
            return Math.round(raw);
         }

         //return formatter.unformat(formatted);
      }
   };
   
   var integerNumericFormatter = {
      format: function(scope, formatter, raw) {
         return raw;
      },
      unformat: function(scope, formatter, formatted) {
         var unformatted = formatter.unformat(formatted);

         return Math.round(unformatted);
      }
   };

   var sliderField = app.register.directive('sliderField', ['$timeout', 'formatter', '$rootScope', function($timeout, formatter, $rootScope) {
      return {
         restrict: 'E',
         require: ['?ngModel'], // get a hold of NgModelController
         scope: {
            label: '@',
            tooltipText: '@',
            ngModel: '=',
            onChange: '&',
            onStop: '&',
            sliderMin: '@',
            sliderMax: '@',
            sliderStep: '@',
            showLabel: '@',
            decimals: '@',
            maxDecimals: '@',
            isPercentage: '@',
            isCurrency: '@',
            currency: '@',
            isShowValueHandle: '@',
            options: '=?',
            id: '@',
            enabled: '=?'
         },
         templateUrl: 'src/directives/fields/slider-field/slider-field.html',
         compile: function(element, attrs) {
            var numericFormatter = amountNumericFormatter; // Default type = "amount"
            if (attrs.type === "int") {
               numericFormatter = integerNumericFormatter;
            }

            return {
               pre: function preLink(scope, element, attrs, controller) {
                  if (scope.id !== undefined && scope.id.length > 0) {
                     scope.fieldId = scope.id.replace(/\./g, '_');
                  }
                  else {
                     // adds an id based on the ngModel attribute, for easier identification from tests
                     scope.fieldId = attrs.ngModel.replace(/\./g, '_').replace(/\$/g, '');
                  }

                  scope.showLabel = true;

                  if (scope.isCurrency === undefined && scope.isPercentage === undefined) {
                     if (attrs.type === 'amount') {
                        scope.isCurrency = true;
                        scope.isPercentage = false;
                     }
                     else {
                        scope.isCurrency = false;
                        scope.isPercentage = false;
                     }
                  }

                  scope.shouldBeDisabled = function() {
                     if (scope.enabled !== null) {
                        if (scope.enabled !== undefined) {
                           return !scope.enabled;
                        }
                     }

                     if (scope.showCalculator) {
                        return !scope.manualEntryModel;
                     }

                     return false;
                  };

                  scope.disable = function() {
                     $timeout(function() {
                        var field = $("#" + scope.fieldId + '_input');
                        field.prop('disabled', true);
                        scope.sliderElement.slider('disable').draggable('disable');
                        scope.sliderHandle = scope.sliderElement.slider('disable').children()[0];
                        scope.sliderHandle.removeAttribute('href');
                     });
                  };

                  scope.enable = function() {
                     $timeout(function() {
                        var field = $("#" + scope.fieldId + '_input');
                        field.prop('disabled', false);
                        scope.sliderElement.slider('enable').draggable('enable');
                     });
                  };

                  scope.getSliderMax = function() {
                     if (scope.sliderMax !== undefined) {
                        log.debug("SLIDER-MAX (REAL): " + scope.sliderMax);
                        return parseFloat(scope.sliderMax);
                     }
                     if (scope.options !== undefined && scope.options.slider_max !== undefined) {
                        return scope.options.slider_max;
                     }
                     return 1000;
                  };

                  scope.getSliderMin = function() {
                     if (scope.sliderMin !== undefined) {
                        return parseFloat(scope.sliderMin);
                     }
                     if (scope.options !== undefined && scope.options.slider_min !== undefined) {
                        return scope.options.slider_min;
                     }
                     return 0;
                  };

                  scope.getSliderStep = function() {
                     if (scope.sliderStep !== undefined) {
                        return parseFloat(scope.sliderStep);
                     }
                     if (scope.options !== undefined && scope.options.slider_step !== undefined) {
                        return scope.options.slider_step;
                     }
                     return 100;
                  };

                  scope.getMaxFormated = function() {
                     return scope.outputFormat(scope.getSliderMax());
                  };

                  scope.getMinFormated = function() {
                     return scope.outputFormat(scope.getSliderMin());
                  };

                  attrs.$observe('showLabel', function(val) {
                      if (angular.isDefined(val)) {
                         scope.showLabel = scope.showLabel !== "false";
                      }
                  });

                  scope.sliderElement = $(element).find('.slider');
                  var setValue = function() {
                     //$rootScope.$broadcast('debug', "slider setValue " + scope.sliderElement.slider("option", "value"), scope.fieldId);
                     $timeout(function() {
                        //$rootScope.$broadcast('debug', "slider about to set  " + scope.sliderElement.slider("option", "value"), scope.fieldId);
                        scope.ngModel = scope.sliderElement.slider("option", "value");
                        $timeout(function() {
                           //$rootScope.$broadcast('debug', "slider about call onChange", scope.fieldId);
                           scope.onChange();
                        });
                     });
                  };
                  var setVisualValue = function() {
                     $timeout(function() {
                        scope.visualModel = scope.outputFormat(scope.sliderElement.slider("option", "value"));
                     });
                  };

                  scope.sliderElement.slider({
                     range: "min",
                     max: scope.getSliderMax(),
                     min: scope.getSliderMin(),
                     animate: true,
                     step: scope.getSliderStep(),
                     value: 0,
                     timeoutPromise: undefined,
                     change: function(event, ui) {
                        log.debug("SLIDE CHANGE! " + scope.sliderElement.slider("option", "value"));
                         // setValue();
                     },
                     slide: function(event, ui) {
                        log.debug("SLIDE! " + scope.sliderElement.slider("option", "value"));
                        log.debug("timeout set to " + SLIDER_TIMEOUT);
                        //document._sliderStartTime = new Date();
                        var startTime = new Date();
                        //Visual value is changed directly with a $timeout call (see setVisualValue),
                        //so we avoid calling an apply here
                        setVisualValue();
                        log.debug("end of set visual value: " + (new Date() - startTime));
                        /*scope.$apply(function() {
                           //setVisualValue();
                           scope.visualModel = scope.format(scope.sliderElement.slider("option", "value"));
                           //log.debug("end of slide apply: " + (new Date() - startTime));
                        });*/
                        if (this.timeoutPromise) {
                           $timeout.cancel(this.timeoutPromise); //cancel previous timeout
                        }
                         this.timeoutPromise = $timeout(function() {
                           log.debug("start of timeout promise: " + (new Date() - startTime));
                           log.debug("TIMEOUT SLIDER BEFORE visual is " + scope.visualModel + " model is " + scope.ngModel);
                           log.debug("setValue promise ");
                           setValue();
                           log.debug("TIMEOUT SLIDER AFTER visual is " + scope.visualModel + " model is " + scope.ngModel);
                           log.debug("end of timeout promise: " + (new Date() - startTime));
                         }, SLIDER_TIMEOUT);
                     },
                     stop: function(event, ui) {
                        scope.onStop();
                     }
                  }).draggable();

                  if (scope.enabled !== null) {
                     if (scope.enabled !== undefined && !scope.enabled) {
                        scope.disable();
                     }
                  }

                  scope.isNumeric = function(value) {
                     if (typeof value === "string") {
                        value = value.replace(/'/g, ""); //ignore group separators
                     }

                     return !isNaN(value);
                  };

                  scope.format = function(raw) {
                     return numericFormatter.format(scope, formatter, raw);
                  };

                  scope.outputFormat = function(raw) {
                     if (raw === 0) {
                        return raw;
                     }

                     var formatedValue = scope.format(raw);
                     if (scope.isPercentage) {
                        return formatedValue + '%';
                     }
                     else if (scope.isCurrency) {
                        return scope.currency + ' ' + formatedValue;
                     }
                     return formatedValue;
                  };

                  //first time format
                  scope.visualModel = scope.outputFormat(scope.ngModel);
               },
               post: function postLink(scope, element, attrs, controller) {
                  //Watch our local model and call the onChange function
                  scope.$watch(
                     function() {
                        return scope.ngModel;
                     },
                     function(newValue, oldValue) {
                         log.debug("REAL model changed to " + newValue);
                        //$rootScope.$broadcast('debug', 'numeric field changed: ' + oldValue + ' --> ' + newValue, scope.fieldId);
                        if (!scope.editing) {
                           log.debug("NOT EDITING " + newValue);
                           //Update the visual model
                           var formatted = scope.outputFormat(newValue);
                           scope.visualModel = formatted;
                           scope.sliderElement.slider("option", "animate", false);
                        }
                        else {
                           log.debug("EDITING " + newValue);
                           if (!scope.alreadyTyped) {
                              log.debug("NOT ALREADY TYPED " + newValue);
                              //If the user is editing but hasn't typed a character yet, we allow
                              //model changes, because it can happen in cases where a previous field changed the model,
                              //we entered this field now but the calculation of the previous change took a little bit
                              //more time to complete. ask ac/gm if in doubt.
                              scope.visualModel = newValue.toString();
                           }
                        }
                        scope.sliderElement.slider("value", newValue);
                        scope.sliderElement.slider("option", "animate", true);
                     });


                  // watch for changes in slider parameters
                  scope.$watch(
                     function() {
                        return scope.enabled;
                     },
                     function(newValue, oldValue) {
                        if (newValue === oldValue) {
                           return;
                        }

                        if (newValue) {
                           scope.enable();
                        }
                        else {
                           scope.disable();
                        }
                     });


                  scope.$watch(
                     function() {
                        return scope.sliderMin;
                     },
                     function() {
                        scope.sliderElement.slider("option", "min", scope.getSliderMin());
                     });

                  scope.$watch(
                     function() {
                        return scope.max;
                     },
                     function() {
                        var newSliderMax = scope.getSliderMax();
                        scope.sliderElement.slider("option", "max", newSliderMax);
                     });

                  scope.$watch(
                     function() {
                        return scope.min;
                     },
                     function() {
                        var newSliderMin = scope.getSliderMin();
                        scope.sliderElement.slider("option", "min", newSliderMin);
                     });

                  scope.$watch(
                     function() {
                        return scope.sliderMax;
                     },
                     function() {
                        scope.sliderElement.slider("option", "max", scope.getSliderMax());
                     });

                  scope.$watch(
                     function() {
                        return scope.sliderStep;
                     },
                     function() {
                        scope.sliderElement.slider("option", "step", scope.getSliderStep());
                     });

                  scope.$watch(
                     function() {
                        return scope.options;
                     },
                     function() {
                        scope.sliderElement.slider("option", "min", scope.getSliderMin());
                        scope.sliderElement.slider("option", "max", scope.getSliderMax());
                        scope.sliderElement.slider("option", "step", scope.getSliderStep());
                     });

                  $timeout(function() {
                     $("#" + scope.fieldId + "_popover").popover({
                        content: scope.tooltipText,
                        trigger: 'focus',
                        placement: function (context, source) {
                            if ($(window).innerWidth() < 420) {
                                // to set correctly the size for position check also class popover in multicalc sass
                                if ($(source).position().left > 150 &&  $(source).position().left < 220) {
                                    return "left";
                                }
                                else {
                                    return "right";
                                }
                            }
                            return "right";
                        }
                     });
                  });
               }
            };
         }
      };
   }]);

   return sliderField;
});


define('int', [
   'app'
], function(app) {
   'use strict';

   var int = app.register.directive('int', function() {
      return {
         require: 'ngModel',
         link: function(scope, ele, attr, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

               if (typeof viewValue === 'number') {
                  return Math.round(viewValue);
               }

               viewValue = viewValue.replace(/'/g, "");

               if (viewValue === "" || isNaN(viewValue)) {
                  return 0.0;
               }

               return parseInt(viewValue);
            });
         }
      };
   });

   return int;
});


define('selection-field', [
   'app',
   'localization',
   'int'
], function(app) {
   'use strict';

   var selectionfield = app.register.directive('selectionfield', ['$timeout', function($timeout) {
      return {
         restrict: 'E',
         scope: {
            label: '@',
            ngModel: '=',
            onChange: '&',
            options: '=?',
            enum: '@',
            optionLabeler: '&',
            disabled: '@',
            id:'@',
            isRequired: '@',
            keyName: '@',
            descriptionName: '@',
            enabled: '='
         },
         templateUrl: 'src/directives/fields/selection-field/selection-field.html',
         controller: ['$scope', 'localize', function($scope, localize) {
            
            $scope.model = $scope.ngModel;
            
            if ($scope.disabled === undefined) {
               $scope.disabled = false;
            }
            if (window.isIE9) {
               $scope.showSelect = false;
            }
            else {
               $scope.showSelect = true;
            }

            $scope.getTranslatedDescription = function(option) {
               if ($scope.enum) {
                  var key = null;
                  if (isNaN(option)) {
                     key = option.longDescription;
                  }
                  else {
                     key = option;
                  }

                  key = $scope.enum + '.' + key;

                  return localize.getLocalizedString(key);
               }
               else {
                  return $scope.optionLabeler({option: option});
               }
            };
                        
            $scope.getOptions = function() {
               if ($scope.keyName !== undefined) {
                  return "option as option." + $scope.descriptionName + " for option in options";
               }
               if ($scope.enum) {
                  return "option as getTranslatedDescription(option) for option in options";
               }
               else {
                  return "option for option in options";
               }
            };
            
         }],
         compile: function(element, attrs) {
            return function(scope, element, attrs) {
               if (scope.id !== undefined && scope.id.length > 0) {
                  scope.fieldId = scope.id.replace(/\./g, '_');
               }
               else {
                  // adds an id based on the ngModel attribute, for easier identification from tests
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
   
               scope.isDisabled = function() {
                  if (scope.enabled !== undefined) {
                     return !scope.enabled;
                  }
                  return false;
               };
               
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

   return selectionfield;
});


define('result-summary-box', [
   'app',
   'theme-manager',
   'model-constants',
   'localization',
   'calculators-manager'
], function(app, ThemeManager) {
   'use strict';

   var counter = 0;
   var resultSummaryBox = app.register.directive('resultSummaryBox', [function() {
      return {
         restrict: 'E',
         scope: {
            text: '@',
            tips: '=?'
         },
         templateUrl: 'src/directives/result-summary-box/result-summary-box.html',
         controller: ['$scope', '$window', 'localize', '$timeout', 'logStatisticsService', 'authenticationService',
            function($scope, $window, localize, $timeout, logStatisticsService, authenticationService) {
            counter = counter + 1;
            $scope.counter = counter;
            $scope.switchFinanceCoachInfo = function() {
               $scope.financeCoachInfoVisible = !$scope.financeCoachInfoVisible;
            };
            $scope.showFinanceCoachInfo = function() {
               $scope.financeCoachInfoVisible = true;
            };
            $scope.hideFinanceCoachInfo = function() {
               $scope.financeCoachInfoVisible = false;
            };
            $scope.getTipTypeClass = function(tip) {
               if (tip.type === FinanceCoachInfoType.INFORMATION) {
                  return "information";
               }
               else if (tip.type === FinanceCoachInfoType.ADVANTAGE) {
                  return "advantage";
               }
               if (tip.type === FinanceCoachInfoType.DISADVANTAGE) {
                  return "disadvantage";
               }
               else if (tip.type === FinanceCoachInfoType.EQUALITY) {
                  return "equality";
               }
               else {
                  return "contact";
               }
            };
            $scope.getTipText = function(tip) {
               if (typeof tip.textKey === 'string') {
                  return localize.getLocalizedString(tip.textKey);
               }
               return tip.localizedText();
            };

            $scope.goToTipLink = function(tip) {
               if (typeof tip.goToTipLink !== "undefined") {
                  // the desired action on the tip is executed only after the modal dialog is closed
                  // remember the selected tip
                  $scope.selectedTip = tip;
                  // close the modal dialog (see the hidden.bs.modal event handling)
                  $scope.closeTips();
               }
            };
            $scope.tipHasLink = function(tip) {
               if (!$scope.showTipLink(tip)) {
                  return false;
               }

               if (tip.contactLink) {
                  return tip.showTipIfContactLink();
               }

               if (typeof(tip.goToTipLink) !== "undefined") {
                  return true;
               }

               return false;
            };
            $scope.getTipLinkText = function(tip) {
               if (typeof tip.linkTextKey === 'string') {
                  return localize.getLocalizedString(tip.linkTextKey);
               }
               return "";
            };
            $scope.showTipLink = function(tip) {
               if ((typeof tip.showTipLink) === "undefined") {
                  return true;
               }
               return tip.showTipLink();
            };
            $scope.getVisibleTips = function() {
               var visibleTips = [];

               if ($scope.tipsWindowOpen) {
                  for (var i = 0; i < $scope.tips.length; i++) {
                     var tip = $scope.tips[i];
                     if (tip.isVisible() && tip.showTipIfContactLink()) {
                        visibleTips.push(tip);
                     }
                  }
               }

               return visibleTips;
            };

            $scope.tipsWindowOpen = false;
            $scope.selectedTip = null;
            $scope.onModalCloseInitialized = false;
            $scope.openTips = function() {

               $scope.tipsWindowOpen = true;
               // This show.bs.modal before the modal show was added to fix the T2863 bug. I find this solution in this links:
               // https://github.com/twbs/bootstrap/issues/16050
               // http://stackoverflow.com/questions/19662896/twitter-bootstrap-modal-event-not-fired-when-modal-is-shown
               $('#tips' + $scope.counter).on('show.bs.modal', function () {
                  // Workarround T2795: bcvs, inside iframe, mobile size: finanz coach modal dialog can appear in a non visible (scrolled up) area.
                  if (window.matchMedia("only screen and (min-width: 516px)").matches) {
                     // Workarround T2863: iframe is re-positioned when opening finance-coach in IE and when before the users scrolled down
                     // IE Fix:  bootstrap does a focus, which screws up the iframe by scrolling the parent window
                     setTimeout(function() {
                        $('#tips' + $scope.counter).find('.modal-dialog').off('bsTransitionEnd');

                        // the code below would normally belong to the shown.bs.modal event.
                        // the woraround above, however, for some unknown reason, prevents the shown.bs.modal event to be triggered.
                        // running the code here is however more or less the same, because the timeout gets triggered when the dialog is shown.
                        $scope.$emit('modalOpen');
                     }, 350);
                  }
               }).modal('show');
               
               logStatisticsService.sendEventOnceByConsulting('finance coach used', $scope.getStatistics());

               // handle hidden.bs.modal event for selected tips, be sure to add just one event listener
               if (!$scope.onModalCloseInitialized) {
                  $scope.onModalCloseInitialized = true;
                  $('#tips' + $scope.counter).on('hidden.bs.modal', function () {
                     $scope.tipsWindowOpen = false;

                     // if a tip was selected, execute the desired action
                     // it's possible also that the user just closed the dialog without triggering any tip action
                     if ($scope.selectedTip !== null) {
                        var tip = $scope.selectedTip;
                        $scope.selectedTip = null;
                        if (window.isIE9) {
                           tip.goToTipLink();
                        }
                        else {
                           $timeout(function() {
                              tip.goToTipLink();
                           });
                        }
                     }
                  });
               }
            };
            $scope.closeTips = function() {
               $('#tips' + $scope.counter).modal('hide');
            };

            $scope.getStatistics = function() {
               var themeManager = new ThemeManager();

               var userData = authenticationService.getUserData();
               return {
                  pcId: window.localStorage.pcId,
                  customer: (userData) ? userData.customerNumber : null,
                  userId: authenticationService.getUserLogged(),
                  calculator: themeManager.getCurrentSubThemeId()
               };
            };
         }]
      };
   }]);

   return resultSummaryBox;
});


define('table-row', [
   'app'
], function(app) {
   'use strict';

   var tableRow = app.register.directive('tableRow', [function() {
      return {
         restrict: 'A',
         scope: {
            bulletColor: '@',
            lineBulletColor: '@',
            col1: '=?',
            col1Type: '@',
            col1Decimals: '@',
            col1Color: '@',
            col1Class: '@',
            col1Id: '@',
            col2: '=?',
            col2Type: '@',
            col2Decimals: '@',
            col2Color: '@',
            col2Class: '@',
            col2Id: '@',
            col3: '=?',
            col3Type: '@',
            col3Decimals: '@',
            col3Color: '@',
            col3Class: '@',
            col3Id: '@',
            col4: '=?',
            col4Type: '@',
            col4Decimals: '@',
            col4Color: '@',
            col4Class: '@',
            col4Id: '@',
            col5: '=?',
            col5Type: '@',
            col5Decimals: '@',
            col5Color: '@',
            col5Class: '@',
            col5Id: '@',
            titleColspan: '=?'
         },
         templateUrl: 'src/directives/table-row/table-row.html',
         controller: ['$scope', '$attrs', 'localize', function($scope, $attrs, localize) {
            $scope.hasBullet = function() {
               return $scope.hasSquareBullet() || $scope.hasLineBullet();
            };

            $scope.hasSquareBullet = function() {
               return $scope.bulletColor !== undefined && $scope.bulletColor !== '' && $scope.bulletColor !== null;
            };

            $scope.hasLineBullet = function() {
               return $scope.lineBulletColor !== undefined && $scope.lineBulletColor !== '' && $scope.lineBulletColor !== null;
            };
            
            $scope.getBulletColor = function() {
               if ($scope.hasSquareBullet()) {
                  return $scope.bulletColor;
               }
               else {
                  return $scope.lineBulletColor;
               }
            };
            
            $scope.getColId = function(colId, colAttr) {
               var id = colId;
               if (id === null || id === undefined) {
                  id = colAttr;
               }
               if (colAttr !== undefined) {
                  return id.replace(/\$ctrl./g, '').replace(/\./g, '_').replace(/\(/g, '').replace(/\)/g, '').replace(/-/g, '');
               }
            };

            $scope.getCol1Id = function() {
               return $scope.getColId($scope.col1Id, $attrs.col1);
            };
            
            $scope.getCol2Id = function() {
               return $scope.getColId($scope.col2Id, $attrs.col2);
            };
            
            $scope.getCol3Id = function() {
               return $scope.getColId($scope.col3Id, $attrs.col3);
            };
            
            $scope.getCol4Id = function() {
               return $scope.getColId($scope.col4Id, $attrs.col4);
            };
            
            $scope.getCol5Id = function() {
               return $scope.getColId($scope.col5Id, $attrs.col5);
            };
   
            $scope.getColClass = function(colType) {
               if (colType === 'percentage') {
                  return 'percentage-col';
               }
               else {
                  return '';
               }
            };
            
            $scope.getColBindHtml = function(col, colType, colDecimals, defaultType) {
               if (colType === undefined) {
                  colType = defaultType;
               }
               if (colType === 'none') {
                  return col;
               }
               
               var formatType = (colType === 'percentage') ? 'Percentage' : 'Amount';
               return localize.getLocalizedString('GenericFormats.' + formatType, {'VALUE': col, 'DECIMALS': colDecimals});
            };
         }]
      };
   }]);

   return tableRow;
});


define('table-row-list', [
   'app'
], function(app) {
   'use strict';

   var tableRowList = app.register.directive('tableRowList', [function() {
      return {
         restrict: 'A',
         transclude: true,         
         replace: true,         
         scope: {
            rowClass: '@'
         },
         templateUrl: 'src/directives/table-row-list/table-row-list.html',
         controller: ['$scope', '$attrs', function($scope, $attrs) {
         }]
      };
   }]);

   return tableRowList;
});


define('checkbox-field', [
   'app'
], function(app) {
   'use strict';

   var checkboxfield = app.register.directive('checkboxfield', [function() {
      return {
         restrict: 'E',
         require: '?ngModel', // get a hold of NgModelController
         scope: {
            label: '@',
            inline: '@',
            ngModel: '=',
            id: '@',
            onChange: '&',
            enabled: '=?'
         },
         templateUrl: 'src/directives/fields/checkbox-field/checkbox-field.html',
         compile: function(element, attrs) {
            return {
               pre: function preLink(scope, element, attrs, controller) {
                  //scope.checkboxModel = scope.ngModel;
                  if (attrs.id) {
                     scope.fieldId = attrs.id;
                  }
                  else {
                     scope.fieldId = attrs.ngModel.replace(/\./g, '_');
                  }
                  if (!attrs.inline) {
                     scope.inline = false;
                  }

                  if (scope.enabled === undefined) {
                     scope.enabled = true;
                  }

                  scope.isDisabled = function() {
                     return !scope.enabled;
                  };
               }
            };
         }
      };
   }]);

   return checkboxfield;
});






define('two-tab-field', [
   'app'
], function(app) {
   'use strict';

   var twoTabField = app.register.directive('twotabfield', [function() {
      return {
         restrict: 'E',
         scope: {
            firstTabTarget: '@',
            firstTabText: '@',
            firstTabValue: '=?',
            secondTabTarget: '@',
            secondTabText: '@',
            secondTabValue: '=?',
            model: '=',
            attribute: '@',
            onChange: '&'
         },
         templateUrl: 'src/directives/fields/two-tab-field/two-tab-field.html',
         link : function (scope, element, attrs) {
            // adds an id based on the model attribute, for easier identification from tests
            scope.firstTabId = attrs.model.replace(/\./g, '_') + "_" + attrs.attribute + "_" + attrs.firstTabTarget;
            scope.secondTabId = attrs.model.replace(/\./g, '_') + "_" + attrs.attribute + "_" + attrs.secondTabTarget;

            var firstAnchor = element.find('.firstAnchor');
            var secondAnchor = element.find('.secondAnchor');

            // show the correct tab when the model changes
            scope.$watch(function() {
               return scope.model[scope.attribute];
            }, function(newValue, oldValue) {
               if (newValue !== oldValue) {
                  if (scope.model[scope.attribute] === scope.firstTabValue) {
                     firstAnchor.tab("show");
                  }
                  else {
                     secondAnchor.tab("show");
                  }
               }
            });

            // update model when user changes selected tab
            firstAnchor.on('shown.bs.tab', function() {
               if (scope.model[scope.attribute] !== scope.firstTabValue) {
                  scope.$apply(function() {
                     scope.model[scope.attribute] = scope.firstTabValue;
                     scope.onChange();
                  });
               }
            });

            secondAnchor.on('shown.bs.tab', function() {
               if (scope.model[scope.attribute] !== scope.secondTabValue) {
                  scope.$apply(function() {
                     scope.model[scope.attribute] = scope.secondTabValue;
                     scope.onChange();
                  });
               }
            });

            scope.isFirstActive = function() {
               return scope.model[scope.attribute] === scope.firstTabValue;
            };

            /*
            // ensure that the correct tab is selected on entry
            if (scope.model[scope.attribute] === scope.secondTabValue) {
               //If the second tab is active, select it
               $timeout(function() {
                  secondAnchor.tab('show');
               }, 100);
            }*/
         }
      };
   }]);

   return twoTabField;
});


define('edit-dialog-box', [
   'app',
   'parameters-manager',
   'model-constants',
   'localization',
   'calculators-manager'
], function(app, parametersManager) {
   'use strict';

   var ACCEPT_TIMEOUT = parametersManager.baseViewParameters.fieldAcceptModelTimeout + 50;

   var editDialogBox = app.register.directive('editDialogBox', [function() {
         return {
            restrict: 'E',
            scope: {
               dialogName: '@'
            },
            templateUrl: 'src/directives/edit-dialog-box/edit-dialog-box.html',                     
            controller: ['$scope', '$rootScope', 'localize', '$injector', '$timeout', function($scope, $rootScope, localize, $injector, $timeout) {
                                                          
               $scope.getCamelCaseName = function() { //result -> someValueDialog
                  if ($scope.dialogName) {
                     return $scope.dialogName.toLowerCase().replace(/-(.)/g, function(match, group1) {
                        return group1.toUpperCase();
                     });
                  }
                  else {
                     return '';
                  }
               };
               
               $scope.getDialogName = function() { //result -> SomeValueDialog
                  if ($scope.dialogName) {
                     var name = $scope.dialogName[0].toUpperCase() + $scope.dialogName.substring(1);
                     return name.replace(/-(.)/g, function(match, group1) {
                        return group1.toUpperCase();
                     });
                  }
                  else {
                     return '';
                  }
               };
               
               var setupDialogDeregister = $rootScope.$on('setup' + $scope.getDialogName(), function() {
                  $scope.parent = $scope.$parent;
                  if ($scope.getCamelCaseName() !== '') {
                     $injector.invoke(['$controller', function ($controller) {
                        $controller($scope.getCamelCaseName(), {$scope: $scope}); 
                        $scope.injectGenericFunctionality();  
                        $timeout(function() {
                           $rootScope.$broadcast('finish' + $scope.getDialogName() + 'Setup');                           
                        });
                     }]);                     
                  }
               });

               $scope.$on('$destroy', function() {
                  setupDialogDeregister();
               });

               $scope.injectGenericFunctionality = function() {
                  $scope.parent.template = $scope.parent.templatePath;
                  
                  $('#editDialogBox' + $scope.getDialogName()).on('show.bs.modal', function () {   
                     // Workarround T2795: bcvs, inside iframe, mobile size: finanz coach modal dialog can appear in a non visible (scrolled up) area.
                     if (window.matchMedia("only screen and (min-width: 516px)").matches) {
                        // Workarround T2863: iframe is re-positioned when opening finance-coach in IE and when before the users scrolled down
                        // IE Fix:  bootstrap does a focus, which screws up the iframe by scrolling the parent window
                        setTimeout(function() {
                           $('#editDialogBox' + $scope.getDialogName()).find('.modal-dialog').off('bsTransitionEnd');

                           // the code below would normally belong to the shown.bs.modal event.
                           // the woraround above, however, for some unknown reason, prevents the shown.bs.modal event to be triggered.
                           // running the code here is however more or less the same, because the timeout gets triggered when the dialog is shown.
                           $scope.$emit('modalOpen');
                           
                           $scope.parent.setFocus($scope.getInitialFocusElement());
                        }, 350);
                     }
                  });

                  $("#editDialogBox" + $scope.getDialogName()).on("hidden.bs.modal", function () {
                     $scope.parent.template = '';
                  });

                  $scope.hasManualButton = function() {
                     if ($scope.getHasManualButton) {
                        return $scope.getHasManualButton();
                     }
                     else {
                        return false;
                     } 
                  };

                  $scope.hasAcceptButton = function() {
                     if ($scope.getHasAcceptButton) {
                        return $scope.getHasAcceptButton();
                     }
                     else {
                        return false;
                     }
                  };

                  $scope.manualSet = function() {
                     if ($scope.manualSetCallback) {
                        $scope.manualSetCallback();
                     }
                     $scope.parent.close();
                  };
                  
                  $scope.getAcceptButtonLabel = function() {
                     if ($scope.acceptButtonLabel) {
                        return localize.getLocalizedString($scope.acceptButtonLabel);
                     } 
                     return localize.getLocalizedString('editDialogBox.Accept');
                  };
                  
                  $scope.getCancelButtonLabel = function() {
                     if ($scope.cancelButtonLabel) {
                        return localize.getLocalizedString($scope.cancelButtonLabel);
                     } 
                     return localize.getLocalizedString('editDialogBox.ManualSet');
                  };
                  
                  $scope.acceptDialog = function() {
                     $scope.parent.setFocus("#editDialogAcceptButton");
                     $timeout(function() {
                        if ($scope.acceptCallback) {
                           $scope.acceptCallback();
                        }
                        if (!$scope.avoidCalculateOnAccept) {
                           $scope.parent.calculate(function() {
                              $scope.parent.close();
                           });
                        }
                     }, ACCEPT_TIMEOUT);
                  };

                  $scope.cancelDialog = function() {
                     if ($scope.cancelCallback) {
                        $scope.cancelCallback();
                     }
                     $scope.parent.close();                  
                  };
                  
                  $scope.getTitle = function() {
                     if ($scope.getDialogTitle) {
                        return $scope.getDialogTitle();
                     }
                     return $scope.getCamelCaseName();
                  };
               };
            }]
         };
   }]);

   return editDialogBox;
});


define('multicalc-personal-data', [
   'app',
   'parameters-manager',
   'model-constants',
   'localization'
], function(app, parametersManager) {
   'use strict';
   
   var multicalcPersonalData = app.register.directive('multicalcPersonalData', [function() {
      return {
         restrict: 'E',
         scope: {
            calculate: '&',
            onIncomeChanged: '&',
            onProfessionalStatusChanged: '&',
            base: '=',
            data: '=',
            scenario: '='
         },
         templateUrl: 'src/controllers/multicalc/multicalc-personal-data/multicalc-personal-data.html',
         controller: ['$scope', function($scope) {
            $scope.SexOptions = SexOptions;
            $scope.CivilStatusOptions = CivilStatusOptions;
            $scope.NumberOfChildrenOptions = parametersManager.baseModelParameters.numberOfChildrenOptions;
            $scope.ProfessionalStatusOptions = ProfessionalStatusOptions;
            $scope.baseModelParameters = parametersManager.baseModelParameters;
            $scope.baseViewParameters = parametersManager.baseViewParameters;
         }]
      };
   }]);
   
   return multicalcPersonalData;
});


define('radio-field', [
   'app'
], function(app) {
   'use strict';

   var field = app.register.directive('radiofield', [function() {
      return {
         restrict: 'E',
         require: '?ngModel', // get a hold of NgModelController
         scope: {
            label: '@',
            showLabel: '@',
            ngModel: '=',
            ngValue: '=',
            id: '@',
            name: '@',
            inline: '@',
            onChange: '&',
            enabled: '=?'
         },
         templateUrl: 'src/directives/fields/radio-field/radio-field.html',
         compile: function(element, attrs) {
            return {
               pre: function preLink(scope, element, attrs, controller) {
                  scope.radioModel = scope.ngModel;
                  
                  scope.radioValue = scope.ngValue;
                  
                  if (attrs.fieldId) {
                     scope.fieldId = attrs.fieldId;
                  }
                  else {
                     scope.fieldId = attrs.ngValue.replace(/\./g, '_');
                  }
                 
                  if (!attrs.inline) {
                     scope.inline = false;
                  }

                  if (scope.enabled === undefined) {
                     scope.enabled = true;
                  }

                  scope.isDisabled = function() {
                     return !scope.enabled;
                  };
                  
                  scope.fieldName = scope.name;

                  scope.$watch('radioModel', function(val, old) {
                     scope.$eval('ngModel = radioModel');
                  });
                  scope.$watch('ngModel', function(val, old) {
                     scope.radioModel = val;
                  });
                  
                  scope.$watch('radioValue', function(val, old) {
                     scope.$eval('ngValue = radioValue');
                  });
                  scope.$watch('ngValue', function(val, old) {
                     scope.radioValue = val;
                  });
               }
            };
         }
      };
   }]);

   return field;
});




define('zip-and-location-field', [
   'app',
   'parameters-manager',
   'logger',
   'ui-bootstrap',
   'typeahead-watch-changes'
], function(app, parametersManager, Logger) {
   'use strict';

   var asynchLog = Logger.get('AsynchronousModeProfile');

   var zipandlocationfield = app.register.directive('zipandlocationfield', ['$timeout', '$document', function($timeout, $document) {
      return {
         restrict: 'E',
         scope: {
            label: '@',
            model: '=',
            attribute: '@',
            onChange: '&',
            allowEmpty: '@', 
            searchByCountry: '='
         },
         templateUrl: 'src/directives/fields/zip-and-location-field/zip-and-location-field.html',
         controller: ['$scope', 'zipAndLocationService', function($scope, zipAndLocationService) {
            $scope.baseViewParameters = parametersManager.baseViewParameters;

            $scope.zipAndLocationService = zipAndLocationService;
            $scope.testMode = 0;

            // inputTextModel is a fake model to avoid contention between
            // typeahead model and the selection text field.
            // If only one model is used, the text field sets the current
            // typed string, which is only a string while the model is
            // a ZipAndLocation object. When the selection is finished,
            // the right object is assigned to the model.
            $scope.inputTextModel = null;
            $scope.useGeolocatedList = false;
            $scope.geolocatedCities = [];
            $scope.geolocationSearchInProgress = false;
            $scope.displayFailedGeolocationMessage = false;

            //Each time the main model is changed we want to make sure
            //that the inputTextModel gets correctly updated.
            $scope.$watch(function() {
               return $scope.model[$scope.attribute];
            }, function(newValue, oldValue) {
               if (newValue !== oldValue || $scope.inputTextModel === null) {
                  if ($scope.useGeolocatedList) {
                     //If we are showing the geolocation list, we haven't selected an item yet,
                     //so we must use a string as inputTextModel.
                     $scope.inputTextModel = $scope.model[$scope.attribute].zipAndLocation;
                  }
                  else {
                     //When not using geolocation, the inputTextModel must be the correct
                     //object (not just a string).
                     $scope.inputTextModel = $scope.model[$scope.attribute];
                  }
               }
            });

            $scope.resetInputTextModel = function() {
               $scope.inputTextModel = $scope.model[$scope.attribute];
               if ($scope.inputTextModel === undefined) {
                  $scope.searchLocations();
               }
               $scope.useGeolocatedList = false;
            };

            $scope.cancelOnEscape = function(event) {
               if (event.keyCode === 27) {
                  $scope.resetInputTextModel();
               }
            };

            $scope.onSelect = function($model) {
               if ($model === "" && $scope.allowEmpty) {
                  $scope.model[$scope.attribute] = null;
               }
               else {
                  $scope.model[$scope.attribute] = $model;
               }
               $scope.onChange();
               $scope.useGeolocatedList = false;
            };

            $scope.searchLocations = function(viewValue) {
               if (viewValue === "testGeoLocation1") {
                  $scope.testMode = 1;
               }

               if (viewValue === "testGeoLocation2") {
                  $scope.testMode = 2;
               }

               if (viewValue === "testGeoLocation3") {
                  $scope.testMode = 3;
               }

               if (viewValue === "testGeoLocation4") {
                  $scope.testMode = 4;
               }

               if ($scope.useGeolocatedList) {
                  $scope.useGeolocatedList = false;
                  return $scope.geolocatedCities;
               }
               $scope.displayFailedGeolocationMessage = false;

               return zipAndLocationService.searchLocations(viewValue, $scope.searchByCountry).then(function(result) {
                  asynchLog.debug("result = " + JSON.stringify(result));
                  return result;
               });
            };


            //GEOLOCATION
            $scope.hasLocalizationSupport = function() {
               return navigator.geolocation && $scope.baseViewParameters.useGeoLocation;
            };

            $scope.getCity = function(position) {
               if (!$scope.geolocationSearchInProgress) {
                  return;
               }
               var lat = position.coords.latitude;
               var long = position.coords.longitude;

               if ($scope.testMode === 1) {
                  // Schaffhausen
                  lat = 47.7; long = 8.633333;
               }

               if ($scope.testMode === 2) {
                  // Zurich
                  lat = 47.366667; long = 8.55;
               }

               if ($scope.testMode === 3) {
                  // Kamchatka
                  lat = 57.0; long = 160.0;
               }

               if ($scope.testMode === 4) {
                  // Vaduz
                  lat = 47.140; long = 9.514;
               }

               return zipAndLocationService.searchLocationsAround(lat, long, 8, $scope.searchByCountry).then(function(cities) {
                  $scope.geolocationSearchInProgress = false;
                  if (cities.length === 0) {
                     $scope.displayFailedGeolocationMessage = true;
                  }
                  else if (cities.length === 1) {
                     $timeout(function() {
                        $scope.onSelect(cities[0]);
                        $scope.resetInputTextModel();
                     });
                  }
                  else {
                     //workaround: it force to display the list even if the zipandlocation text doesn't change
                     $timeout(function() {
                        $scope.theInput.focus();
                        $scope.model[$scope.attribute] = cities[0];
                        $scope.onChange();
                        $scope.useGeolocatedList = true;
                        $scope.geolocatedCities = cities;
                        var text = cities[0].zipAndLocation;
                        $scope.inputTextModel = text;//cities[0];
                     });
                  }
               });
            };

            $scope.errorOnLocation = function() {
               //do something
               $scope.geolocationSearchInProgress = false;
               $scope.displayFailedGeolocationMessage = true;
               return null;
            };

            $scope.geolocationSearchTimedOut = function() {
               if ($scope.geolocationSearchInProgress) {
                  $scope.geolocationSearchInProgress = false;
                  $scope.displayFailedGeolocationMessage = true;
               }
            };

            $scope.getLocation = function() {
               $scope.geolocationSearchInProgress = true;
               $timeout($scope.geolocationSearchTimedOut, 10000);
               navigator.geolocation.getCurrentPosition($scope.getCity, $scope.errorOnLocation);
            };

            $scope.isDisabled = function() {
               return $scope.geolocationSearchInProgress;
            };

            $scope.showMessage = function() {
               return $scope.displayFailedGeolocationMessage;
            };

            $scope.getButtonBackground = function() {
               if ($scope.geolocationSearchInProgress) {
                  return "localization-inprogress-background";
               }
               return "icon-map-marker";
            };

            // Keeps the active element visible
            $scope.keepActiveListItemVisible = function(element, activeIdx) {
               if (activeIdx === -1) {
                  return;
               }

               var ul = element.find('ul.dropdown-menu')[0];

               if (ul === undefined) {
                  // the popup has not been open yet
                  return;
               }

               var someLi = element.find('ul.dropdown-menu li')[0];

               if (someLi === undefined) {
                  // the popup has not been open yet
                  return;
               }

               var rowHeight = someLi.clientHeight;
               var optionTop = activeIdx * rowHeight;
               var optionBottom = optionTop + rowHeight;
               var ulHeight = ul.offsetHeight;
               if (optionBottom > ul.scrollTop + ulHeight) {
                  ul.scrollTop = (activeIdx - 8 + 1) * rowHeight;
               }
               if (optionTop < ul.scrollTop) {
                  ul.scrollTop = optionTop;
               }
            };

            $scope.resetInputTextModel();
         }],
         compile: function(element, attrs) {
            return {
               pre: function preLink(scope, element, attrs, controller) {
                  // adds an id based on the model attribute, for easier identification from tests
                  scope.fieldId = attrs.model.replace(/\./g, '_') + "_" + attrs.attribute;
               },
               post: function postLink(scope, element, attrs, controller) {
                  // in case of wrong input, resets the input model to a previously valid value (on blur)
                  // WARNING: it relies on the usage of $timeout to let a possible selection in the matches list win over the model reset
                  var input = element.find('input');
                  scope.theInput = input;

                  var getInputValue = function() {
                     if (typeof scope.inputTextModel === "string") {
                        return scope.inputTextModel;
                     }
                     else {
                        if (scope.inputTextModel === null) {
                           return "";
                        }
                        else {
                           return scope.inputTextModel.zipAndLocation;
                        }
                     }
                  };

                  var modelIsValid = function() {
                     if (scope.allowEmpty && getInputValue() === "") {
                        return true;
                     }

                     if (scope.model[scope.attribute] === null) {
                        return false;
                     }

                     if (getInputValue() !== scope.model[scope.attribute].zipAndLocation) {
                        return false;
                     }

                     return true;
                  };

                  input.on('focus', function (event) {
                     $timeout(function() {
                        if (input[0].id === document.activeElement.id) {
                           input.select();
                        }
                     });
                  });

                  input.on('blur', function (event) {
                     scope.useGeolocatedList = false;

                     if (scope.allowEmpty && getInputValue() === "") {
                        scope.$apply(function() {
                           scope.onSelect("");
                        });
                     }

                     if (!modelIsValid()) {
                        // check if the user typed something good enough to match a valid and unique selection
                        scope.searchLocations(getInputValue()).then(function(locations) {
                           if (locations.length === 1) {
                              // if valid and unique, accept it
                              $timeout(function() {
                                 scope.onSelect(locations[0]);
                                 scope.resetInputTextModel();
                              });
                           }
                           else {
                              // if not valid, set a timeout: perhaps the focus was lost because the user selected an option from the typeahead popup
                              $timeout(function() {
                                 // check again after the timeout and possible selection from the typeahead popup
                                 if (!modelIsValid()) {
                                    // if the value is still invalid, reset to previous valid
                                    scope.resetInputTextModel();
                                 }
                              }, 250, true);
                           }
                        });
                     }
                  });

                  // WARNING: Using $$childHead as the only way to watch stuff from the typeahead directive
                  scope.$$childHead.$watch('activeIdx', function(activeIdx) {
                     scope.keepActiveListItemVisible(element, activeIdx);
                  });

                  // WARNING: Using $$childHead as the only way to touch stuff from the typeahead directive
                  // The following is a copy of the typeahead's resetMatches method.
                  // It's used to close the popup when the user goes somewhere else outside the zip and location field
                  var resetMatches = function() {
                    scope.$$childHead.matches = [];
                    scope.$$childHead.activeIdx = -1;
                    input.attr('aria-expanded', false);
                  };

                  // The following is a copy of the typeahead's dismissClickHandler method,
                  // just that it handles the mousedown event instead of the click event.
                  // Some elements like the numeric slider do not trigger a click event (because there's drag happening, not a click).
                  // Resets the matches so the popup is closed.
                  var dismissMouseDownHandler = function(evt) {
                     if (!element[0].contains(evt.target)) {
                        resetMatches();
                        scope.$digest();
                     }
                  };

                  $document.bind('mousedown', dismissMouseDownHandler);

                  scope.$on('$destroy', function() {
                     $document.unbind('mousedown', dismissMouseDownHandler);
                  });
               }
            };
         }
      };
   }]);

   return zipandlocationfield;
});


define('multicalc-controller', [
   'app',
   'theme-manager',
   'parameters-manager',
   'multicalc-model',
   'logger',
   'multicalc-state',
   'localization',
   'base-state',
   'base-controller',
   'multicalc-risk',
   'model-constants',
   'enums-constants',
   'calculation-header',
   'link-to-view',
   'fancy-box',
   'tab-selector-link',
   'numeric-field',
   'slider-field',
   'selection-field',
   'result-summary-box',
   'base-data-summary',
   'table-row',
   'table-row-list',
   'rpopulaires-calculator',
   'storage-manager',
   'checkbox-field',
   'log-statistics-service',
   'topic-chooser',
   'topic-link',
   'topic-panel',
   'two-tab-field',
   'edit-dialog-box',
   'calculators-manager',
   'multicalc-personal-data',
   'radio-field',
   'zip-and-location-field'
], function(app, ThemeManager, parametersManager, model, Logger) {
   'use strict';
   
   var log = Logger.get('Multicalc');
   var asynchLog = Logger.get('AsynchronousModeProfile');
   
   app.register.controller('multicalcController', ['$scope', '$injector', 'localize', 'multicalcState',
      'baseState', 'rpopulairesCalculator', 'zipAndLocationService',
      function($scope, $injector, localize, multicalcState,
               baseState, rpopulairesCalculator, zipAndLocationService) {
         
         initializeBaseController();
         initializeCivilStatus();
         initializeScope();
         initializeComponents();
         initializeCalculate();
         initializeCharts();
         initializeRefreshHandlers();
         
         $scope.calculate();
         
         initializeInitiallyFocusedElement();
         
         $scope.start();
         
         // ***************************
         // **** SUPPORT FUNCTIONS ****
         // ***************************
         
         function initializeBaseController() {
            // inject base behaviour
            $scope.controllerName = 'multicalc';
            $injector.invoke(['$controller', function ($controller) {
               $controller('baseController', {$scope: $scope});
            }]);

            var themeManager = new ThemeManager();
            themeManager.setTheme('multicalc');
         }
         
         function initializeCivilStatus() {
            $scope.isSingle = function() {
               return $scope.base.mainPerson.civilStatus === CivilStatus.SINGLE;
            };
            
            $scope.isMarried = function() {
               return $scope.base.mainPerson.civilStatus === CivilStatus.MARRIED;
            };
            
            $scope.isConcubinage = function() {
               return $scope.base.mainPerson.civilStatus === CivilStatus.SINGLE_IN_CONCUBINAGE;
            };
         }

         function initializeScopeData() {
            $scope.data = {
               maxMonthlySavingCapacity: null,
               maxNeed: Infinity
            };
         }

         function initializeScope() {
            $scope.onReady = function() {
               asynchLog.debug("DRAWING...");
               $scope.forceActiveChartDraw();
            };
            
            if (!$scope.data) {
               initializeScopeData();
            }
            
            $scope.onBeforeNewConsulting = function() {
               initializeScopeData();
            };
            
            $scope.baseModelParameters = parametersManager.baseModelParameters;
            $scope.baseViewParameters = parametersManager.baseViewParameters;
            $scope.baseApplicationParameters = parametersManager.baseApplicationParameters;
            
            $scope.onModelSetup = function() {
               if ($scope.scenario.age === null) {
                  $scope.scenario.age = parametersManager.baseModelParameters.mainPersonAge;
               }

               if ($scope.base.mainPerson.civilStatus === null) {
                  $scope.base.mainPerson.civilStatus = parametersManager.baseModelParameters.civilStatus;
               }

               if ($scope.base.mainPerson.sex === null) {
                  $scope.base.mainPerson.sex = $scope.baseModelParameters.mainPersonSex;
               }
               
               if ($scope.base.mainPerson.grossIncome === null) {
                  $scope.base.mainPerson.grossIncome = parametersManager.baseModelParameters.grossIncome;
               }

               $scope.data.maxNeed = $scope.base.mainPerson.grossIncome;

               if ($scope.scenario.disabilityNeed === null) {
                  $scope.scenario.disabilityNeed = $scope.base.mainPerson.grossIncome * parametersManager.baseModelParameters.disabilityNeedPercentage / 100;
               }

               if ($scope.scenario.deathNeed === null) {
                  $scope.scenario.deathNeed = $scope.base.mainPerson.grossIncome * parametersManager.baseModelParameters.deathNeedPercentage / 100;
               }
               
               if ($scope.scenario.interestRate === null) {
                  // $scope.scenario.interestRate = $scope.scenario.selectedInvestment.interest;
                  $scope.scenario.interestRate = parametersManager.baseModelParameters.interestRate;
               }

               if ($scope.base.hasDetailedNumberOfChildren === null) {
                  $scope.base.hasDetailedNumberOfChildren = false;
               }
               if ($scope.base.numberOfChildren === null) {
                  $scope.base.numberOfChildren = parametersManager.baseModelParameters.numberOfChildren;
               }
               
               if ($scope.base.currentFortune === null) {
                  $scope.base.currentFortune = 0;
               }
               
               if ($scope.base.pensionInterest === null) {
                  $scope.base.pensionInterest = 0;
               }
               
               if ($scope.base.yearlySavings === null) {
                  $scope.base.yearlySavings = 0;
               }

               if ($scope.base.zipAndLocation === null) {
                  $scope.addPrePromise(zipAndLocationService.searchMoreImportantLocationPromise(zipAndLocationService.getActiveCountryLocationDefault()).then(function (zipAndLocationResult) {
                     //ask again in order to avoid override of another promise result
                     if ($scope.base.zipAndLocation === null) {
                        $scope.base.zipAndLocation = zipAndLocationResult;
                     }
                  }));
               }

               if ($scope.scenario.professionalStatus === null) {
                  $scope.scenario.professionalStatus = parametersManager.baseModelParameters.professionalStatus;
               }

               if ($scope.scenario.professionalStatus !== ProfessionalStatus.SELF_EMPLOYEE_NO_SECOND_PILLAR_INSURED) {
                  $scope.data.maxMonthlySavingCapacity = $scope.max3aPremiumWithBVG / 12;
               }
               else {
                  $scope.data.maxMonthlySavingCapacity = $scope.max3aPremiumWithoutBVG / 12;
               }

               if ($scope.scenario.monthlySavingCapacity === null) {
                  $scope.scenario.monthlySavingCapacity = $scope.data.maxMonthlySavingCapacity;
               }
               
               // later, if required: call rpopulairesCalculator.getTaxBaseInfo() to display the tax information
            };
            
            $scope.addInitialPromise(rpopulairesCalculator.getMax3aPremiumWithBVG().then(function (max3aPremiumWithBVG) {
               $scope.max3aPremiumWithBVG = max3aPremiumWithBVG;
            }));

            $scope.addInitialPromise(rpopulairesCalculator.getMax3aPremiumWithoutBVG().then(function (max3aPremiumWithoutBVG) {
               $scope.max3aPremiumWithoutBVG = max3aPremiumWithoutBVG;
            }));
            
            $scope.scenario = multicalcState.get();
            $scope.base = baseState;
            
            $scope.result = new model.MulticalcResult();   
         }
         
         function initializeComponents() {
            $scope.standardDisability = $scope.createBridge();
            $scope.standardSaving3a = $scope.createBridge();
            $scope.standardDeath = $scope.createBridge();

            $scope.onIncomeChanged = function() {
               $scope.data.maxNeed = $scope.base.mainPerson.grossIncome;

               if ($scope.scenario.disabilityNeed > $scope.data.maxNeed) {
                  $scope.scenario.disabilityNeed = $scope.data.maxNeed;
               }

               if ($scope.scenario.deathNeed > $scope.data.maxNeed) {
                  $scope.scenario.deathNeed = $scope.data.maxNeed;
               }

               $scope.calculate();
            };

            $scope.onProfessionalStatusChanged = function() {
               if ($scope.scenario.professionalStatus !== ProfessionalStatus.SELF_EMPLOYEE_NO_SECOND_PILLAR_INSURED) {
                  $scope.data.maxMonthlySavingCapacity = $scope.max3aPremiumWithBVG / 12;
               }
               else {
                  $scope.data.maxMonthlySavingCapacity = $scope.max3aPremiumWithoutBVG / 12;
               }

               if ($scope.scenario.monthlySavingCapacity > $scope.data.maxMonthlySavingCapacity) {
                  $scope.scenario.monthlySavingCapacity = $scope.data.maxMonthlySavingCapacity;
               }

               $scope.calculate();
            };
         }

         function initializeCharts() {
            $scope.onRefresh = function() {
               if ($scope.data.saving3aActive) {
                   $scope.getBridges().Saving3a.update();
               }
               if ($scope.data.disabilityActive) {
                   $scope.getBridges().Disability.update();
               }
               if ($scope.data.deathActive) {
                   $scope.getBridges().Death.update();
               }
            };
            
            $scope.getVisibleRefreshHandlers = function() {
               var allVisibleRefreshHandlers = [];

               $scope.data.saving3aActive = true;
               $scope.data.disabilityActive = true;
               $scope.data.deathActive = true;
               
               if ($scope.data.saving3aActive) {
                  Array.prototype.push.apply(allVisibleRefreshHandlers, $scope.standardSaving3a.getVisibleRefreshHandlers());
                  // $scope.data.saving3aActive = false;
               }
               if ($scope.data.disabilityActive) {
                  Array.prototype.push.apply(allVisibleRefreshHandlers, $scope.standardDisability.getVisibleRefreshHandlers());
                  // $scope.data.disabilityActive = false;
               }
               if ($scope.data.deathActive) {
                  Array.prototype.push.apply(allVisibleRefreshHandlers, $scope.standardDeath.getVisibleRefreshHandlers());
                  // $scope.data.deathActive = false;
               }

               return allVisibleRefreshHandlers;
            };
            
            $scope.onActiveChartRedraw = function() {
               if ($scope.data.saving3aActive) {
                   $scope.getBridges().Saving3a.forceDraw();
               }
               if ($scope.data.disabilityActive) {
                   $scope.getBridges().Disability.forceDraw();
               }
               if ($scope.data.deathActive) {
                   $scope.getBridges().Death.forceDraw();
               }
            };

         }
         
         function initializeRefreshHandlers() {
            log.debug("initializeRefreshHandlers");
            $scope.getBridges = function() {
                var bridges = {
                    'Saving3a': $scope.standardSaving3a,
                    'Disability': $scope.standardDisability,
                    'Death': $scope.standardDeath
                };
                return bridges;
            };
            
         }
         
         function initializeCalculate() {  
            $scope.doCalculate = function(callback) {
               var dataSparen = {
                   year: new Date().getFullYear(),
                   union: $scope.base.mainPerson.civilStatus,
                   gender: $scope.base.mainPerson.sex,
                   age: $scope.scenario.age,
                   children: $scope.base.numberOfChildren,
                   income: $scope.base.mainPerson.grossIncome,
                   is_empl: $scope.scenario.professionalStatus === ProfessionalStatus.EMPLOYEE,
                   has_bvg: $scope.scenario.professionalStatus !== ProfessionalStatus.SELF_EMPLOYEE_NO_SECOND_PILLAR_INSURED,
                   locality: $scope.base.zipAndLocation.id,
                   premium: $scope.scenario.monthlySavingCapacity * 12,
                   interest: $scope.scenario.interestRate,
                   consumption: $scope.baseModelParameters.consumptionDuration
               };

               var dataRisk = {
                   year: new Date().getFullYear(),
                   union: $scope.base.mainPerson.civilStatus,
                   gender: $scope.base.mainPerson.sex,
                   age: $scope.scenario.age,
                   children:  $scope.base.numberOfChildren,
                   income: $scope.base.mainPerson.grossIncome,
                   is_empl: $scope.scenario.professionalStatus === ProfessionalStatus.EMPLOYEE,
                   has_bvg: $scope.scenario.professionalStatus !== ProfessionalStatus.SELF_EMPLOYEE_NO_SECOND_PILLAR_INSURED,
                   need_disab: $scope.scenario.disabilityNeed,
                   need_death: $scope.scenario.deathNeed
               };

               $scope.requestCalculations([
                  rpopulairesCalculator.calcSparenJSON(dataSparen),
                  rpopulairesCalculator.calcRisikoJSON(dataRisk)
               ],
               function(values) {
                  var sparenResultString = values[0];
                  var riskResultString = values[1];

                  var sparenResult = JSON.parse(sparenResultString);
                  var riskResult = JSON.parse(riskResultString);

                  $scope.result.saving3a.taxSavings = sparenResult.tax_gain_sum;
                  $scope.result.saving3a.interest = sparenResult.yield_sum;
                  $scope.result.saving3a.savings = sparenResult.deposit_sum;
                  $scope.result.saving3a.capitalizationTax = sparenResult.capital_tax;
                  $scope.result.saving3a.grossCapital = sparenResult.capital_gross;
                  $scope.result.saving3a.netCapital = sparenResult.capital_net;
                  $scope.result.saving3a.netYield = sparenResult.yield_net;
                  $scope.result.saving3a.duration = sparenResult.duration;
                  $scope.result.saving3a.taxSavingsSet = $scope.getSet($scope.result.saving3a.taxSavings, $scope.result.saving3a.duration);
                  $scope.result.saving3a.savingsSet = $scope.getSet($scope.result.saving3a.savings, $scope.result.saving3a.duration);
                  $scope.result.saving3a.interestSet = $scope.getSet($scope.result.saving3a.interest, $scope.result.saving3a.duration);

                  $scope.result.disability.firstPillarRent = riskResult.disab_iv;
                  $scope.result.disability.secondPillarRent = riskResult.disab_bvg;
                  $scope.result.disability.benefits = riskResult.disab_sum;
                  $scope.result.disability.gap = riskResult.disab_miss;

                  $scope.result.death.firstPillarRent = riskResult.death_ahv;
                  $scope.result.death.secondPillarRent = riskResult.death_bvg;
                  $scope.result.death.benefits = riskResult.death_sum;
                  $scope.result.death.gap = riskResult.death_miss;

                  $scope.finishCalculation();
               });        
               asynchLog.debug("END OF CALCULATE");
            };

            $scope.getSet = function (total, duration) {
                var result = total / duration;
                var set = [];
                for (var index = 0; index <= duration; index++) {
                    set[index] = result * index;
                }
                return set;
            };
         }

         function initializeInitiallyFocusedElement() {
            $scope.initiallyFocusedElement = function() {
               return "#sex_female";
            };
         }
      }]);
});

