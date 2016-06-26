
/* 																				*/
/*    		 redux3d-listeners-lanes.js     */
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
			
			/* payloads lanes */
			var keyDownKeysLanes_Payload = function () { return {
				keyEvents: store.getState().reducerCourt.keyEvents,
				currentMode: store.getState().reducerCourt.currentMode,
				itemSpan: store.getState().reducerConfig.itemSpan,
			}}

			var keyUpKeysLanes_Payload = function () { return {
				keys: store.getState().reducerCourt.keys,
				currentMode: store.getState().reducerCourt.currentMode,
				itemSpan: store.getState().reducerConfig.itemSpan,
			}}

			var setRecords_Payload = function () { return {
				itemSpan: store.getState().reducerConfig.itemSpan,
				currentMode: store.getState().reducerCourt.currentMode
			}}
				
			var setRecordsCollection_Payload = function () { return {
				recordsCollection: store.getState().reducerConfig.recordsCollection
			}}


		/* launchers lanes */
		var keyDownArrow_lanes_Listener = store.compose(
			store.dispatch,
			actions.walkDownRecords,
			keyDownKeysLanes_Payload
		)	

		var keyUpArrow_lanes_Listener = store.compose(
			store.dispatch,
			actions.walkUpRecords,
			keyUpKeysLanes_Payload
		)	
		
		var setRecordsCollection_lanes_Listener = store.compose(
			store.dispatch,
			actions.setRecordsCollection,
			setRecordsCollection_Payload
		)
	
		var setRecords_lanes_Listener = store.compose(
			store.dispatch,
			actions.setRecords,
			setRecords_Payload
		)
	
			/* payloads renderers */
			var logicAndData_Payload = function () { return {
				store: store,
				actions: actions
			}}

		// renderers
		var renderer_lanes_Listener = store.compose(
			d3ringsRendererLanes.renderer,
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
				 
									 store.subscribe(renderer_lanes_Listener)
				stepper_Launcher.subscribe(setRecordsCollection_lanes_Listener)
				stepper_Launcher.subscribe(setRecords_lanes_Listener)
				stepper_Launcher.subscribe(keyUpArrow_lanes_Listener)
				stepper_Launcher.subscribe(keyDownArrow_lanes_Listener)
