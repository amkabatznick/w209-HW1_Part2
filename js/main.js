var parser = d3.timeParse("%m/%d/%y %H:%M");

var barChartClass = barChart()
    .x(function(d) {return d.key;})
    .y(function(d) {return d.value;});
var barChartWorkouts = barChart()
    .x(function (d) {return d.key;})
    .y(function(d) {return d.value;});

d3.csv("https://raw.githubusercontent.com/amkabatznick/W209/master/AMK_Peloton.csv",function(d){
    return {
      time: parser(d['Workout Timestamp (EST)']),
      avg_watts: +d['Avg. Watts'],

      type: d.Type
    };
  },
  function(data) {
    var csData = crossfilter(data);

    // We create dimensions for each attribute we want to filter by
    csData.dimClassType= csData.dimension(function (d) { return d.type; });
    csData.dimWorkouts = csData.dimension(function (d) { return d.time; });

    // We bin each dimension
    //csData.classTypes = csData.dimClassType.group();
    csData.workoutNames = csData.dimWorkouts.group().reduceSum(function(d) { return d.avg_watts; });
    csData.classTypes = csData.dimClassType.group().reduceSum(function(d) { return d.avg_watts; });


    barChartClass.onMouseOver(function (d) {
      csData.dimClassType.filter(d.key);
      update();
    }).onMouseOut(function () {
      // Clear the filter
      csData.dimClassType.filterAll();
      update();
    });

      function update() {
      d3.select("#workoutTypes")
        .datum(csData.classTypes.all(0))
        .call(barChartClass);

      d3.select("#workouts")
        .datum(csData.workoutNames.all())
        .call(barChartWorkouts)
        .select(".x.axis") //Adjusting the tick labels after drawn
        .selectAll(".tick text")
        .attr("transform", "translate(-8,-1) rotate(-45)");

    }

    update();


});
