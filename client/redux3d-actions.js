
/* 																	*/
/* redux3d-actions.js   						*/
/* 																	*/

if (typeof require === "function") {
	var d3ringsActionsCourt = require('./redux3d-actions-court.js')
	var d3ringsActionsDebug = require('./redux3d-actions-debug.js')
	var d3ringsActionsLanes = require('./redux3d-actions-lanes.js')
	var d3ringsActionsParticles = require('./redux3d-actions-particles.js')
	var d3ringsActionsWhirls = require('./redux3d-actions-whirls.js')
	var d3ringsActionsChords = require('./redux3d-actions-chords.js')
}	


(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3ringsActions = global.d3ringsActions || {})));
}(this, function (exports) { 'use strict';


// ____________________ merge_objects
function merge_objects(ctt1,ctt2){	
    var i, obj = {}
    for (i = 0; i < arguments.length; i++) {
        Object.assign(obj, arguments[i])
    }
    return obj;
}

var ActionTypes = merge_objects(
		d3ringsActionsCourt.ActionTypes,
		d3ringsActionsDebug.ActionTypes,
		d3ringsActionsLanes.ActionTypes,
		d3ringsActionsParticles.ActionTypes,
		d3ringsActionsWhirls.ActionTypes,
		d3ringsActionsChords.ActionTypes
	)
		
var ActionCreators = merge_objects(
		d3ringsActionsCourt.ActionCreators,
		d3ringsActionsDebug.ActionCreators, 
		d3ringsActionsLanes.ActionCreators, 
		d3ringsActionsParticles.ActionCreators,
		d3ringsActionsWhirls.ActionCreators,
		d3ringsActionsChords.ActionCreators
	)

exports.ActionTypes = ActionTypes;
exports.ActionCreators = ActionCreators;
}));
