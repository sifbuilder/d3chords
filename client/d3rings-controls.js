/* 																	*/
/* 				d3rings-controls.js   		*/
/* 																	*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-alpha.44.js')
}	

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3ringsControls = global.d3ringsControls || {})));
}(this, function (exports) { 'use strict';

/*  -------------          */
/*    stepControls        */
/*  -------------          */
	function stepControls(store, actions) {
	
		var store = store
		var currentListeners = []
		var nextListeners = currentListeners

		// ____________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			
		
		// ____________________ stepper
		function stepper() {}
		
		// ____________________ start
		stepper.start = function start() {
					var periodFactor = store.getState().reducerConfig.periodFactor					
					var beatTime = store.getState().reducerConfig.beatTime				
					var periodTime = periodFactor	* beatTime // items added						
							
					var itemSpan = store.getState().reducerConfig.itemSpan
							
					var tickspan = store.getState().reducerConfig.tickspan
					var vLow = store.getState().reducerLanes.messagesCursorLow
					var vHigh = store.getState().reducerLanes.messagesCursorHigh

					var tickfn = setInterval(function() {
						
						var currentMode = store.getState().reducerCourt.currentMode
																	
						var listeners = currentListeners = nextListeners
						for (var i = 0; i < listeners.length; i++) {
							listeners[i]()
						}									
					}, periodTime)
					
					return stepper
			}
		// ____________________ subscribe
	 stepper.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}
			var isSubscribed = true
			ensureCanMutateNextListeners()
			nextListeners.push(listener)
			// return stepper

			return function unsubscribe() {
				if (!isSubscribed) {
					return
				}

				isSubscribed = false

				ensureCanMutateNextListeners()
				var index = nextListeners.indexOf(listener)
				nextListeners.splice(index, 1)
			}

		}
		return stepper
}		

/*  -------------          */
/*    tickControls        */
/*  -------------          */
	function tickControls(store, actions) {
	
		var store = store
		var currentListeners = []
		var nextListeners = currentListeners

		// ____________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			
		
		// ____________________ ticker
		function ticker() {}
		
		// ____________________ start
		ticker.start = function start() {
				var started = false
				var main = function(timestamp) {
					window.requestAnimationFrame(main)
					
					var listeners = currentListeners = nextListeners
					for (var i = 0; i < listeners.length; i++) {
						listeners[i]()
					}
				}
				if (!started) {
					started = true
					main()	
				}
				return ticker
			}
		// ____________________ subscribe
	 ticker.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}
			var isSubscribed = true
			ensureCanMutateNextListeners()
			nextListeners.push(listener)

			return function unsubscribe() {
				if (!isSubscribed) {
					return
				}

				isSubscribed = false

				ensureCanMutateNextListeners()
				var index = nextListeners.indexOf(listener)
				nextListeners.splice(index, 1)
			}
		}
		return ticker
}		

/*  -------------       		   */
/*    mouseDownControls        */
/*  -------------       		   */
	function mouseDownControl(store, actions) {
		var store = store
		var currentListeners = []
		var nextListeners = currentListeners

	// ____________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			

		function pauseEvent(e){
						if(e.stopPropagation) e.stopPropagation();
						if(e.preventDefault) e.preventDefault();
						e.cancelBubble=true;
						e.returnValue=false;
						return false;
				}			

		function controlAction(svg) {
				var e = d3.event
				pauseEvent(e)
				
				var listeners = currentListeners = nextListeners
				for (var i = 0; i < listeners.length; i++) {
					listeners[i](svg)
				}									
		}

		// ____________________ controlApi
		function controlApi() {}
		
		// ____________________ start
		controlApi.start = function start(svg) {
					svg.on('mousedown', 	function() {controlAction(this)})
					return controlApi
		}
		// ____________________ subscribe
		controlApi.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}
			var isSubscribed = true
			ensureCanMutateNextListeners()
			nextListeners.push(listener)
			// return controlApi
			return function unsubscribe() {
				if (!isSubscribed) {
					return
				}

				isSubscribed = false

				ensureCanMutateNextListeners()
				var index = nextListeners.indexOf(listener)
				nextListeners.splice(index, 1)
			}
			
		}
		
		return controlApi
	}

	/*  -------------       		   */
