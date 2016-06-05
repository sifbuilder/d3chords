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
		// if (intransition == true) return
		// if (newState.reducerRings.rings.length == 0) return
	

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
							
						var colorScale = d3.scaleCubehelix()
								.domain([0, 1])


					// _________________________________ render Rings	
								
							var ringElements = svgContainer
								.select("g.rings")
								.selectAll("circle")
								.data(state.reducerRings.rings, 
											function (d) { return d.id})
										// .attr('id', function(d, i, a) { return d.id })
										// .attr('cx', function(d, i, a) { return d.cx })
										// .attr('cy', function(d, i, a) { return d.cy })
										// .attr('r', function(d, i, a) { return d.r })
								
								
									
							var exitRingElements = ringElements.exit()
								.remove(function(){
												store.dispatch(actions.deleteRing(d))
										})							

										
										
							// var updateItems = ringElements
									// .attr('r', function(d, i, a) { return d.r })
									// .attr('id', function(d, i, a) { return d.id })
									// .attr('cx', function(d, i, a) { return d.cx })
									// .attr('cy', function(d, i, a) { return d.cy })
									// .attr('r', function(d, i, a) { return d.r })
											// .transition(elemsTransition)
											// .attrTween("id", function(d, i, a) {
												// return function (t) {
															// var ring = Object.assign({}, d, {t: t})
// store.dispatch(actions.tickRing(ring))
														// var r = d.id
														// return r
												// }
											// })
											// .on("start", function start() {		
														// intransition = true
												// })
											// .on("end", function end(d) {	
														// intransition = false
											// })									
								
							var newRingElements = ringElements
							.enter()
								.append("circle")													
										.attr('class', 'ring')
										.attr('id', function(d, i, a) {
console.log(" ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ append ", d.id)		

										return d.id })
										.attr('cx', function(d, i, a) { return d.cx })
										.attr('cy', function(d, i, a) { return d.cy })
										.attr('r', function(d, i, a) { return ringsRadio })
										.style("fill", function (d) {	return colorScale( Math.random() / 2)})
										.style("fill-opacity", 0.7)
										.style("stroke", "none")
									.transition(elemsTransition)
											// .duration(_duration)
											// .ease(d3.easeLinear)
										.attrTween('r', function(d, i, a) {
												return function (t) {
// console.log(" ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ tick r", d.id)			
var r = (1 - t) * ringsRadio
														return r
												}
										})
										// .remove()

												// .attrTween('t', function(d, i, a) {
												// return function (t) {
// console.log(" ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ tick Ring", d.id)			
// var ring = Object.assign({}, d, {t: t})
// store.dispatch(actions.tickRing(ring))
														// var r = t
														// return r
												// }
										// })
											.on("start", function start() {		
														intransition = true
												})
											.on("end", function end(d) {	
														intransition = false
store.dispatch(actions.deleteRing(d))														
// console.log(" ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 2", d.id)			
											})				
										
								


} // render
	
	exports.render = render;
}))