// set the dimensions and margins of the graph

var margin = {top: 10, right: -10, bottom: 40, left: 180},
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#mydataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/gbsmail/webdevspring2023/main/asamchartdata.csv", function(data) {
console.log(data)

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 25])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

// Y axis
var y = d3.scaleBand()
  .range([ 0, height ])
  .domain(data.map(function(d) { return d.Service; }))
  .padding(1);
svg.append("g")
  .call(d3.axisLeft(y))


// Lines
svg.selectAll("myline")
  .data(data)
  .enter()
  .append("line")
    .attr("x1", x(0))
    .attr("x2", x(0))
    .attr("y1", function(d) { return y(d.Service); })
    .attr("y2", function(d) { return y(d.Service); })
    .attr("stroke", "grey")

// Circles
svg.selectAll("mycircle")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", x(0))
    .attr("cy", function(d) { return y(d.Service); })
    .attr("r", "7")
    .style("fill", "#69b3a2")
    .attr("stroke", "black")

    // Change the X coordinates of line and circle
svg.selectAll("circle")
.transition()
.duration(2000)
.attr("cx", function(d) { return x(d.Value); })

svg.selectAll("line")
.transition()
.duration(2000)
.attr("x1", function(d) { return x(d.Value); })

})