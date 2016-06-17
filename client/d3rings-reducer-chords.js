
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
	}
	
function reducerThis(state = initialStateThis, action) {
	if (action == null) return state
	var ActionTypes = d3ringsActions.ActionTypes
    switch (action.type) {

				case ActionTypes.FETCH_CHORDS:	// fetchChords
					var r = Object.assign({}, state,
							{chords: action.payload.chords,
								areChordsFetched: true
							})
	        return r
						
				case ActionTypes.SET_CHORDS:	// setChords
						var vLow = state.messagesCursorLow
						var vHigh = state.messagesCursorHigh
						var itemSpan = action.itemSpan
						var mode = action.mode
						var r = state
						if (mode == 'autoMode') {
							var records = state.chordsCollection
							var numRecords = records.length
							if (vHigh >= vLow) vHigh = vHigh + 1	// add one to upper border
							if (vHigh > numRecords) vHigh = -1		// upper border
							if (((vHigh - vLow) > itemSpan) 			// all spteps full
									|| (vHigh == -1) 									// infinitum with vLow active
									|| (vLow == -1) 									// get always from reset
									) vLow = vLow + 1									// increase lower border
							if (vLow > numRecords) vLow = -1			// reset at end of cycle
							r = Object.assign({}, state, {
								records: state.chordsCollection.slice(vLow, vHigh),
								messagesCursorLow: vLow,
								messagesCursorHigh: vHigh,
							})
						}
						return r

				case ActionTypes.WALK_UP_RECORDS:			// walkUpChords
						var keyEventsOnLanes = state.keyEventsOnLanes
						var altKeyCode = 18, ctrlKeyCode = 17 
						var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
						var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40
						var keys = action.payload.keys
						
						var vLow = state.messagesCursorLow
						var vHigh = state.messagesCursorHigh
						var itemSpan = action.payload.itemSpan
						var currentMode = action.payload.mode
						var r = state
						if (currentMode == 'walkMode') {
							if (keyEventsOnLanes.upArrow !== null && keyEventsOnLanes.upArrow !== action.payload.keyEvents.upArrow) {			// upArrow
										keyEventsOnLanes.upArrow = action.payload.keyEvents.upArrow
										vLow = Math.max(0, --vLow)
										r = Object.assign({}, state, keyEventsOnLanes) 
										r = Object.assign({}, state, {
											records: state.recordsCollection.slice(vLow, vHigh),
											messagesCursorLow: vLow,
											messagesCursorHigh: vHigh,
									})
								}
						}
						return r
						
				case ActionTypes.WALK_DOWN_RECORDS:			// walkDownChords
						var keyEventsOnLanes = state.keyEventsOnLanes
						var altKeyCode = 18, ctrlKeyCode = 17 
						var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
						var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40
						var keys = action.payload.keys
						
						var vLow = state.messagesCursorLow
						var vHigh = state.messagesCursorHigh
						var itemSpan = action.payload.itemSpan
						var currentMode = action.payload.currentMode
						var r = Object.assign({}, state)
						if (currentMode == 'walkMode') {
							if (keyEventsOnLanes.downArrow !== null && keyEventsOnLanes.downArrow !== action.payload.keyEvents.downArrow) {			// downArrow
								keyEventsOnLanes.downArrow = action.payload.keyEvents.downArrow
								r = Object.assign({}, state, keyEventsOnLanes) 
								if ((vHigh - vLow)  >= itemSpan) ++vLow
								++vHigh
									r = Object.assign({}, state, {
										records: state.recordsCollection.slice(vLow, vHigh),
										messagesCursorLow: vLow,
										messagesCursorHigh: vHigh,
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
