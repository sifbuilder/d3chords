
/* 																	*/
/* redux3d-renderer-lanes.js   			*/
/* 																	*/

if (typeof require === "function") {
		var d3 = require('./d3.v4.0.0-rc.2.js')
	}
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3ringsRendererLanes = global.d3ringsRendererLanes || {})));
}(this, function (exports) { 'use strict';

// _____________ coordsUtils
	function coordsUtils () {
		function index_hcoord_pct(arr, index) {
				return (index+1) * (100/(arr.length+1));
			}
		function index_hcoord_pct_with_symbol(arr, index) {
			return index_hcoord_pct(arr, index) + "%";
		}
		
		function horizontal_center(x1, x2) {
			if (x1 > x2) return (x2 - x1)/2 + x1
			else return (x1 - x2)/2 + x2
		}
		function horizontal_percent_to_coord(svg, percent) {
			// https://bugzilla.mozilla.org/show_bug.cgi?id=874811 // _e_
			if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
				var xScrollWidth = svg[0].parentNode.scrollWidth;
			} else {
				var xScrollWidth = svg.property("scrollWidth");
			}
			return xScrollWidth * Number.parseFloat(percent)/100;
		}
		function horizontal_coord_to_percent(svg, length) {
				var xScrollWidth = svg.property("scrollWidth");
				return Number.parseFloat(length) / xScrollWidth;
		}

		var publicAPI = {
				hcoord_tagged_pct: function hcoord_tagged_pct(arr, val) {
					return index_hcoord_pct_with_symbol(arr, arr.indexOf(val));
				},
				hcoord_pct:	function hcoord_pct(arr, val) {
					return index_hcoord_pct(arr, arr.indexOf(val));
				},		
				hcenter_tagged_pct:	function hcenter_tagged_pct(x1, x2) {
					return horizontal_center(x1, x2) + "%";
				}
		}
		return publicAPI
	}

// _____________ arrayUtils
	function arrayUtils () {
		function flattenArrByObjProp(a, p) {
			return a.reduce(function(prevArr, currVal, i, a) {
				if (prevArr.indexOf(currVal[p]) < 0)
						var r = prevArr.push(currVal[p])
						return prevArr
			}, []);
		}
		
		function union_arrays (x, y) {
			var obj = {};
			for (var i = x.length-1; i >= 0; -- i)
				 obj[x[i]] = x[i];
			for (var i = y.length-1; i >= 0; -- i)
				 obj[y[i]] = y[i];
			var res = []
			for (var k in obj) {
				if (obj.hasOwnProperty(k))
					res.push(obj[k]);
			}
			return res;
		}

		function array_names_from_props (arr, props) {
			var r = props.reduce( function(prevArr, currVal, i, a) {
				var q1 = flattenArrByObjProp(arr, currVal)
				var q =  union_arrays(prevArr, q1)
				return q
			}, [])
			return r
		}		
	
		var publicAPI = {
			array_names_from_props: function array_names_from_props (arr, props) {
			
						var r = props.reduce( function(prevArr, currVal, i, a) {
							var q1 = flattenArrByObjProp(arr, currVal)
							var q =  union_arrays(prevArr, q1)
							return q
						}, [])
						return r
			},
		}
		return publicAPI
	}

// _____________ context
var stateLanes = {
	reducerLanes: {}
}
var intransition = false
	
// _____________ renderer
	function renderer(payload) {

		var store = payload.store
		var actions = payload.actions
		var newState = store.getState()
	
		// return on transition
		if (intransition == true) return

		// return on same data
		if (JSON.stringify(stateLanes.reducerLanes.records) === JSON.stringify(newState.reducerLanes.records)) {
			return 
		}
	
		// store previous - will not change during renderer
		var _runners0 = stateLanes.reducerLanes.records || []
		var state = stateLanes = newState
		
		// hide on wrong views
		var _opacity = 1
		var _currentView = state.reducerCourt.currentView
		if (_currentView !== 'lanesView') _opacity = 0
	
		var _runners1 = state.reducerLanes.records
		var _fadeTime = state.reducerConfig.fadeFactor * state.reducerConfig.beatTime
		var _itemProps = state.reducerConfig.itemProps

		// SVG
		var svgContainer = d3.select('body')
			.selectAll('svg')
				.data(['lanes_svg'], function(d) {
											return 'lanes_svg'
								})
			
			var newSvgContainer = svgContainer
				.enter()
				.append("svg")
					.attr("id", "lanes_svg")
					
					var laneGroup = svgContainer
							.selectAll('g.lane')
							.data(['lane'])
							.style('opacity', _opacity)
								
						laneGroup.enter()	
							.append("g")
								.classed("lane", true)
								
			var runnersGroup = laneGroup
				.selectAll('g.runners')
				.data(['runners'])
					
			runnersGroup.enter()	
				.append("g")
					.classed("runners", true)

			var lanesGroup = laneGroup
				.selectAll('g.lanes')
				.data(['lanes'])
					
			lanesGroup.enter()	
				.append("g")
					.classed("lanes", true)

		var markerInstance = laneGroup.select(".runner-marker")
		if (markerInstance.node() == null) {
				laneGroup
					.append("marker")
					.attr("id", "runner-marker")
					.attr("class", "runner-marker")
					.attr("viewBox", "0 0 10 10")
					.attr("refX", "10")
					.attr("refY", "5")
					.attr("markerWidth", "5")
					.attr("markerHeight", "4")
					.attr("orient", "auto")
					.append("path")
						.attr("class", "runner-arrow")
						.attr("d", "M 0 0 L 10 5 L 0 10 z")
			}
					
			var _laneItems0 = arrayUtils()
				.array_names_from_props(_runners0, _itemProps)

			var _laneObjs0 = _laneItems0.map(function(d, i) {
					return ({id: d,
								name: d,
								x0: parseFloat(coordsUtils().hcoord_pct(_laneItems0, d)
									* parseInt(svgContainer.style("width")) / 100).toFixed(0)})})

			var _lanesObj0 = _laneItems0.reduce(function(total,d,currentIndex,arr) {
					var o = {}
					o[d] = {name: d,
													x0: parseFloat(coordsUtils().hcoord_pct(_laneItems0, d)
									* parseInt(svgContainer.style("width")) / 100).toFixed(0)}
					return (Object.assign({}, total, o))}, {})								


			var _laneItems1 = arrayUtils()
				.array_names_from_props(_runners1, _itemProps)
				
			var _laneObjs1 = _laneItems1.map(function(d, i) {

			var x0 = 0
					if ( _lanesObj0.hasOwnProperty( d) ) {
							x0 =  _lanesObj0[d].x0
					}
				return ({id: d,
							name: d,
							x0: x0})})
								
					// laneElems trasition
						var d3ringsTransition = d3.transition()
							.duration(_fadeTime)
							.ease(d3.easeLinear)
	
					// laneElements DATA
						var laneElements = svgContainer
							.select("g.lanes")
								.selectAll("g.lane")
								.data(_laneObjs1, function(d) { return d.id })				
					
					// laneElements EXIT
							laneElements.exit()
									.transition(d3ringsTransition)
										.style("opacity", function(d) {
														store.dispatch(actions.deleteLane(d))
											return 0
										})
										.remove(function(){})										
									
					// laneElements UPDATE	texts
						var laneTexts = laneElements.select("text")
											.attr("text-anchor", "middle")
											.attr("alignment-baseline", "middle")
											.style("font-size", function(d, i) { 
													return parseInt(svgContainer.style("width")) * 2/100
													})
											.text(function(d) { return d.name })
											.attr("dy", "20")
									.transition(d3ringsTransition)
										.attr("x", function(d, i) {
												var r = coordsUtils().hcoord_tagged_pct(_laneItems1, d.name)
												return r
										})
									.on("start", function start() {		
											intransition = true
									})
									.on("end", function end() {	
											intransition = false
									})

					// laneElements UPDATE lines
						var laneLines = laneElements.select("line")
							.attr("x0", function(d, i) {
								var r = parseFloat(coordsUtils().hcoord_pct(_laneItems0, d.name)
												* parseInt(svgContainer.style("width")) / 100).toFixed(0)
								return r
							})
							.attr("y1", function() {
								var text_bbox = this.parentNode.querySelector("text").getBBox();
								return text_bbox.y + text_bbox.height;
							})
							.attr("y2", "100%")
							.transition(d3ringsTransition)
									.attrTween("x1", function(d, i, a) {
											return function (t) {
													var r = parseFloat(coordsUtils().hcoord_pct(_laneItems1, d.name)
																	* parseInt(svgContainer.style("width")) / 100).toFixed(0)
													var x = parseFloat(parseInt(d.x0) + t * (r - parseInt(d.x0))).toFixed(0)
													// dispatch lanes abscissa 	
													var l = {name: d.name, id: d.id, x: x }
													store.dispatch(actions.setLane(l))
													return x
												}
											})

								.attr("x2", function(d, i) {
										var r = coordsUtils().hcoord_tagged_pct(_laneItems1, d.name)
										return r
								})
								.on("start", function start() {		
										intransition = true
								})
								.on("end", function end() {	
										intransition = false
								})								
							
					// newLaneElements ENTER
						var newLaneElements = laneElements
							.enter()
								.append("g")
									.classed("lane", true)

					// newLaneElements ENTER text
						newLaneElements.append("text")
							.attr("class", "lane")
							.attr("text-anchor", "middle")
							.attr("alignment-baseline", "middle")
							.style("font-family", "sans-serif")
											.style("fill", "transparent")
							.style("font-size", function(d, i) { 
												return parseInt(svgContainer.style("width")) * 2/100
													})
							.text(function(d) { return d.name })
							.attr("dy", "20")

							.attr("x", function(d, i, a) {
								var r =  coordsUtils().hcoord_tagged_pct(_laneItems1, d.name)
								return r
							})
							.transition(d3ringsTransition)
									.style("fill", "black")
									.on("start", function start() {		
											intransition = true
									})
									.on("end", function end() {	
											intransition = false
									})									
									
					// newLaneElements ENTER lines																			
						newLaneElements.append("line")
							.attr("class", "lane")
							.attr("stroke", "lightgray")
							.style("stroke-width", "1px")
							.attr("stroke-width", 1)
							.attr("x0", function(d, i) {
								var r = parseFloat(coordsUtils().hcoord_pct(_laneItems0, d.name)
												* parseInt(svgContainer.style("width")) / 100).toFixed(0)
								return r
							})
							.attr("x1", function(d, i, a) { 
										var r = coordsUtils().hcoord_tagged_pct(_laneItems1, d.name)
										var x = parseFloat(coordsUtils().hcoord_pct(_laneItems1, d.name)
												* parseInt(svgContainer.style("width")) / 100).toFixed(0)
												var l = {name: d.name, id: d.id, x: x }
												store.dispatch(actions.setLane(l))
										return r
							})
							.attr("x2", function(d, i, a) { 
										var r = coordsUtils().hcoord_tagged_pct(_laneItems1, d.name)
										return r
							})
							.attr("y1", function(_d, i) {
								var text_bbox = this.parentNode.querySelector("text").getBBox();
								return text_bbox.y + text_bbox.height;
							})
							.attr("y2", function(d, i, a) { 
									var r = "100%"
											return r
							})

				// runnerElements										
						var runnerElements = svgContainer
							.select("g.runners")
								.selectAll("g.runner")
								.data(_runners1, function(d, i) { return d.id || (d.id = ++i); })

					// runner elems UPDATE texts
							runnerElements.select('text')
								.transition(d3ringsTransition)
										.attr("x", function(d, i) {
											var r1 = coordsUtils().hcoord_pct(_laneItems1, d.from)
											var r2 = coordsUtils().hcoord_pct(_laneItems1, d.to)
											var r = coordsUtils().hcenter_tagged_pct(r1, r2)
											return r
										})
									.attr("y", function(d, i, s) { 
											var r = (i + 2) * state.reducerConfig.vstep - 10 
											return r  // (i+1)*10 
									})
									.on("start", function start() {		
											intransition = true
									})
									.on("end", function end() {	
											intransition = false
									})
									
					// runnerElems UPDATE lines
							runnerElements.select('line')						 
							.transition(d3ringsTransition)
								.attr("x1", function(d, i, a) { 
											var r = coordsUtils().hcoord_tagged_pct(_laneItems1, d.from)
											return r
							})
							.attr("x2", function(d, i, a) { 
										var r = coordsUtils().hcoord_tagged_pct(_laneItems1, d.to)
										return r
							})
							.attr("y1", function(d, i) {
									var r = (i + 2) * state.reducerConfig.vstep; 
									return r 
								})
							.attr("y2", function(d, i) {
									var r = (i + 2) * state.reducerConfig.vstep; 
									return r 
							})								
							.on("start", function start() {		
									intransition = true
							})
							.on("end", function end() {	
									intransition = false
							})
									
					// runnerElems UPDATE paths
							runnerElements.select("path")
								.transition(d3ringsTransition)
									.attr("d", function(d, i) { 			
											var	x_pc = coordsUtils().hcoord_tagged_pct(_laneItems1, d.from)
											var xScrollWidth = parseInt(svgContainer.style("width"))
											var t = xScrollWidth * Number.parseFloat(x_pc)/100
											var x = t
											var	rx = 40
											var	ry = 20
											var	y = (i + 2)*50 - ry
											var	sweep_flag = 1	
											var r = [
												"M", x, y, 
												"a", rx, ry, 0, 1, sweep_flag, 0, ry*2,
												].join(" ");														
											return r
										})
									.on("start", function start() {		
											intransition = true
									})
									.on("end", function end() {	
											intransition = false
									})					
												
						// runnerElems ENTER
								var newMessageElements = runnerElements
									.enter()
										.append("g")
											.classed("runner", true)
																					
						// runnerElems ENTER TEXTs
									newMessageElements.each(function(d, i) {
										var new_runner = d3.select(this)	
											.append("text")													
											.attr("class", "runner")
											.style("fill", "transparent")
											.style("font-size", function(d, i) {
													return parseInt(svgContainer.style("width")) * 2/100
													})
											.attr("dy", ".15em")
											.attr("text-anchor", d.from == d.to ? "end" : "middle")
											.attr("alignment-baseline", d.from == d.to ? "middle" : "autoMode")
												.text(d.msg)
												.attr("y", (i + 2) * state.reducerConfig.vstep - 10)
												.attr("x", function() {
													var x1 = coordsUtils().hcoord_pct(_laneItems1, d.from)
													var x2 = coordsUtils().hcoord_pct(_laneItems1, d.to)
													var r = coordsUtils().hcenter_tagged_pct(x1, x2)
													return r
												})
											.transition(d3ringsTransition)
													.style("fill", "grey")
													.on("start", function start() {		
															intransition = true
													})
													.on("end", function end() {	
															intransition = false
													})					
										})
											
						// runnerElems ENTER PATHs
									newMessageElements.each(function(d, i) {
										var new_runner = d3.select(this)	
										if (d.from == d.to) {
											new_runner.append("path")			// new mPATHs
												.attr("fill-opacity", 0)
												.attr("stroke", "transparent")
													.each(function(d) { 
															// this._current = d_to_arc(d, i); // store initial state
													})
												.attr("d", function() { 			
														var	x_pc_to = coordsUtils().hcoord_pct(_laneItems1, d.to)
														var xScrollWidth = parseInt(svgContainer.style("width"))
														var t = xScrollWidth * Number.parseFloat(x_pc_to)/100
														var x = t																		
														var	rx = 40
														var	ry = 20
														var	y = (i + 2)*50 - ry
														var	sweep_flag = 1
														var r = [
															"M", x, y, 
															"a", rx, ry, 0, 1, sweep_flag, 0, ry*2,
															].join(" ");														
														return r
													})
													.transition(d3ringsTransition)
														.attr("stroke", "grey")
														.attr("fill", "grey")
														.attrTween("marker-end", function(d) {
																return function (t) {
																	if (t != 1) {
																		return null
																		} else {
																		return "url(#runner-marker)"
																		}
																}
															})
														.on("start", function start() {		
																intransition = true
														})
														.on("end", function end() {	
																intransition = false
														})					
																
					// runnerElems ENTER LINEs
										}	else {
											var line = new_runner.append("line")
												.attr("class", "runner")
												.attr("stroke", "transparent")
												.attr("stroke-width", 1)
												.attr("y1", function() {
														var r = (i + 2) * state.reducerConfig.vstep ; 
														return r 
													})
												.attr("y2", function() {
														var r = (i + 2) * state.reducerConfig.vstep ; 
														return r 
												})	
												.attr("x1", coordsUtils().hcoord_tagged_pct(_laneItems1, d.from))
												.attr("x2", coordsUtils().hcoord_tagged_pct(_laneItems1, d.to))
												.transition(d3ringsTransition)
															.attr("stroke", "gray")
															.attr("fill", "grey")
															.attrTween("marker-end", function() {
																return function (t) {
																	if (t != 1) {
																		return null
																		} else {
																		return "url(#runner-marker)"
																		}
																}
															})
															.on("start", function start() {		
																	intransition = true
															})
															.on("end", function end() {	
																	intransition = false
															})					
											}
									});								
														
		// runnerElems EXIT
				runnerElements.exit()
					.transition()
						.style("opacity", 0)
						.remove()	

	}
	
	exports.renderer = renderer;
}));
