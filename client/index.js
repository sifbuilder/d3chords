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
		var getStore_Payload = function () { return store }
			
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
			var KeyDown_Payload = function () { 
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
			
			var mouseMove_Payload = function (svg) { 
				return (svg)
			}
						
		/* launchers particles*/
		var createParticles_Launcher = store.compose(
			store.dispatch,
			actions.createParticles,
			createParticles_Payload
		)

		var introduceParticles_Launcher = store.compose(
			store.dispatch,
			actions.introduceParticles,
			introduceParticles_Payload
		)

		var tickParticles_Launcher = store.compose(
			store.dispatch,
			actions.tickParticles,
			tickParticles_Payload
		)
	
		var startParticles_Launcher = store.compose(
			store.dispatch,
			actions.startParticles
		)	
		
		var stopParticles_Launcher = store.compose(
			store.dispatch,
			actions.stopParticles
		)		
		
		/* launchers lanes */
		var setRecordsCollection_Launcher = store.compose(
			store.dispatch,
			actions.setRecordsCollection,
			setRecordsCollection_Payload
		)
	
		var setRecords_Launcher = store.compose(
			store.dispatch,
			actions.setRecords,
			setRecords_Payload
		)
	
		/* launchers rings */
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
			updateRangsDuration_Payload			
		)
			
		var updateRangsNumberLuncher = store.compose(
			store.dispatch,
			actions.updateRangsNumber,
			updateRangsNumber_Payload			
		)
			
		var createRings_Launcher = store.compose(
			store.dispatch,
			actions.createRings,
			createRings_Payload
		)

		var startRings_Launcher = store.compose(
			store.dispatch,
			actions.startRings
		)	
		
		var stopRings_Launcher = store.compose(
			store.dispatch,
			actions.stopRings
		)	

		/* launchers court */
		var keyDown_Launcher = store.compose(
			KeyDown_Payload
		)	

		var updateMousePos_Launcher = store.compose(
			store.dispatch,
			actions.updateMousePos,
			mouseMove_Payload
		)	

		/* launchers debug */
		var setFpsDebug_Launcher = store.compose(
			store.dispatch,
			actions.setFps
		)
		
		
		/* listerners */
		var mouseDown = d3ringsControls.mouseDownControl(store, actions).start(d3.select('svg'))
		var touchStart = d3ringsControls.touchStartControl(store, actions).start(d3.select('svg'))
		var mouseMove = d3ringsControls.mouseMoveControl(store, actions).start(d3.select('svg'))
		var touchMove = d3ringsControls.touchMoveControl(store, actions).start(d3.select('svg'))
		var mouseUp = d3ringsControls.mouseUpControl(store, actions).start(d3.select('svg'))
		var touchEnd = d3ringsControls.touchEndControl(store, actions).start(d3.select('svg'))
		var mouseLeave = d3ringsControls.mouseLeaveControl(store, actions).start(d3.select('svg'))
		var mouseEnter = d3ringsControls.mouseEnterControl(store, actions).start(d3.select('svg'))
		var ticker = d3ringsControls.tickControls(store, actions).start()
		var stepper = d3ringsControls.stepControls(store, actions).start()
		var keyDown = d3ringsControls.keyDownControl(store, actions).start()
		var keyRelease = d3ringsControls.keyReleaseControl(store, actions).start()

		
		
		
		
		/* launches */
		store.subscribe(store.compose(d3ringsRendererCourt.renderer, getStore_Payload))

		mouseMove.subscribe(updateMousePos_Launcher)
		mouseDown.subscribe(updateMousePos_Launcher)
		mouseUp.subscribe(updateMousePos_Launcher)
		mouseLeave.subscribe(updateMousePos_Launcher)
		mouseEnter.subscribe(updateMousePos_Launcher)
		touchStart.subscribe(updateMousePos_Launcher)
		touchMove.subscribe(updateMousePos_Launcher)
		touchEnd.subscribe(updateMousePos_Launcher)

		keyDown.subscribe(keyDown_Launcher)

		ticker.subscribe(setFpsDebug_Launcher)
		
		store.subscribe(store.compose(d3ringsRendererLanes.renderer, getStore_Payload))
		stepper.subscribe(setRecordsCollection_Launcher)
		stepper.subscribe(setRecords_Launcher)
			
		store.subscribe(store.compose(d3ringsRendererParticles.renderer, getStore_Payload))
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

		store.subscribe(store.compose(d3ringsRendererWhirls.renderer, getStore_Payload))
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

					
					
					
					
					
					
		
			