/*    touchStartControls        */
/*  -------------       		   */
	function touchStartControl(store, actions) {
		var store = store
		var currentListeners = []
		var nextListeners = currentListeners

	// ____________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			

		function pauseEvent(e){
				if(e.stopPropagation) e.stopPropagation();
				if(e.preventDefault) e.preventDefault();
				e.cancelBubble=true;
				e.returnValue=false;
				return false;
		}			

		function controlAction(svg) {
				var e = d3.event
				pauseEvent(e)
				
				var listeners = currentListeners = nextListeners
				for (var i = 0; i < listeners.length; i++) {
					listeners[i](svg)
				}									
		}

		// ____________________ controlApi
		function controlApi() {}
		
		// ____________________ start
		controlApi.start = function start(svg) {
					svg.on('touchstart', 	function() {controlAction(this)})
					return controlApi
		}
		// ____________________ subscribe
	 controlApi.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}
			var isSubscribed = true
			ensureCanMutateNextListeners()
			nextListeners.push(listener)
			// return controlApi
						return function unsubscribe() {
				if (!isSubscribed) {
					return
				}

				isSubscribed = false

				ensureCanMutateNextListeners()
				var index = nextListeners.indexOf(listener)
				nextListeners.splice(index, 1)
			}

		}
		
		return controlApi
	}
		

/*  -------------       		   */
/*    mouseMoveControls        */
/*  -------------       		   */
	function mouseMoveControl(store, actions) {
		var store = store
		var currentListeners = []
		var nextListeners = currentListeners

	// ____________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			

		function pauseEvent(e){
						if(e.stopPropagation) e.stopPropagation();
						if(e.preventDefault) e.preventDefault();
						e.cancelBubble=true;
						e.returnValue=false;
						return false;
				}			

		function controlAction(svg) {
				var e = d3.event
				pauseEvent(e)
				
				var listeners = currentListeners = nextListeners
				for (var i = 0; i < listeners.length; i++) {
					listeners[i](svg)
				}									
		}

		// ____________________ controlApi
		function controlApi() {}
		
		// ____________________ start
		controlApi.start = function start(svg) {
					svg.on('mousemove', 	function() {controlAction(this)})
					return controlApi
		}
		// ____________________ subscribe
	 controlApi.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}
			var isSubscribed = true
			ensureCanMutateNextListeners()
			nextListeners.push(listener)
			return function unsubscribe() {
				if (!isSubscribed) {
					return
				}

				isSubscribed = false

				ensureCanMutateNextListeners()
				var index = nextListeners.indexOf(listener)
				nextListeners.splice(index, 1)
			}

		}
		
		return controlApi
	}		

/*  -------------       		   */
/*    touchMoveControls        */
/*  -------------       		   */
	function touchMoveControl(store, actions) {
		var store = store
		var currentListeners = []
		var nextListeners = currentListeners

	// ____________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			

		function pauseEvent(e){
						if(e.stopPropagation) e.stopPropagation();
						if(e.preventDefault) e.preventDefault();
						e.cancelBubble=true;
						e.returnValue=false;
						return false;
				}			

		function controlAction(svg) {
				var e = d3.event
				pauseEvent(e)
				
				var listeners = currentListeners = nextListeners
				for (var i = 0; i < listeners.length; i++) {
					listeners[i](svg)
				}									
		}

		// ____________________ controlApi
		function controlApi() {}
		
		// ____________________ start
		controlApi.start = function start(svg) {
					svg.on('touchmove', 	function() {controlAction(this)})
					return controlApi
		}
		// ____________________ subscribe
	 controlApi.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}
			var isSubscribed = true
			ensureCanMutateNextListeners()
			nextListeners.push(listener)
			// return controlApi
						return function unsubscribe() {
				if (!isSubscribed) {
					return
				}

				isSubscribed = false

				ensureCanMutateNextListeners()
				var index = nextListeners.indexOf(listener)
				nextListeners.splice(index, 1)
			}

		}
		
		return controlApi
	}		
/*  -------------       		   */
/*    mouseUpControls        */
/*  -------------       		   */
	function mouseUpControl(store, actions) {
		var store = store
		var currentListeners = []
		var nextListeners = currentListeners

	// ____________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			

		function pauseEvent(e){
						if(e.stopPropagation) e.stopPropagation();
						if(e.preventDefault) e.preventDefault();
						e.cancelBubble=true;
						e.returnValue=false;
						return false;
				}			

		function controlAction(svg) {
				var e = d3.event
				pauseEvent(e)
				
				var listeners = currentListeners = nextListeners
				for (var i = 0; i < listeners.length; i++) {
					listeners[i](svg)
				}									
		}

		// ____________________ controlApi
		function controlApi() {}
		
		// ____________________ start
		controlApi.start = function start(svg) {
					svg.on('mouseup', 	function() {controlAction(this)})
					return controlApi
		}
		// ____________________ subscribe
	 controlApi.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}
			var isSubscribed = true
			ensureCanMutateNextListeners()
			nextListeners.push(listener)
			// return controlApi
						return function unsubscribe() {
				if (!isSubscribed) {
					return
				}

				isSubscribed = false

				ensureCanMutateNextListeners()
				var index = nextListeners.indexOf(listener)
				nextListeners.splice(index, 1)
			}

		}
		
		return controlApi
	}		
