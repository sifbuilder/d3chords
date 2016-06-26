
/* 														*/
/*    		 index.js           */
/* 														*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-rc.2.js')

	var d3ringsReducer = require('./redux3d-reducer.js')
	var d3ringsStore = require('./redux3d-store.js')
	var d3ringsActions = require('./redux3d-actions.js')
	var d3ringsControls = require('./redux3d-controls.js')
}	

/* actions */
var actions = d3ringsActions.ActionCreators

/* store */
var store = d3ringsStore.store

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

		