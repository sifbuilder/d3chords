
/* 														*/
/*    		 index.js           */
/* 														*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-rc.2.js')

	var redux3dReducer = require('../redux3d-reducer.js')
	var redux3dStore = require('../redux3d-store.js')
	var redux3dActions = require('../redux3d-actions.js')
	var redux3dControls = require('../redux3d-controls.js')
}	

/* actions */
var actions = redux3dActions.ActionCreators

/* store */
var store = redux3dStore.store

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
			var logicAndData_Payload = function () { return {
				store: store,
				actions: actions
			}}
				
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
		var d3timer_Launcher = 		redux3dControls.timeControls(logicAndData_Payload()).start()
		var stepper_Launcher =		redux3dControls.stepControls(logicAndData_Payload()).start()
		var keyDown_Launcher = 		redux3dControls.keyDownControl(logicAndData_Payload()).start()
		var keyRelease_Launcher = redux3dControls.keyReleaseControl(logicAndData_Payload()).start()
		var keyRelease_Launcher = redux3dControls.keyReleaseControl(logicAndData_Payload()).start()
		