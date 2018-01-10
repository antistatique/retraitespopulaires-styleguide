define([
   'common-object-utilities', 
   'common-numeric-parameter'
], function(ObjectUtilities, 
            NumericParameter) {
   'use strict';

   describe("Extend Deep", function() {
      it("should work with simple objects", function() {
         var objUtilities = new ObjectUtilities();
         var obj1 = { a: 1 };
         var obj2 = { a: 2 };
         var result = objUtilities.extendDeep(obj1, obj2);

         expect(result.a).toBe(2);
      });

      it("should work with compose objects, a exists", function() {
         var objUtilities = new ObjectUtilities();
         var obj1 = { a: 3, b: 3};
         var obj2 = { a: 4 };
         var result = objUtilities.extendDeep(obj1, obj2);

         expect(result.a).toBe(4);
         expect(result.b).toBe(3);
      });

      it("should work with compound objects, a doesnt exists", function() {
         var objUtilities = new ObjectUtilities();
         var obj1 = { b: 3};
         var obj2 = { a: 4 };
           var result = objUtilities.extendDeep(obj1, obj2);

         expect(result.a).toBe(4);
         expect(result.b).toBe(3);
      });

      it("should work with compound objects, literal replaces function", function() {
         var objUtilities = new ObjectUtilities();
         var obj1 = { a: function() { return "dummy test"; }};
         var obj2 = { a: 4 };
         var result = objUtilities.extendDeep(obj1, obj2);

         expect(result.a).toBe(4);
      });

      it("should work with compound objects, function replaces literal", function() {
         var objUtilities = new ObjectUtilities();    
         var dummy_function = function() { console.log("dummy test1"); };
         var obj1 = { a: 4};   
         var obj2 = { a: dummy_function};
         var result = objUtilities.extendDeep(obj1, obj2);

         expect(result.a).toEqual(dummy_function);
      });

      
     it("should work with compound objects, function replaces function", function() {
           var objUtilities = new ObjectUtilities();
         var dummy_function1 = function() { console.log("dummy test1"); };
         var dummy_function2 = function() { console.log("dummy test2"); };
         var obj1 = { a: dummy_function1};   
         var obj2 = { a: dummy_function2};
         var result = objUtilities.extendDeep(obj1, obj2);

         expect(result.a).toEqual(dummy_function2);
      });

      it("should work with compound objects, properties with other objects", function() {
         var objUtilities = new ObjectUtilities();
         var obj1 = { a: 4};   
         var obj2 = { a: { a: 1} };
         var result = objUtilities.extendDeep(obj1, obj2);

         expect(result.a).toEqual({a: 1});
      });


      it("should work with compound objects, merge object properties", function() {
         var objUtilities = new ObjectUtilities();
         var obj1 = { a: 4};   
          var obj2 = { a: 5, b: { a: 1} };

         var result = objUtilities.extendDeep(obj1, obj2);
         expect(result.a).toEqual(5);
         expect(result.b).toEqual({ a: 1});

      });

      it("should work with compound objects, properties with other objects (inverse)", function() {
         var objUtilities = new ObjectUtilities();
         var obj1 = { a: { a: 1} };   
         var obj2 = { a: 4};   

         var result = objUtilities.extendDeep(obj1, obj2);

         expect(result.a).toEqual(4);
      });

      it("should work with compound objects, merge object properties", function() {
         var objUtilities = new ObjectUtilities();
         var obj1 = { a: { a: 1, b: 2, c: 4} };   
         var obj2 = { a: { c: 3 } };   

         var result = objUtilities.extendDeep(obj1, obj2);
         expect(result.a).toEqual({a: 1, b: 2, c: 3});
      });     

      it("should work with compound objects with arrays, literal replaces array", function() {
         var objUtilities = new ObjectUtilities();
         var obj1 = { a: { a:1, b:[1, 2, 3] } };
         var obj2 = { a: { b: 1} };

         var result = objUtilities.extendDeep(obj1, obj2);
         expect(result.a).toEqual({a: 1, b: 1});
      });

      it("should work with compound objects with arrays, array replaces literal", function() {
         var objUtilities = new ObjectUtilities();
         var obj1 = { a: { a:1, b:1 } };
         var obj2 = { a: {b: [1, 2, 3]} };

         var result = objUtilities.extendDeep(obj1, obj2);
         expect(result.a).toEqual({a: 1, b: [1, 2, 3]});
      });

      it("should work with compound objects with arrays, array replaces array", function() {
         var objUtilities = new ObjectUtilities();
         var obj1 = { a: { a:1, b:[1, 2, 3] } };
         var obj2 = { a: {b: [1, 2, 3, 4, 5, 6, 7]} };

         var result = objUtilities.extendDeep(obj1, obj2);
         expect(result.a).toEqual({a: 1, b: [1, 2, 3, 4, 5, 6, 7]});
      });

      it("should not add attributes if none existing", function() {
         var objUtilities = new ObjectUtilities();
         var Obj1 = function() {
            this.b = 2;
            Object.preventExtensions(this);
           };
         var obj1 = new Obj1();
         var obj2 = { a:10, b:20 };

         var doIt = function() {
            objUtilities.extendDeep(obj1, obj2);
         };
         expect(doIt).not.toThrowError(TypeError);
         expect(obj1.a).toBeUndefined();
         expect(obj1.b).toBe(20);
      });

      it("should work with numeric parameter object", function() {
         var objUtilities = new ObjectUtilities();
         var obj1 = new NumericParameter(0, 9);
         var obj2 = new NumericParameter(0, 1, 2, 3, 4);
         var result = objUtilities.extendDeep(obj1, obj2);
         expect(result.min).toBe(0);
         expect(result.max).toBe(1);
         expect(result.slider_min).toBe(2);
         expect(result.slider_max).toBe(3);
         expect(result.slider_step).toBe(4);
      });

      it("should work with numeric parameter object dest", function() {
         var objUtilities = new ObjectUtilities();
         var dest = new NumericParameter(0, 1, 2, 3, 4);
         var origin = { max:8, min: 9 };
         var result = objUtilities.extendDeep(dest, origin);
         expect(result.min).toBe(9);
         expect(result.max).toBe(8);
         expect(result.slider_min).toBe(2);
      });

      it("should work with undefined values", function() {
         var objUtilities = new ObjectUtilities();
         var dest = { max: 8, min: 9 };
         var origin = { min: undefined };
         var result = objUtilities.extendDeep(dest, origin);
         expect(result.min).toBeUndefined();
         expect(result.max).toBe(8);
      });
   });
   
   it("should work with defined objects as attributes", function() {
      var objUtilities = new ObjectUtilities();

      var SubPart = function() {
         this.subPartValue = "subpart value";
         this.subPartOtherValue = "subpart other value";
      };

      var MainPart = function() {
         this.mainPartValue = "mainpart value";
         this.subPart = new SubPart();
      };

      var dest = new MainPart(); 
      var origin = { subPart: { subPartValue: "new subpart value" } };
      var result = objUtilities.extendDeep(dest, origin);
      expect(result.mainPartValue).toBe("mainpart value");
      expect(result.subPart.subPartValue).toBe("new subpart value");
      expect(result.subPart.subPartOtherValue).toBe("subpart other value");
    });
});
