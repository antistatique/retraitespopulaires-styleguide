define([
   'common-object-utilities',
   'common-numeric-parameter'
], function(ObjectUtilities,
            NumericParameter) {
   'use strict';

   describe("Object Utilities Suite", function() {

      it('should equals null objects', function() {

         var utilities = new ObjectUtilities();
         var obj1 = null;
         var obj2 = null;
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(true);
      });

      it('should equals undefined objects', function() {

         var utilities = new ObjectUtilities();
         var obj1;
         var obj2;
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(true);
      });

      it('should equals two primitives', function() {

         var utilities = new ObjectUtilities();
         var obj1 = 1;
         var obj2 = 1;
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(true);
      });

      it('should not equals two distinct primitives', function() {

         var utilities = new ObjectUtilities();
         var obj1 = 1;
         var obj2 = 2;
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      });

      it('should equals two strings', function() {

         var utilities = new ObjectUtilities();
         var obj1 = "ZH";
         var obj2 = "ZH";
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(true);
      });

      it('should not equals two distinct strings', function() {

         var utilities = new ObjectUtilities();
         var obj1 = "ZH";
         var obj2 = "VD";
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      });

      it('should not equals two distinct date', function() {

         var utilities = new ObjectUtilities();
         var obj1 = new Date(2012, 7, 30, 0, 0, 0, 0);
         var obj2 = new Date(2011, 7, 30, 0, 0, 0, 0);
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      });

      it('should equals two same date', function() {

         var utilities = new ObjectUtilities();
         var obj1 = new Date(2011, 7, 30, 0, 0, 0, 0);
         var obj2 = new Date(2011, 7, 30, 0, 0, 0, 0);
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(true);
      });

      it('should not quals two distinct arrays', function() {

         var utilities = new ObjectUtilities();
         var obj1 = [1, 2, 3];
         var obj2 = [1, 2];
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      });

      it('should equals two same arrays lenght distinct data', function() {

         var utilities = new ObjectUtilities();
         var obj1 = [1, 2, 3];
         var obj2 = [1, 2, 4];
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      });

      it('should equals two same arrays', function() {

         var utilities = new ObjectUtilities();
         var obj1 = [1, 2, 3];
         var obj2 = [1, 2, 3];
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(true);
      });

      it('should equals two object with same constructor', function() {

         var utilities = new ObjectUtilities();
         var obj1 = new NumericParameter(1, 2);
         var obj2 = new NumericParameter(1, 2);
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(true);
      });

      it('should not equals two object with same constructor and distinct data', function() {

         var utilities = new ObjectUtilities();
         var obj1 = new NumericParameter(0, 1);
         var obj2 = new NumericParameter(1, 2);
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      });

      it('should not equals for primitive value and object', function() {

         var utilities = new ObjectUtilities();
         var obj1 = 1;
         var obj2 = {a:1};
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      }); 

      it('should equals for same data and distinct constructor invocation', function() {

         var utilities = new ObjectUtilities();
         var obj1 = new NumericParameter(0, 1);
         var obj2 = {min:0, max:1, slider_min:0, slider_max:1, slider_step:1};
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(true);
      });  

      it('should not equals for distinct data in object', function() {

         var utilities = new ObjectUtilities();
         var obj1 = new NumericParameter(0, 1);
         var obj2 = {min:1, max:2, slider_min:1, slider_max:2, slider_step:1};
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      });  

      it('should equals for primitive data in object', function() {

         var utilities = new ObjectUtilities();
         var obj1 = {a:1, b:true, c:null, d:'abc'};
         var obj2 = {a:1, b:true, c:null, d:'abc'};
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(true);
      }); 

      it('should not equals for distinct primitive data in object', function() {

         var utilities = new ObjectUtilities();
         var obj1 = {a:1, b:true, c:null, d:'abcd'};
         var obj2 = {a:1, b:true, c:null, d:'abc'};
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      }); 

      it('should not equals for distinct data in object, object vs null', function() {

         var utilities = new ObjectUtilities();
         var obj1 = {a:1, b:true, c:null, d:{a:1, b:2}};
         var obj2 = {a:1, b:true, c:null, d:null};
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      }); 

      it('should not equals for distinct data in object properties', function() {

         var utilities = new ObjectUtilities();
         var obj1 = {a:1, b:true, c:null, d:{a:1, b:2}};
         var obj2 = {a:1, b:true, c:null, d:{a:1}};
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      });

      it('should not equals for distinct data in object properties, undefined property', function() {
         var utilities = new ObjectUtilities();
         var obj1 = {a:1, b:true, c:null, d:{a:1}};
         var obj2 = {a:1, b:true, c:null, d:{a:1, b:2}};
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      });

      it('should not equals for distinct data structure inside array', function() {
         var utilities = new ObjectUtilities();
         var obj1 = {c:{d:[{a:1}, {a:2}]}};
         var obj2 = {c:{d:[{a:1}, {a:2, x:10}]}};
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      });

      it('should not equals for distinct data structure inside array, but for special angular attribute', function() {
         var utilities = new ObjectUtilities();
         var obj1 = {c:{d:[{a:1}, {a:2}]}};
         var obj2 = {c:{d:[{a:1}, {a:2, $$a:10}]}};
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      });

      it('should not equals for distinct data, array vs primitive', function() {

         var utilities = new ObjectUtilities();
         var obj1 = {a:1, b:true, c:null, d:{a:[1, 2, 3]}};
         var obj2 = {a:1, b:true, c:null, d:{a:1}};
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      });

      it('should not equals for distinct array data', function() {

         var utilities = new ObjectUtilities();
         var obj1 = {a:1, b:true, c:null, d:{a:[1, 2, 3]}};
         var obj2 = {a:1, b:true, c:null, d:{a: 1}};
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      });

      it('should not equals for distinct array lenght', function() {

         var utilities = new ObjectUtilities();
         var obj1 = {a:1, b:true, c:null, d:{a:[1, 2, 3]}};
         var obj2 = {a:1, b:true, c:null, d:{a:[1, 2]}};
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      });

      it('should equals for same array data', function() {

         var utilities = new ObjectUtilities();
         var obj1 = {a:1, b:true, c:null, d:{a:[1, 2, 3]}};
         var obj2 = {a:1, b:true, c:null, d:{a:[1, 2, 3]}};
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(true);
      });

      it('should equals for same array data with objects', function() {

         var utilities = new ObjectUtilities();
         var obj1 = {a:1, b:true, c:null, d:{a:[{a: 1}]}};
         var obj2 = {a:1, b:true, c:null, d:{a:[1]}};
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(false);
      });

      it('should equals for same array data with same objects', function() {

         var utilities = new ObjectUtilities();
         var obj1 = {a:1, b:true, c:null, d:{a: [{a:1, b:new Date(2011, 7, 30), c:"abc"}, [1, 2], 1], b:1, c:{a: 1, b:2}}, e:[1, 2, {a: 1}]};
         var obj2 = {a:1, b:true, c:null, d:{a: [{a:1, b:new Date(2011, 7, 30), c:"abc"}, [1, 2], 1], b:1, c:{a: 1, b:2}}, e:[1, 2, {a: 1}]};
         var result = utilities.equals(obj1, obj2);
         expect(result).toBe(true);
      });

   });
});
