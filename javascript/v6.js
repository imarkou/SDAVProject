"use strict";

//set the dimensions 

var width = 960,
    height = 500,
    centered;
// set the colours
var colored = ["#ff0000","#ff8000","#40ff00","#0080ff","#4000ff","#bf00ff","#ffff00","#ff0040","#8000ff","#ff0040","#00bfff","#80ff00"]


//create the svg which contains the map
var svg1 = d3.select("body")
    .append("svg")
    .attr("width", 1300 )
    .attr("height", height)
    .attr("margin-left", 150)

svg1.append("rect")

    .attr("width", 800)
    .attr("height", height)
    .attr("x", 150)
    .attr("y", 0)
    .attr("margin-left", 150)
    .style("stroke", "black")
    .style("fill", "#e6f2ff")
    .style("stroke-width", 2);
//initialize variables
 




var projection = d3.geo.mercator()
    .center([-73.94, 40.70])
    .scale(50000)
    .translate([(width) / 2, (height)/2]);

var path = d3.geo.path()
    .projection(projection);

//create the map
d3.json("Data/v6/boroughs.geojson", function(json) {



    svg1.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr({
            "d": path,
            'fill': "PeachPuff",
            'opacity': 0.6,
            'stroke-width': 1.5,
            //stroke: 'rgb(180,180,180)'
            'stroke':'black'

        })
        .attr("class", function(d,i){
            return i;
        })
        .on('mouseover', function() {

            // Add a hover effect
            d3.select(this)
                .transition()
                .attr('fill', 'Coral')
        })
        .on('mouseout', function() {
            // Remove the hover effect
            d3.select(this).transition()
                .attr('fill', "PeachPuff")
        })
        .attr("d", path)
        .on("click",clicked);


//add borough names to the map

    svg1.selectAll("text")
        .data(json.features)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr('font-size', '15px')
        .attr('font-family', 'sans-serif')
        .attr('fill', 'black')
        .text(function(data) {
            return data.properties.BoroName;
        })
        .attr("x", function(data) {
            return path.centroid(data)[0];
        })
        .attr("y", function(data) {
            return path.centroid(data)[1];
        })


    ;

});



//create the svg that contains the barplots
var svg2 = d3.select("body")
    .append("svg")
    .attr("class","barchart")
    .attr("width", 3000)
    .attr("height", 700)
    .attr("margin-left", 150)


svg2.append("rect")
    .attr("width", 3000)
    .attr("height", 700)
    .attr("x", 0)
    .attr("y", 0)
    .attr("margin-left", 150)
    .style("fill", "white")

svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "20px")
                .attr("fill", "black")
                .text('Click on the five boroughs of New York on the map above')
                .attr('x', width/2)
                .attr('y', height/6)


// click on the map
function clicked(d) {
    if (d3.select(this).attr("class") == 0){
        background()
        statenisland()
    }
    if (d3.select(this).attr("class") == 1){
        background()
        queens()
    }
    if (d3.select(this).attr("class") == 2){
        background()
        brooklyn()
    }
    if (d3.select(this).attr("class") == 3){
        background()
        manhattan()
    }

    if (d3.select(this).attr("class") == 4){
        background()
        bronx()
    }

}


