/* 														*/
/*    		 index.js           */
/* 														*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-alpha.44.js')

	var d3lanesComponentCourt = require('./d3lanes-component-court.js')
	var d3lanesComponentLanes = require('./d3lanes-component-lanes.js')
	var d3lanesComponentParticles = require('./d3lanes-component-particles.js')
	var d3lanesComponentRangs = require('./d3lanes-component-rangs.js')
	var d3lanesComponentRings = require('./d3lanes-component-rings.js')

	var d3lanesReducer = require('./d3lanes-reducer.js')
	var d3lanesStore = require('./d3lanes-store.js')
	var d3lanesActions = require('./d3lanes-actions.js')
	var d3lanesControls = require('./d3controls.js')
}	

		/* actions */
		var actions = d3lanesActions.ActionCreators

		/* store */
		var store = d3lanesStore.createStore(d3lanesReducer.reducer, d3lanesReducer.reducer())
			store.subscribe(store.compose(d3lanesComponentCourt.render, store.getState))
			store.subscribe(store.compose(d3lanesComponentLanes.render, store.getState))
			store.subscribe(store.compose(d3lanesComponentParticles.render, store.getState))	
			store.subscribe(store.compose(d3lanesComponentRangs.render, store.getState))
			store.subscribe(store.compose(d3lanesComponentRings.render, store.getState))

		/* container */
		var svgContainer = d3.select(store.getState().reducerConfig.containerElem)
			.selectAll('svg')
				.data(['svg'])
				
		var svgContainerNew = svgContainer.enter()
			.append("svg")
				.attr("id", store.getState().reducerConfig.containerId)
				.style('width', store.getState().reducerCourt.svgWidth)
				.style('height', store.getState().reducerCourt.svgHeight)
				.style('background', 'oldlace')
				.attr('class', 'bar-chart')			// 
				.style('border', '1px solid darkgrey')
				.attr('viewbox',"0 0 3 2")										
				

		/* PARTICLES  */
		
				var createParticlesPayload = function () { return {
							particlesPerTick: store.getState().reducerParticles.particlesPerTick,
							x: store.getState().reducerCourt.mousePos[0], 
							y: store.getState().reducerCourt.mousePos[1],
							xInit: store.getState().reducerCourt.leftBorder,
							xEnd: store.getState().reducerCourt.svgWidth, 
							randNormal: store.getState().reducerConfig.randNormal,
							randNormal2: store.getState().reducerConfig.randNormal2,
							lanes: store.getState().reducerLanes.lanes,
							generating: store.getState().reducerParticles.generating,
				}}
		
		var createParticlesLauncher = store.compose(
			store.dispatch,
			actions.createParticles,
			createParticlesPayload
		)

		var initiateParticlesLauncher = store.compose(
			store.dispatch,
			actions.introduceParticles,
			createParticlesPayload
		)

				var tickParticlesPayload = function () { return {
						width: store.getState().reducerCourt.svgWidth,
						height: store.getState().reducerCourt.svgHeight,
						gravity: store.getState().reducerConfig.gravity,
						lanes: store.getState().reducerLanes.lanes
					}}

			var tickParticlesLauncher = store.compose(
				store.dispatch,
				actions.tickParticles,
				tickParticlesPayload
			)
		
			var startParticlesLauncher = store.compose(
				store.dispatch,
				actions.startParticles
			)	
			
			var stopParticlesLauncher = store.compose(
				store.dispatch,
				actions.stopParticles
			)		
		
		/* LANES  */
		/* set data on lanes */
		store.dispatch(actions.setRecordsCollection(
				store.getState().reducerConfig.messageCollection))
		store.dispatch(actions.setRecordsFetched(true))

		var setRecordsPayload = function () { return {
				itemSpan: store.getState().reducerConfig.itemSpan,
				currentMode: store.getState().reducerCourt.currentMode
			}}
		var setRecordsLauncher = store.compose(
				store.dispatch,
				actions.setRecords,
				setRecordsPayload
			)
	
	/* RANGS */
		var initRangsLauncher = store.compose(
			store.dispatch,
			actions.initRangs
		)
			
	/* RINGS */
				var createRingsPayload = function () { return {
							ringsPerTick: store.getState().reducerRings.ringsPerTick,
							x: store.getState().reducerCourt.mousePos[0], 
							y: store.getState().reducerCourt.mousePos[1],
							xInit: store.getState().reducerCourt.leftBorder,
							xEnd: store.getState().reducerCourt.svgWidth, 
							randNormal: store.getState().reducerConfig.randNormal,
							randNormal2: store.getState().reducerConfig.randNormal2,
							rings: store.getState().reducerRings.rings,
							rangs: store.getState().reducerRangs.rangs,
							generating: store.getState().reducerRings.generating,
				}}
		
			var createRingsLauncher = store.compose(
				store.dispatch,
				actions.createRings,
				createRingsPayload
			)

			var startRingsLauncher = store.compose(
				store.dispatch,
				actions.startRings
			)	
			
			var stopRingsLauncher = store.compose(
				store.dispatch,
				actions.stopRings
			)	

			
		/* start keyboad controls - mode on arrows */
		var kbdControls = d3lanesControls.kbdControls(store, d3.select('svg')).startKeybKeyEvents()
		var mouseDown = d3lanesControls.mouseDownControl(store).start(d3.select('svg'))
		var touchStart = d3lanesControls.touchStartControl(store).start(d3.select('svg'))
		var mouseMove = d3lanesControls.mouseMoveControl(store).start(d3.select('svg'))
		var touchMove = d3lanesControls.touchMoveControl(store).start(d3.select('svg'))
		var mouseUp = d3lanesControls.mouseUpControl(store).start(d3.select('svg'))
		var touchEnd = d3lanesControls.touchEndControl(store).start(d3.select('svg'))
		var mouseLeave = d3lanesControls.mouseLeaveControl(store).start(d3.select('svg'))
		var ticker = d3lanesControls.tickControls(store).start()
		var stepper = d3lanesControls.stepControls(store).start()

			
			
		var mode = 'rings' // lanes, rings
		if (mode == 'lanes') {
				mouseDown.subscribe(startParticlesLauncher)
				mouseDown.subscribe(createParticlesLauncher)
				touchStart.subscribe(startParticlesLauncher)
				touchStart.subscribe(createParticlesLauncher)
				mouseMove.subscribe(createParticlesLauncher)
				touchMove.subscribe(createParticlesLauncher)
				mouseUp.subscribe(stopParticlesLauncher)
				touchEnd.subscribe(stopParticlesLauncher)
				mouseLeave.subscribe(stopParticlesLauncher)
				ticker.subscribe(tickParticlesLauncher)
				stepper.subscribe(setRecordsLauncher)
				stepper.subscribe(initiateParticlesLauncher)

		} else if (mode == 'rings') {
				mouseDown.subscribe(initRangsLauncher)
				mouseDown.subscribe(startRingsLauncher)
				mouseDown.subscribe(createRingsLauncher)
				mouseMove.subscribe(createRingsLauncher)
				mouseUp.subscribe(stopRingsLauncher)
				mouseLeave.subscribe(stopRingsLauncher)
		
		}

					
					
					
					
					
					
		
			