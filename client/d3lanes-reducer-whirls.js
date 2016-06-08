/* 														*/
/*    d3lanes-reducer-whirls.js      */
/* 														*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-alpha.44.js')
	var d3lanesActions = require('./d3lanes-actions-whirls.js')
}

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesReducerWhirls = global.d3lanesReducerWhirls || {})));
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
			duration: 2500,
			n: 3,
			s0: 200,
			s: 200,
			rangs: [],
			rangsNow: 0,
			rangsAlways: 0,
			startRangs: false,
			
			rings: [],
			ringsNew: [],
			ringsIndex: 0,
			ringsHits: 0,
			rangsHitsIndex: 0,
			rangsHits: [],
			ringsIntroduced: false,
			ringsPerTick: 1,
			ringsRadio: 9,
			ringsGenerating: false,			
	}
	
function reducerThis(state = initialStateThis, action) {
	if (action == null) return state
	var ActionTypes = d3lanesActions.ActionTypes
    switch (action.type) {
		
       case ActionTypes.DELETE_RANG:
 						// console.log('DELETE_RANG')
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
 						// console.log('INIT_RANGS')
            return Object.assign({}, state, {
                startRangs: true
            })

       case ActionTypes.STOP_RANGS:
 						console.log('STOP_RANGS')
            return Object.assign({}, state, {
                startRangs: false
            })

			case ActionTypes.SET_RANG:		// setRang
					console.log('SET_RANG')
					var rangs = state.rangs
					var s0 = state.s0
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
								s: action.rang.s,
								s: s0,
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
											s: action.rang.s,
											s0: s0,
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

						
     case ActionTypes.DELETE_RING:	// deleteRing
						var rings = state.rings
						var items = rings.filter(function( obj ) {
								return obj.id !== action.ring.id;
							});
		
						 var r = Object.assign({}, state,
								{rings: items},
								{ringsIndex: items.length}
							)
							return r
		
        case ActionTypes.START_RINGS:				// startRings
					console.log("START_RINGS")		
          return Object.assign({}, state, {
                ringsGenerating: true
            })
						
        case ActionTypes.STOP_RINGS:			// stopRings
					console.log("STOP_RINGS")
            return Object.assign({}, state, {
                ringsGenerating: false
            });

        case ActionTypes.CREATE_RINGS:			// createRings
						var _newRings = []
						var _ringsHits = state.ringsHits
						var _rangsHits = state.rangsHits
						var _rangsHitsIndex = state.rangsHitsIndex
						if (action.ringsGenerating == true) {
							var ringsRadio = state.ringsRadio
						
							var idx = state.ringsIndex
							var i, j
							for (j = 0; j < action.rangs.length; ++j) {
									var cx = action.x
									var cy = action.y
								
									function inSquare (cx, cy, xl, yl, xh, yh) {
										if (cx > xl && cx < xh && cy > yl && cy < yh) return true
										else return false											
									}

									var xl = action.rangs[j].x
									var yl = action.rangs[j].y
									var xh = action.rangs[j].x + action.rangs[j].s
									var yh = action.rangs[j].y + action.rangs[j].s
									if (inSquare (cx, cy, xl, yl, xh, yh)) {
											var hitRang = action.rangs[j]
											var rid = hitRang.id
											var s = hitRang.s
											var s0 = hitRang.s0
											var r = ringsRadio || 0
												
											for (i = 0; i < action.ringsPerTick; i++) {
													var ring = {
																id: guid(),
																cx: cx,
																cy: cy,
																r: r,
																rid: rid,
															};

													ring.vector = [ring.id%2 ? - action.randNormal() : action.randNormal(),
																						 - action.randNormal2()*9.3];
													_newRings.unshift(ring);
											}
											_ringsHits = _ringsHits + 1
									}
									
									if (_rangsHits.indexOf(rid) == -1) {
											_rangsHits.push(rid);
									}
									_rangsHitsIndex = _rangsHits.length
							}
							
							var _ringsAll = state.rings.slice(0).concat(_newRings)
							return Object.assign({}, state, {
									rings: _ringsAll,
									ringsNew: _newRings,
									ringsIndex: _ringsAll.length,
									ringsHits: _ringsHits,
									rangsHits: _rangsHits,
									rangsHitsIndex: _rangsHitsIndex,
							})
						} else {
							return state
						}
						
						
        case ActionTypes.TICK_RING:		// tickRing
					console.log("TICK_RING")
					var ringsRadio = state.ringsRadio		// init ring radion
					var rangs = state.rangs
					var ringsNew = []
				
					var hitRangs = rangs
						.filter(function (d) { return (d.id == action.ring.rid) })

					if (hitRangs.length > 0) {
						var rang = hitRangs[0]		// rang by id
						
						ringsNew = state.rings			// get other rings
							.reduce(function (a, d) {				
									if (d.id == action.ring.id) {
												if (d.cx + d.r > rang.x + rang.s) 	d.vector[0] = - Math.abs(d.vector[0])
												if (d.cx - d.r < rang.x) 					d.vector[0] = Math.abs(d.vector[0])
												if (d.cy + d.r > rang.y + rang.s)	d.vector[1] = - Math.abs(d.vector[1])
												if (d.cy - d.r < rang.y) 					d.vector[1] = Math.abs(d.vector[1])
											
												d.r = (1 - action.ring.t) * ringsRadio
												d.cx = Math.min(d.cx + d.vector[0], rang.x + rang.s)
												d.cy = Math.min(d.cy + d.vector[1], rang.y + rang.s)
											if (d.r > 1e-6) {
													a.push(d)
											}
											return a
									} else {
											a.push(d)
											return a
									}
						}, [])
					}
					return Object.assign({}, state, {
							rings: ringsNew,
							ringsIndex: ringsNew.length,
					})
								
						
        case ActionTypes.TICK_RINGS:		// tickRings
							var _ringsRadio = state.ringsRadio
              var _rings = state.rings
								.filter(function (d) {
											return (d.id == action.id)
									})
								.map(function (d) {
										d.id = action.id
										d.cx += action.vector[0]
										d.cy += action.vector[1]
										d.t = action.t
										d.r = (1 - action.t) * _ringsRadio
										return d
								})

							return Object.assign({}, state, {
										rings: _rings,
										ringsIndex: _rings.length,
							})
																		
						
        default:
            return state;
    }
}



exports.reducer = reducerThis
}));