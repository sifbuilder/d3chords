
/* 																	*/
/* d3rings-renderer-whirls.js   		*/
/* 																	*/

if (typeof require === "function") {
		var d3 = require('./d3.v4.0.0-alpha.44.js')
	}
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3ringsRendererWhirls = global.d3ringsRendererWhirls || {})));
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
		var grid = guid()
    data.push({
      x: Math.random() * l | 0,
      y: Math.random() * h | 0,
			id: i,
			rid: i,
			grid: grid,
			s: s
    })
  }

  return data
}
		
// _____________ context
var stateWhirls = {
	reducerWhirls: {}
}
var intransition = false
var intransition_newRang = false
var intransition_updRang = false
var intransition_newRing = false

	
// _____________ renderer
	function renderer(payload) {
		var store = payload.store
		var actions = payload.actions
		var newState = store.getState()
		
		// return on transition
		if (intransition == true) return
		
		var state = stateWhirls = newState

		// return if not init - mouse hover
		var _startRangs = state.reducerWhirls.startRangs

		// hide on wrong views
		var _opacity = 1
		var _currentView = state.reducerCourt.currentView
		if (_currentView !== 'ringsView') _opacity = 0
				
		if (_startRangs == false) return

		var _fadeTime = state.reducerConfig.fadeFactor * state.reducerConfig.beatTime		
		var _itemProps = state.reducerConfig.itemProps
		var _duration = state.reducerWhirls.duration
		var _n = state.reducerWhirls.n
		var _s = state.reducerWhirls.s
		var _width = state.reducerCourt.svgWidth
		var _height = state.reducerCourt.svgHeight
		var _svgid = state.reducerConfig.container
		var _currentView = state.reducerCourt.currentView

		// rings
		var ringsRadio = state.reducerWhirls.ringsRadio || state.reducerConfig.ringDefaultRadio

		
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

			d3.select('svg')
				.selectAll('g.rangs')		// items
				.data(['items'])
				.style('opacity', _opacity)
			.enter()	
				.append("g")
					.classed("rangs", true)	// items

			// rings
				d3.select('svg')
						.selectAll('g.rings')		// items
						.data(['items'])
				.enter()	
						.append("g")
							.classed("rings", true)	// items
						
					
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
	
				var rangsTransition = d3.transition()
					.duration(_duration)
					.ease(d3.easeLinear)
	
				var elemsTransition = d3.transition()
					.duration(_duration)
					.ease(d3.easeLinear)
	
	
			var colorScale = d3.scaleCubehelix()
								.domain([0, 1])

					// _________________________________ render rangs

				var rangGroups = svgContainer.select("g.rangs")		// data rang
						.selectAll("g.rang")
            .data(gen(_n, _width, _height, _s), 
								function(d) { return d.rid })
 							
				var newRangGroups = rangGroups										// enter rang
            .enter()
							.append("g")
							.attr("class", "rang")
							// .attr("id", function (d) { return d.id; })
							.attr("rid", function (d) { return d.rid; })

				var rectOnNewRang = newRangGroups.append('rect')	// append rect
            .attr("rid", function (d) {return d.rid })
            .attr("grid", function (d) {return d.grid })
            .attr("class", "rect")
						.attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("s", function (d) { return d.s; })
            .attr("t", function (d) { return d.t; })
						.attr("stroke-width", 1)
						.attr("stroke", "grey")
						.style("fill", "transparent")

				if (intransition_updRang == false) {
					var rectOnExistingRang = rangGroups.select("rect")	// update rect
 						.attr("rid", function (d) { return d.rid })
  					.attr("x", function (d) { return d.x })
            .attr("y", function (d) { return d.y })
            .attr("s", function (d) { return d.s })
							.transition('updRang')
								.duration(_duration)
								.ease(d3.easeLinear)
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
												rid: d.rid,
												grid: d.grid,
												x: d.x,
												y: d.y,
												t: t,
												s: parseInt((1 - t) * d.s),
										}
									store.dispatch(actions.setRang(item))				
									return r
								}
							})
							.on("start", function start() {		
									intransition_updRang = true
								})
							.on("end", function end(d) {	
								store.dispatch(actions.deleteRang(d))				
								intransition_updRang = false
							})								
						
					rangGroups.exit()											// delete rang
						.remove(function(){
							store.dispatch(actions.deleteRang(d))
								})
				}
				
					// _________________________________ render rings

						var ringElements = svgContainer
							.select("g.rings")
							.selectAll("circle")
							.data(state.reducerWhirls.rings, function (d) { return d.id})

						var updateItems = ringElements
									.attr('r', function(d, i, a) { return d.r })
									.attr('cx', function(d, i, a) { return d.cx })
									.attr('cy', function(d, i, a) { return d.cy })
										.style("fill", function (d) {	return colorScale( Math.random() / 2)})
										.style("fill-opacity", 0.7)
										.style("stroke", "none")
				
						var newRingElements = ringElements
							.enter()
								.append("circle")													
										.attr('class', 'ring')
										.attr('id', function(d, i, a) { return d.id })
										
						newRingElements				
									.transition('newRing')
										.duration(_duration)
										.ease(d3.easeLinear)
											.attrTween('t', function(d, i, a) {
											return function (t) {
												store.dispatch(actions.tickRing(Object.assign({}, d, {t: t})))
												return t
											}
									})
			
							var exitRingElements = ringElements.exit()
								.remove(function(){
												store.dispatch(actions.deleteRing(d))
								})

	} // end render
	
	exports.renderer = renderer;
}));
