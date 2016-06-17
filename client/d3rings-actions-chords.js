
/* 																	*/
/* d3rings-actions-chords.js   		  */
/* 																	*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3ringsActionsChords = global.d3ringsActionsChords || {})));
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
	FETCH_CHORDS: '',
	SET_CHORDS_FETCHED: '',
}

var ActionTypes = keyMirror(actionConstants, '')

// ____________________ actions
var ActionCreators = {

	fetchChords(payload) {		// FETCH_CHORDS
    return {
        type: ActionTypes.FETCH_CHORDS,
        payload: payload,
    }
  },

	setRecordsFetched(areRecordsFetched) {
    return {
        type: ActionTypes.SET_RECORDS_FETCHED,
        areRecordsFetched: areRecordsFetched,
    }
  },

}

exports.ActionTypes = ActionTypes
exports.ActionCreators = ActionCreators
}));
