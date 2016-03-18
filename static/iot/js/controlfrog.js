// Colour settings
if(themeColour == 'white'){
	var metric = '#a9a9a9';
	var backColor = '#7d7d7d';
	var pointerColor = '#898989'; 	
	var pageBackgorund = '#fff';
	var pieTrack = metric;
	var pieBar = backColor;
	var gaugeTrackColor = metric;
	var gaugeBarColor = backColor;
	var gaugePointerColor = '#ccc';
	var pieSegColors = [metric,'#868686','#636363','#404040','#1d1d1d'];	
}
else {
	//default to black
	var backColor = '#4f4f4f';
	var metric = '#f2f2f2';	
	var pointerColor = '#898989'; 
	var pageBackgorund = '#2b2b2b';	
	var pieSegColors = [metric,'#c0c0c0','#8e8e8e','#5b5b5b','#292929'];
	var pieTrack = backColor;
	var pieBar = metric;
	var gaugeTrackColor = '#4f4f4f';
	var gaugeBarColor = '#898989';
	var gaugePointerColor = metric;
}

// Stores
var cf_rSVPs = [];
var cf_rGs = [];
var cf_rLs = [];
var cf_rPs = [];
var cf_rRags = [];
var cf_rFunnels = [];


$(document).ready(function(){

	// Make items square
	cfSizeItems();
	
	// Navigation 
	$('.cf-nav-toggle').click(function(e){

		if( $('.cf-nav').hasClass('cf-nav-state-min') ){
			$('.cf-nav').removeClass('cf-nav-state-min').addClass('cf-nav-state-max');
			$('.cf-container').addClass('cf-nav-state-max');
		}
		else{
			$('.cf-nav').removeClass('cf-nav-state-max').addClass('cf-nav-state-min');		
			$('.cf-container').removeClass('cf-nav-state-max');			
		}
		
		e.preventDefault();
	});
		
	// Time and date display 
	(function updateTime(){
		var now = moment();
		
		$('.cf-td').each(function(){
			if($(this).hasClass('cf-td-12')){
				$('.cf-td-time', $(this)).html(now.format('h:mm'));
				ampm = now.format('a');
				$('.cf-td-time', $(this)).append('<span>'+ampm+'</span>');
			}
			else{
				$('.cf-td-time', $(this)).html(now.format('HH:mm'));
			}

			$('.cf-td-day', $(this)).html(now.format('dddd'));   			
			$('.cf-td-date', $(this)).html(now.format('MMMM Do YYYY'));   
		});
	
		setTimeout(updateTime, 3000);
	})();
	
	// Open links from RSS Module in a new window
	$('.cf-rss a').each(function(){
		$(this).prop('target', '=_blank');
	});
	
}); // end doc ready

/*
*
* Sparklines (cf-svmc-sparkline)
*
*/
$(document).ready(function(){
	
	// Set up default options	
	window.cf_defaultSparkOpts = {};
	cf_defaultSparkOpts.fillColor = false;
	cf_defaultSparkOpts.lineColor = metric;
	cf_defaultSparkOpts.lineWidth = 1.5;
	cf_defaultSparkOpts.minSpotColor = false;
	cf_defaultSparkOpts.maxSpotColor = false;
	cf_defaultSparkOpts.spotRadius = 2.5;
	cf_defaultSparkOpts.highlightLineColor = metric;
	cf_defaultSparkOpts.spotColor = '#f8f77d';
	
	// Initialise sparklines
	/*
	*	Copy the each() function for each sparkline you have
	* 	e.g. $('#spark-1').each(function(){.....}
	*/	
	$('.sparkline').each(function(){
		
		
		// Set custom options and merge with default
		customSparkOptions = {};
		customSparkOptions.minSpotColor = true;
		var sparkOptions = cf_defaultSparkOpts;
		var sparkOptions = $.extend({}, cf_defaultSparkOpts, customSparkOptions);
		
		
		// No custom options
		var sparkOptions = cf_defaultSparkOpts;
			
		data = 	[1765,2000,2453,2122,2333,2666,3000,2654,2322,2500,2700,2654,2456,2892];
		createSparkline($(this), data, sparkOptions);
	});	

	var sparkOptions = cf_defaultSparkOpts;

	data = [];
		
	full_data = [1765,2000,2453,2122,2333,2666,3000,2654,2322,2500,2700,2654,2456,2892];

	function wait(ms){
	   var start = new Date().getTime();
	   var end = start;
	   while(end < start + ms) {
	     end = new Date().getTime();
	  }
	}



	data = 	[1765,2000,2453,2122,2333,2666,2456,2892];
	createSparkline($('#spark-2'), data, sparkOptions);

	data = 	[1765,2000,2453,2654,2456,2892];
	createSparkline($('#spark-3'), data, sparkOptions);

});

