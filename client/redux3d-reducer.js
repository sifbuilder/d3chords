
/* 														*/
/*    redux3d-reducer.js      */
/* 														*/

if (typeof require === "function") {
	var d3ringsReducerConfig = 		require('./redux3d-reducer-config.js')
	var d3ringsReducerCourt = 		require('./redux3d-reducer-court.js')
	var d3ringsReducerDebug = 		require('./redux3d-reducer-debug.js')
	var d3ringsReducerLanes = 		require('./redux3d-reducer-lanes.js')
	var d3ringsReducerParticles = require('./redux3d-reducer-particles.js')
	var d3ringsReducerWhirls = 		require('./redux3d-reducer-whirls.js')
	var d3ringsReducerChords = 		require('./redux3d-reducer-chords.js')
}
	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3ringsReducer = global.d3ringsReducer || {})));
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

// _____________ combined reducer
var reducer = combineReducers({
		reducerConfig: d3ringsReducerConfig.reducerConfig,
		reducerCourt: d3ringsReducerCourt.reducerCourt,
		reducerDebug: d3ringsReducerDebug.reducerDebug,
		reducerLanes: d3ringsReducerLanes.reducerLanes,
		reducerParticles: d3ringsReducerParticles.reducerParticles,
		reducerWhirls: d3ringsReducerWhirls.reducer,
		reducerChords: d3ringsReducerChords.reducer,
})

var r = reducer()

exports.reducer = reducer;
}));
