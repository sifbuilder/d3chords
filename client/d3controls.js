/* 																	*/
/* 				d3controls.js   					*/
/* 																	*/

if (typeof require === "function") {
	var d3 = require('./d3.v4.0.0-alpha.40.js')
}	

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.d3lanesControls = global.d3lanesControls || {})));
}(this, function (exports) { 'use strict';


/*  -------------          */
/*    stepControls        */
/*  -------------          */
	function stepControls(store) {
	
		var store = store
		var currentListeners = []
		var nextListeners = currentListeners

		// ______________________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			
		
		// ____________________ tc
		function tc() {}
		
		// ____________________ start
		tc.start = function start() {
					var periodFactor = store.getState().configReducer.periodFactor					
					var beatTime = store.getState().configReducer.beatTime				
					var periodTime = periodFactor	* beatTime // items added						
							
					var itemSpan = store.getState().configReducer.itemSpan
							
					var tickspan = store.getState().configReducer.tickspan
					var vLow = store.getState().lanesReducer.messagesCursorLow
					var vHigh = store.getState().lanesReducer.messagesCursorHigh

					var tf = setInterval(function() {
						
						var currentMode = store.getState().courtReducer.currentMode
																	
						var listeners = currentListeners = nextListeners
						for (var i = 0; i < listeners.length; i++) {
							listeners[i]()
						}									
					}, periodTime)
					
					return tc
			}
		// ______________________________ subscribe
	 tc.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}

			var isSubscribed = true

			ensureCanMutateNextListeners()
			nextListeners.push(listener)

			return tc
		}
		
		return tc
}		

/*  -------------          */
/*    tickControls        */
/*  -------------          */
	function tickControls(store) {
	
		var store = store
		var currentListeners = []
		var nextListeners = currentListeners

		// ______________________________ ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			
		
		// ____________________ tc
		function tc() {}
		
		// ____________________ start
		tc.start = function start() {
			// Anatomy of a video game
			// Misuse of the requestAnimationFrme()
					var started = false
					var rfps = 60
					var last = performance.now()
					var timestamp = 0
					var ticker = function(timestamp) {
						window.requestAnimationFrame(ticker)
					
						if (timestamp != undefined) rfps = rfps * 0.9 + (1000/(timestamp-last)) * 0.1
						if (timestamp != undefined) last = timestamp						
						while( performance.now() - timestamp < 17 ) {}
						var fps = parseFloat(Math.round(rfps * 100) / 100).toFixed(0)							
						store.dispatch(actions.setFps(fps))
							
						var listeners = currentListeners = nextListeners
						for (var i = 0; i < listeners.length; i++) {
							listeners[i]()
						}
					}
					if (!started) {
						started = true
						ticker()	
					}
					return tc
			}
		// ______________________________ subscribe
	 tc.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}

			var isSubscribed = true

			ensureCanMutateNextListeners()
			nextListeners.push(listener)

			return tc
		}

		return tc
}		
		