/*  -------------       		   */
/*    touchEndControls        */
/*  -------------       		   */
	function touchEndControl(store, actions) {
		var store = store
		var currentListeners = []
		var nextListeners = currentListeners

	// ____________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			

		function pauseEvent(e){
						if(e.stopPropagation) e.stopPropagation();
						if(e.preventDefault) e.preventDefault();
						e.cancelBubble=true;
						e.returnValue=false;
						return false;
				}			

		function controlAction(svg) {
				var e = d3.event
				pauseEvent(e)
				
				var listeners = currentListeners = nextListeners
				for (var i = 0; i < listeners.length; i++) {
					listeners[i](svg)
				}									
		}
		// ____________________ controlApi
		function controlApi() {}
		
		// ____________________ start
		controlApi.start = function start(svg) {
					svg.on('touchend', 	function() {controlAction(this)})
					return controlApi
		}
		// ____________________ subscribe
	 controlApi.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}
			var isSubscribed = true
			ensureCanMutateNextListeners()
			nextListeners.push(listener)
			// return controlApi
						return function unsubscribe() {
				if (!isSubscribed) {
					return
				}

				isSubscribed = false

				ensureCanMutateNextListeners()
				var index = nextListeners.indexOf(listener)
				nextListeners.splice(index, 1)
			}

		}
		
		return controlApi
	}		
		
			
/*  -------------       		   */
/*    mouseLeaveControls        */
/*  -------------       		   */
	function mouseLeaveControl(store, actions) {
		var store = store
		var currentListeners = []
		var nextListeners = currentListeners

	// ____________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			

		function pauseEvent(e){
						if(e.stopPropagation) e.stopPropagation();
						if(e.preventDefault) e.preventDefault();
						e.cancelBubble=true;
						e.returnValue=false;
						return false;
				}			

		function controlAction(svg) {
				var e = d3.event
				pauseEvent(e)
				
				var listeners = currentListeners = nextListeners
				for (var i = 0; i < listeners.length; i++) {
					listeners[i](svg)
				}									
		}

		// ____________________ controlApi
		function controlApi() {}
		
		// ____________________ start
		controlApi.start = function start(svg) {
					svg.on('mouseleave', 	function() {controlAction(this)})
					return controlApi
		}
		// ____________________ subscribe
	 controlApi.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}
			var isSubscribed = true
			ensureCanMutateNextListeners()
			nextListeners.push(listener)
			// return controlApi
						return function unsubscribe() {
				if (!isSubscribed) {
					return
				}

				isSubscribed = false

				ensureCanMutateNextListeners()
				var index = nextListeners.indexOf(listener)
				nextListeners.splice(index, 1)
			}

		}
		
		return controlApi
	}	
		
/*  -------------       		   */
/*    mouseEnterControls        */
/*  -------------       		   */
	function mouseEnterControl(store, actions) {
		var store = store
		var currentListeners = []
		var nextListeners = currentListeners

	// ____________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			

		function pauseEvent(e){
						if(e.stopPropagation) e.stopPropagation();
						if(e.preventDefault) e.preventDefault();
						e.cancelBubble=true;
						e.returnValue=false;
						return false;
				}			

		function controlAction(svg) {
				var e = d3.event
				pauseEvent(e)
				
				var listeners = currentListeners = nextListeners
				for (var i = 0; i < listeners.length; i++) {
					listeners[i](svg)
				}									
		}

		// ____________________ controlApi
		function controlApi() {}
		
		// ____________________ start
		controlApi.start = function start(svg) {
					svg.on('mouseenter', 	function() {controlAction(this)})
					return controlApi
		}
		// ____________________ subscribe
	 controlApi.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}
			var isSubscribed = true
			ensureCanMutateNextListeners()
			nextListeners.push(listener)
			// return controlApi
						return function unsubscribe() {
				if (!isSubscribed) {
					return
				}

				isSubscribed = false

				ensureCanMutateNextListeners()
				var index = nextListeners.indexOf(listener)
				nextListeners.splice(index, 1)
			}

		}
		
		return controlApi
	}	
					

					
