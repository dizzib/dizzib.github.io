(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};define(["plugin/model/device","plugin/model/group","plugin/model/track"],function(e,r,i){var n;return new(n=function(){function n(){this.rename=t(this.rename,this);this.remove=t(this.remove,this);this.ready=t(this.ready,this);this.move=t(this.move,this);this.insert=t(this.insert,this);this.clear=t(this.clear,this);this.add=t(this.add,this);this.HANDLERS={device:e,group:r,track:i}}n.prototype.add=function(t){return this.HANDLERS[t.category].add(t)};n.prototype.clear=function(t){return this.HANDLERS[t.category].clear(t)};n.prototype.insert=function(t){return this.HANDLERS[t.category].insert(t)};n.prototype.move=function(t){return this.HANDLERS[t.category].move(t)};n.prototype.ready=function(t){return this.HANDLERS[t.category].ready(t)};n.prototype.remove=function(t){return this.HANDLERS[t.category].remove(t)};n.prototype.rename=function(t){return this.HANDLERS[t.category].rename(t)};return n}())})}).call(this);