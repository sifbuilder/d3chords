
/* 																	*/
/* redux3d-actions-court.js   			*/
/* 																	*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.redux3dActionsCourt = global.redux3dActionsCourt || {})));
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
};

// ____________________ action TYPES
var cttsCourt = {
	FETCH_RECORDS: '',
	KEYB_DISPATCH: '',
	PROCESS_KEYB_KEYS: '',
	RELEASE_KEYBKEY: '',
	RESET_KEYS_EVENTS: '',
	RESIZE_HEIGHT: '',
	RESIZE_WIDTH: '',
	SET_KEYBKEY: '',
	SET_MODE: '',
	SET_NOTICE: '',
	SET_VIEW: '',
	START_KEYS_EVENTS: '',
	START_KEYBKEY_EVENTS: '',
	UPDATE_MOUSE_POS: '',
}

var ActionTypes = keyMirror(cttsCourt, '')

// ____________________ actions COURT
var ActionCreators = {

	resizeHeight(payload) {
    return {
        type: ActionTypes.RESIZE_HEIGHT,
        payload: payload
		}
  },
	resizeWidth(payload) {
    return {
        type: ActionTypes.RESIZE_WIDTH,
        payload: payload
		}
  },
	releaseKeybKey(e) {
    return {
        type: ActionTypes.RELEASE_KEYBKEY,
        keyCode: e.keyCode,
		}
  },
	setKeybKey(e) {
    return {
        type: ActionTypes.SET_KEYBKEY,
        keyCode: e.keyCode,
		}
  },
	processKeybKeys(payload) {
    return {
        type: ActionTypes.PROCESS_KEYB_KEYS,	// processKeybKeys
        payload: payload,
		}
  },
	setMode(payload) {
    return {
        type: ActionTypes.SET_MODE,	// setMode
        payload: payload,
		}
  },
	setNotice(notice) {
    return {
        type: ActionTypes.SET_NOTICE,
        notice: notice,
		}
  },
	setView(payload) {
    return {
        type: ActionTypes.SET_VIEW,
        payload: payload,
		}
  },
	startKeybKeyEvents() {
    return {
        type: ActionTypes.START_KEYBKEY_EVENTS	// startKeybKeyEvents
    }
	},
	updateMousePos(svg) {
    return {
        type: ActionTypes.UPDATE_MOUSE_POS,
        svg: svg,
    }
	},
}

exports.ActionTypes = ActionTypes;
exports.ActionCreators = ActionCreators;
}));
