
/* 																					*/
/*    		 redux3d-listeners-particles.js   */
/* 																					*/

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
		

		// renderers
		var renderer_particles_Listener = store.compose(
			d3ringsRendererParticles.renderer,
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
