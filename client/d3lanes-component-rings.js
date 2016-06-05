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

// http://stackoverflow.com/questions/31381129/assign-new-id-attribute-to-each-element-created
function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

// _____________ context
var stateRings = {
	reducerRings: {}
}
var rendering = false
var intransition = false

	// _______________________ render
	function render(newState) {
		if (intransition == true) return
		if (newState.reducerRings.rings.length == 0) return
	

			var state = stateRings= newState
			var ringsRadio = state.reducerRings.ringsRadio || state.reducerConfig.ringDefaultRadio

		var _duration = state.reducerRangs.duration
	// elems trasition
		var elemsTransition = d3.transition()
			.duration(_duration)
			.ease(d3.easeLinear)

			
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
 
console.log('____ ring state.reducerRings.ringsew', state.reducerRings.ringsNew.length, JSON.stringify(state.reducerRings.ringsNew, null, 2))
 
							var ringElements = svgContainer
									.select("g.rings")
									.selectAll("circle")
									.data(state.reducerRings.ringsNew, function(d) {
											return guid()
										})
										// .attr('id', function(d, i, a) { return d.id})
										// .attr("class", "ring")
										// .attr('cx', function(d, i, a) { return d.x + d.vector[0]})
										// .attr('cy', function(d, i, a) { return d.y + d.vector[1]})
										// .attr('r', function(d, i, a) { return ringsRadio })
									
							var newRingElements = ringElements
							.enter()
								.append("circle")													
									.attr('cx', function(d, i, a) { return d.x })
									.attr('cy', function(d, i, a) { return d.y })
									.attr('r', function(d, i, a) { return ringsRadio })
									.style("fill", function (d) {
										return color( Math.random())
									})
									.style("fill-opacity", 0.7)
									.style("stroke", "none")
									.transition(elemsTransition)
									.attrTween("r", function(d, i, a) {
console.log('____ ring d', JSON.stringify(d, null, 2))
									
										return function (t) {
												var r = parseInt((1 - t) * ringsRadio)
												return r
										}
									})
									.on("start", function start() {		
											intransition = true
										})
									.on("end", function end(d) {	
														// console.log('____ delete rang', JSON.stringify(d, null, 2))
														// store.dispatch(actions.deleteRang(d))				
										intransition = false
									})								


											
							ringElements.exit()
								.remove()										

} // render
	
	exports.render = render;
}))