/*  -------------          */
/*    mouseControls        */
/*  -------------          */
	function mouseControls(store) {
		var store = store

		// ____________________ mouseEventsActions
			var mousedown = function mousedown(svg) {

// console.log("event: ", d3.event)
				// var e = window.event;
				var e = d3.event
				pauseEvent(e);

				function pauseEvent(e){
						if(e.stopPropagation) e.stopPropagation();
						if(e.preventDefault) e.preventDefault();
						e.cancelBubble=true;
						e.returnValue=false;
						return false;
				}			
			
				var coords  = d3.mouse(svg);
				store.dispatch(actions.updateMousePos(coords[0], coords[1]))
				store.dispatch(actions.startParticles())
				store.dispatch(actions.createParticles({
						particlesPerTick: store.getState().particlesReducer.particlesPerTick,
						x: coords[0], 
						y: coords[1],
						xInit: 0, 
						xEnd: store.getState().courtReducer.svgWidth, 
						randNormal: store.getState().configReducer.randNormal,
						randNormal2: store.getState().configReducer.randNormal2,
						lanes: store.getState().lanesReducer.lanes,
				}))
			}
			var touchstart = function touchstart(svg) {
				var coords  = d3.mouse(svg);
				store.dispatch(actions.updateTouchPos(coords[0], coords[1]))
				store.dispatch(actions.startParticles())
				store.dispatch(actions.createParticles({
						particlesPerTick: store.getState().particlesReducer.particlesPerTick,
						x: coords[0], 
						y: coords[1],
						xInit: 0, 
						xEnd: store.getState().courtReducer.svgWidth, 
						randNormal: store.getState().configReducer.randNormal,
						randNormal2: store.getState().configReducer.randNormal2,
						lanes: store.getState().lanesReducer.lanes,
				}))
			}
			var mousemove = function mousemove(svg) {
				var coords  = d3.mouse(svg);
				store.dispatch(actions.updateMousePos(coords[0], coords[1]))
				var generating = store.getState().particlesReducer.particlesGenerating
				if (generating === true) {

					store.dispatch(actions.createParticles({
							particlesPerTick: store.getState().particlesReducer.particlesPerTick,
							x: coords[0], 
							y: coords[1],
							xInit: 0, 
							xEnd: store.getState().courtReducer.svgWidth, 
							randNormal: store.getState().configReducer.randNormal,
							randNormal2: store.getState().configReducer.randNormal2,
							lanes: store.getState().lanesReducer.lanes,
					}))
				}
			}
			var touchmove = function touchmove(svg) {
				var coords  = d3.mouse(svg);
				store.dispatch(actions.updateTouchPos(coords[0], coords[1]))
			}	
			var mouseup = function mouseup(svg) {
				store.dispatch(actions.stopParticles())
				var generating = store.getState().particlesReducer.particlesGenerating
			}	
			var touchend = function touchend(svg) {
				store.dispatch(actions.stopParticles())
			}	
			var mouseleave = function mouseleave(svg) {
				store.dispatch(actions.stopParticles())
			}		

		// ____________________ controlfn
	  function controlfn() {
 		}
			// ____________________ startMouseEvents
		controlfn.startMouseEvents = function startMouseEvents(svg) {
					svg.on('mousedown', 	function() {mousedown(this)})
					svg.on('touchstart', 	function() {touchstart(this)})
					svg.on('mousemove', 	function() {mousemove(this)})
					svg.on('touchmove', 	function() {touchmove(this)})
					svg.on('mouseup', 		function() {mouseup(this)})
					svg.on('mouseleave', 	function() {mouseleave(this)})
					svg.on('mouseleave', 	function() {mouseleave(this)})
		}

	return controlfn
		
}

