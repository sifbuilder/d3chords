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


// _____________ context
var stateRangs = {
	reducerRangs: {}
}
var intransition = false
	
// _____________ render
	function render(newState) {
	
		if (intransition == true) {
			return
		}

		// DATA
		// store previous - will not change during render
		var _messages0 = stateRangs.reducerRangs.records || []
		var state = stateRangs = newState
		
		if (state.reducerRangs.initRangs == false ) return

		
		var _messages1 = state.reducerRangs.records
		var _fadeTime = state.reducerConfig.fadeFactor * state.reducerConfig.beatTime		
		var _itemProps = state.reducerConfig.itemProps
		var _duration = state.reducerRangs.duration
		var _n = state.reducerRangs.n
		var _s = state.reducerRangs.s
		var _width = state.reducerCourt.svgWidth
		var _height = state.reducerCourt.svgHeight
		var _svgid = state.reducerConfig.container

		// SVG
		var svgContainer = d3.select('body')
			.selectAll('svg')
				.data(['svg'])
			
			svgContainer
				.enter()
				.append("svg")
					.attr("id", _svgid)
			
			svgContainer
					.style('width', _width)
					.style('height', _height)

			var itemsGroup = d3.select('svg')
				.selectAll('g.rangs')		// items
				.data(['items'])
					
			itemsGroup.enter()	
				.append("g")
					.classed("rangs", true)	// items

   // Some dummy text is needed so that we can get the text height before attaching text to any paths.
  		var dummyText = svgContainer.select(".dummyText")
			if (dummyText.node() == null) {
					dummyText = svgContainer
							.append("text")
								.attr("id", "dummyText")
								.attr("class", "dummyText")
								.text("N")
			}
			var textHeight = dummyText.node().getBBox().height				
	
			
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
		var rig = state.reducerRangs.rangsIndex
    data.push({
      x: Math.random() * l | 0,
      y: Math.random() * h | 0,
			id: id,			// guid() // i
			s: s
    })
  }

  return data
}
	


	// from svg to center
	// get center, height, width
	// transition to center
var _hsr = parseInt(_width/2)
var _vsr = parseInt(_height/2)

								
	// lane elems trasition
		var elemsTransition = d3.transition()
			.duration(_duration)
			.ease(d3.easeLinear)
	
var rangGroups = svgContainer.select("g.rangs")
						.selectAll("g.rang")
            .data(gen(_n, _width, _height, _s), 
								function(d) { 
										var rangsIndex = state.reducerRangs.rangsIndex
										console.log('____ data rang', JSON.stringify(d, null, 2))
							
									return rangsIndex
								})
 							
var newRangGroups = 	rangGroups						
            .enter()
							.append("g")
							.attr("class", "rang")
							.attr("id", function (d) { 

											var item = {
														id: d.id,
														x: d.x,
														y: d.y,
														width: d.s,
														height: d.s, 
												}

												store.dispatch(actions.setRang(item))				
							console.log('____ add rang', JSON.stringify(item, null, 2))
								
									return d.id; })


var rangRects = newRangGroups.append('rect')
            .attr("rid", function (d) { 
									console.log('____ append rect to rang id', JSON.stringify(d.id, d, 2))
					
									return d.id; })
            .attr("class", "rect")
						.attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("height", function (d) { return d.s; })
            .attr("width", function (d) { return d.s; })
						.attr("stroke-width", 1)
						.attr("stroke", "grey")
						.style("fill", "transparent")

rangGroups.select("rect")	
 						.attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("height", function (d) { return d.s; })
            .attr("width", function (d) { return d.s; })
						.transition(elemsTransition)
							.attr("height", function (d) { return 0 * d.s; })
							.attr("width", function (d) { return 0 * d.s; })
									.attrTween("s", function(d) {
										return function (t) {
											var item = {
														id: d.id,
														x: d.x,
														y: d.y,
														width: parseInt((1 - t) * d.s),
														height: parseInt((1 - t) * d.s), 
												}
							console.log('____ update rang', JSON.stringify(item, null, 2))
											store.dispatch(actions.setRang(item))				
											return t
										}
									})
							.on("start", function start() {		
									intransition = true
								})
							.on("end", function end(d) {	
							console.log('____ delete rang', JSON.stringify(d, null, 2))
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