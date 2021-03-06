
/* 																				*/
/*    		 redux3d-listeners-maps.js    */
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
			

		/* payloads maps */
			var keyDownKeysMaps_Payload = function () { return {
				keyEvents: store.getState().reducerCourt.keyEvents,
				currentMode: store.getState().reducerCourt.currentMode,
				itemSpan: store.getState().reducerConfig.itemSpan,
			}}

			var keyUpKeysMaps_Payload = function () { return {
				keys: store.getState().reducerCourt.keys,
				currentMode: store.getState().reducerCourt.currentMode,
				itemSpan: store.getState().reducerConfig.itemSpan,
			}}

			var setMaps_Payload = function () { return {
				currentMode: store.getState().reducerCourt.currentMode
			}}
				
			var fetchMapsCollection_Payload = function () { return {
				src: store.getState().reducerMaps.src,
				areMapsFetched: store.getState().reducerMaps.areMapsFetched,
		}}
		
		var setMapsCollection_Payload = function () { return {
				mapsCollection: store.getState().reducerMaps.mapsCollection
			}}
				
		/* launchers maps */
		var keyDownArrow_maps_Listener = store.compose(
			store.dispatch,
			actions.walkDownMaps,
			keyDownKeysMaps_Payload
		)

		var keyUpArrow_maps_Listener = store.compose(
			store.dispatch,
			actions.walkUpMaps,
			keyUpKeysMaps_Payload
		)	
		
		var fetchMapsCollection_maps_Listener = store.compose(
			function(payload) { 
					if (payload.areMapsFetched == false) {
						 return d3.queue()
							.defer(d3.csv, store.getState().reducerMaps.src, 
										// processRecord
										function (d, i) {						
											d.prx = i
											d.source = d.source
											d.target = d.target
											d.predicate = d.predicate
											d.weigh = +d.weigh
											d.valueOf = function value() {
												return Math.max(this.weigh, 1)
											}	
											return d;
										}
							)
							.await(
										// processData
										function (error, dataCsv) {
											store.dispatch(actions.fetchMapsCollection({maps: dataCsv}))
										}	
							)
						}
				},
			fetchMapsCollection_Payload
		)
			
		var setMapsCollection_maps_Listener = store.compose(
			store.dispatch,
			actions.setMapsCollection,
			setMapsCollection_Payload
		)
	
								
		var setMaps_maps_Listener = store.compose(
			store.dispatch,
			actions.setMaps,
			setMaps_Payload
		)

			/* payloads renderers */
			var logicAndData_Payload = function () { return {
				store: store,
				actions: actions
			}}
		
		// renderers
	
		var renderer_maps_Listener = store.compose(
			redux3dRendererMaps.renderer,
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
									 store.subscribe(renderer_maps_Listener)
				stepper_Launcher.subscribe(setMaps_maps_Listener)
 		  	stepper_Launcher.subscribe(setMapsCollection_maps_Listener)
	   		stepper_Launcher.subscribe(fetchMapsCollection_maps_Listener)			
				stepper_Launcher.subscribe(keyUpArrow_maps_Listener)
				stepper_Launcher.subscribe(keyDownArrow_maps_Listener)	
