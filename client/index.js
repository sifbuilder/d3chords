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
	var d3lanesPayloadssCourt = require('./d3lanes-payloads-court.js')
	var d3lanesPayloadsParticles = require('./d3lanes-payload-particles.js')
	var d3lanesPayloadsWhirls = require('./d3lanes-payload-whirls.js')
	
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
						.attr('class', 'chart')			// 
						.style('width', store.getState().reducerCourt.svgWidth)
						.style('height', store.getState().reducerCourt.svgHeight)
						.style('background', 'oldlace')
						.style('border', '1px solid darkgrey')
						.attr('viewbox',"0 0 3 2")										
						
		/* launchers */
		var createParticlesLauncher = store.compose(
			store.dispatch,
			actions.createParticles,
			d3lanesPayloadsParticles.createParticlesPayload
		)

		var createParticlesLauncher = store.compose(
			store.dispatch,
			actions.introduceParticles,
			d3lanesPayloadsParticles.createParticlesPayload
		)

		var tickParticlesLauncher = store.compose(
			store.dispatch,
			actions.tickParticles,
			d3lanesPayloadsParticles.tickParticlesPayload
		)
	
		var startParticlesLauncher = store.compose(
			store.dispatch,
			actions.startParticles
		)	
		
		var stopParticlesLauncher = store.compose(
			store.dispatch,
			actions.stopParticles
		)		
		
		var setMessageCollectionLauncher = store.compose(
				store.dispatch,
				actions.setRecordsCollection,
				d3lanesPayloadsTracks.messageCollectionPayload
			)
	
		var setRecordsLauncher = store.compose(
				store.dispatch,
				actions.setRecords,
				d3lanesPayloadsTracks.setRecordsPayload
			)
	
		var startRangsLauncher = store.compose(
			store.dispatch,
			actions.startRangs
		)
			
		var stopRangsLauncher = store.compose(
			store.dispatch,
			actions.stopRangs
		)
			
		var updateRangsDurationLuncher = store.compose(
			store.dispatch,
			actions.updateRangsDuration,
			d3lanesPayloadsWhirls.updateRangsDurationPayload			
		)
			
		var updateRangsNumberLuncher = store.compose(
			store.dispatch,
			actions.updateRangsNumber,
			d3lanesPayloadsWhirls.updateRangsNumberPayload			
		)
			
		var createRingsLauncher = store.compose(
			store.dispatch,
			actions.createRings,
			d3lanesPayloadsWhirls.createRingsPayload
		)

		var startRingsLauncher = store.compose(
			store.dispatch,
			actions.startRings
		)	
		
		var stopRingsLauncher = store.compose(
			store.dispatch,
			actions.stopRings
		)	

		var KeyDownLauncher = store.compose(
				d3lanesPayloadsCourt.KeyDownPayload
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
		keyDown.subscribe(KeyDownLauncher)

		store.subscribe(store.compose(d3lanesComponentLanes.render, store.getState))
		store.subscribe(store.compose(d3lanesComponentParticles.render, store.getState))	
		mouseDown.subscribe(startParticlesLauncher)
		touchStart.subscribe(startParticlesLauncher)
		mouseDown.subscribe(createParticlesLauncher)
		touchStart.subscribe(createParticlesLauncher)
		mouseMove.subscribe(createParticlesLauncher)
		touchMove.subscribe(createParticlesLauncher)
		mouseUp.subscribe(stopParticlesLauncher)
		touchEnd.subscribe(stopParticlesLauncher)
		mouseLeave.subscribe(stopParticlesLauncher)
		ticker.subscribe(tickParticlesLauncher)
		ticker.subscribe(createParticlesLauncher)
		stepper.subscribe(setRecordsLauncher)
		stepper.subscribe(updateRangsDurationLuncher)
		stepper.subscribe(updateRangsNumberLuncher)

		store.subscribe(store.compose(d3lanesComponentWhirls.render, store.getState))
		mouseDown.subscribe(startRangsLauncher)
		mouseEnter.subscribe(startRangsLauncher)
		mouseLeave.subscribe(stopRangsLauncher)
		mouseDown.subscribe(startRingsLauncher)
		mouseDown.subscribe(createRingsLauncher)
		mouseMove.subscribe(createRingsLauncher)
		mouseUp.subscribe(stopRingsLauncher)
		mouseLeave.subscribe(stopRingsLauncher)		

					
					
					
					
					
					
		
			