// @TODO: YOUR CODE HERE!
var svgWidth = 800;
var svgHeight = 400;
    

var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height",svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);    

d3.csv("/assets/data/data.csv").then(function(wholeData){
    

    wholeData.forEach(function(dataPoint) {
        dataPoint.abbr = dataPoint.abbr;
        dataPoint.poverty = +dataPoint.poverty;
        dataPoint.healthcare = +dataPoint.healthcare;
      });

    console.log(wholeData);
    
    // var xTimeScale = d3.scaleTime()
    // .domain(d3.extent(wholeData, d => d.poverty))
    // .range([0, width]);

    var yLinearScale = d3.scaleLinear().range([height, 0]);
    var xLinearScale = d3.scaleLinear().range([width,0])

  // Step 6: Set up the y-axis domain
  // ==============================================
  // @NEW! determine the max y value
  // find the max of the morning data
    var povertyMax = d3.max(wholeData, d => d.poverty);

  // find the max of the evening data
    var healthcareMax = d3.max(wholeData, d => d.healthcare);

    var yMax;
    if (povertyMax > healthcareMax) {
        yMax = povertyMax;
    }
    else {
        yMax = healthcareMax;
    }

    // Add X axis
    var x = d3.scaleLinear()
        .domain([6, 25])
        .range([ 0, width ]);
    chartGroup.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

          // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 25])
        .range([ height, 0]);
    chartGroup.append("g").call(d3.axisLeft(y));

          // Add dots
    chartGroup.append('g')
        .selectAll("dot")
        .data(wholeData)
        .enter()
        .append("circle")
            .attr("cx", function (dataPoint) { return x(dataPoint.poverty); } )
            .attr("cy", function (dataPoint) { return y(dataPoint.healthcare); } )
            .attr("r", 10)
            .style("fill", "#69b3a2")


  
    
        
}).catch(error => console.log(error))