function createSparkline(obj, data, sparkOptions){
	
	$(window).resize(generateSparkline);
	
	function generateSparkline(){
		var ww = $(window).width();
		var $obj = obj;			
		var $parent = $obj.parent().parent();
	
		// Current value
		$('.sparkline-value .metric-small', $parent).html(data[data.length-1]);
	
		// Sizing
		if(ww < 768){
			var cWidth = $parent.width();
			var slWidth = Math.floor(cWidth/3);
		}
		else{
			var svWidth = $('.sparkline-value', $parent).width();
			var cWidth = $parent.width();
			var slWidth = cWidth - svWidth - 20;
			var cHeight = $parent.parent().outerHeight() - 35;
			var svmHeight = $('.cf-svmc', $parent).height();
			var slHeight = cHeight - svmHeight;
			$('.sparkline-value', $parent).css({height:slHeight});
		}	
	
		// Options
		sparkOptions.width = slWidth;
		sparkOptions.height = slHeight;		
	
		
    	$obj.sparkline(data, sparkOptions);
	}
	
	// Call once on page load
	generateSparkline();
}

/**
 * D3 Line chart
 */
$(document).ready(function() {
	// InitChart();

	function InitChart() {

	  var lineData = [{
	    'x': 1,
	    'y': 5
	  }, {
	    'x': 20,
	    'y': 20
	  }, {
	    'x': 40,
	    'y': 10
	  }, {
	    'x': 60,
	    'y': 40
	  }, {
	    'x': 80,
	    'y': 5
	  }, {
	    'x': 100,
	    'y': 60
	  }];

	  var vis = d3.select("#visualisation"),
	    WIDTH = 350,
	    HEIGHT = 280,
	    MARGINS = {
	      top: 20,
	      right: 20,
	      bottom: 20,
	      left: 50
	    },
	    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([d3.min(lineData, function (d) {
	        return d.x;
	      }),
	      d3.max(lineData, function (d) {
	        return d.x;
	      })
	    ]),

	    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([d3.min(lineData, function (d) {
	        return d.y;
	      }),
	      d3.max(lineData, function (d) {
	        return d.y;
	      })
	    ]),

	    xAxis = d3.svg.axis()
	      .scale(xRange)
	      .tickSize(5)
	      .tickSubdivide(true),

	    yAxis = d3.svg.axis()
	      .scale(yRange)
	      .tickSize(5)
	      .orient("left")
	      .tickSubdivide(true);


	  vis.append("svg:g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
	    .call(xAxis);

	  vis.append("svg:g")
	    .attr("class", "y axis")
	    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
	    .call(yAxis);

	  var lineFunc = d3.svg.line()
	  .x(function (d) {
	    return xRange(d.x);
	  })
	  .y(function (d) {
	    return yRange(d.y);
	  })
	  .interpolate('basis');

	  function getInterpolation() {
	    
	    var interpolate = d3.scale.quantile()
	        .domain([0,1])
	        .range(d3.range(1, lineData.length + 1));

	    return function(t) {
	        var interpolatedLine = lineData.slice(0, interpolate(t));
	        return lineFunction(interpolatedLine);
	        }
	    }

		vis.append("svg:path")
		  .transition()
		    .duration(3000)
		    .attrTween('d', getInterpolation)
		  .attr("d", lineFunc(lineData))
		  .attr("stroke", "white")
		  .attr("stroke-width", 2)
		  .attr("fill", "none");
		//   .transition()
		//   	.duration(1000)
		//   	.attrTween('d', pathTreen);

		// function pathTween() {
		//     var interpolate = d3.scale.quantile()
		//             .domain([0,1])
		//             .range(d3.range(1, lineData.length + 1));
		//     return function(t) {
		//         return line(lineData.slice(0, interpolate(t)));
		//     };
		// }​

  	}
});
 
/*
*
*	Gauge (cf-gauge)
*
*/
$(document).ready(function(){
	//Initialise gauges to default 
	$('.cf-gauge').each(function(){

		// Gather IDs 
		var gId = $(this).prop('id');					// Gauge container id e.g. cf-gauge-1
		var gcId = $('canvas', $(this)).prop('id');		// Gauge canvas id e.g. cf-gauge-1-g
		var gmId = $('.metric', $(this)).prop('id');  	// Gauge metric id e.g. cf-gauge-1-m

		//Create a canvas
		var ratio = 2.1;
		var width = $('.canvas',$(this)).width();
		var height = Math.round(width/ratio);
		$('canvas', $(this)).prop('width', width).prop('height', height);

		// Set options  	
		rGopts = {};
		rGopts.lineWidth = 0.30;
		rGopts.strokeColor = gaugeTrackColor;
		rGopts.limitMax = true;
		rGopts.colorStart = 'green';
		rGopts.percentColors = void 0;	
		rGopts.pointer = {
			length: 0.7,
			strokeWidth: 0.035,
			color: 'yellow'
		};

		// Create gauge
		cf_rGs[gId] = new Gauge(document.getElementById(gcId)).setOptions(rGopts);
		cf_rGs[gId].setTextField(document.getElementById(gmId));

		// Set up values for gauge (in reality it'll likely be done one by one calling the function, not from here)
		updateOpts = {'minVal':'0.0','maxVal':'2.0','newVal':'1'};
		gaugeUpdate(gId, updateOpts);


		// Responsiveness	
		$(window).resize(function(){
		
			//Get canvas measurements
			var ratio = 2.1;
			var width = $('.canvas', $('#'+gId)).width();
			var height = Math.round(width/ratio);

			cf_rGs[gId].ctx.clearRect(0, 0, width, height);
			$('canvas', $('#'+gId)).width(width).height(height);
			cf_rGs[gId].render();
		});

	});
});

/*
*	Set or update a Gauge
*	@param gauge 	string 		ID of gauge container
*	@param opts 	object		JSON object of options
*/
function gaugeUpdate(gauge, opts){
	if(opts.minVal){
		$('.val-min .metric-small', $('#'+gauge)).html(opts.minVal);		
		cf_rGs[gauge].minValue = opts.minVal;
	}
	if(opts.maxVal){
		cf_rGs[gauge].maxValue = opts.maxVal;
		$('.val-max .metric-small', $('#'+gauge)).html(opts.maxVal);
	}
	if(opts.newVal){
		cf_rGs[gauge].set(parseInt(opts.newVal));
	}
}

/*
*
* Line charts (cf-line)
*
*/
$(document).ready(function(){

	// Default line chart options
	window.cf_lineDefaultOpts = {};
	cf_lineDefaultOpts.datasetFill = false;
	cf_lineDefaultOpts.scaleMaxMinLabels = true;
	cf_lineDefaultOpts.scaleShowGridLines = false;
	cf_lineDefaultOpts.pointDot = false;
	cf_lineDefaultOpts.scaleLineColor = 'transparent';
	cf_lineDefaultOpts.bezierCurve = false;
	cf_lineDefaultOpts.scaleFontSize = 10;


	// Initialise chart
	/*
	*	Copy the each() function for each line chart you have
	* 	e.g. $('#line-1').each(function(){.....}
	*/	
	$('.cf-line').each(function(){
		// Dummy data for line chart
		var ldata = {
			labels : ["5/13","","","","","","11/13"],
			datasets : [
				{
					strokeColor : metric,
					data : [65,59,40,81,56,55,90]
				}
			]
		}
	
		var $container = $(this);
		var lId = $container.prop('id');
		
		// Store chart information
		cf_rLs[lId] = {};
		cf_rLs[lId].data = ldata;
		
		/*
		// Set options per chart
		customOptions = {};
		customOptions.scaleMaxMinLabels = false;
		cf_rLs[lId].options = customOptions;
		*/
		
		// Create chart
		createLineChart($container);
	});
	
}); // end doc ready

function createLineChart(obj){
	$(window).resize(generateLineChart);

	function generateLineChart(){
		$container = obj;
		lId = $container.prop('id');

		var $canvas = $('canvas', $container);
		var cWidth = $container.width();
		var cHeight = $container.height();		
		
		console.log(cWidth, cHeight);

		// Get canvas context		
		var ctx = $canvas.get(0).getContext('2d');

		//Set canvas size
		$canvas.prop({width:cWidth,height:cHeight});
		
		// Check for custom options
		var lineOptions;
		if(cf_rLs[lId].options){
			var lineOptions = $.extend({}, cf_lineDefaultOpts, cf_rLs[lId].options);
		}
		else{
			lineOptions = cf_lineDefaultOpts;
		}

		// Create chart		
		new Chart(ctx).Line(cf_rLs[lId].data,lineOptions);
	}
	
	// Call once on page load
	generateLineChart();
}




/*
*	Size modules 
*/
function cfSizeItems(){
	var width = $(window).width();

	$('.cf-item').each(function(){
		if(width > 767 ){
			$(this).height($(this).width());
		}
		else{
			$(this).height('auto');
		}
	});
}
// Call the resize function on window resize
$(window).resize(function(){
	cfSizeItems();
});

/*
*	Shorten large numbers
*/
function prettyNumber (number) {
    var prettyNumberSuffixes = ["", "K", "M", "bn", "tr"];
	var addCommas = function (nStr){
		var x = '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x)) {
			x = x.replace(rgx, '$1' + ',' + '$2');
		}
		return x;
	}
	var prettyNumber_rec = function (number, i) {
		if (i == prettyNumberSuffixes.length) {
			return addCommas(Math.round(number*1000)) + prettyNumberSuffixes[i-1];
		}
		if (number / 1000 >= 1) { // 1000+
			return prettyNumber_rec(number / 1000, ++i);
		}
		else {
			var decimals = number - Math.floor(number);
			if (decimals != 0) {
				if (number >= 10) { // 10 - 100
					number = Math.floor(number) + Math.round(decimals*10) / 10 + '';
					number = number.replace(/(.*\..).*$/, '$1');
				}
				else { // 0 - 10
					number = Math.floor(number) + Math.round(decimals*100) / 100 + '';
					number = number.replace(/(.*\...).*$/, '$1');
				}
				return number + prettyNumberSuffixes[i];
			}
			else {
				return Math.floor(number) + prettyNumberSuffixes[i];
			}
		}
	}
	return prettyNumber_rec(number, 0);
}
