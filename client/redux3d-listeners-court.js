
/* 																				*/
/*    		 redux3d-listeners-court.js     */
/* 																				*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-rc.2.js')

	var redux3dRendererCourt = require('./redux3d-renderer-court.js')
	var redux3dRendererLanes = require('./redux3d-renderer-lanes.js')
	var redux3dRendererParticles = require('./redux3d-renderer-particles.js')
	var redux3dRendererWhirls = require('./redux3d-renderer-whirls.js')
	var redux3dRendererChords = require('./redux3d-renderer-chords.js')

	var redux3dReducer = require('./redux3d-reducer.js')
	var redux3dStore = require('./redux3d-store.js')
	var redux3dActions = require('./redux3d-actions.js')
	var redux3dControls = require('./redux3d-controls.js')
	
}	

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.redux3dListenersCourt = global.redux3dListenersCourt || {})));
}(this, function (exports) { 'use strict';

		/* actions */
		var actions = redux3dActions.ActionCreators

		/* store */
		// var store = redux3dStore.createStore(redux3dReducer.reducer, redux3dReducer.reducer())
		var store = redux3dStore.store

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

				
			/* payloads renderers */
			var logicAndData_Payload = function () { return {
				store: store,
				actions: actions
			}}
			
			
		// renderers
		var renderer_court_Listener = store.compose(
			redux3dRendererCourt.renderer,
			logicAndData_Payload
		)	
		
		/* launchers */
		var mouseDown_Launcher = 	redux3dControls.mouseDownControl(logicAndData_Payload()).start(d3.select('svg'))
		var touchStart_Launcher = redux3dControls.touchStartControl(logicAndData_Payload()).start(d3.select('svg'))
		var mouseMove_Launcher = 	redux3dControls.mouseMoveControl(logicAndData_Payload()).start(d3.select('svg'))
		var touchMove_Launcher = 	redux3dControls.touchMoveControl(logicAndData_Payload()).start(d3.select('svg'))
		var mouseUp_Launcher =		redux3dControls.mouseUpControl(logicAndData_Payload()).start(d3.select('svg'))
		var touchEnd_Launcher = 	redux3dControls.touchEndControl(logicAndData_Payload()).start(d3.select('svg'))
		var mouseLeave_Launcher = redux3dControls.mouseLeaveControl(logicAndData_Payload()).start(d3.select('svg'))
		var mouseEnter_Launcher = redux3dControls.mouseEnterControl(logicAndData_Payload()).start(d3.select('svg'))
		var ticker_Launcher = 		redux3dControls.tickControls(logicAndData_Payload()).start()
		var d3timer_Launcher = 			redux3dControls.timeControls(logicAndData_Payload()).start()
		var stepper_Launcher =		redux3dControls.stepControls(logicAndData_Payload()).start()
		var keyDown_Launcher = 		redux3dControls.keyDownControl(logicAndData_Payload()).start()
		var keyRelease_Launcher = redux3dControls.keyReleaseControl(logicAndData_Payload()).start()
		var keyRelease_Launcher = redux3dControls.keyReleaseControl(logicAndData_Payload()).start()

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