/*  -------------          */
/*    kbdControls        */
/*  -------------          */
function kbdControls(store) {
		var store = store
	
		// ____________________ handleKeyDown
		// https://www.kirupa.com/html5/keyboard_events_in_javascript.htm
		// https://github.com/gaearon/redux-devtools-dock-monitor
		var handleKeyDown = function handleKeyDown(e) {
			e.stopPropagation();
			e.preventDefault();			
			
			store.dispatch(actions.setKeybKey(e.keyCode))
			var keys = 	store.getState().courtReducer.keys
			
			// keys[e.keyCode] = true;
			if (keys[70] && keys[17])										fKeyCtrl()		// change currentView
				else if (keys[68] && keys[17])						dKeyCtrl()		// change debugMode
				else if (e.keyCode == '37' && !keys[17]) leftArrow()		// change currentMode autoMode/walkMode
				else if (e.keyCode == '37' &&  keys[17]) leftArrowCtrl() // change width
				else if (e.keyCode == '39' && !keys[17]) rightArrow()		// change currentMode
				else if (e.keyCode == '39' &&  keys[17]) rightArrowCtrl()	// change width
				else if (e.keyCode == '38' && !keys[17]) upArrow()			// change currentMode nextWalk
				else if (e.keyCode == '38' &&  keys[17]) upArrowCtrl()	// change height
				else if (e.keyCode == '40' && !keys[17]) downArrow()		// change currentMode		
				else if (e.keyCode == '40' &&  keys[17]) downArrowCtrl()	// change height	
		}	
		// ____________________ downArrowCtrl
		var downArrowCtrl = function downArrowCtrl() {
				store.dispatch(actions.resizeHeight(+10))
		}
			// ____________________ fKeyCtrl
		var fKeyCtrl = function fKeyCtrl() {		// change view
				// // Ctrl 17 + Shift 16  + f 70
				var views = Object.keys(store.getState().configReducer.views)
				var idx = views.indexOf(store.getState().courtReducer.currentView)
				var newIdx = idx + 1 % views.length
				var newview = store.getState().configReducer.views[views[newIdx]]
				store.dispatch(actions.setView(newview))
		}
			// ____________________ dKeyCtrl
		var dKeyCtrl = function dKeyCtrl() {		// change debug mode
				// // Ctrl 17 + Shift 16  + d 68
				store.dispatch(actions.switchDebugMode())
		}
		// ____________________ matchesKey
			function matchesKey(key, event) {
				if (!key) return false
				const charCode = event.keyCode || event.which;
				const char = String.fromCharCode(charCode);
				return key.name.toUpperCase() === char.toUpperCase() &&
					key.alt === event.altKey &&
					key.ctrl === event.ctrlKey &&
					key.meta === event.metaKey &&
					key.shift === event.shiftKey;
			}
		// ____________________ handleKeyPressed
		var handleKeyPressed = function handleKeyPressed(e) {
		}			
		// ____________________ handleKeyReleased
		var handleKeyReleased = function handleKeyReleased(e) {
				store.dispatch(actions.releaseKeybKey(e.keyCode))
		}	
		// ____________________ keysEventsActions
		// arrows up/down => currentMode walkMode
		// arrow right => currentMode autoMode
		// arrow left => currentMode walkMode
		
		// ____________________ leftArrow
			var leftArrow = function leftArrow() { // set currentMode walkMode
				var currentMode = 'walkMode'
				store.dispatch(actions.setMode(currentMode))				
		}
		// ____________________ rightArrow
		var rightArrow = function rightArrow() {	// set currentMode autoMode
				var currentMode = 'autoMode'
				store.dispatch(actions.setMode(currentMode))				
		}
		// ____________________ upArrow
		var upArrow = function upArrow() {
			var currentMode = store.getState().courtReducer.currentMode
			if (currentMode == 'autoMode') {
				var newMode = 'walkMode'
				store.dispatch(actions.setMode(newMode))
			} else if (currentMode == 'walkMode') {

						var itemSpan = store.getState().configReducer.itemSpan
						store.dispatch(actions.walkUpRecords(itemSpan, currentMode))

			}
		}
		// ____________________ downArrow
		var downArrow = function downArrow() {
			var currentMode = store.getState().courtReducer.currentMode
			if (currentMode == 'autoMode') {
				var newMode = 'walkMode'
				store.dispatch(actions.setMode(newMode))
			} else if (currentMode == 'walkMode') {

					var itemSpan = store.getState().configReducer.itemSpan
					store.dispatch(actions.walkDownRecords(itemSpan, currentMode))

			}
		}
		// ____________________ leftArrowCtrl
		var leftArrowCtrl = function leftArrowCtrl() {
			console.log("leftArrowCtrlFn")
			store.dispatch(actions.resizeWidth(-10))
		}
		// ____________________ rightArrowCtrl
		var rightArrowCtrl = function rightArrowCtrl() {
			console.log("rightArrowCtrlFn")
			store.dispatch(actions.resizeWidth(10))
		}
		// ____________________ upArrowCtrl
		var upArrowCtrl = function upArrowCtrl() {
			console.log("upArrowCtrlFn")
			store.dispatch(actions.resizeWidth(-10))
		}
		// ____________________ controlfn
	  function controlfn() {
 		}
		// ____________________ startKeysEvents
		controlfn.startKeybKeyEvents = function startKeybKeyEvents() {
			store.dispatch(actions.startKeybKeyEvents())
			document.addEventListener("keydown", handleKeyDown, false);
			document.addEventListener("keypress", handleKeyPressed, false);
			document.addEventListener("keyup", handleKeyReleased, false);
		}

	return controlfn
}

