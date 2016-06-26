
/* 																				*/
/*    		 redux3d-listeners-chords.js    */
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
			

		/* payloads chords */
			var keyDownKeysChords_Payload = function () { return {
				keyEvents: store.getState().reducerCourt.keyEvents,
				currentMode: store.getState().reducerCourt.currentMode,
				itemSpan: store.getState().reducerConfig.itemSpan,
			}}

			var keyUpKeysChords_Payload = function () { return {
				keys: store.getState().reducerCourt.keys,
				currentMode: store.getState().reducerCourt.currentMode,
				itemSpan: store.getState().reducerConfig.itemSpan,
			}}

			var setChords_Payload = function () { return {
				currentMode: store.getState().reducerCourt.currentMode
			}}
				
			var fetchChordsCollection_Payload = function () { return {
				src: store.getState().reducerChords.src,
				areChordsFetched: store.getState().reducerChords.areChordsFetched,
		}}
		
		var setChordsCollection_Payload = function () { return {
				chordsCollection: store.getState().reducerChords.chordsCollection
			}}
				
		/* launchers chords */
		var keyDownArrow_chords_Listener = store.compose(
			store.dispatch,
			actions.walkDownChords,
			keyDownKeysChords_Payload
		)

		var keyUpArrow_chords_Listener = store.compose(
			store.dispatch,
			actions.walkUpChords,
			keyUpKeysChords_Payload
		)	
		
		var fetchChordsCollection_chords_Listener = store.compose(
			function(payload) { 
					if (payload.areChordsFetched == false) {
						 return d3.queue()
							.defer(d3.csv, store.getState().reducerChords.src, 
										// processRecord
										function (d, i) {						
											d.prx = i
											d.source = d.source
											d.target = d.target
											d.predicate = d.predicate
											d.weigh = +d.weigh
											d.valueOf = function value() {
												return this.weigh
											}	
											return d;
										}
							)
							.await(
										// processData
										function (error, dataCsv) {
											store.dispatch(actions.fetchChordsCollection({chords: dataCsv}))
										}	
							)
						}
				},
			fetchChordsCollection_Payload
		)
			
		var setChordsCollection_chords_Listener = store.compose(
			store.dispatch,
			actions.setChordsCollection,
			setChordsCollection_Payload
		)
	
								
		var setChords_chords_Listener = store.compose(
			store.dispatch,
			actions.setChords,
			setChords_Payload
		)

		
		// renderers
	
		var renderer_chords_Listener = store.compose(
			redux3dRendererChords.renderer,
			logicAndData_Payload
		)	
		
		/* listeners */
									 store.subscribe(renderer_chords_Listener)
				stepper_Launcher.subscribe(setChords_chords_Listener)
 		  	stepper_Launcher.subscribe(setChordsCollection_chords_Listener)
	   		stepper_Launcher.subscribe(fetchChordsCollection_chords_Listener)			
				stepper_Launcher.subscribe(keyUpArrow_chords_Listener)
				stepper_Launcher.subscribe(keyDownArrow_chords_Listener)	
