	
/* 																						*/
/* redux3d-renderer-chords.js   							*/
/* ref. https://bl.ocks.org/mbostock/1308257	*/
// http://circos.ca/guide/tables/
// http://bl.ocks.org/mbostock/4062006
/* 																						*/

	if (typeof require === "function") {
		var d3 = require('./d3.v4.0.0-rc.2.js')
	}
	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3ringsRendererChords = global.d3ringsRendererChords || {})));
}(this, function (exports) { 'use strict';

// _____________ context
var stateChords = {
	reducerChords: {}
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
		if (JSON.stringify(stateChords.reducerChords.chords) === JSON.stringify(newState.reducerChords.chords)) {
			return 
		}
		
		var state = stateChords = newState
		var data = state.reducerChords.chords
		if (!data.length) return
		var lastDataItem = data.slice(-1)[0]
		
		// hide on wrong views
		var _opacity = 1
		var _currentView = state.reducerCourt.currentView
		if (_currentView !== 'chordsView') _opacity = 0
		
		var _width = state.reducerCourt.svgWidth
		var _height = state.reducerCourt.svgHeight
		var _svgid = state.reducerConfig.container
		var _currentView = state.reducerCourt.currentView
		var _fadeTime = state.reducerConfig.fadeFactor * state.reducerConfig.beatTime

		var subjectByName = state.reducerChords.subjectByName
		var subjectByIndex = state.reducerChords.subjectByIndex
		var actionsSeries = state.reducerChords.actionsSeries
		
		var outerRate = state.reducerChords.outerRate
		var outerDelta = state.reducerChords.outerDelta
		// 
		var _groupNameColorFrom = 'white'
		var _groupNameColorTo = 'white'
		var _groupNameColorOther = 'SaddleBrown'
				
		var _groupArcColorFrom = 'black'
		var _groupArcColorTo = 'darkgrey'

		var _groupToolTipColorOther = 'gray'
		var _groupBorderColor = "gray"
		
		var _chordColorLast = "gold"
		var _chordColorOther = 'yellow'
		
		var _predicateColorLast = "sienna"
		var _predicateColorOther = 'gold'
		var _predicateTextSize = 12
		
		
			// SVG
		var svgContainer = d3.select('body')
			.selectAll('svg')
				.data(['svg'], function(d) { return 'svg' })

		var newSvgContainer = svgContainer
				.enter()
				.append("svg")
					.attr("id", 'svg')

		svgContainer
				.style('width', _width)
				.style('height', _height)

// ---------------------------------------				
  // http://bl.ocks.org/brattonc/b1abb535227b2f722b51.
	
		function textWidth(N, s) {
				var dummyText = svgContainer.select(".dummyText")			
				if (dummyText.node() == null) {
						dummyText = svgContainer
								.append("text")
									.attr("id", "dummyText")
									.attr("class", "dummyText")
									.text(N)
								.style("font-size", function(d, i) { 
										return s
									})
				}
				
				var textHeight = dummyText.node().getBBox().height				
				var textWidth = dummyText.node().getBBox().width				
				
				svgContainer.select(".dummyText").remove()
			return textWidth
		}
	
// ---------------------------------------				

		// trasition
			var d3Transition = d3.transition()
				.duration(_fadeTime)
				.ease(d3.easeLinear)
	
	
// ---------------------------------------				
			var outerRadius = outerRate * Math.min(_width, _height),
					innerRadius = outerRadius - outerDelta;

			var format = d3.format(",.3r");
			// var formatValue = d3.formatPrefix(",.0", 1e3);

						
			// The arc generator, for the groups.
			var arc = d3.arc()
					.innerRadius(innerRadius)
					.outerRadius(outerRadius);

			var ribbon = d3.ribbon()
					.radius(innerRadius);

				var fill = d3.scaleLinear()
						.domain([0, 9])
						.range(["#F8EDD3", "#DB704D"])					

				var color = d3.scaleOrdinal()
						.domain(d3.range(4))
						.range(["#000000", "#FFDD89", "#957244", "#F26223"]);
		

// ---------------------------------------				MATRIX
				var matrix = []
				for (var i = 0; i < subjectByName.size(); i++) {
					matrix[i] = [];
					for (var j = 0; j < subjectByName.size(); j++) {
						matrix[i][j] = 0;
					}
				}		
				actionsSeries.forEach(function(d) {
							matrix[d.source.index][d.target.index] = d;
				})

				var chord = d3.chord()
						.padAngle(0.05)
					// .radius(innerRadius
					// .sortSubgroups(d3.descending)
					
				var chordsMatrix = chord(matrix, actionsSeries, subjectByName, subjectByIndex)
				
				// var chordsMatrix = chord(matrix)
						// .sortChords(d3.descending)
						// .padding(.07);

				var ribbon = d3.ribbon()
						.radius(innerRadius);			

// ---------------------------------------				
				// CHORDS GROUP
				var chordsGroup = svgContainer
						.selectAll('g.chords')		// items
						.data(['chords group'])

					var chordsGroupNew = chordsGroup.enter()
						.append("g")
						.classed("chords", true)	// items
						.attr("transform", "translate(" + _width / 2 + "," + _height / 2 + ")")
						.datum(chordsMatrix);
							
// ---------------------------------------				
					// GROUPS GROUP
					var groupsGroup = svgContainer
						.select('g.chords')		
						.selectAll('g.groups')
						.data(['groups group'])
							
					var groupsGroupNew = groupsGroup.enter()	
						.append("g")
							.classed("groups", true)

// ---------------------------------------	
					// GROUPS ELEMS		
				var groupElems = svgContainer
						.select("g.groups")
						.selectAll("g.group")
						.data(chordsMatrix.groups, function(d) { 
								return d.index })		

					// GROUPS ELEMS EXIT			
					groupElems.exit()
						.remove()

					// GROUPS ELEMS ENTER
				var	groupElemsEnter = groupElems.enter()
						.append("g")
							.classed("group", true)		
						
	// ---------------------------------------	
					// var gpath = svgContainer
							// .select("g.chords")
							// .selectAll('path')
							// .data(chordsMatrix.groups, function(d) { 
								// return d.index })
					// gpath.attr('id', function(d){return 'path22' + d.index})
					// gpath.attr('d', d3.arc()
							// .innerRadius(innerRadius/ 2)
							// .outerRadius(outerRadius/ 2)
					// )
					// gpath.enter().append('path')
						// .attr('d', d3.arc()
								// .innerRadius(innerRadius/ 2)
								// .outerRadius(outerRadius / 2)
					// )
					// gpath.exit().remove()
	
	
			 // GROUPS ARCS ENTER
					groupElemsEnter
						.append("path")
			        .style("fill", function(d) { 		// arcs - new by index in chart
								var r = fill(d.index)
								if (subjectByIndex[d.index].name == lastDataItem.source) r = _groupArcColorFrom
								if (subjectByIndex[d.index].name == lastDataItem.target) r = _groupArcColorTo
								return r
							})
							.style("stroke", _groupToolTipColorOther)
							.style("stroke-width", 1)
							.attr("id", function(d, i) { return "group" + d.index; })
							.attr("d", arc)
						.append("title")									// group toolTip
			        .text(function(d) { 
									return subjectByIndex[d.index].name + " predicates " + format(d.value) + "with weigh " + subjectByIndex[d.index].weigh; 
						})
					
				 // GROUPS ARCS UPDATE
					groupElems
						.select('path')
							.attr("d", arc)
							.style("fill", function(d) { 				// group arcs update
									var r =  fill(d.index)
									if (subjectByIndex[d.index].name == lastDataItem.source) r = _groupArcColorFrom
									if (subjectByIndex[d.index].name == lastDataItem.target) r = _groupArcColorTo
									return r
								})			
						.style("stroke", _groupBorderColor)
						.style("stroke-width", 1)
							
// ---------------------------------------	
					// GROUPS NAMES ENTER
					groupElemsEnter
						.append("text")
							.attr("x", 6)
							.attr("dy", 15)
							.append("textPath")
								.attr("xlink:href", function(d) {
									return "#group" + d.index; 
								})
								.text(function(d) { 
											var text = subjectByIndex[d.index].name		// group name enter
											return text
											})
								.style("stroke", function(d, i , a) { 
											var r = _groupNameColorOther
											if (subjectByIndex[d.index].name == lastDataItem.source) r = _groupNameColorFrom
											if (subjectByIndex[d.index].name == lastDataItem.target) r = _groupNameColorTo
											return r
									})
								.style("fill", function(d, i , a) { 
										var r = _groupNameColorOther
											if (subjectByIndex[d.index].name == lastDataItem.source) r = _groupNameColorFrom
											if (subjectByIndex[d.index].name == lastDataItem.target) r = _groupNameColorTo
											return r
								})
								.style("stroke-width", function(d, i , a) { 
											var r = 1
											return r
									})

							

				 // GROUPS NAMES UPDATE
					groupElems
						.select('textPath')
						.text(function(d) { return subjectByIndex[d.index].name })	// group name update
						.style("stroke", function(d, i , a) { 
								var r = _groupNameColorOther
								if (subjectByIndex[d.index].name == lastDataItem.source) r = _groupNameColorFrom
								if (subjectByIndex[d.index].name == lastDataItem.target) r = _groupNameColorTo
								return r
						})
						.style("fill", function(d, i , a) { 
							var r = _groupNameColorOther
								if (subjectByIndex[d.index].name == lastDataItem.source) r = _groupNameColorFrom
								if (subjectByIndex[d.index].name == lastDataItem.target) r = _groupNameColorTo
								return r
						})
							
				 // GROUPS ToolTips UPDATE
					groupElems
						.select('title')
						.text(function(d) { return subjectByIndex[d.index].name + " " + " predicates " + format(d.value) + "with weigh " + subjectByIndex[d.index].weigh; });

// ---------------------------------------				
					// RIBBONS GROUP
					var ribbonsGroup = svgContainer
						.select('g.ribbons')		
						.selectAll('g.ribbons')
						.data(['ribbons group'])
							
					var ribbonsGroupNew = ribbonsGroup.enter()	
						.append("g")
							.classed("ribbons", true)

// ---------------------------------------				
				// RIBBONS ELEMS
					var ribbonsElems = svgContainer
						.select("g.chords")
						.selectAll("g.ribbon")
						.data(chordsMatrix, function(d, i) { return d.prx })
																
				// RIBBONS ELEMS EXIT
					ribbonsElems.exit()
						.remove()
						
					// RIBBONS ELEMS ENTER
					var ribbonsElemsEnter = ribbonsElems.enter()
						.append("g")
							.classed("ribbon", true)
							
						ribbonsElemsEnter	
							.append("path")
							.attr("id", function(d, i) { return "ribbon" + d.source.value.prx })
							.attr("d", ribbon)
			        // .style("fill", function(d) { return fill(d.source.index) })			
				        .style("fill", function(d) { 		// ribbon path enter
										var r =  fill(d.source.value.source.index)
										if (d.source.value.source.name == lastDataItem.source) r = _chordColorLast
										return r
									})			
									.style("stroke", function(d) { return d3.rgb(fill(d.source.index)).darker(); })
							.append("title")
								.text(function(d) {
									return d.source.value.source.name + " to " + d.source.value.target.name + ":" + format(d.source.value)})
	
	
				 //  RIBBONS ELEMS UPDATE
					ribbonsElems
						.select("path")
							.attr("d", ribbon)	
									// .attr("d", function(d) {
										// return d
									// })
				        .style("fill", function(d) { 		// ribbon path update
										var r =  fill(d.source.value.source.index)
										return r
									})			

					// CHORDS TITLE
					ribbonsElems
						.select("title")
						.text(function(d) {		// source (index, subindex, startAngle, endAngle, value), target
							var r = d.source.value.source.name + " to " + d.source.value.target.name + ":" + format(d.source.value)
							return r})

// ---------------------------------------				
					// PREDICATES GROUP
					var predicatesGroup = svgContainer
						.select('g.chords')		
							.selectAll("g.predicates")
						.data(['predicates group'])

						var predicatesGroupNew = predicatesGroup.enter()	
						.append("g")
						.classed("predicates", true)	// items

// ---------------------------------------				
					// PREDICATES ELEMS		
					var predicatesElems = svgContainer
						.select("g.predicates")
						.selectAll("g.predicate")
								.data(chordsMatrix, function(d) { return	d.source.value.prx})

					// PREDICATES EXIT			
					predicatesElems.exit()
						.remove()
						
					// PREDICATES ENTER
					var predicatesElemsEnter = predicatesElems.enter()		// ^^^^^^^^^^^^^^ CONVERSATION
							.append("g")
							.attr("class","predicate")
							.append("text")
								.attr("x", 0)
								.attr("y", 0)
								.attr("class","predicate")	
										.text(function(d) {
											var r = d.source.value.predicate
											return r
										})
										.style("font-size", function(d, i) { 
												return _predicateTextSize
												})
									.attr("transform", function(d) {
											var rotate = ''
											var translate = ''
											var mirror = ''
											var transform = ''
											var d3Angle = (d.source.startAngle + d.source.endAngle) / 2
											var mathAngle = (2 * Math.PI) - (d3Angle - (Math.PI / 2))
											// var rotate = "rotate(" + (d3Angle * 180 / Math.PI - 90) + ") "
											// var translate = "translate(" + (innerRadius + 26) + ") "
											// var mirror = (d3Angle > Math.PI ? "rotate(180)" : "")
											var deltaX, deltaY, tx, ty
											tx = ty = deltaX = deltaY = 0
											if (d3Angle > 0/2 * Math.PI && d3Angle < 1/2 * Math.PI ) {	// NE
												deltaX = 0
												deltaY = 0
											} else if (d3Angle > 1/2 * Math.PI && d3Angle < 2/2 * Math.PI ) {	// SE
												deltaX = 0
												deltaY = textWidth("N", _predicateTextSize)
											} else if (d3Angle > 2/2 * Math.PI && d3Angle < 3/2 * Math.PI ) {	// SW
												deltaX = - textWidth(d.source.value.predicate, _predicateTextSize) - textWidth("N", _predicateTextSize) 
												deltaY = textWidth("N", _predicateTextSize)
											} else if (d3Angle > 3/2 * Math.PI && d3Angle < 4/2 * Math.PI) {	// NW
												deltaX =  - textWidth(d.source.value.predicate, _predicateTextSize) - textWidth("N", _predicateTextSize)
												deltaY = 0
											}
											tx = outerRadius * Math.cos(mathAngle)
											ty = - outerRadius * Math.sin(mathAngle) // inverse screen metrix
											translate = "translate(" + (tx + deltaX) + "," + (ty + deltaY) + ") "
											transform = rotate + translate + mirror		// ^^^^^^^^^^^^^^^
											return transform
										})
									.style("fill", function(d) { 
											var r = (d.source.value.prx == lastDataItem.prx) ? _predicateColorLast : _predicateColorOther
											return r
										})

					// PREDICATES UPDATE
					predicatesElems
							.select("text.predicate")
										.style("fill", function(d, i , a) { 
													var r = _predicateColorOther
														return r
											})
											.style("font-size", function(d, i) { 
														return 0
														})
											.attr("transform", function(d) {
													var rotate = ''
														var translate = ''
														var mirror = ''
														var transform = ''
														var d3Angle = (d.target.startAngle + d.target.endAngle) / 2
														var mathAngle = (2 * Math.PI) - (d3Angle - (Math.PI / 2))
														var tx = outerRadius * Math.cos(mathAngle) 
														var ty = - outerRadius * Math.sin(mathAngle) // inverse screen metrix
														translate = "translate(" + (tx) + "," + (ty) + ") "
														transform = rotate + translate + mirror		// ^^^^^^^^^^^^^^^
														return transform
												})
											.style("opacity", function(d) {
													return 0
											})


	}
	
	exports.renderer = renderer;
}))									
									
