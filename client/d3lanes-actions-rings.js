/* 																	*/
/* d3lanes-actions-rings.js 		*/
/* 																	*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesActionsRings = global.d3lanesActionsRings || {})));
}(this, function (exports) { 'use strict';

// ____________________ keyMirror
// https://github.com/STRML/keyMirror
var keyMirror = function(obj, prefix) {
  var ret = {};
  var key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = prefix + key;
    }
  }
  return ret;
}

var consts = {
	INTRODUCE_RINGS: '',
	CREATE_RINGS: '',
	START_RINGS: '',
	START_RINGS_TICKER: '',
	STOP_RINGS: '',
	STOP_TICKER: '',
	TICK_RINGS: '',
}


var ActionTypes = keyMirror(consts, '')

// ____________________ actions RINGS
var ActionCreators = {
	introduceRings(obj) {
    return {
        type: ActionTypes.INTRODUCE_RINGS,	// introduceRings
        N: obj.ringsPerTick,
        x: obj.x,
        y: obj.y,
				randNormal: obj.randNormal,
 				randNormal2: obj.randNormal2,
				xInit: obj.xInit,
				xEnd: obj.xEnd,
 				rangs: obj.rangs,
 				generating: obj.generating,
    }
  },
	createRings(obj) {
    return {
        type: ActionTypes.CREATE_RINGS,	// createRings
        N: obj.ringsPerTick,
        x: obj.x,
        y: obj.y,
				randNormal: obj.randNormal,
 				randNormal2: obj.randNormal2,
				xInit: obj.xInit,
				xEnd: obj.xEnd,
 				rangs: obj.rangs,
 				generating: obj.generating,
    }
  },
	startRings() {
    return {
        type: ActionTypes.START_RINGS
    }
	},
	startRingsTicker() {
    return {
        type: ActionTypes.START_RINGS_TICKER
    };
	},
	stopRingsTicker() {
    return {
        type: ActionTypes.STOP_RINGS_TICKER
    };
	},
	tickRings(arg) {
    return {
         type: ActionTypes.TICK_RINGS,		// tickRings
				 width: arg.width,
				 height: arg.height,
				 gravity: arg.gravity,
				 lanes: arg.lanes,
    }
	},
	stopRings() {
    return {
        type: ActionTypes.STOP_RINGS
    }
	},
}

exports.ActionTypes = ActionTypes
exports.ActionCreators = ActionCreators
}));