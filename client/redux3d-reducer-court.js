
/* 																*/
/*    redux3d-reducer-court.js    */
/* 																*/

	if (typeof require === "function") {
		var d3 = require('./d3.v4.0.0-rc.2.js')
		var redux3dActions = require('./redux3d-actions-court.js')
	}
	
	(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.redux3dReducerCourt = global.redux3dReducerCourt || {})));
}(this, function (exports) { 'use strict';

// http://stackoverflow.com/questions/31381129/assign-new-id-attribute-to-each-element-created
function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

// _____________ COURT
var initialStateCourt = {
			leftBorder: 0,		// 
			svgHeight: 400,		// 
			svgWidth: 600,		// 
			keys: [],
			keysEvents: {},
			notice: 'auto lanes',
			currentMode: 'autoMode',
			currentView: 'chordsView',
			arrowKeysStarted: false,
			keybKeyEventsStarted: false,
			tickerStarted: false,
			lastTick: 0,
			mousePos: [200, 300],
}

function reducerCourt(state = initialStateCourt, action) {
	if (action == null) return state
	var ActionTypes = redux3dActions.ActionTypes
    switch (action.type) {
        case ActionTypes.START_KEYBKEY_EVENTS:	// startKeybKeyEvents
						// console.log('START_KEYBKEY_EVENTS')
            return Object.assign({}, state, {
                keybKeyEventsStarted: true
            })
				case ActionTypes.SET_KEYBKEY:				// setKeybkey
						// console.log('SET_KEYBKEY')
						var ks = state.keys
						ks[action.keyCode] = true
            return Object.assign({}, state, {
                keys: ks
            })
        case ActionTypes.RELEASE_KEYBKEY:	// releaseKeybkey
						// console.log('RELEASE_KEYBKEY')
 						var ks = state.keys
						ks[action.keyCode] = false
            return Object.assign({}, state, {
                keys: ks
            })
        case ActionTypes.PROCESS_KEYB_KEYS:		// processKeybKeys
 					// console.log('PROCESS_KEYB_KEYS state keys', state.keys)
						var keyEvents = Object.assign({}, state.keyEvents)
						var altKeyCode = 18, ctrlKeyCode = 17 
						var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
						var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40
						var keys = state.keys
						
							if (keys[ctrlKeyCode] !== true && keys[altKeyCode] == true && keys[vKeyCode] == true) {		// alt-v
								keyEvents.altvKey =  guid()
							}
							if (keys[ctrlKeyCode] !== true && keys[altKeyCode] !== true && keys[vKeyCode] == true) {		// v
								keyEvents.vKey =  guid()
							}
							if (keys[leftArrow] == true) {		// leftArrow
								keyEvents.leftArrow =  guid()
							}
							if (keys[rightArrow] == true) {		// rightArrow
								keyEvents.rightArrow =  guid()
							}
							if (keys[upArrow] == true) {		// upArrow
								keyEvents.upArrow =  guid()
							}
							if (keys[downArrow] == true) {		// downArrow
								keyEvents.downArrow =  guid()
							}
						
	          return Object.assign({}, state, {
								keyEvents: keyEvents
						})
					
       case ActionTypes.SET_MODE:
  					// console.log('SET_MODE')
						var altKeyCode = 18, ctrlKeyCode = 17 
						var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
						var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40
						var keys = action.payload.keys
							
						var currentMode = state.currentMode	
						var newMode = currentMode
							
						if (keys[leftArrow] == true) {										// leftArrow
								newMode = 'walkMode'
								}
							if (keys[rightArrow] == true) {										// rightArrow
								newMode = 'autoMode'
							}
							if (keys[upArrow] == true) {												// upArrow
								if (currentMode == 'autoMode') {
										newMode = 'walkMode'
								} 
							}
							if (keys[downArrow] == true) {											// downArrow
								if (currentMode == 'autoMode') {
										newMode = 'walkMode'
								}
							}
           return Object.assign({}, state, {
                currentMode: newMode
            })
						
       case ActionTypes.SET_VIEW:		// setView	// views currentView
 						var altKeyCode = 18, ctrlKeyCode = 17 
						var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
						var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40
						var keys = action.payload.keys
						
						var views = action.payload.views
						var currentView = action.payload.currentView
						var currentViewIndex = views.indexOf(currentView)
						var newViewIndex = currentView

						if (keys[vKeyCode] == true && keys[altKeyCode] == true) {		// alt-v
							 newViewIndex = views[Math.abs(currentViewIndex + 1) % views.length]
						}	
						
						return Object.assign({}, state, {
                currentView: newViewIndex,
            });
        case ActionTypes.SET_NOTICE:
  						// console.log('SET_NOTICE')
           return Object.assign({}, state, {
                notice: action.notice,
            });
        case ActionTypes.START_TICKER:
  						// console.log('START_TICKER')
            return Object.assign({}, state, {
                tickerStarted: true
            });
       case ActionTypes.STOP_TICKER:
  						// console.log('STOP_TICKER')
            return Object.assign({}, state, {
                tickerStarted: false
            });
        case ActionTypes.UPDATE_MOUSE_POS:
							var coords  = d3.mouse(action.svg)
							var x = coords[0]
							var y = coords[1]

            return Object.assign({}, state, {
                mousePos: [x, y]
            });
        case ActionTypes.RESIZE_WIDTH:
 						// console.log('RESIZE_WIDTH')
						var svgWidth = state.svgWidth
						var delta = 10

 						var altKeyCode = 18, ctrlKeyCode = 17 
						var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
						var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40
						var keys = action.payload.keys
						
						var newSvgWidth = svgWidth

						if (keys[rightArrow] == true && keys[ctrlKeyCode] == true) {		// rightArrow-Ctrl
							 newSvgWidth = svgWidth + delta
						}	
						if (keys[leftArrow] == true && keys[ctrlKeyCode] == true) {		// lefftArrow-Ctrl
							 newSvgWidth = svgWidth - delta
						}	

            return Object.assign({}, state, {
                svgWidth: newSvgWidth
            })
						
        case ActionTypes.RESIZE_HEIGHT:
   					// console.log('RESIZE_HEIGHT')
						var svgHeight = state.svgHeight
						var delta = 10

 						var altKeyCode = 18, ctrlKeyCode = 17 
						var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
						var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40
						var keys = action.payload.keys
						
						var newSvgHeight = svgHeight
						if (keys[upArrow] == true && keys[ctrlKeyCode] == true) {		// upArrow-Ctrl
							 newSvgHeight = svgHeight + delta
						}	
					if (keys[downArrow] == true && keys[ctrlKeyCode] == true) {		// downArrow-Ctrl
							 newSvgHeight = svgHeight - delta
						}	

            return Object.assign({}, state, {
                svgHeight: newSvgHeight
            })

						default:
							return state;
	}
}	

exports.reducerCourt = reducerCourt;
}));