/* ================================= */
/*            posControls            */
/* ================================= */
 function posControls (scope) {		// selection
		var dName = 'pos'
		var aTypes = {
			start: 	dName + 'start', // tipstart
			move: 	dName + 'move',	// tipmove
			end: 	dName + 'end'	// tipend
		}	
		var aTypesList = Object.keys(aTypes).map(function(k){return aTypes[k]})
		var qaTypesList = aTypesList.map(function(k){return k + "." + dName})
		// ______________________________ fnCallbacks
		var fnCallbacks = {}
		for (var i = 0; i < aTypesList.length; i++) {
			fnCallbacks[aTypesList[i]] = function(action) {}
		}
		// ______________________________ start pos
		fnCallbacks[aTypes.start] = function(action) {
			var node = d3.select(this)		// selection
			var datum = node.datum()		// datum
		}
		// ______________________________ move pos
		fnCallbacks[aTypes.move] = function(action) {
			var node = d3.select(this)		// selection

			// node.on("mousemove.tip", null)
		
			createTextPad(action)
			displayTextPad(action)
			moveTextPad(action)

			function createTextPad(a) {
				var textPadDiv = d3.select("body")
					.selectAll("div.postip")
					.data(['divMousePos'])
					.enter()
						.append("div")
						.attr("class", "postip")
						.attr("viewBox", "0 0 10 10")
						.style("top", "-5px")
						.style("position", "absolute")
						.style("padding", "10px")
						.style("background", "rgba(255, 255, 255, .90)")
						.style("border", "1px solid lightgray")
						.style("pointer-events", "none")
						.style("z-index", "100")
						.style('border', '1px solid red')
						.style('color', 'grey')		
						.classed('postip-hidden', true)
						.style("opacity", 0)
			}

			function textPadFn (a) { 
					var s = String("|_____" + a.ox + " " + a.oy + "_____|")
					return s
			}

			// https://github.com/1wheel/swoopy-drag/blob/master/lib/d3-jetpack.js
			function displayTextPad(a) {
				d3.select('.postip')
					.classed('postip-hidden', false)
					.style('opacity', 1)
					.html('')
					.selectAll('div')
						.data([textPadFn]).enter()
							.append('div')				
								.html(function(textPadFn) {
									return (textPadFn(a))
							})
			}
			
			function moveTextPad() {
				var postip = d3.select('div.postip')
				if (!postip.size()) return
				var e = d3.event,
					x = e.clientX,
					y = e.clientY,
					doctop = (window.scrollY)? window.scrollY : (document.documentElement && document.documentElement.scrollTop)? document.documentElement.scrollTop : document.body.scrollTop,
					n = postip.node(),
					nBB = n.getBoundingClientRect()
					postip.style('top', (y+doctop-nBB.height-18)+"px");
					postip.style('left', Math.min(Math.max(0, (x-nBB.width/2)), window.innerWidth - nBB.width)+"px");
			}				
		}
		// ______________________________ end pos
		fnCallbacks[aTypes.end] = function(action) {
			var node = d3.select(this)		// selection
			var datum = node.datum()		// datum
		
			d3.select('div.postip')
				.classed('postip-hidden', true)
				.style('opacity', 0)
			d3.selectAll('.postipped')
				.classed('postipped', false)
		}
		// ______________________________ dispatcher
		var d3_event = d3.dispatch.apply(null, aTypesList)
		for (var i=0; i < qaTypesList.length; i++) {
				d3_event.on(qaTypesList[i], fnCallbacks[aTypesList[i]])
		}		
		d3_event.of = function(thiz, argumentz) {
			return function(e1) {
					d3_event.call(e1.type, thiz, e1)
			}
		}
		// ______________________________ started
		function started(d, i, nodes) {
			var datum = d,								// d datum
					node = this, 							// elem
					parent = node.parentNode,
					origin = d3.mouse(parent),
					ox = origin[0],
					oy = origin[1]

			var context = d3.select(d3_window(node))	// selection
			var a = {
					type: aTypes.start,
					ox: ox,
					oy: oy
			}
			d3_event.of(node)(a)	
		}
		// ______________________________ moved
		function moved(d, i, nodes) {
			var datum = d,								// d datum
					node = this, 							// elem
					parent = node.parentNode,
					origin = d3.mouse(parent),
					ox = origin[0],
					oy = origin[1]

			var context = d3.select(d3_window(node))	// selection
			var a = {
					type: aTypes.move,
					ox: ox,
					oy: oy
			}
			d3_event.of(node)(a)	
		}
		// ______________________________ ended
		function ended(d, i, nodes) {
		
			var datum = d,					// d datum
					node = this, 			// elem
					parent = node.parentNode,
					origin = d3.mouse(parent)

			var a = {
					type: aTypes.end
			}
			d3_event.of(node)(a)	
		}
		// ______________________________ lib
		function prevent() {
			event.preventDefault();
		}
		function d3_window(node) {
			return node && (node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView);
		}
		// ______________________________
		function d3Control(scope) {
				scope.on("mouseenter.pos", started)	
				scope.on("mousemove.pos", moved)
				scope.on("mouseout.pos", ended)	

		}
		d3Control.on = function() {
			var value = d3_event.on.apply(d3_event, arguments);
			return value === d3_event ? d3Control : value;
		}
		return d3Control
}		



