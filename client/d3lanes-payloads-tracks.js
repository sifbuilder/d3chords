/* 																	*/
/* d3lanes-payloads-tracks.js   	  */
/* 																	*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesPayloadsTracks = global.d3lanesPayloadsTracks || {})));
}(this, function (exports) { 'use strict';

		var setRecordsPayload = function () { return {
				itemSpan: store.getState().reducerConfig.itemSpan,
				currentMode: store.getState().reducerCourt.currentMode
			}}
				
		var messageCollectionPayload = function () { return {
				messageCollection: store.getState().reducerConfig.messageCollection
			}}
				
exports.setRecordsPayload = setRecordsPayload
exports.messageCollectionPayload = messageCollectionPayload
}))		