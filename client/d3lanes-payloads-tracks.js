/* 																	*/
/* d3lanes-payloads-tracks.js   	  */
/* 																	*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesPayloadsTracks = global.d3lanesPayloadsTracks || {})));
}(this, function (exports) { 'use strict';

		var setRecords_Payload = function () { return {
				itemSpan: store.getState().reducerConfig.itemSpan,
				currentMode: store.getState().reducerCourt.currentMode
			}}
				
		var setRecordsCollection_Payload = function () { return {
				recordsCollection: store.getState().reducerConfig.recordsCollection
			}}
				
exports.setRecords_Payload = setRecords_Payload
exports.setRecordsCollection_Payload = setRecordsCollection_Payload
}))		