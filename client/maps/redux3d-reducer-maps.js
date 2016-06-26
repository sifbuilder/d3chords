
/* 													  			*/
/*    redux3d-reducer-maps.js     */
/* 																	*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-rc.2.js')
	var redux3dActions = require('../redux3d-actions.js')
}
	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.redux3dReducerMaps = global.redux3dReducerMaps || {})));
}(this, function (exports) { 'use strict';


// _____________ MAPS
var initialStateThis = {
	margin: {top: 20, right: 20, bottom: 30, left: 40},
	duration: 1000,
	maxiters: 1000,

	legendBarWidth: 30,
	legendBarHeight: 10,
	legendOffsetX: 30,
	legendOffsetY: 400,

	slx: 50,
	sly: 30,
	slsize: 20,
	slmesage: "Trade Agreements",

	pcmargin: {top: 0, right: 10, bottom: 0, left: 0},
	pcoffsetX: 30,
	pcoffsetY: 500,
	pcwidth: 30,
	pcheight: 30,
	pcsize: 15,

	_TA_domain_min: 0,
	_TA_domain_max: 5,
	_TA_range: 7,

	xAxisLabel: "time",
	yAxisLabel: "weight",
	yearLabelDefault: "year",

	opt_header: '_TA_Header',
	opt_title: '_TA_Title',
	defaultFill: 'rgb(222,184,135)',
	colorMap: {
			q0: 'rgb(198,219,239)',
			q1: 'rgb(158,202,225)',
			q2: 'rgb(107,174,214)',
			q3: 'rgb(66,146,198)',
			q4: 'rgb(33,113,181)',
			q5: 'rgb(8,81,156)',
			q6: 'rgb(8,48,107)'
		},
	mapCont: d3.select("body")
			.append("div")
			.attr("id", "mapContainer")
			.style("width", '900px')
			.style("height", '700px'),
	}
	
function reducerThis(state = initialStateThis, action) {
	if (action == null) return state
	var ActionTypes = redux3dActions.ActionTypes
    switch (action.type) {

				case ActionTypes.SET_MAPS_COLLECTION:	// setMapsCollection
					// console.log("SET_MAPS_COLLECTION", action)
						var r = Object.assign({}, state)			
						if (state.areMapsFetched == false) {
							var chordsCollection = action.payload.chordsCollection
							var itemSpan = state.itemSpan
							if (mapsCollection.length) {
								var cc = mapsCollection.map(function(d, i) {
									return({
										prx: i,
										source: d.source,
										target: d.target,
										predicate: d.predicate,
										weigh: +d.weigh,
										valueOf: function value() {
											return Math.max(this.weigh, 1)
										},
									})
								})
								if (itemSpan > cc.length) itemSpan = cc.length

								r = Object.assign({}, state, {
										mapsCollection: cc,
										areMapsFetched: true,
										itemSpan: itemSpan,
								})
							}
						}
						return r

		
				case ActionTypes.FETCH_MAPS_COLLECTION:	// fetchMapsCollection
				
					var data = action.payload.maps
					var areMapsFetched = state.areMapsFetched
					var itemSpan = state.itemSpan
					
					var r = Object.assign({}, state)			
					if (areMapsFetched === false && typeof data !== 'undefined' && data.length) {
							var subjectByNameAll = subjectByNameCreate(data)	// source, target
							var subjectByIndexAll = subjectByIndexCreate(data)
							var actionsListAll = actionsListCreate(data)
							if (itemSpan > data.length) itemSpan = data.length
							r = Object.assign({}, state,
								{
									mapsCollection: data,
									areMapsFetched: true,
									subjectByNameAll: subjectByNameAll,
									subjectByIndexAll: subjectByIndexAll,
									actionsListAll: actionsListAll,
									itemSpan: itemSpan,
								})
					}
				 return r
						
				case ActionTypes.SET_MAPS:	// setMaps
					// console.log("SET_MAPS")
						var vLow = state.itemsCursorLow
						var vHigh = state.itemsCursorHigh
						var itemSpan = state.itemSpan
						var mode = action.payload.currentMode
						var r = state
						if (mode == 'autoMode') {
							var maps = state.mapsCollection
							var numMaps = maps.length
							if (vHigh >= vLow) vHigh = vHigh + 1	// add one to upper border
							if (vHigh > numMaps) vHigh = -1		// upper border
							if (((vHigh - vLow) > itemSpan) 			// all spteps full
									|| (vHigh == -1) 									// infinitum with vLow active
									|| (vLow == -1) 									// get always from reset
									) vLow = vLow + 1									// increase lower border
							if (vLow > numMaps) vLow = -1			// reset at end of cycle

					var rs = state.mapsCollection.slice(vLow, vHigh)		
							r = Object.assign({}, state, {
								maps: rs,
								itemsCursorLow: vLow,
								itemsCursorHigh: vHigh,
							})
						}
						return r

				case ActionTypes.WALK_UP_MAPS:			// walkUpMaps
						// console.log("WALK_UP_MAPS", action)
					var keyEventsOnMaps = state.keyEventsOnMaps
						var altKeyCode = 18, ctrlKeyCode = 17 
						var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
						var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40
						var keys = action.payload.keys
						
						var vLow = state.itemsCursorLow
						var vHigh = state.itemsCursorHigh
						var itemSpan = action.payload.itemSpan
						var currentMode = action.payload.mode
						var r = state
						if (currentMode == 'walkMode') {
							if (keyEventsOnMaps.upArrow !== null && keyEventsOnMaps.upArrow !== action.payload.keyEvents.upArrow) {			// upArrow
										keyEventsOnMaps.upArrow = action.payload.keyEvents.upArrow
										vLow = Math.max(0, --vLow)
										r = Object.assign({}, state, keyEventsOnMaps) 
										r = Object.assign({}, state, {
											maps: state.mapsCollection.slice(vLow, vHigh),
											itemsCursorLow: vLow,
											itemsCursorHigh: vHigh,
									})
								}
						}
						return r
						
				case ActionTypes.WALK_DOWN_MAPS:			// walkDownMaps
						// console.log("WALK_DOWN_MAPS")
						var keyEventsOnMaps = state.keyEventsOnMaps
						var altKeyCode = 18, ctrlKeyCode = 17 
						var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
						var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40
						var keys = action.payload.keys
						
						var vLow = state.itemsCursorLow
						var vHigh = state.itemsCursorHigh
						var itemSpan = state.itemSpan
						var currentMode = action.payload.currentMode
						var r = Object.assign({}, state)
						if (currentMode == 'walkMode') {
							if (keyEventsOnMaps.downArrow !== null && keyEventsOnMaps.downArrow !== action.payload.keyEvents.downArrow) {			// downArrow
								keyEventsOnMaps.downArrow = action.payload.keyEvents.downArrow
								r = Object.assign({}, state, keyEventsOnMaps) 
								if ((vHigh - vLow)  >= itemSpan) ++vLow
								++vHigh
									r = Object.assign({}, state, {
										maps: state.mapsCollection.slice(vLow, vHigh),
										itemsCursorLow: vLow,
										itemsCursorHigh: vHigh,
								})
							}
						}
						return r						
        default:
            return state
    }
		
					var subjectByNameCreate = function subjectByNameCreate (dataParam) {
							var ci = -1
							var d3map = d3.map()
							var cidx = dataParam
							cidx.forEach(function(d) {
									if (!d3map.has(d.source)) d3map.set(d.source, {name: d.source, index: ++ci})
									if (!d3map.has(d.target)) d3map.set(d.target, {name: d.target, index: ++ci})
							})
							return d3map
					}
			
					var subjectByIndexCreate = function subjectByIndexCreate (dataParam) {		// source, weigh, ???
							var ci = -1
							var subjectIndex = {}
							var d3map = d3.map()
							dataParam.forEach(function(d) {
									if (!d3map.has(d.source)) {
											++ci; 
											d3map.set(d.source, {index: ci}); 
											subjectIndex[ci] = {name: d.source, weigh: d.weigh};
									}
									if (d3map.has(d.source)) {
											var e = d3map.get(d.source);
											subjectIndex[e.index] = {name: d.source, weigh: d.weigh};
									}
									if (!d3map.has(d.target)) {
										++ci; 
										d3map.set(d.target, {index: ci}); 
										subjectIndex[ci] = {name: d.target};
									}
							})
							return subjectIndex
						}
			
					var actionsListCreate = function actionsListCreate (dataParam) {		// source, target, predicate, weigh, value
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
							cr.predicate = d.predicate;
							cr.weigh = d.weigh;
							cr.valueOf = d.valueOf;
							cbn.push(cr)
						})
						return cbn
				}		
}

exports.reducer = reducerThis;
}));
