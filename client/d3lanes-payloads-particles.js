/* 																	*/
/* d3lanes-payloads-particles.js   	  */
/* 																	*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesPayloadsParticles = global.d3lanesPayloadsParticles || {})));
}(this, function (exports) { 'use strict';

		var createParticlesPayload = function () { return {
					particlesPerTick: store.getState().reducerParticles.particlesPerTick,
					x: 								store.getState().reducerCourt.mousePos[0], 
					y: 								store.getState().reducerCourt.mousePos[1],
					xInit: 						store.getState().reducerCourt.leftBorder,
					xEnd: 						store.getState().reducerCourt.svgWidth, 
					randNormal: 			store.getState().reducerConfig.randNormal,
					randNormal2: 			store.getState().reducerConfig.randNormal2,
					lanes: 						store.getState().reducerLanes.lanes,
					particlesGenerating: 			store.getState().reducerParticles.particlesGenerating,
		}}

		
		var tickParticlesPayload = function () { return {
				width: store.getState().reducerCourt.svgWidth,
				height: store.getState().reducerCourt.svgHeight,
				gravity: store.getState().reducerConfig.gravity,
				lanes: store.getState().reducerLanes.lanes
			}}
				
exports.createParticlesPayload = createParticlesPayload
exports.tickParticlesPayload = tickParticlesPayload
}))					