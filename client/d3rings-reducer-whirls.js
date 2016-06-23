/* 																*/
/*    d3rings-reducer-whirls.js   */
/* 																*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-alpha.50.js')
	var d3ringsActions = require('./d3rings-actions-whirls.js')
}

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3ringsReducerWhirls = global.d3ringsReducerWhirls || {})));
}(this, function (exports) { 'use strict';

// http://stackoverflow.com/questions/31381129/assign-new-id-attribute-to-each-element-created
function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

function inSquare (cx, cy, xl, yl, xh, yh) {
	if (cx > xl && cx < xh && cy > yl && cy < yh) return true
	else return false											
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
			startRangs: true,
			
			rings: [],
			ringsNew: [],
			ringsIndex: 0,
			ringsHits: 0,
			rangsHitsIndex: 0,
			rangsHits: [],
			ringsIntroduced: false,
			ringsPerTick: 3,
			ringsRadio: 9,
			ringsGenerating: true,			
	}
	
function reducerThis(state = initialStateThis, action) {
	if (action == null) return state
	var ActionTypes = d3ringsActions.ActionTypes
    switch (action.type) {
		
       case ActionTypes.DELETE_RANG:
						var rangs = state.rangs
						var items = rangs.filter(function( obj ) {
								return obj.rid !== action.rang.rid;
							});
		
						 var r = Object.assign({}, state,
							{rangs: items},
							{rangsNow: items.length}
							);
							return r

       case ActionTypes.INIT_RANGS:
            return Object.assign({}, state, {
                startRangs: true
            })

       case ActionTypes.STOP_RANGS:
 						// console.log('STOP_RANGS')
            return Object.assign({}, state, {
                // startRangs: false
            })

			case ActionTypes.SET_RANG:					// setRang
					var rangs = state.rangs
					var s0 = state.s0
					var rangsAlways = state.rangsAlways
					var items = {}
					var result = rangs.filter(function( obj ) {
							return obj.id == action.rang.id;
						});
							
					if (result.length === 0) {			// add rang
						items = {rangs: [
							{
								id: action.rang.id,
								rid: action.rang.rid,
								grid: action.rang.grid,
								x: action.rang.x,
								y: action.rang.y,
								s: action.rang.s,
								t: action.rang.t,
								sn: action.rang.s,
								s: s0,
							}, 
							...rangs
						]}
						rangsAlways = rangsAlways + 1
					} else {												// edit rang
						items = {rangs: rangs.map(rang =>
								rang.rid === action.rang.rid ?
									Object.assign({}, rang, { 
											rid: action.rang.rid,
											grid: action.rang.grid,
											x: action.rang.x,
											y: action.rang.y,
											s: action.rang.s,
											sn: rang.s,
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
		
        case ActionTypes.SET_RANGS:						// setRangs
 						// console.log('SET_RANGS')
            return Object.assign({}, state, {
                rangs: action.rangs,
                rangsNow: Object.keys(action.rangs).length
            })

       case ActionTypes.UPDATE_RANGS_DURATION:	// updateRangsDuration
						var duration = state.duration
						var hitsLostPct = Math.round(100 * (action.rangsAlways - action.rangsHitsIndex) / action.rangsAlways) || 0
						if (hitsLostPct < 20) duration = Math.min(Math.max((50 - hitsLostPct) * 20, 1500), 2500)
            return Object.assign({}, state, {
                duration: duration,
             })

       case ActionTypes.UPDATE_RANGS_NUMBER:		// updateRangsNumber
						var n = state.n
						var hitsLostPct = Math.round(100 * (action.rangsAlways - action.rangsHitsIndex) / action.rangsAlways) || 0
						var hitsPctBy10 = Math.floor((100 - hitsLostPct)/10)
						var rangsMax = Math.max(hitsPctBy10, 2)
						var rangsNumber = Math.min(rangsMax, 8)
						return Object.assign({}, state, {
                n: rangsNumber,
             })

						
        case ActionTypes.CREATE_RINGS:			// createRings
						var _duration = state.duration
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
								

									var xl = action.rangs[j].x
									var yl = action.rangs[j].y
									var xh = action.rangs[j].x + action.rangs[j].s
									var yh = action.rangs[j].y + action.rangs[j].s
									if (inSquare (cx, cy, xl, yl, xh, yh)) {
											var rang = action.rangs[j]
											var rid = rang.id
											var grid = rang.grid
											var t = rang.t
											var s = rang.s
											var s0 = rang.s0
											var r0 = (ringsRadio * s / s0) || 0
											var r = (ringsRadio * s / s0) || 0
												
											for (i = 0; i < action.ringsPerTick; i++) {
													var ring = {
																id: guid(),
																cx: cx,
																cy: cy,
																r0: r0,
																r: r,
																rid: rid,
																grid: grid,
																rang: rang,
															};

													ring.vector = [ring.id%2 ? - action.randNormal() : action.randNormal(),
																						 - action.randNormal2()]
													_newRings.unshift(ring)
											}
											_ringsHits = _ringsHits + 1
									
											if (_rangsHits.indexOf(grid) == -1) {
													_rangsHits.push(grid)
											}
											_rangsHitsIndex = _rangsHits.length
										}
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
		
        case ActionTypes.SET_DURATION:				// setDuration
					// console.log("SET_DURATION")		
          return Object.assign({}, state, {
                duration: action.duration
            })
						
		
        case ActionTypes.START_RINGS:				// startRings
					// console.log("START_RINGS")		
          return Object.assign({}, state, {
                ringsGenerating: true
            })
						
        case ActionTypes.STOP_RINGS:			// stopRings
					// console.log("STOP_RINGS")
            return Object.assign({}, state, {
                // ringsGenerating: false
            });

						
        case ActionTypes.TICK_RING:		// tickRing
					var duration = state.duration
					
					var ringsRadio = state.ringsRadio		// init ring radio
					var rangs = state.rangs
					var ringsNew = []
				
					var hitRangs = rangs
						.filter(function (d) { return (d.id == action.ring.rid) })

					if (hitRangs.length > 0) {
						var rang = hitRangs[0]		// rang by id
						var speed = rang.s0/duration
						var xe = rang.x + rang.s
						var xw = rang.x
						var yn = rang.y
						var ys = rang.y + rang.s
						var t = action.ring.t
						var tn = action.ring.tn
						var deltas = rang.s - rang.sn
						var deltat = t - tn
						var v = deltas/deltat || 0
						
						ringsNew = state.rings			// get other rings
							.reduce(function (a, d) {				
									if (d.id == action.ring.id) {
												var randx = d.vector[0]
												var randy = d.vector[1]
												var dcx = d.cx
												var dcy = d.cy
												var dr = d.r
												var dr0 = d.r0
												
												if (dr > deltas) {
															if (dcx - dr < xw) randx = - randx
															if (dcx + dr > xe) randx = randx + 2 * deltas
															if (dcy - dr < yn) randy = - randy
															if (dcy + dr > ys) randy = randy + 2 * deltas
														
															var xnp1 = dcx + randx
															var ynp1 = dcy + randy

															d.tn = t
															d.r = (1 - t) * dr0
															d.vector[0] = randx
															d.vector[1] = randy
															
															var xpose = Math.max(xw, xnp1)
															var xpos = Math.min(xpose, xe)
															var yposn = Math.max(yn, ynp1)
															var ypos = Math.min(yposn, ys)
															d.cx = xpos
															d.cy = ypos
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
								
						
        default:
            return state;
    }
}

exports.reducer = reducerThis
}));
