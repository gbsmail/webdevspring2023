const data = [
  { category: 'SNAP Benefits', white: 7, asian: 14 },
  { category: 'Community Anti-Poverty Participants', white: 0.0671, asian: 0.0984 },
  { category: "Veteran's Benefits", white: 0.000860516, asian: 0.008399965 },
  { category: 'Older Adult Center Meal Participants', white: 1, asian: 6 },
  { category: 'Section 8 Housing', white: 0.010919654, asian: 0.004990078 },
  { category: 'Homeless Shelter Use in 2021', white: 0.008308433, asian: 0.007485117 },
];

const container = d3.select("#plot");

const width = 600;
const height = 400;

const svg = container.append("svg")
  .attr("width", width)
  .attr("height", height);

const xScale = d3.scaleBand()
  .domain(data.map(d => d.category))
  .range([0, width])
  .padding(0.1);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => Math.max(d.white, d.asian))])
  .range([height, 0]);

const groups = svg.selectAll("g")
  .data(data)
  .enter()
  .append("g")
  .attr("transform", d => `translate(${xScale(d.category)}, 0)`);

groups.append("circle")
  .attr("cx", xScale.bandwidth() / 2)
  .attr("cy", d => yScale(d.white))
  .attr("r", 5)
  .attr("fill", "white")
  .attr("stroke", "black");

groups.append("circle")
  .attr("cx", xScale.bandwidth() / 2)
  .attr("cy", d => yScale(d.asian))
  .attr("r", 5)
  .attr("fill", "black")
  .attr("stroke", "black");

const xAxis = d3.axisBottom(xScale);

const yAxis = d3.axisLeft(yScale);

svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);

svg.append("g")
  .call(yAxis);

svg.append("text")
  .attr("x", width / 2)
  .attr("y", height + 40)
  .attr("text-anchor", "middle")
  .text("Category");

svg.append("text")
  .attr("x", -height / 2)
  .attr("y", -50)
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Value");
