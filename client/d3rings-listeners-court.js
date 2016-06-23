
/* 																				*/
/*    		 d3rings-listeners-court.js     */
/* 																				*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-alpha.50.js')

	var d3ringsRendererCourt = require('./d3rings-renderer-court.js')
	var d3ringsRendererLanes = require('./d3rings-renderer-lanes.js')
	var d3ringsRendererParticles = require('./d3rings-renderer-particles.js')
	var d3ringsRendererWhirls = require('./d3rings-renderer-whirls.js')
	var d3ringsRendererChords = require('./d3rings-renderer-chords.js')

	var d3ringsReducer = require('./d3rings-reducer.js')
	var d3ringsStore = require('./d3rings-store.js')
	var d3ringsActions = require('./d3rings-actions.js')
	var d3ringsControls = require('./d3rings-controls.js')
	
}	

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3ringsListenersCourt = global.d3ringsListenersCourt || {})));
}(this, function (exports) { 'use strict';

		/* actions */
		var actions = d3ringsActions.ActionCreators

		/* store */
		// var store = d3ringsStore.createStore(d3ringsReducer.reducer, d3ringsReducer.reducer())
		var store = d3ringsStore.store

			/* payloads renderers */
			var logicAndData_Payload = function () { return {
				store: store,
				actions: actions
			}}
			
	
		/* payloads court */
			var keyDown_Payload = function (e) { 
					return e
			}
			
			var mouseMove_Payload = function (svg) { 
				return (svg)
			}
			
			var keyDownKeys_Payload = function () { return {
						keys: store.getState().reducerCourt.keys,
						views: store.getState().reducerConfig.views,
						currentView: store.getState().reducerCourt.currentView,
			}}
		

		/* launchers court */
		var processKeybKeys_court_Listener = store.compose(
			store.dispatch,
			actions.processKeybKeys,
			keyDown_Payload
		)	

	var keyDown_court_Listener = store.compose(
			store.dispatch,
			actions.setKeybKey,
			keyDown_Payload
		)	

		var releaseKeybKey_court_Listener = store.compose(
			store.dispatch,
			actions.releaseKeybKey
		)	

		var updateMousePos_court_Listener = store.compose(
			store.dispatch,
			actions.updateMousePos,
			mouseMove_Payload
		)	

		var keyDownAltV_court_Listener = store.compose(
			store.dispatch,
			actions.setView,
			keyDownKeys_Payload
		)	
		var keyDownAltD_court_Listener = store.compose(
			store.dispatch,
			actions.switchDebugMode,
			keyDownKeys_Payload
		)	
		var keyLeftArrow_court_Listener = store.compose(
			store.dispatch,
			actions.setMode,
			keyDownKeys_Payload
		)	
		var keyRightArrow_court_Listener = store.compose(
			store.dispatch,
			actions.setMode,
			keyDownKeys_Payload
		)	
		var keyUpArrow_court_Listener = store.compose(
			store.dispatch,
			actions.setMode,
			keyDownKeys_Payload
		)	
		var keyDownArrow_court_Listener = store.compose(
			store.dispatch,
			actions.setMode,
			keyDownKeys_Payload
		)	

		var keyLeftArrowCtr_court_Listener = store.compose(
			store.dispatch,
			actions.resizeWidth,
			keyDownKeys_Payload
		)	
		var keyRightArrowCtrl_court_Listener = store.compose(
			store.dispatch,
			actions.resizeHeight,
			keyDownKeys_Payload
		)	
		var keyUpArrowCtrl_court_Listener = store.compose(
			store.dispatch,
			actions.resizeWidth,
			keyDownKeys_Payload
		)	
		var keyDownArrowCtrl_court_Listener = store.compose(
			store.dispatch,
			actions.resizeHeight,
			keyDownKeys_Payload
		)	
		
		// renderers
		var renderer_court_Listener = store.compose(
			d3ringsRendererCourt.renderer,
			logicAndData_Payload
		)	
		

		/* listeners */
			
									 store.subscribe(renderer_court_Listener)
		 keyRelease_Launcher.subscribe(releaseKeybKey_court_Listener)
				keyDown_Launcher.subscribe(keyDown_court_Listener)
				keyDown_Launcher.subscribe(keyDownAltV_court_Listener)
				keyDown_Launcher.subscribe(keyDownAltD_court_Listener)
				keyDown_Launcher.subscribe(keyLeftArrow_court_Listener)
				keyDown_Launcher.subscribe(keyRightArrow_court_Listener)
				keyDown_Launcher.subscribe(keyUpArrow_court_Listener)
				keyDown_Launcher.subscribe(keyDownArrow_court_Listener)
				keyDown_Launcher.subscribe(keyLeftArrowCtr_court_Listener)
				keyDown_Launcher.subscribe(keyRightArrowCtrl_court_Listener)
				keyDown_Launcher.subscribe(keyUpArrowCtrl_court_Listener)
				keyDown_Launcher.subscribe(keyDownArrowCtrl_court_Listener)
			mouseMove_Launcher.subscribe(updateMousePos_court_Listener)
			mouseDown_Launcher.subscribe(updateMousePos_court_Listener)
				mouseUp_Launcher.subscribe(updateMousePos_court_Listener)
		 mouseLeave_Launcher.subscribe(updateMousePos_court_Listener)
		 mouseEnter_Launcher.subscribe(updateMousePos_court_Listener)
		 touchStart_Launcher.subscribe(updateMousePos_court_Listener)
			touchMove_Launcher.subscribe(updateMousePos_court_Listener)
			 touchEnd_Launcher.subscribe(updateMousePos_court_Listener)
				 ticker_Launcher.subscribe(processKeybKeys_court_Listener)
			 
}));