
/* 																	*/
/* d3rings-renderer-particles.js    */
/* 																	*/

if (typeof require === "function") {
		var d3 = require('./d3.v4.0.0-alpha.44.js')
	}
	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3ringsRendererParticles = global.d3ringsRendererParticles || {})));
}(this, function (exports) { 'use strict';

// _____________ context
var stateParticles = {
	reducerParticles: {}
}
var rendering = false
var intransition = false

	// _______________________ renderer
	function renderer(payload) {

		var store = payload.store
		var actions = payload.actions
		var newState = store.getState()
		
		if (rendering == true) return
		if (newState.reducerParticles.particles.length == 0) return
		rendering = true
			var state = stateParticles= newState
			var particleRadio = state.reducerParticles.particleRadio || 6.33

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
						.selectAll('g.particles')		// items
						.data(['items'])
							
					itemsGroup.enter()	
						.append("g")
							.classed("particles", true)	// items
							
				// _________________________________ render Particles	
					var color = d3.scalePlasma()
							.domain([0, 1])

					var particleElements = svgContainer
						.select("g.particles")
							.selectAll("circle")
							.data(state.reducerParticles.particles)
									.attr('cx', function(d, i, a) { return d.x })
									.attr('cy', function(d, i, a) { return d.y })
									.attr('r', function(d, i, a) { return particleRadio })
									.style("fill", function (d) {
										var r = d.closestLaneUp.x / (d.closestLaneUp.x - d.closestLaneDown.x)
										return color( ((3*r)%10 / 10) + (Math.random()* 3 /10))
									})
									.style("fill-opacity", 0.2)
									.style("stroke", "none")

						
					var newParticleElements = particleElements
					.enter()
								.append("circle")													
									.attr('cx', function(d, i, a) { return d.x })
									.attr('cy', function(d, i, a) { return d.y })
									.attr('r', function(d, i, a) { return particleRadio })
									.style("fill", function (d) {
										var r = d.closestLaneUp.x / (d.closestLaneUp.x - d.closestLaneDown.x)
										return color( ((3*r)%10 / 10) + (Math.random()/10))
									})
									.style("stroke", "none")
									
					particleElements.exit()
						.remove()										

				rendering = false
} // renderer
	
	exports.renderer = renderer;
}));