/*  -------------       		   */
/*    keyDownControl        */
/*  -------------       		   */
	function keyDownControl(store, actions) {
		var store = store
		var currentListeners = []
		var nextListeners = currentListeners

	// ____________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			

		function pauseEvent(e){
						if(e.stopPropagation) e.stopPropagation();
						if(e.preventDefault) e.preventDefault();
						e.cancelBubble=true;
						e.returnValue=false;
						return false;
		}			

		var controlAction = function controlAction(e) {
			pauseEvent(e)
			
			// store.dispatch(actions.setKeybKey(e.keyCode))
			// var keys = store.getState().reducerCourt.keys
			
			var listeners = currentListeners = nextListeners
			for (var i = 0; i < listeners.length; i++) {
				listeners[i](e)
			}									
		}

		// ____________________ controlApi
		function controlApi() {}
		
		// ____________________ start
		controlApi.start = function start() {
			document.addEventListener("keydown", controlAction, false)
						return controlApi
		}
		// ____________________ subscribe
		controlApi.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}
			var isSubscribed = true
			ensureCanMutateNextListeners()
			nextListeners.push(listener)
			// return controlApi
						return function unsubscribe() {
				if (!isSubscribed) {
					return
				}

				isSubscribed = false

				ensureCanMutateNextListeners()
				var index = nextListeners.indexOf(listener)
				nextListeners.splice(index, 1)
			}

		}
		
		return controlApi
	}	

/*  -------------       		   */
/*    keyReleaseControl        */
/*  -------------       		   */
	function keyReleaseControl(store, actions) {
		var store = store
		var currentListeners = []
		var nextListeners = currentListeners

	// ____________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			

		function pauseEvent(e){
				if(e.stopPropagation) e.stopPropagation();
				if(e.preventDefault) e.preventDefault();
				e.cancelBubble=true;
				e.returnValue=false;
				return false;
		}			

		var controlAction = function controlAction(e) {
			pauseEvent(e);
			// store.dispatch(actions.releaseKeybKey(e.keyCode))
			var listeners = currentListeners = nextListeners
			for (var i = 0; i < listeners.length; i++) {
				listeners[i](e)
			}									
		}

		// ____________________ controlApi
		function controlApi() {}
		
		// ____________________ start
		controlApi.start = function start() {
			document.addEventListener("keyup", controlAction, false)
						return controlApi
		}
		// ____________________ subscribe
		controlApi.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}
			var isSubscribed = true
			ensureCanMutateNextListeners()
			nextListeners.push(listener)
			// return controlApi
						return function unsubscribe() {
				if (!isSubscribed) {
					return
				}

				isSubscribed = false

				ensureCanMutateNextListeners()
				var index = nextListeners.indexOf(listener)
				nextListeners.splice(index, 1)
			}

		}
		
		return controlApi
	}						
					
/*  -------------       		   */
/*    keyPressControl        */
/*  -------------       		   */
	function keyPressControl(store, actions) {
		var store = store
		var currentListeners = []
		var nextListeners = currentListeners

	// ____________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			

		function pauseEvent(e){
				if(e.stopPropagation) e.stopPropagation();
				if(e.preventDefault) e.preventDefault();
				e.cancelBubble=true;
				e.returnValue=false;
				return false;
		}			

		var controlAction = function controlAction(e) {
			pauseEvent(e);				
			var listeners = currentListeners = nextListeners
			for (var i = 0; i < listeners.length; i++) {
				listeners[i]()
			}									
		}

		// ____________________ controlApi
		function controlApi() {}
		
		// ____________________ start
		controlApi.start = function start() {
			document.addEventListener("keypress", controlAction, false)
						return controlApi
		}
		// ____________________ subscribe
		controlApi.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}
			var isSubscribed = true
			ensureCanMutateNextListeners()
			nextListeners.push(listener)
			// return controlApi
						return function unsubscribe() {
				if (!isSubscribed) {
					return
				}

				isSubscribed = false

				ensureCanMutateNextListeners()
				var index = nextListeners.indexOf(listener)
				nextListeners.splice(index, 1)
			}

		}
		
		return controlApi
	}	
		

exports.keyDownControl = keyDownControl
exports.keyReleaseControl = keyReleaseControl

exports.mouseDownControl = mouseDownControl
exports.touchStartControl = touchStartControl
exports.mouseMoveControl = mouseMoveControl
exports.touchMoveControl = touchMoveControl
exports.mouseUpControl = mouseUpControl
exports.touchEndControl = touchEndControl
exports.mouseLeaveControl = mouseLeaveControl
exports.mouseEnterControl = mouseEnterControl

exports.stepControls = stepControls
exports.tickControls = tickControls

}));		
