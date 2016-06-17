
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
			chords: [],
			chordsCollection: [],
			chordsIndex: 0,
			areChordsFetched: false,
			src: 'chords.csv',
			itemsCursorLow: 0,
			itemsCursorHigh: 0,
			keyEventsOnChords: {},
	}
	
function reducerThis(state = initialStateThis, action) {
	if (action == null) return state
	var ActionTypes = d3ringsActions.ActionTypes
    switch (action.type) {

				case ActionTypes.SET_CHORDS_COLLECTION:	// setChordsCollection
					console.log("SET_CHORDS_COLLECTION")
					var r = Object.assign({}, state,
							{chordsCollection: action.payload.chords,
								areChordsFetched: true
							})
	        return r
						
				case ActionTypes.SET_CHORDS:	// setChords
					// console.log("SET_CHORDS")
						var vLow = state.itemsCursorLow
						var vHigh = state.itemsCursorHigh
						var itemSpan = action.payload.itemSpan
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
						var itemSpan = action.payload.itemSpan
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
