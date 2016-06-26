
/* 																				*/
/*    		 redux3d-listeners-maps.js    */
/* 																				*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-rc.2.js')

	var d3ringsRendererCourt = require('./redux3d-renderer-court.js')
	var d3ringsRendererLanes = require('./redux3d-renderer-lanes.js')
	var d3ringsRendererParticles = require('./redux3d-renderer-particles.js')
	var d3ringsRendererWhirls = require('./redux3d-renderer-whirls.js')
	var d3ringsRendererChords = require('./redux3d-renderer-chords.js')
	var d3ringsRendererMaps = require('./redux3d-renderer-maps.js')

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

		
		// renderers
	
		var renderer_maps_Listener = store.compose(
			d3ringsRendererMaps.renderer,
			logicAndData_Payload
		)	
		
		/* listeners */
									 store.subscribe(renderer_maps_Listener)
				stepper_Launcher.subscribe(setMaps_maps_Listener)
 		  	stepper_Launcher.subscribe(setMapsCollection_maps_Listener)
	   		stepper_Launcher.subscribe(fetchMapsCollection_maps_Listener)			
				stepper_Launcher.subscribe(keyUpArrow_maps_Listener)
				stepper_Launcher.subscribe(keyDownArrow_maps_Listener)	
