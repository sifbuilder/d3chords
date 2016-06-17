	
/* 																						*/
/* d3rings-renderer-chords.js   							*/
/* ref. https://bl.ocks.org/mbostock/1308257	*/
/* 																						*/

	if (typeof require === "function") {
		var d3 = require('d3.v4.0.0-alpha.44.js')
		var d3ringsChordsUtils = require('d3rings-chords-utils.js')
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

		// hide on wrong views
		var _opacity = 1
		var _currentView = state.reducerCourt.currentView
		if (_currentView !== 'chordsView') _opacity = 0
		
		var _width = state.reducerCourt.svgWidth
		var _height = state.reducerCourt.svgHeight
		var _svgid = state.reducerConfig.container
		var _currentView = state.reducerCourt.currentView

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

					
					var groupsGroup = d3.select('svg')
						.selectAll('g.groups')		// items
						.data(['groups'])
							
					groupsGroup.enter()	
						.append("g")
							.classed("groups", true)	// items
							.attr("transform", "translate(" + _width / 2 + "," + _height / 2 + ")")
					
					var chordsGroup = d3.select('svg')
						.selectAll('g.chords')		// items
						.data(['chords'])
							
					chordsGroup.enter()	
						.append("g")
							.classed("chords", true)	// items
							.attr("transform", "translate(" + _width / 2 + "," + _height / 2 + ")")
				
			
			// -------------------------------------------
				var outerRadius = Math.min(_width, _height) / 4 - 4,
						innerRadius = outerRadius - 20;

				var format = d3.format(",.3r");

				// The color scale, for different categories of ?worrisome? risk.
				var fill = d3LanesChordsUtils.d3_scale_ordinal()
						.domain([0, 1, 2])
						.range(["#DB704D", "#D2D0C6", "#ECD08D", "#F8EDD3"]);

				// The arc generator, for the groups.
				var arc = d3LanesChordsUtils.d3_svg_arc()
						.innerRadius(innerRadius)
						.outerRadius(outerRadius);

				// The chord generator (quadratic B?zier), for the chords.
				var chord = d3LanesChordsUtils.d3_svg_chord()
						.radius(innerRadius);
						
		// -------------------------------------------
			// source target ammount risk
		
			 // Square matrices, asynchronously loaded; credits is the transpose of debits.
				var debits = []

				// The chord layout, for computing the angles of chords and groups.
				var layout = d3LanesChordsUtils.d3_layout_chord()
						//.sortGroups(d3.descending)
						//.sortSubgroups(d3.descending)
						.sortChords(d3.descending)
						.padding(.04);

				var subjectByName = d3.map(),
						countryIndex = -1,
						actionsList = []

			var fill = d3LanesChordsUtils.d3_scale_ordinal()
					.domain([0, 1, 2, 3])
					.range(["#D2D0C6", "#ECD08D", "#F8EDD3", "#DB704D"]);
			
						
			var arc = d3LanesChordsUtils.d3_svg_arc()
					.innerRadius(innerRadius)
					.outerRadius(outerRadius);						
						
				function subjectByNameCreate (dataParam) {
						var ci = -1
						var d3map = d3.map()
						var cidx = dataParam
						cidx.forEach(function(d) {
								if (!d3map.has(d.source)) d3map.set(d.source, {name: d.source, index: ++ci})
								if (!d3map.has(d.target)) d3map.set(d.target, {name: d.target, index: ++ci})
						})
						return d3map
				}
				subjectByName = subjectByNameCreate(data)
	
				function subjectByIndexCreate (dataParam) {
						var ci = -1
						var subjectIndex = {}
						var d3map = d3.map()
						dataParam.forEach(function(d) {
								if (!d3map.has(d.source)) {
										++ci; 
										d3map.set(d.source, {index: ci}); 
										subjectIndex[ci] = {name: d.source, risk: d.risk};
								}
								if (d3map.has(d.source)) {
										var e = d3map.get(d.source);
										subjectIndex[e.index] = {name: d.source, risk: d.risk};
								}
								if (!d3map.has(d.target)) {
									++ci; 
									d3map.set(d.target, {index: ci}); 
									subjectIndex[ci] = {name: d.target};
								}
						})
						return subjectIndex
				}
				var subjectByIndex = subjectByIndexCreate(data)
								
				function actionsListCreate (dataParam) {
						var cbn = []
						var ci = -1
						var d3map = d3.map()
						dataParam.forEach(function(d) {
							var cr = {}
							if (d3map.has(d.source)) cr.source = d3map.get(d.source);
							 else {
											++ci
											cr.source = {name: d.source, index: ci}
											d3map.set(d.source, cr.source)
									}
									
							if (d3map.has(d.target)) cr.target = d3map.get(d.target)
							 else {
											++ci
											cr.target = {name: d.target, index: ci}
											d3map.set(d.target, cr.target)
									}
							cr.amount = d.amount;
							cr.risk = d.risk;
							cr.valueOf = d.valueOf;
							cbn.push(cr)
						})
						return cbn
				}
				actionsList = actionsListCreate(data)

				for (var i = 0; i < subjectByName.size(); i++) {
					debits[i] = [];
					for (var j = 0; j < subjectByName.size(); j++) {
						debits[i][j] = 0;
					}
				}		
				layout.matrix(debits)		
				
				actionsList.forEach(function(d) {
								debits[d.source.index][d.target.index] = d;
				});
					
					layout.matrix(debits)		

					// Groups.
					var groupElems = svgContainer
							.select(".groups")
							.selectAll(".group")
							.data(layout.groups())

					// Add groups
					var groupsElemsNew = groupElems
						.enter().append("g")
						.classed("group", true)

					// Add group paths
					groupsElemsNew.append("path")
			        .style("fill", function(d) { return fill(subjectByIndex[d.index].risk); })			
							.style("stroke", "gray")
							.style("stroke-width", 1)
							.attr("id", function(d, i) { return "group" + d.index; })
							.attr("d", arc)
						.append("title")
			        .text(function(d) { return subjectByIndex[d.index].name + " " + " owes" + " $" + format(d.value) + "B. " + "with risk " + subjectByIndex[d.index].risk; });
					
					// Add group labels
					// Add the group label (but only for large groups, where it will fit).
					// An alternative labeling mechanism would be nice for the small groups.
					groupsElemsNew.append("text")
							.attr("x", 6)
							.attr("dy", 15)
						.append("textPath")
							.attr("xlink:href", function(d) { return "#group" + d.index; })
							.text(function(d) { 
										var text = (d.value > 20) ? subjectByIndex[d.index].name : ""
										return text
										})

				 // Update group title
						groupElems
							.select('title')
			        .text(function(d) { return subjectByIndex[d.index].name + " " + " owes" + " $" + format(d.value) + "B. " + "with risk " + subjectByIndex[d.index].risk; });
							
				 // Update group textPath
						groupElems
							.select('textPath')
							.text(function(d) { 
										var text = (d.value > 20) ? subjectByIndex[d.index].name : ""
										return text
										})
							
				 // Update group paths
						groupElems
							.select('path')
								.attr("d", arc)
								.style("fill", function(d) { 
																	return fill(subjectByIndex[d.index].risk); })			
							.style("stroke", "gray")
							.style("stroke-width", 1)
				
					// CHORDS
					var chordsElems = svgContainer
						.select("g.chords")
						.selectAll("g.chord")
							.data(layout.chords)
							
					 // chords add
					var chordsElemsNew = chordsElems
						.enter()
							.append("g")
							.attr("class","chord")
							.append("path")
								.attr("class","chord")	
									.style("fill", function(d) { return fill(d.source.value.risk); })
									.style("stroke", function(d) { return d3.rgb(fill(d.source.value.risk)).darker(); })
									.attr("d", chord)
									.append("title")
										.text(function(d) {
											return d.source.value.source.name + " owes " + d.source.value.target.name + " $" + format(d.source.value) + "B."; })
	
					// NOTES
					var noteElems = svgContainer
							.select("g.chords")
							.selectAll("g.note")
								.data(layout.chords)	
								
					var noteElemsNew = noteElems
						.enter()
							.append("g")
							.attr("class","note")
							.append("text")
								.attr("class","note")	
									.style("stroke", function(d) { return d3.rgb(fill(d.source.value.risk)).darker(); })
									.attr("d", chord)
										.text(function(d) {
											var r = d.source.value.source.name + " to " + d.source.value.target.name
											return r
										})
										.attr("text-anchor", function(d) {
														var angle = (d.source.startAngle + d.source.endAngle) / 2
														return angle > (Math.PI / 2) ? "end" : "start"
											})										.attr("transform", function(d) {
											var angle = (d.source.startAngle + d.source.endAngle) / 2
											var d3Angle =  - (Math.PI / 2) + (d.source.startAngle + d.source.endAngle) / 2
											var rotate = "rotate(" + (angle * 180 / Math.PI - 90) + ") "
											var translate = "translate(" + (innerRadius + 26) + ") "
											var mirror = (angle > Math.PI ? "rotate(180)" : "")
											var tx = outerRadius * Math.cos(d3Angle)
											var ty = outerRadius * Math.sin(d3Angle)
											translate = "translate(" + (tx) + "," + (ty) + ") "
											var transform = rotate + translate + mirror
											// console.log("____ d chord NOTE enter transform: " + transform)
											return translate
										})

					noteElems
						.select("text.note")
							.attr("d", chord)	
										.text(function(d) {
											var r = d.source.value.source.name + " to " + d.source.value.target.name
											return r
											 })
										.attr("text-anchor", function(d) {
														var angle = (d.source.startAngle + d.source.endAngle) / 2
														return angle > (Math.PI / 2) ? "end" : "start"
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
											
					noteElems.exit()
						.remove()

					
					// CHORD cont.	
				 //  chords update
					chordsElems
						.select("path")
							.attr("d", chord)	
								.style("fill", function(d) { 
												return fill(d.source.value.risk); })

					// chords add title
					chordsElems
						.select("title")
								.text(function(d) {
										return d.source.value.source.name + " owes " + d.source.value.target.name + " $" + format(d.source.value) + "B."; });
										
				// chords exit
					chordsElems.exit()
						.remove()
	}
	
	exports.renderer = renderer;
}))									
									
