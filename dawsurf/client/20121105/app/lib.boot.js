(function(){var a=function(a,b){return function(){return a.apply(b,arguments)}};define(["jquery","curl"],function(b,c){return new(function(){function d(){this._on_loaded=a(this._on_loaded,this),this.load=a(this.load,this)}return d.prototype.load=function(a){return console.log("loading lib"),this._callback=a,c(["lib/datatype.extension/array","lib/datatype.extension/string"]).next(["js!lib.3p/jquery.ui/jquery-ui-1.8.23.custom.min.js!order","js!lib.3p/jquery.ui/jquery-ui.notify.js!order","js!lib.3p/jquery.validate.min.js!order"]).next(["lib.3p.extension/pengoworks.underscore","lib.3p.extension/jquery"]).next(["css!lib.3p/jquery.ui/theme/ui-darkness/jquery-ui-1.8.20.custom.css","css!lib.3p/jquery.ui/jquery-ui.notify.css"]).then(this._on_loaded,this._fail)},d.prototype._on_loaded=function(a){return console.log("loaded lib"),b.noConflict(!0),this._callback()},d.prototype._fail=function(a){throw console.log("app lib FAIL:",a.message),a},d}())})}).call(this);