
/* 																	*/
/* redux3d-actions.js   						*/
/* 																	*/

if (typeof require === "function") {
	var redux3dActionsCourt = require('./redux3d-actions-court.js')
	var redux3dActionsDebug = require('./redux3d-actions-debug.js')
	var redux3dActionsLanes = require('./redux3d-actions-lanes.js')
	var redux3dActionsParticles = require('./redux3d-actions-particles.js')
	var redux3dActionsWhirls = require('./redux3d-actions-whirls.js')
	var redux3dActionsChords = require('./redux3d-actions-chords.js')
}	


(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.redux3dActions = global.redux3dActions || {})));
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
		redux3dActionsCourt.ActionTypes,
		redux3dActionsDebug.ActionTypes,
		redux3dActionsLanes.ActionTypes,
		redux3dActionsParticles.ActionTypes,
		redux3dActionsWhirls.ActionTypes,
		redux3dActionsChords.ActionTypes
	)
		
var ActionCreators = merge_objects(
		redux3dActionsCourt.ActionCreators,
		redux3dActionsDebug.ActionCreators, 
		redux3dActionsLanes.ActionCreators, 
		redux3dActionsParticles.ActionCreators,
		redux3dActionsWhirls.ActionCreators,
		redux3dActionsChords.ActionCreators
	)

exports.ActionTypes = ActionTypes;
exports.ActionCreators = ActionCreators;
}));
