/* 														*/
/*    		 index.js           */
/* 														*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-alpha.44.js')

	var d3ringsRendererCourt = require('./d3rings-renderer-court.js')
	var d3ringsRendererLanes = require('./d3rings-renderer-lanes.js')
	var d3ringsRendererParticles = require('./d3rings-renderer-particles.js')
	var d3ringsRendererWhirls = require('./d3rings-renderer-whirls.js')

	var d3ringsReducer = require('./d3rings-reducer.js')
	var d3ringsStore = require('./d3rings-store.js')
	var d3ringsActions = require('./d3rings-actions.js')
	var d3ringsControls = require('./d3rings-controls.js')
}	
		/* actions */
		var actions = d3ringsActions.ActionCreators

		/* store */
		var store = d3ringsStore.createStore(d3ringsReducer.reducer, d3ringsReducer.reducer())

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
			var logicAndData_Listener = function () { return {
				store: store,
				actions: actions
			}}
			
			/* payloads lanes */
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
			var KeyDown_Payload = function (e) { 
					return e
			}
			
			var mouseMove_Payload = function (svg) { 
				return (svg)
			}
			
			var KeyDownKeys_Payload = function () { return {
						keys: store.getState().reducerCourt.keys,
						views: store.getState().reducerConfig.views,
						currentView: store.getState().reducerCourt.currentView,
			}}

			var KeyDownKeysLanes_Payload = function () { return {
						keys: store.getState().reducerCourt.keys,
						currentMode: store.getState().reducerConfig.currentMode,
						itemSpan: store.getState().reducerCourt.itemSpan,
			}}
					
						
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
		var startRangs_rings_Listener = store.compose(
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
		var setFps_debug_Listener = store.compose(
			store.dispatch,
			actions.setFps
		)

		/* launchers court */
		var keyDown_court_Listener = store.compose(
			store.dispatch,
			actions.setKeybKey,
			KeyDown_Payload
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
			KeyDownKeys_Payload
		)	
		var keyDownAltD_court_Listener = store.compose(
			store.dispatch,
			actions.switchDebugMode,
			KeyDownKeys_Payload
		)	
		var keyLeftArrow_court_Listener = store.compose(
			store.dispatch,
			actions.setMode,
			KeyDownKeys_Payload
		)	
		var keyRightArrow_court_Listener = store.compose(
			store.dispatch,
			actions.setMode,
			KeyDownKeys_Payload
		)	
		var keyUpArrow_court_Listener = store.compose(
			store.dispatch,
			actions.setMode,
			KeyDownKeys_Payload
		)	
		var keyDownArrow_court_Listener = store.compose(
			store.dispatch,
			actions.setMode,
			KeyDownKeys_Payload
		)	

		var keyLeftArrowCtr_court_Listener = store.compose(
			store.dispatch,
			actions.resizeWidth,
			KeyDownKeys_Payload
		)	
		var keyRightArrowCtrl_court_Listener = store.compose(
			store.dispatch,
			actions.resizeHeight,
			KeyDownKeys_Payload
		)	
		var keyUpArrowCtrl_court_Listener = store.compose(
			store.dispatch,
			actions.resizeWidth,
			KeyDownKeys_Payload
		)	
		var keyDownArrowCtrl_court_Listener = store.compose(
			store.dispatch,
			actions.resizeHeight,
			KeyDownKeys_Payload
		)	

		var keyUpArrow_lanes_Listener = store.compose(
			store.dispatch,
			actions.walkDownRecords,
			KeyDownKeysLanes_Payload
		)	
		
		var keyDownArrow_lanes_Listener = store.compose(
			store.dispatch,
			actions.walkUpRecords,
			KeyDownKeysLanes_Payload
		)	
		
		var renderer_court_Listener = store.compose(
			d3ringsRendererCourt.renderer,
			logicAndData_Listener
		)	
		
		var renderer_lanes_Listener = store.compose(
			d3ringsRendererLanes.renderer,
			logicAndData_Listener
		)	

		var renderer_particles_Listener = store.compose(
			d3ringsRendererParticles.renderer,
			logicAndData_Listener
		)	
		
		var renderer_whirls_Listener = store.compose(
			d3ringsRendererWhirls.renderer,
			logicAndData_Listener
		)	

		/* launchers */
		var mouseDown_Launcher = d3ringsControls.mouseDownControl(store, actions).start(d3.select('svg'))
		var touchStart_Launcher = d3ringsControls.touchStartControl(store, actions).start(d3.select('svg'))
		var mouseMove_Launcher = d3ringsControls.mouseMoveControl(store, actions).start(d3.select('svg'))
		var touchMove_Launcher = d3ringsControls.touchMoveControl(store, actions).start(d3.select('svg'))
		var mouseUp_Launcher = d3ringsControls.mouseUpControl(store, actions).start(d3.select('svg'))
		var touchEnd_Launcher = d3ringsControls.touchEndControl(store, actions).start(d3.select('svg'))
		var mouseLeave_Launcher = d3ringsControls.mouseLeaveControl(store, actions).start(d3.select('svg'))
		var mouseEnter_Launcher = d3ringsControls.mouseEnterControl(store, actions).start(d3.select('svg'))
		var ticker_Launcher = d3ringsControls.tickControls(store, actions).start()
		var stepper_Launcher = d3ringsControls.stepControls(store, actions).start()
		var keyDown_Launcher = d3ringsControls.keyDownControl(store, actions).start()
		var keyRelease_Launcher = d3ringsControls.keyReleaseControl(store, actions).start()
		var keyRelease_Launcher = d3ringsControls.keyReleaseControl(store, actions).start()
		
		/* listeners */
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
		ticker_Launcher.subscribe(setFps_debug_Listener)
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
		mouseDown_Launcher.subscribe(startRangs_rings_Listener)
		mouseEnter_Launcher.subscribe(startRangs_rings_Listener)
		mouseLeave_Launcher.subscribe(stopRangs_rings_Listener)
		mouseDown_Launcher.subscribe(startRings_rings_Listener)
		mouseDown_Launcher.subscribe(createRings_rings_Listener)
		mouseMove_Launcher.subscribe(createRings_rings_Listener)
		mouseUp_Launcher.subscribe(stopRings_rings_Listener)
		mouseLeave_Launcher.subscribe(stopRings_rings_Listener)		
		stepper_Launcher.subscribe(updateRangsDuration_rings_Listener)
		stepper_Launcher.subscribe(updateRangsNumber_rings_Listener)

					
					
					
					
					
					
		
			