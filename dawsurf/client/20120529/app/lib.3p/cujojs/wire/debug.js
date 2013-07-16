/** @license MIT License (c) copyright B Cavalier & J Hann *//**
 * debug
 * wire plugin that logs timing and debug information about wiring context and object
 * lifecycle events (e.g. creation, properties set, initialized, etc.).
 *
 * wire is part of the cujo.js family of libraries (http://cujojs.com/)
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Usage:
 * {
 *     module: 'wire/debug',
 *
 *     // verbose (Optional)
 *     // If set to true, even more (a LOT) info will be output.
 *     // Default is false if not specified.
 *     verbose: false,
 *
 *     // timeout (Optional)
 *     // Milliseconds to wait for wiring to finish before reporting
 *     // failed components.  There may be failures caused by 3rd party
 *     // wire plugins and components that wire.js cannot detect.  This
 *     // provides a last ditch way to try to report those failures.
 *     // Default is 5000ms (5 seconds)
 *     timeout: 5000,
 *
 *     // filter (Optional)
 *     // String or RegExp to match against a component's name.  Only
 *     // components whose path matches will be reported in the debug
 *     // diagnostic output.
 *     // All components will still be tracked for failures.
 *     // This can be useful in reducing the amount of diagnostic output and
 *     // focusing it on specific components.
 *     // Defaults to matching all components
 *     // Examples:
 *     //   filter: ".*View"
 *     //   filter: /.*View/
 *     //   filter: "[fF]oo[bB]ar"
 *     filter: ".*"
 *
 *     // trace (Optional)
 *     // Enables application component tracing that will log information about component
 *     // method calls while your application runs.  This provides a powerful way to watch
 *     // and debug your application as it runs.
 *     // To enable full tracing, which is a LOT of information:
 *     trace: true
 *     // Or, specify options to enable more focused tracing:
 *     trace: {
 *          // filter (Optional)
 *          // Similar to above, can be string pattern or RegExp
 *          // If not specified, the general debug filter is used (see above)
 *          filter: ".*View",
 *
 *          // pointcut (Optional)
 *          // Matches *method names*.  Can be used with or without specifying filter
 *          // When filter is not specified, this will match methods across all components.
 *          // For example, if all your components name their event emitters "on<Event>", e.g. "onClick"
 *          // you could trace all your event emitters:
 *          // Default: "^[^_]" (all methods not starting with '_')
 *          pointcut: "on.*",
 *
 *          // step (Optional)
 *          // At what step in the wiring process should tracing start.  This can be helpful
 *          // if you need to trace a component during wiring.
 *          // Values: 'create', 'configure', 'initialize', 'ready', 'destroy'
 *          // NOTE: This defines when tracing *begins*.  For example, if this is set to
 *          // 'configure' (the default), anything that happens to components during and
 *          // after the configure step, until that component is destroyed, will be traced.
 *          // Default: 'configure'
 *          step: 'configure'
 *     }
 * }
 */(function(a){define(["aop"],function(b){function h(){}function i(a,b){var d,e;return d=c(),e="(total: "+(b?d.total+"ms, context: "+b():d)+"): ","DEBUG "+e+a}function j(){var a,b;return a=(new Date).getTime(),b=a,function(){var d,e,f;return d=(new Date).getTime(),e=d-a,f=d-b,b=d,{total:e,split:f,toString:function(){return""+f+"ms / "+e+"ms"}}}}function k(a){return!!a}function l(a){if(!a)return k;var b=a.test?a:new RegExp(a);return function(a){return b.test(a)}}var c,d,e,f,g;return e=a.console||{log:h,error:h,trace:h},f=typeof e.trace=="function"?function(a){e.trace(a)}:function(a){e.error(a.stack||a.stacktrace||a.message||a)},c=j(),d=5e3,g=function(){function h(b){return{around:function(d){var f,g,h,i,j;g=" RETURN (",j=c.substr(0,a),h=j+"DEBUG: "+b+"."+d.method,++a,e.log(h,d.args);try{return i=new Date,f=d.proceed(),f}catch(k){throw f=k,g=" THROW (",k}finally{e.log(h+g+((new Date).getTime()-i.getTime())+"ms) ",f),--a}}}}var a,c,d,f;a=0,c=".";for(var g=0;g<8;g++)c+=c;return d="configure",f=/^[^_]/,function(a,c,e){function o(a){var b=[];for(var c in a)typeof a[c]=="function"&&c!=="wire$plugin"&&m.test(c)&&b.push(c);return b}var g,i,j,k,m,n;k=a.trace.filter?l(a.trace.filter):e,m=a.trace.pointcut||f,j=a.trace.step||d,n=[],g=function(a,c){k(a)&&n.push(b.add(c,o,h(a)))},i=function(){for(var a=n.length-1;a>=0;--a)n[a].remove()};var p=c[j]||function(a){a.resolve()};return c[j]=function(a,b,c){g(b.path,b.target),p(a,b,c)},{trace:g,untrace:i}}}(),{wire$plugin:function(b,c,k){function v(a){return i(a,m)}function w(a,b){return function(c,d){var f=d.path;a==="destroyed"?delete o[f]:f&&(o[f].status=a);if(b&&s(f)){var g=i(a+" "+(f||d.id||""),m);d.target?e.log(g,d.target,d.spec):e.log(g,d)}c.resolve()}}function x(){clearTimeout(q),q=null}function y(){if(!q)return;var a,b;for(a in o)b=o[a],b.status!=="ready"&&e.error("WIRING FAILED at "+b.status,a,b.spec)}var m,n,o,p,q,r,s,t,u;return r=k.verbose,m=j(),u={trace:h,untrace:h},s=l(k.filter),e.log(v("Context init")),b.then(function(b){x(),e.log(v("Context ready"),b)},function(b){x(),e.error(v("Context ERROR: "),b),f(b)}),c.then(function(){u.untrace(),e.log(v("Context destroyed"))},function(b){u.untrace(),e.error(v("Context destroy ERROR"),b),f(b)}),o={},n=k.timeout||d,p=w("created",r),q=setTimeout(y,n),t={create:function(a,b){var c=b.path;c&&(o[c]={spec:b.spec}),p(a,b)},configure:w("configured",r),initialize:w("initialized",r),ready:w("ready",!0),destroy:w("destroyed",!0)},k.trace&&(u=g(k,t,s)),t}}})})(this);