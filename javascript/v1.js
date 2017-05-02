"use strict";

// global variables
var margin = {
    top: 20
    , right: 20
    , bottom: 30
    , left: 40
}
    , width = 960 - margin.left - margin.right
    , height = 500 - margin.top - margin.bottom;
var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
var x1 = d3.scale.ordinal();
var y = d3.scale.linear()
    .range([height, 0]);
var color = d3.scale.ordinal()
    .range(["#4169E1", "#ff8c00", "#DC143C", "#2E8B57"]);
var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

// add the tooltip area to the webpage
var tooltip = d3.select("div#vis1").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var svg = d3.select("div#vis1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
