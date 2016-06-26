
/* 														*/
/*    		 index.js           */
/* 														*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-rc.2.js')

	var redux3dReducer = require('./redux3d-reducer.js')
	var redux3dStore = require('./redux3d-store.js')
	var redux3dActions = require('./redux3d-actions.js')
	var redux3dControls = require('./redux3d-controls.js')
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

		