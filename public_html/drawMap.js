document.write("begin script <br>");
var w = 1000;
var h = 600;
var projection = d3.geo.equirectangular()
	.center([-106.02, 34.17])
	.translate([w / 2, h / 2])
	.scale([4200]);
document.write("scale = " + projection.scale() + "<br>");
document.write("center = " + projection.center() + "<br>");
var NMPath = d3.geo.path().projection(projection); // use d3.geoPath()?

var riverPath = d3.geo.path().projection(projection);

// global variables to hold json geographic data
var nmBoundaryJSON;
var riversJSON;


//document.onload = function(){
// Draw NM State Boundary
d3.json("nm-boundary.json", function(json) {
	// path is a property of the svg
	// essentially creates enough paths for the data (?)
	svg.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("d", NMPath)
		.attr("stroke", "black")
		.attr("stroke-width", "3")
		.attr("fill", "none");

	nmBoundaryJSON = json;
});

// Draw Rivers - or something
d3.json("flowline.json", function(jsonData) {

	riversJSON = jsonData;

	//filterRiversOnFlow();
	//filterRiversOnInState();

	drawRiversSVG();

});

function drawRiversSVG() {

	svg.selectAll("path")
		.data(riversJSON.features)
		.enter()
		.append("path")
		.attr("d", riverPath)
		.attr("stroke", "blue")
		.attr("stroke-width", "1") // TODO dynamically choose based on flow amt
		.attr("fill", "blue");

}

function filterRiversOnFlow() {

}

var svg = d3.select("body")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

//}