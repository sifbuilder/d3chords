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
	
	var d3ringsPayloadsLanes = require('./d3rings-payloads-lanes.js')
	var d3ringsPayloadsCourt = require('./d3rings-payloads-court.js')
	var d3ringsPayloadsParticles = require('./d3rings-payloads-particles.js')
	var d3ringsPayloadsWhirls = require('./d3rings-payloads-whirls.js')
	
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
						
		/* launchers */
		var createParticles_Launcher = store.compose(
			store.dispatch,
			actions.createParticles,
			d3ringsPayloadsParticles.createParticles_Payload
		)

		var introduceParticles_Launcher = store.compose(
			store.dispatch,
			actions.introduceParticles,
			d3ringsPayloadsParticles.introduceParticles_Payload
		)

		var tickParticles_Launcher = store.compose(
			store.dispatch,
			actions.tickParticles,
			d3ringsPayloadsParticles.tickParticles_Payload
		)
	
		var startParticles_Launcher = store.compose(
			store.dispatch,
			actions.startParticles
		)	
		
		var stopParticles_Launcher = store.compose(
			store.dispatch,
			actions.stopParticles
		)		
		
		var setRecordsCollection_Launcher = store.compose(
			store.dispatch,
			actions.setRecordsCollection,
			d3ringsPayloadsLanes.setRecordsCollection_Payload
		)
	
		var setRecords_Launcher = store.compose(
			store.dispatch,
			actions.setRecords,
			d3ringsPayloadsLanes.setRecords_Payload
		)
	
		var startRangs_Launcher = store.compose(
			store.dispatch,
			actions.startRangs
		)
			
		var stopRangs_Launcher = store.compose(
			store.dispatch,
			actions.stopRangs
		)
			
		var updateRangsDurationLuncher = store.compose(
			store.dispatch,
			actions.updateRangsDuration,
			d3ringsPayloadsWhirls.updateRangsDuration_Payload			
		)
			
		var updateRangsNumberLuncher = store.compose(
			store.dispatch,
			actions.updateRangsNumber,
			d3ringsPayloadsWhirls.updateRangsNumber_Payload			
		)
			
		var createRings_Launcher = store.compose(
			store.dispatch,
			actions.createRings,
			d3ringsPayloadsWhirls.createRings_Payload
		)

		var startRings_Launcher = store.compose(
			store.dispatch,
			actions.startRings
		)	
		
		var stopRings_Launcher = store.compose(
			store.dispatch,
			actions.stopRings
		)	

		var KeyDown_Launcher = store.compose(
				d3ringsPayloadsCourt.KeyDown_Payload
		)	

		/* listerners */
		var mouseDown = d3ringsControls.mouseDownControl(store).start(d3.select('svg'))
		var touchStart = d3ringsControls.touchStartControl(store).start(d3.select('svg'))
		var mouseMove = d3ringsControls.mouseMoveControl(store).start(d3.select('svg'))
		var touchMove = d3ringsControls.touchMoveControl(store).start(d3.select('svg'))
		var mouseUp = d3ringsControls.mouseUpControl(store).start(d3.select('svg'))
		var touchEnd = d3ringsControls.touchEndControl(store).start(d3.select('svg'))
		var mouseLeave = d3ringsControls.mouseLeaveControl(store).start(d3.select('svg'))
		var mouseEnter = d3ringsControls.mouseEnterControl(store).start(d3.select('svg'))
		var ticker = d3ringsControls.tickControls(store).start()
		var stepper = d3ringsControls.stepControls(store).start()
		var keyDown = d3ringsControls.keyDownControl(store).start()
		var keyRelease = d3ringsControls.keyReleaseControl(store).start()

		/* launches */
		store.subscribe(store.compose(d3ringsRendererCourt.renderer, store.getState))
		keyDown.subscribe(KeyDown_Launcher)

		store.subscribe(store.compose(d3ringsRendererLanes.renderer, store.getState))
		stepper.subscribe(setRecordsCollection_Launcher)
		stepper.subscribe(setRecords_Launcher)
			
		store.subscribe(store.compose(d3ringsRendererParticles.renderer, store.getState))	
		mouseDown.subscribe(startParticles_Launcher)
		touchStart.subscribe(startParticles_Launcher)
		mouseDown.subscribe(createParticles_Launcher)
		touchStart.subscribe(createParticles_Launcher)
		mouseMove.subscribe(createParticles_Launcher)
		touchMove.subscribe(createParticles_Launcher)
		mouseUp.subscribe(stopParticles_Launcher)
		touchEnd.subscribe(stopParticles_Launcher)
		mouseLeave.subscribe(stopParticles_Launcher)
		ticker.subscribe(tickParticles_Launcher)
		ticker.subscribe(createParticles_Launcher)
		stepper.subscribe(introduceParticles_Launcher)

		store.subscribe(store.compose(d3ringsRendererWhirls.renderer, store.getState))
		mouseDown.subscribe(startRangs_Launcher)
		mouseEnter.subscribe(startRangs_Launcher)
		mouseLeave.subscribe(stopRangs_Launcher)
		mouseDown.subscribe(startRings_Launcher)
		mouseDown.subscribe(createRings_Launcher)
		mouseMove.subscribe(createRings_Launcher)
		mouseUp.subscribe(stopRings_Launcher)
		mouseLeave.subscribe(stopRings_Launcher)		
		stepper.subscribe(updateRangsDurationLuncher)
		stepper.subscribe(updateRangsNumberLuncher)

					
					
					
					
					
					
		
			