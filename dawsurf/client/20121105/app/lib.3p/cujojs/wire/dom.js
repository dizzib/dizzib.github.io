/** @license MIT License (c) copyright B Cavalier & J Hann *//**
 * wire/dom plugin
 * wire plugin that provides a resource resolver for dom nodes, by id, in the
 * current page.  This allows easy wiring of page-specific dom references into
 * generic components that may be page-independent, i.e. makes it easier to write
 * components that can be used on multiple pages, but still require a reference
 * to one or more nodes on the page.
 *
 * wire is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 */define(["wire/domReady"],function(a){function b(b,c){a(function(){var a=document.getElementById(c);a?b.resolve(a):b.reject(new Error("No DOM node with id: "+c))})}function c(a,b){var c=a.className?" "+a.className+" ":"";b=b.split(/\s+/);for(var d=0,e=b.length;d<e;d++){var f=" "+b[d];c.indexOf(f+" ")<0&&(c+=f)}a.className=c.slice(1,c.length)}function d(a,b){var c=" "+a.className+" ";b=b.split(/\s+/);for(var d=0,e=b.length;d<e;d++){var f=" "+b[d]+" ";c=c.replace(f," ")}a.className=c.replace(/(^\s+|\s+$)/g,"")}function e(a,b,e){b&&c(a,b),e&&d(a,e)}var f={resolvers:{dom:b}};return{wire$plugin:function(b,c,d){var g,h;return h=d.classes,h&&(g=document.getElementsByTagName("html")[0],e(g,h.init),b.then(function(){e(g,h.ready,h.init)}),h.ready&&c.then(function(){e(g,null,h.ready)})),f}}});