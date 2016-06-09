/* 																	*/
/* d3lanes-payloads-court.js   						*/
/* 																	*/

/* 													  			*/
/*    d3lanes-payloads-court.js      */
/* 																	*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesPayloadsCourt = global.d3lanesPayloadsCourt || {})));
}(this, function (exports) { 'use strict';

			var KeyDownPayload = function () { 
					var keys = store.getState().reducerCourt.keys
					var altKeyCode = 18, ctrlKeyCode = 17 
					var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
					var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40
					
					if (keys[vKeyCode] == true && keys[altKeyCode] == true) {		// alt-v
						console.log("alt-v", store.getState().reducerCourt.keys)
						var _views = store.getState().reducerConfig.views
						var _currentView = store.getState().reducerCourt.currentView
						var _currentViewIndex = _views.indexOf(_currentView)
						var newViewIndex = _views[Math.abs(_currentViewIndex + 1) % _views.length]
						store.dispatch(actions.setView(newViewIndex))					
					}
					if (keys[dKeyCode] == true && keys[altKeyCode] == true) {		// alt-d
						store.dispatch(actions.switchDebugMode())
					}
					if (keys[leftArrow] == true) {										// leftArrow
						var currentMode = 'walkMode'
						store.dispatch(actions.setMode(currentMode))				
					}
					if (keys[rightArrow] == true) {										// rightArrow
						var currentMode = 'autoMode'
						store.dispatch(actions.setMode(currentMode))				
					}
					if (keys[upArrow] == true) {												// upArrow
						var currentMode = store.getState().reducerCourt.currentMode
						if (currentMode == 'autoMode') {
							var newMode = 'walkMode'
							store.dispatch(actions.setMode(newMode))
						} else if (currentMode == 'walkMode') {
							var itemSpan = store.getState().reducerConfig.itemSpan
							store.dispatch(actions.walkUpRecords(itemSpan, currentMode))
						}
					}
					if (keys[downArrow] == true) {											// downArrow
						var currentMode = store.getState().reducerCourt.currentMode
						if (currentMode == 'autoMode') {
							var newMode = 'walkMode'
							store.dispatch(actions.setMode(newMode))
						} else if (currentMode == 'walkMode') {
							var itemSpan = store.getState().reducerConfig.itemSpan
							store.dispatch(actions.walkDownRecords(itemSpan, currentMode))
						}
					}
					if (keys[leftArrow] == true && keys[ctrlKeyCode] == true) {		// leftArrow-Ctrl
						console.log("leftArrowCtrlFn")
						store.dispatch(actions.resizeWidth(-10))
					}
					if (keys[rightArrow] == true  && keys[ctrlKeyCode] == true) {		// rightArrow-Ctrl
						console.log("rightArrowCtrlFn")
						store.dispatch(actions.resizeWidth(10))
					}
					if (keys[upArrow] == true && keys[ctrlKeyCode] == true) {			// upArrow-Ctrl
						console.log("upArrowCtrlFn")
						store.dispatch(actions.resizeWidth(-10))
					}
			}
			
exports.KeyDownPayload = KeyDownPayload
}));										