
/* 																*/
/*    d3rings-reducer-debug.js    */
/* 																*/

	if (typeof require === "function") {
		var d3 = require('./d3.v4.0.0-rc.2.js')
		var d3ringsActions = require('./d3rings-actions-debug.js')
	}
	
	(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3ringsReducerDebug = global.d3ringsReducerDebug || {})));
}(this, function (exports) { 'use strict';


// _____________ DEBUG
var initialStateDebug = {
				debugMode: true,
				debugTickerStarted: false,
				rfps: 60,
				fps: 0,
				fpsMax: 0,
				timeStamp: 0,
				timeLastFrame: 0,
				tickLastFrame: 0,
}
function reducerDebug(state = initialStateDebug, action) {
	if (action == null) return state

	var ActionTypes = d3ringsActions.ActionTypes
    switch (action.type) {
				case ActionTypes.SET_FPS:			
						return setFps(state, action)
						
				case ActionTypes.SWITCH_DEBUGMODE:
						return switchDebugMode(state, action)
						
				default:
					return state;
	}
}
function setFps(state, action) {
			// tbc
			var timeLastFrame0 = state.timeLastFrame 
			var tickLastFrame0 = state.tickLastFrame
			var timeLastFrame = performance.now()
			var tickLastFrame = tickLastFrame0 + 1
			var timeDelta = timeLastFrame - timeLastFrame0
			
			var fps0 = state.fps
			var fpsMax = state.fpsMax
			
			var fps = (timeLastFrame != 0) ? parseFloat(Math.round(1000 / timeDelta)).toFixed(0) : 0
			var fpsMax = Math.max(fpsMax, fps)
			
		  return Object.assign({}, state, {
						fps: fps,
						fpsMax: fpsMax,
             debugTickerStarted: true,
             timeLastFrame: timeLastFrame,
             tickLastFrame: tickLastFrame
		})
}
function switchDebugMode(state, action) {
			var altKeyCode = 18, ctrlKeyCode = 17 
			var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
			var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40

			var keys = action.payload.keys
			var debugMode = state.debugMode
			var newdebugMode = debugMode

			if (keys[dKeyCode] == true && keys[altKeyCode] == true) {		// alt-d
				 newdebugMode = !state.debugMode
			}	
		 return Object.assign({}, state, {
             debugMode: newdebugMode
		})
}



exports.reducerDebug = reducerDebug;
}));
