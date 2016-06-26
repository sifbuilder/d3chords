
/* 																	*/
/* redux3d-actions-whirls.js   			*/
/* 																	*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3ringsActionsWhirls = global.d3ringsActionsWhirls || {})));
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
	DELETE_RANG: '',
	INIT_RANGS: '',
	SET_DURATION: '',
	SET_RANG: '',
	SET_RANGS: '',
	STOP_RANGS: '',
	UPDATE_RANGS_DURATION: '',
	UPDATE_RANGS_NUMBER: '',
	
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

// ____________________ actions RANGS
var ActionCreators = {
	deleteRang(rang) {
    return {
        type: ActionTypes.DELETE_RANG,
        rang: rang,
		}
  },
	startRangs() {
    return {
        type: ActionTypes.INIT_RANGS,
        startRangs: true,
		}
  },
	setDuration(duration) {
    return {
        type: ActionTypes.SET_DURATION,
        duration: duration,
		}
  },
	stopRangs() {
    return {
        type: ActionTypes.STOP_RANGS
		}
  },
	setRang(rang) {
    return {
        type: ActionTypes.SET_RANG,
        rang: rang,
		}
  },
	setRangs(rangs) {
    return {
        type: ActionTypes.SET_RANGS,
        rangs: rangs,
		}
  },
	
	updateRangsDuration(obj) {
    return {
        type: ActionTypes.UPDATE_RANGS_DURATION,
        rangsAlways: obj.rangsAlways,
        rangsHitsIndex: obj.rangsHitsIndex,
		}
  },
	
	updateRangsNumber(obj) {
    return {
        type: ActionTypes.UPDATE_RANGS_NUMBER,
        rangsAlways: obj.rangsAlways,
        rangsHitsIndex: obj.rangsHitsIndex,
		}
  },
	
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
        r: obj.r,
 				randNormal: obj.randNormal,
 				randNormal2: obj.randNormal2,
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
				ring: {
					 id: arg.id,
					 rid: arg.rid,
					 cx: arg.cx,
					 cy: arg.cy,
					 r0: arg.r0,
					 r: arg.r,
					 vector: arg.vector,
					 t: arg.t,
					 tn: arg.tn,
					 rang: arg.rang,
				}
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
