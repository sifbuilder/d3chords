
/* 																	*/
/* redux3d-actions-maps.js   		  */
/* 																	*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.redux3dActionsMaps = global.redux3dActionsMaps || {})));
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

var actionConstants = {
	FETCH_MAPS_COLLECTION: '',
	SET_MAPS_COLLECTION: '',
	SET_MAPS: '',
	WALK_DOWN_MAPS: '',
	WALK_UP_MAPS: '',
}

var ActionTypes = keyMirror(actionConstants, '')

// ____________________ actions
var ActionCreators = {

	fetchChordsCollection(payload) {		// FETCH_MAPS_COLLECTION
    return {
        type: ActionTypes.FETCH_MAPS_COLLECTION,
        payload: payload,
    }
  },
	setChordsCollection(payload) {		// SET_MAPS_COLLECTION
    return {
        type: ActionTypes.SET_MAPS_COLLECTION,
        payload: payload,
    }
  },
	setChords(payload) {				// SET_MAPS
    return {
        type: ActionTypes.SET_MAPS,
        payload: payload,
    }
  },
	walkDownChords(payload) {	// WALK_DOWN_MAPS
    return {
        type: ActionTypes.WALK_DOWN_MAPS,
        payload: payload,
    }
  },
	walkUpChords(payload) {	// WALK_UP_MAPS
    return {
        type: ActionTypes.WALK_UP_MAPS,
        payload: payload,
    }
  },

}

exports.ActionTypes = ActionTypes
exports.ActionCreators = ActionCreators
}));
