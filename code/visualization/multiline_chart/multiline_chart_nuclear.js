// set the dimensions and margins of the graph
var margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var parseTime = d3.timeParse("%Y");

var svg = d3.select("#chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("../../../data/energy_prod_cons_full.csv", d3.autoType).then(function(data) {

  // data.forEach(function(d) {
  //   d.year = parseTime(d.year);
  //   d.billions_BTU = +d.billions_BTU;
  // });

  var sumstat = d3.nest()
    .key(function(d) {return d.state;})
    .entries(data);

  var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.year; }))
      .range([0, width]);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));

  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {return +d.billions_BTU; })])
    .range([height, 0]);

  svg.append("g")
    .call(d3.axisLeft(y));

  var line = d3.line()
      .x(function(d) {return x(d.year); })
      .y(function(d) {return y(d.billions_BTU); })
      .curve(d3.curveBasis); // different than v4, which used .interpolate("basis")

  svg.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 6.5)
    .attr('fill', 'none')
    .attr('d', line);
    // .on("mouseover", function(d) {
    //   var coordinates = d3.mouse(this);
    //   var xPosition = coordinates[0] + margin.left;
    //   var yPosition = coordinates[1] - margin.top;
    //
    //   d3.select("#tooltip")
    //     .style("left", xPosition + "px")
    //     .style("top", yPosition + "px")
    //     .select("#state_name")
    //       .text(d.state)
    //     .select("#value_label")
    //       .text(+d.billions_BTU, d.year);
    //
    //   d3.select("#tooltip").classed("hidden", false);
    // })
    // .on("mouseout", function() {
    //   d3.select("#tooltip").classed("hidden", true);
  //   // });
  //
  // var xAxis = g => g
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(d3.axisBottom(x).ticks(width / 80))
  //     .call(g => g.append("text")
  //       .attr("x", width - margin.right)
  //       .attr("y", margin.bottom - 4)
  //       .attr("fill", "currentColor")
  //       .attr("text-anchor", "end")
  //       .text("Increasing Years →"));
  //
  // var yAxis = g => g
  //   .attr("transform", 'translate(' + (margin.left + 10) + ',0)')
  //   .call(d3.axisLeft(y).ticks(10).tickFormat(d3.formatPrefix("1.0", 1e5)))
  //   .call(g => g.append("text")
  //       .attr("x", -margin.left)
  //       .attr("y", 20)
  //       .attr("fill", "currentColor")
  //       .attr("text-anchor", "start")
  //       .text("↑ Billions BTU"));
  //
  // svg.append("g").call(xAxis);
  // svg.append("g").call(yAxis);

  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", (margin.top + 4))
    .attr("class", "title")
    .attr("text-anchor", "middle")
    .text("Nuclear Power Usage in California");

});
