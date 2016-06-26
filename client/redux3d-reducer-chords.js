
/* 													  			*/
/*    redux3d-reducer-chords.js     */
/* 																	*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-rc.2.js')
	var redux3dActions = require('./redux3d-actions.js')
}
	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.redux3dReducerChords = global.redux3dReducerChords || {})));
}(this, function (exports) { 'use strict';

				var actionsSeriesCreate = function actionsSeriesCreate (dataParam) {
						var cbn = []
						var ci = -1
						var d3map = d3.map()
						dataParam.forEach(function(d) {
						
							var cr = {}
							if (d3map.has(d.source)) {
									cr.source = d3map.get(d.source)
							} else {
									++ci
									cr.source = {name: d.source, index: ci}
									d3map.set(d.source, cr.source)
							}
							if (d3map.has(d.target)) {
									cr.target = d3map.get(d.target)
							} else {
									++ci
									cr.target = {name: d.target, index: ci}
									d3map.set(d.target, cr.target)
							}
							cr.prx = d.prx
							cr.predicate = d.predicate
							cr.weigh = d.weigh
							cr.valueOf = d.valueOf
							cbn.push(cr)
						})
						return cbn
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
										d3map.set(d.source, {
													index: ci
										})
										subjectIndex[ci] = {
											name: d.source, 
											index: ci,
											weigh: d.weigh,
										}
								}
								if (d3map.has(d.source)) {
										var e = d3map.get(d.source);
										subjectIndex[e.index] = {
											name: d.source, 
											index: ci,
											weigh: d.weigh
										}
								}
								if (!d3map.has(d.target)) {
									++ci; 
									d3map.set(d.target, {
											index: ci
									})
									subjectIndex[ci] = {
											name: d.target
									}
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

// _____________ CHORDS
var initialStateThis = {
			outerRate: 3/8,
			outerDelta: 20,
			chords: [],
			chordsCollection: [],
			chordsIndex: 0,
			areChordsFetched: false,
			src: 'chords.csv',
			itemsCursorLow: 0,
			itemsCursorHigh: 0,
			keyEventsOnChords: {},
			itemSpan: 50,
			itemProps: ['source', 'target', 'predicate', 'weigh'],
			subjectByNameAll: {},
			subjectByIndexAll: {},
			actionsListAll: [],
			chordsCollection: [
				 {source: "architect", target: "faraon", predicate: "did village in tebas, workers!", weigh: 5},
				 {source: "faraon", target: "architect", predicate: "uhmm!!!", weigh: 10},
				 {source: "friend", target: "architect", predicate: "what a waste!!!", weigh: 9},
				 {source: "architect", target: "faraon", predicate: "built fortress in kadesh, hittites!", weigh: 5},
				 {source: "faraon", target: "architect", predicate: "uhmm!!!", weigh: 10},
				 {source: "girl friend", target: "architect", predicate: "coward!!!", weigh: 9},
				 {source: "faraon", target: "architect", predicate: "now sleeping room, eternal", weigh: 15},
				 {source: "architect", target: "faraon", predicate: "uhmm", weigh: 2},
				 {source: "friend", target: "architect", predicate: "lazy!!!", weigh: 9},
				 {source: "girl friend", target: "architect", predicate: "do it!!!", weigh: 9},
				 {source: "faraon", target: "architect", predicate: "resources, all!!!", weigh: 15},
				 {source: "architect", target: "faraon", predicate: "uhmm", weigh: 3},
				 {source: "architect", target: "faraon", predicate: "  .....  ", weigh: 1},
				 {source: "architect", target: "faraon", predicate: "  .....  ", weigh: 1},
				 {source: "architect", target: "faraon", predicate: "  __/^\\__ !!!", weigh: 10},
				 {source: "faraon", target: "architect", predicate: "uhmm", weigh: 5},
				 {source: "friend", target: "architect", predicate: "uhmm!!!", weigh: 9},
				 {source: "girl friend", target: "architect", predicate: "uhmm!!!", weigh: 9},
				 {source: "faraon", target: "architect", predicate: "sitting room, inside!!!", weigh: 15},
				 {source: "faraon", target: "architect", predicate: "resources, all!!!", weigh: 15},
				 {source: "architect", target: "faraon", predicate: "uhmm", weigh: 3},
				 {source: "architect", target: "faraon", predicate: "uhmm", weigh: 2},
				 {source: "architect", target: "faraon", predicate: "uhmm", weigh: 1},
			],
	}
	
function reducerThis(state = initialStateThis, action) {
	if (action == null) return state
	var ActionTypes = redux3dActions.ActionTypes
    switch (action.type) {

				case ActionTypes.SET_CHORDS_COLLECTION:	// setChordsCollection
					// console.log("SET_CHORDS_COLLECTION", action)
						var r = Object.assign({}, state)			
						if (state.areChordsFetched == false) {
							var chordsCollection = action.payload.chordsCollection
							var itemSpan = state.itemSpan
							if (chordsCollection.length) {
								var cc = chordsCollection.map(function(d, i) {
									return({
										prx: i,
										source: d.source,
										target: d.target,
										predicate: d.predicate,
										weigh: +d.weigh,
										valueOf: function value() {
											return this.weigh
										},
									})
								})
								if (itemSpan > cc.length) itemSpan = cc.length
								r = Object.assign({}, state, {
										chordsCollection: cc,
										areChordsFetched: true,
										itemSpan: itemSpan,
								})
							}
						}
						return r

		
				case ActionTypes.FETCH_CHORDS_COLLECTION:	// fetchChordsCollection
				
					var data = action.payload.chords
					var areChordsFetched = state.areChordsFetched
					var itemSpan = state.itemSpan
					
					var r = Object.assign({}, state)			
					if (areChordsFetched === false && typeof data !== 'undefined' && data.length) {
							var actionListAll = actionsListCreate(data)	// source, target
							var subjectByNameAll = subjectByNameCreate(data)	// source, target
							var subjectByIndexAll = subjectByIndexCreate(data)
							var actionsListAll = actionsListCreate(data)
							if (itemSpan > data.length) itemSpan = data.length
							r = Object.assign({}, state,
								{
									chordsCollection: data,
									areChordsFetched: true,
									actionListAll: actionListAll,
									subjectByNameAll: subjectByNameAll,
									subjectByIndexAll: subjectByIndexAll,
									actionsListAll: actionsListAll,
									itemSpan: itemSpan,
								})
					}
				 return r
						
				case ActionTypes.SET_CHORDS:	// setChords
					// console.log("SET_CHORDS")
						var vLow = state.itemsCursorLow
						var vHigh = state.itemsCursorHigh
						var itemSpan = state.itemSpan
						var mode = action.payload.currentMode
						var r = state
						if (mode == 'autoMode') {
							var chordsCollection = state.chordsCollection
							var numChords = chordsCollection.length
							if (vHigh >= vLow) vHigh = vHigh + 1	// add one to upper border
							if (vHigh > numChords) vHigh = 0		// upper border
							if (((vHigh - vLow) > itemSpan) 			// all spteps full
									|| (vHigh == -1) 									// infinitum with vLow active
									|| (vLow == -1) 									// get always from reset
									) vLow = vLow + 1									// increase lower border
							if (vLow > numChords) vLow = -1			// reset at end of cycle
								var chords = state.chordsCollection.slice(vLow, vHigh)
								var actionsSeries = actionsSeriesCreate(chords)	// source, target
								var subjectByName = subjectByNameCreate(chords)	// source, target
								var subjectByIndex = subjectByIndexCreate(chords)
								r = Object.assign({}, state, {
									chords: chords,
									itemsCursorLow: vLow,
									itemsCursorHigh: vHigh,
									actionsSeries: actionsSeries,
									subjectByName: subjectByName,
									subjectByIndex: subjectByIndex,
							})
						}
						return r

				case ActionTypes.WALK_UP_CHORDS:			// walkUpChords
						// console.log("WALK_UP_CHORDS", action)
					var keyEventsOnChords = state.keyEventsOnChords
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
							if (keyEventsOnChords.upArrow !== null && keyEventsOnChords.upArrow !== action.payload.keyEvents.upArrow) {			// upArrow
										keyEventsOnChords.upArrow = action.payload.keyEvents.upArrow
										vLow = Math.max(0, --vLow)
										var chords = state.chordsCollection.slice(vLow, vHigh)
										var actionsSeries = actionsSeriesCreate(chords)	// source, target
										var subjectByName = subjectByNameCreate(chords)	// source, target
										var subjectByIndex = subjectByIndexCreate(chords)

										r = Object.assign({}, state, {
											chords: chords,
											itemsCursorLow: vLow,
											itemsCursorHigh: vHigh,
									actionsSeries: actionsSeries,
									subjectByName: subjectByName,
									subjectByIndex: subjectByIndex,
									})
								}
						}
						return r
						
				case ActionTypes.WALK_DOWN_CHORDS:			// walkDownChords
						// console.log("WALK_DOWN_CHORDS")
						var keyEventsOnChords = state.keyEventsOnChords
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
							if (keyEventsOnChords.downArrow !== null && keyEventsOnChords.downArrow !== action.payload.keyEvents.downArrow) {			// downArrow
								keyEventsOnChords.downArrow = action.payload.keyEvents.downArrow
								r = Object.assign({}, state, keyEventsOnChords) 
								if ((vHigh - vLow)  >= itemSpan) ++vLow
								++vHigh
							if (vHigh > numChords) vHigh = 0		// upper border
									var chords = state.chordsCollection.slice(vLow, vHigh)
										var actionsSeries = actionsSeriesCreate(chords)	// source, target
										var subjectByName = subjectByNameCreate(chords)	// source, target
										var subjectByIndex = subjectByIndexCreate(chords)
									r = Object.assign({}, state, {
										chords: chords,
										itemsCursorLow: vLow,
										itemsCursorHigh: vHigh,
									actionsSeries: actionsSeries,
										subjectByName: subjectByName,
										subjectByIndex: subjectByIndex,
								})
							}
						}
						return r						
        default:
            return state
    }
		

}

exports.reducer = reducerThis;
}));
