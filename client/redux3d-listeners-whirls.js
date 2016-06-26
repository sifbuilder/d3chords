
/* 																				*/
/*    		 redux3d-whirls-debug.js    		*/
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
		// var store = redux3dStore.createStore(redux3dReducer.reducer, redux3dReducer.reducer())
		var store = redux3dStore.store

			/* payloads renderers */
			var logicAndData_Payload = function () { return {
				store: store,
				actions: actions
			}}
			

		/* payloads whirls */
			var createRings_Payload = function () { return {
						ringsPerTick: store.getState().reducerWhirls.ringsPerTick,
						x: store.getState().reducerCourt.mousePos[0], 
						y: store.getState().reducerCourt.mousePos[1],
						randNormal: store.getState().reducerConfig.randNormal,
						randNormal2: store.getState().reducerConfig.randNormal2,
						rings: store.getState().reducerWhirls.rings,
						rangs: store.getState().reducerWhirls.rangs,
						ringsGenerating: store.getState().reducerWhirls.ringsGenerating,
			}}
			
			var updateRangsDuration_Payload = function () { return {
						rangsAlways: store.getState().reducerWhirls.rangsAlways,
						rangsHitsIndex: store.getState().reducerWhirls.rangsHitsIndex, 
			}}
			
			var updateRangsNumber_Payload = function () { return {
						rangsAlways: store.getState().reducerWhirls.rangsAlways,
						rangsHitsIndex: store.getState().reducerWhirls.rangsHitsIndex, 
			}}
			
		
		/* launchers rings */
		var startRangs_rangs_Listener = store.compose(
			store.dispatch,
			actions.startRangs
		)
			
		var stopRangs_rings_Listener = store.compose(
			store.dispatch,
			actions.stopRangs
		)
			
		var updateRangsDuration_rings_Listener = store.compose(
			store.dispatch,
			actions.updateRangsDuration,
			updateRangsDuration_Payload			
		)
			
		var updateRangsNumber_rings_Listener = store.compose(
			store.dispatch,
			actions.updateRangsNumber,
			updateRangsNumber_Payload			
		)
			
		var createRings_rings_Listener = store.compose(
			store.dispatch,
			actions.createRings,
			createRings_Payload
		)

		var startRings_rings_Listener = store.compose(
			store.dispatch,
			actions.startRings
		)	
		
		var stopRings_rings_Listener = store.compose(
			store.dispatch,
			actions.stopRings
		)	

				
			/* payloads renderers */
			var logicAndData_Payload = function () { return {
				store: store,
				actions: actions
			}}
		
		// renderers
		var renderer_whirls_Listener = store.compose(
			redux3dRendererWhirls.renderer,
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
			
									 store.subscribe(renderer_whirls_Listener)
			mouseDown_Launcher.subscribe(startRangs_rangs_Listener)
		 mouseEnter_Launcher.subscribe(startRangs_rangs_Listener)
		 mouseLeave_Launcher.subscribe(stopRangs_rings_Listener)
			mouseDown_Launcher.subscribe(startRings_rings_Listener)
			mouseDown_Launcher.subscribe(createRings_rings_Listener)
			mouseMove_Launcher.subscribe(createRings_rings_Listener)
				mouseUp_Launcher.subscribe(stopRings_rings_Listener)
		 mouseLeave_Launcher.subscribe(stopRings_rings_Listener)		
				stepper_Launcher.subscribe(updateRangsDuration_rings_Listener)
				stepper_Launcher.subscribe(updateRangsNumber_rings_Listener)