// function for staten island bar plot
function statenisland(){
    d3.json("Data/v6/cuisine_st_island.json", function(error,data1) {
        if (error) { //error in loading data
            console.log(error); 
        } else { //If no error, the file loaded correctly. 
            var y = d3.scale.ordinal().rangeRoundBands([200,700], 2);

var x = d3.scale.linear().range([1000, 200]);

var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(10);

var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks(12);


            y.domain(data1.map(function(d) { return d[0]; }));
            x.domain([ 2700,0]);
            
           //Add title to barplot
            svg2.selectAll("text").remove();
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "30px")
                .attr("fill", "black")
                .text('Staten Island')
                .attr('x', width/2)
                .attr('y', height/10)

            //add title to yaxis
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "13px")
                .attr("font", "sans-serif")
                .attr("fill", "black")
                .text("Number of Restaurants")
                .attr('x', 300)
                .attr('y', 600)
               
           //create yaxis 
            svg2.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate("+ 100 +",-150)")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(45)")
                .attr("dy", ".71em")
                .style("text-anchor", "end")


           //create xaxis
            svg2.append("g")
                .attr("class", "x axis")

                .attr("transform", "translate(-100," + 550 + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.55em")
                .attr("transform", "rotate(-45)" )

           //create barplot
            var svg3 = svg2.selectAll("#barchart")
                .data(data1)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("y", function(d, i) {
                    return (i *35)+105})
                .attr("x", function(d) { return (101 ); })
                .attr("height", 10)
                .attr("width", function(d) { return d[1]/3.36; })
                .attr("fill",function(d, i) {
                    return colored[i%12]   // set the colours
                })
                .text(function(d) { return d[0];})




        }
    });

}
// function for manhattan bar plot
function manhattan(){
    d3.json("Data/v6/cuisine_manhattan.json", function(error,data1) {
        if (error) { //error in loading data
            console.log(error); 
        } else { //If no error, the file loaded correctly. 
            var y = d3.scale.ordinal().rangeRoundBands([200,700], 2);

var x = d3.scale.linear().range([1000, 200]);

var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(10);

var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks(12);
            y.domain(data1.map(function(d) { return d[0]; }));
           x.domain([ 2700,0]);
           //Add title to barplot
            svg2.selectAll("text").remove();
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "30px")
                .attr("fill", "black")
                .text('Manhattan')
                .attr('x', width/2)
                .attr('y', height/10)

            //add title to yaxis
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "13px")
                .attr("font", "sans-serif")
                .attr("fill", "black")
                .text("Number of Restaurants")
                .attr('x', 300)
                .attr('y', 600)

           
             //create yaxis
            svg2.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate("+ 100 +",-150)")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(45)")
                .attr("dy", ".71em")
                .style("text-anchor", "end")


           //create xaxis
            svg2.append("g")
                .attr("class", "x axis")

                .attr("transform", "translate(-100," + 550 + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.55em")
                .attr("transform", "rotate(-45)" )

            //create barplot
            var svg3 = svg2.selectAll("#barchart")
                .data(data1)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("y", function(d, i) {
                    return (i *35)+105})
                .attr("x", function(d) { return (101 ); })
                .attr("height", 10)
                .attr("width", function(d) { return d[1]/3.36; })
                .attr("fill",function(d, i) {
                    return colored[i%12]  // set the colours
                })
                .text(function(d) { return d[0];})




        }
    });

}
//function for brooklyn bar plot
function brooklyn(){
    d3.json("Data/v6/cuisine_brooklyn.json", function(error,data1) {
        if (error) { ///error in loading data
            console.log(error); 
        } else { //If no error, the file loaded correctly. 
            var y = d3.scale.ordinal().rangeRoundBands([200,700], 2);

var x = d3.scale.linear().range([1000, 200]);

var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(10);

var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks(12);
            y.domain(data1.map(function(d) { return d[0]; }));
             x.domain([ 2700,0]);
             //Add title to barplot
            svg2.selectAll("text").remove();
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "30px")
                .attr("fill", "black")
                .text('Brooklyn')
                .attr('x', width/2)
                .attr('y', height/10)
            //add title to yaxis
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "13px")
                .attr("font", "sans-serif")
                .attr("fill", "black")
                .text("Number of Restaurants")
                .attr('x', 300)
                .attr('y', 600)

           //create yaxis
            svg2.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate("+ 100 +",-150)")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(45)")
                .attr("dy", ".71em")
                .style("text-anchor", "end")


             //create xaxis
            svg2.append("g")
                .attr("class", "x axis")

                .attr("transform", "translate(-100," + 550 + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.55em")
                .attr("transform", "rotate(-45)" )

            //create barplot
            var svg3 = svg2.selectAll("#barchart")
                .data(data1)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("y", function(d, i) {
                    return (i *35)+105})
                .attr("x", function(d) { return (101 ); })
                .attr("height", 10)
                .attr("width", function(d) { return d[1]/3.36; })
                .attr("fill",function(d, i) {
                    return colored[i%12] })  // set the colours
                .text(function(d) { return d[0];})




        }
    });

}


