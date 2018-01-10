define([
   'common-bar-chart'
], function(BarChart) {
   'use strict';

   describe("BarChart Suite", function() {
      
      function drawBarChart(chart, timePeriods, values) {
         var sumDurations = 0;
         for (var timePeriodIndex = 0; timePeriodIndex < timePeriods.length; timePeriodIndex++) {
            sumDurations += timePeriods[timePeriodIndex].duration;
         }
         
         chart.setData(timePeriods, values, new Date().getFullYear() + sumDurations);
         
         chart.draw();
                  
         return chart;
      }
      
      function createSimpleBarChart(timePeriods, values, smoothing) {
         var chart = new BarChart().createBarChart("simpleBarChart");
         
         for (var valueIndex = 0; valueIndex < values.length; valueIndex++) {
            chart.addSerie("Serie " + valueIndex, "#7d9aa9", false, valueIndex);
         }
         
         //chart.setTopMargin(10);
         //chart.setTopValueFactor(1.30);
         chart.setSmoothing(smoothing);
         
         drawBarChart(chart, timePeriods, values);
 
         return chart;
      }

      it("check simple chart draw", function() {
         var timePeriods = [];
         var values = [];
         
         timePeriods.push({id: 'timePeriod 1', duration: 4, widthPercentage: 100 / 3});
         timePeriods.push({id: 'timePeriod 2', duration: 2, widthPercentage: 100 / 3 * 2});
         
         values = [
            [{begin: 0, end: 100}, {begin: 100, end: 200}, {begin: 200, end: 300}, {begin: 300, end: 400}, {begin: 400, end: 500}, {begin: 500, end: 600}],
            [{begin: 0, end: 50}, {begin: 50, end: 100}, {begin: 100, end: 150}, {begin: 150, end: 200}, {begin: 200, end: 250}, {begin: 250, end: 300}]
         ];
         
         var chart = createSimpleBarChart(timePeriods, values, false);
 
         
         var set1 = chart.sets[0];
         var set2 = chart.sets[1];
         
         expect(set1.label).toBe("Serie 0");
         expect(set2.label).toBe("Serie 1");
         expect(set1.data.length).toBe(values[0].length);
         expect(set2.data.length).toBe(values[1].length);
         expect(chart.timePeriods).toBe(timePeriods);
      });
      
      it("check simple chart draw with smoothing", function() {
         var timePeriods = [];
         var values = [];
         
         timePeriods.push({id: 'timePeriod 1', duration: 4, widthPercentage: 100 / 3});
         timePeriods.push({id: 'timePeriod 2', duration: 2, widthPercentage: 100 / 3 * 2});
         
         values = [
            [{begin: 0, end: 100}, {begin: 100, end: 200}, {begin: 200, end: 300}, {begin: 300, end: 400}, {begin: 400, end: 500}, {begin: 500, end: 600}],
            [{begin: 0, end: 50}, {begin: 50, end: 100}, {begin: 100, end: 150}, {begin: 150, end: 200}, {begin: 200, end: 250}, {begin: 250, end: 300}]
         ];
         
         var chart = createSimpleBarChart(timePeriods, values, true);
 
         
         var set1 = chart.sets[0];
         var set2 = chart.sets[1];
         
         expect(set1.label).toBe("Serie 0");
         expect(set2.label).toBe("Serie 1");
         expect(set1.data.length).toBe(values[0].length);
         expect(set2.data.length).toBe(values[1].length);
         expect(chart.timePeriods).toBe(timePeriods);
      });
      
      it("T1 65 a 69", function() {
         var timePeriods = [];
         var values = [];
         
         timePeriods.push({id: 'timePeriod 1', duration: 6, widthPercentage: 100});
         
         values = [
            [{begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}],
            [{begin: 100, end: 100}, {begin: 100, end: 100}, {begin: 100, end: 100}, {begin: 100, end: 100}, {begin: 100, end: 100}, {begin: 100, end: 100}],
            [{begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}],
            [{begin: 200, end: 200}, {begin: 200, end: 200}, {begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}],
            [{begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 200, end: 200}, {begin: 200, end: 200}, {begin: 200, end: 200}, {begin: 200, end: 200}]
         ];
         
         var chart = createSimpleBarChart(timePeriods, values, false);
 
         //console.log("Sets: " + JSON.stringify(chart.sets));
         //console.log("TimePeriods: " + JSON.stringify(chart.timePeriods));
         
         var set1 = chart.sets[0];
         var set2 = chart.sets[1];
         var set3 = chart.sets[2];
         var set4 = chart.sets[3];
         var set5 = chart.sets[4];
         
         expect(set1.data.length).toBe(values[0].length);
         expect(set2.data.length).toBe(values[1].length);
         expect(set3.data.length).toBe(values[2].length);
         expect(set4.data.length).toBe(values[3].length);
         expect(set5.data.length).toBe(values[4].length);
         expect(chart.timePeriods).toBe(timePeriods);

         timePeriods = [];
         values = [];
         
         timePeriods.push({id: 'timePeriod 1', duration: 1, widthPercentage: 100 / 3});
         timePeriods.push({id: 'timePeriod 2', duration: 5, widthPercentage: 100 / 3 * 2});
         
         values = [
            [{begin: 300, end: 300}, {begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}],
            [{begin: 0, end: 0}, {begin: 100, end: 100}, {begin: 100, end: 100}, {begin: 100, end: 100}, {begin: 100, end: 100}, {begin: 100, end: 100}],
            [{begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}],
            [{begin: 0, end: 0}, {begin: 200, end: 200}, {begin: 200, end: 200}, {begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}],
            [{begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 0, end: 0}, {begin: 200, end: 200}, {begin: 200, end: 200}, {begin: 200, end: 200}]
         ];
         
         chart = drawBarChart(chart, timePeriods, values);
 
         //console.log("Sets: " + JSON.stringify(chart.sets));
         //console.log("Series: " + JSON.stringify(chart.series));
         //console.log("TimePeriods: " + JSON.stringify(chart.timePeriods));
         
         set1 = chart.sets[0];
         set2 = chart.sets[1];
         set3 = chart.sets[2];
         set4 = chart.sets[3];
         set5 = chart.sets[4];
         
         expect(set1.data.length).toBe(values[0].length);
         expect(set2.data.length).toBe(values[1].length);
         expect(set3.data.length).toBe(values[2].length);
         expect(set4.data.length).toBe(values[3].length);
         expect(set5.data.length).toBe(values[4].length);
         expect(chart.timePeriods).toBe(timePeriods);
      });
      
   });
});
