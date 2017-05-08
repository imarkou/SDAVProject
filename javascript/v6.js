var width = 960,
    height = 500,
    centered;
var color = ["#D8BFD8","#7FFFD4","#E9967A","#8FBC8F","#ADD8E6","#BC8F8F","#90EE90","#FFB6C1","#B0C4DE","#FFA07A","#DDA0DD","#F5DEB3"]



svg1 = d3.select("body")
    .append("svg")
    .attr("width", width )
    .attr("height", height)

svg1.append("rect")

    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0)
    .style("stroke", "black")
    .style("fill", "#e6f2ff")
    .style("stroke-width", 2);

var projection = d3.geo.mercator()
    .center([-73.94, 40.70])
    .scale(50000)
    .translate([(width) / 2, (height)/2]);

var path = d3.geo.path()
    .projection(projection);


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

svg2 = d3.select("body")
    .append("svg")
    .attr("class","barchart")
    .attr("width", 3000 )
    .attr("height", 1400)


svg2.append("rect")
    .attr("width", 3000)
    .attr("height", 1400)
    .attr("x", 0)
    .attr("y", 0)
    .style("fill", "white")



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



function statenisland(){
    d3.json("Data/v6/cuisine_st_island.json", function(error,data1) {
        if (error) { //If error is not null, something went wrong.
            console.log(error); //Log the error.
        } else { //If no error, the file loaded correctly. Yay!
            svg2.selectAll("text").remove();
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "30px")
                .attr("fill", "black")
                .text('Staten Island')
                .attr('x', width/2)
                .attr('y', height/10)
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "13px")
                .attr("font", "sans-serif")
                .attr("fill", "black")
                .text("Number of Restaurants")
                .attr('x', 300)
                .attr('y', 600)

            var y = d3.scale.ordinal().rangeRoundBands([200,700], 2);

            var x = d3.scale.linear().range([2900, 200]);

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

            svg2.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate("+ 100 +",-150)")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(45)")
                .attr("dy", ".71em")
                .style("text-anchor", "end")



            svg2.append("g")
                .attr("class", "x axis")

                .attr("transform", "translate(-100," + 550 + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.55em")
                .attr("transform", "rotate(-45)" )


            var svg3 = svg2.selectAll("#barchart")
                .data(data1)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("y", function(d, i) {
                    return (i *35)+105})
                .attr("x", function(d) { return (101 ); })
                .attr("height", 10)
                .attr("width", function(d) { return d[1]; })
                .attr("fill",function(d, i) {
                    return color[i%12]  // here it is picking up colors in sequence
                })
                .text(function(d) { return d[0];})




        }
    });

}
function manhattan(){
    d3.json("Data/v6/cuisine_manhattan.json", function(error,data1) {
        if (error) { //If error is not null, something went wrong.
            console.log(error); //Log the error.
        } else { //If no error, the file loaded correctly. Yay!
            svg2.selectAll("text").remove();
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "30px")
                .attr("fill", "black")
                .text('Manhattan')
                .attr('x', width/2)
                .attr('y', height/10)
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "13px")
                .attr("font", "sans-serif")
                .attr("fill", "black")
                .text("Number of Restaurants")
                .attr('x', 300)
                .attr('y', 600)

            var y = d3.scale.ordinal().rangeRoundBands([200,700], 2);

            var x = d3.scale.linear().range([2900, 200]);

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

            svg2.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate("+ 100 +",-150)")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(45)")
                .attr("dy", ".71em")
                .style("text-anchor", "end")



            svg2.append("g")
                .attr("class", "x axis")

                .attr("transform", "translate(-100," + 550 + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.55em")
                .attr("transform", "rotate(-45)" )


            var svg3 = svg2.selectAll("#barchart")
                .data(data1)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("y", function(d, i) {
                    return (i *35)+105})
                .attr("x", function(d) { return (101 ); })
                .attr("height", 10)
                .attr("width", function(d) { return d[1]; })
                .attr("fill",function(d, i) {
                    return color[i%12]  // here it is picking up colors in sequence
                })
                .text(function(d) { return d[0];})




        }
    });

}

