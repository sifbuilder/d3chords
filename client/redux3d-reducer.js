
/* 														*/
/*    redux3d-reducer.js      */
/* 														*/

if (typeof require === "function") {
	var redux3dReducerConfig = 		require('./confg/redux3d-reducer-config.js')
	var redux3dReducerCourt = 		require('./court/redux3d-reducer-court.js')
	var redux3dReducerDebug = 		require('./debug/redux3d-reducer-debug.js')
	var redux3dReducerLanes = 		require('./lanes/redux3d-reducer-lanes.js')
	var redux3dReducerParticles = require('./particles/redux3d-reducer-particles.js')
	var redux3dReducerWhirls = 		require('./rings/redux3d-reducer-whirls.js')
	var redux3dReducerChords = 		require('./chords/redux3d-reducer-chords.js')
}
	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.redux3dReducer = global.redux3dReducer || {})));
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
		reducerConfig: redux3dReducerConfig.reducerConfig,
		reducerCourt: redux3dReducerCourt.reducerCourt,
		reducerDebug: redux3dReducerDebug.reducerDebug,
		reducerLanes: redux3dReducerLanes.reducerLanes,
		reducerParticles: redux3dReducerParticles.reducerParticles,
		reducerWhirls: redux3dReducerWhirls.reducer,
		reducerChords: redux3dReducerChords.reducer,
})

var r = reducer()

exports.reducer = reducer;
}));
