define('common-percentage-indicator', [
   'logger',
   'kineticjs',
   'easing'
], function(Logger) {
   'use strict';

   var log = Logger.get('PercentageIndicator');

   var PercentageIndicatorStep = function(end_percentage, color, labelColor, labelTextColor, isStrictLimit, localize) {
      this.end_percentage = end_percentage;
      this.color = color;
      this.labelColor = labelColor;
      this.labelTextColor = labelTextColor;
      this.isStrictLimit = isStrictLimit;

      this.animationDuration = 150;
      this.animationSteps = 40;
      this.pendingAnimation = null;
      this.animation = null;
      this.firstDraw = true;
      this.localize = localize;
   };

   var PercentageIndicator = function(canvasId, start_percentage, end_percentage, steps, minimum, maximum, minimum_label, maximum_label,
           color_text_label, localize, decimal_flag, fontFamily, fontStyle, fontSize, letterSpacing, limitLabelFontSize, labelLine_y) {
      this.animationDuration = 150;
      this.animationSteps = 40;
      this.pendingAnimation = null;
      this.animation = null;
      this.firstDraw = true;

      this.canvasId = canvasId;
      this.steps = steps;
      this.start_percentage = start_percentage;
      this.end_percentage = end_percentage;
      this.minimum = minimum;
      this.maximum = maximum;
      this.maximum_label = maximum_label;
      this.minimum_label = minimum_label;
      this.color_text_label = color_text_label;
      this.percentage_value = start_percentage + end_percentage / 2;
      this.bar_height = 9;
      this.bar_x = 0;
      this.bar_y = 30;
      this.label_y = 10;
      this.stepRects = [];
      this.localize = localize;
      this.fontFamily = fontFamily ? fontFamily : 'Verdana';
      this.fontStyle = fontStyle ? fontStyle : 'bold';
      this.fontSize = fontSize ? fontSize : 14;
      this.limitLabelFontSize = limitLabelFontSize ? limitLabelFontSize : 10; 
      this.letterSpacing = letterSpacing ? letterSpacing : 'normal';
      this.labelLine_y = labelLine_y ? labelLine_y : 12;
      this.layer = this.getLayer();
      this.decimal_flag = decimal_flag;
   };

   PercentageIndicator.prototype.getCanvasWidth = function() {
      var canvas = document.getElementById(this.canvasId);
      var width = canvas.clientWidth;
      //check if the device is an iPhone or an iPod in order to avoid some strange effect of circular resizing
      if (/iPhone|iPod/i.test(navigator.userAgent)) {
         width = canvas.clientWidth - 20;
      }
      return width;
   };

   PercentageIndicator.prototype.getCanvasHeight = function() {
      var canvas = document.getElementById(this.canvasId);
      var height = canvas.clientHeight;
      return height;
   };

   PercentageIndicator.prototype.createStage = function() {
      this.stage = new Kinetic.Stage({
         container: this.canvasId,
         width: this.getCanvasWidth(),
         height: 90
      });
   };
   
   PercentageIndicator.prototype.updateStage = function() {
      this.stage.setAttr("width", this.getCanvasWidth());
   };

   PercentageIndicator.prototype.createLayer = function() {
      this.createStage();
      var layer = new Kinetic.Layer();
      this.stage.add(layer);
      this.createSteps(layer);
      this.createLimitLabel(layer);
      this.createValueLabel(layer);
      return layer;
   };
   
   PercentageIndicator.prototype.getLayer = function() {
      if (this.layer) {
         return this.layer;
      }
      if (this.getCanvasWidth() > 0) {
         this.layer = this.createLayer();
      }
      return this.layer;
   };

   PercentageIndicator.prototype.createSteps = function(layer) {
      var step_start = this.start_percentage;
      for (var index = 0, l = this.steps.length; index < l; ++index) {
         var step = this.steps[index];
         if (step.end_percentage < this.start_percentage) {
            //the step is outside the left limit
            continue;
         }
         if (step_start > this.end_percentage) {
            //the step is outside the right limit
            break;
         }

         var stepRect = new Kinetic.Rect({
            x: 10,
            y: 10,
            width: 10,
            height: 10,
            drawBorder: false,
            strokeWidth: 1,
            fill: step.color
         });

         layer.add(stepRect);
         this.stepRects.push(stepRect);
      }
   };

   PercentageIndicator.prototype.updateSteps = function() {
      var x = this.bar_x;
      var step_start = this.start_percentage;
      var step_end = null;
      var step_width;
      for (var index = 0, l = this.steps.length; index < l; ++index) {
         var step = this.steps[index];
         if (step.end_percentage < this.start_percentage) {
            //the step is outside the left limit
            continue;
         }
         if (step_start > this.end_percentage) {
            //the step is outside the right limit
            break;
         }
         step_end = Math.min(this.end_percentage, step.end_percentage);
         step_width = Math.round ((step_end  - step_start) / (this.end_percentage - this.start_percentage) * this.getCanvasWidth());
         
         var stepRect = this.stepRects[index];
         stepRect.setAttr("x", x);
         stepRect.setAttr("y", this.bar_y);
         stepRect.setAttr("width", step_width);
         stepRect.setAttr("height", this.bar_height);
         stepRect.setAttr("fill", step.color);

         x = x + step_width;
         step_start = step_end;
      }
   };

   PercentageIndicator.prototype.createLimitLabel = function(layer) {
      if (!this.color_text_label) {
         this.color_text_label = '#ab1530';
      }
      this.limitText = new Kinetic.Text({
         text: "",
         fontFamily: this.fontFamily,
         fontSize: this.limitLabelFontSize,
         fontStyle: this.fontStyle,
         fill: this.color_text_label /*minimum label*/
      });

      this.limitLabel = new Kinetic.Label({
         x: 0,
         y: 0,
         opacity: 1.00
      });
      this.limitLabel.add(this.limitText);
      layer.add(this.limitLabel);

      this.limitLabelLine = new Kinetic.Rect({
         x: 0,
         y: 0,
         width: 1,
         height: 0,
         drawBorder: false,
         fill: 'black'
      });
      layer.add(this.limitLabelLine);
   };

   PercentageIndicator.prototype.updateLimitLabels = function() {
      if (this.minimum && this.minimum_label) {
         this.updateLimitLabel(this.minimum, this.minimum_label);
      }
      if (this.maximum && this.maximum_label) {
         this.updateLimitLabel(this.maximum, this.maximum_label);
      }
   };

   PercentageIndicator.prototype.updateLimitLabel = function(value, labelText) {
      if (value < this.start_percentage || value > this.end_percentage) {
         return;
      }
      labelText = labelText.replace('&nbsp;', ' ');
   
      this.limitText.setAttr("text", labelText);

      var reference_position = (value - this.start_percentage) / (this.end_percentage - this.start_percentage) * this.getCanvasWidth();
      var label_width = this.limitText.getTextWidth();
      var label_x = Math.max(0, reference_position - ((label_width) / 2));

      this.limitLabel.setAttr("x", label_x);
      this.limitLabel.setAttr("y", this.label_y);

      var labelLine_y = this.label_y + this.labelLine_y;
      this.limitLabelLine.setAttr("x", reference_position);
      this.limitLabelLine.setAttr("y", labelLine_y);
      this.limitLabelLine.setAttr("height", this.bar_y + this.bar_height - labelLine_y);
   };
   
   PercentageIndicator.prototype.createValueLabel = function(layer) {
      this.valueBox = new Kinetic.Shape({
         x: 0,
         y: 0,
         width: this.getCanvasWidth(),
         height: this.getCanvasHeight()
      });
      layer.add(this.valueBox);
      
      var labelText = this.localize.getLocalizedString('GenericFormats.Percentage', {'VALUE': Math.round(this.percentage_value * 100), 'DECIMALS': this.decimal_flag});
      labelText = labelText.replace('&nbsp;', ' ');
      this.valueText = new Kinetic.Text({
         text: labelText,
         fontFamily: this.fontFamily,
         fontSize: this.fontSize,
         fontStyle: this.fontStyle,
         fill: this.getBoxTextColor(),
         align: 'center',
         letterSpacing: this.letterSpacing
      });

      this.valueLabel = new Kinetic.Label({
         x: 0,
         y: 0,
         opacity: 1.00
      });
      this.valueLabel.add(this.valueText);
      layer.add(this.valueLabel);
   };

   PercentageIndicator.prototype.updateValueLabel = function() {
      var that = this;

      var pos = Math.max(Math.min(this.end_percentage, this.percentage_value), this.start_percentage);
      var relative_percentage = (pos -  this.start_percentage) / (this.end_percentage - this.start_percentage);
      var reference_position = Math.min(this.getCanvasWidth(), relative_percentage * this.getCanvasWidth());
      var labelText = this.localize.getLocalizedString('GenericFormats.Percentage', {'VALUE': this.percentage_value * 100, 'DECIMALS': this.decimal_flag});
      labelText = labelText.replace('&nbsp;', ' ');
      this.valueText.setAttr("text", labelText);
      this.valueText.setAttr("fill", this.getBoxTextColor());

      var label_width = this.valueText.getTextWidth();
      var label_height = this.valueText.getTextHeight();

      var x_inset = 5;
      var y_inset = 3;

      var box_heigth = 14 + (2 * y_inset);
      var box_length = label_width + (2 * x_inset);
      if (box_length > that.getCanvasWidth()) {
         return;
      }

      var triangle_top_x = reference_position;
      var triangle_top_y = that.bar_y + that.bar_height + 2;
      var triangle_left_x = Math.max(0, reference_position - 10);
      var triangle_right_x = Math.min(that.getCanvasWidth(), reference_position + 10);

      var box_x1 = Math.max(0, Math.min(reference_position - (box_length / 2), that.getCanvasWidth() - box_length));
      var box_x2 = box_x1 + box_length;
      var box_y1 = triangle_top_y + 10;
      var box_y2 = box_y1 + box_heigth;

      this.valueBox.setAttr("fill", this.getBoxColor());
      this.valueBox.setAttr("drawFunc", function(context) {
         context.beginPath();
         context.moveTo(triangle_top_x, triangle_top_y);
         context.lineTo(triangle_left_x, box_y1);
         context.lineTo(box_x1, box_y1);
         context.lineTo(box_x1, box_y2);
         context.lineTo(box_x2, box_y2);
         context.lineTo(box_x2, box_y1);
         context.lineTo(triangle_right_x, box_y1);

         context.lineWidth = 0;
         context.closePath();

         context.fillStrokeShape(this);
      });

      this.valueLabel.setAttr("x", (box_x1 + box_x2) / 2 - label_width / 2);
      this.valueLabel.setAttr("y", (box_y1 + box_y2) / 2 + 4 - label_height / 2 - y_inset);
   };

   PercentageIndicator.prototype.checkCanvasStatus = function() {
      var canvas = document.getElementById(this.canvasId);
      if (!canvas) {
         return false;
      }

      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      // WARNING: check width only
      // When the percentage indicator is not even initialized/visible, the width and height answer 0
      // When the first drawing attempt happens, the width is no longer 0, but the height it's still 0.
      // Only after some other draw step the height takes its final value.
      return canvas.width !== 0 && canvas.width !== undefined;
   };
   PercentageIndicator.prototype.updateValues = function(steps, minimum, maximum, minimum_label, maximum_label) {
      if (steps !== undefined) {
         this.steps = steps;
      }
      if (minimum !== undefined) {
         this.minimum = minimum;
      }
      if (maximum !== undefined) {
         this.maximum = maximum;
      }
      if (minimum_label !== undefined) {
         this.minimum_label = minimum_label;
      }
      if (maximum_label !== undefined) {
         this.maximum_label = maximum_label;
      }
   };

   PercentageIndicator.prototype.drawIndicatorForced = function(percentage_value, steps, minimum, maximum, minimum_label, maximum_label) {
      if (!this.checkCanvasStatus()) {
         return;
      }
   
      this.updateValues(steps, minimum, maximum, minimum_label, maximum_label);
     
      var layer = this.getLayer();
      if (!layer) {
         return;
      }
      
      if (this.animation) {
         log.debug("ALREADY ANIMATING");
         this.pendingAnimation = {
               percentage_value: percentage_value,
               forced: true
         };
         return;
      }
      
      //First time, draw without animation
      this.updateStage();
      this.updateLimitLabels();
      this.updateSteps();
      this.percentage_value = Math.max(0, Math.min(this.end_percentage, percentage_value));
      if (percentage_value !== null) {
         this.updateValueLabel();
      }

      this.getLayer().draw();
   };

   PercentageIndicator.prototype.drawIndicator = function(percentage_value, steps, minimum, maximum, minimum_label, maximum_label) {
      if (!this.checkCanvasStatus()) {
         return;
      }
   
      this.updateValues(steps, minimum, maximum, minimum_label, maximum_label);
   
      if (this.firstDraw) {
         //First time, draw without animation
         this.drawIndicatorForced(percentage_value);
         this.updateStage();
         this.updateLimitLabels();
         this.updateSteps();
         this.percentage_value = Math.max(0, Math.min(this.end_percentage, percentage_value));
         if (percentage_value !== null) {
            this.updateValueLabel();
         }
   
         this.getLayer().draw();
         this.firstDraw = false;
         return;
      }
   
      percentage_value = Math.max(0, Math.min(this.end_percentage, percentage_value));
      
      if (this.getCanvasHeight() <= 0) {
         this.drawPending = true;
         return;
      }
      if (!this.getLayer()) {
        return;
      }
      if (!this.checkCanvasStatus()) {
         return;
      }
      /*var canvas = document.getElementById(this.canvasId);
      if (!canvas) {
         return;
      }

      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;*/

      if (this.percentage_value === percentage_value) {
         log.debug("avoid updating values, already set");
         this.getLayer().draw();
         return;
      }

      if (this.animation) {
         log.debug("ALREADY ANIMATING");
         this.pendingAnimation = {
            percentage_value: percentage_value,
            forced: false
         };
         return;
      }

      this.animation = {}; //just signal that we are animating, as soon as possible

      this.updateStage();
      this.updateLimitLabels();
      this.updateSteps();

      var originalPercentageValue = this.percentage_value;
      
      var totalDifferencePercentageValue = percentage_value - originalPercentageValue;

      log.debug("STARTING ANIMATION " + percentage_value);
      
      this.animation = {
         currentAnimationStep : 0,
         originalPercentageValue : originalPercentageValue,
         finalPercentageValue : percentage_value,
         stepDifferencePercentageValue : totalDifferencePercentageValue / this.animationSteps
      };
      
      var that = this;
      setTimeout(function() {
         that.runAnimation(that);
      }, this.animationDuration / this.animationSteps);
   };

   PercentageIndicator.prototype.runAnimation = function(percentageIndicator) {
      if (percentageIndicator.animation.currentAnimationStep === percentageIndicator.animationSteps) {
         log.debug("FINISHING ANIMATION");
         percentageIndicator.drawIndicatorForAnimationStep(percentageIndicator.animation.finalPercentageValue);
         percentageIndicator.animation = null;
         if (percentageIndicator.pendingAnimation) {
            var newPercentageValue = percentageIndicator.pendingAnimation.percentage_value;
            //TODO
            percentageIndicator.pendingAnimation = null;
            log.debug("Starting pending animation");
            percentageIndicator.drawIndicator(newPercentageValue);
         }
         return;
      }
      
      percentageIndicator.drawAnimationStep();

      percentageIndicator.animation.currentAnimationStep++;

      setTimeout(function() {
         percentageIndicator.runAnimation(percentageIndicator);
      }, percentageIndicator.animationDuration / percentageIndicator.animationSteps);
   };

   PercentageIndicator.prototype.drawAnimationStep = function() {
      var that = this;
      var calculateStepValue = function(startValue, differenceValue) {
         return easeInOutQuint(that.animation.currentAnimationStep,
                               startValue,
                               differenceValue * that.animation.currentAnimationStep,
                               that.animationSteps);
      };
      var newPercentageValue = calculateStepValue(this.animation.originalPercentageValue, this.animation.stepDifferencePercentageValue);

      this.drawIndicatorForAnimationStep(newPercentageValue);
   };

   PercentageIndicator.prototype.drawIndicatorForAnimationStep = function(percentage_value) {

      this.percentage_value = Math.max(0, Math.min(this.end_percentage, percentage_value));
      if (percentage_value !== null) {
         this.updateValueLabel();
      }

      this.getLayer().draw();
   };

   PercentageIndicator.prototype.getBoxColor = function() {
      var step = this.getPercentageStep();
      return this.steps[step].labelColor;
   };
   
   PercentageIndicator.prototype.getBoxTextColor = function() {
      var step = this.getPercentageStep();
      return this.steps[step].labelTextColor;
   };

   PercentageIndicator.prototype.getPercentageStep = function() {
      return this.getPercentageStepFor(this.percentage_value);
   };

   PercentageIndicator.prototype.getPercentageStepFor = function(percentage_value) {
      if (percentage_value >= this.end_percentage) {
         return this.steps.length - 1;
      }
      for (var index = 0, l = this.steps.length; index < l; ++index) {
         if (percentage_value < this.steps[index].end_percentage  ||
            (!this.steps[index].isStrictLimit && percentage_value <= this.steps[index].end_percentage)) {
            return index;
         }
      }
      return this.steps.length - 1;
   };

   PercentageIndicator.prototype.setMaximumLabel = function(newLabel)  {
      newLabel = newLabel.replace('&nbsp;', ' ');
      this.maximum_label = newLabel;
   };

   PercentageIndicator.prototype.setMinimumLabel = function (newLabel) {
      newLabel = newLabel.replace('&nbsp;', ' ');
      this.minimum_label = newLabel;
   };
   
   PercentageIndicator.Step = PercentageIndicatorStep;

   return PercentageIndicator;
});
