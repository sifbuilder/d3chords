
/* 																					*/
/*    		 d3rings-listeners-particles.js   */
/* 																					*/

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
