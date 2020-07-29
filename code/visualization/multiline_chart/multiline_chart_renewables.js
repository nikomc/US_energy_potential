// const timeConv = d3.timeParse("%Y");
// const dataset = d3.csv("../../../data/renewables_use_states.csv");
//
// const width = 960;
// const height = 500;
// const margin = 5;
// const padding = 5;
// const adj = 30;
//
// // we are appending SVG first
// const svg = d3.select("#container").append("svg")
//     .attr("preserveAspectRatio", "xMinYMin meet")
//     .attr("viewBox", "-"
//           + adj + " -"
//           + adj + " "
//           + (width + adj *3) + " "
//           + (height + adj*3))
//     .style("padding", padding)
//     .style("margin", margin)
//     .classed("svg-content", true);
//
// dataset.then(function(data) {
//   const slices = data.columns.slice(1).map(function(id) {
//     return {
//       id: id,
//       values: data.map(function(d) {
//         return {
//           date: timeConv(d.date),
//           measurement: +d[id]
//         };
//       })
//     };
//   });
//
//   console.log("Column headers", data.columns);
//   console.log("Column headers without date", data.columns.slice(1));
//   // returns the sliced dataset
//   console.log("Slices",slices);
//   // returns the first slice
//   console.log("First slice",slices[0]);
//   // returns the array in the first slice
//   console.log("A array",slices[0].values);
//   // returns the date of the first row in the first slice
//   console.log("Date element",slices[0].values[0].date);
//   // returns the array's length
//   console.log("Array length",(slices[0].values).length);
//
//   const xScale = d3.scaleTime()
//     .domain(d3.extent(data, function(d){
//         return timeConv(d.date); }))
//     .range([0,width]);
//
//   const yScale = d3.scaleLinear()
//     .domain([0, 10])
//     .rangeRound([height, 0]);
//
//     // d3.max(slices, function(c) {
//     //   return d3.max(c.values, function(d) {
//     //       return d.measurement + 4; });
//     //     })])
//
//   const yaxis = d3.axisLeft(yScale);
//     // .ticks((slices[0].values).length)
//
//   const xaxis = d3.axisBottom(xScale);
//
//   svg.append("g")
//     .attr("class", "axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(xaxis);
//
//   svg.append("g")
//     .attr("class", "axis")
//     .call(yaxis);
    // .append("text")
    // .attr("transform", "rotate(-90)")
    // .attr("dy", ".75em")
    // .attr("y", 6)
    // .style("text-anchor", "end")
    // .text("Billions BTU");

  // const line = d3.line()
  //   .x(function(d) { return xScale(d.date); })
  //   .y(function(d) { return yScale(d.measurement); });
  //
  // let id = 0;
  // const ids = function () {
  //     return "line-"+id++;
  // }
  //
  // const lines = svg.selectAll("lines")
  //   .data(slices)
  //   .enter()
  //   .append("g");
  //
  //   lines.append("path")
  //   .attr("class", ids)
  //   .attr("d", function(d) { return line(d.values); });
  //
  //   lines.append("text")
  //   .attr("class","serie_label")
  //   .datum(function(d) {
  //       return {
  //           id: d.id,
  //           value: d.values[d.values.length - 1]}; })
  //   .attr("transform", function(d) {
  //           return "translate(" + (xScale(d.value.date) + 10)
  //           + "," + (yScale(d.value.measurement) + 5 ) + ")"; })
  //   .attr("x", 5)
  //   .text(function(d) { return ("Serie ") + d.id; });

// });
