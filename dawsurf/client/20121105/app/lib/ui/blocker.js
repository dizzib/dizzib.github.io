(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define(["jquery","domReady!"],function(b){var c;return c=function(){function c(){this.unblock=a(this.unblock,this),this.block=a(this.block,this),this.init=a(this.init,this)}return c.prototype.init=function(){return this._$el=b("<div/>").dialog({autoOpen:!1,closeOnEscape:!1,draggable:!1,modal:!0,resizable:!1,title:"Please wait",height:80,width:300})},c.prototype.block=function(a){return this._$el.html(a.message).dialog("open")},c.prototype.unblock=function(){return this._$el.dialog("close")},c.prototype.disable_context_menu=function(){return window.oncontextmenu=function(a){return a.stopPropagation(),!1}},c.prototype.enable_context_menu=function(){return window.oncontextmenu=function(){return!0}},c}(),new c})}).call(this);