/* 														*/
/*    d3lanes-reducer-rang.js      */
/* 														*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-alpha.44.js')
	var d3lanesActions = require('./d3lanes-actions-rangs.js')
}

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesReducerRangs = global.d3lanesReducerRangs || {})));
}(this, function (exports) { 'use strict';

// http://stackoverflow.com/questions/31381129/assign-new-id-attribute-to-each-element-created
function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

// _____________ adapted from redux combineReducers	
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers)
  var finalReducers = {}
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i]
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  var finalReducerKeys = Object.keys(finalReducers)

  return function combination(state = {}, action) {
    var hasChanged = false
    var nextState = {}
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i]
      var reducer = finalReducers[key]
      var previousStateForKey = state[key]
      var nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state
  }
}

// _____________ RANGS
var initialStateThis = {
			duration: 1500,
			n: 1,
			s: 200,
			rangs: [],
			rangsNow: 0,
			rangsAlways: 0,
			startRangs: false,
	}
	
function reducerThis(state = initialStateThis, action) {
	if (action == null) return state
	var ActionTypes = d3lanesActions.ActionTypes
    switch (action.type) {
		
       case ActionTypes.DELETE_RANG:
 						console.log('DELETE_RANG')
						var rangs = state.rangs
						var items = rangs.filter(function( obj ) {
								return obj.id !== action.rang.id;
							});
		
						 var r = Object.assign({}, state,
							{rangs: items},
							{rangsNow: items.length}
							);
							return r

       case ActionTypes.INIT_RANGS:
 						console.log('INIT_RANGS')
            return Object.assign({}, state, {
                startRangs: true
            })

       case ActionTypes.STOP_RANGS:
 						console.log('STOP_RANGS')
            return Object.assign({}, state, {
                startRangs: false
            })

			case ActionTypes.SET_RANG:		// setRang
					// console.log('SET_RANG')
					var rangs = state.rangs
					var rangsAlways = state.rangsAlways
					var items = {}
					var result = rangs.filter(function( obj ) {
							return obj.id == action.rang.id;
						});
							
					if (result.length === 0) {			// add
						items = {rangs: [
							{
								id: action.rang.id,
								x: action.rang.x,
								y: action.rang.y,
								width: action.rang.width,
								height: action.rang.height,
							}, 
							...rangs
						]}
						rangsAlways = rangsAlways + 1
					} else {												// edit
							items = {rangs: rangs.map(rang =>
								rang.id === action.rang.id ?
									Object.assign({}, rang, { 
											id: action.rang.id,
											x: action.rang.x,
											y: action.rang.y,
											width: action.rang.width,
											height: action.rang.height,
									}) :
									rang
							)}
					}
				 var r = Object.assign({}, state,
						items,
						{rangsNow: items.rangs.length,
						 rangsAlways: rangsAlways}
					)
					return r
		
        case ActionTypes.SET_RANGS:
 						console.log('SET_RANGS')
            return Object.assign({}, state, {
                rangs: action.rangs,
                rangsNow: Object.keys(action.rangs).length
            })

						
        default:
            return state;
    }
}



exports.reducer = reducerThis
}));