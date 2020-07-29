// set the dimensions and margins of the graph
var margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var parseTime = d3.timeParse("%Y");
const dataset = d3.csv("../../../data/renewables_use_states.csv");

var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

dataset.then(function(data) {

  const slices = data.columns.slice(1).map(function(id) {
    return {
      id: id,
      values: data.map(function(d) {
        return {
          year: parseTime(d.year),
          value: +d[id]
        };
      })
    };
  });

  console.log("Column headers", data.columns);
  console.log("Column headers without date", data.columns.slice(1));
  // returns the sliced dataset
  console.log("Slices",slices);
  // returns the first slice
  console.log("First slice",slices[0]);
  // returns the array in the first slice
  console.log("A array",slices[0].values);
  // returns the date of the first row in the first slice
  console.log("Date element",slices[0].values[0].year);
  // returns the array's length
  console.log("Array length",(slices[0].values).length);

  var allGroup = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI",
                  "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN",
                  "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH",
                  "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA",
                  "WI", "WV", "WY", "US"];

  d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

  var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {return d.value})])
    .range([height - margin.top, margin.bottom]);

  var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) {
        return +d.value;
      }))
      .range([margin.left, width - margin.right]);

  var line = d3.line()
        .x(function(d) { return x(d.year) })
        .y(function(d) { return y(+d.value) });

  svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line)
    .style("stroke-width", 6)
    .style("fill", "none");

  var xAxis = g => g
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(width / 80))
      .call(g => g.append("text")
        .attr("x", width - margin.right)
        .attr("y", margin.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("Increasing Years →"));

  var yAxis = g => g
    .attr("transform", 'translate(' + (margin.left + 10) + ',0)')
    .call(d3.axisLeft(y).ticks(10).tickFormat(d3.formatPrefix("1.0", 1e5)))
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 20)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Billions BTU"));

  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);

  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", (margin.top + 4))
    .attr("class", "title")
    .attr("text-anchor", "middle")
    .text("Renewable Power Usage by State");

    // A function that update the chart
  function update(selectedGroup) {

    // Create new data with the selection?
    var dataFilter = data.map(function(d) {return {year: d.year, value:d[selectedGroup]} })

    // Give these new data to update line
    line
        .datum(dataFilter)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
          .x(function(d) { return x(d.year) })
          .y(function(d) { return y(+d.value) })
        )
        .attr("stroke", function(d){ return myColor(selectedGroup) })
  }

  // When the button is changed, run the updateChart function
  d3.select("#selectButton").on("change", function(d) {
      // recover the option that has been chosen
      var selectedOption = d3.select(this).property("value")
      // run the updateChart function with this selected option
      update(selectedOption)
  })

});
