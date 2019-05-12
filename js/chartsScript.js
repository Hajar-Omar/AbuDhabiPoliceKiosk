
$(document).ready(function () {

    


//********************** Dashboard page
$(".serviceBlockBody").each(function (i) {
    var arrElements = this.getElementsByClassName("stats-number");
    var maxValue = parseInt(arrElements[0].getAttribute("data-to"));
    for (var i = 1; i < arrElements.length; i++) {
        if (parseInt(arrElements[i].getAttribute("data-to")) > maxValue) {
            maxValue = parseInt(arrElements[i].getAttribute("data-to"));
        }
    }
    $(this).find('.stats-number:not(.expanded)').each(function () {
        var mWidth = parseInt(($(this).data("to") * 100) / maxValue);
        //console.log(mWidth);
        $(this).parents(".oneProgress").find('.progress-bar').attr("aria-valuenow", mWidth).css("max-width", mWidth + "%");
        $(this).addClass('expanded');
    });
})

//------------- CounTo for tiles -------------//
$('.stats-number').countTo({
    speed: 1000,
    refreshInterval: 50
});

$(".serviceBlock").mCustomScrollbar({
    theme: "minimal-dark"
});

$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    e.preventDefault();
    DreawLineMarkersChartTwo("secondLineMarkersChartTwo", ["#59788b", "#cfa14c", "#f3972e", "#949494"], "#48535a", "#a9a9a7");
    DreawLineMarkersChartTwo("secondLineMarkersChartTwo2", ["red", "green", "blue", "#cfa14c"], "#48535a", "#a9a9a7");
});


darwGroupedBarChart("barchartOne", ["#a21f25", "#dd2c36", "#f18980"], "data.csv");
darwGroupedBarChart("barchartTwo", ["#14535f", "#0095a9", "#6bdbd6"], "data.csv");

DreawLineMarkersChart("firstLineMarkersChart", "#bbbbbb", "#c40029")
DreawLineMarkersChart("secondLineMarkersChart", "#bbbbbb", "#5a788b")

DreawLineMarkersChartTwo("secondLineMarkersChartTwo", ["#59788b", "#cfa14c", "#f3972e", "#949494"], "#48535a", "#a9a9a7");
DreawLineMarkersChartTwo("secondLineMarkersChartTwo2", ["red", "green", "blue", "#cfa14c"], "#48535a", "#a9a9a7");


///////// drawing charts functions //////////////

function darwGroupedBarChart(id, GBarsColors, dataFile) {

    var Div = d3.select("#" + id)
    var svg = Div.append('svg').classed('svgItem', true),
        margin = { top: 20, right: 30, bottom: 30, left: 35 },
        //width = 480,
        width = parseInt(d3.select("#" + id).style("width")) - 50,//480,// d3.select("#" + id).node().getBoundingClientRect().width,
        //width = + svg.attr("width") - margin.left - margin.right,
        //height = +svg.attr("height") - margin.top - margin.bottom,
        height = 165,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    var x0 = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    var x1 = d3.scaleBand()
        .padding(0.05);

    var y = d3.scaleLinear()
        .rangeRound([height, 10]);

    var z = d3.scaleOrdinal()
        .range(GBarsColors);

    d3.csv(dataFile, function (d, i, columns) {
        for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
        return d;
    }, function (error, data) {
        if (error) throw error;

        var keys = data.columns.slice(1);

        x0.domain(data.map(function (d) { return d.State; }));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([0, d3.max(data, function (d) { return d3.max(keys, function (key) { return d[key]; }); })]).nice();



        var barWidth = x1.bandwidth() - 4;
        //12 * data.length + (data.length * 10) < width ? 12 : (width - (data.length * 10)) / data.length;
        var barSpacing = 3//(width - margin.left - margin.right - barWidth * data.length) / data.length


        g.append("g")
            .attr("class", "axis")
            .attr("stroke-opacity", 0.2)
            .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 13)
            .attr("dy", "0.32em")
            .attr("fill", "#fff")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .attr("display", "none")
            .text("Population");

        var afterSVG = g.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function (d) { return "translate(" + x0(d.State) + ",0)"; })
            .selectAll("rect")
            .data(function (d) { return keys.map(function (key) { return { key: key, value: d[key] }; }); })
            .enter();

        afterSVG.append("rect")
            .classed('graybar', true)
            .attr('transform', function (d, i) {
                var translateXBy = (barSpacing / 1) + (barSpacing + barWidth) * i;
                return 'translate(' + translateXBy + ', 0)';
            })
            .attr('width', barWidth).attr('fill', "#eee")
            .attr('height', function (d) {
                return height - 10;
            }).attr("y", y(y.ticks().pop()) + 1);


        afterSVG.append("rect")
            .classed('bar', true) ////////////////////////////////////////
            .attr("x", function (d) { return x1(d.key); })
            .attr("y", height)
            .attr("width", x1.bandwidth() - 5)
            .attr("rx", 5)
            .attr("fill", function (d) { return z(d.key); })
            .transition()
            .duration(1000)
            .attr("y", function (d) { return y(d.value); })
            .attr("height", function (d) { return height - y(d.value); });
        //.transition(t);

        afterSVG.append("rect")
            .classed('close-bar', true) ////////////////////////////////////////
            .attr("x", function (d) { return x1(d.key); })
            .attr("y", height)
            .attr("width", x1.bandwidth() - 5)
            .attr("height", 0)
            .attr("fill", function (d) { return z(d.key); })
            .transition()
            .duration(700)
            .attr("y", height - 5)
            .attr("height", 5);


        g.append("g")
            .attr("class", "axis")
            .attr("stroke-opacity", 0.2)
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x0));

        var legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function (d, i) { return "translate(" + (0.7 + i) * - 100 + ",0)"; })
            .attr("direction", "rtl");

        legend.append("rect")
            .attr("x", width - 19)
            .attr("width", 10)
            .attr("height", 10)
            .attr("rx", 100)
            .attr("ry", 100)
            .attr("y", -9.5)
            .attr("float", "right")
            .attr("fill", z);

        legend.append("text")
            .attr("x", width - 5)
            .attr("y", 0)
            .attr("dy", "0em")
            .attr("fill-opacity", 0.8)
            .text(function (d) { return d; });


        $('g[text-anchor="end"]>path').attr("d", "M10,165.5H0.5V0.5H0");
        $('line[x2]').attr("x2", width).attr("stroke", "#ccc").attr("stroke-width", 2).attr("style", "z-index:-1111");



    }
    )
}


