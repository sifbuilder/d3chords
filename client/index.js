/* 														*/
/*    		 index.js           */
/* 														*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-alpha.44.js')

	var d3lanesComponentCourt = require('./d3lanes-component-court.js')
	var d3lanesComponentLanes = require('./d3lanes-component-lanes.js')
	var d3lanesComponentParticles = require('./d3lanes-component-particles.js')
	var d3lanesComponentWhirls = require('./d3lanes-component-whirls.js')

	var d3lanesReducer = require('./d3lanes-reducer.js')
	var d3lanesStore = require('./d3lanes-store.js')
	var d3lanesActions = require('./d3lanes-actions.js')
	var d3lanesControls = require('./d3controls.js')
	
	var d3lanesPayloadsTracks = require('./d3lanes-payloads-tracks.js')
	var d3lanesPayloadsCourt = require('./d3lanes-payloads-court.js')
	var d3lanesPayloadsParticles = require('./d3lanes-payloads-particles.js')
	var d3lanesPayloadsWhirls = require('./d3lanes-payloads-whirls.js')
	
}	

		/* actions */
		var actions = d3lanesActions.ActionCreators

		/* store */
		var store = d3lanesStore.createStore(d3lanesReducer.reducer, d3lanesReducer.reducer())

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
			d3lanesPayloadsParticles.createParticles_Payload
		)

		var introduceParticles_Launcher = store.compose(
			store.dispatch,
			actions.introduceParticles,
			d3lanesPayloadsParticles.introduceParticles_Payload
		)

		var tickParticles_Launcher = store.compose(
			store.dispatch,
			actions.tickParticles,
			d3lanesPayloadsParticles.tickParticles_Payload
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
			d3lanesPayloadsTracks.setRecordsCollection_Payload
		)
	
		var setRecords_Launcher = store.compose(
			store.dispatch,
			actions.setRecords,
			d3lanesPayloadsTracks.setRecords_Payload
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
			d3lanesPayloadsWhirls.updateRangsDuration_Payload			
		)
			
		var updateRangsNumberLuncher = store.compose(
			store.dispatch,
			actions.updateRangsNumber,
			d3lanesPayloadsWhirls.updateRangsNumber_Payload			
		)
			
		var createRings_Launcher = store.compose(
			store.dispatch,
			actions.createRings,
			d3lanesPayloadsWhirls.createRings_Payload
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
				d3lanesPayloadsCourt.KeyDown_Payload
		)	

		/* listerners */
		var mouseDown = d3lanesControls.mouseDownControl(store).start(d3.select('svg'))
		var touchStart = d3lanesControls.touchStartControl(store).start(d3.select('svg'))
		var mouseMove = d3lanesControls.mouseMoveControl(store).start(d3.select('svg'))
		var touchMove = d3lanesControls.touchMoveControl(store).start(d3.select('svg'))
		var mouseUp = d3lanesControls.mouseUpControl(store).start(d3.select('svg'))
		var touchEnd = d3lanesControls.touchEndControl(store).start(d3.select('svg'))
		var mouseLeave = d3lanesControls.mouseLeaveControl(store).start(d3.select('svg'))
		var mouseEnter = d3lanesControls.mouseEnterControl(store).start(d3.select('svg'))
		var ticker = d3lanesControls.tickControls(store).start()
		var stepper = d3lanesControls.stepControls(store).start()
		var keyDown = d3lanesControls.keyDownControl(store).start()
		var keyRelease = d3lanesControls.keyReleaseControl(store).start()

		/* launches */
		store.subscribe(store.compose(d3lanesComponentCourt.render, store.getState))
		keyDown.subscribe(KeyDown_Launcher)

		store.subscribe(store.compose(d3lanesComponentLanes.render, store.getState))
		stepper.subscribe(setRecordsCollection_Launcher)
		stepper.subscribe(setRecords_Launcher)
			
		store.subscribe(store.compose(d3lanesComponentParticles.render, store.getState))	
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

		store.subscribe(store.compose(d3lanesComponentWhirls.render, store.getState))
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

					
					
					
					
					
					
		
			