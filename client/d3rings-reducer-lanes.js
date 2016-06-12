/* 													  			*/
/*    d3rings-reducer-lanes.js      */
/* 																	*/

	if (typeof require === "function") {
		var d3 = require('./d3.v4.0.0-alpha.44.js')
		var d3ringsActions = require('./d3rings-actions-lanes.js')
	}
	
	(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3ringsReducerLanes = global.d3ringsReducerLanes || {})));
}(this, function (exports) { 'use strict';


// _____________ adapted from redux combineReducers	
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers)
  var finalReducers = {}
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i]
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  var finalReducerKeys = Object.keys(finalReducers)

  return function combination(state = {}, action) {
    var hasChanged = false
    var nextState = {}
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i]
      var reducer = finalReducers[key]
      var previousStateForKey = state[key]
      var nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state
  }
}


// _____________ LANES
var initialStateLanes = {
			lanes: [],
			lanesIndex: 0,
			messages: [],
			records: [],
			recordsCollection: [],
			areRecordsFetched: false,
			messagesCursorLow: 0,
			messagesCursorHigh: 0,
	}
	
function reducerLanes(state = initialStateLanes, action) {
	if (action == null) return state
	var ActionTypes = d3ringsActions.ActionTypes
    switch (action.type) {
				case ActionTypes.DELETE_LANE:		// deleteLane
					var lanes = state.lanes
					var ls = lanes.filter(function( obj ) {
							return obj.id !== action.lane.id;
						})
					var r = Object.assign({}, state,
						{lanes: ls},
						{lanesIndex: ls.length}
						)
					return r

				case ActionTypes.SET_LANE:		// setLane
					var lanes = state.lanes
					var ls = {}
					var result = lanes.filter(function( obj ) {
							return obj.id == action.lane.id;
						});
							
					if (result.length === 0) {			// add
						ls = {lanes: [
							{
									id: action.lane.id,
									name: action.lane.name,
									x: action.lane.x
							}, 
							...lanes
						]}
					} else {												// edit
							ls = {lanes: lanes.map(lane =>
								lane.id === action.lane.id ?
									Object.assign({}, lane, { id: action.lane.id, name: action.lane.name, x: action.lane.x }) :
									lane
							)}
					}
					
					 var r = Object.assign({}, state,
						ls,
						{
							lanesIndex: ls.lanes.length
						})
						return r
						
        case ActionTypes.SET_LANES:		// setLanes
 						console.log('SET_LANES')
            return Object.assign({}, state, {
                lanes: action.lanes,
                lanesIndex: Object.keys(action.lanes).length
            })
				case ActionTypes.FETCH_RECORDS:	// fetchRecords
						console.log('FETCH_RECORDS')
						var processRecord = function processRecord(d) {
							d.amount = +d.amount;
							d.risk = +d.risk;
							d.valueOf = function value() {
								return this.amount;
							}	
							return d;
						}

						var processData = function processData(error, dataCsv) {
							if (store.getState().court.currentMode == 0) {	// _tbd_  
									++timeTick
									++vLast
									store.dispatch(actions.setMessages(store.getState().reducerConfig.recordsCollection.slice(0,
										store.getState().reducerConfig.recordsCollection.length)))
							}
						}
						d3.queue()
							.defer(d3.csv, action.src, processRecord)
							.await(processData)					
						
            return Object.assign({}, state);

        case ActionTypes.SET_MESSAGES:			
 						console.log('SET_MESSAGES')
           return Object.assign({}, state, {
										messages: action.messages,
            })
						
				case ActionTypes.SET_RECORDS_FETCHED:
						console.log('SET_RECORDS_FETCHED')
           return Object.assign({}, state, {
                areRecordsFetched: action.areRecordsFetched
            })
						
				case ActionTypes.SET_RECORDS_COLLECTION:	// setRecordsCollection
						var r = state
						if (state.areRecordsFetched == false) {
							console.log('SET_RECORDS_COLLECTION')
							var r = Object.assign({}, state, {
									recordsCollection: action.recordsCollection,
									areRecordsFetched: true,
							})
						}
						return r
						
				case ActionTypes.SET_RECORDS:
						console.log('SET_RECORDS')
						var vLow = state.messagesCursorLow
						var vHigh = state.messagesCursorHigh
						var itemSpan = action.itemSpan
						var mode = action.mode
						var r = state
						if (mode == 'autoMode') {
							var records = state.recordsCollection
							var numRecords = records.length
							if (vHigh >= vLow) vHigh = vHigh + 1	// add one to upper border
							if (vHigh > numRecords) vHigh = -1		// upper border
							if (((vHigh - vLow) > itemSpan) 			// all spteps full
									|| (vHigh == -1) 									// infinitum with vLow active
									|| (vLow == -1) 									// get always from reset
									) vLow = vLow + 1									// increase lower border
							if (vLow > numRecords) vLow = -1			// reset at end of cycle
							r = Object.assign({}, state, {
								records: state.recordsCollection.slice(vLow, vHigh),
								messagesCursorLow: vLow,
								messagesCursorHigh: vHigh,
							})
						}
						return r

				case ActionTypes.WALK_UP_RECORDS:			// walkDownRecords
						var altKeyCode = 18, ctrlKeyCode = 17 
						var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
						var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40
						var keys = action.payload.keys
						
						var vLow = state.messagesCursorLow
						var vHigh = state.messagesCursorHigh
						var itemSpan = action.payload.itemSpan
						var mode = action.payload.mode
						var r = state
						if (keys[upArrow] == true) {												// upArrow
								if (mode == 'walkMode') {
										vLow = Math.max(0, --vLow)
										r = Object.assign({}, state, {
											records: state.recordsCollection.slice(vLow, vHigh),
											messagesCursorLow: vLow,
											messagesCursorHigh: vHigh,
									})
								}
						}
						return r
						
				case ActionTypes.WALK_DOWN_RECORDS:
						var altKeyCode = 18, ctrlKeyCode = 17 
						var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
						var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40
						var keys = action.payload.keys
console.log("________________________________________________ keys[40] ", JSON.stringify(keys[40], null, 2))
						
						var vLow = state.messagesCursorLow
						var vHigh = state.messagesCursorHigh
						var itemSpan = action.payload.itemSpan
						var mode = action.payload.mode
						var r = state
						if (keys[downArrow] == true) {												// downArrow
console.log("________________________________________________ mode ", mode)
								if (mode == 'walkMode') {
										if ((vHigh - vLow)  > itemSpan) ++vLow
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



exports.reducerLanes = reducerLanes;
}));