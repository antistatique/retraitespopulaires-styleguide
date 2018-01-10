define('common-single-bar-chart', [
   'base-bar-chart',
   'logger'
], function(BaseBarChart, Logger) {

   var log = Logger.get('SingleBarChart');

   var SingleBarChart = function() {
      this.createSingleBarChart = function(id, currencyFormatter) {
         var chart = new BaseBarChart().createChart(id, true, currencyFormatter);

         chart.xAxisLabel = "";
         chart.topMargin = 20;
         chart.topValueFactor = 1.0; //the top value on the chart can be greater than the max value

         chart.localize = null;
         
         //Limits are fixed on this chart, so set them at the beginning
         chart.interactivity.setMinimumX(0.0);
         chart.interactivity.setMaximumX(1.0);
         chart.interactivity.setIsEnabledHandler(function() {
            return !chart.animator.drawing;
         });

         chart.addSerie = function(name, color, isLine, order, lineThickness) {
            var serie = {};
            serie.name = name;
            serie.color = color;
            serie.isLine = isLine;
            serie.order = order;
            serie.lineThickness = lineThickness ? lineThickness : 2;

            chart.series.push(serie);
         };

         chart.setXAxisLabel = function(xAxisLabel) {
            chart.xAxisLabel = xAxisLabel;
         };

         chart.setOnHover = function(onHoverHandler) {
            chart.interactivity.setOnHover(onHoverHandler);
         };

         chart.setValues = function(valuesForSeries) {
            this.previousSets = this.sets;
            this.previousMax = this.max;
            this.previousOptions = this.options;

            for (var serieIndex = 0; serieIndex < chart.series.length; serieIndex++) {
               var serie = chart.series[serieIndex];
               serie.value = valuesForSeries[serieIndex];
            }
            chart.prepare();
         };
         
         chart.createSets = function(seriesParam) {
            var sets = [];
            
            for (var serieIndex = 0; serieIndex < seriesParam.length; serieIndex++) {
               var serie = seriesParam[serieIndex];
               var value = serie.value;

               // Do not show null values in the chart.
               // A null value means that the serie has no meaningful value for this column
               // That's not the same as having value 0 (meaning that the serie is valid for the column, but just has 0 value).
               // In case of value 0, a 1 pixel line is drawn, while nothing appears when the value is null.
               if (value.begin === null) {
                  continue;
               }

               var set;
               if (serie.isLine) {
                  set = [];
                  set.push([-1, value.begin]);
                  set.push([2, value.begin]);

                  sets.push({
                     label: serie.name, order: serie.order, data: set, color: serie.color, stack: false,
                     lines: {show: true, fill: false, steps: false, lineWidth: serie.lineThickness}
                  });
               }
               else {
                  //When the serie is 0, some versions of Chrome
                  //show a strange representation of the data. So zero
                  //values are just ignored (they shouldn't be drawn, anyway)
                  if (value.begin === 0) {
                     continue;
                  }

                  set = [];
                  set.push([0, value.begin]);
                  set.push([1, value.begin]);

                  sets.push({label: serie.name, order: serie.order, data: set, color: serie.color});
               }
            }
            
            return sets;
         };
         
         chart.prepare = function() {
            chart.max = chart.getMaxValue();
            chart.utils.determineTickAppearance(chart.max);
            chart.ensureHeightIsValid();
            chart.sets = chart.createSets(chart.series);

            chart.options = {
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
                     //barWidth: 0.6
                     barWidth: 0.75,
                     align: "center"
                  }
               },
               xaxis: {
                  show: true,
                  ticks: [],
                  color: "rgba(0,0,0,0)", //make the lines transparent
                  min: -0.10,
                  max: 1.10
               },
               yaxis: {
                  ticks: chart.getTicks(chart.sets),
                  color: "rgba(0,0,0,0)", //make the lines transparent
                  tickFormatter: this.tickFormatter
               },
               grid: {
                  // show: true,
                  aboveData: true,
                  borderWidth: {
                     top: 0,
                     left: 1,
                     bottom: 1,
                     right: 0
                  },
                  margin: {
                     top: chart.topMargin,
                     left: 5,
                     bottom: 10,
                     right: 0
                  },
                  markings: [],
                  hoverable: true,
                  clickable: true
               },
               legend: {
                   show: false
               }
            };
         };
         
         chart.getMaxValue = function() {
            var max = 0;

            var accumulatedBegin = 0;
            var accumulatedEnd = 0;
            var serieIndex;
            var serie;

            for (serieIndex = 0; serieIndex < this.series.length; serieIndex++) {
               serie = this.series[serieIndex];

               if (!serie.isLine) {
                  accumulatedBegin += serie.value.begin;
                  accumulatedEnd += serie.value.end;
               }
            }

            if (accumulatedBegin > max) {
               max = accumulatedBegin;
            }

            if (accumulatedEnd > max) {
               max = accumulatedEnd;
            }

            for (serieIndex = 0; serieIndex < this.series.length; serieIndex++) {
               serie = this.series[serieIndex];

               if (serie.isLine) {
                  if (serie.value.begin > max) {
                     max = serie.value.begin;
                  }

                  if (serie.value.end > max) {
                     max = serie.value.end;
                  }
               }
            }

            return max;
         };

         chart.setTopMargin = function(topMargin) {
            chart.topMargin = topMargin;
         };

         chart.setTopValueFactor = function(topValueFactor) {
            chart.topValueFactor = topValueFactor;
         };
         
         chart.drawLabels = function() {
            var placeholder = $(chart.id);

            placeholder.append("<div class='single-bar-chart-bottom-label'>" + chart.xAxisLabel + "</div>");
            //Add currency string
            var currencyString;
            if (chart.useThousandsForTicks) {
               currencyString = chart.labelThounsandsForTicks; //this.getString("Charts.ThousandCurrency");
            }
            else {
               currencyString = chart.labelCurrency; //this.getString("Charts.Currency");
            }

            var labelY = chart.topMargin - 20;
            if (labelY < 0) {
               labelY = 0;
            }
            placeholder.append("<div class='chart-topleft-label' style='top: " + labelY + "px;'>" + currencyString + "</div>");
         };

         chart.tickFormatter = function(value, axis) {
            if (chart.topValueFactor > 1.0 && axis.direction === "y" && value === chart.max * chart.topValueFactor) {
               //The top value is just a "fake" value to give space for other labels,
               //so we don't want to show this value
               return "";
            }
            
            return chart.utils.formatTickValue(value);
         };

         chart.getYTicks = function() {
            //Use our own calculated ticks (see prepare), instead of flot ticks.
            //In this way, they will be correct even if the chart couldn't be
            //properly rendered (for example, when it is not being displayed).
            return chart.utils.getRawTicks(chart.options.yaxis.ticks);
         };

         chart.getXTicks = function() {
            var plot = chart.animator.plot;
            if (plot === null) {
               return [];
            }

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
            var plot = $.plot($(chart.id), sets, this.options);
            chart.drawLabels();
            chart.interactivity.setPreloadMessages(false);
            chart.interactivity.activate(plot);
            return plot;
         };

         chart.onAnimationStepSetDefined = function(set) {
            if (set.stack === false) {
               //it's a line set, so adjust the boundaries so the line
               //goes through the empty space at left and right
               set.data[0][0] = -1;
               set.data[1][0] = 2;
            }
         };

         chart.onRedraw = function(sets, plot) {
            chart.utils.removeBlankItemsFromSets(sets);
         };

         chart.getTicks = function(sets) {
            var yticks = [0];
            var placeholder = $(chart.id);
            var sum = 0;
            
            for (var setIndex = 0; setIndex < sets.length; setIndex++) {
               var set = sets[setIndex];
               var data = set.data[0][1];
               
               if (chart.utils.isSetALine(set)) {
                  if (!chart.utils.overlaps(data, yticks, placeholder)) {
                     yticks.push(data);
                  }
               }
               else {
                  sum += data;
                  
                  if (!chart.utils.overlaps(sum, yticks, placeholder)) {
                     yticks.push(sum);
                  }
               }
            }

            if (chart.topValueFactor > 1.0) {
               yticks.push(chart.max * chart.topValueFactor);
            }
            
            return yticks;
         };

         return chart;
      };
   };

   return SingleBarChart;
});
