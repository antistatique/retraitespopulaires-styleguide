define([
   'common-localization'
], function(Localization) {
   'use strict';
   
   describe("Localization", function() {
      var groupDelimiter = "'";
      var amountDecimalDelimiter = ".";
      var percentageDecimalDelimiter = ",";
      var useMixedGroupingSeparator = false;

      it("answers a dummy text in case of no enums", function() {
         var enums = {
         };
      
         var localization = new Localization(enums, groupDelimiter, amountDecimalDelimiter, percentageDecimalDelimiter, useMixedGroupingSeparator);

         expect(localization.getLocalizedString('TestEnum', 'Income')).toBe('@Income');
         expect(localization.getLocalizedString('AnotherEnum', 'Fortune')).toBe('@Fortune');
      });

      it("answers a dummy text in case of an empty enum", function() {
         var enums = {
            "Test" : {
            }
         };

         var localization = new Localization(enums, groupDelimiter, amountDecimalDelimiter, percentageDecimalDelimiter, useMixedGroupingSeparator);

         expect(localization.getLocalizedString('Test', 'Income')).toBe('@Income');
         expect(localization.getLocalizedString('Test', 'Fortune')).toBe('@Fortune');
      });

      it("answers a dummy text in case of missing translation", function() {
         var enums = {
            "Test" : {
               "Income" : "Einkommen"
            }
         };

         var localization = new Localization(enums, groupDelimiter, amountDecimalDelimiter, percentageDecimalDelimiter, useMixedGroupingSeparator);

         expect(localization.getLocalizedString('Test', 'Fortune')).toBe('@Fortune');
      });

      it("answers a correctly translated text for a simple enum", function() {
         var enums = {
            Test : {
               "Income" : {"number" : "1", "shortValue" : "", "longValue" : "Einkommen"}
            }
         };
         

         var localization = new Localization(enums, groupDelimiter, amountDecimalDelimiter, percentageDecimalDelimiter, useMixedGroupingSeparator);

         expect(localization.getLocalizedString('Test', 'Income')).toBe('Einkommen');
      });

      it("answers translated texts from a single enum with multiple keys", function() {
         var enums = {
            "Test" : {
               "Income" : {"number" : "1", "shortValue" : "", "longValue" : "Einkommen"},
               "Fortune" : {"number" : "2", "shortValue" : "", "longValue" : "Vermögen"},
               "I like cats" : {"number" : "3", "shortValue" : "", "longValue" : "Ich mag Katzen"}
            }
         };

         var localization = new Localization(enums, groupDelimiter, amountDecimalDelimiter, percentageDecimalDelimiter, useMixedGroupingSeparator);

         expect(localization.getLocalizedString('Test', 'Income')).toBe('Einkommen');
         expect(localization.getLocalizedString('Test', 'Fortune')).toBe('Vermögen');
         expect(localization.getLocalizedString('Test', 'I like cats')).toBe('Ich mag Katzen');
         expect(localization.getLocalizedString('Test', 'Whatever')).toBe('@Whatever');
      });

      it("answers translated texts from enums with multiple keys", function() {
         var enums = {
            "Fruit" : {
               "apple" : {"number" : "1", "shortValue" : "", "longValue" : "Apfel"},
               "lemon" : {"number" : "2", "shortValue" : "", "longValue" : "Zitrone"},
               "tomato" : {"number" : "3", "shortValue" : "", "longValue" : "Tomate"}
            },
            "Color" : {
               "red" : {"number" : "1", "shortValue" : "", "longValue" : "rot"},
               "blue" : {"number" : "2", "shortValue" : "", "longValue" : "blau"},
               "yellow" : {"number" : "3", "shortValue" : "", "longValue" : "gelb"}
            }
         };

         var localization = new Localization(enums, groupDelimiter, amountDecimalDelimiter, percentageDecimalDelimiter, useMixedGroupingSeparator);

         expect(localization.getLocalizedString('Fruit', 'apple')).toBe('Apfel');
         expect(localization.getLocalizedString('Fruit', 'lemon')).toBe('Zitrone');
         expect(localization.getLocalizedString('Fruit', 'tomato')).toBe('Tomate');
         expect(localization.getLocalizedString('Color', 'red')).toBe('rot');
         expect(localization.getLocalizedString('Color', 'blue')).toBe('blau');
         expect(localization.getLocalizedString('Color', 'yellow')).toBe('gelb');
      });

      it("fills placeholders", function() {
         var enums = {
            "Placeholder" : {
               "Like" : {"number" : "1", "shortValue" : "", "longValue" : "Ich mag <ETWAS>"},
               "Dislike" : {"number" : "2", "shortValue" : "", "longValue" : "Ich mag <ETWAS_ANDERES> nicht"}
            }
         };

         var localization = new Localization(enums, groupDelimiter, amountDecimalDelimiter, percentageDecimalDelimiter, useMixedGroupingSeparator);

         expect(localization.getLocalizedString('Placeholder', 'Like', { 'ETWAS' : 'Katzen' })).toBe('Ich mag Katzen');
         expect(localization.getLocalizedString('Placeholder', 'Dislike', { 'ETWAS_ANDERES' : 'Blumen' })).toBe('Ich mag Blumen nicht');
      });

      it("fills several placeholders", function() {
         var enums = {
            "ManyPlaceholders" : {
               "EatingAndDrinking" : {"number" : "1", "shortValue" : "", "longValue" : "Ich esse <FOOD> und trinke <BEVERAGE>"},
               "DoingALot" : {"number" : "2", "shortValue" : "", "longValue" : "Ich esse <FOOD>, trinke <BEVERAGE> und schreibe <TEXT>"}
            }
         };

         var localization = new Localization(enums, groupDelimiter, amountDecimalDelimiter, percentageDecimalDelimiter, useMixedGroupingSeparator);

         expect(localization.getLocalizedString('ManyPlaceholders', 'EatingAndDrinking', { 'FOOD' : 'Schokolade', 'BEVERAGE' : 'Bier' }))
                 .toBe('Ich esse Schokolade und trinke Bier');
         expect(localization.getLocalizedString('ManyPlaceholders', 'DoingALot', { 'FOOD' : 'Bratwurst', 'BEVERAGE' : 'Wein', 'TEXT' : 'Briefe' }))
                 .toBe('Ich esse Bratwurst, trinke Wein und schreibe Briefe');
      });

      it("fills several placeholders in any order", function() {
         var enums = {
            "ManyPlaceholders" : {
               "EatingAndDrinking" : {"number" : "1", "shortValue" : "", "longValue" : "Ich esse <FOOD> und trinke <BEVERAGE>"},
               "DoingALot" : {"number" : "2", "shortValue" : "", "longValue" : "Ich schreibe <TEXT>, esse <FOOD> und trinke <BEVERAGE>"}
            }
         };

         var localization = new Localization(enums, groupDelimiter, amountDecimalDelimiter, percentageDecimalDelimiter, useMixedGroupingSeparator);

         expect(localization.getLocalizedString('ManyPlaceholders', 'EatingAndDrinking', { 'BEVERAGE' : 'Bier', 'FOOD' : 'Schokolade' }))
                 .toBe('Ich esse Schokolade und trinke Bier');
         expect(localization.getLocalizedString('ManyPlaceholders', 'DoingALot', { 'BEVERAGE' : 'Wein', 'TEXT' : 'Briefe', 'FOOD' : 'Bratwurst' }))
                 .toBe('Ich schreibe Briefe, esse Bratwurst und trinke Wein');
      });

      it("fills several placeholders with similar names", function() {
         var enums = {
            "SimilarPlaceHolders" : {
               "SingleAndPlural" : {"number" : "1", "shortValue" : "", "longValue" : "Ich habe einen <ANIMAL> und er hat viele <ANIMALS>"},
               "PluralAndSingular" : {"number" : "2", "shortValue" : "", "longValue" : "Ich habe viele <ANIMALS> und er hat einen <ANIMAL>"},
               "Extending" : {"number" : "3", "shortValue" : "", "longValue" : "1: <TEXT>, 2: <TEXT_LONGER>, 3: <TEXT_LONGER_THAN_EVERYTHING_ELSE>"},
               "Reducing" : {"number" : "4", "shortValue" : "", "longValue" : "1: <TEXT_LONGER_THAN_EVERYTHING_ELSE>, 2: <TEXT_LONGER>, 3: <TEXT>"}
            }
         };

         var localization = new Localization(enums, groupDelimiter, amountDecimalDelimiter, percentageDecimalDelimiter, useMixedGroupingSeparator);

         expect(localization.getLocalizedString('SimilarPlaceHolders', 'SingleAndPlural', { 'ANIMAL' : 'Hund', 'ANIMALS' : 'Hunde' }))
                 .toBe('Ich habe einen Hund und er hat viele Hunde');
         expect(localization.getLocalizedString('SimilarPlaceHolders', 'PluralAndSingular', { 'ANIMAL' : 'Hund', 'ANIMALS' : 'Hunde' }))
                 .toBe('Ich habe viele Hunde und er hat einen Hund');
         expect(localization.getLocalizedString('SimilarPlaceHolders', 'Extending', { 'TEXT' : 'Text', 'TEXT_LONGER' : 'Longer', 'TEXT_LONGER_THAN_EVERYTHING_ELSE' : 'Longest' }))
                 .toBe('1: Text, 2: Longer, 3: Longest');
         expect(localization.getLocalizedString('SimilarPlaceHolders', 'Reducing', { 'TEXT' : 'Text', 'TEXT_LONGER' : 'Longer', 'TEXT_LONGER_THAN_EVERYTHING_ELSE' : 'Longest' }))
                 .toBe('1: Longest, 2: Longer, 3: Text');
      });

      it("supports placeholders inside placeholders", function() {
         var enums = {
            "GenericFormats" : {
               "XAmount" :     {"number" : "1", "shortValue" : "", "longValue" : "<VALUE>"},
               "XRate" : {"number" : "2", "shortValue" : "", "longValue" : "<VALUE>%"}
            },
            "PlaceHoldersWithPlaceHolders" : {
               "AmountWithDecimals" :     {
                  "number" : "1",
                  "shortValue" : "",
                  "longValue" : "The value is <VALUE|currency:<DECIMALS>> and the other value is <ANOTHER_VALUE|currency:<ANOTHER_DECIMALS>>."},
               "PercentageWithDecimals" : {
                  "number" : "2",
                  "shortValue" : "",
                  "longValue" : "The value is <VALUE|percentage:<DECIMALS>> and the other value is <ANOTHER_VALUE|percentage:<ANOTHER_DECIMALS>>."},
               "Mixed" :                  {
                  "number" : "3",
                  "shortValue" : "",
                  "longValue" : "The value is <VALUE|currency:<DECIMALS>> and the other value is <ANOTHER_VALUE|percentage:<ANOTHER_DECIMALS>>."},
               "Recursive" :              {
                  "number" : "3",
                  "shortValue" : "",
                  "longValue" : "Watch this: <SEVERAL<LEVELS<OF<PLACEHOLDERS>>>>"}
            }
         };

         var localization = new Localization(enums, groupDelimiter, amountDecimalDelimiter, percentageDecimalDelimiter, useMixedGroupingSeparator);

         expect(localization.getLocalizedString('PlaceHoldersWithPlaceHolders', 'AmountWithDecimals', { 'VALUE' : 1.23, 'DECIMALS' : 1, 'ANOTHER_VALUE' : 2.345, 'ANOTHER_DECIMALS' : 3 }))
                 .toBe('The value is 1.2 and the other value is 2.345.');
         expect(localization.getLocalizedString('PlaceHoldersWithPlaceHolders', 'PercentageWithDecimals', { 'VALUE' : 1.23, 'DECIMALS' : 1, 'ANOTHER_VALUE' : 2.345, 'ANOTHER_DECIMALS' : 3 }))
                 .toBe('The value is 1,2% and the other value is 2,345%.');
         expect(localization.getLocalizedString('PlaceHoldersWithPlaceHolders', 'Mixed', { 'VALUE' : 1.23, 'DECIMALS' : 1, 'ANOTHER_VALUE' : 2.345, 'ANOTHER_DECIMALS' : 3 }))
                 .toBe('The value is 1.2 and the other value is 2,345%.');
         expect(localization.getLocalizedString('PlaceHoldersWithPlaceHolders', 'Recursive', { 'PLACEHOLDERS' : 'X', 'OFX' : 'Y', 'LEVELSY' : 'Z', 'SEVERALZ' : 'nice, isn\'t it?' }))
                 .toBe('Watch this: nice, isn\'t it?');
      });

      it("fills placeholders with formatting", function() {
         var enums = {
            "GenericFormats" : {
               "XAmount" :     {"number" : "1", "shortValue" : "", "longValue" : "<VALUE>"},
               "XRate" : {"number" : "2", "shortValue" : "", "longValue" : "<VALUE>%"}
            },
            "Formatting" : {
               "IncomeAndFortune" : {"number" : "4", "shortValue" : "", "longValue" : "Einkommen: <Income|currency>, Fortune: <Fortune|currency>"},
               "Change" : {"number" : "4", "shortValue" : "", "longValue" : "Änderung: <Change|currency>"}
            }
         };

         var localization = new Localization(enums, groupDelimiter, amountDecimalDelimiter, percentageDecimalDelimiter, useMixedGroupingSeparator);

         expect(localization.getLocalizedString('Formatting', 'IncomeAndFortune', { 'Fortune' : 9876543, 'Income' : 123456 }))
                 .toBe('Einkommen: 123\'456, Fortune: 9\'876\'543');
         expect(localization.getLocalizedString('Formatting', 'Change', { 'Change' : -12345 }))
                 .toBe('Änderung: -12\'345');
      });

      it("answers a localized enum description", function() {
         var CivilStatus = {};
         CivilStatus.SINGLE = 2;
         CivilStatus.SINGLE_IN_CONCUBINAGE = 3;
         CivilStatus.MARRIED = 4;
         CivilStatus.REGISTERED_PARTNERSHIP = 7;

         var enums = {
            "CivilStatus" : {
               "Single" : {"number" : "2", "shortValue" : "", "longValue" : "alleinstehend"},
               "Single_In_Concubinage" : {"number" : "3", "shortValue" : "", "longValue" : "alleinstehend im Konkubinat"},
               "Married" : {"number" : "4", "shortValue" : "", "longValue" : "verheiratet"},
               "Registered_Partnership" : {"number" : "7", "shortValue" : "", "longValue" : "eingetragene Partnerschaft"}
            }
         };

         var localization = new Localization(enums, groupDelimiter, amountDecimalDelimiter, percentageDecimalDelimiter, useMixedGroupingSeparator);
         
         expect(localization.getLocalizedEnumDescriptionByNumber('CivilStatus', CivilStatus.MARRIED)).toBe('verheiratet');
         expect(localization.getLocalizedEnumDescriptionByNumber('CivilStatus', CivilStatus.SINGLE)).toBe('alleinstehend');
         expect(localization.getLocalizedEnumDescriptionByNumber('CivilStatus', CivilStatus.SINGLE_IN_CONCUBINAGE)).toBe('alleinstehend im Konkubinat');
         expect(localization.getLocalizedEnumDescriptionByNumber('CivilStatus', CivilStatus.REGISTERED_PARTNERSHIP)).toBe('eingetragene Partnerschaft');
      });
   });
});
