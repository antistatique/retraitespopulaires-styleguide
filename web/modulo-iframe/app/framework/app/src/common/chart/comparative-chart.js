define('common-comparative-chart', [
   'base-bar-chart',
   'logger'
], function(BaseBarChart, Logger) {

   var log = Logger.get('ComparativeChart');

   var ComparativeChart = function() {
      this.createComparativeChart = function(id, currentColor, alternativeColor, increaseColor, decreaseColor, currencyFormatter) {
         var chart = new BaseBarChart().createChart(id, true, currencyFormatter);

         chart.currentColor = currentColor;
         chart.alternativeColor = alternativeColor;
         chart.increaseColor = increaseColor;
         chart.decreaseColor = decreaseColor;

         chart.localize = null;

         //Limits are fixed on this chart, so set them at the beginning
         chart.interactivity.setMinimumX(0.0);
         chart.interactivity.setMaximumX(10.0); //TODO
         chart.interactivity.setIsEnabledHandler(function() {
            return !chart.animator.drawing;
         });

         chart.setOnHover = function(onHoverHandler) {
            chart.interactivity.setOnHover(onHoverHandler);
         };
         
         chart.setValues = function(taxSaving, currentValue, alternativeValue, currentLabel, newLabel) {
            this.previousSets = this.sets;
            this.previousMax = this.max;
            this.previousOptions = this.options;

            chart.taxSaving = taxSaving;
            chart.currentValue = currentValue;
            chart.alternativeValue = alternativeValue;

            chart.max = Math.max(currentValue, alternativeValue);
            chart.sets = chart.buildSets();

            chart.configureForDataSets(this.sets, currentLabel, newLabel);
         };

         chart.buildSets = function() {
            var savingIsNegative = false;

            if (chart.taxSaving < 0) {
               savingIsNegative = true;
               chart.taxSaving = -chart.taxSaving;
            }

            var currentTax = [];
            currentTax.push([0, chart.currentValue]);
            currentTax.push([1, null]);

            var alternativeTax = [];
            alternativeTax.push([0, null]);
            alternativeTax.push([1, chart.alternativeValue]);

            //The order of the sets is important because the nulls we use
            //to avoid lines for zero values change the "base" of the next
            //stacked box.
            var dataSets = [];
         
            if (chart.currentValue === chart.alternativeValue) {
               dataSets = [
                     {label: 'current', data: currentTax, color: chart.currentColor},
                     {label: 'alternative', data: alternativeTax, color: chart.alternativeColor}
                  ];
            }
            else {
               if (savingIsNegative) {
                  dataSets = [
                        {label: 'current', data: currentTax, color: chart.currentColor},
                        {label: 'alternative', data: alternativeTax, color: chart.increaseColor}
                     ];
               }
               else {
                  dataSets = [
                        {label: 'current', data: currentTax, color: chart.currentColor},
                        {label: 'alternative', data: alternativeTax, color: chart.decreaseColor}
                     ];
               }
            }
            return dataSets;
         };

         chart.configureForDataSets = function(dataSets, currentLabel, newLabel) {
            var currentValue = dataSets[0].data[0][1];
            var alternativeValue = dataSets[0].data[0][1]; //assume they are equal
            if (dataSets.length > 0) {
               alternativeValue = dataSets[1].data[1][1]; //assume they are equal
            }

            //var savingTax = currentValue - alternativeValue;
            
            var max = Math.max(currentValue, alternativeValue);

            chart.ensureHeightIsValid();
            
            chart.utils.determineTickAppearance(max);
            
            var yticks = chart.getTicks(dataSets);

            this.options = {
               series: {
                  stack: true,
                  lines: {
                     show: false,
                     fill: true,
                     steps: false
                  },
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
                show: (currentLabel !== undefined && newLabel !== undefined),
                ticks: [[0, currentLabel], [1, newLabel]],//string
                color: "rgba(0,0,0,0)", //make the lines transparent
                min: -0.5,
                max: 1.5
               },
               yaxis: {
                ticks: yticks,
                color: "rgba(0,0,0,0)", //make the lines transparent
                min: 0.0,
                tickFormatter: chart.utils.formatTickValue
               },
               grid: {
                  //show: true
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
                  },
                  markings: [{ xaxis: { from: -0.5, to: 1.5 },
                               yaxis: { from: chart.currentValue, to: chart.currentValue },
                               color: "black",
                               lineWidth: 1 }]
               }
            };
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
            
            var placeholder = $(this.id);
            placeholder.append("<div class='chart-topleft-label'>" + currencyString + "</div>");
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
            
            return { xychart: true,
                     previousSets: $.extend(true, [], this.previousSets),
                     newSets: $.extend(true, [], this.sets),
                     previousMax: this.previousMax,
                     max: this.max,
                     previousColumns: 2,
                     columns: 2,
                     previousTicks: previousTicks,
                     newTicks: this.options.yaxis.ticks
                   };
         };

         chart.createPlot = function(sets) {
            chart.interactivity.configureOptions(this.options);
            var plot = fplot($(chart.id), sets, this.options);
            chart.drawLabels();
            chart.interactivity.setPreloadMessages(false);
            chart.interactivity.activate(plot);
            chart.interactivity.setMinimumX(this.options.xaxis.min);
            return plot;
         };

         chart.getTicks = function(sets) {
            var currentValue = sets[0].data[0][1];
            var alternativeValue = sets[0].data[0][1]; //assume they are equal
            if (sets.length > 0) {
               alternativeValue = sets[1].data[1][1]; //assume they are equal
            }

            var max = Math.max(currentValue, alternativeValue);

            var placeholder = $(chart.id);

            //Handmade code to avoid overlaps
            var yticks = [0];

            if (!chart.utils.overlaps(currentValue, yticks, placeholder)) {
               yticks.push(currentValue);
            }

            if (!chart.utils.overlaps(alternativeValue, yticks, placeholder)) {
               yticks.push(alternativeValue);
            }
            return yticks;
         };
         
         //Workaround
         //See http://stackoverflow.com/questions/5427725/flot-graph-does-not-render-when-parent-container-is-hidden
         //Also http://bibwild.wordpress.com/2010/07/22/flot-in-a-hidden-div/
         function fplot(e, data, options) {
            var jqParent;
            var jqHidden;
            if (true) { //e.offsetWidth <=0 || e.offetHeight <=0
               // lets attempt to compensate for an ancestor with display:none
               jqParent = $(e).parent();
               jqHidden = $("<div style='visibility:hidden'></div>");
               $('body').append(jqHidden);
               jqHidden.append(e);
            }

            var plot = $.plot(e, data, options);

            // if we moved it above, lets put it back
            if (jqParent) {
               jqParent.append(e);
               jqHidden.remove();
            }

            return plot;
         }

         return chart;
      };
   };

   return ComparativeChart;
});