function brooklyn(){
    d3.json("Data/v6/cuisine_brooklyn.json", function(error,data1) {
        if (error) { //If error is not null, something went wrong.
            console.log(error); //Log the error.
        } else { //If no error, the file loaded correctly. Yay!
            svg2.selectAll("text").remove();
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "30px")
                .attr("fill", "black")
                .text('Brooklyn')
                .attr('x', width/2)
                .attr('y', height/10)
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "13px")
                .attr("font", "sans-serif")
                .attr("fill", "black")
                .text("Number of Restaurants")
                .attr('x', 300)
                .attr('y', 600)

            var y = d3.scale.ordinal().rangeRoundBands([200,700], 2);

            var x = d3.scale.linear().range([2900, 200]);

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

            svg2.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate("+ 100 +",-150)")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(45)")
                .attr("dy", ".71em")
                .style("text-anchor", "end")



            svg2.append("g")
                .attr("class", "x axis")

                .attr("transform", "translate(-100," + 550 + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.55em")
                .attr("transform", "rotate(-45)" )


            var svg3 = svg2.selectAll("#barchart")
                .data(data1)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("y", function(d, i) {
                    return (i *35)+105})
                .attr("x", function(d) { return (101 ); })
                .attr("height", 10)
                .attr("width", function(d) { return d[1]; })
                .attr("fill",function(d, i) {
                    return color[i%12]  // here it is picking up colors in sequence
                })
                .text(function(d) { return d[0];})




        }
    });

}




function bronx(){
    d3.json("Data/v6/cuisine_bronx.json", function(error,data1) {
        if (error) { //If error is not null, something went wrong.
            console.log(error); //Log the error.
        } else { //If no error, the file loaded correctly. Yay!
            svg2.selectAll("text").remove();
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "30px")
                .attr("fill", "black")
                .text('Bronx')
                .attr('x', width/2)
                .attr('y', height/10)

            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "13px")
                .attr("font", "sans-serif")
                .attr("fill", "black")
                .text("Number of Restaurants")
                .attr('x', 300)
                .attr('y', 600)

            var y = d3.scale.ordinal().rangeRoundBands([200,700], 2);

            var x = d3.scale.linear().range([2900, 200]);

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

            svg2.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate("+ 100 +",-150)")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(45)")
                .attr("dy", ".71em")
                .style("text-anchor", "end")




            svg2.append("g")
                .attr("class", "x axis")

                .attr("transform", "translate(-100," + 550 + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.55em")
                .attr("transform", "rotate(-45)" )


            var svg3 = svg2.selectAll("#barchart")
                .data(data1)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("y", function(d, i) {
                    return (i *35)+105})
                .attr("x", function(d) { return (101 ); })
                .attr("height", 10)
                .attr("width", function(d) { return d[1]; })
                .attr("fill",function(d, i) {
                    return color[i%12]  // here it is picking up colors in sequence
                })
                .text(function(d) { return d[0];})




        }
    });

}

function queens(){
    d3.json("Data/v6/cuisine_queens.json", function(error,data1) {
        if (error) { //If error is not null, something went wrong.
            console.log(error); //Log the error.
        } else { //If no error, the file loaded correctly. Yay!
            svg2.selectAll("text").remove();
            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "30px")
                .attr("fill", "black")
                .text('Queens')
                .attr('x', width/2)
                .attr('y', height/10)

            svg2.append("text")
                .attr("text-anchor", "middle")
                .attr("font-size", "13px")
                .attr("font", "sans-serif")
                .attr("fill", "black")
                .text("Number of Restaurants")
                .attr('x', 300)
                .attr('y', 600)


            var y = d3.scale.ordinal().rangeRoundBands([200,700], 2);

            var x = d3.scale.linear().range([2900, 200]);

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

            svg2.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate("+ 100 +",-150)")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(45)")
                .attr("dy", ".71em")
                .style("text-anchor", "end")



            svg2.append("g")
                .attr("class", "x axis")

                .attr("transform", "translate(-100," + 550 + ")")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.55em")
                .attr("transform", "rotate(-45)" );


            var svg3 = svg2.selectAll("#barchart")
                .data(data1)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("y", function(d, i) {
                    return (i *35)+105})
                .attr("x", function(d) { return (101 ); })
                .attr("height", 10)
                .attr("width", function(d) { return d[1]; })
                .attr("fill",function(d, i) {
                    return color[i%12]  // here it is picking up colors in sequence
                })
                .text(function(d) { return d[0];})







        }
    });

}

function background(){

    svg2.append("rect")
        .attr("width", 3000)
        .attr("height", 1400)
        .attr("x", 0)
        .attr("y", 0)
        .style("fill", "white")



}
