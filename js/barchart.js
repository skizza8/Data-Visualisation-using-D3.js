var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin

svg.append("text")
    .attr("transform", "translate(100,0)")
    .attr("x", 50)
    .attr("y", 50)
    .attr("font-size", "24px")
    .text("Total percent_votes Per Candidate")

var xScale = d3.scaleBand().range([0, width]).padding(0.4),
    yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

d3.csv("map_data/votes_overall.csv", function (error, data) {
    console.log(data)
    if (error) {
        throw error;
    }

    xScale.domain(data.map(function (d) { return d.candidate; }));
    yScale.domain([d3.min(data, function (d) { return d.percent_votes; }), d3.max(data, function (d) { return d.percent_votes; })]);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("y", height - 250)
        .attr("x", width - 100)
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Year");

    g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function (d) {
            return d;
        })
            .ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Number of percent_votes");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return xScale(d.candidate); })
        .attr("y", function (d) { return yScale(d.percent_votes); })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) { return height - yScale(d.percent_votes); });
});