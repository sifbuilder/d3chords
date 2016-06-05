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

		/* container */
		var svgContainer = d3.select(store.getState().reducerConfig.containerElem)
			.selectAll('svg')
				.data(['svg'])
				.enter()
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
					x: 								store.getState().reducerCourt.mousePos[0], 
					y: 								store.getState().reducerCourt.mousePos[1],
					xInit: 						store.getState().reducerCourt.leftBorder,
					xEnd: 						store.getState().reducerCourt.svgWidth, 
					randNormal: 			store.getState().reducerConfig.randNormal,
					randNormal2: 			store.getState().reducerConfig.randNormal2,
					lanes: 						store.getState().reducerLanes.lanes,
					particlesGenerating: 			store.getState().reducerParticles.particlesGenerating,
		}}

		// createParticlesLauncher
		var createParticlesLauncher = store.compose(
			store.dispatch,
			actions.createParticles,
			createParticlesPayload
		)

		// createParticlesLauncher
		var createParticlesLauncher = store.compose(
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

		// tickParticlesLauncher
			var tickParticlesLauncher = store.compose(
				store.dispatch,
				actions.tickParticles,
				tickParticlesPayload
			)
		
		// startParticlesLauncher
			var startParticlesLauncher = store.compose(
				store.dispatch,
				actions.startParticles
			)	
			
		// stopParticlesLauncher
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
		// setRecordsLauncher
		var setRecordsLauncher = store.compose(
				store.dispatch,
				actions.setRecords,
				setRecordsPayload
			)
	
	/* RANGS */
		// startRangsLauncher
		var startRangsLauncher = store.compose(
			store.dispatch,
			actions.startRangs
		)
			
		// stopRangsLauncher
		var stopRangsLauncher = store.compose(
			store.dispatch,
			actions.stopRangs
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
						ringsGenerating: store.getState().reducerRings.ringsGenerating,
			}}
		
		// createRingsLauncher
			var createRingsLauncher = store.compose(
				store.dispatch,
				actions.createRings,
				createRingsPayload
			)

		// startRingsLauncher
			var startRingsLauncher = store.compose(
				store.dispatch,
				actions.startRings
			)	
			
		// stopRingsLauncher
			var stopRingsLauncher = store.compose(
				store.dispatch,
				actions.stopRings
			)	

			var KeyDownPayload = function () { 
					var keys = store.getState().reducerCourt.keys
					var altKeyCode = 18, ctrlKeyCode = 17 
					var vKeyCode = 86, dKeyCode = 68, fKeyCode = 70
					var leftArrow = 37, rightArrow = 39, leftArrow = 37, upArrow = 38, downArrow = 40
					
					if (keys[vKeyCode] == true && keys[altKeyCode] == true) {		// alt-v
						console.log("alt-v", store.getState().reducerCourt.keys)
						var _views = store.getState().reducerConfig.views
						var _currentView = store.getState().reducerCourt.currentView
						var _currentViewIndex = _views.indexOf(_currentView)
						var newViewIndex = _views[Math.abs(_currentViewIndex + 1) % _views.length]
						store.dispatch(actions.setView(newViewIndex))					
					}
					if (keys[dKeyCode] == true && keys[altKeyCode] == true) {		// alt-d
						store.dispatch(actions.switchDebugMode())
					}
					if (keys[leftArrow] == true) {										// leftArrow
						var currentMode = 'walkMode'
						store.dispatch(actions.setMode(currentMode))				
					}
					if (keys[rightArrow] == true) {										// rightArrow
						var currentMode = 'autoMode'
						store.dispatch(actions.setMode(currentMode))				
					}
					if (keys[upArrow] == true) {												// upArrow
						var currentMode = store.getState().reducerCourt.currentMode
						if (currentMode == 'autoMode') {
							var newMode = 'walkMode'
							store.dispatch(actions.setMode(newMode))
						} else if (currentMode == 'walkMode') {
							var itemSpan = store.getState().reducerConfig.itemSpan
							store.dispatch(actions.walkUpRecords(itemSpan, currentMode))
						}
					}
					if (keys[downArrow] == true) {											// downArrow
						var currentMode = store.getState().reducerCourt.currentMode
						if (currentMode == 'autoMode') {
							var newMode = 'walkMode'
							store.dispatch(actions.setMode(newMode))
						} else if (currentMode == 'walkMode') {
							var itemSpan = store.getState().reducerConfig.itemSpan
							store.dispatch(actions.walkDownRecords(itemSpan, currentMode))
						}
					}
					if (keys[leftArrow] == true && keys[ctrlKeyCode] == true) {		// leftArrow-Ctrl
						console.log("leftArrowCtrlFn")
						store.dispatch(actions.resizeWidth(-10))
					}
					if (keys[rightArrow] == true  && keys[ctrlKeyCode] == true) {		// rightArrow-Ctrl
						console.log("rightArrowCtrlFn")
						store.dispatch(actions.resizeWidth(10))
					}
					if (keys[upArrow] == true && keys[ctrlKeyCode] == true) {			// upArrow-Ctrl
						console.log("upArrowCtrlFn")
						store.dispatch(actions.resizeWidth(-10))
					}
			}
			var KeyDownLauncher = store.compose(
					KeyDownPayload
			)	

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

			store.subscribe(store.compose(d3lanesComponentCourt.render, store.getState))
				keyDown.subscribe(KeyDownLauncher)
		
		var mode = 'lanes' // lanes, rings
		// if (mode == 'lanes') {
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

		// } else if (mode == 'rings') {
				store.subscribe(store.compose(d3lanesComponentRangs.render, store.getState))
				store.subscribe(store.compose(d3lanesComponentRings.render, store.getState))
				mouseDown.subscribe(startRangsLauncher)
				mouseEnter.subscribe(startRangsLauncher)
				mouseLeave.subscribe(stopRangsLauncher)
				mouseDown.subscribe(startRingsLauncher)
				mouseDown.subscribe(createRingsLauncher)
				mouseMove.subscribe(createRingsLauncher)
				mouseUp.subscribe(stopRingsLauncher)
				mouseLeave.subscribe(stopRingsLauncher)		
		// }

					
					
					
					
					
					
		
			