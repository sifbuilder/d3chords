
/* 																		*/
/*    d3rings-reducer-config.js      */
/* 																		*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-rc.2.js')
	var d3ringsActions = require('./d3rings-actions.js')
}
	
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3ringsReducerConfig = global.d3ringsReducerConfig || {})));
}(this, function (exports) { 'use strict';


// _____________ CONFIG
var initialStateConfig = {
			modes: {autoMode: 'autoMode', walkMode: 'walkMode'},
			modeLabels: {autoMode: 'auto', walkMode: 'walk'},
			views: ['chordsView', 'lanesView', 'ringsView'],
			gravity: 0.5,
			randNormal: d3.randomNormal(1.3, 2),
			randNormal2: d3.randomNormal(0.5, 1.8),
			containerElem: '#container',
			containerId: 'svgid',
			tickspan: 60,			
			beatTime: 500,
			fadeFactor: 3,	// times beat - fade items
			periodFactor: 4, // times beat - add items
			ringDefaultRadio: 6.33,
			vstep: 50,
			itemSpan: 6,
			itemProps: ['to', 'from'],
			itemVal: 'msg',
			recordsCollection_000: [
				 {id: "1", from: "customer", to: "barrista1", msg: "place order"},
				 {id: "2", from: "barrista1", to: "register", msg: "enter order"},
				 {id: "3", from: "register", to: "barrista1", msg: "give total"},
				 {id: "4", from: "barrista1", to: "barrista1", msg: "get cup making sure that it is fine for purpose"},
				 {id: "5", from: "barrista1", to: "barrista2", msg: "give cup"},
				 {id: "6", from: "barrista1", to: "customer", msg: "request money"},
				 {id: "7", from: "customer", to: "barrista1", msg: "pay order"},
				 {id: "8", from: "barrista2", to: "barrista2", msg: "get chai mix"},
				 {id: "9", from: "barrista2", to: "barrista2", msg: "add flavor"},
				 {id: "10", from: "barrista2", to: "barrista2", msg: "add milk"},
				 {id: "11", from: "barrista2", to: "barrista2", msg: "add ice"},
				 {id: "12", from: "barrista2", to: "barrista2", msg: "swirl"},
				 {id: "13", from: "barrista2", to: "customer", msg: "give tasty beverage"},
				 {id: "14", from: "customer", to: "tasty beverage", msg: "sip"},
				 {id: "15", from: "tasty beverage", to: "customer", msg: "burn"},
				 {id: "16", from: "customer", to: "customer", msg: "cry"},
				 {id: "17", from: "customer", to: "manager", msg: "complain"},
				 {id: "18", from: "manager", to: "barrista1", msg: "fire"},
				 {id: "19", from: "manager", to: "barrista2", msg: "fire"},
			],
			recordsCollection: [
				 {id: "1", from: "app", to: "store", msg: "create store"},
				 {id: "2", from: "store", to: "store", msg: "subscribe lanes listener"},
				 {id: "3", from: "store", to: "store", msg: "subscribe particles listener"},
				 {id: "4", from: "app", to: "app", msg: "start kbd controller"},
				 {id: "5", from: "app", to: "app", msg: "start mouse controller"},
				 {id: "6", from: "ticker", to: "ticker", msg: "subscribe tickParticles"},
				 {id: "7", from: "ticker", to: "ticker", msg: "subscribe setRecords"},
				 {id: "8", from: "ticker", to: "ticker", msg: "start auto"},
				 {id: "9", from: "store", to: "reducer", msg: "dispatch setRecords action"},
				 {id: "10", from: "reducer", to: "reducer", msg: "apply action logic"},
				 {id: "11", from: "reducer", to: "store", msg: "return new state"},
				 {id: "12", from: "ticker", to: "ticker", msg: "run listeners"},
				 {id: "13", from: "renderer", to: "UI", msg: "render lanes"},
				 {id: "14", from: "UI", to: "app", msg: "trigger left arrow event"},
				 {id: "15", from: "store", to: "reducer", msg: "dispatch setMode action"},
				 {id: "16", from: "reducer", to: "reducer", msg: "run action"},
				 {id: "17", from: "reducer", to: "store", msg: "return new state"},
				 {id: "18", from: "ticker", to: "ticker", msg: "run listeners"},
				 {id: "19", from: "UI", to: "app", msg: "send down arrow event"},
				 {id: "20", from: "store", to: "reducer", msg: "dispatch setRecods action"},
				 {id: "21", from: "reducer", to: "reducer", msg: "run action and get record"},
				 {id: "22", from: "reducer", to: "reducer", msg: "return new set"},
				 {id: "23", from: "ticker", to: "ticker", msg: "run listeners"},
				 {id: "24", from: "renderer", to: "UI", msg: "render lanes"},
				 {id: "25", from: "UI", to: "app", msg: "send right arrow event"},
				 {id: "26", from: "store", to: "reducer", msg: "dispatch setMode action"},
				 {id: "27", from: "reducer", to: "reducer", msg: "run action"},
				 {id: "28", from: "reducer", to: "reducer", msg: "return new mode auto"},
				 {id: "29", from: "ticker", to: "ticker", msg: "run listeners with new state"},
				 {id: "30", from: "renderer", to: "UI", msg: "render auto lanes"},
				 {id: "31", from: "store", to: "reducer", msg: "dispatch createParticles action"},
				 {id: "32", from: "reducer", to: "reducer", msg: "run action"},
				 {id: "33", from: "reducer", to: "store", msg: "return new state with particles"},
				 {id: "34", from: "ticker", to: "ticker", msg: "run particles listeners"},
				 {id: "35", from: "renderer", to: "UI", msg: "render particles"},
			],			
}
function reducerConfig(state = initialStateConfig, action) {
	if (action == null) return state
	var ActionTypes = d3ringsActions.ActionTypes
    switch (action.type) {
					default:
            return state;
	}
}

exports.reducerConfig = reducerConfig;
}));
