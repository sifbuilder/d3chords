
/* 																				*/
/*    		 redux3d-whirls-debug.js    		*/
/* 																				*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-rc.2.js')

	var d3ringsRendererCourt = require('./redux3d-renderer-court.js')
	var d3ringsRendererLanes = require('./redux3d-renderer-lanes.js')
	var d3ringsRendererParticles = require('./redux3d-renderer-particles.js')
	var d3ringsRendererWhirls = require('./redux3d-renderer-whirls.js')
	var d3ringsRendererChords = require('./redux3d-renderer-chords.js')

	var d3ringsReducer = require('./redux3d-reducer.js')
	var d3ringsStore = require('./redux3d-store.js')
	var d3ringsActions = require('./redux3d-actions.js')
	var d3ringsControls = require('./redux3d-controls.js')
	
}	
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
			d3ringsRendererWhirls.renderer,
			logicAndData_Payload
		)	

		/* launchers */
		var mouseDown_Launcher = 	d3ringsControls.mouseDownControl(logicAndData_Payload()).start(d3.select('svg'))
		var touchStart_Launcher = d3ringsControls.touchStartControl(logicAndData_Payload()).start(d3.select('svg'))
		var mouseMove_Launcher = 	d3ringsControls.mouseMoveControl(logicAndData_Payload()).start(d3.select('svg'))
		var touchMove_Launcher = 	d3ringsControls.touchMoveControl(logicAndData_Payload()).start(d3.select('svg'))
		var mouseUp_Launcher =		d3ringsControls.mouseUpControl(logicAndData_Payload()).start(d3.select('svg'))
		var touchEnd_Launcher = 	d3ringsControls.touchEndControl(logicAndData_Payload()).start(d3.select('svg'))
		var mouseLeave_Launcher = d3ringsControls.mouseLeaveControl(logicAndData_Payload()).start(d3.select('svg'))
		var mouseEnter_Launcher = d3ringsControls.mouseEnterControl(logicAndData_Payload()).start(d3.select('svg'))
		var ticker_Launcher = 		d3ringsControls.tickControls(logicAndData_Payload()).start()
		var d3timer_Launcher = 			d3ringsControls.timeControls(logicAndData_Payload()).start()
		var stepper_Launcher =		d3ringsControls.stepControls(logicAndData_Payload()).start()
		var keyDown_Launcher = 		d3ringsControls.keyDownControl(logicAndData_Payload()).start()
		var keyRelease_Launcher = d3ringsControls.keyReleaseControl(logicAndData_Payload()).start()
		var keyRelease_Launcher = d3ringsControls.keyReleaseControl(logicAndData_Payload()).start()

		
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
