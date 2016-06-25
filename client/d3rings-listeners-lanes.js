
/* 																				*/
/*    		 d3rings-listeners-lanes.js     */
/* 																				*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-rc.2.js')

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
	

		// renderers
		var renderer_lanes_Listener = store.compose(
			d3ringsRendererLanes.renderer,
			logicAndData_Payload
		)	

			/* listeners */
				 
									 store.subscribe(renderer_lanes_Listener)
				stepper_Launcher.subscribe(setRecordsCollection_lanes_Listener)
				stepper_Launcher.subscribe(setRecords_lanes_Listener)
				stepper_Launcher.subscribe(keyUpArrow_lanes_Listener)
				stepper_Launcher.subscribe(keyDownArrow_lanes_Listener)
