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
    .range(["#258B10", "#ff8c00", "#DC143C"]);
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

// read American Cuisine data from file
d3.csv('Data/v1/AmericanScores.csv', function(error, data) {
    if (error) throw error;
    var gradeNames = d3.keys(data[0]).filter(function (key) {
        return key !== "Year";
    });
    data.forEach(function (d) {
        d.grades = gradeNames.map(function (name) {
            return {
                name: name
                , value: +d[name]
            };
        });
    });
    x0.domain(data.map(function (d) {
        return d.Year;
    }));
    x1.domain(gradeNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(data, function (d) {
        return d3.max(d.grades, function (d) {
            return d.value;
        });
    })]);
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(3,0)")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 10)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("No. of restaurants");

    var year = svg.selectAll(".year")
        .data(data)
        .enter().append("g")
        .attr("class", "year")
        .attr("transform", function (d) {
            return "translate(" + x0(d.Year) + ",0)";
        });

    year.selectAll(".bar")
        .data(function (d) {
            return d.grades;
        })
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("width", x1.rangeBand())
        .attr("x", function (d) {
            return x1(d.name);
        })
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("height", function (d) {
            return height - y(d.value);
        })
        .style("fill", function (d) {
            return color(d.name);
        });

    d3.selectAll('rect.bar')
        .on("mouseover", function (d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("<div>" + d.value + " restaurants</div>")
                .style("font-weight", "bold")
                .style("color", "black")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
    var legend = svg.selectAll(".legend")
        .data(gradeNames.slice().reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(80," + i * 20 + ")";
        });
    legend.append("rect")
        .attr("x", width - 100)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);
    legend.append("text")
        .attr("x", width - 110)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function (d) {
            return d;
        })
        .style("fill", color);

    // On click, update with new data
    d3.selectAll("#buttonAmerican, #buttonItalian, #buttonChinese, #buttonLatin")
        .on("click", function() {
            //See which button was clicked
            var ID = d3.select(this).attr("id");
            //Decide which dataset to load
            if (ID == "buttonAmerican") {
                var x = document.getElementById("buttonAmerican");
                x.style.color = null;
                this.style.color = "#2E8B57";
                update_hist("Data/v1/AmericanScores.csv", color);
            } else if (ID == "buttonItalian") {
                var x = document.getElementById("buttonItalian");
                x.style.color = null;
                this.style.color = "#2E8B57";
                update_hist("Data/v1/ItalianScores.csv", color);
            } else if (ID == "buttonChinese") {
                var x = document.getElementById("buttonChinese");
                x.style.color = null;
                this.style.color = "#2E8B57";
                update_hist("Data/v1/ChineseScores.csv", color);
            } else if (ID == "buttonLatin") {
                var x = document.getElementById("buttonLatin");
                x.style.color = null;
                this.style.color = "#2E8B57";
                update_hist("Data/v1/LatinScores.csv", color);
            }
        });

    function update_hist(filename) {
        d3.csv(filename, function(error, data) {
            if (error) throw error;
            var gradeNames = d3.keys(data[0]).filter(function(key) {
                return key !== "Year";
            });
            data.forEach(function(d) {
                d.grades = gradeNames.map(function(name) {
                    return {
                        name: name
                        , value: +d[name]
                    };
                });
            });
            x0.domain(data.map(function(d) {
                return d.Year;
            }));
            x1.domain(gradeNames).rangeRoundBands([0, x0.rangeBand()]);
            y.domain([0, d3.max(data, function(d) {
                return d3.max(d.grades, function(d) {
                    return d.value;
                });
            })]);

            // Update Y axis
            svg.select(".y.axis")
                .transition()
                .duration(1000)
                .ease("elastic")
                .call(yAxis);

            var year = svg.selectAll(".year")
                .data(data)
                .attr("class", "year")
                .attr("transform", function(d) {
                    return "translate(" + x0(d.Year) + ",0)";
                });

            year.selectAll(".bar")
                .data(function(d) {
                    return d.grades;
                })
                .transition()
                .duration(1500)
                .ease("elastic")
                .attr("class", "bar")
                .attr("width", x1.rangeBand())
                .attr("x", function(d) {
                    return x1(d.name);
                })
                .attr("y", function(d) {
                    return y(d.value);
                })
                .attr("height", function(d) {
                    return height - y(d.value);
                })

            svg.selectAll("rect.bar")
                .on("mouseover", function(d) {
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html("<div>" + d.value + " restaurants</div>")
                        .style("font-weight", "bold")
                        .style("color", "black")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
        });
    }
});
