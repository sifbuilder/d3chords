
/* 														*/
/*    		 index.js           */
/* 														*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-alpha.50.js')

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

		/* container */
		var svgContainer = d3.select(store.getState().reducerConfig.containerElem)
			.selectAll('svg')
				.data(['svg'])
				.enter()
					.append("svg")
						.attr("id", store.getState().reducerConfig.containerId)
						.attr('class', 'chart')
						.style('width', store.getState().reducerCourt.svgWidth)
						.style('height', store.getState().reducerCourt.svgHeight)
						.style('background', 'oldlace')
						.style('border', '1px solid darkgrey')
						.attr('viewbox',"0 0 3 2")										

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

			/* payloads particles */
			var createParticles_Payload = function () { return {
					particlesPerTick: store.getState().reducerParticles.particlesPerTick,
					x: 								store.getState().reducerCourt.mousePos[0], 
					y: 								store.getState().reducerCourt.mousePos[1],
					xInit: 						store.getState().reducerCourt.leftBorder,
					xEnd: 						store.getState().reducerCourt.svgWidth, 
					randNormal: 			store.getState().reducerConfig.randNormal,
					randNormal2: 			store.getState().reducerConfig.randNormal2,
					lanes: 						store.getState().reducerLanes.lanes,
					particlesGenerating: 			store.getState().reducerParticles.particlesGenerating,
					currentView: 			store.getState().reducerCourt.currentView,
			}}

			var introduceParticles_Payload = function () { return {
					particlesPerTick: store.getState().reducerParticles.particlesPerTick,
					x: 								store.getState().reducerCourt.mousePos[0], 
					y: 								store.getState().reducerCourt.mousePos[1],
					xInit: 						store.getState().reducerCourt.leftBorder,
					xEnd: 						store.getState().reducerCourt.svgWidth, 
					randNormal: 			store.getState().reducerConfig.randNormal,
					randNormal2: 			store.getState().reducerConfig.randNormal2,
					lanes: 						store.getState().reducerLanes.lanes,
					particlesGenerating: 			store.getState().reducerParticles.particlesGenerating,
					currentView: 			store.getState().reducerCourt.currentView,
			}}

			
			var tickParticles_Payload = function () { return {
				width: store.getState().reducerCourt.svgWidth,
				height: store.getState().reducerCourt.svgHeight,
				gravity: store.getState().reducerConfig.gravity,
				lanes: store.getState().reducerLanes.lanes
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
												return Math.max(this.weigh, 1)
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
		
		/* launchers particles*/
		var createParticles_particles_Listener = store.compose(
			store.dispatch,
			actions.createParticles,
			createParticles_Payload
		)

		var introduceParticles_particles_Listener = store.compose(
			store.dispatch,
			actions.introduceParticles,
			introduceParticles_Payload
		)

		var tickParticles_particles_Listener = store.compose(
			store.dispatch,
			actions.tickParticles,
			tickParticles_Payload
		)
	
		var startParticles_particles_Listener = store.compose(
			store.dispatch,
			actions.startParticles
		)	
		
		var stopParticles_particles_Listener = store.compose(
			store.dispatch,
			actions.stopParticles
		)		
		
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

		/* launchers debug */
		// var setFps_debug_Listener = store.compose(
			// store.dispatch,
			// actions.setFps
		// )

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
		
		// renderers
		var renderer_court_Listener = store.compose(
			d3ringsRendererCourt.renderer,
			logicAndData_Payload
		)	
		
		var renderer_lanes_Listener = store.compose(
			d3ringsRendererLanes.renderer,
			logicAndData_Payload
		)	

		var renderer_particles_Listener = store.compose(
			d3ringsRendererParticles.renderer,
			logicAndData_Payload
		)	
		
		var renderer_whirls_Listener = store.compose(
			d3ringsRendererWhirls.renderer,
			logicAndData_Payload
		)	

		var renderer_chords_Listener = store.compose(
			d3ringsRendererChords.renderer,
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
									 store.subscribe(renderer_chords_Listener)
				stepper_Launcher.subscribe(setChords_chords_Listener)
 		  	stepper_Launcher.subscribe(setChordsCollection_chords_Listener)
	   		stepper_Launcher.subscribe(fetchChordsCollection_chords_Listener)			
				stepper_Launcher.subscribe(keyUpArrow_chords_Listener)
				stepper_Launcher.subscribe(keyDownArrow_chords_Listener)	
		
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
			 
				 // d3timer_Launcher.subscribe(setFps_debug_Listener)
				 
									 store.subscribe(renderer_lanes_Listener)
				stepper_Launcher.subscribe(setRecordsCollection_lanes_Listener)
				stepper_Launcher.subscribe(setRecords_lanes_Listener)
				stepper_Launcher.subscribe(keyUpArrow_lanes_Listener)
				stepper_Launcher.subscribe(keyDownArrow_lanes_Listener)
				
									 store.subscribe(renderer_particles_Listener)
			mouseDown_Launcher.subscribe(startParticles_particles_Listener)
		 touchStart_Launcher.subscribe(startParticles_particles_Listener)
			mouseDown_Launcher.subscribe(createParticles_particles_Listener)
		 touchStart_Launcher.subscribe(createParticles_particles_Listener)
			mouseMove_Launcher.subscribe(createParticles_particles_Listener)
			touchMove_Launcher.subscribe(createParticles_particles_Listener)
				mouseUp_Launcher.subscribe(stopParticles_particles_Listener)
			 touchEnd_Launcher.subscribe(stopParticles_particles_Listener)
		 mouseLeave_Launcher.subscribe(stopParticles_particles_Listener)
				 ticker_Launcher.subscribe(tickParticles_particles_Listener)
				 ticker_Launcher.subscribe(createParticles_particles_Listener)
				stepper_Launcher.subscribe(introduceParticles_particles_Listener)
				
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
