/* 																	*/
/* d3lanes-component-rings.js   */
/* 																	*/

if (typeof require === "function") {
		var d3 = require('./d3.v4.0.0-alpha.44.js')
	}
	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesComponentRings = global.d3lanesComponentRings || {})));
}(this, function (exports) { 'use strict';

// _____________ context
var stateRings = {
	reducerRings: {}
}
var rendering = false
var intransition = false

	// _______________________ render
	function render(newState) {
		if (rendering == true) return
		if (newState.reducerRings.rings.length == 0) return
	

		rendering = true
			var state = stateRings= newState
			var ringsRadio = state.reducerRings.ringsRadio || 6.33

			var svgContainer = d3.select('body')
					.selectAll('svg')
						.data(['svgContainer'])
					
					svgContainer
						.enter()
						.append("svg")
							.attr("id", state.reducerConfig.container)
					
					svgContainer
							.style('width', state.reducerCourt.svgWidth)
							.style('height', state.reducerCourt.svgHeight)

					var itemsGroup = d3.select('svg')
						.selectAll('g.rings')		// items
						.data(['items'])
							
					itemsGroup.enter()	
						.append("g")
							.classed("rings", true)	// items
							
				// _________________________________ render Rings	
							var color = d3.scalePlasma()
									.domain([0, 1])
 
							var ringElements = svgContainer
								.select("g.rings")
									.selectAll("circle")
									.data(state.reducerRings.rings)
											.attr('cx', function(d, i, a) { 
													console.log( "ring d", JSON.stringify(d, null, 2))
													return d.x + d.vector[0]})
											.attr('cy', function(d, i, a) { return d.y  + d.vector[1]})
											.attr('r', function(d, i, a) { return ringsRadio })
					            .style("fill", function (d) {
											
												return color( Math.random())
											})
											.style("fill-opacity", 0.2)
					            .style("stroke", "none")

								
							var newRingElements = ringElements
							.enter()
										.append("circle")													
											.attr('cx', function(d, i, a) { 
											return d.x })
											.attr('cy', function(d, i, a) { return d.y })
											.attr('r', function(d, i, a) { return ringsRadio })
					            .style("fill", function (d) {
												return color( Math.random())
											})
					            .style("stroke", "none")
											
							ringElements.exit()
								.remove()										

				rendering = false
} // render
	
	exports.render = render;
}))