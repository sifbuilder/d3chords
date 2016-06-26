
/* 																	*/
/* redux3d-actions-chords.js   		  */
/* 																	*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.redux3dActionsChords = global.redux3dActionsChords || {})));
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
	FETCH_CHORDS_COLLECTION: '',
	SET_CHORDS_COLLECTION: '',
	SET_CHORDS: '',
	WALK_DOWN_CHORDS: '',
	WALK_UP_CHORDS: '',
}

var ActionTypes = keyMirror(actionConstants, '')

// ____________________ actions
var ActionCreators = {

	fetchChordsCollection(payload) {		// FETCH_CHORDS_COLLECTION
    return {
        type: ActionTypes.FETCH_CHORDS_COLLECTION,
        payload: payload,
    }
  },
	setChordsCollection(payload) {		// SET_CHORDS_COLLECTION
    return {
        type: ActionTypes.SET_CHORDS_COLLECTION,
        payload: payload,
    }
  },
	setChords(payload) {				// SET_CHORDS
    return {
        type: ActionTypes.SET_CHORDS,
        payload: payload,
    }
  },
	walkDownChords(payload) {	// WALK_DOWN_CHORDS
    return {
        type: ActionTypes.WALK_DOWN_CHORDS,
        payload: payload,
    }
  },
	walkUpChords(payload) {	// WALK_UP_CHORDS
    return {
        type: ActionTypes.WALK_UP_CHORDS,
        payload: payload,
    }
  },

}

exports.ActionTypes = ActionTypes
exports.ActionCreators = ActionCreators
}));
