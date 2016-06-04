/* 																	*/
/* d3lanes-component-rangs.js   		*/
/* 																	*/

if (typeof require === "function") {
		var d3 = require('./d3.v4.0.0-alpha.44.js')
	}
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesComponentRangs = global.d3lanesComponentRangs || {})));
}(this, function (exports) { 'use strict';

			
// http://stackoverflow.com/questions/31381129/assign-new-id-attribute-to-each-element-created
function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

// Adapted from https://github.com/tj/d3-dot
var gen = function(n, l, h, s) {
  var data = []
  for (var i = n; i; i--) {
		var id = guid()
    data.push({
      x: Math.random() * l | 0,
      y: Math.random() * h | 0,
			id: id,			// guid() // i
			s: s
    })
  }

  return data
}
		
// _____________ context
var stateRangs = {
	reducerRangs: {}
}
var intransition = false

	
// _____________ render
	function render(newState) {

		if (intransition == true) return
		var state = stateRangs = newState

		var _fadeTime = state.reducerConfig.fadeFactor * state.reducerConfig.beatTime		
		var _itemProps = state.reducerConfig.itemProps
		var _duration = state.reducerRangs.duration
		var _n = state.reducerRangs.n
		var _s = state.reducerRangs.s
		var _width = state.reducerCourt.svgWidth
		var _height = state.reducerCourt.svgHeight
		var _svgid = state.reducerConfig.container
		var _initRangs = state.reducerRangs.initRangs
				var _currentView = state.reducerCourt.currentView


		if (_initRangs == false) return

		
		// SVG
		var svgContainer = d3.select('body')
			.selectAll('svg')
				.data(['rangs_svg'], function(d) {
											return 'rangs_svg'
								})

	var newSvgContainer = svgContainer
				.enter()
				.append("svg")
					.attr("id", 'rangs_svg')

			svgContainer
					.style('width', _width)
					.style('height', _height)

			var itemsGroup = d3.select('svg')
				.selectAll('g.rangs')		// items
				.data(['items'])
					
			itemsGroup.enter()	
				.append("g")
					.classed("rangs", true)	// items

   // http://bl.ocks.org/brattonc/b1abb535227b2f722b51.
  		var dummyText = svgContainer.select(".dummyText")
			if (dummyText.node() == null) {
					dummyText = svgContainer
							.append("text")
								.attr("id", "dummyText")
								.attr("class", "dummyText")
								.text("N")
			}
			var textHeight = dummyText.node().getBBox().height				
	
	// elems trasition
		var elemsTransition = d3.transition()
			.duration(_duration)
			.ease(d3.easeLinear)
	

	
var rangGroups = svgContainer.select("g.rangs")
						.selectAll("g.rang")
            .data(gen(_n, _width, _height, _s), 
								function(d) { 
										var rangsId = state.reducerRangs.rangsIndex - 1
										// console.log('rangGroup id: rangsIndex:', rangsId)
									return rangsId
								})
 							
var newRangGroups = rangGroups						
            .enter()
							.append("g")
							.attr("class", "rang")
								.attr("id", function (d) { 

													// pass data of rect that will be created !!!!!
													// store.dispatch(actions.setRang(item))				
									
										return d.id; })

							
// console.log('____ newRangGroups ____ ', JSON.stringify(newRangGroups, null, 2))

var rectOnNewRang = newRangGroups.append('rect')
            .attr("rid", function (d) { 
									console.log('____ rect rid: ', d.id)
									return d.id; })
            .attr("class", "rect")
						.attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("height", function (d) { return d.s; })
            .attr("width", function (d) { return d.s; })
						.attr("stroke-width", 1)
						.attr("stroke", "grey")
						.style("fill", "transparent")
							.transition(elemsTransition)
								.on("start", function start(d) {		
										intransition = true
												var item = {
															id: d.id,
															x: d.x,
															y: d.y,
															width: d.s,
															height: d.s, 
													}
										console.log('____ add rang', JSON.stringify(item, null, 2))
										store.dispatch(actions.setRang(d))				

									})
								.on("end", function end(d) {	
								// console.log('____ delete rang', JSON.stringify(d, null, 2))
									intransition = false
								})								

var rectOnExistingRang = rangGroups.select("rect")	
 						.attr("id", function (d) { return d.id; })
  					.attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("height", function (d) { return d.s; })
            .attr("width", function (d) { return d.s; })
						.transition(elemsTransition)
							// .attr("height", function (d) { return 0 * d.s; })
							// .attr("width", function (d) { return 0 * d.s; })
							.attrTween("height", function(d) {
								return function (t) {
									var r = parseInt((1 - t) * d.s)
									return r
								}
							})
							.attrTween("width", function(d) {
								return function (t) {
									var r = parseInt((1 - t) * d.s)
									return r
								}
							})

							.attrTween("s", function(d) {
								return function (t) {
									var r = parseInt((1 - t) * d.s)
									var item = {
												id: d.id,
												x: d.x,
												y: d.y,
												width: r,
												height: r, 
										}
					// console.log('____ update rang', JSON.stringify(item, null, 2))
									store.dispatch(actions.setRang(item))				
									return r
								}
							})
							.on("start", function start() {		
									intransition = true
								})
							.on("end", function end(d) {	
							// console.log('____ delete rang', JSON.stringify(d, null, 2))
												store.dispatch(actions.deleteRang(d))				
								intransition = false
							})								
						
rangGroups.exit()
			.remove(function(){
							console.log('____ delete rang', JSON.stringify(item, d, 2))
							store.dispatch(actions.deleteRang(d))
					})



		
					
	} // end render
	
	exports.render = render;
}))