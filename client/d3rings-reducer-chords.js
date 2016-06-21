
/* 													  			*/
/*    d3rings-reducer-chords.js     */
/* 																	*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-alpha.44.js')
	var d3ringsActions = require('./d3rings-actions-chords.js')
}
	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3ringsReducerChords = global.d3ringsReducerChords || {})));
}(this, function (exports) { 'use strict';


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
				 {source: "faraon", target: "faraon", predicate: "", weigh: 1},
				 {source: "friend", target: "friend", predicate: "", weigh: 1},
				 {source: "girl", target: "girl", predicate: "", weigh: 1},
				 {source: "architect", target: "architect", predicate: "", weigh: 1},
				 {source: "architect", target: "faraon", predicate: "village .. tebas .. workers", weigh: 1},
				 {source: "faraon", target: "architect", predicate: "uhmm", weigh: 1},
				 {source: "friend", target: "architect", predicate: "wasteful", weigh: 1},
				 {source: "architect", target: "faraon", predicate: "fortress .. kadesh .. hititas", weigh: 1},
				 {source: "faraon", target: "architect", predicate: "uhmm", weigh: 1},
				 {source: "girl", target: "architect", predicate: "coward", weigh: 1},
				 {source: "faraon", target: "architect", predicate: "sleeping room ... forever", weigh: 1},
				 {source: "architect", target: "faraon", predicate: "uhmm", weigh: 1},
				 {source: "friend", target: "architect", predicate: "old crock", weigh: 1},
				 {source: "girl", target: "architect", predicate: "you have heard", weigh: 1},
				 {source: "faraon", target: "architect", predicate: "its all about resources", weigh: 1},
				 {source: "architect", target: "faraon", predicate: "uhmm", weigh: 1},
				 {source: "architect", target: "faraon", predicate: " /\ ", weigh: 1},
				 {source: "friend", target: "architect", predicate: "stiff", weigh: 1},
				 {source: "girl", target: "architect", predicate: "bare", weigh: 1},
				 {source: "faraon", target: "architect", predicate: "sitting room together", weigh: 1},
				 {source: "architect", target: "faraon", predicate: "uhmm", weigh: 1},
			],
	}
	
function reducerThis(state = initialStateThis, action) {
	if (action == null) return state
	var ActionTypes = d3ringsActions.ActionTypes
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
											return Math.max(this.weigh, 1)
										},
									})
								})
								if (itemSpan > cc.length) itemSpan = cc.length

console.log("itemSpan", JSON.stringify(itemSpan, null, 2))
								
								r = Object.assign({}, state, {
										chordsCollection: cc,
										areChordsFetched: true,
										itemSpan: itemSpan,
								})
							}
						}
						return r

		
				case ActionTypes.FETCH_CHORDS_COLLECTION:	// fetchChordsCollection
					// console.log("FETCH_CHORDS_COLLECTION")
					var data = action.payload.chords
					var areChordsFetched = state.areChordsFetched
					var itemSpan = state.itemSpan
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
			
					function subjectByIndexCreate (dataParam) {		// source, weigh, ???
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
			
					function actionsListCreate (dataParam) {		// source, target, predicate, weigh, value
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
				
				var r = Object.assign({}, state)			
				if (areChordsFetched === false && typeof data !== 'undefined' && data.length) {
						var subjectByNameAll = subjectByNameCreate(data)	// source, target
						var subjectByIndexAll = subjectByIndexCreate(data)
						var actionsListAll = actionsListCreate(data)
						if (itemSpan > data.length) itemSpan = data.length
						r = Object.assign({}, state,
							{
								chordsCollection: data,
								areChordsFetched: true,
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
							var chords = state.chordsCollection
							var numChords = chords.length
							if (vHigh >= vLow) vHigh = vHigh + 1	// add one to upper border
							if (vHigh > numChords) vHigh = -1		// upper border
							if (((vHigh - vLow) > itemSpan) 			// all spteps full
									|| (vHigh == -1) 									// infinitum with vLow active
									|| (vLow == -1) 									// get always from reset
									) vLow = vLow + 1									// increase lower border
							if (vLow > numChords) vLow = -1			// reset at end of cycle

					var rs = state.chordsCollection.slice(vLow, vHigh)		
							r = Object.assign({}, state, {
								chords: rs,
								itemsCursorLow: vLow,
								itemsCursorHigh: vHigh,
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
										r = Object.assign({}, state, keyEventsOnChords) 
										r = Object.assign({}, state, {
											chords: state.chordsCollection.slice(vLow, vHigh),
											itemsCursorLow: vLow,
											itemsCursorHigh: vHigh,
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
									r = Object.assign({}, state, {
										chords: state.chordsCollection.slice(vLow, vHigh),
										itemsCursorLow: vLow,
										itemsCursorHigh: vHigh,
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
