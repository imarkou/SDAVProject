function v3() {

    var returnedObject = {
        buttonClickEvent: function (filename) {
            //ReadFileAndUpdateChart(filename);
            if (filename === 'Data/v3/data2016.csv') {
                d3.select("#dataHeader").text("Data 2016");
            }
            else {
                d3.select("#dataHeader").text("Data 2013");
            }


            d3.csv(filename, function (data) {
                data.forEach(function (item) {
                    item.A = parseInt(item.A);
                    item.B = parseInt(item.B);
                    item.TOTAL = parseInt(item.TOTAL);
                });

                globalData = data;

                console.log(globalData);


                var xScale = d3.scale.linear()
                    .domain([0, d3.max(globalData, function (data) {
                        return data.A;
                    })])
                    .range([padding, chartWidth - padding]);

                var yScale = d3.scale.linear()
                    .domain([0, d3.max(globalData, function (data) {
                        return data.B;
                    })])
                    .range([chartHeight - padding, padding]);

                const factor = 0.009;
                const maxRadius = Math.sqrt(chartWidth * chartHeight * factor / Math.PI);
                var rScale = d3.scale.linear()
                    .domain([0, d3.max(globalData, function (data) {
                        return data.TOTAL;
                    })])
                    .range([0, maxRadius]);
                UpdateCircles();
                UpdateLabels();

                function UpdateCircles() {
                    svg.selectAll("circle.dataCircle")
                        .data(globalData)
                        .transition()
                        .duration(1500)
                        .attr("cx", function (data) {
                            return xScale(data.A);
                        })
                        .attr("cy", function (data) {
                            return yScale(data.B);
                        })
                        .attr("r", function (data) {
                            return rScale(data.TOTAL);
                        })
                        .attr('opacity', 0.3);
                }


                function UpdateLabels() {
                    //Add  labels
                    svg.selectAll("text.label")
                        .data(globalData)
                        .transition()
                        .duration(1500)
                        .text(function (data) {
                            return data.BOROUGH;
                        })
                        .attr("x", function (data) {
                            return xScale(data.A);
                        })
                        .attr("y", function (data) {
                            return yScale(data.B);
                        })
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "10px")
                        .attr("fill", "#483D8B")
                        .attr('opacity', 1);
                }
            });
        }
    };

    var chartWidth = document.getElementById("scatterplot").clientWidth;
    var chartHeight = document.getElementById("scatterplot").clientHeight;
    const padding = 50;

    //Create SVG element
    var svg = d3.select("#scatterplot");

    var globalData;

    //Data
    function ReadFileAndUpdateChart(filename) {

        d3.json(filename, function (data) {

            data.forEach(function (item) {
                item.A = parseInt(item.A);
                item.B = parseInt(item.B);
                item.TOTAL = parseInt(item.TOTAL);
            });

            globalData = data;

            console.log(globalData);

            var xScale = d3.scale.linear()
                .domain([0, d3.max(data, function (data) {
                    return data.A;
                })])
                .range([padding, chartWidth - padding]);

            var yScale = d3.scale.linear()
                .domain([0, d3.max(data, function (data) {
                    return data.B;
                })])
                .range([chartHeight - padding, padding]);

            const factor = 0.009;
            const maxRadius = Math.sqrt(chartWidth * chartHeight * factor / Math.PI);
            var rScale = d3.scale.linear()
                .domain([0, d3.max(data, function (data) {
                    return data.TOTAL;
                })])
                .range([0, maxRadius]);


            DrawCircles();
            AddLabels();
            CreateAxes();

            function DrawCircles() {
                svg.selectAll("circle.dataCircle")
                    .data(globalData)
                    .enter()
                    .append("circle")
                    .attr("cx", function (data) {
                        return xScale(data.A);
                    })
                    .attr("cy", function (data) {
                        return yScale(data.B);
                    })
                    .attr("r", function (data) {
                        return rScale(data.TOTAL);
                    })
                    .attr("class", "dataCircle")
                    .attr('opacity', 0.3);
            }


            function AddLabels() { //Add  labels
                svg.selectAll("text.label")
                    .data(globalData)
                    .enter()
                    .append("text")
                    .text(function (data) {
                        return data.BOROUGH;
                    })
                    .attr("x", function (data) {
                        return xScale(data.A);
                    })
                    .attr("y", function (data) {
                        return yScale(data.B);
                    })
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "10px")
                    .attr("fill", "#483D8B")
                    .attr("class", "label")
                    .attr('opacity', 1);
            }

            function CreateAxes() {
                //Define X axis
                var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .ticks(10);

                //Define Y axis
                var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(10);

                //Create X axis
                svg.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + (chartHeight - padding - 6) + ")")
                    .call(xAxis);


                //Create Y axis
                svg.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(" + padding + ",0)")
                    .call(yAxis);

                //Add text
                svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - padding + 15)
                    .attr("x", 0 - (chartHeight / 2))
                    .attr("dy", "3em")
                    .style("text-anchor", "middle")
                    .text("Grade B");

                // Add the text label for the x axis
                svg.append("text")
                    .attr("transform", "translate(" + (chartWidth / 2) + "," + (chartHeight - 15) + ")").style("text-anchor", "middle")
                    .text("Grade A");
            }
        });
    }

    ReadFileAndUpdateChart("Data/v3/data2013.csv");

    return returnedObject;

}


var v3Object = v3();
console.log(v3Object);