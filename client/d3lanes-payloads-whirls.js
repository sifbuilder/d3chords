/* 																	*/
/* d3lanes-payloads-whirls.js   	  */
/* 																	*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesPayloadsWhirls = global.d3lanesPayloadsWhirls || {})));
}(this, function (exports) { 'use strict';

			var createRingsPayload = function () { return {
						ringsPerTick: store.getState().reducerWhirls.ringsPerTick,
						x: store.getState().reducerCourt.mousePos[0], 
						y: store.getState().reducerCourt.mousePos[1],
						randNormal: store.getState().reducerConfig.randNormal,
						randNormal2: store.getState().reducerConfig.randNormal2,
						rings: store.getState().reducerWhirls.rings,
						rangs: store.getState().reducerWhirls.rangs,
						ringsGenerating: store.getState().reducerWhirls.ringsGenerating,
			}}
			
			var updateDurationPayload = function () { return {
						rangsAlways: store.getState().reducerWhirls.rangsAlways,
						rangsHitsIndex: store.getState().reducerWhirls.rangsHitsIndex, 
			}}
			
exports.createRingsPayload = createRingsPayload
exports.updateDurationPayload = updateDurationPayload
}));							