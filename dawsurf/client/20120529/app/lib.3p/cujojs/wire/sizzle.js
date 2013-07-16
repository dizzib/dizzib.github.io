/** @license MIT License (c) copyright B Cavalier & J Hann *//**
 * wire/sizzle plugin
 * Adds querySelectorAll functionality to wire using John Resig's Sizzle library.
 * Sizzle must be wrapped in an AMD define().  Kris Zyp has a version of this at
 * http://github.com/kriszyp/sizzle
 *
 * wire is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author John Hann (@unscriptable)
 */define(["sizzle","wire/domReady"],function(a,b){function c(c,d,e){b(function(){var b=a(d);typeof e.i=="number"?e.i<b.length?c.resolve(b[e.i]):c.reject(new Error("Query '"+d+"' returned "+b.length+" items while expecting at least "+(e.i+1))):c.resolve(b)})}var d={resolvers:{"dom.query":c}};return{wire$plugin:function(){return d}}});