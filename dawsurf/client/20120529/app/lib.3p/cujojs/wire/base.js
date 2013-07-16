/** @license MIT License (c) copyright B Cavalier & J Hann *//**
 * wire/base plugin
 * Base wire plugin that provides properties, init, and destroy facets, and
 * a proxy for plain JS objects.
 *
 * wire is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 */(function(a){a(["when"],function(a){function f(){}function g(a){return f.prototype=a,new f}function h(c,d,e,f){var g;return g=d[c],typeof g=="function"?a(f(e),function(a){return g.apply(d,b.call(a)=="[object Array]"?a:[a])}):g}function i(a,b){var c,e;c=a.target,e=a.options;if(typeof e=="string")return h(e,c,[],b);var f,g;f=[];for(g in e)f.push(h(g,c,e[g],b));return d(f)}function j(a,b){a.resolve(b.literal)}function k(b,d,e){var f,g;f=d.prototype,g=typeof f=="string"?e.resolveRef(f):e(f),a(g,function(a){var d=c(a);b.resolve(d)},b.reject)}function l(a,b,c){var e,f,g;f=[],e=b.options;for(g in e)f.push(m(b,g,e[g],c));d(f,a.resolve,a.reject)}function m(b,c,d,e){return a(e(d,c,b.path),function(a){b.set(c,a)})}function n(a,b,c){e(i(b,c),a)}function o(a){return{get:function(b){return a[b]},set:function(b,c){return a[b]=c,c},invoke:function(b,c){return typeof b=="string"&&(b=a[b]),b.apply(a,c)},destroy:function(){}}}function p(a,b){return b()}var b,c,d,e;return b=Object.prototype.toString,d=a.all,e=a.chain,c=Object.create||g,{wire$plugin:function(b,c){function e(a,b,c){var e,f,g;e=b.target,f=b.options,g=c,d.push(function(){return i({options:f,target:e},g)}),a.resolve()}var d=[];return a(c,function(){a.reduce(d,p,{})}),{factories:{literal:j,prototype:k},facets:{properties:{configure:l},init:{initialize:n},destroy:{ready:e}},proxies:[o]}}}})})(typeof define!="undefined"?define:function(a,b){this.wire_base=b(this.when)});