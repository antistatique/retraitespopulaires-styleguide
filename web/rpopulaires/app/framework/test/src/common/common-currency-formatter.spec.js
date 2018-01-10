define([
   'common-currency-formatter'
], function(CurrencyFormatter) {
   'use strict';

   describe("CurrencyFormatter Suite", function() {

      function testParseNumberWithDecimals(currencyFormatter, decimalSeparator) {
         var testCases = [
            { stringValue: "0",             numericValue: 0 },
            { stringValue: "0.0",           numericValue: 0 },
            { stringValue: "1",             numericValue: 1 },
            { stringValue: "1.0",           numericValue: 1 },
            { stringValue: "123.45",        numericValue: 123.45 },
            { stringValue: "123.456789",    numericValue: 123.456789 },
            { stringValue: "010101.010101", numericValue: 10101.010101 },
            { stringValue: "0101010.10101", numericValue: 101010.10101 },
            { stringValue: "0000000.00001", numericValue: 0.00001 },
            { stringValue: ".999999999999", numericValue: 0.999999999999 },
            { stringValue: "9.99999999999", numericValue: 9.99999999999 },
            { stringValue: "9.9999",        numericValue: 9.9999 },

            { stringValue: "-0",             numericValue: 0 },
            { stringValue: "-0.0",           numericValue: 0 },
            { stringValue: "-1",             numericValue: -1 },
            { stringValue: "-1.0",           numericValue: -1 },
            { stringValue: "-123.45",        numericValue: -123.45 },
            { stringValue: "-123.456789",    numericValue: -123.456789 },
            { stringValue: "-010101.010101", numericValue: -10101.010101 },
            { stringValue: "-0101010.10101", numericValue: -101010.10101 },
            { stringValue: "-0000000.00001", numericValue: -0.00001 },
            { stringValue: "-.999999999999", numericValue: -0.999999999999 },
            { stringValue: "-9.99999999999", numericValue: -9.99999999999 },
            { stringValue: "-9.9999",        numericValue: -9.9999 }
         ];

         var index;
         var testCase;
         for (index = 0; index < testCases.length; index++) {
            testCase = testCases[index];
            testCase.stringValue = testCase.stringValue.replace(".", decimalSeparator);
         }

         for (index = 0; index < testCases.length; index++) {
            testCase = testCases[index];
            expect(currencyFormatter.parseNumberWithDecimals(testCase.stringValue)).toBe(testCase.numericValue);
         }
      }

      it("parses numbers with decimals", function() {
         var currencyFormatter = new CurrencyFormatter("'", ".", false);
         testParseNumberWithDecimals(currencyFormatter, ".");

         currencyFormatter = new CurrencyFormatter("'", ",");
         testParseNumberWithDecimals(currencyFormatter, ",");

         currencyFormatter = new CurrencyFormatter(",", ".", false);
         testParseNumberWithDecimals(currencyFormatter, ".");
      });

      function testFillZeroLeft(currencyFormatter) {
         var testCases = [
            { inputString: "0",             decimals: 3, expectedString: "000" },
            { inputString: "1",             decimals: 3, expectedString: "001" },
            { inputString: "12",            decimals: 3, expectedString: "012" },
            { inputString: "123",           decimals: 0, expectedString: "123" },
            { inputString: "123",           decimals: 1, expectedString: "123" },
            { inputString: "123",           decimals: 2, expectedString: "123" },
            { inputString: "123",           decimals: 3, expectedString: "123" },
            { inputString: "123",           decimals: 4, expectedString: "0123" },
            { inputString: "123",           decimals: 5, expectedString: "00123" },
            { inputString: "0008",          decimals: 8, expectedString: "00000008" },
            { inputString: "0000",          decimals: 8, expectedString: "00000000" }
         ];

         var index;
         var testCase;
         for (index = 0; index < testCases.length; index++) {
            testCase = testCases[index];
            expect(currencyFormatter.fillZeroLeft(testCase.inputString, testCase.decimals)).toBe(testCase.expectedString);
         }
      }

      it("fills with zeros on the left", function() {
         var currencyFormatter = new CurrencyFormatter("'", ".", false);
         testFillZeroLeft(currencyFormatter);

         currencyFormatter = new CurrencyFormatter(".", ",", false);
         testFillZeroLeft(currencyFormatter);
      });

      function testAddGroupSeparator(currencyFormatter, groupSeparator) {
         var testCases = [
            { inputString: "0",              expectedString: "0" },
            { inputString: "1",              expectedString: "1" },
            { inputString: "12",             expectedString: "12" },
            { inputString: "123",            expectedString: "123" },
            { inputString: "1234",           expectedString: "1'234" },
            { inputString: "12345",          expectedString: "12'345" },
            { inputString: "123456",         expectedString: "123'456" },
            { inputString: "1234567",        expectedString: "1'234'567" },
            { inputString: "9999999999999",  expectedString: "9'999'999'999'999" }
         ];

         var index;
         var testCase;
         for (index = 0; index < testCases.length; index++) {
            testCase = testCases[index];
            testCase.expectedString = testCase.expectedString.replace(/'/g, groupSeparator);
         }

         for (index = 0; index < testCases.length; index++) {
            testCase = testCases[index];
            var expected = testCase.expectedString;
            var value = currencyFormatter.addGroupUnitarySeparator(testCase.inputString);
            // console.log('value=' + value + 'expected=' + expected );
            expect(value).toBe(expected);
         }
      }

      it("adds group separator", function() {
         var currencyFormatter = new CurrencyFormatter("'", ".", false);
         testAddGroupSeparator(currencyFormatter, "'");

          currencyFormatter = new CurrencyFormatter(".", ",", false);
          testAddGroupSeparator(currencyFormatter, ".");

          currencyFormatter = new CurrencyFormatter(",", ".", false);
          testAddGroupSeparator(currencyFormatter, ",");
      });

      function testFormatCurrency(currencyFormatter, groupSeparator, decimalSeparator) {
         var testCases = [
            { number: 0,         showDecimals: false, numberOfDecimals: 0, expectedString: "0" },
            { number: 1,         showDecimals: false, numberOfDecimals: 0, expectedString: "1" },
            { number: 12,        showDecimals: false, numberOfDecimals: 0, expectedString: "12" },
            { number: 123,       showDecimals: false, numberOfDecimals: 0, expectedString: "123" },
            { number: 1234,      showDecimals: false, numberOfDecimals: 0, expectedString: "1'234" },
            { number: 1234.5,    showDecimals: false, numberOfDecimals: 0, expectedString: "1'235" },
            { number: 1234.56,   showDecimals: false, numberOfDecimals: 1, expectedString: "1'235" },
            { number: 1234.567,  showDecimals: false, numberOfDecimals: 2, expectedString: "1'235" },
            { number: 1234.567,  showDecimals: true,  numberOfDecimals: 0, expectedString: "1'235" },
            { number: 1234.567,  showDecimals: true,  numberOfDecimals: 1, expectedString: "1'234.6" },
            { number: 1234.567,  showDecimals: true,  numberOfDecimals: 2, expectedString: "1'234.57" },
            { number: 1234.567,  showDecimals: true,  numberOfDecimals: 3, expectedString: "1'234.567" },
            { number: 1234.567,  showDecimals: true,  numberOfDecimals: 4, expectedString: "1'234.5670" },

            { number: -1,        showDecimals: false, numberOfDecimals: 0, expectedString: "-1" },
            { number: -12,       showDecimals: false, numberOfDecimals: 0, expectedString: "-12" },
            { number: -123,      showDecimals: false, numberOfDecimals: 0, expectedString: "-123" },
            { number: -1234,     showDecimals: false, numberOfDecimals: 0, expectedString: "-1'234" },
            //{ number: -1234.5,   showDecimals: false, numberOfDecimals: 0, expectedString: "-1'235" },
            { number: -1234.56,  showDecimals: false, numberOfDecimals: 1, expectedString: "-1'235" },
            { number: -1234.567, showDecimals: false, numberOfDecimals: 2, expectedString: "-1'235" },
            { number: -1234.567, showDecimals: true,  numberOfDecimals: 0, expectedString: "-1'235" },
            { number: -1234.567, showDecimals: true,  numberOfDecimals: 1, expectedString: "-1'234.6" },
            { number: -1234.567, showDecimals: true,  numberOfDecimals: 2, expectedString: "-1'234.57" },
            { number: -1234.567, showDecimals: true,  numberOfDecimals: 3, expectedString: "-1'234.567" },
            { number: -1234.567, showDecimals: true,  numberOfDecimals: 4, expectedString: "-1'234.5670" }
         ];

         var index;
         var testCase;
         for (index = 0; index < testCases.length; index++) {
            testCase = testCases[index];
            testCase.expectedString = testCase.expectedString.replace('.', decimalSeparator);
            testCase.expectedString = testCase.expectedString.replace(/'/g, groupSeparator);
         }

         for (index = 0; index < testCases.length; index++) {
            testCase = testCases[index];
            var expected = testCase.expectedString;
            var value = currencyFormatter.formatCurrency(testCase.number, testCase.showDecimals, testCase.numberOfDecimals);
            expect(value).toBe(expected);
         }
      }

      it("formats currency", function() {
         var currencyFormatter = new CurrencyFormatter("'", ".", false);
         testFormatCurrency(currencyFormatter, "'", ".");

         currencyFormatter = new CurrencyFormatter(".", ",", false);
         testFormatCurrency(currencyFormatter, ".", ",");

         currencyFormatter = new CurrencyFormatter(",", ".", false);
         testFormatCurrency(currencyFormatter, ",", ".");
      });
   });
});
