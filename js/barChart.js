function barChart(){
  var margin = { left: 50, right: 10, top: 10, bottom: 30 };
  var height = 400;
  var width = 400;


  var figw = width - margin.left - margin.right,
      figh = height - margin.top - margin.bottom,
      // xValue = function(d){ return d[0]; },c
      // yValue = function(d){return d[1]; },
      xScale = d3.scaleBand().padding(0.1),
      yScale = d3.scaleLinear(),
      onMouseOver = function() {},
      onMouseOut = function() {};




  function chart(selection){
    selection.each(function(data){

      //Select SVG if exits
      var svg = d3.select(this).selectAll("svg").data([data]);

      //If not create svg
      var svgEnter = svg.enter().append("svg");
      var gEnter = svgEnter.append("g");
      gEnter.append("g").attr("class","x axis");
      gEnter.append("g").attr("class","y axis");

      //Update outter dimmensions
      svg.merge(svgEnter)
        .attr("width",width)
        .attr("height", height);

      //update inner dimmensions
      var g = svg.merge(svgEnter)
                 .select("g")
                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      xScale.rangeRound([0, figw])
             .domain(data.map(xValue));
      yScale.rangeRound([figh, 0])
             .domain([0, d3.max(data, yValue)]);

       g.select('.x.axis')
       .attr("transform", "translate(0," + figh + ")")
       .call(d3.axisBottom(xScale));

       g.select(".y.axis")
        .call(d3.axisLeft(yScale).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

  var bars = g.selectAll(".bar")
    .data(function (d) { return d; });

  bars.enter().append("rect")
      .attr("class", "bar")
      .merge(bars)
      .attr("x", X)
      .attr("y", Y)
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) { return figh- Y(d); })
      .on("mouseover", onMouseOver)
      .on("mouseout", onMouseOut);

      bars.exit().remove();
    });
  }

  // The x-accessor for the path generator; xScale ∘ xValue.
  function X(d) {
    return xScale(xValue(d));
  }

  // The y-accessor for the path generator; yScale ∘ yValue.
  function Y(d) {
    return yScale(yValue(d));
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  chart.onMouseOver = function(_) {
    if (!arguments.length) return onMouseOver;
    onMouseOver = _;
    return chart;
  };

  chart.onMouseOut = function(_) {
    if (!arguments.length) return onMouseOut;
    onMouseOut = _;
    return chart;
  };


  return chart;
}
