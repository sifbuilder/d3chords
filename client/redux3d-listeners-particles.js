
/* 																					*/
/*    		 redux3d-listeners-particles.js   */
/* 																					*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-rc.2.js')

	var redux3dRendererCourt = require('./redux3d-renderer-court.js')
	var redux3dRendererLanes = require('./redux3d-renderer-lanes.js')
	var redux3dRendererParticles = require('./redux3d-renderer-particles.js')
	var redux3dRendererWhirls = require('./redux3d-renderer-whirls.js')
	var redux3dRendererChords = require('./redux3d-renderer-chords.js')

	var redux3dReducer = require('./redux3d-reducer.js')
	var redux3dStore = require('./redux3d-store.js')
	var redux3dActions = require('./redux3d-actions.js')
	var redux3dControls = require('./redux3d-controls.js')
	
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

			/* payloads renderers */
			var logicAndData_Payload = function () { return {
				store: store,
				actions: actions
			}}
		
		// renderers
		var renderer_particles_Listener = store.compose(
			redux3dRendererParticles.renderer,
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
