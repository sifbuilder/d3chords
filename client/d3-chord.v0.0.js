// https://d3js.org/d3-chord/ Version 0.0.2. Copyright 2016 Mike Bostock.
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-path')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-array', 'd3-path'], factory) :
  (factory((global.d3 = global.d3 || {}),global.d3,global.d3));
}(this, function (exports,d3Array,d3Path) { 'use strict';

  var cos = Math.cos;
  var sin = Math.sin;
  var pi = Math.PI;
  var halfPi = pi / 2;
  var tau = pi * 2;
  var max = Math.max;

  function compareValue(compare) {
    return function(a, b) {
      return compare(
        a.source.value + a.target.value,
        b.source.value + b.target.value
      );
    };
  }

  function chord() {
    var padAngle = 0,
        sortGroups = null,
        sortSubgroups = null,
        sortChords = null;

    function chord(matrix, e_series, subjectByName, subjectByIndex) {
					if (e_series === undefined) {
console.log("^^^^^^^^^^^^^^^^^^^^^^^^^ matrix mode")					
							var n = matrix.length,
									groupSums = [],
									groupIndex = d3Array.range(n),
									subgroupIndex = [],
									chords = [],
									groups = chords.groups = new Array(n),
									subgroups = new Array(n * n),
									k,
									x,
									x0,
									dx,
									i,
									j;

							// Compute the sum.
							k = 0, i = -1; while (++i < n) {
								x = 0, j = -1; while (++j < n) {
									x += matrix[i][j];
								}
								groupSums.push(x);
								subgroupIndex.push(d3Array.range(n));
								k += x;
							}

							// Sort groups…
							if (sortGroups) groupIndex.sort(function(a, b) {
								return sortGroups(groupSums[a], groupSums[b]);
							});

							// Sort subgroups…
							if (sortSubgroups) subgroupIndex.forEach(function(d, i) {
								d.sort(function(a, b) {
									return sortSubgroups(matrix[i][a], matrix[i][b]);
								});
							});

							// Convert the sum to scaling factor for [0, 2pi].
							// TODO Allow start and end angle to be specified?
							// TODO Allow padding to be specified as percentage?
							k = max(0, tau - padAngle * n) / k;
							dx = k ? padAngle : tau / n;

							// Compute the start and end angle for each group and subgroup.
							// Note: Opera has a bug reordering object literal properties!
							x = 0, i = -1; while (++i < n) {
								x0 = x, j = -1; while (++j < n) {
									var di = groupIndex[i],
											dj = subgroupIndex[di][j],
											v = matrix[di][dj],
											a0 = x,
											a1 = x += v * k;
									subgroups[dj * n + di] = {
										index: di,
										subindex: dj,
										startAngle: a0,
										endAngle: a1,
										value: v
									};
								}
								groups[di] = {
									index: di,
									startAngle: x0,
									endAngle: x,
									value: groupSums[di]
								};
								x += dx;
							}

							// Generate chords for each (non-empty) subgroup-subgroup link.
							i = -1; while (++i < n) {
								j = i - 1; while (++j < n) {
									var source = subgroups[j * n + i],
											target = subgroups[i * n + j];
									if (source.value || target.value) {
										chords.push(source.value < target.value
												? {source: target, target: source}
												: {source: source, target: target});
									}
								}
							}
							
						return sortChords ? chords.sort(sortChords) : chords
							
					}
				else 
				// ==========================================================================================
					{
							 var e_m = e_series.length,
										e_n = subjectByName.keys().length,		// number of groups
										e_groupSums = {},
										e_groupIndex = [],
										e_subgroupIndex = [],
										e_chords = [],
										e_groups = [],
										e_subgroups = [],
										e_k,
										e_x,
										e_x0,
										e_dx,
										e_g,
										e_s
								
								e_k = 0, e_s = -1; while (++e_s < e_m) {	// actions
									e_k += e_series[e_s].weigh							// source slots
									e_k += 1																// target slots
								}
								
								e_k = max(0, tau - padAngle * e_n) / e_k;		// radians per slot
								e_dx = e_k ? padAngle : tau / e_n;					// radians per pad
							
								var e_subgroups = []
								e_x0 = e_x = 0, e_g = -1; while (++e_g < e_n) {			// for each group e_g
									var subject = subjectByIndex[e_g]									
									e_subgroups[e_g] = []
									e_x0 = e_x, e_s = -1; while (++e_s < e_m) {				// for each action e_s
										var action = e_series[e_s]											// set action

											if (subject.name === action.source.name					//       1 0
													&& subject.name !== action.target.name
												) {																					// if group is subject of action
													var v = action.weigh												// slots of action per source
													var a0 = e_x																// start action where we finished
													e_x = e_x + v * e_k													// end action per slots
													var a1 = e_x																// end action per slots
						
													var sg = Object.assign({}, action, {					// base subgroup on action
														index: action.source.index,							// set source group index
														subindex: action.target.index,					// set target group index
														startAngleSource: a0,
														endAngleSource: a1,
														value: v,															// set action value - weigh
												})
												e_subgroups[e_g].push(sg)										// add subgroup to group array
											}

											else if (subject.name === action.source.name					//       1 1
													&& subject.name === action.target.name
												) {																					// if group is subject of action
												var a0, a1, b0, b1
												var v = action.weigh												// slots of action per source
												var v1 = 1 
												a0 = e_x																// start action where we finished
												a1 = e_x += v * e_k												// end action per slots
												b0 = a1																	// start action where we finished
												b1 = e_x += v1 * e_k												// end action per slots
													var sg = Object.assign({}, action, {					// base subgroup on action
														index: action.source.index,							// set source group index
														subindex: action.target.index,					// set target group index
														startAngleSource: a0,
														endAngleSource: a1,
														startAngleTarget: b0,
														endAngleTarget: b1,
														value: v,															// set action value - weigh
												})
												e_subgroups[e_g].push(sg)										// add subgroup to group array
											}
											
											else if (subject.name !== action.source.name					//       0 1
													&& subject.name === action.target.name
												) {																						// if group is subject of action
												var a0, a1, b0, b1
												var v = 0															// slots of action per source
												var v1 = 1																	// slots of action per target
												a0 = e_x																// start action where we finished
												a1 = e_x += v * e_k												// end action per slots
												b0 = a1																// start action where we finished
												b1 = e_x += v1 * e_k												// end action per slots
													var sg = Object.assign({}, action, {					// base subgroup on action
														index: action.source.index,							// set source group index
														subindex: action.target.index,					// set target group index
														startAngleTarget: b0,
														endAngleTarget: b1,
														// value: v,															// set action value - weigh
												})
												e_subgroups[e_g].push(sg)										// add subgroup to group array
											}
											
												
									}
								
									e_groups[e_g] = {
										index: e_g,
										startAngle: e_x0,
										endAngle: e_x,
										value: e_groupSums[e_g],
										subgroups: e_subgroups[e_g],
									}
													
									e_x += e_dx									// increment angle with pad		
								}
								
								e_s = -1; while (++e_s < e_m) {												// for each actions e_s
									
									var actionThis = e_series[e_s]																				// action		
									var actionSourceGroup = 			e_groups[e_series[e_s].source.index]		// source group
									var actionTargetGroup = 			e_groups[e_series[e_s].target.index]		// target group
									
									var actionSubgroupsSource = 				e_groups[e_series[e_s].source.index].subgroups	// source subgroups
									var indexSource = actionSubgroupsSource.filter(function(d) {		// source subgroup
												return d.prx == actionThis.prx
									})[0]
									
									var actionSubgroupsTarget = 				e_groups[e_series[e_s].target.index].subgroups	// target subgroups
									var indexTarget = actionSubgroupsTarget.filter(function(d) {		// target subgroup
												return d.prx == actionThis.prx
									})[0]
									
									e_chords.push(
										{
											prx: actionThis.prx,
											predicate: actionThis.predicate,
											weigh: actionThis.weigh,
											source: {
												index: actionThis.source.index,
												subindex: indexSource.source.index,
												startAngle: indexSource.startAngleSource,
												endAngle: indexSource.endAngleSource,
												value: actionThis, 
											},
											target: {
												index: actionThis.target.index,
												subindex: indexSource.target.index,
												startAngle: indexTarget.startAngleTarget,
												endAngle: indexTarget.endAngleTarget,
												value: actionThis,
											}
										}
									)			
								}

						e_chords.groups = e_groups
						return sortChords ? e_chords.sort(sortChords) : e_chords;

				}
 			
    }

    chord.padAngle = function(_) {
      return arguments.length ? (padAngle = max(0, _), chord) : padAngle;
    };

    chord.sortGroups = function(_) {
      return arguments.length ? (sortGroups = _, chord) : sortGroups;
    };

    chord.sortSubgroups = function(_) {
      return arguments.length ? (sortSubgroups = _, chord) : sortSubgroups;
    };

    chord.sortChords = function(_) {
      return arguments.length ? (_ == null ? sortChords = null : (sortChords = compareValue(_))._ = _, chord) : sortChords && sortChords._;
    };

    return chord;
  }

  var slice = Array.prototype.slice;

  function constant(x) {
    return function() {
      return x;
    };
  }

  function defaultSource(d) {
    return d.source;
  }

  function defaultTarget(d) {
    return d.target;
  }

  function defaultRadius(d) {
    return d.radius;
  }

  function defaultStartAngle(d) {
    return d.startAngle;
  }

  function defaultEndAngle(d) {
    return d.endAngle;
  }

  function ribbon() {
    var source = defaultSource,
        target = defaultTarget,
        radius = defaultRadius,
        startAngle = defaultStartAngle,
        endAngle = defaultEndAngle,
        context = null;

    function ribbon() {
      var buffer,
          argv = slice.call(arguments),
          s = source.apply(this, argv),
          t = target.apply(this, argv),
          sr = +radius.apply(this, (argv[0] = s, argv)),
          sa0 = startAngle.apply(this, argv) - halfPi,
          sa1 = endAngle.apply(this, argv) - halfPi,
          sx0 = sr * cos(sa0),
          sy0 = sr * sin(sa0),
          tr = +radius.apply(this, (argv[0] = t, argv)),
          ta0 = startAngle.apply(this, argv) - halfPi,
          ta1 = endAngle.apply(this, argv) - halfPi;

      if (!context) context = buffer = d3Path.path();

      context.moveTo(sx0, sy0);
      context.arc(0, 0, sr, sa0, sa1);
      if (sa0 !== ta0 || sa1 !== ta1) { // TODO sr !== tr?
        context.quadraticCurveTo(0, 0, tr * cos(ta0), tr * sin(ta0));
        context.arc(0, 0, tr, ta0, ta1);
      }
      context.quadraticCurveTo(0, 0, sx0, sy0);
      context.closePath();

      if (buffer) return context = null, buffer + "" || null;
    }

    ribbon.radius = function(_) {
      return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), ribbon) : radius;
    };

    ribbon.startAngle = function(_) {
      return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), ribbon) : startAngle;
    };

    ribbon.endAngle = function(_) {
      return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), ribbon) : endAngle;
    };

    ribbon.source = function(_) {
      return arguments.length ? (source = _, ribbon) : source;
    };

    ribbon.target = function(_) {
      return arguments.length ? (target = _, ribbon) : target;
    };

    ribbon.context = function(_) {
      return arguments.length ? ((context = _ == null ? null : _), ribbon) : context;
    };

    return ribbon;
  }

  exports.chord = chord;
  exports.ribbon = ribbon;

  Object.defineProperty(exports, '__esModule', { value: true });

}));