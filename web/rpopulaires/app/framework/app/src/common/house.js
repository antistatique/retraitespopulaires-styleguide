define('common-house', [
   'logger',
   'kineticjs',
   'easing'
], function(Logger) {
   'use strict';

   var log = Logger.get('HouseObject');

   var House = function(canvasId, x, y, formatter, parameters, size, fontParameters) {
      this.initialized = false;
      this.x = x;
      this.y = y;
      this.formatter = formatter;
      this.sections = [];
      this.values = [];
      this.labels = [];
      this.amountLabels = [];
      this.tooltips = [];
      this.shapes = [];
      this.subSectionShapes = [];
      this.subSectionLabels = [];
      this.parameters = parameters;
      this.bordersHeight = 4; // borders top and bottom of sections are 1px each one
      this.roofHeight = 50;
      this.smokestackDiffWithTop = Math.ceil(this.roofHeight / 2 - 10);
      this.roofWidth = 200;
      this.sectionSeparator = 1;
      this.houseWidth = this.roofWidth; // * 0.85;
      this.canvasId = canvasId;
      this.size = size;
      this.drawPending = true;
      this.fontFamily = fontParameters.fontFamily ? fontParameters.fontFamily : 'Verdana';
      this.fontLetterSpacing = fontParameters.fontLetterSpacing ? fontParameters.fontLetterSpacing : 'normal';
      this.textFontSize = fontParameters.fontSize.text ? fontParameters.fontSize.text : 18;
      this.smallTextFontSize = fontParameters.fontSize.smallText ? fontParameters.fontSize.smallText : 13;
      this.toolTipFontSize = fontParameters.fontSize.toolTip ? fontParameters.fontSize.toolTip : 14;
      this.triggerTooltipHeight = fontParameters.triggerTooltipHeight ? fontParameters.triggerTooltipHeight : 40;
      this.animationDuration = 150;
      this.animationSteps = 40;
      this.pendingAnimation = null;
      this.animation = null;
      this.stage = null;
      this.layer = this.getLayer();
   };

   House.prototype.getCanvasWidth = function() {
      if (this.size && this.size.width) {
         log.debug("using size parameter");
         return this.size.width;
      }
      var canvas = document.getElementById(this.canvasId);
      var width = canvas.clientWidth;

      if (width === 0) {
         width = $('#' + this.canvasId).width();
      }

      if (width === 0) {
         log.warn("getCanvasWidth, invalid canvas width");
      }

      if (width !== 0) {
         this.houseWidth = width;
         this.roofWidth = width;
      }
      return width;
   };

   House.prototype.getCanvasHeight = function() {
      if (this.size && this.size.height) {
         log.debug("using size parameter");
         return this.size.height;
      }
      var canvas = document.getElementById(this.canvasId);
      var height = canvas.clientHeight;
      
      if (height === 0) {
         height = $('#' + this.canvasId).height();
      }

      if (height === 0) {
         log.warn("getCanvasHeight, invalid canvas height");
      }

      return height;
   };

   House.prototype.createLayer = function() {  
      log.debug("Creating layer, width=" + this.getCanvasWidth());
      this.stage = new Kinetic.Stage({
         container: this.canvasId,
         width: this.getCanvasWidth(),
         height: this.getCanvasHeight()
      });
      var houseLayer = new Kinetic.Layer();
      this.stage.add(houseLayer);
      return houseLayer;
   };
   
   House.prototype.getLayer = function() {  
      if (this.layer) {
         return this.layer;
      }
      if (this.getCanvasWidth() > 0) {
         this.layer = this.createLayer();
      }
      return this.layer;
   };

   House.prototype.getCenterXforLabels = function() {
      return this.x + (this.houseWidth / 2) + 0;
   };
   
   House.prototype.addSection = function(section) {
      if (!section.subSections) {
         section.subSections = [];
      }

      this.sections.push(section);
   };

   House.prototype.setLabels = function(labelTexts) {
      for (var index = 0; index < this.sections.length; index++) {
         this.sections[index].label = labelTexts[index].label;

         var label = this.labels[index];
         label.getText().setText(this.sections[index].label);
         label.draw();
         this.relocateLabels();
         if (this.layer) {
            this.layer.draw();
         }
      }
   };

   House.prototype.drawHouse = function(values) {
      this.values = values;
      
      if (this.getCanvasHeight() <= 0) {
         this.drawPending = true;
         log.warn("drawHouse, invalid canvas height");
         return;
      }
      if (!this.getLayer()) {
         log.warn("drawHouse, layer not available");
         return;
      }

      this.initializeDrawing();
   };

   House.prototype.initializeDrawing = function() {
      if (this.initialized) {
         return;
      }
      this.layer = this.getLayer();
      if (!this.layer) {
         log.warn("initializeDrawing, layer not available");
         return;
      }

      this.widthdiff = (this.roofWidth - this.houseWidth) / 2;

      this.calculateSectionHeights();

      this.addSmokestackShape();

      this.addTopSectionShape();
      for (index = 1; index < this.sections.length; index++) {
         this.addNonTopSectionShape(index);
      }

      for (index = 0; index < this.sections.length; index++) {
         this.addSubSectionShapes(index);
         this.addSubSectionLabels(index);
      }

      var index;
      var center_x = this.getCenterXforLabels();
      for (index = 0; index < this.sections.length; index++) {
         this.labels.push(this.createCenteredLabel(this.createSmallText(this.sections[index].label), center_x, 0 /* will be relocated later */));
      }

      for (index = 0; index < this.sections.length; index++) {
         this.amountLabels.push(this.createCenteredLabel(this.createText(this.formatter.formatCurrency(this.values[index].value)), center_x, 0 /* will be relocated later */));
      }

      for (index = 0; index < this.sections.length; index++) {
         var direction = (index === 0) ? 'up' : 'down';
         var tooltip = createTooltip(center_x, 75, direction, this.sections[index].tooltipColors.colorA, this.sections[index].tooltipColors.colorB, 
                                     this.fontFamily, this.letterSpacing, this.toolTipFontSize);
         tooltip.setVisible(false); //by default
         this.layer.add(tooltip);
         this.tooltips.push(tooltip);
      }

      this.previousy = 0;
      this.newpos = 0;

      //TODO: perhaps update the amount together with the percentage, so the layer is redrawn only once

      this.relocateLabels();
      this.drawPending = false;
      this.initialized = true;
   };

   House.prototype.calculateSectionHeights = function() {
      var totalValue = this.totalValue();
      var canvasHeight = this.getCanvasHeight();

      this.sectionHeights = [];

      if (canvasHeight === 0) {
         log.warn("calculateSectionHeights, invalid canvas height");
         return;
      }

      var totalHouseHeight = canvasHeight - this.y - this.roofHeight - this.bordersHeight - 20 /* TODO: to be analyzed */;

      var accumulatedSectionHeights = 0;
      var accumulatedRoundedSectionHeights = 0;
      for (var index = 0; index < this.sections.length; index++) {
         var sectionHeight;

         if (totalValue === 0) {
            // if the totalValue was not calculated yet, there's no way to assign sections properly... just fill some values so other code doesn't break much
            log.warn("calculateSectionHeights, invalid totalValue");
            if (index === 0) {
               // assign all height to the first section
               sectionHeight = totalHouseHeight;
            }
            else {
               // assign 0 height to the other sections
               sectionHeight = 0;
            }
         }
         else {
            sectionHeight = totalHouseHeight * this.values[index].value / totalValue;
         }

         // use rounded values
         var roundedSectionHeight = Math.round(sectionHeight);

         // avoid accumulating rounding errors
         accumulatedSectionHeights += sectionHeight;
         accumulatedRoundedSectionHeights += roundedSectionHeight;

         var diff = accumulatedRoundedSectionHeights - Math.round(accumulatedSectionHeights);
         if (diff !== 0) {
            roundedSectionHeight -= diff;
            accumulatedRoundedSectionHeights -= diff;
         }

         this.sectionHeights.push(roundedSectionHeight);
      }
   };

   House.prototype.totalValue = function() {
      var totalValue = 0;
      for (var index = 0; index < this.sections.length; index++) {
         totalValue += this.values[index].value;
      }
      return totalValue;
   };

   House.prototype._updateDrawingSize = function() {
      if (!this.stage) {
         log.warn("_updateDrawingSize, stage not available");
         return;
      }
      log.debug("_updateDrawingSize, stage width: " + this.stage.width());
      this.stage.width(this.getCanvasWidth());
      this.stage.height(this.getCanvasHeight());
      
      //Update the width of all the shapes
      var index;
      for (index = 0; index < this.shapes.length; index++) {
         var shape = this.shapes[index];
         log.debug("shape " + shape.width());
         shape.width(this.houseWidth);
      }
      
      //Update the x of all the tooltips
      for (index = 0; index < this.tooltips.length; index++) {
         var tooltip = this.tooltips[index];
         log.debug("tooltip " + tooltip.x());
         tooltip.x(this.getCenterXforLabels());
      }
   };

   House.prototype.updateValuesForced = function(values) {
      log.debug("Update values forced " + this.getCanvasWidth());

      if (this.getCanvasWidth() <= 0) {
         log.warn("updateValuesForced, invalid canvas width");
      }

      this._updateDrawingSize();

      if (this.pendingAnimation) {
         this.pendingAnimation = null;
      }

      this.values = values;
      
      this.initializeDrawing();
      
      //No animation, just update the house in a single step
      this.updateValuesForAnimationStep(values);
      return true;
   };

   House.prototype.haveSameValues = function(values1, values2) {
      for (var sectionIndex = 0; sectionIndex < this.sections.length; sectionIndex++) {
         var sectionValue1 = values1[sectionIndex];
         var sectionValue2 = values2[sectionIndex];

         if (sectionValue1.value !== sectionValue2.value) {
            return false;
         }

         if (!sectionValue1.subSections) {
            sectionValue1.subSections = [];
         }

         if (!sectionValue2.subSections) {
            sectionValue2.subSections = [];
         }

         for (var subSectionIndex = 0; subSectionIndex < sectionValue1.subSections.length; subSectionIndex++) {
            var subSectionValue1 = sectionValue1.subSections[subSectionIndex];
            var subSectionValue2 = sectionValue2.subSections[subSectionIndex];

            if (subSectionValue1.value !== subSectionValue2.value) {
               return false;
            }
         }
      }

      return true;
   };

   House.prototype.updateValues = function(values) {
      log.debug("Update values " + this.getCanvasWidth());

      if (!this.initialized) {
         return this.updateValuesForced(values);
      }

      this._updateDrawingSize();

      var sameValues = this.haveSameValues(this.values, values);

      if (sameValues) {
         log.debug("HOUSE: avoid updating values, already set");
         if (this.getLayer()) {
            this.layer.draw();
            return true;
         }
         else {
            log.warn("updateValues, layer not available");
            return false;
         }
      }

      if (this.animation) {
         log.debug("ALREADY ANIMATING");
         this.pendingAnimation = { 
            values: values
         };
         return true;
      }

      this.animation = {}; //just signal that we are animating, as soon as possible

      var originalValues = this.values;
      var totalDifferenceValues = [];
      var stepDifferenceValues = [];
      for (var index = 0; index < this.sections.length; index++) {
         var totalDifferenceValue = {value: values[index].value - originalValues[index].value};
         var stepDifferenceValue = {value: totalDifferenceValue.value / this.animationSteps};

         var section = this.sections[index];
         totalDifferenceValue.subSections = [];
         stepDifferenceValue.subSections = [];
         for (var subSectionIndex = 0; subSectionIndex < section.subSections.length; subSectionIndex++) {
            totalDifferenceValue.subSections.push({value: values[index].subSections[subSectionIndex].value - originalValues[index].subSections[subSectionIndex].value});
            stepDifferenceValue.subSections.push({value: totalDifferenceValue.subSections[subSectionIndex].value / this.animationSteps});
         }

         totalDifferenceValues.push(totalDifferenceValue);
         stepDifferenceValues.push(stepDifferenceValue);
      }

      this.animation = {
         currentAnimationStep: 0,
         originalValues: this.values,
         finalValues: values,
         stepDifferenceValues: stepDifferenceValues
      };
      
      var that = this;
      setTimeout(function() {
         that.runAnimation(that);
      }, this.animationDuration / this.animationSteps);

      return true;
   };

   House.prototype.runAnimation = function(house) {
      if (house.animation.currentAnimationStep === house.animationSteps) {
         log.debug("FINISHING ANIMATION");
         house.updateValuesForAnimationStep(house.animation.finalValues);
         house.animation = null;
         if (house.pendingAnimation) {
            var newValues = house.pendingAnimation.values;
            //TODO
            house.pendingAnimation = null;
            log.debug("Starting pending animation");
            house.updateValues(newValues);
         }
         return;
      }
      
      house.drawAnimationStep();

      house.animation.currentAnimationStep++;

      setTimeout(function() {
         house.runAnimation(house);
      }, house.animationDuration / house.animationSteps);
   };

   House.prototype.drawAnimationStep = function() {
      var that = this;
      var calculateStepValue = function(startValue, differenceValue) {
         return easeInOutQuint(that.animation.currentAnimationStep,
                               startValue,
                               differenceValue * that.animation.currentAnimationStep,
                               that.animationSteps);
      };
      
      var newValues = [];
      for (var index = 0; index < this.sections.length; index++) {
         var newValue = {value: calculateStepValue(this.animation.originalValues[index].value, this.animation.stepDifferenceValues[index].value)};

         var section = this.sections[index];
         newValue.subSections = [];
         for (var subSectionIndex = 0; subSectionIndex < section.subSections.length; subSectionIndex++) {
            newValue.subSections.push({
               value: calculateStepValue(
                     this.animation.originalValues[index].subSections[subSectionIndex].value,
                     this.animation.stepDifferenceValues[index].subSections[subSectionIndex].value
                     )
            });
         }
         
         newValues.push(newValue);
      }

      this.updateValuesForAnimationStep(newValues);
   };

   House.prototype.updateValuesForAnimationStep = function(values) {
      this.values = values;
      if (this.drawPending) {
         this.drawHouse(values);
      }
      if (this.drawPending) {
         return;
      }

      //Calculate the new heights
      this.calculateSectionHeights();

      if (this.sectionHeights.length === 0) {
         return;
      }

      var sectionIndex;

      // update top section
      sectionIndex = 0;
      var shape = this.shapes[sectionIndex];
      var height = this.roofHeight + this.sectionHeights[sectionIndex] - this.sectionSeparator;
      shape.setFillLinearGradientEndPoint({x: 0, y: height});
      shape.setHeight(height);
      shape.draw();
      this.smokestackShape.setHeight(this.sectionHeights[sectionIndex] - this.sectionSeparator + this.roofHeight - this.smokestackDiffWithTop);
      this.smokestackShape.setFillLinearGradientEndPoint({x: 0, y: (this.y + this.roofHeight + this.sectionHeights[sectionIndex] - this.sectionSeparator)});

      // update other sections
      for (sectionIndex = 1; sectionIndex < this.sections.length; sectionIndex++) {
         shape = this.shapes[sectionIndex];

         height = this.sectionHeights[sectionIndex] - this.sectionSeparator;
         shape.setY(this.y + this.roofHeight + this.previousSectionsHeight(sectionIndex));
         shape.setHeight(height);
         shape.setFillLinearGradientEndPoint({x: 0, y: height});
         shape.draw();
      }

      // update subsections
      for (sectionIndex = 0; sectionIndex < this.sections.length; sectionIndex++) {
         var section = this.sections[sectionIndex];

         var previousSubSectionsHeight = 0;
         for (var subSectionIndex = 0; subSectionIndex < section.subSections.length; subSectionIndex++) {
            shape = this.subSectionShapes[sectionIndex][subSectionIndex];
            var sectionShape = this.shapes[sectionIndex];
            var subSectionHeight = this.getSubSectionHeight(sectionIndex, subSectionIndex);
            var subSectionY = sectionShape.y() + sectionShape.height() - (previousSubSectionsHeight + subSectionHeight);
            shape.setY(subSectionY);
            shape.setHeight(Math.min(2, subSectionHeight));
            shape.strokeWidth(Math.min(2, subSectionHeight));

            // hide the shape if it's too small or if goes outside the sections' height
            shape.visible(subSectionHeight > 2 && (previousSubSectionsHeight + subSectionHeight) < this.sectionHeights[sectionIndex]);

            shape.draw();

            previousSubSectionsHeight += subSectionHeight;
         }
      }

      // update amount labels
      for (var index = 0; index < this.sections.length; index++) {
         this.amountLabels[index].getText().setText(this.formatter.formatCurrency(values[index].value));
         this.amountLabels[index].draw();
      }

      this.relocateLabels();
      if (this.getLayer()) {
         this.layer.draw();
      }
   };

   House.prototype.addTopSectionShape = function () {
      var sectionIndex = 0;
      var x = this.x;
      var y = this.y;
      var that = this;
      var shape = new Kinetic.Shape({
         sceneFunc: function(context) {
            context.beginPath();
            context.moveTo(x + that.roofWidth / 2, y);
            context.lineTo(x, y + that.roofHeight);
            context.lineTo(x + that.widthdiff, y + that.roofHeight);
            context.lineTo(x + that.widthdiff, y + that.sectionHeights[sectionIndex] - that.sectionSeparator + that.roofHeight);
            context.lineTo(x + that.widthdiff + that.houseWidth, y + that.sectionHeights[sectionIndex] - that.sectionSeparator + that.roofHeight);
            context.lineTo(x + that.widthdiff + that.houseWidth, y + that.roofHeight);
            context.lineTo(x + 2 * that.widthdiff + that.houseWidth, y + that.roofHeight);
            context.closePath();
            // KineticJS specific context method
            context.fillStrokeShape(this);
         },
         width: this.houseWidth,
         height: this.roofHeight + this.sectionHeights[sectionIndex] - this.sectionSeparator,
         fillLinearGradientStartPoint: {x: 0, y: y},
         fillLinearGradientEndPoint: {x: 0, y: (y + that.roofHeight + that.sectionHeights[sectionIndex] - this.sectionSeparator)},
         fillLinearGradientColorStops: [
            0, this.sections[sectionIndex].colors.colorA,
            1, this.sections[sectionIndex].colors.colorB
         ]
      });

      this.layer.add(shape);

      this.shapes.push(shape);
   };

   House.prototype.addNonTopSectionShape = function(sectionIndex) {
      log.debug("adding section " + this.sections[sectionIndex].label + " width: " + this.houseWidth);
      var shape = new Kinetic.Rect({
         x: this.x + this.widthdiff,
         y: this.y + this.roofHeight + this.previousSectionsHeight(sectionIndex),
         width: this.houseWidth,
         height: this.sectionHeights[sectionIndex] - this.sectionSeparator,
         fillLinearGradientStartPoint: {x: 0, y: 0},
         fillLinearGradientEndPoint: {x: 0, y: this.sectionHeights[sectionIndex] - this.sectionSeparator},
         fillLinearGradientColorStops: [
            0, this.sections[sectionIndex].colors.colorA,
            1, this.sections[sectionIndex].colors.colorB
            ]
      });

      this.layer.add(shape);

      this.shapes.push(shape);
   };

   House.prototype.addSubSectionShapes = function(sectionIndex) {
      var section = this.sections[sectionIndex];

      this.subSectionShapes.push([]);
      for (var subSectionIndex = 0; subSectionIndex < section.subSections.length; subSectionIndex++) {
         this.addSubSectionShape(sectionIndex, subSectionIndex);
      }
   };
      
   House.prototype.addSubSectionShape = function(sectionIndex, subSectionIndex) {
      var sectionShape = this.shapes[sectionIndex];
      var subSectionHeight = this.getSubSectionHeight(sectionIndex, subSectionIndex);
      var shape = new Kinetic.Line({
         height: subSectionHeight,
         points: [0, 0, sectionShape.width(), 0],
         stroke: this.sections[sectionIndex].subSections[subSectionIndex].colors.lineColor,
         strokeWidth: Math.min(2, subSectionHeight),
         dash: [10, 5]
      });

      this.layer.add(shape);

      this.subSectionShapes[sectionIndex].push(shape);
   };

   House.prototype.addSubSectionLabels = function(sectionIndex) {
      var section = this.sections[sectionIndex];

      this.subSectionLabels.push([]);
      for (var subSectionIndex = 0; subSectionIndex < section.subSections.length; subSectionIndex++) {
         this.addSubSectionLabel(sectionIndex, subSectionIndex);
      }
   };
      
   House.prototype.addSubSectionLabel = function(sectionIndex, subSectionIndex) {
      var center_x = this.getCenterXforLabels();
      var label = this.createCenteredLabel(this.createSmallText(this.sections[sectionIndex].subSections[subSectionIndex].label), center_x, 0 /* will be relocated later */);

      this.subSectionLabels[sectionIndex].push(label);
   };

   House.prototype.addSmokestackShape = function() {
      var sectionIndex = 0;
      this.smokestackShape = new Kinetic.Rect({
         x: this.x + this.widthdiff + 20,
         y: this.y + this.smokestackDiffWithTop,
         width: 20,
         height: this.sectionHeights[sectionIndex] - this.sectionSeparator + this.roofHeight - this.smokestackDiffWithTop,
         drawBorder: true,
         fillLinearGradientStartPoint: {x: 0, y: -this.smokestackDiffWithTop},
         fillLinearGradientEndPoint: {x: 0, y: (this.y + this.roofHeight + this.sectionHeights[sectionIndex] - this.sectionSeparator)},
         fillLinearGradientColorStops: [0, this.parameters.smokestackColors.colorA, 1, 
            this.parameters.smokestackColors.colorB]
      });

      this.layer.add(this.smokestackShape);
   };

   House.prototype.previousSectionsHeight = function(sectionIndex) {
      var previousSectionsHeight = 0;

      for (var index = 0; index < sectionIndex; index++) {
         previousSectionsHeight += this.sectionHeights[index];
      }

      return previousSectionsHeight;
   };

   House.prototype.getSubSectionHeight = function(sectionIndex, subSectionIndex) {
      var sectionValue = this.values[sectionIndex].value;

      // avoid division by 0
      if (sectionValue === 0) {
         return 0;
      }

      var subSectionValue = this.values[sectionIndex].subSections[subSectionIndex].value;
      // TODO: round properly considering accumulated error
      var subSectionHeight = Math.round(this.sectionHeights[sectionIndex] * subSectionValue / sectionValue);
      return subSectionHeight;
   };

   House.prototype.relocateLabels = function() {
      var y;
      var showLabel;

      // top section
      var sectionIndex = 0;
      y = this.shapes[sectionIndex].getAbsolutePosition().y + this.roofHeight;
      var middle = this.sectionHeights[sectionIndex] / 2;
      showLabel = this.sectionHeights[sectionIndex] >= 40;
      this.amountLabels[sectionIndex].setVisible(showLabel);
      this.labels[sectionIndex].setVisible(showLabel);
      this.tooltips[sectionIndex].setVisible(!showLabel);
      if (showLabel) {
         this.labels[sectionIndex].setY(y + middle - 20);
         this.centerLabel(this.labels[sectionIndex]);
         this.amountLabels[sectionIndex].setY(y + middle + 0);
         this.centerLabel(this.amountLabels[sectionIndex]);
      }
      else {
         this.tooltips[sectionIndex].getText().setText(this.labels[sectionIndex].getText().getText() + " " + this.amountLabels[sectionIndex].getText().getText());
         this.tooltips[sectionIndex].setY(this.shapes[sectionIndex + 1].getAbsolutePosition().y);
      }

      // other sections
      for (sectionIndex = 1; sectionIndex < this.sections.length; sectionIndex++) {
         y = this.shapes[sectionIndex].getAbsolutePosition().y;
         middle = this.sectionHeights[sectionIndex] / 2;
         showLabel = this.sectionHeights[sectionIndex] >= this.triggerTooltipHeight;
         this.amountLabels[sectionIndex].setVisible(showLabel);
         this.labels[sectionIndex].setVisible(showLabel);
         this.tooltips[sectionIndex].setVisible(!showLabel);
         if (showLabel) {
            this.labels[sectionIndex].setY(y + middle - 20);
            this.centerLabel(this.labels[sectionIndex]);
            this.amountLabels[sectionIndex].setY(y + middle + 0);
            this.centerLabel(this.amountLabels[sectionIndex]);
         }
         else {
            this.tooltips[sectionIndex].getText().setText(this.labels[sectionIndex].getText().getText() + " " + this.amountLabels[sectionIndex].getText().getText());
            this.tooltips[sectionIndex].setY(y);
         }
      }

      // subsections
      for (sectionIndex = 0; sectionIndex < this.sections.length; sectionIndex++) {
         var section = this.sections[sectionIndex];
         var sectionAmountLabelBottom = this.amountLabels[sectionIndex].y() + this.amountLabels[sectionIndex].height();

         for (var subSectionIndex = 0; subSectionIndex < section.subSections.length; subSectionIndex++) {
            var label = this.subSectionLabels[sectionIndex][subSectionIndex];
            var shape = this.subSectionShapes[sectionIndex][subSectionIndex];
            var labelHeight = label.height();
            var subSectionHeight = this.getSubSectionHeight(sectionIndex, subSectionIndex);
            var shapeY = shape.y();
            label.setY(shapeY);

            // hide the label if it's corresponding shape is too small or if it will probably collide with other labels
            label.visible(labelHeight < subSectionHeight && shapeY > sectionAmountLabelBottom);

            label.draw();
         }
      }
   };

   House.prototype.createText = function(text) {
      return new Kinetic.Text({
         text: text,
         fontFamily: this.fontFamily,
         fontStyle: 'bold',
         fontSize: this.textFontSize,
         fill: 'white',
         letterSpacing: this.letterSpacing
      });
   };

   House.prototype.createSmallText = function (text) {
      return new Kinetic.Text({
         text: text,
         fontFamily: this.fontFamily,
         fontStyle: 'normal',
         fontSize: this.smallTextFontSize,
         fill: 'white',
         letterSpacing: this.letterSpacing
      });
   };

   House.prototype.centerLabel = function(label) {
      var center_x = this.getCenterXforLabels();
      var width = label.getText().getTextWidth();
      label.setX(center_x - width / 2);
   };

   House.prototype.createCenteredLabel = function(text, center_x, y) {
      var width = text.getTextWidth();
      var label = new Kinetic.Label({
         x: center_x - (width / 2),
         y: y,
         opacity: 1.00
      });
      label.add(text);

      this.layer.add(label);         

      return label;
   };

   function createTooltip(x, y, direction, startColor, endColor, fontFamily, letterSpacing, fontSize) {

      var tooltip = new Kinetic.Label({
         x: x,
         y: y,
         opacity: 0.75
      });

      tooltip.add(new Kinetic.Tag({
         pointerDirection: direction,
         pointerWidth: 10,
         pointerHeight: 10,
         lineJoin: 'round',
         shadowColor: 'black',
         shadowBlur: 10,
         shadowOffset: {x: 7, y: 7},
         shadowOpacity: 0.5,
         fillLinearGradientStartPoint: {x: 0, y: 0},
         fillLinearGradientEndPoint: {x: 0, y: 50},
         fillLinearGradientColorStops: [0, startColor, 1, endColor]
      }));

      var kinetic = new Kinetic.Text({
         text: '',
         fontFamily: fontFamily,
         fontSize: fontSize,
         padding: 5,
         fill: 'white',
         letterSpacing: letterSpacing
      });

      tooltip.add(kinetic);
      return tooltip;
   }
   return House;
});
