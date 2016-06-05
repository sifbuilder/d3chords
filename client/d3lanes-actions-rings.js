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
	DELETE_RING: '',
	START_RINGS: '',
	START_RINGS_TICKER: '',
	STOP_RINGS: '',
	STOP_TICKER: '',
	TICK_RING: '',
	TICK_RINGS: '',
}


var ActionTypes = keyMirror(consts, '')

// ____________________ actions RINGS
var ActionCreators = {
	introduceRings(obj) {
    return {
        type: ActionTypes.INTRODUCE_RINGS,	// introduceRings
        ringsPerTick: obj.ringsPerTick,
        x: obj.x,
        y: obj.y,
				randNormal: obj.randNormal,
 				randNormal2: obj.randNormal2,
				xInit: obj.xInit,
				xEnd: obj.xEnd,
 				rangs: obj.rangs,
 				ringsGenerating: obj.ringsGenerating,
    }
  },
	createRings(obj) {
    return {
        type: ActionTypes.CREATE_RINGS,	// createRings
        ringsPerTick: obj.ringsPerTick,
        x: obj.x,
        y: obj.y,
				randNormal: obj.randNormal,
 				randNormal2: obj.randNormal2,
				xInit: obj.xInit,
				xEnd: obj.xEnd,
 				rangs: obj.rangs,
 				ringsGenerating: obj.ringsGenerating,
    }
  },
	deleteRing(ring) {
    return {
        type: ActionTypes.DELETE_RING,
        ring: ring,
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
	tickRing(arg) {
    return {
         type: ActionTypes.TICK_RING,		// tickRing
				 id: arg.id,
				 rid: arg.rid,
				 cx: arg.cx,
				 cy: arg.cy,
				 r: arg.r,
				 xl: arg.xl,
				 yl: arg.yl,
				 xh: arg.xh,
				 yh: arg.yh,
				 vector: arg.vector,
				 t: arg.t,
    }
	},
	tickRings(arg) {
    return {
         type: ActionTypes.TICK_RINGS,		// tickRings
				 id: arg.id,
				 rid: arg.rid,
				 cx: arg.x,
				 cy: arg.y,
				 xl: arg.xl,
				 yl: arg.yl,
				 xh: arg.xh,
				 yh: arg.yh,
				 vector: arg.vector,
				 t: arg.t,
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