(function(){define(function(){return new(function(){function n(){}n.prototype.get_name=function(n){var e,t;if(n.module_name!=null){return n.module_name}e=/function (.{1,})\(/;t=e.exec(n.constructor.toString());if(t!=null?t.length:void 0){return t[1]}else{return""}};return n}())})}).call(this);