function DreawLineMarkersChart(chartId, aXisesColor, lineColor) {

    var LineMarkersChart = new CanvasJS.Chart(chartId, {
        animationEnabled: true,
        axisX: {
            lineColor: aXisesColor,
            tickColor: aXisesColor,
            labelFontColor: aXisesColor,
            titleFontColor: aXisesColor,
        },
        axisY: {
            lineColor: aXisesColor,
            tickColor: "white",
            labelFontColor: aXisesColor,
            titleFontColor: aXisesColor,
            gridColor: '#f3f3f3',
            suffix: "k",
            crosshair: {
                enabled: true
            }
        },
        data: [{
            type: "line",
            color: lineColor,
            dataPoints: [
                { label: 'Jan', y: 10 },
                { label: 'Feb', y: 70 },
                { label: 'Mar', y: 60 },
                { label: 'Apr', y: 30 },
                { label: 'May', y: 10 },
                { label: 'Jun', y: 70 },
                { label: 'Jul', y: 60 },
                { label: 'Aug', y: 30 },
                { label: 'Sep', y: 10 },
                { label: 'Oct', y: 70 },
                { label: 'Nov', y: 60 },
                { label: 'Dec', y: 30 }
            ]
        }]
    });
    LineMarkersChart.render();

}

function DreawLineMarkersChartTwo(chartId, lineColors, aXisXColor, aXisYColor) {
    var LineMarkersChartTwo = new CanvasJS.Chart(chartId, {
        animationEnabled: true,
        axisX: {
            lineColor: aXisYColor,
            tickColor: "white",
            labelFontColor: aXisXColor,
            titleFontColor: aXisXColor,
            crosshair: {
                enabled: true
            }
        },
        axisY: {
            lineColor: aXisYColor,
            tickColor: "white",
            labelFontColor: aXisYColor,
            titleFontColor: aXisYColor,
            crosshair: {
                enabled: true
            },
            gridColor: '#f3f3f3',
            suffix: "k",
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "right",
            fontColor: "#b2b1b0"
        },
        data: [{
            type: "line",
            showInLegend: true,
            name: "kiosk",
            indexLabelPlacement: "outside",
            color: lineColors[0],
            dataPoints: [
                { label: 'Jan', y: 10 },
                { label: 'Feb', y: 20 },
                { label: 'Mar', y: 50 },
                { label: 'Apr', y: 30 },
                { label: 'May', y: 10 },
                { label: 'Jun', y: 20 },
                { label: 'Jul', y: 30 },
                { label: 'Aug', y: 40 },
                { label: 'Sep', y: 10 },
                { label: 'Oct', y: 20 },
                { label: 'Nov', y: 30 },
                { label: 'Dec', y: 40 }
            ]
        },
        {
            type: "line",
            showInLegend: true,
            name: "mobile",
            indexLabelPlacement: "outside",
            color: lineColors[1],
            dataPoints: [
                { label: 'Jan', y: 20 },
                { label: 'Feb', y: 30 },
                { label: 'Mar', y: 60 },
                { label: 'Apr', y: 40 },
                { label: 'May', y: 20 },
                { label: 'Jun', y: 30 },
                { label: 'Jul', y: 40 },
                { label: 'Aug', y: 50 },
                { label: 'Sep', y: 20 },
                { label: 'Oct', y: 30 },
                { label: 'Nov', y: 40 },
                { label: 'Dec', y: 50 }
            ]
        },
        {
            type: "line",
            showInLegend: true,
            name: "portal",
            indexLabelPlacement: "outside",
            color: lineColors[2],
            dataPoints: [
                { label: 'Jan', y: 30 },
                { label: 'Feb', y: 40 },
                { label: 'Mar', y: 70 },
                { label: 'Apr', y: 50 },
                { label: 'May', y: 30 },
                { label: 'Jun', y: 40 },
                { label: 'Jul', y: 50 },
                { label: 'Aug', y: 60 },
                { label: 'Sep', y: 30 },
                { label: 'Oct', y: 40 },
                { label: 'Nov', y: 50 },
                { label: 'Dec', y: 60 }
            ]
        }
            ,
        {
            type: "line",
            showInLegend: true,
            name: "walk-in",
            indexLabelPlacement: "outside",
            color: lineColors[3],
            dataPoints: [
                { label: 'Jan', y: 40 },
                { label: 'Feb', y: 50 },
                { label: 'Mar', y: 80 },
                { label: 'Apr', y: 60 },
                { label: 'May', y: 40 },
                { label: 'Jun', y: 50 },
                { label: 'Jul', y: 60 },
                { label: 'Aug', y: 70 },
                { label: 'Sep', y: 40 },
                { label: 'Oct', y: 50 },
                { label: 'Nov', y: 60 },
                { label: 'Dec', y: 70 }
            ]
        }
        ]
    });
    LineMarkersChartTwo.render();
}


});











