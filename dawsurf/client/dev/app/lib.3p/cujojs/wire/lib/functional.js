(function(n){n(["when"],function(n){"use strict";var t=[].slice;function r(n,r){if(arguments.length==1){return n}r=t.call(arguments,1);return function(){return n.apply(this,r.concat(t.call(arguments)))}}function e(n,t){return function(){var r=Math.max(t.length||0,arguments.length,n.length);return n.apply(this,u(t,r,arguments))}}function u(n,r,e){var u=[],i;e=t.call(e);for(i=0;i<r;i++){if(i in n){u.push(n[i])}if(e.length>0){u.push(e.shift())}}return u}function i(n){if(arguments.length>1){n=t.call(arguments)}return function r(t){var r=this;return n.reduce(function(n,t){return t.call(r,n)},t)}}i.parse=function f(r,e,u){var f,o,c;if(typeof e!="string"){return u(e,function(n){return l(r,n)})}f=e.split(/\s*\|\s*/);o=u.resolveRef;c=u.getProxy;function l(n,t){return function(){return n.invoke(t,arguments)}}function a(e){var u,i;u=e.split(".");if(u.length>2){throw new Error('Only 1 "." is allowed in refs: '+e)}if(u.length>1){i=u[1];u=u[0];if(!u){return function(n){return n[i].apply(n,t.call(arguments,1))}}return n(c(u),function(n){return l(n,i)})}else{return n(o(e),null,function(){return l(r,e)})}}return n.reduce(f,function(t,r){return n(a(r),function(n){t.push(n);return t})},[]).then(function(n){var t=r&&r.target;return(n.length==1?n[0]:i(n)).bind(t)})};return{compose:i,partial:r,weave:e}})})(typeof define=="function"?define:function(n,t){module.exports=t.apply(this,n.map(function(n){return require(n)}))});