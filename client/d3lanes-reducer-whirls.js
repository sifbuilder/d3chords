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
			duration: 1500,
			n: 1,
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
					// console.log('SET_RANG')
					var rangs = state.rangs
					var rangsAlways = state.rangsAlways
					var items = {}
					var result = rangs.filter(function( obj ) {
							return obj.id == action.rang.id;
						});
							
					if (result.length === 0) {			// add
console.log('SET_RANG add', action.rang.id , action.rang.width ,action.rang.height)
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
console.log('SET_RANG edit', action.rang.id , action.rang.width ,action.rang.height)
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
							console.log("CREATE_RINGS")
							var ringsRadio = state.ringsRadio
						
							var idx = state.ringsIndex
							var i, j
							for (j = 0; j < action.rangs.length; ++j) {
									var cx = action.x
									var cy = action.y
									var rid = action.rangs[j].id
									var xl = action.rangs[j].x
									var xh = action.rangs[j].x + action.rangs[j].width
									var yl = action.rangs[j].y
									var yh = action.rangs[j].y + action.rangs[j].height
								
									// console.log(cx, xl, xh, cy, yl, yh)
									function inSquare (cx, cy, xl, yl, xh, yh) {
											if (cx  > xl && 
													cx  < xh && 
													cy  > yl && 
													cy  < yh) return true
											else 		return false											
									}
									if (inSquare (cx, cy, xl, yl, xh, yh)) {
												
											// console.log( "rang", j, JSON.stringify(action.rangs[j], null, 2))
												
											for (i = 0; i < action.ringsPerTick; i++) {
													var ring = {
																id: guid(),
																cx: cx,
																cy: cy,
																r: ringsRadio,
																rid: rid,
																xl: xl,
																yl: yl,
																xh: xh,
																yh: yh,
																t: 0,
																rang: action.rangs[j],
															};

													ring.vector = [ring.id%2 ? - action.randNormal() : action.randNormal(),
																						 - action.randNormal2()*3.3];
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
              var _rangs = state.rangs
								.filter(function (d) {
										var inId = (d.id == action.rid)
										var r = inId
										return r 
									})

console.log("________________ tick rang d.id: ", _rangs[0].id, _rangs[0].x, _rangs[0].y, _rangs[0].width, _rangs[0].height)								
									
							var _ringsRadio = state.ringsRadio
              var _rings = state.rings
								.filter(function (d) {
										var r = _rangs.length == 1
										return r 
									})
									.filter(function (d) {
										// var inW = (d.cx > 0 )
										// var inE = (d.cx < 600 )
										// var inN = (d.cy < 400 )
										// var inS = (d.cy > 0 )
										var inId = (d.id == action.id)
										// var r = inId && inW && inE && inS && inN
										var r = inId
										return r 
									})
								.map(function (d) {
										var _x = 					_rangs[0].x || 0
										var _y = 					_rangs[0].y || 0
										var _width = 			_rangs[0].width || 0
										var _height = 		_rangs[0].height || 0
								
										if (d.cx > _x + _width) 		d.vector[0] = -d.vector[0]
										if (d.cx < _x) 							d.vector[0] = -d.vector[0]
										if (d.cy > _y + _height) 		d.vector[1] = -d.vector[1]
										if (d.cy < _y) 							d.vector[1] = -d.vector[1]

										var vx = d.vector[0], vy = d.vector[1]
										var t = action.t, id = action.id
										
										d.id = id
										d.cx += vx
										d.cy += vy
										d.t = t
										d.r = (1 - t) * _ringsRadio
console.log("________________ tick ring d.id: ", d.id, d.cx,  d.cy,  d.r, d.t)								
										return d
								})

             var _ringsOther = state.rings
								.filter(function (d) {
										var inId = (d.id !== action.id)
										var r = inId
										return r 
									})
										
							var _ringsNew = 	_ringsOther.concat(_rings); 
								
							return Object.assign({}, state, {
									rings: _ringsNew,
									ringsIndex: _ringsNew.length,
							});
								
						
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
							});
																		
						
        default:
            return state;
    }
}



exports.reducer = reducerThis
}));