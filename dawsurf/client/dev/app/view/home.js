(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};define(["jquery","knockout","text!./home.html","css!./home"],function(e,s,i){var n;return new(n=function(){function n(){this.show=t(this.show,this);this.set_message=t(this.set_message,this);this.init=t(this.init,this)}n.prototype.init=function(){this._$home=e("#home").append(i);return s.applyBindings(this,this._$home[0])};n.prototype.set_message=function(t){return this._message(t.message)};n.prototype.show=function(){return this._$home.css("display","table").siblings(".page").hide()};n.prototype._message=s.observable();return n}())})}).call(this);