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


// _____________ RINGS
var initialStateRings = {
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
function reducerThis(state = initialStateRings, action) {
	if (action == null) return state
	var ActionTypes = d3lanesActions.ActionTypes
    switch (action.type) {
		
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
 // console.log(" ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^TICK_RING", JSON.stringify(action, null, 2))
				
							var _ringsRadio = state.ringsRadio
              var _rings = state.rings
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
// console.log("----------- tickRing ", d.cx, action.rang.x, action.rang.width)								
								
										if (d.cx > action.rang.x + action.rang.width) d.vector[0] = -d.vector[0]
										if (d.cx < action.rang.x) d.vector[0] = -d.vector[0]
										if (d.cy > action.rang.y + action.rang.height) d.vector[1] = -d.vector[1]
										if (d.cy < action.rang.y) d.vector[1] = -d.vector[1]

										var vx = d.vector[0], vy = d.vector[1]
										var t = action.t, id = action.id
										
										d.id = id
										d.cx += vx
										d.cy += vy
										d.t = t
										d.r = (1 - t) * _ringsRadio
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


exports.reducer = reducerThis;
}));