(function(){define(["jquery","domReady!"],function(a){var b;return b=function(){function b(){}return b.prototype.height=function(){return a(document).height()},b.prototype.width=function(){return a(document).width()},b.prototype.height_raw=function(){return document.height},b.prototype.width_raw=function(){return document.width},b}(),new b})}).call(this);