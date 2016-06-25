	
/* 																						*/
/* d3rings-renderer-chords.js   							*/
/* ref. https://bl.ocks.org/mbostock/1308257	*/
// http://circos.ca/guide/tables/
// http://bl.ocks.org/mbostock/4062006
/* 																						*/

	if (typeof require === "function") {
		var d3 = require('d3.v4.0.0-alpha.50.js')
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

		var subjectByName = state.reducerChords.subjectByName
		var subjectByIndex = state.reducerChords.subjectByIndex
		var actionsSeries = state.reducerChords.actionsSeries
		
// console.log("======== subjectByName", JSON.stringify(subjectByName, null, 2))
// console.log("======== subjectByIndex", JSON.stringify(subjectByIndex, null, 2))
// console.log("======== actionsSeries", JSON.stringify(actionsSeries, null, 2))
		
		var outerRate = state.reducerChords.outerRate
		var outerDelta = state.reducerChords.outerDelta
		// 
		var _groupNameColorFrom = 'black'
		var _groupNameColorTo = 'darkgrey'
		var _groupNameColorOther = 'SaddleBrown'
		// chord color  fill(subjectByIndex[d.index].weigh
				
		var _groupArcColorFrom = 'white'
		var _groupArcColorTo = 'white'

		var _groupToolTipColorOther = 'gray'
		var _groupBorderColor = "gray"
		
		var _chordColorLast = "gold"
		var _chordColorOther = 'yellow'
		// chordColor:  fill(subjectByIndex[d.index]
		
		var _predicateColorLast = "gold"
		var _predicatColorOther = 'yellow'
		
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

		// -------------------------------------------
  // http://bl.ocks.org/brattonc/b1abb535227b2f722b51.
  		var dummyText = svgContainer.select(".dummyText")
			if (dummyText.node() == null) {
					dummyText = svgContainer
							.append("text")
								.attr("id", "dummyText")
								.attr("class", "dummyText")
								.text("N")
						.attr("x", 6)
						.attr("dy", 15)
			}
			var textHeight = dummyText.node().getBBox().height				
			var textWidth = dummyText.node().getBBox().width				
// console.log("text size", textHeight, textWidth)
	
		// -------------------------------------------
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
		

			// ================================
				var matrix = []
				for (var i = 0; i < subjectByName.size(); i++) {
					matrix[i] = [];
					for (var j = 0; j < subjectByName.size(); j++) {
						matrix[i][j] = 0;
					}
				}		
				actionsSeries.forEach(function(d) {
						console.log(" ======== matrix d.source.index", JSON.stringify(d.source.index, null, 2))
							matrix[d.source.index][d.target.index] = d;
				})

				var chord = d3.chord()
					// .radius(innerRadius);
						.padAngle(0.05)
					// .sortSubgroups(d3.descending);
				var chordsMatrix = chord(matrix, actionsSeries, subjectByName, subjectByIndex)
						// .sortChords(d3.descending)
						// .padding(.07);
					console.log(" ======== chordsMatrix.groups", JSON.stringify(chordsMatrix.groups, null, 2))
					console.log(" ======== chordsMatrix ribons", JSON.stringify(chordsMatrix, null, 2))


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
						
					groupElemsEnter
						.append("path")
			        .style("fill", function(d) { 		// arcs - new by index in chart
								var r = fill(d.index)
								if (subjectByIndex[d.index].name == lastDataItem.source) r = _groupArcColorTo
								// if (subjectByIndex[d.index].name == lastDataItem.target) r = _groupArcColorTo
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
									// r = 'green'
									if (subjectByIndex[d.index].name == lastDataItem.source) r = _groupArcColorTo
									// if (subjectByIndex[d.index].name == lastDataItem.target) r = _groupArcColorTo
									return r
								})			
						.style("stroke", _groupBorderColor)
						.style("stroke-width", 1)
							
						
					// GROUPS NAMES ENTER
					groupElems.append("text")
						.attr("x", 6)
						.attr("dy", 15)
						.append("textPath")
							.attr("xlink:href", function(d) { return "#group" + d.index; })
							.text(function(d) { 
										var text = (d.value > 0) ? subjectByIndex[d.index].name : ""		// group name enter
										return text
										})
							.style("stroke", function(d, i , a) { 		// group name enter
								var r = _groupNameColorOther
								if (subjectByIndex[d.index].name == lastDataItem.source) r = _groupNameColorFrom
								// if (subjectByIndex[d.index].name == lastDataItem.target) r = _groupNameColorTo
								return r
								})

				 // GROUPS NAMES UPDATE
						groupElems
							.select('textPath')
							.text(function(d) { 
										var text = (d.value > 0) ?subjectByIndex[d.index].name : ""		// group name update
										return text
										})
							.style("stroke", function(d, i , a) { 		// group name update
							var r = _groupNameColorOther
							if (subjectByIndex[d.index].name == lastDataItem.source) r = _groupNameColorFrom
							// if (subjectByIndex[d.index].name == lastDataItem.target) r = _groupNameColorTo
							return r
							})
							
				 // GROUPS ToolTips UPDATE
						groupElems
							.select('title')
			        .text(function(d) { return subjectByIndex[d.index].name + " " + " predicates " + format(d.value) + "with weigh " + subjectByIndex[d.index].weigh; });

				
	// ===========================				
					// RIBBONS GROUP
					var ribbonsGroup = svgContainer
						.select('g.ribbons')		
						.selectAll('g.ribbons')
						.data(['ribbons group'])
							
					var ribbonsGroupNew = ribbonsGroup.enter()	
						.append("g")
							.classed("ribbons", true)

	// ===========================				
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

	// =============================================
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

					// PREDICATES EXTI						
					predicatesElems.exit()
						.remove()
						
					// PREDICATES ENTER
					var predicatesElemsNew = predicatesElems.enter()		// ^^^^^^^^^^^^^^ CONVERSATION
							.append("g")
							.attr("class","predicate")
							.append("text")
								.attr("class","predicate")	
										.text(function(d) {
											var r = "[" + d.source.value.source.name + ":" + d.source.value.target.name + "]:" + d.source.value.predicate
											// var r = d.source.value.predicate
											return r
										})
										// .attr("text-anchor", function(d) {
														// var angle = (d.source.startAngle + d.source.endAngle) / 2
														// return angle > (Math.PI / 2) ? "end" : "start"
											// })										
										.attr("transform", function(d) {
											var angle = (d.source.startAngle + d.source.endAngle) / 2
											var d3Angle =  - (Math.PI / 2) + (d.source.startAngle + d.source.endAngle) / 2
											var rotate = "rotate(" + (angle * 180 / Math.PI - 90) + ") "
											var translate = "translate(" + (innerRadius + 26) + ") "
											var mirror = (angle > Math.PI ? "rotate(180)" : "")
											var tx = outerRadius * Math.cos(d3Angle)
											var ty = outerRadius * Math.sin(d3Angle)
											translate = "translate(" + (tx) + "," + (ty) + ") "
													var transform = rotate + translate + mirror		// ^^^^^^^^^^^^^^^
											return translate
										})
									// .style("stroke", function(d) { return _predicateColorLast })
				        .style("stroke", function(d) { 
										var r =  fill(d.source.index)
										if (d.source.value.prx == lastDataItem.prx) r = _groupNameColorFrom
										return r
									})			

					// PREDICATES UPDATE
					predicatesElems
						.select("text.predicate")
							// .attr("d", ribbon)	
										.text(function(d) {
											var r = "[" + d.source.value.source.name + ":" + d.source.value.target.name + "]:" + d.source.value.predicate
											// var r = d.source.value.predicate
											return r
										})
										.attr("text-anchor", function(d) {
												var angle = (d.source.startAngle + d.source.endAngle) / 2
// console.log("------- 	angle: " , angle)												
												return angle > (Math.PI) ? "end" : "start"
										})
										.attr("transform", function(d) {
												var angle = (d.source.startAngle + d.source.endAngle) / 2
												var d3Angle = - (Math.PI / 2) + (d.source.startAngle + d.source.endAngle) / 2
												var rotate = "rotate(" + (angle * 180 / Math.PI - 90) + ") "
												var translate = "translate(" + (innerRadius + 26) + ") "
												var mirror = (angle > Math.PI ? "rotate(180)" : "")
												var tx = outerRadius * Math.cos(d3Angle)
												var ty = outerRadius * Math.sin(d3Angle)
												translate = "translate(" + (tx) + "," + (ty) + ") "
												var transform = rotate + translate + mirror
												return translate
											})
				// .style("stroke", function(d) { return _predicatColorOther })
				        .style("stroke", function(d) { 
										var r =  fill(d.source.index)
										if (d.source.value.prx == lastDataItem.prx) r = _groupNameColorFrom
										return r
									})			
				.style("opacity", function(d) {
																return 0.7
								})


	}
	
	exports.renderer = renderer;
}))									
									