/* ================================= */
/*            tipControls            */
/* ================================= */
function tipControls (scope) {		// selection
		var dName = 'tip'
		var aTypes = {
				start: 	dName + 'start', // tipstart
				move: 	dName + 'move',	// tipmove
				end: 	dName + 'end'	// tipend
			}	
		var aTypesList = Object.keys(aTypes).map(function(k){return aTypes[k]})
		var qaTypesList = aTypesList.map(function(k){return k + "." + dName})
		// ______________________________ fnCallbacks
		var fnCallbacks = {}
			for (var i = 0; i < aTypesList.length; i++) {
				fnCallbacks[aTypesList[i]] = function(action) {}
		}		
		// ______________________________ start tip
		fnCallbacks[aTypes.start] = function(action) {
			var node = d3.select(this)		// selection
			var datum = node.datum()		// datum
		
			createTooltip(action)
			displayTooltip(action)
			moveMoveTooltip(action)
		
			function createTooltip() {
				var tipDiv = d3.select("body")
					.selectAll("div.tooltip")
					.data(['divTooltip'])
					.enter()
					.append("div")
					.attr("class", "tooltip")
					.attr("viewBox", "0 0 10 10")
					.style("top", "-5px")
					.style("position", "absolute")
					.style("padding", "10px")
					.style("background", "rgba(255, 255, 255, .90)")
					.style("border", "1px solid lightgray")
					.style("pointer-events", "none")
					.style("z-index", "100")
					.style('border', '1px solid red')
					.style('color', 'grey')		
					.classed('tooltip-hidden', true)
					.style("opacity", 0)
			}

			// https://github.com/1wheel/swoopy-drag/blob/master/lib/d3-jetpack.js
			function displayTooltip() {
				var d = action.datum
				var fieldFns = d3.keys(d)
					.filter(function(str){
						var r = (typeof d[str] != 'object') && (d[str] != 'array')
						return r
				})
				.map(function(str){
						return function (d) { return str + ': ' + '<b>' + d[str] + '</b>' }})
						var tipfn = function(action) { 
							var s = String(action.datum.tip || action.datum.id || 'tip')
							return wordwrap(s, 20)
					}
					
				d3.select('.tooltip')
					.classed('tooltip-hidden', false)
					.style('opacity', 1)
					.html('')
					.selectAll('div')
						.data(fieldFns).enter()
							.append('div')				
									.html(function(fieldFns) {
												return (fieldFns(d))
											})
					}
				function moveMoveTooltip() {
					var tooltip = d3.select('.tooltip')
					if (!tooltip.size()) return
					var e = d3.event,
						x = e.clientX,
						y = e.clientY,
						doctop = (window.scrollY)? window.scrollY : (document.documentElement && document.documentElement.scrollTop)? document.documentElement.scrollTop : document.body.scrollTop,
						n = tooltip.node(),
						nBB = n.getBoundingClientRect()
						tooltip.style('top', (y+doctop-nBB.height-18)+"px");
						tooltip.style('left', Math.min(Math.max(0, (x-nBB.width/2)), window.innerWidth - nBB.width)+"px");
				}				
			
			function wordwrap (line, maxCharactersPerLine) {
					var w = line.split(' '),
							lines = [],
							words = [],
							maxChars = maxCharactersPerLine || 40,
							l = 0;
					w.forEach(function(d) {
							if (l+d.length > maxChars) {
									lines.push(words.join(' '));
									words.length = 0;
									l = 0;
							}
							l += d.length;
							words.push(d);
					});
					if (words.length) {
							lines.push(words.join(' '));
					}
					return lines;
			}
		}
		// ______________________________ move tip
		fnCallbacks[aTypes.move] = function(action) {
				var node = d3.select(this)		// selection
				var datum = node.datum()		// datum
		}
		// ______________________________ end tip
		fnCallbacks[aTypes.end] = function(action) {
			var node = d3.select(this)		// selection
			var datum = node.datum()		// datum
		
			d3.select('.tooltip')
				.classed('tooltip-hidden', true)
				.style('opacity', 0)
			d3.selectAll('.tooltipped')
				.classed('tooltipped', false)
		}
		// ______________________________ dispatcher
		var d3_event = d3.dispatch.apply(null, aTypesList)
		for (var i=0; i < qaTypesList.length; i++) {
				d3_event.on(qaTypesList[i], fnCallbacks[aTypesList[i]])
		}		
		d3_event.of = function(thiz, argumentz) {
			return function(e1) {
					d3_event.call(e1.type, thiz, e1)
			}
		}
		// ______________________________ started tip
		function started(d, i, nodes) {
			var datum = d,								// d datum
					node = this, 							// elem
					parent = node.parentNode,
					origin = d3.mouse(parent),
					ox = d.x - origin[0] || 0,
					oy = d.y - origin[1] || 0,
					tiped = false

			var context = d3.select(d3_window(node))	// selection
			var a = {
					type: aTypes.start,
					datum: d
			}
			d3_event.of(node)(a)	
		}
		// ______________________________ ended tip
		function ended(d, i, nodes) {
		
			var datum = d,					// d datum
					node = this, 			// elem
					parent = node.parentNode,
					origin = d3.mouse(parent),
					ox = d.x - origin[0] || 0,
					oy = d.y - origin[1] || 0,
					tiped = false				

			var a = {
					type: aTypes.end,
			}
			d3_event.of(node)(a)	
		}
		// ______________________________ lib
		function prevent() {
			event.preventDefault();
		}
		function d3_window(node) {
			return node && (node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView);
		}
		// ______________________________
		function d3Control(scope) {
			scope.each(function() {
				scope.on("mousemove.tip", started)	
				scope.on("mouseout.tip", ended)	
			})
		}
		d3Control.on = function() {
			var value = d3_event.on.apply(d3_event, arguments);
			return value === d3_event ? d3Control : value;
		}
		return d3Control
}		


