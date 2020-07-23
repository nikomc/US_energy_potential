// set the dimensions and margins of the graph
var margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 650 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var parseTime = d3.timeParse("%Y");

//Read the data
d3.csv("../../../data/energy_prod_cons_full.csv").then(function(data) {
  data.forEach(function(d) {
    d.year = parseTime(d.year);
    d.billions_BTU = +d.billions_BTU;
  });

  var data = data.filter(function(d) { return d.state == 'CA' && d.type == 'nuclear' && d.boolean == 'consumption'})
  console.log(data);

  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {return d.billions_BTU})])
    .range([height - margin.top, margin.bottom]);

  var x = d3.scaleTime()
      .domain([
        d3.min(data, function(d) {return d.year;}),
        d3.max(data, function(d) {return d.year;})
      ])
      .range([margin.left, width - margin.right]);

  var line = d3.line()
      .x(function(d) {return x(d.year); })
      .y(function(d) {return y(d.billions_BTU); });

      // append the svg object to the body of the page
  var svg = d3.select("#my_dataviz")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

  svg.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr('fill', 'none')
    .attr('d', line);

  var xAxis = g => g
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(width / 80))
      .call(g => g.select(".domain").remove());

  var yAxis = g => g
    .attr("transform", 'translate(' + (margin.left + 10) + ',0)')
    .call(d3.axisLeft(y));

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);

  //
  //   svg
  //     .append("g")
  //     .attr("fill", "steelblue")
  //     .selectAll("rect")
  //     .data(data)
  //     .join("rect")
  //     .attr("x", x(0))
  //     .attr("y", (d, i) => y(i))
  //     .attr("width", d => x(d.billions_BTU) - x(0))
  //     .attr("height", y.bandwidth());
  //
  //   svg
  //     .append("g")
  //     .attr("fill", "white")
  //     .attr("text-anchor", "end")
  //     .attr("font-family", "sans-serif")
  //     .attr("font-size", 10)
  //     .selectAll("text")
  //     .data(data)
  //     .join("text")
  //     .attr("x", d => x(d.billions_BTU))
  //     .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
  //     .attr("dy", "0.35em")
  //     .attr("dx", -4)
  //     .text(d => +d.billions_BTU)
  //     .call(text =>
  //       text
  //         .filter(d => x(d.billions_BTU) - x(0) < 45) // short bars
  //         .attr("dx", +6)
  //         .attr("fill", "black")
  //         .attr("text-anchor", "start")
  //     );
  //
  //   svg
  //     .append('text')
  //     .attr('text-anchor', 'center')
  //     .attr('font-size', 12)
  //     .style('color', 'white')
  //     .attr('x', width - margin.right)
  //     .attr('y', margin.top - 10)
  //     .text('Billions BTU');
  //
  //   svg.append("g").call(xAxis);
  //
  //   svg.append("g").call(yAxis);

})