//function for bronx bar plot

function bronx(){
    d3.json("Data/v6/cuisine_bronx.json", function(error,data1) {
        if (error) { //error in loading data
            console.log(error); 
        } else { //If no error, the file loaded correctly. 
            var y = d3.scale.ordinal().rangeRoundBands([200,700], 2);

var x = d3.scale.linear().range([1000, 200]);

var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(10);

var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks(12);
            y.domain(data1.map(function(d) { return d[0]; }));
            x.domain([ 2700,0]);
            //Add title to barplot
            svg2.selectAll("text").remove();
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "30px")
                .attr("fill", "black")
                .text('Bronx')
                .attr('x', width/2)
                .attr('y', height/10)
            //add title to yaxis
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "13px")
                .attr("font", "sans-serif")
                .attr("fill", "black")
                .text("Number of Restaurants")
                .attr('x', 300)
                .attr('y', 600)

            //create yaxis
            svg2.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate("+ 100 +",-150)")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(45)")
                .attr("dy", ".71em")
                .style("text-anchor", "end")



          //create xaxis 
            svg2.append("g")
                .attr("class", "x axis")

                .attr("transform", "translate(-100," + 550 + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.55em")
                .attr("transform", "rotate(-45)" )

           //create barplot
            var svg3 = svg2.selectAll("#barchart")
                .data(data1)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("y", function(d, i) {
                    return (i *35)+105})
                .attr("x", function(d) { return (101 ); })
                .attr("height", 10)
                .attr("width", function(d) { return d[1]/3.36; })
                .attr("fill",function(d, i) {
                    return colored[i%12]   // set the colours
                })
                .text(function(d) { return d[0];})




        }
    });

}
//function for queens bar plot
function queens(){
    d3.json("Data/v6/cuisine_queens.json", function(error,data1) {
        if (error) { //error in loading data
            console.log(error); 
        } else { //If no error, the file loaded correctly.
            var y = d3.scale.ordinal().rangeRoundBands([200,700], 2);

var x = d3.scale.linear().range([1000, 200]);

var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .ticks(10);

var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks(12);

            y.domain(data1.map(function(d) { return d[0]; }));
            x.domain([ 2700,0]); 
            //Add title to barplot
            svg2.selectAll("text").remove();
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "30px")
                .attr("fill", "black")
                .text('Queens')
                .attr('x', width/2)
                .attr('y', height/10)
            //add title to yaxis
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "13px")
                .attr("font", "sans-serif")
                .attr("fill", "black")
                .text("Number of Restaurants")
                .attr('x', 300)
                .attr('y', 600)


            //create yaxis
            svg2.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate("+ 100 +",-150)")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(45)")
                .attr("dy", ".71em")
                .style("text-anchor", "end")


            //create xaxis
            svg2.append("g")
                .attr("class", "x axis")

                .attr("transform", "translate(-100," + 550 + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.55em")
                .attr("transform", "rotate(-45)" );

            //create barplot
            var svg3 = svg2.selectAll("#barchart")
                .data(data1)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("y", function(d, i) {
                    return (i *35)+105})
                .attr("x", function(d) { return (101 ); })
                .attr("height", 10)
                .attr("width", function(d) { return d[1]/3.36; })
                .attr("fill",function(d, i) {
                    return colored[i%12]  // set the colours
                })
                .text(function(d) { return d[0];})







        }
    });

}


// function to change the background on each click
function background(){

    svg2.append("rect")
        .attr("width", 3000)
        .attr("height", 1400)
        .attr("x", 0)
        .attr("y", 0)
        .style("fill", "white")



}