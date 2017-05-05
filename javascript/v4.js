"use strict";

var categories= ['Unacceptable material used', 'Facilities not vermin proof', 'Food not protected from potential source of contamination during storage'];

var dollars = [26667, 18193, 15287];

var colors = ['#0000b4','#2fcab6','#0094ff'];

var grid = d3.range(25).map(function(i){
    return {'x1':0,'y1':0,'x2':0,'y2':480};
});

var tickVals = grid.map(function(d,i){
    if(i>0){ return i*10; }
    else if(i===0){ return "100";}
});

var xscale = d3.scale.linear()
    .domain([1,26667])
    .range([10,722]);

var yscale = d3.scale.linear()
    .domain([0,categories.length])
    .range([50,450]);

var colorScale = d3.scale.quantize()
    .domain([0,categories.length])
    .range(colors);

var canvas = d3.select("div#vis4")
    .append('svg')
    .attr({'width':900,'height':450});


var	xAxis = d3.svg.axis();
xAxis
    .orient('bottom')
    .scale(xscale);
//                .tickValues(tickVals);

var	yAxis = d3.svg.axis();
yAxis
    .orient('right')
    .scale(yscale)
    .tickSize(2)
    .tickFormat(function(d,i){ return categories[i]; })
    .tickValues(d3.range(3));

var y_xis = canvas.append('g')
    .attr("transform", "translate(150,0)")
    .attr('id','yaxis')
    .call(yAxis);

var chart = canvas.append('g')
    .attr("transform", "translate(150,0)")
    .attr('id','bars')
    .selectAll('rect')
    .data(dollars)
    .enter()
    .append('rect')
    .attr('height',80)
    .attr({'x':0,'y':function(d,i){ return yscale(i)+19; }})
    .style('fill',function(d,i){ return colorScale(i); })
    .attr('width',function(d){ return 0; });


var transit = d3.select("div#vis4").selectAll("rect")
    .data(dollars)
    .transition()
    .duration(10000)
    .attr("width", function(d) {return xscale(d); });

var transitext = d3.select('#bars')
    .selectAll('text')
    .data(dollars)
    .enter()
    .append('text')
    .attr({'x':function(d) {return xscale(d)-180; },'y':function(d,i){ return yscale(i)+40; }})
    .text(function(d){ return d+" Restaurants"; }).style({'fill':'#fff','font-size':'20px'});
