
/* 																				*/
/*    		 redux3d-listeners-lanes.js     */
/* 																				*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-rc.2.js')

	var redux3dReducer = require('../redux3d-reducer.js')
	var redux3dStore = require('../redux3d-store.js')
	var redux3dActions = require('../redux3d-actions.js')
	var redux3dControls = require('../redux3d-controls.js')
	
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
			redux3dRendererLanes.renderer,
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
				 
									 store.subscribe(renderer_lanes_Listener)
				stepper_Launcher.subscribe(setRecordsCollection_lanes_Listener)
				stepper_Launcher.subscribe(setRecords_lanes_Listener)
				stepper_Launcher.subscribe(keyUpArrow_lanes_Listener)
				stepper_Launcher.subscribe(keyDownArrow_lanes_Listener)
