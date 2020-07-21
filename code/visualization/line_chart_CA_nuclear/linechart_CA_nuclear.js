// set the dimensions and margins of the graph
var margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 650 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/nikomc/US_energy_potential/master/data/energy_prod_cons_full.csv", d3.autoType).then(function(data) {

  var data = data.filter(function(d) { return d.state == 'CA' && d.type == 'nuclear' && d.boolean == 'consumption'})

  var y = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1);

  var x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.billions_BTU)])
      .range([margin.left, width - margin.right]);

  var xAxis = g => g
      .attr("transform", `translate(0,${margin.top})`)
      .call(d3.axisTop(x).ticks(width / 80))
      .call(g => g.select(".domain").remove());

  var yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickFormat(i => data[i].year).tickSizeOuter(0));

    svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", x(0))
      .attr("y", (d, i) => y(i))
      .attr("width", d => x(d.billions_BTU) - x(0))
      .attr("height", y.bandwidth());

    svg
      .append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("x", d => x(d.billions_BTU))
      .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text(d => +d.billions_BTU)
      .call(text =>
        text
          .filter(d => x(d.billions_BTU) - x(0) < 45) // short bars
          .attr("dx", +6)
          .attr("fill", "black")
          .attr("text-anchor", "start")
      );

    svg
      .append('text')
      .attr('text-anchor', 'center')
      .attr('font-size', 10)
      .style('color', 'white')
      .attr('x', width / 2 - 8)
      .attr('y', margin.top - 20)
      .text('Billions BTU');

    svg.append("g").call(xAxis);

    svg.append("g").call(yAxis);

})
