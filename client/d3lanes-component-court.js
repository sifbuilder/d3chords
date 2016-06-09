/* 																	*/
/* d3lanes-component-court.js   		*/
/* 																	*/

if (typeof require === "function") {
		var d3 = require('./d3.v4.0.0-alpha.44.js')
	}
	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesComponentCourt = global.d3lanesComponentCourt || {})));
}(this, function (exports) { 'use strict';

	function render(newState) {
		var state
		doRender(newState)

		function doRender(newState) {
			if (state === newState) return 
				state = newState
					
			var svgContainer = d3.select(state.reducerConfig.containerElem)
			.selectAll('svg')
				.data(['svg'])
			
			var svgContainerNew = svgContainer.enter()
				.append("svg")
					.attr("id", state.reducerConfig.containerId)
					.style('width', state.reducerCourt.svgWidth)
					.style('height', state.reducerCourt.svgHeight)
					.attr('class', 'bar-chart')			// 
					.style('border', '1px solid red')
					.style('color', 'blue')	
					.attr('viewbox',"0 0 3 2")										


			var svg = d3.select('svg')

			var itemsGroup = d3.select('svg')
				.selectAll('g.notices')		// items
				.data(['items'])
					
			itemsGroup.enter()	
				.append("g")
					.classed("notices", true)	// items
			// _________________________________ render Notice Update
				var errorNotice = (state.reducerCourt.notice) ? state.reducerCourt.notice : ""
				var noticeToShow = " "
				var currentView = state.reducerCourt.currentView
				var labelMode = state.reducerConfig.modeLabels[state.reducerConfig.modes[state.reducerCourt.currentMode]]
				var size = parseInt(svg.style("width")) + " x " + parseInt(svg.style("height"))
				var rangsNow = state.reducerWhirls.rangsNow
				var particlesNow = state.reducerParticles.particleIndex
				var ringsNow = state.reducerWhirls.ringsIndex
				var framesPerSecond = state.reducerDebug.fps
				var startRangs = state.reducerWhirls.startRangs
				var rangsAlways = state.reducerWhirls.rangsAlways
				var ringsHits = state.reducerWhirls.ringsHits
				var rangsHitsIndex = state.reducerWhirls.rangsHitsIndex
				var framesLostPct = Math.round(100 * (60 - framesPerSecond) / 60)
				var hitsLostPct = Math.round(100 * (rangsAlways - rangsHitsIndex) / rangsAlways) || 0
				
				if (currentView == 'lanesView') {
					var cmdsLanes = "down-arrow, right-arrow, alt-v"
					noticeToShow = noticeToShow +
						cmdsLanes + " - " + currentView +
						" - n: " + particlesNow +
						" - fps: " + framesPerSecond
				}
				if (currentView == 'ringsView') {
					noticeToShow = noticeToShow +
						((startRangs) ? '' : ' MOUSE !!! ') +
						"(" + 'try alt-v' + ")" +		
						' - you have alredy missed ' + hitsLostPct + ' % of your ' + rangsAlways + ' rings ' + 
						' and ' + framesLostPct + ' % of your ' + '60' + ' frames '
				}
				
				var winWidthPixels = parseInt(svg.style("width"))
				var winHeightPixels = parseInt(svg.style("height"))
				
				var fontSizeHw = 2 + "hw"
				var fontSize = winWidthPixels * 2/100
				var fontname = 'sans-serif'
						
				var c=document.createElement('canvas');
				var ctx=c.getContext('2d');
				ctx.font = fontSize + 'px ' + fontname;

				var noticeLength = ctx.measureText(noticeToShow).width
				
				var vlocation = winHeightPixels - fontSize
				var hlocation = winWidthPixels	- noticeLength

			 // items elems
				var itemsElems = svgContainer
					.select("g.notices")
						.selectAll("g.notice")
						.data([noticeToShow]);							
									
				// items elems enter
				var itemsElemsNew = itemsElems.enter()
						.append("g")
							.classed("notice", true)	
					
					itemsElemsNew.each(function(d, i) {
							var itemElemNew = d3.select(this)	
								.append("text")					
									.classed("info", true)
									.style("font-family", fontname)
									.attr("x", function(d) { 
											return hlocation; })
									.attr("y", function(d) { 							
											return vlocation
									})
									.style("font-size", function(d, i) {
											return fontSize
										})
									.text(function(d) { return d })
									.style("fill-opacity", 1)
							})
						
			// items elems update
					itemsElems
						.select('text')
							.text(function(d) { return d })
							.attr("x", function(d) { 
											return hlocation; })
							.attr("y", function(d) { 
											return vlocation; })

			// items elems exit
					itemsElems.exit()
						.select('text')
							.remove()					

		} // render
	}
	
	exports.render = render;
}))