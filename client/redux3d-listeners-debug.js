
/* 																				*/
/*    		 redux3d-listeners-debug.js     */
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
		/* actions */
		var actions = redux3dActions.ActionCreators

		/* store */
		var store = redux3dStore.store

				
			/* payloads renderers */
			var logicAndData_Payload = function () { return {
				store: store,
				actions: actions
			}}
		
			/* payloads renderers */
			var logicAndData_Payload = function () { return {
				store: store,
				actions: actions
			}}

		/* launchers debug */
		var setFps_debug_Listener = store.compose(
			store.dispatch,
			actions.setFps
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
				 d3timer_Launcher.subscribe(setFps_debug_Listener)

