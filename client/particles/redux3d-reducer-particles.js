
/* 																	*/
/*    redux3d-reducer-particles.js  */
/* 																	*/

	if (typeof require === "function") {
		var d3 = require('./d3.v4.0.0-rc.2.js')
		var redux3dActions = require('./redux3d-actions-particles.js')
	}
	
	(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.redux3dReducerParticles = global.redux3dReducerParticles || {})));
}(this, function (exports) { 'use strict';


// _____________ PARTICLES
var initialStateParticles = {
			particles: [],
			particleIndex: 0,
			particlesGenerating: true,
			particlesIntroduced: false,
			particlesPerTick: 10,
			particleRadio: 9,
}

function reducerParticles(state = initialStateParticles, action) {
	if (action == null) return state
	var ActionTypes = redux3dActions.ActionTypes
    switch (action.type) {
        case ActionTypes.START_PARTICLES:				// startParticles
					// console.log("START_PARTICLES")
          return Object.assign({}, state, {
                particlesGenerating: true
            })
						
        case ActionTypes.STOP_PARTICLES:			// stopParticles
					// console.log("STOP_PARTICLES")
            return Object.assign({}, state, {
                // particlesGenerating: false
            });
						
        case ActionTypes.INTRODUCE_PARTICLES:			// introduceParticles
					var newParticles = state.particles.slice(0)
					var numberOfNewParticles = 5 * action.particlesPerTick
					var currentView = action.currentView
					var i
					if ((state.particlesIntroduced == false) && (currentView == 'lanesView')) {
						for (i = 0; i < numberOfNewParticles; i++) {
								var particle = {id: state.particleIndex+i,
																		x: action.x,
																		y: action.y,
																		closestLaneDown: {id: 'init', x: action.xInit},
																		closestLaneUp: {id: 'end', x: action.xEnd},
																	}
										particle.vector = [particle.id%2 ? - action.randNormal() : action.randNormal(),
																		 - action.randNormal2() * 3.3];
										newParticles.unshift(particle);
							}
							return Object.assign({}, state, {
									particles: newParticles,
									particleIndex: state.particleIndex+i+1,
									particlesIntroduced: true
							})
					} else {
							return state
					}
							
        case ActionTypes.CREATE_PARTICLES:			// createParticles
						var newParticles = state.particles.slice(0)
						var numberOfNewParticles = action.particlesPerTick
						var particlesGenerating = action.particlesGenerating
						var currentView = action.currentView
						if ((particlesGenerating == true) && (currentView == 'lanesView') ){
							for (var i = 0; i < numberOfNewParticles; i++) {
									var ref = parseInt(action.x)
									var closestLaneUp = action.lanes
													.filter(function (d) {return d.x >= ref} )
													.reduce(function (prev, curr) {
										return (Math.abs(curr.x - ref) < Math.abs(prev.x - ref) ? curr : prev);
									}, {id: 'end', x: action.xEnd})
									
									var closestLaneDown = action.lanes
													.filter(function (d) {return d.x <= ref} )
													.reduce(function (prev, curr) {
										return (Math.abs(curr.x - ref) < Math.abs(prev.x - ref) ? curr : prev);
									}, {id: 'init', x: action.xInit})									
							
									var particle = {id: state.particleIndex+i,
																		x: action.x,
																		y: action.y,
																		closestLaneDown: closestLaneDown,
																		closestLaneUp: closestLaneUp,
																	};

									particle.vector = [particle.id%2 ? - action.randNormal() : action.randNormal(),
																		 - action.randNormal2()*3.3];

									newParticles.unshift(particle);
							}
							return Object.assign({}, state, {
									particles: newParticles,
									particleIndex: state.particleIndex+i+1
							})
						} else {
							return state
						}
						
        case ActionTypes.TICK_PARTICLES:		// tickParticles
							var laneXs = action.lanes
									.map(function(l) {
										var x = parseInt(l.x)
										return x})
							var svgWidth = action.width
							var svgHeight = action.height
              var gravity = action.gravity
              var movedParticles = state.particles
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

										if (ref < (p.closestLaneDown.x + state.particleRadio) || ref > (p.closestLaneUp.x - state.particleRadio)) {
												p.vector[0] = -p.vector[0] 
											}
										p.vector[1] += gravity + 2 * gravity * (p.y - svgHeight) / svgHeight
										return p
							});
							return Object.assign({}, state, {
										particles: movedParticles,
										particleIndex: movedParticles.length,
								});
					default:
            return state;
	}
}

exports.reducerParticles = reducerParticles;
}));
