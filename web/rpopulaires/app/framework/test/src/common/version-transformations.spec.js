define([
   'version-transformations'
], function(versionTransformations) {
   'use strict';
   
   describe("version transformations", function() {
      it("should provide a function to add an attribute", function() {
         var transformation = new versionTransformations.ModelTransformationAdd('base.house.roofColor', 'red', '');
         var obj = {base: {house: {}}};
         var updatedObj = transformation.transform(obj);
         expect(updatedObj.base.house.roofColor).toBe('red');
      });

      it("should do nothing on adding an attribute to an unexisting path", function() {
         var transformation = new versionTransformations.ModelTransformationAdd('base.house.roofColor', 'red', '');
         var obj = {base: {}};
         var updatedObj = transformation.transform(obj);
         expect(updatedObj.base).not.toBeUndefined();
         expect(updatedObj.base.house).toBeUndefined();
      });

      it("should do nothing on adding an attribute when it exists", function() {
         var transformation = new versionTransformations.ModelTransformationAdd('base.house.roofColor', 'red', '');
         var obj = {base: {house: {roofColor: "green"}}};
         var updatedObj = transformation.transform(obj);
         expect(updatedObj.base.house.roofColor).toBe("green");
      });

      it("should provide a function to remove a path", function() {
         var transformation = new versionTransformations.ModelTransformationRemove('base.house.roofColor', '');
         var obj = {base: {house: {roofColor: 'red', floorColor: 'green'}}};
         var updatedObj = transformation.transform(obj);
         expect(updatedObj.base.house.roofColor).toBeUndefined();
         expect(updatedObj.base.house.floorColor).toBe('green');
      });

      it("should provide a function to rename a path and keep its value", function() {
         var transformation = new versionTransformations.ModelTransformationRename('base.house', 'roofColor', 'floorColor', '');
         var obj = {base: {house: {roofColor: 'red'}}};
         var updatedObj = transformation.transform(obj);
         expect(updatedObj.base.house.roofColor).toBeUndefined();
         expect(updatedObj.base.house.floorColor).toBe('red');
      });

      it("should do nothing on renaming an attribute to an unexisting path", function() {
         var transformation = new versionTransformations.ModelTransformationRename('base.house', 'roofColor', 'x.floorColor', '');
         var obj = {base: {house: {roofColor: 'red'}}};
         var updatedObj = transformation.transform(obj);
         expect(updatedObj.base.house.roofColor).toBe('red');
         expect(updatedObj.base.house.x).toBeUndefined();
      });

      it("should do nothing on renaming an attribute to an non object parent", function() {
         var transformation = new versionTransformations.ModelTransformationRename('base.house', 'roofColor', 'x.floorColor', '');
         var obj = {base: {house: {roofColor: 'red', x: 4}}};
         var updatedObj = transformation.transform(obj);
         expect(updatedObj.base.house.roofColor).toBe('red');
         expect(updatedObj.base.house.x).toBe(4);
      });

      it("should do nothing on renaming an attribute to an existing one", function() {
         var transformation = new versionTransformations.ModelTransformationRename('base.house', 'roofColor', 'x.floorColor', 'white');
         var obj = {base: {house: {roofColor: 'red', x: {floorColor: 'white'}}}};
         var updatedObj = transformation.transform(obj);
         expect(updatedObj.base.house.roofColor).toBe('red');
         expect(updatedObj.base.house.x.floorColor).toBe('white');
      });

      // MOVE

      it("should provide a function to move a path and keep its value", function() {
         var transformation = new versionTransformations.ModelTransformationMove('base.house.roofColor', 'base.house.floorColor', '');
         var obj = {base: {house: {roofColor: 'red'}}};
         var updatedObj = transformation.transform(obj);
         expect(updatedObj.base.house.roofColor).toBeUndefined();
         expect(updatedObj.base.house.floorColor).toBe('red');
      });

      it("should do nothing on moving an attribute to an unexisting path", function() {
         var transformation = new versionTransformations.ModelTransformationMove('base.house.roofColor', 'base.house.x.floorColor', '');
         var obj = {base: {house: {roofColor: 'red'}}};
         var updatedObj = transformation.transform(obj);
         expect(updatedObj.base.house.roofColor).toBe('red');
         expect(updatedObj.base.house.x).toBeUndefined();
      });

      it("should do nothing on moving an attribute to an non object parent", function() {
         var transformation = new versionTransformations.ModelTransformationMove('base.house.roofColor', 'base.house.x.floorColor', '');
         var obj = {base: {house: {roofColor: 'red', x: 4}}};
         var updatedObj = transformation.transform(obj);
         expect(updatedObj.base.house.roofColor).toBe('red');
         expect(updatedObj.base.house.x).toBe(4);
      });

      it("should do nothing on moving an attribute to an existing one", function() {
         var transformation = new versionTransformations.ModelTransformationMove('base.house.roofColor', 'base.house.x.floorColor', 'white');
         var obj = {base: {house: {roofColor: 'red', x: {floorColor: 'white'}}}};
         var updatedObj = transformation.transform(obj);
         expect(updatedObj.base.house.roofColor).toBe('red');
         expect(updatedObj.base.house.x.floorColor).toBe('white');
      });

      // MOVE OR ADD

      it("should provide a function to move or add a path and keep its value", function() {
         var transformation = new versionTransformations.ModelTransformationMoveOrAdd('base.house.roofColor', 'base.house.floorColor', 'green');
         var obj = {base: {house: {roofColor: 'red'}}};
         var updatedObj = transformation.transform(obj);
         expect(updatedObj.base.house.roofColor).toBeUndefined();
         expect(updatedObj.base.house.floorColor).toBe('red');
      });

      it("should add an attribute if the source path doesn't exist when moving or adding", function() {
         var transformation = new versionTransformations.ModelTransformationMoveOrAdd('base.house.roofColor', 'base.house.floorColor', 'green');
         var obj = {base: {house: {}}};
         var updatedObj = transformation.transform(obj);
         console.log(JSON.stringify(updatedObj));
         expect(updatedObj.base.house.floorColor).toBe('green');
      });

      //COPY

      it("should provide a function to copy a attribute and its value", function() {
         var transformation = new versionTransformations.ModelTransformationCopy('base.house.roofColor', 'base.house.floorColor', '');
         var obj = {base: {house: {roofColor: 'red'}}};
         var updatedObj = transformation.transform(obj);
         expect(updatedObj.base.house.roofColor).toBe('red');
         expect(updatedObj.base.house.floorColor).toBe('red');
      });

      it("should do nothing on copying an attribute to an unexisting path", function() {
         var transformation = new versionTransformations.ModelTransformationCopy('base.house.roofColor', 'base.house.x.floorColor', '');
         var obj = {base: {house: {roofColor: 'red'}}};
         var updatedObj = transformation.transform(obj);
         expect(updatedObj.base.house.roofColor).toBe('red');
         expect(updatedObj.base.house.x).toBeUndefined();
      });

      it("should allow to execute a free transformation", function() {
         var transformation = new versionTransformations.ModelTransformation(
            function(obj) {
               versionTransformations.setAttributeByPath(obj, 'l1.l2.att', 4);
               obj.base = null;
               return obj;
            }
         );
         var obj = {base: {house: {roofColor: 'red'}}};
         var updatedObj = transformation.transform(obj);
         expect(updatedObj.l1.l2.att).toBe(4);
         expect(updatedObj.base).toBeNull();
      });

      it("should provide a function to transform a value", function() {
         var transformation1 = new versionTransformations.ModelTransformationRename('base.house', 'hasNoRoof', 'hasRoof', '');
         var transformation2 = new versionTransformations.ModelTransformationTransformValue('base.house.hasRoof', function(value) {
            return !value;
         }, '');
         var transformation3 = new versionTransformations.ModelTransformationRename('base.house', 'value', 'valueInTousands', '');
         var transformation4 = new versionTransformations.ModelTransformationTransformValue('base.house.valueInTousands', function(value) {
            return value / 1000;
         }, '');
         var obj = {base: {house: {hasNoRoof: true, value: 1234000}}};
         var updatedObj = transformation1.transform(obj);
         updatedObj = transformation2.transform(updatedObj);
         updatedObj = transformation3.transform(updatedObj);
         updatedObj = transformation4.transform(updatedObj);
         expect(updatedObj.base.house.hasNoRoof).toBeUndefined();
         expect(updatedObj.base.house.hasRoof).toBeFalsy();
         expect(updatedObj.base.house.value).toBeUndefined();
         expect(updatedObj.base.house.valueInTousands).toBe(1234);
      });
   });
});
