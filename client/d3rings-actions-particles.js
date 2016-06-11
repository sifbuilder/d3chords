/* 																	*/
/* d3rings-actions-particles.js 		*/
/* 																	*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3ringsActionsParticles = global.d3ringsActionsParticles || {})));
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

var cttsParticles = {
	CREATE_PARTICLES: '',
	INTRODUCE_PARTICLES: '',
	START_PARTICLES: '',
	START_TICKER: '',
	STOP_PARTICLES: '',
	STOP_TICKER: '',
	TICK_PARTICLES: '',
}


var ActionTypes = keyMirror(cttsParticles, '')

// ____________________ actions PARTICLES
var ActionCreators = {
	createParticles(obj) {
    var action = {
        type: ActionTypes.CREATE_PARTICLES,	// createParticles
        particlesPerTick: obj.particlesPerTick,
        x: obj.x,
        y: obj.y,
				randNormal: obj.randNormal,
 				randNormal2: obj.randNormal2,
				xInit: obj.xInit,
				xEnd: obj.xEnd,
 				lanes: obj.lanes,
 				particlesGenerating: obj.particlesGenerating,
 				currentView: obj.currentView,
    }
		return action
  },
	introduceParticles(obj) {
    return {
        type: ActionTypes.INTRODUCE_PARTICLES,	// introduceParticles
        particlesPerTick: obj.particlesPerTick,
        x: obj.x,
        y: obj.y,
				randNormal: obj.randNormal,
 				randNormal2: obj.randNormal2,
				xInit: obj.xInit,
				xEnd: obj.xEnd,
 				lanes: obj.lanes,
 				particlesGenerating: obj.particlesGenerating,
 				currentView: obj.currentView,
    }
  },
	startParticles() {
    return {
        type: ActionTypes.START_PARTICLES
    }
	},
	startTicker() {
    return {
        type: ActionTypes.START_TICKER
    };
	},
	stopTicker() {
    return {
        type: ActionTypes.STOP_TICKER
    };
	},
	stopParticles() {
    return {
        type: ActionTypes.STOP_PARTICLES
    }
	},
	tickParticles(arg) {
    return {
         type: ActionTypes.TICK_PARTICLES,		// tickParticles
				 width: arg.width,
				 height: arg.height,
				 gravity: arg.gravity,
				 lanes: arg.lanes,
    }
	},
}

exports.ActionTypes = ActionTypes
exports.ActionCreators = ActionCreators
}));