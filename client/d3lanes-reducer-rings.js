/* 														*/
/*    d3rings-reducer-rings.js      */
/* 														*/

	if (typeof require === "function") {
		var d3 = require('./d3.v4.0.0-alpha.44.js')
		var d3lanesActions = require('./d3lanes-actions-rings.js')
	}
	
	(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesReducerRings = global.d3lanesReducerRings || {})));
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


// _____________ RINGS
var initialStateRings = {
			rings: [],
			ringsIndex: 0,
			ringsHits: 0,
			ringsIntroduced: false,
			ringsPerTick: 1,
			ringsRadio: 9,
			generating: false,
}
function reducerThis(state = initialStateRings, action) {
	if (action == null) return state
	var ActionTypes = d3lanesActions.ActionTypes
    switch (action.type) {
        case ActionTypes.START_RINGS:				// startRings
					console.log("START_RINGS")		
          return Object.assign({}, state, {
                generating: true
            })
						
        case ActionTypes.STOP_RINGS:			// stopRings
					console.log("STOP_RINGS")
            return Object.assign({}, state, {
                generating: false
            });

							
        case ActionTypes.CREATE_RINGS:			// createRings
						// console.log("CREATE_RINGS")		
						var newRings = state.rings.slice(0)
						var _ringsHits = state.ringsHits
						if (action.generating == true) {
						
							var idx = state.ringsIndex
							var i, j
							for (j = 0; j < action.rangs.length; ++j) {
									var x0 = action.x
									var y0 = action.y
									var xl = action.rangs[j].x
									var xh = action.rangs[j].x + action.rangs[j].width
									var yl = action.rangs[j].y
									var yh = action.rangs[j].y + action.rangs[j].height
									var rid = action.rangs[j].id
								
									// console.log(x0, xl, xh, y0, yl, yh)
									function inSquare (x0, y0, xl, yl, xh, yh) {
											if (x0  > xl && 
													x0  < xh && 
													y0  > yl && 
													y0  < yh) return true
											else 		return false											
									}
									if (inSquare (x0, y0, xl, yl, xh, yh)) {
												
											// console.log( "rang", j, JSON.stringify(action.rangs[j], null, 2))
												
											for (i = 0; i < action.N; i++) {
													var ring = {
																id: guid(),
																rid: rid,
																x: x0,
																y: y0,
																xl: xl,
																yl: yl,
																xh: xh,
																yh: yh,
															};

													ring.vector = [ring.id%2 ? - action.randNormal() : action.randNormal(),
																						 - action.randNormal2()*3.3];
													newRings.unshift(ring);
											}
											_ringsHits = _ringsHits + 1
									}
							}

							return Object.assign({}, state, {
									rings: newRings,
									ringsIndex: state.rings.length,
									ringsHits: _ringsHits
							})
						} else {
							return state
						}
						
						
        case ActionTypes.TICK_RINGS:		// tickRings
							var laneXs = action.lanes
									.map(function(l) {
										var x = parseInt(l.x)
										return x})
							var svgWidth = action.width
							var svgHeight = action.height
              var gravity = action.gravity
              var movedRings = state.rings
								.filter(function (p) {
											return (!(p.y > svgHeight))
									})
								.filter(function (p) {
											return (!(p.y < 0))
									})
								.map(function (p) {
										var vx = p.vector[0]
										var vy = p.vector[1]
										p.x += vx
										p.y += vy

										var ref = parseInt(p.x)

										var laneUp = action.lanes
												.filter(function(l) {
													return (l.id == p.closestLaneUp.id)
													})
										p.closestLaneUp.x = (laneUp.length > 0 ) ? +laneUp[0].x : +p.closestLaneUp.x
										
										var laneDown = action.lanes
												.filter(function(l) {
													return (l.id == p.closestLaneDown.id)
													})
										 p.closestLaneDown.x = (laneDown.length > 0 ) ? +laneDown[0].x : +p.closestLaneDown.x

										if (ref < (p.closestLaneDown.x + state.ringsRadio) || ref > (p.closestLaneUp.x - state.ringsRadio)) {
												p.vector[0] = -p.vector[0] 
											}
										p.vector[1] += gravity + 2 * gravity * (p.y - svgHeight) / svgHeight
										return p
							});
							return Object.assign({}, state, {
										rings: movedRings,
										ringsIndex: movedRings.length,
								});
					default:
            return state;
	}
}


exports.reducer = reducerThis;
}));