/* ================================= */
/*            dragControls            */
/* ================================= */
// https://github.com/d3/d3-drag/blob/master/src/drag.js
 function dragControls (scope) {	

		function prevent() {
			event.preventDefault();
		}

		function d3_window(node) {
			return node && (node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView);
		}

		var scope = scope	// selection
 			
		var dName = 'drag'
		var aTypes = {
				start: 	dName + 'start', // dragstart
				move: 	dName + 'move',	// dragmove
				end: 		dName + 'end'		// dragend
			}	
		var aTypesList = Object.keys(aTypes).map(function(k){return aTypes[k]})
		var qaTypesList = aTypesList.map(function(k){return k + "." + dName})

		var fnCallbacks = {}
			for (var i = 0; i < aTypesList.length; i++) {
				fnCallbacks[aTypesList[i]] = function(action) {}
		}		
	
		// ______________________________ dragend
		fnCallbacks[aTypes.end] = function(action) {
			var node = d3.select(this)
			node.datum().dx1 = action.dx1
			node.datum().dy1 = action.dy1
		}
		
		// ______________________________ dragmove
		fnCallbacks[aTypes.move] = function(action) {						
				var node = d3.select(this)
				node
					.attr("transform", "translate(" + action.dx1 + "," + action.dy1 + ")")
			}
		// ______________________________ dispatcher
		var d3_event = d3.dispatch.apply(null, aTypesList)
		for (var i=0; i < qaTypesList.length; i++) {
				d3_event.on(qaTypesList[i], fnCallbacks[aTypesList[i]])
		}		
		d3_event.of = function(thiz, argumentz) {
			return function(e1) {
					d3_event.call(e1.type, thiz, e1)
			}
		}
		// ______________________________ listener
		function started(d, i, nodes) {
					var node = this, 
							parent = node.parentNode,
							origin = d3.mouse(parent),
							ox = d.x - origin[0] || 0,
							oy = d.y - origin[1] || 0,
							dragged = false
							
					var context = d3.select(d3_window(node))
										.on("dragstart.drag", prevent)
										.on("selectstart.drag", prevent)
										.on("mouseup", ended)
										.on("mousemove", moved)
							
							
					var emit = d3_event.of(node, arguments)
						
		// ______________________________ when moved
					function moved() {
							var p = d3.mouse(parent)											
											
							var a = {
										type: aTypes.move,
										x0: origin[0] + ox,	// first x
										y0: origin[1] + oy,
										x1: p[0] + ox,		// new x position
										y1: p[1] + oy,
										dx: p[0] - origin[0],		// delta x
										dy: p[1] - origin[1],
										dx1: (d.dx1 || 0) + p[0] - origin[0], // aggregated delta x
										dy1: (d.dy1 || 0)  + p[1] - origin[1]
								}
								emit(a)
					}
					
		// ______________________________ when ended
					function ended() {
								context.on("mousemove", null)
											.on("mouseup", null);

								var p = d3.mouse(parent)
								var a = {
										type: aTypes.end,
										x0: origin[0] + ox,	// first x
										y0: origin[1] + oy,
										x1: p[0] + ox,		// new x position
										y1: p[1] + oy,
										dx: p[0] - origin[0],		// delta x
										dy: p[1] - origin[1],
										dx1: (d.dx1 || 0) + p[0] - origin[0], // aggregated delta x
										dy1: (d.dy1 || 0)  + p[1] - origin[1]
								}
								emit(a)
					}
					function afterended() {
							context.on("click.drag", null);
					}					
		}
		
	  function drag(selection) {
      selection.on("mousedown.drag", started)	
		}
	  drag.on = function() {
			var value = d3_event.on.apply(d3_event, arguments);
			return value === d3_event ? drag : value;
		};

		return drag;			
}		
		
exports.stepControls = stepControls
exports.tickControls = tickControls
exports.mouseControls = mouseControls
exports.kbdControls = kbdControls
exports.dragControls = dragControls
exports.posControls = posControls
exports.tipControls = tipControls
}));		
